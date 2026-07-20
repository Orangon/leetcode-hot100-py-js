// 230. 二叉搜索树中第 K 小的元素
// 树题：argSpec 把层序数组构造成二叉树（null 表示空节点），k 为普通参数
export default {
  id: 230,
  title: '二叉搜索树中第 K 小的元素',
  slug: 'kth-smallest-element-in-a-bst',
  difficulty: 'medium',
  tags: ['树', '深度优先搜索', '二叉搜索树', '二叉树'],
  hints: [
    '二叉搜索树的中序遍历会按从小到大访问节点，因此第 k 小元素就是中序序列中第 k 个被访问的节点。',
    '采用左—根—右的中序遍历并维护访问计数，计数达到 k 后记录当前值并提前停止后续遍历。',
    '执行 dfs(node)：空节点或已找到答案时返回；先递归左子树，再令 count 加一并在 count === k 时保存 node.val，否则递归右子树。',
    '实现时 k 从 1 开始且递归深度最坏为树高；ACM 模式需按 n 个层序标记（null 为空）还原树，读取第三行 k，并只输出答案整数。',
  ],

  description: `
给定一个二叉搜索树的根节点 \`root\`，和一个整数 \`k\`，请你设计一个算法查找其中第 \`k\` 小的元素（从 1 开始计数）。

### 示例

- 输入：\`root = [3,1,4,null,2], k = 1\`，输出：\`1\`
- 输入：\`root = [5,3,6,2,4,null,null,1], k = 3\`，输出：\`3\`

### 提示

- 树中的节点数为 \`n\`
- \`1 <= k <= n <= 10^4\`
- \`0 <= Node.val <= 10^4\`

### ACM 模式输入输出格式

- 输入：第一行为整数 \`n\`（层序表示的长度）；第二行为 \`n\` 个标记（整数或 \`null\`，按层序给出，\`null\` 表示空节点；\`n = 0\` 时该行为空行）；第三行为整数 \`k\`
- 输出：一个整数，即第 \`k\` 小的元素值

ACM 输入示例：
\`\`\`
5
3 1 4 null 2
1
\`\`\`
输出：\`1\`
`,

  functionName: 'kthSmallest',
  compare: 'exact',
  argSpec: [{ kind: 'tree' }, { kind: 'plain' }],

  tests: [
    { args: [[3, 1, 4, null, 2], 1], expected: 1 },
    { args: [[5, 3, 6, 2, 4, null, null, 1], 3], expected: 3 },
    { args: [[1], 1], expected: 1 },
    { args: [[4, 2, 6, 1, 3, 5, 7], 7], expected: 7 },
    { args: [[10, 5, 15, 3, 7, null, 18, 1, null, 6, 8], 5], expected: 7 },
    { args: [[5, 4, null, 3, null, 2, null, 1], 1], expected: 1 },
    { args: [[1, null, 2, null, 3, null, 4], 3], expected: 3 },
    { args: [[2, 0, 3, null, 1], 2], expected: 1 },
    { args: [[7464, 345, 7596, 189, 1070, 7588, 8124, 39, 296, 530, 1723, null, null, 8118, 8569, null, null, null, null, 438, 901, 1206, 5833, 8061, null, 8135, 9877, null, null, 717, null, 1106, 1383, 3365, 6167, 7689, null, null, 8364, 8971, 9989, null, 768, null, null, 1329, 1491, 1963, 5564, 5885, 7314, null, null, null, 8539, 8747, 9149, 9924, null, null, null, null, null, null, null, 1741, 2874, 3655, 5806, null, 6125, 6860, null, null, null, 8589, 8868, null, 9585, null, null, null, 1872, 2592, 3213, 3417, 4782, 5767, null, null, null, 6452, 7053, null, null, null, null, 9344, 9751, null, null, 2206, 2835, 3100, 3264, null, 3639, 4207, 5015, 5756, null, 6395, 6518, null, null, null, null, null, 9763, null, 2401, 2706, null, 2983, 3157, 3227, null, 3471, null, 4097, 4222, 4799, 5114, null, null, 6280, null, null, 6568, null, null, 2375, null, 2630, 2810, 2961, 2990, 3121, null, null, null, null, null, 3855, 4206, null, 4781, null, null, null, 5457, null, null, null, null, null, null, null, null, null, null, null, 2964, null, null, null, null, 3751, 4091, null, null, 4701, null, null, null, null, null, null, 3842, 3896, null, 4367, null, null, null, null, null, 4281], 26], expected: 2810 },
  ],

  acmTests: [
    { input: '5\n3 1 4 null 2\n1\n', output: '1\n' },
    { input: '8\n5 3 6 2 4 null null 1\n3\n', output: '3\n' },
    { input: '1\n1\n1\n', output: '1\n' },
    { input: '7\n4 2 6 1 3 5 7\n7\n', output: '7\n' },
    { input: '11\n10 5 15 3 7 null 18 1 null 6 8\n5\n', output: '7\n' },
    { input: '8\n5 4 null 3 null 2 null 1\n1\n', output: '1\n' },
    { input: '7\n1 null 2 null 3 null 4\n3\n', output: '3\n' },
    { input: '5\n2 0 3 null 1\n2\n', output: '1\n' },
    { input: '198\n7464 345 7596 189 1070 7588 8124 39 296 530 1723 null null 8118 8569 null null null null 438 901 1206 5833 8061 null 8135 9877 null null 717 null 1106 1383 3365 6167 7689 null null 8364 8971 9989 null 768 null null 1329 1491 1963 5564 5885 7314 null null null 8539 8747 9149 9924 null null null null null null null 1741 2874 3655 5806 null 6125 6860 null null null 8589 8868 null 9585 null null null 1872 2592 3213 3417 4782 5767 null null null 6452 7053 null null null null 9344 9751 null null 2206 2835 3100 3264 null 3639 4207 5015 5756 null 6395 6518 null null null null null 9763 null 2401 2706 null 2983 3157 3227 null 3471 null 4097 4222 4799 5114 null null 6280 null null 6568 null null 2375 null 2630 2810 2961 2990 3121 null null null null null 3855 4206 null 4781 null null null 5457 null null null null null null null null null null null 2964 null null null null 3751 4091 null null 4701 null null null null null null 3842 3896 null 4367 null null null null null 4281\n26\n', output: '2810\n' },
  ],

  templates: {
    core: {
      javascript: `/**
 * 二叉树节点：{ val: number, left: TreeNode | null, right: TreeNode | null }
 * @param {TreeNode} root
 * @param {number} k
 * @return {number}
 */
var kthSmallest = function(root, k) {
    
};
`,
      python: `def kthSmallest(root, k):
    # root 为二叉搜索树根节点（TreeNode），返回第 k 小的元素值（k 从 1 开始）
    pass
`,
    },
    acm: {
      javascript: `// ACM 模式：input 是全部输入（字符串），用 console.log 输出答案
// 输入格式：第一行 n，第二行 n 个标记（整数或 null，层序；n = 0 时该行为空行），第三行 k
const lines = input.split('\\n');
const n = Number(lines[0]);
const tokens = n > 0 ? lines[1].trim().split(/\\s+/) : [];
const k = Number(lines[2]);

// 按层序构造二叉搜索树（节点为 { val, left, right } 对象，null 表示空节点），
// 找到第 k 小的元素后用 console.log 输出

`,
      python: `# ACM 模式：用 input() 或 sys.stdin 读输入，用 print 输出答案
# 输入格式：第一行 n，第二行 n 个标记（整数或 null，层序；n = 0 时该行为空行），第三行 k
import sys

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

lines = sys.stdin.read().split('\\n')
n = int(lines[0])
tokens = lines[1].split() if n > 0 else []
k = int(lines[2])

# 按层序构造二叉搜索树，找到第 k 小的元素后用 print 输出
`,
    },
  },

  solutions: {
    core: {
      javascript: `var kthSmallest = function(root, k) {
  let count = 0; // 已访问的节点数
  let ans = 0;
  const dfs = function(node) {
    if (node === null || count >= k) return; // 已找到答案，提前终止
    dfs(node.left);
    count += 1;
    if (count === k) {
      ans = node.val; // 中序第 k 个节点即为答案
      return;
    }
    dfs(node.right);
  };
  dfs(root);
  return ans;
};
`,
      python: `def kthSmallest(root, k):
    count = 0  # 已访问的节点数
    ans = 0

    def dfs(node):
        nonlocal count, ans
        if node is None or count >= k:
            return  # 已找到答案，提前终止
        dfs(node.left)
        count += 1
        if count == k:
            ans = node.val  # 中序第 k 个节点即为答案
            return
        dfs(node.right)

    dfs(root)
    return ans
`,
    },
    acm: {
      javascript: `const lines = input.split('\\n');
const n = Number(lines[0]);
const tokens = n > 0 ? lines[1].trim().split(/\\s+/) : [];
const k = Number(lines[2]);

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

// 中序遍历，第 k 个访问到的节点即为答案
let count = 0;
let ans = 0;
function dfs(node) {
  if (node === null || count >= k) return;
  dfs(node.left);
  count += 1;
  if (count === k) {
    ans = node.val;
    return;
  }
  dfs(node.right);
}
dfs(root);
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
k = int(lines[2])

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

# 中序遍历，第 k 个访问到的节点即为答案
count = 0
ans = 0

def dfs(node):
    global count, ans
    if node is None or count >= k:
        return
    dfs(node.left)
    count += 1
    if count == k:
        ans = node.val
        return
    dfs(node.right)

dfs(root)
print(ans)
`,
    },
  },

  idea: `
二叉搜索树最重要的性质：**中序遍历（左 → 根 → 右）得到的恰好是升序序列**。因此「第 k 小的元素」就是中序遍历过程中第 k 个被访问的节点。

做法：按中序顺序递归遍历，每访问一个节点就把计数器加一，计数达到 k 时记下当前节点的值；之后无需再遍历剩余的树，可以**提前终止**。

设树高为 h：递归最多深入 h 层、最多访问 k 个节点，时间复杂度 O(h + k)（树平衡时为 O(log n + k)，退化成链时为 O(n)），空间复杂度 O(h)（递归栈）。
`,

  explanation: `
- \`dfs\` 严格按中序定义递归：先左子树，再处理当前节点，最后右子树
- 计数器 \`count\` 记录已经访问了多少个节点；当 \`count === k\` 时，当前节点就是第 k 小，记入 \`ans\`
- 递归入口的 \`count >= k\` 判断实现提前终止：找到答案后，所有后续递归调用都直接返回，不做无用功
- Python 版在嵌套函数里修改外层变量要用 \`nonlocal\`；ACM 顶层代码里则用 \`global\`
- ACM 版本先用层序标记数组还原二叉搜索树（\`null\` 占位表示空节点、跳过不连边），再跑同样的中序逻辑，最后把答案打印出来
`,
};
