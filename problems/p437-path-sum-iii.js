// 437. 路径总和 III
// 二叉树题：argSpec 用 { kind: 'tree' } 构造根节点，targetSum 为普通参数
export default {
  id: 437,
  title: '路径总和 III',
  slug: 'path-sum-iii',
  difficulty: 'medium',
  tags: ['树', '深度优先搜索', '二叉树', '前缀和'],
  hints: [
    '每条合法路径都是某条根到当前节点链上的连续区间；若当前前缀和为 curr，则起点之前的前缀和应为 curr - targetSum。',
    '对二叉树做深度优先搜索，并用哈希表只记录当前祖先链上各前缀和的出现次数，从而在线统计以每个节点结尾的路径。',
    '先置 prefix[0] = 1；进入节点后更新 curr，累加 prefix[curr - targetSum]，再增加 prefix[curr]、递归左右子树，离开节点时将 prefix[curr] 减一完成回溯。',
    '节点值可为负数，不能用依赖单调性的滑动窗口；ACM 模式需按层序标记构树，n = 0 时第二行为空，最终输出路径条数整数。',
  ],

  description: `
给定一个二叉树的根节点 \`root\` 和一个整数 \`targetSum\`，求该二叉树里节点值之和等于 \`targetSum\` 的**路径**的数目。

路径**不需要从根节点开始，也不需要在叶子节点结束**，但是路径方向必须是向下的（只能从父节点到子节点）。

### 示例

- 输入：\`root = [10,5,-3,3,2,null,11,3,-2,null,1], targetSum = 8\`，输出：\`3\`（和为 8 的路径有 5->3、5->2->1、-3->11）
- 输入：\`root = [5,4,8,11,null,13,4,7,2,null,null,5,1], targetSum = 22\`，输出：\`3\`
- 输入：\`root = [1], targetSum = 1\`，输出：\`1\`

### 提示

- 树中节点的数目在范围 \`[0, 1000]\` 内
- \`-10^9 <= Node.val <= 10^9\`
- \`-1000 <= targetSum <= 1000\`
- 节点值可能为负数，因此不能像正数场景那样用滑动窗口

### ACM 模式输入输出格式

- 输入：第一行为整数 \`n\`（节点个数）；第二行为 \`n\` 个标记（空格分隔），每个标记是整数或 \`null\`，按层序给出整棵树（\`n = 0\` 时该行为空行）；第三行为 \`targetSum\`
- 输出：一个整数，即满足条件的路径数目

ACM 输入示例：
\`\`\`
11
10 5 -3 3 2 null 11 3 -2 null 1
8
\`\`\`
输出：\`3\`
`,

  functionName: 'pathSum',
  compare: 'exact',
  argSpec: [{ kind: 'tree' }, { kind: 'plain' }],

  tests: [
    { args: [[10, 5, -3, 3, 2, null, 11, 3, -2, null, 1], 8], expected: 3 },
    { args: [[5, 4, 8, 11, null, 13, 4, 7, 2, null, null, 5, 1], 22], expected: 3 },
    { args: [[1], 1], expected: 1 },
    { args: [[1], 0], expected: 0 },
    { args: [[1, -2, -3], -1], expected: 1 },
    { args: [[0, 1, 1], 1], expected: 4 },
    { args: [[1, -1, 1, null, null, -1, 1], 0], expected: 2 },
    { args: [[0, 1, 0], 0], expected: 3 },
    { args: [[1, null, 2, null, 3, null, 4, null, 5], 5], expected: 2 },
    { args: [[5, -3, -5, 5, 1, -2, 0, 4, -3, 1, 4, 5, 2, 0, 1, -1, 0, 5, -5, 3, 3, 3, -1, null, null, null, null, -1, null, 1, 0, null, null, -5, 4, -3, -1, 4, null, 3, 4, 4, 2, -1, 5, null, null, null, null, null, null, null, null, null, null, null, null, 1, -3, 2, -3, null, 5, null, null, null, null, null, null, null, null, null, null, null, null, null, -4, -3, 3, 1, -1, 4, 5, null, 3, null, null, null, 4, -3, 0, null, null, 1, -3, null, null, -1, -2, null, null, 2, 3, null, -5], -3], expected: 17 },
  ],

  acmTests: [
    { input: '11\n10 5 -3 3 2 null 11 3 -2 null 1\n8\n', output: '3\n' },
    { input: '12\n5 4 8 11 null 13 4 7 2 null null 5 1\n22\n', output: '3\n' },
    { input: '1\n1\n1\n', output: '1\n' },
    { input: '1\n1\n0\n', output: '0\n' },
    { input: '3\n1 -2 -3\n-1\n', output: '1\n' },
    { input: '3\n0 1 1\n1\n', output: '4\n' },
    { input: '7\n1 -1 1 null null -1 1\n0\n', output: '2\n' },
    { input: '3\n0 1 0\n0\n', output: '3\n' },
    { input: '9\n1 null 2 null 3 null 4 null 5\n5\n', output: '2\n' },
    { input: '105\n5 -3 -5 5 1 -2 0 4 -3 1 4 5 2 0 1 -1 0 5 -5 3 3 3 -1 null null null null -1 null 1 0 null null -5 4 -3 -1 4 null 3 4 4 2 -1 5 null null null null null null null null null null null null 1 -3 2 -3 null 5 null null null null null null null null null null null null null -4 -3 3 1 -1 4 5 null 3 null null null 4 -3 0 null null 1 -3 null null -1 -2 null null 2 3 null -5\n-3\n', output: '17\n' },
  ],

  templates: {
    core: {
      javascript: `/**
 * 二叉树节点：{ val: number, left: TreeNode | null, right: TreeNode | null }
 * @param {TreeNode} root
 * @param {number} targetSum
 * @return {number}
 */
var pathSum = function(root, targetSum) {
    
};
`,
      python: `def pathSum(root, targetSum):
    # root 为二叉树根节点（TreeNode），返回和为 targetSum 的向下路径条数
    pass
`,
    },
    acm: {
      javascript: `// ACM 模式：input 是全部输入（字符串），用 console.log 输出答案
// 输入格式：第一行 n，第二行 n 个标记（整数或 null，层序；n = 0 时为空行），第三行 targetSum
const lines = input.split('\\n');
const n = Number(lines[0]);
const tokens = n > 0 ? lines[1].trim().split(/\\s+/) : [];
const targetSum = Number(lines[2]);

// 将层序标记构造成二叉树（节点为 { val, left, right }），统计路径数目后用 console.log 输出

`,
      python: `# ACM 模式：用 input() 或 sys.stdin 读输入，用 print 输出答案
# 输入格式：第一行 n，第二行 n 个标记（整数或 null，层序；n = 0 时为空行），第三行 targetSum
import sys

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

lines = sys.stdin.read().split('\\n')
n = int(lines[0])
tokens = lines[1].split() if n > 0 else []
target_sum = int(lines[2])

# 将层序标记构造成二叉树（TreeNode），统计路径数目后用 print 输出
`,
    },
  },

  solutions: {
    core: {
      javascript: `var pathSum = function(root, targetSum) {
  // 前缀和 + 哈希表：curr 为根到当前节点的路径和，
  // 若 curr - targetSum 曾在祖先路径上出现过，中间那段就是一条合法路径
  const map = new Map(); // 前缀和 -> 出现次数
  map.set(0, 1); // 空前缀：从根开始的路径
  let count = 0;
  const dfs = (node, curr) => {
    if (node === null) return;
    curr += node.val;
    count += map.get(curr - targetSum) || 0;
    map.set(curr, (map.get(curr) || 0) + 1);
    dfs(node.left, curr);
    dfs(node.right, curr);
    map.set(curr, map.get(curr) - 1); // 回溯：离开当前子树前撤销本层的前缀和
  };
  dfs(root, 0);
  return count;
};
`,
      python: `def pathSum(root, targetSum):
    # 前缀和 + 哈希表：curr 为根到当前节点的路径和，
    # 若 curr - targetSum 曾在祖先路径上出现过，中间那段就是一条合法路径
    prefix = {0: 1}  # 前缀和 -> 出现次数；0 对应从根开始的路径
    count = 0

    def dfs(node, curr):
        nonlocal count
        if node is None:
            return
        curr += node.val
        count += prefix.get(curr - targetSum, 0)
        prefix[curr] = prefix.get(curr, 0) + 1
        dfs(node.left, curr)
        dfs(node.right, curr)
        prefix[curr] -= 1  # 回溯：离开当前子树前撤销本层的前缀和

    dfs(root, 0)
    return count
`,
    },
    acm: {
      javascript: `const lines = input.split('\\n');
const n = Number(lines[0]);
const tokens = n > 0 ? lines[1].trim().split(/\\s+/) : [];
const targetSum = Number(lines[2]);
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

// 前缀和 + 哈希表
const map = new Map();
map.set(0, 1);
let count = 0;
const dfs = (node, curr) => {
  if (node === null) return;
  curr += node.val;
  count += map.get(curr - targetSum) || 0;
  map.set(curr, (map.get(curr) || 0) + 1);
  dfs(node.left, curr);
  dfs(node.right, curr);
  map.set(curr, map.get(curr) - 1);
};

dfs(buildTree(arr), 0);
console.log(count);
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
target_sum = int(lines[2])
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

# 前缀和 + 哈希表
prefix = {0: 1}
count = 0

def dfs(node, curr):
    global count
    if node is None:
        return
    curr += node.val
    count += prefix.get(curr - target_sum, 0)
    prefix[curr] = prefix.get(curr, 0) + 1
    dfs(node.left, curr)
    dfs(node.right, curr)
    prefix[curr] -= 1

dfs(build_tree(arr), 0)
print(count)
`,
    },
  },

  idea: `
**双重 DFS（暴力）**：外层 DFS 枚举每个节点作为路径起点，内层 DFS 向下累加路径和并统计，时间复杂度 O(n²)，节点数不超过 1000 时也能过。

**前缀和 + 哈希表（参考做法）**：把「路径和等于 targetSum」转化为前缀和差值问题。沿根到当前节点累加路径和 \`curr\`，那么「以当前节点结尾、和为 targetSum 的向下路径」的条数，就等于祖先路径上前缀和等于 \`curr - targetSum\` 的次数——这与数组版「和为 K 的子数组」完全同理。用哈希表记录当前根到节点这条链上各前缀和的出现次数，DFS 进入子树前插入、离开时撤销（回溯），一次遍历即可统计全部答案。节点值有负数也没关系，前缀和方法不要求元素非负。

时间复杂度 O(n)，每个节点只访问一次；空间复杂度 O(h)，h 为树高（哈希表只保存当前链上的前缀和）。
`,

  explanation: `
- \`map\` / \`prefix\` 记录「当前根到节点这条链上，各前缀和出现的次数」，预先放入 \`0: 1\`，表示「从根节点开始累计」这种情况
- 递归进入节点时先把 \`curr\` 加上 \`node.val\`，此时 \`curr - targetSum\` 若在哈希表中，说明存在某个祖先位置，它之后到当前节点的这段路径和恰为 \`targetSum\`，出现几次就贡献几条路径
- 然后把 \`curr\` 自身的计数加一，再递归左右孩子
- **回溯是关键**：离开节点前把 \`curr\` 的计数减一，否则兄弟子树会错误地看到不属于自己祖先链的前缀和
- 先查表再插入的顺序保证了「路径至少包含当前节点」，不会出现空路径
- 计数变量：JS 用闭包里的 \`count\`，Python 核心版用 \`nonlocal\`，ACM 版因为在模块顶层定义函数，改用 \`global\`

ACM 版本先把层序标记构造成二叉树（游标 \`j\` 依次接左右孩子），前缀和统计逻辑与核心代码模式完全一致，最后打印 \`count\`。
`,
};
