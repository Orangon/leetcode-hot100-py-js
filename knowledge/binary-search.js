// 知识文章：二分查找
// 数据格式约定（所有知识文章遵循）：
// - slug: 英文短横线命名，同时是文件名与路由
// - tags: 与题库中题目的 tags 匹配，用于自动关联题目
// - relatedProblems（可选）: 显式指定关联题目 id，优先于 tags 匹配
// - content: Markdown 子集（### 标题、- 列表、``` 代码块、`行内代码`）
export default {
  slug: 'binary-search',
  title: '二分查找',
  intro: '每次砍掉一半搜索范围，前提是有单调性可以判断方向',
  tags: ['二分查找', '数组'],
  relatedProblems: [4, 33, 34, 35, 74, 153],

  content: `
> 提示：读这篇之前，你需要知道数组和下标是什么、会写最基本的 while 循环。没接触过数组的话先读《数组与哈希表》；文中说「O(log n) 很快」是什么意思、快多少，《时间复杂度入门》里有白话解释。

玩过猜数字吗：我心里想一个 1 到 100 的数，你猜 50，我说「小了」，你立刻把 1 到 50 全部排除——根本不用从 1 开始一个个问。二分查找就是这个游戏：每次都猜正中间，每猜一次排除一半。

### 是什么

二分查找（binary search）是在**排好序的数组**里找东西的方法：不从第一个开始翻，而是永远先看**正中间**那个元素。

- 中间的数比目标**小**：目标只可能在右半边，左半边（含中间这个）全部扔掉
- 中间的数比目标**大**：目标只可能在左半边，右半边（含中间这个）全部扔掉
- 中间的数正好**等于**目标：找到了，收工

每看一个元素就扔掉一半，所以 8 个元素最多看 4 次、1024 个最多看 11 次、10 亿个也最多看 30 次。这就是 O(log n) 的含义：元素个数翻一倍，最多只多查一次。

先记住这几个词，后面代码里全靠它们交流：

| 大白话 | 代码里的名字 | 含义 |
| --- | --- | --- |
| 左边界 | \`left\` | 还没被排除的最左下标 |
| 右边界 | \`right\` | 还没被排除的最右下标 |
| 中间位置 | \`mid\` | （左 + 右）除以 2 向下取整，这一步要检查的下标 |
| 排好序 / 单调 | monotonic | 看一眼中间的值，就能判断目标在哪一边 |

最后一条是二分成立的前提。注意它说的是「能判断方向」，不一定是「数组本身有序」——只要能从中间值断定答案在左半边还是右半边，哪怕问题里根本没有现成的有序数组，也能二分（「二分答案」就是这个思路，4. 寻找两个正序数组的中位数是它的巅峰）。

### 一个最小例子

在 [1, 3, 5, 7, 9, 11]（下标 0 到 5）里找 7。每一轮只干三件事：算出 mid、看一眼 nums[mid]、扔掉半边。

| 轮次 | left | right | mid | nums[mid] | 本步判断 | 本步动作 |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | 0 | 5 | 2 | 5 | 5 < 7，目标必在右边 | 扔掉下标 0~2，left 挪到 3 |
| 2 | 3 | 5 | 4 | 9 | 9 > 7，目标必在左边 | 扔掉下标 4~5，right 挪到 3 |
| 3 | 3 | 3 | 3 | 7 | 恰好等于目标 | 返回下标 3，结束 |

6 个元素只看了 3 次。如果从头到尾挨个看，最坏要看 6 次；放大到 10 亿个元素，就是 30 次和 10 亿次的差距。

**为什么 left 要挪到 mid + 1，而不是 mid？** 这是新手栽跟头最多的地方，单独说透：mid 这个位置**刚刚已经看过了，它不是答案**。让 left 停在 mid，等于留着一个已经排除的嫌疑人继续审——轻则白转一圈，重则直接死循环：当区间只剩 2 个元素（right = left + 1）时，向下取整的 mid 恰好等于 left，此时写 \`left = mid\`，left 一步都没挪，区间永远不变，程序卡死。铁律：**看过 mid 之后，mid 必须被排除**，所以一边是 mid + 1，另一边是 mid - 1。

### 模板代码

写法一：「找确切值」。搜索区间是闭区间 [left, right]，两端都还没被排除，命中就把下标还回去。

JavaScript 版本（每行都有注释）：

\`\`\`
// JavaScript
function search(nums, target) {
  let left = 0;                     // 左边界：从数组开头开始
  let right = nums.length - 1;      // 右边界：从数组末尾开始
  while (left <= right) {           // 闭区间：只剩 1 个元素时也要看
    const mid = (left + right) >> 1; // >> 1 就是除以 2 再向下取整
    if (nums[mid] === target) {     // 正中间恰好是目标
      return mid;                   // 直接把下标交出去
    }
    if (nums[mid] < target) {       // 中间的太小 -> 目标在右半边
      left = mid + 1;               // mid 已经排除，+1 跳过它
    } else {                        // 中间的太大 -> 目标在左半边
      right = mid - 1;              // 同理，-1 跳过 mid
    }
  }
  return -1;                        // 区间被掏空了：目标不存在
}
\`\`\`

Python 版本（逻辑一模一样）：

\`\`\`
# Python
def search(nums, target):
    left = 0                    # 左边界：从下标 0 开始
    right = len(nums) - 1       # 右边界：从最后一个下标开始
    while left <= right:        # 闭区间：只剩 1 个元素也要看
        mid = (left + right) // 2  # // 是整除，商自动向下取整
        if nums[mid] == target:    # 正中间恰好是目标
            return mid
        if nums[mid] < target:     # 中间的太小 -> 去右半边
            left = mid + 1         # mid 已排除，+1 跳过
        else:                      # 中间的太大 -> 去左半边
            right = mid - 1
    return -1                   # 区间被掏空了：目标不存在
\`\`\`

写法二：「找边界」，比如找**第一个大于等于 target** 的位置（34 题求左右边界就靠它，这类函数常叫 lowerBound）。循环条件变成 left < right，结束时 left 和 right 重合在那个位置，它就是答案。关键差别：判定成立时令 right = mid——**mid 本身可能就是答案，不能排除它**：

\`\`\`
// JavaScript
function lowerBound(nums, target) {
  let left = 0, right = nums.length;  // right 可以取到 n：表示「全都比 target 小」
  while (left < right) {              // 区间只剩 1 个元素时停下来
    const mid = (left + right) >> 1;
    if (nums[mid] >= target) right = mid;  // mid 可能是答案，留在区间里
    else left = mid + 1;                   // mid 一定不是答案，排除
  }
  return left;                        // 循环结束 left === right，就是答案
}
\`\`\`

\`\`\`
# Python
def lower_bound(nums, target):
    left, right = 0, len(nums)   # right 可以取到 n：表示「全都比 target 小」
    while left < right:          # 区间只剩 1 个元素时停下来
        mid = (left + right) // 2
        if nums[mid] >= target:
            right = mid          # mid 可能是答案，留在区间里
        else:
            left = mid + 1       # mid 一定不是答案，排除
    return left                  # 循环结束 left == right，就是答案
\`\`\`

> 注意：写法二里**绝对不能写 left = mid**。区间只剩 2 个元素时，向下取整的 mid 恰好等于 left，left 原地不动，死循环。口诀：right 可以等于 mid（它可能是答案），left 永远是 mid + 1。两套模板别混着改，选中一套背熟。

### 亲手跑一跑

下面两段代码做同一件事：在 [1, 3, 5, 7, 9, 11] 里找 7，并将每一轮的 left、right、mid 和扔掉了哪半边全部打印出来。对照上面的表格运行一遍，亲眼看着区间一轮轮缩小。

\`\`\`run-js#binary-search-walkthrough
const nums = [1, 3, 5, 7, 9, 11];
const target = 7;
let left = 0, right = nums.length - 1;
while (left <= right) {
  const mid = (left + right) >> 1;
  console.log('区间 [' + left + ',' + right + ']  mid=' + mid + '  nums[mid]=' + nums[mid]);
  if (nums[mid] === target) {
    console.log('命中！目标 7 在下标 ' + mid);
    break;
  } else if (nums[mid] < target) {
    console.log('  ' + nums[mid] + ' < ' + target + '，左半边全扔掉，left 改为 ' + (mid + 1));
    left = mid + 1;
  } else {
    console.log('  ' + nums[mid] + ' > ' + target + '，右半边全扔掉，right 改为 ' + (mid - 1));
    right = mid - 1;
  }
}
\`\`\`

实际运行输出：

\`\`\`
区间 [0,5]  mid=2  nums[mid]=5
  5 < 7，左半边全扔掉，left 改为 3
区间 [3,5]  mid=4  nums[mid]=9
  9 > 7，右半边全扔掉，right 改为 3
区间 [3,3]  mid=3  nums[mid]=7
命中！目标 7 在下标 3
\`\`\`

\`\`\`run-py#binary-search-walkthrough
nums = [1, 3, 5, 7, 9, 11]
target = 7
left, right = 0, len(nums) - 1
while left <= right:
    mid = (left + right) // 2
    print(f'区间 [{left},{right}]  mid={mid}  nums[mid]={nums[mid]}')
    if nums[mid] == target:
        print(f'命中！目标 7 在下标 {mid}')
        break
    elif nums[mid] < target:
        print(f'  {nums[mid]} < {target}，左半边全扔掉，left 改为 {mid + 1}')
        left = mid + 1
    else:
        print(f'  {nums[mid]} > {target}，右半边全扔掉，right 改为 {mid - 1}')
        right = mid - 1
\`\`\`

实际运行输出：

\`\`\`
区间 [0,5]  mid=2  nums[mid]=5
  5 < 7，左半边全扔掉，left 改为 3
区间 [3,5]  mid=4  nums[mid]=9
  9 > 7，右半边全扔掉，right 改为 3
区间 [3,3]  mid=3  nums[mid]=7
命中！目标 7 在下标 3
\`\`\`

可以改一改 target 再跑，比如找 4（不存在）：你会看到 left 和 right 交错而过、循环结束什么都没返回，这就是「找不到」时区间被掏空的样子。

### 直觉想法错在哪

零基础的第一反应几乎是：「从第一个开始，一个个往后看，看到为止」。这个做法没错、也能得到答案，它叫线性查找，最坏要看完整个数组。问题在于它**完全没有利用「数组有序」这个信息**——好比在词典里查字却从第一页逐页翻。数组既然排好序，每看一个元素不仅能判断它本身，还能一次性宣判半边元素的死刑，这就是二分快的根源。

第二个直觉是：「知道要砍一半了，那排除时把 mid 留下写 left = mid 吧」。错在哪前面已经说透：mid 看过就不是嫌疑人了，留着它区间缩不动，剩两个元素时死循环。

第三个直觉：「二分听起来高级，什么数组都能用」。不行，乱序数组里看一眼中间的数，你无法断定目标在哪一边，左右都得找，退化成全线搜索。单调性是门票。

### 常见错误

- **left = mid 忘加 1**：上面反复说的死循环来源。容易犯是因为心里想的是「目标在右半边，从 mid 开始看」，没有意识到 mid 已经被审过了
- **mid 没有取整**：JS 里写 (left + right) / 2 会得到 2.5 这样的小数，拿小数当下标得到 undefined；要用 >> 1 或 Math.floor。Python 用 //。容易犯是因为数学上中点确实可能带小数，但数组下标必须是整数
- **数组没排序就二分**：题目给的数据不保证有序时先排序或干脆别用二分。容易犯是因为记住了「二分快」，忘了它的前提
- **找到与否混淆**：写法二（lowerBound）结束后 left 位置很可能是别的数甚至越界，用它当答案前要检查 nums[left] 是否真等于 target。容易犯是因为「left 落在了那里」看起来像「找到了」
- **两套模板混用**：while (left <= right) 配 right = mid、while (left < right) 配 left = mid，都会死循环。容易犯是因为两套长得像，抄的时候各抄了一半

### 什么时候用

以下信号出现就想到二分：

- 在**有序数组**里找值、找插入位置：35 搜索插入位置、34 找左右边界
- 数组「部分有序」：33、153 旋转排序数组——一刀切下去至少有一半有序，每次判断哪半有序就能定向排除
- 二维有序矩阵（74）：可以拉平看成一维有序数组
- **二分答案**：答案本身单调可判定（猜小了处处不行、猜大了处处可行）时，直接在答案的取值范围上二分。4 寻找两个正序数组的中位数是这类题的巅峰，初学知道有这个武器即可，不要求默写
- 题目数据范围巨大（10⁵ 以上）且要求 O(log n) 或 O(n log n)：往往暗示二分或排序后二分

### 练习路径

35 搜索插入位置（把写法一默写到肌肉记忆，体会「找不到时 left 停在哪」）→ 34 找左右边界（写法二 lowerBound 的实战，学会返回前验证）→ 153 旋转数组最小值（拿数组两端当参照物判断方向）→ 33 旋转数组查找（每轮先判断哪一半有序）→ 74 搜索二维矩阵（一维思维解决二维问题）→ 最后挑战 4 二分答案（看懂思路就是胜利）。
`,
};
