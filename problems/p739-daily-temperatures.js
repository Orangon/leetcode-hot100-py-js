// 739. 每日温度
export default {
  id: 739,
  title: '每日温度',
  slug: 'daily-temperatures',
  difficulty: 'medium',
  tags: ['栈', '数组', '单调栈'],
  hints: [
    '每一天需要找的是右侧第一个严格更高的温度；相等温度不能作为答案，因此尚未找到答案的下标可以按温度单调关系统一维护。',
    '使用存储下标的单调栈，从左到右扫描；栈中对应温度保持从栈底到栈顶单调不增，使当前较高温度能一次结算多个较低温度。',
    '遍历下标 i，当 temperatures[i] 大于栈顶下标对应温度时反复弹出 j，并令 answer[j] = i - j；随后将 i 入栈，最终未弹出的下标保持 0。',
    '比较必须使用严格大于号以排除相等温度；ACM 模式先读天数 n 和第二行温度数组，最后将长度为 n 的答案以空格连接输出。',
  ],

  description: `
给定一个整数数组 \`temperatures\`，表示每天的温度，返回一个数组 \`answer\`，其中 \`answer[i]\` 是指对于第 \`i\` 天，下一个更高温度出现在几天后。如果气温在这之后都不会升高，请在该位置用 \`0\` 来代替。

### 示例

- 输入：\`temperatures = [73,74,75,71,69,72,76,73]\`，输出：\`[1,1,4,2,1,1,0,0]\`
- 输入：\`temperatures = [30,40,50,60]\`，输出：\`[1,1,1,0]\`
- 输入：\`temperatures = [30,60,90]\`，输出：\`[1,1,0]\`

### 提示

- \`1 <= temperatures.length <= 10^5\`
- \`30 <= temperatures[i] <= 100\`

### ACM 模式输入输出格式

- 输入：第一行为整数 \`n\`（天数）；第二行为 \`n\` 个整数（空格分隔），表示每天的温度
- 输出：\`n\` 个整数（空格分隔），第 \`i\` 个表示第 \`i\` 天后还要等几天才有更高温度

ACM 输入示例：
\`\`\`
8
73 74 75 71 69 72 76 73
\`\`\`
输出：\`1 1 4 2 1 1 0 0\`
`,

  functionName: 'dailyTemperatures',
  compare: 'exact',

  tests: [
    { args: [[73, 74, 75, 71, 69, 72, 76, 73]], expected: [1, 1, 4, 2, 1, 1, 0, 0] },
    { args: [[30, 40, 50, 60]], expected: [1, 1, 1, 0] },
    { args: [[60, 50, 40, 30]], expected: [0, 0, 0, 0] },
    { args: [[30]], expected: [0] },
    { args: [[70, 70, 70, 75]], expected: [3, 2, 1, 0] },
    { args: [[65, 70, 68, 72, 66]], expected: [1, 2, 1, 0, 0] },
    { args: [[50, 50, 50, 50]], expected: [0, 0, 0, 0] },
    { args: [[30, 100, 30, 100, 30]], expected: [1, 0, 1, 0, 0] },
    { args: [[31, 32, 33, 100, 34, 35]], expected: [1, 1, 1, 0, 1, 0] },
    { args: [[50, 88, 76, 62, 70, 38, 66, 81, 87, 35, 56, 35, 46, 84, 91, 88, 50, 56, 93, 45, 47, 73, 79, 79, 98, 83, 84, 54, 96, 81, 58, 79, 91, 69, 93, 96, 86, 76, 82, 71, 94, 45, 64, 42, 38, 47, 55, 36, 82, 92, 57, 32, 96, 55, 54, 31, 59, 43, 50, 100, 69, 56, 75, 94, 44, 48, 94, 66, 41, 76, 59, 94, 51, 48, 88, 66, 47, 37, 38, 91, 84, 76, 35, 51, 62, 37, 71, 75, 30, 99, 56, 46, 85, 34, 44, 90, 67, 44, 68, 64, 96, 61, 87, 64, 51, 40, 76, 94, 57, 72, 89, 93, 81, 65, 54, 56, 81, 42, 76, 98, 39, 89, 83, 36, 53, 62, 89, 37, 97, 49, 87, 75, 35, 53, 100, 61, 76, 59, 70, 61, 56, 42, 43, 65, 36, 40, 30, 58, 53, 50, 59, 60, 33, 54, 59, 100, 86, 57, 53, 31, 39, 52, 30, 55, 42, 88, 35, 36, 44, 66, 59, 64, 38, 92, 74, 47, 80, 77, 88, 70, 78, 92, 88, 61, 83, 34, 86, 30, 86, 45, 97, 43, 57, 78, 57, 66, 89, 88, 54, 59]], expected: [1, 13, 5, 1, 3, 1, 1, 1, 6, 1, 3, 1, 1, 1, 4, 3, 1, 1, 6, 1, 1, 1, 2, 1, 35, 1, 2, 1, 31, 3, 1, 1, 2, 1, 1, 24, 4, 1, 2, 1, 12, 1, 6, 2, 1, 1, 2, 1, 1, 3, 2, 1, 7, 3, 2, 1, 3, 1, 1, 0, 2, 1, 1, 26, 1, 1, 23, 2, 1, 2, 1, 18, 2, 1, 5, 4, 3, 1, 1, 10, 9, 8, 1, 1, 2, 1, 1, 2, 1, 45, 2, 1, 3, 1, 1, 5, 2, 1, 2, 1, 19, 1, 5, 3, 2, 1, 1, 12, 1, 1, 1, 8, 7, 3, 1, 1, 3, 1, 1, 15, 1, 7, 4, 1, 1, 1, 2, 1, 6, 1, 4, 3, 1, 1, 0, 1, 19, 1, 17, 4, 3, 1, 1, 12, 1, 2, 1, 3, 2, 1, 1, 4, 1, 1, 1, 0, 9, 8, 5, 1, 1, 2, 1, 2, 1, 8, 1, 1, 1, 4, 1, 2, 1, 17, 2, 1, 2, 1, 3, 1, 1, 9, 8, 1, 2, 1, 4, 1, 2, 1, 0, 1, 1, 3, 1, 1, 0, 0, 1, 0] },
  ],

  acmTests: [
    { input: '8\n73 74 75 71 69 72 76 73\n', output: '1 1 4 2 1 1 0 0\n' },
    { input: '4\n30 40 50 60\n', output: '1 1 1 0\n' },
    { input: '4\n60 50 40 30\n', output: '0 0 0 0\n' },
    { input: '1\n30\n', output: '0\n' },
    { input: '4\n70 70 70 75\n', output: '3 2 1 0\n' },
    { input: '5\n65 70 68 72 66\n', output: '1 2 1 0 0\n' },
    { input: '4\n50 50 50 50\n', output: '0 0 0 0\n' },
    { input: '5\n30 100 30 100 30\n', output: '1 0 1 0 0\n' },
    { input: '6\n31 32 33 100 34 35\n', output: '1 1 1 0 1 0\n' },
    { input: '200\n50 88 76 62 70 38 66 81 87 35 56 35 46 84 91 88 50 56 93 45 47 73 79 79 98 83 84 54 96 81 58 79 91 69 93 96 86 76 82 71 94 45 64 42 38 47 55 36 82 92 57 32 96 55 54 31 59 43 50 100 69 56 75 94 44 48 94 66 41 76 59 94 51 48 88 66 47 37 38 91 84 76 35 51 62 37 71 75 30 99 56 46 85 34 44 90 67 44 68 64 96 61 87 64 51 40 76 94 57 72 89 93 81 65 54 56 81 42 76 98 39 89 83 36 53 62 89 37 97 49 87 75 35 53 100 61 76 59 70 61 56 42 43 65 36 40 30 58 53 50 59 60 33 54 59 100 86 57 53 31 39 52 30 55 42 88 35 36 44 66 59 64 38 92 74 47 80 77 88 70 78 92 88 61 83 34 86 30 86 45 97 43 57 78 57 66 89 88 54 59\n', output: '1 13 5 1 3 1 1 1 6 1 3 1 1 1 4 3 1 1 6 1 1 1 2 1 35 1 2 1 31 3 1 1 2 1 1 24 4 1 2 1 12 1 6 2 1 1 2 1 1 3 2 1 7 3 2 1 3 1 1 0 2 1 1 26 1 1 23 2 1 2 1 18 2 1 5 4 3 1 1 10 9 8 1 1 2 1 1 2 1 45 2 1 3 1 1 5 2 1 2 1 19 1 5 3 2 1 1 12 1 1 1 8 7 3 1 1 3 1 1 15 1 7 4 1 1 1 2 1 6 1 4 3 1 1 0 1 19 1 17 4 3 1 1 12 1 2 1 3 2 1 1 4 1 1 1 0 9 8 5 1 1 2 1 2 1 8 1 1 1 4 1 2 1 17 2 1 2 1 3 1 1 9 8 1 2 1 4 1 2 1 0 1 1 3 1 1 0 0 1 0\n' },
  ],

  templates: {
    core: {
      javascript: `/**
 * @param {number[]} temperatures
 * @return {number[]} 第 i 位表示第 i 天后还要等多少天才有更高温度
 */
var dailyTemperatures = function(temperatures) {
    
};
`,
      python: `def dailyTemperatures(temperatures):
    # 返回与 temperatures 等长的列表，第 i 位表示第 i 天后还要等几天才有更高温度
    pass
`,
    },
    acm: {
      javascript: `// ACM 模式：input 是全部输入（字符串），用 console.log 输出答案
// 输入格式：第一行 n，第二行 n 个整数
const lines = input.trim().split('\\n');
const n = Number(lines[0]);
const temperatures = lines[1].trim().split(/\\s+/).map(Number);

// 在这里写你的代码，把结果数组用空格拼接后输出（如 console.log(ans.join(' '))）

`,
      python: `# ACM 模式：用 input() 或 sys.stdin 读输入，用 print 输出答案
# 输入格式：第一行 n，第二行 n 个整数
import sys

lines = sys.stdin.read().split('\\n')
n = int(lines[0])
temperatures = list(map(int, lines[1].split()))

# 在这里写你的代码，把结果用空格拼接后输出（如 print(' '.join(map(str, ans)))）
`,
    },
  },

  solutions: {
    core: {
      javascript: `var dailyTemperatures = function(temperatures) {
  const n = temperatures.length;
  const ans = new Array(n).fill(0);
  const stack = []; // 存下标，对应温度从栈底到栈顶单调递减
  for (let i = 0; i < n; i++) {
    while (stack.length > 0 && temperatures[i] > temperatures[stack[stack.length - 1]]) {
      const j = stack.pop();
      ans[j] = i - j;
    }
    stack.push(i);
  }
  return ans;
};
`,
      python: `def dailyTemperatures(temperatures):
    n = len(temperatures)
    ans = [0] * n
    stack = []  # 存下标，对应温度从栈底到栈顶单调递减
    for i in range(n):
        while stack and temperatures[i] > temperatures[stack[-1]]:
            j = stack.pop()
            ans[j] = i - j
        stack.append(i)
    return ans
`,
    },
    acm: {
      javascript: `const lines = input.trim().split('\\n');
const n = Number(lines[0]);
const temperatures = lines[1].trim().split(/\\s+/).map(Number);

const ans = new Array(n).fill(0);
const stack = []; // 存下标，对应温度单调递减
for (let i = 0; i < n; i++) {
  while (stack.length > 0 && temperatures[i] > temperatures[stack[stack.length - 1]]) {
    const j = stack.pop();
    ans[j] = i - j;
  }
  stack.push(i);
}
console.log(ans.join(' '));
`,
      python: `import sys

lines = sys.stdin.read().split('\\n')
n = int(lines[0])
temperatures = list(map(int, lines[1].split()))

ans = [0] * n
stack = []  # 存下标，对应温度单调递减
for i in range(n):
    while stack and temperatures[i] > temperatures[stack[-1]]:
        j = stack.pop()
        ans[j] = i - j
    stack.append(i)
print(' '.join(map(str, ans)))
`,
    },
  },

  idea: `
暴力做法是对每一天都向后扫描，找到第一个更高温度，时间复杂度 O(n²)。

**单调栈**可以把所有天的「下一个更高温度」在一次遍历中全部求出：

- 维护一个栈，栈里存下标，且对应温度从栈底到栈顶**单调递减**
- 遍历到第 \`i\` 天时，只要栈顶下标 \`j\` 的温度低于 \`temperatures[i]\`，说明第 \`i\` 天就是 \`j\` 等待的下一个更高温，弹出 \`j\` 并记录 \`answer[j] = i - j\`
- 然后把 \`i\` 入栈，继续向后

正确性：栈中温度单调递减，所以当前的更高温只会「结算」栈顶那一段比它低的下标；而被弹出的下标遇到的第一个更高温就是当前这一天，答案不会再被后面的天覆盖。

每个下标最多入栈、出栈各一次，时间复杂度 O(n)，空间复杂度 O(n)。
`,

  explanation: `
- \`ans\` 初始化为全 0，恰好覆盖「之后没有更高温度」的情况，无需特殊处理
- \`stack\` 存的是下标而不是温度本身，这样结算时才能算出等待天数 \`i - j\`
- 循环条件是 \`temperatures[i] > temperatures[栈顶]\`（严格大于）：相等温度不触发结算，下标大的仍要等更久，与题意一致，同时保证栈的单调递减性不被破坏
- 循环结束后栈中剩下的下标（例如整段单调递减的输入）天然答案为 0，直接返回 \`ans\` 即可
- ACM 版本算法完全相同，按格式读入 \`n\` 和温度数组，最后把 \`ans\` 用空格拼接输出
`,
};
