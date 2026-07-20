// 79. 单词搜索
// 普通类型题目（二维字符数组 + 字符串 -> 布尔），compare 用 exact
export default {
  id: 79,
  title: '单词搜索',
  slug: 'word-search',
  difficulty: 'medium',
  tags: ['数组', '字符串', '回溯', '深度优先搜索', '矩阵'],
  hints: [
    '单词对应网格中的一条上下左右相邻路径，路径上每个格子只能使用一次；因此匹配状态不仅取决于当前位置和字符下标，还要避免重访当前路径中的格子。',
    '枚举每个格子作为起点，用深度优先搜索逐字符匹配；遇到越界或字符不符立即剪枝，匹配后通过回溯探索四个方向。',
    '定义 dfs(i, j, k) 匹配 word[k]：命中当前字符后临时标记该格子，递归搜索 (i±1,j) 与 (i,j±1) 的 k+1，返回前恢复字符；当 k 等于 word.length 时成功。',
    '标记过的格子必须在每次递归返回前恢复，避免影响其他路径；ACM 模式先读 m、n，再将后续 m 行拆成字符矩阵，读取最后一行为 word，并输出小写 true 或 false。',
  ],

  description: `
给定一个 \`m x n\` 二维字符网格 \`board\` 和一个字符串单词 \`word\`。如果 \`word\` 存在于网格中，返回 \`true\`；否则，返回 \`false\`。

单词必须按照字母顺序，通过相邻的单元格内的字母构成，其中「相邻」单元格是那些水平相邻或垂直相邻的单元格。同一个单元格内的字母不允许被重复使用。

### 示例

- 输入：\`board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"\`，输出：\`true\`
- 输入：同样的 \`board\`，\`word = "SEE"\`，输出：\`true\`
- 输入：同样的 \`board\`，\`word = "ABCB"\`，输出：\`false\`

### 提示

- \`m == board.length\`，\`n = board[i].length\`
- \`1 <= m, n <= 6\`
- \`1 <= word.length <= 15\`
- \`board\` 和 \`word\` 仅由大小写英文字母组成

### ACM 模式输入输出格式

- 输入：第一行为两个整数 \`m n\`；随后 \`m\` 行，每行一个长度为 \`n\` 的字符串（网格的一行）；最后一行为 \`word\`
- 输出：\`true\` 或 \`false\`（小写）

ACM 输入示例：
\`\`\`
3 4
ABCE
SFCS
ADEE
ABCCED
\`\`\`
输出：\`true\`
`,

  functionName: 'exist',
  compare: 'exact',

  tests: [
    {
      args: [
        [
          ['A', 'B', 'C', 'E'],
          ['S', 'F', 'C', 'S'],
          ['A', 'D', 'E', 'E'],
        ],
        'ABCCED',
      ],
      expected: true,
    },
    {
      args: [
        [
          ['A', 'B', 'C', 'E'],
          ['S', 'F', 'C', 'S'],
          ['A', 'D', 'E', 'E'],
        ],
        'SEE',
      ],
      expected: true,
    },
    {
      args: [
        [
          ['A', 'B', 'C', 'E'],
          ['S', 'F', 'C', 'S'],
          ['A', 'D', 'E', 'E'],
        ],
        'ABCB',
      ],
      expected: false,
    },
    { args: [[['a']], 'a'], expected: true },
    {
      args: [
        [
          ['a', 'b'],
          ['c', 'd'],
        ],
        'abcd',
      ],
      expected: false,
    },
    {
      args: [
        [
          ['A', 'A', 'A'],
          ['A', 'A', 'A'],
          ['A', 'A', 'A'],
        ],
        'AAAAAAAAAAA',
      ],
      expected: false,
    },
    { args: [[['a']], 'b'], expected: false },
    { args: [[['a', 'b', 'c'], ['d', 'e', 'f']], 'abcfed'], expected: true },
    { args: [[['C', 'F', 'A', 'A', 'C', 'E'], ['D', 'G', 'A', 'D', 'H', 'D'], ['F', 'A', 'F', 'C', 'F', 'H'], ['F', 'G', 'B', 'C', 'B', 'E'], ['A', 'E', 'E', 'D', 'G', 'F'], ['A', 'F', 'E', 'G', 'A', 'H']], 'AFCDGAFBGAFF'], expected: true },
    { args: [[['C', 'F', 'A', 'A', 'C', 'E'], ['D', 'G', 'A', 'D', 'H', 'D'], ['F', 'A', 'F', 'C', 'F', 'H'], ['F', 'G', 'B', 'C', 'B', 'E'], ['A', 'E', 'E', 'D', 'G', 'F'], ['A', 'F', 'E', 'G', 'A', 'H']], 'FFAGEFHBHC'], expected: false },
  ],

  acmTests: [
    { input: '3 4\nABCE\nSFCS\nADEE\nABCCED\n', output: 'true\n' },
    { input: '3 4\nABCE\nSFCS\nADEE\nSEE\n', output: 'true\n' },
    { input: '3 4\nABCE\nSFCS\nADEE\nABCB\n', output: 'false\n' },
    { input: '1 1\na\na\n', output: 'true\n' },
    { input: '2 2\nab\ncd\nabcd\n', output: 'false\n' },
    { input: '3 3\nAAA\nAAA\nAAA\nAAAAAAAAAAA\n', output: 'false\n' },
    { input: '1 1\na\nb\n', output: 'false\n' },
    { input: '2 3\nabc\ndef\nabcfed\n', output: 'true\n' },
    { input: '6 6\nCFAACE\nDGADHD\nFAFCFH\nFGBCBE\nAEEDGF\nAFEGAH\nAFCDGAFBGAFF\n', output: 'true\n' },
    { input: '6 6\nCFAACE\nDGADHD\nFAFCFH\nFGBCBE\nAEEDGF\nAFEGAH\nFFAGEFHBHC\n', output: 'false\n' },
  ],

  templates: {
    core: {
      javascript: `/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function(board, word) {
    
};
`,
      python: `def exist(board, word):
    # board 为字符二维列表，word 为字符串；返回 True 或 False
    pass
`,
    },
    acm: {
      javascript: `// ACM 模式：input 是全部输入（字符串），用 console.log 输出答案
// 输入格式：第一行 m n；随后 m 行，每行一个长度为 n 的字符串；最后一行为 word
const lines = input.split('\\n');
const mn = lines[0].trim().split(/\\s+/).map(Number);
const m = mn[0], n = mn[1];
const board = [];
for (let i = 0; i < m; i++) board.push(lines[1 + i].trim().split(''));
const word = lines[1 + m].trim();

// 在这里写你的代码，用 console.log 输出 true 或 false（小写）

`,
      python: `# ACM 模式：用 input() 或 sys.stdin 读输入，用 print 输出答案
# 输入格式：第一行 m n；随后 m 行，每行一个长度为 n 的字符串；最后一行为 word
import sys

lines = sys.stdin.read().split('\\n')
m, n = map(int, lines[0].split())
board = [list(lines[1 + i].strip()) for i in range(m)]
word = lines[1 + m].strip()

# 在这里写你的代码，用 print 输出 true 或 false（小写）
`,
    },
  },

  solutions: {
    core: {
      javascript: `var exist = function(board, word) {
  const m = board.length, n = board[0].length;

  // 在格子 (i, j) 处尝试匹配 word[k]
  const dfs = (i, j, k) => {
    if (k === word.length) return true; // 整个单词匹配完成
    if (i < 0 || i >= m || j < 0 || j >= n || board[i][j] !== word[k]) return false;
    const tmp = board[i][j];
    board[i][j] = '#'; // 原地标记，防止同一路径重复访问
    const found =
      dfs(i + 1, j, k + 1) ||
      dfs(i - 1, j, k + 1) ||
      dfs(i, j + 1, k + 1) ||
      dfs(i, j - 1, k + 1);
    board[i][j] = tmp; // 恢复现场
    return found;
  };

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (dfs(i, j, 0)) return true;
    }
  }
  return false;
};
`,
      python: `def exist(board, word):
    m, n = len(board), len(board[0])

    def dfs(i, j, k):
        # 在格子 (i, j) 处尝试匹配 word[k]
        if k == len(word):
            return True  # 整个单词匹配完成
        if i < 0 or i >= m or j < 0 or j >= n or board[i][j] != word[k]:
            return False
        tmp = board[i][j]
        board[i][j] = '#'  # 原地标记，防止同一路径重复访问
        found = (dfs(i + 1, j, k + 1) or dfs(i - 1, j, k + 1)
                 or dfs(i, j + 1, k + 1) or dfs(i, j - 1, k + 1))
        board[i][j] = tmp  # 恢复现场
        return found

    for i in range(m):
        for j in range(n):
            if dfs(i, j, 0):
                return True
    return False
`,
    },
    acm: {
      javascript: `const lines = input.split('\\n');
const mn = lines[0].trim().split(/\\s+/).map(Number);
const m = mn[0], n = mn[1];
const board = [];
for (let i = 0; i < m; i++) board.push(lines[1 + i].trim().split(''));
const word = lines[1 + m].trim();

const dfs = (i, j, k) => {
  if (k === word.length) return true;
  if (i < 0 || i >= m || j < 0 || j >= n || board[i][j] !== word[k]) return false;
  const tmp = board[i][j];
  board[i][j] = '#';
  const found =
    dfs(i + 1, j, k + 1) ||
    dfs(i - 1, j, k + 1) ||
    dfs(i, j + 1, k + 1) ||
    dfs(i, j - 1, k + 1);
  board[i][j] = tmp;
  return found;
};

let ok = false;
outer:
for (let i = 0; i < m; i++) {
  for (let j = 0; j < n; j++) {
    if (dfs(i, j, 0)) {
      ok = true;
      break outer;
    }
  }
}
console.log(ok ? 'true' : 'false');
`,
      python: `import sys

lines = sys.stdin.read().split('\\n')
m, n = map(int, lines[0].split())
board = [list(lines[1 + i].strip()) for i in range(m)]
word = lines[1 + m].strip()

def dfs(i, j, k):
    if k == len(word):
        return True
    if i < 0 or i >= m or j < 0 or j >= n or board[i][j] != word[k]:
        return False
    tmp = board[i][j]
    board[i][j] = '#'
    found = (dfs(i + 1, j, k + 1) or dfs(i - 1, j, k + 1)
             or dfs(i, j + 1, k + 1) or dfs(i, j - 1, k + 1))
    board[i][j] = tmp
    return found

ok = False
for i in range(m):
    for j in range(n):
        if dfs(i, j, 0):
            ok = True
            break
    if ok:
        break

print('true' if ok else 'false')
`,
    },
  },

  idea: `
这是典型的**回溯（DFS + 恢复现场）**问题。枚举网格中每个与 \`word[0]\` 相同的格子作为起点，做深度优先搜索：每匹配成功一个字符，就向上下左右四个方向递归匹配下一个字符。

关键是「同一个格子不能被重复使用」：进入一个格子后先把它的值改成特殊标记（如 \`#\`），递归返回后再改回原值（恢复现场）。这样同一条路径上不会重复访问，而不同路径之间互不影响。

剪枝：进入格子前先判断越界和字符是否匹配，不满足直接返回 \`false\`。

时间复杂度 O(m·n·4^L)（L 为单词长度，每个格子最多向 4 个方向扩展），空间复杂度 O(L)（递归栈深度）。
`,

  explanation: `
- \`dfs(i, j, k)\` 表示「当前站在格子 (i, j)，准备匹配 \`word[k]\`」
- 先写递归出口：\`k === word.length\` 说明整个单词匹配成功，返回 \`true\`
- 越界或字符不匹配直接返回 \`false\`——把这两个判断放在最前面，四个方向的递归调用就都不用再判断
- 用临时变量 \`tmp\` 保存当前字符，把格子改成 \`#\` 作为「已访问」标记，再向四个方向递归
- 四个方向用 \`||\` 短路连接：任一方向成功即成功
- 递归返回后**必须**把 \`board[i][j]\` 改回 \`tmp\`（恢复现场），否则其他起点、其他路径会错误地避开这个格子
- 外层双重循环枚举起点，任何一个起点成功就整体返回 \`true\`

ACM 版本多了输入解析：按题面格式把每行字符串切成字符数组构成网格，算法部分与核心模式完全一致，最后把布尔结果以小写 \`true\` / \`false\` 打印。
`,
};
