// 208. 实现 Trie（前缀树）
// 设计类题目：design + className，tests 用 ops/params 描述操作序列，逐步比对返回值
export default {
  id: 208,
  title: '实现 Trie（前缀树）',
  slug: 'implement-trie-prefix-tree',
  difficulty: 'medium',
  tags: ['设计', '字典树', '哈希表', '字符串'],
  hints: [
    'Trie 的关键是让所有单词共享公共前缀路径，并用末尾标记区分“路径存在”和“完整单词已插入”，因此 search 不能只判断路径能否走通。',
    '为每个节点维护字符到子节点的映射以及 isEnd 标记，将 insert、search 和 startsWith 都转化为从根节点按字符逐层向下遍历。',
    'insert 遇到缺失字符就创建子节点并在词尾设置 isEnd；查询时可抽出 searchPrefix：任一字符无子节点则失败，否则返回末尾节点，search 再检查 isEnd，startsWith 只检查节点存在。',
    '重复插入只会重复设置 isEnd，不会破坏结构；ACM 模式需按 n 行操作依次分发，Trie 和 insert 输出 null，布尔结果尤其在 Python 中要转换为小写 true/false。',
  ],
  design: true,
  className: 'Trie',

  description: `
**Trie**（前缀树，发音类似「try」）是一种树形数据结构，用于高效地存储和检索字符串数据集中的键。这一数据结构有相当多的应用情景，例如自动补全和拼写检查。

实现 \`Trie\` 类：

- \`Trie()\`：初始化前缀树对象
- \`insert(word)\`：向前缀树中插入字符串 \`word\`
- \`search(word)\`：如果字符串 \`word\` 在前缀树中（即之前已经插入过），返回 \`true\`；否则返回 \`false\`
- \`startsWith(prefix)\`：如果之前已经插入的字符串 \`word\` 的前缀之一为 \`prefix\`，返回 \`true\`；否则返回 \`false\`

### 示例

- 输入：\`Trie()\`，依次执行 \`insert("apple")\`、\`search("apple")\`、\`search("app")\`、\`startsWith("app")\`、\`insert("app")\`、\`search("app")\`
- 输出：\`[null, null, true, false, true, null, true]\`
- 解释：插入 \`apple\` 后，\`app\` 只是前缀而不是完整单词，所以 \`search("app")\` 返回 \`false\` 而 \`startsWith("app")\` 返回 \`true\`；插入 \`app\` 后 \`search("app")\` 才返回 \`true\`

### 提示

- \`1 <= word.length, prefix.length <= 2000\`
- \`word\` 和 \`prefix\` 仅由小写英文字母组成
- 最多调用 \`3 * 10^4\` 次 \`insert\`、\`search\` 和 \`startsWith\`

### ACM 模式输入输出格式

- 输入：第一行为整数 \`n\`（操作总数）；随后 \`n\` 行，每行一个操作：\`Trie\`、\`insert word\`、\`search word\` 或 \`startsWith prefix\`（\`word\` / \`prefix\` 均为无空格的小写字母串）
- 输出：每个操作一行结果——\`search\` / \`startsWith\` 输出 \`true\` 或 \`false\`，\`Trie\` / \`insert\` 输出 \`null\`

ACM 输入示例：
\`\`\`
7
Trie
insert apple
search apple
search app
startsWith app
insert app
search app
\`\`\`
输出（每行一个）：
\`\`\`
null
null
true
false
true
null
true
\`\`\`
`,

  compare: 'exact',

  tests: [
    {
      ops: ['Trie', 'insert', 'search', 'search', 'startsWith', 'insert', 'search'],
      params: [[], ['apple'], ['apple'], ['app'], ['app'], ['app'], ['app']],
      expected: [null, null, true, false, true, null, true],
    },
    {
      ops: ['Trie', 'insert', 'startsWith', 'search', 'startsWith', 'search'],
      params: [[], ['hello'], ['hell'], ['hell'], ['helloa'], ['hello']],
      expected: [null, null, true, false, false, true],
    },
    {
      ops: ['Trie', 'search', 'startsWith', 'insert', 'search', 'startsWith', 'startsWith'],
      params: [[], ['a'], ['a'], ['a'], ['a'], ['a'], ['ab']],
      expected: [null, false, false, null, true, true, false],
    },
    {
      ops: ['Trie', 'insert', 'insert', 'search', 'search', 'startsWith', 'insert', 'search', 'search'],
      params: [[], ['abc'], ['abd'], ['abc'], ['abe'], ['ab'], ['ab'], ['ab'], ['abcd']],
      expected: [null, null, null, true, false, true, null, true, false],
    },
    {
      ops: ['Trie', 'insert', 'insert', 'search', 'startsWith', 'search'],
      params: [[], ['code'], ['code'], ['code'], ['cod'], ['coding']],
      expected: [null, null, null, true, true, false],
    },
    {
      ops: ['Trie', 'startsWith', 'insert', 'insert', 'search', 'search', 'startsWith', 'startsWith', 'insert', 'search'],
      params: [[], ['x'], ['app'], ['apple'], ['app'], ['appl'], ['app'], ['apple'], ['apple'], ['apple']],
      expected: [null, false, null, null, true, false, true, true, null, true],
    },
  ],

  acmTests: [
    {
      input: '7\nTrie\ninsert apple\nsearch apple\nsearch app\nstartsWith app\ninsert app\nsearch app\n',
      output: 'null\nnull\ntrue\nfalse\ntrue\nnull\ntrue\n',
    },
    {
      input: '6\nTrie\ninsert hello\nstartsWith hell\nsearch hell\nstartsWith helloa\nsearch hello\n',
      output: 'null\nnull\ntrue\nfalse\nfalse\ntrue\n',
    },
    {
      input: '7\nTrie\nsearch a\nstartsWith a\ninsert a\nsearch a\nstartsWith a\nstartsWith ab\n',
      output: 'null\nfalse\nfalse\nnull\ntrue\ntrue\nfalse\n',
    },
    {
      input: '9\nTrie\ninsert abc\ninsert abd\nsearch abc\nsearch abe\nstartsWith ab\ninsert ab\nsearch ab\nsearch abcd\n',
      output: 'null\nnull\nnull\ntrue\nfalse\ntrue\nnull\ntrue\nfalse\n',
    },
    {
      input: '6\nTrie\ninsert code\ninsert code\nsearch code\nstartsWith cod\nsearch coding\n',
      output: 'null\nnull\nnull\ntrue\ntrue\nfalse\n',
    },
    {
      input: '10\nTrie\nstartsWith x\ninsert app\ninsert apple\nsearch app\nsearch appl\nstartsWith app\nstartsWith apple\ninsert apple\nsearch apple\n',
      output: 'null\nfalse\nnull\nnull\ntrue\nfalse\ntrue\ntrue\nnull\ntrue\n',
    },
  ],

  templates: {
    core: {
      javascript: `// 实现 Trie（前缀树）：insert / search / startsWith 均为 O(L)
class Trie {
  constructor() {
    
  }
  insert(word) {
    
  }
  search(word) {
    
  }
  startsWith(prefix) {
    
  }
}
`,
      python: `# 实现 Trie（前缀树）：insert / search / startsWith 均为 O(L)
class Trie:
    def __init__(self):
        pass

    def insert(self, word):
        pass

    def search(self, word):
        pass

    def startsWith(self, prefix):
        pass
`,
    },
    acm: {
      javascript: `// ACM 模式：input 是全部输入（字符串），用 console.log 输出答案
// 输入格式：第一行 n；随后 n 行，每行为 "Trie" / "insert word" / "search word" / "startsWith prefix"
// 输出：search / startsWith 输出 true 或 false，Trie / insert 输出 null
class Trie {
  constructor() {
    
  }
  insert(word) {
    
  }
  search(word) {
    
  }
  startsWith(prefix) {
    
  }
}

const lines = input.trim().split('\\n');
const n = Number(lines[0]);
let trie = null;
for (let i = 1; i <= n; i++) {
  const parts = lines[i].trim().split(/\\s+/);
  const op = parts[0];
  const word = parts[1]; // 单词参数（Trie 操作没有该参数）
  // 在这里根据 op 分发操作并用 console.log 输出结果
}
`,
      python: `# ACM 模式：用 input() 或 sys.stdin 读输入，用 print 输出答案
# 输入格式：第一行 n；随后 n 行，每行为 "Trie" / "insert word" / "search word" / "startsWith prefix"
# 输出：search / startsWith 输出 true 或 false，Trie / insert 输出 null
import sys

class Trie:
    def __init__(self):
        pass

    def insert(self, word):
        pass

    def search(self, word):
        pass

    def startsWith(self, prefix):
        pass

lines = sys.stdin.read().split('\\n')
n = int(lines[0])
trie = None
for i in range(1, n + 1):
    parts = lines[i].split()
    op = parts[0]
    # 在这里根据 op 分发操作并用 print 输出结果（注意布尔要输出小写 true / false）
`,
    },
  },

  solutions: {
    core: {
      javascript: `// 每个节点：children 存放「字符 -> 子节点」，isEnd 标记是否有单词在此结束
class Trie {
  constructor() {
    this.children = {};
    this.isEnd = false;
  }
  insert(word) {
    let node = this;
    for (const ch of word) {
      if (!node.children[ch]) node.children[ch] = new Trie();
      node = node.children[ch];
    }
    node.isEnd = true;
  }
  // 沿字符逐层向下走，返回走到的节点；走不通返回 null
  searchPrefix(word) {
    let node = this;
    for (const ch of word) {
      if (!node.children[ch]) return null;
      node = node.children[ch];
    }
    return node;
  }
  search(word) {
    const node = this.searchPrefix(word);
    return node !== null && node.isEnd;
  }
  startsWith(prefix) {
    return this.searchPrefix(prefix) !== null;
  }
}
`,
      python: `# 每个节点：children 存放「字符 -> 子节点」，is_end 标记是否有单词在此结束
class Trie:
    def __init__(self):
        self.children = {}
        self.is_end = False

    def insert(self, word):
        node = self
        for ch in word:
            if ch not in node.children:
                node.children[ch] = Trie()
            node = node.children[ch]
        node.is_end = True

    # 沿字符逐层向下走，返回走到的节点；走不通返回 None
    def _search_prefix(self, word):
        node = self
        for ch in word:
            if ch not in node.children:
                return None
            node = node.children[ch]
        return node

    def search(self, word):
        node = self._search_prefix(word)
        return node is not None and node.is_end

    def startsWith(self, prefix):
        return self._search_prefix(prefix) is not None
`,
    },
    acm: {
      javascript: `class Trie {
  constructor() {
    this.children = {};
    this.isEnd = false;
  }
  insert(word) {
    let node = this;
    for (const ch of word) {
      if (!node.children[ch]) node.children[ch] = new Trie();
      node = node.children[ch];
    }
    node.isEnd = true;
  }
  searchPrefix(word) {
    let node = this;
    for (const ch of word) {
      if (!node.children[ch]) return null;
      node = node.children[ch];
    }
    return node;
  }
  search(word) {
    const node = this.searchPrefix(word);
    return node !== null && node.isEnd;
  }
  startsWith(prefix) {
    return this.searchPrefix(prefix) !== null;
  }
}

const lines = input.trim().split('\\n');
const n = Number(lines[0]);
let trie = null;
for (let i = 1; i <= n; i++) {
  const parts = lines[i].trim().split(/\\s+/);
  const op = parts[0];
  const word = parts[1];
  if (op === 'Trie') {
    trie = new Trie();
    console.log('null');
  } else if (op === 'insert') {
    trie.insert(word);
    console.log('null');
  } else if (op === 'search') {
    console.log(trie.search(word));
  } else if (op === 'startsWith') {
    console.log(trie.startsWith(word));
  }
}
`,
      python: `import sys

class Trie:
    def __init__(self):
        self.children = {}
        self.is_end = False

    def insert(self, word):
        node = self
        for ch in word:
            if ch not in node.children:
                node.children[ch] = Trie()
            node = node.children[ch]
        node.is_end = True

    def _search_prefix(self, word):
        node = self
        for ch in word:
            if ch not in node.children:
                return None
            node = node.children[ch]
        return node

    def search(self, word):
        node = self._search_prefix(word)
        return node is not None and node.is_end

    def startsWith(self, prefix):
        return self._search_prefix(prefix) is not None

lines = sys.stdin.read().split('\\n')
n = int(lines[0])
trie = None
for i in range(1, n + 1):
    parts = lines[i].split()
    op = parts[0]
    if op == 'Trie':
        trie = Trie()
        print('null')
    elif op == 'insert':
        trie.insert(parts[1])
        print('null')
    elif op == 'search':
        print('true' if trie.search(parts[1]) else 'false')
    elif op == 'startsWith':
        print('true' if trie.startsWith(parts[1]) else 'false')
`,
    },
  },

  idea: `
题目要同时支持「完整单词查询」和「前缀查询」：

- 哈希集合能把 \`search\` 做到 O(L)，但 \`startsWith\` 只能枚举已插入单词的所有前缀逐个查，代价很高
- **前缀树（Trie）** 把公共前缀合并存储：从根到某个节点的路径恰好拼出一个前缀，每个节点再用 \`isEnd\` 标记「是否有单词在此结束」

于是三种操作都是「沿字符逐层向下走」：

- \`insert(word)\`：逐层走，缺少的子节点就新建，最后在末尾节点打上 \`isEnd\` 标记
- \`search(word)\`：能走到 \`word\` 末尾的节点、且该节点 \`isEnd\` 为真，才返回 true
- \`startsWith(prefix)\`：只要能走到 \`prefix\` 末尾的节点就返回 true，不需要看 \`isEnd\`

三种操作的时间复杂度都是 O(L)（L 为字符串长度），空间复杂度 O(所有插入字符串的字符总数)。
`,

  explanation: `
- 每个节点只有两部分：\`children\`（字符 → 子节点，JS 用普通对象、Python 用字典）和 \`isEnd\` 标记；整棵树不需要显式的「根值」
- \`insert\` 与两种查询共用「沿字符走」的逻辑：参考代码把它抽成 \`searchPrefix\` / \`_search_prefix\`，返回走到的节点，走不通返回空
- \`search\` 与 \`startsWith\` 的唯一区别是前者额外检查末尾节点的 \`isEnd\`——这正是本题的核心考点
- 易错点一：把 \`search\` 写得和 \`startsWith\` 一样。只插入 \`apple\` 时 \`search("app")\` 必须是 false，因为 \`app\` 只是前缀而不是插入过的单词
- 易错点二：担心重复插入同一单词出问题——其实只是沿已有路径再走一遍、重复打标记，结果是幂等的

ACM 版本自己解析操作序列并分发。注意布尔结果必须输出小写 \`true\` / \`false\`：Python 里 \`print(True)\` 会得到 \`True\`，所以要用 \`'true' if ... else 'false'\` 手动转换。
`,
};
