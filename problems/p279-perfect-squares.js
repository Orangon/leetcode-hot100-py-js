// 279. 完全平方数
// 普通类型题（整数 -> 整数），无需 argSpec / resultKind
export default {
  id: 279,
  title: '完全平方数',
  slug: 'perfect-squares',
  difficulty: 'medium',
  tags: ['广度优先搜索', '数学', '动态规划'],
  hints: [
    '组成 i 的最优方案若最后选了平方数 j*j，去掉它后必须是 i-j*j 的最优方案，因此问题具有可递推的最优子结构。',
    '使用动态规划，令 dp[i] 表示凑成 i 所需的最少完全平方数个数，枚举最后加入的所有不超过 i 的平方数取最小值。',
    '初始化 dp[0] = 0；对 i 从 1 到 n，枚举 j 满足 j*j <= i，并用 dp[i] = min(dp[i], dp[i-j*j] + 1) 更新。',
    '内层边界必须包含 j*j === i，此时可由 dp[0] 得到答案 1；ACM 模式只读取一个整数 n，最终输出 dp[n] 这一整数。',
  ],

  description: `
给你一个整数 \`n\`，返回和为 \`n\` 的完全平方数的最少数量。

完全平方数是一个整数，其值等于另一个整数的平方。例如 \`1\`、\`4\`、\`9\`、\`16\` 都是完全平方数，而 \`3\` 和 \`11\` 不是。

### 示例

- 输入：\`n = 12\`，输出：\`3\`（12 = 4 + 4 + 4）
- 输入：\`n = 13\`，输出：\`2\`（13 = 4 + 9）

### 提示

- \`1 <= n <= 10^4\`

### ACM 模式输入输出格式

- 输入：一行，整数 \`n\`
- 输出：一个整数，即和为 \`n\` 的完全平方数的最少数量

ACM 输入示例：
\`\`\`
12
\`\`\`
输出：\`3\`
`,

  functionName: 'numSquares',
  compare: 'exact',

  tests: [
    { args: [12], expected: 3 },
    { args: [13], expected: 2 },
    { args: [1], expected: 1 },
    { args: [2], expected: 2 },
    { args: [16], expected: 1 },
    { args: [48], expected: 3 },
    { args: [3], expected: 3 },
    { args: [7], expected: 4 },
    { args: [10000], expected: 1 },
    { args: [9999], expected: 4 },
  ],

  acmTests: [
    { input: '12\n', output: '3\n' },
    { input: '13\n', output: '2\n' },
    { input: '1\n', output: '1\n' },
    { input: '2\n', output: '2\n' },
    { input: '16\n', output: '1\n' },
    { input: '48\n', output: '3\n' },
    { input: '3\n', output: '3\n' },
    { input: '7\n', output: '4\n' },
    { input: '10000\n', output: '1\n' },
    { input: '9999\n', output: '4\n' },
  ],

  templates: {
    core: {
      javascript: `/**
 * @param {number} n
 * @return {number}
 */
var numSquares = function(n) {
    
};
`,
      python: `def numSquares(n):
    # 返回和为 n 的完全平方数的最少数量
    pass
`,
    },
    acm: {
      javascript: `// ACM 模式：input 是全部输入（字符串），用 console.log 输出答案
// 输入格式：一行，整数 n
const n = Number(input.trim());

// 在这里写你的代码，用 console.log 输出最少完全平方数的个数

`,
      python: `# ACM 模式：用 input() 或 sys.stdin 读输入，用 print 输出答案
# 输入格式：一行，整数 n
import sys

n = int(sys.stdin.read().strip())

# 在这里写你的代码，用 print 输出最少完全平方数的个数
`,
    },
  },

  solutions: {
    core: {
      javascript: `var numSquares = function(n) {
  // dp[i] = 和为 i 的完全平方数的最少数量
  const dp = new Array(n + 1).fill(0);
  for (let i = 1; i <= n; i++) {
    let best = Infinity;
    for (let j = 1; j * j <= i; j++) {
      best = Math.min(best, dp[i - j * j]);
    }
    dp[i] = best + 1;
  }
  return dp[n];
};
`,
      python: `def numSquares(n):
    # dp[i] = 和为 i 的完全平方数的最少数量
    dp = [0] * (n + 1)
    for i in range(1, n + 1):
        best = i  # 上界：i 个 1 相加
        j = 1
        while j * j <= i:
            if dp[i - j * j] < best:
                best = dp[i - j * j]
            j += 1
        dp[i] = best + 1
    return dp[n]
`,
    },
    acm: {
      javascript: `const n = Number(input.trim());

// dp[i] = 和为 i 的完全平方数的最少数量
const dp = new Array(n + 1).fill(0);
for (let i = 1; i <= n; i++) {
  let best = Infinity;
  for (let j = 1; j * j <= i; j++) {
    best = Math.min(best, dp[i - j * j]);
  }
  dp[i] = best + 1;
}
console.log(dp[n]);
`,
      python: `import sys

n = int(sys.stdin.read().strip())

# dp[i] = 和为 i 的完全平方数的最少数量
dp = [0] * (n + 1)
for i in range(1, n + 1):
    best = i  # 上界：i 个 1 相加
    j = 1
    while j * j <= i:
        if dp[i - j * j] < best:
            best = dp[i - j * j]
        j += 1
    dp[i] = best + 1

print(dp[n])
`,
    },
  },

  idea: `
**动态规划（推荐）**：\`dp[i]\` 表示和为 \`i\` 的完全平方数的最少数量。若组成 \`i\` 的最后一个平方数是 \`j*j\`，则 \`dp[i] = dp[i - j*j] + 1\`，枚举所有 \`j*j <= i\` 取最小值即可。初始 \`dp[0] = 0\` 是递推基准。时间复杂度 O(n·√n)，空间 O(n)。

**BFS**：把问题看成无权图最短路——从 \`n\` 出发，每步减去一个不超过当前值的平方数，到达 0 的最短步数就是答案。用队列逐层扩展，第一次到达 0 时的层数即为结果，复杂度同为 O(n·√n)。

**数学**：拉格朗日四平方和定理保证答案不超过 4，再配合勒让德三平方和定理可以把答案分类到 1~4，复杂度降到 O(√n)，但数论推导繁琐，面试中 DP 或 BFS 更稳妥。

参考答案采用动态规划：转移直白、边界少、不易写错。
`,

  explanation: `
- \`dp[i]\` 含义：和为 \`i\` 的完全平方数的最少数量；\`dp[0] = 0\` 表示「0 不需要任何平方数」
- 外层循环从 1 到 n 逐个计算；内层枚举最后选用的平方数 \`j*j\`（满足 \`j*j <= i\`）
- 转移方程：\`dp[i] = min(dp[i - j*j]) + 1\`——选定 \`j*j\` 后，剩余 \`i - j*j\` 的最优解之前已经算过
- 初始化上界：\`i\` 最坏情况由 \`i\` 个 \`1\` 组成，所以 Python 版把 \`best\` 初始为 \`i\`，JS 版用 \`Infinity\`（内层循环至少会命中 \`j = 1\`，\`best\` 一定会被更新）
- 当 \`i\` 本身是完全平方数时，\`j*j = i\` 命中 \`dp[0] = 0\`，结果自然为 1，不需要特判

ACM 版本从标准输入读一个整数 \`n\`，跑同样的 DP 后输出 \`dp[n]\`，算法与核心代码模式完全一致。
`,
};
