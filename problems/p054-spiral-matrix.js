// 54. 螺旋矩阵
export default {
  id: 54,
  title: '螺旋矩阵',
  slug: 'spiral-matrix',
  difficulty: 'medium',
  tags: ['数组', '矩阵', '模拟'],
  hints: [
    '把尚未访问的矩形看成四条边，每绕完外层一圈就同时向内收缩上、下、左、右边界。',
    '用 top、bottom、left、right 四个变量按上边、右边、下边、左边的顺序模拟螺旋遍历。',
    '先遍历 top 行并 top++，再遍历 right 列并 right--；仅在边界仍有效时反向遍历 bottom 行和 left 列并收缩。',
    '单行或单列矩阵最易重复访问，后两条边前必须重新判断边界；ACM 将结果共 m*n 个整数空格分隔输出。',
  ],

  description: `
给你一个 \`m\` 行 \`n\` 列的矩阵 \`matrix\`，请按照**顺时针螺旋顺序**，返回矩阵中的所有元素。

### 示例

- 输入：\`matrix = [[1,2,3],[4,5,6],[7,8,9]]\`，输出：\`[1,2,3,6,9,8,7,4,5]\`
- 输入：\`matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]\`，输出：\`[1,2,3,4,8,12,11,10,9,5,6,7]\`

### 提示

- \`m == matrix.length\`，\`n == matrix[i].length\`
- \`1 <= m, n <= 10\`
- \`-100 <= matrix[i][j] <= 100\`

### ACM 模式输入输出格式

- 输入：第一行为两个整数 \`m n\`（矩阵的行数与列数）；随后 \`m\` 行，每行 \`n\` 个整数（空格分隔）
- 输出：螺旋顺序下的所有元素（空格分隔，共 \`m * n\` 个整数）

ACM 输入示例：
\`\`\`
3 3
1 2 3
4 5 6
7 8 9
\`\`\`
输出：\`1 2 3 6 9 8 7 4 5\`
`,

  functionName: 'spiralOrder',
  compare: 'exact',

  tests: [
    { args: [[[1, 2, 3], [4, 5, 6], [7, 8, 9]]], expected: [1, 2, 3, 6, 9, 8, 7, 4, 5] },
    { args: [[[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]]], expected: [1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6, 7] },
    { args: [[[1, 2, 3, 4]]], expected: [1, 2, 3, 4] },
    { args: [[[1], [2], [3]]], expected: [1, 2, 3] },
    { args: [[[1]]], expected: [1] },
    { args: [[[-1, 0], [1, -2]]], expected: [-1, 0, -2, 1] },
    { args: [[[1, 2], [3, 4]]], expected: [1, 2, 4, 3] },
    { args: [[[1, 2, 3], [4, 5, 6]]], expected: [1, 2, 3, 6, 5, 4] },
    { args: [[[1, 2], [3, 4], [5, 6], [7, 8]]], expected: [1, 2, 4, 6, 8, 7, 5, 3] },
    { args: [[[-10,-27,-54,28,-45,-42,-72,50,77,87],[5,10,56,-73,-94,3,68,74,-17,-28],[10,34,-68,16,-42,74,89,-81,22,-13],[36,-48,91,-44,35,-76,-56,-24,2,-6],[12,5,-12,-21,1,-10,-13,-46,-58,-3],[-46,-91,73,21,50,-53,27,0,-100,11],[-89,-59,79,-99,96,1,-21,39,62,-25],[-45,60,78,-6,-46,-62,10,-63,-36,7],[83,-71,43,-79,-59,69,88,13,-25,-50],[-49,-98,40,-87,63,14,-71,-68,-72,36]]], expected: [-10,-27,-54,28,-45,-42,-72,50,77,87,-28,-13,-6,-3,11,-25,7,-50,36,-72,-68,-71,14,63,-87,40,-98,-49,83,-45,-89,-46,12,36,10,5,10,56,-73,-94,3,68,74,-17,22,2,-58,-100,62,-36,-25,13,88,69,-59,-79,43,-71,60,-59,-91,5,-48,34,-68,16,-42,74,89,-81,-24,-46,0,39,-63,10,-62,-46,-6,78,79,73,-12,91,-44,35,-76,-56,-13,27,-21,1,96,-99,21,-21,1,-10,-53,50] },
  ],

  acmTests: [
    { input: '3 3\n1 2 3\n4 5 6\n7 8 9\n', output: '1 2 3 6 9 8 7 4 5\n' },
    { input: '3 4\n1 2 3 4\n5 6 7 8\n9 10 11 12\n', output: '1 2 3 4 8 12 11 10 9 5 6 7\n' },
    { input: '1 4\n1 2 3 4\n', output: '1 2 3 4\n' },
    { input: '3 1\n1\n2\n3\n', output: '1 2 3\n' },
    { input: '1 1\n1\n', output: '1\n' },
    { input: '2 2\n-1 0\n1 -2\n', output: '-1 0 -2 1\n' },
    { input: '2 2\n1 2\n3 4\n', output: '1 2 4 3\n' },
    { input: '2 3\n1 2 3\n4 5 6\n', output: '1 2 3 6 5 4\n' },
    { input: '4 2\n1 2\n3 4\n5 6\n7 8\n', output: '1 2 4 6 8 7 5 3\n' },
    { input: '10 10\n-10 -27 -54 28 -45 -42 -72 50 77 87\n5 10 56 -73 -94 3 68 74 -17 -28\n10 34 -68 16 -42 74 89 -81 22 -13\n36 -48 91 -44 35 -76 -56 -24 2 -6\n12 5 -12 -21 1 -10 -13 -46 -58 -3\n-46 -91 73 21 50 -53 27 0 -100 11\n-89 -59 79 -99 96 1 -21 39 62 -25\n-45 60 78 -6 -46 -62 10 -63 -36 7\n83 -71 43 -79 -59 69 88 13 -25 -50\n-49 -98 40 -87 63 14 -71 -68 -72 36\n', output: '-10 -27 -54 28 -45 -42 -72 50 77 87 -28 -13 -6 -3 11 -25 7 -50 36 -72 -68 -71 14 63 -87 40 -98 -49 83 -45 -89 -46 12 36 10 5 10 56 -73 -94 3 68 74 -17 22 2 -58 -100 62 -36 -25 13 88 69 -59 -79 43 -71 60 -59 -91 5 -48 34 -68 16 -42 74 89 -81 -24 -46 0 39 -63 10 -62 -46 -6 78 79 73 -12 91 -44 35 -76 -56 -13 27 -21 1 96 -99 21 -21 1 -10 -53 50\n' },
  ],

  templates: {
    core: {
      javascript: `/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function(matrix) {
    
};
`,
      python: `def spiralOrder(matrix):
    # 返回顺时针螺旋顺序的元素列表
    pass
`,
    },
    acm: {
      javascript: `// ACM 模式：input 是全部输入（字符串），用 console.log 输出答案
// 输入格式：第一行为 m n（行数与列数）；随后 m 行，每行 n 个整数（空格分隔）
const lines = input.trim().split('\\n');
const [m, n] = lines[0].trim().split(/\\s+/).map(Number);
const matrix = [];
for (let i = 1; i <= m; i++) {
  matrix.push(lines[i].trim().split(/\\s+/).map(Number));
}

// 在这里计算螺旋顺序数组 result，用 console.log(result.join(' ')) 输出

`,
      python: `# ACM 模式：用 input() 或 sys.stdin 读输入，用 print 输出答案
# 输入格式：第一行为 m n（行数与列数）；随后 m 行，每行 n 个整数（空格分隔）
import sys

lines = sys.stdin.read().split('\\n')
m, n = map(int, lines[0].split())
matrix = [list(map(int, lines[i + 1].split())) for i in range(m)]

# 在这里计算螺旋顺序数组 result，用 print(' '.join(map(str, result))) 输出
`,
    },
  },

  solutions: {
    core: {
      javascript: `var spiralOrder = function(matrix) {
  const result = [];
  let top = 0;
  let bottom = matrix.length - 1;
  let left = 0;
  let right = matrix[0].length - 1;
  while (top <= bottom && left <= right) {
    for (let j = left; j <= right; j++) result.push(matrix[top][j]); // 上边：从左到右
    top++;
    for (let i = top; i <= bottom; i++) result.push(matrix[i][right]); // 右边：从上到下
    right--;
    if (top <= bottom) { // 防止只剩一行时重复输出
      for (let j = right; j >= left; j--) result.push(matrix[bottom][j]); // 下边：从右到左
      bottom--;
    }
    if (left <= right) { // 防止只剩一列时重复输出
      for (let i = bottom; i >= top; i--) result.push(matrix[i][left]); // 左边：从下到上
      left++;
    }
  }
  return result;
};
`,
      python: `def spiralOrder(matrix):
    result = []
    top, bottom = 0, len(matrix) - 1
    left, right = 0, len(matrix[0]) - 1
    while top <= bottom and left <= right:
        for j in range(left, right + 1):  # 上边：从左到右
            result.append(matrix[top][j])
        top += 1
        for i in range(top, bottom + 1):  # 右边：从上到下
            result.append(matrix[i][right])
        right -= 1
        if top <= bottom:  # 防止只剩一行时重复输出
            for j in range(right, left - 1, -1):  # 下边：从右到左
                result.append(matrix[bottom][j])
            bottom -= 1
        if left <= right:  # 防止只剩一列时重复输出
            for i in range(bottom, top - 1, -1):  # 左边：从下到上
                result.append(matrix[i][left])
            left += 1
    return result
`,
    },
    acm: {
      javascript: `const lines = input.trim().split('\\n');
const [m, n] = lines[0].trim().split(/\\s+/).map(Number);
const matrix = [];
for (let i = 1; i <= m; i++) {
  matrix.push(lines[i].trim().split(/\\s+/).map(Number));
}

const result = [];
let top = 0;
let bottom = matrix.length - 1;
let left = 0;
let right = matrix[0].length - 1;
while (top <= bottom && left <= right) {
  for (let j = left; j <= right; j++) result.push(matrix[top][j]);
  top++;
  for (let i = top; i <= bottom; i++) result.push(matrix[i][right]);
  right--;
  if (top <= bottom) {
    for (let j = right; j >= left; j--) result.push(matrix[bottom][j]);
    bottom--;
  }
  if (left <= right) {
    for (let i = bottom; i >= top; i--) result.push(matrix[i][left]);
    left++;
  }
}

console.log(result.join(' '));
`,
      python: `import sys

lines = sys.stdin.read().split('\\n')
m, n = map(int, lines[0].split())
matrix = [list(map(int, lines[i + 1].split())) for i in range(m)]

result = []
top, bottom = 0, len(matrix) - 1
left, right = 0, len(matrix[0]) - 1
while top <= bottom and left <= right:
    for j in range(left, right + 1):
        result.append(matrix[top][j])
    top += 1
    for i in range(top, bottom + 1):
        result.append(matrix[i][right])
    right -= 1
    if top <= bottom:
        for j in range(right, left - 1, -1):
            result.append(matrix[bottom][j])
        bottom -= 1
    if left <= right:
        for i in range(bottom, top - 1, -1):
            result.append(matrix[i][left])
        left += 1

print(' '.join(map(str, result)))
`,
    },
  },

  idea: `
这是一道纯模拟题：想象从外到内一层层「剥皮」，每一层按 从左到右 → 从上到下 → 从右到左 → 从下到上 的顺序走一圈。

实现上用四个边界变量 \`top / bottom / left / right\` 圈出还没访问的区域：

- 每轮先沿上边、右边各走一条边，随即 \`top++\`、\`right--\`；再沿下边、左边走，最后 \`bottom--\`、\`left++\`
- 关键易错点：走完前两条边后，剩余区域可能只剩一行或一列（输入本身就是单行、单列矩阵时第一轮就会遇到），此时下边和左边的遍历必须先检查边界仍然有效，否则同一行/列会被重复输出

每个元素恰好被访问一次，时间复杂度 O(m·n)；除输出数组外只用常数空间。
`,

  explanation: `
- \`while (top <= bottom && left <= right)\`：只要还有未访问的行和列就继续走圈
- 上边、右边的遍历是无条件的：进入循环时这两边一定存在
- 走完上边后 \`top++\` 可能使 \`top > bottom\`（单行矩阵第一轮就发生），所以遍历下边前要用 \`top <= bottom\` 再判断一次；同理遍历左边前要判断 \`left <= right\`
- 四个方向的循环都直接以当前的 \`top / bottom / left / right\` 为边界，每走完一条边立刻收缩对应边界
- 易错点：漏掉两个 \`if\` 检查会在单行、单列这类小矩阵用例上输出重复元素

ACM 版本只是多了矩阵文本的解析与结果的一行输出，走圈逻辑完全相同。
`,
};
