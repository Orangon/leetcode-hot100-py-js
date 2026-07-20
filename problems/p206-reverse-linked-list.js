// 206. 反转链表
// 链表题示例：argSpec 告诉判题器把数组参数构造成链表，resultKind 把返回的链表序列化成数组再比对
export default {
  id: 206,
  title: '反转链表',
  slug: 'reverse-linked-list',
  difficulty: 'easy',
  tags: ['链表', '递归'],
  hints: [
    '单链表的节点只能沿 next 向后访问，因此改写当前节点指向前驱前，必须先保存原来的后继节点，否则会丢失尚未处理的链表。',
    '使用迭代双指针：prev 表示已反转部分的头节点，cur 表示当前待处理节点，可在 O(n) 时间、O(1) 额外空间内完成反转。',
    '循环执行 next = cur.next、cur.next = prev、prev = cur、cur = next；当 cur 为 null 时，prev 就是反转后的新头节点。',
    '空链表和单节点链表无需特殊改写即可正确返回；ACM 模式中 n = 0 时第二行为空，并应输出一个空行。',
  ],

  description: `
给你单链表的头节点 \`head\`，请你反转链表，并返回反转后的链表头节点。

### 示例

- 输入：\`head = [1,2,3,4,5]\`，输出：\`[5,4,3,2,1]\`
- 输入：\`head = [1,2]\`，输出：\`[2,1]\`
- 输入：\`head = []\`，输出：\`[]\`

### 提示

- 链表中节点的数目范围是 \`[0, 5000]\`
- \`-5000 <= Node.val <= 5000\`

### ACM 模式输入输出格式

- 输入：第一行为整数 \`n\`（链表长度）；第二行为 \`n\` 个整数（空格分隔；\`n = 0\` 时该行为空行）
- 输出：反转后链表各节点的值（空格分隔；空链表输出一个空行）

ACM 输入示例：
\`\`\`
5
1 2 3 4 5
\`\`\`
输出：\`5 4 3 2 1\`
`,

  functionName: 'reverseList',
  compare: 'exact',
  argSpec: [{ kind: 'list' }],
  resultKind: 'list',

  tests: [
    { args: [[1, 2, 3, 4, 5]], expected: [5, 4, 3, 2, 1] },
    { args: [[1, 2]], expected: [2, 1] },
    { args: [[]], expected: [] },
    { args: [[42]], expected: [42] },
    { args: [[-3, 0, 7, -1]], expected: [-1, 7, 0, -3] },
    { args: [[5, 5, 5, 5]], expected: [5, 5, 5, 5] },
    { args: [[9, 7, 5, 3, 1]], expected: [1, 3, 5, 7, 9] },
    { args: [[5000, -5000, 0]], expected: [0, -5000, 5000] },
    { args: [[-3222, 4257, -248, 3419, -3676, 712, -4441, -633, 2701, -2913, -4595, 3481, -1392, 3943, -4840, -4905, -3684, -1177, -3850, -1118, 3776, -2413, 4886, 3334, -2719, 676, 1046, 1101, -4364, -1009, -3726, -900, 753, 2793, -1245, -4064, 4647, 1042, 3448, -114, -1455, -726, -327, -1404, 3506, -1489, 1490, 2604, -2391, -3839, 2698, 1266, -1530, 3080, 4387, -500, 3666, 3023, -3178, 3814, 3672, -2520, -2713, 3206, 4265, -4908, 187, -3979, -2952, 941, 2284, 2285, 3654, -288, 2861, -3345, -1678, -3028, 4825, -4356, 4473, -4657, -1543, 4799, 4070, 628, 4088, 2877, 4911, 3709, -2086, 2856, -1355, 2617, 713, -779, -3145, -443, 3785, 1732, -3583, -3329, 4791, -1732, 4878, -1713, 2471, 2805, -3713, 1396, 267, 3939, -154, 536, 3132, 634, 3760, 4652, -716, 2120]], expected: [2120, -716, 4652, 3760, 634, 3132, 536, -154, 3939, 267, 1396, -3713, 2805, 2471, -1713, 4878, -1732, 4791, -3329, -3583, 1732, 3785, -443, -3145, -779, 713, 2617, -1355, 2856, -2086, 3709, 4911, 2877, 4088, 628, 4070, 4799, -1543, -4657, 4473, -4356, 4825, -3028, -1678, -3345, 2861, -288, 3654, 2285, 2284, 941, -2952, -3979, 187, -4908, 4265, 3206, -2713, -2520, 3672, 3814, -3178, 3023, 3666, -500, 4387, 3080, -1530, 1266, 2698, -3839, -2391, 2604, 1490, -1489, 3506, -1404, -327, -726, -1455, -114, 3448, 1042, 4647, -4064, -1245, 2793, 753, -900, -3726, -1009, -4364, 1101, 1046, 676, -2719, 3334, 4886, -2413, 3776, -1118, -3850, -1177, -3684, -4905, -4840, 3943, -1392, 3481, -4595, -2913, 2701, -633, -4441, 712, -3676, 3419, -248, 4257, -3222] },
  ],

  acmTests: [
    { input: '5\n1 2 3 4 5\n', output: '5 4 3 2 1\n' },
    { input: '2\n1 2\n', output: '2 1\n' },
    { input: '0\n\n', output: '\n' },
    { input: '1\n42\n', output: '42\n' },
    { input: '4\n-3 0 7 -1\n', output: '-1 7 0 -3\n' },
    { input: '4\n5 5 5 5\n', output: '5 5 5 5\n' },
    { input: '5\n9 7 5 3 1\n', output: '1 3 5 7 9\n' },
    { input: '3\n5000 -5000 0\n', output: '0 -5000 5000\n' },
    { input: '120\n-3222 4257 -248 3419 -3676 712 -4441 -633 2701 -2913 -4595 3481 -1392 3943 -4840 -4905 -3684 -1177 -3850 -1118 3776 -2413 4886 3334 -2719 676 1046 1101 -4364 -1009 -3726 -900 753 2793 -1245 -4064 4647 1042 3448 -114 -1455 -726 -327 -1404 3506 -1489 1490 2604 -2391 -3839 2698 1266 -1530 3080 4387 -500 3666 3023 -3178 3814 3672 -2520 -2713 3206 4265 -4908 187 -3979 -2952 941 2284 2285 3654 -288 2861 -3345 -1678 -3028 4825 -4356 4473 -4657 -1543 4799 4070 628 4088 2877 4911 3709 -2086 2856 -1355 2617 713 -779 -3145 -443 3785 1732 -3583 -3329 4791 -1732 4878 -1713 2471 2805 -3713 1396 267 3939 -154 536 3132 634 3760 4652 -716 2120\n', output: '2120 -716 4652 3760 634 3132 536 -154 3939 267 1396 -3713 2805 2471 -1713 4878 -1732 4791 -3329 -3583 1732 3785 -443 -3145 -779 713 2617 -1355 2856 -2086 3709 4911 2877 4088 628 4070 4799 -1543 -4657 4473 -4356 4825 -3028 -1678 -3345 2861 -288 3654 2285 2284 941 -2952 -3979 187 -4908 4265 3206 -2713 -2520 3672 3814 -3178 3023 3666 -500 4387 3080 -1530 1266 2698 -3839 -2391 2604 1490 -1489 3506 -1404 -327 -726 -1455 -114 3448 1042 4647 -4064 -1245 2793 753 -900 -3726 -1009 -4364 1101 1046 676 -2719 3334 4886 -2413 3776 -1118 -3850 -1177 -3684 -4905 -4840 3943 -1392 3481 -4595 -2913 2701 -633 -4441 712 -3676 3419 -248 4257 -3222\n' },
  ],

  templates: {
    core: {
      javascript: `/**
 * 链表节点：{ val: number, next: ListNode | null }
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
    
};
`,
      python: `def reverseList(head):
    # head 为链表头节点（ListNode），返回反转后的头节点
    pass
`,
    },
    acm: {
      javascript: `// ACM 模式：input 是全部输入（字符串），用 console.log 输出答案
// 输入格式：第一行 n，第二行 n 个整数（n = 0 时为空行）
const lines = input.split('\\n');
const n = Number(lines[0]);
const vals = n > 0 ? lines[1].trim().split(/\\s+/).map(Number) : [];

// 构造链表（节点为 { val, next } 对象），完成反转后用 console.log 输出结果

`,
      python: `# ACM 模式：用 input() 或 sys.stdin 读输入，用 print 输出答案
# 输入格式：第一行 n，第二行 n 个整数（n = 0 时为空行）
import sys

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

lines = sys.stdin.read().split('\\n')
n = int(lines[0])
vals = list(map(int, lines[1].split())) if n > 0 else []

# 构造链表，完成反转后用 print 输出结果
`,
    },
  },

  solutions: {
    core: {
      javascript: `var reverseList = function(head) {
  let prev = null;
  let cur = head;
  while (cur !== null) {
    const next = cur.next; // 暂存后继
    cur.next = prev;       // 反转指针
    prev = cur;            // prev 前移
    cur = next;            // cur 前移
  }
  return prev;
};
`,
      python: `def reverseList(head):
    prev = None
    cur = head
    while cur is not None:
        nxt = cur.next  # 暂存后继
        cur.next = prev  # 反转指针
        prev = cur       # prev 前移
        cur = nxt        # cur 前移
    return prev
`,
    },
    acm: {
      javascript: `const lines = input.split('\\n');
const n = Number(lines[0]);
const vals = n > 0 ? lines[1].trim().split(/\\s+/).map(Number) : [];

// 构造链表
let head = null;
let tail = null;
for (const v of vals) {
  const node = { val: v, next: null };
  if (head === null) head = node;
  else tail.next = node;
  tail = node;
}

// 迭代反转
let prev = null;
let cur = head;
while (cur !== null) {
  const next = cur.next;
  cur.next = prev;
  prev = cur;
  cur = next;
}

// 输出反转后的链表
const out = [];
while (prev !== null) {
  out.push(prev.val);
  prev = prev.next;
}
console.log(out.join(' '));
`,
      python: `import sys

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

lines = sys.stdin.read().split('\\n')
n = int(lines[0])
vals = list(map(int, lines[1].split())) if n > 0 else []

# 构造链表
dummy = ListNode()
cur = dummy
for v in vals:
    cur.next = ListNode(v)
    cur = cur.next

# 迭代反转
prev = None
node = dummy.next
while node is not None:
    nxt = node.next
    node.next = prev
    prev = node
    node = nxt

# 输出反转后的链表
out = []
while prev is not None:
    out.append(str(prev.val))
    prev = prev.next
print(' '.join(out))
`,
    },
  },

  idea: `
**迭代法（双指针）**：用 \`prev\` 和 \`cur\` 两个指针遍历链表，每到一个节点就把它的 \`next\` 指向前一个节点 \`prev\`，然后两个指针一起前移。遍历结束后 \`prev\` 就是新的头节点。

**递归法**：假设除头节点外的子链表已经被反转，只需让 \`head.next.next = head\`、\`head.next = null\`，并返回子问题反转后的新头节点。递归的边界是空链表或单节点链表。

迭代法时间 O(n)、空间 O(1)；递归法时间 O(n)、空间 O(n)（递归栈）。
`,

  explanation: `
迭代版的关键是反转指针前先用临时变量 \`next\` / \`nxt\` 保存后继节点，否则链表会断掉：

- \`next = cur.next\`：暂存后继
- \`cur.next = prev\`：当前节点指向前驱，完成一步反转
- \`prev = cur\`、\`cur = next\`：两个指针整体前移
- 循环结束时 \`cur\` 为空、\`prev\` 指向原链表尾，即新头节点

ACM 版本多了两头的工作：先从输入构造链表（用 \`dummy\` / 尾指针简化插入），反转后再遍历新链表把值打印出来。核心反转逻辑与核心代码模式完全一致。
`,
};
