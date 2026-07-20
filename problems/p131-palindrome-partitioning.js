// 131. 分割回文串
// 返回二维字符串数组，方案之间顺序无关：compare 用 multiset
export default {
  id: 131,
  title: '分割回文串',
  slug: 'palindrome-partitioning',
  difficulty: 'medium',
  tags: ['字符串', '动态规划', '回溯'],
  hints: [
    '关键观察是一次合法切分等价于从左到右选择若干前缀，且每个被选中的子串都必须是回文串；因此只需枚举各段的结束位置。',
    '使用回溯搜索所有切分方案，并用双指针判断当前候选子串是否回文；若预处理回文状态表，也可将每次判断降为 O(1)。',
    '令 dfs(start) 枚举 end 从 start 到末尾；当 s[start..end] 为回文时加入路径并递归 dfs(end + 1)，返回后弹出，start 到达字符串长度时保存路径副本。',
    '保存答案时必须复制当前路径以免后续回溯修改旧结果；ACM 模式需把每个方案用空格连接成一行，再按整行字典序排序后逐行输出。',
  ],

  description: `
给你一个字符串 \`s\`，请你将 \`s\` 分割成一些子串，使每个子串都是**回文串**。返回 \`s\` 所有可能的分割方案。

回文串是正着读和反着读都一样的字符串。

### 示例

- 输入：\`s = "aab"\`，输出：\`[["a","a","b"],["aa","b"]]\`
- 输入：\`s = "a"\`，输出：\`[["a"]]\`

### 提示

- \`1 <= s.length <= 16\`
- \`s\` 仅由小写英文字母组成

### ACM 模式输入输出格式

- 输入：第一行为字符串 \`s\`
- 输出：每种分割方案一行，方案内各段用一个空格分隔；所有方案按**字典序**排列输出

ACM 输入示例：
\`\`\`
aab
\`\`\`
输出：
\`\`\`
a a b
aa b
\`\`\`
`,

  functionName: 'partition',
  compare: 'multiset',

  tests: [
    { args: ['aab'], expected: [['a', 'a', 'b'], ['aa', 'b']] },
    { args: ['a'], expected: [['a']] },
    { args: ['ab'], expected: [['a', 'b']] },
    {
      args: ['racecar'],
      expected: [
        ['r', 'a', 'c', 'e', 'c', 'a', 'r'],
        ['r', 'a', 'cec', 'a', 'r'],
        ['r', 'aceca', 'r'],
        ['racecar'],
      ],
    },
    { args: ['cdd'], expected: [['c', 'd', 'd'], ['c', 'dd']] },
    { args: ['aaaa'], expected: [['aaaa'], ['a', 'aaa'], ['aa', 'aa'], ['a', 'a', 'aa'], ['aaa', 'a'], ['a', 'aa', 'a'], ['aa', 'a', 'a'], ['a', 'a', 'a', 'a']] },
    { args: ['abcd'], expected: [['a', 'b', 'c', 'd']] },
    { args: ['noon'], expected: [['noon'], ['n', 'oo', 'n'], ['n', 'o', 'o', 'n']] },
    { args: ['cacccbbacbc'], expected: [['c', 'a', 'ccc', 'bb', 'a', 'cbc'], ['cac', 'cc', 'bb', 'a', 'cbc'], ['c', 'a', 'c', 'cc', 'bb', 'a', 'cbc'], ['c', 'a', 'cc', 'c', 'bb', 'a', 'cbc'], ['cac', 'c', 'c', 'bb', 'a', 'cbc'], ['c', 'a', 'c', 'c', 'c', 'bb', 'a', 'cbc'], ['c', 'a', 'ccc', 'b', 'b', 'a', 'cbc'], ['cac', 'cc', 'b', 'b', 'a', 'cbc'], ['c', 'a', 'c', 'cc', 'b', 'b', 'a', 'cbc'], ['c', 'a', 'cc', 'c', 'b', 'b', 'a', 'cbc'], ['cac', 'c', 'c', 'b', 'b', 'a', 'cbc'], ['c', 'a', 'c', 'c', 'c', 'b', 'b', 'a', 'cbc'], ['c', 'a', 'ccc', 'bb', 'a', 'c', 'b', 'c'], ['cac', 'cc', 'bb', 'a', 'c', 'b', 'c'], ['c', 'a', 'c', 'cc', 'bb', 'a', 'c', 'b', 'c'], ['c', 'a', 'cc', 'c', 'bb', 'a', 'c', 'b', 'c'], ['cac', 'c', 'c', 'bb', 'a', 'c', 'b', 'c'], ['c', 'a', 'c', 'c', 'c', 'bb', 'a', 'c', 'b', 'c'], ['c', 'a', 'ccc', 'b', 'b', 'a', 'c', 'b', 'c'], ['cac', 'cc', 'b', 'b', 'a', 'c', 'b', 'c'], ['c', 'a', 'c', 'cc', 'b', 'b', 'a', 'c', 'b', 'c'], ['c', 'a', 'cc', 'c', 'b', 'b', 'a', 'c', 'b', 'c'], ['cac', 'c', 'c', 'b', 'b', 'a', 'c', 'b', 'c'], ['c', 'a', 'c', 'c', 'c', 'b', 'b', 'a', 'c', 'b', 'c']] },
  ],

  acmTests: [
    { input: 'aab\n', output: 'a a b\naa b\n' },
    { input: 'a\n', output: 'a\n' },
    { input: 'ab\n', output: 'a b\n' },
    {
      input: 'racecar\n',
      output: 'r a c e c a r\nr a cec a r\nr aceca r\nracecar\n',
    },
    { input: 'cdd\n', output: 'c d d\nc dd\n' },
    { input: 'aaaa\n', output: 'a a a a\na a aa\na aa a\na aaa\naa a a\naa aa\naaa a\naaaa\n' },
    { input: 'abcd\n', output: 'a b c d\n' },
    { input: 'noon\n', output: 'n o o n\nn oo n\nnoon\n' },
    { input: 'cacccbbacbc\n', output: 'c a c c c b b a c b c\nc a c c c b b a cbc\nc a c c c bb a c b c\nc a c c c bb a cbc\nc a c cc b b a c b c\nc a c cc b b a cbc\nc a c cc bb a c b c\nc a c cc bb a cbc\nc a cc c b b a c b c\nc a cc c b b a cbc\nc a cc c bb a c b c\nc a cc c bb a cbc\nc a ccc b b a c b c\nc a ccc b b a cbc\nc a ccc bb a c b c\nc a ccc bb a cbc\ncac c c b b a c b c\ncac c c b b a cbc\ncac c c bb a c b c\ncac c c bb a cbc\ncac cc b b a c b c\ncac cc b b a cbc\ncac cc bb a c b c\ncac cc bb a cbc\n' },
  ],

  templates: {
    core: {
      javascript: `/**
 * @param {string} s
 * @return {string[][]}
 */
var partition = function(s) {
    
};
`,
      python: `def partition(s):
    # 返回所有分割方案，每个方案是若干回文子串组成的列表
    pass
`,
    },
    acm: {
      javascript: `// ACM 模式：input 是全部输入（字符串），用 console.log 输出答案
// 输入格式：第一行为字符串 s
const s = input.split('\\n')[0];

// 在这里写你的代码
// 输出：每种分割方案一行，各段用一个空格分隔；所有方案按字典序排列

`,
      python: `# ACM 模式：用 input() 或 sys.stdin 读输入，用 print 输出答案
# 输入格式：第一行为字符串 s
import sys

s = sys.stdin.read().split('\\n')[0]

# 在这里写你的代码
# 输出：每种分割方案一行，各段用一个空格分隔；所有方案按字典序排列
`,
    },
  },

  solutions: {
    core: {
      javascript: `var partition = function(s) {
  const res = [];
  const path = []; // 当前已经切出的回文段

  // 双指针判断 s[l..r] 是否回文
  const isPal = (l, r) => {
    while (l < r) {
      if (s[l] !== s[r]) return false;
      l++;
      r--;
    }
    return true;
  };

  // 从下标 start 开始往后切
  const dfs = (start) => {
    if (start === s.length) {
      res.push(path.slice()); // 注意存拷贝
      return;
    }
    for (let end = start; end < s.length; end++) {
      if (isPal(start, end)) {
        path.push(s.slice(start, end + 1));
        dfs(end + 1);
        path.pop(); // 撤销选择
      }
    }
  };
  dfs(0);
  return res;
};
`,
      python: `def partition(s):
    res = []
    path = []  # 当前已经切出的回文段

    def is_pal(l, r):
        # 双指针判断 s[l..r] 是否回文
        while l < r:
            if s[l] != s[r]:
                return False
            l += 1
            r -= 1
        return True

    def dfs(start):
        # 从下标 start 开始往后切
        if start == len(s):
            res.append(path[:])  # 注意存拷贝
            return
        for end in range(start, len(s)):
            if is_pal(start, end):
                path.append(s[start:end + 1])
                dfs(end + 1)
                path.pop()  # 撤销选择

    dfs(0)
    return res
`,
    },
    acm: {
      javascript: `const s = input.split('\\n')[0];

const res = [];
const path = [];

const isPal = (l, r) => {
  while (l < r) {
    if (s[l] !== s[r]) return false;
    l++;
    r--;
  }
  return true;
};

const dfs = (start) => {
  if (start === s.length) {
    res.push(path.slice());
    return;
  }
  for (let end = start; end < s.length; end++) {
    if (isPal(start, end)) {
      path.push(s.slice(start, end + 1));
      dfs(end + 1);
      path.pop();
    }
  }
};
dfs(0);

// 每种方案拼成一行（各段空格分隔），按字典序排序后输出
const out = res.map((p) => p.join(' '));
out.sort();
console.log(out.join('\\n'));
`,
      python: `import sys

s = sys.stdin.read().split('\\n')[0]

res = []
path = []

def is_pal(l, r):
    while l < r:
        if s[l] != s[r]:
            return False
        l += 1
        r -= 1
    return True

def dfs(start):
    if start == len(s):
        res.append(path[:])
        return
    for end in range(start, len(s)):
        if is_pal(start, end):
            path.append(s[start:end + 1])
            dfs(end + 1)
            path.pop()

dfs(0)

# 每种方案拼成一行（各段空格分隔），按字典序排序后输出
for line in sorted(' '.join(p) for p in res):
    print(line)
`,
    },
  },

  idea: `
分割问题天然适合**回溯**：从左到右扫描，枚举第一段——如果 \`s[0..i]\` 是回文，就把它切下来作为一段，然后递归分割剩下的后缀；递归返回后撤销选择，尝试更长的第一段。当扫描到字符串末尾时，当前路径就是一种合法方案。

回文判断用双指针即可；也可以先用动态规划预处理 \`isPal[i][j]\` 表把每次判断降到 O(1)。本题数据范围很小（\`|s| <= 16\`），现场用双指针判断已经足够快。

时间复杂度 O(n·2^n)（每个间隙都可切或不切，共 2^(n-1) 种切法，输出每种方案需要 O(n)），空间复杂度 O(n)（递归栈与当前路径）。
`,

  explanation: `
- \`path\` 保存当前已经切出的回文段，\`res\` 收集所有完整方案
- \`isPal(l, r)\` / \`is_pal(l, r)\` 用双指针从两端向中间夹逼，判断子串是否回文
- \`dfs(start)\` 表示「从下标 start 开始往后切」：
  - \`start === s.length\`：已经切到末尾，把 \`path\` 的拷贝加入答案
  - 否则枚举终点 \`end\`，只要 \`s[start..end]\` 是回文就把它加入 \`path\`，递归 \`dfs(end + 1)\`，返回后 \`pop\` 撤销选择
- 易错点：加入答案的必须是 \`path\` 的拷贝（JS 的 \`path.slice()\`、Python 的 \`path[:]\`），否则后续回溯会把已存入的答案一并改掉

ACM 版本算法相同，只是最后把每个方案用空格拼成一行，排序后逐行输出，保证方案之间的顺序确定（与输出约定的字典序一致）。
`,
};
