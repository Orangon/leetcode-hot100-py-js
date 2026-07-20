// 判题引擎：
// - JavaScript：每次运行在独立 Web Worker 中执行（超时直接 terminate）
// - Python：常驻 Pyodide Web Worker（浏览器内跑 CPython），超时则销毁重建
// - 核心代码模式：调用用户函数，结构化比对返回值
// - ACM 模式：喂 stdin、捕获 stdout，按文本比对

import { compareResult, compareAcmOutput, fmtValue } from './compare.js';
import { JUDGE_LIMITS, quotaError, validateJudgeRequest, validateResultValue } from './judge-contract.js';

const PYODIDE_CDN = 'https://cdn.jsdelivr.net/pyodide/v0.28.2/full/';
// 本地自托管的 Pyodide 运行时（vendor/pyodide/），离线可用；文件缺失或损坏时回退 CDN。
const PYODIDE_LOCAL = new URL('../vendor/pyodide/', import.meta.url).href;
const JS_TIMEOUT = 3000;
const PY_RUN_TIMEOUT = 8000;
const PY_LOAD_TIMEOUT = 40000;
const PY_ENV_RETRIES = 1;

// ---------- 链表/二叉树构造与序列化（JS 版，注入用户 Worker） ----------
const JS_PREAMBLE = `
function __buildList(arr){const d={val:0,next:null};let c=d;for(const v of arr){c.next={val:v,next:null};c=c.next}return d.next}
function __buildCycle(arr,pos){const d={val:0,next:null};let c=d;const nodes=[];for(const v of arr){c.next={val:v,next:null};c=c.next;nodes.push(c)}if(pos>=0&&pos<nodes.length){c.next=nodes[pos]}return d.next}
function __listToArray(h){const r=[];let g=0;while(h&&g++<100000){r.push(h.val);h=h.next}return r}
function __buildListArray(arr2d){return arr2d.map(function(a){return __buildList(a)})}
function __buildIntersect(shared,aOnly,bOnly){const sharedHead=__buildList(shared);const attach=function(only){if(!only.length)return sharedHead;const h=__buildList(only);let t=h;while(t.next)t=t.next;t.next=sharedHead;return h};return [attach(aOnly),attach(bOnly)]}
function __buildRandomList(desc){const nodes=desc.map(function(pair){return {val:pair[0],next:null,random:null}});nodes.forEach(function(n,i){n.next=nodes[i+1]||null;n.random=desc[i][1]===null?null:nodes[desc[i][1]]});return nodes.length?nodes[0]:null}
function __randomNodes(head){const nodes=[];const seen=new Set();let cur=head;while(cur){if(seen.has(cur)||nodes.length>=100000)throw new Error('链表包含环或过长');seen.add(cur);nodes.push(cur);cur=cur.next}return nodes}
function __randomListToArray(head){const nodes=__randomNodes(head);const idx=new Map(nodes.map(function(n,i){return [n,i]}));return nodes.map(function(n){if(n.random!==null&&!idx.has(n.random))throw new Error('random 必须指向返回链表中的节点');return [n.val,n.random===null?null:idx.get(n.random)]})}
function __nodeIndex(head,node){if(node===null||node===undefined)return -1;let i=0,g=0,cur=head;while(cur&&g++<100000){if(cur===node)return i;cur=cur.next;i++}return -1}
function __buildTree(arr){if(!arr||!arr.length||arr[0]===null||arr[0]===undefined)return null;const nodes=arr.map(v=>v==null?null:{val:v,left:null,right:null});let j=1;for(let i=0;i<nodes.length;i++){if(!nodes[i])continue;if(j<nodes.length)nodes[i].left=nodes[j++]||null;if(j<nodes.length)nodes[i].right=nodes[j++]||null}return nodes[0]}
function __treeToArray(root){if(!root)return[];const r=[];const q=[root];while(q.length){const n=q.shift();if(n){r.push(n.val);q.push(n.left);q.push(n.right)}else{r.push(null)}}while(r.length&&r[r.length-1]===null)r.pop();return r}
function __treeContains(root,target){if(!target)return false;const q=[root];while(q.length){const n=q.shift();if(!n)continue;if(n===target)return true;q.push(n.left,n.right)}return false}
function __buildArgs(spec,args){const out=[];const treeCache={};const getTree=function(i){if(!(i in treeCache))treeCache[i]=__buildTree(args[i]);return treeCache[i]};const findNode=function(root,val){if(!root)return null;const q=[root];while(q.length){const n=q.shift();if(n.val===val)return n;if(n.left)q.push(n.left);if(n.right)q.push(n.right)}return null};for(let i=0;i<args.length;i++){const s=spec&&spec[i];const kind=s?s.kind:'plain';if(kind==='skip')continue;if(kind==='list')out.push(__buildList(args[i]));else if(kind==='cycleList')out.push(__buildCycle(args[i],args[s.posArg]));else if(kind==='tree')out.push(getTree(i));else if(kind==='treeNode')out.push(findNode(getTree(s.treeArg),args[i]));else if(kind==='listArray')out.push(__buildListArray(args[i]));else if(kind==='randomList')out.push(__buildRandomList(args[i]));else if(kind==='intersectLists'){const pair=__buildIntersect(args[i],args[i+1],args[i+2]);out.push(pair[0],pair[1])}else out.push(JSON.parse(JSON.stringify(args[i])))}return out}
function __contractBefore(args,contract){if(!contract)return null;const state={};if(contract.preserveRandomListArg!==undefined)state.randomSnapshot=JSON.stringify(__randomListToArray(args[contract.preserveRandomListArg]));return state}
function __contractAfter(args,got,contract,state){if(!contract)return null;if(contract.preserveRandomListArg!==undefined&&JSON.stringify(__randomListToArray(args[contract.preserveRandomListArg]))!==state.randomSnapshot)return '调用后不得修改输入链表';if(contract.deepCopyRandomListArg!==undefined){const originals=new Set(__randomNodes(args[contract.deepCopyRandomListArg]));for(const node of __randomNodes(got)){if(originals.has(node))return '必须返回由全新节点组成的深拷贝'}__randomListToArray(got)}if(contract.returnNodeFromTreeArg!==undefined&&!__treeContains(args[contract.returnNodeFromTreeArg],got))return '必须返回输入树中的节点对象';return null}
function __serialize(v,kind){if(kind==='list')return __listToArray(v);if(kind==='tree')return __treeToArray(v);if(kind==='randomList')return __randomListToArray(v);if(kind==='nodeVal')return v===null||v===undefined?null:v.val;return v}
function __checkResult(v){const seen=new Set(),stack=[{v:v,d:0}];let count=0;while(stack.length){const x=stack.pop(),item=x.v;if(++count>${JUDGE_LIMITS.resultNodes}||x.d>${JUDGE_LIMITS.resultDepth})return '返回结构过大或嵌套过深';if(item===null||typeof item==='string'||typeof item==='boolean')continue;if(typeof item==='number'){if(!Number.isFinite(item))return '返回值包含不可序列化的非有限数字';continue}if(typeof item!=='object')return '返回值包含不可序列化的 '+typeof item;if(seen.has(item))continue;seen.add(item);for(const k of Object.keys(item))stack.push({v:item[k],d:x.d+1})}let json;try{json=JSON.stringify(v)}catch(e){return '返回值无法序列化'}if(json===undefined)return '返回值不可序列化';if(new TextEncoder().encode(json).byteLength>${JUDGE_LIMITS.resultBytes})return '返回结构超出限制（最多 ${JUDGE_LIMITS.resultBytes} 字节）';return null}
`;

// V8 的 new Function 会把函数体包进 "function anonymous(参数\n) {\n" 两行包装，
// 堆栈里的 <anonymous>:行:列 减去该偏移才是用户代码行号。
const JS_FUNCTION_LINE_OFFSET = 2;

// ---------- console 捕获与错误信息提取（注入用户 Worker） ----------
// core/design 模式在用例执行期间替换全局 console；ACM 模式把 fake console 作为参数注入。
const JS_CONSOLE_PREAMBLE = `
function __fmtConsoleValue(v, seen) {
  if (typeof v === 'string') return v;
  if (v === null || typeof v !== 'object') return String(v);
  seen = seen || new Set();
  if (seen.has(v)) return String(v);
  if (v instanceof Map) {
    seen.add(v);
    const parts = [];
    let i = 0;
    for (const [k, val] of v) { if (i++ >= 100) { parts.push('...'); break; } parts.push(__fmtConsoleValue(k, seen) + ' => ' + __fmtConsoleValue(val, seen)); }
    return 'Map(' + v.size + ') { ' + parts.join(', ') + ' }';
  }
  if (v instanceof Set) {
    seen.add(v);
    const parts = [];
    let i = 0;
    for (const item of v) { if (i++ >= 100) { parts.push('...'); break; } parts.push(__fmtConsoleValue(item, seen)); }
    return 'Set(' + v.size + ') { ' + parts.join(', ') + ' }';
  }
  try {
    const text = JSON.stringify(v);
    return text === undefined ? String(v) : text;
  } catch (e) {
    return String(v);
  }
}
function __consoleCapture() {
  const lines = [];
  let bytes = 0;
  const write = function () {
    let line;
    try {
      line = Array.prototype.map.call(arguments, function (v) { return __fmtConsoleValue(v); }).join(' ');
    } catch (e) {
      line = Array.prototype.map.call(arguments, function (v) { try { return String(v); } catch (e2) { return '[unprintable]'; } }).join(' ');
    }
    bytes += new TextEncoder().encode(line + '\\n').byteLength;
    if (bytes > ${JUDGE_LIMITS.stdoutBytes}) { const err = new Error(${JSON.stringify(quotaError('stdout', JUDGE_LIMITS.stdoutBytes))}); err.__judgeInternal = true; throw err; }
    lines.push(line);
  };
  const fake = { log: write, error: write, warn: write, info: write, debug: write };
  return { lines: lines, fake: fake };
}
function __capText(cap) { return cap.lines.length ? cap.lines.join('\\n') + '\\n' : ''; }
function __jsErrorInfo(e) {
  const raw = String((e && e.stack) || e);
  const message = String((e && e.message) || e).split('\\n')[0];
  let line = null;
  if (!e || !e.__judgeInternal) {
    const m = raw.match(/^\\s*at\\s+[^\\n]*?<anonymous>:(\\d+):(\\d+)/m);
    if (m) { const n = Number(m[1]) - ${JS_FUNCTION_LINE_OFFSET}; if (n >= 1) line = n; }
  }
  return { message: message, raw: raw, line: line };
}
`;

const JS_CORE_PREAMBLE = JS_PREAMBLE + JS_CONSOLE_PREAMBLE;

// ---------- 链表/二叉树构造与序列化（Python 版，注入 Pyodide） ----------
const PY_PREAMBLE = `
import copy
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right
def __build_list(arr):
    dummy = ListNode()
    cur = dummy
    for v in arr:
        cur.next = ListNode(v)
        cur = cur.next
    return dummy.next
def __build_cycle(arr, pos):
    dummy = ListNode()
    cur = dummy
    nodes = []
    for v in arr:
        cur.next = ListNode(v)
        cur = cur.next
        nodes.append(cur)
    if 0 <= pos < len(nodes):
        cur.next = nodes[pos]
    return dummy.next
def __list_to_array(h):
    r = []
    g = 0
    while h is not None and g < 100000:
        r.append(h.val)
        h = h.next
        g += 1
    return r
def __build_tree(arr):
    if not arr or arr[0] is None:
        return None
    nodes = [None if v is None else TreeNode(v) for v in arr]
    j = 1
    for i in range(len(nodes)):
        if nodes[i] is None:
            continue
        if j < len(nodes):
            nodes[i].left = nodes[j]
            j += 1
        if j < len(nodes):
            nodes[i].right = nodes[j]
            j += 1
    return nodes[0]
def __tree_to_array(root):
    if root is None:
        return []
    r = []
    q = [root]
    while q:
        n = q.pop(0)
        if n is None:
            r.append(None)
        else:
            r.append(n.val)
            q.append(n.left)
            q.append(n.right)
    while r and r[-1] is None:
        r.pop()
    return r
def __ser(x):
    if isinstance(x, (list, tuple)):
        return [__ser(i) for i in x]
    return x
def __build_list_array(arr2d):
    return [__build_list(a) for a in arr2d]
def __build_intersect(shared, a_only, b_only):
    shared_head = __build_list(shared)
    def attach(only):
        if not only:
            return shared_head
        h = __build_list(only)
        t = h
        while t.next is not None:
            t = t.next
        t.next = shared_head
        return h
    return [attach(a_only), attach(b_only)]
def __build_random_list(desc):
    nodes = [ListNode(v) for v, _ in desc]
    for i, n in enumerate(nodes):
        n.next = nodes[i + 1] if i + 1 < len(nodes) else None
        n.random = None if desc[i][1] is None else nodes[desc[i][1]]
    return nodes[0] if nodes else None
def __random_list_to_array(head):
    nodes = []
    cur = head
    g = 0
    while cur is not None and g < 100000:
        nodes.append(cur)
        cur = cur.next
        g += 1
    idx = {id(n): i for i, n in enumerate(nodes)}
    return [[n.val, None if n.random is None else idx[id(n.random)]] for n in nodes]
def __node_index(head, node):
    if node is None:
        return -1
    i = 0
    g = 0
    cur = head
    while cur is not None and g < 100000:
        if cur is node:
            return i
        cur = cur.next
        i += 1
        g += 1
    return -1
def __build_args(spec, args):
    out = []
    tree_cache = {}
    def get_tree(i):
        if i not in tree_cache:
            tree_cache[i] = __build_tree(args[i])
        return tree_cache[i]
    def find_node(root, val):
        q = [root]
        while q:
            n = q.pop(0)
            if n is None:
                continue
            if n.val == val:
                return n
            q.append(n.left)
            q.append(n.right)
        return None
    for i, a in enumerate(args):
        s = spec[i] if spec and i < len(spec) else None
        kind = s['kind'] if s else 'plain'
        if kind == 'skip':
            continue
        if kind == 'list':
            out.append(__build_list(a))
        elif kind == 'cycleList':
            out.append(__build_cycle(a, args[s['posArg']]))
        elif kind == 'tree':
            out.append(get_tree(i))
        elif kind == 'treeNode':
            out.append(find_node(get_tree(s['treeArg']), a))
        elif kind == 'listArray':
            out.append(__build_list_array(a))
        elif kind == 'randomList':
            out.append(__build_random_list(a))
        elif kind == 'intersectLists':
            pair = __build_intersect(a, args[i + 1], args[i + 2])
            out.append(pair[0])
            out.append(pair[1])
        else:
            out.append(copy.deepcopy(a))
    return out
def __random_nodes(head):
    nodes = []
    seen = set()
    cur = head
    while cur is not None:
        if id(cur) in seen or len(nodes) >= 100000:
            raise _JudgeInternalError('链表包含环或过长')
        seen.add(id(cur))
        nodes.append(cur)
        cur = cur.next
    return nodes

def __tree_contains(root, target):
    if target is None:
        return False
    q = [root]
    while q:
        node = q.pop(0)
        if node is None:
            continue
        if node is target:
            return True
        q.append(node.left)
        q.append(node.right)
    return False

def __contract_before(args, contract):
    state = {}
    if contract and 'preserveRandomListArg' in contract:
        state['randomSnapshot'] = json.dumps(__random_list_to_array(args[contract['preserveRandomListArg']]))
    return state

def __contract_after(args, got, contract, state):
    if not contract:
        return None
    if 'preserveRandomListArg' in contract:
        now = json.dumps(__random_list_to_array(args[contract['preserveRandomListArg']]))
        if now != state['randomSnapshot']:
            return '调用后不得修改输入链表'
    if 'deepCopyRandomListArg' in contract:
        originals = {id(node) for node in __random_nodes(args[contract['deepCopyRandomListArg']])}
        copies = __random_nodes(got)
        if any(id(node) in originals for node in copies):
            return '必须返回由全新节点组成的深拷贝'
        __random_list_to_array(got)
    if 'returnNodeFromTreeArg' in contract and not __tree_contains(args[contract['returnNodeFromTreeArg']], got):
        return '必须返回输入树中的节点对象'
    return None

def __serialize(v, kind):
    if kind == 'list':
        return __list_to_array(v)
    if kind == 'tree':
        return __tree_to_array(v)
    if kind == 'randomList':
        return __random_list_to_array(v)
    if kind == 'nodeVal':
        return None if v is None else v.val
    return __ser(v)
`;

// Python 异常信息提取：traceback 中 filename 为 <solution> 的帧即用户代码帧。
// _JudgeInternalError 是判题器自身抛出的错误（配额/契约），不带类型前缀与行号。
const PY_ERROR_HELPER = `
import traceback
class _JudgeInternalError(Exception):
    pass
def __error_info(e):
    if isinstance(e, _JudgeInternalError):
        return (None, None)
    __line = None
    for __frame in traceback.extract_tb(e.__traceback__):
        if __frame.filename == '<solution>':
            __line = __frame.lineno
    return (type(e).__name__, __line)
def __format_error(e):
    __etype, __eline = __error_info(e)
    if __etype is None:
        return (str(e), None, None)
    return (__etype + ': ' + str(e), __etype, __eline)
`;

const PY_CORE_HARNESS =
  PY_ERROR_HELPER +
  PY_PREAMBLE +
  `
import json
__spec = json.loads(__arg_spec_json)
__contract = json.loads(__contract_json)
__cases = json.loads(__tests_json)
try:
    __code_obj = compile(__user_code, '<solution>', 'exec')
except SyntaxError as e:
    __out = json.dumps({'compileError': '语法错误: ' + str(e)})
else:
    __ns = {}
    try:
        exec(__code_obj, __ns)
    except Exception as e:
        __msg, __etype, __eline = __format_error(e)
        __out = json.dumps({'compileError': __msg, 'errorLine': __eline})
    else:
        __fn = __ns.get(__fname)
        if not callable(__fn):
            __out = json.dumps({'compileError': '未找到函数 ' + __fname + '，请保持函数名不变'})
        else:
            __results = []
            for t in __cases:
                try:
                    __args = __build_args(__spec, t['args'])
                    __before = __contract_before(__args, __contract)
                    __got = __fn(*__args)
                    __contract_error = __contract_after(__args, __got, __contract, __before)
                    if __contract_error:
                        raise _JudgeInternalError(__contract_error)
                    if __result_kind == 'nodeIndex':
                        __got = __node_index(__args[0], __got)
                    elif __result_kind == 'inputTree':
                        __got = __tree_to_array(__args[0])
                    elif __result_kind == 'inputArray':
                        __got = __args[0]
                    else:
                        __got = __serialize(__got, __result_kind)
                    __results.append({'ok': True, 'got': __got})
                except Exception as e:
                    __msg, __etype, __eline = __format_error(e)
                    __results.append({'ok': False, 'error': __msg, 'errorType': __etype, 'errorLine': __eline})
            __out = json.dumps({'results': __results})
__out
`;

const PY_DESIGN_HARNESS = PY_ERROR_HELPER + `
import json
__cases = json.loads(__tests_json)
try:
    __code_obj = compile(__user_code, '<solution>', 'exec')
except SyntaxError as e:
    __out = json.dumps({'compileError': '语法错误: ' + str(e)})
else:
    __ns = {}
    try:
        exec(__code_obj, __ns)
    except Exception as e:
        __msg, __etype, __eline = __format_error(e)
        __out = json.dumps({'compileError': __msg, 'errorLine': __eline})
    else:
        __cls = __ns.get(__cname)
        if not callable(__cls):
            __out = json.dumps({'compileError': '未找到类 ' + __cname + '，请保持类名不变'})
        else:
            __results = []
            for t in __cases:
                try:
                    __obj = None
                    __out_ops = []
                    for __op, __params in zip(t['ops'], t['params']):
                        if __op == __cname:
                            __obj = __cls(*__params)
                            __out_ops.append(None)
                        else:
                            __r = getattr(__obj, __op)(*__params)
                            __out_ops.append(None if __r is None else __r)
                    __results.append({'ok': True, 'got': __out_ops})
                except Exception as e:
                    __msg, __etype, __eline = __format_error(e)
                    __results.append({'ok': False, 'error': __msg, 'errorType': __etype, 'errorLine': __eline})
            __out = json.dumps({'results': __results})
__out
`;

const PY_ACM_HARNESS = PY_ERROR_HELPER + `
import json, sys, io
class __LimitedOutput(io.StringIO):
    def __init__(self):
        super().__init__()
        self.__bytes = 0
    def write(self, text):
        encoded = len(str(text).encode('utf-8'))
        if self.__bytes + encoded > ${JUDGE_LIMITS.stdoutBytes}:
            raise _JudgeInternalError('${quotaError('stdout', JUDGE_LIMITS.stdoutBytes)}')
        self.__bytes += encoded
        return super().write(text)
__cases = json.loads(__tests_json)
try:
    __code_obj = compile(__user_code, '<solution>', 'exec')
except SyntaxError as e:
    __out = json.dumps({'compileError': '语法错误: ' + str(e)})
else:
    __results = []
    for t in __cases:
        __old_in, __old_out = sys.stdin, sys.stdout
        sys.stdin = io.StringIO(t['input'])
        sys.stdout = __buf = __LimitedOutput()
        try:
            exec(__code_obj, {})
            __results.append({'ok': True, 'stdout': __buf.getvalue()})
        except Exception as e:
            __msg, __etype, __eline = __format_error(e)
            __results.append({'ok': False, 'stdout': __buf.getvalue(), 'error': __msg, 'errorType': __etype, 'errorLine': __eline})
        finally:
            sys.stdin, sys.stdout = __old_in, __old_out
    __out = json.dumps({'results': __results})
__out
`;

// Python 轻量语法检查（编辑器实时波浪线用，只编译不执行）
const PY_CHECK_HARNESS = `
import json
try:
    compile(__user_code, '<solution>', 'exec')
    __out = json.dumps({'ok': True})
except SyntaxError as e:
    __out = json.dumps({'ok': False, 'error': str(e), 'line': e.lineno})
except Exception as e:
    __out = json.dumps({'ok': False, 'error': str(e), 'line': getattr(e, 'lineno', None)})
__out
`;

// ---------- JavaScript 运行 ----------

function jsCoreSource(problem, code) {
  if (problem.design) return jsDesignSource(problem, code);
  const fname = problem.functionName;
  const factoryBody = `${code}\n;return typeof ${fname} === 'function' ? ${fname} : null;`;
  return (
    JS_CORE_PREAMBLE +
    `const __tests = ${JSON.stringify(problem.tests)};\n` +
    `const __argSpec = ${JSON.stringify(problem.argSpec || null)};\n` +
    `const __contract = ${JSON.stringify(problem.judgeContract || null)};\n` +
    `const __rk = ${JSON.stringify(problem.resultKind || 'plain')};\n` +
    `let __userFn; try { __userFn = new Function(${JSON.stringify(factoryBody)})(); } catch (e) { const __ei = __jsErrorInfo(e); __judgeSend({ compileError: __ei.message, rawError: __ei.raw, errorLine: __ei.line }); }\n` +
    `if (__userFn === null) __judgeSend({ compileError: '未找到函数 ${fname}，请保持函数名不变' });\n` +
    `else if (__userFn) {\n` +
    `  const __results = [];\n` +
    `  for (const t of __tests) {\n` +
    `    const __cap = __consoleCapture(); const __savedConsole = globalThis.console; globalThis.console = __cap.fake;\n` +
    `    try {\n` +
    `      const args = __buildArgs(__argSpec, t.args); const before = __contractBefore(args, __contract);\n` +
    `      let got = __userFn(...args);\n` +
    `      if (got && typeof got.then === 'function') throw new Error('不支持 Promise 返回值，请返回同步结果');\n` +
    `      const contractError = __contractAfter(args, got, __contract, before); if (contractError) throw new Error(contractError);\n` +
    `      if (__rk === 'nodeIndex') got = __nodeIndex(args[0], got);\n` +
    `      else if (__rk === 'inputTree') got = __treeToArray(args[0]);\n` +
    `      else if (__rk === 'inputArray') got = args[0];\n` +
    `      else got = __serialize(got, __rk);\n` +
    `      const quota = __checkResult(got); if (quota) throw new Error(quota);\n` +
    `      __results.push({ ok: true, got, stdout: __capText(__cap) });\n` +
    `    } catch (e) { const __ei = __jsErrorInfo(e); __results.push({ ok: false, error: __ei.message, rawError: __ei.raw, errorLine: __ei.line, stdout: __capText(__cap) }); }\n` +
    `    finally { globalThis.console = __savedConsole; }\n` +
    `  }\n` +
    `  __judgeSend({ results: __results });\n` +
    `}\n`
  );
}

function jsDesignSource(problem, code) {
  const cname = problem.className;
  const factoryBody = `${code}\n;return typeof ${cname} === 'function' ? ${cname} : null;`;
  return (
    JS_CORE_PREAMBLE +
    `const __tests = ${JSON.stringify(problem.tests)}; const __CNAME = ${JSON.stringify(cname)};\n` +
    `let __UserClass; try { __UserClass = new Function(${JSON.stringify(factoryBody)})(); } catch (e) { const __ei = __jsErrorInfo(e); __judgeSend({ compileError: __ei.message, rawError: __ei.raw, errorLine: __ei.line }); }\n` +
    `if (__UserClass === null) __judgeSend({ compileError: '未找到类 ${cname}，请保持类名不变' });\n` +
    `else if (__UserClass) {\n` +
    `  const __results = [];\n` +
    `  for (const t of __tests) {\n` +
    `    const __cap = __consoleCapture(); const __savedConsole = globalThis.console; globalThis.console = __cap.fake;\n` +
    `    try {\n` +
    `      let obj = null; const out = [];\n` +
    `      for (let i = 0; i < t.ops.length; i++) {\n` +
    `        const op = t.ops[i], params = t.params[i];\n` +
    `        if (op === __CNAME) { obj = new __UserClass(...params); out.push(null); }\n` +
    `        else { const r = obj[op](...params); if (r && typeof r.then === 'function') throw new Error('不支持 Promise 返回值，请返回同步结果'); out.push(r === undefined ? null : r); }\n` +
    `      }\n` +
    `      const quota = __checkResult(out); if (quota) throw new Error(quota); __results.push({ ok: true, got: out, stdout: __capText(__cap) });\n` +
    `    } catch (e) { const __ei = __jsErrorInfo(e); __results.push({ ok: false, error: __ei.message, rawError: __ei.raw, errorLine: __ei.line, stdout: __capText(__cap) }); }\n` +
    `    finally { globalThis.console = __savedConsole; }\n` +
    `  }\n` +
    `  __judgeSend({ results: __results });\n` +
    `}\n`
  );
}

function jsAcmSource(problem, code) {
  return (
    JS_CONSOLE_PREAMBLE +
    `const __tests = ${JSON.stringify(problem.acmTests)}; let __userFn;\n` +
    `try { __userFn = new Function('input', 'console', ${JSON.stringify(code)}); } catch (e) { const __ei = __jsErrorInfo(e); __judgeSend({ compileError: __ei.message, rawError: __ei.raw, errorLine: __ei.line }); }\n` +
    `if (__userFn) {\n` +
    `  const __results = [];\n` +
    `  for (const t of __tests) {\n` +
    `    const __cap = __consoleCapture();\n` +
    `    try {\n` +
    `      const returned = __userFn(t.input, __cap.fake); if (returned && typeof returned.then === 'function') throw new Error('不支持 Promise，请使用同步代码');\n` +
    `      __results.push({ ok: true, stdout: __capText(__cap) });\n` +
    `    } catch (e) { const __ei = __jsErrorInfo(e); __results.push({ ok: false, stdout: __cap.lines.join('\\n'), error: __ei.message, rawError: __ei.raw, errorLine: __ei.line }); }\n` +
    `  }\n` +
    `  __judgeSend({ results: __results });\n` +
    `}\n`
  );
}

function runJsWorker(src, timeoutMs) {
  return new Promise((resolve) => {
    const guarded = `(() => { const __judgeSend = globalThis.postMessage.bind(globalThis); Object.defineProperty(globalThis, 'postMessage', { value: () => { throw new Error('用户代码不得调用 postMessage'); }, writable: false, configurable: false }); ${src}\n})();`;
    const url = URL.createObjectURL(new Blob([guarded], { type: 'text/javascript' }));
    const worker = new Worker(url);
    let settled = false;
    const finish = (data) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      worker.terminate();
      URL.revokeObjectURL(url);
      resolve(data);
    };
    const timer = setTimeout(() => finish({ timeout: true }), timeoutMs);
    worker.onmessage = (e) => finish(e.data);
    worker.onmessageerror = () => finish({ compileError: '判题结果不可序列化' });
    worker.onerror = (e) => {
      e.preventDefault();
      finish({ compileError: e.message || '代码存在语法错误', line: e.lineno > 0 ? e.lineno : null });
    };
  });
}

// ---------- Python 运行（Pyodide Worker，常驻复用） ----------

function pyWorkerSource() {
  return (
    `let __pyBase = ${JSON.stringify(PYODIDE_LOCAL)};\n` +
    `try { importScripts(__pyBase + 'pyodide.js'); } catch (e) {\n` +
    `  __pyBase = ${JSON.stringify(PYODIDE_CDN)};\n` +
    `  importScripts(__pyBase + 'pyodide.js');\n` +
    `}\n` +
    `const PY_CORE_HARNESS = ${JSON.stringify(PY_CORE_HARNESS)};\n` +
    `const PY_DESIGN_HARNESS = ${JSON.stringify(PY_DESIGN_HARNESS)};\n` +
    `const PY_ACM_HARNESS = ${JSON.stringify(PY_ACM_HARNESS)};\n` +
    `const PY_CHECK_HARNESS = ${JSON.stringify(PY_CHECK_HARNESS)};\n` +
    `let __pyPromise = null;\n` +
    `function __getPy(jobId) {\n` +
    `  if (!__pyPromise) {\n` +
    `    postMessage({ type: 'status', stage: 'loading', jobId });\n` +
    `    __pyPromise = loadPyodide({ indexURL: __pyBase }).catch((err) => {\n` +
    `      if (__pyBase === ${JSON.stringify(PYODIDE_CDN)}) throw err;\n` +
    `      __pyBase = ${JSON.stringify(PYODIDE_CDN)};\n` +
    `      return loadPyodide({ indexURL: __pyBase });\n` +
    `    });\n` +
    `  }\n` +
    `  return __pyPromise;\n` +
    `}\n` +
    `onmessage = async (e) => {\n` +
    `  const { jobId, mode, code, testsJson, fname, argSpecJson, contractJson, resultKind, design, cname } = e.data;\n` +
    `  let stage = 'loading';\n` +
    `  try {\n` +
    `    const pyodide = await __getPy(jobId);\n` +
    `    stage = 'running';\n` +
    `    postMessage({ type: 'status', stage, jobId });\n` +
    `    pyodide.globals.set('__user_code', code);\n` +
    `    pyodide.globals.set('__tests_json', testsJson);\n` +
    `    let harness;\n` +
    `    if (mode === 'check') {\n` +
    `      harness = PY_CHECK_HARNESS;\n` +
    `    } else if (mode === 'core') {\n` +
    `      if (design) {\n` +
    `        pyodide.globals.set('__cname', cname);\n` +
    `        harness = PY_DESIGN_HARNESS;\n` +
    `      } else {\n` +
    `        pyodide.globals.set('__arg_spec_json', argSpecJson);\n` +
    `        pyodide.globals.set('__contract_json', contractJson);\n` +
    `        pyodide.globals.set('__fname', fname);\n` +
    `        pyodide.globals.set('__result_kind', resultKind);\n` +
    `        harness = PY_CORE_HARNESS;\n` +
    `      }\n` +
    `    } else {\n` +
    `      harness = PY_ACM_HARNESS;\n` +
    `    }\n` +
    `    const out = pyodide.runPython(harness);\n` +
    `    const payload = JSON.parse(out);\n` +
    `    if (payload.results) for (const result of payload.results) {\n` +
    `      if (typeof result.stdout === 'string' && new TextEncoder().encode(result.stdout).byteLength > ${JUDGE_LIMITS.stdoutBytes}) { result.ok = false; result.stdout = ''; result.error = ${JSON.stringify(quotaError('stdout', JUDGE_LIMITS.stdoutBytes))}; }\n` +
    `      if ('got' in result && new TextEncoder().encode(JSON.stringify(result.got)).byteLength > ${JUDGE_LIMITS.resultBytes}) { result.ok = false; delete result.got; result.error = ${JSON.stringify(quotaError('result', JUDGE_LIMITS.resultBytes))}; }\n` +
    `    }\n` +
    `    postMessage({ type: 'result', jobId, payload });\n` +
    `  } catch (err) {\n` +
    `    if (stage === 'loading') postMessage({ type: 'environmentError', jobId, error: String(err) });\n` +
    `    else postMessage({ type: 'result', jobId, payload: { compileError: String(err) } });\n` +
    `  }\n` +
    `};\n`
  );
}

let pyWorker = null;
let pyWorkerGeneration = 0;
let pyJobSeq = 0;
let pyReady = false;
let pyActive = null;
const pyQueue = [];

export function isPythonReady() {
  return pyReady;
}

export async function checkPythonSyntax(code) {
  if (!pyWorker) return { skipped: true };
  const raw = await runPythonJob(
    {
      mode: 'check', code, testsJson: '[]', fname: null, argSpecJson: 'null', contractJson: 'null',
      resultKind: 'plain', design: false, cname: null,
    },
    null
  );
  if (raw.timeout || raw.compileError) return { skipped: true };
  return raw;
}

function ensurePyWorker() {
  if (pyWorker) return pyWorker;
  const generation = ++pyWorkerGeneration;
  const url = URL.createObjectURL(new Blob([pyWorkerSource()], { type: 'text/javascript' }));
  const worker = new Worker(url);
  URL.revokeObjectURL(url);
  pyWorker = worker;
  worker.onmessage = (e) => {
    if (worker !== pyWorker || generation !== pyWorkerGeneration || !pyActive) return;
    const msg = e.data;
    if (msg.jobId !== pyActive.jobId) return;
    if (msg.type === 'status') {
      pyActive.phase = msg.stage;
      if (msg.stage === 'running') {
        pyReady = true;
        armPyTimer(pyActive, PY_RUN_TIMEOUT, () => failActive({ timeout: true }, false));
      }
      pyActive.onStatus?.(msg.stage);
    } else if (msg.type === 'result') {
      settleActive(msg.payload);
    } else if (msg.type === 'environmentError') {
      failActive({ compileError: 'Python 运行环境出错：' + msg.error }, true);
    }
  };
  worker.onerror = (e) => {
    if (worker !== pyWorker || generation !== pyWorkerGeneration) return;
    e.preventDefault();
    const message = 'Python 运行环境出错：' + (e.message || '未知错误');
    failActive({ compileError: message }, pyActive?.phase !== 'running');
  };
  return worker;
}

function killPyWorker() {
  const worker = pyWorker;
  pyWorker = null;
  pyReady = false;
  pyWorkerGeneration += 1;
  worker?.terminate();
}

function armPyTimer(entry, timeout, callback) {
  clearTimeout(entry.timer);
  entry.timer = setTimeout(callback, timeout);
}

function settleActive(payload) {
  const entry = pyActive;
  if (!entry || entry.settled) return;
  entry.settled = true;
  clearTimeout(entry.timer);
  pyActive = null;
  entry.resolve(payload);
  pumpPythonQueue();
}

function failActive(payload, retryEnvironment) {
  const entry = pyActive;
  if (!entry || entry.settled) return;
  clearTimeout(entry.timer);
  killPyWorker();
  pyActive = null;
  if (retryEnvironment && entry.retries < PY_ENV_RETRIES) {
    entry.retries += 1;
    entry.phase = 'queued';
    entry.onStatus?.('loading');
    pyQueue.unshift(entry);
    pumpPythonQueue();
    return;
  }
  entry.settled = true;
  entry.resolve(payload);
  pumpPythonQueue();
}

function pumpPythonQueue() {
  if (pyActive || pyQueue.length === 0) return;
  const entry = pyQueue.shift();
  pyActive = entry;
  entry.phase = 'loading';
  const worker = ensurePyWorker();
  armPyTimer(entry, PY_LOAD_TIMEOUT, () => failActive({ timeout: true, loading: true }, true));
  worker.postMessage({ jobId: entry.jobId, ...entry.payload });
}

function runPythonJob(payload, onStatus) {
  return new Promise((resolve) => {
    pyQueue.push({ jobId: ++pyJobSeq, payload, onStatus, resolve, timer: null, retries: 0, phase: 'queued', settled: false });
    pumpPythonQueue();
  });
}

// ---------- 统一判题入口 ----------

function buildVerdict(raw, problem, mode, tests) {
  if (!raw || typeof raw !== 'object') {
    return { status: 'compileError', error: '判题器返回了无效状态', cases: [] };
  }
  if (raw.timeout) {
    return { status: 'timeout', loading: !!raw.loading, cases: [] };
  }
  if (raw.compileError) {
    // 尽量提取出错的行号（Python 报错文本带 "line N"；JS worker 的 onerror 带 lineno，由调用方换算后放进 raw.errorLine；
    // JS harness 与 Python exec 失败也会直接在 raw.errorLine 里给用户代码行号）
    let errorLine = raw.errorLine || null;
    if (!errorLine) {
      const m = String(raw.compileError).match(/line (\d+)/);
      if (m) errorLine = Number(m[1]);
    }
    const verdict = { status: 'compileError', error: raw.compileError, errorLine, cases: [] };
    if (raw.rawError) verdict.rawError = raw.rawError;
    return verdict;
  }
  if (!Array.isArray(raw.results) || raw.results.length !== tests.length) {
    return { status: 'compileError', error: '判题器返回的用例数量无效', cases: [] };
  }
  const cases = raw.results.map((r, i) => {
    const t = tests[i];
    const base = { index: i, pass: false };
    if (mode === 'core' && problem.design) {
      // 设计类：输入展示为操作序列
      base.input = t.ops.map((op, j) => `${op}(${t.params[j].map(fmtValue).join(', ')})`).join(' → ');
      base.expected = fmtValue(t.expected);
    } else if (mode === 'core') {
      base.input = t.args.map(fmtValue).join(', ');
      base.expected = fmtValue(t.expected);
    } else {
      base.input = t.input;
      base.expected = t.output;
      base.got = r.stdout;
    }
    if (mode === 'core') base.stdout = typeof r.stdout === 'string' ? r.stdout : '';
    if (!r.ok) {
      base.error = r.error;
      base.errorType = r.errorType || null;
      base.errorLine = typeof r.errorLine === 'number' ? r.errorLine : null;
      if (r.rawError) base.rawError = r.rawError;
      if (mode === 'core') base.got = undefined;
      return base;
    }
    if (mode === 'core') {
      const resultError = validateResultValue(r.got);
      if (resultError) {
        base.error = resultError;
        base.errorType = null;
        base.errorLine = null;
        return base;
      }
      base.got = fmtValue(r.got);
      base.pass = compareResult(t.expected, r.got, problem.compare, problem.numericTolerance || 0);
    } else {
      base.pass = compareAcmOutput(t.output, r.stdout, problem.numericTolerance ?? null);
    }
    return base;
  });
  const status = cases.every((c) => c.pass) ? 'pass' : 'fail';
  const verdict = { status, cases };
  if (status === 'fail') {
    // 把首个带行号的失败用例（含运行时错误）的行号透出，供视图层定位到编辑器行
    const withLine = cases.find((c) => !c.pass && typeof c.errorLine === 'number');
    verdict.errorLine = withLine ? withLine.errorLine : null;
  }
  return verdict;
}

export async function judge({ code, problem, mode, lang, onStatus }) {
  const tests = mode === 'core' ? problem.tests : problem.acmTests;
  if (!tests || !tests.length) {
    return { status: 'compileError', error: '该题目缺少测试数据', cases: [] };
  }
  const requestError = validateJudgeRequest(code, tests, mode);
  if (requestError) return { status: 'compileError', error: requestError, cases: [] };
  let raw;
  if (lang === 'javascript') {
    const src = mode === 'core' ? jsCoreSource(problem, code) : jsAcmSource(problem, code);
    raw = await runJsWorker(src, JS_TIMEOUT);
    // 核心模式用户代码以真实文本内联，worker 报错的行号减去前导构建器行数即为编辑器行号
    if (mode === 'core' && raw && typeof raw.line === 'number') {
      raw.errorLine = Math.max(1, raw.line - JS_CORE_PREAMBLE.split('\n').length);
    }
  } else {
    raw = await runPythonJob(
      {
        mode,
        code,
        testsJson: JSON.stringify(tests),
        fname: problem.functionName,
        argSpecJson: JSON.stringify(problem.argSpec || null),
        contractJson: JSON.stringify(problem.judgeContract || null),
        resultKind: problem.resultKind || 'plain',
        design: !!problem.design,
        cname: problem.className || null,
      },
      onStatus
    );
  }
  return buildVerdict(raw, problem, mode, tests);
}

// ---------- 示例代码运行（知识文章的可运行代码块） ----------

// 运行一段无输入依赖的示例代码，返回 { ok, stdout, error }
export async function runSnippet(code, lang, onStatus) {
  const tests = [{ input: '', output: '' }];
  const requestError = validateJudgeRequest(code, tests, 'acm');
  if (requestError) return { ok: false, stdout: '', error: requestError };
  let raw;
  if (lang === 'python') {
    raw = await runPythonJob(
      {
        mode: 'acm', code, testsJson: JSON.stringify(tests), fname: null, argSpecJson: 'null', contractJson: 'null',
        resultKind: 'plain', design: false, cname: null,
      },
      onStatus
    );
  } else {
    raw = await runJsWorker(jsAcmSource({ acmTests: tests }, code), JS_TIMEOUT);
  }
  if (raw.timeout) return { ok: false, stdout: '', error: '执行超时（疑似死循环）' + (lang === 'python' ? '，Python 环境已自动重置' : '') };
  if (raw.compileError) return { ok: false, stdout: '', error: raw.compileError };
  const r = raw.results[0];
  return { ok: r.ok, stdout: r.stdout || '', error: r.error || null };
}

// ---------- 自定义测试（单个自填用例，只看输出不计对错） ----------

// 返回 { output, stdout } 或 { error, stdout }（可能同时有 output+error：ACM 出错时已产生部分输出；
// stdout 为用户代码的打印输出，core 模式仅 JavaScript 捕获）
export async function runCustom({ code, problem, mode, lang, input, onStatus }) {
  const rawRequestError = validateJudgeRequest(code, [{ input }], 'acm');
  if (rawRequestError) return { error: rawRequestError, stdout: '' };
  if (mode === 'core') {
    let args;
    try {
      args = JSON.parse(input);
      if (!Array.isArray(args)) throw new Error('参数必须是最外层为数组的 JSON');
    } catch (e) {
      return { error: '参数解析失败：' + e.message + '（格式如 [[2,7,11,15], 9]）', stdout: '' };
    }
    const cp = { ...problem, tests: [{ args, expected: null }] };
    const requestError = validateJudgeRequest(code, cp.tests, 'core');
    if (requestError) return { error: requestError, stdout: '' };
    let raw;
    if (lang === 'javascript') {
      raw = await runJsWorker(jsCoreSource(cp, code), JS_TIMEOUT);
    } else {
      raw = await runPythonJob(
        {
          mode: 'core',
          code,
          testsJson: JSON.stringify(cp.tests),
          fname: problem.functionName,
          argSpecJson: JSON.stringify(problem.argSpec || null),
          contractJson: JSON.stringify(problem.judgeContract || null),
          resultKind: problem.resultKind || 'plain',
          design: !!problem.design,
          cname: problem.className || null,
        },
        onStatus
      );
    }
    if (raw.timeout) return { error: '执行超时（疑似死循环）' + (lang === 'python' ? '，Python 环境已自动重置' : ''), stdout: '' };
    if (raw.compileError) return { error: raw.compileError, stdout: '' };
    const r = raw.results[0];
    if (!r.ok) return { error: r.error, stdout: r.stdout || '' };
    return { output: fmtValue(r.got), stdout: r.stdout || '' };
  }
  // ACM 模式：input 直接作为标准输入
  const cp = { ...problem, acmTests: [{ input, output: '' }] };
  const requestError = validateJudgeRequest(code, cp.acmTests, 'acm');
  if (requestError) return { error: requestError, stdout: '' };
  let raw;
  if (lang === 'javascript') {
    raw = await runJsWorker(jsAcmSource(cp, code), JS_TIMEOUT);
  } else {
    raw = await runPythonJob(
      {
        mode: 'acm',
        code,
        testsJson: JSON.stringify(cp.acmTests),
        fname: null,
        argSpecJson: 'null',
        contractJson: 'null',
        resultKind: 'plain',
        design: false,
        cname: null,
      },
      onStatus
    );
  }
  if (raw.timeout) return { error: '执行超时（疑似死循环）' + (lang === 'python' ? '，Python 环境已自动重置' : ''), stdout: '' };
  if (raw.compileError) return { error: raw.compileError, stdout: '' };
  const r = raw.results[0];
  if (!r.ok) return { error: r.error, output: r.stdout, stdout: r.stdout || '' };
  return { output: r.stdout || '（无输出）', stdout: r.stdout || '' };
}

// 测试专用导出（视图层请勿依赖）
export const __testing = {
  jsCoreSource,
  jsDesignSource,
  jsAcmSource,
  buildVerdict,
  PY_CORE_HARNESS,
  PY_DESIGN_HARNESS,
  PY_ACM_HARNESS,
};
