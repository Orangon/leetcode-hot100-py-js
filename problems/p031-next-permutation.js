// 31. 下一个排列
// 原地修改类题目：resultKind 'inputArray'，判题器忽略返回值、直接取被修改后的第一个参数比对
export default {
  id: 31,
  title: '下一个排列',
  slug: 'next-permutation',
  difficulty: 'medium',
  tags: ['数组', '双指针'],
  hints: [
    '字典序只增大一点，意味着应改动最靠右的可增位置，并让该位置增幅与后缀排列都尽可能小。',
    '从右找第一个 nums[i]<nums[i+1] 的位置，在递减后缀中换入最小的更大值，再反转后缀。',
    '令 i=n-2 向左跳过 nums[i]>=nums[i+1]；若 i>=0，从末尾找 nums[j]>nums[i] 并交换，最后反转 [i+1,n-1]。',
    '重复值要求比较符号包含等号；若 i=-1 必须整体反转得到最小排列，核心模式需原地修改而非依赖返回值。',
  ],

  description: `
整数数组的一个**排列**就是将其所有成员以序列或线性顺序排列。例如 \`arr = [1,2,3]\` 的所有排列为 \`[1,2,3]\`、\`[1,3,2]\`、\`[2,1,3]\`、\`[2,3,1]\`、\`[3,1,2]\`、\`[3,2,1]\`。

整数数组的**下一个排列**是指其整数的下一个字典序更大的排列。更正式地，如果数组的所有排列按其字典序从小到大排序，那么它的下一个排列就是排在它后面的那个排列。如果不存在下一个更大的排列，则必须将数组重排为字典序最小的排列（即升序排列）。

- 例如，\`arr = [1,2,3]\` 的下一个排列是 \`[1,3,2]\`
- 类似地，\`arr = [2,3,1]\` 的下一个排列是 \`[3,1,2]\`
- 而 \`arr = [3,2,1]\` 的下一个排列是 \`[1,2,3]\`，因为 \`[3,2,1]\` 不存在字典序更大的排列

给你一个整数数组 \`nums\`，请将其**原地修改**为下一个排列。

必须**原地**修改，只允许使用额外常数空间。

### 示例

- 输入：\`nums = [1,2,3]\`，输出：\`[1,3,2]\`
- 输入：\`nums = [3,2,1]\`，输出：\`[1,2,3]\`
- 输入：\`nums = [1,1,5]\`，输出：\`[1,5,1]\`

### 提示

- \`1 <= nums.length <= 100\`
- \`0 <= nums[i] <= 100\`

### ACM 模式输入输出格式

- 输入：第一行为整数 \`n\`（数组长度）；第二行为 \`n\` 个整数（空格分隔）
- 输出：下一个排列（空格分隔）

ACM 输入示例：
\`\`\`
3
1 2 3
\`\`\`
输出：\`1 3 2\`
`,

  functionName: 'nextPermutation',
  compare: 'exact',
  resultKind: 'inputArray',

  tests: [
    { args: [[1, 2, 3]], expected: [1, 3, 2] },
    { args: [[3, 2, 1]], expected: [1, 2, 3] },
    { args: [[1, 1, 5]], expected: [1, 5, 1] },
    { args: [[1]], expected: [1] },
    { args: [[2, 3, 1, 1]], expected: [3, 1, 1, 2] },
    { args: [[1, 5, 8, 4, 7, 6, 5, 3, 1]], expected: [1, 5, 8, 5, 1, 3, 4, 6, 7] },
    { args: [[2, 2, 2]], expected: [2, 2, 2] },
    { args: [[1, 2]], expected: [2, 1] },
    { args: [[0, 0, 1]], expected: [0, 1, 0] },
    { args: [[1, 1, 2, 2, 3, 1, 3, 2, 1, 1]], expected: [1, 1, 2, 2, 3, 2, 1, 1, 1, 3] },
  ],

  acmTests: [
    { input: '3\n1 2 3\n', output: '1 3 2\n' },
    { input: '3\n3 2 1\n', output: '1 2 3\n' },
    { input: '3\n1 1 5\n', output: '1 5 1\n' },
    { input: '1\n1\n', output: '1\n' },
    { input: '4\n2 3 1 1\n', output: '3 1 1 2\n' },
    { input: '9\n1 5 8 4 7 6 5 3 1\n', output: '1 5 8 5 1 3 4 6 7\n' },
    { input: '3\n2 2 2\n', output: '2 2 2\n' },
    { input: '2\n1 2\n', output: '2 1\n' },
    { input: '3\n0 0 1\n', output: '0 1 0\n' },
    { input: '10\n1 1 2 2 3 1 3 2 1 1\n', output: '1 1 2 2 3 2 1 1 1 3\n' },
  ],

  templates: {
    core: {
      javascript: `/**
 * @param {number[]} nums
 * @return {void} 原地修改 nums，不要返回任何值
 */
var nextPermutation = function(nums) {
    
};
`,
      python: `def nextPermutation(nums):
    # 原地修改 nums 为下一个排列，无需返回值
    pass
`,
    },
    acm: {
      javascript: `// ACM 模式：input 是全部输入（字符串），用 console.log 输出答案
// 输入格式：第一行 n，第二行 n 个整数
const lines = input.trim().split('\\n');
const nums = lines[1].trim().split(/\\s+/).map(Number);

// 在这里原地修改 nums 为下一个排列，并用 console.log(nums.join(' ')) 输出结果

`,
      python: `# ACM 模式：用 input() 或 sys.stdin 读输入，用 print 输出答案
# 输入格式：第一行 n，第二行 n 个整数
import sys

lines = sys.stdin.read().split('\\n')
nums = list(map(int, lines[1].split()))

# 在这里原地修改 nums 为下一个排列，并用 print(' '.join(map(str, nums))) 输出结果
`,
    },
  },

  solutions: {
    core: {
      javascript: `var nextPermutation = function(nums) {
  const n = nums.length;
  // 1. 从右往左找第一个下降点 i（i 右侧是递减后缀）
  let i = n - 2;
  while (i >= 0 && nums[i] >= nums[i + 1]) i--;
  // 2. 在 i 右侧找最小的大于 nums[i] 的数，与之交换
  if (i >= 0) {
    let j = n - 1;
    while (nums[j] <= nums[i]) j--;
    const t = nums[i]; nums[i] = nums[j]; nums[j] = t;
  }
  // 3. 反转 i 右侧后缀（i == -1 时恰好整体反转，覆盖最大排列的情况）
  let lo = i + 1, hi = n - 1;
  while (lo < hi) {
    const t = nums[lo]; nums[lo] = nums[hi]; nums[hi] = t;
    lo++; hi--;
  }
};
`,
      python: `def nextPermutation(nums):
    n = len(nums)
    # 1. 从右往左找第一个下降点 i（i 右侧是递减后缀）
    i = n - 2
    while i >= 0 and nums[i] >= nums[i + 1]:
        i -= 1
    # 2. 在 i 右侧找最小的大于 nums[i] 的数，与之交换
    if i >= 0:
        j = n - 1
        while nums[j] <= nums[i]:
            j -= 1
        nums[i], nums[j] = nums[j], nums[i]
    # 3. 反转 i 右侧后缀（i == -1 时恰好整体反转，覆盖最大排列的情况）
    lo, hi = i + 1, n - 1
    while lo < hi:
        nums[lo], nums[hi] = nums[hi], nums[lo]
        lo += 1
        hi -= 1
`,
    },
    acm: {
      javascript: `const lines = input.trim().split('\\n');
const nums = lines[1].trim().split(/\\s+/).map(Number);

const n = nums.length;
let i = n - 2;
while (i >= 0 && nums[i] >= nums[i + 1]) i--;
if (i >= 0) {
  let j = n - 1;
  while (nums[j] <= nums[i]) j--;
  const t = nums[i]; nums[i] = nums[j]; nums[j] = t;
}
let lo = i + 1, hi = n - 1;
while (lo < hi) {
  const t = nums[lo]; nums[lo] = nums[hi]; nums[hi] = t;
  lo++; hi--;
}
console.log(nums.join(' '));
`,
      python: `import sys

lines = sys.stdin.read().split('\\n')
nums = list(map(int, lines[1].split()))

n = len(nums)
i = n - 2
while i >= 0 and nums[i] >= nums[i + 1]:
    i -= 1
if i >= 0:
    j = n - 1
    while nums[j] <= nums[i]:
        j -= 1
    nums[i], nums[j] = nums[j], nums[i]
lo, hi = i + 1, n - 1
while lo < hi:
    nums[lo], nums[hi] = nums[hi], nums[lo]
    lo += 1
    hi -= 1
print(' '.join(map(str, nums)))
`,
    },
  },

  idea: `
要找到「字典序恰好大一点」的排列，关键是让**改动尽量靠右、增幅尽量小**，分三步：

1. **从右往左找第一个下降点** \`i\`：即满足 \`nums[i] < nums[i+1]\` 的最右位置。\`i\` 右侧是递减序列，局部已排不出更大的排列，所以变动必须发生在 \`i\` 或更左；而 \`i\` 就是能变动的最右位置
2. **在 \`i\` 右侧找最小的大于 \`nums[i]\` 的数与之交换**：右侧是递减的，从右往左第一个大于 \`nums[i]\` 的数就是「最小增幅」，记位置 \`j\`，交换 \`nums[i]\` 与 \`nums[j]\`（交换后右侧仍保持递减）
3. **反转 \`i\` 右侧的后缀**：把递减后缀反转为递增，得到最小的后缀排列

为什么对？字典序由「最靠左的不同位」决定，所以要改最右边的可增位（步骤 1）；增幅要最小，所以换入右侧最小的更大值（步骤 2）；后缀要最小，所以排成递增（步骤 3）。

如果第 1 步没找到下降点（\`i\` 一路减到 -1，如 \`[3,2,1]\`），说明已是最大排列，此时步骤 3 恰好是整体反转，自然得到最小排列，不需要特判。

时间复杂度 O(n)，空间复杂度 O(1)。
`,

  explanation: `
- 第一步：\`i\` 从 \`n - 2\` 开始往左扫，条件是 \`nums[i] >= nums[i + 1]\` 就继续左移。**必须取等号**，这样重复元素（如 \`[1,1,5]\`）也能正确定位下降点
- 第二步只在 \`i >= 0\` 时进行：\`j\` 从右端找第一个 \`nums[j] > nums[i]\`（条件写成 \`nums[j] <= nums[i]\` 就左移），由于后缀递减，找到的就是最小的更大值
- 第三步双指针原地反转 \`[i + 1, n - 1]\` 区间；\`i == -1\` 时区间是整个数组，自动覆盖「已是最大排列」的情况
- 易错点：
  - 比较符号写成 \`>\` / \`<\`（不取等）会在有重复元素时出错
  - 找不到下降点时不能跳过反转步骤
  - 交换后不要忘记后缀仍是递减的，必须再反转才能得到最小后缀
- 本题是原地修改、无返回值的题目，判题器会直接读取修改后的数组

ACM 版本算法一致，原地修改后用空格拼接输出。
`,
};
