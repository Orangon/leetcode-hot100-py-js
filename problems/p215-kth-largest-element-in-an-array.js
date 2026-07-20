// 215. 数组中的第 K 个最大元素
export default {
  id: 215,
  title: '数组中的第 K 个最大元素',
  slug: 'kth-largest-element-in-an-array',
  difficulty: 'medium',
  tags: ['数组', '分治', '快速选择', '排序', '堆（优先队列）'],
  hints: [
    '第 k 大等价于数组按升序排列后下标为 nums.length - k 的元素，因此无需把整个数组完全排序。',
    '使用快速选择：每次 partition 将枢轴放到最终升序位置，再根据该位置与目标下标的关系只继续处理一侧，平均时间复杂度为 O(n)。',
    '令 target = nums.length - k；在区间 [lo, hi] 原地分区得到 p，若 p === target 则返回 nums[p]，若 p < target 则令 lo = p + 1，否则令 hi = p - 1。',
    '重复元素也参与排名，不要去重；题目保证 1 <= k <= n，ACM 模式按三行读取 n、数组和 k，并只输出找到的整数。',
  ],

  description: `
给定整数数组 \`nums\` 和整数 \`k\`，请返回数组中第 \`k\` 个最大的元素。

请注意，你需要找的是数组排序后的第 \`k\` 个最大的元素，而不是第 \`k\` 个不同的元素。

你必须设计并实现时间复杂度为 \`O(n)\` 的算法来解决此问题。

### 示例

- 输入：\`nums = [3,2,1,5,6,4], k = 2\`，输出：\`5\`
- 输入：\`nums = [3,2,3,1,2,4,5,5,6], k = 4\`，输出：\`4\`

### 提示

- \`1 <= k <= nums.length <= 10^5\`
- \`-10^4 <= nums[i] <= 10^4\`

### ACM 模式输入输出格式

- 输入：第一行为整数 \`n\`（数组长度）；第二行为 \`n\` 个整数（空格分隔）；第三行为整数 \`k\`
- 输出：一个整数，第 \`k\` 大的元素

ACM 输入示例：
\`\`\`
6
3 2 1 5 6 4
2
\`\`\`
输出：\`5\`
`,

  functionName: 'findKthLargest',
  compare: 'exact',

  tests: [
    { args: [[3, 2, 1, 5, 6, 4], 2], expected: 5 },
    { args: [[3, 2, 3, 1, 2, 4, 5, 5, 6], 4], expected: 4 },
    { args: [[1], 1], expected: 1 },
    { args: [[7, 3], 2], expected: 3 },
    { args: [[-1, -2, -3, -4, -5], 2], expected: -2 },
    { args: [[3, 3, 3, 3, 3], 3], expected: 3 },
    { args: [[5, 3, 8, 1], 1], expected: 8 },
    { args: [[5, 3, 8, 1], 4], expected: 1 },
    { args: [[9, 8, 7, 6, 5, 4, 3, 2, 1], 4], expected: 6 },
    { args: [[-1419, 7415, -8952, 876, 4770, 1100, 3246, -5740, -3193, 464, 1131, -5002, -8547, 5675, -817, -2690, 5892, -9885, 1954, 6999, 5857, 6401, -9543, 3623, -7675, -330, -9465, 8893, 8208, 6222, 703, -1853, 6161, -964, 5519, 6853, 4252, 9950, -5165, 1463, -8197, -2827, -5003, 4311, 9564, -5850, -6110, 773, -630, -5063, 7544, 5885, 7735, -3457, 5358, 7126, 9449, -9104, -5479, 5176, -7463, 6525, -6238, 9375, -19, 8327, 8994, 8140, 7556, 8438, 7542, -2894, -2980, -5328, 8801, 5305, 7502, -4319, 1096, -2635, 6459, 5727, -1327, -1313, 9518, 1416, -5633, -5615, -5569, -9957, 2681, -5318, -96, 4325, -6444, 2390, 3907, -312, 9645, 4556, 4515, -2470, 7446, 2192, 8841, -7825, 2866, 720, -429, -7609, 7836, -6724, -1808, 9745, -4485, -9809, 593, -4954, 8634, 8450, 4603, -5710, -9372, 5110, 6595, 9009, 6439, 6405, -8438, 5497, 1944, 1383, -3974, -3996, -4218, -4977, 3495, 7203, -4092, -8776, -7497, -9332, 8245, 5959, 6175, 7435, 8405, -5912, -3064, -8430, -1460, -2917, 6766, -7168, 2694, 4532, -8949, -3379, -4276, 1678, -4593, -4823, -8518, -5993, -6425, -6980, 3936, -632, -3108, -2687, -3884, 6721, 8249, -3477, -2844, 729, -5367, 5215, -9109, 3999, -6754, -4997, -332, 3547, 577, 2413, 5957, -8049, 2702, -6157, -4349, 6107, 1987, -5957, 1093, -9474, -4301, 8216, -7475, 4237], 67], expected: 4325 },
  ],

  acmTests: [
    { input: '6\n3 2 1 5 6 4\n2\n', output: '5\n' },
    { input: '9\n3 2 3 1 2 4 5 5 6\n4\n', output: '4\n' },
    { input: '1\n1\n1\n', output: '1\n' },
    { input: '2\n7 3\n2\n', output: '3\n' },
    { input: '5\n-1 -2 -3 -4 -5\n2\n', output: '-2\n' },
    { input: '5\n3 3 3 3 3\n3\n', output: '3\n' },
    { input: '4\n5 3 8 1\n1\n', output: '8\n' },
    { input: '4\n5 3 8 1\n4\n', output: '1\n' },
    { input: '9\n9 8 7 6 5 4 3 2 1\n4\n', output: '6\n' },
    { input: '200\n-1419 7415 -8952 876 4770 1100 3246 -5740 -3193 464 1131 -5002 -8547 5675 -817 -2690 5892 -9885 1954 6999 5857 6401 -9543 3623 -7675 -330 -9465 8893 8208 6222 703 -1853 6161 -964 5519 6853 4252 9950 -5165 1463 -8197 -2827 -5003 4311 9564 -5850 -6110 773 -630 -5063 7544 5885 7735 -3457 5358 7126 9449 -9104 -5479 5176 -7463 6525 -6238 9375 -19 8327 8994 8140 7556 8438 7542 -2894 -2980 -5328 8801 5305 7502 -4319 1096 -2635 6459 5727 -1327 -1313 9518 1416 -5633 -5615 -5569 -9957 2681 -5318 -96 4325 -6444 2390 3907 -312 9645 4556 4515 -2470 7446 2192 8841 -7825 2866 720 -429 -7609 7836 -6724 -1808 9745 -4485 -9809 593 -4954 8634 8450 4603 -5710 -9372 5110 6595 9009 6439 6405 -8438 5497 1944 1383 -3974 -3996 -4218 -4977 3495 7203 -4092 -8776 -7497 -9332 8245 5959 6175 7435 8405 -5912 -3064 -8430 -1460 -2917 6766 -7168 2694 4532 -8949 -3379 -4276 1678 -4593 -4823 -8518 -5993 -6425 -6980 3936 -632 -3108 -2687 -3884 6721 8249 -3477 -2844 729 -5367 5215 -9109 3999 -6754 -4997 -332 3547 577 2413 5957 -8049 2702 -6157 -4349 6107 1987 -5957 1093 -9474 -4301 8216 -7475 4237\n67\n', output: '4325\n' },
  ],

  templates: {
    core: {
      javascript: `/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function(nums, k) {
    
};
`,
      python: `def findKthLargest(nums, k):
    # 返回数组中第 k 大的元素
    pass
`,
    },
    acm: {
      javascript: `// ACM 模式：input 是全部输入（字符串），用 console.log 输出答案
// 输入格式：第一行 n，第二行 n 个整数，第三行 k
const lines = input.trim().split('\\n');
const n = Number(lines[0]);
const nums = lines[1].trim().split(/\\s+/).map(Number);
const k = Number(lines[2]);

// 在这里写你的代码，用 console.log 输出第 k 大的元素

`,
      python: `# ACM 模式：用 input() 或 sys.stdin 读输入，用 print 输出答案
# 输入格式：第一行 n，第二行 n 个整数，第三行 k
import sys

lines = sys.stdin.read().split('\\n')
n = int(lines[0])
nums = list(map(int, lines[1].split()))
k = int(lines[2])

# 在这里写你的代码，用 print 输出第 k 大的元素
`,
    },
  },

  solutions: {
    core: {
      javascript: `var findKthLargest = function(nums, k) {
  // 第 k 大 = 升序排序后下标为 n - k 的元素
  const partition = function(lo, hi) {
    const mid = (lo + hi) >> 1;
    let t = nums[mid]; nums[mid] = nums[hi]; nums[hi] = t; // 中间元素作 pivot 换到末尾
    const pivot = nums[hi];
    let i = lo; // i 左侧都是小于 pivot 的元素
    for (let j = lo; j < hi; j++) {
      if (nums[j] < pivot) {
        t = nums[i]; nums[i] = nums[j]; nums[j] = t;
        i++;
      }
    }
    t = nums[i]; nums[i] = nums[hi]; nums[hi] = t;
    return i; // pivot 的最终位置
  };

  const target = nums.length - k;
  let lo = 0;
  let hi = nums.length - 1;
  while (true) {
    const p = partition(lo, hi);
    if (p === target) return nums[p];
    if (p < target) lo = p + 1;
    else hi = p - 1;
  }
};
`,
      python: `def findKthLargest(nums, k):
    def partition(lo, hi):
        mid = (lo + hi) // 2
        nums[mid], nums[hi] = nums[hi], nums[mid]  # 中间元素作 pivot 换到末尾
        pivot = nums[hi]
        i = lo  # i 左侧都是小于 pivot 的元素
        for j in range(lo, hi):
            if nums[j] < pivot:
                nums[i], nums[j] = nums[j], nums[i]
                i += 1
        nums[i], nums[hi] = nums[hi], nums[i]
        return i  # pivot 的最终位置

    # 第 k 大 = 升序排序后下标为 n - k 的元素
    target = len(nums) - k
    lo, hi = 0, len(nums) - 1
    while True:
        p = partition(lo, hi)
        if p == target:
            return nums[p]
        if p < target:
            lo = p + 1
        else:
            hi = p - 1
`,
    },
    acm: {
      javascript: `const lines = input.trim().split('\\n');
const n = Number(lines[0]);
const nums = lines[1].trim().split(/\\s+/).map(Number);
const k = Number(lines[2]);

const partition = function(lo, hi) {
  const mid = (lo + hi) >> 1;
  let t = nums[mid]; nums[mid] = nums[hi]; nums[hi] = t;
  const pivot = nums[hi];
  let i = lo;
  for (let j = lo; j < hi; j++) {
    if (nums[j] < pivot) {
      t = nums[i]; nums[i] = nums[j]; nums[j] = t;
      i++;
    }
  }
  t = nums[i]; nums[i] = nums[hi]; nums[hi] = t;
  return i;
};

const target = nums.length - k;
let lo = 0;
let hi = nums.length - 1;
while (true) {
  const p = partition(lo, hi);
  if (p === target) {
    console.log(nums[p]);
    break;
  }
  if (p < target) lo = p + 1;
  else hi = p - 1;
}
`,
      python: `import sys

lines = sys.stdin.read().split('\\n')
n = int(lines[0])
nums = list(map(int, lines[1].split()))
k = int(lines[2])

def partition(lo, hi):
    mid = (lo + hi) // 2
    nums[mid], nums[hi] = nums[hi], nums[mid]
    pivot = nums[hi]
    i = lo
    for j in range(lo, hi):
        if nums[j] < pivot:
            nums[i], nums[j] = nums[j], nums[i]
            i += 1
    nums[i], nums[hi] = nums[hi], nums[i]
    return i

target = len(nums) - k
lo, hi = 0, len(nums) - 1
while True:
    p = partition(lo, hi)
    if p == target:
        print(nums[p])
        break
    if p < target:
        lo = p + 1
    else:
        hi = p - 1
`,
    },
  },

  idea: `
最省事的做法是排序后取下标 \`n - k\`，时间复杂度 O(n log n)。

**快速选择**（Quickselect）借用快速排序的 partition 思想，把期望复杂度降到 O(n)：

- 一次 partition 会把 pivot 放到它升序排序后的最终位置 \`p\`，左侧元素都比它小，右侧都比它大
- 第 \`k\` 大元素就是升序下标 \`target = n - k\` 处的元素
- 若 \`p == target\`，\`nums[p]\` 就是答案；若 \`p < target\`，答案只可能在右半区间；否则只可能在左半区间——**每轮只进入一侧**，不需要完整排序

平均时间复杂度 O(n)（每层处理的元素数量大致减半），最坏 O(n²)；原地交换，额外空间 O(1)。另一种常见做法是维护大小为 \`k\` 的最小堆，时间复杂度 O(n log k)。
`,

  explanation: `
- \`target = nums.length - k\`：把「第 k 大」翻译成升序下标，是整套代码的关键转换
- \`partition\` 取中间下标的元素作 pivot 并换到末尾（对基本有序的输入也能保持均衡，避免退化成最坏情况），然后用 Lomuto 方案分区：\`i\` 指向「小于 pivot 区域」的下一个位置，遍历中把小于 pivot 的元素换到左侧，最后把 pivot 放回 \`i\`
- 返回值 \`p\` 是 pivot 的最终位置；根据 \`p\` 与 \`target\` 的大小关系收缩 \`lo\` / \`hi\`，平均意义下每轮区间减半
- 循环里只改边界、不返回，命中 \`target\` 时才结束；题目保证 \`1 <= k <= n\`，答案一定存在，\`while (true)\` 是安全的
- partition 直接在 \`nums\` 上原地交换，不需要额外数组
- ACM 版本逻辑一致，读入 \`n\`、数组与 \`k\` 后输出找到的元素
`,
};
