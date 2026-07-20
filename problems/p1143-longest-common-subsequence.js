// 1143. 最长公共子序列
// 普通类型题（两个字符串 -> 整数），无需 argSpec / resultKind
export default {
  id: 1143,
  title: '最长公共子序列',
  slug: 'longest-common-subsequence',
  difficulty: 'medium',
  tags: ['字符串', '动态规划'],
  hints: [
    '公共子序列必须同时保持两个字符串中的相对顺序；比较两个前缀的末位字符，可以把原问题拆成规模更小的前缀问题。',
    '使用二维动态规划，令 dp[i][j] 表示 text1 前 i 个字符与 text2 前 j 个字符的最长公共子序列长度。',
    '初始化第 0 行和第 0 列为 0；若 text1[i - 1] === text2[j - 1]，则 dp[i][j] = dp[i - 1][j - 1] + 1，否则取 max(dp[i - 1][j], dp[i][j - 1])，最终返回 dp[m][n]。',
    '前缀长度 i、j 对应的字符下标是 i - 1、j - 1；ACM 模式按换行读取前两行且不要对整个输入 trim，最后只输出 dp[m][n]。',
  ],

  description: `
给定两个字符串 \`text1\` 和 \`text2\`，返回这两个字符串的最长公共子序列的长度。如果不存在公共子序列，返回 \`0\`。

一个字符串的子序列是指这样一个新的字符串：它是由原字符串在不改变字符的相对顺序的情况下删除某些字符（也可以不删除任何字符）后组成的新字符串。

例如，\`"ace"\` 是 \`"abcde"\` 的子序列，但 \`"aec"\` 不是。

### 示例

- 输入：\`text1 = "abcde", text2 = "ace"\`，输出：\`3\`（最长公共子序列是 \`"ace"\`）
- 输入：\`text1 = "abc", text2 = "abc"\`，输出：\`3\`
- 输入：\`text1 = "abc", text2 = "def"\`，输出：\`0\`

### 提示

- \`1 <= text1.length, text2.length <= 1000\`
- \`text1\` 和 \`text2\` 仅由小写英文字符组成

### ACM 模式输入输出格式

- 输入：第一行为 \`text1\`，第二行为 \`text2\`
- 输出：一个整数，即最长公共子序列的长度

ACM 输入示例：
\`\`\`
abcde
ace
\`\`\`
输出：\`3\`
`,

  functionName: 'longestCommonSubsequence',
  compare: 'exact',

  tests: [
    { args: ['abcde', 'ace'], expected: 3 },
    { args: ['abc', 'abc'], expected: 3 },
    { args: ['abc', 'def'], expected: 0 },
    { args: ['ezupkr', 'ubmrapg'], expected: 2 },
    { args: ['a', 'a'], expected: 1 },
    { args: ['aggtab', 'gxtxayb'], expected: 4 },
    { args: ['aaaa', 'bbbb'], expected: 0 },
    { args: ['abcde', 'edcba'], expected: 1 },
    { args: ['abc', 'axbycz'], expected: 3 },
    { args: ['deadbeecbceeccbaedbdbbeabedbbbaeaabeaebaedabeadbaadaaedaacecebbdebbeacbecdaaeeab', 'dcacbbadabbdddbbeeacbadbebcaeacaedcaeecbeddebbecdeddbbddcbdcaadebacdebadbabbdcbcadabbdbeaeebceeacaddaddcdbbdbacbadbcecab'], expected: 56 },
  ],

  acmTests: [
    { input: 'abcde\nace\n', output: '3\n' },
    { input: 'abc\nabc\n', output: '3\n' },
    { input: 'abc\ndef\n', output: '0\n' },
    { input: 'ezupkr\nubmrapg\n', output: '2\n' },
    { input: 'a\na\n', output: '1\n' },
    { input: 'aggtab\ngxtxayb\n', output: '4\n' },
    { input: 'aaaa\nbbbb\n', output: '0\n' },
    { input: 'abcde\nedcba\n', output: '1\n' },
    { input: 'abc\naxbycz\n', output: '3\n' },
    { input: 'deadbeecbceeccbaedbdbbeabedbbbaeaabeaebaedabeadbaadaaedaacecebbdebbeacbecdaaeeab\ndcacbbadabbdddbbeeacbadbebcaeacaedcaeecbeddebbecdeddbbddcbdcaadebacdebadbabbdcbcadabbdbeaeebceeacaddaddcdbbdbacbadbcecab\n', output: '56\n' },
  ],

  templates: {
    core: {
      javascript: `/**
 * @param {string} text1
 * @param {string} text2
 * @return {number}
 */
var longestCommonSubsequence = function(text1, text2) {
    
};
`,
      python: `def longestCommonSubsequence(text1, text2):
    # 返回两个字符串的最长公共子序列长度
    pass
`,
    },
    acm: {
      javascript: `// ACM 模式：input 是全部输入（字符串），用 console.log 输出答案
// 输入格式：第一行为 text1，第二行为 text2
// 注意：不要对整个 input 用 trim()，应 split('\\n') 后按下标取行
const lines = input.split('\\n');
const text1 = lines[0];
const text2 = lines.length > 1 ? lines[1] : '';

// 在这里写你的代码，用 console.log 输出最长公共子序列的长度

`,
      python: `# ACM 模式：用 input() 或 sys.stdin 读输入，用 print 输出答案
# 输入格式：第一行为 text1，第二行为 text2
# 注意：不要对整个输入用 strip()，应 split('\\n') 后按下标取行
import sys

lines = sys.stdin.read().split('\\n')
text1 = lines[0]
text2 = lines[1] if len(lines) > 1 else ''

# 在这里写你的代码，用 print 输出最长公共子序列的长度
`,
    },
  },

  solutions: {
    core: {
      javascript: `var longestCommonSubsequence = function(text1, text2) {
  const m = text1.length, n = text2.length;
  // dp[i][j]：text1 前 i 个字符与 text2 前 j 个字符的最长公共子序列长度
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1; // 末位相同，接在子问题答案后面
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]); // 舍弃一侧末位取较优
      }
    }
  }
  return dp[m][n];
};
`,
      python: `def longestCommonSubsequence(text1, text2):
    m, n = len(text1), len(text2)
    # dp[i][j]：text1 前 i 个字符与 text2 前 j 个字符的最长公共子序列长度
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if text1[i - 1] == text2[j - 1]:
                dp[i][j] = dp[i - 1][j - 1] + 1  # 末位相同，接在子问题答案后面
            else:
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])  # 舍弃一侧末位取较优
    return dp[m][n]
`,
    },
    acm: {
      javascript: `// 不要对整个 input 用 trim()
const lines = input.split('\\n');
const text1 = lines[0];
const text2 = lines.length > 1 ? lines[1] : '';

const m = text1.length, n = text2.length;
const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
for (let i = 1; i <= m; i++) {
  for (let j = 1; j <= n; j++) {
    if (text1[i - 1] === text2[j - 1]) {
      dp[i][j] = dp[i - 1][j - 1] + 1;
    } else {
      dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
  }
}
console.log(dp[m][n]);
`,
      python: `import sys

# 不要对整个输入用 strip()
lines = sys.stdin.read().split('\\n')
text1 = lines[0]
text2 = lines[1] if len(lines) > 1 else ''

m, n = len(text1), len(text2)
dp = [[0] * (n + 1) for _ in range(m + 1)]
for i in range(1, m + 1):
    for j in range(1, n + 1):
        if text1[i - 1] == text2[j - 1]:
            dp[i][j] = dp[i - 1][j - 1] + 1
        else:
            dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])

print(dp[m][n])
`,
    },
  },

  idea: `
子序列问题不适合贪心，用二维动态规划。定义 \`dp[i][j]\` 为 \`text1\` 的前 \`i\` 个字符与 \`text2\` 的前 \`j\` 个字符的最长公共子序列长度。

转移：比较两个字符串的末位字符 \`text1[i-1]\` 与 \`text2[j-1]\`：

- 相等：这个字符可以同时归入两边的子序列，\`dp[i][j] = dp[i-1][j-1] + 1\`
- 不等：它不可能同时出现在「以它为结尾」的公共子序列里，答案取「去掉 text1 末位」与「去掉 text2 末位」两个子问题的较大者：\`dp[i][j] = max(dp[i-1][j], dp[i][j-1])\`

边界：\`dp[0][j] = dp[i][0] = 0\`——任何字符串与空串的公共子序列长度都是 0，因此没有公共字符时自然得到 0。

时间 O(m×n)，空间 O(m×n)（可用滚动数组优化到 O(n)，参考答案保留二维表便于理解）。
`,

  explanation: `
- \`dp\` 是 \`(m+1) × (n+1)\` 的表，全部初始化为 0，天然覆盖「与空前缀的公共子序列长度为 0」的边界
- 双重循环从下标 1 开始填表，比较的是 \`text1[i - 1]\` 与 \`text2[j - 1]\`（前缀长度与字符下标差 1，是易错点）
- 字符相等：\`dp[i][j] = dp[i - 1][j - 1] + 1\`，把这个公共字符接在子问题的答案后面
- 字符不等：\`dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])\`，从两个缩减后的子问题中取较优者
- 答案是 \`dp[m][n]\`
- 与 72 题「编辑距离」的 DP 结构很像：都是 \`(m+1) × (n+1)\` 的表加上按末位字符是否相等分类讨论，可以对照记忆

ACM 版本分两行读入 \`text1\`、\`text2\`（同样不要 trim 整个输入），算法与核心代码模式完全一致。
`,
};
