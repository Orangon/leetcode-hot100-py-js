// 543. 二叉树的直径
// 二叉树题：argSpec 用 { kind: 'tree' } 把层序数组（null 表空节点）构造成二叉树
export default {
  id: 543,
  title: '二叉树的直径',
  slug: 'diameter-of-binary-tree',
  difficulty: 'easy',
  tags: ['树', '深度优先搜索', '二叉树'],
  hints: [
    '任意最长路径都有一个最高节点；若其左右子树高度按节点数计算，则经过该节点的路径边数恰为左高加右高。',
    '采用后序深度优先搜索，在返回子树高度的同时，用每个节点的左高与右高之和更新全局直径。',
    '令 depth(null) = 0；递归得到 l 和 r 后执行 ans = max(ans, l + r)，再向父节点返回 max(l, r) + 1。',
    '直径统计的是边数而不是节点数，单节点树和空树都返回 0；ACM 模式需处理 n = 0 的空行以及层序序列中的 null 标记。',
  ],

  description: `
给你一棵二叉树的根节点 \`root\`，返回该树的**直径**。

二叉树的**直径**是指树中任意两个节点之间最长路径的**长度**（以边数计）。这条路径可能穿过也可能不穿过根节点。

两节点之间路径的长度等于它们之间边的数目。

### 示例

- 输入：\`root = [1,2,3,4,5]\`，输出：\`3\`（最长路径为 4-2-1-3 或 5-2-1-3，长度为 3 条边）
- 输入：\`root = [1,2]\`，输出：\`1\`
- 输入：\`root = []\`，输出：\`0\`

（数组为二叉树的层序遍历表示，\`null\` 表示空节点）

### 提示

- 树中节点数目在范围 \`[0, 10^4]\` 内
- \`-100 <= Node.val <= 100\`

### ACM 模式输入输出格式

- 输入：第一行为整数 \`n\`（层序序列长度）；第二行为 \`n\` 个标记（空格分隔），每个标记为整数或 \`null\`，按层序描述二叉树（\`n = 0\` 时该行为空行，表示空树）
- 输出：一个整数，即直径（空树输出 \`0\`）

ACM 输入示例：
\`\`\`
5
1 2 3 4 5
\`\`\`
输出：\`3\`
`,

  functionName: 'diameterOfBinaryTree',
  compare: 'exact',
  argSpec: [{ kind: 'tree' }],

  tests: [
    { args: [[1, 2, 3, 4, 5]], expected: 3 },
    { args: [[1, 2]], expected: 1 },
    { args: [[]], expected: 0 },
    { args: [[1]], expected: 0 },
    { args: [[1, 2, null, 4, 5, 6, null, null, 7, 8, null, null, 9]], expected: 6 },
    { args: [[-1, -2, -3]], expected: 2 },
    { args: [[1, 2, null, 3, null, 4, null, 5]], expected: 4 },
    { args: [[1, 2, 3, 4, 5, null, null, 6, null, null, 7, null, null, null, 8]], expected: 5 },
    { args: [[1, null, 2, null, 3, null, 4]], expected: 3 },
    { args: [[33, 64, 78, 29, 99, null, 65, 58, 59, 7, 81, 27, 38, 46, 5, 15, 7, 40, 74, 86, 42, 74, 34, 75, 65, null, 27, null, 32, 6, 67, 34, 54, 68, 62, null, 27, null, null, 75, 16, 19, 78, 57, 46, 98, 12, null, null, null, null, null, null, null, null, 36, 86, 32, null, 62, null, 45, 68, 22, 8, 5, 30, null, null, 82, 54, 22, 74, 98, 20, 11, 83, null, null, null, 83, null, null, 58, 93, 3, 31, 38, 86, null, null, null, null, null, 52, null, null, 85, 49, null, null, 15, 98, 50, 63, null, null, 48, 27, 43, 98, 22, 91, 61, 93, 55, 14, 1, 22, null, null, null, null, null, null, 84, 62, null, null, 37, 94, null, null, null, null, null, null, 47, 14, null, null, null, null, 42, 55, 72, 26, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 10, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 15, null, null, null, null, null, null, 87, 1, 35]], expected: 19 },
  ],

  acmTests: [
    { input: '5\n1 2 3 4 5\n', output: '3\n' },
    { input: '2\n1 2\n', output: '1\n' },
    { input: '0\n\n', output: '0\n' },
    { input: '1\n0\n', output: '0\n' },
    { input: '13\n1 2 null 4 5 6 null null 7 8 null null 9\n', output: '6\n' },
    { input: '3\n-1 -2 -3\n', output: '2\n' },
    { input: '8\n1 2 null 3 null 4 null 5\n', output: '4\n' },
    { input: '15\n1 2 3 4 5 null null 6 null null 7 null null null 8\n', output: '5\n' },
    { input: '7\n1 null 2 null 3 null 4\n', output: '3\n' },
    { input: '194\n33 64 78 29 99 null 65 58 59 7 81 27 38 46 5 15 7 40 74 86 42 74 34 75 65 null 27 null 32 6 67 34 54 68 62 null 27 null null 75 16 19 78 57 46 98 12 null null null null null null null null 36 86 32 null 62 null 45 68 22 8 5 30 null null 82 54 22 74 98 20 11 83 null null null 83 null null 58 93 3 31 38 86 null null null null null 52 null null 85 49 null null 15 98 50 63 null null 48 27 43 98 22 91 61 93 55 14 1 22 null null null null null null 84 62 null null 37 94 null null null null null null 47 14 null null null null 42 55 72 26 null null null null null null null null null null null null null null null null 10 null null null null null null null null null null null null null null null null null null null null 15 null null null null null null 87 1 35\n', output: '19\n' },
  ],

  templates: {
    core: {
      javascript: `/**
 * 二叉树节点：{ val: number, left: TreeNode | null, right: TreeNode | null }
 * @param {TreeNode} root
 * @return {number} 直径（边数）
 */
var diameterOfBinaryTree = function(root) {
    
};
`,
      python: `def diameterOfBinaryTree(root):
    # root 为二叉树根节点（TreeNode），返回直径（边数，整数）
    pass
`,
    },
    acm: {
      javascript: `// ACM 模式：input 是全部输入（字符串），用 console.log 输出答案
// 输入格式：第一行 n，第二行 n 个标记（整数或 null，层序；n = 0 时为空行）
// 输出：一个整数，即直径（空树输出 0）
const lines = input.split('\\n');
const n = Number(lines[0]);
const tokens = n > 0 ? lines[1].trim().split(/\\s+/) : [];
const arr = tokens.map((t) => (t === 'null' ? null : Number(t)));

// 将层序标记构造成二叉树（节点为 { val, left, right }），计算直径后用 console.log 输出

`,
      python: `# ACM 模式：用 input() 或 sys.stdin 读输入，用 print 输出答案
# 输入格式：第一行 n，第二行 n 个标记（整数或 null，层序；n = 0 时为空行）
# 输出：一个整数，即直径（空树输出 0）
import sys

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

lines = sys.stdin.read().split('\\n')
n = int(lines[0])
tokens = lines[1].split() if n > 0 else []
arr = [None if t == 'null' else int(t) for t in tokens]

# 将层序标记构造成二叉树（TreeNode），计算直径后用 print 输出
`,
    },
  },

  solutions: {
    core: {
      javascript: `var diameterOfBinaryTree = function(root) {
  let ans = 0;
  // 返回以 node 为根的子树高度（节点数），顺带更新直径
  const depth = function(node) {
    if (node === null) return 0;
    const l = depth(node.left);
    const r = depth(node.right);
    ans = Math.max(ans, l + r); // 经过 node 的最长路径 = 左高 + 右高（边数）
    return Math.max(l, r) + 1;
  };
  depth(root);
  return ans;
};
`,
      python: `def diameterOfBinaryTree(root):
    ans = 0

    # 返回以 node 为根的子树高度（节点数），顺带更新直径
    def depth(node):
        nonlocal ans
        if node is None:
            return 0
        l = depth(node.left)
        r = depth(node.right)
        ans = max(ans, l + r)  # 经过 node 的最长路径 = 左高 + 右高（边数）
        return max(l, r) + 1

    depth(root)
    return ans
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

let ans = 0;
// 返回子树高度（节点数），顺带更新直径
function depth(node) {
  if (node === null) return 0;
  const l = depth(node.left);
  const r = depth(node.right);
  ans = Math.max(ans, l + r);
  return Math.max(l, r) + 1;
}

depth(buildTree(arr));
console.log(ans);
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

ans = 0

# 返回子树高度（节点数），顺带更新直径
def depth(node):
    global ans
    if node is None:
        return 0
    l = depth(node.left)
    r = depth(node.right)
    ans = max(ans, l + r)
    return max(l, r) + 1

depth(build_tree(arr))
print(ans)
`,
    },
  },

  idea: `
关键观察：经过某个节点的最长路径长度 = 该节点左子树高度 + 右子树高度（高度以边数计）。

而任意两个节点之间的路径，必然存在「最高点」（路径上深度最小的节点），这条路径就是「经过该最高点的最长路径」。所以：

直径 = 所有节点的「左子树高度 + 右子树高度」的最大值

用一次后序遍历即可算出：递归函数 \`depth(node)\` 返回以 node 为根的子树高度，返回前用「左高 + 右高」更新全局最大值。

时间复杂度 O(n)（每个节点访问一次）；空间复杂度 O(h)（递归栈，h 为树高）。
`,

  explanation: `
- \`depth\` 返回的是「以 node 为根的子树高度（按节点数计）」：空节点返回 0，叶子节点返回 1
- 更新答案用 \`l + r\`：左、右子树的节点数高度，正好分别等于 node 向左、向右能走到的最长边数，两者之和就是「经过 node 的最长路径的边数」
- 最大值记录在闭包变量 \`ans\` 上（Python 里用 \`nonlocal\` / \`global\` 声明后才能修改），每个节点都尝试刷新它
- 最后返回的是 \`ans\`，而不是根节点处的 \`l + r\`——因为直径不一定经过根节点（例如最长路径完全位于某棵很深的子树内部）
- 空树时 \`depth\` 立即返回 0，\`ans\` 保持 0，符合题意

ACM 版本多了建树的工作：把层序标记转成节点对象，再跑同一个后序递归，最后把 \`ans\` 打印出来。
`,
};
