// 知识补充详情页：文章正文、可编辑运行示例与关联题目

import { articles } from '../../knowledge/index.js';
import { md } from '../md.js';
import { runSnippet } from '../judge.js';
import { createEditor } from '../editor.js';
import {
  clearDraft,
  flushDrafts,
  getDraft,
  getLangPref,
  problemStatus,
  saveDraft,
  setLangPref,
  stageDraft,
} from '../store.js';
import { getKnowledgeStatus, relatedProblems } from './knowledge.js';

const DIFF_LABEL = { easy: '简单', medium: '中等', hard: '困难' };
const RELATION_LABEL = { core: '核心', practice: '练习', supplement: '补充' };
// 桌面端判定与移动端 CSS 断点（max-width: 900px）互补：恰好 900px 时仍走移动端行为
const DESKTOP_QUERY = '(min-width: 901px)';
const INDENT = '    ';

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// 降级 textarea 的 Tab 支持：Tab 插入 4 空格（选中跨行时整体缩进），Shift+Tab 取消缩进
function handleIndentKeydown(event) {
  if (event.key !== 'Tab') return;
  event.preventDefault();
  const textarea = event.currentTarget;
  const { selectionStart: start, selectionEnd: end, value } = textarea;
  if (!event.shiftKey && start === end) {
    textarea.value = value.slice(0, start) + INDENT + value.slice(end);
    textarea.selectionStart = textarea.selectionEnd = start + INDENT.length;
  } else {
    const lineStart = value.slice(0, start).lastIndexOf('\n') + 1;
    const nextNl = value.indexOf('\n', end);
    const lineEnd = nextNl === -1 ? value.length : nextNl;
    const lines = value.slice(lineStart, lineEnd).split('\n');
    let firstShift = 0;
    let totalShift = 0;
    const nextLines = lines.map((line, index) => {
      if (event.shiftKey) {
        const match = line.match(/^( {1,4}|\t)/);
        const cut = match ? match[1].length : 0;
        if (index === 0) firstShift = cut;
        totalShift += cut;
        return line.slice(cut);
      }
      totalShift += INDENT.length;
      return INDENT + line;
    });
    textarea.value = value.slice(0, lineStart) + nextLines.join('\n') + value.slice(lineEnd);
    if (event.shiftKey) {
      textarea.selectionStart = Math.max(lineStart, start - firstShift);
      textarea.selectionEnd = Math.max(lineStart, end - totalShift);
    } else {
      textarea.selectionStart = start + INDENT.length;
      textarea.selectionEnd = end + totalShift;
    }
  }
  // 程序化修改后补发 input，让草稿暂存等监听逻辑照常工作
  textarea.dispatchEvent(new Event('input', { bubbles: true }));
}

function normalizedOutput(value) {
  return String(value).replace(/\r\n/g, '\n').trimEnd();
}

function makeButton(text, className = 'run-btn') {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = className;
  button.textContent = text;
  return button;
}

export function renderKnowledgeDetail(container, article) {
  const related = relatedProblems(article);
  const articleIndex = articles.findIndex((item) => item.slug === article.slug);
  const previous = articleIndex > 0 ? articles[articleIndex - 1] : null;
  const next = articleIndex >= 0 && articleIndex < articles.length - 1 ? articles[articleIndex + 1] : null;
  let clang = getLangPref() === 'javascript' ? 'javascript' : 'python';
  let status = getKnowledgeStatus(article.slug);
  if (status === 'unread') {
    const result = saveDraft(`knowledge:${article.slug}`, 'article', 'state', 'studying');
    if (result.ok) status = 'studying';
  }

  container.innerHTML = `
    <div class="phead">
      <a class="back" href="#/knowledge">← 知识补充</a>
      <h1>${escapeHtml(article.title)}</h1>
      <div class="head-tags">${article.tags.map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join('')}</div>
      <button class="btn" id="knowledge-status">${status === 'completed' ? '✓ 已完成' : '标记为已完成'}</button>
      <div class="spacer"></div>
      <span class="klang-label">代码语言</span>
      <div class="seg" id="clang-seg">
        <button data-clang="python">Python</button>
        <button data-clang="javascript">JavaScript</button>
      </div>
    </div>
    <div class="panel karticle-panel">
      <div class="panel-body karticle" id="karticle">
        <div class="karticle-layout">
          <div class="karticle-main">
            <div class="desc">${md(article.content)}</div>
          </div>
          <aside class="karticle-side">
            ${related.length ? `
              <h3 class="krelated-title">关联题目（${related.length}）</h3>
              <div class="plist">
                ${related.map((problem) => {
                  const problemState = problemStatus(problem.id);
                  const icon = problemState === 'solved'
                    ? '<span class="solved">✓</span>'
                    : problemState === 'attempted' ? '<span class="attempted">◐</span>' : '';
                  const relationLabel = RELATION_LABEL[problem.relationStage] || problem.relationStage;
                  return `
                  <div class="plist-row" data-pid="${problem.id}" title="${escapeHtml(problem.relationReason || relationLabel)}">
                    <div class="status">${icon}</div>
                    <div class="pid">${problem.id}</div>
                    <div class="ptitle"><a href="#/problem/${problem.id}">${escapeHtml(problem.title)}</a></div>
                    <div class="row-tags"><span class="tag">${escapeHtml(relationLabel)}</span>${problem.tags.map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join('')}</div>
                    <div class="diff ${problem.difficulty}">${DIFF_LABEL[problem.difficulty]}</div>
                  </div>`;
                }).join('')}
              </div>` : ''}
            <div class="pnav">
              ${previous ? `<a class="btn" href="#/knowledge/${escapeHtml(previous.slug)}">← ${escapeHtml(previous.title)}</a>` : '<span></span>'}
              ${next ? `<a class="btn" href="#/knowledge/${escapeHtml(next.slug)}">${escapeHtml(next.title)} →</a>` : '<span></span>'}
            </div>
          </aside>
        </div>
      </div>
    </div>
  `;

  let disposed = false;
  let runGeneration = 0;
  let saveTimer = null;
  const karticle = container.querySelector('#karticle');
  const runners = [];
  const runnerCleanups = [];
  const desktopLayout = window.matchMedia(DESKTOP_QUERY).matches;

  function scheduleDraft(mode, lang, value) {
    const staged = stageDraft(`knowledge:${article.slug}`, mode, lang, value);
    if (!staged.ok) return staged;
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => {
      saveTimer = null;
      flushDrafts();
    }, 400);
    return staged;
  }

  function applyClang() {
    karticle.dataset.clang = clang;
    for (const runner of runners) runner.hidden = runner.dataset.lang !== clang;
    container.querySelectorAll('#clang-seg button').forEach((button) => {
      button.classList.toggle('active', button.dataset.clang === clang);
    });
  }

  const clangClick = (event) => {
    const value = event.target.dataset.clang;
    if (!value || value === clang) return;
    clang = value;
    setLangPref(value);
    applyClang();
  };
  container.querySelector('#clang-seg').addEventListener('click', clangClick);

  const statusButton = container.querySelector('#knowledge-status');
  const statusClick = () => {
    const nextStatus = status === 'completed' ? 'studying' : 'completed';
    const result = saveDraft(`knowledge:${article.slug}`, 'article', 'state', nextStatus);
    if (!result.ok) return;
    status = nextStatus;
    statusButton.textContent = status === 'completed' ? '✓ 已完成' : '标记为已完成';
  };
  statusButton.addEventListener('click', statusClick);

  const rowClick = (event) => {
    if (event.target.closest('a, button, pre, textarea')) return;
    const row = event.target.closest('.plist-row');
    if (row) location.hash = `#/problem/${row.dataset.pid}`;
  };
  container.addEventListener('click', rowClick);

  container.querySelectorAll('.karticle pre[data-run]').forEach((pre, index) => {
    const lang = pre.dataset.run;
    const exampleId = pre.dataset.exampleId || `${article.slug}-example-${index + 1}`;
    pre.dataset.exampleId = exampleId;
    const originalCode = pre.querySelector('code').textContent;
    const savedCode = getDraft(`knowledge:${article.slug}`, `${exampleId}:code`, lang);
    const savedPrediction = getDraft(`knowledge:${article.slug}`, `${exampleId}:prediction`, lang);
    const initialCode = savedCode ?? originalCode;
    const editorHeight = Math.min(520, Math.max(150, initialCode.split('\n').length * 20 + 28));

    const runner = document.createElement('section');
    runner.className = 'snippet-runner';
    runner.dataset.lang = lang;
    runner.dataset.exampleId = exampleId;
    pre.before(runner);
    runner.append(pre);
    pre.hidden = true;

    // currentCode 由 onChange 持续同步，运行/恢复都以它为准（Monaco 与降级 textarea 行为一致）
    let currentCode = initialCode;
    let editorApi = null;
    let codeTextarea = null;
    let editorReady = null;
    const onCodeChange = (value) => {
      currentCode = value;
      scheduleDraft(`${exampleId}:code`, lang, value);
    };

    if (desktopLayout) {
      // 桌面端懒加载 Monaco：先渲染降级 textarea，首次聚焦或进入视口时再升级；
      // 加载失败时 createEditor 自然保留 textarea 并提供重试按钮
      const host = document.createElement('div');
      host.className = 'kexample-host';
      host.style.height = `${editorHeight}px`;
      runner.append(host);
      editorReady = createEditor(host, {
        language: lang,
        value: initialCode,
        lazy: true,
        onChange: onCodeChange,
      }).then((api) => {
        if (disposed) {
          api.dispose();
          return null;
        }
        editorApi = api;
        return api;
      });
      const fallback = host.querySelector('textarea');
      // Tab 缩进由 editor.js 内置于降级 textarea（升级/dispose 时自动移除），此处不再重复挂载
      if (fallback) fallback.setAttribute('aria-label', `${exampleId} 示例代码`);

      let upgradeRequested = false;
      const requestUpgrade = () => {
        if (upgradeRequested || disposed) return;
        upgradeRequested = true;
        editorReady.then((api) => {
          if (api && !disposed) void api.upgrade();
        });
      };
      host.addEventListener('focusin', requestUpgrade);
      let observer = null;
      if ('IntersectionObserver' in window) {
        observer = new IntersectionObserver((entries) => {
          if (entries.some((entry) => entry.isIntersecting)) requestUpgrade();
        });
        observer.observe(host);
      }
      runnerCleanups.push(() => {
        observer?.disconnect();
        host.removeEventListener('focusin', requestUpgrade);
        if (editorApi) editorApi.dispose();
        else editorReady.then((api) => api?.dispose());
      });
    } else {
      codeTextarea = document.createElement('textarea');
      codeTextarea.className = 'editor-fallback';
      codeTextarea.setAttribute('aria-label', `${exampleId} 示例代码`);
      codeTextarea.spellcheck = false;
      codeTextarea.value = initialCode;
      codeTextarea.style.height = `${editorHeight}px`;
      runner.append(codeTextarea);
      codeTextarea.addEventListener('input', () => onCodeChange(codeTextarea.value));
    }

    const predictionLabel = document.createElement('div');
    predictionLabel.className = 'klang-label';
    predictionLabel.textContent = `预测输出（示例 ID：${exampleId}）`;
    runner.append(predictionLabel);
    const prediction = document.createElement('textarea');
    prediction.className = 'editor-fallback';
    prediction.setAttribute('aria-label', `${exampleId} 预测输出`);
    prediction.placeholder = '运行前先写下你认为会输出什么';
    prediction.value = savedPrediction ?? '';
    prediction.style.height = '76px';
    if (desktopLayout) prediction.addEventListener('keydown', handleIndentKeydown);
    runner.append(prediction);

    const actions = document.createElement('div');
    actions.className = 'actions';
    const runButton = makeButton('▶ 运行');
    const restoreButton = makeButton('恢复示例');
    actions.append(runButton, restoreButton);
    runner.append(actions);
    const output = document.createElement('pre');
    output.className = 'run-out';
    output.hidden = true;
    runner.append(output);
    runners.push(runner);

    prediction.addEventListener('input', () => scheduleDraft(`${exampleId}:prediction`, lang, prediction.value));
    restoreButton.addEventListener('click', () => {
      currentCode = originalCode;
      if (editorApi) editorApi.setValue(originalCode);
      if (codeTextarea) codeTextarea.value = originalCode;
      clearDraft(`knowledge:${article.slug}`, `${exampleId}:code`, lang);
      output.hidden = true;
    });
    runButton.addEventListener('click', async () => {
      const currentRun = ++runGeneration;
      runButton.disabled = true;
      restoreButton.disabled = true;
      output.hidden = false;
      output.textContent = '准备运行…';
      try {
        const result = await runSnippet(currentCode, lang, (stage) => {
          if (!disposed && currentRun === runGeneration) {
            output.textContent = stage === 'loading' ? '正在加载 Python 环境（首次较慢）…' : '运行中…';
          }
        });
        if (disposed || currentRun !== runGeneration) return;
        if (result.error) {
          output.textContent = `${result.stdout ? `${result.stdout}\n` : ''}运行错误：${result.error}`;
          return;
        }
        const actual = result.stdout || '';
        const expected = prediction.value;
        const comparison = expected
          ? (normalizedOutput(expected) === normalizedOutput(actual) ? '预测一致' : '预测不同')
          : '未填写预测输出';
        output.textContent = `${comparison}\n--- 实际输出 ---\n${actual || '（无输出）'}`;
      } catch (error) {
        if (!disposed && currentRun === runGeneration) output.textContent = `运行错误：${String(error)}`;
      } finally {
        if (!disposed) {
          runButton.disabled = false;
          restoreButton.disabled = false;
        }
      }
    });
  });

  applyClang();
  const pagehide = () => flushDrafts();
  window.addEventListener('pagehide', pagehide);

  return () => {
    disposed = true;
    runGeneration += 1;
    clearTimeout(saveTimer);
    flushDrafts();
    for (const cleanupRunner of runnerCleanups) cleanupRunner();
    window.removeEventListener('pagehide', pagehide);
    container.removeEventListener('click', rowClick);
    statusButton.removeEventListener('click', statusClick);
    container.querySelector('#clang-seg')?.removeEventListener('click', clangClick);
  };
}
