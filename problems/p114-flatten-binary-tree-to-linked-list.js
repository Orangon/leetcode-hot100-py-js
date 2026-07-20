// 114. 二叉树展开为链表
// 树题：原地展开、无返回值；resultKind 为 inputTree，判题器取展开后的树序列化成层序数组比对
export default {
  id: 114,
  title: '二叉树展开为链表',
  slug: 'flatten-binary-tree-to-linked-list',
  difficulty: 'medium',
  tags: ['栈', '树', '深度优先搜索', '链表', '二叉树'],
  hints: [
    '展开后的右链顺序正是原树的前序遍历，并且每个节点的左指针最终都必须置为 null。',
    '可以原地迭代处理每个节点：有左子树时，把左子树插入当前节点与原右子树之间，从而只用 O(1) 额外空间。',
    '维护 cur；若 cur.left 非空，先沿 cur.left 的 right 找到最右节点 prev，再令 prev.right = cur.right、cur.right = cur.left、cur.left = null，最后移动到 cur.right。',
    '空树无需处理；函数原地修改且无返回值，ACM 模式按层序读入含 null 的树，输出展开后保留结构所需的 null 并删除末尾 null。',
  ],

  description: `
给你二叉树的根节点 \`root\`，请你将它展开为一个单链表：

- 展开后的单链表应该同样使用 \`TreeNode\`，其中 \`right\` 子指针指向链表中下一个节点，而 \`left\` 子指针始终为 \`null\`
- 展开后的单链表应该与二叉树**前序遍历**的顺序相同

### 示例

- 输入：\`root = [1,2,5,3,4,null,6]\`，输出：\`[1,null,2,null,3,null,4,null,5,null,6]\`
- 输入：\`root = []\`，输出：\`[]\`
- 输入：\`root = [0]\`，输出：\`[0]\`

### 提示

- 树中节点数在范围 \`[0, 2000]\` 内
- \`-100 <= Node.val <= 100\`

### ACM 模式输入输出格式

- 输入：第一行为整数 \`n\`（层序表示的长度）；第二行为 \`n\` 个标记（整数或 \`null\`，按层序给出，\`null\` 表示空节点；\`n = 0\` 时该行为空行）
- 输出：展开后树的层序序列（空格分隔，\`null\` 保留以表结构、末尾 \`null\` 省略；空树输出一个空行）

ACM 输入示例：
\`\`\`
7
1 2 5 3 4 null 6
\`\`\`
输出：\`1 null 2 null 3 null 4 null 5 null 6\`
`,

  functionName: 'flatten',
  compare: 'exact',
  argSpec: [{ kind: 'tree' }],
  resultKind: 'inputTree',

  tests: [
    { args: [[1, 2, 5, 3, 4, null, 6]], expected: [1, null, 2, null, 3, null, 4, null, 5, null, 6] },
    { args: [[]], expected: [] },
    { args: [[1]], expected: [1] },
    { args: [[1, 2, null, 3, null, 4]], expected: [1, null, 2, null, 3, null, 4] },
    { args: [[-1, -2, null, null, -3]], expected: [-1, null, -2, null, -3] },
    { args: [[3, 1, 4, null, null, 2]], expected: [3, null, 1, null, 4, null, 2] },
    { args: [[1, null, 2, null, 3]], expected: [1, null, 2, null, 3] },
    { args: [[2, 2, 2, 2, 2]], expected: [2, null, 2, null, 2, null, 2, null, 2] },
    { args: [[-100, 100, null, -100]], expected: [-100, null, 100, null, -100] },
    { args: [[-10, -27, 77, -45, -54, 87, 5, 50, null, 34, 28, 56, 68, null, 16, -68, 74, -89, 2, -42, 10, 50, -94, 5, 35, -13, 91, null, -81, 22, null, null, null, 1, null, -72, 27, 73, -73, null, null, -56, 36, null, null, null, null, -58, -91, 12, null, null, null, -76, null, null, null, -17, -6, null, null, null, null, 74, 3, null, 11, null, -44, null, -46, 0, null, -100, null, null, null, 10, null, -3, -21, null, null, -28, 89, null, null, null, null, null, null, null, null, null, null, -48, -42, null, null, null, null, null, -10, -12, -46, -24, null, null, null, -53, null, null, null, null, null, -13, null, null, null, 21]], expected: [-10, null, -27, null, -45, null, 50, null, -68, null, -81, null, 74, null, 22, null, -76, null, -54, null, 34, null, -89, null, 2, null, 1, null, 28, null, -42, null, -72, null, -17, null, 10, null, -48, null, -24, null, -13, null, 21, null, -42, null, -6, null, -3, null, -21, null, 27, null, 10, null, 73, null, -73, null, 74, null, 3, null, -28, null, -10, null, -53, null, 89, null, -12, null, -46, null, 77, null, 87, null, 56, null, 50, null, -94, null, -56, null, 11, null, 36, null, -44, null, 68, null, 5, null, 35, null, 5, null, 16, null, -13, null, -58, null, -46, null, -91, null, 0, null, 91, null, 12, null, -100] },
  ],

  acmTests: [
    { input: '7\n1 2 5 3 4 null 6\n', output: '1 null 2 null 3 null 4 null 5 null 6\n' },
    { input: '0\n\n', output: '\n' },
    { input: '1\n1\n', output: '1\n' },
    { input: '6\n1 2 null 3 null 4\n', output: '1 null 2 null 3 null 4\n' },
    { input: '5\n-1 -2 null null -3\n', output: '-1 null -2 null -3\n' },
    { input: '6\n3 1 4 null null 2\n', output: '3 null 1 null 4 null 2\n' },
    { input: '5\n1 null 2 null 3\n', output: '1 null 2 null 3\n' },
    { input: '5\n2 2 2 2 2\n', output: '2 null 2 null 2 null 2 null 2\n' },
    { input: '4\n-100 100 null -100\n', output: '-100 null 100 null -100\n' },
    { input: '120\n-10 -27 77 -45 -54 87 5 50 null 34 28 56 68 null 16 -68 74 -89 2 -42 10 50 -94 5 35 -13 91 null -81 22 null null null 1 null -72 27 73 -73 null null -56 36 null null null null -58 -91 12 null null null -76 null null null -17 -6 null null null null 74 3 null 11 null -44 null -46 0 null -100 null null null 10 null -3 -21 null null -28 89 null null null null null null null null null null -48 -42 null null null null null -10 -12 -46 -24 null null null -53 null null null null null -13 null null null 21\n', output: '-10 null -27 null -45 null 50 null -68 null -81 null 74 null 22 null -76 null -54 null 34 null -89 null 2 null 1 null 28 null -42 null -72 null -17 null 10 null -48 null -24 null -13 null 21 null -42 null -6 null -3 null -21 null 27 null 10 null 73 null -73 null 74 null 3 null -28 null -10 null -53 null 89 null -12 null -46 null 77 null 87 null 56 null 50 null -94 null -56 null 11 null 36 null -44 null 68 null 5 null 35 null 5 null 16 null -13 null -58 null -46 null -91 null 0 null 91 null 12 null -100\n' },
  ],

  templates: {
    core: {
      javascript: `/**
 * 二叉树节点：{ val: number, left: TreeNode | null, right: TreeNode | null }
 * 原地展开为右链，不需要返回值
 * @param {TreeNode} root
 * @return {void}
 */
var flatten = function(root) {
    
};
`,
      python: `def flatten(root):
    # root 为二叉树根节点（TreeNode），原地展开为右链，不需要返回值
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
// 原地展开为右链后，按层序输出（null 保留、末尾 null 省略；空树输出一个空行）

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

# 按层序构造二叉树，原地展开为右链后，按层序输出（null 保留、末尾 null 省略；空树输出一个空行）
`,
    },
  },

  solutions: {
    core: {
      javascript: `var flatten = function(root) {
  let cur = root;
  while (cur !== null) {
    if (cur.left !== null) {
      // 左子树的最右节点：前序遍历中左子树的最后一个节点
      let prev = cur.left;
      while (prev.right !== null) prev = prev.right;
      prev.right = cur.right; // 原右子树接到它后面
      cur.right = cur.left;   // 左子树整体移到右侧
      cur.left = null;
    }
    cur = cur.right;
  }
};
`,
      python: `def flatten(root):
    cur = root
    while cur is not None:
        if cur.left is not None:
            # 左子树的最右节点：前序遍历中左子树的最后一个节点
            prev = cur.left
            while prev.right is not None:
                prev = prev.right
            prev.right = cur.right  # 原右子树接到它后面
            cur.right = cur.left    # 左子树整体移到右侧
            cur.left = None
        cur = cur.right
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

// 原地展开：寻找左子树最右节点，O(1) 额外空间
let cur = root;
while (cur !== null) {
  if (cur.left !== null) {
    let prev = cur.left;
    while (prev.right !== null) prev = prev.right;
    prev.right = cur.right;
    cur.right = cur.left;
    cur.left = null;
  }
  cur = cur.right;
}

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

# 原地展开：寻找左子树最右节点，O(1) 额外空间
cur = root
while cur is not None:
    if cur.left is not None:
        prev = cur.left
        while prev.right is not None:
            prev = prev.right
        prev.right = cur.right
        cur.right = cur.left
        cur.left = None
    cur = cur.right

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
观察展开结果：右链上的节点顺序恰好是原树的**前序遍历**顺序，且每个节点的左指针都为 \`null\`。

**方法一：寻找左子树最右节点（O(1) 空间，参考答案采用）**。维护当前节点 \`cur\`：如果 \`cur\` 有左子树，那么前序顺序中左子树整体排在右子树前面，于是——

- 在左子树中一路向右找到最右节点 \`prev\`（即前序下左子树的最后一个节点）
- 把 \`cur\` 的右子树接到 \`prev.right\`
- 把左子树整体挪到 \`cur.right\`，\`cur.left\` 置空

然后 \`cur = cur.right\` 继续前进直到末尾。每个节点的边只被调整常数次，时间 O(n)，额外空间 O(1)。

**方法二：前序遍历式展开**。先按前序把节点依次存进数组（或递归时边遍历边重接指针），再让数组中每个节点的右指针指向下一个、左指针置空。时间 O(n)，空间 O(n)。
`,

  explanation: `
循环维护当前节点 \`cur\`，关键是处理左子树时的三步顺序：

- 先在左子树里一路向右找到最右节点 \`prev\`——前序遍历中它是左子树的最后一个节点
- \`prev.right = cur.right\`：把原右子树挂到它后面（必须先做，否则下一步会覆盖掉 \`cur.right\`）
- \`cur.right = cur.left; cur.left = null\`：左子树整体移到右侧，左指针按要求置空

随后 \`cur = cur.right\` 前进。左子树内部可能还套着左子树，但没关系：它被挪到右侧后，循环推进到那里时自然会继续展开。空树时循环条件直接不成立，什么都不做。函数原地修改、不需要返回值，判题器读取被修改后的树再序列化比对。

ACM 版本多两步：先从层序标记构造二叉树；展开后做层序序列化——队列中 \`null\` 也入队以保留结构信息，输出前去掉末尾多余的 \`null\`；空树序列化为空数组，打印出一个空行。
`,
};
