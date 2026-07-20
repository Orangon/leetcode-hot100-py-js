// 199. 二叉树的右视图
// 树题：argSpec 把层序数组构造成二叉树（null 表示空节点），返回整数数组
export default {
  id: 199,
  title: '二叉树的右视图',
  slug: 'binary-tree-right-side-view',
  difficulty: 'medium',
  tags: ['树', '深度优先搜索', '广度优先搜索', '二叉树'],
  hints: [
    '右视图恰好由每个深度上从右侧最先遇到的节点组成，即每层只需记录一个节点值。',
    '采用根、右、左顺序的深度优先搜索，让同一深度中更靠右的节点先于左侧节点被访问。',
    '维护结果数组并递归传入深度；若当前深度等于结果长度就追加节点值，再依次递归右子树和左子树。',
    '空节点应立即返回，空树结果为空；ACM 模式需按层序标记中的 null 建树，并将答案以空格连接，空树输出空行。',
  ],

  description: `
给定一个二叉树的根节点 \`root\`，想象自己站在它的**右侧**，按照从顶部到底部的顺序，返回从右侧所能看到的节点值。

### 示例

- 输入：\`root = [1,2,3,null,5,null,4]\`，输出：\`[1,3,4]\`
- 输入：\`root = [1,null,3]\`，输出：\`[1,3]\`
- 输入：\`root = []\`，输出：\`[]\`

### 提示

- 二叉树的节点个数的范围是 \`[0,100]\`
- \`-100 <= Node.val <= 100\`

### ACM 模式输入输出格式

- 输入：第一行为整数 \`n\`（层序表示的长度）；第二行为 \`n\` 个标记（整数或 \`null\`，按层序给出，\`null\` 表示空节点；\`n = 0\` 时该行为空行）
- 输出：右视图序列（空格分隔；空树输出一个空行）

ACM 输入示例：
\`\`\`
7
1 2 3 null 5 null 4
\`\`\`
输出：\`1 3 4\`
`,

  functionName: 'rightSideView',
  compare: 'exact',
  argSpec: [{ kind: 'tree' }],

  tests: [
    { args: [[1, 2, 3, null, 5, null, 4]], expected: [1, 3, 4] },
    { args: [[1, null, 3]], expected: [1, 3] },
    { args: [[]], expected: [] },
    { args: [[1, 2, 3, 4]], expected: [1, 3, 4] },
    { args: [[1, 2]], expected: [1, 2] },
    { args: [[-1, -2, -3]], expected: [-1, -3] },
    { args: [[1]], expected: [1] },
    { args: [[1, 2, null, 3, null, 4]], expected: [1, 2, 3, 4] },
    { args: [[1, 2, 3, 4, null, null, null, 5]], expected: [1, 3, 4, 5] },
    { args: [[-50, -64, -11, 90, -20, null, 83, 33, 75, null, -73, null, null, -30, -58, -23, -32, null, null, null, -53, -91, -95, null, -100, 11, 82, null, 11, 42, -34, -27, null, 96, null, null, 41, null, 44, -76, -65, 52, -30, null, 42, -56, null, null, 78, -6, null, null, null, -64, -27, 96, 32, -79, -66, -63, 75, -53, 78, -49, 55, 28, null, 85, null, -10, null, 77, -69, 29, 42, null, 32, null, null, -98, 64, -43, 50, null, null, -26, -72, -18, -38, -84, -97, -65, -5, null, -65, -16, null, 4, -43, -55, 57, -77, 85, null, 86, -92, null, 14, 62, null, -50, null, 62, 46, 0, -62, 58, -87, 74, 54, -38, -96, null, null, -38, null, null, null, -19, 94, 71, null, -51, null, null, 82, -5, 43, 35, 85, 71, -7, -76, 97, -14, -42, 53, null, null, 19, -96, null, null, -94, 43, 42, null, 83, null, 24, -45, 75, -66, 87, -86, 20, null, -4]], expected: [-50, -11, 83, -73, -32, 82, 44, -6, 85, -16, -5, -4] },
  ],

  acmTests: [
    { input: '7\n1 2 3 null 5 null 4\n', output: '1 3 4\n' },
    { input: '3\n1 null 3\n', output: '1 3\n' },
    { input: '0\n\n', output: '\n' },
    { input: '4\n1 2 3 4\n', output: '1 3 4\n' },
    { input: '2\n1 2\n', output: '1 2\n' },
    { input: '3\n-1 -2 -3\n', output: '-1 -3\n' },
    { input: '1\n1\n', output: '1\n' },
    { input: '6\n1 2 null 3 null 4\n', output: '1 2 3 4\n' },
    { input: '8\n1 2 3 4 null null null 5\n', output: '1 3 4 5\n' },
    { input: '168\n-50 -64 -11 90 -20 null 83 33 75 null -73 null null -30 -58 -23 -32 null null null -53 -91 -95 null -100 11 82 null 11 42 -34 -27 null 96 null null 41 null 44 -76 -65 52 -30 null 42 -56 null null 78 -6 null null null -64 -27 96 32 -79 -66 -63 75 -53 78 -49 55 28 null 85 null -10 null 77 -69 29 42 null 32 null null -98 64 -43 50 null null -26 -72 -18 -38 -84 -97 -65 -5 null -65 -16 null 4 -43 -55 57 -77 85 null 86 -92 null 14 62 null -50 null 62 46 0 -62 58 -87 74 54 -38 -96 null null -38 null null null -19 94 71 null -51 null null 82 -5 43 35 85 71 -7 -76 97 -14 -42 53 null null 19 -96 null null -94 43 42 null 83 null 24 -45 75 -66 87 -86 20 null -4\n', output: '-50 -11 83 -73 -32 82 44 -6 85 -16 -5 -4\n' },
  ],

  templates: {
    core: {
      javascript: `/**
 * 二叉树节点：{ val: number, left: TreeNode | null, right: TreeNode | null }
 * @param {TreeNode} root
 * @return {number[]}
 */
var rightSideView = function(root) {
    
};
`,
      python: `def rightSideView(root):
    # root 为二叉树根节点（TreeNode），返回从右侧看到的节点值列表
    pass
`,
    },
    acm: {
      javascript: `// ACM 模式：input 是全部输入（字符串），用 console.log 输出答案
// 输入格式：第一行 n，第二行 n 个标记（整数或 null，层序；n = 0 时该行为空行）
const lines = input.split('\\n');
const n = Number(lines[0]);
const tokens = n > 0 ? lines[1].trim().split(/\\s+/) : [];

// 按层序构造二叉树（节点为 { val, left, right } 对象，null 表示空节点），
// 求出右视图后用 console.log 输出（空树输出一个空行）

`,
      python: `# ACM 模式：用 input() 或 sys.stdin 读输入，用 print 输出答案
# 输入格式：第一行 n，第二行 n 个标记（整数或 null，层序；n = 0 时该行为空行）
import sys

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

lines = sys.stdin.read().split('\\n')
n = int(lines[0])
tokens = lines[1].split() if n > 0 else []

# 按层序构造二叉树，求出右视图后用 print 输出（空树输出一个空行）
`,
    },
  },

  solutions: {
    core: {
      javascript: `var rightSideView = function(root) {
  const res = [];
  const dfs = function(node, depth) {
    if (node === null) return;
    // 按「根 → 右 → 左」遍历：每层第一个被访问到的节点就是最右侧节点
    if (depth === res.length) res.push(node.val);
    dfs(node.right, depth + 1);
    dfs(node.left, depth + 1);
  };
  dfs(root, 0);
  return res;
};
`,
      python: `def rightSideView(root):
    res = []

    def dfs(node, depth):
        if node is None:
            return
        # 按「根 → 右 → 左」遍历：每层第一个被访问到的节点就是最右侧节点
        if depth == len(res):
            res.append(node.val)
        dfs(node.right, depth + 1)
        dfs(node.left, depth + 1)

    dfs(root, 0)
    return res
`,
    },
    acm: {
      javascript: `const lines = input.split('\\n');
const n = Number(lines[0]);
const tokens = n > 0 ? lines[1].trim().split(/\\s+/) : [];

// 按层序构造二叉树（null 表示空节点）
function buildTree(tokens) {
  if (tokens.length === 0 || tokens[0] === 'null') return null;
  const nodes = tokens.map(function(t) {
    return t === 'null' ? null : { val: Number(t), left: null, right: null };
  });
  let j = 1;
  for (let i = 0; i < nodes.length; i++) {
    if (nodes[i] === null) continue;
    if (j < nodes.length) nodes[i].left = nodes[j++];
    if (j < nodes.length) nodes[i].right = nodes[j++];
  }
  return nodes[0];
}
const root = buildTree(tokens);

// 「根 → 右 → 左」DFS：每层第一个被访问到的节点即为右视图的一员
const out = [];
function dfs(node, depth) {
  if (node === null) return;
  if (depth === out.length) out.push(node.val);
  dfs(node.right, depth + 1);
  dfs(node.left, depth + 1);
}
dfs(root, 0);
console.log(out.join(' '));
`,
      python: `import sys

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

lines = sys.stdin.read().split('\\n')
n = int(lines[0])
tokens = lines[1].split() if n > 0 else []

# 按层序构造二叉树（null 表示空节点）
def build_tree(tokens):
    if not tokens or tokens[0] == 'null':
        return None
    nodes = [None if t == 'null' else TreeNode(int(t)) for t in tokens]
    j = 1
    for i in range(len(nodes)):
        if nodes[i] is None:
            continue
        if j < len(nodes):
            nodes[i].left = nodes[j]
            j += 1
        if j < len(nodes):
            nodes[i].right = nodes[j]
            j += 1
    return nodes[0]

root = build_tree(tokens)

# 「根 → 右 → 左」DFS：每层第一个被访问到的节点即为右视图的一员
out = []
def dfs(node, depth):
    if node is None:
        return
    if depth == len(out):
        out.append(str(node.val))
    dfs(node.right, depth + 1)
    dfs(node.left, depth + 1)

dfs(root, 0)
print(' '.join(out))
`,
    },
  },

  idea: `
右视图就是「每层最右边的节点」按深度从上到下组成的序列，两种遍历都能做：

**广度优先搜索（BFS）**：逐层遍历，把每一层最后一个出队的节点值记入答案。

**深度优先搜索（DFS，参考答案采用）**：按「根 → 右子树 → 左子树」的顺序遍历，并带上当前深度。由于每一层总是右边先被访问，**每层第一个被访问到的节点**就是该层从右侧能看到的节点——当 \`depth == res.length\`（这一层还没记录过）时，把节点值加入结果即可。

两种方法时间复杂度都是 O(n)；空间上 BFS 为 O(w)（最大层宽），DFS 为 O(h)（树高，即递归栈深度）。
`,

  explanation: `
- \`dfs(node, depth)\` 按「根 → 右 → 左」的顺序递归，\`res\` 的下标与深度一一对应
- 核心判断 \`depth === res.length\`：\`res\` 的长度等于已记录答案的层数，二者相等说明当前节点是它所在层第一个被访问的节点；又因为右子树总是先被访问，这个「第一个」一定是最右侧节点
- 无论是否记录，右、左子树都要继续递归：只有左孩子的链（如 \`[1,2]\`）需要靠左孩子把更深层的答案补出来
- 空树时递归入口直接返回，\`res\` 为空；ACM 版本对空数组 \`join\` 后打印出一个空行，正好符合输出约定
- ACM 版本先从层序标记数组还原二叉树，再跑同样的 DFS 逻辑
`,
};
