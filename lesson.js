/* ============================================================
   GET IN THE GITHUB WORKFLOW — lesson.js
   Interactive functionality: progress bar, tooltips,
   accordions, quizzes, section locking, checklists,
   file explorer simulation, markdown loader
   ============================================================ */

const QUIZ_VERSION = 'git-lesson-v1';

/* ── Progress Bar ────────────────────────────────────────────── */
function updateProgress() {
  const fill  = document.getElementById('progress-bar-fill');
  const label = document.getElementById('progress-label');
  if (!fill || !label) return;
  const scrollTop    = window.scrollY;
  const docHeight    = document.body.scrollHeight - window.innerHeight;
  const pct          = docHeight > 0 ? Math.round((scrollTop / docHeight) * 100) : 0;
  fill.style.width   = pct + '%';
  label.textContent  = pct + '% complete';
}
window.addEventListener('scroll', updateProgress, { passive: true });

/* ── Tooltips ────────────────────────────────────────────────── */
const floatingTip = document.getElementById('floating-tooltip');

function initTooltips() {
  document.querySelectorAll('.term').forEach(term => {
    const tipContent = term.querySelector('.term-tooltip');
    if (!tipContent) return;

    function showTip(e) {
      floatingTip.textContent = tipContent.textContent.trim();
      floatingTip.classList.add('visible');
      moveTip(e);
    }
    function moveTip(e) {
      const x = e.clientX + 14;
      const y = e.clientY + 14;
      const tipW = 280;
      const left = x + tipW > window.innerWidth ? e.clientX - tipW - 8 : x;
      floatingTip.style.left = left + 'px';
      floatingTip.style.top  = y + 'px';
    }
    function hideTip() { floatingTip.classList.remove('visible'); }

    term.addEventListener('mouseenter', showTip);
    term.addEventListener('mousemove', moveTip);
    term.addEventListener('mouseleave', hideTip);
    term.addEventListener('focus', showTip);
    term.addEventListener('blur', hideTip);
  });
}

/* ── Accordions ──────────────────────────────────────────────── */
function toggleAccordion(btn) {
  const body = btn.nextElementSibling;
  const isOpen = btn.classList.contains('open');
  btn.classList.toggle('open', !isOpen);
  body.classList.toggle('open', !isOpen);
}

/* ── Quizzes & Section Locking ───────────────────────────────── */
const completedQuizzes = new Set();

function checkAnswer(btn, isCorrect) {
  const quizBlock = btn.closest('.quiz-block');
  const feedback  = quizBlock.querySelector('.quiz-feedback');
  const allBtns   = quizBlock.querySelectorAll('button');
  const attempts  = parseInt(quizBlock.dataset.attempts || '0') + 1;
  quizBlock.dataset.attempts = attempts;

  if (isCorrect) {
    btn.classList.add('correct');
    allBtns.forEach(b => { b.disabled = true; });
    feedback.textContent = '✓ Correct! Moving on…';
    feedback.className = 'quiz-feedback correct';
    markQuizComplete(quizBlock.id);
  } else {
    btn.classList.add('wrong');
    btn.disabled = true;
    if (attempts === 1) {
      feedback.textContent = 'Not quite — double check your answer and try again.';
      feedback.className = 'quiz-feedback wrong';
    } else if (attempts === 2) {
      const hint = quizBlock.dataset.hint || 'Think carefully about each option.';
      feedback.textContent = 'Hint: ' + hint;
      feedback.className = 'quiz-feedback wrong';
    } else {
      // reveal correct after 3 attempts
      allBtns.forEach(b => {
        if (b.dataset.correct === 'true') {
          b.classList.remove('wrong');
          b.classList.add('correct');
          b.disabled = false;
        }
      });
      feedback.textContent = 'Here\'s the correct answer — review it before moving on.';
      feedback.className = 'quiz-feedback wrong';
    }
  }
}

function markQuizComplete(quizId) {
  completedQuizzes.add(quizId);
  saveProgress();
  unlockSections();
}

function unlockSections() {
  document.querySelectorAll('.step-section.locked').forEach(section => {
    const required = (section.dataset.requires || '').trim().split(/\s+/).filter(Boolean);
    if (required.length === 0) return;
    const allDone = required.every(id => completedQuizzes.has(id));
    if (allDone) {
      section.classList.remove('locked');
    }
  });
}

/* ── localStorage Persistence ────────────────────────────────── */
function saveProgress() {
  try {
    localStorage.setItem(QUIZ_VERSION, JSON.stringify([...completedQuizzes]));
  } catch(e) {}
}

function restoreProgress() {
  try {
    const saved = localStorage.getItem(QUIZ_VERSION);
    if (!saved) return;
    const ids = JSON.parse(saved);
    ids.forEach(id => {
      completedQuizzes.add(id);
      const quizBlock = document.getElementById(id);
      if (!quizBlock) return;
      const correctBtn = quizBlock.querySelector('[data-correct="true"]');
      if (correctBtn) {
        correctBtn.classList.add('correct');
        quizBlock.querySelectorAll('button').forEach(b => b.disabled = true);
        const feedback = quizBlock.querySelector('.quiz-feedback');
        if (feedback) { feedback.textContent = '✓ Already answered correctly.'; feedback.className = 'quiz-feedback correct'; }
      }
    });
    unlockSections();
  } catch(e) {}
}

function resetProgress() {
  if (!confirm('Reset all your progress? This cannot be undone.')) return;
  try { localStorage.removeItem(QUIZ_VERSION); } catch(e) {}
  location.reload();
}

/* ── Checklists ──────────────────────────────────────────────── */
function toggleCheck(li) {
  li.classList.toggle('checked');
}

/* ── File Explorer Simulation ────────────────────────────────── */
let chaosLevel = 0;
const MAX_CHAOS = 5;

const baseFiles = [
  { name: '📁 my-project', type: 'folder' },
  { name: 'index.html', type: 'file' },
  { name: 'style.css', type: 'file' },
  { name: 'script.js', type: 'file' },
];

const chaosVersions = [
  { name: 'index_v2.html', type: 'file-confused' },
  { name: 'index_FINAL.html', type: 'file-confused' },
  { name: 'index_FINAL_v2.html', type: 'file-confused' },
  { name: '📁 my-project-backup', type: 'folder' },
  { name: 'index_ACTUALLY_FINAL.html', type: 'file-confused' },
  { name: '📁 my-project-OLD', type: 'folder' },
  { name: 'index_for_real_this_time.html', type: 'file-confused' },
  { name: 'style_new.css', type: 'file-confused' },
  { name: '📁 my-project-2024-backup', type: 'folder' },
  { name: 'index_FINAL_FINAL.html', type: 'file-confused' },
];

let extraFiles = [];

function renderFileTree() {
  const tree = document.getElementById('fe-tree');
  if (!tree) return;
  tree.innerHTML = '';

  const allFiles = [...baseFiles, ...extraFiles];
  allFiles.forEach(f => {
    const li = document.createElement('li');
    li.className = f.type;
    li.textContent = (f.type === 'folder' ? '' : '  ') + f.name;
    tree.appendChild(li);
  });
}

function feAddVersion() {
  if (chaosLevel >= MAX_CHAOS) return;
  const next = chaosVersions[extraFiles.length];
  if (next) extraFiles.push(next);
  chaosLevel++;
  updateChaos();
  renderFileTree();
}

function updateChaos() {
  const bar = document.getElementById('fe-chaos-fill');
  const meter = document.getElementById('fe-chaos-label');
  const msg = document.getElementById('fe-message');
  const addBtn = document.getElementById('fe-add-btn');
  const solveBtn = document.getElementById('fe-solve-btn');

  if (bar) bar.style.width = (chaosLevel / MAX_CHAOS * 100) + '%';
  if (meter) meter.textContent = 'Confusion level: ' + chaosLevel + '/' + MAX_CHAOS;

  if (chaosLevel >= MAX_CHAOS) {
    if (addBtn) addBtn.disabled = true;
    if (msg) {
      msg.textContent = '😵 Which file is the "real" one? You\'ve lost track. This is the problem git solves.';
      msg.className = 'fe-message chaos show';
    }
    if (solveBtn) solveBtn.disabled = false;
  }
}

function feSolve() {
  const msg = document.getElementById('fe-message');
  const solveBtn = document.getElementById('fe-solve-btn');
  if (msg) {
    msg.textContent = '✓ With git, you keep ONE clean project folder. Every change is tracked as a commit — no more copies needed.';
    msg.className = 'fe-message solved show';
  }
  if (solveBtn) solveBtn.disabled = true;

  // replace chaos files with a clean git indicator
  extraFiles = [{ name: '.git  ← git tracks history here', type: 'file-new' }];
  renderFileTree();
}

function initFileExplorer() {
  renderFileTree();
  const addBtn = document.getElementById('fe-add-btn');
  const solveBtn = document.getElementById('fe-solve-btn');
  if (addBtn) addBtn.addEventListener('click', feAddVersion);
  if (solveBtn) {
    solveBtn.disabled = true;
    solveBtn.addEventListener('click', feSolve);
  }
}

/* ── Markdown Loader ─────────────────────────────────────────── */
/*
  Loads .md files from the /sections/ folder.
  Each section HTML can include:
    <div class="md-section" data-src="sections/01-why-git.md"></div>
  The loader fetches the markdown, does a minimal parse, and inserts it.

  Special interactive tags in markdown:
    [INTERACTIVE: file-explorer]  → replaced by the file explorer widget
*/

async function loadMarkdownSections() {
  const containers = document.querySelectorAll('.md-section[data-src]');
  for (const container of containers) {
    try {
      const res = await fetch(container.dataset.src);
      if (!res.ok) continue;
      const md = await res.text();
      container.innerHTML = parseMarkdown(md);
    } catch(e) {
      container.innerHTML = '<p style="color:var(--danger)">Could not load section content.</p>';
    }
  }
  initTooltips();
}

function parseMarkdown(md) {
  // Handle [INTERACTIVE: file-explorer] tag
  md = md.replace(/\[INTERACTIVE:\s*file-explorer\]/gi, getFileExplorerHTML());

  // Handle [QUIZ] blocks
  // Syntax:
  //   [QUIZ id="quiz-1" hint="Your hint here"]
  //   Q: Your question text?
  //   - Wrong answer
  //   - Another wrong answer
  //   * Correct answer (asterisk marks correct)
  //   [/QUIZ]
  md = md.replace(/\[QUIZ([^\]]*)\]([\s\S]*?)\[\/QUIZ\]/gi, (_, attrs, body) => {
    const id    = (attrs.match(/id="([^"]+)"/)    || [])[1] || 'quiz-' + Math.random().toString(36).slice(2,7);
    const hint  = (attrs.match(/hint="([^"]+)"/)  || [])[1] || 'Think carefully about each option.';

    const lines  = body.trim().split('\n').map(l => l.trim()).filter(Boolean);
    const qLine  = lines.find(l => l.startsWith('Q:'));
    const question = qLine ? qLine.replace(/^Q:\s*/, '') : 'Question';

    const options = lines
      .filter(l => l.startsWith('-') || l.startsWith('*'))
      .map(l => {
        const correct = l.startsWith('*');
        const text    = l.replace(/^[-*]\s*/, '');
        return { text, correct };
      });

    const optionsHtml = options.map(o =>
      `<li><button ${o.correct ? 'data-correct="true" ' : ''}onclick="checkAnswer(this, ${o.correct})">${o.text}</button></li>`
    ).join('\n        ');

    return `
<div class="quiz-block" id="${id}" data-hint="${hint}">
  <h4>✦ Quick Check</h4>
  <p class="quiz-question">${question}</p>
  <ul class="quiz-options">
    ${optionsHtml}
  </ul>
  <p class="quiz-feedback">Answer correctly to unlock the next section.</p>
</div>`;
  });

  // Protect raw HTML blocks (divs, spans) from being mangled
  const htmlBlocks = [];
  md = md.replace(/(<(?:div|span)[^>]*>[\s\S]*?<\/(?:div|span)>)/g, (match) => {
    htmlBlocks.push(match);
    return `\x00HTML_BLOCK_${htmlBlocks.length - 1}\x00`;
  });

  let html = md
    // fenced code blocks
    .replace(/```(\w*)\n([\s\S]*?)```/gm, (_, lang, code) =>
      `<div class="code-block"><div class="code-block-header"><span>${lang || 'bash'}</span></div><pre>${escHtml(code.trim())}</pre></div>`)
    // inline code (before bold/italic to avoid conflicts)
    .replace(/`([^`\n]+)`/g, '<code>$1</code>')
    // bold
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    // italic (only single asterisk not preceded by another)
    .replace(/(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/g, '<em>$1</em>')
    // h3
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    // h2
    .replace(/^## (.+)$/gm, '<h3>$1</h3>')
    // unordered list items
    .replace(/^[-*] (.+)$/gm, '<li>$1</li>')
    // numbered list items
    .replace(/^\d+\. (.+)$/gm, '<li>$1</li>')
    // wrap consecutive <li> blocks in <ul>
    .replace(/(<li>[\s\S]*?<\/li>\n?)+/g, match => `<ul>${match}</ul>`)
    // split on double newlines for paragraphs
    .split(/\n\n+/)
    .map(block => {
      block = block.trim();
      if (!block) return '';
      // don't wrap already-block elements
      if (/^<(h[1-6]|ul|ol|div|pre|table|hr|\x00HTML)/.test(block)) return block;
      return `<p>${block}</p>`;
    })
    .join('\n');

  // Restore HTML blocks
  html = html.replace(/\x00HTML_BLOCK_(\d+)\x00/g, (_, i) => htmlBlocks[parseInt(i)]);

  return html;
}

function escHtml(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

function getFileExplorerHTML() {
  return `
  <div id="file-explorer-section">
    <div class="fe-header">
      <h2>📁 The "Final" File Problem</h2>
      <p>Click "Save a new version" and see how quickly things spiral.</p>
    </div>
    <div class="fe-body">
      <div class="fe-scenario">
        <strong>Scenario:</strong> You just finished your project. It works! But now you want to experiment with a new feature. You don't want to break what you have, so you… make a copy.
      </div>
      <div class="fe-workspace">
        <ul class="fe-folder-tree" id="fe-tree"></ul>
      </div>
      <div class="fe-controls">
        <button class="fe-btn" id="fe-add-btn">📄 Save a new version</button>
        <button class="fe-btn primary" id="fe-solve-btn">✓ Use git instead</button>
      </div>
      <div class="fe-chaos-meter">
        <span id="fe-chaos-label">Confusion level: 0/5</span>
        <div class="fe-chaos-bar-track"><div class="fe-chaos-bar-fill" id="fe-chaos-fill"></div></div>
      </div>
      <div class="fe-message" id="fe-message"></div>
    </div>
  </div>`;
}

/* ── Init ────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  restoreProgress();
  updateProgress();

  // Initialize file explorer if it exists in static HTML
  if (document.getElementById('fe-tree')) {
    initFileExplorer();
  }

  // Load any markdown sections
  loadMarkdownSections().then(() => {
    // Re-init file explorer if it was injected via markdown
    if (document.getElementById('fe-tree') && !document.getElementById('fe-tree').dataset.initialized) {
      document.getElementById('fe-tree').dataset.initialized = 'true';
      initFileExplorer();
    }
    updateProgress();
  });

  initTooltips();
});
