// 763. 划分字母区间
export default {
  id: 763,
  title: '划分字母区间',
  slug: 'partition-labels',
  difficulty: 'medium',
  tags: ['贪心', '哈希表', '双指针', '字符串'],
  hints: [
    '一个片段只要包含了某个字母，就必须覆盖该字母在整个字符串中的最后一次出现位置；片段能切开的最早位置由其中所有字母的最远末次位置决定。',
    '先记录每个小写字母最后出现的下标，再贪心扫描字符串，动态扩展当前片段右端点，并在满足约束的最早位置切分以得到最多片段。',
    '维护 start 和 end；对每个 i 执行 end = max(end, last[s[i]])，当 i 等于 end 时记录 end - start + 1，并把 start 更新为 i + 1。',
    '更新 end 后才能判断是否切分，且长度要包含两端所以需加 1；ACM 模式读取第一行字符串，按顺序用空格输出各片段长度。',
  ],

  description: `
给你一个字符串 \`s\`。我们要把这个字符串划分为尽可能多的片段，同一字母最多出现在一个片段中。

返回一个列表，依次表示每个片段的长度。

### 示例

- 输入：\`s = "ababcbacadefegdehijhklij"\`，输出：\`[9,7,8]\`（划分为 "ababcbaca"、"defegde"、"hijhklij"，每个字母只出现在一个片段中）
- 输入：\`s = "eccbbbbdec"\`，输出：\`[10]\`

### 提示

- \`1 <= s.length <= 500\`
- \`s\` 仅由小写英文字母组成

### ACM 模式输入输出格式

- 输入：第一行为字符串 \`s\`（只含小写字母）
- 输出：各片段长度（空格分隔，同一行输出）

ACM 输入示例：
\`\`\`
ababcbacadefegdehijhklij
\`\`\`
输出：\`9 7 8\`
`,

  functionName: 'partitionLabels',
  compare: 'exact',

  tests: [
    { args: ['ababcbacadefegdehijhklij'], expected: [9, 7, 8] },
    { args: ['eccbbbbdec'], expected: [10] },
    { args: ['a'], expected: [1] },
    { args: ['ab'], expected: [1, 1] },
    { args: ['abcba'], expected: [5] },
    { args: ['aaa'], expected: [3] },
    { args: ['abcdef'], expected: [1, 1, 1, 1, 1, 1] },
    { args: ['abca'], expected: [4] },
    { args: ['ababab'], expected: [6] },
    { args: ['deddedccdcecdeeeeceeecdcddcdchhfgffhjhgigifiggihjjfgfffjfhhfhihfffhffigfiifjjilllkmolmlmlokllklkmlommlmkllmkolkmlprrtsptsqrqrqtstrsttrpqqqpqptxxvwxzyvwwzxyyxyuxxzvuuwuxzwywvxvxvwyxu'], expected: [29, 49, 35, 29, 39] },
  ],

  acmTests: [
    { input: 'ababcbacadefegdehijhklij\n', output: '9 7 8\n' },
    { input: 'eccbbbbdec\n', output: '10\n' },
    { input: 'a\n', output: '1\n' },
    { input: 'ab\n', output: '1 1\n' },
    { input: 'abcba\n', output: '5\n' },
    { input: 'aaa\n', output: '3\n' },
    { input: 'abcdef\n', output: '1 1 1 1 1 1\n' },
    { input: 'abca\n', output: '4\n' },
    { input: 'ababab\n', output: '6\n' },
    { input: 'deddedccdcecdeeeeceeecdcddcdchhfgffhjhgigifiggihjjfgfffjfhhfhihfffhffigfiifjjilllkmolmlmlokllklkmlommlmkllmkolkmlprrtsptsqrqrqtstrsttrpqqqpqptxxvwxzyvwwzxyyxyuxxzvuuwuxzwywvxvxvwyxu\n', output: '29 49 35 29 39\n' },
  ],

  templates: {
    core: {
      javascript: `/**
 * @param {string} s
 * @return {number[]}
 */
var partitionLabels = function(s) {
    
};
`,
      python: `def partitionLabels(s):
    # 返回各片段长度组成的列表
    pass
`,
    },
    acm: {
      javascript: `// ACM 模式：input 是全部输入（字符串），用 console.log 输出答案
// 输入格式：第一行为字符串 s（只含小写字母）
const s = input.split('\\n')[0];

// 在这里写你的代码，用 console.log(结果数组.join(' ')) 输出各段长度

`,
      python: `# ACM 模式：用 input() 或 sys.stdin 读输入，用 print 输出答案
# 输入格式：第一行为字符串 s（只含小写字母）
import sys

s = sys.stdin.read().split('\\n')[0]

# 在这里写你的代码，用 print(' '.join(map(str, 结果列表))) 输出各段长度
`,
    },
  },

  solutions: {
    core: {
      javascript: `var partitionLabels = function(s) {
  const last = new Array(26).fill(0); // 每个字母最后出现的下标
  for (let i = 0; i < s.length; i++) {
    last[s.charCodeAt(i) - 97] = i;
  }
  const res = [];
  let start = 0; // 当前片段起点
  let end = 0;   // 当前片段必须延伸到的最远下标
  for (let i = 0; i < s.length; i++) {
    end = Math.max(end, last[s.charCodeAt(i) - 97]);
    if (i === end) { // 片段内所有字母都到此为止，切一刀
      res.push(end - start + 1);
      start = i + 1;
    }
  }
  return res;
};
`,
      python: `def partitionLabels(s):
    last = {c: i for i, c in enumerate(s)}  # 每个字母最后出现的下标
    res = []
    start = 0  # 当前片段起点
    end = 0    # 当前片段必须延伸到的最远下标
    for i, c in enumerate(s):
        end = max(end, last[c])
        if i == end:  # 片段内所有字母都到此为止，切一刀
            res.append(end - start + 1)
            start = i + 1
    return res
`,
    },
    acm: {
      javascript: `const s = input.split('\\n')[0];

const last = new Array(26).fill(0);
for (let i = 0; i < s.length; i++) {
  last[s.charCodeAt(i) - 97] = i;
}
const res = [];
let start = 0;
let end = 0;
for (let i = 0; i < s.length; i++) {
  end = Math.max(end, last[s.charCodeAt(i) - 97]);
  if (i === end) {
    res.push(end - start + 1);
    start = i + 1;
  }
}

console.log(res.join(' '));
`,
      python: `import sys

s = sys.stdin.read().split('\\n')[0]

last = {c: i for i, c in enumerate(s)}
res = []
start = 0
end = 0
for i, c in enumerate(s):
    end = max(end, last[c])
    if i == end:
        res.append(end - start + 1)
        start = i + 1

print(' '.join(map(str, res)))
`,
    },
  },

  idea: `
**贪心 + 记录最后出现位置。**

一个片段要合法，片段内每个字母的所有出现都必须被包含进来。因此先扫描一遍，记录每个字母在字符串中最后出现的下标 \`last[c]\`。

第二遍扫描时维护当前片段「必须延伸到的最远端点」\`end\`：遍历到下标 \`i\`，字母 \`s[i]\` 既然已经在片段里，片段就必须延伸到它的最后一次出现处，即 \`end = max(end, last[s[i]])\`。当 \`i == end\` 时，说明片段内所有字母的最后出现位置都不超过 \`i\`，可以在这里切一刀，记录长度并开始新片段。

为什么片段数最多：每次都在「最早可以切」的位置切，贪心地让每个片段尽可能短，后面的片段才可能更多，总片段数自然最多。

时间 O(n)，空间 O(1)（\`last\` 最多存 26 个字母）。
`,

  explanation: `
- 第一遍扫描用 \`last\`（JS 用长度为 26 的数组，Python 用字典）记录每个字母最后出现的下标；重复出现的字母会被后面的下标覆盖，正好留下「最后」的位置
- \`charCodeAt(i) - 97\`：97 是字母 \`a\` 的编码，把字母映射到 0~25
- 第二遍扫描：\`end\` 是当前片段必须延伸到的最远下标，\`start\` 是当前片段的起点
- \`end = max(end, last[c])\`：把当前字母的最后出现位置纳入片段范围。注意要用 \`max\` 累加，不能直接赋值——后出现的字母最后位置可能反而更近
- \`i === end\` 时切一刀：\`res.push(end - start + 1)\`，然后把 \`start\` 移到 \`i + 1\` 开始新片段
- 易错点：判断切分用 \`i === end\`，不要在更新 \`end\` 之前判断，否则会把片段切早

ACM 版本读入一行字符串，输出时用空格连接各段长度。
`,
};
