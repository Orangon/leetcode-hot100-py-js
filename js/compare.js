// 结果比对逻辑：核心代码模式按结构化数据比对，ACM 模式按文本输出比对。

// 深比较（测试数据只含 JSON 可序列化值：数字/字符串/布尔/null/数组/普通对象）
export function deepEqual(a, b, numericTolerance = 0) {
  if (a === b) return true;
  if (typeof a === 'number' && typeof b === 'number') {
    return Number.isFinite(a) && Number.isFinite(b) && Math.abs(a - b) <= numericTolerance;
  }
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (!deepEqual(a[i], b[i], numericTolerance)) return false;
    }
    return true;
  }
  if (a && b && typeof a === 'object' && typeof b === 'object') {
    const ka = Object.keys(a);
    const kb = Object.keys(b);
    if (ka.length !== kb.length) return false;
    return ka.every(
      (k) => Object.prototype.hasOwnProperty.call(b, k) && deepEqual(a[k], b[k], numericTolerance)
    );
  }
  return false;
}

// 树辅助（balancedBst 策略用）：层序数组 -> 二叉树
function treeFromLevel(arr) {
  if (!arr.length || arr[0] == null) return null;
  const nodes = arr.map((v) => (v == null ? null : { val: v, left: null, right: null }));
  let j = 1;
  for (let i = 0; i < nodes.length; i++) {
    if (!nodes[i]) continue;
    if (j < nodes.length) nodes[i].left = nodes[j++] || null;
    if (j < nodes.length) nodes[i].right = nodes[j++] || null;
  }
  return nodes[0];
}

function inorder(node, out) {
  if (!node) return;
  inorder(node.left, out);
  out.push(node.val);
  inorder(node.right, out);
}

function heightOk(node) {
  if (!node) return 0;
  const l = heightOk(node.left);
  if (l < 0) return -1;
  const r = heightOk(node.right);
  if (r < 0) return -1;
  return Math.abs(l - r) > 1 ? -1 : Math.max(l, r) + 1;
}

function multisetEqual(expected, got, elementEqual) {
  if (!Array.isArray(expected) || !Array.isArray(got) || expected.length !== got.length) return false;
  const used = new Array(got.length).fill(false);
  outer: for (const item of expected) {
    for (let i = 0; i < got.length; i++) {
      if (!used[i] && elementEqual(item, got[i])) {
        used[i] = true;
        continue outer;
      }
    }
    return false;
  }
  return true;
}

function nestedMultisetEqual(expected, got, numericTolerance) {
  if (Array.isArray(expected) || Array.isArray(got)) {
    return multisetEqual(expected, got, (a, b) => nestedMultisetEqual(a, b, numericTolerance));
  }
  return deepEqual(expected, got, numericTolerance);
}

// 核心模式比对策略：nestedMultiset 会在每一层数组递归忽略顺序。
export function compareResult(expected, got, strategy, numericTolerance = 0) {
  if (strategy === 'anyOf') {
    return Array.isArray(expected) && expected.some((e) => deepEqual(e, got, numericTolerance));
  }
  if (strategy === 'balancedBst') {
    if (!Array.isArray(expected) || !Array.isArray(got)) return false;
    const root = treeFromLevel(got);
    const seq = [];
    inorder(root, seq);
    if (!deepEqual(seq, expected, numericTolerance)) return false;
    return heightOk(root) >= 0;
  }
  if (strategy === 'sortedArray') {
    if (!Array.isArray(expected) || !Array.isArray(got)) return false;
    const norm = (arr) => [...arr].sort((x, y) => (x > y ? 1 : x < y ? -1 : 0));
    return deepEqual(norm(expected), norm(got), numericTolerance);
  }
  if (strategy === 'multiset') {
    return multisetEqual(expected, got, (a, b) => deepEqual(a, b, numericTolerance));
  }
  if (strategy === 'nestedMultiset') {
    return nestedMultisetEqual(expected, got, numericTolerance);
  }
  return deepEqual(expected, got, numericTolerance);
}

// ACM 空行属于输出的一部分；只统一换行符并忽略每行行尾水平空白。
// 数值容差默认关闭，只有题目显式配置 numericTolerance 时才启用。
export function compareAcmOutput(expected, stdout, numericTolerance = null) {
  const norm = (s) =>
    String(s)
      .replace(/\r\n?/g, '\n')
      .split('\n')
      .map((line) => line.replace(/[ \t]+$/g, ''))
      .join('\n');
  const a = norm(expected);
  const b = norm(stdout);
  if (a === b) return true;
  if (numericTolerance === null || numericTolerance < 0 || !Number.isFinite(numericTolerance)) return false;
  const expectedLines = a.split('\n');
  const actualLines = b.split('\n');
  if (expectedLines.length !== actualLines.length) return false;
  return expectedLines.every((line, i) => lineEqual(line, actualLines[i], numericTolerance));
}

function lineEqual(expected, actual, numericTolerance) {
  if (expected === actual) return true;
  const expectedTokens = expected.split(/\s+/);
  const actualTokens = actual.split(/\s+/);
  if (expectedTokens.length !== actualTokens.length) return false;
  return expectedTokens.every((token, i) => {
    if (token === actualTokens[i]) return true;
    const a = Number(token);
    const b = Number(actualTokens[i]);
    return token !== '' && actualTokens[i] !== '' && Number.isFinite(a) && Number.isFinite(b) && Math.abs(a - b) <= numericTolerance;
  });
}

// 展示用：把值格式化成短字符串
export function fmtValue(v) {
  try {
    const s = JSON.stringify(v);
    return s === undefined ? String(v) : s;
  } catch {
    return String(v);
  }
}
