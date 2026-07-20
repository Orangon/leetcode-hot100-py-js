// 155. 最小栈
// 设计类题目：design + className，tests 用 ops/params 描述操作序列，逐步比对返回值
export default {
  id: 155,
  title: '最小栈',
  slug: 'min-stack',
  difficulty: 'medium',
  tags: ['栈', '设计'],
  hints: [
    '若每次 getMin 都遍历栈会退化为 O(n)；关键是让每次压栈都保存该位置对应的历史最小值，使查询只需读取栈顶。',
    '使用主栈保存元素、辅助最小栈保存逐层最小值，两者同步增删，即可让 push、pop、top 和 getMin 全部达到 O(1)。',
    'push(val) 时主栈压入 val，辅助栈压入 min(val, 辅助栈当前栈顶)；pop 时两栈同时弹出，top 读主栈顶，getMin 读辅助栈顶。',
    '重复最小值也必须逐层记录，否则弹出一个最小值后结果会错误；ACM 模式首行是操作数，逐行分发操作，并为 MinStack、push、pop 各输出 null。',
  ],
  design: true,
  className: 'MinStack',

  description: `
设计一个支持 \`push\`、\`pop\`、\`top\` 操作，并能在**常数时间内**检索到最小元素的栈。

实现 \`MinStack\` 类：

- \`MinStack()\`：初始化堆栈对象
- \`push(val)\`：将元素 \`val\` 推入堆栈
- \`pop()\`：删除堆栈顶部的元素
- \`top()\`：获取堆栈顶部的元素
- \`getMin()\`：获取堆栈中的最小元素

### 示例

- 输入：\`MinStack()\`，依次执行 \`push(-2)\`、\`push(0)\`、\`push(-3)\`、\`getMin()\`、\`pop()\`、\`top()\`、\`getMin()\`
- 输出：\`[null, null, null, null, -3, null, 0, -2]\`
- 解释：压入 \`-2, 0, -3\` 后最小值是 \`-3\`；弹出 \`-3\` 后栈顶为 \`0\`，最小值恢复为 \`-2\`

### 提示

- \`-2^31 <= val <= 2^31 - 1\`
- \`pop\`、\`top\` 和 \`getMin\` 操作总是在**非空栈**上调用
- 最多调用 \`3 * 10^4\` 次 \`push\`、\`pop\`、\`top\` 和 \`getMin\`

### ACM 模式输入输出格式

- 输入：第一行为整数 \`n\`（操作总数）；随后 \`n\` 行，每行一个操作：\`MinStack\`、\`push val\`、\`pop\`、\`top\` 或 \`getMin\`
- 输出：每个操作一行结果——\`top\` / \`getMin\` 输出其返回值，\`MinStack\` / \`push\` / \`pop\` 输出 \`null\`

ACM 输入示例：
\`\`\`
8
MinStack
push -2
push 0
push -3
getMin
pop
top
getMin
\`\`\`
输出（每行一个）：
\`\`\`
null
null
null
null
-3
null
0
-2
\`\`\`
`,

  compare: 'exact',

  tests: [
    {
      ops: ['MinStack', 'push', 'push', 'push', 'getMin', 'pop', 'top', 'getMin'],
      params: [[], [-2], [0], [-3], [], [], [], []],
      expected: [null, null, null, null, -3, null, 0, -2],
    },
    {
      ops: ['MinStack', 'push', 'push', 'push', 'getMin', 'pop', 'getMin', 'pop', 'getMin', 'top'],
      params: [[], [2], [0], [0], [], [], [], [], [], []],
      expected: [null, null, null, null, 0, null, 0, null, 2, 2],
    },
    {
      ops: ['MinStack', 'push', 'push', 'push', 'getMin', 'top', 'pop', 'getMin', 'pop', 'getMin'],
      params: [[], [5], [3], [7], [], [], [], [], [], []],
      expected: [null, null, null, null, 3, 7, null, 3, null, 5],
    },
    {
      ops: ['MinStack', 'push', 'push', 'push', 'push', 'getMin', 'pop', 'getMin', 'pop', 'getMin', 'pop', 'top'],
      params: [[], [4], [3], [2], [1], [], [], [], [], [], [], []],
      expected: [null, null, null, null, null, 1, null, 2, null, 3, null, 4],
    },
    {
      ops: ['MinStack', 'push', 'top', 'getMin', 'pop', 'push', 'getMin'],
      params: [[], [-1], [], [], [], [-2], []],
      expected: [null, null, -1, -1, null, null, -2],
    },
    {
      ops: ["MinStack", "push", "push", "push", "push", "getMin", "pop", "top", "getMin", "pop", "getMin", "pop", "getMin", "push", "getMin", "pop", "getMin", "push", "getMin", "push", "push", "push", "push", "push", "push", "pop", "getMin", "top", "push", "pop", "push", "top", "getMin", "top", "push", "push", "push", "pop", "pop", "getMin", "push", "pop", "push", "top", "push", "push", "push", "getMin", "push", "push", "push", "pop", "pop", "push", "getMin", "top", "push", "push", "getMin", "getMin", "pop", "push", "pop", "top", "push", "push", "pop", "push", "push", "pop", "getMin", "pop", "push", "top", "push", "pop", "getMin", "getMin", "pop", "push", "top", "push", "pop", "push", "top", "push", "getMin", "push", "push", "getMin", "push", "getMin", "push", "pop", "push", "push", "push", "push", "push", "push", "getMin", "push", "pop", "top", "getMin", "push", "push", "push", "push", "push", "push", "getMin", "push", "push", "getMin", "push", "top", "push", "top", "push", "top", "push", "top", "push", "push", "push", "pop", "push", "pop", "top", "push", "pop", "pop", "push", "push", "push", "push", "getMin", "push", "pop", "getMin", "pop", "push", "pop", "push", "getMin", "top", "getMin", "push", "push"],
      params: [[], [-100], [-500], [-500], [300], [], [], [], [], [], [], [], [], [-600], [], [], [], [989], [], [-853], [361], [314], [914], [125], [611], [], [], [], [213], [], [-71], [], [], [], [314], [-215], [914], [], [], [], [119], [], [703], [], [-71], [-887], [-310], [], [-887], [180], [-950], [], [], [-781], [], [], [-474], [-50], [], [], [], [-718], [], [], [-637], [147], [], [-637], [-23], [], [], [], [-474], [], [-887], [], [], [], [], [-872], [], [-266], [], [816], [], [-840], [], [-155], [-498], [], [-677], [], [961], [], [-368], [-701], [-830], [-310], [825], [-859], [], [-87], [], [], [], [-929], [698], [-259], [314], [929], [-301], [], [-637], [8], [], [-701], [], [-943], [], [697], [], [-409], [], [312], [-161], [-137], [], [957], [], [], [410], [], [], [-99], [-602], [-222], [285], [], [361], [], [], [], [-807], [], [937], [], [], [], [557], [703]],
      expected: [null, null, null, null, null, -500, null, -500, -500, null, -500, null, -100, null, -600, null, -100, null, -100, null, null, null, null, null, null, null, -853, 125, null, null, null, -71, -853, -71, null, null, null, null, null, -853, null, null, null, 703, null, null, null, -887, null, null, null, null, null, null, -887, -781, null, null, -887, -887, null, null, null, -474, null, null, null, null, null, null, -887, null, null, -474, null, null, -887, -887, null, null, -872, null, null, null, 816, null, -887, null, null, -887, null, -887, null, null, null, null, null, null, null, null, -887, null, null, -859, -887, null, null, null, null, null, null, -929, null, null, -929, null, -701, null, -943, null, 697, null, -409, null, null, null, null, null, null, -161, null, null, null, null, null, null, null, -943, null, null, -943, null, null, null, null, -943, 937, -943, null, null],
    },
  ],

  acmTests: [
    {
      input: '8\nMinStack\npush -2\npush 0\npush -3\ngetMin\npop\ntop\ngetMin\n',
      output: 'null\nnull\nnull\nnull\n-3\nnull\n0\n-2\n',
    },
    {
      input: '10\nMinStack\npush 2\npush 0\npush 0\ngetMin\npop\ngetMin\npop\ngetMin\ntop\n',
      output: 'null\nnull\nnull\nnull\n0\nnull\n0\nnull\n2\n2\n',
    },
    {
      input: '10\nMinStack\npush 5\npush 3\npush 7\ngetMin\ntop\npop\ngetMin\npop\ngetMin\n',
      output: 'null\nnull\nnull\nnull\n3\n7\nnull\n3\nnull\n5\n',
    },
    {
      input: '12\nMinStack\npush 4\npush 3\npush 2\npush 1\ngetMin\npop\ngetMin\npop\ngetMin\npop\ntop\n',
      output: 'null\nnull\nnull\nnull\nnull\n1\nnull\n2\nnull\n3\nnull\n4\n',
    },
    {
      input: '7\nMinStack\npush -1\ntop\ngetMin\npop\npush -2\ngetMin\n',
      output: 'null\nnull\n-1\n-1\nnull\nnull\n-2\n',
    },
    { input: '150\nMinStack\npush -100\npush -500\npush -500\npush 300\ngetMin\npop\ntop\ngetMin\npop\ngetMin\npop\ngetMin\npush -600\ngetMin\npop\ngetMin\npush 989\ngetMin\npush -853\npush 361\npush 314\npush 914\npush 125\npush 611\npop\ngetMin\ntop\npush 213\npop\npush -71\ntop\ngetMin\ntop\npush 314\npush -215\npush 914\npop\npop\ngetMin\npush 119\npop\npush 703\ntop\npush -71\npush -887\npush -310\ngetMin\npush -887\npush 180\npush -950\npop\npop\npush -781\ngetMin\ntop\npush -474\npush -50\ngetMin\ngetMin\npop\npush -718\npop\ntop\npush -637\npush 147\npop\npush -637\npush -23\npop\ngetMin\npop\npush -474\ntop\npush -887\npop\ngetMin\ngetMin\npop\npush -872\ntop\npush -266\npop\npush 816\ntop\npush -840\ngetMin\npush -155\npush -498\ngetMin\npush -677\ngetMin\npush 961\npop\npush -368\npush -701\npush -830\npush -310\npush 825\npush -859\ngetMin\npush -87\npop\ntop\ngetMin\npush -929\npush 698\npush -259\npush 314\npush 929\npush -301\ngetMin\npush -637\npush 8\ngetMin\npush -701\ntop\npush -943\ntop\npush 697\ntop\npush -409\ntop\npush 312\npush -161\npush -137\npop\npush 957\npop\ntop\npush 410\npop\npop\npush -99\npush -602\npush -222\npush 285\ngetMin\npush 361\npop\ngetMin\npop\npush -807\npop\npush 937\ngetMin\ntop\ngetMin\npush 557\npush 703\n', output: 'null\nnull\nnull\nnull\nnull\n-500\nnull\n-500\n-500\nnull\n-500\nnull\n-100\nnull\n-600\nnull\n-100\nnull\n-100\nnull\nnull\nnull\nnull\nnull\nnull\nnull\n-853\n125\nnull\nnull\nnull\n-71\n-853\n-71\nnull\nnull\nnull\nnull\nnull\n-853\nnull\nnull\nnull\n703\nnull\nnull\nnull\n-887\nnull\nnull\nnull\nnull\nnull\nnull\n-887\n-781\nnull\nnull\n-887\n-887\nnull\nnull\nnull\n-474\nnull\nnull\nnull\nnull\nnull\nnull\n-887\nnull\nnull\n-474\nnull\nnull\n-887\n-887\nnull\nnull\n-872\nnull\nnull\nnull\n816\nnull\n-887\nnull\nnull\n-887\nnull\n-887\nnull\nnull\nnull\nnull\nnull\nnull\nnull\nnull\n-887\nnull\nnull\n-859\n-887\nnull\nnull\nnull\nnull\nnull\nnull\n-929\nnull\nnull\n-929\nnull\n-701\nnull\n-943\nnull\n697\nnull\n-409\nnull\nnull\nnull\nnull\nnull\nnull\n-161\nnull\nnull\nnull\nnull\nnull\nnull\nnull\n-943\nnull\nnull\n-943\nnull\nnull\nnull\nnull\n-943\n937\n-943\nnull\nnull\n' },
  ],

  templates: {
    core: {
      javascript: `// 设计一个最小栈：push / pop / top / getMin 均为 O(1)
class MinStack {
  constructor() {
    
  }
  push(val) {
    
  }
  pop() {
    
  }
  top() {
    
  }
  getMin() {
    
  }
}
`,
      python: `# 设计一个最小栈：push / pop / top / getMin 均为 O(1)
class MinStack:
    def __init__(self):
        pass

    def push(self, val):
        pass

    def pop(self):
        pass

    def top(self):
        pass

    def getMin(self):
        pass
`,
    },
    acm: {
      javascript: `// ACM 模式：input 是全部输入（字符串），用 console.log 输出答案
// 输入格式：第一行 n；随后 n 行，每行为 "MinStack" / "push val" / "pop" / "top" / "getMin"
// 输出：top / getMin 输出返回值，MinStack / push / pop 输出 null
class MinStack {
  constructor() {
    
  }
  push(val) {
    
  }
  pop() {
    
  }
  top() {
    
  }
  getMin() {
    
  }
}

const lines = input.trim().split('\\n');
const n = Number(lines[0]);
let s = null;
for (let i = 1; i <= n; i++) {
  const parts = lines[i].trim().split(/\\s+/);
  const op = parts[0];
  // 在这里根据 op 分发操作并用 console.log 输出结果
}
`,
      python: `# ACM 模式：用 input() 或 sys.stdin 读输入，用 print 输出答案
# 输入格式：第一行 n；随后 n 行，每行为 "MinStack" / "push val" / "pop" / "top" / "getMin"
# 输出：top / getMin 输出返回值，MinStack / push / pop 输出 null
import sys

class MinStack:
    def __init__(self):
        pass

    def push(self, val):
        pass

    def pop(self):
        pass

    def top(self):
        pass

    def getMin(self):
        pass

lines = sys.stdin.read().split('\\n')
n = int(lines[0])
s = None
for i in range(1, n + 1):
    parts = lines[i].split()
    op = parts[0]
    # 在这里根据 op 分发操作并用 print 输出结果
`,
    },
  },

  solutions: {
    core: {
      javascript: `// 辅助栈：mins[i] 记录 stack[0..i] 的最小值，与主栈同步 push / pop
class MinStack {
  constructor() {
    this.stack = [];
    this.mins = [];
  }
  push(val) {
    this.stack.push(val);
    const cur = this.mins.length ? this.mins[this.mins.length - 1] : Infinity;
    this.mins.push(Math.min(cur, val));
  }
  pop() {
    this.stack.pop();
    this.mins.pop();
  }
  top() {
    return this.stack[this.stack.length - 1];
  }
  getMin() {
    return this.mins[this.mins.length - 1];
  }
}
`,
      python: `# 辅助栈：mins[i] 记录 stack[0..i] 的最小值，与主栈同步 push / pop
class MinStack:
    def __init__(self):
        self.stack = []
        self.mins = []

    def push(self, val):
        self.stack.append(val)
        cur = self.mins[-1] if self.mins else float('inf')
        self.mins.append(min(cur, val))

    def pop(self):
        self.stack.pop()
        self.mins.pop()

    def top(self):
        return self.stack[-1]

    def getMin(self):
        return self.mins[-1]
`,
    },
    acm: {
      javascript: `class MinStack {
  constructor() {
    this.stack = [];
    this.mins = [];
  }
  push(val) {
    this.stack.push(val);
    const cur = this.mins.length ? this.mins[this.mins.length - 1] : Infinity;
    this.mins.push(Math.min(cur, val));
  }
  pop() {
    this.stack.pop();
    this.mins.pop();
  }
  top() {
    return this.stack[this.stack.length - 1];
  }
  getMin() {
    return this.mins[this.mins.length - 1];
  }
}

const lines = input.trim().split('\\n');
const n = Number(lines[0]);
let s = null;
for (let i = 1; i <= n; i++) {
  const parts = lines[i].trim().split(/\\s+/);
  const op = parts[0];
  if (op === 'MinStack') {
    s = new MinStack();
    console.log('null');
  } else if (op === 'push') {
    s.push(Number(parts[1]));
    console.log('null');
  } else if (op === 'pop') {
    s.pop();
    console.log('null');
  } else if (op === 'top') {
    console.log(s.top());
  } else if (op === 'getMin') {
    console.log(s.getMin());
  }
}
`,
      python: `import sys

class MinStack:
    def __init__(self):
        self.stack = []
        self.mins = []

    def push(self, val):
        self.stack.append(val)
        cur = self.mins[-1] if self.mins else float('inf')
        self.mins.append(min(cur, val))

    def pop(self):
        self.stack.pop()
        self.mins.pop()

    def top(self):
        return self.stack[-1]

    def getMin(self):
        return self.mins[-1]

lines = sys.stdin.read().split('\\n')
n = int(lines[0])
s = None
for i in range(1, n + 1):
    parts = lines[i].split()
    op = parts[0]
    if op == 'MinStack':
        s = MinStack()
        print('null')
    elif op == 'push':
        s.push(int(parts[1]))
        print('null')
    elif op == 'pop':
        s.pop()
        print('null')
    elif op == 'top':
        print(s.top())
    elif op == 'getMin':
        print(s.getMin())
`,
    },
  },

  idea: `
普通栈的 \`push\` / \`pop\` / \`top\` 都是 O(1)，但如果 \`getMin\` 每次都遍历整个栈就是 O(n)，不满足题目「常数时间」的要求。

关键在于：**用一个辅助栈与主栈同步操作**。辅助栈 \`mins\` 与主栈等长，\`mins[i]\` 记录主栈前 \`i + 1\` 个元素中的最小值：

- \`push(val)\` 时，把 \`min(val, 当前最小值)\` 压入辅助栈
- \`pop()\` 时两个栈同步弹出
- \`getMin()\` 直接读辅助栈栈顶

为什么正确？因为 \`mins\` 栈顶只由「它之下的所有元素」决定，归纳可得它始终是当前栈的最小值。即使最小值重复出现，每个位置都独立记录了一份，弹出一个重复的最小值后，下面的最小值依然完好——这正好覆盖「重复最小值弹出后恢复」的场景。

所有操作都是 O(1)，空间复杂度 O(n)。
`,

  explanation: `
- 两个数组 \`stack\` 与 \`mins\` 始终保持等长：\`push\` 同时压入 \`val\` 和「新的当前最小值」，\`pop\` 同时弹出
- 计算新最小值时，若 \`mins\` 为空（第一次压栈），用 \`Infinity\`（JS）或 \`float('inf')\`（Python）作为「当前最小值」，这样第一个元素的最小值就是它自己
- \`getMin\` 返回 \`mins\` 栈顶，\`top\` 返回 \`stack\` 栈顶，两者互不影响
- 易错点一：\`pop\` 时忘记同步弹出辅助栈，会导致已经弹出的最小值「复活」
- 易错点二：「只在 val 更小才压辅助栈」的省空间写法必须处理相等的情况（相等也要压）；本解法每个位置都记录，天然避开这个坑

ACM 版本只是把判题器的调用换成自己解析操作序列并分发：\`push x\` 调用 push 并输出 \`null\`，\`top\` / \`getMin\` 输出对应返回值，无返回值的操作统一输出 \`null\`。
`,
};
