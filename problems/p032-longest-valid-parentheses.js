// 32. 最长有效括号
export default {
  id: 32,
  title: '最长有效括号',
  slug: 'longest-valid-parentheses',
  difficulty: 'hard',
  tags: ['栈', '字符串', '动态规划'],
  hints: [
    '为了计算连续有效长度，栈中应存下标而不是括号字符；栈顶可表示当前有效段左侧的最近障碍位置。',
    '使用下标栈并预放 -1：左括号下标入栈，右括号尝试弹出一个待匹配左括号。',
    '弹出后若栈空，当前右括号无法匹配，将其下标作为新分界；否则用 i-stack.top 更新最长长度。',
    '必须先判栈空再访问栈顶，连续右括号尤其容易越界；ACM 空行表示空串，应输出 0。',
  ],

  description: `
给你一个只包含 \`'('\` 和 \`')'\` 的字符串，找出最长有效（格式正确且连续）括号子串的长度。

### 示例

- 输入：\`s = "(()"\`，输出：\`2\`（最长有效括号子串是 \`"()"\`）
- 输入：\`s = ")()())"\`，输出：\`4\`（最长有效括号子串是 \`"()()"\`）
- 输入：\`s = ""\`，输出：\`0\`

### 提示

- \`0 <= s.length <= 3 * 10^4\`
- \`s[i]\` 为 \`'('\` 或 \`')'\`

### ACM 模式输入输出格式

- 输入：第一行为括号字符串（可能为空行，表示空串）
- 输出：一个整数，即最长有效括号子串的长度

ACM 输入示例：
\`\`\`
)()())
\`\`\`
输出：\`4\`
`,

  functionName: 'longestValidParentheses',
  compare: 'exact',

  tests: [
    { args: ['(()'], expected: 2 },
    { args: [')()())'], expected: 4 },
    { args: [''], expected: 0 },
    { args: ['()(())'], expected: 6 },
    { args: ['((((('], expected: 0 },
    { args: ['(()()('], expected: 4 },
    { args: ['))))'], expected: 0 },
    { args: ['()'], expected: 2 },
    { args: ['(((())))'], expected: 8 },
    { args: ['()((())))()))(()()))))(((()(())()())())()))())())(()()(()((()()(())((())(()()()(((()()(()))()()(()))'], expected: 20 },
  ],

  acmTests: [
    { input: '(()\n', output: '2\n' },
    { input: ')()())\n', output: '4\n' },
    { input: '\n', output: '0\n' },
    { input: '()(())\n', output: '6\n' },
    { input: '(((((\n', output: '0\n' },
    { input: '(()()(\n', output: '4\n' },
    { input: '))))\n', output: '0\n' },
    { input: '()\n', output: '2\n' },
    { input: '(((())))\n', output: '8\n' },
    { input: '()((())))()))(()()))))(((()(())()())())()))())())(()()(()((()()(())((())(()()()(((()()(()))()()(()))\n', output: '20\n' },
  ],

  templates: {
    core: {
      javascript: `/**
 * @param {string} s
 * @return {number}
 */
var longestValidParentheses = function(s) {
    
};
`,
      python: `def longestValidParentheses(s):
    # 返回最长有效括号子串的长度
    pass
`,
    },
    acm: {
      javascript: `// ACM 模式：input 是全部输入（字符串），用 console.log 输出答案
// 输入格式：第一行为括号字符串（可能为空行，表示空串）
const s = input.split('\\n')[0];

// 在这里写你的代码，用 console.log(ans) 输出最长长度

`,
      python: `# ACM 模式：用 input() 或 sys.stdin 读输入，用 print 输出答案
# 输入格式：第一行为括号字符串（可能为空行，表示空串）
import sys

s = sys.stdin.read().split('\\n')[0]

# 在这里写你的代码，用 print(ans) 输出最长长度
`,
    },
  },

  solutions: {
    core: {
      javascript: `var longestValidParentheses = function(s) {
  let ans = 0;
  const stack = [-1]; // 栈底放 -1，充当「上一个无法匹配的位置」
  for (let i = 0; i < s.length; i++) {
    if (s[i] === '(') {
      stack.push(i);
    } else {
      stack.pop();
      if (stack.length === 0) {
        stack.push(i); // 该右括号无人匹配，成为新的分界
      } else {
        ans = Math.max(ans, i - stack[stack.length - 1]);
      }
    }
  }
  return ans;
};
`,
      python: `def longestValidParentheses(s):
    ans = 0
    stack = [-1]  # 栈底放 -1，充当「上一个无法匹配的位置」
    for i, ch in enumerate(s):
        if ch == '(':
            stack.append(i)
        else:
            stack.pop()
            if not stack:
                stack.append(i)  # 该右括号无人匹配，成为新的分界
            else:
                ans = max(ans, i - stack[-1])
    return ans
`,
    },
    acm: {
      javascript: `const s = input.split('\\n')[0];

let ans = 0;
const stack = [-1];
for (let i = 0; i < s.length; i++) {
  if (s[i] === '(') {
    stack.push(i);
  } else {
    stack.pop();
    if (stack.length === 0) {
      stack.push(i);
    } else {
      ans = Math.max(ans, i - stack[stack.length - 1]);
    }
  }
}
console.log(ans);
`,
      python: `import sys

s = sys.stdin.read().split('\\n')[0]

ans = 0
stack = [-1]
for i, ch in enumerate(s):
    if ch == '(':
        stack.append(i)
    else:
        stack.pop()
        if not stack:
            stack.append(i)
        else:
            ans = max(ans, i - stack[-1])
print(ans)
`,
    },
  },

  idea: `
**栈（存下标）**：遍历字符串，用一个栈保存「尚未匹配的左括号下标」：

- 遇到 \`'('\`：下标入栈
- 遇到 \`')'\`：弹出栈顶。若弹完栈为空，说明这个右括号无人匹配，把它的下标入栈作为新的「分界线」；否则当前有效子串长度 = 当前下标 − 栈顶下标，刷新答案

栈底预先放一个 \`-1\`，相当于虚拟的分界线，使「从字符串开头就有效」的情况也能正确计算长度（例如 \`"()"\`：下标 1 匹配后栈顶是 -1，长度 = 1 − (−1) = 2）。

为什么对：每一段极大的有效子串结束于位置 \`i\` 时，\`i\` 与栈顶之间恰好全部匹配，而栈顶正是上一个无法匹配的位置（或 -1），差值即该段长度；所有段取最大值就是答案。

时间复杂度 O(n)，空间复杂度 O(n)。另有 DP 解法：\`dp[i]\` 表示以 \`i\` 结尾的最长有效长度，按 \`s[i-1]\` 以及 \`dp[i-1]\` 之前的字符分情况转移，可以做到空间 O(1) 的等价写法，但栈法更直观。
`,

  explanation: `
- \`stack = [-1]\`：栈底的 \`-1\` 是「上一个无法匹配的位置」的初始值，保证 \`i − 栈顶\` 对从头开始的有效串也成立
- 遇到 \`'('\` 直接入栈下标；遇到 \`')'\` 先弹栈：
  - 弹空 → 该右括号匹配失败，把它的下标压栈当新分界（之后的有效子串不可能跨过它）
  - 没弹空 → 找到一个匹配，当前有效长度 = \`i − 栈顶\`，更新 \`ans\`
- 易错点：弹栈后必须先判空再访问栈顶，否则 \`"))"\` 这类输入会越界
- 空串时循环不执行，\`ans\` 保持 0，直接输出
- ACM 版本用 \`input.split('\\n')[0]\` 取第一行而不是 \`trim()\` 整个输入：空串用例的输入就是一个空行，取第一行的写法对它天然安全（Python 端同理）
`,
};
