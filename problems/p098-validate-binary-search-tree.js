// 98. 验证二叉搜索树
// 二叉树题：argSpec 用 { kind: 'tree' } 把层序数组（null 表空节点）构造成二叉树
export default {
  id: 98,
  title: '验证二叉搜索树',
  slug: 'validate-binary-search-tree',
  difficulty: 'medium',
  tags: ['树', '深度优先搜索', '二叉搜索树', '二叉树'],
  hints: [
    '不能只比较节点与直接孩子：二叉搜索树要求每个节点同时满足整条祖先路径传下来的严格大小约束，重复值也不合法。',
    '采用携带上下界的深度优先搜索，让当前节点值始终落在由祖先确定的开区间 (lo, hi) 内。',
    '递归 check(node, lo, hi)：空节点返回 true；值不满足 lo < node.val < hi 时返回 false；左子树检查 (lo, node.val)，右子树检查 (node.val, hi)。',
    '初始上下界应表示无约束，避免把 32 位整数极值误判；ACM 输入是含 null 的层序序列，建树后输出小写 true 或 false。',
  ],

  description: `
给你一个二叉树的根节点 \`root\`，判断其是否是一个有效的二叉搜索树。

**有效**二叉搜索树定义如下：

- 节点的左子树只包含**严格小于**当前节点值的节点
- 节点的右子树只包含**严格大于**当前节点值的节点
- 所有左子树和右子树自身必须也是二叉搜索树

### 示例

- 输入：\`root = [2,1,3]\`，输出：\`true\`
- 输入：\`root = [5,1,4,null,null,3,6]\`，输出：\`false\`（根节点的右子树中出现了 4 和 3，它们小于 5）
- 输入：\`root = [2,2,2]\`，输出：\`false\`（BST 要求严格小于 / 大于，相等的值不合法）

（数组为二叉树的层序遍历表示，\`null\` 表示空节点）

### 提示

- 树中节点数目范围在 \`[0, 10^4]\` 内
- \`-2^31 <= Node.val <= 2^31 - 1\`

### ACM 模式输入输出格式

- 输入：第一行为整数 \`n\`（层序序列长度）；第二行为 \`n\` 个标记（空格分隔），每个标记为整数或 \`null\`，按层序描述二叉树（\`n = 0\` 时该行为空行，表示空树）
- 输出：\`true\` 或 \`false\`（小写）

ACM 输入示例：
\`\`\`
3
2 1 3
\`\`\`
输出：\`true\`
`,

  functionName: 'isValidBST',
  compare: 'exact',
  argSpec: [{ kind: 'tree' }],

  tests: [
    { args: [[2, 1, 3]], expected: true },
    { args: [[5, 1, 4, null, null, 3, 6]], expected: false },
    { args: [[]], expected: true },
    { args: [[1]], expected: true },
    { args: [[2, 2, 2]], expected: false },
    { args: [[5, 4, 6, null, null, 3, 7]], expected: false },
    { args: [[-2147483648, null, 2147483647]], expected: true },
    { args: [[5, 1, 6, null, null, 5, 8]], expected: false },
    { args: [[5, 4, null, 3, null, 2, null, 1]], expected: true },
    { args: [[-103488, -380986, 360410, -746886, -277243, 235229, 584723, -888809, -391038, -378386, -186655, -78903, 264392, 435313, 846600, null, -852931, -473182, null, null, -342266, -263933, -154182, null, 202827, 252155, 273867, 382879, 545876, 774893, 889119, null, -763062, -678830, -421130, null, -323132, null, null, null, -153272, 68261, 206991, null, null, null, 313933, null, null, 450580, null, 740489, 804912, null, 969404, null, null, -683142, -625379, -425306, -415599, null, null, null, -123170, 57574, 74782, null, null, null, 313972, null, null, 725713, 755514, null, 838904, 915269, 973756, null, null, -632114, -505652, null, null, null, null, null, null, null, null, null, null, null, null, 674361, null, null, null, null, null, 904775, null, null, 988127, null, null, -593084, null, null, 725331, null, null, null, null, -597464]], expected: true },
  ],

  acmTests: [
    { input: '3\n2 1 3\n', output: 'true\n' },
    { input: '7\n5 1 4 null null 3 6\n', output: 'false\n' },
    { input: '0\n\n', output: 'true\n' },
    { input: '1\n1\n', output: 'true\n' },
    { input: '3\n2 2 2\n', output: 'false\n' },
    { input: '7\n5 4 6 null null 3 7\n', output: 'false\n' },
    { input: '3\n-2147483648 null 2147483647\n', output: 'true\n' },
    { input: '7\n5 1 6 null null 5 8\n', output: 'false\n' },
    { input: '8\n5 4 null 3 null 2 null 1\n', output: 'true\n' },
    { input: '116\n-103488 -380986 360410 -746886 -277243 235229 584723 -888809 -391038 -378386 -186655 -78903 264392 435313 846600 null -852931 -473182 null null -342266 -263933 -154182 null 202827 252155 273867 382879 545876 774893 889119 null -763062 -678830 -421130 null -323132 null null null -153272 68261 206991 null null null 313933 null null 450580 null 740489 804912 null 969404 null null -683142 -625379 -425306 -415599 null null null -123170 57574 74782 null null null 313972 null null 725713 755514 null 838904 915269 973756 null null -632114 -505652 null null null null null null null null null null null null 674361 null null null null null 904775 null null 988127 null null -593084 null null 725331 null null null null -597464\n', output: 'true\n' },
  ],

  templates: {
    core: {
      javascript: `/**
 * 二叉树节点：{ val: number, left: TreeNode | null, right: TreeNode | null }
 * @param {TreeNode} root
 * @return {boolean}
 */
var isValidBST = function(root) {
    
};
`,
      python: `def isValidBST(root):
    # root 为二叉树根节点（TreeNode），返回是否为有效二叉搜索树（布尔值）
    pass
`,
    },
    acm: {
      javascript: `// ACM 模式：input 是全部输入（字符串），用 console.log 输出答案
// 输入格式：第一行 n，第二行 n 个标记（整数或 null，层序；n = 0 时为空行）
// 输出：true 或 false（小写）
const lines = input.split('\\n');
const n = Number(lines[0]);
const tokens = n > 0 ? lines[1].trim().split(/\\s+/) : [];
const arr = tokens.map((t) => (t === 'null' ? null : Number(t)));

// 将层序标记构造成二叉树（节点为 { val, left, right }），验证后输出 true / false

`,
      python: `# ACM 模式：用 input() 或 sys.stdin 读输入，用 print 输出答案
# 输入格式：第一行 n，第二行 n 个标记（整数或 null，层序；n = 0 时为空行）
# 输出：true 或 false（小写）
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

# 将层序标记构造成二叉树（TreeNode），验证后输出 true / false
`,
    },
  },

  solutions: {
    core: {
      javascript: `var isValidBST = function(root) {
  // node 的值必须落在开区间 (lo, hi) 内；lo / hi 为 null 表示该方向无约束
  const check = function(node, lo, hi) {
    if (node === null) return true;
    if (lo !== null && node.val <= lo) return false; // 必须严格大于下界
    if (hi !== null && node.val >= hi) return false; // 必须严格小于上界
    return check(node.left, lo, node.val) && check(node.right, node.val, hi);
  };
  return check(root, null, null);
};
`,
      python: `def isValidBST(root):
    # node 的值必须落在开区间 (lo, hi) 内；lo / hi 为 None 表示该方向无约束
    def check(node, lo, hi):
        if node is None:
            return True
        if lo is not None and node.val <= lo:
            return False  # 必须严格大于下界
        if hi is not None and node.val >= hi:
            return False  # 必须严格小于上界
        return check(node.left, lo, node.val) and check(node.right, node.val, hi)

    return check(root, None, None)
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

// 上下界递归：node 的值必须落在开区间 (lo, hi) 内
function check(node, lo, hi) {
  if (node === null) return true;
  if (lo !== null && node.val <= lo) return false;
  if (hi !== null && node.val >= hi) return false;
  return check(node.left, lo, node.val) && check(node.right, node.val, hi);
}

console.log(check(buildTree(arr), null, null) ? 'true' : 'false');
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

# 上下界递归：node 的值必须落在开区间 (lo, hi) 内
def check(node, lo, hi):
    if node is None:
        return True
    if lo is not None and node.val <= lo:
        return False
    if hi is not None and node.val >= hi:
        return False
    return check(node.left, lo, node.val) and check(node.right, node.val, hi)

print('true' if check(build_tree(arr), None, None) else 'false')
`,
    },
  },

  idea: `
两种经典思路：

**上下界递归**（参考代码采用）：一个节点能取的值不只受父节点约束，而是受**整条祖先路径**的约束。递归时携带开区间 \`(lo, hi)\`，节点值必须落在区间内；递归左子树时把上界收紧为当前节点值，递归右子树时把下界收紧为当前节点值。根的初始区间为 \`(-∞, +∞)\`。

**中序遍历**：BST 的中序遍历严格递增，遍历一遍并检查相邻元素是否严格递增即可（迭代或递归写法都行）。

两种方法时间复杂度都是 O(n)，空间复杂度 O(h)（h 为树高）。

常见的错误写法是只比较「节点与其直接孩子」的大小。反例 \`[5,1,4,null,null,3,6]\`：节点 4 的左右孩子局部合法，但 4 本身（以及 3）不该出现在 5 的右子树里——局部合法不代表整体合法。
`,

  explanation: `
- \`check(node, lo, hi)\`：\`node\` 的值必须满足 \`lo < node.val < hi\`；\`lo\` / \`hi\` 为 \`null\`（Python 为 \`None\`）表示该方向没有约束
- 递归左子树：上界更新为 \`node.val\`（左子树所有值必须严格小于它）；递归右子树：下界更新为 \`node.val\`。祖先的约束一路向下传递，这正是上下界法的核心
- 用 \`null\` 哨兵做初始边界，而不是 \`-Infinity\` / \`Infinity\`：题目节点值可达 ±2^31，哨兵写法在两种语言里都干净统一，也不依赖数值范围
- 「严格」是易错点：\`node.val <= lo\` 或 \`node.val >= hi\` 立即返回 \`false\`——相等的值（如 \`[2,2,2]\`）不合法，不能写成 \`<\` / \`>\`
- 空树符合定义，返回 \`true\`：\`check(null, ...)\` 的递归出口天然覆盖了它

ACM 版本先按层序数组建树，再跑同一个上下界递归，最后按题意输出小写的 \`'true'\` / \`'false'\` 字符串。
`,
};
