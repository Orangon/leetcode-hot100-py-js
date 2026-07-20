// 70. 爬楼梯
// 普通类型题（整数 -> 整数），无需 argSpec / resultKind
export default {
  id: 70,
  title: '爬楼梯',
  slug: 'climbing-stairs',
  difficulty: 'easy',
  tags: ['记忆化搜索', '数学', '动态规划'],
  hints: [
    '到达第 n 阶的最后一步不是跨 1 阶就是跨 2 阶，因此方法数满足 f(n) = f(n-1) + f(n-2)。',
    '这是平移后的斐波那契递推，只需两个变量滚动保存前两项即可做到 O(n) 时间、O(1) 空间。',
    '令 a = f(0) = 1、b = f(1) = 1，从 i = 2 到 n 反复更新 a, b = b, a + b，最后返回 b。',
    'n = 1 时循环不执行仍应返回 1；ACM 输入只有一行 n，n <= 45 时普通整数可精确表示，输出方法数。',
  ],

  description: `
假设你正在爬楼梯。需要 \`n\` 阶你才能到达楼顶。

每次你可以爬 \`1\` 或 \`2\` 个台阶。你有多少种不同的方法可以爬到楼顶呢？

### 示例

- 输入：\`n = 2\`，输出：\`2\`（1 阶 + 1 阶，或者直接 2 阶）
- 输入：\`n = 3\`，输出：\`3\`（1+1+1、1+2、2+1）

### 提示

- \`1 <= n <= 45\`

### ACM 模式输入输出格式

- 输入：一行，整数 \`n\`
- 输出：一个整数，即不同的爬楼方法数

ACM 输入示例：
\`\`\`
3
\`\`\`
输出：\`3\`
`,

  functionName: 'climbStairs',
  compare: 'exact',

  tests: [
    { args: [1], expected: 1 },
    { args: [2], expected: 2 },
    { args: [3], expected: 3 },
    { args: [5], expected: 8 },
    { args: [10], expected: 89 },
    { args: [45], expected: 1836311903 },
    { args: [4], expected: 5 },
    { args: [6], expected: 13 },
    { args: [27], expected: 317811 },
    { args: [44], expected: 1134903170 },
  ],

  acmTests: [
    { input: '1\n', output: '1\n' },
    { input: '2\n', output: '2\n' },
    { input: '3\n', output: '3\n' },
    { input: '5\n', output: '8\n' },
    { input: '10\n', output: '89\n' },
    { input: '45\n', output: '1836311903\n' },
    { input: '4\n', output: '5\n' },
    { input: '6\n', output: '13\n' },
    { input: '27\n', output: '317811\n' },
    { input: '44\n', output: '1134903170\n' },
  ],

  templates: {
    core: {
      javascript: `/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function(n) {
    
};
`,
      python: `def climbStairs(n):
    # 返回爬到 n 阶楼顶的不同方法数
    pass
`,
    },
    acm: {
      javascript: `// ACM 模式：input 是全部输入（字符串），用 console.log 输出答案
// 输入格式：一行，整数 n
const n = Number(input.trim());

// 在这里写你的代码，用 console.log 输出方法数

`,
      python: `# ACM 模式：用 input() 或 sys.stdin 读输入，用 print 输出答案
# 输入格式：一行，整数 n
import sys

n = int(sys.stdin.read().strip())

# 在这里写你的代码，用 print 输出方法数
`,
    },
  },

  solutions: {
    core: {
      javascript: `var climbStairs = function(n) {
  let a = 1; // f(i-2)，初始为 f(0)
  let b = 1; // f(i-1)，初始为 f(1)
  for (let i = 2; i <= n; i++) {
    const c = a + b; // f(i) = f(i-1) + f(i-2)
    a = b;
    b = c;
  }
  return b;
};
`,
      python: `def climbStairs(n):
    a, b = 1, 1  # f(0) 与 f(1)
    for _ in range(2, n + 1):
        a, b = b, a + b  # f(i) = f(i-1) + f(i-2)
    return b
`,
    },
    acm: {
      javascript: `const n = Number(input.trim());

let a = 1, b = 1;
for (let i = 2; i <= n; i++) {
  const c = a + b;
  a = b;
  b = c;
}
console.log(b);
`,
      python: `import sys

n = int(sys.stdin.read().strip())

a, b = 1, 1
for _ in range(2, n + 1):
    a, b = b, a + b

print(b)
`,
    },
  },

  idea: `
到达第 \`n\` 阶的最后一步只有两种可能：从第 \`n-1\` 阶迈 1 步，或从第 \`n-2\` 阶迈 2 步。因此 \`f(n) = f(n-1) + f(n-2)\`，且 \`f(1) = 1\`、\`f(2) = 2\`——本质上就是斐波那契数列（整体位移了一位）。

**记忆化搜索**：自顶向下递归，用哈希表缓存已算出的 \`f(k)\`，避免指数级的重复计算。时间 O(n)，空间 O(n)。

**动态规划（推荐）**：自底向上迭代。由于 \`f(n)\` 只依赖前两项，用两个变量滚动更新即可，连数组都不需要。时间 O(n)，空间 O(1)。

**数学法**：套用斐波那契通项公式或矩阵快速幂可以把时间降到 O(log n)，但通项公式涉及浮点开方，\`n\` 较大时精度容易出问题，工程上更常用滚动迭代。

参考答案采用滚动变量的动态规划。
`,

  explanation: `
- 用 \`a\`、\`b\` 表示 \`f(i-2)\` 与 \`f(i-1)\`，初始 \`a = f(0) = 1\`、\`b = f(1) = 1\`（\`f(0) = 1\` 是递推的基准，表示「不动」这一种方式）
- 从 \`i = 2\` 开始迭代：\`c = a + b\` 就是 \`f(i)\)，然后 \`a\`、\`b\` 整体后移（\`a = b\`，\`b = c\`）
- 循环结束时 \`b\` 即为 \`f(n)\`；\`n = 1\` 时循环不执行，直接返回 \`b = 1\`
- Python 版用元组解包 \`a, b = b, a + b\` 一行完成滚动更新
- 滚动变量把空间复杂度从 O(n) 的 DP 数组降到 O(1)

ACM 版本读入一行整数 \`n\`，套用同样的迭代后用 \`console.log\` / \`print\` 输出结果。
`,
};
