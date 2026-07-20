// 416. 分割等和子集
export default {
  id: 416,
  title: '分割等和子集',
  slug: 'partition-equal-subset-sum',
  difficulty: 'medium',
  tags: ['数组', '动态规划'],
  hints: [
    '两个子集等和等价于从数组中选出若干元素，使其和恰好为总和的一半；若总和为奇数，则目标不是整数，可立即判定失败。',
    '把问题转成容量为 target = sum / 2 的 01 背包，用布尔数组 dp[j] 表示处理过的元素能否恰好凑出和 j。',
    '初始化 dp[0] = true；依次处理每个 x，并让 j 从 target 倒序到 x，执行 dp[j] = dp[j] || dp[j - x]，最后返回 dp[target]。',
    '内层必须倒序，否则同一个元素会在一轮中被重复使用；ACM 模式读取 n 和第二行数组，最终只输出小写 true 或 false。',
  ],

  description: `
给你一个**只包含正整数**的**非空**数组 \`nums\`，请你判断是否可以将这个数组分割成两个子集，使得两个子集的元素和相等。

### 示例

- 输入：\`nums = [1,5,11,5]\`，输出：\`true\`（数组可以分割成 \`[1,5,5]\` 和 \`[11]\`）
- 输入：\`nums = [1,2,3,5]\`，输出：\`false\`（元素和为 11，是奇数，无法等分）

### 提示

- \`1 <= nums.length <= 200\`
- \`1 <= nums[i] <= 100\`

### ACM 模式输入输出格式

- 输入：第一行为整数 \`n\`（数组长度）；第二行为 \`n\` 个整数（空格分隔）
- 输出：可以等分输出 \`true\`，否则输出 \`false\`（均为小写）

ACM 输入示例：
\`\`\`
4
1 5 11 5
\`\`\`
输出：\`true\`
`,

  functionName: 'canPartition',
  compare: 'exact',

  tests: [
    { args: [[1, 5, 11, 5]], expected: true },
    { args: [[1, 2, 3, 5]], expected: false },
    { args: [[1, 2, 5]], expected: false },
    { args: [[1]], expected: false },
    { args: [[2, 2]], expected: true },
    { args: [[1, 2, 3, 4, 5, 6, 7]], expected: true },
    { args: [[3, 3, 3, 3]], expected: true },
    { args: [[2, 2, 2]], expected: false },
    { args: [[1, 2, 3, 6]], expected: true },
    { args: [[52, 49, 26, 77, 23, 30, 32, 18, 98, 12, 33, 94, 50, 68, 88, 90, 69, 12, 80, 63, 26, 54, 93, 79, 76, 28, 48, 50, 88, 28, 20, 60, 85, 23, 73, 44, 11, 92, 68, 87, 100, 12, 61, 41, 52, 6, 35, 72, 1, 55, 27, 47, 69, 11, 60, 67, 26, 78, 60, 7, 46, 17, 28, 92, 21, 96, 57, 77, 23, 65, 85, 23, 5, 15, 3, 22, 61, 88, 54, 11, 55, 81, 12, 19, 40, 80, 1, 49, 43, 18, 67, 52, 26, 8, 82, 28, 57, 33, 70, 52]], expected: true },
  ],

  acmTests: [
    { input: '4\n1 5 11 5\n', output: 'true\n' },
    { input: '4\n1 2 3 5\n', output: 'false\n' },
    { input: '3\n1 2 5\n', output: 'false\n' },
    { input: '1\n1\n', output: 'false\n' },
    { input: '2\n2 2\n', output: 'true\n' },
    { input: '7\n1 2 3 4 5 6 7\n', output: 'true\n' },
    { input: '4\n3 3 3 3\n', output: 'true\n' },
    { input: '3\n2 2 2\n', output: 'false\n' },
    { input: '4\n1 2 3 6\n', output: 'true\n' },
    { input: '100\n52 49 26 77 23 30 32 18 98 12 33 94 50 68 88 90 69 12 80 63 26 54 93 79 76 28 48 50 88 28 20 60 85 23 73 44 11 92 68 87 100 12 61 41 52 6 35 72 1 55 27 47 69 11 60 67 26 78 60 7 46 17 28 92 21 96 57 77 23 65 85 23 5 15 3 22 61 88 54 11 55 81 12 19 40 80 1 49 43 18 67 52 26 8 82 28 57 33 70 52\n', output: 'true\n' },
  ],

  templates: {
    core: {
      javascript: `/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canPartition = function(nums) {
    
};
`,
      python: `def canPartition(nums):
    # 能分割成两个等和子集返回 True，否则返回 False
    pass
`,
    },
    acm: {
      javascript: `// ACM 模式：input 是全部输入（字符串），用 console.log 输出答案
// 输入格式：第一行 n，第二行 n 个整数；输出 true 或 false（小写）
const lines = input.trim().split('\\n');
const nums = lines[1].trim().split(/\\s+/).map(Number);

// 在这里写你的代码，用 console.log('true' / 'false') 输出结果

`,
      python: `# ACM 模式：用 input() 或 sys.stdin 读输入，用 print 输出答案
# 输入格式：第一行 n，第二行 n 个整数；输出 true 或 false（小写）
import sys

lines = sys.stdin.read().split('\\n')
nums = list(map(int, lines[1].split()))

# 在这里写你的代码，用 print('true' if ok else 'false') 输出结果
`,
    },
  },

  solutions: {
    core: {
      javascript: `var canPartition = function(nums) {
  let sum = 0;
  for (const x of nums) sum += x;
  if (sum % 2 === 1) return false; // 和为奇数不可能等分
  const target = sum / 2;

  // 01 背包：dp[j] 表示能否凑出和 j
  const dp = new Array(target + 1).fill(false);
  dp[0] = true; // 空子集凑出 0
  for (const x of nums) {
    // 倒序更新，保证每个数字只使用一次
    for (let j = target; j >= x; j--) {
      if (dp[j - x]) dp[j] = true;
    }
  }
  return dp[target];
};
`,
      python: `def canPartition(nums):
    s = sum(nums)
    if s % 2 == 1:
        return False  # 和为奇数不可能等分
    target = s // 2

    # 01 背包：dp[j] 表示能否凑出和 j
    dp = [False] * (target + 1)
    dp[0] = True  # 空子集凑出 0
    for x in nums:
        # 倒序更新，保证每个数字只使用一次
        for j in range(target, x - 1, -1):
            if dp[j - x]:
                dp[j] = True
    return dp[target]
`,
    },
    acm: {
      javascript: `const lines = input.trim().split('\\n');
const n = Number(lines[0]);
const nums = lines[1].trim().split(/\\s+/).map(Number);

let sum = 0;
for (const x of nums) sum += x;

let ok = false;
if (sum % 2 === 0) {
  const target = sum / 2;
  const dp = new Array(target + 1).fill(false);
  dp[0] = true;
  for (const x of nums) {
    for (let j = target; j >= x; j--) {
      if (dp[j - x]) dp[j] = true;
    }
  }
  ok = dp[target];
}
console.log(ok ? 'true' : 'false');
`,
      python: `import sys

lines = sys.stdin.read().split('\\n')
n = int(lines[0])
nums = list(map(int, lines[1].split()))

s = sum(nums)
ok = False
if s % 2 == 0:
    target = s // 2
    dp = [False] * (target + 1)
    dp[0] = True
    for x in nums:
        for j in range(target, x - 1, -1):
            if dp[j - x]:
                dp[j] = True
    ok = dp[target]
print('true' if ok else 'false')
`,
    },
  },

  idea: `
两个子集和相等 ⟺ 整个数组的和 \`sum\` 为偶数，且存在一个子集其和恰好为 \`sum / 2\`。于是问题转化为经典的 **01 背包**：背包容量为 \`target = sum / 2\`，每个数字只能选一次，问能否恰好装满。

- 先求和，\`sum\` 为奇数直接返回 \`false\`
- 用一维布尔数组 \`dp[j]\` 表示「能否凑出和 \`j\`」，初始 \`dp[0] = true\`（什么都不选凑出 0）
- 对每个数字 \`x\`，从 \`target\` **倒序**更新：\`dp[j] = dp[j] || dp[j - x]\`

为什么对：转移时 \`dp[j - x]\` 记录的是加入 \`x\` **之前**能否凑出 \`j - x\`，若能，则加入 \`x\` 后就能凑出 \`j\`；归纳可得所有可达的和。倒序是为了保证 \`dp[j - x]\` 还是「本轮之前」的值，即每个数字只用一次（正序会把同一个数字重复使用，变成完全背包）。

时间复杂度 O(n·sum)，空间复杂度 O(sum)。
`,

  explanation: `
- \`sum % 2\` 不为 0 直接返回 \`false\`：奇数总和不可能平分成两份，这也是单个元素数组（如 \`[1]\`）的归宿
- \`dp[0] = true\` 是递推的基石：空子集的和为 0
- 内层循环必须**倒序**（JS 的 \`for (let j = target; j >= x; j--)\`，Python 的 \`range(target, x - 1, -1)\`）：正序时 \`dp[j - x]\` 可能已被本轮的 \`x\` 更新过，相当于把 \`x\` 用了多次
- \`j < x\` 的位置无法放入 \`x\`，保持原值即可，所以循环下界是 \`x\`
- 注意 \`[1,2,5]\` 这类用例：和为 8 是偶数，但凑不出 4，说明「和为偶数」只是必要条件，必须真的跑一遍背包
- ACM 版本输出布尔时要统一成小写 \`true\` / \`false\`（Python 的 \`True/False\` 需手动转换）
`,
};
