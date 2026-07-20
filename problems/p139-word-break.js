// 139. 单词拆分
// 普通类型题（字符串 + 字符串数组 -> 布尔），无需 argSpec / resultKind
export default {
  id: 139,
  title: '单词拆分',
  slug: 'word-break',
  difficulty: 'medium',
  tags: ['字典树', '记忆化搜索', '数组', '哈希表', '字符串', '动态规划'],
  hints: [
    '关键观察是可拆分性只取决于当前前缀终点：若前 j 个字符可拆分且 s[j:i] 在字典中，则前 i 个字符也可拆分；字典单词允许重复使用，无需记录使用次数。',
    '使用一维动态规划并将 wordDict 转成哈希集合：定义 dp[i] 表示 s 的前 i 个字符能否被拆分，最终判断 dp[s.length]。',
    '初始化 dp[0] = true；对 i 从 1 到 n，枚举 j 从 0 到 i - 1，若 dp[j] 为真且集合包含 s.slice(j, i)，就令 dp[i] = true 并立即结束当前内层循环。',
    '注意空前缀必须设为可拆分；ACM 输入中第一行读取完整字符串、第三行按空白切分字典，输出必须是小写字符串 true 或 false。',
  ],

  description: `
给你一个字符串 \`s\` 和一个字符串列表 \`wordDict\` 作为字典。如果可以利用字典中出现的单词拼接出 \`s\`，返回 \`true\`，否则返回 \`false\`。

注意：不要求字典中出现的单词全部都使用，并且字典中的单词可以**重复使用**。

### 示例

- 输入：\`s = "leetcode", wordDict = ["leet","code"]\`，输出：\`true\`（"leet" + "code" 可以拼成 "leetcode"）
- 输入：\`s = "applepenapple", wordDict = ["apple","pen"]\`，输出：\`true\`（单词可以重复使用）
- 输入：\`s = "catsandog", wordDict = ["cats","dog","sand","and","cat"]\`，输出：\`false\`

### 提示

- \`1 <= s.length <= 300\`
- \`1 <= wordDict.length <= 1000\`
- \`1 <= wordDict[i].length <= 20\`
- \`s\` 和 \`wordDict[i]\` 仅由小写英文字母组成
- \`wordDict\` 中的所有字符串互不相同

### ACM 模式输入输出格式

- 输入：第一行为字符串 \`s\`；第二行为整数 \`m\`（字典大小）；第三行为 \`m\` 个单词（空格分隔）
- 输出：\`true\` 或 \`false\`（小写）

ACM 输入示例：
\`\`\`
leetcode
2
leet code
\`\`\`
输出：\`true\`
`,

  functionName: 'wordBreak',
  compare: 'exact',

  tests: [
    { args: ['leetcode', ['leet', 'code']], expected: true },
    { args: ['applepenapple', ['apple', 'pen']], expected: true },
    { args: ['catsandog', ['cats', 'dog', 'sand', 'and', 'cat']], expected: false },
    { args: ['aaaaaaa', ['aaaa', 'aaa']], expected: true },
    { args: ['a', ['a']], expected: true },
    { args: ['ab', ['a']], expected: false },
    { args: ['cars', ['car', 'ca', 'rs']], expected: true },
    { args: ['bb', ['a', 'aa', 'aaa']], expected: false },
    { args: ['aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaab', ['a', 'aa', 'aaa', 'aaaa', 'aaaaa', 'aaaaaa', 'aaaaaaa', 'aaaaaaaa']], expected: false },
    { args: ['bcdhdedefhdeabfghabcddeabhdedecdfgcdbcdbcddeabccdabdeabcdeabcdefgcddeababcfgbcddebcddeffgdeffghdedefabcdeabcdabcbcdfgfgdeffgbcdabccdhdeabababc', ['ab', 'abc', 'bcd', 'cd', 'de', 'def', 'fg', 'h']], expected: true },
  ],

  acmTests: [
    { input: 'leetcode\n2\nleet code\n', output: 'true\n' },
    { input: 'applepenapple\n2\napple pen\n', output: 'true\n' },
    { input: 'catsandog\n5\ncats dog sand and cat\n', output: 'false\n' },
    { input: 'aaaaaaa\n2\naaaa aaa\n', output: 'true\n' },
    { input: 'a\n1\na\n', output: 'true\n' },
    { input: 'ab\n1\na\n', output: 'false\n' },
    { input: 'cars\n3\ncar ca rs\n', output: 'true\n' },
    { input: 'bb\n3\na aa aaa\n', output: 'false\n' },
    { input: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaab\n8\na aa aaa aaaa aaaaa aaaaaa aaaaaaa aaaaaaaa\n', output: 'false\n' },
    { input: 'bcdhdedefhdeabfghabcddeabhdedecdfgcdbcdbcddeabccdabdeabcdeabcdefgcddeababcfgbcddebcddeffgdeffghdedefabcdeabcdabcbcdfgfgdeffgbcdabccdhdeabababc\n8\nab abc bcd cd de def fg h\n', output: 'true\n' },
  ],

  templates: {
    core: {
      javascript: `/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
var wordBreak = function(s, wordDict) {
    
};
`,
      python: `def wordBreak(s, wordDict):
    # 判断 s 能否由 wordDict 中的单词（可重复使用）拼成，返回 True / False
    pass
`,
    },
    acm: {
      javascript: `// ACM 模式：input 是全部输入（字符串），用 console.log 输出答案
// 输入格式：第一行 s，第二行 m，第三行 m 个单词（空格分隔）
const lines = input.split('\\n');
const s = lines[0];
const wordDict = lines[2].trim().split(/\\s+/);

// 在这里写你的代码，用 console.log 输出 true 或 false（小写）

`,
      python: `# ACM 模式：用 input() 或 sys.stdin 读输入，用 print 输出答案
# 输入格式：第一行 s，第二行 m，第三行 m 个单词（空格分隔）
import sys

lines = sys.stdin.read().split('\\n')
s = lines[0]
m = int(lines[1])
word_dict = lines[2].split()

# 在这里写你的代码，用 print 输出 true 或 false（小写）
`,
    },
  },

  solutions: {
    core: {
      javascript: `var wordBreak = function(s, wordDict) {
  const dict = new Set(wordDict);
  const n = s.length;
  // dp[i] = s 的前 i 个字符能否由字典单词拼成
  const dp = new Array(n + 1).fill(false);
  dp[0] = true; // 空前缀视为可拆分
  for (let i = 1; i <= n; i++) {
    for (let j = 0; j < i; j++) {
      if (dp[j] && dict.has(s.slice(j, i))) {
        dp[i] = true;
        break;
      }
    }
  }
  return dp[n];
};
`,
      python: `def wordBreak(s, wordDict):
    words = set(wordDict)
    n = len(s)
    # dp[i] = s 的前 i 个字符能否由字典单词拼成
    dp = [False] * (n + 1)
    dp[0] = True  # 空前缀视为可拆分
    for i in range(1, n + 1):
        for j in range(i):
            if dp[j] and s[j:i] in words:
                dp[i] = True
                break
    return dp[n]
`,
    },
    acm: {
      javascript: `const lines = input.split('\\n');
const s = lines[0];
const wordDict = lines[2].trim().split(/\\s+/);

const dict = new Set(wordDict);
const n = s.length;
// dp[i] = s 的前 i 个字符能否由字典单词拼成
const dp = new Array(n + 1).fill(false);
dp[0] = true;
for (let i = 1; i <= n; i++) {
  for (let j = 0; j < i; j++) {
    if (dp[j] && dict.has(s.slice(j, i))) {
      dp[i] = true;
      break;
    }
  }
}
console.log(dp[n] ? 'true' : 'false');
`,
      python: `import sys

lines = sys.stdin.read().split('\\n')
s = lines[0]
m = int(lines[1])
word_dict = lines[2].split()

words = set(word_dict)
n = len(s)
# dp[i] = s 的前 i 个字符能否由字典单词拼成
dp = [False] * (n + 1)
dp[0] = True
for i in range(1, n + 1):
    for j in range(i):
        if dp[j] and s[j:i] in words:
            dp[i] = True
            break

print('true' if dp[n] else 'false')
`,
    },
  },

  idea: `
把「\`s\` 的前缀能否拆分」作为状态，用**动态规划**求解。定义 \`dp[i]\` 表示 \`s\` 的前 \`i\` 个字符能否由字典中的单词拼成，\`dp[0] = true\`（空前缀视为可拆分）。

转移：枚举最后一段单词的起点 \`j\`（\`0 <= j < i\`），如果 \`dp[j]\` 为真且子串 \`s[j:i]\` 在字典中，则 \`dp[i] = true\)。字典先放进哈希集合，单词查询为 O(1)。状态数 O(n)、每个状态枚举 O(n) 个断点，时间复杂度 O(n²)（再算上子串截取与哈希的开销，\`n <= 300\` 完全够用），空间 O(n)。

**记忆化搜索**：从下标 0 开始 DFS，每次尝试用字典里的单词匹配下一段，用 memo 记录已失败的起始下标避免指数级重复，本质与 DP 等价。

字典单词可以**重复使用**，所以状态里只有位置 \`i\`，不需要任何「已使用」标记——这正是本题与「排列拼接」类题目的关键区别。

参考答案采用一维 DP。
`,

  explanation: `
- 字典先转成 \`Set\` / \`set\`，把「子串是否在字典中」的查询降到 O(1)
- \`dp[0] = true\` 是关键基准：表示空前缀可拆分，第一段单词的匹配因此有着落点
- 内层枚举断点 \`j\`：前 \`j\` 个字符可拆分（\`dp[j]\` 为真）且 \`s[j:i]\`（JS 为 \`s.slice(j, i)\`）在字典里，则前 \`i\` 个字符可拆分
- 题目只问可达性，所以一旦找到合法 \`j\` 就 \`break\`，不必继续枚举
- 以 \`"catsandog"\` 为例：无论拆成 "cat"+"sand"+"og" 还是 "cats"+"and"+"og"，最后都剩下 "og" 不在字典中，所有前缀方案均失败，\`dp[n]\` 保持 \`false\`
- ACM 输出要求小写 \`true\` / \`false\`：Python 直接 \`print(dp[n])\` 会得到 \`True\` / \`False\`，必须手动转换；JS 同理用三元运算符输出字符串
- ACM 读入按行解析：第一行是 \`s\`（取整行，不要 trim 整个输入），第三行按空格分出字典单词
`,
};
