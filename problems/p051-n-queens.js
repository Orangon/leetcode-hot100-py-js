// 51. N 皇后
// 返回所有棋盘方案，方案之间顺序无关：compare 用 multiset
export default {
  id: 51,
  title: 'N 皇后',
  slug: 'n-queens',
  difficulty: 'hard',
  tags: ['数组', '回溯'],
  hints: [
    '逐行放置可天然消除同行冲突，只需快速判断列、r - c 主对角线和 r + c 副对角线是否已被占用。',
    '用三个布尔标记集合配合回溯，每行从左到右尝试合法列，冲突判断和状态更新都为 O(1)。',
    'dfs(r) 中枚举列 c，若三类标记均空闲就记录 cols[r]、打标记并递归 r + 1，返回后撤销；r === n 时生成棋盘。',
    '主对角线下标需加 n - 1 避免负数；n 为 2 或 3 时无解，ACM 无输出，多个棋盘之间恰好空一行。',
  ],

  description: `
按照国际象棋的规则，皇后可以攻击与之处在同一行、同一列或同一斜线上的棋子。

**n 皇后问题**研究的是如何将 \`n\` 个皇后放置在 \`n × n\` 的棋盘上，并且使皇后彼此之间不能相互攻击。

给你一个整数 \`n\`，返回所有不同的 n 皇后问题的解决方案。每一种解法包含一个不同的棋盘放置方案，其中 \`'Q'\` 和 \`'.'\` 分别代表了皇后和空位。

### 示例

- 输入：\`n = 4\`，输出：\`[[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]\`（4 皇后共有 2 种不同的解法）
- 输入：\`n = 1\`，输出：\`[["Q"]]\`

### 提示

- \`1 <= n <= 9\`

### ACM 模式输入输出格式

- 输入：第一行为整数 \`n\`
- 输出：依次输出每个方案——每个方案为连续的 \`n\` 行棋盘（由 \`Q\` 和 \`.\` 组成），**方案之间用一个空行分隔**；按「逐行放置皇后、每行从左到右尝试各列」的顺序输出；无解时不输出任何内容

ACM 输入示例：
\`\`\`
4
\`\`\`
输出：
\`\`\`
.Q..
...Q
Q...
..Q.

..Q.
Q...
...Q
.Q..
\`\`\`
`,

  functionName: 'solveNQueens',
  compare: 'multiset',

  tests: [
    {
      args: [4],
      expected: [
        ['.Q..', '...Q', 'Q...', '..Q.'],
        ['..Q.', 'Q...', '...Q', '.Q..'],
      ],
    },
    { args: [1], expected: [['Q']] },
    { args: [2], expected: [] },
    { args: [3], expected: [] },
    {
      args: [5],
      expected: [
        ['Q....', '..Q..', '....Q', '.Q...', '...Q.'],
        ['Q....', '...Q.', '.Q...', '....Q', '..Q..'],
        ['.Q...', '...Q.', 'Q....', '..Q..', '....Q'],
        ['.Q...', '....Q', '..Q..', 'Q....', '...Q.'],
        ['..Q..', 'Q....', '...Q.', '.Q...', '....Q'],
        ['..Q..', '....Q', '.Q...', '...Q.', 'Q....'],
        ['...Q.', 'Q....', '..Q..', '....Q', '.Q...'],
        ['...Q.', '.Q...', '....Q', '..Q..', 'Q....'],
        ['....Q', '.Q...', '...Q.', 'Q....', '..Q..'],
        ['....Q', '..Q..', 'Q....', '...Q.', '.Q...'],
      ],
    },
    {
      args: [6],
      expected: [
        ['.Q....', '...Q..', '.....Q', 'Q.....', '..Q...', '....Q.'],
        ['..Q...', '.....Q', '.Q....', '....Q.', 'Q.....', '...Q..'],
        ['...Q..', 'Q.....', '....Q.', '.Q....', '.....Q', '..Q...'],
        ['....Q.', '..Q...', 'Q.....', '.....Q', '...Q..', '.Q....'],
      ],
    },
  ],

  acmTests: [
    {
      input: '4\n',
      output: '.Q..\n...Q\nQ...\n..Q.\n\n..Q.\nQ...\n...Q\n.Q..\n',
    },
    { input: '1\n', output: 'Q\n' },
    { input: '2\n', output: '' },
    { input: '3\n', output: '' },
    {
      input: '5\n',
      output: `Q....
..Q..
....Q
.Q...
...Q.

Q....
...Q.
.Q...
....Q
..Q..

.Q...
...Q.
Q....
..Q..
....Q

.Q...
....Q
..Q..
Q....
...Q.

..Q..
Q....
...Q.
.Q...
....Q

..Q..
....Q
.Q...
...Q.
Q....

...Q.
Q....
..Q..
....Q
.Q...

...Q.
.Q...
....Q
..Q..
Q....

....Q
.Q...
...Q.
Q....
..Q..

....Q
..Q..
Q....
...Q.
.Q...
`,
    },
    {
      input: '6\n',
      output: `.Q....
...Q..
.....Q
Q.....
..Q...
....Q.

..Q...
.....Q
.Q....
....Q.
Q.....
...Q..

...Q..
Q.....
....Q.
.Q....
.....Q
..Q...

....Q.
..Q...
Q.....
.....Q
...Q..
.Q....
`,
    },
  ],

  templates: {
    core: {
      javascript: `/**
 * @param {number} n
 * @return {string[][]}
 */
var solveNQueens = function(n) {
    
};
`,
      python: `def solveNQueens(n):
    # 返回所有棋盘方案，每个方案是 n 个字符串（由 Q 和 . 组成）的列表
    pass
`,
    },
    acm: {
      javascript: `// ACM 模式：input 是全部输入（字符串），用 console.log 输出答案
// 输入格式：第一行为整数 n
const n = Number(input.split('\\n')[0]);

// 在这里写你的代码
// 输出：每个方案输出连续的 n 行棋盘，方案之间空一行；无解时不输出任何内容

`,
      python: `# ACM 模式：用 input() 或 sys.stdin 读输入，用 print 输出答案
# 输入格式：第一行为整数 n
import sys

n = int(sys.stdin.read().split('\\n')[0])

# 在这里写你的代码
# 输出：每个方案输出连续的 n 行棋盘，方案之间空一行；无解时不输出任何内容
`,
    },
  },

  solutions: {
    core: {
      javascript: `var solveNQueens = function(n) {
  const res = [];
  const cols = new Array(n).fill(-1); // cols[r] 为第 r 行皇后所在列
  const usedCol = new Array(n).fill(false);
  const usedD1 = new Array(2 * n - 1).fill(false); // 主对角线：r - c 为定值
  const usedD2 = new Array(2 * n - 1).fill(false); // 副对角线：r + c 为定值

  const dfs = (r) => {
    if (r === n) {
      // 所有行都放好了，按 cols 生成棋盘
      res.push(cols.map((c) => '.'.repeat(c) + 'Q' + '.'.repeat(n - c - 1)));
      return;
    }
    for (let c = 0; c < n; c++) {
      const d1 = r - c + n - 1; // 加 n - 1 使下标非负
      const d2 = r + c;
      if (usedCol[c] || usedD1[d1] || usedD2[d2]) continue;
      cols[r] = c;
      usedCol[c] = usedD1[d1] = usedD2[d2] = true;
      dfs(r + 1);
      usedCol[c] = usedD1[d1] = usedD2[d2] = false; // 撤销标记
    }
  };
  dfs(0);
  return res;
};
`,
      python: `def solveNQueens(n):
    res = []
    cols = [-1] * n  # cols[r] 为第 r 行皇后所在列
    used_col = [False] * n
    used_d1 = [False] * (2 * n - 1)  # 主对角线：r - c 为定值
    used_d2 = [False] * (2 * n - 1)  # 副对角线：r + c 为定值

    def dfs(r):
        if r == n:
            # 所有行都放好了，按 cols 生成棋盘
            res.append(['.' * c + 'Q' + '.' * (n - c - 1) for c in cols])
            return
        for c in range(n):
            d1 = r - c + n - 1  # 加 n - 1 使下标非负
            d2 = r + c
            if used_col[c] or used_d1[d1] or used_d2[d2]:
                continue
            cols[r] = c
            used_col[c] = used_d1[d1] = used_d2[d2] = True
            dfs(r + 1)
            used_col[c] = used_d1[d1] = used_d2[d2] = False  # 撤销标记

    dfs(0)
    return res
`,
    },
    acm: {
      javascript: `const n = Number(input.split('\\n')[0]);

const res = [];
const cols = new Array(n).fill(-1);
const usedCol = new Array(n).fill(false);
const usedD1 = new Array(2 * n - 1).fill(false);
const usedD2 = new Array(2 * n - 1).fill(false);

const dfs = (r) => {
  if (r === n) {
    res.push(cols.map((c) => '.'.repeat(c) + 'Q' + '.'.repeat(n - c - 1)));
    return;
  }
  for (let c = 0; c < n; c++) {
    const d1 = r - c + n - 1;
    const d2 = r + c;
    if (usedCol[c] || usedD1[d1] || usedD2[d2]) continue;
    cols[r] = c;
    usedCol[c] = usedD1[d1] = usedD2[d2] = true;
    dfs(r + 1);
    usedCol[c] = usedD1[d1] = usedD2[d2] = false;
  }
};
dfs(0);

// 每个方案连续输出 n 行，方案之间空一行；无解时自然没有输出
for (let i = 0; i < res.length; i++) {
  if (i > 0) console.log('');
  for (const row of res[i]) console.log(row);
}
`,
      python: `import sys

n = int(sys.stdin.read().split('\\n')[0])

res = []
cols = [-1] * n
used_col = [False] * n
used_d1 = [False] * (2 * n - 1)
used_d2 = [False] * (2 * n - 1)

def dfs(r):
    if r == n:
        res.append(['.' * c + 'Q' + '.' * (n - c - 1) for c in cols])
        return
    for c in range(n):
        d1 = r - c + n - 1
        d2 = r + c
        if used_col[c] or used_d1[d1] or used_d2[d2]:
            continue
        cols[r] = c
        used_col[c] = used_d1[d1] = used_d2[d2] = True
        dfs(r + 1)
        used_col[c] = used_d1[d1] = used_d2[d2] = False

dfs(0)

# 每个方案连续输出 n 行，方案之间空一行；无解时自然没有输出
for i, board in enumerate(res):
    if i > 0:
        print()
    for row in board:
        print(row)
`,
    },
  },

  idea: `
N 皇后是回溯算法的经典例题。**逐行放置皇后**：第 \`r\` 行只需决定放在哪一列 \`c\`，要求该列以及两条对角线上都没有已放置的皇后。

用三个布尔数组做 O(1) 冲突判断：

- \`usedCol[c]\`：第 \`c\` 列是否被占用
- \`usedD1[r - c + n - 1]\`：主对角线——同一条对角线上的格子 \`r - c\` 为定值，加 \`n - 1\` 把下标挪到非负
- \`usedD2[r + c]\`：副对角线——同一条对角线上的格子 \`r + c\` 为定值

放皇后时打标记、递归下一行，返回后撤销标记（恢复现场）。每行从左到右枚举列，保证方案按确定顺序生成。

时间复杂度 O(n!)（第一行有 n 种选择，第二行至多 n-1 种……），空间复杂度 O(n)。
`,

  explanation: `
- \`cols[r]\` 记录第 \`r\` 行的皇后放在哪一列，方便最后生成棋盘字符串
- \`dfs(r)\` 表示「正在放第 \`r\` 行」：\`r === n\` 说明 0..n-1 行全部放好，按 \`cols\` 生成 \`n\` 行字符串加入答案
- 枚举第 \`r\` 行的每一列 \`c\`，用三个标记数组判断是否与已放皇后冲突：列 \`usedCol[c]\`、主对角线 \`usedD1[r-c+n-1]\`、副对角线 \`usedD2[r+c]\`
- 不冲突就「打标记 → 递归 → 撤销标记」三步走，这是回溯的标准写法；漏掉撤销会导致后续方案被错误地剪掉
- 生成一行棋盘：JS 用 \`'.'.repeat(c) + 'Q' + '.'.repeat(n-c-1)\`，Python 对应 \`'.' * c + 'Q' + '.' * (n-c-1)\`

ACM 版本算法相同，输出时每个方案打印 \`n\` 行，方案之间用 \`console.log('')\` / \`print()\` 空一行；无解时循环体一次都不执行，自然没有任何输出。
`,
};
