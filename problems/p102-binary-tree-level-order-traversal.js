// 102. 二叉树的层序遍历
// 二叉树题：argSpec 用 { kind: 'tree' } 把层序数组（null 表空节点）构造成二叉树
export default {
  id: 102,
  title: '二叉树的层序遍历',
  slug: 'binary-tree-level-order-traversal',
  difficulty: 'medium',
  tags: ['树', '广度优先搜索', '二叉树'],
  hints: [
    '层序遍历要求按深度分组且同层从左到右访问，队列的先进先出顺序恰好对应这一访问次序。',
    '使用广度优先搜索维护待访问节点，并在每轮开始时固定队列长度，把这一批节点作为当前层处理。',
    '若根为空直接返回空数组；否则根入队，循环记录 size，连续出队 size 个节点收集值并依次加入非空左右孩子，再把本层结果加入答案。',
    '不要让本轮新入队的孩子混入当前层；ACM 输入中的 null 仅表示空节点，n 为 0 时空树不应输出任何内容。',
  ],

  description: `
给你二叉树的根节点 \`root\`，返回其节点值的**层序遍历**结果（即逐层地、从左到右访问所有节点）。

返回值是一个二维数组：第 \`i\` 个子数组包含第 \`i\` 层所有节点的值（根节点为第 0 层）。

### 示例

- 输入：\`root = [3,9,20,null,null,15,7]\`，输出：\`[[3],[9,20],[15,7]]\`
- 输入：\`root = [1]\`，输出：\`[[1]]\`
- 输入：\`root = []\`，输出：\`[]\`

（数组为二叉树的层序遍历表示，\`null\` 表示空节点）

### 提示

- 树中节点数目在范围 \`[0, 2000]\` 内
- \`-1000 <= Node.val <= 1000\`

### ACM 模式输入输出格式

- 输入：第一行为整数 \`n\`（层序序列长度）；第二行为 \`n\` 个标记（空格分隔），每个标记为整数或 \`null\`，按层序描述二叉树（\`n = 0\` 时该行为空行，表示空树）
- 输出：每层一行，该层节点值按从左到右顺序以空格分隔；空树不输出任何内容

ACM 输入示例：
\`\`\`
7
3 9 20 null null 15 7
\`\`\`
输出：
\`\`\`
3
9 20
15 7
\`\`\`
`,

  functionName: 'levelOrder',
  compare: 'exact',
  argSpec: [{ kind: 'tree' }],

  tests: [
    { args: [[3, 9, 20, null, null, 15, 7]], expected: [[3], [9, 20], [15, 7]] },
    { args: [[1]], expected: [[1]] },
    { args: [[]], expected: [] },
    { args: [[1, 2, 3, 4, 5]], expected: [[1], [2, 3], [4, 5]] },
    { args: [[1, null, 2, null, 3]], expected: [[1], [2], [3]] },
    { args: [[-1, 0, 2]], expected: [[-1], [0, 2]] },
    { args: [[1, 2, null, 3, null, 4]], expected: [[1], [2], [3], [4]] },
    { args: [[1, 2, 3, 4, 5, 6, 7]], expected: [[1], [2, 3], [4, 5, 6, 7]] },
    { args: [[7, 7, 7, 7, 7, 7, 7]], expected: [[7], [7, 7], [7, 7, 7, 7]] },
    { args: [[-126, -840, 921, 887, -314, -30, -71, -524, 995, 329, -155, null, -929, -409, -859, 640, null, 316, 678, 131, 799, -78, 982, -32, null, 825, null, null, -590, -214, -259, 697, -943, null, null, 982, 88, -523, 171, null, -390, -54, -876, -222, 608, null, null, null, -87, 107, 929, null, null, 678, null, null, -734, null, null, -701, null, -582, 948, null, 728, null, 934, -625, 51, -137, -654, 729, 226, null, -877, null, -699, null, null, null, 8, null, 37, -805, 236, -763, null, null, null, null, null, null, null, null, null, -314, null, null, null, 885, null, null, 749, null, null, null, null, null, null, 717, null, -59, -792, null, null, null, -540, null, -99, -820, 527, null, -75, null, 349, null, null, null, null, -646, 312, null, 996, null, null, null, null, 797, null, null, -883, 957, null, -779, null, null, null, null, null, null, null, null, null, null, null, -195]], expected: [[-126], [-840, 921], [887, -314, -30, -71], [-524, 995, 329, -155, -929, -409, -859], [640, 316, 678, 131, 799, -78, 982, -32, 825, -590], [-214, -259, 697, -943, 982, 88, -523, 171, -390, -54, -876, -222, 608, -87], [107, 929, 678, -734, -701, -582, 948, 728, 934, -625, 51, -137, -654, 729, 226, -877, -699], [8, 37, -805, 236, -763, -314, 885, 749, 717], [-59, -792, -540, -99, -820, 527, -75, 349], [-646, 312, 996, 797, -883, 957, -779], [-195]] },
  ],

  acmTests: [
    { input: '7\n3 9 20 null null 15 7\n', output: '3\n9 20\n15 7\n' },
    { input: '1\n1\n', output: '1\n' },
    { input: '0\n\n', output: '' },
    { input: '5\n1 2 3 4 5\n', output: '1\n2 3\n4 5\n' },
    { input: '5\n1 null 2 null 3\n', output: '1\n2\n3\n' },
    { input: '3\n-1 0 2\n', output: '-1\n0 2\n' },
    { input: '6\n1 2 null 3 null 4\n', output: '1\n2\n3\n4\n' },
    { input: '7\n1 2 3 4 5 6 7\n', output: '1\n2 3\n4 5 6 7\n' },
    { input: '7\n7 7 7 7 7 7 7\n', output: '7\n7 7\n7 7 7 7\n' },
    { input: '156\n-126 -840 921 887 -314 -30 -71 -524 995 329 -155 null -929 -409 -859 640 null 316 678 131 799 -78 982 -32 null 825 null null -590 -214 -259 697 -943 null null 982 88 -523 171 null -390 -54 -876 -222 608 null null null -87 107 929 null null 678 null null -734 null null -701 null -582 948 null 728 null 934 -625 51 -137 -654 729 226 null -877 null -699 null null null 8 null 37 -805 236 -763 null null null null null null null null null -314 null null null 885 null null 749 null null null null null null 717 null -59 -792 null null null -540 null -99 -820 527 null -75 null 349 null null null null -646 312 null 996 null null null null 797 null null -883 957 null -779 null null null null null null null null null null null -195\n', output: '-126\n-840 921\n887 -314 -30 -71\n-524 995 329 -155 -929 -409 -859\n640 316 678 131 799 -78 982 -32 825 -590\n-214 -259 697 -943 982 88 -523 171 -390 -54 -876 -222 608 -87\n107 929 678 -734 -701 -582 948 728 934 -625 51 -137 -654 729 226 -877 -699\n8 37 -805 236 -763 -314 885 749 717\n-59 -792 -540 -99 -820 527 -75 349\n-646 312 996 797 -883 957 -779\n-195\n' },
  ],

  templates: {
    core: {
      javascript: `/**
 * 二叉树节点：{ val: number, left: TreeNode | null, right: TreeNode | null }
 * @param {TreeNode} root
 * @return {number[][]} 每层的节点值组成的数组
 */
var levelOrder = function(root) {
    
};
`,
      python: `def levelOrder(root):
    # root 为二叉树根节点（TreeNode），返回每层节点值组成的二维列表
    pass
`,
    },
    acm: {
      javascript: `// ACM 模式：input 是全部输入（字符串），用 console.log 输出答案
// 输入格式：第一行 n，第二行 n 个标记（整数或 null，层序；n = 0 时为空行）
// 输出：每层一行（值空格分隔），空树不输出任何内容
const lines = input.split('\\n');
const n = Number(lines[0]);
const tokens = n > 0 ? lines[1].trim().split(/\\s+/) : [];
const arr = tokens.map((t) => (t === 'null' ? null : Number(t)));

// 将层序标记构造成二叉树（节点为 { val, left, right }），逐层用 console.log 输出

`,
      python: `# ACM 模式：用 input() 或 sys.stdin 读输入，用 print 输出答案
# 输入格式：第一行 n，第二行 n 个标记（整数或 null，层序；n = 0 时为空行）
# 输出：每层一行（值空格分隔），空树不输出任何内容
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

# 将层序标记构造成二叉树（TreeNode），逐层用 print 输出
`,
    },
  },

  solutions: {
    core: {
      javascript: `var levelOrder = function(root) {
  const ans = [];
  if (root === null) return ans;
  const queue = [root];
  while (queue.length > 0) {
    const size = queue.length; // 本层节点数（先固定住）
    const level = [];
    for (let i = 0; i < size; i++) {
      const node = queue.shift();
      level.push(node.val);
      if (node.left !== null) queue.push(node.left);
      if (node.right !== null) queue.push(node.right);
    }
    ans.push(level);
  }
  return ans;
};
`,
      python: `def levelOrder(root):
    ans = []
    if root is None:
        return ans
    queue = [root]
    while queue:
        size = len(queue)  # 本层节点数（先固定住）
        level = []
        for _ in range(size):
            node = queue.pop(0)
            level.append(node.val)
            if node.left is not None:
                queue.append(node.left)
            if node.right is not None:
                queue.append(node.right)
        ans.append(level)
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

// BFS 逐层输出
const root = buildTree(arr);
if (root !== null) {
  const queue = [root];
  while (queue.length > 0) {
    const size = queue.length;
    const level = [];
    for (let i = 0; i < size; i++) {
      const node = queue.shift();
      level.push(node.val);
      if (node.left !== null) queue.push(node.left);
      if (node.right !== null) queue.push(node.right);
    }
    console.log(level.join(' '));
  }
}
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

# BFS 逐层输出
root = build_tree(arr)
if root is not None:
    queue = [root]
    while queue:
        size = len(queue)
        level = []
        for _ in range(size):
            node = queue.pop(0)
            level.append(str(node.val))
            if node.left is not None:
                queue.append(node.left)
            if node.right is not None:
                queue.append(node.right)
        print(' '.join(level))
`,
    },
  },

  idea: `
层序遍历是**广度优先搜索**的直接应用：用队列维护「待访问」的节点，先进先出，自然就是从左到右、自上而下。

关键技巧是**逐层切分**：每轮循环开始时先记录队列当前的长度 \`size\`，它就是当前这一层的节点数；然后连续出队 \`size\` 个节点、收集它们的值，同时把它们的左右孩子入队——这批孩子恰好构成下一层。

另一种做法是 DFS 时携带深度参数，把节点值追加到对应深度的子数组里，效果相同。

时间复杂度 O(n)（每个节点入队、出队各一次）；空间复杂度 O(w)（w 为最大层宽，最坏 O(n)）。
`,

  explanation: `
- 空树特判：\`root\` 为空时直接返回空数组（ACM 版本对应「不输出任何内容」）
- \`size = queue.length\` 必须在内层循环开始前固定住：循环过程中会不断往队列尾部追加下一层的节点，如果直接用 \`queue.length\` 当循环条件，本层和下一层就混在一起了——这是层序遍历最容易犯的错
- 内层循环恰好出队 \`size\` 次：收集节点值、把非空孩子入队；一轮结束后 \`level\` 就是完整的一层，推入结果数组
- \`queue.shift()\` / \`queue.pop(0)\` 是队首出队；数据量大时可换成下标指针或 \`collections.deque\`，本题规模下无所谓

ACM 版本先按层序数组建树，再跑同一个 BFS，每层收集完后用 \`console.log(level.join(' '))\` / \`print(' '.join(level))\` 输出一行；空树时循环体一次都不执行，自然没有输出。
`,
};
