// 共享顶栏：品牌 + 导航（题库 / 错题集）

import { getLearningState, getMistakes } from '../store.js';
import { isReviewDue } from '../review.js';

export function topbarHtml(active) {
  const mistakes = getMistakes();
  const learning = getLearningState();
  const now = Date.now();
  // 徽标只统计错题集中已到复习时间（已逾期 + 今日到期）的题目数。
  const dueCount = Object.keys(mistakes).filter((id) =>
    isReviewDue(learning.problems[String(id)]?.review, now)
  ).length;
  const current = (name) => (active === name ? ' aria-current="page"' : '');
  return `
    <header class="topbar">
      <div class="brand"><a href="#/" aria-label="LeetCode Hot 100 题库首页">LeetCode Hot 100</a></div>
      <nav class="nav" aria-label="主导航">
        <a href="#/" class="${active === 'list' ? 'active' : ''}"${current('list')}>题库</a>
        <a href="#/mistakes" class="${active === 'mistakes' ? 'active' : ''}"${current('mistakes')}>错题集${dueCount ? ` (${dueCount} 待复习)` : ''}</a>
        <a href="#/knowledge" class="${active === 'knowledge' ? 'active' : ''}"${current('knowledge')}>知识补充</a>
      </nav>
    </header>`;
}
