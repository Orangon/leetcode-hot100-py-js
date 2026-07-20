// 101. 对称二叉树
// 二叉树题：argSpec 用 { kind: 'tree' } 把层序数组（null 表空节点）构造成二叉树
export default {
  id: 101,
  title: '对称二叉树',
  slug: 'symmetric-tree',
  difficulty: 'easy',
  tags: ['树', '深度优先搜索', '广度优先搜索', '二叉树'],
  hints: [
    '轴对称等价于根的左、右子树互为镜像：对应节点值相等，而且左边的外侧结构要对应右边的外侧结构。',
    '定义双节点递归 isMirror(a, b) 做深度优先比较，始终交叉检查 a.left 与 b.right、a.right 与 b.left。',
    '若 a、b 都为空则返回 true，仅一个为空或节点值不同则返回 false；否则返回两组交叉子树递归结果的逻辑与。',
    '空树和单节点树都应判为 true；ACM 输入先按 n 个层序标记构树，null 表示空节点，最终输出小写 true 或 false。',
  ],

  description: `
给你一个二叉树的根节点 \`root\`，检查它是否轴对称。

即判断这棵树是否关于根节点左右镜像对称：左子树与右子树互为镜像（对应位置节点值相同，且结构互为镜像）。

### 示例

- 输入：\`root = [1,2,2,3,4,4,3]\`，输出：\`true\`
- 输入：\`root = [1,2,2,null,3,null,3]\`，输出：\`false\`（虽然对应位置的值看起来对称，但两棵子树的结构并不互为镜像）
- 输入：\`root = []\`，输出：\`true\`

（数组为二叉树的层序遍历表示，\`null\` 表示空节点）

### 提示

- 树中节点数目在范围 \`[0, 1000]\` 内
- \`-100 <= Node.val <= 100\`

### ACM 模式输入输出格式

- 输入：第一行为整数 \`n\`（层序序列长度）；第二行为 \`n\` 个标记（空格分隔），每个标记为整数或 \`null\`，按层序描述二叉树（\`n = 0\` 时该行为空行，表示空树）
- 输出：\`true\` 或 \`false\`（小写）

ACM 输入示例：
\`\`\`
7
1 2 2 3 4 4 3
\`\`\`
输出：\`true\`
`,

  functionName: 'isSymmetric',
  compare: 'exact',
  argSpec: [{ kind: 'tree' }],

  tests: [
    { args: [[1, 2, 2, 3, 4, 4, 3]], expected: true },
    { args: [[1, 2, 2, null, 3, null, 3]], expected: false },
    { args: [[]], expected: true },
    { args: [[1]], expected: true },
    { args: [[1, 2, 2, 2, null, 2]], expected: false },
    { args: [[-1, -2, -2, -3, -4, -4, -3]], expected: true },
    { args: [[1, 2]], expected: false },
    { args: [[1, 1, 1, 1, null, 1]], expected: false },
    { args: [[1, 1, 1, 1, 1, 1, 1]], expected: true },
    { args: [[60, 4, 4, 90, -39, -39, 90, -30, -96, -78, 70, 70, -78, -96, -30, 15, null, 74, null, -6, 56, -83, 82, 82, -83, 56, -6, null, 74, null, 15, 33, -88, -50, -78, -21, -5, null, 99, null, null, null, null, null, null, null, null, 99, null, -5, -21, -78, -50, -88, 33, null, 56, null, null, null, null, null, null, -95, 81, -72, 77, null, null, null, null, 77, -72, 81, -95, null, null, null, null, null, null, 56, null, null, null, 34, -79, null, null, null, null, 15, 69, 69, 15, null, null, null, null, -79, 34, null, null, null, null, null, null, -27, null, null, null, null, null, null, -27]], expected: true },
  ],

  acmTests: [
    { input: '7\n1 2 2 3 4 4 3\n', output: 'true\n' },
    { input: '7\n1 2 2 null 3 null 3\n', output: 'false\n' },
    { input: '0\n\n', output: 'true\n' },
    { input: '1\n1\n', output: 'true\n' },
    { input: '6\n1 2 2 2 null 2\n', output: 'false\n' },
    { input: '7\n-1 -2 -2 -3 -4 -4 -3\n', output: 'true\n' },
    { input: '2\n1 2\n', output: 'false\n' },
    { input: '6\n1 1 1 1 null 1\n', output: 'false\n' },
    { input: '7\n1 1 1 1 1 1 1\n', output: 'true\n' },
    { input: '115\n60 4 4 90 -39 -39 90 -30 -96 -78 70 70 -78 -96 -30 15 null 74 null -6 56 -83 82 82 -83 56 -6 null 74 null 15 33 -88 -50 -78 -21 -5 null 99 null null null null null null null null 99 null -5 -21 -78 -50 -88 33 null 56 null null null null null null -95 81 -72 77 null null null null 77 -72 81 -95 null null null null null null 56 null null null 34 -79 null null null null 15 69 69 15 null null null null -79 34 null null null null null null -27 null null null null null null -27\n', output: 'true\n' },
  ],

  templates: {
    core: {
      javascript: `/**
 * 二叉树节点：{ val: number, left: TreeNode | null, right: TreeNode | null }
 * @param {TreeNode} root
 * @return {boolean}
 */
var isSymmetric = function(root) {
    
};
`,
      python: `def isSymmetric(root):
    # root 为二叉树根节点（TreeNode），返回是否轴对称（布尔值）
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

// 将层序标记构造成二叉树（节点为 { val, left, right }），判断对称后输出 true / false

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

# 将层序标记构造成二叉树（TreeNode），判断对称后输出 true / false
`,
    },
  },

  solutions: {
    core: {
      javascript: `var isSymmetric = function(root) {
  // 判断两棵树是否互为镜像
  const isMirror = function(a, b) {
    if (a === null && b === null) return true;
    if (a === null || b === null) return false;
    return (
      a.val === b.val &&
      isMirror(a.left, b.right) && // 外侧对外侧
      isMirror(a.right, b.left)    // 内侧对内侧
    );
  };
  return root === null || isMirror(root.left, root.right);
};
`,
      python: `def isSymmetric(root):
    # 判断两棵树是否互为镜像
    def is_mirror(a, b):
        if a is None and b is None:
            return True
        if a is None or b is None:
            return False
        return (
            a.val == b.val
            and is_mirror(a.left, b.right)   # 外侧对外侧
            and is_mirror(a.right, b.left)   # 内侧对内侧
        )

    return root is None or is_mirror(root.left, root.right)
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

// 判断两棵树是否互为镜像
function isMirror(a, b) {
  if (a === null && b === null) return true;
  if (a === null || b === null) return false;
  return a.val === b.val && isMirror(a.left, b.right) && isMirror(a.right, b.left);
}

const root = buildTree(arr);
const ok = root === null || isMirror(root.left, root.right);
console.log(ok ? 'true' : 'false');
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

# 判断两棵树是否互为镜像
def is_mirror(a, b):
    if a is None and b is None:
        return True
    if a is None or b is None:
        return False
    return a.val == b.val and is_mirror(a.left, b.right) and is_mirror(a.right, b.left)

root = build_tree(arr)
ok = root is None or is_mirror(root.left, root.right)
print('true' if ok else 'false')
`,
    },
  },

  idea: `
一棵树镜像对称，等价于它的左子树与右子树互为镜像。问题转化为：判断两棵树是否互为镜像。

**递归（深度优先搜索）**：定义 \`isMirror(a, b)\` 判断两棵树 a、b 是否互为镜像：

- 两棵都为空：互为镜像
- 只有一棵为空：不是
- 根值不同：不是
- 否则要求「a 的左子树与 b 的右子树互为镜像」且「a 的右子树与 b 的左子树互为镜像」——即外侧对外侧、内侧对内侧

**迭代（广度优先搜索）**：用队列成对存放应互为镜像的两个节点，每次取出一对做同样的检查，再把交叉配对的四个孩子入队。

两种写法时间复杂度都是 O(n)（每个节点访问一次）；空间复杂度 O(n)（递归栈或队列）。
`,

  explanation: `
- 递归出口有两个：\`a === null && b === null\` 返回 \`true\`；只有一个为 \`null\` 返回 \`false\`——结构不同直接不对称
- 值相等后再「交叉」递归：\`a.left\` 对 \`b.right\`、\`a.right\` 对 \`b.left\`，这正是「镜像」的含义；如果误写成左对左、右对右，就变成判断两棵树是否相同了
- 主函数对空树直接返回 \`true\`；非空时只需比较 \`root.left\` 与 \`root.right\`
- 典型反例 \`[1,2,2,null,3,null,3]\`：两棵子树值完全一样，但都是「只有右孩子」，互为相同而非镜像，交叉比较时 null 对上 3，返回 false

ACM 版本在核心逻辑前后各加一段：先按层序数组构造二叉树（用游标 \`j\` 依次为每个非空节点分配左右孩子），判断后按题意输出小写的 \`'true'\` / \`'false'\` 字符串，而不是直接打印布尔值。
`,
};
