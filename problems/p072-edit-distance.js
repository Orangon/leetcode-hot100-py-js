// 72. 编辑距离
// 普通类型题（两个字符串 -> 整数），无需 argSpec / resultKind
export default {
  id: 72,
  title: '编辑距离',
  slug: 'edit-distance',
  difficulty: 'medium',
  tags: ['字符串', '动态规划'],
  hints: [
    '把两个字符串都按前缀拆分，末字符相同可直接继承更短前缀的答案，不同则最后一步必是插入、删除或替换之一。',
    '定义二维 dp[i][j] 为 word1 前 i 个字符变成 word2 前 j 个字符的最少操作数。',
    '初始化 dp[i][0] = i、dp[0][j] = j；字符相等取 dp[i-1][j-1]，否则取删除、插入、替换三个状态的最小值加 1。',
    '前缀长度 i 对应字符下标 i-1，注意不要越界；ACM 不可 trim 整体输入，否则代表空字符串的空行会被吞掉。',
  ],

  description: `
给你两个单词 \`word1\` 和 \`word2\`，请返回将 \`word1\` 转换成 \`word2\` 所使用的最少操作数。

你可以对一个单词进行如下三种操作：

- 插入一个字符
- 删除一个字符
- 替换一个字符

### 示例

- 输入：\`word1 = "horse", word2 = "ros"\`，输出：\`3\`（horse → rorse（替换 h 为 r）→ rose（删除 r）→ ros（删除 e））
- 输入：\`word1 = "intention", word2 = "execution"\`，输出：\`5\`（intention → inention（删除 t）→ enention（替换 i 为 e）→ exention（替换 n 为 x）→ exection（替换 n 为 c）→ execution（插入 u））
- 输入：\`word1 = "", word2 = "abc"\`，输出：\`3\`

### 提示

- \`0 <= word1.length, word2.length <= 500\`
- \`word1\` 和 \`word2\` 由小写英文字母组成

### ACM 模式输入输出格式

- 输入：第一行为 \`word1\`，第二行为 \`word2\`（某个单词为空串时对应行为空行）
- 输出：一个整数，即最少操作数

ACM 输入示例：
\`\`\`
horse
ros
\`\`\`
输出：\`3\`
`,

  functionName: 'minDistance',
  compare: 'exact',

  tests: [
    { args: ['horse', 'ros'], expected: 3 },
    { args: ['intention', 'execution'], expected: 5 },
    { args: ['', 'abc'], expected: 3 },
    { args: ['abc', ''], expected: 3 },
    { args: ['abc', 'abc'], expected: 0 },
    { args: ['', ''], expected: 0 },
    { args: ['a', 'b'], expected: 1 },
    { args: ['abc', 'abcd'], expected: 1 },
    { args: ['abcde', 'ace'], expected: 2 },
    { args: ['tbpaikgwhvivskjajyyuamxmfhkedyfkcyzbibeogxwnyyemiwbczgazhcpbzwwqdjzsedtcdhwcekgyyhorxfevnpctlvdsbyhthixyknrqldjjzcogfikphdxahyflncuvmhnwhvdeqfsqltkxuk', 'gbnqvekdsnqoijtctppuqrtwwdqmfmwpptlgifimepxcmxiojfdjnchkjyjqwipuwplxxjwikokktsjbrgxuvgbcotssurphmgpxckzxpqbjkxrxnjwosiazgzhcfcffdikklxfhghxmwvfbdgotxbbcpsoorpgsfuwoctlpqttkzddkmsglrnoyfqgzjzqdrydseued'], expected: 171 },
  ],

  acmTests: [
    { input: 'horse\nros\n', output: '3\n' },
    { input: 'intention\nexecution\n', output: '5\n' },
    { input: '\nabc\n', output: '3\n' },
    { input: 'abc\n\n', output: '3\n' },
    { input: 'abc\nabc\n', output: '0\n' },
    { input: '\n\n', output: '0\n' },
    { input: 'a\nb\n', output: '1\n' },
    { input: 'abc\nabcd\n', output: '1\n' },
    { input: 'abcde\nace\n', output: '2\n' },
    { input: 'tbpaikgwhvivskjajyyuamxmfhkedyfkcyzbibeogxwnyyemiwbczgazhcpbzwwqdjzsedtcdhwcekgyyhorxfevnpctlvdsbyhthixyknrqldjjzcogfikphdxahyflncuvmhnwhvdeqfsqltkxuk\ngbnqvekdsnqoijtctppuqrtwwdqmfmwpptlgifimepxcmxiojfdjnchkjyjqwipuwplxxjwikokktsjbrgxuvgbcotssurphmgpxckzxpqbjkxrxnjwosiazgzhcfcffdikklxfhghxmwvfbdgotxbbcpsoorpgsfuwoctlpqttkzddkmsglrnoyfqgzjzqdrydseued\n', output: '171\n' },
  ],

  templates: {
    core: {
      javascript: `/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var minDistance = function(word1, word2) {
    
};
`,
      python: `def minDistance(word1, word2):
    # 返回把 word1 转换成 word2 所需的最少操作数
    pass
`,
    },
    acm: {
      javascript: `// ACM 模式：input 是全部输入（字符串），用 console.log 输出答案
// 输入格式：第一行为 word1，第二行为 word2（可能为空行）
// 注意：不要对整个 input 用 trim()，否则空串用例会被吞掉；应 split('\\n') 后按下标取行
const lines = input.split('\\n');
const word1 = lines[0];
const word2 = lines.length > 1 ? lines[1] : '';

// 在这里写你的代码，用 console.log 输出最少操作数

`,
      python: `# ACM 模式：用 input() 或 sys.stdin 读输入，用 print 输出答案
# 输入格式：第一行为 word1，第二行为 word2（可能为空行）
# 注意：不要对整个输入用 strip()，否则空串用例会被吞掉；应 split('\\n') 后按下标取行
import sys

lines = sys.stdin.read().split('\\n')
word1 = lines[0]
word2 = lines[1] if len(lines) > 1 else ''

# 在这里写你的代码，用 print 输出最少操作数
`,
    },
  },

  solutions: {
    core: {
      javascript: `var minDistance = function(word1, word2) {
  const m = word1.length, n = word2.length;
  // dp[i][j]：word1 前 i 个字符转换成 word2 前 j 个字符的最少操作数
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i; // word2 为空：只能全删
  for (let j = 0; j <= n; j++) dp[0][j] = j; // word1 为空：只能全插入
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (word1[i - 1] === word2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1]; // 末位相同，不产生操作
      } else {
        dp[i][j] = Math.min(
          dp[i - 1][j],     // 删除 word1[i-1]
          dp[i][j - 1],     // 在 word1 末尾插入 word2[j-1]
          dp[i - 1][j - 1]  // 把 word1[i-1] 替换为 word2[j-1]
        ) + 1;
      }
    }
  }
  return dp[m][n];
};
`,
      python: `def minDistance(word1, word2):
    m, n = len(word1), len(word2)
    # dp[i][j]：word1 前 i 个字符转换成 word2 前 j 个字符的最少操作数
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    for i in range(m + 1):
        dp[i][0] = i  # word2 为空：只能全删
    for j in range(n + 1):
        dp[0][j] = j  # word1 为空：只能全插入
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if word1[i - 1] == word2[j - 1]:
                dp[i][j] = dp[i - 1][j - 1]  # 末位相同，不产生操作
            else:
                dp[i][j] = min(
                    dp[i - 1][j],      # 删除 word1[i-1]
                    dp[i][j - 1],      # 在 word1 末尾插入 word2[j-1]
                    dp[i - 1][j - 1],  # 把 word1[i-1] 替换为 word2[j-1]
                ) + 1
    return dp[m][n]
`,
    },
    acm: {
      javascript: `// 不要对整个 input 用 trim()，否则空串用例会被吞掉
const lines = input.split('\\n');
const word1 = lines[0];
const word2 = lines.length > 1 ? lines[1] : '';

const m = word1.length, n = word2.length;
const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
for (let i = 0; i <= m; i++) dp[i][0] = i;
for (let j = 0; j <= n; j++) dp[0][j] = j;
for (let i = 1; i <= m; i++) {
  for (let j = 1; j <= n; j++) {
    if (word1[i - 1] === word2[j - 1]) {
      dp[i][j] = dp[i - 1][j - 1];
    } else {
      dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]) + 1;
    }
  }
}
console.log(dp[m][n]);
`,
      python: `import sys

# 不要对整个输入用 strip()，否则空串用例会被吞掉
lines = sys.stdin.read().split('\\n')
word1 = lines[0]
word2 = lines[1] if len(lines) > 1 else ''

m, n = len(word1), len(word2)
dp = [[0] * (n + 1) for _ in range(m + 1)]
for i in range(m + 1):
    dp[i][0] = i
for j in range(n + 1):
    dp[0][j] = j
for i in range(1, m + 1):
    for j in range(1, n + 1):
        if word1[i - 1] == word2[j - 1]:
            dp[i][j] = dp[i - 1][j - 1]
        else:
            dp[i][j] = min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]) + 1

print(dp[m][n])
`,
    },
  },

  idea: `
这是经典的二维动态规划问题。定义 \`dp[i][j]\` 为把 \`word1\` 的前 \`i\` 个字符转换成 \`word2\` 的前 \`j\` 个字符所需的最少操作数。

边界：\`dp[i][0] = i\`（\`word2\` 为空，只能把 \`i\` 个字符全删掉）、\`dp[0][j] = j\`（\`word1\` 为空，只能插入 \`j\` 个字符）。

转移：比较两个单词的末位字符 \`word1[i-1]\` 与 \`word2[j-1]\`：

- 相等：不需要任何操作，\`dp[i][j] = dp[i-1][j-1]\`
- 不等：枚举三种操作取最小值再加 1
  - 删除 \`word1[i-1]\`：\`dp[i-1][j] + 1\`
  - 在 \`word1\` 末尾插入 \`word2[j-1]\`：\`dp[i][j-1] + 1\`
  - 把 \`word1[i-1]\` 替换为 \`word2[j-1]\`：\`dp[i-1][j-1] + 1\`

为什么对：任意最优操作序列处理完末位字符后，剩下的前缀转换仍是子问题的最优解（最优子结构）；对末位「相同 / 不同」分类讨论，再枚举三种操作，就能覆盖全部操作序列。

时间 O(m×n)，空间 O(m×n)（可用滚动数组优化到 O(n)，参考答案保留二维表便于理解）。
`,

  explanation: `
- \`dp\` 是 \`(m+1) × (n+1)\` 的表，下标 0 表示空前缀，所以比较字符时要用 \`word1[i - 1]\`、\`word2[j - 1]\`（前缀长度与字符下标差 1，是最常见的易错点）
- 初始化第一列 \`dp[i][0] = i\`：前 \`i\` 个字符变成空串只能逐个删除；第一行 \`dp[0][j] = j\`：空串变出前 \`j\` 个字符只能逐个插入。空串用例就靠这两步直接得到正确答案
- 字符相等时 \`dp[i][j] = dp[i-1][j-1]\`，不产生操作数
- 字符不等时取「删除、插入、替换」三种子问题的最小值再加 1
- 答案是 \`dp[m][n]\`

ACM 版本分两行读入 \`word1\`、\`word2\`：注意不能 trim 整个输入，否则空串用例会被吞掉；用 \`split('\\n')\` 后按下标取行，缺失的行按空串处理。算法与核心代码模式完全一致。
`,
};
