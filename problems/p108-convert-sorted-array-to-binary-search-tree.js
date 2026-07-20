// 108. 将有序数组转换为二叉搜索树
// resultKind 'tree' + compare 'balancedBst'：判题器校验返回树的中序遍历等于原数组且全树平衡
export default {
  id: 108,
  title: '将有序数组转换为二叉搜索树',
  slug: 'convert-sorted-array-to-binary-search-tree',
  difficulty: 'easy',
  tags: ['树', '二叉搜索树', '数组', '分治', '二叉树'],
  hints: [
    '严格递增数组恰好是二叉搜索树的中序遍历；每次选择当前区间的中点作为根，左右子树的节点数最多相差 1，因此能保证高度平衡。',
    '使用分治递归：由数组中点创建根节点，再分别用中点左侧和右侧的连续区间构造左右子树，无需复制子数组。',
    '定义 build(lo, hi)：若 lo > hi 返回 null；否则令 mid = (lo + hi) >> 1，创建 nums[mid] 节点，并递归连接 build(lo, mid - 1) 与 build(mid + 1, hi)。',
    '空数组应返回 null；ACM 模式因平衡树结构不唯一，需按约定输出所构造树的中序遍历，n = 0 时输出空行。',
  ],

  description: `
给你一个整数数组 \`nums\`，其中元素已经按**升序**排列，请你将其转换为一棵**平衡**二叉搜索树。

**平衡二叉树**是指每个节点的左右两个子树的高度差的绝对值不超过 1 的二叉树。

如果存在多种构造方式，返回任意一种即可（判题器会校验：返回树的中序遍历等于原数组，且每个节点都平衡）。

### 示例

- 输入：\`nums = [-10,-3,0,5,9]\`，输出：\`[0,-3,9,-10,null,5]\`（层序表示；\`[0,-10,5,null,-3,null,9]\` 等同样合法）
- 输入：\`nums = [1,3]\`，输出：\`[3,1]\`（\`[1,null,3]\` 也合法）

### 提示

- \`0 <= nums.length <= 10^4\`（原题保证非空，本题数据补充空数组边界用例）
- \`-10^4 <= nums[i] <= 10^4\`
- \`nums\` 按**严格递增**顺序排列

### ACM 模式输入输出格式

- 输入：第一行为整数 \`n\`（数组长度）；第二行为 \`n\` 个升序整数（空格分隔；\`n = 0\` 时该行为空行）
- 输出：由于合法的平衡 BST 不唯一，本题约定输出**你所构造的树的中序遍历**（即升序序列），空格分隔；\`n = 0\` 时输出一个空行

ACM 输入示例：
\`\`\`
5
-10 -3 0 5 9
\`\`\`
输出：\`-10 -3 0 5 9\`
`,

  functionName: 'sortedArrayToBST',
  compare: 'balancedBst',
  resultKind: 'tree',

  tests: [
    { args: [[-10, -3, 0, 5, 9]], expected: [-10, -3, 0, 5, 9] },
    { args: [[1, 3]], expected: [1, 3] },
    { args: [[]], expected: [] },
    { args: [[0]], expected: [0] },
    { args: [[1, 2, 3, 4, 5, 6, 7]], expected: [1, 2, 3, 4, 5, 6, 7] },
    { args: [[-5, -2, 0, 1, 2, 4]], expected: [-5, -2, 0, 1, 2, 4] },
    { args: [[-10000, -1, 0, 1, 10000]], expected: [-10000, -1, 0, 1, 10000] },
    { args: [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]], expected: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
    { args: [[-9, -7, -5, -3, -1]], expected: [-9, -7, -5, -3, -1] },
    { args: [[-9832, -9801, -9781, -9637, -9467, -9426, -9314, -9304, -8733, -8723, -8633, -8428, -7989, -7806, -7512, -7418, -7398, -7185, -7112, -6855, -6837, -6802, -6789, -6560, -6420, -6133, -6106, -6054, -5948, -5828, -5598, -5558, -5467, -5330, -5248, -5205, -5195, -5084, -5070, -4906, -4343, -4334, -4127, -3964, -3763, -3243, -3118, -3089, -2933, -2567, -1878, -1555, -1448, -1135, -482, -259, 23, 355, 462, 583, 1792, 2267, 2301, 2307, 2364, 2875, 3816, 3957, 4184, 4376, 4519, 4574, 4880, 5473, 5510, 5585, 5816, 6209, 6621, 6648, 6661, 6889, 6912, 7272, 7502, 7885, 8477, 8701, 8753, 8756, 8808, 8928, 8984, 9058, 9074, 9206, 9252, 9431, 9463, 9813]], expected: [-9832, -9801, -9781, -9637, -9467, -9426, -9314, -9304, -8733, -8723, -8633, -8428, -7989, -7806, -7512, -7418, -7398, -7185, -7112, -6855, -6837, -6802, -6789, -6560, -6420, -6133, -6106, -6054, -5948, -5828, -5598, -5558, -5467, -5330, -5248, -5205, -5195, -5084, -5070, -4906, -4343, -4334, -4127, -3964, -3763, -3243, -3118, -3089, -2933, -2567, -1878, -1555, -1448, -1135, -482, -259, 23, 355, 462, 583, 1792, 2267, 2301, 2307, 2364, 2875, 3816, 3957, 4184, 4376, 4519, 4574, 4880, 5473, 5510, 5585, 5816, 6209, 6621, 6648, 6661, 6889, 6912, 7272, 7502, 7885, 8477, 8701, 8753, 8756, 8808, 8928, 8984, 9058, 9074, 9206, 9252, 9431, 9463, 9813] },
  ],

  acmTests: [
    { input: '5\n-10 -3 0 5 9\n', output: '-10 -3 0 5 9\n' },
    { input: '2\n1 3\n', output: '1 3\n' },
    { input: '0\n\n', output: '\n' },
    { input: '1\n0\n', output: '0\n' },
    { input: '7\n1 2 3 4 5 6 7\n', output: '1 2 3 4 5 6 7\n' },
    { input: '6\n-5 -2 0 1 2 4\n', output: '-5 -2 0 1 2 4\n' },
    { input: '5\n-10000 -1 0 1 10000\n', output: '-10000 -1 0 1 10000\n' },
    { input: '10\n1 2 3 4 5 6 7 8 9 10\n', output: '1 2 3 4 5 6 7 8 9 10\n' },
    { input: '5\n-9 -7 -5 -3 -1\n', output: '-9 -7 -5 -3 -1\n' },
    { input: '100\n-9832 -9801 -9781 -9637 -9467 -9426 -9314 -9304 -8733 -8723 -8633 -8428 -7989 -7806 -7512 -7418 -7398 -7185 -7112 -6855 -6837 -6802 -6789 -6560 -6420 -6133 -6106 -6054 -5948 -5828 -5598 -5558 -5467 -5330 -5248 -5205 -5195 -5084 -5070 -4906 -4343 -4334 -4127 -3964 -3763 -3243 -3118 -3089 -2933 -2567 -1878 -1555 -1448 -1135 -482 -259 23 355 462 583 1792 2267 2301 2307 2364 2875 3816 3957 4184 4376 4519 4574 4880 5473 5510 5585 5816 6209 6621 6648 6661 6889 6912 7272 7502 7885 8477 8701 8753 8756 8808 8928 8984 9058 9074 9206 9252 9431 9463 9813\n', output: '-9832 -9801 -9781 -9637 -9467 -9426 -9314 -9304 -8733 -8723 -8633 -8428 -7989 -7806 -7512 -7418 -7398 -7185 -7112 -6855 -6837 -6802 -6789 -6560 -6420 -6133 -6106 -6054 -5948 -5828 -5598 -5558 -5467 -5330 -5248 -5205 -5195 -5084 -5070 -4906 -4343 -4334 -4127 -3964 -3763 -3243 -3118 -3089 -2933 -2567 -1878 -1555 -1448 -1135 -482 -259 23 355 462 583 1792 2267 2301 2307 2364 2875 3816 3957 4184 4376 4519 4574 4880 5473 5510 5585 5816 6209 6621 6648 6661 6889 6912 7272 7502 7885 8477 8701 8753 8756 8808 8928 8984 9058 9074 9206 9252 9431 9463 9813\n' },
  ],

  templates: {
    core: {
      javascript: `/**
 * @param {number[]} nums 升序数组
 * @return {TreeNode} 平衡二叉搜索树的根节点（节点形如 { val, left, right }）
 */
var sortedArrayToBST = function(nums) {
    
};
`,
      python: `def sortedArrayToBST(nums):
    # nums 为升序数组，返回平衡二叉搜索树的根节点
    # 判题环境不提供 TreeNode 类，需要新建节点时在函数内自行定义
    pass
`,
    },
    acm: {
      javascript: `// ACM 模式：input 是全部输入（字符串），用 console.log 输出答案
// 输入格式：第一行 n，第二行 n 个升序整数（n = 0 时为空行）
// 输出：你所构造的平衡 BST 的中序遍历（即升序序列），空格分隔；n = 0 时输出空行
const lines = input.split('\\n');
const n = Number(lines[0]);
const nums = n > 0 ? lines[1].trim().split(/\\s+/).map(Number) : [];

// 构造平衡二叉搜索树（节点为 { val, left, right }），中序遍历后用 console.log 输出

`,
      python: `# ACM 模式：用 input() 或 sys.stdin 读输入，用 print 输出答案
# 输入格式：第一行 n，第二行 n 个升序整数（n = 0 时为空行）
# 输出：你所构造的平衡 BST 的中序遍历（即升序序列），空格分隔；n = 0 时输出空行
import sys

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

lines = sys.stdin.read().split('\\n')
n = int(lines[0])
nums = list(map(int, lines[1].split())) if n > 0 else []

# 构造平衡二叉搜索树，中序遍历后用 print 输出
`,
    },
  },

  solutions: {
    core: {
      javascript: `var sortedArrayToBST = function(nums) {
  // 把 nums[lo..hi] 建成平衡 BST，返回根节点
  const build = function(lo, hi) {
    if (lo > hi) return null;
    const mid = (lo + hi) >> 1; // 中点做根
    const node = { val: nums[mid], left: null, right: null };
    node.left = build(lo, mid - 1);
    node.right = build(mid + 1, hi);
    return node;
  };
  return build(0, nums.length - 1);
};
`,
      python: `def sortedArrayToBST(nums):
    # 判题环境不提供 TreeNode 类，在函数内自行定义（判题只读 val/left/right 属性）
    class TreeNode:
        def __init__(self, val=0, left=None, right=None):
            self.val = val
            self.left = left
            self.right = right

    # 把 nums[lo..hi] 建成平衡 BST，返回根节点
    def build(lo, hi):
        if lo > hi:
            return None
        mid = (lo + hi) // 2  # 中点做根
        node = TreeNode(nums[mid])
        node.left = build(lo, mid - 1)
        node.right = build(mid + 1, hi)
        return node

    return build(0, len(nums) - 1)
`,
    },
    acm: {
      javascript: `const lines = input.split('\\n');
const n = Number(lines[0]);
const nums = n > 0 ? lines[1].trim().split(/\\s+/).map(Number) : [];

// 分治建树：中点做根，左右区间分别建左右子树
function build(lo, hi) {
  if (lo > hi) return null;
  const mid = (lo + hi) >> 1;
  const node = { val: nums[mid], left: null, right: null };
  node.left = build(lo, mid - 1);
  node.right = build(mid + 1, hi);
  return node;
}

const root = build(0, nums.length - 1);

// 中序遍历（BST 的中序遍历即升序序列）
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
nums = list(map(int, lines[1].split())) if n > 0 else []

# 分治建树：中点做根，左右区间分别建左右子树
def build(lo, hi):
    if lo > hi:
        return None
    mid = (lo + hi) // 2
    node = TreeNode(nums[mid])
    node.left = build(lo, mid - 1)
    node.right = build(mid + 1, hi)
    return node

root = build(0, len(nums) - 1)

# 中序遍历（BST 的中序遍历即升序序列）
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
二叉搜索树的中序遍历就是升序数组；反过来看，升序数组的**中点**正好应该做根：左半边都比它小、构成左子树，右半边都比它大、构成右子树。

**分治（递归建树）**：取区间中点 \`mid\` 作为根，递归地用左半区间 \`[lo, mid-1]\` 建左子树、右半区间 \`[mid+1, hi]\` 建右子树。由于左右两边的元素个数最多相差 1，建出来的树天然满足平衡条件——每层都是「尽量均分」。

正确性由 BST 的定义保证：左区间的值全小于根、右区间的值全大于根，递归下去每棵子树也都是 BST。

每次取中点 O(1)，共创建 n 个节点，时间复杂度 O(n)；递归栈深度 O(log n)。
`,

  explanation: `
- \`build(lo, hi)\` 负责把闭区间 \`nums[lo..hi]\` 建成平衡 BST：区间为空（\`lo > hi\`）返回 \`null\`
- \`mid = (lo + hi) >> 1\`（Python 用 \`(lo + hi) // 2\`）取中点做根；左子树递归自 \`[lo, mid-1]\`，右子树递归自 \`[mid+1, hi]\`——注意区间端点都要跳过 \`mid\`，否则同一个元素会被用两次
- 判题器的校验方式：把你返回的树按层序序列化后做中序遍历，必须等于原升序数组；同时逐节点检查左右子树高度差不超过 1。因此返回任意一种平衡方案都能通过，不要求与参考答案结构一致
- JS 直接构造 \`{ val, left, right }\` 字面量节点即可；Python 需要在函数内自行定义 \`TreeNode\` 类（判题环境不提供，判题只读 \`val\` / \`left\` / \`right\` 属性）
- 空数组时 \`build(0, -1)\` 立即返回 \`null\`，即空树

ACM 版本：读入数组后用同一个递归建树，再做一次中序遍历打印——结果必然还是输入的升序序列，这是本题约定的输出方式。
`,
};
