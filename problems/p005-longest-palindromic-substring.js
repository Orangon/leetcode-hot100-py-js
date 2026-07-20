// 5. 最长回文子串
// compare 为 anyOf：expected 列出该输入所有可接受的最长回文答案，命中任一即通过
export default {
  id: 5,
  title: '最长回文子串',
  slug: 'longest-palindromic-substring',
  difficulty: 'medium',
  tags: ['双指针', '字符串', '动态规划'],
  hints: [
    '回文串关于中心对称，中心既可能落在一个字符上，也可能落在两个相邻字符之间。',
    '枚举每个位置的奇数中心 (i,i) 与偶数中心 (i,i+1)，分别向两侧扩展并维护最长区间。',
    '扩展到越界或失配后，真实回文位于开区间 (l,r)，长度为 r-l-1；仅在更长时更新起点和长度。',
    '空串应返回并输出空串；核心模式可返回任意最长答案，而 ACM 数据保证最长答案唯一且输入应取第一行。',
  ],

  description: `
给你一个字符串 \`s\`，找到 \`s\` 中最长的回文子串。

如果字符串的反序与原始字符串相同，则该字符串称为回文字符串。

### 示例

- 输入：\`s = "babad"\`，输出：\`"bab"\`（\`"aba"\` 同样是有效答案）
- 输入：\`s = "cbbd"\`，输出：\`"bb"\`
- 输入：\`s = "a"\`，输出：\`"a"\`
- 输入：\`s = "ac"\`，输出：\`"a"\`（\`"c"\` 同样是有效答案）

### 提示

- \`1 <= s.length <= 1000\`（本题判题数据额外包含空串用例）
- \`s\` 仅由数字和英文字母组成

### ACM 模式输入输出格式

- 输入：仅一行，即字符串 \`s\`（为空串时该行是空行）
- 输出：一个最长回文子串（空串时输出一个空行）

判题约定：最长回文子串可能有多个，核心代码模式返回其中任意一个都算通过；ACM 模式的测试数据保证最长回文子串唯一，直接输出该子串即可。

ACM 输入示例：
\`\`\`
cbbd
\`\`\`
输出：\`bb\`
`,

  functionName: 'longestPalindrome',
  compare: 'anyOf',

  tests: [
    { args: ['babad'], expected: ['bab', 'aba'] },
    { args: ['cbbd'], expected: ['bb'] },
    { args: ['a'], expected: ['a'] },
    { args: ['ac'], expected: ['a', 'c'] },
    { args: ['aaaa'], expected: ['aaaa'] },
    { args: [''], expected: [''] },
    { args: ['ab'], expected: ['a', 'b'] },
    { args: ['abccba'], expected: ['abccba'] },
    { args: ['abcba'], expected: ['abcba'] },
    { args: ['edddcdbacdddcacceaaceebeabbcbdadddbabbdccdaccebceaeaaceeebdaccbbbdbdbdebadaccebbeaeaddbadcdccabceaaededdbcabdccaeaddbbdbddcaabbcabcbcbadeabdbbebcbeacbaecacbcebbedcdceaabddccecbeebeaaaaddeeabddebaddcec'], expected: ['abcbcba', 'acdddca'] },
  ],

  acmTests: [
    { input: 'cbbd\n', output: 'bb\n' },
    { input: 'aaaa\n', output: 'aaaa\n' },
    { input: 'a\n', output: 'a\n' },
    { input: 'aacabdkacaa\n', output: 'aca\n' },
    { input: '\n', output: '\n' },
    { input: 'abcdedcba\n', output: 'abcdedcba\n' },
    { input: 'abccba\n', output: 'abccba\n' },
    { input: 'abcba\n', output: 'abcba\n' },
    { input: 'bananas\n', output: 'anana\n' },
    { input: 'dbcbbdcbcacbdbabcabccbacbadddabcddaabddddaddcdaaabcddacdcbdbdadadaaaccdaaddadcabbcadcdabcbbaadcddabdaaddadacdbaadcdacadb\n', output: 'abcabccbacba\n' },
  ],

  templates: {
    core: {
      javascript: `/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {
    
};
`,
      python: `def longestPalindrome(s):
    # 返回 s 的最长回文子串（答案不唯一时返回任意一个即可）
    pass
`,
    },
    acm: {
      javascript: `// ACM 模式：input 是全部输入（字符串），用 console.log 输出答案
// 输入格式：仅一行，即字符串 s（空串时为空行）
// 注意：不要对整个 input 用 trim()，否则空串用例会被吞掉；应 split('\\n') 后取第一行
const s = input.split('\\n')[0];

// 在这里写你的代码，用 console.log 输出最长回文子串（本题 ACM 测试数据保证答案唯一）

`,
      python: `# ACM 模式：用 input() 或 sys.stdin 读输入，用 print 输出答案
# 输入格式：仅一行，即字符串 s（空串时为空行）
# 注意：不要对整个输入用 strip()，否则空串用例会被吞掉；应 split('\\n') 后取第一行
import sys

s = sys.stdin.read().split('\\n')[0]

# 在这里写你的代码，用 print 输出最长回文子串（本题 ACM 测试数据保证答案唯一）
`,
    },
  },

  solutions: {
    core: {
      javascript: `var longestPalindrome = function(s) {
  let start = 0, maxLen = 0;
  // 从中心 (l, r) 向两侧扩展，返回得到的回文长度
  const expand = (l, r) => {
    while (l >= 0 && r < s.length && s[l] === s[r]) {
      l--;
      r++;
    }
    return r - l - 1; // 循环结束时 l、r 停在失配位置，回文在开区间 (l, r)
  };
  for (let i = 0; i < s.length; i++) {
    const len = Math.max(expand(i, i), expand(i, i + 1)); // 奇数 / 偶数两种中心
    if (len > maxLen) {
      maxLen = len;
      start = i - Math.floor((len - 1) / 2); // 统一的回文起点公式
    }
  }
  return s.slice(start, start + maxLen);
};
`,
      python: `def longestPalindrome(s):
    start, max_len = 0, 0

    def expand(l, r):
        # 从中心 (l, r) 向两侧扩展，返回得到的回文长度
        while l >= 0 and r < len(s) and s[l] == s[r]:
            l -= 1
            r += 1
        return r - l - 1  # 循环结束时 l、r 停在失配位置，回文在开区间 (l, r)

    for i in range(len(s)):
        length = max(expand(i, i), expand(i, i + 1))  # 奇数 / 偶数两种中心
        if length > max_len:
            max_len = length
            start = i - (length - 1) // 2  # 统一的回文起点公式
    return s[start:start + max_len]
`,
    },
    acm: {
      javascript: `// 不要对整个 input 用 trim()，否则空串用例会被吞掉
const s = input.split('\\n')[0];

let start = 0, maxLen = 0;
const expand = (l, r) => {
  while (l >= 0 && r < s.length && s[l] === s[r]) {
    l--;
    r++;
  }
  return r - l - 1;
};
for (let i = 0; i < s.length; i++) {
  const len = Math.max(expand(i, i), expand(i, i + 1));
  if (len > maxLen) {
    maxLen = len;
    start = i - Math.floor((len - 1) / 2);
  }
}
console.log(s.slice(start, start + maxLen));
`,
      python: `import sys

# 不要对整个输入用 strip()，否则空串用例会被吞掉
s = sys.stdin.read().split('\\n')[0]

start, max_len = 0, 0

def expand(l, r):
    while l >= 0 and r < len(s) and s[l] == s[r]:
        l -= 1
        r += 1
    return r - l - 1

for i in range(len(s)):
    length = max(expand(i, i), expand(i, i + 1))
    if length > max_len:
        max_len = length
        start = i - (length - 1) // 2

print(s[start:start + max_len])
`,
    },
  },

  idea: `
最直观的想法是枚举所有子串再判断是否为回文，时间 O(n³)，无法承受 1000 的长度。

**中心扩展法（推荐）**：回文串是关于中心左右对称的。枚举每一个可能的「中心」，向两边同时扩展，直到两端字符不同或越界：

- 奇数长度回文的中心是一个字符：从 \`(i, i)\` 开始扩展
- 偶数长度回文的中心在两个字符之间：从 \`(i, i + 1)\` 开始扩展

每个中心扩展出的回文长度与历史最大值比较并记录起点即可。一共 \`2n - 1\` 个中心，每次扩展最多 O(n)，时间 O(n²)，空间 O(1)。

**动态规划**：\`dp[i][j]\` 表示子串 \`s[i..j]\` 是否为回文，转移 \`dp[i][j] = (s[i] == s[j]) && dp[i+1][j-1]\`，按子串长度从小到大填表，时间 O(n²)、空间 O(n²)。此外还有 O(n) 的 Manacher 算法，但实现复杂。

参考答案采用中心扩展法。
`,

  explanation: `
- \`expand(l, r)\`：只要 \`l\`、\`r\` 不越界且 \`s[l] == s[r]\` 就向两侧扩展；循环结束时 \`l\`、\`r\` 停在「失配位置」，回文落在开区间 \`(l, r)\)，长度为 \`r - l - 1\`（这是最常见的易错点）
- 对每个下标 \`i\` 调两次 \`expand\`：\`expand(i, i)\` 覆盖奇数长度、\`expand(i, i + 1)\` 覆盖偶数长度，两者取大
- 刷新最大值时同步更新起点：回文中心在 \`i\`（奇数）或 \`i\` 与 \`i + 1\` 之间（偶数），两种情况的起点可统一为 \`i - floor((len - 1) / 2)\`
- 最后用 \`s.slice(start, start + maxLen)\` / \`s[start:start + max_len]\` 取出结果
- 只在 \`len > maxLen\` 时更新（不是 \`>=\`），因此返回的是最先找到的最长答案
- 空串时循环不执行，返回空切片，天然兼容

ACM 版本从第一行读入 \`s\`（注意不能用 trim 处理整个输入，否则空串用例会被吞掉），算法相同，输出该子串；ACM 测试数据保证最长回文子串唯一。
`,
};
