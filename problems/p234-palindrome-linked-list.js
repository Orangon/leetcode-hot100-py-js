// 234. 回文链表
// 普通链表题：argSpec 把数组构造成链表，返回布尔值直接比对
export default {
  id: 234,
  title: '回文链表',
  slug: 'palindrome-linked-list',
  difficulty: 'easy',
  tags: ['栈', '递归', '链表', '双指针'],
  hints: [
    '回文链表的前半段与后半段逆序后一一对应，因此无需保存全部节点值，只要能从中点向两端比较即可。',
    '使用快慢指针定位链表中点，再原地反转后半段，最后从头节点和反转后的后半段头节点同步比较，可实现 O(n) 时间、O(1) 额外空间。',
    '令 slow、fast 都从 head 出发，slow 每次走一步、fast 每次走两步；循环结束后反转 slow 起始的链表，再令 left = head、right = 反转后的头，逐项比较直到 right 为空。',
    '空链表和单节点链表都应返回 true，奇数长度时中间节点参与自比较不影响结果；ACM 模式先按 n 和第二行数值构造链表，并输出小写 true 或 false。',
  ],

  description: `
给你一个单链表的头节点 \`head\`，请你判断该链表是否为回文链表。如果是，返回 \`true\`；否则返回 \`false\`。

回文链表指从前往后读和从后往前读完全一样的链表。

### 示例

- 输入：\`head = [1,2,2,1]\`，输出：\`true\`
- 输入：\`head = [1,2]\`，输出：\`false\`
- 输入：\`head = [1]\`，输出：\`true\`

### 提示

- 链表中节点的数目范围是 \`[0, 10^5]\`（空链表视为回文）
- \`0 <= Node.val <= 9\`

### ACM 模式输入输出格式

- 输入：第一行为整数 \`n\`（链表长度）；第二行为 \`n\` 个整数（空格分隔；\`n = 0\` 时该行为空行）
- 输出：\`true\` 或 \`false\`（小写）

ACM 输入示例：
\`\`\`
4
1 2 2 1
\`\`\`
输出：\`true\`
`,

  functionName: 'isPalindrome',
  compare: 'exact',
  argSpec: [{ kind: 'list' }],

  tests: [
    { args: [[1, 2, 2, 1]], expected: true },
    { args: [[1, 2]], expected: false },
    { args: [[1]], expected: true },
    { args: [[1, 2, 3, 2, 1]], expected: true },
    { args: [[]], expected: true },
    { args: [[2, 2, 2, 2]], expected: true },
    { args: [[1, 2, 3, 4, 5]], expected: false },
    { args: [[1, 0]], expected: false },
    { args: [[9,8,7,2,2,5,1,9,6,4,7,8,7,6,9,4,3,7,6,5,3,6,0,8,3,4,8,6,0,9,8,0,3,1,1,5,9,1,2,5,5,1,9,4,1,6,8,6,9,5,6,2,9,8,0,8,7,9,3,3,3,5,3,4,6,6,3,0,7,3,4,0,7,6,5,5,6,7,0,4,3,7,0,3,6,6,4,3,5,3,3,3,9,7,8,0,8,9,2,6,5,9,6,8,6,1,4,9,1,5,5,2,1,9,5,1,1,3,0,8,9,0,6,8,4,3,8,0,6,3,5,6,7,3,4,9,6,7,8,7,4,6,9,1,5,2,2,7,8,9]], expected: true },
    { args: [[0,9,4,6,5,7,4,3,5,0,3,2,0,3,3,3,3,3,4,1,5,9,1,3,8,0,4,2,5,9,5,6,1,3,2,6,3,6,0,7,0,7,6,5,1,2,1,7,6,6,9,9,2,0,6,8,9,6,9,8,6,4,4,5,5,0,6,1,6,7,2,6,0,5,1,5,1,5,0,6,2,7,6,1,6,0,5,5,4,4,6,8,9,6,9,8,6,0,2,9,9,6,6,7,1,2,1,5,6,7,0,7,0,6,3,6,2,3,1,6,5,9,5,2,4,0,8,3,1,9,5,1,4,3,3,3,3,3,0,2,2,0,5,3,4,7,5,6,4,9,0]], expected: false },
  ],

  acmTests: [
    { input: '4\n1 2 2 1\n', output: 'true\n' },
    { input: '2\n1 2\n', output: 'false\n' },
    { input: '1\n1\n', output: 'true\n' },
    { input: '5\n1 2 3 2 1\n', output: 'true\n' },
    { input: '0\n\n', output: 'true\n' },
    { input: '4\n2 2 2 2\n', output: 'true\n' },
    { input: '5\n1 2 3 4 5\n', output: 'false\n' },
    { input: '2\n1 0\n', output: 'false\n' },
    { input: '150\n9 8 7 2 2 5 1 9 6 4 7 8 7 6 9 4 3 7 6 5 3 6 0 8 3 4 8 6 0 9 8 0 3 1 1 5 9 1 2 5 5 1 9 4 1 6 8 6 9 5 6 2 9 8 0 8 7 9 3 3 3 5 3 4 6 6 3 0 7 3 4 0 7 6 5 5 6 7 0 4 3 7 0 3 6 6 4 3 5 3 3 3 9 7 8 0 8 9 2 6 5 9 6 8 6 1 4 9 1 5 5 2 1 9 5 1 1 3 0 8 9 0 6 8 4 3 8 0 6 3 5 6 7 3 4 9 6 7 8 7 4 6 9 1 5 2 2 7 8 9\n', output: 'true\n' },
    { input: '151\n0 9 4 6 5 7 4 3 5 0 3 2 0 3 3 3 3 3 4 1 5 9 1 3 8 0 4 2 5 9 5 6 1 3 2 6 3 6 0 7 0 7 6 5 1 2 1 7 6 6 9 9 2 0 6 8 9 6 9 8 6 4 4 5 5 0 6 1 6 7 2 6 0 5 1 5 1 5 0 6 2 7 6 1 6 0 5 5 4 4 6 8 9 6 9 8 6 0 2 9 9 6 6 7 1 2 1 5 6 7 0 7 0 6 3 6 2 3 1 6 5 9 5 2 4 0 8 3 1 9 5 1 4 3 3 3 3 3 0 2 2 0 5 3 4 7 5 6 4 9 0\n', output: 'false\n' },
  ],

  templates: {
    core: {
      javascript: `/**
 * 链表节点：{ val: number, next: ListNode | null }
 * @param {ListNode} head
 * @return {boolean}
 */
var isPalindrome = function(head) {
    
};
`,
      python: `def isPalindrome(head):
    # head 为链表头节点（ListNode），返回 True 或 False
    pass
`,
    },
    acm: {
      javascript: `// ACM 模式：input 是全部输入（字符串），用 console.log 输出答案
// 输入格式：第一行 n，第二行 n 个整数（n = 0 时为空行）
// 输出：true 或 false（小写）
const lines = input.split('\\n');
const n = Number(lines[0]);
const vals = n > 0 ? lines[1].trim().split(/\\s+/).map(Number) : [];

// 构造链表（节点为 { val, next } 对象），判断回文后用 console.log 输出 'true' 或 'false'

`,
      python: `# ACM 模式：用 input() 或 sys.stdin 读输入，用 print 输出答案
# 输入格式：第一行 n，第二行 n 个整数（n = 0 时为空行）
# 输出：true 或 false（小写）
import sys

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

lines = sys.stdin.read().split('\\n')
n = int(lines[0])
vals = list(map(int, lines[1].split())) if n > 0 else []

# 构造链表，判断回文后用 print 输出 'true' 或 'false'
`,
    },
  },

  solutions: {
    core: {
      javascript: `var isPalindrome = function(head) {
  // 快慢指针找中点：fast 走两步、slow 走一步，fast 到尾时 slow 在后半段起点
  let slow = head;
  let fast = head;
  while (fast !== null && fast.next !== null) {
    slow = slow.next;
    fast = fast.next.next;
  }
  // 反转后半段
  let prev = null;
  while (slow !== null) {
    const next = slow.next;
    slow.next = prev;
    prev = slow;
    slow = next;
  }
  // 两端对撞比较：后半段不长于前半段，右指针先走完
  let left = head;
  let right = prev;
  while (right !== null) {
    if (left.val !== right.val) return false;
    left = left.next;
    right = right.next;
  }
  return true;
};
`,
      python: `def isPalindrome(head):
    # 快慢指针找中点：fast 走两步、slow 走一步，fast 到尾时 slow 在后半段起点
    slow = fast = head
    while fast is not None and fast.next is not None:
        slow = slow.next
        fast = fast.next.next
    # 反转后半段
    prev = None
    while slow is not None:
        nxt = slow.next
        slow.next = prev
        prev = slow
        slow = nxt
    # 两端对撞比较：后半段不长于前半段，右指针先走完
    left, right = head, prev
    while right is not None:
        if left.val != right.val:
            return False
        left = left.next
        right = right.next
    return True
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

// 快慢指针找中点
let slow = head;
let fast = head;
while (fast !== null && fast.next !== null) {
  slow = slow.next;
  fast = fast.next.next;
}
// 反转后半段
let prev = null;
while (slow !== null) {
  const next = slow.next;
  slow.next = prev;
  prev = slow;
  slow = next;
}
// 两端对撞比较
let left = head;
let right = prev;
let ok = true;
while (right !== null) {
  if (left.val !== right.val) {
    ok = false;
    break;
  }
  left = left.next;
  right = right.next;
}
console.log(ok ? 'true' : 'false');
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
head = dummy.next

# 快慢指针找中点
slow = fast = head
while fast is not None and fast.next is not None:
    slow = slow.next
    fast = fast.next.next
# 反转后半段
prev = None
while slow is not None:
    nxt = slow.next
    slow.next = prev
    prev = slow
    slow = nxt
# 两端对撞比较
left, right = head, prev
ok = True
while right is not None:
    if left.val != right.val:
        ok = False
        break
    left = left.next
    right = right.next
print('true' if ok else 'false')
`,
    },
  },

  idea: `
最直接的思路是把节点的值依次复制到数组里，再用双指针对撞比较。时间 O(n)，但需要 O(n) 额外空间。

更优的 O(1) 空间做法是**快慢指针 + 反转后半段**：

1. 快慢指针找中点：\`fast\` 每次走两步、\`slow\` 每次走一步，\`fast\` 到达末尾时 \`slow\` 正好在后半段的起点
2. 从 \`slow\` 开始反转后半段链表（第 206 题的做法）
3. 头指针与反转后的后半段头指针同步前进、逐个比较，值全部相等即为回文

奇数长度时 \`slow\` 停在正中间的节点上，反转后半段会带上它，不影响结果（中间的节点和自己比较必然相等）。时间复杂度 O(n)，空间复杂度 O(1)。
`,

  explanation: `
- 找中点：\`while (fast !== null && fast.next !== null)\` 循环结束时 \`slow\` 指向后半段起点（奇数长度时为正中间节点）
- 反转后半段就是第 206 题的迭代反转：暂存后继 \`next\` / \`nxt\`、指针掉头、双指针前移，结束后 \`prev\` 是后半段反转后的新头
- 比较阶段：左指针从 \`head\`、右指针从 \`prev\` 出发同步走，任一位置值不等立即返回 false
- 循环条件只需判断右指针 \`right !== null\`：后半段长度不超过前半段，右指针一定先走完
- 易错点一：找中点的判断条件是 \`fast !== null && fast.next !== null\`，漏掉任意一个都会在奇偶长度时越界
- 易错点二：反转会修改原链表结构，若题目要求不能修改输入，比较完后需要把后半段再反转回去

ACM 版本多了构造链表与输出布尔文本（小写 \`true\` / \`false\`）的部分，核心算法完全一致。
`,
};
