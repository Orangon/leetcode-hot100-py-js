// 62. 不同路径
// 普通类型题（两个整数 -> 整数），无需 argSpec / resultKind
export default {
  id: 62,
  title: '不同路径',
  slug: 'unique-paths',
  difficulty: 'medium',
  tags: ['数学', '动态规划', '组合数学'],
  hints: [
    '到达任一非边界格的最后一步只可能来自上方或左方，所以该格路径数是这两个前驱路径数之和。',
    '使用一维滚动动态规划保存当前行，第一行和第一列的路径数均为 1。',
    '初始化长度为 n 的 dp 全为 1，从第二行开始令 dp[j] += dp[j - 1]，最终 dp[n - 1] 即右下角答案。',
    'm 或 n 为 1 时循环应自然返回 1；ACM 仅一行输入 m n，题目保证答案不超过 2*10^9，输出单个整数。',
  ],

  description: `
一个机器人位于一个 \`m x n\` 网格的左上角（起始点）。

机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（终点）。

问总共有多少条不同的路径？

### 示例

- 输入：\`m = 3, n = 7\`，输出：\`28\`
- 输入：\`m = 3, n = 2\`，输出：\`3\`（下下右、下右下、右下下）
- 输入：\`m = 7, n = 3\`，输出：\`28\`
- 输入：\`m = 3, n = 3\`，输出：\`6\`

### 提示

- \`1 <= m, n <= 100\`
- 题目数据保证答案小于等于 \`2 * 10^9\`

### ACM 模式输入输出格式

- 输入：仅一行，两个整数 \`m n\`（空格分隔）
- 输出：一个整数，即不同的路径总数

ACM 输入示例：
\`\`\`
3 7
\`\`\`
输出：\`28\`
`,

  functionName: 'uniquePaths',
  compare: 'exact',

  tests: [
    { args: [3, 7], expected: 28 },
    { args: [3, 2], expected: 3 },
    { args: [1, 1], expected: 1 },
    { args: [7, 3], expected: 28 },
    { args: [1, 10], expected: 1 },
    { args: [10, 10], expected: 48620 },
    { args: [2, 2], expected: 2 },
    { args: [100, 3], expected: 5050 },
    { args: [17, 9], expected: 735471 },
    { args: [23, 12], expected: 193536720 },
  ],

  acmTests: [
    { input: '3 7\n', output: '28\n' },
    { input: '3 2\n', output: '3\n' },
    { input: '1 1\n', output: '1\n' },
    { input: '7 3\n', output: '28\n' },
    { input: '1 10\n', output: '1\n' },
    { input: '10 10\n', output: '48620\n' },
    { input: '2 2\n', output: '2\n' },
    { input: '100 3\n', output: '5050\n' },
    { input: '17 9\n', output: '735471\n' },
    { input: '23 12\n', output: '193536720\n' },
  ],

  templates: {
    core: {
      javascript: `/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function(m, n) {
    
};
`,
      python: `def uniquePaths(m, n):
    # 返回从网格左上角到右下角的不同路径总数
    pass
`,
    },
    acm: {
      javascript: `// ACM 模式：input 是全部输入（字符串），用 console.log 输出答案
// 输入格式：仅一行，两个整数 m n（空格分隔）
const [m, n] = input.trim().split(/\\s+/).map(Number);

// 在这里写你的代码，用 console.log 输出路径总数

`,
      python: `# ACM 模式：用 input() 或 sys.stdin 读输入，用 print 输出答案
# 输入格式：仅一行，两个整数 m n（空格分隔）
import sys

m, n = map(int, sys.stdin.read().split())

# 在这里写你的代码，用 print 输出路径总数
`,
    },
  },

  solutions: {
    core: {
      javascript: `var uniquePaths = function(m, n) {
  const dp = new Array(n).fill(1); // dp[j]：到达当前行第 j 列的路径数，初始为第一行
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[j] += dp[j - 1]; // f(i, j) = f(i-1, j) + f(i, j-1)
    }
  }
  return dp[n - 1];
};
`,
      python: `def uniquePaths(m, n):
    dp = [1] * n  # dp[j]：到达当前行第 j 列的路径数，初始为第一行
    for _ in range(1, m):
        for j in range(1, n):
            dp[j] += dp[j - 1]  # f(i, j) = f(i-1, j) + f(i, j-1)
    return dp[n - 1]
`,
    },
    acm: {
      javascript: `const [m, n] = input.trim().split(/\\s+/).map(Number);

const dp = new Array(n).fill(1);
for (let i = 1; i < m; i++) {
  for (let j = 1; j < n; j++) {
    dp[j] += dp[j - 1];
  }
}
console.log(dp[n - 1]);
`,
      python: `import sys

m, n = map(int, sys.stdin.read().split())

dp = [1] * n
for _ in range(1, m):
    for j in range(1, n):
        dp[j] += dp[j - 1]

print(dp[n - 1])
`,
    },
  },

  idea: `
到达格子 \`(i, j)\` 的最后一步只有两种可能：从上方 \`(i-1, j)\` 向下走一步，或从左方 \`(i, j-1)\` 向右走一步。因此路径数满足 \`f(i, j) = f(i-1, j) + f(i, j-1)\`；第一行和第一列都只有 1 条路径（只能一直向右或一直向下），是递推的边界。

**动态规划（推荐）**：按上述递推式自底向上填表。由于 \`f(i, j)\` 只依赖上一行同列和当前行左侧的值，可以把二维表压缩成一维滚动数组。时间 O(m×n)，空间 O(n)。

**组合数学**：从左上角到右下角一共要走 \`m + n - 2\` 步，其中恰好有 \`m - 1\` 步向下（其余向右），答案即组合数 \`C(m + n - 2, m - 1)\`。时间 O(min(m, n))，空间 O(1)，但中间乘积较大，部分语言里要注意溢出。

参考答案采用一维滚动数组的动态规划。
`,

  explanation: `
- \`dp[j]\` 表示到达当前行第 \`j\` 列的路径数；初始全为 1，相当于先填好第一行（只能一路向右，每格都只有 1 条路径）
- 从第二行开始逐行更新：\`dp[j] += dp[j - 1]\`
  - 更新前的 \`dp[j]\` 是上一行同列的值（从上方来的路径数）
  - \`dp[j - 1]\` 是本行刚更新过的值（从左方来的路径数）
  - 两者相加正是 \`f(i, j) = f(i-1, j) + f(i, j-1)\`
- 内层循环必须从 \`j = 1\` 开始：\`dp[0]\` 始终是 1（第一列只能一直向下）
- \`m = 1\` 时外层循环不执行，直接返回 \`dp[n - 1] = 1\`，天然覆盖单行边界；\`n = 1\` 同理
- 答案是 \`dp[n - 1]\`，即右下角的路径数

ACM 版本读入一行的两个整数 \`m n\`，算法与核心代码模式完全一致，最后输出 \`dp[n - 1]\`。
`,
};
