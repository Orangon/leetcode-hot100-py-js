// 78. 子集
// 普通数组题：compare 用 nestedMultiset（子集之间及子集内部顺序均不影响判题）
export default {
  id: 78,
  title: '子集',
  slug: 'subsets',
  difficulty: 'medium',
  tags: ['位运算', '数组', '回溯'],
  hints: [
    '每个元素都只有选入当前子集或跳过两种决定，把全部决定组合起来就能覆盖整个幂集。',
    '用 dfs(i) 表示处理到第 i 个元素，分别递归“不选”和“选”两个分支，并维护当前 path。',
    '当 i 到达数组末尾时把 path 的拷贝加入答案；选择分支返回后要 pop，避免污染后续分支。',
    '空集也是合法且必需的答案，空数组输入应返回仅含空集的二维数组；不要因过滤空数组而漏解。',
  ],

  description: `
给你一个整数数组 \`nums\`，数组中的元素 **互不相同**。返回该数组所有可能的子集（幂集）。

解集 **不能** 包含重复的子集。你可以按任意顺序返回解集。

### 示例

- 输入：\`nums = [1,2,3]\`，输出：\`[[],[1],[1,2],[1,2,3],[1,3],[2],[2,3],[3]]\`
- 输入：\`nums = [0]\`，输出：\`[[],[0]]\`

### 提示

- \`0 <= nums.length <= 10\`
- \`-10 <= nums[i] <= 10\`
- \`nums\` 中的所有元素互不相同

### ACM 模式输入输出格式

- 输入：第一行为整数 \`n\`（数组长度）；第二行为 \`n\` 个互不相同的整数（空格分隔；\`n = 0\` 时该行为空行）
- 输出：每个子集占一行——行内元素升序、空格分隔（空集输出一个空行）；各行之间按字符串字典序排序

ACM 输入示例：
\`\`\`
3
1 2 3
\`\`\`
输出（第一行为空集对应的空行）：
\`\`\`

1
1 2
1 2 3
1 3
2
2 3
3
\`\`\`
`,

  functionName: 'subsets',
  compare: 'nestedMultiset',

  tests: [
    { args: [[1, 2, 3]], expected: [[], [1], [1, 2], [1, 2, 3], [1, 3], [2], [2, 3], [3]] },
    { args: [[0]], expected: [[], [0]] },
    { args: [[]], expected: [[]] },
    { args: [[-1, 2]], expected: [[], [-1], [-1, 2], [2]] },
    {
      args: [[1, 2, 3, 4]],
      expected: [[], [1], [1, 2], [1, 2, 3], [1, 2, 3, 4], [1, 2, 4], [1, 3], [1, 3, 4], [1, 4], [2], [2, 3], [2, 3, 4], [2, 4], [3], [3, 4], [4]],
    },
    { args: [[3, 1]], expected: [[], [1], [3], [1, 3]] },
    { args: [[-5]], expected: [[], [-5]] },
    { args: [[-2, -1, 0]], expected: [[], [-2], [-1], [0], [-2, -1], [-2, 0], [-1, 0], [-2, -1, 0]] },
    { args: [[5, 3, 1, 4, 2]], expected: [[], [1], [2], [3], [4], [5], [1, 2], [1, 3], [1, 4], [1, 5], [2, 3], [2, 4], [2, 5], [3, 4], [3, 5], [4, 5], [1, 2, 3], [1, 2, 4], [1, 2, 5], [1, 3, 4], [1, 3, 5], [1, 4, 5], [2, 3, 4], [2, 3, 5], [2, 4, 5], [3, 4, 5], [1, 2, 3, 4], [1, 2, 3, 5], [1, 2, 4, 5], [1, 3, 4, 5], [2, 3, 4, 5], [1, 2, 3, 4, 5]] },
  ],

  acmTests: [
    { input: '3\n1 2 3\n', output: '\n1\n1 2\n1 2 3\n1 3\n2\n2 3\n3\n' },
    { input: '1\n0\n', output: '\n0\n' },
    { input: '0\n\n', output: '\n' },
    { input: '2\n-1 2\n', output: '\n-1\n-1 2\n2\n' },
    {
      input: '4\n1 2 3 4\n',
      output: '\n1\n1 2\n1 2 3\n1 2 3 4\n1 2 4\n1 3\n1 3 4\n1 4\n2\n2 3\n2 3 4\n2 4\n3\n3 4\n4\n',
    },
    { input: '2\n3 1\n', output: '\n1\n1 3\n3\n' },
    { input: '1\n-5\n', output: '\n-5\n' },
    { input: '3\n-2 -1 0\n', output: '\n-1\n-1 0\n-2\n-2 -1\n-2 -1 0\n-2 0\n0\n' },
    { input: '5\n5 3 1 4 2\n', output: '\n1\n1 2\n1 2 3\n1 2 3 4\n1 2 3 4 5\n1 2 3 5\n1 2 4\n1 2 4 5\n1 2 5\n1 3\n1 3 4\n1 3 4 5\n1 3 5\n1 4\n1 4 5\n1 5\n2\n2 3\n2 3 4\n2 3 4 5\n2 3 5\n2 4\n2 4 5\n2 5\n3\n3 4\n3 4 5\n3 5\n4\n4 5\n5\n' },
  ],

  templates: {
    core: {
      javascript: `/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function(nums) {
    
};
`,
      python: `def subsets(nums):
    # 返回所有子集组成的二维列表
    pass
`,
    },
    acm: {
      javascript: `// ACM 模式：input 是全部输入（字符串），用 console.log 输出答案
// 输入格式：第一行 n，第二行 n 个互不相同的整数（n = 0 时该行为空行）
// 输出：每个子集一行，行内元素升序空格分隔（空集输出空行），各行按字典序排序
const lines = input.split('\\n');
const n = Number(lines[0]);
const nums = n > 0 ? lines[1].trim().split(/\\s+/).map(Number) : [];

// 在这里写你的代码：收集所有子集，按要求格式输出

`,
      python: `# ACM 模式：用 input() 或 sys.stdin 读输入，用 print 输出答案
# 输入格式：第一行 n，第二行 n 个互不相同的整数（n = 0 时该行为空行）
# 输出：每个子集一行，行内元素升序空格分隔（空集输出空行），各行按字典序排序
import sys

lines = sys.stdin.read().split('\\n')
n = int(lines[0])
nums = list(map(int, lines[1].split())) if n > 0 else []

# 在这里写你的代码：收集所有子集，按要求格式输出
`,
    },
  },

  solutions: {
    core: {
      javascript: `var subsets = function(nums) {
  const arr = [...nums].sort((a, b) => a - b); // 排序保证每个子集内部升序
  const ans = [];
  const path = [];
  const dfs = (i) => {
    if (i === arr.length) {
      ans.push([...path]); // 存拷贝，不能直接存引用
      return;
    }
    dfs(i + 1); // 不选 arr[i]
    path.push(arr[i]);
    dfs(i + 1); // 选 arr[i]
    path.pop(); // 撤销选择
  };
  dfs(0);
  return ans;
};
`,
      python: `def subsets(nums):
    arr = sorted(nums)  # 排序保证每个子集内部升序
    ans = []
    path = []

    def dfs(i):
        if i == len(arr):
            ans.append(path[:])  # 存拷贝，不能直接存引用
            return
        dfs(i + 1)  # 不选 arr[i]
        path.append(arr[i])
        dfs(i + 1)  # 选 arr[i]
        path.pop()  # 撤销选择

    dfs(0)
    return ans
`,
    },
    acm: {
      javascript: `const lines = input.split('\\n');
const n = Number(lines[0]);
const nums = n > 0 ? lines[1].trim().split(/\\s+/).map(Number) : [];
nums.sort((a, b) => a - b);

const out = [];
const path = [];
const dfs = (i) => {
  if (i === nums.length) {
    out.push(path.join(' ')); // 空集对应空串
    return;
  }
  dfs(i + 1);
  path.push(nums[i]);
  dfs(i + 1);
  path.pop();
};
dfs(0);

out.sort(); // 各行按字符串字典序排序
for (const line of out) {
  console.log(line);
}
`,
      python: `import sys

lines = sys.stdin.read().split('\\n')
n = int(lines[0])
nums = list(map(int, lines[1].split())) if n > 0 else []
nums.sort()

out = []
path = []

def dfs(i):
    if i == len(nums):
        out.append(' '.join(map(str, path)))  # 空集对应空串
        return
    dfs(i + 1)
    path.append(nums[i])
    dfs(i + 1)
    path.pop()

dfs(0)

out.sort()  # 各行按字符串字典序排序
for line in out:
    print(line)
`,
    },
  },

  idea: `
每个元素只有「选」或「不选」两种状态，\`n\` 个元素一共 \`2^n\` 种组合，正好对应幂集。常见两种写法：

**回溯（DFS）**：按顺序对每个元素做「选 / 不选」的决策，递归到第 \`n\` 层时把当前路径记入答案。这是一棵深度为 \`n\` 的满二叉决策树，共 \`2^n\` 个叶子，每个叶子就是一个子集。

**位运算**：枚举 \`0\` 到 \`2^n - 1\` 的整数作为掩码，第 \`i\` 位为 \`1\` 表示选取 \`nums[i]\`，一次遍历即可拼出一个子集。

两种方法的时间复杂度都是 \`O(n·2^n)\`——输出本身就有这个量级，已经最优；空间复杂度 \`O(n)\`（不计答案）。参考代码采用回溯写法。
`,

  explanation: `
- 递归函数 \`dfs(i)\` 表示「正在决定第 \`i\` 个元素选不选」：先走「不选」分支直接递归 \`i + 1\`；再把 \`arr[i]\` 加入 \`path\` 走「选」分支，递归回来后 \`pop\` 撤销选择（回溯的标准节奏）
- \`i === arr.length\` 时到达叶子，把 \`path\` 的**拷贝**（\`[...path]\` / \`path[:]\`）存入答案——直接存引用会被后续的修改污染
- 开始前先排序：题目不保证输入有序，排序后每个子集内部自然升序
- ACM 版本把每个子集拼成空格分隔的字符串（空集是空串），全部收集后整体 \`sort()\` 再逐行打印，正好满足「行内升序、行间字典序」的输出约定；\`n = 0\` 时只有一个空子集，打印一个空行
`,
};
