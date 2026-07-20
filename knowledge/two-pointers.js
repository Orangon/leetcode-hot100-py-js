// 知识文章：双指针
// 数据格式约定（所有知识文章遵循）：
// - slug: 英文短横线命名，同时是文件名与路由
// - tags: 与题库中题目的 tags 匹配，用于自动关联题目
// - relatedProblems（可选）: 显式指定关联题目 id，优先于 tags 匹配
// - content: Markdown 子集（### 标题、- 列表、``` 代码块、`行内代码`）
export default {
  slug: 'two-pointers',
  title: '双指针',
  intro: '对撞、快慢、分离三种形态，用两个指针省掉一层循环',
  tags: ['双指针', '数组', '字符串'],
  relatedProblems: [11, 15, 19, 21, 141, 283, 287],

  content: `
> 提示：建议先读《时间复杂度入门》（明白 O(n^2) 和 O(n) 差多少）和《数组与哈希表》（会用数组下标），再读本篇。

两个人捏住一根绳子的两端，同时往中间走，相遇就停。每步只让一个人迈——谁有理由谁迈。双指针里最好懂的一种（对撞指针）就是这两个人：省掉的不是路，是那些「算了也白算」的位置。

### 是什么

先抛开术语：**双指针就是两个下标变量，按约定好的规则一起扫数据**。规则设计得巧，每走一步都能排除掉一批「不可能是答案」的组合，于是原本要两层循环枚举的事，一遍就扫完——把 O(n^2) 降到 O(n)。

「指针」在这里不是 C 语言里那种指针，就是一个普通的整数下标变量（在链表上才是节点引用）。两个指针各自最多走 n 步，所以总步数是 2n，也就是 O(n)。

按走路方式分成三种形态，术语对照：

| 大白话 | 术语 | 走法 | 典型用途 |
| --- | --- | --- | --- |
| 两头往中间夹 | 对撞指针 | 一个在头、一个在尾，相向而行 | 有序数组找配对、盛水容器 |
| 一快一慢同向跑 | 快慢指针 | 都从头出发，速度不同 | 原地修改数组、链表判环 |
| 各扫各的一条路 | 分离指针 | 两个序列各放一个指针，各自前进 | 合并两个有序序列 |

三种形态长得不一样，但共同点只有一个：**每次移动都有明确依据，移动即淘汰**——被跳过的组合都论证过「不可能是答案」，所以才敢一遍扫完而不漏解。

### 一个最小例子

11. 盛最多水的容器：height = [1, 8, 6, 2, 5]，数组值是每根柱子的高度。选两根柱子，和地面围成水槽：水量 = 两根中较矮的高度 × 两根的间距。问最多能装多少水。

对撞指针的走法：left 从 0 出发、right 从 4 出发，每轮算一次当前水量，然后**移动较矮的那根**——矮的留下只会拖后腿，换掉它才有希望：

| 轮次 | left（高） | right（高） | 宽 | 本轮水量 | 哪边矮 | 本步动作 | 目前最大 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 0 (1) | 4 (5) | 4 | 1 × 4 = 4 | 左 | left 右移 | 4 |
| 2 | 1 (8) | 4 (5) | 3 | 5 × 3 = 15 | 右 | right 左移 | 15 |
| 3 | 1 (8) | 3 (2) | 2 | 2 × 2 = 4 | 右 | right 左移 | 15 |
| 4 | 1 (8) | 2 (6) | 1 | 6 × 1 = 6 | 右 | right 左移 | 15 |
| 收尾 | 两指针相遇 | — | — | 一共只算了 4 次水量 | — | 结束 | 答案 = 15 |

为什么移动矮板不会错过答案？以第 2 轮为例：right 端的 5 比 left 端的 8 矮。如果让 right 留下、left 往右走，间距只会变小，水位又被矮板 5 卡死、不会更高——「right 跟任何更靠右的 left 配对」这一整批组合注定更差，可以直接判死刑。每轮淘汰一根柱子、绝不误杀冠军，所以一遍扫完就是对的。

### 模板代码

对撞指针模板（以 11 题为例）：

\`\`\`
// ===== JavaScript =====
function maxArea(height) {
  let left = 0;                                  // 左指针：从最左边的柱子出发
  let right = height.length - 1;                 // 右指针：从最右边的柱子出发
  let best = 0;                                  // 目前见过的最大水量
  while (left < right) {                         // 两指针相遇就结束
    const h = Math.min(height[left], height[right]);  // 水位由较矮的板决定
    const water = h * (right - left);            // 当前水量 = 水位 × 间距
    best = Math.max(best, water);                // 刷新最大水量
    if (height[left] < height[right]) {          // 比较两边谁矮
      left++;                                    // 左矮：淘汰左板，left 右移一位
    } else {
      right--;                                   // 右矮（或一样高）：淘汰右板，right 左移一位
    }
  }
  return best;                                   // 返回一路上见过的最大值
}
\`\`\`

\`\`\`
# ===== Python =====
def max_area(height):
    left = 0                                     # 左指针：从最左边的柱子出发
    right = len(height) - 1                      # 右指针：从最右边的柱子出发
    best = 0                                     # 目前见过的最大水量
    while left < right:                          # 两指针相遇就结束
        h = min(height[left], height[right])     # 水位由较矮的板决定
        water = h * (right - left)               # 当前水量 = 水位 × 间距
        best = max(best, water)                  # 刷新最大水量
        if height[left] < height[right]:         # 比较两边谁矮
            left += 1                            # 左矮：淘汰左板，left 右移一位
        else:
            right -= 1                           # 右矮（或一样高）：淘汰右板，right 左移一位
    return best                                  # 返回一路上见过的最大值
\`\`\`

快慢指针模板（以 283. 移动零为例：fast 负责「读」每个元素，slow 负责「写」下一个非零元素该站的位置）：

\`\`\`
// JavaScript：原地修改，结束后 slow 左侧是保持原顺序的全部非零元素
function moveZeroes(nums) {
  let slow = 0;                                  // 写指针：下一个非零数该放的位置
  for (let fast = 0; fast < nums.length; fast++) {  // 读指针：扫遍每个元素
    if (nums[fast] !== 0) {                      // 读到非零元素
      [nums[slow], nums[fast]] = [nums[fast], nums[slow]];  // 交换到 slow 处
      slow++;                                    // 写位置前进一步
    }
  }
}
\`\`\`

\`\`\`
# Python：原地修改，结束后 slow 左侧是保持原顺序的全部非零元素
def move_zeroes(nums):
    slow = 0                                     # 写指针：下一个非零数该放的位置
    for fast in range(len(nums)):                # 读指针：扫遍每个元素
        if nums[fast] != 0:                      # 读到非零元素
            nums[slow], nums[fast] = nums[fast], nums[slow]  # 交换到 slow 处
            slow += 1                            # 写位置前进一步
\`\`\`

分离指针模板（合并两个升序数组：各放一个指针，谁小谁进结果、谁前进）：

\`\`\`
// JavaScript
function merge(a, b) {
  const res = [];                          // 存放合并结果
  let i = 0, j = 0;                        // i 扫 a，j 扫 b
  while (i < a.length && j < b.length) {   // 两边都没扫完就继续比
    if (a[i] <= b[j]) {                    // a 的当前元素更小（或相等）
      res.push(a[i]);                      // 小的先进结果
      i++;                                 // a 的指针前进一步
    } else {
      res.push(b[j]);                      // b 的当前元素更小
      j++;                                 // b 的指针前进一步
    }
  }
  return res.concat(a.slice(i), b.slice(j));  // 有一边先扫完，把另一边的剩余整段接上
}
\`\`\`

\`\`\`
# Python
def merge(a, b):
    res = []                               # 存放合并结果
    i = j = 0                              # i 扫 a，j 扫 b
    while i < len(a) and j < len(b):       # 两边都没扫完就继续比
        if a[i] <= b[j]:                   # a 的当前元素更小（或相等）
            res.append(a[i])               # 小的先进结果
            i += 1                         # a 的指针前进一步
        else:
            res.append(b[j])               # b 的当前元素更小
            j += 1                         # b 的指针前进一步
    return res + a[i:] + b[j:]             # 有一边先扫完，把另一边的剩余整段接上
\`\`\`

### 亲手跑一跑

把盛水容器的四轮对撞打印出来，看着两根指针怎样一步步夹出答案：

\`\`\`run-js#container-walkthrough
const height = [1, 8, 6, 2, 5];
let left = 0;                            // 左指针从第 0 根柱出发
let right = height.length - 1;           // 右指针从最后一根柱出发
let best = 0;                            // 目前见过的最大水量
let round = 1;
while (left < right) {                   // 两指针相遇就结束
  const h = Math.min(height[left], height[right]);
  const water = h * (right - left);      // 水量 = 较矮板 × 间距
  if (water > best) best = water;
  const move = height[left] < height[right] ? '左边矮, left 右移' : '右边矮, right 左移';
  console.log('第' + round + '轮: left=' + left + ' (高' + height[left] + '), right=' + right + ' (高' + height[right] + '), 水量=' + water + ', ' + move);
  if (height[left] < height[right]) left++;
  else right--;
  round++;
}
console.log('两指针相遇, 结束。最大水量 = ' + best);
\`\`\`

\`\`\`run-py#container-walkthrough
height = [1, 8, 6, 2, 5]
left = 0                            # 左指针从第 0 根柱出发
right = len(height) - 1             # 右指针从最后一根柱出发
best = 0                            # 目前见过的最大水量
rd = 1
while left < right:                 # 两指针相遇就结束
    h = min(height[left], height[right])
    water = h * (right - left)      # 水量 = 较矮板 × 间距
    if water > best:
        best = water
    move = '左边矮, left 右移' if height[left] < height[right] else '右边矮, right 左移'
    print('第' + str(rd) + '轮: left=' + str(left) + ' (高' + str(height[left]) + '), right=' + str(right) + ' (高' + str(height[right]) + '), 水量=' + str(water) + ', ' + move)
    if height[left] < height[right]:
        left += 1
    else:
        right -= 1
    rd += 1
print('两指针相遇, 结束。最大水量 = ' + str(best))
\`\`\`

预期输出（两种语言逐字一致）：

\`\`\`
第1轮: left=0 (高1), right=4 (高5), 水量=4, 左边矮, left 右移
第2轮: left=1 (高8), right=4 (高5), 水量=15, 右边矮, right 左移
第3轮: left=1 (高8), right=3 (高2), 水量=4, 右边矮, right 左移
第4轮: left=1 (高8), right=2 (高6), 水量=6, 右边矮, right 左移
两指针相遇, 结束。最大水量 = 15
\`\`\`

5 根柱子原本有 10 种两两组合，对撞指针只算了 4 次水量——每轮都砍掉「注定更差」的一批，最后一样拿到最大值 15。

### 直觉想法错在哪

最直觉的做法是两层循环：枚举每一对柱子 (i, j)，算出水量取最大。5 根柱子才 10 对，会觉得挺快；n = 10^5 时约有 50 亿对，就超时了。

更关键的是理解双指针「凭什么敢跳」：它不是偷懒少算，而是每移动一次矮板，就**一次性排除了一整批组合**（上面最小例子解释了这批组合为什么注定不优）。所以 O(n) 扫完的结果和暴力完全一致，只是多了一份「哪些组合根本不用看」的论证。

### 常见错误

- **移动条件写反**：盛水题移动了高板。觉得「留下矮的、去找更高板」？恰恰相反——只有换掉矮板，水位才可能升高；移动高板只会让间距白白变小。
- **两端同时移动**：对撞指针一轮只动一端，两端一起动会跳过本该检查的组合。
- **以为双指针都得先排序**：只有「有序数组上找两数关系」这类才要求有序；快慢指针（移动零、判环）与顺序无关。反过来，1. 两数之和不适合排序后用对撞——排序会把原来的下标弄丢。
- **判环时越界**：fast 一次走两步，循环条件必须是 fast 和 fast.next 都存在；只查 fast，会在 fast.next.next 处读到空指针。
- **15. 三数之和忘记去重**：排序后相邻重复值要跳过；找到答案后左右指针还要继续跳过重复值，否则会输出重复三元组。

### 什么时候用

- **对撞指针**：数组有序（或可以先排序），找两个元素满足某种关系（和、差、配对）；或问题围绕「一个区间」，比较两端后能确定排除哪一端（盛水容器、回文判断）。15. 三数之和 = 排序 + 枚举一个数 + 对撞指针找另外两个
- **快慢指针**：原地修改数组（读一个、写一个，如 283. 移动零）；链表判环、找中点（141. 环形链表：快指针走两步、慢指针走一步，有环必会追上，像操场套圈）
- **分离指针**：合并两个**有序**序列（21. 合并两个有序链表），是归并排序的核心一步，每个元素只访问一次，O(n + m)

### 练习路径

- 283. 移动零：先掌握「fast 读 / slow 写」的快慢指针
- 11. 盛最多水的容器：吃透对撞指针「移动矮板」的淘汰逻辑
- 15. 三数之和：练「排序 + 对撞 + 去重」的组合拳
- 141. 环形链表：快慢指针判环，体会操场套圈
- 21. 合并两个有序链表：把分离指针迁移到链表上
`,
};
