// 23. 合并 K 个升序链表
// listArray 类型示例：argSpec 把二维数组构造为链表数组
export default {
  id: 23,
  title: '合并 K 个升序链表',
  slug: 'merge-k-sorted-lists',
  difficulty: 'hard',
  tags: ['链表', '分治', '堆（优先队列）', '归并排序'],
  hints: [
    '若节点总数为 N，逐个扫描 k 个链表头会达到 O(Nk)；需要让每个节点只参与约 log k 次比较。',
    '采用分治两两归并：每轮把链表数量约减半，复用合并两个升序链表的线性过程。',
    '先过滤空链表；按相邻两条调用 mergeTwo，落单链表直接进入下一轮，直到只剩一条或集合为空。',
    'k 可为 0，链表也可为空，最终应返回 null；ACM 每条输入行首是长度且空结果必须输出一个空行。',
  ],

  description: `
给你一个链表数组，每个链表都已经按升序排列。请你将所有链表合并到一个升序链表中，返回合并后的链表。

### 示例

- 输入：\`lists = [[1,4,5],[1,3,4],[2,6]]\`，输出：\`[1,1,2,3,4,4,5,6]\`
- 输入：\`lists = []\`，输出：\`[]\`
- 输入：\`lists = [[]]\`，输出：\`[]\`

### 提示

- \`k == lists.length\`，\`0 <= k <= 10^4\`
- 每个链表长度范围 \`[0, 500]\`，所有节点值总和不超过 \`10^4\`
- \`-10^4 <= Node.val <= 10^4\`

### ACM 模式输入输出格式

- 输入：第一行为整数 \`k\`（链表个数）；随后 \`k\` 行，每行第一个整数 \`n\` 表示该链表长度，后跟 \`n\` 个整数（\`n = 0\` 时该行只有 \`0\`）
- 输出：合并后链表各节点的值（空格分隔；空链表输出一个空行）

ACM 输入示例：
\`\`\`
3
3 1 4 5
3 1 3 4
2 2 6
\`\`\`
输出：\`1 1 2 3 4 4 5 6\`
`,

  functionName: 'mergeKLists',
  compare: 'exact',
  argSpec: [{ kind: 'listArray' }],
  resultKind: 'list',

  tests: [
    { args: [[[1, 4, 5], [1, 3, 4], [2, 6]]], expected: [1, 1, 2, 3, 4, 4, 5, 6] },
    { args: [[]], expected: [] },
    { args: [[[]]], expected: [] },
    { args: [[[1], [2], [3], [4], [5]]], expected: [1, 2, 3, 4, 5] },
    { args: [[[-2, -1, 0], [-3, 1], []]], expected: [-3, -2, -1, 0, 1] },
    { args: [[[1, 2, 3]]], expected: [1, 2, 3] },
    { args: [[[], [], []]], expected: [] },
    { args: [[[1, 1], [1, 1], [1, 1]]], expected: [1, 1, 1, 1, 1, 1] },
    { args: [[[5, 6], [3, 4], [1, 2]]], expected: [1, 2, 3, 4, 5, 6] },
    {
      args: [
        [
          [-44, -40, -38, -34, -17, -1, 21, 27, 32, 35, 43, 49],
          [],
          [-49, -39, -21, -13, -11, -7, 50],
          [-47, -38, -36, -25, -8, 7, 11, 11, 15, 19, 22, 38, 43, 46, 46],
          [-15, 9, 37],
          [-39, -38, -30, -20, -2, 10, 20, 21, 23]
        ]
      ],
      expected: [
        -49, -47, -44, -40, -39, -39, -38, -38, -38, -36, -34, -30, -25, -21, -20, -17, -15,
        -13, -11, -8, -7, -2, -1, 7, 9, 10, 11, 11, 15, 19, 20, 21, 21, 22, 23, 27, 32, 35, 37,
        38, 43, 43, 46, 46, 49, 50
      ],
    },
  ],

  acmTests: [
    { input: '3\n3 1 4 5\n3 1 3 4\n2 2 6\n', output: '1 1 2 3 4 4 5 6\n' },
    { input: '0\n', output: '\n' },
    { input: '1\n0\n', output: '\n' },
    { input: '5\n1 1\n1 2\n1 3\n1 4\n1 5\n', output: '1 2 3 4 5\n' },
    { input: '3\n3 -2 -1 0\n2 -3 1\n0\n', output: '-3 -2 -1 0 1\n' },
    { input: '1\n3 1 2 3\n', output: '1 2 3\n' },
    { input: '3\n0\n0\n0\n', output: '\n' },
    { input: '3\n2 1 1\n2 1 1\n2 1 1\n', output: '1 1 1 1 1 1\n' },
    { input: '3\n2 5 6\n2 3 4\n2 1 2\n', output: '1 2 3 4 5 6\n' },
    { input: '6\n12 -44 -40 -38 -34 -17 -1 21 27 32 35 43 49\n0\n7 -49 -39 -21 -13 -11 -7 50\n15 -47 -38 -36 -25 -8 7 11 11 15 19 22 38 43 46 46\n3 -15 9 37\n9 -39 -38 -30 -20 -2 10 20 21 23\n', output: '-49 -47 -44 -40 -39 -39 -38 -38 -38 -36 -34 -30 -25 -21 -20 -17 -15 -13 -11 -8 -7 -2 -1 7 9 10 11 11 15 19 20 21 21 22 23 27 32 35 37 38 43 43 46 46 49 50\n' },
  ],

  templates: {
    core: {
      javascript: `/**
 * 链表节点：{ val: number, next: ListNode | null }
 * @param {ListNode[]} lists 链表数组（元素可能为 null）
 * @return {ListNode}
 */
var mergeKLists = function(lists) {
    
};
`,
      python: `def mergeKLists(lists):
    # lists 为链表头节点组成的列表（元素可能为 None），返回合并后的头节点
    pass
`,
    },
    acm: {
      javascript: `// ACM 模式：input 是全部输入（字符串），用 console.log 输出答案
// 输入格式：第一行 k；随后 k 行，每行为 "n v1 v2 ... vn"（n = 0 时只有 0）
const lines = input.trim().split('\\n');
const k = Number(lines[0]);

// 解析出 k 个链表的值数组，构造链表（节点为 { val, next } 对象），合并后用 console.log 输出结果

`,
      python: `# ACM 模式：用 input() 或 sys.stdin 读输入，用 print 输出答案
# 输入格式：第一行 k；随后 k 行，每行为 "n v1 v2 ... vn"（n = 0 时只有 0）
import sys

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

lines = sys.stdin.read().split('\\n')
k = int(lines[0])

# 解析出 k 个链表的值数组，构造链表，合并后用 print 输出结果
`,
    },
  },

  solutions: {
    core: {
      javascript: `var mergeKLists = function(lists) {
  // 两两合并（分治）：每轮把链表两两配对合并，轮数约为 log k
  const mergeTwo = function(l1, l2) {
    const dummy = { val: 0, next: null };
    let cur = dummy;
    while (l1 !== null && l2 !== null) {
      if (l1.val <= l2.val) {
        cur.next = l1;
        l1 = l1.next;
      } else {
        cur.next = l2;
        l2 = l2.next;
      }
      cur = cur.next;
    }
    cur.next = l1 !== null ? l1 : l2;
    return dummy.next;
  };

  let arr = lists.filter((h) => h !== null);
  if (arr.length === 0) return null;
  while (arr.length > 1) {
    const next = [];
    for (let i = 0; i < arr.length; i += 2) {
      next.push(i + 1 < arr.length ? mergeTwo(arr[i], arr[i + 1]) : arr[i]);
    }
    arr = next;
  }
  return arr[0];
};
`,
      python: `def mergeKLists(lists):
    # 判题环境不提供 ListNode 类，需要新建节点时自行定义（判题只读 val/next 属性）
    class ListNode:
        def __init__(self, val=0, next=None):
            self.val = val
            self.next = next

    def merge_two(l1, l2):
        dummy = ListNode()
        cur = dummy
        while l1 is not None and l2 is not None:
            if l1.val <= l2.val:
                cur.next = l1
                l1 = l1.next
            else:
                cur.next = l2
                l2 = l2.next
            cur = cur.next
        cur.next = l1 if l1 is not None else l2
        return dummy.next

    # 两两合并（分治）：每轮把链表两两配对合并，轮数约为 log k
    arr = [h for h in lists if h is not None]
    if not arr:
        return None
    while len(arr) > 1:
        nxt = []
        for i in range(0, len(arr), 2):
            nxt.append(merge_two(arr[i], arr[i + 1]) if i + 1 < len(arr) else arr[i])
        arr = nxt
    return arr[0]
`,
    },
    acm: {
      javascript: `const lines = input.trim().split('\\n');
const k = Number(lines[0]);

// 解析 k 个链表并构造（节点为 { val, next }）
const buildList = (vals) => {
  let head = null;
  let tail = null;
  for (const v of vals) {
    const node = { val: v, next: null };
    if (head === null) head = node;
    else tail.next = node;
    tail = node;
  }
  return head;
};
const lists = [];
for (let i = 1; i <= k; i++) {
  const parts = lines[i].trim().split(/\\s+/).map(Number);
  lists.push(buildList(parts.slice(1)));
}

const mergeTwo = function(l1, l2) {
  const dummy = { val: 0, next: null };
  let cur = dummy;
  while (l1 !== null && l2 !== null) {
    if (l1.val <= l2.val) {
      cur.next = l1;
      l1 = l1.next;
    } else {
      cur.next = l2;
      l2 = l2.next;
    }
    cur = cur.next;
  }
  cur.next = l1 !== null ? l1 : l2;
  return dummy.next;
};

let arr = lists.filter((h) => h !== null);
while (arr.length > 1) {
  const next = [];
  for (let i = 0; i < arr.length; i += 2) {
    next.push(i + 1 < arr.length ? mergeTwo(arr[i], arr[i + 1]) : arr[i]);
  }
  arr = next;
}

const out = [];
let cur = arr.length ? arr[0] : null;
while (cur !== null) {
  out.push(cur.val);
  cur = cur.next;
}
console.log(out.join(' '));
`,
      python: `import sys

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

lines = sys.stdin.read().split('\\n')
k = int(lines[0])

# 解析 k 个链表并构造
lists = []
for i in range(1, k + 1):
    parts = list(map(int, lines[i].split()))
    dummy = ListNode()
    cur = dummy
    for v in parts[1:]:
        cur.next = ListNode(v)
        cur = cur.next
    lists.append(dummy.next)

def merge_two(l1, l2):
    dummy = ListNode()
    cur = dummy
    while l1 is not None and l2 is not None:
        if l1.val <= l2.val:
            cur.next = l1
            l1 = l1.next
        else:
            cur.next = l2
            l2 = l2.next
        cur = cur.next
    cur.next = l1 if l1 is not None else l2
    return dummy.next

arr = [h for h in lists if h is not None]
while len(arr) > 1:
    nxt = []
    for i in range(0, len(arr), 2):
        nxt.append(merge_two(arr[i], arr[i + 1]) if i + 1 < len(arr) else arr[i])
    arr = nxt

out = []
cur = arr[0] if arr else None
while cur is not None:
    out.append(str(cur.val))
    cur = cur.next
print(' '.join(out))
`,
    },
  },

  idea: `
基础做法是每一轮都遍历 k 个链表的头节点、找出最小值接到结果上，时间复杂度 O(N·k)（N 为节点总数）。

**分治两两合并**：我们已经会合并两个有序链表（第 21 题）。把 k 个链表两两配对合并，一轮后剩 k/2 个，再两两合并……约 log k 轮后只剩一个。每个节点每轮参与一次合并，总时间复杂度 O(N·log k)。

**最小堆**：把 k 个头节点放进最小堆，每次弹出最小节点接到结果上，并把它的后继入堆。时间复杂度同样是 O(N·log k)，Python 可用 heapq，JS 需要自己实现堆。
`,

  explanation: `
- \`merge_two\` / \`mergeTwo\` 就是第 21 题的解法：用 \`dummy\` 哨兵节点简化头节点处理，两条链表谁小接谁，最后把剩余部分直接挂上
- 主流程先把空链表过滤掉，然后进入「两两配对」循环：第 \`i\` 个与第 \`i+1\` 个合并，落单的原样进入下一轮
- 每轮过后链表数量减半，\`log k\` 轮后只剩一个，即为答案
- 合并只是调整 \`next\` 指针、复用原节点，不需要新建节点
- ACM 版本额外做两件事：按格式解析出 k 个值数组并构造链表；合并完成后遍历结果链表打印
`,
};
