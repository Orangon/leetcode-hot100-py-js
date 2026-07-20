// 64. 最小路径和
// 普通类型题（二维整数数组 -> 整数），无需 argSpec / resultKind
export default {
  id: 64,
  title: '最小路径和',
  slug: 'minimum-path-sum',
  difficulty: 'medium',
  tags: ['数组', '动态规划', '矩阵'],
  hints: [
    '每个格子只能从上方或左方到达，因此其最小路径和等于自身权值加两个前驱累计值中的较小者。',
    '按行从左到右做动态规划，可直接复用 grid 存放累计最小和，将额外空间降为 O(1)。',
    '跳过起点，对每个 (i,j) 取越界方向为 Infinity，再执行 grid[i][j] += min(grid[i-1][j], grid[i][j-1])。',
    '该方案会修改输入网格，单行和单列只会沿唯一方向累加；ACM 先读 m 行矩阵，最后输出右下角累计值。',
  ],

  description: `
给定一个包含非负整数的 \`m x n\` 网格 \`grid\`，请找出一条从左上角到右下角的路径，使得路径上的数字总和为最小。

说明：每次只能向下或者向右移动一步。

### 示例

- 输入：\`grid = [[1,3,1],[1,5,1],[4,2,1]]\`，输出：\`7\`（路径 1→3→1→1→1 的总和为 7）
- 输入：\`grid = [[1,2,3],[4,5,6]]\`，输出：\`12\`
- 输入：\`grid = [[1]]\`，输出：\`1\`

### 提示

- \`m == grid.length\`
- \`n == grid[i].length\`
- \`1 <= m, n <= 200\`
- \`0 <= grid[i][j] <= 100\`

### ACM 模式输入输出格式

- 输入：第一行为两个整数 \`m n\`（行数、列数，空格分隔）；随后 \`m\` 行，每行 \`n\` 个整数（空格分隔）
- 输出：一个整数，即最小路径和

ACM 输入示例：
\`\`\`
3 3
1 3 1
1 5 1
4 2 1
\`\`\`
输出：\`7\`
`,

  functionName: 'minPathSum',
  compare: 'exact',

  tests: [
    { args: [[[1, 3, 1], [1, 5, 1], [4, 2, 1]]], expected: 7 },
    { args: [[[1, 2, 3], [4, 5, 6]]], expected: 12 },
    { args: [[[1]]], expected: 1 },
    { args: [[[1, 2, 3, 4]]], expected: 10 },
    { args: [[[1], [2], [3]]], expected: 6 },
    { args: [[[0, 1, 0], [1, 0, 1], [0, 1, 0]]], expected: 2 },
    { args: [[[0, 0, 0], [0, 0, 0], [0, 0, 0]]], expected: 0 },
    { args: [[[1, 2], [1, 1]]], expected: 3 },
    { args: [[[5, 5], [5, 5]]], expected: 15 },
    { args: [[[16,1,18,9,32,77,73,3,78,62,6,9,8,24,55],[72,37,44,56,36,4,35,83,62,0,7,73,71,30,14],[91,77,44,9,56,29,78,34,85,96,68,9,72,8,10],[95,7,72,39,65,31,76,91,86,18,97,13,74,85,79],[6,74,52,37,64,43,40,27,77,74,62,30,77,23,22],[88,98,83,15,78,50,76,75,36,73,45,93,51,57,84],[13,67,53,94,13,97,50,56,64,29,21,39,91,75,11],[58,1,17,48,30,71,5,4,36,56,3,35,28,6,84],[33,43,53,50,70,56,77,85,66,48,77,47,13,26,95],[96,51,81,49,71,87,34,12,1,22,63,26,15,82,84],[70,68,63,52,0,95,84,13,63,33,63,85,78,16,80],[74,91,62,40,17,63,84,4,21,37,92,88,10,55,54],[8,47,37,29,26,88,19,34,40,33,21,58,15,26,7],[53,8,39,76,35,86,73,65,27,27,32,38,99,42,48],[34,53,99,83,66,14,22,17,66,97,68,23,81,81,8]]], expected: 772 },
  ],

  acmTests: [
    { input: '3 3\n1 3 1\n1 5 1\n4 2 1\n', output: '7\n' },
    { input: '2 3\n1 2 3\n4 5 6\n', output: '12\n' },
    { input: '1 1\n1\n', output: '1\n' },
    { input: '1 4\n1 2 3 4\n', output: '10\n' },
    { input: '3 1\n1\n2\n3\n', output: '6\n' },
    { input: '3 3\n0 1 0\n1 0 1\n0 1 0\n', output: '2\n' },
    { input: '3 3\n0 0 0\n0 0 0\n0 0 0\n', output: '0\n' },
    { input: '2 2\n1 2\n1 1\n', output: '3\n' },
    { input: '2 2\n5 5\n5 5\n', output: '15\n' },
    { input: '15 15\n16 1 18 9 32 77 73 3 78 62 6 9 8 24 55\n72 37 44 56 36 4 35 83 62 0 7 73 71 30 14\n91 77 44 9 56 29 78 34 85 96 68 9 72 8 10\n95 7 72 39 65 31 76 91 86 18 97 13 74 85 79\n6 74 52 37 64 43 40 27 77 74 62 30 77 23 22\n88 98 83 15 78 50 76 75 36 73 45 93 51 57 84\n13 67 53 94 13 97 50 56 64 29 21 39 91 75 11\n58 1 17 48 30 71 5 4 36 56 3 35 28 6 84\n33 43 53 50 70 56 77 85 66 48 77 47 13 26 95\n96 51 81 49 71 87 34 12 1 22 63 26 15 82 84\n70 68 63 52 0 95 84 13 63 33 63 85 78 16 80\n74 91 62 40 17 63 84 4 21 37 92 88 10 55 54\n8 47 37 29 26 88 19 34 40 33 21 58 15 26 7\n53 8 39 76 35 86 73 65 27 27 32 38 99 42 48\n34 53 99 83 66 14 22 17 66 97 68 23 81 81 8\n', output: '772\n' },
  ],

  templates: {
    core: {
      javascript: `/**
 * @param {number[][]} grid
 * @return {number}
 */
var minPathSum = function(grid) {
    
};
`,
      python: `def minPathSum(grid):
    # grid 为非负整数二维数组，返回从左上角到右下角的最小路径和
    pass
`,
    },
    acm: {
      javascript: `// ACM 模式：input 是全部输入（字符串），用 console.log 输出答案
// 输入格式：第一行 m n（行数 列数），随后 m 行每行 n 个整数（空格分隔）
const lines = input.trim().split('\\n');
const [m, n] = lines[0].trim().split(/\\s+/).map(Number);
const grid = [];
for (let i = 0; i < m; i++) {
  grid.push(lines[i + 1].trim().split(/\\s+/).map(Number));
}

// 在这里写你的代码，用 console.log 输出最小路径和

`,
      python: `# ACM 模式：用 input() 或 sys.stdin 读输入，用 print 输出答案
# 输入格式：第一行 m n（行数 列数），随后 m 行每行 n 个整数（空格分隔）
import sys

lines = sys.stdin.read().split('\\n')
m, n = map(int, lines[0].split())
grid = [list(map(int, lines[i + 1].split())) for i in range(m)]

# 在这里写你的代码，用 print 输出最小路径和
`,
    },
  },

  solutions: {
    core: {
      javascript: `var minPathSum = function(grid) {
  const m = grid.length, n = grid[0].length;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (i === 0 && j === 0) continue; // 起点本身就是初值
      const up = i > 0 ? grid[i - 1][j] : Infinity;   // 从上方来
      const left = j > 0 ? grid[i][j - 1] : Infinity; // 从左方来
      grid[i][j] += Math.min(up, left); // f(i, j) = grid[i][j] + min(f(i-1, j), f(i, j-1))
    }
  }
  return grid[m - 1][n - 1];
};
`,
      python: `def minPathSum(grid):
    m, n = len(grid), len(grid[0])
    for i in range(m):
        for j in range(n):
            if i == 0 and j == 0:
                continue  # 起点本身就是初值
            up = grid[i - 1][j] if i > 0 else float('inf')   # 从上方来
            left = grid[i][j - 1] if j > 0 else float('inf')  # 从左方来
            grid[i][j] += min(up, left)  # f(i, j) = grid[i][j] + min(f(i-1, j), f(i, j-1))
    return grid[m - 1][n - 1]
`,
    },
    acm: {
      javascript: `const lines = input.trim().split('\\n');
const [m, n] = lines[0].trim().split(/\\s+/).map(Number);
const grid = [];
for (let i = 0; i < m; i++) {
  grid.push(lines[i + 1].trim().split(/\\s+/).map(Number));
}

for (let i = 0; i < m; i++) {
  for (let j = 0; j < n; j++) {
    if (i === 0 && j === 0) continue;
    const up = i > 0 ? grid[i - 1][j] : Infinity;
    const left = j > 0 ? grid[i][j - 1] : Infinity;
    grid[i][j] += Math.min(up, left);
  }
}
console.log(grid[m - 1][n - 1]);
`,
      python: `import sys

lines = sys.stdin.read().split('\\n')
m, n = map(int, lines[0].split())
grid = [list(map(int, lines[i + 1].split())) for i in range(m)]

for i in range(m):
    for j in range(n):
        if i == 0 and j == 0:
            continue
        up = grid[i - 1][j] if i > 0 else float('inf')
        left = grid[i][j - 1] if j > 0 else float('inf')
        grid[i][j] += min(up, left)

print(grid[m - 1][n - 1])
`,
    },
  },

  idea: `
到达格子 \`(i, j)\` 只能来自上方 \`(i-1, j)\` 或左方 \`(i, j-1)\`，因此最小路径和满足 \`f(i, j) = grid[i][j] + min(f(i-1, j), f(i, j-1))\`。第一行只能从左边来、第一列只能从上边来，是递推的边界。

**动态规划（原地，推荐）**：直接在 \`grid\` 上累加，\`grid[i][j]\` 更新后就表示到达该格的最小路径和，不需要额外的 DP 表。时间 O(m×n)，空间 O(1)。

**滚动数组**：与 62 题「不同路径」一样，也可以用一维数组滚动更新，适合不允许修改输入的场景，空间同样是 O(n)。

参考答案采用原地动态规划。
`,

  explanation: `
- 双重循环按从上到下、从左到右的顺序扫描，把 \`grid[i][j]\` 原地更新为「到达 \`(i, j)\` 的最小路径和」
- 起点 \`(0, 0)\` 跳过：它本身就是初值，不需要累加
- \`up\` / \`left\` 分别表示从上方、左方来的最小路径和；越界一侧取 \`Infinity\`（Python 用 \`float('inf')\`），这样第一行只剩左方、第一列只剩上方，边界统一处理、无需特判
- \`grid[i][j] += min(up, left)\` 即递推式 \`f(i, j) = grid[i][j] + min(f(i-1, j), f(i, j-1))\`
- 扫描结束后右下角 \`grid[m - 1][n - 1]\` 就是答案
- 注意这个写法会原地修改输入数组；如果要求不改动输入，先复制一份或改用滚动数组即可

ACM 版本先按格式读入 \`m n\` 和随后 \`m\` 行整数构造网格，算法与核心代码模式完全一致，最后输出右下角的值。
`,
};
