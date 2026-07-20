// 42. 接雨水
// 普通类型题（整数数组 -> 整数），无需 argSpec / resultKind
export default {
  id: 42,
  title: '接雨水',
  slug: 'trapping-rain-water',
  difficulty: 'hard',
  tags: ['栈', '数组', '双指针', '动态规划'],
  hints: [
    '某位置的水位由左右最高柱子的较小者决定，贡献为该较小值减去当前位置高度。',
    '用左右双指针同步维护 leftMax 与 rightMax，每次结算最大值较小的一侧，可把额外空间降为 O(1)。',
    '更新两侧最大高度后，若 leftMax < rightMax 就累加 leftMax - height[left] 并右移 left，否则对称处理 right。',
    '单柱、单调数组或等高柱都应得到 0；ACM 读取第二行全部柱高并输出累计雨水整数，注意总量应使用安全数值类型。',
  ],

  description: `
给定 \`n\` 个非负整数表示每个宽度为 \`1\` 的柱子的高度图，计算按此排列的柱子下雨之后能接多少雨水。

### 示例

- 输入：\`height = [0,1,0,2,1,0,1,3,2,1,2,1]\`，输出：\`6\`
- 输入：\`height = [4,2,0,3,2,5]\`，输出：\`9\`

### 提示

- \`n == height.length\`
- \`1 <= n <= 2 * 10^4\`
- \`0 <= height[i] <= 10^5\`

### ACM 模式输入输出格式

- 输入：第一行为整数 \`n\`（柱子数量）；第二行为 \`n\` 个非负整数（空格分隔）
- 输出：一个整数，即能接的雨水总量

ACM 输入示例：
\`\`\`
12
0 1 0 2 1 0 1 3 2 1 2 1
\`\`\`
输出：\`6\`
`,

  functionName: 'trap',
  compare: 'exact',

  tests: [
    { args: [[0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]], expected: 6 },
    { args: [[4, 2, 0, 3, 2, 5]], expected: 9 },
    { args: [[1, 2, 3, 4, 5]], expected: 0 },
    { args: [[5, 4, 3, 2, 1]], expected: 0 },
    { args: [[5]], expected: 0 },
    { args: [[3, 0, 3]], expected: 3 },
    { args: [[2, 2, 2, 2]], expected: 0 },
    { args: [[100000, 0, 100000]], expected: 100000 },
    { args: [[26, 47, 12, 20, 32, 11, 16, 50, 2, 24, 37, 27, 38, 9, 48, 49, 17, 37, 11, 16, 44, 46, 43, 5, 42, 39, 16, 27, 4, 44, 14, 16, 23, 23, 4, 0, 29, 2, 32, 22, 0, 18, 36, 13, 42, 37, 2, 48, 50, 27, 39, 36, 20, 50, 0, 6, 29, 27, 32, 23, 43, 28, 38, 48, 4, 18, 14, 30, 1, 23, 21, 14, 34, 29, 16, 4, 34, 0, 2, 2, 13, 18, 26, 12, 19, 30, 17, 22, 50, 41, 17, 38, 39, 36, 21, 11, 35, 4, 8, 13, 2, 0, 3, 9, 50, 38, 21, 22, 44, 16, 7, 15, 25, 10, 21, 41, 25, 45, 25, 32, 17, 2, 8, 47, 15, 27, 49, 22, 5, 32, 42, 12, 25, 0, 48, 6, 2, 31, 1, 22, 15, 12, 0, 35, 28, 28, 6, 26, 15, 42, 1, 34, 49, 34, 0, 8, 13, 24, 26, 34, 39, 25, 0, 47, 4, 27, 18, 28, 49, 42, 22, 41, 9, 30, 37, 1, 46, 21, 50, 27, 8, 7, 24, 47, 16, 6, 48, 12, 41, 13, 33, 50, 34, 37, 9, 43, 18, 24, 29, 14, 49, 6, 4, 48, 4, 27, 45, 1, 31, 18, 5, 12, 14, 16, 17, 6, 44, 46, 15, 32, 20, 45, 21, 14, 21, 42, 27, 34, 33, 21, 39, 25, 16, 10, 32, 41, 45, 19, 24, 14, 14, 19, 13, 5, 33, 30, 1, 23, 11, 24, 30, 19, 40, 30, 15, 19, 8, 45, 47, 10, 9, 39, 8, 40, 21, 43, 48, 6, 39, 40, 50, 16, 6, 3, 45, 38, 8, 0, 49, 22, 1, 17, 27, 13, 8, 46, 12, 48, 33, 22, 48, 19, 47, 33, 42, 7, 36, 41, 4, 6]], expected: 7548 },
  ],

  acmTests: [
    { input: '12\n0 1 0 2 1 0 1 3 2 1 2 1\n', output: '6\n' },
    { input: '6\n4 2 0 3 2 5\n', output: '9\n' },
    { input: '5\n1 2 3 4 5\n', output: '0\n' },
    { input: '5\n5 4 3 2 1\n', output: '0\n' },
    { input: '1\n5\n', output: '0\n' },
    { input: '3\n3 0 3\n', output: '3\n' },
    { input: '4\n2 2 2 2\n', output: '0\n' },
    { input: '3\n100000 0 100000\n', output: '100000\n' },
    { input: '300\n26 47 12 20 32 11 16 50 2 24 37 27 38 9 48 49 17 37 11 16 44 46 43 5 42 39 16 27 4 44 14 16 23 23 4 0 29 2 32 22 0 18 36 13 42 37 2 48 50 27 39 36 20 50 0 6 29 27 32 23 43 28 38 48 4 18 14 30 1 23 21 14 34 29 16 4 34 0 2 2 13 18 26 12 19 30 17 22 50 41 17 38 39 36 21 11 35 4 8 13 2 0 3 9 50 38 21 22 44 16 7 15 25 10 21 41 25 45 25 32 17 2 8 47 15 27 49 22 5 32 42 12 25 0 48 6 2 31 1 22 15 12 0 35 28 28 6 26 15 42 1 34 49 34 0 8 13 24 26 34 39 25 0 47 4 27 18 28 49 42 22 41 9 30 37 1 46 21 50 27 8 7 24 47 16 6 48 12 41 13 33 50 34 37 9 43 18 24 29 14 49 6 4 48 4 27 45 1 31 18 5 12 14 16 17 6 44 46 15 32 20 45 21 14 21 42 27 34 33 21 39 25 16 10 32 41 45 19 24 14 14 19 13 5 33 30 1 23 11 24 30 19 40 30 15 19 8 45 47 10 9 39 8 40 21 43 48 6 39 40 50 16 6 3 45 38 8 0 49 22 1 17 27 13 8 46 12 48 33 22 48 19 47 33 42 7 36 41 4 6\n', output: '7548\n' },
  ],

  templates: {
    core: {
      javascript: `/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function(height) {
    
};
`,
      python: `def trap(height):
    # height 为非负整数数组，返回能接的雨水总量
    pass
`,
    },
    acm: {
      javascript: `// ACM 模式：input 是全部输入（字符串），用 console.log 输出答案
// 输入格式：第一行 n（柱子数量），第二行 n 个非负整数
const lines = input.trim().split('\\n');
const n = Number(lines[0]);
const height = lines[1].trim().split(/\\s+/).map(Number);

// 在这里写你的代码，用 console.log 输出接到的雨水总量

`,
      python: `# ACM 模式：用 input() 或 sys.stdin 读输入，用 print 输出答案
# 输入格式：第一行 n（柱子数量），第二行 n 个非负整数
import sys

lines = sys.stdin.read().split('\\n')
n = int(lines[0])
height = list(map(int, lines[1].split()))

# 在这里写你的代码，用 print 输出接到的雨水总量
`,
    },
  },

  solutions: {
    core: {
      javascript: `var trap = function(height) {
  let left = 0, right = height.length - 1;
  let leftMax = 0, rightMax = 0;
  let water = 0;
  while (left < right) {
    leftMax = Math.max(leftMax, height[left]);
    rightMax = Math.max(rightMax, height[right]);
    if (leftMax < rightMax) {
      water += leftMax - height[left]; // 左侧较矮，接水量由 leftMax 决定
      left++;
    } else {
      water += rightMax - height[right]; // 对称地处理右端
      right--;
    }
  }
  return water;
};
`,
      python: `def trap(height):
    left, right = 0, len(height) - 1
    left_max = right_max = 0
    water = 0
    while left < right:
        left_max = max(left_max, height[left])
        right_max = max(right_max, height[right])
        if left_max < right_max:
            water += left_max - height[left]  # 左侧较矮，接水量由 left_max 决定
            left += 1
        else:
            water += right_max - height[right]  # 对称地处理右端
            right -= 1
    return water
`,
    },
    acm: {
      javascript: `const lines = input.trim().split('\\n');
const height = lines[1].trim().split(/\\s+/).map(Number);

let left = 0, right = height.length - 1;
let leftMax = 0, rightMax = 0;
let water = 0;
while (left < right) {
  leftMax = Math.max(leftMax, height[left]);
  rightMax = Math.max(rightMax, height[right]);
  if (leftMax < rightMax) {
    water += leftMax - height[left];
    left++;
  } else {
    water += rightMax - height[right];
    right--;
  }
}
console.log(water);
`,
      python: `import sys

lines = sys.stdin.read().split('\\n')
height = list(map(int, lines[1].split()))

left, right = 0, len(height) - 1
left_max = right_max = 0
water = 0
while left < right:
    left_max = max(left_max, height[left])
    right_max = max(right_max, height[right])
    if left_max < right_max:
        water += left_max - height[left]
        left += 1
    else:
        water += right_max - height[right]
        right -= 1

print(water)
`,
    },
  },

  idea: `
位置 \`i\` 能接的雨水量取决于它左右两侧最高柱子中的较矮者：\`water[i] = min(左侧最高, 右侧最高) - height[i]\`。

**动态规划**：先用两个数组分别预处理每个位置左边和右边的最大高度，再遍历一次累加每个位置的接水量。时间 O(n)，空间 O(n)。

**双指针（推荐）**：用 \`left\`、\`right\` 两个指针从两端向中间收拢，同时维护 \`leftMax\` 和 \`rightMax\`。当 \`leftMax < rightMax\` 时，位置 \`left\` 的接水量由 \`leftMax\` 决定（右侧必有更高的墙挡水），累加后 \`left\` 右移；否则对称地处理右端。时间 O(n)，空间 O(1)。

**单调栈**：维护一个高度单调递减的栈，遇到更高的柱子时弹出栈顶并计算栈顶与当前柱子之间形成的凹槽水量。时间 O(n)，空间 O(n)。

参考答案采用双指针法。
`,

  explanation: `
- \`left\`、\`right\` 指向当前待处理的两端，\`leftMax\`、\`rightMax\` 分别记录左、右两侧已经见过的最高柱子
- 每轮先用当前柱子更新两个最大值，保证 \`leftMax >= height[left]\`、\`rightMax >= height[right]\`，差值不会为负
- 若 \`leftMax < rightMax\`：位置 \`left\` 上方能存的水只取决于 \`leftMax\`（因为右侧存在不低于它的墙），累加 \`leftMax - height[left]\`，然后 \`left++\`
- 否则对称地处理右端：累加 \`rightMax - height[right]\`，然后 \`right--\`
- 循环结束时每个柱子恰好被处理一次，\`water\` 即总接水量

ACM 版本只是多了从标准输入读数组、把结果打印出来的步骤，核心双指针逻辑完全一致。
`,
};
