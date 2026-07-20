// 200. 岛屿数量
// 普通类型题（二维字符数组 -> 整数），无需 argSpec / resultKind
export default {
  id: 200,
  title: '岛屿数量',
  slug: 'number-of-islands',
  difficulty: 'medium',
  tags: ['深度优先搜索', '广度优先搜索', '并查集'],
  hints: [
    '岛屿只通过上下左右四个方向连通，因此每个尚未访问的陆地格子都代表一座新岛屿的起点。',
    '扫描整个网格并使用 DFS 或 BFS 做洪水填充；发现字符 \'1\' 时计数加一，再遍历该连通块。',
    '对每个格子 (r, c)：若为 \'1\'，执行 count++，随后将它标记为 \'0\'，并递归或入队处理四个相邻陆地，直到整座岛屿被淹没。',
    '访问邻居前必须判断行列边界；ACM 模式先读取 m、n，再把随后 m 行无空格的 01 字符串拆成字符数组，最后只输出岛屿数量。',
  ],

  description: `
给你一个由 \`'1'\`（陆地）和 \`'0'\`（水）组成的二维网格，请你计算网格中岛屿的数量。

岛屿总是被水包围，并且每座岛屿只能由水平方向和/或竖直方向上相邻的陆地连接形成。

此外，你可以假设该网格的四条边均被水包围。

### 示例

- 输入：\`grid = [["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]\`，输出：\`1\`
- 输入：\`grid = [["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]\`，输出：\`3\`

### 提示

- \`m == grid.length\`
- \`n == grid[i].length\`
- \`1 <= m, n <= 300\`
- \`grid[i][j]\` 的值为 \`'0'\` 或 \`'1'\`

### ACM 模式输入输出格式

- 输入：第一行为两个整数 \`m n\`（行数、列数，空格分隔）；随后 \`m\` 行，每行一个长度为 \`n\` 的 01 字符串（无空格）
- 输出：一个整数，即岛屿数量

ACM 输入示例：
\`\`\`
4 5
11000
11000
00100
00011
\`\`\`
输出：\`3\`
`,

  functionName: 'numIslands',
  compare: 'exact',

  tests: [
    { args: [[['1', '1', '1', '1', '0'], ['1', '1', '0', '1', '0'], ['1', '1', '0', '0', '0'], ['0', '0', '0', '0', '0']]], expected: 1 },
    { args: [[['1', '1', '0', '0', '0'], ['1', '1', '0', '0', '0'], ['0', '0', '1', '0', '0'], ['0', '0', '0', '1', '1']]], expected: 3 },
    { args: [[['0', '0'], ['0', '0']]], expected: 0 },
    { args: [[['1']]], expected: 1 },
    { args: [[['0']]], expected: 0 },
    { args: [[['1', '0', '1', '0', '1']]], expected: 3 },
    { args: [[['1', '1', '1'], ['1', '1', '1'], ['1', '1', '1']]], expected: 1 },
    { args: [[['1'], ['0'], ['1']]], expected: 2 },
    { args: [[['1', '0', '0', '0'], ['0', '1', '0', '0'], ['0', '0', '1', '0'], ['0', '0', '0', '1']]], expected: 4 },
    { args: [[['0', '1', '1', '1', '0', '0', '1', '0', '0', '0', '0', '0', '0', '1', '1'], ['0', '0', '0', '0', '0', '1', '0', '1', '1', '0', '1', '1', '0', '1', '0'], ['0', '0', '1', '0', '1', '1', '0', '0', '0', '1', '1', '0', '1', '1', '1'], ['0', '0', '0', '0', '0', '1', '0', '1', '0', '1', '1', '0', '1', '0', '0'], ['1', '0', '0', '0', '1', '0', '1', '0', '1', '0', '1', '1', '0', '1', '0'], ['0', '0', '1', '1', '1', '0', '1', '0', '0', '0', '1', '1', '1', '0', '1'], ['1', '0', '0', '0', '1', '1', '1', '1', '0', '1', '0', '1', '0', '1', '1'], ['0', '0', '1', '1', '0', '1', '1', '1', '0', '1', '1', '0', '1', '0', '1'], ['1', '0', '1', '0', '1', '1', '1', '0', '0', '1', '0', '0', '0', '1', '1'], ['1', '0', '1', '0', '0', '0', '0', '0', '1', '1', '1', '0', '1', '1', '1'], ['1', '1', '1', '0', '0', '0', '1', '0', '0', '0', '1', '1', '1', '0', '1'], ['0', '1', '1', '1', '0', '1', '1', '1', '0', '0', '1', '1', '0', '0', '1'], ['0', '1', '1', '1', '1', '0', '0', '1', '0', '0', '0', '1', '1', '0', '1'], ['1', '1', '0', '0', '1', '0', '1', '1', '0', '1', '1', '0', '1', '0', '0'], ['1', '0', '1', '0', '0', '1', '1', '1', '0', '1', '1', '0', '0', '1', '1']]], expected: 20 },
  ],

  acmTests: [
    { input: '4 5\n11110\n11010\n11000\n00000\n', output: '1\n' },
    { input: '4 5\n11000\n11000\n00100\n00011\n', output: '3\n' },
    { input: '2 2\n00\n00\n', output: '0\n' },
    { input: '1 1\n1\n', output: '1\n' },
    { input: '1 1\n0\n', output: '0\n' },
    { input: '1 5\n10101\n', output: '3\n' },
    { input: '3 3\n111\n111\n111\n', output: '1\n' },
    { input: '3 1\n1\n0\n1\n', output: '2\n' },
    { input: '4 4\n1000\n0100\n0010\n0001\n', output: '4\n' },
    { input: '15 15\n011100100000011\n000001011011010\n001011000110111\n000001010110100\n100010101011010\n001110100011101\n100011110101011\n001101110110101\n101011100100011\n101000001110111\n111000100011101\n011101110011001\n011110010001101\n110010110110100\n101001110110011\n', output: '20\n' },
  ],

  templates: {
    core: {
      javascript: `/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function(grid) {
    
};
`,
      python: `def numIslands(grid):
    # grid 为字符二维数组（'0'/'1'），返回岛屿数量
    pass
`,
    },
    acm: {
      javascript: `// ACM 模式：input 是全部输入（字符串），用 console.log 输出答案
// 输入格式：第一行 m n（行数 列数），随后 m 行每行一个长度为 n 的 01 字符串
const lines = input.trim().split('\\n');
const [m, n] = lines[0].trim().split(/\\s+/).map(Number);
const grid = [];
for (let i = 0; i < m; i++) {
  grid.push(lines[i + 1].trim().split(''));
}

// 在这里写你的代码，用 console.log 输出岛屿数量

`,
      python: `# ACM 模式：用 input() 或 sys.stdin 读输入，用 print 输出答案
# 输入格式：第一行 m n（行数 列数），随后 m 行每行一个长度为 n 的 01 字符串
import sys

lines = sys.stdin.read().split('\\n')
m, n = map(int, lines[0].split())
grid = [list(lines[i + 1].strip()) for i in range(m)]

# 在这里写你的代码，用 print 输出岛屿数量
`,
    },
  },

  solutions: {
    core: {
      javascript: `var numIslands = function(grid) {
  const m = grid.length, n = grid[0].length;
  const g = grid.map((row) => row.slice()); // 复制一份，避免修改原始数据
  let count = 0;
  const dfs = (r, c) => {
    if (r < 0 || r >= m || c < 0 || c >= n || g[r][c] !== '1') return;
    g[r][c] = '0'; // 就地淹没，避免重复访问
    dfs(r + 1, c);
    dfs(r - 1, c);
    dfs(r, c + 1);
    dfs(r, c - 1);
  };
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (g[r][c] === '1') {
        count++;     // 发现一座新岛屿
        dfs(r, c);   // 把整座岛屿淹没
      }
    }
  }
  return count;
};
`,
      python: `def numIslands(grid):
    m, n = len(grid), len(grid[0])
    g = [row[:] for row in grid]  # 复制一份，避免修改原始数据
    count = 0

    def dfs(r, c):
        if r < 0 or r >= m or c < 0 or c >= n or g[r][c] != '1':
            return
        g[r][c] = '0'  # 就地淹没，避免重复访问
        dfs(r + 1, c)
        dfs(r - 1, c)
        dfs(r, c + 1)
        dfs(r, c - 1)

    for r in range(m):
        for c in range(n):
            if g[r][c] == '1':
                count += 1   # 发现一座新岛屿
                dfs(r, c)    # 把整座岛屿淹没
    return count
`,
    },
    acm: {
      javascript: `const lines = input.trim().split('\\n');
const m = Number(lines[0].trim().split(/\\s+/)[0]);
const grid = [];
for (let i = 0; i < m; i++) {
  grid.push(lines[i + 1].trim().split(''));
}

const rows = grid.length, cols = grid[0].length;
let count = 0;
const dfs = (r, c) => {
  if (r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] !== '1') return;
  grid[r][c] = '0';
  dfs(r + 1, c);
  dfs(r - 1, c);
  dfs(r, c + 1);
  dfs(r, c - 1);
};
for (let r = 0; r < rows; r++) {
  for (let c = 0; c < cols; c++) {
    if (grid[r][c] === '1') {
      count++;
      dfs(r, c);
    }
  }
}
console.log(count);
`,
      python: `import sys

lines = sys.stdin.read().split('\\n')
m = int(lines[0].split()[0])
grid = [list(lines[i + 1].strip()) for i in range(m)]

rows, cols = len(grid), len(grid[0])
count = 0

def dfs(r, c):
    if r < 0 or r >= rows or c < 0 or c >= cols or grid[r][c] != '1':
        return
    grid[r][c] = '0'
    dfs(r + 1, c)
    dfs(r - 1, c)
    dfs(r, c + 1)
    dfs(r, c - 1)

for r in range(rows):
    for c in range(cols):
        if grid[r][c] == '1':
            count += 1
            dfs(r, c)

print(count)
`,
    },
  },

  idea: `
经典的 Flood Fill（洪水填充）问题，常用三种做法：

**深度优先搜索（DFS）**：扫描整个网格，每遇到一个 \`'1'\` 就把计数加一，然后从该格子出发递归地把与它四方向连通的整座岛屿全部「淹没」（置为 \`'0'\`）。这样每座岛屿只会被计数一次。

**广度优先搜索（BFS）**：与 DFS 等价，只是用队列代替递归栈，同样把访问过的陆地置 \`'0'\`。

**并查集**：把每个陆地格子与上下左右相邻的陆地合并，最后统计连通分量的个数。

DFS / BFS 的时间复杂度都是 O(m×n)（每个格子最多访问一次），空间复杂度 O(m×n)（最坏情况下的递归栈或队列）；并查集时间近似 O(m×n)。参考答案采用 DFS。
`,

  explanation: `
- 先复制一份网格 \`g\`（JS 用 \`grid.map((row) => row.slice())\`，Python 用切片拷贝），后续淹没操作都在副本上进行，避免改动调用方传入的原始数据
- 外层双重循环扫描整个网格
- 遇到 \`'1'\` 说明发现了一座新岛屿：\`count\` 加一，并调用 \`dfs\` 把与它四方向连通的所有陆地都置成 \`'0'\`
- \`dfs\` 的终止条件：越界，或当前格子不是 \`'1'\`
- 淹没当前格子后直接递归访问上下左右四个邻居；因为访问过的格子已变成 \`'0'\`，不会重复计数
- 就地淹没副本网格充当 visited 标记，无需额外的访问数组

ACM 版本先按格式把每行 01 字符串切成字符数组，算法与核心代码模式完全一致，最后把 \`count\` 打印出来。
`,
};
