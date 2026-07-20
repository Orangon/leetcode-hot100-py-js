// 34. 在排序数组中查找元素的第一个和最后一个位置
export default {
  id: 34,
  title: '在排序数组中查找元素的第一个和最后一个位置',
  slug: 'find-first-and-last-position-of-element-in-sorted-array',
  difficulty: 'medium',
  tags: ['数组', '二分查找'],
  hints: [
    '普通二分只能找到某个 target；要得到完整区间，应分别定位第一个不小于 target 和第一个大于 target 的位置。',
    '执行两次左闭右开的边界二分：lower_bound(target) 给左端，upper_bound(target)-1 给右端。',
    '第一轮 nums[mid]<target 时移动 lo，否则移动 hi；验证左端确实等于 target 后，第二轮改为 nums[mid]<=target 时移动 lo。',
    '空数组或左边界越界要先返回 -1 -1；ACM 的 n=0 时数组行为空，必须按 n 判断后再解析。',
  ],

  description: `
给你一个按照非递减顺序排列的整数数组 \`nums\`，和一个目标值 \`target\`。请你找出给定目标值在数组中的开始位置和结束位置。

如果数组中不存在目标值 \`target\`，返回 \`[-1, -1]\`。

要求算法的时间复杂度为 O(log n)。

### 示例

- 输入：\`nums = [5,7,7,8,8,10], target = 8\`，输出：\`[3,4]\`
- 输入：\`nums = [5,7,7,8,8,10], target = 6\`，输出：\`[-1,-1]\`
- 输入：\`nums = [], target = 0\`，输出：\`[-1,-1]\`

### 提示

- \`0 <= nums.length <= 10^5\`
- \`-10^9 <= nums[i] <= 10^9\`
- \`nums\` 是一个非递减数组
- \`-10^9 <= target <= 10^9\`

### ACM 模式输入输出格式

- 输入：第一行为整数 \`n\`（数组长度）；第二行为 \`n\` 个整数（空格分隔；\`n = 0\` 时该行为空行）；第三行为 \`target\`
- 输出：两个整数（空格分隔），即开始位置和结束位置；不存在时输出 \`-1 -1\`

ACM 输入示例：
\`\`\`
6
5 7 7 8 8 10
8
\`\`\`
输出：\`3 4\`
`,

  functionName: 'searchRange',
  compare: 'exact',

  tests: [
    { args: [[5, 7, 7, 8, 8, 10], 8], expected: [3, 4] },
    { args: [[5, 7, 7, 8, 8, 10], 6], expected: [-1, -1] },
    { args: [[], 0], expected: [-1, -1] },
    { args: [[1], 1], expected: [0, 0] },
    { args: [[2, 2, 2, 2], 2], expected: [0, 3] },
    { args: [[1, 2, 3], 4], expected: [-1, -1] },
    { args: [[1, 2, 3, 4], 1], expected: [0, 0] },
    { args: [[1, 2, 3, 4], 4], expected: [3, 3] },
    { args: [[-5, -3, -3, -1, 0, 0, 0, 2], 0], expected: [4, 6] },
    { args: [[1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 6, 7, 7, 8, 8, 8, 8, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 10, 10, 10, 10, 10, 10, 10, 11, 11, 11, 11, 11, 11, 11, 11, 13, 13, 13, 13, 13, 13, 13, 14, 15, 15, 15, 15, 15, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 18, 18, 18, 19, 19, 19, 19, 19, 20, 20, 20, 20, 20, 20, 21, 21, 21, 21, 21, 21, 21, 21, 22, 22, 22, 22, 22, 22, 22, 22, 23, 23, 23, 23, 23, 23, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 25, 25, 26, 26, 27, 27, 27, 27, 27, 28, 28, 28, 28, 29, 29, 29, 29, 29, 29, 29, 29, 29, 30, 30, 30, 30, 30, 30, 31, 31, 31, 31, 31, 31, 31, 32, 32, 32, 32, 32, 32, 32, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 33, 34, 34, 34, 34, 34, 34, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 36, 36, 36, 36, 36, 36, 36, 36, 36, 37, 37, 37, 37, 37, 37, 37, 38, 38, 38, 38, 39, 39, 39, 39, 39, 40, 40, 40, 40, 40, 40, 40, 40, 41, 41, 41, 41, 41, 41, 42, 42, 42, 42, 42, 42, 42, 42, 42, 43, 43, 43, 43, 44, 44, 44, 44, 44, 44, 45, 45, 45, 45, 45, 46, 46, 46, 46, 46, 47, 47, 47, 47, 47, 47, 48, 48, 48, 48, 48, 48, 48, 49, 49, 49, 49, 49, 49, 50], 28], expected: [150, 153] },
  ],

  acmTests: [
    { input: '6\n5 7 7 8 8 10\n8\n', output: '3 4\n' },
    { input: '6\n5 7 7 8 8 10\n6\n', output: '-1 -1\n' },
    { input: '0\n\n0\n', output: '-1 -1\n' },
    { input: '1\n1\n1\n', output: '0 0\n' },
    { input: '4\n2 2 2 2\n2\n', output: '0 3\n' },
    { input: '3\n1 2 3\n4\n', output: '-1 -1\n' },
    { input: '4\n1 2 3 4\n1\n', output: '0 0\n' },
    { input: '4\n1 2 3 4\n4\n', output: '3 3\n' },
    { input: '8\n-5 -3 -3 -1 0 0 0 2\n0\n', output: '4 6\n' },
    { input: '300\n1 1 1 1 1 1 1 2 2 2 2 2 3 3 3 3 3 4 4 4 4 4 5 5 5 5 5 5 6 6 6 6 6 6 7 7 8 8 8 8 9 9 9 9 9 9 9 9 9 9 9 9 9 10 10 10 10 10 10 10 11 11 11 11 11 11 11 11 13 13 13 13 13 13 13 14 15 15 15 15 15 16 16 16 16 16 17 17 17 17 18 18 18 18 18 18 18 19 19 19 19 19 20 20 20 20 20 20 21 21 21 21 21 21 21 21 22 22 22 22 22 22 22 22 23 23 23 23 23 23 23 24 24 24 24 24 24 24 24 24 24 25 25 26 26 27 27 27 27 27 28 28 28 28 29 29 29 29 29 29 29 29 29 30 30 30 30 30 30 31 31 31 31 31 31 31 32 32 32 32 32 32 32 33 33 33 33 33 33 33 33 33 33 33 33 33 34 34 34 34 34 34 35 35 35 35 35 35 35 35 35 35 36 36 36 36 36 36 36 36 36 37 37 37 37 37 37 37 38 38 38 38 39 39 39 39 39 40 40 40 40 40 40 40 40 41 41 41 41 41 41 42 42 42 42 42 42 42 42 42 43 43 43 43 44 44 44 44 44 44 45 45 45 45 45 46 46 46 46 46 47 47 47 47 47 47 48 48 48 48 48 48 48 48 49 49 49 49 49 49 50\n28\n', output: '150 153\n' },
  ],

  templates: {
    core: {
      javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function(nums, target) {
    
};
`,
      python: `def searchRange(nums, target):
    # 返回 [开始位置, 结束位置]，不存在返回 [-1, -1]
    pass
`,
    },
    acm: {
      javascript: `// ACM 模式：input 是全部输入（字符串），用 console.log 输出答案
// 输入格式：第一行 n，第二行 n 个整数（n = 0 时为空行），第三行 target
const lines = input.split('\\n');
const n = Number(lines[0]);
const nums = n > 0 ? lines[1].trim().split(/\\s+/).map(Number) : [];
const target = Number(lines[2]);

// 在这里写你的代码，用 console.log(a, b) 输出两个下标

`,
      python: `# ACM 模式：用 input() 或 sys.stdin 读输入，用 print 输出答案
# 输入格式：第一行 n，第二行 n 个整数（n = 0 时为空行），第三行 target
import sys

lines = sys.stdin.read().split('\\n')
n = int(lines[0])
nums = list(map(int, lines[1].split())) if n > 0 else []
target = int(lines[2])

# 在这里写你的代码，用 print(a, b) 输出两个下标
`,
    },
  },

  solutions: {
    core: {
      javascript: `var searchRange = function(nums, target) {
  // 第一次二分：找第一个 >= target 的位置（左边界）
  let lo = 0;
  let hi = nums.length;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (nums[mid] < target) lo = mid + 1;
    else hi = mid;
  }
  const left = lo;
  if (left === nums.length || nums[left] !== target) return [-1, -1];
  // 第二次二分：找第一个 > target 的位置，减一即右边界
  lo = left;
  hi = nums.length;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (nums[mid] <= target) lo = mid + 1;
    else hi = mid;
  }
  return [left, lo - 1];
};
`,
      python: `def searchRange(nums, target):
    # 第一次二分：找第一个 >= target 的位置（左边界）
    lo, hi = 0, len(nums)
    while lo < hi:
        mid = (lo + hi) // 2
        if nums[mid] < target:
            lo = mid + 1
        else:
            hi = mid
    left = lo
    if left == len(nums) or nums[left] != target:
        return [-1, -1]
    # 第二次二分：找第一个 > target 的位置，减一即右边界
    lo, hi = left, len(nums)
    while lo < hi:
        mid = (lo + hi) // 2
        if nums[mid] <= target:
            lo = mid + 1
        else:
            hi = mid
    return [left, lo - 1]
`,
    },
    acm: {
      javascript: `const lines = input.split('\\n');
const n = Number(lines[0]);
const nums = n > 0 ? lines[1].trim().split(/\\s+/).map(Number) : [];
const target = Number(lines[2]);

// 第一次二分：找第一个 >= target 的位置（左边界）
let lo = 0;
let hi = nums.length;
while (lo < hi) {
  const mid = (lo + hi) >> 1;
  if (nums[mid] < target) lo = mid + 1;
  else hi = mid;
}
const left = lo;
if (left === nums.length || nums[left] !== target) {
  console.log(-1, -1);
} else {
  // 第二次二分：找第一个 > target 的位置，减一即右边界
  lo = left;
  hi = nums.length;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (nums[mid] <= target) lo = mid + 1;
    else hi = mid;
  }
  console.log(left, lo - 1);
}
`,
      python: `import sys

lines = sys.stdin.read().split('\\n')
n = int(lines[0])
nums = list(map(int, lines[1].split())) if n > 0 else []
target = int(lines[2])

# 第一次二分：找第一个 >= target 的位置（左边界）
lo, hi = 0, len(nums)
while lo < hi:
    mid = (lo + hi) // 2
    if nums[mid] < target:
        lo = mid + 1
    else:
        hi = mid
left = lo
if left == len(nums) or nums[left] != target:
    print(-1, -1)
else:
    # 第二次二分：找第一个 > target 的位置，减一即右边界
    lo, hi = left, len(nums)
    while lo < hi:
        mid = (lo + hi) // 2
        if nums[mid] <= target:
            lo = mid + 1
        else:
            hi = mid
    print(left, lo - 1)
`,
    },
  },

  idea: `
数组非递减且要求 O(log n)，用二分查找。\`target\` 可能出现多次，一次普通二分只能命中其中某一处，无法直接得到两个边界。

做法是分两次二分：

- 找左边界：第一个 \`>= target\` 的位置（lower_bound）。找到后检查该位置元素是否等于 \`target\`，不等（或越界）说明 \`target\` 不存在
- 找右边界：第一个 \`> target\` 的位置再减一，即最后一个等于 \`target\` 的位置

两次二分各 O(log n)，总体时间复杂度 O(log n)，空间复杂度 O(1)。
`,

  explanation: `
- 左边界二分：左闭右开区间 \`[lo, hi)\` 内，\`nums[mid] < target\` 收 \`lo = mid + 1\`，否则收 \`hi = mid\`；结束时 \`lo\` 指向第一个不小于 \`target\` 的位置
- 若 \`lo\` 越界或 \`nums[lo] !== target\`，说明 \`target\` 不存在，直接返回 \`[-1, -1]\`；空数组时 \`lo\` 为 0、越界检查先挡住，天然安全
- 右边界二分：把收缩条件改成 \`nums[mid] <= target\` 时收 \`lo = mid + 1\`，结束时 \`lo\` 指向第一个大于 \`target\` 的位置，减一即右边界；从已知的左边界开始搜可以省一点常数
- 易错点：右边界必须先确认 \`target\` 存在再求，否则会得到无意义的下标；两次二分的比较条件一个带等号一个不带，别写混
- ACM 版本注意 \`n = 0\` 时第二行是空行，要按 \`n > 0\` 判断后再解析，避免对空行 split 出错
`,
};
