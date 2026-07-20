// 226. 翻转二叉树
// 二叉树题：argSpec 用 tree 把层序数组构造成二叉树，resultKind 把返回的树序列化成层序数组再比对
export default {
  id: 226,
  title: '翻转二叉树',
  slug: 'invert-binary-tree',
  difficulty: 'easy',
  tags: ['树', '二叉树', '深度优先搜索'],
  hints: [
    '翻转整棵二叉树等价于对每个非空节点交换左右子树，子树内部也必须递归完成同样的交换。',
    '可采用深度优先搜索递归处理：先翻转左右子树，再将两个递归结果分别接到当前节点的右侧和左侧。',
    '伪代码：若节点为空则返回 null；left = invert(node.left)，right = invert(node.right)；令 node.left = right、node.right = left，最后返回 node。',
    '空树应直接返回并在 ACM 模式输出空行；层序输出要保留结构中间的 null，但删除末尾无助于表示树形的 null。',
  ],

  description: `
给你一棵二叉树的根节点 \`root\`，翻转这棵二叉树，并返回其根节点。

翻转即交换每个节点的左右子树：每个节点的左子树变成右子树，右子树变成左子树。

### 示例

- 输入：\`root = [4,2,7,1,3,6,9]\`，输出：\`[4,7,2,9,6,3,1]\`
- 输入：\`root = [2,1,3]\`，输出：\`[2,3,1]\`
- 输入：\`root = []\`，输出：\`[]\`

（数组为二叉树的层序遍历表示，\`null\` 表示空节点）

### 提示

- 树中节点数目范围在 \`[0, 100]\` 内
- \`-100 <= Node.val <= 100\`

### ACM 模式输入输出格式

- 输入：第一行为整数 \`n\`（层序序列长度）；第二行为 \`n\` 个标记（空格分隔），每个标记为整数或 \`null\`，按层序描述二叉树（\`n = 0\` 时该行为空行，表示空树）
- 输出：翻转后二叉树的层序序列（空格分隔）；为表结构完整，序列中间的 \`null\` 保留，末尾的 \`null\` 省略；空树输出一个空行

ACM 输入示例：
\`\`\`
7
4 2 7 1 3 6 9
\`\`\`
输出：\`4 7 2 9 6 3 1\`
`,

  functionName: 'invertTree',
  compare: 'exact',
  argSpec: [{ kind: 'tree' }],
  resultKind: 'tree',

  tests: [
    { args: [[4, 2, 7, 1, 3, 6, 9]], expected: [4, 7, 2, 9, 6, 3, 1] },
    { args: [[2, 1, 3]], expected: [2, 3, 1] },
    { args: [[]], expected: [] },
    { args: [[1]], expected: [1] },
    { args: [[1, 2, null, 3]], expected: [1, null, 2, null, 3] },
    { args: [[-1, -2, -3]], expected: [-1, -3, -2] },
    { args: [[1, null, 2, null, 3]], expected: [1, 2, null, 3] },
    { args: [[1, 2, 3, null, 4, 5, null]], expected: [1, 3, 2, null, 5, 4] },
    { args: [[0, 0, 0]], expected: [0, 0, 0] },
    { args: [[58, -71, 67, -75, -90, 68, -99, 87, -29, 52, 42, 92, -74, null, -38, null, null, 67, -70, 85, 92, 3, 83, -20, null, 7, -83, null, null, null, null, -89, 41, null, null, null, null, -62, 16, 79, -21, null, -88, -31, 90, -64, null, null, null, null, null, -74, -55, -68, 30, 60, -97, -49, null, -20, 52, null, -67, 69, null, null, null, -63, 98, null, null, null, -77, -75, -88, 27, null, -78, null, 8, null, null, null, 89, null, null, 20, null, null, null, 55, 45, null, 23, -25, null, -41, null, null, null, null, null, -36, -81, -92, -92, null, null, null, null, -76, null, 93, null, 51, -81, -87, null, null, null, null, null, -82, null, -57, -59, null, -28, null, 85, 15, null, null, 86, null, -92, null, null, null, null, null, null, null, null, 12, null, null, null, null, null, -69, null, 41, null, null, 20]], expected: [58, 67, -71, -99, 68, -90, -75, -38, null, -74, 92, 42, 52, -29, 87, null, null, -83, 7, null, -20, 83, 3, 92, 85, -70, 67, null, null, null, -64, 90, -31, -88, null, -21, 79, 16, -62, null, null, null, null, 41, -89, null, null, null, null, null, 69, -67, null, 52, -20, null, -49, -97, 60, 30, -68, -55, -74, null, null, null, null, null, null, 20, null, null, 89, null, null, null, 8, null, -78, null, 27, -88, -75, -77, null, null, null, 98, -63, null, null, null, -92, -92, -81, -36, null, null, null, null, null, -41, null, -25, 23, null, 45, 55, null, null, -59, -57, null, -82, null, null, null, null, null, -87, -81, 51, null, 93, null, -76, null, null, null, null, null, null, null, null, -92, null, 86, null, null, 15, 85, null, -28, 41, null, -69, null, null, null, null, null, 12, null, null, null, null, 20] },
  ],

  acmTests: [
    { input: '7\n4 2 7 1 3 6 9\n', output: '4 7 2 9 6 3 1\n' },
    { input: '3\n2 1 3\n', output: '2 3 1\n' },
    { input: '0\n\n', output: '\n' },
    { input: '1\n1\n', output: '1\n' },
    { input: '4\n1 2 null 3\n', output: '1 null 2 null 3\n' },
    { input: '3\n-1 -2 -3\n', output: '-1 -3 -2\n' },
    { input: '5\n1 null 2 null 3\n', output: '1 2 null 3\n' },
    { input: '7\n1 2 3 null 4 5 null\n', output: '1 3 2 null 5 4\n' },
    { input: '3\n0 0 0\n', output: '0 0 0\n' },
    { input: '156\n58 -71 67 -75 -90 68 -99 87 -29 52 42 92 -74 null -38 null null 67 -70 85 92 3 83 -20 null 7 -83 null null null null -89 41 null null null null -62 16 79 -21 null -88 -31 90 -64 null null null null null -74 -55 -68 30 60 -97 -49 null -20 52 null -67 69 null null null -63 98 null null null -77 -75 -88 27 null -78 null 8 null null null 89 null null 20 null null null 55 45 null 23 -25 null -41 null null null null null -36 -81 -92 -92 null null null null -76 null 93 null 51 -81 -87 null null null null null -82 null -57 -59 null -28 null 85 15 null null 86 null -92 null null null null null null null null 12 null null null null null -69 null 41 null null 20\n', output: '58 67 -71 -99 68 -90 -75 -38 null -74 92 42 52 -29 87 null null -83 7 null -20 83 3 92 85 -70 67 null null null -64 90 -31 -88 null -21 79 16 -62 null null null null 41 -89 null null null null null 69 -67 null 52 -20 null -49 -97 60 30 -68 -55 -74 null null null null null null 20 null null 89 null null null 8 null -78 null 27 -88 -75 -77 null null null 98 -63 null null null -92 -92 -81 -36 null null null null null -41 null -25 23 null 45 55 null null -59 -57 null -82 null null null null null -87 -81 51 null 93 null -76 null null null null null null null null -92 null 86 null null 15 85 null -28 41 null -69 null null null null null 12 null null null null 20\n' },
  ],

  templates: {
    core: {
      javascript: `/**
 * 二叉树节点：{ val: number, left: TreeNode | null, right: TreeNode | null }
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var invertTree = function(root) {
    
};
`,
      python: `def invertTree(root):
    # root 为二叉树根节点（TreeNode），返回翻转后的根节点
    pass
`,
    },
    acm: {
      javascript: `// ACM 模式：input 是全部输入（字符串），用 console.log 输出答案
// 输入格式：第一行 n，第二行 n 个标记（整数或 null，层序；n = 0 时为空行）
const lines = input.split('\\n');
const n = Number(lines[0]);
const tokens = n > 0 ? lines[1].trim().split(/\\s+/) : [];
const arr = tokens.map((t) => (t === 'null' ? null : Number(t)));

// 按层序数组 arr 构造二叉树，翻转后按层序输出（null 保留、末尾 null 省略）

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
arr = [None if t == 'null' else int(t) for t in tokens]

# 按层序数组 arr 构造二叉树，翻转后按层序输出（null 保留、末尾 null 省略）
`,
    },
  },

  solutions: {
    core: {
      javascript: `var invertTree = function(root) {
  if (root === null) return null;
  const left = invertTree(root.left);   // 先翻转左子树
  const right = invertTree(root.right); // 再翻转右子树
  root.left = right;  // 交换左右子树
  root.right = left;
  return root;
};
`,
      python: `def invertTree(root):
    if root is None:
        return None
    left = invertTree(root.left)    # 先翻转左子树
    right = invertTree(root.right)  # 再翻转右子树
    root.left = right   # 交换左右子树
    root.right = left
    return root
`,
    },
    acm: {
      javascript: `const lines = input.split('\\n');
const n = Number(lines[0]);
const tokens = n > 0 ? lines[1].trim().split(/\\s+/) : [];
const arr = tokens.map((t) => (t === 'null' ? null : Number(t)));

// 按层序数组构造二叉树
let root = null;
if (arr.length > 0 && arr[0] !== null) {
  const nodes = arr.map((v) => (v === null ? null : { val: v, left: null, right: null }));
  let j = 1;
  for (let i = 0; i < nodes.length; i++) {
    if (nodes[i] === null) continue;
    if (j < nodes.length) nodes[i].left = nodes[j++] || null;
    if (j < nodes.length) nodes[i].right = nodes[j++] || null;
  }
  root = nodes[0];
}

// 递归翻转
function invert(node) {
  if (node === null) return null;
  const left = invert(node.left);
  const right = invert(node.right);
  node.left = right;
  node.right = left;
  return node;
}
invert(root);

// 层序序列化：中间 null 保留，末尾 null 省略
const out = [];
if (root !== null) {
  const queue = [root];
  while (queue.length > 0) {
    const node = queue.shift();
    if (node === null) {
      out.push('null');
    } else {
      out.push(String(node.val));
      queue.push(node.left);
      queue.push(node.right);
    }
  }
  while (out.length > 0 && out[out.length - 1] === 'null') out.pop();
}
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
arr = [None if t == 'null' else int(t) for t in tokens]

# 按层序数组构造二叉树
root = None
if arr and arr[0] is not None:
    nodes = [None if v is None else TreeNode(v) for v in arr]
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
    root = nodes[0]

# 递归翻转
def invert(node):
    if node is None:
        return None
    left = invert(node.left)
    right = invert(node.right)
    node.left = right
    node.right = left
    return node

invert(root)

# 层序序列化：中间 null 保留，末尾 null 省略
out = []
if root is not None:
    queue = [root]
    while queue:
        node = queue.pop(0)
        if node is None:
            out.append('null')
        else:
            out.append(str(node.val))
            queue.append(node.left)
            queue.append(node.right)
    while out and out[-1] == 'null':
        out.pop()
print(' '.join(out))
`,
    },
  },

  idea: `
翻转二叉树是一个天然的递归（深度优先搜索）问题：要翻转以 \`root\` 为根的树，只需先分别翻转它的左子树和右子树，再交换这两个子树即可。

递归边界：空节点无需翻转，直接返回 \`null\`。

也可以用广度优先搜索（层序遍历）迭代完成：遍历到每个节点时交换它的左右孩子，效果完全相同。

两种写法时间复杂度都是 O(n)（每个节点访问一次）；空间复杂度取决于树高，递归（DFS）为 O(h) 的调用栈，BFS 最坏 O(n)。
`,

  explanation: `
- \`if (root === null) return null;\`：递归出口，空树翻转后仍为空树
- \`invertTree(root.left)\` 与 \`invertTree(root.right)\`：先把两棵子树各自翻转好（子问题）
- \`root.left = right; root.right = left;\`：交换翻转后的左右子树，注意必须先用临时变量接住两个返回值再赋值，直接 \`root.left = invertTree(root.right)\` 之类的连写会读不到原始子树
- 最后返回 \`root\`，整棵树已就地翻转

ACM 版本在核心逻辑前后各加了一段序列化工作：读入时按层序数组构造二叉树（用游标 \`j\` 依次为每个非空节点分配左右孩子），翻转后再层序遍历输出——遍历时把空节点记为 \`'null'\` 保留结构信息，最后删掉末尾多余的 \`'null'\`。空树时 \`out\` 为空数组，\`join\` 得到空串，正好输出一个空行。
`,
};
