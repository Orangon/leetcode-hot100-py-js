// 438. 找到字符串中所有字母异位词
export default {
  id: 438,
  title: '找到字符串中所有字母异位词',
  slug: 'find-all-anagrams-in-a-string',
  difficulty: 'medium',
  tags: ['哈希表', '字符串', '滑动窗口'],
  hints: [
    '异位词必须与 p 等长且每种字母出现次数完全相同，因此只需检查 s 中所有长度为 p.length 的窗口。',
    '使用定长滑动窗口，并分别用长度为 26 的频次数组维护 p 与当前窗口的小写字母计数。',
    '先统计 p 和 s 的首个等长窗口并比较；随后每右移一格就让新进入字符计数加一、离开字符计数减一，频次数组相同时记录窗口左端下标。',
    '若 s 比 p 短应直接得到空数组；ACM 模式从两行读取字符串，按升序用空格输出下标，无匹配时必须输出空行。',
  ],

  description: `
给定两个字符串 \`s\` 和 \`p\`，找到 \`s\` 中所有 \`p\` 的**异位词**子串，返回这些子串的起始下标。不考虑答案输出的顺序。

异位词指由相同字母重排列形成的字符串（包括相同的字符串）。

### 示例

- 输入：\`s = "cbaebabacd", p = "abc"\`，输出：\`[0,6]\`（起始下标 0 的子串 \`"cba"\` 与下标 6 的子串 \`"bac"\` 都是 \`p\` 的异位词）
- 输入：\`s = "abab", p = "ab"\`，输出：\`[0,1,2]\`

### 提示

- \`1 <= s.length, p.length <= 3 * 10^4\`
- \`s\` 和 \`p\` 仅包含小写字母

### ACM 模式输入输出格式

- 输入：第一行为字符串 \`s\`；第二行为字符串 \`p\`（均不含空格）
- 输出：所有起始下标（升序、空格分隔；无答案时输出一个空行）

ACM 输入示例：
\`\`\`
cbaebabacd
abc
\`\`\`
输出：\`0 6\`
`,

  functionName: 'findAnagrams',
  compare: 'exact',

  tests: [
    { args: ['cbaebabacd', 'abc'], expected: [0, 6] },
    { args: ['abab', 'ab'], expected: [0, 1, 2] },
    { args: ['a', 'a'], expected: [0] },
    { args: ['ab', 'abc'], expected: [] },
    { args: ['aaaaaaaaaa', 'aa'], expected: [0, 1, 2, 3, 4, 5, 6, 7, 8] },
    { args: ['bpaa', 'aa'], expected: [2] },
    { args: ['abc', 'abc'], expected: [0] },
    { args: ['abcdef', 'gh'], expected: [] },
    { args: ['aaaaa', 'aaa'], expected: [0, 1, 2] },
    { args: ['eebcbddbbcbaaeabcecacaadbdebbabdabacbedcebccebadadabacbaaabcbeeaeaebbdbddcdacbeceedebbccaabdbabceadbedaceabbdcedccbcbaaccdbcadbadebeeddbbdeebcaadbcbcbeccbaccdabcabddeedcdceadaedccdbedbdbddddccaccdeaec', 'baca'], expected: [9, 32, 50, 52, 53, 56, 87, 115, 116, 140, 158] },
  ],

  acmTests: [
    { input: 'cbaebabacd\nabc\n', output: '0 6\n' },
    { input: 'abab\nab\n', output: '0 1 2\n' },
    { input: 'a\na\n', output: '0\n' },
    { input: 'ab\nabc\n', output: '\n' },
    { input: 'aaaaaaaaaa\naa\n', output: '0 1 2 3 4 5 6 7 8\n' },
    { input: 'bpaa\naa\n', output: '2\n' },
    { input: 'abc\nabc\n', output: '0\n' },
    { input: 'abcdef\ngh\n', output: '\n' },
    { input: 'aaaaa\naaa\n', output: '0 1 2\n' },
    { input: 'eebcbddbbcbaaeabcecacaadbdebbabdabacbedcebccebadadabacbaaabcbeeaeaebbdbddcdacbeceedebbccaabdbabceadbedaceabbdcedccbcbaaccdbcadbadebeeddbbdeebcaadbcbcbeccbaccdabcabddeedcdceadaedccdbedbdbddddccaccdeaec\nbaca\n', output: '9 32 50 52 53 56 87 115 116 140 158\n' },
  ],

  templates: {
    core: {
      javascript: `/**
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */
var findAnagrams = function(s, p) {
    
};
`,
      python: `def findAnagrams(s, p):
    # 返回所有异位词子串的起始下标
    pass
`,
    },
    acm: {
      javascript: `// ACM 模式：input 是全部输入（字符串），用 console.log 输出答案
// 输入格式：第一行 s，第二行 p（均不含空格）
const lines = input.split('\\n');
const s = lines[0];
const p = lines[1];

// 在这里写你的代码，用 console.log 输出所有起始下标（空格分隔，无答案输出空行）

`,
      python: `# ACM 模式：用 input() 或 sys.stdin 读输入，用 print 输出答案
# 输入格式：第一行 s，第二行 p（均不含空格）
import sys

lines = sys.stdin.read().split('\\n')
s = lines[0]
p = lines[1]

# 在这里写你的代码，用 print 输出所有起始下标（空格分隔，无答案输出空行）
`,
    },
  },

  solutions: {
    core: {
      javascript: `var findAnagrams = function(s, p) {
  const m = s.length;
  const n = p.length;
  const res = [];
  if (m < n) return res;
  const base = 'a'.charCodeAt(0);
  const cntS = new Array(26).fill(0); // 当前窗口的字母频次
  const cntP = new Array(26).fill(0); // p 的字母频次
  for (let i = 0; i < n; i++) {
    cntS[s.charCodeAt(i) - base]++;
    cntP[p.charCodeAt(i) - base]++;
  }
  const same = function() {
    for (let i = 0; i < 26; i++) {
      if (cntS[i] !== cntP[i]) return false;
    }
    return true;
  };
  if (same()) res.push(0);
  for (let i = n; i < m; i++) {
    cntS[s.charCodeAt(i) - base]++;     // 右端字符进入窗口
    cntS[s.charCodeAt(i - n) - base]--; // 左端字符离开窗口
    if (same()) res.push(i - n + 1);
  }
  return res;
};
`,
      python: `def findAnagrams(s, p):
    m, n = len(s), len(p)
    res = []
    if m < n:
        return res
    cnt_s = [0] * 26  # 当前窗口的字母频次
    cnt_p = [0] * 26  # p 的字母频次
    for i in range(n):
        cnt_s[ord(s[i]) - 97] += 1
        cnt_p[ord(p[i]) - 97] += 1
    if cnt_s == cnt_p:
        res.append(0)
    for i in range(n, m):
        cnt_s[ord(s[i]) - 97] += 1      # 右端字符进入窗口
        cnt_s[ord(s[i - n]) - 97] -= 1  # 左端字符离开窗口
        if cnt_s == cnt_p:
            res.append(i - n + 1)
    return res
`,
    },
    acm: {
      javascript: `const lines = input.split('\\n');
const s = lines[0];
const p = lines[1];

const m = s.length;
const n = p.length;
const res = [];
const base = 'a'.charCodeAt(0);
const cntS = new Array(26).fill(0);
const cntP = new Array(26).fill(0);
for (let i = 0; i < n; i++) cntP[p.charCodeAt(i) - base]++;
if (m >= n) {
  for (let i = 0; i < n; i++) cntS[s.charCodeAt(i) - base]++;
  const same = function() {
    for (let i = 0; i < 26; i++) {
      if (cntS[i] !== cntP[i]) return false;
    }
    return true;
  };
  if (same()) res.push(0);
  for (let i = n; i < m; i++) {
    cntS[s.charCodeAt(i) - base]++;
    cntS[s.charCodeAt(i - n) - base]--;
    if (same()) res.push(i - n + 1);
  }
}
console.log(res.join(' '));
`,
      python: `import sys

lines = sys.stdin.read().split('\\n')
s = lines[0]
p = lines[1]

m, n = len(s), len(p)
res = []
cnt_s = [0] * 26
cnt_p = [0] * 26
for ch in p:
    cnt_p[ord(ch) - 97] += 1
if m >= n:
    for i in range(n):
        cnt_s[ord(s[i]) - 97] += 1
    if cnt_s == cnt_p:
        res.append(0)
    for i in range(n, m):
        cnt_s[ord(s[i]) - 97] += 1
        cnt_s[ord(s[i - n]) - 97] -= 1
        if cnt_s == cnt_p:
            res.append(i - n + 1)
print(' '.join(map(str, res)))
`,
    },
  },

  idea: `
\`p\` 的异位词与 \`p\` 有完全相同的字母频次表。问题转化为：在 \`s\` 上找出所有长度等于 \`p\`、且字母频次与 \`p\` 相同的子串——这是**定长滑动窗口**的经典场景。

- 用两个长度 26 的计数数组分别统计 \`p\` 和当前窗口的字母频次（\`s\`、\`p\` 只含小写字母）
- 先统计初始窗口 \`s[0..n-1]\` 并与 \`p\` 比较；之后窗口每次右移一格：右端新字符计数 +1，左端离开字符计数 -1
- 每移动一次就比较两个计数数组，相等则记录窗口左端下标

窗口只向右滑动、不回退，每个字符进出窗口各一次，时间复杂度 O(n·Σ)（Σ = 26 为字母表大小），空间复杂度 O(Σ)。

暴力法对每个起点重新统计频次，时间复杂度 O(n·m)，当 \`s\` 长达 3×10^4 时无法通过。
`,

  explanation: `
- \`cnt_p\` 统计 \`p\` 的字母频次；\`cnt_s\` 统计当前窗口（长度始终为 \`n = p.length\`）的字母频次
- 先特判 \`s\` 比 \`p\` 短的情况：直接返回空数组；ACM 版把 \`m >= n\` 作为进入主流程的条件
- 初始化窗口为 \`s\` 的前 \`n\` 个字符，检查起点 0；随后 \`i\` 是进入窗口的右端下标，\`i - n\` 是离开窗口的左端下标，更新计数后若两表相等，说明窗口 \`s[i-n+1 .. i]\` 是异位词，记录起点 \`i - n + 1\`
- Python 可直接用 \`==\` 比较两个列表；JS 数组不能用 \`==\` 比内容，用循环逐位比较（字母表只有 26，代价可忽略）
- 窗口从左向右滑动，记录的下标天然升序

ACM 版本按两行读入 \`s\`、\`p\`，把结果下标用空格拼接输出；无答案时 \`join\` 得到空串，打印出一个空行。
`,
};
