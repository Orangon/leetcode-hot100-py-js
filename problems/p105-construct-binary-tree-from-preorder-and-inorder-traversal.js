// 105. 从前序与中序遍历序列构造二叉树
// 两个普通数组参数（无需 argSpec）；resultKind 为 tree，判题器把返回的根节点序列化成层序数组比对
export default {
  id: 105,
  title: '从前序与中序遍历序列构造二叉树',
  slug: 'construct-binary-tree-from-preorder-and-inorder-traversal',
  difficulty: 'medium',
  tags: ['树', '数组', '哈希表', '分治', '二叉树'],

  hints: [
    '前序遍历的首个未消费元素必是当前子树根；根在中序遍历中的位置又唯一划分出左、右子树的节点范围。',
    '先建立“节点值到中序下标”的哈希表，再用前序指针配合中序闭区间递归分治，可将每次定位根的代价降为 O(1)。',
    '令 build(lo, hi) 构造中序区间：lo > hi 时返回空；否则取 preorder[pre++] 建根，在哈希表中得到 mid，并依次递归 build(lo, mid - 1) 和 build(mid + 1, hi)。',
    '节点值无重复是按值定位的前提，空数组应返回空树；ACM 模式需读取 n、前序和中序三行，构造后层序输出并保留内部 null、删除末尾 null，n = 0 时输出空行。',
  ],

  description: `
给定两个整数数组 \`preorder\` 和 \`inorder\`，其中 \`preorder\` 是二叉树的**前序遍历**，\`inorder\` 是同一棵树的**中序遍历**，请构造二叉树并返回其根节点。

### 示例

- 输入：\`preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]\`，输出：\`[3,9,20,null,null,15,7]\`
- 输入：\`preorder = [-1], inorder = [-1]\`，输出：\`[-1]\`

### 提示

- \`1 <= preorder.length <= 3000\`
- \`inorder.length == preorder.length\`
- \`-3000 <= preorder[i], inorder[i] <= 3000\`
- \`preorder\` 和 \`inorder\` 均无重复元素
- \`inorder\` 中的值均出现在 \`preorder\` 中
- \`preorder\` 保证为二叉树的前序遍历序列，\`inorder\` 保证为二叉树的中序遍历序列

### ACM 模式输入输出格式

- 输入：第一行为整数 \`n\`（节点个数）；第二行为前序遍历的 \`n\` 个整数（空格分隔；\`n = 0\` 时该行为空行）；第三行为中序遍历的 \`n\` 个整数（\`n = 0\` 时同样为空行）
- 输出：构造出的二叉树的层序序列（空格分隔，\`null\` 保留以表结构、末尾 \`null\` 省略；空树输出一个空行）

ACM 输入示例：
\`\`\`
5
3 9 20 15 7
9 3 15 20 7
\`\`\`
输出：\`3 9 20 null null 15 7\`
`,

  functionName: 'buildTree',
  compare: 'exact',
  resultKind: 'tree',

  tests: [
    { args: [[3, 9, 20, 15, 7], [9, 3, 15, 20, 7]], expected: [3, 9, 20, null, null, 15, 7] },
    { args: [[-1], [-1]], expected: [-1] },
    { args: [[1, 2], [2, 1]], expected: [1, 2] },
    { args: [[1, 2], [1, 2]], expected: [1, null, 2] },
    { args: [[1, 2, 3, 4, 5], [3, 2, 4, 1, 5]], expected: [1, 2, 5, 3, 4] },
    { args: [[], []], expected: [] },
    { args: [[1, 2, 3, 4], [4, 3, 2, 1]], expected: [1, 2, null, 3, null, 4] },
    { args: [[1, 2, 3, 4], [1, 2, 3, 4]], expected: [1, null, 2, null, 3, null, 4] },
    { args: [[1, 2, 4, 5, 3, 6, 7], [4, 2, 5, 1, 6, 3, 7]], expected: [1, 2, 3, 4, 5, 6, 7] },
    { args: [[-2780, -2451, -1184, 964, 917, -1175, 2677, -782, 1395, -2070, -1396, 1275, -920, 1446, -2042, 2686, -2268, -1028, 2593, 1033, 566, 1716, 1564, -538, 1092, 1672, 1795, 770, 828, 2880, -2680, -2273, 355, -1997, -1609, 330, -2008, -36, -2121, 2032, 2783, -2452, -2524, 1031, 748, 2355, 2181, -850, 707, 751], [-1175, 917, 964, 2677, 1395, -2070, -782, 1275, -1396, -1184, -2042, 2686, 1446, -920, -1028, -2268, 2593, -2451, 566, 1564, 1716, 1033, -538, 1092, 1672, 1795, -2780, 2880, -2680, 828, 770, -1609, -1997, -2008, 330, 2032, -2121, 2783, -36, 355, -2452, -2524, -2273, 1031, 2355, -850, 2181, 707, 748, 751]], expected: [-2780, -2451, 770, -1184, 1033, 828, -2273, 964, -920, 566, -538, 2880, null, 355, 1031, 917, 2677, 1446, -2268, null, 1716, null, 1092, null, -2680, -1997, -2452, null, 748, -1175, null, null, -782, -2042, null, -1028, 2593, 1564, null, null, 1672, null, null, -1609, 330, null, -2524, 2355, 751, null, null, 1395, -1396, null, 2686, null, null, null, null, null, null, null, 1795, null, null, -2008, -36, null, null, null, 2181, null, null, null, -2070, 1275, null, null, null, null, null, null, null, -2121, null, -850, 707, null, null, null, null, 2032, 2783] },
  ],

  acmTests: [
    { input: '5\n3 9 20 15 7\n9 3 15 20 7\n', output: '3 9 20 null null 15 7\n' },
    { input: '1\n-1\n-1\n', output: '-1\n' },
    { input: '2\n1 2\n2 1\n', output: '1 2\n' },
    { input: '2\n1 2\n1 2\n', output: '1 null 2\n' },
    { input: '5\n1 2 3 4 5\n3 2 4 1 5\n', output: '1 2 5 3 4\n' },
    { input: '0\n\n\n', output: '\n' },
    { input: '4\n1 2 3 4\n4 3 2 1\n', output: '1 2 null 3 null 4\n' },
    { input: '4\n1 2 3 4\n1 2 3 4\n', output: '1 null 2 null 3 null 4\n' },
    { input: '7\n1 2 4 5 3 6 7\n4 2 5 1 6 3 7\n', output: '1 2 3 4 5 6 7\n' },
    { input: '50\n-2780 -2451 -1184 964 917 -1175 2677 -782 1395 -2070 -1396 1275 -920 1446 -2042 2686 -2268 -1028 2593 1033 566 1716 1564 -538 1092 1672 1795 770 828 2880 -2680 -2273 355 -1997 -1609 330 -2008 -36 -2121 2032 2783 -2452 -2524 1031 748 2355 2181 -850 707 751\n-1175 917 964 2677 1395 -2070 -782 1275 -1396 -1184 -2042 2686 1446 -920 -1028 -2268 2593 -2451 566 1564 1716 1033 -538 1092 1672 1795 -2780 2880 -2680 828 770 -1609 -1997 -2008 330 2032 -2121 2783 -36 355 -2452 -2524 -2273 1031 2355 -850 2181 707 748 751\n', output: '-2780 -2451 770 -1184 1033 828 -2273 964 -920 566 -538 2880 null 355 1031 917 2677 1446 -2268 null 1716 null 1092 null -2680 -1997 -2452 null 748 -1175 null null -782 -2042 null -1028 2593 1564 null null 1672 null null -1609 330 null -2524 2355 751 null null 1395 -1396 null 2686 null null null null null null null 1795 null null -2008 -36 null null null 2181 null null null -2070 1275 null null null null null null null -2121 null -850 707 null null null null 2032 2783\n' },
  ],

  templates: {
    core: {
      javascript: `/**
 * 构造出的二叉树节点形如 { val, left, right }
 * @param {number[]} preorder 前序遍历序列
 * @param {number[]} inorder 中序遍历序列
 * @return {TreeNode}
 */
var buildTree = function(preorder, inorder) {
    
};
`,
      python: `def buildTree(preorder, inorder):
    # preorder / inorder 为前序、中序遍历序列（整数列表，无重复元素），返回构造出的二叉树根节点
    pass
`,
    },
    acm: {
      javascript: `// ACM 模式：input 是全部输入（字符串），用 console.log 输出答案
// 输入格式：第一行 n，第二行前序 n 个整数，第三行中序 n 个整数（n = 0 时两行为空行）
const lines = input.split('\\n');
const n = Number(lines[0]);
const preorder = n > 0 ? lines[1].trim().split(/\\s+/).map(Number) : [];
const inorder = n > 0 ? lines[2].trim().split(/\\s+/).map(Number) : [];

// 由前序、中序序列构造二叉树（节点为 { val, left, right } 对象），
// 再按层序输出（null 保留、末尾 null 省略；空树输出一个空行）

`,
      python: `# ACM 模式：用 input() 或 sys.stdin 读输入，用 print 输出答案
# 输入格式：第一行 n，第二行前序 n 个整数，第三行中序 n 个整数（n = 0 时两行为空行）
import sys

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

lines = sys.stdin.read().split('\\n')
n = int(lines[0])
preorder = list(map(int, lines[1].split())) if n > 0 else []
inorder = list(map(int, lines[2].split())) if n > 0 else []

# 由前序、中序序列构造二叉树，再按层序输出（null 保留、末尾 null 省略；空树输出一个空行）
`,
    },
  },

  solutions: {
    core: {
      javascript: `var buildTree = function(preorder, inorder) {
  const index = new Map(); // 中序：值 -> 下标
  for (let i = 0; i < inorder.length; i++) index.set(inorder[i], i);
  let pre = 0; // 前序序列中当前子树根的位置
  const build = function(lo, hi) { // 中序区间 [lo, hi]
    if (lo > hi) return null;
    const node = { val: preorder[pre++], left: null, right: null };
    const mid = index.get(node.val);
    node.left = build(lo, mid - 1);  // 先建左子树，按序消费前序序列
    node.right = build(mid + 1, hi);
    return node;
  };
  return build(0, inorder.length - 1);
};
`,
      python: `def buildTree(preorder, inorder):
    # 判题环境不提供 TreeNode 类，需要新建节点时自行定义（判题只读 val/left/right 属性）
    class TreeNode:
        def __init__(self, val=0, left=None, right=None):
            self.val = val
            self.left = left
            self.right = right

    index = {v: i for i, v in enumerate(inorder)}  # 中序：值 -> 下标
    pre = 0  # 前序序列中当前子树根的位置

    def build(lo, hi):  # 中序区间 [lo, hi]
        nonlocal pre
        if lo > hi:
            return None
        node = TreeNode(preorder[pre])
        pre += 1
        mid = index[node.val]
        node.left = build(lo, mid - 1)   # 先建左子树，按序消费前序序列
        node.right = build(mid + 1, hi)
        return node

    return build(0, len(inorder) - 1)
`,
    },
    acm: {
      javascript: `const lines = input.split('\\n');
const n = Number(lines[0]);
const preorder = n > 0 ? lines[1].trim().split(/\\s+/).map(Number) : [];
const inorder = n > 0 ? lines[2].trim().split(/\\s+/).map(Number) : [];

// 哈希表定位中序根下标 + 分治构造
const index = new Map();
for (let i = 0; i < inorder.length; i++) index.set(inorder[i], i);
let pre = 0;
function build(lo, hi) {
  if (lo > hi) return null;
  const node = { val: preorder[pre++], left: null, right: null };
  const mid = index.get(node.val);
  node.left = build(lo, mid - 1);
  node.right = build(mid + 1, hi);
  return node;
}
const root = build(0, inorder.length - 1);

// 层序序列化（末尾 null 省略）
const out = [];
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
preorder = list(map(int, lines[1].split())) if n > 0 else []
inorder = list(map(int, lines[2].split())) if n > 0 else []

# 哈希表定位中序根下标 + 分治构造
index = {v: i for i, v in enumerate(inorder)}
pre = 0

def build(lo, hi):
    global pre
    if lo > hi:
        return None
    node = TreeNode(preorder[pre])
    pre += 1
    mid = index[node.val]
    node.left = build(lo, mid - 1)
    node.right = build(mid + 1, hi)
    return node

root = build(0, len(inorder) - 1)

# 层序序列化（末尾 null 省略）
out = []
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
前序遍历的第一个元素一定是根节点；在中序遍历中找到这个根，其左边就是左子树的中序序列、右边就是右子树的中序序列，两棵子树的规模也随之确定。于是可以**分治**：

- 顺序消费前序序列，取当前元素作为子树的根
- 在中序中定位根的位置 \`mid\`，递归构造左子树（中序区间 \`[lo, mid-1]\`）与右子树（\`[mid+1, hi]\`）

如果每次都在中序数组里线性查找根，整体复杂度会退化到 O(n²)；先用**哈希表**记录「值 → 中序下标」，定位就降到 O(1)。每个节点恰好构造一次，总时间 O(n)；哈希表与递归栈的空间 O(n)。
`,

  explanation: `
- 前序序列的消费顺序是「根、左子树、右子树」，用指针 \`pre\` 顺序取值即可，每构造一个节点消费一个位置
- \`build(lo, hi)\` 处理中序区间 \`[lo, hi]\`：区间为空返回 null；否则取 \`preorder[pre]\` 作为根节点
- 用哈希表 \`index\` O(1) 查到根在中序里的位置 \`mid\`：左边 \`[lo, mid-1]\` 是左子树，右边 \`[mid+1, hi]\` 是右子树
- **必须先建左子树再建右子树**：前序序列中左子树的所有节点排在右子树之前，顺序反了整棵树就接错
- 节点值无重复是哈希表定位成立的前提（题目已保证）
- 核心模式 Python 版需要新建节点，而判题环境不提供 TreeNode 类，因此在函数内部自行定义（判题只读 val/left/right 属性）
- ACM 版本构造出树后按层序序列化输出：队列中 \`null\` 也入队以保留结构，最后去掉末尾多余的 \`null\`；空树打印一个空行
`,
};
