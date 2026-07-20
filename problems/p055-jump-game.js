// 55. 跳跃游戏
export default {
  id: 55,
  title: '跳跃游戏',
  slug: 'jump-game',
  difficulty: 'medium',
  tags: ['贪心', '数组', '动态规划'],
  hints: [
    '是否可达只取决于当前已覆盖的最远下标，不必枚举具体跳跃路径；一旦扫描位置超出覆盖范围便出现断层。',
    '从左到右贪心维护 farthest，访问每个可达位置时用 i + nums[i] 扩大覆盖区间。',
    '若 i > farthest 立即判定失败，否则更新 farthest = max(farthest, i + nums[i])，覆盖 n - 1 时可提前成功。',
    '长度为 1 时即使 nums[0] 为 0 也已到终点；ACM 输出必须是小写 true 或 false，而不是语言默认布尔格式。',
  ],

  description: `
给定一个非负整数数组 \`nums\`，你最初位于数组的第一个下标处，数组中的每个元素代表你在该位置可以跳跃的最大长度。

判断你是否能够到达最后一个下标。

### 示例

- 输入：\`nums = [2,3,1,1,4]\`，输出：\`true\`（先跳 1 步到下标 1，再跳 3 步到达最后一个下标）
- 输入：\`nums = [3,2,1,0,4]\`，输出：\`false\`（无论如何都会到达下标 3，而该位置的最大跳跃长度为 0，无法继续前进）

### 提示

- \`1 <= nums.length <= 10^4\`
- \`0 <= nums[i] <= 10^5\`

### ACM 模式输入输出格式

- 输入：第一行为整数 \`n\`（数组长度）；第二行为 \`n\` 个非负整数（空格分隔）
- 输出：能到达最后一个下标输出 \`true\`，否则输出 \`false\`（小写）

ACM 输入示例：
\`\`\`
5
2 3 1 1 4
\`\`\`
输出：\`true\`
`,

  functionName: 'canJump',
  compare: 'exact',

  tests: [
    { args: [[2, 3, 1, 1, 4]], expected: true },
    { args: [[3, 2, 1, 0, 4]], expected: false },
    { args: [[0]], expected: true },
    { args: [[0, 1]], expected: false },
    { args: [[2, 0, 0]], expected: true },
    { args: [[1, 1, 1, 1, 1]], expected: true },
    { args: [[5, 0, 0, 0, 0]], expected: true },
    { args: [[0, 0, 0]], expected: false },
    { args: [[4, 3, 2, 1, 0]], expected: true },
    { args: [[1,4,1,4,3,1,4,4,5,4,4,4,2,4,2,0,5,4,4,0,4,4,1,0,3,5,3,5,4,5,2,3,0,0,3,2,5,5,3,2,2,1,3,1,0,1,0,5,3,3,0,2,2,0,5,3,0,5,4,5,1,4,0,0,0,5,1,5,1,2,2,5,3,0,5,1,1,1,4,1,0,3,3,0,3,2,0,2,5,3,0,0,4,0,5,5,0,3,2,5,1,2,5,3,5,5,2,3,3,2,2,4,3,3,0,4,1,4,0,2,2,3,5,5,1,2,4,3,3,5,4,4,4,5,4,3,0,3,0,1,4,0,0,1,2,5,5,4,0,3,1,0,4,4,5,4,2,5,4,5,4,3,4,0,2,3,4,1,0,1,3,5,2,3,1,4,0,3,2,2,3,3,0,5,2,1,1,3,4,0,5,1,1,3,0,2,1,1,5,4,1,2,3,3,4,4,3,1,2,0,2,0,1,5,0,5,1,1,2,4,4,3,5,0,2,0,0,4,3,4,0,0,3,5,4,0,1,1,5,5,4,4,3,3,1,4,0,4,3,0,5,3,0,5,4,0,0,5,3,0,1,1,4,5,5,1,4,5,0,1,2,5,5,3,2,1,3,1,0,5,1,1,4,4,2,3,2,5,1,2,5,4,0,0,5,4,5,3,4,2]], expected: false },
  ],

  acmTests: [
    { input: '5\n2 3 1 1 4\n', output: 'true\n' },
    { input: '5\n3 2 1 0 4\n', output: 'false\n' },
    { input: '1\n0\n', output: 'true\n' },
    { input: '2\n0 1\n', output: 'false\n' },
    { input: '3\n2 0 0\n', output: 'true\n' },
    { input: '5\n1 1 1 1 1\n', output: 'true\n' },
    { input: '5\n5 0 0 0 0\n', output: 'true\n' },
    { input: '3\n0 0 0\n', output: 'false\n' },
    { input: '5\n4 3 2 1 0\n', output: 'true\n' },
    { input: '300\n1 4 1 4 3 1 4 4 5 4 4 4 2 4 2 0 5 4 4 0 4 4 1 0 3 5 3 5 4 5 2 3 0 0 3 2 5 5 3 2 2 1 3 1 0 1 0 5 3 3 0 2 2 0 5 3 0 5 4 5 1 4 0 0 0 5 1 5 1 2 2 5 3 0 5 1 1 1 4 1 0 3 3 0 3 2 0 2 5 3 0 0 4 0 5 5 0 3 2 5 1 2 5 3 5 5 2 3 3 2 2 4 3 3 0 4 1 4 0 2 2 3 5 5 1 2 4 3 3 5 4 4 4 5 4 3 0 3 0 1 4 0 0 1 2 5 5 4 0 3 1 0 4 4 5 4 2 5 4 5 4 3 4 0 2 3 4 1 0 1 3 5 2 3 1 4 0 3 2 2 3 3 0 5 2 1 1 3 4 0 5 1 1 3 0 2 1 1 5 4 1 2 3 3 4 4 3 1 2 0 2 0 1 5 0 5 1 1 2 4 4 3 5 0 2 0 0 4 3 4 0 0 3 5 4 0 1 1 5 5 4 4 3 3 1 4 0 4 3 0 5 3 0 5 4 0 0 5 3 0 1 1 4 5 5 1 4 5 0 1 2 5 5 3 2 1 3 1 0 5 1 1 4 4 2 3 2 5 1 2 5 4 0 0 5 4 5 3 4 2\n', output: 'false\n' },
  ],

  templates: {
    core: {
      javascript: `/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canJump = function(nums) {
    
};
`,
      python: `def canJump(nums):
    # 返回布尔值：能否到达最后一个下标
    pass
`,
    },
    acm: {
      javascript: `// ACM 模式：input 是全部输入（字符串），用 console.log 输出答案
// 输入格式：第一行 n，第二行 n 个非负整数
const lines = input.trim().split('\\n');
const n = Number(lines[0]);
const nums = n > 0 ? lines[1].trim().split(/\\s+/).map(Number) : [];

// 在这里写你的代码，用 console.log('true') 或 console.log('false') 输出结果

`,
      python: `# ACM 模式：用 input() 或 sys.stdin 读输入，用 print 输出答案
# 输入格式：第一行 n，第二行 n 个非负整数
import sys

lines = sys.stdin.read().split('\\n')
n = int(lines[0])
nums = list(map(int, lines[1].split())) if n > 0 else []

# 在这里写你的代码，用 print('true') 或 print('false') 输出结果
`,
    },
  },

  solutions: {
    core: {
      javascript: `var canJump = function(nums) {
  let farthest = 0; // 当前能到达的最远下标
  for (let i = 0; i < nums.length; i++) {
    if (i > farthest) return false; // 当前位置不可达
    farthest = Math.max(farthest, i + nums[i]);
    if (farthest >= nums.length - 1) return true; // 终点可达
  }
  return true;
};
`,
      python: `def canJump(nums):
    farthest = 0  # 当前能到达的最远下标
    for i, x in enumerate(nums):
        if i > farthest:
            return False  # 当前位置不可达
        farthest = max(farthest, i + x)
        if farthest >= len(nums) - 1:
            return True  # 终点可达
    return True
`,
    },
    acm: {
      javascript: `const lines = input.trim().split('\\n');
const n = Number(lines[0]);
const nums = n > 0 ? lines[1].trim().split(/\\s+/).map(Number) : [];

let farthest = 0;
let ok = true;
for (let i = 0; i < nums.length; i++) {
  if (i > farthest) {
    ok = false;
    break;
  }
  farthest = Math.max(farthest, i + nums[i]);
}

console.log(ok ? 'true' : 'false');
`,
      python: `import sys

lines = sys.stdin.read().split('\\n')
n = int(lines[0])
nums = list(map(int, lines[1].split())) if n > 0 else []

farthest = 0
ok = True
for i, x in enumerate(nums):
    if i > farthest:
        ok = False
        break
    farthest = max(farthest, i + x)

print('true' if ok else 'false')
`,
    },
  },

  idea: `
**贪心：维护最远可达下标。**

遍历数组，用 \`farthest\` 记录当前能到达的最远下标。遍历到下标 \`i\` 时：

- 若 \`i > farthest\`，说明 \`i\` 本身都不可达，更不可能到达终点，直接返回 false
- 否则用 \`i + nums[i]\` 更新 \`farthest\`；一旦 \`farthest >= n - 1\`，说明终点可达，返回 true

为什么对：我们不关心具体跳几步、落在哪里，只关心「能覆盖的最远范围」。只要每个可达位置都把覆盖范围尽量向外推，终点是否可达就一目了然。

时间 O(n)，空间 O(1)。动态规划也能做，但贪心最简单。
`,

  explanation: `
- \`farthest\` 初始为 0（一开始只站在下标 0）
- 循环中先判断 \`i > farthest\`：当前位置不可达，说明被「断层」挡住了（例如 \`[3,2,1,0,4]\` 中那个 0），返回 false
- \`farthest = max(farthest, i + nums[i])\`：从 \`i\` 起跳最多能到 \`i + nums[i]\`，能推得更远就更新
- 提前剪枝：\`farthest >= n - 1\` 时终点已经可达，直接返回 true，不必扫完整个数组
- \`i > farthest\` 的判断也覆盖了「首元素为 0 且长度大于 1」的用例：\`i = 1\` 时 \`farthest\` 仍为 0，返回 false；单元素数组则不会触发该判断，直接返回 true

ACM 版本逻辑一致，只是把布尔结果按格式要求转成字符串 \`true\` / \`false\` 输出。
`,
};
