// 3. 无重复字符的最长子串
export default {
  id: 3,
  title: '无重复字符的最长子串',
  slug: 'longest-substring-without-repeating-characters',
  difficulty: 'medium',
  tags: ['哈希表', '字符串', '滑动窗口'],
  hints: [
    '最长目标必须是连续子串，可维护一个始终无重复字符的窗口，而不必重新检查每个候选子串。',
    '采用滑动窗口，并用哈希表保存每个字符最近一次出现的下标，让左边界可以直接跳跃。',
    '右指针逐字符扫描；若字符上次位置不小于 left，则令 left=last[ch]+1，随后更新 last[ch] 并刷新 right-left+1。',
    '左边界只能右移，旧下标已在窗口外时不能回退；ACM 读取第一行而不要整体 trim，否则空串用例会被改变。',
  ],

  description: `
给定一个字符串 \`s\`，请你找出其中不含有重复字符的**最长子串**（子串要求连续，与子序列不同）的长度。

### 示例

- 输入：\`s = "abcabcbb"\`，输出：\`3\`（最长无重复子串是 \`"abc"\`）
- 输入：\`s = "bbbbb"\`，输出：\`1\`（最长无重复子串是 \`"b"\`）
- 输入：\`s = "pwwkew"\`，输出：\`3\`（最长无重复子串是 \`"wke"\`；注意 \`"pwke"\` 是子序列，不是子串）
- 输入：\`s = ""\`，输出：\`0\`

### 提示

- \`0 <= s.length <= 5 * 10^4\`
- \`s\` 由英文字母、数字组成（不含空格）
- 空串是合法输入，答案为 \`0\`

### ACM 模式输入输出格式

- 输入：仅一行，即字符串 \`s\`（只含字母和数字、不含空格；空串时该行为空行）
- 输出：一个整数，即最长无重复子串的长度

ACM 输入示例：
\`\`\`
abcabcbb
\`\`\`
输出：\`3\`
`,

  functionName: 'lengthOfLongestSubstring',
  compare: 'exact',

  tests: [
    { args: ['abcabcbb'], expected: 3 },
    { args: ['bbbbb'], expected: 1 },
    { args: ['pwwkew'], expected: 3 },
    { args: [''], expected: 0 },
    { args: ['au'], expected: 2 },
    { args: ['dvdf'], expected: 3 },
    { args: ['a'], expected: 1 },
    { args: ['abcdef'], expected: 6 },
    { args: ['abba'], expected: 2 },
    { args: ['aajgfeecfhcbhfbdcfcjcibbbcfhajfggjgjiabdeaahdeejhgddbbjdbgdagjfigjbfgijifjjfiafdhfhjfieghfdcaajigagfhjcjgigibjffbdciihgjghjecfhibfefbceebababijabeehddhhifhefcfhaciihedjcdeiejfedfcifjieegjfgbgdgidcaghjdcahjhijcjcfdhhghgfciebheffijbbcfdjifjcejghdjjiabhbajcfchhaejaadhgcebeefbhdgiabhicigdabjgcfafehbhbcciaajjefhbfafhiafdajcbcdhiihhighgdegdcefgehchfedibffggaejhfgdjahececijfjbebahhcaegdfjcfgdbgbfegihfhfhggfghhiiggbcjcjahficbdhgdbdjabchahajfjgdhcdghfhdgcadchbdadjifhiabceebedaagedaehifhjjdiihjghddhdhaffcegjcafeaaebghhhhfjjfjjdjhedcejhdhhghgiahjbehhfejjbgcfefeggiabiaidgdicbegbjagfbijgabfcdebbegjggedadfgiacaehjahjeiieacibdhgefhggcbjidegiaaciijheddaebbdfcgjjajihiehjidbeaahacecjhdjdcffjiaijhaecfabibbfieijdaaejiefhhdagbbefacjfhigeiehdaibbcciafdfbaahccgfcedbjdhegiidhfgjhgdaiiicffcdejjfhdfabgdfhbhajfdfhdgebdebbfhdahjbfbhbidjefdegfibbdbadafjgjagcihabjhhhejgefhgbjijcgjeeeegdfjbfadffjhhgehiebcifhjedegaegbcfaffbbghcehadcgiffbfidjfcfijjhbdhhcaicbfbidfighceiiddgafjdfchcbbdgffchiecdfhbfjffjgihbajgcjbjjjbaehf'], expected: 9 },
  ],

  acmTests: [
    { input: 'abcabcbb\n', output: '3\n' },
    { input: 'bbbbb\n', output: '1\n' },
    { input: 'pwwkew\n', output: '3\n' },
    { input: '\n', output: '0\n' },
    { input: 'au\n', output: '2\n' },
    { input: 'dvdf\n', output: '3\n' },
    { input: 'a\n', output: '1\n' },
    { input: 'abcdef\n', output: '6\n' },
    { input: 'abba\n', output: '2\n' },
    { input: 'aajgfeecfhcbhfbdcfcjcibbbcfhajfggjgjiabdeaahdeejhgddbbjdbgdagjfigjbfgijifjjfiafdhfhjfieghfdcaajigagfhjcjgigibjffbdciihgjghjecfhibfefbceebababijabeehddhhifhefcfhaciihedjcdeiejfedfcifjieegjfgbgdgidcaghjdcahjhijcjcfdhhghgfciebheffijbbcfdjifjcejghdjjiabhbajcfchhaejaadhgcebeefbhdgiabhicigdabjgcfafehbhbcciaajjefhbfafhiafdajcbcdhiihhighgdegdcefgehchfedibffggaejhfgdjahececijfjbebahhcaegdfjcfgdbgbfegihfhfhggfghhiiggbcjcjahficbdhgdbdjabchahajfjgdhcdghfhdgcadchbdadjifhiabceebedaagedaehifhjjdiihjghddhdhaffcegjcafeaaebghhhhfjjfjjdjhedcejhdhhghgiahjbehhfejjbgcfefeggiabiaidgdicbegbjagfbijgabfcdebbegjggedadfgiacaehjahjeiieacibdhgefhggcbjidegiaaciijheddaebbdfcgjjajihiehjidbeaahacecjhdjdcffjiaijhaecfabibbfieijdaaejiefhhdagbbefacjfhigeiehdaibbcciafdfbaahccgfcedbjdhegiidhfgjhgdaiiicffcdejjfhdfabgdfhbhajfdfhdgebdebbfhdahjbfbhbidjefdegfibbdbadafjgjagcihabjhhhejgefhgbjijcgjeeeegdfjbfadffjhhgehiebcifhjedegaegbcfaffbbghcehadcgiffbfidjfcfijjhbdhhcaicbfbidfighceiiddgafjdfchcbbdgffchiecdfhbfjffjgihbajgcjbjjjbaehf\n', output: '9\n' },
  ],

  templates: {
    core: {
      javascript: `/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    
};
`,
      python: `def lengthOfLongestSubstring(s):
    # 返回最长无重复字符子串的长度
    pass
`,
    },
    acm: {
      javascript: `// ACM 模式：input 是全部输入（字符串），用 console.log 输出答案
// 输入格式：仅一行，即字符串 s（空串时为空行）
// 注意：不要对整个 input 用 trim()，否则空串用例会被吞掉；应 split('\\n') 后取第一行
const s = input.split('\\n')[0];

// 在这里写你的代码，用 console.log 输出答案

`,
      python: `# ACM 模式：用 input() 或 sys.stdin 读输入，用 print 输出答案
# 输入格式：仅一行，即字符串 s（空串时为空行）
# 注意：不要对整个输入用 strip()，否则空串用例会被吞掉；应 split('\\n') 后取第一行
import sys

s = sys.stdin.read().split('\\n')[0]

# 在这里写你的代码，用 print 输出答案
`,
    },
  },

  solutions: {
    core: {
      javascript: `var lengthOfLongestSubstring = function(s) {
  const last = new Map(); // 字符 -> 最近一次出现的下标
  let left = 0;  // 窗口左边界
  let best = 0;
  for (let right = 0; right < s.length; right++) {
    const ch = s[right];
    // ch 在窗口内出现过：左边界跳到它上次出现位置的右边
    if (last.has(ch) && last.get(ch) >= left) {
      left = last.get(ch) + 1;
    }
    last.set(ch, right);
    const len = right - left + 1;
    if (len > best) best = len;
  }
  return best;
};
`,
      python: `def lengthOfLongestSubstring(s):
    last = {}  # 字符 -> 最近一次出现的下标
    left = 0   # 窗口左边界
    best = 0
    for right, ch in enumerate(s):
        # ch 在窗口内出现过：左边界跳到它上次出现位置的右边
        if ch in last and last[ch] >= left:
            left = last[ch] + 1
        last[ch] = right
        best = max(best, right - left + 1)
    return best
`,
    },
    acm: {
      javascript: `// 不要对整个 input 用 trim()，否则空串用例会被吞掉
const s = input.split('\\n')[0];

const last = new Map(); // 字符 -> 最近一次出现的下标
let left = 0;
let best = 0;
for (let right = 0; right < s.length; right++) {
  const ch = s[right];
  if (last.has(ch) && last.get(ch) >= left) {
    left = last.get(ch) + 1;
  }
  last.set(ch, right);
  const len = right - left + 1;
  if (len > best) best = len;
}
console.log(best);
`,
      python: `import sys

# 不要对整个输入用 strip()，否则空串用例会被吞掉
s = sys.stdin.read().split('\\n')[0]

last = {}  # 字符 -> 最近一次出现的下标
left = 0
best = 0
for right, ch in enumerate(s):
    if ch in last and last[ch] >= left:
        left = last[ch] + 1
    last[ch] = right
    best = max(best, right - left + 1)
print(best)
`,
    },
  },

  idea: `
枚举所有子串再检查是否有重复字符，需要 O(n²) 甚至更高，无法承受 \`5 * 10^4\` 的长度。

经典解法是**滑动窗口**：维护窗口 \`[left, right]\`，保证窗口内永远没有重复字符。

- 右指针 \`right\` 逐个向右扩展，把新字符 \`s[right]\` 纳入窗口
- 如果这个字符在窗口内已经出现过，说明重复了：把左指针 \`left\` 直接跳到它**上次出现位置的下一位**，窗口重新合法
- 每步用当前窗口长度 \`right - left + 1\` 更新答案

用**哈希表**记录每个字符最近一次出现的下标，左指针的跳转就是 O(1) 的。注意判断时要加上「上次出现位置 >= left」：如果该字符上次出现的位置已经在窗口之外，就不算冲突。

每个字符最多进出窗口一次，时间复杂度 O(n)，空间复杂度 O(k)（k 为字符集大小）。
`,

  explanation: `
- \`last\`（JS 中的 \`Map\`）记录每个字符**最近一次**出现的下标，遇到重复时靠它决定左边界跳到哪里
- \`left\` 是窗口左边界，\`right\` 是右边界；窗口 \`[left, right]\` 内始终无重复字符
- 关键判断 \`last.has(ch) && last.get(ch) >= left\`：只有 \`ch\` 上次出现的位置落在当前窗口内才需要收缩窗口；否则那个旧位置早已滑出窗口，不构成冲突
- 收缩时 \`left = last.get(ch) + 1\`，直接跳过重复字符的旧位置，而不是一格一格挪，这是 O(n) 的关键
- 随后把 \`ch\` 的最新下标更新为 \`right\`，并用 \`right - left + 1\` 刷新最大值
- 空串时循环体一次都不执行，\`best\` 保持 \`0\`，自然得到正确答案

ACM 版本算法一致，唯一的坑在输入读取：必须 \`split('\\n')\` 后取第一行，而不能对整个输入 \`trim()\` / \`strip()\`——空串用例的输入只有一个换行符，整体去空白后两个版本行为不同，取第一行才能稳定得到空串。
`,
};
