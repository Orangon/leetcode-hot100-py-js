import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import { execFileSync } from 'node:child_process';

import { compareAcmOutput, compareResult, deepEqual } from './compare.js';
import { JUDGE_LIMITS, validateJudgeRequest, validateResultValue } from './judge-contract.js';
import { __testing } from './judge.js';
import groupAnagrams from '../problems/p049-group-anagrams.js';
import subsets from '../problems/p078-subsets.js';
import copyRandomList from '../problems/p138-copy-list-with-random-pointer.js';
import lowestCommonAncestor from '../problems/p236-lowest-common-ancestor-of-a-binary-tree.js';
import lruCache from '../problems/p146-lru-cache.js';

test('nestedMultiset recursively ignores array order and keeps multiplicity', () => {
  assert.equal(compareResult([[1, 2], [3]], [[3], [2, 1]], 'nestedMultiset'), true);
  assert.equal(compareResult([[1, 1]], [[1]], 'nestedMultiset'), false);
});

test('deepEqual requires matching own keys', () => {
  const actual = Object.create({ x: 1 });
  actual.y = 2;
  assert.equal(deepEqual({ x: 1 }, actual), false);
});

test('ACM comparison preserves blank lines and uses only configured tolerance', () => {
  assert.equal(compareAcmOutput('\n1\n', '1\n'), false);
  assert.equal(compareAcmOutput('\n', ''), false);
  assert.equal(compareAcmOutput('1.0\n', '1.0001\n'), false);
  assert.equal(compareAcmOutput('1.0\n', '1.0001\n', 0.001), true);
  assert.equal(compareAcmOutput('x  \n', 'x\n'), true);
});

test('judge quotas reject oversized requests and unserializable results', () => {
  assert.match(validateJudgeRequest('x'.repeat(JUDGE_LIMITS.codeBytes + 1), [], 'core'), /代码超出限制/);
  assert.match(validateJudgeRequest('', [{ input: 'x'.repeat(JUDGE_LIMITS.inputBytes + 1) }], 'acm'), /输入超出限制/);
  const cyclic = {};
  cyclic.self = cyclic;
  assert.match(validateResultValue(cyclic), /无法序列化/);
  const shared = {};
  assert.equal(validateResultValue([shared, shared]), null);
  assert.match(validateResultValue(() => {}), /不可序列化/);
  assert.match(validateResultValue(Promise.resolve(1)), /Promise/);
});

test('owned problem files expose the intended judge contracts', () => {
  assert.equal(groupAnagrams.compare, 'nestedMultiset');
  assert.equal(subsets.compare, 'nestedMultiset');
  assert.deepEqual(copyRandomList.judgeContract, { preserveRandomListArg: 0, deepCopyRandomListArg: 0 });
  assert.deepEqual(lowestCommonAncestor.judgeContract, { returnNodeFromTreeArg: 0 });
  assert.equal(lruCache.design, true);
});

// ---------- 判题 harness 契约（JS harness 在 node:vm 中执行，Python harness 用本机 python3 执行） ----------

const { jsCoreSource, jsAcmSource, buildVerdict, PY_CORE_HARNESS, PY_DESIGN_HARNESS, PY_ACM_HARNESS } = __testing;

// 在与 Worker 等价的环境中执行生成的 harness：外包一层 IIFE（同 runJsWorker），
// harness 帧带文件名，用户代码帧保持 V8 的 <anonymous>:行:列 格式。
function runHarnessSource(src) {
  const sent = [];
  globalThis.__judgeSend = (data) => sent.push(data);
  try {
    vm.runInThisContext(`(() => {\n${src}\n})();`, { filename: 'judge-harness.js' });
  } finally {
    delete globalThis.__judgeSend;
  }
  return sent;
}

test('JS core 模式捕获 console 输出并给出用户代码行号', () => {
  const problem = { functionName: 'f', tests: [{ args: [[]], expected: null }] };
  const code = 'function f(a) {\n  console.log("dbg", a);\n  return a[5].x;\n}';
  const [payload] = runHarnessSource(jsCoreSource(problem, code));
  const r = payload.results[0];
  assert.equal(r.ok, false);
  assert.equal(r.errorLine, 3);
  assert.equal(r.stdout, 'dbg []\n');
  assert.ok(!r.error.includes('\n'), 'error 应为单行 message');
  assert.match(r.error, /Cannot read properties/);
  assert.match(r.rawError, /TypeError: Cannot read properties/);
});

test('JS core 通过的用例同样带 stdout', () => {
  const problem = { functionName: 'f', tests: [{ args: [1], expected: 2 }] };
  const [payload] = runHarnessSource(jsCoreSource(problem, 'function f(x) { console.info("ok"); return x + 1; }'));
  assert.deepEqual(payload.results[0], { ok: true, got: 2, stdout: 'ok\n' });
});

test('JS design 模式捕获 console 与错误行号', () => {
  const problem = { design: true, className: 'Foo', tests: [{ ops: ['Foo', 'bar'], params: [[], []], expected: null }] };
  const code = 'class Foo {\n  bar() {\n    console.warn("w", 1);\n    throw new Error("bad");\n  }\n}';
  const [payload] = runHarnessSource(jsCoreSource(problem, code));
  const r = payload.results[0];
  assert.equal(r.ok, false);
  assert.equal(r.error, 'bad');
  assert.equal(r.errorLine, 4);
  assert.equal(r.stdout, 'w 1\n');
});

test('JS 编译错误取单行 message，原始堆栈放入 rawError', () => {
  const problem = { functionName: 'f', tests: [{ args: [], expected: null }] };
  const [payload] = runHarnessSource(jsCoreSource(problem, 'function f( {'));
  assert.match(payload.compileError, /Unexpected token/);
  assert.ok(!payload.compileError.includes('\n'));
  assert.match(payload.rawError, /SyntaxError/);
});

test('fakeConsole 兼容特殊值且绝不因不可序列化抛错', () => {
  const problem = { acmTests: [{ input: '', output: '' }] };
  const code = [
    'console.log(undefined, NaN, Infinity, -Infinity);',
    'console.log(Symbol("s"));',
    'console.log(function foo(){});',
    'console.log(new Map([["a", 1]]));',
    'console.log(new Set([1, 2]));',
    'const o = {}; o.self = o; console.log(o);',
    'const m = new Map(); m.set(m, m); console.log(m);',
    'console.error("e"); console.info("i"); console.debug("d");',
  ].join('\n');
  const [payload] = runHarnessSource(jsAcmSource(problem, code));
  const r = payload.results[0];
  assert.equal(r.ok, true);
  assert.equal(
    r.stdout,
    'undefined NaN Infinity -Infinity\n' +
      'Symbol(s)\n' +
      'function foo(){}\n' +
      'Map(1) { a => 1 }\n' +
      'Set(2) { 1, 2 }\n' +
      '[object Object]\n' +
      'Map(1) { [object Map] => [object Map] }\n' +
      'e\ni\nd\n'
  );
});

test('ACM 运行时错误保留已产生输出并给出用户代码行号', () => {
  const problem = { acmTests: [{ input: 'hi', output: '' }] };
  const [payload] = runHarnessSource(jsAcmSource(problem, 'console.log(input);\nthrow new Error("boom");'));
  const r = payload.results[0];
  assert.equal(r.ok, false);
  assert.equal(r.stdout, 'hi');
  assert.equal(r.error, 'boom');
  assert.equal(r.errorLine, 2);
  assert.match(r.rawError, /Error: boom/);
});

test('console 捕获受 stdout 配额限制且配额错误不带行号', () => {
  const problem = { functionName: 'f', tests: [{ args: [], expected: null }] };
  const code = 'function f() {\n  for (let i = 0; i < 2000000; i++) console.log("xxxxxxxxxx");\n}';
  const [payload] = runHarnessSource(jsCoreSource(problem, code));
  const r = payload.results[0];
  assert.equal(r.ok, false);
  assert.match(r.error, /标准输出超出限制/);
  assert.equal(r.errorLine, null);
});

test('buildVerdict 透出首个带行号失败用例的 errorLine', () => {
  const problem = { tests: [{ args: [1], expected: 0 }, { args: [2], expected: 0 }, { args: [3], expected: 3 }] };
  const raw = {
    results: [
      { ok: false, error: 'boom', stdout: 'log\n' },
      { ok: false, error: 'IndexError: nope', errorType: 'IndexError', errorLine: 5 },
      { ok: true, got: 3 },
    ],
  };
  const verdict = buildVerdict(raw, problem, 'core', problem.tests);
  assert.equal(verdict.status, 'fail');
  assert.equal(verdict.errorLine, 5);
  assert.equal(verdict.cases[0].errorType, null);
  assert.equal(verdict.cases[0].errorLine, null);
  assert.equal(verdict.cases[0].stdout, 'log\n');
  assert.equal(verdict.cases[1].errorType, 'IndexError');
  assert.equal(verdict.cases[1].errorLine, 5);
  assert.equal(verdict.cases[2].pass, true);
  assert.equal(verdict.cases[2].stdout, '');
});

test('buildVerdict 在编译错误上保留 rawError 与 errorLine', () => {
  const verdict = buildVerdict(
    { compileError: 'Unexpected token', rawError: 'SyntaxError: Unexpected token\n    at ...', errorLine: 4 },
    { tests: [] },
    'core',
    []
  );
  assert.equal(verdict.status, 'compileError');
  assert.equal(verdict.errorLine, 4);
  assert.match(verdict.rawError, /SyntaxError/);
});

// ---------- Python harness（需要本机 python3，缺失时跳过） ----------

let hasPython = true;
try {
  execFileSync('python3', ['--version'], { stdio: 'pipe' });
} catch {
  hasPython = false;
}

function runPythonHarness(harness, globals) {
  const prelude = Object.entries(globals).map(([key, value]) => `${key} = ${JSON.stringify(value)}`).join('\n');
  const script = `${prelude}\n${harness}\nprint(__out, end='')`;
  const out = execFileSync('python3', ['-'], { input: script, encoding: 'utf8', maxBuffer: 16 * 1024 * 1024 });
  return JSON.parse(out);
}

test('Python core harness 报告 errorType 与用户代码行号', { skip: !hasPython }, () => {
  const payload = runPythonHarness(PY_CORE_HARNESS, {
    __user_code: 'def f(a):\n    return a[10]\n',
    __arg_spec_json: 'null',
    __contract_json: 'null',
    __tests_json: JSON.stringify([{ args: [[1, 2]], expected: null }]),
    __fname: 'f',
    __result_kind: 'plain',
  });
  const r = payload.results[0];
  assert.equal(r.ok, false);
  assert.equal(r.errorType, 'IndexError');
  assert.equal(r.errorLine, 2);
  assert.ok(r.error.startsWith('IndexError: '));
});

test('Python design harness 报告 errorType 与用户代码行号', { skip: !hasPython }, () => {
  const payload = runPythonHarness(PY_DESIGN_HARNESS, {
    __user_code: 'class Foo:\n    def bar(self):\n        return self.missing\n',
    __tests_json: JSON.stringify([{ ops: ['Foo', 'bar'], params: [[], []] }]),
    __cname: 'Foo',
  });
  const r = payload.results[0];
  assert.equal(r.ok, false);
  assert.equal(r.errorType, 'AttributeError');
  assert.equal(r.errorLine, 3);
  assert.ok(r.error.startsWith('AttributeError: '));
});

test('Python ACM harness 报告 errorType 与行号，配额错误不带类型与行号', { skip: !hasPython }, () => {
  const failing = runPythonHarness(PY_ACM_HARNESS, {
    __user_code: 'n = int(input())\nprint(n[5])\n',
    __tests_json: JSON.stringify([{ input: '3', output: '' }]),
  });
  const r = failing.results[0];
  assert.equal(r.ok, false);
  assert.equal(r.errorType, 'TypeError');
  assert.equal(r.errorLine, 2);
  assert.ok(r.error.startsWith('TypeError: '));

  const quota = runPythonHarness(PY_ACM_HARNESS, {
    __user_code: 'while True:\n    print("x" * 1000)\n',
    __tests_json: JSON.stringify([{ input: '', output: '' }]),
  });
  const q = quota.results[0];
  assert.equal(q.ok, false);
  assert.equal(q.errorType, null);
  assert.equal(q.errorLine, null);
  assert.match(q.error, /标准输出超出限制/);
});

test('Python core 模块级运行时错误的 compileError 带行号，契约错误不带类型与行号', { skip: !hasPython }, () => {
  const payload = runPythonHarness(PY_CORE_HARNESS, {
    __user_code: 'import json\nx = undefined_name\n',
    __arg_spec_json: 'null',
    __contract_json: 'null',
    __tests_json: JSON.stringify([{ args: [], expected: null }]),
    __fname: 'f',
    __result_kind: 'plain',
  });
  assert.equal(payload.errorLine, 2);
  assert.ok(payload.compileError.startsWith('NameError: '));

  const contract = runPythonHarness(PY_CORE_HARNESS, {
    __user_code: 'def f(head):\n    head.val = 999\n    return head\n',
    __arg_spec_json: JSON.stringify([{ kind: 'randomList' }]),
    __contract_json: JSON.stringify({ preserveRandomListArg: 0 }),
    __tests_json: JSON.stringify([{ args: [[[1, null]]], expected: null }]),
    __fname: 'f',
    __result_kind: 'randomList',
  });
  const r = contract.results[0];
  assert.equal(r.ok, false);
  assert.equal(r.error, '调用后不得修改输入链表');
  assert.equal(r.errorType, null);
  assert.equal(r.errorLine, null);
});
