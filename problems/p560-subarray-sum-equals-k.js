// 560. 和为 K 的子数组
export default {
  id: 560,
  title: '和为 K 的子数组',
  slug: 'subarray-sum-equals-k',
  difficulty: 'medium',
  tags: ['数组', '哈希表', '前缀和'],
  hints: [
    '若当前位置的前缀和为 pre，则以此处结尾且和为 k 的子数组数量，等于此前前缀和 pre - k 的出现次数。',
    '一趟遍历维护前缀和，并用哈希表记录每个历史前缀和的频次；该方法不依赖元素单调性，能处理负数。',
    '初始化 count[0] = 1；对每个 x 依次执行 pre += x、ans += count[pre - k]，最后再把 count[pre] 加一。',
    '必须先查询再存入当前前缀和，否则 k = 0 时会误计空子数组；ACM 模式按三行读取 n、数组和 k，输出一个计数整数。',
  ],

  description: `
给你一个整数数组 \`nums\` 和一个整数 \`k\`，请你统计并返回**该数组中和为 \`k\` 的子数组的个数**。

子数组是数组中元素的连续非空序列。

### 示例

- 输入：\`nums = [1,1,1], k = 2\`，输出：\`2\`
- 输入：\`nums = [1,2,3], k = 3\`，输出：\`2\`

### 提示

- \`1 <= nums.length <= 2 * 10^4\`
- \`-1000 <= nums[i] <= 1000\`
- \`-10^7 <= k <= 10^7\`

### ACM 模式输入输出格式

- 输入：第一行为整数 \`n\`（数组长度）；第二行为 \`n\` 个整数（空格分隔）；第三行为整数 \`k\`
- 输出：和为 \`k\` 的子数组个数（一个整数）

ACM 输入示例：
\`\`\`
3
1 1 1
2
\`\`\`
输出：\`2\`
`,

  functionName: 'subarraySum',
  compare: 'exact',

  tests: [
    { args: [[1, 1, 1], 2], expected: 2 },
    { args: [[1, 2, 3], 3], expected: 2 },
    { args: [[1, -1, 0], 0], expected: 3 },
    { args: [[1], 0], expected: 0 },
    { args: [[3, 4, 7, 2, -3, 1, 4, 2], 7], expected: 4 },
    { args: [[-1, -1, 1], 0], expected: 1 },
    { args: [[0, 0, 0], 0], expected: 6 },
    { args: [[-2, -3, -1], -3], expected: 1 },
    { args: [[-1, -2, -3], -6], expected: 1 },
    { args: [[2, -7, 9, -7, -3, -6, 8, -8, 2, 4, 8, -2, 9, -4, -5, 3, 2, -7, 6, -7, 6, 3, -8, 10, 4, -1, -6, 8, 1, 1, -3, -6, -9, 1, -5, 8, -1, -9, 9, 8, 1, -3, -3, 2, 3, 0, -6, 5, -10, 4, -4, -5, -7, -5, -9, 9, 8, 10, -8, -8, -2, 6, 4, 10, -4, -5, -8, -5, 0, 0, 9, -1, 9, -9, 2, 0, 6, -3, 4, 0, 7, 4, -3, -5, -5, -1, 3, -10, 1, -2, -8, -10, -7, 6, 7, 10, 7, -8, 9, 6, -3, -2, 4, 10, -6, 7, 6, 8, 10, 10, 8, -3, 5, -5, -4, -6, -5, 5, -4, 5, 0, 10, 9, -10, 3, 5, 6, -4, 8, -3, 1, 4, -9, -7, -5, -2, 8, 5, 3, 5, 0, 6, -7, 8, 0, -5, 3, -7, -6, -7, 1, -1, 4, 10, 6, 9, 7, 7, -9, -4, 0, 2, 2, -6, -6, -10, -5, -1, 8, 10, 9, 4, 0, 7, 5, 6, 2, 1, -4, 9, 3, 4, -9, -3, 5, 7, -7, 1, -4, 8, 0, -2, 2, -9, -7, -4, -9, -5, -3, 5], -10], expected: 184 },
  ],

  acmTests: [
    { input: '3\n1 1 1\n2\n', output: '2\n' },
    { input: '3\n1 2 3\n3\n', output: '2\n' },
    { input: '3\n1 -1 0\n0\n', output: '3\n' },
    { input: '1\n1\n0\n', output: '0\n' },
    { input: '8\n3 4 7 2 -3 1 4 2\n7\n', output: '4\n' },
    { input: '3\n-1 -1 1\n0\n', output: '1\n' },
    { input: '3\n0 0 0\n0\n', output: '6\n' },
    { input: '3\n-2 -3 -1\n-3\n', output: '1\n' },
    { input: '3\n-1 -2 -3\n-6\n', output: '1\n' },
    { input: '200\n2 -7 9 -7 -3 -6 8 -8 2 4 8 -2 9 -4 -5 3 2 -7 6 -7 6 3 -8 10 4 -1 -6 8 1 1 -3 -6 -9 1 -5 8 -1 -9 9 8 1 -3 -3 2 3 0 -6 5 -10 4 -4 -5 -7 -5 -9 9 8 10 -8 -8 -2 6 4 10 -4 -5 -8 -5 0 0 9 -1 9 -9 2 0 6 -3 4 0 7 4 -3 -5 -5 -1 3 -10 1 -2 -8 -10 -7 6 7 10 7 -8 9 6 -3 -2 4 10 -6 7 6 8 10 10 8 -3 5 -5 -4 -6 -5 5 -4 5 0 10 9 -10 3 5 6 -4 8 -3 1 4 -9 -7 -5 -2 8 5 3 5 0 6 -7 8 0 -5 3 -7 -6 -7 1 -1 4 10 6 9 7 7 -9 -4 0 2 2 -6 -6 -10 -5 -1 8 10 9 4 0 7 5 6 2 1 -4 9 3 4 -9 -3 5 7 -7 1 -4 8 0 -2 2 -9 -7 -4 -9 -5 -3 5\n-10\n', output: '184\n' },
  ],

  templates: {
    core: {
      javascript: `/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var subarraySum = function(nums, k) {
    
};
`,
      python: `def subarraySum(nums, k):
    # 返回和为 k 的连续子数组个数
    pass
`,
    },
    acm: {
      javascript: `// ACM 模式：input 是全部输入（字符串），用 console.log 输出答案
// 输入格式：第一行 n，第二行 n 个整数，第三行 k
const lines = input.trim().split('\\n');
const nums = lines[1].trim().split(/\\s+/).map(Number);
const k = Number(lines[2]);

// 在这里写你的代码，用 console.log(答案) 输出子数组个数

`,
      python: `# ACM 模式：用 input() 或 sys.stdin 读输入，用 print 输出答案
# 输入格式：第一行 n，第二行 n 个整数，第三行 k
import sys

lines = sys.stdin.read().split('\\n')
nums = list(map(int, lines[1].split()))
k = int(lines[2])

# 在这里写你的代码，用 print(答案) 输出子数组个数
`,
    },
  },

  solutions: {
    core: {
      javascript: `var subarraySum = function(nums, k) {
  const count = new Map();
  count.set(0, 1); // 空前缀和为 0 出现过一次
  let pre = 0, ans = 0;
  for (const x of nums) {
    pre += x;
    if (count.has(pre - k)) ans += count.get(pre - k); // 先查
    count.set(pre, (count.get(pre) || 0) + 1); // 后存
  }
  return ans;
};
`,
      python: `def subarraySum(nums, k):
    count = {0: 1}  # 空前缀和为 0 出现过一次
    pre = 0
    ans = 0
    for x in nums:
        pre += x
        ans += count.get(pre - k, 0)  # 先查
        count[pre] = count.get(pre, 0) + 1  # 后存
    return ans
`,
    },
    acm: {
      javascript: `const lines = input.trim().split('\\n');
const nums = lines[1].trim().split(/\\s+/).map(Number);
const k = Number(lines[2]);

const count = new Map();
count.set(0, 1);
let pre = 0, ans = 0;
for (const x of nums) {
  pre += x;
  if (count.has(pre - k)) ans += count.get(pre - k);
  count.set(pre, (count.get(pre) || 0) + 1);
}
console.log(ans);
`,
      python: `import sys

lines = sys.stdin.read().split('\\n')
nums = list(map(int, lines[1].split()))
k = int(lines[2])

count = {0: 1}
pre = 0
ans = 0
for x in nums:
    pre += x
    ans += count.get(pre - k, 0)
    count[pre] = count.get(pre, 0) + 1
print(ans)
`,
    },
  },

  idea: `
暴力枚举所有子数组并求和是 O(n²)，在 \`n\` 达到两万时会超时。

用**前缀和 + 哈希表**优化：记 \`pre[i]\` 为前 \`i\` 个数之和，则子数组 \`[i..j]\` 的和为 \`pre[j+1] - pre[i]\`。于是「和为 \`k\` 的子数组个数」等于「满足 \`pre[j+1] - pre[i] == k\` 的下标对数」。换个角度：遍历到每个前缀和 \`pre\` 时，只需知道**之前**有多少个前缀和等于 \`pre - k\`，累加起来就是答案。

- 一趟遍历，维护当前前缀和 \`pre\`
- 答案累加哈希表中 \`pre - k\` 的出现次数
- 再把当前 \`pre\` 的出现次数加一
- 初始化 \`count[0] = 1\`：表示空前缀（一个元素都不取）的和 0 出现过一次，这样「从下标 0 起和恰好为 \`k\`」的子数组才能被数到

为什么不用滑动窗口？窗口法要求元素非负才能单调收缩，而本题数组含负数；前缀和等式 \`pre[j] - pre[i] = k\` 对任意整数都成立，天然支持负数和 \`k = 0\`。

时间复杂度 O(n)，空间复杂度 O(n)。
`,

  explanation: `
- 循环体内三步顺序固定：先 \`pre += x\` 更新前缀和，**再查** \`pre - k\` 累加答案，**最后**把 \`pre\` 入库。先查后存可以保证配对的另一个前缀和严格在当前位置之前，避免 \`k == 0\` 时把「长度 0 的空子数组」误计进去
- \`count = {0: 1}\`（JS：\`count.set(0, 1)\`）是必须的初始化：对应空前缀，否则漏掉从第一个元素开始的合法子数组
- 用 \`count.get(pre - k, 0)\` / \`count.has(...)\` 处理未出现过的前缀和，JS 里注意 \`count.get(pre) || 0\` 的默认写法
- 负数、\`k = 0\` 都自然支持，不需要任何特判
- 易错点：把「查」和「存」的顺序写反，\`k = 0\` 的用例会多计

ACM 版本算法一致，只是多读一行 \`k\`，输出计数结果。
`,
};
