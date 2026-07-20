// 21. 合并两个有序链表
// 链表题：argSpec 把两个数组参数构造成链表，resultKind 把返回的链表序列化成数组再比对
export default {
  id: 21,
  title: '合并两个有序链表',
  slug: 'merge-two-sorted-lists',
  difficulty: 'easy',
  tags: ['链表', '递归'],
  hints: [
    '两条链表均已升序，因此当前较小的头节点一定是合并后尚未确定部分的第一个节点。',
    '可以递归地选较小头节点并合并剩余链表，也可用 dummy 与尾指针迭代归并；参考解法采用递归。',
    '任一链表为空就返回另一条；否则较小节点的 next 指向“其余部分与另一链表”的合并结果，再返回该节点。',
    '应复用节点而非只复制节点值，值相等时取任一侧都保持有序；ACM 两条空链表需输出空行。',
  ],

  description: `
将两个升序链表合并为一个新的**升序**链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。

### 示例

- 输入：\`list1 = [1,2,4], list2 = [1,3,4]\`，输出：\`[1,1,2,3,4,4]\`
- 输入：\`list1 = [], list2 = []\`，输出：\`[]\`
- 输入：\`list1 = [], list2 = [0]\`，输出：\`[0]\`

### 提示

- 两个链表的节点数目范围是 \`[0, 50]\`
- \`-100 <= Node.val <= 100\`
- \`list1\` 和 \`list2\` 均按**非递减顺序**排列

### ACM 模式输入输出格式

- 输入：第一行为整数 \`n\`（第一个链表长度）；第二行为 \`n\` 个整数（空格分隔；\`n = 0\` 时该行为空行）；第三行为整数 \`m\`（第二个链表长度）；第四行为 \`m\` 个整数（空格分隔；\`m = 0\` 时该行为空行）
- 输出：合并后链表各节点的值（空格分隔；空链表输出一个空行）

ACM 输入示例：
\`\`\`
3
1 2 4
3
1 3 4
\`\`\`
输出：\`1 1 2 3 4 4\`
`,

  functionName: 'mergeTwoLists',
  compare: 'exact',
  argSpec: [{ kind: 'list' }, { kind: 'list' }],
  resultKind: 'list',

  tests: [
    { args: [[1, 2, 4], [1, 3, 4]], expected: [1, 1, 2, 3, 4, 4] },
    { args: [[], []], expected: [] },
    { args: [[], [0]], expected: [0] },
    { args: [[2], [1]], expected: [1, 2] },
    { args: [[-3, -1, 2], [-2, 0, 5]], expected: [-3, -2, -1, 0, 2, 5] },
    { args: [[1, 1, 1], [1, 1]], expected: [1, 1, 1, 1, 1] },
    { args: [[1, 3, 5], [2, 4, 6]], expected: [1, 2, 3, 4, 5, 6] },
    { args: [[1, 2], [3, 4]], expected: [1, 2, 3, 4] },
    { args: [[-5, -5, 0], [-5, 1]], expected: [-5, -5, -5, 0, 1] },
    {
      args: [
        [
          -91, -90, -86, -79, -66, -61, -53, -51, -46, -44, -42, -37, -36, -22, -21, -19, -12,
          -5, -3, 0, 2, 6, 12, 13, 23, 26, 31, 33, 42, 44, 54, 56, 70, 75, 80, 82, 87, 91, 91,
          100
        ],
        [
          -93, -85, -78, -71, -67, -66, -61, -60, -58, -55, -52, -49, -48, -44, -42, -40, -29,
          -14, -9, -8, -3, 2, 3, 14, 14, 18, 22, 31, 33, 34, 66, 75, 82, 89, 90
        ]
      ],
      expected: [
        -93, -91, -90, -86, -85, -79, -78, -71, -67, -66, -66, -61, -61, -60, -58, -55, -53,
        -52, -51, -49, -48, -46, -44, -44, -42, -42, -40, -37, -36, -29, -22, -21, -19, -14,
        -12, -9, -8, -5, -3, -3, 0, 2, 2, 3, 6, 12, 13, 14, 14, 18, 22, 23, 26, 31, 31, 33, 33,
        34, 42, 44, 54, 56, 66, 70, 75, 75, 80, 82, 82, 87, 89, 90, 91, 91, 100
      ],
    },
  ],

  acmTests: [
    { input: '3\n1 2 4\n3\n1 3 4\n', output: '1 1 2 3 4 4\n' },
    { input: '0\n\n0\n\n', output: '\n' },
    { input: '0\n\n1\n0\n', output: '0\n' },
    { input: '1\n2\n1\n1\n', output: '1 2\n' },
    { input: '3\n-3 -1 2\n3\n-2 0 5\n', output: '-3 -2 -1 0 2 5\n' },
    { input: '3\n1 1 1\n2\n1 1\n', output: '1 1 1 1 1\n' },
    { input: '3\n1 3 5\n3\n2 4 6\n', output: '1 2 3 4 5 6\n' },
    { input: '2\n1 2\n2\n3 4\n', output: '1 2 3 4\n' },
    { input: '3\n-5 -5 0\n2\n-5 1\n', output: '-5 -5 -5 0 1\n' },
    { input: '40\n-91 -90 -86 -79 -66 -61 -53 -51 -46 -44 -42 -37 -36 -22 -21 -19 -12 -5 -3 0 2 6 12 13 23 26 31 33 42 44 54 56 70 75 80 82 87 91 91 100\n35\n-93 -85 -78 -71 -67 -66 -61 -60 -58 -55 -52 -49 -48 -44 -42 -40 -29 -14 -9 -8 -3 2 3 14 14 18 22 31 33 34 66 75 82 89 90\n', output: '-93 -91 -90 -86 -85 -79 -78 -71 -67 -66 -66 -61 -61 -60 -58 -55 -53 -52 -51 -49 -48 -46 -44 -44 -42 -42 -40 -37 -36 -29 -22 -21 -19 -14 -12 -9 -8 -5 -3 -3 0 2 2 3 6 12 13 14 14 18 22 23 26 31 31 33 33 34 42 44 54 56 66 70 75 75 80 82 82 87 89 90 91 91 100\n' },
  ],

  templates: {
    core: {
      javascript: `/**
 * 链表节点：{ val: number, next: ListNode | null }
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeTwoLists = function(list1, list2) {
    
};
`,
      python: `def mergeTwoLists(list1, list2):
    # list1 / list2 为两条升序链表的头节点（ListNode），返回合并后的头节点
    pass
`,
    },
    acm: {
      javascript: `// ACM 模式：input 是全部输入（字符串），用 console.log 输出答案
// 输入格式：第一行 n，第二行 n 个整数（n = 0 时为空行）；第三行 m，第四行 m 个整数（m = 0 时为空行）
const lines = input.split('\\n');
const n = Number(lines[0]);
const vals1 = n > 0 ? lines[1].trim().split(/\\s+/).map(Number) : [];
const m = Number(lines[2]);
const vals2 = m > 0 ? lines[3].trim().split(/\\s+/).map(Number) : [];

// 构造两条链表（节点为 { val, next } 对象），合并后用 console.log 输出结果（空链表输出空行）

`,
      python: `# ACM 模式：用 input() 或 sys.stdin 读输入，用 print 输出答案
# 输入格式：第一行 n，第二行 n 个整数（n = 0 时为空行）；第三行 m，第四行 m 个整数（m = 0 时为空行）
import sys

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

lines = sys.stdin.read().split('\\n')
n = int(lines[0])
vals1 = list(map(int, lines[1].split())) if n > 0 else []
m = int(lines[2])
vals2 = list(map(int, lines[3].split())) if m > 0 else []

# 构造两条链表，合并后用 print 输出结果（空链表输出空行）
`,
    },
  },

  solutions: {
    core: {
      javascript: `var mergeTwoLists = function(list1, list2) {
  if (list1 === null) return list2; // 边界：一条为空，直接返回另一条
  if (list2 === null) return list1;
  if (list1.val <= list2.val) {
    list1.next = mergeTwoLists(list1.next, list2); // list1 头更小，接上剩余部分的合并结果
    return list1;
  }
  list2.next = mergeTwoLists(list1, list2.next);
  return list2;
};
`,
      python: `def mergeTwoLists(list1, list2):
    if list1 is None:
        return list2  # 边界：一条为空，直接返回另一条
    if list2 is None:
        return list1
    if list1.val <= list2.val:
        list1.next = mergeTwoLists(list1.next, list2)  # list1 头更小，接上剩余部分的合并结果
        return list1
    list2.next = mergeTwoLists(list1, list2.next)
    return list2
`,
    },
    acm: {
      javascript: `const lines = input.split('\\n');
const n = Number(lines[0]);
const vals1 = n > 0 ? lines[1].trim().split(/\\s+/).map(Number) : [];
const m = Number(lines[2]);
const vals2 = m > 0 ? lines[3].trim().split(/\\s+/).map(Number) : [];

// 构造链表
function buildList(vals) {
  const dummy = { val: 0, next: null };
  let cur = dummy;
  for (const v of vals) {
    cur.next = { val: v, next: null };
    cur = cur.next;
  }
  return dummy.next;
}

// 递归合并
function merge(l1, l2) {
  if (l1 === null) return l2;
  if (l2 === null) return l1;
  if (l1.val <= l2.val) {
    l1.next = merge(l1.next, l2);
    return l1;
  }
  l2.next = merge(l1, l2.next);
  return l2;
}

let head = merge(buildList(vals1), buildList(vals2));

// 输出合并后的链表（空链表输出空行）
const out = [];
while (head !== null) {
  out.push(head.val);
  head = head.next;
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
vals1 = list(map(int, lines[1].split())) if n > 0 else []
m = int(lines[2])
vals2 = list(map(int, lines[3].split())) if m > 0 else []

# 构造链表
def build_list(vals):
    dummy = ListNode()
    cur = dummy
    for v in vals:
        cur.next = ListNode(v)
        cur = cur.next
    return dummy.next

# 递归合并
def merge(l1, l2):
    if l1 is None:
        return l2
    if l2 is None:
        return l1
    if l1.val <= l2.val:
        l1.next = merge(l1.next, l2)
        return l1
    l2.next = merge(l1, l2.next)
    return l2

head = merge(build_list(vals1), build_list(vals2))

# 输出合并后的链表（空链表输出空行）
out = []
while head is not None:
    out.append(str(head.val))
    head = head.next
print(' '.join(out))
`,
    },
  },

  idea: `
两条链表都已经有序，这正是归并排序里的「合并」步骤。

**迭代法（哑节点）**：用 \`dummy\` 哨兵节点和尾指针 \`tail\`，每次比较两条链表当前节点的值，把较小的接到 \`tail\` 后面并前移对应的那条链表；循环结束时最多只剩一条链表非空，把它整体接到末尾即可（它本身有序）。

**递归法**：两个头节点中值较小的那个就是合并后的头，把它的 \`next\` 指向「剩余部分递归合并」的结果即可；边界是任一链表为空，直接返回另一条。

两种方法时间复杂度都是 O(n + m)；迭代法空间 O(1)，递归法空间 O(n + m)（递归栈）。
`,

  explanation: `
递归版的核心判断只有三处：

- \`list1\` 为空返回 \`list2\`，\`list2\` 为空返回 \`list1\`——递归边界
- 谁的头节点值更小，谁就是合并后的头：把它的 \`next\` 接上「自己的后继与另一条链表递归合并」的结果，然后返回它自己
- 比较用 \`<=\`，值相等时先取 \`list1\` 的节点，合并结果稳定

递归直接复用原链表的节点，不需要新建任何节点。ACM 版本多了两头的工作：先按输入构造两条链表（\`build_list\` / \`buildList\` 用哨兵节点简化插入），合并后再遍历新链表把值打印出来；空链表时 \`out\` 为空，打印一个空行。核心合并逻辑与核心代码模式完全一致。
`,
};
