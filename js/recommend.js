// 确定性的每日推荐（纯函数，同一天和同一状态得到相同结果）

function dayKey(at) {
  return new Date(at).toISOString().slice(0, 10);
}

function hash(text) {
  let value = 2166136261;
  for (let i = 0; i < text.length; i++) {
    value ^= text.charCodeAt(i);
    value = Math.imul(value, 16777619);
  }
  return value >>> 0;
}

// 推荐理由文案：列表页「今日任务」行内小徽章使用。
export const RECOMMEND_REASONS = {
  review: '到期复习',
  mistake: '错题重练',
  assisted: '曾借助·建议独立重做',
  new: '新题',
};

// 与 recommendToday 同一套排序，但每题附带推荐理由（review/mistake/assisted/new）。
export function recommendTodayDetailed(problemIds, learning, { at = Date.now(), limit = 3 } = {}) {
  const date = dayKey(at);
  const problems = learning && learning.problems ? learning.problems : {};
  const unique = [...new Set((problemIds || []).map(String))];
  return unique.map(id => {
    const p = problems[id];
    let priority = 1;
    let reason = 'new';
    if (p && p.review && p.review.dueAt && p.review.dueAt <= at) { priority = 0; reason = 'review'; }
    else if (p && p.mistake) { priority = 1; reason = 'mistake'; }
    else if (p && p.mastery === 'assisted') { priority = 2; reason = 'assisted'; }
    else if (p && p.mastery === 'independent') priority = 4;
    else if (p && p.rounds > 0) priority = 2;
    return { id, priority, reason, order: hash(`${date}:${id}`) };
  }).sort((a, b) => a.priority - b.priority || a.order - b.order || a.id.localeCompare(b.id))
    .slice(0, Math.max(0, limit))
    .map(item => ({ id: item.id, reason: item.reason }));
}

export function recommendToday(problemIds, learning, options = {}) {
  return recommendTodayDetailed(problemIds, learning, options).map(item => item.id);
}
