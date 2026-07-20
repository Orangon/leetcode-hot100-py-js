// 73. 矩阵置零
// 原地修改题：resultKind 为 'inputArray'，判题时忽略返回值，取被原地修改的第一个参数比对
export default {
  id: 73,
  title: '矩阵置零',
  slug: 'set-matrix-zeroes',
  difficulty: 'medium',
  tags: ['数组', '哈希表', '矩阵'],
  hints: [
    '置零依据必须来自原矩阵中的零，若扫描时直接扩散零会把新产生的零误当标记，因此需要先记录再修改。',
    '复用第一行和第一列分别记录各行、各列是否置零，并用额外布尔值单独记录第一列原本是否含零。',
    '第一遍遇零就令 matrix[i][0] 和 matrix[0][j] 为零；第二遍从右下向左上依据这两个标记填零，最后处理每行首列。',
    'matrix[0][0] 无法同时表示第一行与第一列，必须拆开含义；函数原地修改，ACM 完成后逐行空格分隔输出矩阵。',
  ],

  description: `
给定一个 \`m x n\` 的矩阵 \`matrix\`，如果一个元素为 \`0\`，则将其所在行和列的所有元素都设为 \`0\`。请使用**原地**算法。

### 示例

- 输入：\`matrix = [[1,1,1],[1,0,1],[1,1,1]]\`，输出：\`[[1,0,1],[0,0,0],[1,0,1]]\`
- 输入：\`matrix = [[0,1,2,0],[3,4,5,2],[1,3,1,5]]\`，输出：\`[[0,0,0,0],[0,4,5,0],[0,3,1,0]]\`

### 提示

- \`m == matrix.length\`，\`n == matrix[0].length\`
- \`1 <= m, n <= 200\`
- \`-2^31 <= matrix[i][j] <= 2^31 - 1\`

### ACM 模式输入输出格式

- 输入：第一行为两个整数 \`m n\`（矩阵的行数与列数）；随后 \`m\` 行，每行 \`n\` 个整数（空格分隔）
- 输出：置零后的矩阵，共 \`m\` 行，每行 \`n\` 个整数（空格分隔）

ACM 输入示例：
\`\`\`
3 3
1 1 1
1 0 1
1 1 1
\`\`\`
输出：
\`\`\`
1 0 1
0 0 0
1 0 1
\`\`\`
`,

  functionName: 'setZeroes',
  compare: 'exact',
  resultKind: 'inputArray',

  tests: [
    { args: [[[1, 1, 1], [1, 0, 1], [1, 1, 1]]], expected: [[1, 0, 1], [0, 0, 0], [1, 0, 1]] },
    { args: [[[0, 1, 2, 0], [3, 4, 5, 2], [1, 3, 1, 5]]], expected: [[0, 0, 0, 0], [0, 4, 5, 0], [0, 3, 1, 0]] },
    { args: [[[1, 2, 3], [4, 5, 6]]], expected: [[1, 2, 3], [4, 5, 6]] },
    { args: [[[0]]], expected: [[0]] },
    { args: [[[-1, 0], [2, -3]]], expected: [[0, 0], [2, 0]] },
    { args: [[[1], [0], [3]]], expected: [[0], [0], [0]] },
    { args: [[[1, 0, 3]]], expected: [[0, 0, 0]] },
    { args: [[[5, 6, 7, 8]]], expected: [[5, 6, 7, 8]] },
    { args: [[[2147483647, -2147483648], [1, 0]]], expected: [[2147483647, 0], [0, 0]] },
    { args: [[[9, -55, -32, -33, -55, 83, -89, 95, -97, -45], [30, -46, -55, -42, -87, -40, 100, -45, 19, 47], [-65, -46, -54, -16, -56, -43, 13, -100, -78, -56], [-45, -57, 35, -11, -83, 0, -72, -53, 31, 48], [-94, 2, 34, 12, 57, 55, 19, 81, -94, -70], [0, -87, -87, 95, -43, 50, -94, -96, -91, -33], [49, -60, 76, -84, -60, 3, 69, 0, 69, 6], [84, 85, 0, 49, 83, 35, -67, -44, -82, 85], [-38, -72, 57, 34, -84, -17, -99, 43, -73, -18], [53, 47, 33, 19, -68, 67, 74, -31, -8, -88], [43, -78, -32, 55, -44, 34, 9, 73, 67, 94], [-79, 60, 0, -18, 79, 55, -56, -88, 19, -81]]], expected: [[0, -55, 0, -33, -55, 0, -89, 0, -97, -45], [0, -46, 0, -42, -87, 0, 100, 0, 19, 47], [0, -46, 0, -16, -56, 0, 13, 0, -78, -56], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 2, 0, 12, 57, 0, 19, 0, -94, -70], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, -72, 0, 34, -84, 0, -99, 0, -73, -18], [0, 47, 0, 19, -68, 0, 74, 0, -8, -88], [0, -78, 0, 55, -44, 0, 9, 0, 67, 94], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]] },
  ],

  acmTests: [
    { input: '3 3\n1 1 1\n1 0 1\n1 1 1\n', output: '1 0 1\n0 0 0\n1 0 1\n' },
    { input: '3 4\n0 1 2 0\n3 4 5 2\n1 3 1 5\n', output: '0 0 0 0\n0 4 5 0\n0 3 1 0\n' },
    { input: '2 3\n1 2 3\n4 5 6\n', output: '1 2 3\n4 5 6\n' },
    { input: '1 1\n0\n', output: '0\n' },
    { input: '2 2\n-1 0\n2 -3\n', output: '0 0\n2 0\n' },
    { input: '3 1\n1\n0\n3\n', output: '0\n0\n0\n' },
    { input: '1 3\n1 0 3\n', output: '0 0 0\n' },
    { input: '1 4\n5 6 7 8\n', output: '5 6 7 8\n' },
    { input: '2 2\n2147483647 -2147483648\n1 0\n', output: '2147483647 0\n0 0\n' },
    { input: '12 10\n9 -55 -32 -33 -55 83 -89 95 -97 -45\n30 -46 -55 -42 -87 -40 100 -45 19 47\n-65 -46 -54 -16 -56 -43 13 -100 -78 -56\n-45 -57 35 -11 -83 0 -72 -53 31 48\n-94 2 34 12 57 55 19 81 -94 -70\n0 -87 -87 95 -43 50 -94 -96 -91 -33\n49 -60 76 -84 -60 3 69 0 69 6\n84 85 0 49 83 35 -67 -44 -82 85\n-38 -72 57 34 -84 -17 -99 43 -73 -18\n53 47 33 19 -68 67 74 -31 -8 -88\n43 -78 -32 55 -44 34 9 73 67 94\n-79 60 0 -18 79 55 -56 -88 19 -81\n', output: '0 -55 0 -33 -55 0 -89 0 -97 -45\n0 -46 0 -42 -87 0 100 0 19 47\n0 -46 0 -16 -56 0 13 0 -78 -56\n0 0 0 0 0 0 0 0 0 0\n0 2 0 12 57 0 19 0 -94 -70\n0 0 0 0 0 0 0 0 0 0\n0 0 0 0 0 0 0 0 0 0\n0 0 0 0 0 0 0 0 0 0\n0 -72 0 34 -84 0 -99 0 -73 -18\n0 47 0 19 -68 0 74 0 -8 -88\n0 -78 0 55 -44 0 9 0 67 94\n0 0 0 0 0 0 0 0 0 0\n' },
  ],

  templates: {
    core: {
      javascript: `/**
 * @param {number[][]} matrix
 * @return {void} 请原地修改 matrix，不要返回任何值
 */
var setZeroes = function(matrix) {
    
};
`,
      python: `def setZeroes(matrix):
    # 原地修改 matrix，不需要返回值
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

// 在这里原地修改 matrix，并逐行输出（console.log(row.join(' '))）

`,
      python: `# ACM 模式：用 input() 或 sys.stdin 读输入，用 print 输出答案
# 输入格式：第一行为 m n（行数与列数）；随后 m 行，每行 n 个整数（空格分隔）
import sys

lines = sys.stdin.read().split('\\n')
m, n = map(int, lines[0].split())
matrix = [list(map(int, lines[i + 1].split())) for i in range(m)]

# 在这里原地修改 matrix，并逐行输出（print(' '.join(map(str, row)))）
`,
    },
  },

  solutions: {
    core: {
      javascript: `var setZeroes = function(matrix) {
  const m = matrix.length;
  const n = matrix[0].length;
  // 用第一行、第一列作为标记位；matrix[0][0] 只负责标记第一行，
  // “第一列是否有零”用单独变量记录，否则两个含义会冲突
  let col0HasZero = false;
  for (let i = 0; i < m; i++) {
    if (matrix[i][0] === 0) col0HasZero = true;
    for (let j = 1; j < n; j++) {
      if (matrix[i][j] === 0) {
        matrix[i][0] = 0; // 第 i 行需要置零
        matrix[0][j] = 0; // 第 j 列需要置零
      }
    }
  }
  // 从右下角往回处理：保证读到的标记位还没被自己覆盖
  for (let i = m - 1; i >= 0; i--) {
    for (let j = n - 1; j >= 1; j--) {
      if (matrix[i][0] === 0 || matrix[0][j] === 0) {
        matrix[i][j] = 0;
      }
    }
    if (col0HasZero) matrix[i][0] = 0;
  }
};
`,
      python: `def setZeroes(matrix):
    m = len(matrix)
    n = len(matrix[0])
    # 用第一行、第一列作为标记位；“第一列是否有零”用单独变量记录
    col0_has_zero = False
    for i in range(m):
        if matrix[i][0] == 0:
            col0_has_zero = True
        for j in range(1, n):
            if matrix[i][j] == 0:
                matrix[i][0] = 0  # 第 i 行需要置零
                matrix[0][j] = 0  # 第 j 列需要置零
    # 从右下角往回处理：保证读到的标记位还没被自己覆盖
    for i in range(m - 1, -1, -1):
        for j in range(n - 1, 0, -1):
            if matrix[i][0] == 0 or matrix[0][j] == 0:
                matrix[i][j] = 0
        if col0_has_zero:
            matrix[i][0] = 0
`,
    },
    acm: {
      javascript: `const lines = input.trim().split('\\n');
const [m, n] = lines[0].trim().split(/\\s+/).map(Number);
const matrix = [];
for (let i = 1; i <= m; i++) {
  matrix.push(lines[i].trim().split(/\\s+/).map(Number));
}

let col0HasZero = false;
for (let i = 0; i < m; i++) {
  if (matrix[i][0] === 0) col0HasZero = true;
  for (let j = 1; j < n; j++) {
    if (matrix[i][j] === 0) {
      matrix[i][0] = 0;
      matrix[0][j] = 0;
    }
  }
}
for (let i = m - 1; i >= 0; i--) {
  for (let j = n - 1; j >= 1; j--) {
    if (matrix[i][0] === 0 || matrix[0][j] === 0) {
      matrix[i][j] = 0;
    }
  }
  if (col0HasZero) matrix[i][0] = 0;
}

for (const row of matrix) {
  console.log(row.join(' '));
}
`,
      python: `import sys

lines = sys.stdin.read().split('\\n')
m, n = map(int, lines[0].split())
matrix = [list(map(int, lines[i + 1].split())) for i in range(m)]

col0_has_zero = False
for i in range(m):
    if matrix[i][0] == 0:
        col0_has_zero = True
    for j in range(1, n):
        if matrix[i][j] == 0:
            matrix[i][0] = 0
            matrix[0][j] = 0
for i in range(m - 1, -1, -1):
    for j in range(n - 1, 0, -1):
        if matrix[i][0] == 0 or matrix[0][j] == 0:
            matrix[i][j] = 0
    if col0_has_zero:
        matrix[i][0] = 0

for row in matrix:
    print(' '.join(map(str, row)))
`,
    },
  },

  idea: `
最容易想到的做法是先遍历一遍，用两个集合分别记录哪些行、哪些列出现过 \`0\`，第二遍再把对应的行和列整行整列置零。时间复杂度 O(m·n)，但需要 O(m + n) 的额外空间。

题目要求原地算法，优化的关键是**复用矩阵自身做标记**：

- 用 \`matrix[i][0]\` 记录「第 i 行是否需要置零」，用 \`matrix[0][j]\` 记录「第 j 列是否需要置零」
- \`matrix[0][0]\` 处在第一行与第一列的交叉点，只能表达一个含义，所以「第一列是否有零」单独用一个布尔变量记录，\`matrix[0][0]\` 只负责标记第一行
- 第一遍扫描打标记，第二遍根据标记置零；第二遍从右下角往回处理，确保读到的标记位还没被自己覆盖

时间复杂度 O(m·n)，空间复杂度 O(1)。
`,

  explanation: `
- 第一遍扫描：\`matrix[i][0] === 0\` 说明第一列有零，记入 \`col0HasZero\`；内层从 \`j = 1\` 开始，遇到 \`0\` 就把 \`matrix[i][0]\` 与 \`matrix[0][j]\` 置 \`0\`，作为行、列标记
- 第二遍从右下角往左上角填 \`0\`：处理 \`(i, j)\` 时要读 \`matrix[i][0]\` 与 \`matrix[0][j]\` 两个标记。按行逆序时，处理第 \`0\` 行之前其他行已全部填完，此时覆盖列标记不会再被读取；行标记 \`matrix[i][0]\` 也在本行用完之后才可能被改写
- 每行的内层循环结束后，再根据 \`col0HasZero\` 决定该行第一列是否置零
- 易错点：第二遍若从左上角正序填，会提前把标记位置零，导致后面整片区域被错误置零

ACM 版本的算法完全一致，只是输入输出换成了按格式读写矩阵文本。
`,
};
