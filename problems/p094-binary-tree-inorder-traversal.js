// 94. 二叉树的中序遍历
// 树题示例：argSpec 告诉判题器把层序数组构造成二叉树（null 表示空节点）
export default {
  id: 94,
  title: '二叉树的中序遍历',
  slug: 'binary-tree-inorder-traversal',
  difficulty: 'easy',
  tags: ['树', '二叉树', '深度优先搜索'],
  hints: [
    '中序遍历的关键是访问当前节点的时机：必须在完整遍历左子树之后、遍历右子树之前记录节点值。',
    '可用递归深度优先搜索直接表达“左、根、右”，也可用显式栈模拟递归；两者都只访问每个节点一次。',
    '递归时遇到空节点立即返回，然后依次执行 dfs(node.left)、记录 node.val、dfs(node.right)，所有记录按顺序放入结果数组。',
    '空树应返回空数组；ACM 模式先按含 null 占位的层序标记构造树，再用空格连接遍历结果，空结果也要输出一个空行。',
  ],

  description: `
给定一个二叉树的根节点 \`root\`，返回它的中序遍历结果（左子树 → 根节点 → 右子树）。

### 示例

- 输入：\`root = [1,null,2,3]\`，输出：\`[1,3,2]\`
- 输入：\`root = []\`，输出：\`[]\`
- 输入：\`root = [1]\`，输出：\`[1]\`

### 提示

- 树中节点数目在范围 \`[0, 100]\` 内
- \`-100 <= Node.val <= 100\`

### ACM 模式输入输出格式

- 输入：第一行为整数 \`n\`（层序表示的长度）；第二行为 \`n\` 个标记（整数或 \`null\`，按层序给出，\`null\` 表示空节点；\`n = 0\` 时该行为空行）
- 输出：中序遍历结果（空格分隔；空树输出一个空行）

ACM 输入示例：
\`\`\`
4
1 null 2 3
\`\`\`
输出：\`1 3 2\`
`,

  functionName: 'inorderTraversal',
  compare: 'exact',
  argSpec: [{ kind: 'tree' }],

  tests: [
    { args: [[1, null, 2, 3]], expected: [1, 3, 2] },
    { args: [[]], expected: [] },
    { args: [[1]], expected: [1] },
    { args: [[1, 2, 3, 4, 5, null, 6]], expected: [4, 2, 5, 1, 3, 6] },
    { args: [[1, null, 2, null, 3, null, 4]], expected: [1, 2, 3, 4] },
    { args: [[-1, -2, -3]], expected: [-2, -1, -3] },
    { args: [[1, 2, null, 3, null, 4]], expected: [4, 3, 2, 1] },
    { args: [[1, 2, 3, 4, 5, 6, 7]], expected: [4, 2, 5, 1, 6, 3, 7] },
    { args: [[5, 5, 5, 5, 5]], expected: [5, 5, 5, 5, 5] },
    { args: [[52, 100, 62, 97, -38, -47, -34, 42, -78, 32, 80, -39, 30, 4, 42, -91, -63, 21, null, 65, 3, -66, 71, 69, 58, -64, -12, null, null, -35, -48, null, null, null, null, null, null, 66, 20, null, -14, -72, null, null, 44, null, null, -52, -90, null, null, null, -37, 23, null, -39, 95, 37, -67, null, null, 8, -81, null, null, null, null, -5, null, null, null, null, 50, null, -34, 85, -34, null, -28, 52, 13, null, -20, null, -95, null, null, -61, 21, null, null, null, null, null, null, -8, 11, 83, 53, -29, null, 69, null, 47, null, 29, null, null, -94, 92, 5, null, null, 4, -24, null, null, 62, -18, null, null, 24, null, null, -71, null, -70, 74, null, null, null, null, null, null, 5, null, null, null, -36, null, null, null, -21, null, null, null, null, null, null, 57, null, null, 44, null, null, null, -58]], expected: [-91, 42, -63, 97, 21, -78, 100, -29, 52, 37, 24, -21, 69, 13, 66, -67, 47, -71, -20, 65, 20, 32, 3, 8, 29, -70, -95, -14, -81, -38, -72, -66, 80, 71, 44, 52, 69, -39, -61, 74, -94, -5, 92, 21, 5, -52, 58, -90, -47, -64, 30, -12, -37, 50, 62, 4, -34, 23, -34, -35, 42, 85, -39, -8, -34, 4, 57, -58, 5, 11, -24, -48, 95, 83, -28, 62, -36, 44, 53, -18] },
  ],

  acmTests: [
    { input: '4\n1 null 2 3\n', output: '1 3 2\n' },
    { input: '0\n\n', output: '\n' },
    { input: '1\n1\n', output: '1\n' },
    { input: '6\n1 2 3 4 5 null 6\n', output: '4 2 5 1 3 6\n' },
    { input: '7\n1 null 2 null 3 null 4\n', output: '1 2 3 4\n' },
    { input: '3\n-1 -2 -3\n', output: '-2 -1 -3\n' },
    { input: '6\n1 2 null 3 null 4\n', output: '4 3 2 1\n' },
    { input: '7\n1 2 3 4 5 6 7\n', output: '4 2 5 1 6 3 7\n' },
    { input: '5\n5 5 5 5 5\n', output: '5 5 5 5 5\n' },
    { input: '157\n52 100 62 97 -38 -47 -34 42 -78 32 80 -39 30 4 42 -91 -63 21 null 65 3 -66 71 69 58 -64 -12 null null -35 -48 null null null null null null 66 20 null -14 -72 null null 44 null null -52 -90 null null null -37 23 null -39 95 37 -67 null null 8 -81 null null null null -5 null null null null 50 null -34 85 -34 null -28 52 13 null -20 null -95 null null -61 21 null null null null null null -8 11 83 53 -29 null 69 null 47 null 29 null null -94 92 5 null null 4 -24 null null 62 -18 null null 24 null null -71 null -70 74 null null null null null null 5 null null null -36 null null null -21 null null null null null null 57 null null 44 null null null -58\n', output: '-91 42 -63 97 21 -78 100 -29 52 37 24 -21 69 13 66 -67 47 -71 -20 65 20 32 3 8 29 -70 -95 -14 -81 -38 -72 -66 80 71 44 52 69 -39 -61 74 -94 -5 92 21 5 -52 58 -90 -47 -64 30 -12 -37 50 62 4 -34 23 -34 -35 42 85 -39 -8 -34 4 57 -58 5 11 -24 -48 95 83 -28 62 -36 44 53 -18\n' },
  ],

  templates: {
    core: {
      javascript: `/**
 * 二叉树节点：{ val: number, left: TreeNode | null, right: TreeNode | null }
 * @param {TreeNode} root
 * @return {number[]}
 */
var inorderTraversal = function(root) {
    
};
`,
      python: `def inorderTraversal(root):
    # root 为二叉树根节点（TreeNode），返回中序遍历结果列表
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
// 完成中序遍历后用 console.log 输出结果（空树输出一个空行）

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

# 按层序构造二叉树，完成中序遍历后用 print 输出结果（空树输出一个空行）
`,
    },
  },

  solutions: {
    core: {
      javascript: `var inorderTraversal = function(root) {
  const res = [];
  const dfs = function(node) {
    if (node === null) return;
    dfs(node.left);       // 左
    res.push(node.val);   // 根
    dfs(node.right);      // 右
  };
  dfs(root);
  return res;
};
`,
      python: `def inorderTraversal(root):
    res = []

    def dfs(node):
        if node is None:
            return
        dfs(node.left)      # 左
        res.append(node.val)  # 根
        dfs(node.right)     # 右

    dfs(root)
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

// 递归中序遍历
const out = [];
function inorder(node) {
  if (node === null) return;
  inorder(node.left);
  out.push(node.val);
  inorder(node.right);
}
inorder(root);
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

# 递归中序遍历
out = []
def inorder(node):
    if node is None:
        return
    inorder(node.left)
    out.append(str(node.val))
    inorder(node.right)

inorder(root)
print(' '.join(out))
`,
    },
  },

  idea: `
中序遍历的顺序是「左 → 根 → 右」，最自然的写法是**递归**：对每个节点，先递归遍历左子树，再访问节点本身，最后递归遍历右子树；空节点直接返回，这就是递归边界。

也可以用**迭代 + 显式栈**：一路把左链上的节点压栈，走到空就弹出栈顶访问、转向其右子树，效果与递归完全一致。

两种方法时间复杂度都是 O(n)（每个节点恰好访问一次），空间复杂度 O(h)（h 为树高，即递归栈或显式栈的最大深度）。
`,

  explanation: `
递归版非常直观，\`dfs(node)\` 严格按中序定义执行三步：

- 空节点直接返回（递归边界）
- 先 \`dfs(node.left)\` 遍历左子树
- 再把 \`node.val\` 追加到结果数组——「根」在左、右之间被访问，正是中序的定义
- 最后 \`dfs(node.right)\` 遍历右子树

ACM 版本多了输入构造工作：读入层序标记数组后，用「父节点按下标 \`i\` 顺序处理、子节点依次取 \`j\` 位置的标记」的方法把数组还原成二叉树（\`null\` 占位表示空节点，跳过不连边），再跑同样的中序遍历。空树时结果数组为空，\`join\` 后打印出一个空行，正好符合输出约定。
`,
};
