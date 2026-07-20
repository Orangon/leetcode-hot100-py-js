// 152. 乘积最大子数组
export default {
  id: 152,
  title: '乘积最大子数组',
  slug: 'maximum-product-subarray',
  difficulty: 'medium',
  tags: ['数组', '动态规划'],
  hints: [
    '负数会让乘积的大小关系反转：此前最小（最负）的乘积乘以负数后可能成为最大值，因此只记录最大乘积会遗漏答案。',
    '使用动态规划同时维护以当前位置结尾的最大乘积 maxEnd 和最小乘积 minEnd，并用全局 ans 记录所有 maxEnd 的最大值。',
    '初始化 ans、maxEnd、minEnd 为 nums[0]；依次处理 x，若 x < 0 先交换 maxEnd 与 minEnd，再更新 maxEnd = max(x, maxEnd * x)、minEnd = min(x, minEnd * x)，最后更新 ans。',
    '数组非空，初值必须取首元素以正确处理单个负数；遇到 0 时状态会自然重置为 0。ACM 模式先读取 n 和第二行的 n 个整数，最后只输出 ans。',
  ],

  description: `
给你一个整数数组 \`nums\`，请你找出数组中乘积最大的**非空连续子数组**（子数组中至少包含一个数字），并返回该子数组所对应的乘积。

测试用例的答案保证是一个 **32 位整数**。

### 示例

- 输入：\`nums = [2,3,-2,4]\`，输出：\`6\`（子数组 \`[2,3]\` 的乘积最大，为 6）
- 输入：\`nums = [-2,0,-1]\`，输出：\`0\`（结果不能是 2，因为 \`[-2,-1]\` 不是连续子数组）

### 提示

- \`1 <= nums.length <= 2 * 10^4\`
- \`-10 <= nums[i] <= 10\`
- \`nums\` 的任何子数组的乘积都保证是一个 32 位整数

### ACM 模式输入输出格式

- 输入：第一行为整数 \`n\`（数组长度）；第二行为 \`n\` 个整数（空格分隔）
- 输出：一个整数，即乘积最大的连续子数组的乘积

ACM 输入示例：
\`\`\`
4
2 3 -2 4
\`\`\`
输出：\`6\`
`,

  functionName: 'maxProduct',
  compare: 'exact',

  tests: [
    { args: [[2, 3, -2, 4]], expected: 6 },
    { args: [[-2, 0, -1]], expected: 0 },
    { args: [[-2]], expected: -2 },
    { args: [[-2, 3, -4]], expected: 24 },
    { args: [[0, 2]], expected: 2 },
    { args: [[2, -5, -2, -4, 3]], expected: 24 },
    { args: [[0, 0, 0]], expected: 0 },
    { args: [[-1, -2, -3, -4]], expected: 24 },
    { args: [[-1, -2, -3]], expected: 6 },
    { args: [[0, 0, 2, -1, 0, 0, 0, -2, 0, -1, -1, 0, 2, 1, 1, 0, -2, 1, -2, 2, 0, 0, -2, -2, -1, -2, 1, -1, -1, 2, -2, -1, 2, -2, 2, 1, 0, -1, -2, 2, -1, 2, 0, -1, 0, -1, 1, 2, 1, 2, 0, -2, -2, 0, 2, -1, 2, -2, 1, -2, -1, -1, 2, 2, -2, 1, 1, 0, 0, 2, 0, -1, 1, -2, 0, 0, -1, 2, -1, 0, 0, 1, -1, 0, 0, 0, 1, 0, 2, -2, 2, 0, 2, 0, 0, -1, 2, 0, -1, 0, 2, 2, 0, 1, 1, 1, -1, -1, 0, 1, 0, -1, 0, 0, -1, 1, -1, 0, 0, 2, -1, 1, 1, 0, 2, -2, 0, -1, -2, -1, -2, -1, 0, 0, -2, 0, 2, 0, 0, 0, 0, 1, 0, 1, 0, 2, 0, 0, 1, -2, 0, -2, -1, 0, 2, 0, 2, -2, 1, 0, 0, 0, 0, -1, 2, 0, -1, 2, 1, 0, 2, 0, 2, -1, -1, -1, 1, 0, -2, -1, 0, 0, 2, 0, 1, 0, 0, 1, 0, 0, -2, 2, 0, 0, 1, 0, 1, 0, -2, -2, -1, -1, -2, -2, 1, 1, 2, 0, -2, 0, 0, 0, 2, 0, 1, 0, -2, 2, -2, 2, 0, 0, 0, 0, 1, -2, -1, 1, 0, 2, 0, 1, 1, 0, -2, 0, 0, -1, 2, 1, -1, 2, -1, 1, -2, 0, 2, -1, 1, 2, 0, 1, -2, -2, -2, 2, -1, -2, 2, 1, -1, 0, -2, 1, 0, 0, 2, 2, 1, 0, 1, -1, 2, 0, 0, 0, 0, -1, 2, 0, -2, -1, -1, 1, 0, -1, 0, 0, -2, 0, 2, -2, 0, 0, 0, 1, -2, -2, 2, 0]], expected: 128 },
  ],

  acmTests: [
    { input: '4\n2 3 -2 4\n', output: '6\n' },
    { input: '3\n-2 0 -1\n', output: '0\n' },
    { input: '1\n-2\n', output: '-2\n' },
    { input: '3\n-2 3 -4\n', output: '24\n' },
    { input: '2\n0 2\n', output: '2\n' },
    { input: '5\n2 -5 -2 -4 3\n', output: '24\n' },
    { input: '3\n0 0 0\n', output: '0\n' },
    { input: '4\n-1 -2 -3 -4\n', output: '24\n' },
    { input: '3\n-1 -2 -3\n', output: '6\n' },
    { input: '300\n0 0 2 -1 0 0 0 -2 0 -1 -1 0 2 1 1 0 -2 1 -2 2 0 0 -2 -2 -1 -2 1 -1 -1 2 -2 -1 2 -2 2 1 0 -1 -2 2 -1 2 0 -1 0 -1 1 2 1 2 0 -2 -2 0 2 -1 2 -2 1 -2 -1 -1 2 2 -2 1 1 0 0 2 0 -1 1 -2 0 0 -1 2 -1 0 0 1 -1 0 0 0 1 0 2 -2 2 0 2 0 0 -1 2 0 -1 0 2 2 0 1 1 1 -1 -1 0 1 0 -1 0 0 -1 1 -1 0 0 2 -1 1 1 0 2 -2 0 -1 -2 -1 -2 -1 0 0 -2 0 2 0 0 0 0 1 0 1 0 2 0 0 1 -2 0 -2 -1 0 2 0 2 -2 1 0 0 0 0 -1 2 0 -1 2 1 0 2 0 2 -1 -1 -1 1 0 -2 -1 0 0 2 0 1 0 0 1 0 0 -2 2 0 0 1 0 1 0 -2 -2 -1 -1 -2 -2 1 1 2 0 -2 0 0 0 2 0 1 0 -2 2 -2 2 0 0 0 0 1 -2 -1 1 0 2 0 1 1 0 -2 0 0 -1 2 1 -1 2 -1 1 -2 0 2 -1 1 2 0 1 -2 -2 -2 2 -1 -2 2 1 -1 0 -2 1 0 0 2 2 1 0 1 -1 2 0 0 0 0 -1 2 0 -2 -1 -1 1 0 -1 0 0 -2 0 2 -2 0 0 0 1 -2 -2 2 0\n', output: '128\n' },
  ],

  templates: {
    core: {
      javascript: `/**
 * @param {number[]} nums
 * @return {number}
 */
var maxProduct = function(nums) {
    
};
`,
      python: `def maxProduct(nums):
    # 返回乘积最大的非空连续子数组的乘积
    pass
`,
    },
    acm: {
      javascript: `// ACM 模式：input 是全部输入（字符串），用 console.log 输出答案
// 输入格式：第一行 n，第二行 n 个整数
const lines = input.trim().split('\\n');
const nums = lines[1].trim().split(/\\s+/).map(Number);

// 在这里写你的代码，用 console.log(ans) 输出最大乘积

`,
      python: `# ACM 模式：用 input() 或 sys.stdin 读输入，用 print 输出答案
# 输入格式：第一行 n，第二行 n 个整数
import sys

lines = sys.stdin.read().split('\\n')
nums = list(map(int, lines[1].split()))

# 在这里写你的代码，用 print(ans) 输出最大乘积
`,
    },
  },

  solutions: {
    core: {
      javascript: `var maxProduct = function(nums) {
  let ans = nums[0];
  let maxEnd = nums[0]; // 以当前元素结尾的子数组的最大乘积
  let minEnd = nums[0]; // 以当前元素结尾的子数组的最小乘积
  for (let i = 1; i < nums.length; i++) {
    const x = nums[i];
    if (x < 0) {
      // 乘以负数后大小关系反转，先交换再统一更新
      const t = maxEnd;
      maxEnd = minEnd;
      minEnd = t;
    }
    maxEnd = Math.max(x, maxEnd * x); // 接上旧子数组，或从 x 重新开始
    minEnd = Math.min(x, minEnd * x);
    ans = Math.max(ans, maxEnd);
  }
  return ans;
};
`,
      python: `def maxProduct(nums):
    ans = nums[0]
    max_end = nums[0]  # 以当前元素结尾的子数组的最大乘积
    min_end = nums[0]  # 以当前元素结尾的子数组的最小乘积
    for x in nums[1:]:
        if x < 0:
            # 乘以负数后大小关系反转，先交换再统一更新
            max_end, min_end = min_end, max_end
        max_end = max(x, max_end * x)  # 接上旧子数组，或从 x 重新开始
        min_end = min(x, min_end * x)
        ans = max(ans, max_end)
    return ans
`,
    },
    acm: {
      javascript: `const lines = input.trim().split('\\n');
const n = Number(lines[0]);
const nums = lines[1].trim().split(/\\s+/).map(Number);

let ans = nums[0];
let maxEnd = nums[0];
let minEnd = nums[0];
for (let i = 1; i < nums.length; i++) {
  const x = nums[i];
  if (x < 0) {
    const t = maxEnd;
    maxEnd = minEnd;
    minEnd = t;
  }
  maxEnd = Math.max(x, maxEnd * x);
  minEnd = Math.min(x, minEnd * x);
  ans = Math.max(ans, maxEnd);
}
console.log(ans);
`,
      python: `import sys

lines = sys.stdin.read().split('\\n')
n = int(lines[0])
nums = list(map(int, lines[1].split()))

ans = nums[0]
max_end = nums[0]
min_end = nums[0]
for x in nums[1:]:
    if x < 0:
        max_end, min_end = min_end, max_end
    max_end = max(x, max_end * x)
    min_end = min(x, min_end * x)
    ans = max(ans, max_end)
print(ans)
`,
    },
  },

  idea: `
如果数组里全是正数，「乘积最大子数组」就是整个数组。麻烦在于**负数会翻转符号**：当前的最大乘积乘以一个负数会变成最小，而当前的最小乘积（最负的那个）乘以负数反而可能变成最大；遇到 0 则一切归零、重新开始。

**动态规划（双状态）**：对每个位置维护两个状态：

- \`maxEnd\`：以当前元素结尾的连续子数组的**最大**乘积
- \`minEnd\`：以当前元素结尾的连续子数组的**最小**乘积

遍历到 \`x = nums[i]\` 时，用**旧**的两个值一起转移：

- \`maxEnd = max(x, maxEnd·x, minEnd·x)\`
- \`minEnd = min(x, maxEnd·x, minEnd·x)\`

其中取 \`x\` 本身一项对应「前面的乘积是负数或 0，不如从 \`x\` 重新开始」。答案是遍历过程中所有 \`maxEnd\` 的最大值。

时间复杂度 O(n)，空间复杂度 O(1)。
`,

  explanation: `
- 参考代码用了一个小技巧：当 \`x < 0\` 时先交换 \`maxEnd\` 和 \`minEnd\`，然后统一写 \`max(x, maxEnd * x)\` / \`min(x, minEnd * x)\`——交换后 \`maxEnd * x\` 实际就是旧的 \`minEnd * x\`，等价于同时考虑了两种转移
- \`maxEnd = Math.max(x, maxEnd * x)\`：要么把 \`x\` 接在之前结尾的子数组后面，要么从 \`x\` 重新开始
- \`ans\` 每一步用 \`maxEnd\` 刷新；由于状态初值取 \`nums[0]\`，单个元素的数组（如 \`[-2]\`）也能得到正确答案 \`-2\`
- 遇到 0 时 \`maxEnd\` 和 \`minEnd\` 都会被更新为 0，自然实现「跨越 0 重新开始」，无需特判
- 易错点：两个状态必须用**同一轮的旧值**更新，先算出新 \`maxEnd\` 再用它算 \`minEnd\` 会污染结果；「负数先交换」的写法规避了临时变量
- ACM 版本先按格式读入数组，核心逻辑与核心模式完全一致
`,
};
