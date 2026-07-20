// 错题集页面：按复习进度整理错题，并支持记录、复习与批量移除。

import { problems } from '../../problems/index.js';
import { articles } from '../../knowledge/index.js';
import {
  getLearningState,
  getMistakes,
  problemStatus,
  recordProblemReview,
  removeMistake,
  updateMistakeDetails,
} from '../store.js';
import { isReviewDue } from '../review.js';
import { topbarHtml } from './topbar.js';

const DIFF_LABEL = { easy: '简单', medium: '中等', hard: '困难' };
const MODE_LABEL = { core: '核心模式', acm: 'ACM 模式' };
const GROUPS = [
  { id: 'overdue', label: '已逾期' },
  { id: 'today', label: '今日复习' },
  { id: 'future', label: '未来复习' },
  { id: 'mastered', label: '已掌握' },
];
// 与做题页约定：「开始复习」写入该组 id 序列，再跳第一题。
const REVIEW_QUEUE_KEY = 'hot100_review_queue';

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function fmtTime(ts) {
  const d = new Date(ts);
  if (!Number.isFinite(d.getTime())) return '时间未知';
  const p = (n) => String(n).padStart(2, '0');
  return `${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}`;
}

function groupForReview(review, now, todayStart, tomorrowStart) {
  if (review && (review.stage >= 3 || (review.dueAt === 0 && review.lastReviewedAt > 0))) return 'mastered';
  if (!review || !review.dueAt) return 'today';
  if (isReviewDue(review, now) && review.dueAt < todayStart) return 'overdue';
  if (review.dueAt < tomorrowStart) return 'today';
  return 'future';
}

function reviewText(review) {
  if (!review || !review.dueAt) return '待开始复习';
  if (review.stage >= 3 || review.dueAt === 0) return '三轮复习已完成';
  return `复习进度 ${review.stage}/3 · 下次 ${fmtTime(review.dueAt)}`;
}

// 复用知识页的标签匹配思路：按题目标签与文章标签的交集取匹配最多的一篇（并列取推荐学习顺序靠前的一篇）。
function relatedArticle(p) {
  let best = null;
  let bestCount = 0;
  for (const article of articles) {
    const count = p.tags.filter((tag) => article.tags.includes(tag)).length;
    if (count > bestCount) {
      best = article;
      bestCount = count;
    }
  }
  return best;
}

export function renderMistakes(container) {
  const selectedIds = new Set();
  let liveTimer = 0;
  let lastGroupIds = {};

  function itemHtml({ p, m, learning }, groupId) {
    const st = problemStatus(p.id);
    const statusIcon =
      st === 'solved' ? '<span class="solved">✓</span>' : st === 'attempted' ? '<span class="attempted">◐</span>' : '';
    const mode = MODE_LABEL[m.lastMode];
    const meta = m.fails > 0
      ? `做错 ${m.fails} 次${mode ? ` · ${mode}` : ''} · ${fmtTime(m.addedAt)}`
      : `手动收录 · ${fmtTime(m.addedAt)}`;
    const mistake = learning.mistake || { reason: '', note: '' };
    const reason = (mistake.reason || '').trim();
    const noteLine = (mistake.note || '').split('\n').map((line) => line.trim()).find(Boolean) || '';
    const article = relatedArticle(p);
    const checked = selectedIds.has(p.id) ? ' checked' : '';
    const actions = groupId === 'mastered'
      ? `<button class="btn small" type="button" data-remove="${p.id}">移出错题集</button>`
      : `<button class="btn small" type="button" data-review="pass" data-pid="${p.id}">复习通过</button>
        <button class="btn small" type="button" data-review="fail" data-pid="${p.id}">复习未通过</button>
        <button class="btn small" type="button" data-remove="${p.id}">移除</button>`;

    return `
      <div class="plist-row" data-pid="${p.id}" tabindex="0" aria-label="打开题目 ${escapeHtml(p.title)}">
        <input type="checkbox" data-select="${p.id}" aria-label="选择 ${escapeHtml(p.title)}"${checked}>
        <div class="status">${statusIcon}</div>
        <div class="pid">${p.id}</div>
        <div class="ptitle"><a href="#/problem/${p.id}">${escapeHtml(p.title)}</a></div>
        <div class="mistake-meta">${escapeHtml(meta)}<br>${escapeHtml(reviewText(learning.review))}${
          reason ? `<br><span class="mistake-reason" title="失败原因">${escapeHtml(reason)}</span>` : ''
        }${
          noteLine ? `<br><span class="mistake-note" title="复习笔记">${escapeHtml(noteLine)}</span>` : ''
        }${
          article ? `<br><span class="mistake-related">相关知识点：<a href="#/knowledge/${escapeHtml(article.slug)}">${escapeHtml(article.title)}</a></span>` : ''
        }</div>
        <div class="row-tags">${p.tags.map((t) => `<span class="tag">${escapeHtml(t)}</span>`).join('')}</div>
        <div class="diff ${p.difficulty}">${DIFF_LABEL[p.difficulty]}</div>
        ${actions}
      </div>
      <details class="custom-test" data-editor="${p.id}">
        <summary>编辑失败原因与笔记</summary>
        <form data-details-form="${p.id}">
          <label for="mistake-reason-${p.id}">失败原因</label>
          <textarea id="mistake-reason-${p.id}" name="reason" rows="2">${escapeHtml(mistake.reason)}</textarea>
          <label for="mistake-note-${p.id}">复习笔记</label>
          <textarea id="mistake-note-${p.id}" name="note" rows="3">${escapeHtml(mistake.note)}</textarea>
          <div class="custom-actions">
            <button class="btn small" type="submit" data-save="${p.id}">保存记录</button>
          </div>
        </form>
      </details>`;
  }

  function render({ focusPid = null, focusAction = '', focusHeading = false, openEditorPid = null, message = '' } = {}) {
    const mistakes = getMistakes();
    const state = getLearningState();
    const now = Date.now();
    const today = new Date(now);
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();
    const tomorrowStart = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1).getTime();
    const grouped = Object.fromEntries(GROUPS.map(({ id }) => [id, []]));
    const items = problems
      .filter((p) => mistakes[p.id])
      .map((p) => ({
        p,
        m: mistakes[p.id],
        learning: state.problems[String(p.id)] || { mistake: null, review: null },
      }));

    items.forEach((item) => {
      grouped[groupForReview(item.learning.review, now, todayStart, tomorrowStart)].push(item);
    });
    GROUPS.forEach(({ id }) => grouped[id].sort((a, b) => {
      const aDue = a.learning.review?.dueAt || 0;
      const bDue = b.learning.review?.dueAt || 0;
      return aDue - bDue || b.m.addedAt - a.m.addedAt;
    }));
    lastGroupIds = Object.fromEntries(GROUPS.map(({ id }) => [id, grouped[id].map((item) => item.p.id)]));

    for (const id of [...selectedIds]) {
      if (!mistakes[id]) selectedIds.delete(id);
    }

    container.innerHTML = `
      ${topbarHtml('mistakes')}
      <div class="mistakes-head">
        <h2 id="mistakes-title" tabindex="-1">错题集（${items.length}）</h2>
        <button class="btn" type="button" id="remove-selected"${selectedIds.size ? '' : ' disabled'}>
          删除选中（${selectedIds.size}）
        </button>
      </div>
      <div class="mistakes-summary">已逾期 ${grouped.overdue.length} · 今日 ${grouped.today.length} · 未来 ${grouped.future.length} · 已掌握 ${grouped.mastered.length}</div>
      <div id="mistakes-live" class="footer-tip" role="status" aria-live="polite" aria-atomic="true"></div>
      ${
        items.length === 0
          ? '<div class="plist"><div class="empty-tip">错题集是空的。判题未通过的题目会自动收录到这里，也可以在题目页手动加入。</div></div>'
          : GROUPS.map(({ id, label }) => `
              <section class="pgroup" aria-labelledby="mistake-group-${id}">
                <div class="pgroup-head">
                  <span class="pgroup-name" id="mistake-group-${id}">${label}</span>
                  <span class="pgroup-count">${grouped[id].length} 题</span>
                  ${
                    (id === 'overdue' || id === 'today') && grouped[id].length
                      ? `<button class="btn small primary" type="button" data-review-group="${id}">开始复习（${grouped[id].length} 题）</button>`
                      : ''
                  }
                </div>
                <div class="pgroup-body">
                  ${grouped[id].length ? grouped[id].map((item) => itemHtml(item, id)).join('') : '<div class="empty-tip">暂无题目</div>'}
                </div>
              </section>`).join('')
      }
      <div class="footer-tip">复习未通过会在明天再次安排；连续完成三轮后进入“已掌握”。</div>
    `;

    if (openEditorPid !== null) {
      const editor = container.querySelector(`[data-editor="${openEditorPid}"]`);
      if (editor) editor.open = true;
    }

    let focusTarget = null;
    if (focusPid !== null) {
      const row = container.querySelector(`.plist-row[data-pid="${focusPid}"]`);
      if (row) {
        focusTarget = focusAction ? row.querySelector(`[data-${focusAction}]`) : row;
      }
      if (!focusTarget && focusAction === 'save') {
        focusTarget = container.querySelector(`[data-save="${focusPid}"]`);
      }
    }
    if (!focusTarget && (focusPid !== null || focusHeading)) focusTarget = container.querySelector('#mistakes-title');
    if (focusTarget) focusTarget.focus();

    if (message) {
      clearTimeout(liveTimer);
      liveTimer = setTimeout(() => {
        const live = container.querySelector('#mistakes-live');
        if (live) live.textContent = message;
      }, 0);
    }
  }

  function announce(message) {
    const live = container.querySelector('#mistakes-live');
    if (!live) return;
    live.textContent = '';
    clearTimeout(liveTimer);
    liveTimer = setTimeout(() => {
      const current = container.querySelector('#mistakes-live');
      if (current) current.textContent = message;
    }, 0);
  }

  function nextFocusId(problemId) {
    const rows = [...container.querySelectorAll('.plist-row')];
    const index = rows.findIndex((row) => Number(row.dataset.pid) === problemId);
    const next = rows[index + 1] || rows[index - 1];
    return next ? Number(next.dataset.pid) : null;
  }

  function onClick(event) {
    const reviewGroupButton = event.target.closest('[data-review-group]');
    if (reviewGroupButton) {
      const ids = lastGroupIds[reviewGroupButton.dataset.reviewGroup] || [];
      if (!ids.length) return;
      try {
        sessionStorage.setItem(REVIEW_QUEUE_KEY, JSON.stringify(ids));
      } catch {
        // sessionStorage 不可用时静默跳过，不影响跳转
      }
      location.hash = `#/problem/${ids[0]}`;
      return;
    }

    const removeButton = event.target.closest('[data-remove]');
    if (removeButton) {
      const problemId = Number(removeButton.dataset.remove);
      const problem = problems.find((item) => item.id === problemId);
      if (!confirm(`确定从错题集中移除“${problem?.title || problemId}”吗？`)) return;
      const focusPid = nextFocusId(problemId);
      const result = removeMistake(problemId);
      if (!result.ok) {
        announce(`移除失败：${result.error.message}`);
        return;
      }
      selectedIds.delete(problemId);
      render({ focusPid, focusAction: 'remove', focusHeading: focusPid === null, message: '已从错题集中移除。' });
      return;
    }

    const reviewButton = event.target.closest('[data-review]');
    if (reviewButton) {
      const problemId = Number(reviewButton.dataset.pid);
      const passed = reviewButton.dataset.review === 'pass';
      const result = recordProblemReview(problemId, passed);
      if (!result.ok) {
        announce(`复习记录失败：${result.error.message}`);
        return;
      }
      render({
        focusPid: problemId,
        focusAction: `review="${reviewButton.dataset.review}"`,
        message: passed ? '已记录复习通过，并更新下次复习时间。' : '已记录复习未通过，明天将再次复习。',
      });
      return;
    }

    const batchButton = event.target.closest('#remove-selected');
    if (batchButton && selectedIds.size) {
      const ids = [...selectedIds];
      if (!confirm(`确定从错题集中删除选中的 ${ids.length} 题吗？`)) return;
      let removed = 0;
      let error = null;
      for (const problemId of ids) {
        const result = removeMistake(problemId);
        if (!result.ok) {
          error = result.error;
          break;
        }
        selectedIds.delete(problemId);
        removed += 1;
      }
      render({
        focusHeading: true,
        message: error ? `已删除 ${removed} 题，随后删除失败：${error.message}` : `已删除选中的 ${removed} 题。`,
      });
      return;
    }

    if (event.target.closest('a, button, input, textarea, label, select, form, summary, details')) return;
    const row = event.target.closest('.plist-row');
    if (row) location.hash = `#/problem/${row.dataset.pid}`;
  }

  function onSubmit(event) {
    const form = event.target.closest('[data-details-form]');
    if (!form) return;
    event.preventDefault();
    const problemId = Number(form.dataset.detailsForm);
    const data = new FormData(form);
    const result = updateMistakeDetails(problemId, {
      reason: data.get('reason') || '',
      note: data.get('note') || '',
    });
    if (!result.ok) {
      announce(`保存失败：${result.error.message}`);
      return;
    }
    announce('失败原因与复习笔记已保存。');
  }

  function onChange(event) {
    const checkbox = event.target.closest('[data-select]');
    if (!checkbox) return;
    const problemId = Number(checkbox.dataset.select);
    if (checkbox.checked) selectedIds.add(problemId);
    else selectedIds.delete(problemId);
    const button = container.querySelector('#remove-selected');
    if (button) {
      button.disabled = selectedIds.size === 0;
      button.textContent = `删除选中（${selectedIds.size}）`;
    }
  }

  function onKeydown(event) {
    if (event.key !== 'Enter' || event.target !== event.target.closest('.plist-row')) return;
    location.hash = `#/problem/${event.target.dataset.pid}`;
  }

  render();
  container.addEventListener('click', onClick);
  container.addEventListener('submit', onSubmit);
  container.addEventListener('change', onChange);
  container.addEventListener('keydown', onKeydown);

  return () => {
    clearTimeout(liveTimer);
    container.removeEventListener('click', onClick);
    container.removeEventListener('submit', onSubmit);
    container.removeEventListener('change', onChange);
    container.removeEventListener('keydown', onKeydown);
  };
}
