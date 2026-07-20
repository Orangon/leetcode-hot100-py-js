import assert from 'node:assert/strict';
import { articles, loadArticle } from '../knowledge/index.js';
import { allTags, loadProblem, problems } from '../problems/index.js';

assert.ok(problems.length > 0);
assert.ok(articles.length > 0);
assert.deepEqual(problems.map((problem) => problem.id), [...problems.map((problem) => problem.id)].sort((a, b) => a - b));
assert.equal(new Set(problems.map((problem) => problem.id)).size, problems.length);
assert.equal(new Set(problems.map((problem) => problem.slug)).size, problems.length);
assert.equal(new Set(articles.map((article) => article.slug)).size, articles.length);
assert.deepEqual(allTags, [...new Set(problems.flatMap((problem) => problem.tags))].sort());

for (const metadata of problems) {
  assert.deepEqual(Object.keys(metadata), ['id', 'title', 'slug', 'difficulty', 'tags']);
  const full = await loadProblem(metadata.id);
  assert.equal(full.id, metadata.id);
  assert.equal(full.slug, metadata.slug);
  assert.ok(full.description && full.templates && full.tests);
}

for (const metadata of articles) {
  assert.ok(!Object.hasOwn(metadata, 'content'));
  const full = await loadArticle(metadata.slug);
  assert.equal(full.slug, metadata.slug);
  assert.ok(full.content);
}

await assert.rejects(() => loadProblem(-1), /题目不存在/);
await assert.rejects(() => loadArticle('not-found'), /知识文章不存在/);
console.log(`manifest 导入验证通过：${problems.length} 道题，${articles.length} 篇文章`);
