// 146. LRU 缓存
// 设计类题目示例：design + className，tests 用 ops/params 描述操作序列，逐步比对返回值
export default {
  id: 146,
  title: 'LRU 缓存',
  slug: 'lru-cache',
  difficulty: 'medium',
  tags: ['设计', '哈希表', '链表', '双向链表'],
  hints: [
    '既要 O(1) 查找键，又要 O(1) 找到并删除最久未使用项，需要同时维护键映射和使用顺序。',
    '经典结构是哈希表加双向链表：表中定位节点，链表头尾分别表示最近与最久使用。',
    'get 命中和 put 更新旧键都要把节点移到最近端；插入新键后超容量则淘汰最久端并同步删哈希项。',
    '容量为 1、更新已有键、get 后改变淘汰顺序都是关键边界；put 没有返回值，操作结果应记录为 null。',
  ],
  design: true,
  className: 'LRUCache',

  description: `
请你设计并实现一个满足 **LRU（最近最少使用）** 缓存约束的数据结构。

实现 \`LRUCache\` 类：

- \`LRUCache(capacity)\`：以正整数 \`capacity\` 初始化缓存
- \`get(key)\`：如果关键字 \`key\` 存在于缓存中，则返回其值，否则返回 \`-1\`
- \`put(key, value)\`：如果关键字已存在，则变更其值；如果不存在，则插入该组键值对。当缓存容量达到上限时，它应该在写入新数据之前**删除最久未使用的数据**，以腾出空间

\`get\` 和 \`put\` 必须以 **O(1)** 的平均时间复杂度运行。

### 示例

- 输入：\`LRUCache(2)\`，依次执行 \`put(1,1)\`、\`put(2,2)\`、\`get(1)\`、\`put(3,3)\`、\`get(2)\`、\`put(4,4)\`、\`get(1)\`、\`get(3)\`、\`get(4)\`
- 输出：\`[null, null, null, 1, null, -1, null, -1, 3, 4]\`
- 解释：\`put(3,3)\` 时缓存已满，淘汰最久未使用的 \`key=2\`；之后 \`get(2)\` 返回 \`-1\`

### 提示

- \`1 <= capacity <= 3000\`，\`0 <= key <= 10^4\`，\`0 <= value <= 10^5\`
- 最多调用 \`2 * 10^5\` 次 \`get\` 和 \`put\`

### ACM 模式输入输出格式

- 输入：第一行为整数 \`n\`（操作总数）；随后 \`n\` 行，每行一个操作：\`LRUCache 容量\`、\`put key value\` 或 \`get key\`
- 输出：每个操作一行结果——\`get\` 输出其返回值，\`put\` 与构造函数输出 \`null\`

ACM 输入示例：
\`\`\`
10
LRUCache 2
put 1 1
put 2 2
get 1
put 3 3
get 2
put 4 4
get 1
get 3
get 4
\`\`\`
输出（每行一个）：
\`\`\`
null
null
null
1
null
-1
null
-1
3
4
\`\`\`
`,

  compare: 'exact',

  tests: [
    {
      ops: ['LRUCache', 'put', 'put', 'get', 'put', 'get', 'put', 'get', 'get', 'get'],
      params: [[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]],
      expected: [null, null, null, 1, null, -1, null, -1, 3, 4],
    },
    {
      ops: ['LRUCache', 'put', 'put', 'get'],
      params: [[1], [1, 1], [2, 2], [1]],
      expected: [null, null, null, -1],
    },
    {
      ops: ['LRUCache', 'put', 'get', 'put', 'get', 'get'],
      params: [[2], [1, 5], [1], [1, 10], [1], [2]],
      expected: [null, null, 5, null, 10, -1],
    },
    {
      ops: ['LRUCache', 'get', 'put', 'get', 'put', 'get', 'get'],
      params: [[2], [1], [1, 1], [1], [2, 2], [1], [2]],
      expected: [null, -1, null, 1, null, 1, 2],
    },
    {
      ops: ['LRUCache', 'put', 'get', 'put', 'get', 'put', 'get', 'get'],
      params: [[1], [2, 1], [2], [2, 2], [2], [3, 3], [2], [3]],
      expected: [null, null, 1, null, 2, null, -1, 3],
    },
    {
      ops: ['LRUCache', 'put', 'put', 'get', 'put', 'put', 'get', 'get', 'get', 'get'],
      params: [[2], [1, 1], [2, 2], [1], [3, 3], [4, 4], [1], [2], [3], [4]],
      expected: [null, null, null, 1, null, null, -1, -1, 3, 4],
    },
  ],

  acmTests: [
    {
      input: '10\nLRUCache 2\nput 1 1\nput 2 2\nget 1\nput 3 3\nget 2\nput 4 4\nget 1\nget 3\nget 4\n',
      output: 'null\nnull\nnull\n1\nnull\n-1\nnull\n-1\n3\n4\n',
    },
    {
      input: '4\nLRUCache 1\nput 1 1\nput 2 2\nget 1\n',
      output: 'null\nnull\nnull\n-1\n',
    },
    {
      input: '6\nLRUCache 2\nput 1 5\nget 1\nput 1 10\nget 1\nget 2\n',
      output: 'null\nnull\n5\nnull\n10\n-1\n',
    },
    {
      input: '8\nLRUCache 1\nput 2 1\nget 2\nput 2 2\nget 2\nput 3 3\nget 2\nget 3\n',
      output: 'null\nnull\n1\nnull\n2\nnull\n-1\n3\n',
    },
    {
      input: '10\nLRUCache 2\nput 1 1\nput 2 2\nget 1\nput 3 3\nput 4 4\nget 1\nget 2\nget 3\nget 4\n',
      output: 'null\nnull\nnull\n1\nnull\nnull\n-1\n-1\n3\n4\n',
    },
    {
      input: '121\nLRUCache 7\nget 8\nget 11\nget 10\nput 10 25774\nput 4 26861\nget 10\nget 11\nput 2 53140\nput 7 49850\nput 2 80233\nget 3\nput 6 36036\nget 2\nput 5 44140\nget 11\nput 9 46328\nget 8\nput 8 35267\nget 2\nget 10\nget 6\nput 6 14104\nput 1 26294\nget 0\nget 12\nget 2\nput 2 68820\nget 12\nput 7 22712\nput 3 35368\nput 0 37789\nput 2 87781\nput 3 14432\nget 2\nput 8 39877\nget 5\nget 0\nput 10 54836\nget 10\nput 7 67590\nget 4\nput 0 50400\nput 2 36580\nget 12\nput 0 29093\nput 7 98073\nput 3 27420\nput 7 89856\nput 5 3973\nput 1 91233\nput 8 20111\nput 2 88714\nput 2 70621\nget 1\nget 5\nput 4 20055\nput 8 53260\nput 2 59360\nget 5\nput 2 27189\nput 10 36682\nput 7 84586\nput 1 94758\nget 5\nget 2\nget 4\nget 12\nget 1\nput 7 27405\nget 7\nput 5 2426\nput 3 89375\nput 0 91582\nget 6\nput 11 19943\nput 7 46545\nput 8 57055\nput 11 26257\nput 9 51054\nput 7 53732\nput 5 51252\nput 10 53839\nput 10 47633\nput 2 54692\nput 3 78452\nput 5 90214\nget 5\nput 7 87293\nget 7\nput 2 7979\nput 9 61734\nget 6\nget 4\nput 7 37133\nput 7 84637\nput 9 84082\nput 12 43674\nput 8 31733\nget 0\nget 10\nput 9 41158\nput 11 9389\nget 4\nput 11 72556\nput 5 55418\nput 12 30315\nget 9\nput 4 65275\nget 5\nget 12\nput 0 27362\nget 3\nget 7\nput 12 67661\nput 9 95380\nput 6 21021\nput 8 41389\nput 0 44760\nput 2 20505\nput 8 50355\n',
      output: 'null\n-1\n-1\n-1\nnull\nnull\n25774\n-1\nnull\nnull\nnull\n-1\nnull\n80233\nnull\n-1\nnull\n-1\nnull\n80233\n25774\n36036\nnull\nnull\n-1\n-1\n80233\nnull\n-1\nnull\nnull\nnull\nnull\nnull\n87781\nnull\n-1\n37789\nnull\n54836\nnull\n-1\nnull\nnull\n-1\nnull\nnull\nnull\nnull\nnull\nnull\nnull\nnull\nnull\n91233\n3973\nnull\nnull\nnull\n3973\nnull\nnull\nnull\nnull\n3973\n27189\n20055\n-1\n94758\nnull\n27405\nnull\nnull\nnull\n-1\nnull\nnull\nnull\nnull\nnull\nnull\nnull\nnull\nnull\nnull\nnull\nnull\n90214\nnull\n87293\nnull\nnull\n-1\n-1\nnull\nnull\nnull\nnull\nnull\n-1\n-1\nnull\nnull\n-1\nnull\nnull\nnull\n41158\nnull\n55418\n30315\nnull\n-1\n-1\nnull\nnull\nnull\nnull\nnull\nnull\nnull\n',
    },
  ],

  templates: {
    core: {
      javascript: `// 设计一个 LRU 缓存：get / put 均为 O(1)
class LRUCache {
  constructor(capacity) {
    
  }
  get(key) {
    
  }
  put(key, value) {
    
  }
}
`,
      python: `# 设计一个 LRU 缓存：get / put 均为 O(1)
class LRUCache:
    def __init__(self, capacity):
        pass

    def get(self, key):
        pass

    def put(self, key, value):
        pass
`,
    },
    acm: {
      javascript: `// ACM 模式：input 是全部输入（字符串），用 console.log 输出答案
// 输入格式：第一行 n；随后 n 行，每行为 "LRUCache 容量" / "put key value" / "get key"
// 输出：get 输出返回值，put 与构造函数输出 null
class LRUCache {
  constructor(capacity) {
    
  }
  get(key) {
    
  }
  put(key, value) {
    
  }
}

const lines = input.trim().split('\\n');
const n = Number(lines[0]);
let cache = null;
for (let i = 1; i <= n; i++) {
  const parts = lines[i].trim().split(/\\s+/);
  const op = parts[0];
  const args = parts.slice(1).map(Number);
  // 在这里根据 op 分发操作并用 console.log 输出结果
}
`,
      python: `# ACM 模式：用 input() 或 sys.stdin 读输入，用 print 输出答案
# 输入格式：第一行 n；随后 n 行，每行为 "LRUCache 容量" / "put key value" / "get key"
# 输出：get 输出返回值，put 与构造函数输出 null
import sys

class LRUCache:
    def __init__(self, capacity):
        pass

    def get(self, key):
        pass

    def put(self, key, value):
        pass

lines = sys.stdin.read().split('\\n')
n = int(lines[0])
cache = None
for i in range(1, n + 1):
    parts = lines[i].split()
    op = parts[0]
    args = list(map(int, parts[1:]))
    # 在这里根据 op 分发操作并用 print 输出结果
`,
    },
  },

  solutions: {
    core: {
      javascript: `// JS 的 Map 按插入顺序迭代：每次访问后删除重插即「标记为最近使用」，
// 迭代第一个 key 就是「最久未使用」
class LRUCache {
  constructor(capacity) {
    this.cap = capacity;
    this.map = new Map();
  }
  get(key) {
    if (!this.map.has(key)) return -1;
    const v = this.map.get(key);
    this.map.delete(key);
    this.map.set(key, v); // 移到最新位置
    return v;
  }
  put(key, value) {
    if (this.map.has(key)) this.map.delete(key);
    this.map.set(key, value);
    if (this.map.size > this.cap) {
      this.map.delete(this.map.keys().next().value); // 淘汰最久未使用
    }
  }
}
`,
      python: `# OrderedDict 按插入顺序排列：move_to_end 标记最近使用，popitem(last=False) 淘汰最久未使用
from collections import OrderedDict

class LRUCache:
    def __init__(self, capacity):
        self.cap = capacity
        self.od = OrderedDict()

    def get(self, key):
        if key not in self.od:
            return -1
        self.od.move_to_end(key)  # 标记为最近使用
        return self.od[key]

    def put(self, key, value):
        if key in self.od:
            self.od.move_to_end(key)
        self.od[key] = value
        if len(self.od) > self.cap:
            self.od.popitem(last=False)  # 淘汰最久未使用
`,
    },
    acm: {
      javascript: `class LRUCache {
  constructor(capacity) {
    this.cap = capacity;
    this.map = new Map();
  }
  get(key) {
    if (!this.map.has(key)) return -1;
    const v = this.map.get(key);
    this.map.delete(key);
    this.map.set(key, v);
    return v;
  }
  put(key, value) {
    if (this.map.has(key)) this.map.delete(key);
    this.map.set(key, value);
    if (this.map.size > this.cap) {
      this.map.delete(this.map.keys().next().value);
    }
  }
}

const lines = input.trim().split('\\n');
const n = Number(lines[0]);
let cache = null;
for (let i = 1; i <= n; i++) {
  const parts = lines[i].trim().split(/\\s+/);
  const op = parts[0];
  const args = parts.slice(1).map(Number);
  if (op === 'LRUCache') {
    cache = new LRUCache(args[0]);
    console.log('null');
  } else if (op === 'put') {
    cache.put(args[0], args[1]);
    console.log('null');
  } else if (op === 'get') {
    console.log(cache.get(args[0]));
  }
}
`,
      python: `import sys
from collections import OrderedDict

class LRUCache:
    def __init__(self, capacity):
        self.cap = capacity
        self.od = OrderedDict()

    def get(self, key):
        if key not in self.od:
            return -1
        self.od.move_to_end(key)
        return self.od[key]

    def put(self, key, value):
        if key in self.od:
            self.od.move_to_end(key)
        self.od[key] = value
        if len(self.od) > self.cap:
            self.od.popitem(last=False)

lines = sys.stdin.read().split('\\n')
n = int(lines[0])
cache = None
for i in range(1, n + 1):
    parts = lines[i].split()
    op = parts[0]
    args = list(map(int, parts[1:]))
    if op == 'LRUCache':
        cache = LRUCache(args[0])
        print('null')
    elif op == 'put':
        cache.put(args[0], args[1])
        print('null')
    elif op == 'get':
        print(cache.get(args[0]))
`,
    },
  },

  idea: `
LRU 缓存要求 \`get\` / \`put\` 都是 O(1)，经典解法是 **哈希表 + 双向链表**：

- 哈希表负责 O(1) 定位 key 对应的节点
- 双向链表按「使用顺序」排列节点：头部是最近使用，尾部是最久未使用
- 每次 \`get\` 或 \`put\` 命中已存在的 key 后，把对应节点移动到头部
- 容量满时删除尾部节点，同时在哈希表中删掉对应 key

实现上通常用两个哨兵节点（伪头、伪尾）来消除边界判断。

工程里也可以直接利用语言内置的「有序字典」：JS 的 \`Map\` 按插入顺序迭代，Python 的 \`OrderedDict\` 提供 \`move_to_end\` 和 \`popitem\`，二者等价于「哈希表 + 双向链表」的组合，参考代码采用这种更简洁的写法。
`,

  explanation: `
参考代码的核心就两条规则：

- **标记最近使用**：\`get\` 命中时，把 key 删除后重新插入（JS），或 \`move_to_end(key)\`（Python），使它成为「最新」的一个
- **淘汰最久未使用**：\`put\` 后如果超出容量，删掉顺序上的第一个元素——\`map.keys().next().value\`（JS Map 迭代顺序即插入顺序），或 \`popitem(last=False)\`（Python）
- \`put\` 已存在的 key 时也要先把它移到最新位置，再更新值

注意 \`put\` 的淘汰时机：先插入再判断是否超容量，这样「更新已有 key」的情况不会误删。

ACM 版本只是把判题器的调用换成自己解析操作序列并分发：读到 \`LRUCache c\` 建对象、\`put a b\` 调用 put 并输出 \`null\`、\`get a\` 调用 get 并输出返回值。
`,
};
