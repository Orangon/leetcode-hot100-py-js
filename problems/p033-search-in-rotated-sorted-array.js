// 33. 搜索旋转排序数组
export default {
  id: 33,
  title: '搜索旋转排序数组',
  slug: 'search-in-rotated-sorted-array',
  difficulty: 'medium',
  tags: ['数组', '二分查找'],
  hints: [
    '旋转后整体不再有序，但任取中点时，左右两半至少有一半仍保持严格升序，这是继续二分的依据。',
    '每轮先判断 [lo,mid] 还是 [mid,hi] 有序，再判断 target 是否落在该有序半边的值域内。',
    '若 nums[lo]<=nums[mid]，目标在 [nums[lo],nums[mid]) 就收右界，否则收左界；右半有序时做对称判断。',
    '数组元素互不相同，因此无需处理重复值造成的模糊区间；ACM 找不到时输出 -1，找到时输出原旋转数组下标。',
  ],

  description: `
整数数组 \`nums\` 按升序排列，数组中的值互不相同。

在传递给函数之前，\`nums\` 在预先未知的某个下标 \`k\`（\`0 <= k < nums.length\`）上进行了旋转，使数组变为 \`[nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]]\`（下标从 0 开始计数）。例如 \`[0,1,2,4,5,6,7]\` 在下标 3 处经旋转后可能变为 \`[4,5,6,7,0,1,2]\`。

给你旋转后的数组 \`nums\` 和一个整数 \`target\`，如果 \`nums\` 中存在这个目标值，则返回它的下标，否则返回 \`-1\`。

要求算法的时间复杂度为 O(log n)。

### 示例

- 输入：\`nums = [4,5,6,7,0,1,2], target = 0\`，输出：\`4\`
- 输入：\`nums = [4,5,6,7,0,1,2], target = 3\`，输出：\`-1\`
- 输入：\`nums = [1], target = 0\`，输出：\`-1\`

### 提示

- \`1 <= nums.length <= 5000\`
- \`-10^4 <= nums[i] <= 10^4\`
- \`nums\` 中的每个值都独一无二
- 题目数据保证 \`nums\` 在预先未知的某个下标上进行了旋转
- \`-10^4 <= target <= 10^4\`

### ACM 模式输入输出格式

- 输入：第一行为整数 \`n\`（数组长度）；第二行为 \`n\` 个整数（空格分隔，即旋转后的升序数组）；第三行为 \`target\`
- 输出：一个整数（目标值下标；不存在时输出 \`-1\`）

ACM 输入示例：
\`\`\`
7
4 5 6 7 0 1 2
0
\`\`\`
输出：\`4\`
`,

  functionName: 'search',
  compare: 'exact',

  tests: [
    { args: [[4, 5, 6, 7, 0, 1, 2], 0], expected: 4 },
    { args: [[4, 5, 6, 7, 0, 1, 2], 3], expected: -1 },
    { args: [[1], 0], expected: -1 },
    { args: [[1], 1], expected: 0 },
    { args: [[3, 1], 1], expected: 1 },
    { args: [[5, 6, 7, 8, 1, 2, 3, 4], 8], expected: 3 },
    { args: [[1, 2, 3, 4, 5], 3], expected: 2 },
    { args: [[4, 5, 6, 7, 0, 1, 2], 4], expected: 0 },
    { args: [[2, 4, 5, -3, -1], -3], expected: 3 },
    { args: [[4208, 4285, 4393, 4508, 4553, 4571, 4801, 4837, 4905, 4906, 4999, 5168, 5169, 5180, 5235, 5239, 5333, 5347, 5458, 5504, 5622, 5670, 5750, 5976, 6206, 6315, 6606, 6728, 6775, 6814, 6862, 7013, 7451, 7554, 7564, 7641, 7670, 7706, 7962, 8088, 8100, 8298, 8366, 8489, 8638, 8679, 8722, 8740, 8809, 8818, 8906, 8931, 8951, 9047, 9224, 9284, 9361, 9440, 9466, 9539, 9681, 9827, 9927, -9912, -9815, -9763, -9696, -9648, -9557, -9442, -9257, -9249, -9084, -9022, -8951, -8899, -8880, -8794, -8448, -8203, -8077, -7893, -7885, -7862, -7822, -7777, -7725, -7716, -7603, -7588, -7565, -7517, -7503, -7438, -7376, -7296, -7245, -7241, -7168, -7139, -7085, -7069, -7064, -6968, -6514, -6475, -6256, -6175, -5901, -5839, -5506, -5417, -5317, -5185, -5076, -4796, -4770, -4654, -4476, -4385, -4371, -4227, -4148, -4134, -4069, -4007, -3944, -3905, -3861, -3764, -3745, -3701, -3151, -3088, -3064, -2856, -2787, -2771, -2741, -2634, -2593, -2508, -2491, -2387, -1925, -1740, -1609, -1368, -1337, -1227, -1186, -1182, -1148, -808, -708, -695, -610, -581, -551, -474, -375, -367, -212, -111, 237, 449, 610, 849, 1008, 1014, 1140, 1545, 1554, 1729, 1751, 1886, 2048, 2051, 2235, 2358, 2363, 2482, 2548, 2737, 2953, 2961, 3127, 3294, 3362, 3394, 3404, 3519, 3583, 3606, 3656, 3665, 3673, 3894, 3898, 4073], -7438], expected: 93 },
  ],

  acmTests: [
    { input: '7\n4 5 6 7 0 1 2\n0\n', output: '4\n' },
    { input: '7\n4 5 6 7 0 1 2\n3\n', output: '-1\n' },
    { input: '1\n1\n0\n', output: '-1\n' },
    { input: '1\n1\n1\n', output: '0\n' },
    { input: '2\n3 1\n1\n', output: '1\n' },
    { input: '8\n5 6 7 8 1 2 3 4\n8\n', output: '3\n' },
    { input: '5\n1 2 3 4 5\n3\n', output: '2\n' },
    { input: '7\n4 5 6 7 0 1 2\n4\n', output: '0\n' },
    { input: '5\n2 4 5 -3 -1\n-3\n', output: '3\n' },
    { input: '200\n4208 4285 4393 4508 4553 4571 4801 4837 4905 4906 4999 5168 5169 5180 5235 5239 5333 5347 5458 5504 5622 5670 5750 5976 6206 6315 6606 6728 6775 6814 6862 7013 7451 7554 7564 7641 7670 7706 7962 8088 8100 8298 8366 8489 8638 8679 8722 8740 8809 8818 8906 8931 8951 9047 9224 9284 9361 9440 9466 9539 9681 9827 9927 -9912 -9815 -9763 -9696 -9648 -9557 -9442 -9257 -9249 -9084 -9022 -8951 -8899 -8880 -8794 -8448 -8203 -8077 -7893 -7885 -7862 -7822 -7777 -7725 -7716 -7603 -7588 -7565 -7517 -7503 -7438 -7376 -7296 -7245 -7241 -7168 -7139 -7085 -7069 -7064 -6968 -6514 -6475 -6256 -6175 -5901 -5839 -5506 -5417 -5317 -5185 -5076 -4796 -4770 -4654 -4476 -4385 -4371 -4227 -4148 -4134 -4069 -4007 -3944 -3905 -3861 -3764 -3745 -3701 -3151 -3088 -3064 -2856 -2787 -2771 -2741 -2634 -2593 -2508 -2491 -2387 -1925 -1740 -1609 -1368 -1337 -1227 -1186 -1182 -1148 -808 -708 -695 -610 -581 -551 -474 -375 -367 -212 -111 237 449 610 849 1008 1014 1140 1545 1554 1729 1751 1886 2048 2051 2235 2358 2363 2482 2548 2737 2953 2961 3127 3294 3362 3394 3404 3519 3583 3606 3656 3665 3673 3894 3898 4073\n-7438\n', output: '93\n' },
  ],

  templates: {
    core: {
      javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {
    
};
`,
      python: `def search(nums, target):
    # 返回 target 的下标，不存在返回 -1
    pass
`,
    },
    acm: {
      javascript: `// ACM 模式：input 是全部输入（字符串），用 console.log 输出答案
// 输入格式：第一行 n，第二行 n 个整数（旋转后的升序数组），第三行 target
const lines = input.split('\\n');
const nums = lines[1].trim().split(/\\s+/).map(Number);
const target = Number(lines[2]);

// 在这里写你的代码，用 console.log 输出一个整数

`,
      python: `# ACM 模式：用 input() 或 sys.stdin 读输入，用 print 输出答案
# 输入格式：第一行 n，第二行 n 个整数（旋转后的升序数组），第三行 target
import sys

lines = sys.stdin.read().split('\\n')
nums = list(map(int, lines[1].split()))
target = int(lines[2])

# 在这里写你的代码，用 print 输出一个整数
`,
    },
  },

  solutions: {
    core: {
      javascript: `var search = function(nums, target) {
  let lo = 0;
  let hi = nums.length - 1;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    if (nums[mid] === target) return mid;
    if (nums[lo] <= nums[mid]) {
      // 左半 [lo, mid] 有序，判断 target 是否落在其中
      if (nums[lo] <= target && target < nums[mid]) hi = mid - 1;
      else lo = mid + 1;
    } else {
      // 右半 [mid, hi] 有序，判断 target 是否落在其中
      if (nums[mid] < target && target <= nums[hi]) lo = mid + 1;
      else hi = mid - 1;
    }
  }
  return -1;
};
`,
      python: `def search(nums, target):
    lo, hi = 0, len(nums) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if nums[mid] == target:
            return mid
        if nums[lo] <= nums[mid]:
            # 左半 [lo, mid] 有序，判断 target 是否落在其中
            if nums[lo] <= target < nums[mid]:
                hi = mid - 1
            else:
                lo = mid + 1
        else:
            # 右半 [mid, hi] 有序，判断 target 是否落在其中
            if nums[mid] < target <= nums[hi]:
                lo = mid + 1
            else:
                hi = mid - 1
    return -1
`,
    },
    acm: {
      javascript: `const lines = input.split('\\n');
const nums = lines[1].trim().split(/\\s+/).map(Number);
const target = Number(lines[2]);

// 一次二分：每步先判断哪一半有序，再看 target 是否落在有序半边
let lo = 0;
let hi = nums.length - 1;
let ans = -1;
while (lo <= hi) {
  const mid = (lo + hi) >> 1;
  if (nums[mid] === target) {
    ans = mid;
    break;
  }
  if (nums[lo] <= nums[mid]) {
    if (nums[lo] <= target && target < nums[mid]) hi = mid - 1;
    else lo = mid + 1;
  } else {
    if (nums[mid] < target && target <= nums[hi]) lo = mid + 1;
    else hi = mid - 1;
  }
}
console.log(ans);
`,
      python: `import sys

lines = sys.stdin.read().split('\\n')
nums = list(map(int, lines[1].split()))
target = int(lines[2])

# 一次二分：每步先判断哪一半有序，再看 target 是否落在有序半边
lo, hi = 0, len(nums) - 1
ans = -1
while lo <= hi:
    mid = (lo + hi) // 2
    if nums[mid] == target:
        ans = mid
        break
    if nums[lo] <= nums[mid]:
        if nums[lo] <= target < nums[mid]:
            hi = mid - 1
        else:
            lo = mid + 1
    else:
        if nums[mid] < target <= nums[hi]:
            lo = mid + 1
        else:
            hi = mid - 1
print(ans)
`,
    },
  },

  idea: `
旋转数组整体无序，但以任意中点切一刀，左右两半中至少有一半是有序的——这是二分仍然可行的关键。

每次取 \`mid\` 后先判断哪一半有序：

- 若 \`nums[lo] <= nums[mid]\`，左半 \`[lo, mid]\` 有序。此时若 \`target\` 落在 \`[nums[lo], nums[mid])\` 内，答案必在左半，否则去右半找
- 否则右半 \`[mid, hi]\` 有序。此时若 \`target\` 落在 \`(nums[mid], nums[hi]]\` 内，答案必在右半，否则去左半找

每一步都能排除掉一半区间，时间复杂度 O(log n)，空间复杂度 O(1)。
`,

  explanation: `
- 循环条件用 \`lo <= hi\`（闭区间），命中 \`nums[mid] === target\` 直接返回下标
- 判断左半有序用 \`nums[lo] <= nums[mid]\`：等号处理的是 \`lo == mid\`（区间只剩两个元素）的情况，此时左半只有一个元素，必然有序
- \`target\` 是否落在有序半边的判断要严格写好两端的等号：左半是 \`nums[lo] <= target && target < nums[mid]\`，右半是 \`nums[mid] < target && target <= nums[hi]\`（Python 可用链式比较 \`nums[lo] <= target < nums[mid]\`）
- 落在有序半边就收缩到那一半，否则去另一半；找不到时区间耗尽，返回 -1
- 易错点：不要试图「先二分找旋转点、再普通二分」，一次二分就够了；两端等号写反会导致漏解或死循环
- ACM 版本只是多了按行解析输入，核心二分逻辑完全一致
`,
};
