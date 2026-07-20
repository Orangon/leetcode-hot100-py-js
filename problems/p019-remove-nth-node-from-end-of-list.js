// 19. 删除链表的倒数第 N 个结点
// 普通链表题：argSpec 把数组构造成链表，resultKind 'list' 把返回的链表序列化成数组比对
export default {
  id: 19,
  title: '删除链表的倒数第 N 个结点',
  slug: 'remove-nth-node-from-end-of-list',
  difficulty: 'medium',
  tags: ['链表', '双指针'],
  hints: [
    '删除倒数第 n 个节点等价于找到它的前驱，而哑节点能让删除原头节点也拥有统一的前驱。',
    '让 fast 和 slow 都从 dummy 出发，fast 先走 n 步，再同步前进以保持固定距离。',
    '当 fast.next 为空时 slow 正好位于待删节点前一位，执行 slow.next=slow.next.next，最后返回 dummy.next。',
    '同步循环不能写成 fast 非空，否则 slow 会多走一步；ACM 删除唯一节点后应输出一个空行。',
  ],

  description: `
给你一个链表，删除链表的倒数第 \`n\` 个结点，并且返回链表的头结点。

### 示例

- 输入：\`head = [1,2,3,4,5], n = 2\`，输出：\`[1,2,3,5]\`
- 输入：\`head = [1], n = 1\`，输出：\`[]\`
- 输入：\`head = [1,2], n = 1\`，输出：\`[1]\`

### 提示

- 链表中结点的数目为 \`sz\`，\`1 <= sz <= 30\`
- \`0 <= Node.val <= 100\`
- \`1 <= n <= sz\`（\`n\` 等于链表长度时删除的是头结点）

### ACM 模式输入输出格式

- 输入：第一行为整数 \`len\`（链表长度）；第二行为 \`len\` 个整数（空格分隔）；第三行为 \`n\`
- 输出：删除后链表各节点的值（空格分隔；空链表输出一个空行）

ACM 输入示例：
\`\`\`
5
1 2 3 4 5
2
\`\`\`
输出：\`1 2 3 5\`
`,

  functionName: 'removeNthFromEnd',
  compare: 'exact',
  argSpec: [{ kind: 'list' }, { kind: 'plain' }],
  resultKind: 'list',

  tests: [
    { args: [[1, 2, 3, 4, 5], 2], expected: [1, 2, 3, 5] },
    { args: [[1], 1], expected: [] },
    { args: [[1, 2], 1], expected: [1] },
    { args: [[1, 2], 2], expected: [2] },
    { args: [[1, 2, 3], 3], expected: [2, 3] },
    { args: [[1, 1, 2, 2], 2], expected: [1, 1, 2] },
    { args: [[0, 1, 0], 3], expected: [1, 0] },
    { args: [[7, 7, 7, 7], 2], expected: [7, 7, 7] },
    { args: [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 1], expected: [1, 2, 3, 4, 5, 6, 7, 8, 9] },
    {
      args: [
        [
          98, 71, 45, 3, 33, 2, 75, 24, 58, 79, 33, 57, 63, 29, 5, 56, 86, 20, 100, 41, 28, 48,
          51, 57, 18, 14, 30, 83, 99, 65
        ],
        13
      ],
      expected: [
        98, 71, 45, 3, 33, 2, 75, 24, 58, 79, 33, 57, 63, 29, 5, 56, 86, 100, 41, 28, 48, 51,
        57, 18, 14, 30, 83, 99, 65
      ],
    },
  ],

  acmTests: [
    { input: '5\n1 2 3 4 5\n2\n', output: '1 2 3 5\n' },
    { input: '1\n1\n1\n', output: '\n' },
    { input: '2\n1 2\n1\n', output: '1\n' },
    { input: '2\n1 2\n2\n', output: '2\n' },
    { input: '3\n1 2 3\n3\n', output: '2 3\n' },
    { input: '4\n1 1 2 2\n2\n', output: '1 1 2\n' },
    { input: '3\n0 1 0\n3\n', output: '1 0\n' },
    { input: '4\n7 7 7 7\n2\n', output: '7 7 7\n' },
    { input: '10\n1 2 3 4 5 6 7 8 9 10\n1\n', output: '1 2 3 4 5 6 7 8 9\n' },
    { input: '30\n98 71 45 3 33 2 75 24 58 79 33 57 63 29 5 56 86 20 100 41 28 48 51 57 18 14 30 83 99 65\n13\n', output: '98 71 45 3 33 2 75 24 58 79 33 57 63 29 5 56 86 100 41 28 48 51 57 18 14 30 83 99 65\n' },
  ],

  templates: {
    core: {
      javascript: `/**
 * 链表节点：{ val: number, next: ListNode | null }
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function(head, n) {
    
};
`,
      python: `def removeNthFromEnd(head, n):
    # head 为链表头节点（ListNode），返回删除后的头节点
    pass
`,
    },
    acm: {
      javascript: `// ACM 模式：input 是全部输入（字符串），用 console.log 输出答案
// 输入格式：第一行 len，第二行 len 个整数，第三行 n
// 输出：删除后链表各节点的值（空格分隔；空链表输出一个空行）
const lines = input.split('\\n');
const len = Number(lines[0]);
const vals = len > 0 ? lines[1].trim().split(/\\s+/).map(Number) : [];
const n = Number(lines[2]);

// 构造链表（节点为 { val, next } 对象），删除倒数第 n 个节点后用 console.log 输出结果

`,
      python: `# ACM 模式：用 input() 或 sys.stdin 读输入，用 print 输出答案
# 输入格式：第一行 len，第二行 len 个整数，第三行 n
# 输出：删除后链表各节点的值（空格分隔；空链表输出一个空行）
import sys

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

lines = sys.stdin.read().split('\\n')
length = int(lines[0])
vals = list(map(int, lines[1].split())) if length > 0 else []
n = int(lines[2])

# 构造链表，删除倒数第 n 个节点后用 print 输出结果
`,
    },
  },

  solutions: {
    core: {
      javascript: `var removeNthFromEnd = function(head, n) {
  const dummy = { val: 0, next: head }; // 哨兵：统一处理删除头节点的情况
  let fast = dummy;
  let slow = dummy;
  for (let i = 0; i < n; i++) fast = fast.next; // 拉开 n 步间距
  while (fast.next !== null) { // fast 到尾时，slow 正好在待删节点的前驱
    fast = fast.next;
    slow = slow.next;
  }
  slow.next = slow.next.next;
  return dummy.next;
};
`,
      python: `def removeNthFromEnd(head, n):
    # 判题环境不提供 ListNode 类，哨兵节点自行定义
    class ListNode:
        def __init__(self, val=0, next=None):
            self.val = val
            self.next = next

    dummy = ListNode(0, head)  # 哨兵：统一处理删除头节点的情况
    fast = slow = dummy
    for _ in range(n):
        fast = fast.next  # 拉开 n 步间距
    while fast.next is not None:  # fast 到尾时，slow 正好在待删节点的前驱
        fast = fast.next
        slow = slow.next
    slow.next = slow.next.next
    return dummy.next
`,
    },
    acm: {
      javascript: `const lines = input.split('\\n');
const len = Number(lines[0]);
const vals = len > 0 ? lines[1].trim().split(/\\s+/).map(Number) : [];
const n = Number(lines[2]);

// 构造链表
const dummy = { val: 0, next: null };
let cur = dummy;
for (const v of vals) {
  cur.next = { val: v, next: null };
  cur = cur.next;
}

// 双指针：fast 先走 n 步，再与 slow 同步走到 fast 为尾节点
let fast = dummy;
let slow = dummy;
for (let i = 0; i < n; i++) fast = fast.next;
while (fast.next !== null) {
  fast = fast.next;
  slow = slow.next;
}
slow.next = slow.next.next;

// 输出删除后的链表
const out = [];
let node = dummy.next;
while (node !== null) {
  out.push(node.val);
  node = node.next;
}
console.log(out.join(' '));
`,
      python: `import sys

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

lines = sys.stdin.read().split('\\n')
length = int(lines[0])
vals = list(map(int, lines[1].split())) if length > 0 else []
n = int(lines[2])

# 构造链表
dummy = ListNode()
cur = dummy
for v in vals:
    cur.next = ListNode(v)
    cur = cur.next

# 双指针：fast 先走 n 步，再与 slow 同步走到 fast 为尾节点
fast = slow = dummy
for _ in range(n):
    fast = fast.next
while fast.next is not None:
    fast = fast.next
    slow = slow.next
slow.next = slow.next.next

# 输出删除后的链表
out = []
node = dummy.next
while node is not None:
    out.append(str(node.val))
    node = node.next
print(' '.join(out))
`,
    },
  },

  idea: `
要删除倒数第 \`n\` 个节点，关键是找到它的**前驱**（倒数第 \`n + 1\` 个节点）。

**两次遍历**：先遍历一遍得到链表长度 \`L\`，再走到第 \`L - n\` 个节点删除其后继。

**一次遍历（双指针，参考解法）**：

- 设哨兵节点 \`dummy\` 指向 \`head\`，\`fast\`、\`slow\` 都从 \`dummy\` 出发
- \`fast\` 先走 \`n\` 步，与 \`slow\` 拉开 \`n\` 步间距
- 然后二者同步前进，当 \`fast\` 到达最后一个节点（\`fast.next\` 为 null）时，\`slow\` 正好停在倒数第 \`n + 1\` 个节点上
- 执行 \`slow.next = slow.next.next\` 即完成删除

用 \`dummy\` 哨兵可以让「删除头节点（\`n\` 等于链表长度）」的情况无需特判。时间复杂度 O(L)，空间复杂度 O(1)。
`,

  explanation: `
- \`dummy = { val: 0, next: head }\` / \`ListNode(0, head)\`：哨兵节点，使被删节点是头节点时也有统一的前驱
- \`fast\` 先走 \`n\` 步：此时 \`fast\` 与 \`slow\` 之间隔了 \`n\` 步
- 同步前进直到 \`fast.next === null\`：\`fast\` 停在尾节点，\`slow\` 停在待删节点的前驱
- \`slow.next = slow.next.next\`：跳过倒数第 \`n\` 个节点，返回 \`dummy.next\` 作为新头节点
- 为什么 \`n\` 等于链表长度时也对：\`fast\` 先走 \`n\` 步后正好停在尾节点，同步循环一次都不执行，\`slow\` 仍在 \`dummy\`，删除的正是原头节点
- 易错点：同步循环的条件是 \`fast.next !== null\`（\`fast\` 停在最后一个节点），不是 \`fast !== null\`——那样 \`slow\` 会多走一步停在待删节点上，拿不到前驱

ACM 版本多了按格式构造链表、删除后遍历打印的部分；删除后为空链表时直接打印空字符串，就是一个空行。核心双指针逻辑完全一致。
`,
};
