// 76. 最小覆盖子串
export default {
  id: 76,
  title: '最小覆盖子串',
  slug: 'minimum-window-substring',
  difficulty: 'hard',
  tags: ['哈希表', '字符串', '滑动窗口'],
  hints: [
    '关键观察：覆盖必须按字符出现次数计算；窗口中某字符超过 t 的需求量只是富余，只有移除到低于需求量时窗口才会失效。',
    '采用变长滑动窗口：右指针扩张直到覆盖 t，再持续移动左指针压缩合法窗口，并在所有合法窗口中记录最短者。',
    '先统计 t 的需求并令 missing = t.length；纳入仍欠缺的字符时 missing--，当 missing 为 0 时更新答案并移出左端字符，若该字符计数加回后大于 0，则 missing++。',
    '注意大小写不同且 t 中可有重复字符；若始终没有合法窗口则返回空串，ACM 模式应从前两行读取 s、t，并让空串输出为一个空行。',
  ],

  description: `
给你一个字符串 \`s\` 和一个字符串 \`t\`。返回 \`s\` 中涵盖 \`t\` 所有字符的最小子串。如果 \`s\` 中不存在这样的子串，返回空字符串 \`""\`。

注意：\`t\` 中重复出现的字符必须全部计入，即 \`t\` 中某字符出现几次，答案子串中至少要有几次。本题测试数据保证答案唯一。

### 示例

- 输入：\`s = "ADOBECODEBANC", t = "ABC"\`，输出：\`"BANC"\`（最小的涵盖 \`A\`、\`B\`、\`C\` 的子串）
- 输入：\`s = "a", t = "a"\`，输出：\`"a"\`
- 输入：\`s = "a", t = "aa"\`，输出：\`""\`（\`t\` 中有两个 \`a\`，而 \`s\` 中只有一个）

### 提示

- \`1 <= s.length, t.length <= 10^5\`
- \`s\` 和 \`t\` 由英文字母组成（区分大小写）

### ACM 模式输入输出格式

- 输入：第一行为字符串 \`s\`；第二行为字符串 \`t\`（均不含空格）
- 输出：最小覆盖子串（无解时输出一个空行）

ACM 输入示例：
\`\`\`
ADOBECODEBANC
ABC
\`\`\`
输出：\`BANC\`
`,

  functionName: 'minWindow',
  compare: 'exact',

  tests: [
    { args: ['ADOBECODEBANC', 'ABC'], expected: 'BANC' },
    { args: ['a', 'a'], expected: 'a' },
    { args: ['a', 'aa'], expected: '' },
    { args: ['bbaa', 'aba'], expected: 'baa' },
    { args: ['ab', 'b'], expected: 'b' },
    { args: ['abcdef', 'cf'], expected: 'cdef' },
    { args: ['aAbB', 'AB'], expected: 'AbB' },
    { args: ['aaabbb', 'aab'], expected: 'aab' },
    { args: ['aa', 'aa'], expected: 'aa' },
    { args: ['dbdbbdbbaddcbddaccbddaabacadcabddbcacbdbddabbcbdabbbcddbcdcbbdadddccacbbcbdccccbccdaadcaddacdbaaaaccbdadaabbdcdbdcccaaccdbcdacccabccacbddbdacacddcccbddabcdadaacdcaabdadabaacdbcdbbddabbdadbbdcadaaccddabdabbaddbcccaaacccaaacabacdbdcacdbbdcaadddcddbddacdaaacacaddccddbccbbdddabcdcdaadaabaacadaccbcadcdbbbcbbdcadabdaacbbcbadccaacddcdbaadacbbbbbabadcacadacccadadcbdbabcbbcadacadcacbcbddacdbbcbacdabadaddcbccadccbbdccdbadccdbdcbdddcabbdbdacdbddccacbcbccbacdaadbddadcadadcdaccccdcbddbddcadbbdbbdbdadddbbbcabcbbdacdbdaaabcddbadaddbadacaddbddabdadbaccddddabaabbdddbcccdbadacbcbaccabcaadddcdddcccabbdbdccdaabcc', 'aabbc'], expected: 'aacbb' },
  ],

  acmTests: [
    { input: 'ADOBECODEBANC\nABC\n', output: 'BANC\n' },
    { input: 'a\na\n', output: 'a\n' },
    { input: 'a\naa\n', output: '\n' },
    { input: 'bbaa\naba\n', output: 'baa\n' },
    { input: 'ab\nb\n', output: 'b\n' },
    { input: 'abcdef\ncf\n', output: 'cdef\n' },
    { input: 'aAbB\nAB\n', output: 'AbB\n' },
    { input: 'aaabbb\naab\n', output: 'aab\n' },
    { input: 'aa\naa\n', output: 'aa\n' },
    { input: 'dbdbbdbbaddcbddaccbddaabacadcabddbcacbdbddabbcbdabbbcddbcdcbbdadddccacbbcbdccccbccdaadcaddacdbaaaaccbdadaabbdcdbdcccaaccdbcdacccabccacbddbdacacddcccbddabcdadaacdcaabdadabaacdbcdbbddabbdadbbdcadaaccddabdabbaddbcccaaacccaaacabacdbdcacdbbdcaadddcddbddacdaaacacaddccddbccbbdddabcdcdaadaabaacadaccbcadcdbbbcbbdcadabdaacbbcbadccaacddcdbaadacbbbbbabadcacadacccadadcbdbabcbbcadacadcacbcbddacdbbcbacdabadaddcbccadccbbdccdbadccdbdcbdddcabbdbdacdbddccacbcbccbacdaadbddadcadadcdaccccdcbddbddcadbbdbbdbdadddbbbcabcbbdacdbdaaabcddbadaddbadacaddbddabdadbaccddddabaabbdddbcccdbadacbcbaccabcaadddcdddcccabbdbdccdaabcc\naabbc\n', output: 'aacbb\n' },
  ],

  templates: {
    core: {
      javascript: `/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function(s, t) {
    
};
`,
      python: `def minWindow(s, t):
    # 返回 s 中涵盖 t 所有字符的最小子串，无解返回空串
    pass
`,
    },
    acm: {
      javascript: `// ACM 模式：input 是全部输入（字符串），用 console.log 输出答案
// 输入格式：第一行 s，第二行 t（均不含空格）
const lines = input.split('\\n');
const s = lines[0];
const t = lines[1];

// 在这里写你的代码，用 console.log 输出最小覆盖子串（无解输出空行）

`,
      python: `# ACM 模式：用 input() 或 sys.stdin 读输入，用 print 输出答案
# 输入格式：第一行 s，第二行 t（均不含空格）
import sys

lines = sys.stdin.read().split('\\n')
s = lines[0]
t = lines[1]

# 在这里写你的代码，用 print 输出最小覆盖子串（无解输出空行）
`,
    },
  },

  solutions: {
    core: {
      javascript: `var minWindow = function(s, t) {
  const need = new Map(); // 字符 -> 窗口还缺几个
  for (const ch of t) need.set(ch, (need.get(ch) || 0) + 1);
  let missing = t.length; // 窗口总共还缺多少个字符（含重复计数）
  let start = 0;
  let minLen = Infinity;
  let left = 0;
  for (let right = 0; right < s.length; right++) {
    const c = s[right];
    if (need.has(c)) {
      if (need.get(c) > 0) missing--; // 真正补上了一个缺口
      need.set(c, need.get(c) - 1);
    }
    while (missing === 0) { // 窗口已覆盖 t，尝试收缩左边界
      if (right - left + 1 < minLen) {
        minLen = right - left + 1;
        start = left;
      }
      const d = s[left];
      if (need.has(d)) {
        need.set(d, need.get(d) + 1);
        if (need.get(d) > 0) missing++; // d 从富余变成缺失
      }
      left++;
    }
  }
  return minLen === Infinity ? '' : s.slice(start, start + minLen);
};
`,
      python: `def minWindow(s, t):
    need = {}  # 字符 -> 窗口还缺几个
    for ch in t:
        need[ch] = need.get(ch, 0) + 1
    missing = len(t)  # 窗口总共还缺多少个字符（含重复计数）
    start = 0
    min_len = len(s) + 1
    left = 0
    for right in range(len(s)):
        c = s[right]
        if c in need:
            if need[c] > 0:
                missing -= 1  # 真正补上了一个缺口
            need[c] -= 1
        while missing == 0:  # 窗口已覆盖 t，尝试收缩左边界
            if right - left + 1 < min_len:
                min_len = right - left + 1
                start = left
            d = s[left]
            if d in need:
                need[d] += 1
                if need[d] > 0:
                    missing += 1  # d 从富余变成缺失
            left += 1
    return '' if min_len == len(s) + 1 else s[start:start + min_len]
`,
    },
    acm: {
      javascript: `const lines = input.split('\\n');
const s = lines[0];
const t = lines[1];

const need = new Map();
for (const ch of t) need.set(ch, (need.get(ch) || 0) + 1);
let missing = t.length;
let start = 0;
let minLen = Infinity;
let left = 0;
for (let right = 0; right < s.length; right++) {
  const c = s[right];
  if (need.has(c)) {
    if (need.get(c) > 0) missing--;
    need.set(c, need.get(c) - 1);
  }
  while (missing === 0) {
    if (right - left + 1 < minLen) {
      minLen = right - left + 1;
      start = left;
    }
    const d = s[left];
    if (need.has(d)) {
      need.set(d, need.get(d) + 1);
      if (need.get(d) > 0) missing++;
    }
    left++;
  }
}
console.log(minLen === Infinity ? '' : s.slice(start, start + minLen));
`,
      python: `import sys

lines = sys.stdin.read().split('\\n')
s = lines[0]
t = lines[1]

need = {}
for ch in t:
    need[ch] = need.get(ch, 0) + 1
missing = len(t)
start = 0
min_len = len(s) + 1
left = 0
for right in range(len(s)):
    c = s[right]
    if c in need:
        if need[c] > 0:
            missing -= 1
        need[c] -= 1
    while missing == 0:
        if right - left + 1 < min_len:
            min_len = right - left + 1
            start = left
        d = s[left]
        if d in need:
            need[d] += 1
            if need[d] > 0:
                missing += 1
        left += 1
print('' if min_len == len(s) + 1 else s[start:start + min_len])
`,
    },
  },

  idea: `
求「最小覆盖子串」是**变长滑动窗口**的经典问题。维护窗口 \`[left, right]\` 和一张「需求表」：

- 需求表记录 \`t\` 中每个字符还缺多少个；\`missing\` 记录窗口总共还缺几个字符（含重复计数）
- 右指针不断扩张纳入新字符：若它是需要的字符且仍缺（计数 > 0），\`missing--\`
- 当 \`missing == 0\`（窗口已覆盖 \`t\`）时收缩左边界：先用当前窗口更新最优答案，再移除左端字符；若移除后重新变得缺失，停止收缩、继续扩张右指针

为什么对：对每个右端点，收缩到「恰好仍覆盖 \`t\`」的位置，得到的就是以该右端点结尾的最短合法窗口；枚举所有右端点取最优即全局最优。

两个指针都单向移动，每个字符进出窗口各一次，时间复杂度 O(|s| + |t|)，空间复杂度 O(Σ)（Σ 为字符集大小）。
`,

  explanation: `
- \`need\` 用哈希表记录 \`t\` 的字符需求；窗口中遇到 \`t\` 之外的字符直接忽略，这也是区分大小写场景下不出错的关键
- 右端纳入字符 \`c\` 时：仅当 \`need[c] > 0\` 才 \`missing--\`（这次纳入真正补上了缺口），然后计数减一（允许减成负数，负数表示窗口内该字符富余）
- \`while (missing == 0)\` 收缩循环里，先用当前窗口长度更新答案，再把左端字符 \`d\` 的计数加回；若加回后 \`need[d] > 0\`，说明 \`d\` 从富余变成缺失，\`missing++\)，窗口不再合法、退出收缩
- \`minLen\` 始终未更新（仍为初始的无穷大）说明无解，返回空串；否则返回 \`s.slice(start, start + minLen)\`
- 易错点：更新答案必须发生在移除左端字符**之前**；加回计数与 \`missing++\` 的顺序不能颠倒（先加回，再判断是否大于 0）

ACM 版本从两行分别读入 \`s\` 与 \`t\`，套用同一套滑动窗口，最后打印结果；无解时打印空串即一个空行。
`,
};
