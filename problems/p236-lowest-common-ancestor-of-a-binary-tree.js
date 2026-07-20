// 236. 二叉树的最近公共祖先
// treeNode 类型示例：p、q 由判题器在树参数中按值定位（节点值互不相同），resultKind 取返回节点的 val
export default {
  id: 236,
  title: '二叉树的最近公共祖先',
  slug: 'lowest-common-ancestor-of-a-binary-tree',
  difficulty: 'medium',
  tags: ['树', '深度优先搜索', '二叉树'],
  hints: [
    '从一棵子树向上汇报：若其中找到了 p 或 q，就把找到的真实节点交给父层继续判断。',
    '后序递归左右子树；若左右结果都非空，说明 p、q 分居两侧，当前根节点就是最近公共祖先。',
    '递归出口是 root 为空或 root 与 p/q 是同一对象；只有一侧非空时原样返回该侧结果。',
    '题目要求返回输入树中的节点对象，不能只按答案值新建一个伪节点；节点值相同也不满足对象身份契约。',
  ],

  description: `
给定一个二叉树，找到该树中两个指定节点的**最近公共祖先**（LCA）。

最近公共祖先的定义为：对于有根树中的两个节点 \`p\`、\`q\`，最近公共祖先是同时以 \`p\` 和 \`q\` 为后代（**允许一个节点是自身的后代**）的节点中深度最大的那个。

### 示例

- 输入：\`root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1\`，输出：\`3\`（节点 5 和节点 1 的最近公共祖先是节点 3）
- 输入：\`root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4\`，输出：\`5\`（一个节点可以是它自己的祖先）
- 输入：\`root = [1,2], p = 1, q = 2\`，输出：\`1\`

### 提示

- 树中节点数目在范围 \`[2, 10^5]\` 内
- \`-10^9 <= Node.val <= 10^9\`
- 所有节点的值**互不相同**
- \`p != q\`，且 \`p\` 和 \`q\` 均存在于树中

### ACM 模式输入输出格式

- 输入：第一行为整数 \`n\`（节点个数）；第二行为 \`n\` 个标记（空格分隔），每个标记是整数或 \`null\`，按层序给出整棵树；第三行为 \`p\` 的值；第四行为 \`q\` 的值
- 输出：一个整数，即最近公共祖先节点的值

ACM 输入示例：
\`\`\`
11
3 5 1 6 2 0 8 null null 7 4
5
1
\`\`\`
输出：\`3\`
`,

  functionName: 'lowestCommonAncestor',
  compare: 'exact',
  argSpec: [{ kind: 'tree' }, { kind: 'treeNode', treeArg: 0 }, { kind: 'treeNode', treeArg: 0 }],
  resultKind: 'nodeVal',
  judgeContract: { returnNodeFromTreeArg: 0 },

  tests: [
    { args: [[3, 5, 1, 6, 2, 0, 8, null, null, 7, 4], 5, 1], expected: 3 },
    { args: [[3, 5, 1, 6, 2, 0, 8, null, null, 7, 4], 5, 4], expected: 5 },
    { args: [[1, 2], 1, 2], expected: 1 },
    { args: [[3, 5, 1, 6, 2, 0, 8, null, null, 7, 4], 7, 8], expected: 3 },
    { args: [[3, 5, 1, 6, 2, 0, 8, null, null, 7, 4], 6, 2], expected: 5 },
    { args: [[2, 1], 2, 1], expected: 2 },
    { args: [[1, 2, null, 3, null, 4, null, 5], 4, 5], expected: 4 },
    { args: [[-1, 0, 3, -2, 4, null, null, 8], 8, 4], expected: 0 },
    { args: [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], 9, 11], expected: 2 },
    { args: [[933,630,-531,592,-417,-791,316,-291,750,179,331,943,-622,null,null,-279,708,667,63,-764,423,255,-724,664,411,877,108,534,-841,234,null,-309,362,null,null,989,311,430,-418,null,null,null,null,297,735,-269,-823,-981,-112,null,null,null,null,null,null,93,337,-83,2,null,null,659,221,-132,491,-865,-355,null,null,null,null,null,null,null,null,null,null,981,null,-193,-416,-448,527,null,null,-214,null,584,null,-35,-22,-387,-736,-325,975,822,225,291,null,903,-778,62,503,null,null,-207,null,null,null,null,null,null,null,null,null,250,-963,-888,828,88,null,null,null,189,null,null,null,180,627,-630,864,675,null,7,-159,367,-334,-840,102,null,null,null,null,-766,-443,100,-488,-978,-559,369,null,null,null,-96,-241,451,-779,-310,null,202,null,null,null,-283,886,null,null,-258,-789,null,null,390,null,-275,null,null,null,null,null,57,null,-262,-107,495,null,-835,null,375,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,-836,null,-830,null,null,null,null,null,null,null,null,null,953,null,null,null,null,null,null,null,-57,null,null,null,null,null,-768,null,null,null,-380,null,-958], -778, -355], expected: -355 },
  ],

  acmTests: [
    { input: '11\n3 5 1 6 2 0 8 null null 7 4\n5\n1\n', output: '3\n' },
    { input: '11\n3 5 1 6 2 0 8 null null 7 4\n5\n4\n', output: '5\n' },
    { input: '2\n1 2\n1\n2\n', output: '1\n' },
    { input: '11\n3 5 1 6 2 0 8 null null 7 4\n7\n8\n', output: '3\n' },
    { input: '11\n3 5 1 6 2 0 8 null null 7 4\n6\n2\n', output: '5\n' },
    { input: '2\n2 1\n2\n1\n', output: '2\n' },
    { input: '8\n1 2 null 3 null 4 null 5\n4\n5\n', output: '4\n' },
    { input: '8\n-1 0 3 -2 4 null null 8\n8\n4\n', output: '0\n' },
    { input: '15\n1 2 3 4 5 6 7 8 9 10 11 12 13 14 15\n9\n11\n', output: '2\n' },
    { input: '236\n933 630 -531 592 -417 -791 316 -291 750 179 331 943 -622 null null -279 708 667 63 -764 423 255 -724 664 411 877 108 534 -841 234 null -309 362 null null 989 311 430 -418 null null null null 297 735 -269 -823 -981 -112 null null null null null null 93 337 -83 2 null null 659 221 -132 491 -865 -355 null null null null null null null null null null 981 null -193 -416 -448 527 null null -214 null 584 null -35 -22 -387 -736 -325 975 822 225 291 null 903 -778 62 503 null null -207 null null null null null null null null null 250 -963 -888 828 88 null null null 189 null null null 180 627 -630 864 675 null 7 -159 367 -334 -840 102 null null null null -766 -443 100 -488 -978 -559 369 null null null -96 -241 451 -779 -310 null 202 null null null -283 886 null null -258 -789 null null 390 null -275 null null null null null 57 null -262 -107 495 null -835 null 375 null null null null null null null null null null null null null null null -836 null -830 null null null null null null null null null 953 null null null null null null null -57 null null null null null -768 null null null -380 null -958\n-778\n-355\n', output: '-355\n' },
  ],

  templates: {
    core: {
      javascript: `/**
 * 二叉树节点：{ val: number, left: TreeNode | null, right: TreeNode | null }
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function(root, p, q) {
    
};
`,
      python: `def lowestCommonAncestor(root, p, q):
    # p、q 为树中一定存在的两个节点，返回它们的最近公共祖先节点
    pass
`,
    },
    acm: {
      javascript: `// ACM 模式：input 是全部输入（字符串），用 console.log 输出答案
// 输入格式：第一行 n，第二行 n 个标记（整数或 null，层序），第三行 p 的值，第四行 q 的值
const lines = input.split('\\n');
const n = Number(lines[0]);
const tokens = n > 0 ? lines[1].trim().split(/\\s+/) : [];
const pVal = Number(lines[2]);
const qVal = Number(lines[3]);

// 将层序标记构造成二叉树（节点为 { val, left, right }），按值找到 p、q 两个节点，
// 求最近公共祖先后用 console.log 输出它的值

`,
      python: `# ACM 模式：用 input() 或 sys.stdin 读输入，用 print 输出答案
# 输入格式：第一行 n，第二行 n 个标记（整数或 null，层序），第三行 p 的值，第四行 q 的值
import sys

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

lines = sys.stdin.read().split('\\n')
n = int(lines[0])
tokens = lines[1].split() if n > 0 else []
p_val = int(lines[2])
q_val = int(lines[3])

# 将层序标记构造成二叉树（TreeNode），按值找到 p、q 两个节点，
# 求最近公共祖先后用 print 输出它的值
`,
    },
  },

  solutions: {
    core: {
      javascript: `var lowestCommonAncestor = function(root, p, q) {
  // 后序遍历：空节点、或遇到 p / q 本身时直接返回当前节点
  if (root === null || root === p || root === q) return root;
  const left = lowestCommonAncestor(root.left, p, q);   // 左子树中找到的节点
  const right = lowestCommonAncestor(root.right, p, q); // 右子树中找到的节点
  if (left !== null && right !== null) return root;     // p、q 分居两侧，当前节点即 LCA
  return left !== null ? left : right;                  // 否则把非空的一侧结果向上传递
};
`,
      python: `def lowestCommonAncestor(root, p, q):
    # 后序遍历：空节点、或遇到 p / q 本身时直接返回当前节点
    if root is None or root is p or root is q:
        return root
    left = lowestCommonAncestor(root.left, p, q)    # 左子树中找到的节点
    right = lowestCommonAncestor(root.right, p, q)  # 右子树中找到的节点
    if left is not None and right is not None:
        return root  # p、q 分居两侧，当前节点即 LCA
    return left if left is not None else right  # 否则把非空的一侧结果向上传递
`,
    },
    acm: {
      javascript: `const lines = input.split('\\n');
const n = Number(lines[0]);
const tokens = n > 0 ? lines[1].trim().split(/\\s+/) : [];
const pVal = Number(lines[2]);
const qVal = Number(lines[3]);
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

// 按值查找节点（题目保证值唯一且存在）
function find(root, val) {
  if (root === null) return null;
  if (root.val === val) return root;
  return find(root.left, val) || find(root.right, val);
}

// 后序遍历求最近公共祖先
function lca(root, p, q) {
  if (root === null || root === p || root === q) return root;
  const left = lca(root.left, p, q);
  const right = lca(root.right, p, q);
  if (left !== null && right !== null) return root;
  return left !== null ? left : right;
}

const root = buildTree(arr);
const ans = lca(root, find(root, pVal), find(root, qVal));
console.log(ans === null ? null : ans.val);
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
p_val = int(lines[2])
q_val = int(lines[3])
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

# 按值查找节点（题目保证值唯一且存在）
def find(root, val):
    if root is None:
        return None
    if root.val == val:
        return root
    return find(root.left, val) or find(root.right, val)

# 后序遍历求最近公共祖先
def lca(root, p, q):
    if root is None or root is p or root is q:
        return root
    left = lca(root.left, p, q)
    right = lca(root.right, p, q)
    if left is not None and right is not None:
        return root
    return left if left is not None else right

root = build_tree(arr)
ans = lca(root, find(root, p_val), find(root, q_val))
print(ans.val if ans is not None else None)
`,
    },
  },

  idea: `
**后序遍历（分治）**：对以 \`root\` 为根的子树递归求解，定义返回值为「这棵子树中找到的 \`p\` 或 \`q\`（找不到返回空）」：

- 如果当前节点为空，或者本身就是 \`p\` / \`q\`，直接返回当前节点
- 递归左右子树。如果两侧都返回了非空节点，说明 \`p\`、\`q\` 分别位于当前节点的左右子树中，当前节点就是最近公共祖先
- 如果只有一侧非空，说明 \`p\`、\`q\`（或它们的 LCA）都在那一侧，把该侧的结果原样向上传递

为什么对：自底向上看，第一个「左右子树分别包含 \`p\` 和 \`q\`」的节点就是深度最大的公共祖先；当 \`p\` 本身是 \`q\` 的祖先时，递归会在 \`p\` 处提前返回，不再深入，最终返回的也正是 \`p\`，符合「一个节点可以是自身的祖先」的定义。

时间复杂度 O(n)（每个节点访问一次），空间复杂度 O(h)（递归栈，h 为树高）。
`,

  explanation: `
- 递归出口 \`root === null || root === p || root === q\`：遇空返回空；遇到 \`p\` 或 \`q\` 直接返回它，不再向下找——这正确处理了「一个节点是另一个节点祖先」的情形
- \`left\`、\`right\` 分别是左右子树的查找结果：非空表示该侧子树里找到了 \`p\`、\`q\` 之一（或它们的 LCA）
- 两侧都非空：当前节点是第一个同时覆盖 \`p\` 和 \`q\` 的节点，即答案
- 仅一侧非空：把非空结果透传上去，答案在那一侧的子树里
- 注意判题传入的 \`p\`、\`q\` 是树中的真实节点对象，所以可以用 \`===\` / \`is\` 做同一性比较，而不是比较 \`val\`

ACM 版本多了两头的工作：按层序建树；用 \`find\` 按值定位 \`p\`、\`q\`（题目保证值唯一且存在），拿到节点后调用同一个 \`lca\` 函数，最后打印返回节点的 \`val\`。
`,
};
