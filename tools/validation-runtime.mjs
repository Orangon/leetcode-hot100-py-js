// 与浏览器判题器一致的 Node 端参考答案执行辅助，用于 validator 与负向测试。

export function buildList(values) {
  const dummy = { val: 0, next: null };
  let tail = dummy;
  for (const value of values) {
    tail.next = { val: value, next: null };
    tail = tail.next;
  }
  return dummy.next;
}

function buildCycle(values, pos) {
  const dummy = { val: 0, next: null };
  const nodes = [];
  let tail = dummy;
  for (const value of values) {
    tail.next = { val: value, next: null };
    tail = tail.next;
    nodes.push(tail);
  }
  if (pos >= 0 && pos < nodes.length) tail.next = nodes[pos];
  return dummy.next;
}

function buildTree(values) {
  if (!values?.length || values[0] == null) return null;
  const nodes = values.map((value) => (value == null ? null : { val: value, left: null, right: null }));
  let child = 1;
  for (const node of nodes) {
    if (!node) continue;
    if (child < nodes.length) node.left = nodes[child++] || null;
    if (child < nodes.length) node.right = nodes[child++] || null;
  }
  return nodes[0];
}

function buildRandomList(description) {
  const nodes = description.map(([val]) => ({ val, next: null, random: null }));
  nodes.forEach((node, index) => {
    node.next = nodes[index + 1] || null;
    const randomIndex = description[index][1];
    node.random = randomIndex === null ? null : nodes[randomIndex];
  });
  return nodes[0] || null;
}

function buildIntersect(shared, aOnly, bOnly) {
  const sharedHead = buildList(shared);
  const attach = (prefix) => {
    if (!prefix.length) return sharedHead;
    const head = buildList(prefix);
    let tail = head;
    while (tail.next) tail = tail.next;
    tail.next = sharedHead;
    return head;
  };
  return [attach(aOnly), attach(bOnly)];
}

export function buildArgs(spec, rawArgs) {
  const result = [];
  const treeCache = new Map();
  const getTree = (index) => {
    if (!treeCache.has(index)) treeCache.set(index, buildTree(rawArgs[index]));
    return treeCache.get(index);
  };
  const findTreeNode = (root, value) => {
    const queue = root ? [root] : [];
    while (queue.length) {
      const node = queue.shift();
      if (node.val === value) return node;
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    return null;
  };

  for (let index = 0; index < rawArgs.length; index += 1) {
    const entry = spec?.[index];
    const kind = entry?.kind || 'plain';
    if (kind === 'skip') continue;
    if (kind === 'list') result.push(buildList(rawArgs[index]));
    else if (kind === 'cycleList') result.push(buildCycle(rawArgs[index], rawArgs[entry.posArg]));
    else if (kind === 'tree') result.push(getTree(index));
    else if (kind === 'treeNode') result.push(findTreeNode(getTree(entry.treeArg), rawArgs[index]));
    else if (kind === 'listArray') result.push(rawArgs[index].map(buildList));
    else if (kind === 'randomList') result.push(buildRandomList(rawArgs[index]));
    else if (kind === 'intersectLists') result.push(...buildIntersect(rawArgs[index], rawArgs[index + 1], rawArgs[index + 2]));
    else result.push(structuredClone(rawArgs[index]));
  }
  return result;
}

function listToArray(head) {
  const result = [];
  for (let guard = 0; head && guard < 100000; guard += 1, head = head.next) result.push(head.val);
  return result;
}

function treeToArray(root) {
  if (!root) return [];
  const result = [];
  const queue = [root];
  while (queue.length) {
    const node = queue.shift();
    if (node) {
      result.push(node.val);
      queue.push(node.left, node.right);
    } else result.push(null);
  }
  while (result.at(-1) === null) result.pop();
  return result;
}

function randomNodes(head) {
  const nodes = [];
  const seen = new Set();
  while (head && nodes.length < 100000) {
    if (seen.has(head)) throw new Error('链表 next 指针形成环');
    seen.add(head);
    nodes.push(head);
    head = head.next;
  }
  if (head) throw new Error('链表过长');
  return nodes;
}

function randomListToArray(head) {
  const nodes = randomNodes(head);
  const index = new Map(nodes.map((node, i) => [node, i]));
  return nodes.map((node) => {
    if (node.random !== null && node.random !== undefined && !index.has(node.random)) {
      throw new Error('random 必须指向返回链表中的节点或 null');
    }
    return [node.val, node.random == null ? null : index.get(node.random)];
  });
}

function nodeIndex(head, target) {
  for (let index = 0, guard = 0; head && guard < 100000; index += 1, guard += 1, head = head.next) {
    if (head === target) return index;
  }
  return -1;
}

function treeContains(root, target) {
  if (!target) return false;
  const queue = root ? [root] : [];
  while (queue.length) {
    const node = queue.shift();
    if (node === target) return true;
    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
  }
  return false;
}

function contractBefore(args, contract) {
  const state = {};
  if (contract?.preserveRandomListArg !== undefined) {
    state.randomSnapshot = JSON.stringify(randomListToArray(args[contract.preserveRandomListArg]));
  }
  return state;
}

function contractAfter(args, value, contract, state) {
  if (!contract) return;
  if (contract.preserveRandomListArg !== undefined
      && JSON.stringify(randomListToArray(args[contract.preserveRandomListArg])) !== state.randomSnapshot) {
    throw new Error('调用后不得修改输入链表');
  }
  if (contract.deepCopyRandomListArg !== undefined) {
    const originals = new Set(randomNodes(args[contract.deepCopyRandomListArg]));
    if (randomNodes(value).some((node) => originals.has(node))) throw new Error('必须返回由全新节点组成的深拷贝');
    randomListToArray(value);
  }
  if (contract.returnNodeFromTreeArg !== undefined && !treeContains(args[contract.returnNodeFromTreeArg], value)) {
    throw new Error('必须返回输入树中的节点对象');
  }
}

function serialize(value, kind, args) {
  if (kind === 'list') return listToArray(value);
  if (kind === 'tree') return treeToArray(value);
  if (kind === 'randomList') return randomListToArray(value);
  if (kind === 'nodeVal') return value == null ? null : value.val;
  if (kind === 'nodeIndex') return nodeIndex(args[0], value);
  if (kind === 'inputTree') return treeToArray(args[0]);
  if (kind === 'inputArray') return args[0];
  return value;
}

export function runJavascriptCore(problem, code = problem.solutions.core.javascript) {
  if (problem.design) return runJavascriptDesign(problem, code);
  let fn;
  try {
    fn = new Function(`${code}\n;return typeof ${problem.functionName} === 'function' ? ${problem.functionName} : null;`)();
  } catch (error) {
    return { compileError: error.message, results: [] };
  }
  if (!fn) return { compileError: `未找到函数 ${problem.functionName}`, results: [] };
  const results = problem.tests.map((test) => {
    try {
      const args = buildArgs(problem.argSpec, test.args);
      const state = contractBefore(args, problem.judgeContract);
      const value = fn(...args);
      if (value && typeof value.then === 'function') throw new Error('不支持 Promise 返回值');
      contractAfter(args, value, problem.judgeContract, state);
      return { ok: true, got: serialize(value, problem.resultKind || 'plain', args) };
    } catch (error) {
      return { ok: false, error: error.message };
    }
  });
  return { results };
}

export function runJavascriptDesign(problem, code = problem.solutions.core.javascript) {
  let ClassValue;
  try {
    ClassValue = new Function(`${code}\n;return typeof ${problem.className} === 'function' ? ${problem.className} : null;`)();
  } catch (error) {
    return { compileError: error.message, results: [] };
  }
  if (!ClassValue) return { compileError: `未找到类 ${problem.className}`, results: [] };
  const results = problem.tests.map((test) => {
    try {
      let instance = null;
      const got = [];
      test.ops.forEach((operation, index) => {
        if (operation === problem.className) {
          instance = new ClassValue(...test.params[index]);
          got.push(null);
        } else {
          const value = instance[operation](...test.params[index]);
          if (value && typeof value.then === 'function') throw new Error('不支持 Promise 返回值');
          got.push(value === undefined ? null : value);
        }
      });
      return { ok: true, got };
    } catch (error) {
      return { ok: false, error: error.message };
    }
  });
  return { results };
}
