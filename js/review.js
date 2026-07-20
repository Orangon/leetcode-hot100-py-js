// 间隔复习规则（纯函数）：首次次日，随后第 3 天、第 7 天。

export const REVIEW_INTERVAL_DAYS = [1, 3, 7];
const DAY = 24 * 60 * 60 * 1000;

export function scheduleFirstReview(at = Date.now()) {
  return { stage: 0, dueAt: at + REVIEW_INTERVAL_DAYS[0] * DAY, lastReviewedAt: 0 };
}

export function recordReview(review, passed, at = Date.now()) {
  if (!review || typeof review !== 'object') review = scheduleFirstReview(at);
  if (!passed) return { stage: 0, dueAt: at + DAY, lastReviewedAt: at };
  const stage = Math.min(3, (Number.isInteger(review.stage) ? review.stage : 0) + 1);
  return {
    stage,
    dueAt: stage >= REVIEW_INTERVAL_DAYS.length ? 0 : at + REVIEW_INTERVAL_DAYS[stage] * DAY,
    lastReviewedAt: at,
  };
}

export function isReviewDue(review, at = Date.now()) {
  return Boolean(review && review.dueAt > 0 && review.dueAt <= at);
}
