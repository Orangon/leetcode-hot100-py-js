// 295. 数据流的中位数
// 设计类题目：design + className，tests 用 ops/params 描述操作序列，逐步比对返回值
export default {
  id: 295,
  title: '数据流的中位数',
  slug: 'find-median-from-data-stream',
  difficulty: 'hard',
  tags: ['设计', '双指针', '数据流', '排序', '堆（优先队列）'],
  hints: [
    '中位数只由有序数据两半的边界决定，因此无需保存整体有序，只要能随时取得较小一半的最大值和较大一半的最小值。',
    '用大顶堆 small 存较小一半、小顶堆 large 存较大一半，并保持 large 的大小等于 small 或恰好多一。',
    '插入时先将新数压入一侧，再弹出该侧堆顶转移到另一侧以同时恢复顺序与大小不变式；偶数取两堆顶平均，奇数取 large 堆顶。',
    'findMedian 调用前保证已有元素；ACM 模式需逐行分发 n 个操作，构造和 addNum 输出 null，findMedian 输出数值结果。',
  ],
  design: true,
  className: 'MedianFinder',

  description: `
**中位数**是有序整数列表中的中间值。如果列表的大小是偶数，则没有中间值，中位数是两个中间值的平均值。

- 例如，\`[2, 3, 4]\` 的中位数是 \`3\`
- 例如，\`[2, 3]\` 的中位数是 \`(2 + 3) / 2 = 2.5\`

实现 \`MedianFinder\` 类：

- \`MedianFinder()\`：初始化 \`MedianFinder\` 对象
- \`addNum(num)\`：将数据流中的整数 \`num\` 添加到数据结构中
- \`findMedian()\`：返回到目前为止所有元素的中位数

### 示例

- 输入：\`MedianFinder()\`，依次执行 \`addNum(1)\`、\`addNum(2)\`、\`findMedian()\`、\`addNum(3)\`、\`findMedian()\`
- 输出：\`[null, null, null, 1.5, null, 2.0]\`
- 解释：添加 \`1\` 和 \`2\` 后中位数为 \`(1 + 2) / 2 = 1.5\`；再添加 \`3\` 后有序列表为 \`[1, 2, 3]\`，中位数为 \`2\`

### 提示

- \`-10^5 <= num <= 10^5\`
- 在调用 \`findMedian\` 之前，数据结构中至少有一个元素
- 最多 \`5 * 10^4\` 次调用 \`addNum\` 和 \`findMedian\`

### ACM 模式输入输出格式

- 输入：第一行为整数 \`n\`（操作总数）；随后 \`n\` 行，每行一个操作：\`MedianFinder\`、\`addNum num\` 或 \`findMedian\`
- 输出：每个操作一行结果——\`findMedian\` 输出中位数（整数或小数形式均可，判题有数值容差），\`MedianFinder\` / \`addNum\` 输出 \`null\`

ACM 输入示例：
\`\`\`
6
MedianFinder
addNum 1
addNum 2
findMedian
addNum 3
findMedian
\`\`\`
输出（每行一个）：
\`\`\`
null
null
null
1.5
null
2
\`\`\`
`,

  compare: 'exact',

  tests: [
    {
      ops: ['MedianFinder', 'addNum', 'addNum', 'findMedian', 'addNum', 'findMedian'],
      params: [[], [1], [2], [], [3], []],
      expected: [null, null, null, 1.5, null, 2],
    },
    {
      ops: ['MedianFinder', 'addNum', 'addNum', 'findMedian', 'addNum', 'findMedian', 'addNum', 'findMedian'],
      params: [[], [-1], [-2], [], [-3], [], [0], []],
      expected: [null, null, null, -1.5, null, -2, null, -1.5],
    },
    {
      ops: ['MedianFinder', 'addNum', 'findMedian', 'addNum', 'findMedian', 'addNum', 'findMedian'],
      params: [[], [5], [], [4], [], [3], []],
      expected: [null, null, 5, null, 4.5, null, 4],
    },
    {
      ops: ['MedianFinder', 'addNum', 'addNum', 'findMedian', 'addNum', 'findMedian', 'addNum', 'addNum', 'findMedian'],
      params: [[], [2], [2], [], [2], [], [1], [3], []],
      expected: [null, null, null, 2, null, 2, null, null, 2],
    },
    {
      ops: ['MedianFinder', 'addNum', 'findMedian', 'addNum', 'findMedian'],
      params: [[], [100000], [], [-100000], []],
      expected: [null, null, 100000, null, 0],
    },
    {
      ops: ['MedianFinder', 'addNum', 'findMedian', 'addNum', 'findMedian', 'addNum', 'findMedian', 'addNum', 'findMedian', 'addNum', 'findMedian', 'addNum', 'findMedian', 'addNum', 'findMedian', 'addNum', 'findMedian', 'addNum', 'findMedian', 'addNum', 'findMedian', 'addNum', 'findMedian', 'addNum', 'findMedian', 'addNum', 'findMedian', 'addNum', 'findMedian', 'addNum', 'findMedian', 'addNum', 'findMedian', 'addNum', 'findMedian', 'addNum', 'findMedian', 'addNum', 'findMedian', 'addNum', 'findMedian'],
      params: [[], [-9], [], [-31], [], [0], [], [33], [], [-44], [], [-41], [], [18], [], [-38], [], [-4], [], [24], [], [-43], [], [14], [], [-23], [], [-46], [], [-39], [], [5], [], [3], [], [-42], [], [-20], [], [-39], []],
      expected: [null, null, -9, null, -20, null, -9, null, -4.5, null, -9, null, -20, null, -9, null, -20, null, -9, null, -6.5, null, -9, null, -6.5, null, -9, null, -16, null, -23, null, -16, null, -9, null, -16, null, -20, null, -21.5],
    },
  ],

  acmTests: [
    {
      input: '6\nMedianFinder\naddNum 1\naddNum 2\nfindMedian\naddNum 3\nfindMedian\n',
      output: 'null\nnull\nnull\n1.5\nnull\n2\n',
    },
    {
      input: '8\nMedianFinder\naddNum -1\naddNum -2\nfindMedian\naddNum -3\nfindMedian\naddNum 0\nfindMedian\n',
      output: 'null\nnull\nnull\n-1.5\nnull\n-2\nnull\n-1.5\n',
    },
    {
      input: '7\nMedianFinder\naddNum 5\nfindMedian\naddNum 4\nfindMedian\naddNum 3\nfindMedian\n',
      output: 'null\nnull\n5\nnull\n4.5\nnull\n4\n',
    },
    {
      input: '9\nMedianFinder\naddNum 2\naddNum 2\nfindMedian\naddNum 2\nfindMedian\naddNum 1\naddNum 3\nfindMedian\n',
      output: 'null\nnull\nnull\n2\nnull\n2\nnull\nnull\n2\n',
    },
    {
      input: '5\nMedianFinder\naddNum 100000\nfindMedian\naddNum -100000\nfindMedian\n',
      output: 'null\nnull\n100000\nnull\n0\n',
    },
    {
      input: '41\nMedianFinder\naddNum -9\nfindMedian\naddNum -31\nfindMedian\naddNum 0\nfindMedian\naddNum 33\nfindMedian\naddNum -44\nfindMedian\naddNum -41\nfindMedian\naddNum 18\nfindMedian\naddNum -38\nfindMedian\naddNum -4\nfindMedian\naddNum 24\nfindMedian\naddNum -43\nfindMedian\naddNum 14\nfindMedian\naddNum -23\nfindMedian\naddNum -46\nfindMedian\naddNum -39\nfindMedian\naddNum 5\nfindMedian\naddNum 3\nfindMedian\naddNum -42\nfindMedian\naddNum -20\nfindMedian\naddNum -39\nfindMedian\n',
      output: 'null\nnull\n-9\nnull\n-20\nnull\n-9\nnull\n-4.5\nnull\n-9\nnull\n-20\nnull\n-9\nnull\n-20\nnull\n-9\nnull\n-6.5\nnull\n-9\nnull\n-6.5\nnull\n-9\nnull\n-16\nnull\n-23\nnull\n-16\nnull\n-9\nnull\n-16\nnull\n-20\nnull\n-21.5\n',
    },
  ],

  templates: {
    core: {
      javascript: `// 设计数据流中位数结构：addNum O(log n)，findMedian O(1)
class MedianFinder {
  constructor() {
    
  }
  addNum(num) {
    
  }
  findMedian() {
    
  }
}
`,
      python: `# 设计数据流中位数结构：addNum O(log n)，findMedian O(1)
class MedianFinder:
    def __init__(self):
        pass

    def addNum(self, num):
        pass

    def findMedian(self):
        pass
`,
    },
    acm: {
      javascript: `// ACM 模式：input 是全部输入（字符串），用 console.log 输出答案
// 输入格式：第一行 n；随后 n 行，每行为 "MedianFinder" / "addNum num" / "findMedian"
// 输出：findMedian 输出中位数，MedianFinder / addNum 输出 null
class MedianFinder {
  constructor() {
    
  }
  addNum(num) {
    
  }
  findMedian() {
    
  }
}

const lines = input.trim().split('\\n');
const n = Number(lines[0]);
let mf = null;
for (let i = 1; i <= n; i++) {
  const parts = lines[i].trim().split(/\\s+/);
  const op = parts[0];
  // 在这里根据 op 分发操作并用 console.log 输出结果
}
`,
      python: `# ACM 模式：用 input() 或 sys.stdin 读输入，用 print 输出答案
# 输入格式：第一行 n；随后 n 行，每行为 "MedianFinder" / "addNum num" / "findMedian"
# 输出：findMedian 输出中位数，MedianFinder / addNum 输出 null
import sys

class MedianFinder:
    def __init__(self):
        pass

    def addNum(self, num):
        pass

    def findMedian(self):
        pass

lines = sys.stdin.read().split('\\n')
n = int(lines[0])
mf = None
for i in range(1, n + 1):
    parts = lines[i].split()
    op = parts[0]
    # 在这里根据 op 分发操作并用 print 输出结果
`,
    },
  },

  solutions: {
    core: {
      javascript: `// 二叉堆工具：cmp(a, b) 为 true 表示 a 应排在 b 上方（更靠近堆顶）
function heapPush(heap, val, cmp) {
  heap.push(val);
  let i = heap.length - 1;
  while (i > 0) {
    const p = (i - 1) >> 1;
    if (!cmp(heap[i], heap[p])) break;
    const t = heap[i];
    heap[i] = heap[p];
    heap[p] = t;
    i = p;
  }
}
function heapPop(heap, cmp) {
  const top = heap[0];
  const last = heap.pop();
  if (heap.length > 0) {
    heap[0] = last;
    let i = 0;
    for (;;) {
      const l = i * 2 + 1;
      const r = l + 1;
      let best = i;
      if (l < heap.length && cmp(heap[l], heap[best])) best = l;
      if (r < heap.length && cmp(heap[r], heap[best])) best = r;
      if (best === i) break;
      const t = heap[i];
      heap[i] = heap[best];
      heap[best] = t;
      i = best;
    }
  }
  return top;
}

const maxFirst = (a, b) => a > b; // 大顶堆
const minFirst = (a, b) => a < b; // 小顶堆

// small 是大顶堆（存较小的一半），large 是小顶堆（存较大的一半）
class MedianFinder {
  constructor() {
    this.small = [];
    this.large = [];
  }
  addNum(num) {
    if (this.small.length === this.large.length) {
      // 新数「过一遍」small 再进 large，保证 large 多存一个
      heapPush(this.small, num, maxFirst);
      heapPush(this.large, heapPop(this.small, maxFirst), minFirst);
    } else {
      // 新数「过一遍」large 再进 small，恢复两堆等大
      heapPush(this.large, num, minFirst);
      heapPush(this.small, heapPop(this.large, minFirst), maxFirst);
    }
  }
  findMedian() {
    if (this.small.length === this.large.length) {
      return (this.small[0] + this.large[0]) / 2;
    }
    return this.large[0];
  }
}
`,
      python: `# heapq 只有小顶堆：small 用「存相反数」模拟大顶堆（存较小的一半），large 是小顶堆（存较大的一半）
import heapq

class MedianFinder:
    def __init__(self):
        self.small = []  # 大顶堆（存相反数）
        self.large = []  # 小顶堆

    def addNum(self, num):
        if len(self.small) == len(self.large):
            # 新数「过一遍」small 再进 large，保证 large 多存一个
            heapq.heappush(self.small, -num)
            heapq.heappush(self.large, -heapq.heappop(self.small))
        else:
            # 新数「过一遍」large 再进 small，恢复两堆等大
            heapq.heappush(self.large, num)
            heapq.heappush(self.small, -heapq.heappop(self.large))

    def findMedian(self):
        if len(self.small) == len(self.large):
            # small[0] 是相反数，取负才是较小一半的最大值
            return (self.large[0] - self.small[0]) / 2
        return float(self.large[0])
`,
    },
    acm: {
      javascript: `function heapPush(heap, val, cmp) {
  heap.push(val);
  let i = heap.length - 1;
  while (i > 0) {
    const p = (i - 1) >> 1;
    if (!cmp(heap[i], heap[p])) break;
    const t = heap[i];
    heap[i] = heap[p];
    heap[p] = t;
    i = p;
  }
}
function heapPop(heap, cmp) {
  const top = heap[0];
  const last = heap.pop();
  if (heap.length > 0) {
    heap[0] = last;
    let i = 0;
    for (;;) {
      const l = i * 2 + 1;
      const r = l + 1;
      let best = i;
      if (l < heap.length && cmp(heap[l], heap[best])) best = l;
      if (r < heap.length && cmp(heap[r], heap[best])) best = r;
      if (best === i) break;
      const t = heap[i];
      heap[i] = heap[best];
      heap[best] = t;
      i = best;
    }
  }
  return top;
}

const maxFirst = (a, b) => a > b;
const minFirst = (a, b) => a < b;

class MedianFinder {
  constructor() {
    this.small = [];
    this.large = [];
  }
  addNum(num) {
    if (this.small.length === this.large.length) {
      heapPush(this.small, num, maxFirst);
      heapPush(this.large, heapPop(this.small, maxFirst), minFirst);
    } else {
      heapPush(this.large, num, minFirst);
      heapPush(this.small, heapPop(this.large, minFirst), maxFirst);
    }
  }
  findMedian() {
    if (this.small.length === this.large.length) {
      return (this.small[0] + this.large[0]) / 2;
    }
    return this.large[0];
  }
}

const lines = input.trim().split('\\n');
const n = Number(lines[0]);
let mf = null;
for (let i = 1; i <= n; i++) {
  const parts = lines[i].trim().split(/\\s+/);
  const op = parts[0];
  if (op === 'MedianFinder') {
    mf = new MedianFinder();
    console.log('null');
  } else if (op === 'addNum') {
    mf.addNum(Number(parts[1]));
    console.log('null');
  } else if (op === 'findMedian') {
    console.log(mf.findMedian());
  }
}
`,
      python: `import sys
import heapq

class MedianFinder:
    def __init__(self):
        self.small = []  # 大顶堆（存相反数）
        self.large = []  # 小顶堆

    def addNum(self, num):
        if len(self.small) == len(self.large):
            heapq.heappush(self.small, -num)
            heapq.heappush(self.large, -heapq.heappop(self.small))
        else:
            heapq.heappush(self.large, num)
            heapq.heappush(self.small, -heapq.heappop(self.large))

    def findMedian(self):
        if len(self.small) == len(self.large):
            return (self.large[0] - self.small[0]) / 2
        return float(self.large[0])

lines = sys.stdin.read().split('\\n')
n = int(lines[0])
mf = None
for i in range(1, n + 1):
    parts = lines[i].split()
    op = parts[0]
    if op == 'MedianFinder':
        mf = MedianFinder()
        print('null')
    elif op == 'addNum':
        mf.addNum(int(parts[1]))
        print('null')
    elif op == 'findMedian':
        print(mf.findMedian())
`,
    },
  },

  idea: `
暴力做法是每次 \`addNum\` 都把新数插入有序数组（O(n)），\`findMedian\` 直接取中间（O(1)）；但数据流很长时总代价是 O(n²)，无法接受。

更优的做法是用**两个堆**把数据动态地划分成两半：

- 大顶堆 \`small\` 保存较小的一半，堆顶是这一半的最大值
- 小顶堆 \`large\` 保存较大的一半，堆顶是这一半的最小值
- 始终保持「\`small\` 的所有元素不大于 \`large\` 的所有元素」，且两堆大小差不超过 1（约定元素总数为奇数时 \`large\` 多存一个）

这样中位数只取决于堆顶：元素个数为偶数时是两堆顶的平均值，为奇数时就是 \`large\` 的堆顶。

\`addNum\` 时先把新数 push 进其中一个堆，再把该堆堆顶 pop 出来 push 进另一个堆。借助堆的自动筛选，这一步既保证了「两半有序」又维持了「大小平衡」。\`addNum\` 为 O(log n)，\`findMedian\` 为 O(1)，总空间 O(n)。
`,

  explanation: `
- 不变式：\`small\` 堆顶（较小一半的最大值）不超过 \`large\` 堆顶（较大一半的最小值），且 \`large\` 的大小等于 \`small\` 或恰好多 1
- \`addNum\` 分两种情况：两堆等大时，新数「过一遍」\`small\` 再进 \`large\`（\`large\` 因此多一个）；否则新数「过一遍」\`large\` 再进 \`small\`（恢复等大）。「过一遍」指先 push 再 pop 堆顶，利用堆的筛选把两半的分界线调整到正确位置
- \`findMedian\`：偶数个元素取两堆顶的平均值，奇数个元素取 \`large\` 堆顶
- Python 的 \`heapq\` 只有小顶堆，大顶堆通过**存相反数**实现：堆顶是最小的负数，取负后就是这一半的最大值，所以偶数情况的公式写成 \`(large[0] - small[0]) / 2\`
- JS 没有内置堆，参考代码手写了 \`heapPush\` / \`heapPop\` 两个二叉堆工具，用比较函数 \`maxFirst\` / \`minFirst\` 区分大顶堆与小顶堆
- 易错点：两个分支的方向不能写反——写反后两半不再有序，中位数会取到错误的堆顶；判断大小时也要想清楚奇数情况下「多出来的一个」放在哪个堆

ACM 版本把 \`findMedian\` 的结果直接打印即可，判题有数值容差（如 \`2\` 与 \`2.0\` 视为相等）。
`,
};
