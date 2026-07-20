// 322. 零钱兑换
// 普通类型题（数组 + 整数 -> 整数），无需 argSpec / resultKind
export default {
  id: 322,
  title: '零钱兑换',
  slug: 'coin-change',
  difficulty: 'medium',
  tags: ['广度优先搜索', '数组', '动态规划'],
  hints: [
    '每种硬币可以无限使用；若凑成金额 i 的最后一枚硬币面额为 c，那么此前必须先凑成 i - c，最优解具有可递推的子结构。',
    '使用一维动态规划：令 dp[i] 表示凑出金额 i 所需的最少硬币数，枚举金额与所有不超过当前金额的硬币完成转移。',
    '初始化 dp[0] = 0，其余位置为 amount + 1；对 i 从 1 到 amount、对每个 c <= i，执行 dp[i] = min(dp[i], dp[i - c] + 1)。',
    'amount 为 0 时答案是 0；最终值仍大于 amount 则输出 -1。ACM 模式按三行读取 n、硬币数组和 amount，只打印一个整数。',
  ],

  description: `
给你一个整数数组 \`coins\`，表示不同面额的硬币；以及一个整数 \`amount\`，表示总金额。

计算并返回可以凑成总金额所需的**最少的硬币个数**。如果没有任何一种硬币组合能组成总金额，返回 \`-1\`。

你可以认为每种硬币的数量是无限的。

### 示例

- 输入：\`coins = [1,2,5], amount = 11\`，输出：\`3\`（11 = 5 + 5 + 1）
- 输入：\`coins = [2], amount = 3\`，输出：\`-1\`
- 输入：\`coins = [1], amount = 0\`，输出：\`0\`

### 提示

- \`1 <= coins.length <= 12\`
- \`1 <= coins[i] <= 2^31 - 1\`
- \`0 <= amount <= 10^4\`

### ACM 模式输入输出格式

- 输入：第一行为整数 \`n\`（硬币种数）；第二行为 \`n\` 个整数（空格分隔，硬币面额）；第三行为 \`amount\`
- 输出：一个整数，即最少硬币个数（凑不出输出 \`-1\`）

ACM 输入示例：
\`\`\`
3
1 2 5
11
\`\`\`
输出：\`3\`
`,

  functionName: 'coinChange',
  compare: 'exact',

  tests: [
    { args: [[1, 2, 5], 11], expected: 3 },
    { args: [[2], 3], expected: -1 },
    { args: [[1], 0], expected: 0 },
    { args: [[1], 2], expected: 2 },
    { args: [[2, 5, 10], 27], expected: 4 },
    { args: [[186, 419, 83, 408], 6249], expected: 20 },
    { args: [[1], 10000], expected: 10000 },
    { args: [[5, 10, 25], 17], expected: -1 },
    { args: [[7], 49], expected: 7 },
    { args: [[3, 7, 11, 14, 6], 751], expected: 55 },
  ],

  acmTests: [
    { input: '3\n1 2 5\n11\n', output: '3\n' },
    { input: '1\n2\n3\n', output: '-1\n' },
    { input: '1\n1\n0\n', output: '0\n' },
    { input: '1\n1\n2\n', output: '2\n' },
    { input: '3\n2 5 10\n27\n', output: '4\n' },
    { input: '4\n186 419 83 408\n6249\n', output: '20\n' },
    { input: '1\n1\n10000\n', output: '10000\n' },
    { input: '3\n5 10 25\n17\n', output: '-1\n' },
    { input: '1\n7\n49\n', output: '7\n' },
    { input: '5\n3 7 11 14 6\n751\n', output: '55\n' },
  ],

  templates: {
    core: {
      javascript: `/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function(coins, amount) {
    
};
`,
      python: `def coinChange(coins, amount):
    # 返回凑成 amount 所需的最少硬币个数，凑不出返回 -1
    pass
`,
    },
    acm: {
      javascript: `// ACM 模式：input 是全部输入（字符串），用 console.log 输出答案
// 输入格式：第一行 n，第二行 n 个硬币面额，第三行 amount
const lines = input.trim().split('\\n');
const coins = lines[1].trim().split(/\\s+/).map(Number);
const amount = Number(lines[2]);

// 在这里写你的代码，用 console.log 输出最少硬币个数（凑不出输出 -1）

`,
      python: `# ACM 模式：用 input() 或 sys.stdin 读输入，用 print 输出答案
# 输入格式：第一行 n，第二行 n 个硬币面额，第三行 amount
import sys

lines = sys.stdin.read().split('\\n')
n = int(lines[0])
coins = list(map(int, lines[1].split()))
amount = int(lines[2])

# 在这里写你的代码，用 print 输出最少硬币个数（凑不出输出 -1）
`,
    },
  },

  solutions: {
    core: {
      javascript: `var coinChange = function(coins, amount) {
  // dp[i] = 凑出金额 i 所需的最少硬币数，amount + 1 作为「不可达」哨兵
  const INF = amount + 1;
  const dp = new Array(amount + 1).fill(INF);
  dp[0] = 0;
  for (let i = 1; i <= amount; i++) {
    for (const c of coins) {
      if (c <= i) dp[i] = Math.min(dp[i], dp[i - c] + 1);
    }
  }
  return dp[amount] > amount ? -1 : dp[amount];
};
`,
      python: `def coinChange(coins, amount):
    # dp[i] = 凑出金额 i 所需的最少硬币数，amount + 1 作为「不可达」哨兵
    INF = amount + 1
    dp = [INF] * (amount + 1)
    dp[0] = 0
    for i in range(1, amount + 1):
        for c in coins:
            if c <= i and dp[i - c] + 1 < dp[i]:
                dp[i] = dp[i - c] + 1
    return dp[amount] if dp[amount] <= amount else -1
`,
    },
    acm: {
      javascript: `const lines = input.trim().split('\\n');
const coins = lines[1].trim().split(/\\s+/).map(Number);
const amount = Number(lines[2]);

// dp[i] = 凑出金额 i 所需的最少硬币数，amount + 1 作为「不可达」哨兵
const INF = amount + 1;
const dp = new Array(amount + 1).fill(INF);
dp[0] = 0;
for (let i = 1; i <= amount; i++) {
  for (const c of coins) {
    if (c <= i) dp[i] = Math.min(dp[i], dp[i - c] + 1);
  }
}
console.log(dp[amount] > amount ? -1 : dp[amount]);
`,
      python: `import sys

lines = sys.stdin.read().split('\\n')
n = int(lines[0])
coins = list(map(int, lines[1].split()))
amount = int(lines[2])

# dp[i] = 凑出金额 i 所需的最少硬币数，amount + 1 作为「不可达」哨兵
INF = amount + 1
dp = [INF] * (amount + 1)
dp[0] = 0
for i in range(1, amount + 1):
    for c in coins:
        if c <= i and dp[i - c] + 1 < dp[i]:
            dp[i] = dp[i - c] + 1

print(dp[amount] if dp[amount] <= amount else -1)
`,
    },
  },

  idea: `
每种硬币数量无限，这是一个**完全背包**式的最优化问题。

**动态规划（推荐）**：\`dp[i]\` 表示凑出金额 \`i\` 所需的最少硬币数，\`dp[0] = 0\`。对金额 \`i\` 枚举最后一枚硬币的面额 \`c\`（要求 \`c <= i\`）：\`dp[i] = min(dp[i - c] + 1)\`。若最终 \`dp[amount]\` 仍是初始化的「不可达」值，说明凑不出，返回 \`-1\`。时间复杂度 O(amount × 硬币种数)，空间 O(amount)。

**BFS**：把每个金额看成图的节点，每步用一枚硬币把金额减小，从 \`amount\` 到 \`0\` 的最短路径长度即答案；需要一个 visited 集合避免重复入队。复杂度与 DP 同阶。

两个边界要留意：\`amount = 0\` 时不需要任何硬币，答案是 \`0\`；「不可达」的判定可以用大于 \`amount\` 的哨兵值，因为即使全用面额 1 也只需 \`amount\` 枚硬币。

参考答案采用一维 DP。
`,

  explanation: `
- \`dp\` 全部初始化为 \`amount + 1\`：凑金额 \`i\` 最多用 \`i\` 枚面额 1 的硬币，所以任何大于 \`amount\` 的值都可以当作「不可达」哨兵
- \`dp[0] = 0\` 是递推基准，也让 \`amount = 0\` 的用例直接返回 \`0\`
- 转移：对每种硬币 \`c\`，若 \`c <= i\` 就用 \`dp[i - c] + 1\` 更新 \`dp[i]\`——含义是「最后一枚硬币用面额 \`c\`」
- 收尾判断 \`dp[amount] > amount\`：值仍是哨兵说明没有任何组合能凑出，返回 \`-1\`
- 易错点：哨兵值不能在转移时参与正常比较之外还忘记转成 \`-1\`；也不能把 \`dp[0]\` 初始化成不可达，否则所有转移都失去基准

ACM 版本按「第一行 n、第二行 n 个面额、第三行 amount」读入数据，核心 DP 与核心代码模式完全一致。
`,
};
