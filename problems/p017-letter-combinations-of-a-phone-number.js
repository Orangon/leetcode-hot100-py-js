// 17. 电话号码的字母组合
// 普通字符串题：compare 用 multiset（组合之间顺序无关）
export default {
  id: 17,
  title: '电话号码的字母组合',
  slug: 'letter-combinations-of-a-phone-number',
  difficulty: 'medium',
  tags: ['哈希表', '字符串', '回溯'],
  hints: [
    '每个数字独立贡献 3 或 4 个候选字母，完整答案就是各按键字母集合的笛卡尔积。',
    '用回溯按数字位置逐层选择字母，映射表直接保存 2 到 9 对应的字符串。',
    'dfs(i) 遍历 digits[i] 的所有字母，执行加入 path、递归 i+1、撤销选择；i 到末尾时拼接并收集。',
    '空 digits 的答案是空数组而不是包含空串；ACM 空行时不输出内容，非空结果需按字典序每行一个。',
  ],

  description: `
给定一个仅包含数字 \`2-9\` 的字符串，返回所有它能表示的字母组合。答案可以按任意顺序返回。

数字到字母的映射如下（与电话按键相同）：\`2: abc\`，\`3: def\`，\`4: ghi\`，\`5: jkl\`，\`6: mno\`，\`7: pqrs\`，\`8: tuv\`，\`9: wxyz\`。注意 \`1\` 不对应任何字母。

### 示例

- 输入：\`digits = "23"\`，输出：\`["ad","ae","af","bd","be","bf","cd","ce","cf"]\`
- 输入：\`digits = ""\`，输出：\`[]\`
- 输入：\`digits = "2"\`，输出：\`["a","b","c"]\`

### 提示

- \`0 <= digits.length <= 4\`
- \`digits[i]\` 是范围 \`['2', '9']\` 内的数字

### ACM 模式输入输出格式

- 输入：第一行为数字字符串 \`digits\`（仅含 \`2-9\`；可能为空行，表示空串）
- 输出：每个组合占一行，按字典序排列；没有任何组合时不输出任何内容

ACM 输入示例：
\`\`\`
23
\`\`\`
输出：
\`\`\`
ad
ae
af
bd
be
bf
cd
ce
cf
\`\`\`
`,

  functionName: 'letterCombinations',
  compare: 'multiset',

  tests: [
    { args: ['23'], expected: ['ad', 'ae', 'af', 'bd', 'be', 'bf', 'cd', 'ce', 'cf'] },
    { args: [''], expected: [] },
    { args: ['2'], expected: ['a', 'b', 'c'] },
    {
      args: ['79'],
      expected: ['pw', 'px', 'py', 'pz', 'qw', 'qx', 'qy', 'qz', 'rw', 'rx', 'ry', 'rz', 'sw', 'sx', 'sy', 'sz'],
    },
    { args: ['22'], expected: ['aa', 'ab', 'ac', 'ba', 'bb', 'bc', 'ca', 'cb', 'cc'] },
    { args: ['7'], expected: ['p', 'q', 'r', 's'] },
    { args: ['27'], expected: ['ap', 'aq', 'ar', 'as', 'bp', 'bq', 'br', 'bs', 'cp', 'cq', 'cr', 'cs'] },
    {
      args: ['234'],
      expected: [
        'adg', 'adh', 'adi', 'aeg', 'aeh', 'aei', 'afg', 'afh', 'afi', 'bdg', 'bdh', 'bdi',
        'beg', 'beh', 'bei', 'bfg', 'bfh', 'bfi', 'cdg', 'cdh', 'cdi', 'ceg', 'ceh', 'cei',
        'cfg', 'cfh', 'cfi'
      ],
    },
    {
      args: ['586'],
      expected: [
        'jtm', 'jtn', 'jto', 'jum', 'jun', 'juo', 'jvm', 'jvn', 'jvo', 'ktm', 'ktn', 'kto',
        'kum', 'kun', 'kuo', 'kvm', 'kvn', 'kvo', 'ltm', 'ltn', 'lto', 'lum', 'lun', 'luo',
        'lvm', 'lvn', 'lvo'
      ],
    },
    {
      args: ['2345'],
      expected: [
        'adgj', 'adgk', 'adgl', 'adhj', 'adhk', 'adhl', 'adij', 'adik', 'adil', 'aegj', 'aegk',
        'aegl', 'aehj', 'aehk', 'aehl', 'aeij', 'aeik', 'aeil', 'afgj', 'afgk', 'afgl', 'afhj',
        'afhk', 'afhl', 'afij', 'afik', 'afil', 'bdgj', 'bdgk', 'bdgl', 'bdhj', 'bdhk', 'bdhl',
        'bdij', 'bdik', 'bdil', 'begj', 'begk', 'begl', 'behj', 'behk', 'behl', 'beij', 'beik',
        'beil', 'bfgj', 'bfgk', 'bfgl', 'bfhj', 'bfhk', 'bfhl', 'bfij', 'bfik', 'bfil', 'cdgj',
        'cdgk', 'cdgl', 'cdhj', 'cdhk', 'cdhl', 'cdij', 'cdik', 'cdil', 'cegj', 'cegk', 'cegl',
        'cehj', 'cehk', 'cehl', 'ceij', 'ceik', 'ceil', 'cfgj', 'cfgk', 'cfgl', 'cfhj', 'cfhk',
        'cfhl', 'cfij', 'cfik', 'cfil'
      ],
    },
  ],

  acmTests: [
    { input: '23\n', output: 'ad\nae\naf\nbd\nbe\nbf\ncd\nce\ncf\n' },
    { input: '\n', output: '' },
    { input: '2\n', output: 'a\nb\nc\n' },
    {
      input: '79\n',
      output: 'pw\npx\npy\npz\nqw\nqx\nqy\nqz\nrw\nrx\nry\nrz\nsw\nsx\nsy\nsz\n',
    },
    { input: '22\n', output: 'aa\nab\nac\nba\nbb\nbc\nca\ncb\ncc\n' },
    { input: '7\n', output: 'p\nq\nr\ns\n' },
    { input: '27\n', output: 'ap\naq\nar\nas\nbp\nbq\nbr\nbs\ncp\ncq\ncr\ncs\n' },
    { input: '234\n', output: 'adg\nadh\nadi\naeg\naeh\naei\nafg\nafh\nafi\nbdg\nbdh\nbdi\nbeg\nbeh\nbei\nbfg\nbfh\nbfi\ncdg\ncdh\ncdi\nceg\nceh\ncei\ncfg\ncfh\ncfi\n' },
    { input: '586\n', output: 'jtm\njtn\njto\njum\njun\njuo\njvm\njvn\njvo\nktm\nktn\nkto\nkum\nkun\nkuo\nkvm\nkvn\nkvo\nltm\nltn\nlto\nlum\nlun\nluo\nlvm\nlvn\nlvo\n' },
    { input: '2345\n', output: 'adgj\nadgk\nadgl\nadhj\nadhk\nadhl\nadij\nadik\nadil\naegj\naegk\naegl\naehj\naehk\naehl\naeij\naeik\naeil\nafgj\nafgk\nafgl\nafhj\nafhk\nafhl\nafij\nafik\nafil\nbdgj\nbdgk\nbdgl\nbdhj\nbdhk\nbdhl\nbdij\nbdik\nbdil\nbegj\nbegk\nbegl\nbehj\nbehk\nbehl\nbeij\nbeik\nbeil\nbfgj\nbfgk\nbfgl\nbfhj\nbfhk\nbfhl\nbfij\nbfik\nbfil\ncdgj\ncdgk\ncdgl\ncdhj\ncdhk\ncdhl\ncdij\ncdik\ncdil\ncegj\ncegk\ncegl\ncehj\ncehk\ncehl\nceij\nceik\nceil\ncfgj\ncfgk\ncfgl\ncfhj\ncfhk\ncfhl\ncfij\ncfik\ncfil\n' },
  ],

  templates: {
    core: {
      javascript: `/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function(digits) {
    
};
`,
      python: `def letterCombinations(digits):
    # 返回所有字母组合组成的列表
    pass
`,
    },
    acm: {
      javascript: `// ACM 模式：input 是全部输入（字符串），用 console.log 输出答案
// 输入格式：第一行为数字字符串 digits（仅含 2-9，可能为空行）
// 输出：每个组合一行，按字典序排列；没有任何组合时不输出任何内容
const digits = input.split('\\n')[0].trim();

// 在这里写你的代码

`,
      python: `# ACM 模式：用 input() 或 sys.stdin 读输入，用 print 输出答案
# 输入格式：第一行为数字字符串 digits（仅含 2-9，可能为空行）
# 输出：每个组合一行，按字典序排列；没有任何组合时不输出任何内容
import sys

digits = sys.stdin.read().split('\\n')[0].strip()

# 在这里写你的代码
`,
    },
  },

  solutions: {
    core: {
      javascript: `var letterCombinations = function(digits) {
  if (digits.length === 0) return []; // 空串没有组合
  const map = ['', '', 'abc', 'def', 'ghi', 'jkl', 'mno', 'pqrs', 'tuv', 'wxyz'];
  const ans = [];
  const path = [];
  const dfs = (i) => {
    if (i === digits.length) {
      ans.push(path.join(''));
      return;
    }
    for (const ch of map[digits[i] - '0']) {
      path.push(ch);
      dfs(i + 1);
      path.pop(); // 撤销选择，尝试下一个字母
    }
  };
  dfs(0);
  return ans;
};
`,
      python: `def letterCombinations(digits):
    if not digits:
        return []  # 空串没有组合
    table = ['', '', 'abc', 'def', 'ghi', 'jkl', 'mno', 'pqrs', 'tuv', 'wxyz']
    ans = []
    path = []

    def dfs(i):
        if i == len(digits):
            ans.append(''.join(path))
            return
        for ch in table[int(digits[i])]:
            path.append(ch)
            dfs(i + 1)
            path.pop()  # 撤销选择，尝试下一个字母

    dfs(0)
    return ans
`,
    },
    acm: {
      javascript: `const digits = input.split('\\n')[0].trim();

if (digits.length > 0) {
  const map = ['', '', 'abc', 'def', 'ghi', 'jkl', 'mno', 'pqrs', 'tuv', 'wxyz'];
  const ans = [];
  const path = [];
  const dfs = (i) => {
    if (i === digits.length) {
      ans.push(path.join(''));
      return;
    }
    for (const ch of map[digits[i] - '0']) {
      path.push(ch);
      dfs(i + 1);
      path.pop();
    }
  };
  dfs(0);

  ans.sort(); // 按字典序输出（回溯生成的顺序本就是字典序，排序作保险）
  for (const s of ans) {
    console.log(s);
  }
}
`,
      python: `import sys

digits = sys.stdin.read().split('\\n')[0].strip()

if digits:
    table = ['', '', 'abc', 'def', 'ghi', 'jkl', 'mno', 'pqrs', 'tuv', 'wxyz']
    ans = []
    path = []

    def dfs(i):
        if i == len(digits):
            ans.append(''.join(path))
            return
        for ch in table[int(digits[i])]:
            path.append(ch)
            dfs(i + 1)
            path.pop()

    dfs(0)

    ans.sort()  # 按字典序输出（回溯生成的顺序本就是字典序，排序作保险）
    for s in ans:
        print(s)
`,
    },
  },

  idea: `
把数字串看成一棵决策树：第 \`i\` 层决定 \`digits[i]\` 映射到哪个字母。每个数字对应 3~4 个字母，即每层 3~4 个分支；树深为 \`digits\` 的长度，每个叶子就是一个合法组合。

用**回溯**逐层尝试：维护当前已拼好的前缀 \`path\`，到第 \`i\` 层时遍历该数字对应的所有字母，逐个加入 \`path\` 后递归下一层，返回时撤销选择；到达末尾时 \`path\` 就是一个完整组合。

时间复杂度 \`O(4^n)\`（\`n\` 为 \`digits\` 长度，每个组合还要花 \`O(n)\` 拼字符串）——答案数量本身就是指数级，无法更优；空间复杂度 \`O(n)\`（递归栈）。
`,

  explanation: `
- \`map\` / \`table\` 是数字 \`2~9\` 到字母串的映射表，直接按下标索引：JS 用 \`digits[i] - '0'\`，Python 用 \`int(digits[i])\`
- 空串特判必须放在最前面：否则回溯会把「空前缀」当作一个组合推入答案，错误地返回 \`[""]\`
- \`dfs(i)\` 处理第 \`i\` 个数字：\`i === digits.length\` 说明每个数字都定了字母，把 \`path\` 拼成字符串入答案
- 循环里 \`push\` → 递归 → \`pop\` 是标准回溯节奏，\`pop\` 撤销选择才能尝试同层的下一个字母
- ACM 版本对答案再 \`sort()\` 一次后逐行输出（回溯按映射表的字母序生成，本就是字典序，排序只是保险）；\`digits\` 为空行时不产生任何输出
`,
};
