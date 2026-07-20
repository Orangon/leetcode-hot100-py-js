// 124. 二叉树中的最大路径和
// 二叉树题：argSpec 用 { kind: 'tree' } 构造根节点，返回整数
export default {
  id: 124,
  title: '二叉树中的最大路径和',
  slug: 'binary-tree-maximum-path-sum',
  difficulty: 'hard',
  tags: ['树', '深度优先搜索', '动态规划', '二叉树'],
  hints: [
    '任意合法路径都有唯一的最高节点；把它作为拐点时，路径最多分别向左、右子树各延伸一条向下链。',
    '使用后序 DFS：递归计算每个节点能向父节点提供的最大单边贡献，同时用左右两侧贡献更新全局最大路径和。',
    '令 left=max(0, gain(node.left))、right=max(0, gain(node.right))，先以 node.val+left+right 更新答案，再返回 node.val+max(left, right)。',
    '答案必须初始化为负无穷以处理全负树；ACM 模式需把第二行的层序标记中 null 解析为空节点，建树后输出一个最大路径和整数。',
  ],

  description: `
二叉树中的**路径**被定义为一条节点序列，序列中每对相邻节点之间都存在一条边。同一个节点在路径序列中**至多出现一次**。该路径**至少包含一个节点**，且不一定经过根节点。

**路径和**是路径中各节点值的总和。

给你一个二叉树的根节点 \`root\`，返回其**最大路径和**。

### 示例

- 输入：\`root = [1,2,3]\`，输出：\`6\`（最优路径是 2 -> 1 -> 3，路径和为 2 + 1 + 3 = 6）
- 输入：\`root = [-10,9,20,null,null,15,7]\`，输出：\`42\`（最优路径是 15 -> 20 -> 7，路径和为 15 + 20 + 7 = 42）
- 输入：\`root = [-3]\`，输出：\`-3\`（节点值可能全为负数，此时答案就是最大的单节点值）

### 提示

- 树中节点数目范围是 \`[1, 3 * 10^4]\`
- \`-1000 <= Node.val <= 1000\`

### ACM 模式输入输出格式

- 输入：第一行为整数 \`n\`（节点个数）；第二行为 \`n\` 个标记（空格分隔），每个标记是整数或 \`null\`，按层序给出整棵树
- 输出：一个整数，即最大路径和

ACM 输入示例：
\`\`\`
6
-10 9 20 null null 15 7
\`\`\`
输出：\`42\`
`,

  functionName: 'maxPathSum',
  compare: 'exact',
  argSpec: [{ kind: 'tree' }],

  tests: [
    { args: [[1, 2, 3]], expected: 6 },
    { args: [[-10, 9, 20, null, null, 15, 7]], expected: 42 },
    { args: [[-3]], expected: -3 },
    { args: [[-2, -1, -3]], expected: -1 },
    { args: [[5, 4, 8, 11, null, 13, 4, 7, 2, null, null, null, 1]], expected: 48 },
    { args: [[2, -1]], expected: 2 },
    { args: [[-1000]], expected: -1000 },
    { args: [[1, 2, null, 3, null, 4]], expected: 10 },
    { args: [[-10, -20, -30, -40, null, null, -50]], expected: -10 },
    { args: [[448, 808, 554, 364, 197, 140, 807, 398, 619, -6, null, null, 898, -258, -879, 939, null, -441, null, -849, -889, null, 982, 964, 915, 382, null, null, -938, null, -909, null, 625, null, null, null, null, null, null, null, -742, 210, -801, null, null, -483, -736, null, null, -303, null, null, null, 998, null, 252, null, null, -847, null, -709, null, -977, null, null, null, null, 5, 995, null, null, 818, null, 246, 183, null, null, null, null, -864]], expected: 5531 },
  ],

  acmTests: [
    { input: '3\n1 2 3\n', output: '6\n' },
    { input: '6\n-10 9 20 null null 15 7\n', output: '42\n' },
    { input: '1\n-3\n', output: '-3\n' },
    { input: '3\n-2 -1 -3\n', output: '-1\n' },
    { input: '12\n5 4 8 11 null 13 4 7 2 null null null 1\n', output: '48\n' },
    { input: '2\n2 -1\n', output: '2\n' },
    { input: '1\n-1000\n', output: '-1000\n' },
    { input: '6\n1 2 null 3 null 4\n', output: '10\n' },
    { input: '7\n-10 -20 -30 -40 null null -50\n', output: '-10\n' },
    { input: '80\n448 808 554 364 197 140 807 398 619 -6 null null 898 -258 -879 939 null -441 null -849 -889 null 982 964 915 382 null null -938 null -909 null 625 null null null null null null null -742 210 -801 null null -483 -736 null null -303 null null null 998 null 252 null null -847 null -709 null -977 null null null null 5 995 null null 818 null 246 183 null null null null -864\n', output: '5531\n' },
  ],

  templates: {
    core: {
      javascript: `/**
 * 二叉树节点：{ val: number, left: TreeNode | null, right: TreeNode | null }
 * @param {TreeNode} root
 * @return {number}
 */
var maxPathSum = function(root) {
    
};
`,
      python: `def maxPathSum(root):
    # root 为二叉树根节点（TreeNode），返回最大路径和（整数）
    pass
`,
    },
    acm: {
      javascript: `// ACM 模式：input 是全部输入（字符串），用 console.log 输出答案
// 输入格式：第一行 n，第二行 n 个标记（整数或 null，层序）
const lines = input.split('\\n');
const n = Number(lines[0]);
const tokens = n > 0 ? lines[1].trim().split(/\\s+/) : [];

// 将层序标记构造成二叉树（节点为 { val, left, right }），求最大路径和后用 console.log 输出

`,
      python: `# ACM 模式：用 input() 或 sys.stdin 读输入，用 print 输出答案
# 输入格式：第一行 n，第二行 n 个标记（整数或 null，层序）
import sys

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

lines = sys.stdin.read().split('\\n')
n = int(lines[0])
tokens = lines[1].split() if n > 0 else []

# 将层序标记构造成二叉树（TreeNode），求最大路径和后用 print 输出
`,
    },
  },

  solutions: {
    core: {
      javascript: `var maxPathSum = function(root) {
  let ans = -Infinity;
  // gain(node)：以 node 为起点、只向下走一条链能得到的最大「单边贡献」
  const gain = (node) => {
    if (node === null) return 0;
    const left = Math.max(0, gain(node.left));   // 负贡献不如不走，直接舍弃
    const right = Math.max(0, gain(node.right));
    // 以 node 为「拐点」的完整路径：左链 + node + 右链
    ans = Math.max(ans, node.val + left + right);
    // 向上返回时只能选一侧延伸，否则路径会分叉
    return node.val + Math.max(left, right);
  };
  gain(root);
  return ans;
};
`,
      python: `def maxPathSum(root):
    ans = float('-inf')

    # gain(node)：以 node 为起点、只向下走一条链能得到的最大「单边贡献」
    def gain(node):
        nonlocal ans
        if node is None:
            return 0
        left = max(0, gain(node.left))    # 负贡献不如不走，直接舍弃
        right = max(0, gain(node.right))
        # 以 node 为「拐点」的完整路径：左链 + node + 右链
        ans = max(ans, node.val + left + right)
        # 向上返回时只能选一侧延伸，否则路径会分叉
        return node.val + max(left, right)

    gain(root)
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

let ans = -Infinity;
const gain = (node) => {
  if (node === null) return 0;
  const left = Math.max(0, gain(node.left));
  const right = Math.max(0, gain(node.right));
  ans = Math.max(ans, node.val + left + right);
  return node.val + Math.max(left, right);
};

gain(buildTree(arr));
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

ans = float('-inf')

def gain(node):
    global ans
    if node is None:
        return 0
    left = max(0, gain(node.left))
    right = max(0, gain(node.right))
    ans = max(ans, node.val + left + right)
    return node.val + max(left, right)

gain(build_tree(arr))
print(ans)
`,
    },
  },

  idea: `
观察任意一条合法路径：它一定存在唯一的「最高点」（深度最小的节点），路径在这个节点处可能向左、向右或只向一侧延伸。因此可以枚举每个节点作为最高点（拐点），用「左子树单边最大贡献 + 当前节点 + 右子树单边最大贡献」更新答案。

定义 \`gain(node)\` 为「以 \`node\` 为起点、向下只走一条链」能得到的路径和最大值（单边贡献）。递归地：

- \`gain(node) = node.val + max(gain(左), gain(右))\`，但如果某侧贡献为负，不如不走，所以先对两侧贡献与 0 取 max
- 以 \`node\` 为拐点的完整路径和为 \`node.val + max(0, gain(左)) + max(0, gain(右))\`，用它更新全局答案
- 向上返回时只能带一侧（\`node.val + max(左, 右)\`），否则路径会分叉，不再是合法路径

为什么负贡献要舍弃：路径是连续的，接上负和子链只会让总和变小，所以单边贡献与 0 取 max 等价于「宁可不走那边」；但拐点处的当前节点必选（路径至少包含一个节点），因此全负数的树也能得到正确答案（最大的单节点值）。

时间复杂度 O(n)（每个节点访问一次），空间复杂度 O(h)（递归栈，h 为树高）。
`,

  explanation: `
- \`ans\` 初始化为负无穷（Python 用 \`float('-inf')\`），保证全负数树也能被正确更新为最大的单节点值
- \`gain\` 的两个子调用先各自与 0 取 max：\`left\`、\`right\` 表示「愿意接纳」的单边贡献，负数子链直接不要
- 更新答案用 \`node.val + left + right\`：以当前节点为拐点的完整路径，两侧可以同时使用
- 返回值用 \`node.val + max(left, right)\`：给父节点当子链用时只能选一边，这是本题最容易写错的地方（更新答案可以两边都用，向上返回只能二选一）
- 空节点返回 0，使叶子节点的 \`gain\` 恰好等于它自身的值

ACM 版本多了建树一步：按层序标记构造二叉树后调用同一个 \`gain\`，最后打印 \`ans\`。计数变量的作用域写法略有差异：核心版 Python 用 \`nonlocal\`，ACM 版在模块顶层所以用 \`global\`。
`,
};
