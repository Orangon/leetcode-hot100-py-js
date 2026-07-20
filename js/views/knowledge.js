// 知识补充列表页：按主题分类的基础知识文章（按推荐学习顺序排列）

import { articles } from '../../knowledge/index.js';
import { problems } from '../../problems/index.js';
import { getDraft, getMistakes, problemStatus } from '../store.js';
import { topbarHtml } from './topbar.js';

const STATUS_LABEL = { unread: '未读', studying: '学习中', completed: '已完成' };
const DEFAULT_RELATIONS = {
  'sliding-window': [
    { id: 3, stage: 'core', reason: '可变窗口求最长的入门模板' },
    { id: 438, stage: 'practice', reason: '固定长度窗口与字符计数' },
    { id: 76, stage: 'practice', reason: '可变窗口求最短的进阶题' },
  ],
  'stack-queue': [
    { id: 20, stage: 'core', reason: '基础栈与括号匹配' },
    { id: 739, stage: 'core', reason: '单调栈的标准模板' },
    { id: 239, stage: 'practice', reason: '单调队列维护窗口最值' },
    { id: 155, stage: 'practice', reason: '带辅助状态的栈设计' },
  ],
};

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function getKnowledgeStatus(slug) {
  const saved = getDraft(`knowledge:${slug}`, 'article', 'state');
  return saved === 'studying' || saved === 'completed' ? saved : 'unread';
}

// 显式关联始终置顶；旧数字数组视为 core，新对象还可携带 stage/reason。
// 标签匹配只做补充，并按题号去重，避免显式核心题被重复展示。
export function relatedProblems(article) {
  const seen = new Set();
  const related = [];
  const explicit = Array.isArray(article.relatedProblems) ? article.relatedProblems : (DEFAULT_RELATIONS[article.slug] || []);
  for (const entry of explicit) {
    const relation = typeof entry === 'number' ? { id: entry, stage: 'core', reason: '' } : entry;
    const id = Number(relation?.id);
    const problem = problems.find((item) => item.id === id);
    if (!problem || seen.has(id)) continue;
    seen.add(id);
    related.push({ ...problem, relationStage: relation.stage || 'core', relationReason: relation.reason || '' });
  }
  for (const problem of problems) {
    if (seen.has(problem.id)) continue;
    const matchedTags = problem.tags.filter((tag) => article.tags.includes(tag));
    if (!matchedTags.length) continue;
    seen.add(problem.id);
    related.push({
      ...problem,
      relationStage: 'supplement',
      relationReason: `标签补充：${matchedTags.join('、')}`,
    });
  }
  return related;
}

export function renderKnowledge(container) {
  const mistakes = getMistakes();
  container.innerHTML = `
    ${topbarHtml('knowledge')}
    <div class="mistakes-head">
      <h2>知识补充</h2>
    </div>
    <p class="knowledge-intro">按推荐顺序学习：每一步讲清「是什么、什么时候用、怎么写」。运行示例可编辑、预测并保存草稿，读完文章后再用关联题巩固。</p>
    <div class="kgrid">
      ${articles
        .map((article, index) => {
          const related = relatedProblems(article);
          const solved = related.filter((problem) => problemStatus(problem.id) === 'solved').length;
          const mistakeCount = related.filter((problem) => mistakes[problem.id]).length;
          const status = getKnowledgeStatus(article.slug);
          return `
        <a class="kcard" href="#/knowledge/${escapeHtml(article.slug)}">
          ${mistakeCount ? `<span class="kcard-mistakes">关联错题 ${mistakeCount}</span>` : ''}
          <div class="kcard-step">第 ${index + 1} 步 · ${STATUS_LABEL[status]}</div>
          <div class="kcard-title">${escapeHtml(article.title)}</div>
          <div class="kcard-intro">${escapeHtml(article.intro)}</div>
          <div class="kcard-tags">
            ${article.tags.map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join('')}
            <span class="kcard-count">${related.length ? `关联题 ${solved}/${related.length}` : '基础知识'}</span>
          </div>
        </a>`;
        })
        .join('')}
    </div>
    <div class="footer-tip">核心题显式置顶，标签匹配题作为补充并自动去重</div>
  `;
  return () => {};
}
