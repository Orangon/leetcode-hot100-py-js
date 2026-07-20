// 版本化学习模型（纯函数，不直接访问浏览器存储）

export const LEARNING_VERSION = 2;
export const MAX_HISTORY = 50;

export function emptyLearningState() {
  return { version: LEARNING_VERSION, revision: 0, problems: {} };
}

function finiteTime(value, fallback = 0) {
  return Number.isFinite(value) && value >= 0 ? value : fallback;
}

function normalizeMode(value = {}) {
  return {
    solved: Boolean(value.solved),
    attempts: Number.isInteger(value.attempts) && value.attempts >= 0 ? value.attempts : 0,
  };
}

export function normalizeLearningState(value) {
  const state = emptyLearningState();
  if (!value || value.version !== LEARNING_VERSION || !value.problems || typeof value.problems !== 'object') return state;
  state.revision = Number.isInteger(value.revision) && value.revision >= 0 ? value.revision : 0;
  for (const [id, raw] of Object.entries(value.problems)) {
    if (!raw || typeof raw !== 'object') continue;
    const history = Array.isArray(raw.history) ? raw.history.filter(item => item && typeof item === 'object').slice(-MAX_HISTORY) : [];
    state.problems[id] = {
      modes: {
        core: normalizeMode(raw.modes && raw.modes.core),
        acm: normalizeMode(raw.modes && raw.modes.acm),
      },
      mastery: raw.mastery === 'independent' || raw.mastery === 'assisted' ? raw.mastery : null,
      rounds: Number.isInteger(raw.rounds) && raw.rounds >= 0 ? raw.rounds : 0,
      history,
      mistake: raw.mistake && typeof raw.mistake === 'object' ? {
        addedAt: finiteTime(raw.mistake.addedAt),
        fails: Number.isInteger(raw.mistake.fails) && raw.mistake.fails >= 0 ? raw.mistake.fails : 0,
        lastMode: raw.mistake.lastMode === 'core' || raw.mistake.lastMode === 'acm' ? raw.mistake.lastMode : null,
        reason: typeof raw.mistake.reason === 'string' ? raw.mistake.reason : '',
        note: typeof raw.mistake.note === 'string' ? raw.mistake.note : '',
      } : null,
      review: raw.review && typeof raw.review === 'object' ? {
        stage: Math.max(0, Math.min(3, Number.isInteger(raw.review.stage) ? raw.review.stage : 0)),
        dueAt: finiteTime(raw.review.dueAt),
        lastReviewedAt: finiteTime(raw.review.lastReviewedAt),
      } : null,
    };
  }
  return state;
}

function ensureProblem(state, problemId) {
  const id = String(problemId);
  return state.problems[id] || (state.problems[id] = {
    modes: { core: normalizeMode(), acm: normalizeMode() },
    mastery: null,
    rounds: 0,
    history: [],
    mistake: null,
    review: null,
  });
}

export function migrateLegacyLearning(progress, mistakes) {
  const state = emptyLearningState();
  const ids = new Set([...Object.keys(progress || {}), ...Object.keys(mistakes || {})]);
  for (const id of ids) {
    const problem = ensureProblem(state, id);
    const oldProgress = progress && progress[id];
    problem.modes.core = normalizeMode(oldProgress && oldProgress.core);
    problem.modes.acm = normalizeMode(oldProgress && oldProgress.acm);
    if (problem.modes.core.solved || problem.modes.acm.solved) problem.mastery = 'independent';
    problem.rounds = problem.modes.core.attempts + problem.modes.acm.attempts;
    const oldMistake = mistakes && mistakes[id];
    if (oldMistake && typeof oldMistake === 'object') {
      problem.mistake = {
        addedAt: finiteTime(oldMistake.addedAt),
        fails: Number.isInteger(oldMistake.fails) && oldMistake.fails >= 0 ? oldMistake.fails : 0,
        lastMode: oldMistake.lastMode === 'core' || oldMistake.lastMode === 'acm' ? oldMistake.lastMode : null,
        reason: '',
        note: '',
      };
    }
  }
  return state;
}

export function applyLearningAttempt(current, { problemId, mode, outcome, assisted = false, at = Date.now() }) {
  if (mode !== 'core' && mode !== 'acm') throw new TypeError('mode 必须是 core 或 acm');
  if (!['pass', 'fail', 'error'].includes(outcome)) throw new TypeError('outcome 无效');
  const state = normalizeLearningState(current);
  const problem = ensureProblem(state, problemId);
  problem.modes[mode].attempts += 1;
  problem.rounds += 1;
  if (outcome === 'pass') {
    problem.modes[mode].solved = true;
    if (!assisted || problem.mastery !== 'independent') problem.mastery = assisted ? 'assisted' : 'independent';
  }
  problem.history.push({ at: finiteTime(at, Date.now()), mode, outcome, assisted: Boolean(assisted) });
  problem.history = problem.history.slice(-MAX_HISTORY);
  state.revision += 1;
  return state;
}

export function setLearningMistake(current, problemId, patch) {
  const state = normalizeLearningState(current);
  const problem = ensureProblem(state, problemId);
  const existing = problem.mistake || { addedAt: Date.now(), fails: 0, lastMode: null, reason: '', note: '' };
  problem.mistake = { ...existing, ...patch };
  state.revision += 1;
  return state;
}

export function clearLearningMistake(current, problemId) {
  const state = normalizeLearningState(current);
  const problem = state.problems[String(problemId)];
  if (problem && problem.mistake) {
    problem.mistake = null;
    state.revision += 1;
  }
  return state;
}
