// 160. 相交链表
// intersectLists 示例：argSpec 把「共享段 + 两条独有段」构造成两条共享后缀节点的链表，resultKind 'nodeVal' 取交点的值
export default {
  id: 160,
  title: '相交链表',
  slug: 'intersection-of-two-linked-lists',
  difficulty: 'easy',
  tags: ['哈希表', '链表', '双指针'],
  hints: [
    '相交必须按节点身份判断，而不是比较节点值；一旦两条单链表相交，交点之后的所有节点都会共享。',
    '使用两个指针分别从 headA、headB 出发，各自到达 null 后切换到另一条链表的头部，可用 O(1) 额外空间消除长度差。',
    '令 pA = headA、pB = headB；当 pA !== pB 时，分别执行 pA = pA === null ? headB : pA.next 和 pB = pB === null ? headA : pB.next，循环结束后返回 pA。',
    '空链表或无交点时两个指针最终会同时为 null；ACM 输入中的共享段必须只构造一次，并让两条独有段末尾指向同一个共享段头，输出交点值或 null。',
  ],

  description: `
给你两个单链表的头节点 \`headA\` 和 \`headB\`，请你找出并返回两个单链表相交的起始节点。如果两个链表不存在相交节点，返回 \`null\`。

题目数据保证整个链式结构中不存在环。

注意：相交是指两个链表从某个节点开始共享**同一批节点**（按节点身份相等，而非值相等）；函数返回结果后，链表必须保持其原始结构。

### 示例

- 输入：共享段为 \`[8,4,5]\`，A 独有段为 \`[4,1]\`，B 独有段为 \`[5,6,1]\`，输出：\`8\`
- 输入：共享段为 \`[2,4]\`，A 独有段为 \`[1,9,1]\`，B 独有段为 \`[3]\`，输出：\`2\`
- 输入：共享段为空，A 为 \`[2,6,4]\`，B 为 \`[1,5]\`，输出：\`null\`

### 提示

- \`listA\` 与 \`listB\` 的节点数目范围均为 \`[0, 3 * 10^4]\`
- \`-10^5 <= Node.val <= 10^5\`

### ACM 模式输入输出格式

- 输入：第一行为共享段长度 \`c\`；第二行为共享段的 \`c\` 个整数（\`c = 0\` 时该行为空行）；第三行为 A 独有段长度 \`a\`；第四行为 A 独有段的 \`a\` 个整数（\`a = 0\` 时为空行）；第五行为 B 独有段长度 \`b\`；第六行为 B 独有段的 \`b\` 个整数（\`b = 0\` 时为空行）
- 输出：相交节点的值；不存在相交节点时输出 \`null\`

ACM 输入示例：
\`\`\`
3
8 4 5
2
4 1
3
5 6 1
\`\`\`
输出：\`8\`
`,

  functionName: 'getIntersectionNode',
  compare: 'exact',
  argSpec: [{ kind: 'intersectLists' }, { kind: 'skip' }, { kind: 'skip' }],
  resultKind: 'nodeVal',

  tests: [
    { args: [[8, 4, 5], [4, 1], [5, 6, 1]], expected: 8 },
    { args: [[2, 4], [1, 9, 1], [3]], expected: 2 },
    { args: [[], [2, 6, 4], [1, 5]], expected: null },
    { args: [[7], [3], [1, 2]], expected: 7 },
    { args: [[], [], [1, 2]], expected: null },
    { args: [[], [], []], expected: null },
    { args: [[4, 5], [], []], expected: 4 },
    { args: [[], [1, 2], [1, 2]], expected: null },
    { args: [[-1, -2], [5], []], expected: -1 },
    { args: [[141, -540, -56, -195, -333, 825, -213, 797, -386, -646, 140, 226, -294, -883, 16, 717, 190, -779, -476, -428, -849, 597, -153, 132, -473, 914, -233, -389, 373, -49, -656, 524, 551, -576, 875, 291, -452, 733, 177, 175], [546, -113, 131, -481, 925, -289, -148, 78, -927, -431, 927, -938, -43, 481, -226, 421, 214, 333, 912, 994, 204, 627, -34, -786, -324, -917, -163, 974, -872, 908, 145, -427, -153, 231, -459, -952, -30, -876, 3, 297, -462, 969, -760, 500, -61, 301, 594, 553, -920, 63, -962, -448, 577, -904, 714, 539, 200, 504, 165, 217, 227, -796, -92, 535, -349, 25, 743, 103, -508, -202], [-710, 886, 625, 340, -214, 913, -597, -611, -422, 84, -164, -537, 466, 808, -242, -656, -56, 143, -833, 645, 404, -441, 264, 960, 506, 568, -675, 936, -640, 319, -255, 402, -71, -586, -556, -375, 249, -243, -844, -777, -667, 346, 722, 732, -759, 961, 273, -129, 656, -909, -927, -405, 831, 886, -613, 154, 348, -256, -311, -438, -748, -10, 891, 151, -789, -347, 825, -956, 297, -43, -858, -1000, -429, -931, 396, -456, 270, -453, -501, -34, 930, 845, -501, 821, 470, -522, -250, 39, 389, 316]], expected: 141 },
  ],

  acmTests: [
    { input: '3\n8 4 5\n2\n4 1\n3\n5 6 1\n', output: '8\n' },
    { input: '2\n2 4\n3\n1 9 1\n1\n3\n', output: '2\n' },
    { input: '0\n\n3\n2 6 4\n2\n1 5\n', output: 'null\n' },
    { input: '1\n7\n1\n3\n2\n1 2\n', output: '7\n' },
    { input: '0\n\n0\n\n2\n1 2\n', output: 'null\n' },
    { input: '0\n\n0\n\n0\n\n', output: 'null\n' },
    { input: '2\n4 5\n0\n\n0\n\n', output: '4\n' },
    { input: '0\n\n2\n1 2\n2\n1 2\n', output: 'null\n' },
    { input: '2\n-1 -2\n1\n5\n0\n\n', output: '-1\n' },
    { input: '40\n141 -540 -56 -195 -333 825 -213 797 -386 -646 140 226 -294 -883 16 717 190 -779 -476 -428 -849 597 -153 132 -473 914 -233 -389 373 -49 -656 524 551 -576 875 291 -452 733 177 175\n70\n546 -113 131 -481 925 -289 -148 78 -927 -431 927 -938 -43 481 -226 421 214 333 912 994 204 627 -34 -786 -324 -917 -163 974 -872 908 145 -427 -153 231 -459 -952 -30 -876 3 297 -462 969 -760 500 -61 301 594 553 -920 63 -962 -448 577 -904 714 539 200 504 165 217 227 -796 -92 535 -349 25 743 103 -508 -202\n90\n-710 886 625 340 -214 913 -597 -611 -422 84 -164 -537 466 808 -242 -656 -56 143 -833 645 404 -441 264 960 506 568 -675 936 -640 319 -255 402 -71 -586 -556 -375 249 -243 -844 -777 -667 346 722 732 -759 961 273 -129 656 -909 -927 -405 831 886 -613 154 348 -256 -311 -438 -748 -10 891 151 -789 -347 825 -956 297 -43 -858 -1000 -429 -931 396 -456 270 -453 -501 -34 930 845 -501 821 470 -522 -250 39 389 316\n', output: '141\n' },
  ],

  templates: {
    core: {
      javascript: `/**
 * 链表节点：{ val: number, next: ListNode | null }
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode} 相交的起始节点；不相交返回 null
 */
var getIntersectionNode = function(headA, headB) {
    
};
`,
      python: `def getIntersectionNode(headA, headB):
    # 返回相交的起始节点；不相交返回 None
    pass
`,
    },
    acm: {
      javascript: `// ACM 模式：input 是全部输入（字符串），用 console.log 输出答案
// 输入格式：第一行共享段长度 c；第二行共享段 c 个整数（c = 0 时为空行）；
//          第三行 a；第四行 A 独有段 a 个整数；第五行 b；第六行 B 独有段 b 个整数
// 输出：相交节点的值，无交点输出 null
const lines = input.split('\\n');
const c = Number(lines[0]);
const shared = c > 0 ? lines[1].trim().split(/\\s+/).map(Number) : [];
const a = Number(lines[2]);
const aOnly = a > 0 ? lines[3].trim().split(/\\s+/).map(Number) : [];
const b = Number(lines[4]);
const bOnly = b > 0 ? lines[5].trim().split(/\\s+/).map(Number) : [];

// 先构造共享段链表，再把两条独有段的末尾接到共享段头节点上，得到 headA 与 headB

`,
      python: `# ACM 模式：用 input() 或 sys.stdin 读输入，用 print 输出答案
# 输入格式：第一行共享段长度 c；第二行共享段 c 个整数（c = 0 时为空行）；
#          第三行 a；第四行 A 独有段 a 个整数；第五行 b；第六行 B 独有段 b 个整数
# 输出：相交节点的值，无交点输出 null
import sys

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

lines = sys.stdin.read().split('\\n')
c = int(lines[0])
shared = list(map(int, lines[1].split())) if c > 0 else []
a = int(lines[2])
a_only = list(map(int, lines[3].split())) if a > 0 else []
b = int(lines[4])
b_only = list(map(int, lines[5].split())) if b > 0 else []

# 先构造共享段链表，再把两条独有段的末尾接到共享段头节点上，得到 head_a 与 head_b
`,
    },
  },

  solutions: {
    core: {
      javascript: `var getIntersectionNode = function(headA, headB) {
  let pA = headA;
  let pB = headB;
  // 各自走完自己的链表后换到对方链表头：
  // pA 走 a + c + b 步、pB 走 b + c + a 步，必在交点（或 null）相遇
  while (pA !== pB) {
    pA = pA === null ? headB : pA.next;
    pB = pB === null ? headA : pB.next;
  }
  return pA;
};
`,
      python: `def getIntersectionNode(headA, headB):
    pa, pb = headA, headB
    # 各自走完自己的链表后换到对方链表头：
    # pa 走 a + c + b 步、pb 走 b + c + a 步，必在交点（或 None）相遇
    while pa is not pb:
        pa = headB if pa is None else pa.next
        pb = headA if pb is None else pb.next
    return pa
`,
    },
    acm: {
      javascript: `const lines = input.split('\\n');
const c = Number(lines[0]);
const shared = c > 0 ? lines[1].trim().split(/\\s+/).map(Number) : [];
const a = Number(lines[2]);
const aOnly = a > 0 ? lines[3].trim().split(/\\s+/).map(Number) : [];
const b = Number(lines[4]);
const bOnly = b > 0 ? lines[5].trim().split(/\\s+/).map(Number) : [];

const build = (vals) => {
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

// 共享段只构造一次，两条独有段的末尾都指向它：交点在两条链表中是同一个对象
const sharedHead = build(shared);
const attach = (only) => {
  if (only.length === 0) return sharedHead;
  const h = build(only);
  let t = h;
  while (t.next !== null) t = t.next;
  t.next = sharedHead;
  return h;
};
const headA = attach(aOnly);
const headB = attach(bOnly);

// 双指针：走完自己的链表后换到对方链表头，必在交点（或 null）相遇
let pA = headA;
let pB = headB;
while (pA !== pB) {
  pA = pA === null ? headB : pA.next;
  pB = pB === null ? headA : pB.next;
}
console.log(pA === null ? 'null' : pA.val);
`,
      python: `import sys

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

lines = sys.stdin.read().split('\\n')
c = int(lines[0])
shared = list(map(int, lines[1].split())) if c > 0 else []
a = int(lines[2])
a_only = list(map(int, lines[3].split())) if a > 0 else []
b = int(lines[4])
b_only = list(map(int, lines[5].split())) if b > 0 else []

def build(vals):
    dummy = ListNode()
    cur = dummy
    for v in vals:
        cur.next = ListNode(v)
        cur = cur.next
    return dummy.next

# 共享段只构造一次，两条独有段的末尾都指向它：交点在两条链表中是同一个对象
shared_head = build(shared)

def attach(only):
    if not only:
        return shared_head
    h = build(only)
    t = h
    while t.next is not None:
        t = t.next
    t.next = shared_head
    return h

head_a = attach(a_only)
head_b = attach(b_only)

# 双指针：走完自己的链表后换到对方链表头，必在交点（或 None）相遇
pa, pb = head_a, head_b
while pa is not pb:
    pa = head_b if pa is None else pa.next
    pb = head_a if pb is None else pb.next

print('null' if pa is None else pa.val)
`,
    },
  },

  idea: `
**哈希表法**：先遍历 \`headA\`，把所有节点存入哈希集合；再遍历 \`headB\`，第一个出现在集合中的节点就是交点。时间 O(m+n)，空间 O(m)。

**双指针法（参考解法）**：指针 \`pA\` 从 \`headA\` 出发，走到末尾后跳到 \`headB\` 继续走；指针 \`pB\` 从 \`headB\` 出发，走到末尾后跳到 \`headA\` 继续走。

- 设 A 独有段长 \`a\`、B 独有段长 \`b\`、共享段长 \`c\`。\`pA\` 走 \`a + c + b\` 步、\`pB\` 走 \`b + c + a\` 步后，二者恰好同时到达交点（换路相当于补齐了两条链表的长度差）
- 若两链表不相交（\`c = 0\`），二者会同时走到 \`null\`，同样「相遇」，此时返回 \`null\` 即可

时间复杂度 O(m+n)，空间复杂度 O(1)。
`,

  explanation: `
- 循环条件 \`pA !== pB\`：两指针指向同一节点（或同为 null）时停止，比较的是节点身份而不是节点的值
- \`pA === null ? headB : pA.next\`：走到自己链表的末尾就换到对方链表的头部，相当于把两条链表「交叉拼接」成两条等长路径，从而消除长度差
- 若有交点，两指针必然在交点首次相遇：相遇前二者走的步数相同，相遇后剩下的共享段完全一样
- 若无交点，两指针同时变为 null，循环结束返回 null
- 易错点：不要在循环里先判 \`pA.val === pB.val\`，题目要求按节点身份判断相交，值相等不代表是同一个节点

ACM 版本需要自己按格式把「共享段 + 两条独有段」拼成两条相交链表：共享段只构造一次，两条独有段的末尾都指向共享段头节点，这样交点在两条链表中才是同一个对象。核心双指针逻辑与核心代码模式完全一致。
`,
};
