// 24. 两两交换链表中的节点
// 链表题：argSpec 把数组参数构造成链表，resultKind 把返回的链表序列化成数组再比对
export default {
  id: 24,
  title: '两两交换链表中的节点',
  slug: 'swap-nodes-in-pairs',
  difficulty: 'medium',
  tags: ['递归', '链表'],
  hints: [
    '每次只需交换当前相邻的两个节点，后续链表可以视为同一问题的规模更小实例。',
    '用递归处理每一对：空链表或仅一个节点直接返回，其他情况把第二个节点提升为当前段新头。',
    '保存 second=head.next，先令 head.next=swapPairs(second.next)，再令 second.next=head，最后返回 second。',
    '调整的是 next 指针而不是节点值，接线顺序错误可能形成环；ACM 的 n=0 时第二行为空且输出空行。',
  ],

  description: `
给你一个链表，两两交换其中相邻的节点，并返回交换后链表的头节点。

你必须在不修改节点内部的值的情况下完成本题（即，只能进行节点交换）。

### 示例

- 输入：\`head = [1,2,3,4]\`，输出：\`[2,1,4,3]\`
- 输入：\`head = []\`，输出：\`[]\`
- 输入：\`head = [1]\`，输出：\`[1]\`

### 提示

- 链表中节点的数目在范围 \`[0, 100]\` 内
- \`0 <= Node.val <= 100\`

### ACM 模式输入输出格式

- 输入：第一行为整数 \`n\`（链表长度）；第二行为 \`n\` 个整数（空格分隔；\`n = 0\` 时该行为空行）
- 输出：交换后链表各节点的值（空格分隔；空链表输出一个空行）

ACM 输入示例：
\`\`\`
4
1 2 3 4
\`\`\`
输出：\`2 1 4 3\`
`,

  functionName: 'swapPairs',
  compare: 'exact',
  argSpec: [{ kind: 'list' }],
  resultKind: 'list',

  tests: [
    { args: [[1, 2, 3, 4]], expected: [2, 1, 4, 3] },
    { args: [[1, 2, 3, 4, 5]], expected: [2, 1, 4, 3, 5] },
    { args: [[]], expected: [] },
    { args: [[1]], expected: [1] },
    { args: [[1, 2, 3]], expected: [2, 1, 3] },
    { args: [[1, 2]], expected: [2, 1] },
    { args: [[0, 1, 0, 2]], expected: [1, 0, 2, 0] },
    { args: [[1, 1, 1, 1]], expected: [1, 1, 1, 1] },
    {
      args: [
        [
          16, 5, 81, 54, 57, 88, 26, 32, 94, 52, 19, 98, 5, 20, 22, 61, 43, 81, 28, 81, 83, 90,
          63, 42, 89, 5, 97, 36, 91, 30, 18, 47, 28, 32, 8, 14, 24, 80, 14, 35, 97, 8, 15, 13,
          12, 2, 26, 85, 47, 68, 90, 60, 0, 16, 41, 78, 80, 94, 56, 49, 61, 27, 9, 43, 84, 73,
          8, 40, 34, 73, 77, 56, 27, 75, 5, 9, 0, 65, 94, 91, 65, 16, 48, 55, 85, 48, 11, 34,
          85, 53, 39, 65, 94, 53, 53, 52, 87, 60, 22, 34
        ]
      ],
      expected: [
        5, 16, 54, 81, 88, 57, 32, 26, 52, 94, 98, 19, 20, 5, 61, 22, 81, 43, 81, 28, 90, 83,
        42, 63, 5, 89, 36, 97, 30, 91, 47, 18, 32, 28, 14, 8, 80, 24, 35, 14, 8, 97, 13, 15, 2,
        12, 85, 26, 68, 47, 60, 90, 16, 0, 78, 41, 94, 80, 49, 56, 27, 61, 43, 9, 73, 84, 40,
        8, 73, 34, 56, 77, 75, 27, 9, 5, 65, 0, 91, 94, 16, 65, 55, 48, 48, 85, 34, 11, 53, 85,
        65, 39, 53, 94, 52, 53, 60, 87, 34, 22
      ],
    },
  ],

  acmTests: [
    { input: '4\n1 2 3 4\n', output: '2 1 4 3\n' },
    { input: '5\n1 2 3 4 5\n', output: '2 1 4 3 5\n' },
    { input: '0\n\n', output: '\n' },
    { input: '1\n1\n', output: '1\n' },
    { input: '3\n1 2 3\n', output: '2 1 3\n' },
    { input: '2\n1 2\n', output: '2 1\n' },
    { input: '4\n0 1 0 2\n', output: '1 0 2 0\n' },
    { input: '4\n1 1 1 1\n', output: '1 1 1 1\n' },
    { input: '100\n16 5 81 54 57 88 26 32 94 52 19 98 5 20 22 61 43 81 28 81 83 90 63 42 89 5 97 36 91 30 18 47 28 32 8 14 24 80 14 35 97 8 15 13 12 2 26 85 47 68 90 60 0 16 41 78 80 94 56 49 61 27 9 43 84 73 8 40 34 73 77 56 27 75 5 9 0 65 94 91 65 16 48 55 85 48 11 34 85 53 39 65 94 53 53 52 87 60 22 34\n', output: '5 16 54 81 88 57 32 26 52 94 98 19 20 5 61 22 81 43 81 28 90 83 42 63 5 89 36 97 30 91 47 18 32 28 14 8 80 24 35 14 8 97 13 15 2 12 85 26 68 47 60 90 16 0 78 41 94 80 49 56 27 61 43 9 73 84 40 8 73 34 56 77 75 27 9 5 65 0 91 94 16 65 55 48 48 85 34 11 53 85 65 39 53 94 52 53 60 87 34 22\n' },
  ],

  templates: {
    core: {
      javascript: `/**
 * 链表节点：{ val: number, next: ListNode | null }
 * @param {ListNode} head
 * @return {ListNode}
 */
var swapPairs = function(head) {
    
};
`,
      python: `def swapPairs(head):
    # head 为链表头节点（ListNode），返回两两交换后的头节点
    pass
`,
    },
    acm: {
      javascript: `// ACM 模式：input 是全部输入（字符串），用 console.log 输出答案
// 输入格式：第一行 n，第二行 n 个整数（n = 0 时为空行）
const lines = input.split('\\n');
const n = Number(lines[0]);
const vals = n > 0 ? lines[1].trim().split(/\\s+/).map(Number) : [];

// 构造链表（节点为 { val, next } 对象），完成两两交换后用 console.log 输出结果

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

# 构造链表，完成两两交换后用 print 输出结果
`,
    },
  },

  solutions: {
    core: {
      javascript: `var swapPairs = function(head) {
  // 递归边界：空链表或只剩一个节点时无需交换
  if (head === null || head.next === null) return head;
  const second = head.next;           // 一对中的第二个节点
  head.next = swapPairs(second.next); // 剩余部分递归交换后接回 head 后面
  second.next = head;                 // second 提到前面，成为这一对新头
  return second;
};
`,
      python: `def swapPairs(head):
    # 递归边界：空链表或只剩一个节点时无需交换
    if head is None or head.next is None:
        return head
    second = head.next  # 一对中的第二个节点
    head.next = swapPairs(second.next)  # 剩余部分递归交换后接回 head 后面
    second.next = head  # second 提到前面，成为这一对新头
    return second
`,
    },
    acm: {
      javascript: `const lines = input.split('\\n');
const n = Number(lines[0]);
const vals = n > 0 ? lines[1].trim().split(/\\s+/).map(Number) : [];

// 构造链表（节点为 { val, next } 对象）
let head = null;
let tail = null;
for (const v of vals) {
  const node = { val: v, next: null };
  if (head === null) head = node;
  else tail.next = node;
  tail = node;
}

// 递归两两交换
const swapPairs = function(h) {
  if (h === null || h.next === null) return h;
  const second = h.next;
  h.next = swapPairs(second.next);
  second.next = h;
  return second;
};
head = swapPairs(head);

// 输出交换后的链表
const out = [];
let cur = head;
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
n = int(lines[0])
vals = list(map(int, lines[1].split())) if n > 0 else []

# 构造链表
dummy = ListNode()
cur = dummy
for v in vals:
    cur.next = ListNode(v)
    cur = cur.next

# 递归两两交换
def swap_pairs(h):
    if h is None or h.next is None:
        return h
    second = h.next
    h.next = swap_pairs(second.next)
    second.next = h
    return second

head = swap_pairs(dummy.next)

# 输出交换后的链表
out = []
while head is not None:
    out.append(str(head.val))
    head = head.next
print(' '.join(out))
`,
    },
  },

  idea: `
两两交换的本质是「局部对调」：每次处理相邻两个节点，把第二个提到前面、第一个接到后面。

递归法：把链表看成「当前一对 + 后面已经交换好的子链表」。递归函数负责交换当前这一对并返回新的头节点；递归边界是空链表或只剩一个节点，此时原样返回。每一对只做 O(1) 的指针调整，共 n/2 对，时间复杂度 O(n)，递归栈空间 O(n)。

迭代法：借助 dummy 哨兵节点，用 prev 指向待交换一对的前驱，循环里完成三步指针调整（first.next = second.next、second.next = first、prev.next = second），然后 prev 跳到 first 继续处理下一对。时间 O(n)、空间 O(1)。

注意题目要求不能修改节点的值，只能调整 next 指针。
`,

  explanation: `
参考代码采用递归写法，关键三步：

- \`second = head.next\`：取出一对中的第二个节点，它将提到前面
- \`head.next = swapPairs(second.next)\`：剩余部分先递归交换好，再接回 head 之后；递归边界是「空链表或只剩一个节点」，直接原样返回
- \`second.next = head\`：完成这一对的对调，second 成为新头并返回

易错点：

- 顺序不能反：必须先把后面递归接好（\`head.next = ...\`），再做 \`second.next = head\`，否则链表会成环
- 奇数长度不需要特判：最后一个节点会命中「只剩一个节点」的边界，原样保留

ACM 版本的交换算法完全相同，只是自己从输入构造链表、交换后遍历打印。
`,
};
