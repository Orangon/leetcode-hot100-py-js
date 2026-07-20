// 198. 打家劫舍
export default {
  id: 198,
  title: '打家劫舍',
  slug: 'house-robber',
  difficulty: 'medium',
  tags: ['数组', '动态规划'],
  hints: [
    '每间房只能在“偷”和“不偷”中选择；若偷当前房，就不能偷前一间，因此当前最优只依赖前一间与前两间的最优结果。',
    '使用动态规划：设 dp[i] 表示考虑前 i 间房可偷到的最高金额，转移为 dp[i] = max(dp[i - 1], dp[i - 2] + nums[i - 1])。',
    '用两个变量压缩空间：prev2 = 0、prev1 = 0；依次遍历金额 x，计算 cur = max(prev1, prev2 + x)，再令 prev2 = prev1、prev1 = cur。',
    '单间房和金额全为 0 时上述初值都能正确处理；ACM 模式先读 n 和第二行的 n 个金额，最终只输出 prev1 及换行。',
  ],

  description: `
你是一个专业的小偷，计划偷窃沿街的房屋。每间房内都藏有一定的现金，影响你偷窃的唯一制约因素就是相邻的房屋装有相互连通的防盗系统，如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警。

给定一个代表每个房屋存放金额的非负整数数组 \`nums\`，计算你不触动警报装置的情况下，一夜之内能够偷窃到的最高金额。

### 示例

- 输入：\`nums = [1,2,3,1]\`，输出：\`4\`（偷窃 1 号房屋（金额 1），然后偷窃 3 号房屋（金额 3），最高金额 1 + 3 = 4）
- 输入：\`nums = [2,7,9,3,1]\`，输出：\`12\`（偷窃 1 号、3 号和 5 号房屋，最高金额 2 + 9 + 1 = 12）

### 提示

- \`1 <= nums.length <= 100\`
- \`0 <= nums[i] <= 400\`

### ACM 模式输入输出格式

- 输入：第一行为整数 \`n\`（房屋数量）；第二行为 \`n\` 个非负整数（空格分隔）
- 输出：一个整数，表示能偷窃到的最高金额

ACM 输入示例：
\`\`\`
4
1 2 3 1
\`\`\`
输出：\`4\`
`,

  functionName: 'rob',
  compare: 'exact',

  tests: [
    { args: [[1, 2, 3, 1]], expected: 4 },
    { args: [[2, 7, 9, 3, 1]], expected: 12 },
    { args: [[0, 0, 0, 0]], expected: 0 },
    { args: [[5]], expected: 5 },
    { args: [[2, 1, 1, 2]], expected: 4 },
    { args: [[10, 1, 1, 10]], expected: 20 },
    { args: [[1, 2, 3, 4, 5]], expected: 9 },
    { args: [[100, 1, 100, 1, 100]], expected: 300 },
    { args: [[400, 400, 400]], expected: 800 },
    { args: [[169, 83, 299, 271, 317, 308, 69, 352, 18, 354, 17, 288, 71, 105, 62, 372, 105, 58, 361, 316, 173, 17, 49, 111, 213, 287, 76, 132, 96, 335, 248, 120, 357, 321, 168, 123, 129, 300, 272, 245, 112, 341, 219, 85, 64, 159, 21, 362, 18, 305, 9, 175, 324, 6, 328, 193, 103, 178, 9, 299, 334, 202, 26, 11, 159, 259, 47, 325, 10, 244, 396, 58, 397, 290, 163, 298, 161, 356, 277, 318, 61, 222, 3, 120, 167, 112, 48, 241, 9, 290, 159, 259, 232, 58, 284, 51, 101, 191, 223, 19]], expected: 11559 },
  ],

  acmTests: [
    { input: '4\n1 2 3 1\n', output: '4\n' },
    { input: '5\n2 7 9 3 1\n', output: '12\n' },
    { input: '4\n0 0 0 0\n', output: '0\n' },
    { input: '1\n5\n', output: '5\n' },
    { input: '4\n2 1 1 2\n', output: '4\n' },
    { input: '4\n10 1 1 10\n', output: '20\n' },
    { input: '5\n1 2 3 4 5\n', output: '9\n' },
    { input: '5\n100 1 100 1 100\n', output: '300\n' },
    { input: '3\n400 400 400\n', output: '800\n' },
    { input: '100\n169 83 299 271 317 308 69 352 18 354 17 288 71 105 62 372 105 58 361 316 173 17 49 111 213 287 76 132 96 335 248 120 357 321 168 123 129 300 272 245 112 341 219 85 64 159 21 362 18 305 9 175 324 6 328 193 103 178 9 299 334 202 26 11 159 259 47 325 10 244 396 58 397 290 163 298 161 356 277 318 61 222 3 120 167 112 48 241 9 290 159 259 232 58 284 51 101 191 223 19\n', output: '11559\n' },
  ],

  templates: {
    core: {
      javascript: `/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function(nums) {
    
};
`,
      python: `def rob(nums):
    # 返回不触动警报能偷到的最高金额
    pass
`,
    },
    acm: {
      javascript: `// ACM 模式：input 是全部输入（字符串），用 console.log 输出答案
// 输入格式：第一行 n，第二行 n 个非负整数
const lines = input.trim().split('\\n');
const n = Number(lines[0]);
const nums = n > 0 ? lines[1].trim().split(/\\s+/).map(Number) : [];

// 在这里写你的代码，用 console.log(金额) 输出最高金额

`,
      python: `# ACM 模式：用 input() 或 sys.stdin 读输入，用 print 输出答案
# 输入格式：第一行 n，第二行 n 个非负整数
import sys

lines = sys.stdin.read().split('\\n')
n = int(lines[0])
nums = list(map(int, lines[1].split())) if n > 0 else []

# 在这里写你的代码，用 print(金额) 输出最高金额
`,
    },
  },

  solutions: {
    core: {
      javascript: `var rob = function(nums) {
  let prev2 = 0; // dp[i-2]：到上上届房屋为止的最高金额
  let prev1 = 0; // dp[i-1]：到上一间房屋为止的最高金额
  for (const x of nums) {
    const cur = Math.max(prev1, prev2 + x); // 不偷取前者，偷取后者
    prev2 = prev1;
    prev1 = cur;
  }
  return prev1;
};
`,
      python: `def rob(nums):
    prev2 = 0  # dp[i-2]：到上上届房屋为止的最高金额
    prev1 = 0  # dp[i-1]：到上一间房屋为止的最高金额
    for x in nums:
        prev2, prev1 = prev1, max(prev1, prev2 + x)  # 不偷取前者，偷取后者
    return prev1
`,
    },
    acm: {
      javascript: `const lines = input.trim().split('\\n');
const n = Number(lines[0]);
const nums = n > 0 ? lines[1].trim().split(/\\s+/).map(Number) : [];

let prev2 = 0;
let prev1 = 0;
for (const x of nums) {
  const cur = Math.max(prev1, prev2 + x);
  prev2 = prev1;
  prev1 = cur;
}

console.log(prev1);
`,
      python: `import sys

lines = sys.stdin.read().split('\\n')
n = int(lines[0])
nums = list(map(int, lines[1].split())) if n > 0 else []

prev2 = 0
prev1 = 0
for x in nums:
    prev2, prev1 = prev1, max(prev1, prev2 + x)

print(prev1)
`,
    },
  },

  idea: `
**动态规划（滚动变量）。**

设 \`dp[i]\` 为只考虑前 \`i\` 间房屋时能偷到的最高金额。对第 \`i\` 间房只有两种选择：

- 不偷：最高金额等于 \`dp[i-1]\`
- 偷：不能偷相邻的第 \`i-1\` 间，最高金额等于 \`dp[i-2] + nums[i]\`

转移方程：\`dp[i] = max(dp[i-1], dp[i-2] + nums[i])\`。

由于 \`dp[i]\` 只依赖前两项，用两个滚动变量代替整个数组即可，不必开 O(n) 空间。

时间 O(n)，空间 O(1)。
`,

  explanation: `
- \`prev2\`、\`prev1\` 分别相当于 \`dp[i-2]\`、\`dp[i-1]\`，初始都为 0（一间房都还没考虑时金额是 0）
- 遍历每间房的金额 \`x\`：\`cur = max(prev1, prev2 + x)\`，不偷当前房取前者，偷当前房取后者
- 然后整体滚动：\`prev2 = prev1\`、\`prev1 = cur\`
- Python 用元组解包 \`prev2, prev1 = prev1, max(prev1, prev2 + x)\` 一步完成滚动；JS 需要先算 \`cur\` 再依次更新，顺序不能颠倒
- 初始值全 0 自然覆盖了「全零数组」（结果 0）和「单元素数组」（结果就是该元素）两类边界用例
- 易错点：不要把 \`prev2 + x\` 直接当作当前最优而不与 \`prev1\` 取 max——「偷当前房」不一定优于「不偷当前房」

ACM 版本逻辑一致，读入数组后输出最高金额。
`,
};
