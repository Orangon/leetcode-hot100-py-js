// 2. 两数相加
// 链表题：argSpec 把两个数组参数构造成链表，resultKind 把返回的链表序列化成数组再比对
export default {
  id: 2,
  title: '两数相加',
  slug: 'add-two-numbers',
  difficulty: 'medium',
  tags: ['链表', '数学'],
  hints: [
    '链表从个位到高位逆序存储，因此从两个头节点同步前进，恰好符合竖式加法的进位方向。',
    '用哑节点构造结果链表，并维护 carry；短链表耗尽后的当前位按 0 参与计算。',
    '循环条件写成 l1 或 l2 未空或 carry 非零；每轮令 sum=x+y+carry，追加 sum%10，再更新 carry=floor(sum/10)。',
    '最高位仍可能产生新节点，不能在两链表同时结束时立即停止；ACM 输入的节点值本身已是逆序，输出也保持该顺序。',
  ],

  description: `
给你两个**非空**的链表，表示两个非负的整数。它们每位数字都是按照**逆序**的方式存储的（链表的表头存的是数字的个位），并且每个节点只能存储**一位**数字。

例如链表 \`[2,4,3]\` 表示数字 \`342\`（个位 2、十位 4、百位 3）。

请你将两个数相加，并以相同形式返回一个表示和的链表。

你可以假设除了数字 \`0\` 之外，这两个数都不会以 \`0\` 开头。

### 示例

- 输入：\`l1 = [2,4,3], l2 = [5,6,4]\`，输出：\`[7,0,8]\`（因为 342 + 465 = 807）
- 输入：\`l1 = [0], l2 = [0]\`，输出：\`[0]\`
- 输入：\`l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]\`，输出：\`[8,9,9,9,0,0,0,1]\`（9999999 + 9999 = 10009998）

### 提示

- 每个链表中的节点数在范围 \`[1, 100]\` 内
- \`0 <= Node.val <= 9\`
- 题目数据保证列表表示的数字不含前导零

### ACM 模式输入输出格式

- 输入：第一行为整数 \`n\`（第一条链表长度）；第二行为 \`n\` 个整数（空格分隔）；第三行为整数 \`m\`（第二条链表长度）；第四行为 \`m\` 个整数（空格分隔）
- 输出：相加结果链表各节点的值（空格分隔）

ACM 输入示例：
\`\`\`
3
2 4 3
3
5 6 4
\`\`\`
输出：\`7 0 8\`
`,

  functionName: 'addTwoNumbers',
  compare: 'exact',
  argSpec: [{ kind: 'list' }, { kind: 'list' }],
  resultKind: 'list',

  tests: [
    { args: [[2, 4, 3], [5, 6, 4]], expected: [7, 0, 8] },
    { args: [[0], [0]], expected: [0] },
    { args: [[9, 9, 9, 9, 9, 9, 9], [9, 9, 9, 9]], expected: [8, 9, 9, 9, 0, 0, 0, 1] },
    { args: [[1, 8], [0]], expected: [1, 8] },
    { args: [[5], [5]], expected: [0, 1] },
    { args: [[1, 2, 3], [4, 5]], expected: [5, 7, 3] },
    { args: [[9, 9], [1]], expected: [0, 0, 1] },
    { args: [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [8, 8, 8, 8, 8, 8, 8, 8, 8, 8]], expected: [9, 9, 9, 9, 9, 9, 9, 9, 9, 9] },
    { args: [[6, 4, 8, 6, 1, 5, 2, 6, 8, 4, 2, 8, 7, 3, 1, 5, 6, 6, 0, 4, 8, 0, 5, 0, 2, 0, 1, 7, 5, 0, 1, 8, 4, 8, 3, 4, 0, 0, 5, 5, 2, 6, 2, 3, 7, 8, 5, 2, 2, 2, 0, 6, 6, 6, 9, 0, 9, 4, 9, 1, 1, 0, 3, 4, 6, 8, 0, 7, 9, 2, 7, 1, 5, 8, 1, 9, 5, 9, 4, 5, 3, 5, 3, 7, 2, 4, 8, 6, 9, 8, 4, 5, 2, 1, 6, 3, 7, 9, 0, 8], [1, 9, 1, 7, 6, 2, 4, 1, 6, 3, 2, 6, 8, 3, 7, 3, 1, 8, 3, 0, 7, 6, 8, 9, 2, 6, 4, 1, 0, 7, 7, 2, 2, 3, 0, 2, 9, 5, 9, 1, 1, 5, 2, 3, 4, 4, 6, 3, 3, 8, 3, 4, 6, 5, 5, 2, 3, 2, 3, 6, 2, 1, 6, 3, 1, 3, 0, 5, 2, 4, 3, 7, 9, 8, 4, 1, 8, 5, 8, 8, 4, 1, 6, 8, 2, 3, 9]], expected: [7, 3, 0, 4, 8, 7, 6, 7, 4, 8, 4, 4, 6, 7, 8, 8, 7, 4, 4, 4, 5, 7, 3, 0, 5, 6, 5, 8, 5, 7, 8, 0, 7, 1, 4, 6, 9, 5, 4, 7, 3, 1, 5, 6, 1, 3, 2, 6, 5, 0, 4, 0, 3, 2, 5, 3, 2, 7, 2, 8, 3, 1, 9, 7, 7, 1, 1, 2, 2, 7, 0, 9, 4, 7, 6, 0, 4, 5, 3, 4, 8, 6, 9, 5, 5, 7, 7, 7, 9, 8, 4, 5, 2, 1, 6, 3, 7, 9, 0, 8] },
  ],

  acmTests: [
    { input: '3\n2 4 3\n3\n5 6 4\n', output: '7 0 8\n' },
    { input: '1\n0\n1\n0\n', output: '0\n' },
    { input: '7\n9 9 9 9 9 9 9\n4\n9 9 9 9\n', output: '8 9 9 9 0 0 0 1\n' },
    { input: '2\n1 8\n1\n0\n', output: '1 8\n' },
    { input: '1\n5\n1\n5\n', output: '0 1\n' },
    { input: '3\n1 2 3\n2\n4 5\n', output: '5 7 3\n' },
    { input: '2\n9 9\n1\n1\n', output: '0 0 1\n' },
    { input: '10\n1 1 1 1 1 1 1 1 1 1\n10\n8 8 8 8 8 8 8 8 8 8\n', output: '9 9 9 9 9 9 9 9 9 9\n' },
    { input: '100\n6 4 8 6 1 5 2 6 8 4 2 8 7 3 1 5 6 6 0 4 8 0 5 0 2 0 1 7 5 0 1 8 4 8 3 4 0 0 5 5 2 6 2 3 7 8 5 2 2 2 0 6 6 6 9 0 9 4 9 1 1 0 3 4 6 8 0 7 9 2 7 1 5 8 1 9 5 9 4 5 3 5 3 7 2 4 8 6 9 8 4 5 2 1 6 3 7 9 0 8\n87\n1 9 1 7 6 2 4 1 6 3 2 6 8 3 7 3 1 8 3 0 7 6 8 9 2 6 4 1 0 7 7 2 2 3 0 2 9 5 9 1 1 5 2 3 4 4 6 3 3 8 3 4 6 5 5 2 3 2 3 6 2 1 6 3 1 3 0 5 2 4 3 7 9 8 4 1 8 5 8 8 4 1 6 8 2 3 9\n', output: '7 3 0 4 8 7 6 7 4 8 4 4 6 7 8 8 7 4 4 4 5 7 3 0 5 6 5 8 5 7 8 0 7 1 4 6 9 5 4 7 3 1 5 6 1 3 2 6 5 0 4 0 3 2 5 3 2 7 2 8 3 1 9 7 7 1 1 2 2 7 0 9 4 7 6 0 4 5 3 4 8 6 9 5 5 7 7 7 9 8 4 5 2 1 6 3 7 9 0 8\n' },
  ],

  templates: {
    core: {
      javascript: `/**
 * 链表节点：{ val: number, next: ListNode | null }
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
    
};
`,
      python: `def addTwoNumbers(l1, l2):
    # l1、l2 为两条链表的头节点（ListNode），返回和链表的头节点
    # 注意：请自己定义节点类来创建新节点（判题环境中 ListNode 不可直接引用）
    pass
`,
    },
    acm: {
      javascript: `// ACM 模式：input 是全部输入（字符串），用 console.log 输出答案
// 输入格式：第一行 n，第二行 n 个整数；第三行 m，第四行 m 个整数
const lines = input.split('\\n');
const n = Number(lines[0]);
const a = n > 0 ? lines[1].trim().split(/\\s+/).map(Number) : [];
const m = Number(lines[2]);
const b = m > 0 ? lines[3].trim().split(/\\s+/).map(Number) : [];

// 用 a、b 构造两条链表（节点为 { val, next } 对象），逐位相加后用 console.log 输出结果的各位

`,
      python: `# ACM 模式：用 input() 或 sys.stdin 读输入，用 print 输出答案
# 输入格式：第一行 n，第二行 n 个整数；第三行 m，第四行 m 个整数
import sys

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

lines = sys.stdin.read().split('\\n')
n = int(lines[0])
a = list(map(int, lines[1].split())) if n > 0 else []
m = int(lines[2])
b = list(map(int, lines[3].split())) if m > 0 else []

# 用 a、b 构造两条链表，逐位相加后用 print 输出结果的各位
`,
    },
  },

  solutions: {
    core: {
      javascript: `var addTwoNumbers = function(l1, l2) {
  const dummy = { val: 0, next: null }; // 哑节点，简化头节点处理
  let cur = dummy;
  let carry = 0;
  while (l1 !== null || l2 !== null || carry > 0) {
    const x = l1 !== null ? l1.val : 0;
    const y = l2 !== null ? l2.val : 0;
    const sum = x + y + carry;
    carry = Math.floor(sum / 10); // 新的进位
    cur.next = { val: sum % 10, next: null };
    cur = cur.next;
    if (l1 !== null) l1 = l1.next;
    if (l2 !== null) l2 = l2.next;
  }
  return dummy.next;
};
`,
      python: `def addTwoNumbers(l1, l2):
    # 判题环境中无法直接引用 ListNode，自定义一个节点类（只要有 val/next 属性即可）
    class Node:
        def __init__(self, val=0):
            self.val = val
            self.next = None

    dummy = Node()  # 哑节点，简化头节点处理
    cur = dummy
    carry = 0
    while l1 is not None or l2 is not None or carry > 0:
        x = l1.val if l1 is not None else 0
        y = l2.val if l2 is not None else 0
        total = x + y + carry
        carry = total // 10  # 新的进位
        cur.next = Node(total % 10)
        cur = cur.next
        if l1 is not None:
            l1 = l1.next
        if l2 is not None:
            l2 = l2.next
    return dummy.next
`,
    },
    acm: {
      javascript: `const lines = input.split('\\n');
const n = Number(lines[0]);
const a = n > 0 ? lines[1].trim().split(/\\s+/).map(Number) : [];
const m = Number(lines[2]);
const b = m > 0 ? lines[3].trim().split(/\\s+/).map(Number) : [];

// 由数组构造链表
function buildList(arr) {
  const dummy = { val: 0, next: null };
  let cur = dummy;
  for (const v of arr) {
    cur.next = { val: v, next: null };
    cur = cur.next;
  }
  return dummy.next;
}

let l1 = buildList(a);
let l2 = buildList(b);

// 逐位相加，结果存入数组
const out = [];
let carry = 0;
while (l1 !== null || l2 !== null || carry > 0) {
  const x = l1 !== null ? l1.val : 0;
  const y = l2 !== null ? l2.val : 0;
  const sum = x + y + carry;
  carry = Math.floor(sum / 10);
  out.push(sum % 10);
  if (l1 !== null) l1 = l1.next;
  if (l2 !== null) l2 = l2.next;
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
a = list(map(int, lines[1].split())) if n > 0 else []
m = int(lines[2])
b = list(map(int, lines[3].split())) if m > 0 else []

# 由数组构造链表
def build_list(arr):
    dummy = ListNode()
    cur = dummy
    for v in arr:
        cur.next = ListNode(v)
        cur = cur.next
    return dummy.next

l1 = build_list(a)
l2 = build_list(b)

# 逐位相加，结果存入数组
out = []
carry = 0
while l1 is not None or l2 is not None or carry > 0:
    x = l1.val if l1 is not None else 0
    y = l2.val if l2 is not None else 0
    total = x + y + carry
    carry = total // 10
    out.append(str(total % 10))
    if l1 is not None:
        l1 = l1.next
    if l2 is not None:
        l2 = l2.next
print(' '.join(out))
`,
    },
  },

  idea: `
这是小学竖式加法的链表版。因为两个链表都是**逆序**存储的（表头是个位），所以从表头开始同步遍历，正好就是竖式加法「从低位到高位」的顺序。

每一轮取两个当前位的数字（某条链表走完了就当 \`0\`），加上上一步的进位 \`carry\`，得到 \`sum\`：

- \`sum % 10\` 是结果当前位的数字，挂到结果链表尾部
- \`Math.floor(sum / 10)\` 是传给下一位的进位

循环的结束条件是「两条链表都走完**且**进位为 \`0\`」——注意最高位可能再进位出一个新节点（例如 \`5 + 5 = 10\`），所以条件里必须带上 \`carry > 0\`。

用**哑节点（dummy）**指向结果链表的头，可以避免特判头节点的创建。

时间复杂度 O(max(m, n))（m、n 为两条链表的长度），空间复杂度 O(max(m, n))（结果链表本身）。
`,

  explanation: `
- \`dummy\` 是哑节点，\`cur\` 始终指向结果链表的尾部，每次把新节点挂在 \`cur.next\` 上再前移，最后返回 \`dummy.next\`
- 循环条件 \`l1 !== null || l2 !== null || carry > 0\`：三者任一成立就继续算，保证长短不一的链表和最高位的进位都被处理
- \`x\`、\`y\` 取当前位的值，已走完的链表按 \`0\` 处理；\`sum = x + y + carry\`
- \`sum % 10\` 是当前位结果，\`Math.floor(sum / 10)\`（Python 中为 \`total // 10\`）更新进位
- 每轮结束后，没走完的链表指针各自前移一步

Python 核心版里新建节点用的是函数内部自定义的 \`Node\` 类：判题环境只要求节点对象有 \`val\` 和 \`next\` 属性，序列化时会逐个读取，因此自定义类完全等价。

ACM 版本算法相同：先从输入还原出两个数组、构造链表，相加时直接把每一位结果收进数组，最后空格拼接输出。
`,
};
