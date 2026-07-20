// 39. 组合总和
// 回溯经典题：compare 用 multiset（组合之间顺序无关），expected 中每个组合内部升序
export default {
  id: 39,
  title: '组合总和',
  slug: 'combination-sum',
  difficulty: 'medium',
  tags: ['数组', '回溯'],
  hints: [
    '同一候选数可以反复使用，但组合不区分选取顺序，因此搜索路径必须保持固定的下标次序来避免重复。',
    '先将 candidates 升序排序，再用带起始下标和剩余目标值的回溯搜索，并借助有序性剪枝。',
    '执行 dfs(start, remain)：从 start 起枚举 i，选择 candidates[i] 后递归 dfs(i, remain - candidates[i])，remain 为 0 时保存路径拷贝。',
    '当候选值大于 remain 时可直接结束本层循环；ACM 输出要求组内升序、各组合字符串按字典序排序且无解时不输出。',
  ],

  description: `
给你一个 **无重复元素** 的整数数组 \`candidates\` 和一个目标整数 \`target\`，找出 \`candidates\` 中所有可以使数字和为 \`target\` 的不同组合，并以列表形式返回。

\`candidates\` 中的 **同一个** 数字可以 **无限制重复被选取**。如果至少一个数字的被选数量不同，则两种组合是不同的。

### 示例

- 输入：\`candidates = [2,3,6,7], target = 7\`，输出：\`[[2,2,3],[7]]\`
- 输入：\`candidates = [2,3,5], target = 8\`，输出：\`[[2,2,2,2],[2,3,3],[3,5]]\`
- 输入：\`candidates = [2], target = 1\`，输出：\`[]\`

### 提示

- \`1 <= candidates.length <= 30\`
- \`2 <= candidates[i] <= 40\`
- \`candidates\` 的所有元素互不相同
- \`1 <= target <= 40\`

### ACM 模式输入输出格式

- 输入：第一行为整数 \`n\`（候选数个数）；第二行为 \`n\` 个互不相同的整数（空格分隔）；第三行为 \`target\`
- 输出：每个组合占一行——行内数字升序、空格分隔；各行之间按字符串字典序排序；没有任何组合时不输出任何内容

ACM 输入示例：
\`\`\`
4
2 3 6 7
7
\`\`\`
输出：
\`\`\`
2 2 3
7
\`\`\`
`,

  functionName: 'combinationSum',
  compare: 'multiset',

  tests: [
    { args: [[2, 3, 6, 7], 7], expected: [[2, 2, 3], [7]] },
    { args: [[2, 3, 5], 8], expected: [[2, 2, 2, 2], [2, 3, 3], [3, 5]] },
    { args: [[2], 1], expected: [] },
    { args: [[2], 4], expected: [[2, 2]] },
    { args: [[3, 5, 8], 11], expected: [[3, 3, 5], [3, 8]] },
    { args: [[5], 5], expected: [[5]] },
    { args: [[3, 5], 4], expected: [] },
    { args: [[7, 3, 2, 6], 7], expected: [[2, 2, 3], [7]] },
    { args: [[6, 7, 9, 11, 12, 14, 19, 21], 40], expected: [[6, 6, 6, 6, 7, 9], [6, 6, 6, 11, 11], [6, 6, 7, 7, 7, 7], [6, 6, 7, 7, 14], [6, 6, 7, 9, 12], [6, 6, 7, 21], [6, 6, 9, 19], [6, 6, 14, 14], [6, 7, 7, 9, 11], [6, 7, 9, 9, 9], [6, 9, 11, 14], [6, 11, 11, 12], [7, 7, 7, 7, 12], [7, 7, 7, 19], [7, 7, 12, 14], [7, 9, 12, 12], [7, 11, 11, 11], [7, 12, 21], [7, 14, 19], [9, 9, 11, 11], [9, 12, 19], [12, 14, 14], [19, 21]] },
  ],

  acmTests: [
    { input: '4\n2 3 6 7\n7\n', output: '2 2 3\n7\n' },
    { input: '3\n2 3 5\n8\n', output: '2 2 2 2\n2 3 3\n3 5\n' },
    { input: '1\n2\n1\n', output: '' },
    { input: '1\n2\n4\n', output: '2 2\n' },
    { input: '3\n3 5 8\n11\n', output: '3 3 5\n3 8\n' },
    { input: '1\n5\n5\n', output: '5\n' },
    { input: '2\n3 5\n4\n', output: '' },
    { input: '4\n7 3 2 6\n7\n', output: '2 2 3\n7\n' },
    { input: '8\n6 7 9 11 12 14 19 21\n40\n', output: '12 14 14\n19 21\n6 11 11 12\n6 6 14 14\n6 6 6 11 11\n6 6 6 6 7 9\n6 6 7 21\n6 6 7 7 14\n6 6 7 7 7 7\n6 6 7 9 12\n6 6 9 19\n6 7 7 9 11\n6 7 9 9 9\n6 9 11 14\n7 11 11 11\n7 12 21\n7 14 19\n7 7 12 14\n7 7 7 19\n7 7 7 7 12\n7 9 12 12\n9 12 19\n9 9 11 11\n' },
  ],

  templates: {
    core: {
      javascript: `/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function(candidates, target) {
    
};
`,
      python: `def combinationSum(candidates, target):
    # 返回所有和为 target 的组合（每个数字可重复选取）
    pass
`,
    },
    acm: {
      javascript: `// ACM 模式：input 是全部输入（字符串），用 console.log 输出答案
// 输入格式：第一行 n，第二行 n 个互不相同的整数，第三行 target
// 输出：每个组合一行，组内升序空格分隔，各行按字典序排序；无组合时不输出
const lines = input.trim().split('\\n');
const n = Number(lines[0]);
const candidates = lines[1].trim().split(/\\s+/).map(Number);
const target = Number(lines[2]);

// 在这里写你的代码

`,
      python: `# ACM 模式：用 input() 或 sys.stdin 读输入，用 print 输出答案
# 输入格式：第一行 n，第二行 n 个互不相同的整数，第三行 target
# 输出：每个组合一行，组内升序空格分隔，各行按字典序排序；无组合时不输出
import sys

lines = sys.stdin.read().split('\\n')
n = int(lines[0])
candidates = list(map(int, lines[1].split()))
target = int(lines[2])

# 在这里写你的代码
`,
    },
  },

  solutions: {
    core: {
      javascript: `var combinationSum = function(candidates, target) {
  const arr = [...candidates].sort((a, b) => a - b); // 排序：组合内升序 + 便于剪枝
  const ans = [];
  const path = [];
  const dfs = (start, remain) => {
    if (remain === 0) {
      ans.push([...path]); // 存拷贝
      return;
    }
    for (let i = start; i < arr.length; i++) {
      if (arr[i] > remain) break; // 剪枝：后面的数更大，都不用试
      path.push(arr[i]);
      dfs(i, remain - arr[i]); // 传 i 而非 i+1：同一数字可重复选取
      path.pop();
    }
  };
  dfs(0, target);
  return ans;
};
`,
      python: `def combinationSum(candidates, target):
    arr = sorted(candidates)  # 排序：组合内升序 + 便于剪枝
    ans = []
    path = []

    def dfs(start, remain):
        if remain == 0:
            ans.append(path[:])  # 存拷贝
            return
        for i in range(start, len(arr)):
            if arr[i] > remain:
                break  # 剪枝：后面的数更大，都不用试
            path.append(arr[i])
            dfs(i, remain - arr[i])  # 传 i 而非 i+1：同一数字可重复选取
            path.pop()

    dfs(0, target)
    return ans
`,
    },
    acm: {
      javascript: `const lines = input.trim().split('\\n');
const n = Number(lines[0]);
const candidates = lines[1].trim().split(/\\s+/).map(Number);
const target = Number(lines[2]);
candidates.sort((a, b) => a - b);

const out = [];
const path = [];
const dfs = (start, remain) => {
  if (remain === 0) {
    out.push(path.join(' '));
    return;
  }
  for (let i = start; i < candidates.length; i++) {
    if (candidates[i] > remain) break;
    path.push(candidates[i]);
    dfs(i, remain - candidates[i]);
    path.pop();
  }
};
dfs(0, target);

out.sort(); // 各行按字符串字典序排序
for (const line of out) {
  console.log(line);
}
`,
      python: `import sys

lines = sys.stdin.read().split('\\n')
n = int(lines[0])
candidates = list(map(int, lines[1].split()))
target = int(lines[2])
candidates.sort()

out = []
path = []

def dfs(start, remain):
    if remain == 0:
        out.append(' '.join(map(str, path)))
        return
    for i in range(start, len(candidates)):
        if candidates[i] > remain:
            break
        path.append(candidates[i])
        dfs(i, remain - candidates[i])
        path.pop()

dfs(0, target)

out.sort()  # 各行按字符串字典序排序
for line in out:
    print(line)
`,
    },
  },

  idea: `
每个数字可以被重复选取，求所有和为 \`target\` 的组合——典型的**回溯 + 剪枝**问题。

把候选数组排序后做 DFS，维护当前路径 \`path\` 与剩余目标值 \`remain\`，每层从下标 \`start\` 开始枚举下一个要选的数：

- \`remain\` 减到 \`0\`：当前路径就是一个合法组合
- 同一元素可重复选：递归时下一层仍从下标 \`i\` 开始（而不是 \`i + 1\`）
- 组合不重复的关键：每一层只允许选下标 \`>= start\` 的数，这样 \`[2,3]\` 和 \`[3,2]\` 只会被生成一次
- 剪枝：数组有序，一旦 \`arr[i] > remain\`，后面的数更大，直接 \`break\`

搜索树的规模与答案数量同阶，无法做到比输出更优；空间复杂度为递归深度，不超过 \`O(target)\`。
`,

  explanation: `
- 先排序有两个作用：保证每个组合内部升序；让 \`arr[i] > remain\` 时可以 \`break\` 剪掉整段子树
- \`dfs(start, remain)\`：\`start\` 是本层允许选取的最小下标（去重的关键），\`remain\` 是还差多少凑到 \`target\`
- \`remain === 0\` 时把 \`path\` 的拷贝（\`[...path]\` / \`path[:]\`）存入答案；直接存引用会被后续修改污染
- 递归传 \`dfs(i, ...)\` 而不是 \`dfs(i + 1, ...)\`——这是「可重复选取」与子集类问题的唯一差别
- 每尝试完一个分支都要 \`pop\` 撤销，否则同层下一个分支的路径会被污染
- ACM 版本把每个组合拼成升序字符串后统一 \`sort()\` 逐行输出；一个组合都没有时不输出任何内容
`,
};
