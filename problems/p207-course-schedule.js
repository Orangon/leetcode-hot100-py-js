// 207. 课程表
// 普通类型题（整数 + 二维数组 -> 布尔），无需 argSpec / resultKind；参考答案用拓扑排序（入度 + BFS）
export default {
  id: 207,
  title: '课程表',
  slug: 'course-schedule',
  difficulty: 'medium',
  tags: ['深度优先搜索', '广度优先搜索', '图', '拓扑排序'],
  hints: [
    '把每门课程视为节点，将 [ai, bi] 建成从先修课 bi 指向课程 ai 的边；能学完所有课程等价于这张有向图无环、存在拓扑序。',
    '使用 Kahn 拓扑排序：维护每门课的入度和“先修课 -> 后续课程”邻接表，从所有入度为 0 的课程开始广度优先处理。',
    '遍历 prerequisites 时执行 adj[bi].push(ai) 并令 indegree[ai]++；零入度课程入队，每出队一门就把其后继入度减一，减到 0 时入队，最后判断出队数是否等于 numCourses。',
    '注意自环会直接导致无法完成，m = 0 时没有后续关系行且应返回 true；ACM 模式按首行的 m 精确读取关系，并输出小写 true 或 false。',
  ],

  description: `
你这个学期必须选修 \`numCourses\` 门课程，记为 \`0\` 到 \`numCourses - 1\`。

在选修某些课程之前需要一些先修课程。先修课程按数组 \`prerequisites\` 给出，其中 \`prerequisites[i] = [ai, bi]\`，表示如果要学习课程 \`ai\` 则**必须**先学习课程 \`bi\`。

例如，先修课程对 \`[0, 1]\` 表示：想要学习课程 \`0\`，你需要先完成课程 \`1\`。

请你判断是否可能完成所有课程的学习？如果可以，返回 \`true\`；否则，返回 \`false\`。

### 示例

- 输入：\`numCourses = 2, prerequisites = [[1,0]]\`，输出：\`true\`（先完成课程 1，再完成课程 0 即可）
- 输入：\`numCourses = 2, prerequisites = [[1,0],[0,1]]\`，输出：\`false\`（两门课程互相依赖，形成循环，无法完成）

### 提示

- \`1 <= numCourses <= 2000\`
- \`0 <= prerequisites.length <= 5000\`
- \`prerequisites[i].length == 2\`
- \`0 <= ai, bi < numCourses\`
- \`prerequisites[i]\` 中的所有课程对**互不相同**

### ACM 模式输入输出格式

- 输入：第一行为两个整数 \`numCourses m\`（课程数、先修关系数，空格分隔）；随后 \`m\` 行，每行两个整数 \`ai bi\`（学习 \`ai\` 前必须先学习 \`bi\`；\`m = 0\` 时没有后续行）
- 输出：能完成所有课程输出 \`true\`，否则输出 \`false\`（均为小写）

ACM 输入示例：
\`\`\`
2 1
1 0
\`\`\`
输出：\`true\`
`,

  functionName: 'canFinish',
  compare: 'exact',

  tests: [
    { args: [2, [[1, 0]]], expected: true },
    { args: [2, [[1, 0], [0, 1]]], expected: false },
    { args: [4, []], expected: true },
    { args: [5, [[1, 0], [2, 0], [3, 1], [3, 2], [4, 3]]], expected: true },
    { args: [3, [[0, 1], [1, 2], [2, 0]]], expected: false },
    { args: [1, []], expected: true },
    { args: [1, [[0, 0]]], expected: false },
    { args: [4, [[1, 0], [2, 0], [3, 1], [3, 2]]], expected: true },
    { args: [5, [[0, 1], [1, 2], [2, 3], [3, 1], [4, 0]]], expected: false },
    { args: [60, [[18, 42], [2, 21], [38, 59], [20, 58], [46, 48], [28, 56], [51, 54], [3, 17], [26, 59], [4, 27], [29, 32], [10, 16], [1, 41], [18, 46], [18, 44], [41, 53], [0, 2], [45, 47], [40, 41], [11, 39], [6, 38], [24, 56], [2, 10], [8, 34], [17, 52], [12, 46], [4, 15], [9, 52], [2, 40], [1, 57], [9, 11], [5, 49], [8, 49], [20, 27], [55, 57], [1, 15], [26, 48], [4, 36], [18, 54], [3, 28], [26, 35], [6, 47], [13, 47], [7, 51], [13, 33], [3, 41], [6, 8], [6, 33], [35, 55], [16, 34], [19, 23], [37, 49], [32, 52], [6, 53], [29, 57], [17, 30], [31, 47], [47, 59], [15, 19], [6, 30], [30, 42], [0, 47], [1, 20], [34, 54], [31, 38], [11, 58], [15, 33], [37, 55], [19, 39], [32, 39], [50, 57], [20, 22], [44, 57], [23, 46], [23, 55], [22, 45], [3, 21], [24, 51], [7, 32], [36, 59], [3, 48], [0, 23], [21, 24], [0, 45], [28, 45], [18, 45], [22, 28], [21, 22], [0, 21], [24, 57], [5, 21], [28, 30], [9, 27], [21, 55], [28, 58], [18, 41], [47, 51], [5, 56], [43, 50], [47, 54]]], expected: true },
  ],

  acmTests: [
    { input: '2 1\n1 0\n', output: 'true\n' },
    { input: '2 2\n1 0\n0 1\n', output: 'false\n' },
    { input: '4 0\n', output: 'true\n' },
    { input: '5 5\n1 0\n2 0\n3 1\n3 2\n4 3\n', output: 'true\n' },
    { input: '3 3\n0 1\n1 2\n2 0\n', output: 'false\n' },
    { input: '1 0\n', output: 'true\n' },
    { input: '1 1\n0 0\n', output: 'false\n' },
    { input: '4 4\n1 0\n2 0\n3 1\n3 2\n', output: 'true\n' },
    { input: '5 5\n0 1\n1 2\n2 3\n3 1\n4 0\n', output: 'false\n' },
    { input: '60 100\n18 42\n2 21\n38 59\n20 58\n46 48\n28 56\n51 54\n3 17\n26 59\n4 27\n29 32\n10 16\n1 41\n18 46\n18 44\n41 53\n0 2\n45 47\n40 41\n11 39\n6 38\n24 56\n2 10\n8 34\n17 52\n12 46\n4 15\n9 52\n2 40\n1 57\n9 11\n5 49\n8 49\n20 27\n55 57\n1 15\n26 48\n4 36\n18 54\n3 28\n26 35\n6 47\n13 47\n7 51\n13 33\n3 41\n6 8\n6 33\n35 55\n16 34\n19 23\n37 49\n32 52\n6 53\n29 57\n17 30\n31 47\n47 59\n15 19\n6 30\n30 42\n0 47\n1 20\n34 54\n31 38\n11 58\n15 33\n37 55\n19 39\n32 39\n50 57\n20 22\n44 57\n23 46\n23 55\n22 45\n3 21\n24 51\n7 32\n36 59\n3 48\n0 23\n21 24\n0 45\n28 45\n18 45\n22 28\n21 22\n0 21\n24 57\n5 21\n28 30\n9 27\n21 55\n28 58\n18 41\n47 51\n5 56\n43 50\n47 54\n', output: 'true\n' },
  ],

  templates: {
    core: {
      javascript: `/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites 每个元素为 [课程, 先修课]
 * @return {boolean}
 */
var canFinish = function(numCourses, prerequisites) {
    
};
`,
      python: `def canFinish(numCourses, prerequisites):
    # prerequisites 元素为 [课程, 先修课]，能完成所有课程返回 True，否则返回 False
    pass
`,
    },
    acm: {
      javascript: `// ACM 模式：input 是全部输入（字符串），用 console.log 输出答案
// 输入格式：第一行 numCourses m（课程数 先修关系数），随后 m 行每行两个整数 "课程 先修课"
const lines = input.trim().split('\\n');
const [numCourses, m] = lines[0].trim().split(/\\s+/).map(Number);

// 解析出先修关系数组，判断能否完成所有课程，用 console.log 输出 true 或 false

`,
      python: `# ACM 模式：用 input() 或 sys.stdin 读输入，用 print 输出答案
# 输入格式：第一行 numCourses m（课程数 先修关系数），随后 m 行每行两个整数 "课程 先修课"
import sys

lines = sys.stdin.read().split('\\n')
num_courses, m = map(int, lines[0].split())

# 解析出先修关系数组，判断能否完成所有课程，用 print 输出 true 或 false（小写）
`,
    },
  },

  solutions: {
    core: {
      javascript: `var canFinish = function(numCourses, prerequisites) {
  // 拓扑排序（Kahn 算法）：入度为 0 的课程可以先学，学完删掉它引出的边
  const indeg = new Array(numCourses).fill(0);
  const adj = new Array(numCourses).fill(null).map(() => []); // 先修课 -> 后续课程列表
  for (const [cur, pre] of prerequisites) {
    adj[pre].push(cur);
    indeg[cur]++;
  }
  const queue = [];
  for (let i = 0; i < numCourses; i++) {
    if (indeg[i] === 0) queue.push(i); // 没有先修要求的课程先入队
  }
  let head = 0;
  let done = 0; // 已完成（出队）的课程数
  while (head < queue.length) {
    const u = queue[head++];
    done++;
    for (const v of adj[u]) {
      indeg[v]--;
      if (indeg[v] === 0) queue.push(v); // 先修课全部完成后即可学习
    }
  }
  return done === numCourses; // 有环时环上课程永远无法出队
};
`,
      python: `def canFinish(numCourses, prerequisites):
    from collections import deque

    # 拓扑排序（Kahn 算法）：入度为 0 的课程可以先学，学完删掉它引出的边
    indeg = [0] * numCourses
    adj = [[] for _ in range(numCourses)]  # 先修课 -> 后续课程列表
    for cur, pre in prerequisites:
        adj[pre].append(cur)
        indeg[cur] += 1

    queue = deque([i for i in range(numCourses) if indeg[i] == 0])  # 没有先修要求的课程先入队
    done = 0  # 已完成（出队）的课程数
    while queue:
        u = queue.popleft()
        done += 1
        for v in adj[u]:
            indeg[v] -= 1
            if indeg[v] == 0:
                queue.append(v)  # 先修课全部完成后即可学习

    return done == numCourses  # 有环时环上课程永远无法出队
`,
    },
    acm: {
      javascript: `const lines = input.trim().split('\\n');
const [numCourses, m] = lines[0].trim().split(/\\s+/).map(Number);

const indeg = new Array(numCourses).fill(0);
const adj = new Array(numCourses).fill(null).map(() => []);
for (let i = 0; i < m; i++) {
  const [cur, pre] = lines[i + 1].trim().split(/\\s+/).map(Number);
  adj[pre].push(cur);
  indeg[cur]++;
}

const queue = [];
for (let i = 0; i < numCourses; i++) {
  if (indeg[i] === 0) queue.push(i);
}
let head = 0;
let done = 0;
while (head < queue.length) {
  const u = queue[head++];
  done++;
  for (const v of adj[u]) {
    indeg[v]--;
    if (indeg[v] === 0) queue.push(v);
  }
}

console.log(done === numCourses);
`,
      python: `import sys
from collections import deque

lines = sys.stdin.read().split('\\n')
num_courses, m = map(int, lines[0].split())

indeg = [0] * num_courses
adj = [[] for _ in range(num_courses)]
for i in range(m):
    cur, pre = map(int, lines[i + 1].split())
    adj[pre].append(cur)
    indeg[cur] += 1

queue = deque([i for i in range(num_courses) if indeg[i] == 0])
done = 0
while queue:
    u = queue.popleft()
    done += 1
    for v in adj[u]:
        indeg[v] -= 1
        if indeg[v] == 0:
            queue.append(v)

print('true' if done == num_courses else 'false')
`,
    },
  },

  idea: `
把课程看成有向图的节点，先修关系 \`[ai, bi]\` 看成边 \`bi -> ai\`。问题等价于：**这张有向图是否存在拓扑序**——也就是图中**没有环**。有环则环上的课程互相等待，永远无法全部完成。

**拓扑排序（Kahn 算法，入度 + BFS）**：

- 统计每门课的入度（它有多少门先修课），并建立「先修课 -> 后续课程」的邻接表
- 所有入度为 0 的课程（没有先修要求）先入队
- 不断出队一门课，表示「学完」它：把它引出的边删掉，即让每门后续课程的入度减一，减到 0 的课程入队
- 最后统计出队课程数：等于课程总数说明所有课程都能安排，返回 \`true\`；否则说明存在环，返回 \`false\`

另一种等价做法是 **DFS 三色标记**（未访问 / 访问中 / 已完成），在递归过程中发现「访问中」的节点即说明有环。

Kahn 算法时间复杂度 O(V + E)（V 为课程数、E 为先修关系数），空间复杂度 O(V + E)。
`,

  explanation: `
- 建图时注意方向：\`[cur, pre]\` 表示「学 \`cur\` 前必须先学 \`pre\`」，所以边是 \`pre -> cur\`，\`cur\` 的入度加一，方向写反答案就错了
- \`adj\` 初始化用 \`fill(null).map(() => [])\`（Python 用列表推导），不能用 \`fill([])\`——那样所有元素会共享同一个数组
- 入度为 0 的节点先入队；每出队一门课 \`done\` 加一，并把它所有后续课程的入度减一，减到 0 就入队
- 有环时环上每门课的入度永远大于 0，不可能入队，因此最终 \`done < numCourses\`，据此返回 \`false\`
- JS 用 \`head\` 下标代替 \`shift()\` 出队；Python 用 \`collections.deque\` 的 \`popleft\`
- ACM 输出注意：Python 的 \`print\` 输出布理会变成 \`True / False\`，必须转成题目要求的小写字符串 \`'true' if ... else 'false'\`

ACM 版本先按格式解析课程数与 \`m\` 条先修关系（\`m = 0\` 时没有后续行），拓扑排序逻辑与核心代码模式完全一致。
`,
};
