// 994. 腐烂的橘子
// 普通类型题（二维整数数组 -> 整数），无需 argSpec / resultKind；参考答案用多源 BFS
export default {
  id: 994,
  title: '腐烂的橘子',
  slug: 'rotting-oranges',
  difficulty: 'medium',
  tags: ['广度优先搜索', '数组', '矩阵'],
  hints: [
    '所有初始腐烂橘子会同时扩散，因此它们应共同作为第 0 分钟的起点；最晚被感染的新鲜橘子所在的 BFS 层数就是总分钟数。',
    '采用多源 BFS：扫描网格时把全部值为 2 的格子入队并统计 fresh，再按层向上下左右感染值为 1 的相邻格子。',
    '每轮锁定当前层队列长度，感染新格子时立即改为 2、令 fresh 减一并入队，处理完整层后 minutes 加一；结束时根据 fresh 是否为 0 返回 minutes 或 -1。',
    '开局 fresh 为 0 时答案必须是 0，边界检查需同时限制行列范围；ACM 模式读取 m、n 及随后 m 行网格，只输出一个分钟数或 -1。',
  ],

  description: `
在给定的 \`m x n\` 网格 \`grid\` 中，每个单元格可以有以下三个值之一：

- 值 \`0\` 代表空单元格
- 值 \`1\` 代表新鲜橘子
- 值 \`2\` 代表腐烂的橘子

每分钟，腐烂的橘子会**感染**与其上下左右四个方向相邻的新鲜橘子，使它们腐烂。

返回直到单元格中没有新鲜橘子为止所必须经过的**最小分钟数**。如果不可能使所有橘子都腐烂，返回 \`-1\`。

### 示例

- 输入：\`grid = [[2,1,1],[1,1,0],[0,1,1]]\`，输出：\`4\`
- 输入：\`grid = [[2,1,1],[0,1,1],[1,0,1]]\`，输出：\`-1\`（左下角的橘子永远无法被感染）
- 输入：\`grid = [[0,2]]\`，输出：\`0\`（一开始就没有新鲜橘子）

### 提示

- \`m == grid.length\`，\`n == grid[i].length\`
- \`1 <= m, n <= 10\`
- \`grid[i][j]\` 仅为 \`0\`、\`1\` 或 \`2\`

### ACM 模式输入输出格式

- 输入：第一行为两个整数 \`m n\`（行数、列数，空格分隔）；随后 \`m\` 行，每行 \`n\` 个整数（空格分隔，值为 \`0\` / \`1\` / \`2\`）
- 输出：一个整数，即最小分钟数；不可能全部腐烂时输出 \`-1\`

ACM 输入示例：
\`\`\`
3 3
2 1 1
1 1 0
0 1 1
\`\`\`
输出：\`4\`
`,

  functionName: 'orangesRotting',
  compare: 'exact',

  tests: [
    { args: [[[2, 1, 1], [1, 1, 0], [0, 1, 1]]], expected: 4 },
    { args: [[[2, 1, 1], [0, 1, 1], [1, 0, 1]]], expected: -1 },
    { args: [[[0, 2]]], expected: 0 },
    { args: [[[1, 1], [1, 1]]], expected: -1 },
    { args: [[[1, 2], [2, 1]]], expected: 1 },
    { args: [[[0]]], expected: 0 },
    { args: [[[1]]], expected: -1 },
    { args: [[[2, 2], [2, 2]]], expected: 0 },
    { args: [[[2, 0, 1], [0, 0, 1], [1, 1, 0]]], expected: -1 },
    { args: [[[1, 1, 2, 2, 0, 1, 1, 1, 2, 1], [1, 0, 1, 1, 1, 1, 1, 0, 1, 2], [1, 2, 2, 1, 1, 2, 1, 1, 1, 1], [1, 0, 0, 0, 1, 1, 1, 2, 0, 0], [1, 1, 2, 1, 0, 1, 0, 1, 1, 0], [1, 0, 1, 1, 0, 1, 1, 1, 1, 2], [1, 0, 1, 1, 1, 2, 0, 1, 1, 1], [2, 0, 1, 1, 1, 2, 1, 1, 1, 2], [1, 1, 0, 0, 1, 1, 1, 0, 0, 1], [1, 1, 1, 2, 1, 2, 0, 2, 1, 0]]], expected: 3 },
  ],

  acmTests: [
    { input: '3 3\n2 1 1\n1 1 0\n0 1 1\n', output: '4\n' },
    { input: '3 3\n2 1 1\n0 1 1\n1 0 1\n', output: '-1\n' },
    { input: '1 2\n0 2\n', output: '0\n' },
    { input: '2 2\n1 1\n1 1\n', output: '-1\n' },
    { input: '2 2\n1 2\n2 1\n', output: '1\n' },
    { input: '1 1\n0\n', output: '0\n' },
    { input: '1 1\n1\n', output: '-1\n' },
    { input: '2 2\n2 2\n2 2\n', output: '0\n' },
    { input: '3 3\n2 0 1\n0 0 1\n1 1 0\n', output: '-1\n' },
    { input: '10 10\n1 1 2 2 0 1 1 1 2 1\n1 0 1 1 1 1 1 0 1 2\n1 2 2 1 1 2 1 1 1 1\n1 0 0 0 1 1 1 2 0 0\n1 1 2 1 0 1 0 1 1 0\n1 0 1 1 0 1 1 1 1 2\n1 0 1 1 1 2 0 1 1 1\n2 0 1 1 1 2 1 1 1 2\n1 1 0 0 1 1 1 0 0 1\n1 1 1 2 1 2 0 2 1 0\n', output: '3\n' },
  ],

  templates: {
    core: {
      javascript: `/**
 * @param {number[][]} grid 0 空、1 新鲜、2 腐烂
 * @return {number}
 */
var orangesRotting = function(grid) {
    
};
`,
      python: `def orangesRotting(grid):
    # grid 为整数二维数组（0 空、1 新鲜、2 腐烂），返回最小分钟数，不可能全部腐烂返回 -1
    pass
`,
    },
    acm: {
      javascript: `// ACM 模式：input 是全部输入（字符串），用 console.log 输出答案
// 输入格式：第一行 m n（行数 列数），随后 m 行每行 n 个整数（0 空、1 新鲜、2 腐烂）
const lines = input.trim().split('\\n');
const [m, n] = lines[0].trim().split(/\\s+/).map(Number);
const grid = [];
for (let i = 0; i < m; i++) {
  grid.push(lines[i + 1].trim().split(/\\s+/).map(Number));
}

// 在这里写你的代码，用 console.log 输出最小分钟数（不可能全部腐烂输出 -1）

`,
      python: `# ACM 模式：用 input() 或 sys.stdin 读输入，用 print 输出答案
# 输入格式：第一行 m n（行数 列数），随后 m 行每行 n 个整数（0 空、1 新鲜、2 腐烂）
import sys

lines = sys.stdin.read().split('\\n')
m, n = map(int, lines[0].split())
grid = [list(map(int, lines[i + 1].split())) for i in range(m)]

# 在这里写你的代码，用 print 输出最小分钟数（不可能全部腐烂输出 -1）
`,
    },
  },

  solutions: {
    core: {
      javascript: `var orangesRotting = function(grid) {
  const m = grid.length, n = grid[0].length;
  const queue = []; // 多源 BFS：所有初始腐烂橘子同时入队
  let fresh = 0;
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (grid[r][c] === 2) queue.push([r, c]);
      else if (grid[r][c] === 1) fresh++;
    }
  }
  const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
  let minutes = 0;
  let head = 0; // 用下标当队头指针，避免 shift 的开销
  while (head < queue.length && fresh > 0) {
    const size = queue.length - head; // 当前这一层（同一分钟腐烂的橘子）
    for (let i = 0; i < size; i++) {
      const [r, c] = queue[head++];
      for (const [dr, dc] of dirs) {
        const nr = r + dr, nc = c + dc;
        if (nr >= 0 && nr < m && nc >= 0 && nc < n && grid[nr][nc] === 1) {
          grid[nr][nc] = 2; // 感染并充当 visited 标记
          fresh--;
          queue.push([nr, nc]);
        }
      }
    }
    minutes++; // 每处理完一层，时间过去一分钟
  }
  return fresh === 0 ? minutes : -1; // 还有新鲜橘子剩下说明烂不到
};
`,
      python: `def orangesRotting(grid):
    from collections import deque

    m, n = len(grid), len(grid[0])
    queue = deque()  # 多源 BFS：所有初始腐烂橘子同时入队
    fresh = 0
    for r in range(m):
        for c in range(n):
            if grid[r][c] == 2:
                queue.append((r, c))
            elif grid[r][c] == 1:
                fresh += 1

    dirs = [(1, 0), (-1, 0), (0, 1), (0, -1)]
    minutes = 0
    while queue and fresh > 0:
        for _ in range(len(queue)):  # 当前这一层（同一分钟腐烂的橘子）
            r, c = queue.popleft()
            for dr, dc in dirs:
                nr, nc = r + dr, c + dc
                if 0 <= nr < m and 0 <= nc < n and grid[nr][nc] == 1:
                    grid[nr][nc] = 2  # 感染并充当 visited 标记
                    fresh -= 1
                    queue.append((nr, nc))
        minutes += 1  # 每处理完一层，时间过去一分钟

    return minutes if fresh == 0 else -1  # 还有新鲜橘子剩下说明烂不到
`,
    },
    acm: {
      javascript: `const lines = input.trim().split('\\n');
const [m, n] = lines[0].trim().split(/\\s+/).map(Number);
const grid = [];
for (let i = 0; i < m; i++) {
  grid.push(lines[i + 1].trim().split(/\\s+/).map(Number));
}

const queue = [];
let fresh = 0;
for (let r = 0; r < m; r++) {
  for (let c = 0; c < n; c++) {
    if (grid[r][c] === 2) queue.push([r, c]);
    else if (grid[r][c] === 1) fresh++;
  }
}

const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
let minutes = 0;
let head = 0;
while (head < queue.length && fresh > 0) {
  const size = queue.length - head;
  for (let i = 0; i < size; i++) {
    const [r, c] = queue[head++];
    for (const [dr, dc] of dirs) {
      const nr = r + dr, nc = c + dc;
      if (nr >= 0 && nr < m && nc >= 0 && nc < n && grid[nr][nc] === 1) {
        grid[nr][nc] = 2;
        fresh--;
        queue.push([nr, nc]);
      }
    }
  }
  minutes++;
}

console.log(fresh === 0 ? minutes : -1);
`,
      python: `import sys
from collections import deque

lines = sys.stdin.read().split('\\n')
m, n = map(int, lines[0].split())
grid = [list(map(int, lines[i + 1].split())) for i in range(m)]

queue = deque()
fresh = 0
for r in range(m):
    for c in range(n):
        if grid[r][c] == 2:
            queue.append((r, c))
        elif grid[r][c] == 1:
            fresh += 1

dirs = [(1, 0), (-1, 0), (0, 1), (0, -1)]
minutes = 0
while queue and fresh > 0:
    for _ in range(len(queue)):
        r, c = queue.popleft()
        for dr, dc in dirs:
            nr, nc = r + dr, c + dc
            if 0 <= nr < m and 0 <= nc < n and grid[nr][nc] == 1:
                grid[nr][nc] = 2
                fresh -= 1
                queue.append((nr, nc))
    minutes += 1

print(minutes if fresh == 0 else -1)
`,
    },
  },

  idea: `
腐烂是从所有初始烂橘子**同时**向外扩散的，每一分钟扩散到相邻的一圈——这正是**多源 BFS** 的标准场景。

做法：

- 第一遍扫描网格：把所有值为 \`2\` 的格子全部入队（作为 BFS 的第 0 层），同时统计新鲜橘子总数 \`fresh\`
- 按层 BFS：每次取出当前队列里的**一整层**（它们在同一分钟开始腐烂），把它们四方向相邻的新鲜橘子感染并入队；处理完一层，分钟数加一
- 队列为空或没有新鲜橘子时结束。若 \`fresh\` 归零，答案就是经过的分钟数；否则说明存在被空格（\`0\`）隔离、永远烂不到的橘子，返回 \`-1\`

为什么答案最小：BFS 按层推进保证了每个橘子被感染的分钟数就是「它到最近的初始烂橘子的曼哈顿距离」，而全部烂完所需时间就是这些距离的最大值，天然最小。

时间复杂度 O(m×n)（每个格子最多入队一次），空间复杂度 O(m×n)（队列）。
`,

  explanation: `
- **多源起点**：初始时所有腐烂橘子一起入队，等价于虚拟了一个「超级源点」，一次 BFS 就能模拟所有源头同时扩散
- **按层处理**：循环开头用 \`size = queue.length - head\`（Python 用 \`for _ in range(len(queue))\`）锁定当前层的大小，层内感染的新橘子进入下一层，层处理完 \`minutes\` 才加一——这是分钟数不多算的关键
- 循环条件里的 \`fresh > 0\`：没有新鲜橘子就不必继续，避免最后白算一分钟（例如开局就没有新鲜橘子时答案应为 0）
- 感染时把格子就地改成 \`2\`，兼作 visited 标记，不需要额外的访问数组
- 结束后检查 \`fresh\`：非零说明有橘子被 \`0\` 隔离，返回 \`-1\`
- JS 用 \`head\` 下标代替 \`shift()\` 出队，避免数组头部删除的 O(n) 开销；Python 直接用 \`collections.deque\`

ACM 版本按格式解析出 \`m × n\` 的整数网格后，BFS 逻辑与核心代码模式完全一致，最后打印分钟数或 \`-1\`。
`,
};
