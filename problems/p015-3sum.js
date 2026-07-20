// 15. 三数之和
// 返回二维数组，compare 用 multiset（顶层三元组顺序无关、元素深比较）
// 约定：每个三元组内部升序（排序 + 双指针的标准实现天然产生升序三元组）
export default {
  id: 15,
  title: '三数之和',
  slug: '3sum',
  difficulty: 'medium',
  tags: ['数组', '双指针', '排序'],
  hints: [
    '排序后固定第一个数，剩余目标就变成有序后缀中的两数之和，同时相同值相邻便于彻底去重。',
    '枚举 i，并在 i+1 到末尾使用相向双指针；三数和偏小移动 left，偏大移动 right。',
    '命中 0 时记录三元组，跳过 left 与 right 两侧的连续重复值后同时内缩；i 也要跳过重复值，nums[i]>0 可提前结束。',
    '每个三元组须组内升序且不能重复；ACM 要逐行按字典序输出，无解时不能额外打印空行或提示文字。',
  ],

  description: `
给你一个整数数组 \`nums\`，判断是否存在三元组 \`[nums[i], nums[j], nums[k]]\` 满足 \`i != j\`、\`i != k\` 且 \`j != k\`，同时还满足 \`nums[i] + nums[j] + nums[k] == 0\`。请你返回所有和为 \`0\` 且不重复的三元组。

注意：答案中不可以包含重复的三元组。

### 示例

- 输入：\`nums = [-1,0,1,2,-1,-4]\`，输出：\`[[-1,-1,2],[-1,0,1]]\`
- 输入：\`nums = [0,1,1]\`，输出：\`[]\`
- 输入：\`nums = [0,0,0]\`，输出：\`[[0,0,0]]\`

### 提示

- \`3 <= nums.length <= 3000\`
- \`-10^5 <= nums[i] <= 10^5\`

### ACM 模式输入输出格式

- 输入：第一行为整数 \`n\`（数组长度）；第二行为 \`n\` 个整数（空格分隔）
- 输出：每个三元组占一行，组内三个数升序、空格分隔；所有行按三元组字典序升序排列（先比第一个数，相同再比第二个、第三个）；无解时不输出任何内容

ACM 输入示例：
\`\`\`
6
-1 0 1 2 -1 -4
\`\`\`
输出：
\`\`\`
-1 -1 2
-1 0 1
\`\`\`
`,

  functionName: 'threeSum',
  compare: 'multiset',

  tests: [
    { args: [[-1, 0, 1, 2, -1, -4]], expected: [[-1, -1, 2], [-1, 0, 1]] },
    { args: [[0, 1, 1]], expected: [] },
    { args: [[0, 0, 0]], expected: [[0, 0, 0]] },
    { args: [[3, 0, -2, -1, 1, 2]], expected: [[-2, -1, 3], [-2, 0, 2], [-1, 0, 1]] },
    { args: [[-2, 0, 0, 2, 2]], expected: [[-2, 0, 2]] },
    { args: [[1, 1, 1, 1]], expected: [] },
    { args: [[0, 0, 0, 0, 0]], expected: [[0, 0, 0]] },
    { args: [[-1, -1, -1, 2, 2, 2]], expected: [[-1, -1, 2]] },
    { args: [[-1, -2, -3]], expected: [] },
    { args: [[7, 3, -3, -4, 6, 8, 4, -1, -6, -5, -2, 3, 0, 5, -8, -7, -8, 8, -2, -6, -1, -7, 2, -5, -4, -8, 4, 3, 2, 3, -6, 6, 8, -5, -2, 8, -1, -3, -1, -6, 6, 6, 6, 5, 5, -4, 6, -8, 0, 4, -5, 3, -1, -7, -3, 7, -6, 5, -5, -6, -6, 6, 7, 2, -2, -8, -6, -5, 5, -1, 7, -5, 4, 6, -2, 1, 3, -4, 4, -8, 3, 1, -2, 5, -4, -4, 2, 1, -3, 4, 8, 5, -3, 6, -6, 8, 6, 2, -4, 3]], expected: [[-8, 0, 8], [-8, 1, 7], [-8, 2, 6], [-8, 3, 5], [-8, 4, 4], [-7, -1, 8], [-7, 0, 7], [-7, 1, 6], [-7, 2, 5], [-7, 3, 4], [-6, -2, 8], [-6, -1, 7], [-6, 0, 6], [-6, 1, 5], [-6, 2, 4], [-6, 3, 3], [-5, -3, 8], [-5, -2, 7], [-5, -1, 6], [-5, 0, 5], [-5, 1, 4], [-5, 2, 3], [-4, -4, 8], [-4, -3, 7], [-4, -2, 6], [-4, -1, 5], [-4, 0, 4], [-4, 1, 3], [-4, 2, 2], [-3, -3, 6], [-3, -2, 5], [-3, -1, 4], [-3, 0, 3], [-3, 1, 2], [-2, -2, 4], [-2, -1, 3], [-2, 0, 2], [-2, 1, 1], [-1, -1, 2], [-1, 0, 1]] },
  ],

  acmTests: [
    { input: '6\n-1 0 1 2 -1 -4\n', output: '-1 -1 2\n-1 0 1\n' },
    { input: '3\n0 1 1\n', output: '' },
    { input: '3\n0 0 0\n', output: '0 0 0\n' },
    { input: '6\n3 0 -2 -1 1 2\n', output: '-2 -1 3\n-2 0 2\n-1 0 1\n' },
    { input: '5\n-2 0 0 2 2\n', output: '-2 0 2\n' },
    { input: '4\n1 1 1 1\n', output: '' },
    { input: '5\n0 0 0 0 0\n', output: '0 0 0\n' },
    { input: '6\n-1 -1 -1 2 2 2\n', output: '-1 -1 2\n' },
    { input: '3\n-1 -2 -3\n', output: '' },
    { input: '100\n7 3 -3 -4 6 8 4 -1 -6 -5 -2 3 0 5 -8 -7 -8 8 -2 -6 -1 -7 2 -5 -4 -8 4 3 2 3 -6 6 8 -5 -2 8 -1 -3 -1 -6 6 6 6 5 5 -4 6 -8 0 4 -5 3 -1 -7 -3 7 -6 5 -5 -6 -6 6 7 2 -2 -8 -6 -5 5 -1 7 -5 4 6 -2 1 3 -4 4 -8 3 1 -2 5 -4 -4 2 1 -3 4 8 5 -3 6 -6 8 6 2 -4 3\n', output: '-8 0 8\n-8 1 7\n-8 2 6\n-8 3 5\n-8 4 4\n-7 -1 8\n-7 0 7\n-7 1 6\n-7 2 5\n-7 3 4\n-6 -2 8\n-6 -1 7\n-6 0 6\n-6 1 5\n-6 2 4\n-6 3 3\n-5 -3 8\n-5 -2 7\n-5 -1 6\n-5 0 5\n-5 1 4\n-5 2 3\n-4 -4 8\n-4 -3 7\n-4 -2 6\n-4 -1 5\n-4 0 4\n-4 1 3\n-4 2 2\n-3 -3 6\n-3 -2 5\n-3 -1 4\n-3 0 3\n-3 1 2\n-2 -2 4\n-2 -1 3\n-2 0 2\n-2 1 1\n-1 -1 2\n-1 0 1\n' },
  ],

  templates: {
    core: {
      javascript: `/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
    
};
`,
      python: `def threeSum(nums):
    # 返回所有和为 0 的不重复三元组（每个三元组内部升序）
    pass
`,
    },
    acm: {
      javascript: `// ACM 模式：input 是全部输入（字符串），用 console.log 输出答案
// 输入格式：第一行 n，第二行 n 个整数
// 输出格式：每个三元组一行（组内升序、空格分隔），各行按字典序升序；无解则不输出
const lines = input.split('\\n');
const n = Number(lines[0]);
const nums = n > 0 ? lines[1].trim().split(/\\s+/).map(Number) : [];

// 在这里写你的代码，用 console.log(a, b, c) 逐行输出每个三元组

`,
      python: `# ACM 模式：用 input() 或 sys.stdin 读输入，用 print 输出答案
# 输入格式：第一行 n，第二行 n 个整数
# 输出格式：每个三元组一行（组内升序、空格分隔），各行按字典序升序；无解则不输出
import sys

lines = sys.stdin.read().split('\\n')
n = int(lines[0])
nums = list(map(int, lines[1].split())) if n > 0 else []

# 在这里写你的代码，用 print(a, b, c) 逐行输出每个三元组
`,
    },
  },

  solutions: {
    core: {
      javascript: `var threeSum = function(nums) {
  nums.sort((a, b) => a - b);
  const ans = [];
  const n = nums.length;
  for (let i = 0; i < n - 2; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue; // 跳过重复的第一个数
    if (nums[i] > 0) break; // 排序后最小数已大于 0，后面不可能凑出 0
    let left = i + 1;
    let right = n - 1;
    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];
      if (sum === 0) {
        ans.push([nums[i], nums[left], nums[right]]);
        while (left < right && nums[left] === nums[left + 1]) left++; // 跳过重复的 left
        while (left < right && nums[right] === nums[right - 1]) right--; // 跳过重复的 right
        left++;
        right--;
      } else if (sum < 0) {
        left++;
      } else {
        right--;
      }
    }
  }
  return ans;
};
`,
      python: `def threeSum(nums):
    nums.sort()
    ans = []
    n = len(nums)
    for i in range(n - 2):
        if i > 0 and nums[i] == nums[i - 1]:
            continue  # 跳过重复的第一个数
        if nums[i] > 0:
            break  # 排序后最小数已大于 0，后面不可能凑出 0
        left, right = i + 1, n - 1
        while left < right:
            s = nums[i] + nums[left] + nums[right]
            if s == 0:
                ans.append([nums[i], nums[left], nums[right]])
                while left < right and nums[left] == nums[left + 1]:
                    left += 1  # 跳过重复的 left
                while left < right and nums[right] == nums[right - 1]:
                    right -= 1  # 跳过重复的 right
                left += 1
                right -= 1
            elif s < 0:
                left += 1
            else:
                right -= 1
    return ans
`,
    },
    acm: {
      javascript: `const lines = input.split('\\n');
const n = Number(lines[0]);
const nums = n > 0 ? lines[1].trim().split(/\\s+/).map(Number) : [];

nums.sort((a, b) => a - b);
const ans = [];
for (let i = 0; i < nums.length - 2; i++) {
  if (i > 0 && nums[i] === nums[i - 1]) continue;
  if (nums[i] > 0) break;
  let left = i + 1;
  let right = nums.length - 1;
  while (left < right) {
    const sum = nums[i] + nums[left] + nums[right];
    if (sum === 0) {
      ans.push([nums[i], nums[left], nums[right]]);
      while (left < right && nums[left] === nums[left + 1]) left++;
      while (left < right && nums[right] === nums[right - 1]) right--;
      left++;
      right--;
    } else if (sum < 0) {
      left++;
    } else {
      right--;
    }
  }
}

// 按字典序升序输出（排序 + 双指针的结果天然有序，这里再显式排一次保险）；无解时循环不执行、无输出
ans.sort((a, b) => a[0] - b[0] || a[1] - b[1] || a[2] - b[2]);
for (const t of ans) {
  console.log(t[0], t[1], t[2]);
}
`,
      python: `import sys

lines = sys.stdin.read().split('\\n')
n = int(lines[0])
nums = list(map(int, lines[1].split())) if n > 0 else []

nums.sort()
ans = []
m = len(nums)
for i in range(m - 2):
    if i > 0 and nums[i] == nums[i - 1]:
        continue
    if nums[i] > 0:
        break
    left, right = i + 1, m - 1
    while left < right:
        s = nums[i] + nums[left] + nums[right]
        if s == 0:
            ans.append([nums[i], nums[left], nums[right]])
            while left < right and nums[left] == nums[left + 1]:
                left += 1
            while left < right and nums[right] == nums[right - 1]:
                right -= 1
            left += 1
            right -= 1
        elif s < 0:
            left += 1
        else:
            right -= 1

# 按字典序升序输出（排序 + 双指针的结果天然有序，这里再显式排一次保险）；无解时循环不执行、无输出
ans.sort()
for t in ans:
    print(t[0], t[1], t[2])
`,
    },
  },

  idea: `
暴力三重循环枚举所有三元组是 O(n³)，会超时。经典做法是**排序 + 双指针**：

- 先排序，把「三数之和」转化为「固定一个数 + 在右侧区间找两数之和」
- 枚举第一个数 \`nums[i]\`，在它右侧用左右双指针 \`left\`、\`right\` 对撞：
  - 三数之和等于 0：记录答案，两个指针同时内缩并跳过重复值
  - 和小于 0：\`left\` 右移让和变大；和大于 0：\`right\` 左移让和变小
- 去重关键：枚举 \`i\` 时跳过与前一个相同的数；命中答案后跳过所有与当前相同的 \`left\` / \`right\`

排序后指针移动是单调的，每个 \`i\` 只对应一次 O(n) 扫描，总时间复杂度 O(n²)，空间复杂度 O(log n) ~ O(n)（取决于排序实现，不计输出）。
`,

  explanation: `
- 先排序：相同的数聚在一起，且左小右大，双指针的移动才有单调性
- 外层枚举 \`i\`：\`nums[i] === nums[i - 1]\` 时跳过，避免重复三元组；\`nums[i] > 0\` 时直接 break（排序后三数都非负，和不可能为 0）
- 内层 \`left = i + 1\`、\`right = n - 1\` 对撞：
  - \`sum == 0\` 时记入答案，然后两个 while 循环跳过所有与当前相同的值再各走一步，这是去重的核心
  - \`sum < 0\` 移动 \`left\`，\`sum > 0\` 移动 \`right\`
- 排序 + 双指针按 \`nums[i]\` 从小到大、\`nums[left]\` 从小到大的顺序产生三元组，所以结果天然组内升序、整体字典序升序；ACM 版本输出前仍显式 sort 一次保险，无解时循环不执行、什么都不打印

ACM 版本算法完全一致，只是改为从标准输入读取 \`n\` 和数组，并逐行打印三元组。
`,
};
