// 判题器共享资源边界与纯校验函数。
export const JUDGE_LIMITS = Object.freeze({
  codeBytes: 128 * 1024,
  inputBytes: 512 * 1024,
  stdoutBytes: 1024 * 1024,
  resultBytes: 1024 * 1024,
  resultDepth: 64,
  resultNodes: 100000,
});

const encoder = new TextEncoder();

export function utf8Bytes(value) {
  return encoder.encode(String(value)).byteLength;
}

export function quotaError(kind, limit) {
  const labels = {
    code: '代码',
    input: '输入',
    stdout: '标准输出',
    result: '返回结构',
  };
  return `${labels[kind] || kind}超出限制（最多 ${limit} 字节）`;
}

export function validateJudgeRequest(code, tests, mode) {
  if (utf8Bytes(code) > JUDGE_LIMITS.codeBytes) {
    return quotaError('code', JUDGE_LIMITS.codeBytes);
  }
  for (const test of tests || []) {
    const input = mode === 'core' ? JSON.stringify(test.args ?? test.params ?? null) : test.input ?? '';
    if (utf8Bytes(input) > JUDGE_LIMITS.inputBytes) {
      return quotaError('input', JUDGE_LIMITS.inputBytes);
    }
  }
  return null;
}

export function validateResultValue(value, limits = JUDGE_LIMITS) {
  const seen = new Set();
  const stack = [{ value, depth: 0 }];
  let nodes = 0;
  while (stack.length) {
    const current = stack.pop();
    const item = current.value;
    nodes += 1;
    if (nodes > limits.resultNodes || current.depth > limits.resultDepth) {
      return '返回结构过大或嵌套过深';
    }
    if (item === null || ['string', 'boolean'].includes(typeof item)) continue;
    if (typeof item === 'number') {
      if (!Number.isFinite(item)) return '返回值包含不可序列化的非有限数字';
      continue;
    }
    if (typeof item !== 'object') return `返回值包含不可序列化的 ${typeof item}`;
    if (typeof item.then === 'function') return '不支持 Promise 返回值，请返回同步结果';
    if (seen.has(item)) continue;
    seen.add(item);
    for (const key of Object.keys(item)) stack.push({ value: item[key], depth: current.depth + 1 });
  }
  let json;
  try {
    json = JSON.stringify(value);
  } catch {
    return '返回值无法序列化';
  }
  if (json === undefined) return '返回值不可序列化';
  if (utf8Bytes(json) > limits.resultBytes) return quotaError('result', limits.resultBytes);
  return null;
}
