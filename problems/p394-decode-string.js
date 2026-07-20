// 394. 字符串解码
// 普通字符串题目，compare 用 exact；参考答案用「数字栈 + 字符串栈」
export default {
  id: 394,
  title: '字符串解码',
  slug: 'decode-string',
  difficulty: 'medium',
  tags: ['栈', '递归', '字符串'],
  hints: [
    '方括号的嵌套关系符合后进先出；数字可能有多位，必须连续累积完整的重复次数，而不能逐字符独立处理。',
    '使用数字栈保存各层重复次数、字符串栈保存进入括号前的前缀，并用 cur 维护当前嵌套层已经解码的内容。',
    '扫描字符：数字更新 num = num * 10 + digit；遇到 [ 压入 num 和 cur 后清零；遇到 ] 弹出 k 与前缀并令 cur = prefix + cur.repeat(k)；字母直接追加。',
    '每次处理 [ 后都要重置 num 和 cur，避免污染下一层；题目保证括号合法。ACM 模式只读取第一行编码串并原样输出完整解码结果。',
  ],

  description: `
给定一个经过编码的字符串，返回它解码后的字符串。

编码规则为：\`k[encoded_string]\`，表示其中方括号内部的 \`encoded_string\` 正好重复 \`k\` 次。注意 \`k\` 保证为正整数。

你可以认为输入字符串总是有效的；输入字符串中没有额外的空格，且输入的方括号总是符合格式要求的。

此外，你可以认为原始数据不包含数字，所有的数字只表示重复的次数 \`k\`，例如不会出现像 \`3a\` 或 \`2[4]\` 的输入。

### 示例

- 输入：\`s = "3[a]2[bc]"\`，输出：\`"aaabcbc"\`
- 输入：\`s = "3[a2[c]]"\`，输出：\`"accaccacc"\`
- 输入：\`s = "2[abc]3[cd]ef"\`，输出：\`"abcabccdcdcdef"\`

### 提示

- \`1 <= s.length <= 30\`
- \`s\` 由小写英文字母、数字和方括号 \`'[]'\` 组成
- \`s\` 保证是一个有效的输入，所有整数范围 \`[1, 300]\`

### ACM 模式输入输出格式

- 输入：第一行为编码后的字符串 \`s\`
- 输出：解码后的字符串

ACM 输入示例：
\`\`\`
3[a2[c]]
\`\`\`
输出：\`accaccacc\`
`,

  functionName: 'decodeString',
  compare: 'exact',

  tests: [
    { args: ['3[a]2[bc]'], expected: 'aaabcbc' },
    { args: ['3[a2[c]]'], expected: 'accaccacc' },
    { args: ['2[abc]3[cd]ef'], expected: 'abcabccdcdcdef' },
    { args: ['abc3[cd]xyz'], expected: 'abccdcdcdxyz' },
    { args: ['10[ab]'], expected: 'abababababababababab' },
    { args: ['a2[b3[c]d]e'], expected: 'abcccdbcccde' },
    { args: ['1[ab]'], expected: 'ab' },
    { args: ['2[a3[b2[c]]]'], expected: 'abccbccbccabccbccbcc' },
    { args: ['3[x2[y]z]2[w]'], expected: 'xyyzxyyzxyyzww' },
    { args: ['a2[b3[c2[d]]e]f'], expected: 'abcddcddcddebcddcddcddef' },
  ],

  acmTests: [
    { input: '3[a]2[bc]\n', output: 'aaabcbc\n' },
    { input: '3[a2[c]]\n', output: 'accaccacc\n' },
    { input: '2[abc]3[cd]ef\n', output: 'abcabccdcdcdef\n' },
    { input: 'abc3[cd]xyz\n', output: 'abccdcdcdxyz\n' },
    { input: '10[ab]\n', output: 'abababababababababab\n' },
    { input: 'a2[b3[c]d]e\n', output: 'abcccdbcccde\n' },
    { input: '1[ab]\n', output: 'ab\n' },
    { input: '2[a3[b2[c]]]\n', output: 'abccbccbccabccbccbcc\n' },
    { input: '3[x2[y]z]2[w]\n', output: 'xyyzxyyzxyyzww\n' },
    { input: 'a2[b3[c2[d]]e]f\n', output: 'abcddcddcddebcddcddcddef\n' },
  ],

  templates: {
    core: {
      javascript: `/**
 * @param {string} s
 * @return {string}
 */
var decodeString = function(s) {
    
};
`,
      python: `def decodeString(s):
    # 返回解码后的字符串
    pass
`,
    },
    acm: {
      javascript: `// ACM 模式：input 是全部输入（字符串），用 console.log 输出答案
// 输入格式：第一行为编码后的字符串 s
const s = input.split('\\n')[0];

// 在这里写你的代码，用 console.log 输出解码后的字符串

`,
      python: `# ACM 模式：用 input() 或 sys.stdin 读输入，用 print 输出答案
# 输入格式：第一行为编码后的字符串 s
import sys

s = sys.stdin.read().split('\\n')[0]

# 在这里写你的代码，用 print 输出解码后的字符串
`,
    },
  },

  solutions: {
    core: {
      javascript: `var decodeString = function(s) {
  const numStack = []; // 各层的重复次数
  const strStack = []; // 各层「左括号之前」已拼好的字符串
  let num = 0;         // 当前正在读取的数字
  let cur = '';        // 当前这一层已拼好的字符串

  for (const ch of s) {
    if (ch >= '0' && ch <= '9') {
      num = num * 10 + (ch.charCodeAt(0) - 48); // 支持多位数
    } else if (ch === '[') {
      numStack.push(num);
      strStack.push(cur);
      num = 0;
      cur = ''; // 括号内是新的一层，从零开始拼
    } else if (ch === ']') {
      const k = numStack.pop();
      cur = strStack.pop() + cur.repeat(k); // 重复 k 次后接回上一层
    } else {
      cur += ch;
    }
  }
  return cur;
};
`,
      python: `def decodeString(s):
    num_stack = []  # 各层的重复次数
    str_stack = []  # 各层「左括号之前」已拼好的字符串
    num = 0         # 当前正在读取的数字
    cur = ''        # 当前这一层已拼好的字符串

    for ch in s:
        if ch.isdigit():
            num = num * 10 + int(ch)  # 支持多位数
        elif ch == '[':
            num_stack.append(num)
            str_stack.append(cur)
            num = 0
            cur = ''  # 括号内是新的一层，从零开始拼
        elif ch == ']':
            k = num_stack.pop()
            cur = str_stack.pop() + cur * k  # 重复 k 次后接回上一层
        else:
            cur += ch
    return cur
`,
    },
    acm: {
      javascript: `const s = input.split('\\n')[0];

const numStack = [];
const strStack = [];
let num = 0;
let cur = '';

for (const ch of s) {
  if (ch >= '0' && ch <= '9') {
    num = num * 10 + (ch.charCodeAt(0) - 48);
  } else if (ch === '[') {
    numStack.push(num);
    strStack.push(cur);
    num = 0;
    cur = '';
  } else if (ch === ']') {
    const k = numStack.pop();
    cur = strStack.pop() + cur.repeat(k);
  } else {
    cur += ch;
  }
}
console.log(cur);
`,
      python: `import sys

s = sys.stdin.read().split('\\n')[0]

num_stack = []
str_stack = []
num = 0
cur = ''

for ch in s:
    if ch.isdigit():
        num = num * 10 + int(ch)
    elif ch == '[':
        num_stack.append(num)
        str_stack.append(cur)
        num = 0
        cur = ''
    elif ch == ']':
        k = num_stack.pop()
        cur = str_stack.pop() + cur * k
    else:
        cur += ch

print(cur)
`,
    },
  },

  idea: `
括号嵌套天然匹配**栈**的结构。扫描字符串，维护两个栈：数字栈保存各层的重复次数，字符串栈保存各层「左括号之前已经拼好的字符串」。

- 遇到数字：累积当前数值（注意可能是多位数，如 \`10\`）
- 遇到字母：直接追加到当前字符串
- 遇到 \`[\`：把当前数值和当前字符串分别压栈，然后清零——括号内是从零开始的新一层
- 遇到 \`]\`：弹栈，当前字符串重复 \`k\` 次后接到上一层字符串的后面

也可以写成递归（遇到 \`[\` 进入子问题、遇到 \`]\` 返回），但栈的迭代写法更直白。时间复杂度 O(输出字符串长度)，空间复杂度 O(嵌套深度)。
`,

  explanation: `
- \`num\` 累积当前数字：\`num = num * 10 + digit\`，这样 \`10[ab]\` 这种多位数才能读对；遇到 \`[\` 才把完整的 \`num\` 压栈，压栈后别忘了清零
- \`cur\` 是「当前这一层已经拼好的字符串」
- 遇到 \`[\`：把 \`num\` 和 \`cur\` 分别压入数字栈、字符串栈，然后 \`num\`、\`cur\` 归零——括号内的内容是新的一层，从零开始拼
- 遇到 \`]\`：弹出重复次数 \`k\` 和上一层字符串 \`prev\`，令 \`cur = prev + cur 重复 k 次\`；先弹先算，两个栈的弹出顺序不能搞反
- 遇到普通字母直接 \`cur += ch\`
- 题目保证输入合法，因此不需要处理括号不匹配、栈空等异常

ACM 版本只是从输入读一行字符串，算法与核心模式完全一致，最后 \`console.log\` / \`print\` 输出解码结果。
`,
};
