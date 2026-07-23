# AGENTS.md — LeetCode Hot 100（本地刷题应用）

纯静态单页应用：100 道 LeetCode Hot 100 题目，支持核心代码 / ACM 双模式判题（Python + JavaScript）、错题复习、知识文章、AI 助手。**无构建、无运行时依赖**（`package.json` 无 dependencies），整个文件夹拷贝即用。

## 目录结构

- `index.html` — 单页入口，以 ES Module 方式加载 `js/app.js`（hash 路由）。
- `js/` — 浏览器端运行时：`app.js`(路由/主题)、`judge.js`(浏览器内判题)、`judge-contract.js`(判题配额与纯校验函数，runtime 与 validate 共享)、`compare.js`(结果/输出比对)、`editor.js`(Monaco)、`store.js`(localStorage)、`assistant.js`(AI)、`learning.js`/`recommend.js`/`review.js`。
  - `js/views/` — 路由视图：`list`、`problem`、`mistakes`、`knowledge`、`knowledgeDetail`、`assistant`、`topbar`。
- `problems/` — 100 道题目文件 `pNNN-slug.js`（每个 `export default` 一个题目对象）+ **生成**的 `index.js`（manifest + 懒加载器）。
- `knowledge/` — 13 篇知识文章 + **生成**的 `index.js`。
- `tools/` — Node 脚本（`.mjs`，仅用标准库）：`generate-manifests.mjs`、`validate.mjs`、`test-manifests.mjs`、`validation-runtime.mjs`、`serve.mjs`(静态服务器)、`cors-proxy.mjs`(AI 助手跨域代理)。
- `css/` — 样式（`style.css` + `views-extras.css`）。
- `tests/`、`**/*.test.mjs` — `node:test` 单元测试。
- `vendor/` — **gitignore 排除**，自托管的 Monaco(~13MB) 与 Pyodide(~12MB)；缺失时回退 CDN（需联网）。

## 常用命令

```bash
npm test                 # manifest 检查 + node:test 单测 + 100 题四套参考答案全量校验（CI 入口）
npm run generate         # 重新生成 problems/index.js 与 knowledge/index.js
npm run check:manifests  # 仅校验 manifest 是否最新（不改写）+ test-manifests
npm run test:node        # node --test（运行所有 *.test.mjs）
npm run validate         # 校验题目 schema 并跑通所有四套参考答案
npm run validate -- problems/p002-add-two-numbers.js   # 只校验指定题目
bash start.sh            # 启动本地服务器（自选端口 8931–8951，优先 python3，回退 node tools/serve.js）
node tools/serve.js 8931 # 手动指定端口启动
node tools/cors-proxy.mjs# AI 助手跨域代理（仅 127.0.0.1:8966）
```

`npm test` 依赖本机有 `python3`（validate.mjs 调它跑 Python 参考答案与模板语法检查）。

## 关键架构边界（改这些前必读）

- **`problems/index.js`、`knowledge/index.js` 是生成产物，禁止手改。** 新增/修改题目或文章后必须 `npm run generate`；CI 会用 `--check` 断言它们为最新。
- **`tools/validate.mjs` 有硬性基线**：恰好 100 道题、core 用例 ≥960、ACM 用例 ≥960。新增题目要同步保持计数。
- **题目 schema 严格**（见 `validate.mjs` 的 `checkSchema`）：必填 `id/title/slug/description/idea/explanation/difficulty/tags/hints/compare/tests/acmTests/templates/solutions`；`hints` 恰好 4 条、每条 ≥8 字且含中文；`compare ∈ {exact, sortedArray, multiset, nestedMultiset, anyOf, balancedBst}`；`templates` 与 `solutions` 各需 `core`/`acm` × `javascript`/`python` 四套，且四套答案必须**各自跑通自己的全部用例**。文件名必须匹配 `pNNN-slug.js`。
- **链表/二叉树/特殊结构题**用 `argSpec`（kind: `list`/`cycleList`/`tree`/`treeNode`/`listArray`/`intersectLists`/`randomList`/`skip`/`plain`）+ `resultKind` + 可选 `judgeContract`（`preserveRandomListArg`/`deepCopyRandomListArg`/`returnNodeFromTreeArg`）。改判定逻辑时务必让 `js/compare.js`、`js/judge.js`、`tools/validate.mjs`、`tools/validation-runtime.mjs` 保持一致（构造/序列化逻辑在各处各有一份）。
- **知识文章必须含可运行示例**：`\`\`\`run-js#id` 与 `\`\`\`run-py#id` 围栏，同一 `id` 要 JS+Python 各一份，且 `id` 全库唯一；`relatedProblems` 引用的题号必须存在。
- **设计题**（如 LRU/最小栈/Trie）：置 `design: true` + `className`，用例为 `ops/params/expected`，且首条操作必须是构造、期望 `null`。
- **判题资源配额**集中在 `js/judge-contract.js` 的 `JUDGE_LIMITS`（代码/输入/输出/返回结构大小、深度、节点数）；改配额只动这里。

## 约定

- **必须通过本地 HTTP 服务器访问**，不能直接双击 `index.html`（ES Module + Worker 在 `file://` 下失效）。
- ESM 全栈：浏览器侧用 `.js` + `<script type="module">`；Node 工具/测试用 `.mjs`。`package.json` 已设 `"type": "module"`。
- 无打包器/转译：代码需在常青浏览器与裸 Node 下直接运行，不要引入需编译的依赖。
- **零运行时依赖**：工具只允许用 Node 标准库；新增功能尽量保持无依赖。
- UI 文案、注释、题目描述均用**中文**；注释风格偏详细（数据格式、算法思路）。
- **客户端状态全部存浏览器 localStorage**，统一前缀 `hot100_*` 且带版本号（见 `js/store.js` 顶部常量，如 `hot100_progress_v1`）。不随文件夹迁移，靠应用内「导出/导入备份」；API Key 不进备份。
- 运行时 Monaco 来自 `vendor/monaco`（回退 CDN 后再降级为 `<textarea>`），Python 判题来自 `vendor/pyodide`（回退 CDN）。
- 主题：`<html data-theme="light|dark">`，亮/暗色靠 CSS 切换；主题键 `hot100_theme_v1` 在首屏同步写入避免闪烁。

## 文档

改动涉及授权/许可时先看：`README.md`（功能与启动）、`LICENSE`（MIT，项目自有代码）、`THIRD-PARTY-NOTICES.md`（vendor 内 Monaco / Pyodide 许可）。
