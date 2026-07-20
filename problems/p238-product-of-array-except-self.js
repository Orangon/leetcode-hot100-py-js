// 238. 除自身以外数组的乘积
export default {
  id: 238,
  title: '除自身以外数组的乘积',
  slug: 'product-of-array-except-self',
  difficulty: 'medium',
  tags: ['数组', '前缀和'],
  hints: [
    '位置 i 的答案可拆成 nums[i] 左侧所有元素的乘积与右侧所有元素的乘积之积，因此无需除法，数组中有 0 时也仍然成立。',
    '用两次线性扫描和两个滚动乘积：第一次记录每个位置的左侧乘积，第二次从右向左补上右侧乘积，时间 O(n)、除答案外额外空间 O(1)。',
    '先令 left = 1，从左到右执行 ans[i] = left、left *= nums[i]；再令 right = 1，从右到左执行 ans[i] *= right、right *= nums[i]。',
    '赋值或乘入答案必须发生在把 nums[i] 累积进滚动变量之前，才能排除自身；ACM 模式读取 n 和第二行数组，最终用空格输出 n 个结果。',
  ],

  description: `
给你一个整数数组 \`nums\`，返回数组 \`answer\`，其中 \`answer[i]\` 等于 \`nums\` 中除 \`nums[i]\` 之外其余各元素的乘积。

题目数据保证数组之中任意元素的全部前缀元素和后缀的乘积都在 32 位整数范围内。

请不要使用除法，且在 O(n) 时间复杂度内完成此题。

### 示例

- 输入：\`nums = [1,2,3,4]\`，输出：\`[24,12,8,6]\`
- 输入：\`nums = [-1,1,0,-3,3]\`，输出：\`[0,0,9,0,0]\`

### 提示

- \`2 <= nums.length <= 10^5\`
- \`-30 <= nums[i] <= 30\`
- 保证除自身以外数组的乘积在 32 位整数范围内

### ACM 模式输入输出格式

- 输入：第一行为整数 \`n\`（数组长度）；第二行为 \`n\` 个整数（空格分隔）
- 输出：\`n\` 个整数（空格分隔），即除自身以外数组的乘积

ACM 输入示例：
\`\`\`
4
1 2 3 4
\`\`\`
输出：\`24 12 8 6\`
`,

  functionName: 'productExceptSelf',
  compare: 'exact',

  tests: [
    { args: [[1, 2, 3, 4]], expected: [24, 12, 8, 6] },
    { args: [[-1, 1, 0, -3, 3]], expected: [0, 0, 9, 0, 0] },
    { args: [[2, 3]], expected: [3, 2] },
    { args: [[0, 0]], expected: [0, 0] },
    { args: [[-2, -3, -4]], expected: [12, 8, 6] },
    { args: [[1, 2, 0, 4]], expected: [0, 0, 8, 0] },
    { args: [[1, 1, 1, 1]], expected: [1, 1, 1, 1] },
    { args: [[30, -30, 2]], expected: [-60, 60, -900] },
    { args: [[3,2,2,-2,-1,1,-3,3,1,1,2,2,1,1,3,1,-1,2,1,1]], expected: [1728,2592,2592,-2592,-5184,5184,-1728,1728,5184,5184,2592,2592,5184,5184,1728,5184,-5184,2592,5184,5184] },
    { args: [[1,-1,1,-1,1,1,-1,2,1,-1,-1,1,1,1,1,-1,-1,1,1,-1,-1,1,-1,2,1,-1,-1,-1,-1,-1,0,1,-1,-1,1,-1,-1,-1,1,1,1,-1,1,1,-1,-1,1,1,-1,1,1,-2,-1,-1,-1,1,-1,1,-1,-1,-1,1,1,-1,1,1,1,1,-2,1,1,1,1,1,1,-1,-1,1,1,-1,1,1,1,-1,-2,-1,-1,1,1,1,-1,1,-1,1,-1,-2,-1,-1,-1,1]], expected: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,64,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0] },
  ],

  acmTests: [
    { input: '4\n1 2 3 4\n', output: '24 12 8 6\n' },
    { input: '5\n-1 1 0 -3 3\n', output: '0 0 9 0 0\n' },
    { input: '2\n2 3\n', output: '3 2\n' },
    { input: '2\n0 0\n', output: '0 0\n' },
    { input: '3\n-2 -3 -4\n', output: '12 8 6\n' },
    { input: '4\n1 2 0 4\n', output: '0 0 8 0\n' },
    { input: '4\n1 1 1 1\n', output: '1 1 1 1\n' },
    { input: '3\n30 -30 2\n', output: '-60 60 -900\n' },
    { input: '20\n3 2 2 -2 -1 1 -3 3 1 1 2 2 1 1 3 1 -1 2 1 1\n', output: '1728 2592 2592 -2592 -5184 5184 -1728 1728 5184 5184 2592 2592 5184 5184 1728 5184 -5184 2592 5184 5184\n' },
    { input: '100\n1 -1 1 -1 1 1 -1 2 1 -1 -1 1 1 1 1 -1 -1 1 1 -1 -1 1 -1 2 1 -1 -1 -1 -1 -1 0 1 -1 -1 1 -1 -1 -1 1 1 1 -1 1 1 -1 -1 1 1 -1 1 1 -2 -1 -1 -1 1 -1 1 -1 -1 -1 1 1 -1 1 1 1 1 -2 1 1 1 1 1 1 -1 -1 1 1 -1 1 1 1 -1 -2 -1 -1 1 1 1 -1 1 -1 1 -1 -2 -1 -1 -1 1\n', output: '0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 64 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0\n' },
  ],

  templates: {
    core: {
      javascript: `/**
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function(nums) {
    
};
`,
      python: `def productExceptSelf(nums):
    # 返回除自身以外数组的乘积（不使用除法）
    pass
`,
    },
    acm: {
      javascript: `// ACM 模式：input 是全部输入（字符串），用 console.log 输出答案
// 输入格式：第一行 n，第二行 n 个整数
const lines = input.trim().split('\\n');
const n = Number(lines[0]);
const nums = lines[1].trim().split(/\\s+/).map(Number);

// 在这里写你的代码，用 console.log 输出结果数组（空格分隔）

`,
      python: `# ACM 模式：用 input() 或 sys.stdin 读输入，用 print 输出答案
# 输入格式：第一行 n，第二行 n 个整数
import sys

lines = sys.stdin.read().split('\\n')
n = int(lines[0])
nums = list(map(int, lines[1].split()))

# 在这里写你的代码，用 print 输出结果数组（空格分隔）
`,
    },
  },

  solutions: {
    core: {
      javascript: `var productExceptSelf = function(nums) {
  const n = nums.length;
  const ans = new Array(n);
  // 第一遍：ans[i] = i 左侧所有元素的乘积
  let left = 1;
  for (let i = 0; i < n; i++) {
    ans[i] = left;
    left *= nums[i];
  }
  // 第二遍：从右往左，给 ans[i] 乘上 i 右侧所有元素的乘积
  let right = 1;
  for (let i = n - 1; i >= 0; i--) {
    ans[i] *= right;
    right *= nums[i];
  }
  return ans;
};
`,
      python: `def productExceptSelf(nums):
    n = len(nums)
    ans = [1] * n
    # 第一遍：ans[i] = i 左侧所有元素的乘积
    left = 1
    for i in range(n):
        ans[i] = left
        left *= nums[i]
    # 第二遍：从右往左，给 ans[i] 乘上 i 右侧所有元素的乘积
    right = 1
    for i in range(n - 1, -1, -1):
        ans[i] *= right
        right *= nums[i]
    return ans
`,
    },
    acm: {
      javascript: `const lines = input.trim().split('\\n');
const n = Number(lines[0]);
const nums = lines[1].trim().split(/\\s+/).map(Number);

// 前后缀乘积：先存左侧乘积，再从右往左乘上右侧乘积
const ans = new Array(n);
let left = 1;
for (let i = 0; i < n; i++) {
  ans[i] = left;
  left *= nums[i];
}
let right = 1;
for (let i = n - 1; i >= 0; i--) {
  ans[i] *= right;
  right *= nums[i];
}

console.log(ans.join(' '));
`,
      python: `import sys

lines = sys.stdin.read().split('\\n')
n = int(lines[0])
nums = list(map(int, lines[1].split()))

# 前后缀乘积：先存左侧乘积，再从右往左乘上右侧乘积
ans = [1] * n
left = 1
for i in range(n):
    ans[i] = left
    left *= nums[i]
right = 1
for i in range(n - 1, -1, -1):
    ans[i] *= right
    right *= nums[i]

print(' '.join(map(str, ans)))
`,
    },
  },

  idea: `
如果允许用除法，可以先求出所有元素的总乘积再逐个除掉 \`nums[i]\`，但题目明确禁止除法（而且数组里有 0 时除法本身也会失效）。

**前后缀乘积**：把答案拆成两部分——\`answer[i] =\`（i 左边所有元素的乘积）\`×\`（i 右边所有元素的乘积）。

- 第一遍从左到右：用一个滚动变量 \`left\` 记录「i 左侧所有元素的乘积」，直接写进 \`answer[i]\`
- 第二遍从右到左：用滚动变量 \`right\` 记录「i 右侧所有元素的乘积」，边遍历边乘进 \`answer[i]\`

为什么对：每个位置的答案恰好是左、右两段乘积相乘，既不包含 \`nums[i]\` 自身，又覆盖了其余所有元素。

时间复杂度 O(n)，除输出数组外只用 O(1) 额外空间，全程没有除法。
`,

  explanation: `
- 第一遍循环里 \`left\` 表示 \`nums[0..i-1]\` 的乘积：先 \`ans[i] = left\` 再 \`left *= nums[i]\`，顺序不能反，否则 \`ans[i]\` 就把自身算进去了
- 第二遍从右往左：\`right\` 表示 \`nums[i+1..n-1]\` 的乘积，同样先 \`ans[i] *= right\` 再 \`right *= nums[i]\`
- 两遍各扫一次数组，总时间 O(n)；输出数组不计入额外空间，所以额外空间是 O(1)
- 含 0 的用例天然正确：\`answer[i]\` 要么是 0（除自身外还含有另一个 0），要么是「去掉那个 0 之后其余元素的乘积」，不需要任何特判
- 负数的处理也不特殊：乘法照常累积，符号自然正确
- ACM 版本按格式读入数组后走同样的两遍扫描，最后把答案数组用空格连接打印
`,
};
