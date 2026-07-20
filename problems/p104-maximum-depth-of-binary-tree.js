// 104. 二叉树的最大深度
// 二叉树题：argSpec 用 { kind: 'tree' } 把层序数组（null 表空节点）构造成二叉树
export default {
  id: 104,
  title: '二叉树的最大深度',
  slug: 'maximum-depth-of-binary-tree',
  difficulty: 'easy',
  tags: ['树', '二叉树', '深度优先搜索', '广度优先搜索'],
  hints: [
    '关键观察：一棵非空二叉树的最大深度，等于左右子树最大深度的较大值再加上根节点这一层；空树深度为 0。',
    '采用后序深度优先搜索，让左右子树先返回各自的最大深度，再由当前节点合并结果；每个节点只访问一次。',
    '递归步骤：若 root 为 null 则返回 0，否则计算 leftDepth = maxDepth(root.left) 与 rightDepth = maxDepth(root.right)，返回 1 + Math.max(leftDepth, rightDepth)。',
    '实现时要覆盖空树和单节点树；ACM 模式先读取 n，n 为 0 时直接处理空树，否则把第二行的层序标记中 null 保留为空节点、其余转为数字，建树后输出一个整数深度。',
  ],

  description: `
给定一个二叉树的根节点 \`root\`，返回它的最大深度。

二叉树的**最大深度**是指从根节点到最远叶子节点的最长路径上的节点数。

### 示例

- 输入：\`root = [3,9,20,null,null,15,7]\`，输出：\`3\`
- 输入：\`root = [1,null,2]\`，输出：\`2\`
- 输入：\`root = []\`，输出：\`0\`

### 提示

- 树中节点的数量在 \`[0, 10^4]\` 范围内
- \`-100 <= Node.val <= 100\`

### ACM 模式输入输出格式

- 输入：第一行为整数 \`n\`（节点个数）；第二行为 \`n\` 个标记（空格分隔），每个标记是整数或 \`null\`，按层序给出整棵树（\`n = 0\` 时该行为空行）
- 输出：一个整数，即最大深度

ACM 输入示例：
\`\`\`
7
3 9 20 null null 15 7
\`\`\`
输出：\`3\`
`,

  functionName: 'maxDepth',
  compare: 'exact',
  argSpec: [{ kind: 'tree' }],

  tests: [
    { args: [[3, 9, 20, null, null, 15, 7]], expected: 3 },
    { args: [[1, null, 2]], expected: 2 },
    { args: [[]], expected: 0 },
    { args: [[0]], expected: 1 },
    { args: [[1, 2, 3, 4, 5]], expected: 3 },
    { args: [[1, 2, null, 3, null, 4]], expected: 4 },
    { args: [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]], expected: 4 },
    { args: [[1, 2, 3, 4, null, null, null, 5, null, 6]], expected: 5 },
    { args: [[-48, -85, -4, 38, -15, -67, 58, 93, -33, -47, 88, 39, null, -16, -35, -9, -15, null, -97, -3, -23, 55, -15, null, -57, -7, null, 83, 66, -25, null, -71, null, null, null, null, null, -66, -16, -93, 30, null, 40, null, null, 93, null, null, null, 72, -62, null, null, null, null, 55, 13, -46, -88, 92, -23, null, null, null, -50, null, 15, null, null, null, null, -45, 93, null, -93, 23, -76, 15, -56, null, 20, null, -42, null, null, null, null, 18, -43, 22, null, null, null, -84, -83, null, null, null, 60, -76, null, -46, null, -24, 41, 0, 72, null, null, -3, -6, null, 35, null, null, 20, 17, 27, null, -6, 27, null, 90, null, -86, -92, 75, 83, -85, 47, null, null, 73, -76, null, -21, -75, null, null, null, null, -51, null, 51, null, null, null, null, null, 25, null, -31, 27, null, null, null, null, -68, -10, null, 58, null, null, null, null, null, null, -50, 63, null, null, null, null, -30, null, 47, null, -64, -79, null, null, null, null, null, null, -26, -60, null, null, -72]], expected: 14 },
  ],

  acmTests: [
    { input: '7\n3 9 20 null null 15 7\n', output: '3\n' },
    { input: '3\n1 null 2\n', output: '2\n' },
    { input: '0\n\n', output: '0\n' },
    { input: '1\n0\n', output: '1\n' },
    { input: '5\n1 2 3 4 5\n', output: '3\n' },
    { input: '6\n1 2 null 3 null 4\n', output: '4\n' },
    { input: '15\n1 2 3 4 5 6 7 8 9 10 11 12 13 14 15\n', output: '4\n' },
    { input: '10\n1 2 3 4 null null null 5 null 6\n', output: '5\n' },
    { input: '190\n-48 -85 -4 38 -15 -67 58 93 -33 -47 88 39 null -16 -35 -9 -15 null -97 -3 -23 55 -15 null -57 -7 null 83 66 -25 null -71 null null null null null -66 -16 -93 30 null 40 null null 93 null null null 72 -62 null null null null 55 13 -46 -88 92 -23 null null null -50 null 15 null null null null -45 93 null -93 23 -76 15 -56 null 20 null -42 null null null null 18 -43 22 null null null -84 -83 null null null 60 -76 null -46 null -24 41 0 72 null null -3 -6 null 35 null null 20 17 27 null -6 27 null 90 null -86 -92 75 83 -85 47 null null 73 -76 null -21 -75 null null null null -51 null 51 null null null null null 25 null -31 27 null null null null -68 -10 null 58 null null null null null null -50 63 null null null null -30 null 47 null -64 -79 null null null null null null -26 -60 null null -72\n', output: '14\n' },
  ],

  templates: {
    core: {
      javascript: `/**
 * 二叉树节点：{ val: number, left: TreeNode | null, right: TreeNode | null }
 * @param {TreeNode} root
 * @return {number}
 */
var maxDepth = function(root) {
    
};
`,
      python: `def maxDepth(root):
    # root 为二叉树根节点（TreeNode），返回最大深度（整数）
    pass
`,
    },
    acm: {
      javascript: `// ACM 模式：input 是全部输入（字符串），用 console.log 输出答案
// 输入格式：第一行 n，第二行 n 个标记（整数或 null，层序；n = 0 时为空行）
const lines = input.split('\\n');
const n = Number(lines[0]);
const tokens = n > 0 ? lines[1].trim().split(/\\s+/) : [];

// 将层序标记构造成二叉树（节点为 { val, left, right }），计算最大深度后用 console.log 输出

`,
      python: `# ACM 模式：用 input() 或 sys.stdin 读输入，用 print 输出答案
# 输入格式：第一行 n，第二行 n 个标记（整数或 null，层序；n = 0 时为空行）
import sys

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

lines = sys.stdin.read().split('\\n')
n = int(lines[0])
tokens = lines[1].split() if n > 0 else []

# 将层序标记构造成二叉树（TreeNode），计算最大深度后用 print 输出
`,
    },
  },

  solutions: {
    core: {
      javascript: `var maxDepth = function(root) {
  if (root === null) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
};
`,
      python: `def maxDepth(root):
    if root is None:
        return 0
    return 1 + max(maxDepth(root.left), maxDepth(root.right))
`,
    },
    acm: {
      javascript: `const lines = input.split('\\n');
const n = Number(lines[0]);
const tokens = n > 0 ? lines[1].trim().split(/\\s+/) : [];
const arr = tokens.map((t) => (t === 'null' ? null : Number(t)));

// 层序数组构造二叉树
function buildTree(a) {
  if (a.length === 0 || a[0] === null) return null;
  const nodes = a.map((v) => (v === null ? null : { val: v, left: null, right: null }));
  let j = 1;
  for (let i = 0; i < nodes.length; i++) {
    if (nodes[i] === null) continue;
    if (j < nodes.length) nodes[i].left = nodes[j++];
    if (j < nodes.length) nodes[i].right = nodes[j++];
  }
  return nodes[0];
}

// 递归求最大深度
function maxDepth(root) {
  if (root === null) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}

console.log(maxDepth(buildTree(arr)));
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
arr = [None if t == 'null' else int(t) for t in tokens]

# 层序数组构造二叉树
def build_tree(a):
    if not a or a[0] is None:
        return None
    nodes = [None if v is None else TreeNode(v) for v in a]
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

# 递归求最大深度
def max_depth(root):
    if root is None:
        return 0
    return 1 + max(max_depth(root.left), max_depth(root.right))

print(max_depth(build_tree(arr)))
`,
    },
  },

  idea: `
**递归（深度优先搜索）**：空树的深度为 0；非空树的最大深度等于左右子树最大深度的较大值加 1。自顶向下递归，每个节点恰好访问一次。

**迭代（广度优先搜索）**：层序遍历，每处理完一层计数加 1，最终的层数就是最大深度。

两种方法时间复杂度都是 O(n)；空间复杂度 DFS 为 O(h)（递归栈，h 为树高），BFS 为 O(w)（队列，w 为最大层宽）。本题节点数最多 10^4，递归写法简洁且完全够用。
`,

  explanation: `
- 递归出口：\`root\` 为空时返回 0，这正好让叶子节点（左右孩子皆空）的深度为 1
- 递归体：分别求左右子树的最大深度，取较大值加 1 返回
- 答案自底向上汇聚：叶子返回 1，其父节点得到 2，一路向上直到根节点

ACM 版本多了两头的工作：

- 解析：把第二行的标记逐个转成数字或 \`null\`（\`n = 0\` 时第二行是空行，直接得到空数组）
- 建树：按层序数组构造二叉树——用游标 \`j\` 依次把后面的节点接到每个非空节点的左、右孩子上
- 建好后调用同一个递归函数，把结果打印出来
`,
};
