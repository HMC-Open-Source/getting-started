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
/*
  Story-driven step-through. Each step has:
    - narrative: the caption shown above the file tree
    - folders: array of { name, files: [{ name, isNew }] }
  Files marked isNew are highlighted in red as the new additions.
  Files are displayed in alphabetical order within each folder.
*/

const feSteps = [
  {
    narrative: "Here's your project folder with a working version of your project.",
    folders: [
      {
        name: 'my-project',
        files: [
          { name: 'index.html' },
          { name: 'script.js' },
          { name: 'style.css' },
        ]
      }
    ]
  },
  {
    narrative: "You want to do some experimental changes, but you don't want to lose your working version just yet — so you save a copy of index.html.",
    folders: [
      {
        name: 'my-project',
        files: [
          { name: 'index.html' },
          { name: 'index_v2.html', isNew: true },
          { name: 'script.js' },
          { name: 'style.css' },
        ]
      }
    ]
  },
  {
    narrative: "Your experimental change also requires tweaks to script.js, so you save a copy of that too.",
    folders: [
      {
        name: 'my-project',
        files: [
          { name: 'index.html' },
          { name: 'index_v2.html' },
          { name: 'script.js' },
          { name: 'script_v2.js', isNew: true },
          { name: 'style.css' },
        ]
      }
    ]
  },
  {
    narrative: "This is getting cumbersome — index_v2.html and script_v2.js reference each other, but so do the originals. You decide to copy the v2 files into a separate folder so they stay together.",
    folders: [
      {
        name: 'my-project',
        files: [
          { name: 'index.html' },
          { name: 'index_v2.html' },
          { name: 'script.js' },
          { name: 'script_v2.js' },
          { name: 'style.css' },
        ]
      },
      {
        name: 'my-project_experimental',
        isNew: true,
        files: [
          { name: 'index.html', isNew: true },
          { name: 'script.js', isNew: true },
          { name: 'style.css', isNew: true },
        ]
      }
    ]
  },
  {
    narrative: "A week later, the experiment worked! But now you also fixed a bug in the original. Which folder has the fix? Did you copy it to the other one? You're not sure anymore.",
    folders: [
      {
        name: 'my-project',
        files: [
          { name: 'index.html' },
          { name: 'index_FINAL.html', isNew: true },
          { name: 'index_v2.html' },
          { name: 'script.js' },
          { name: 'script_v2.js' },
          { name: 'style.css' },
        ]
      },
      {
        name: 'my-project_experimental',
        files: [
          { name: 'index.html' },
          { name: 'script.js' },
          { name: 'style.css' },
        ]
      },
      {
        name: 'my-project_FINAL',
        isNew: true,
        files: [
          { name: 'index.html', isNew: true },
          { name: 'script.js', isNew: true },
          { name: 'style.css', isNew: true },
        ]
      }
    ]
  },
  {
    narrative: "This is the problem git solves. Instead of copying folders, git tracks every change as a commit inside one clean project folder. You always know what changed, when, and why.",
    folders: [
      {
        name: 'my-project',
        files: [
          { name: '.git  ← history lives here', isGit: true },
          { name: 'index.html' },
          { name: 'script.js' },
          { name: 'style.css' },
        ]
      }
    ],
    isSolution: true,
    // The "before" state to show on the left side for comparison
    beforeFolders: [
      {
        name: 'my-project',
        files: [
          { name: 'index.html' },
          { name: 'index_FINAL.html' },
          { name: 'index_v2.html' },
          { name: 'script.js' },
          { name: 'script_v2.js' },
          { name: 'style.css' },
        ]
      },
      {
        name: 'my-project_experimental',
        files: [
          { name: 'index.html' },
          { name: 'script.js' },
          { name: 'style.css' },
        ]
      },
      {
        name: 'my-project_FINAL',
        files: [
          { name: 'index.html' },
          { name: 'script.js' },
          { name: 'style.css' },
        ]
      }
    ]
  }
];

let feCurrentStep = 0;

function buildFolderEl(folder, isSolution) {
  const folderEl = document.createElement('div');
  folderEl.className = 'fe-folder' +
    (folder.isNew ? ' fe-folder-new' : '') +
    (isSolution ? ' fe-folder-solution' : '');

  const folderName = document.createElement('div');
  folderName.className = 'fe-folder-name';
  folderName.textContent = '📁 ' + folder.name;
  folderEl.appendChild(folderName);

  const ul = document.createElement('ul');
  ul.className = 'fe-folder-tree';
  folder.files.forEach(file => {
    const li = document.createElement('li');
    li.className = file.isGit ? 'file-new' : (file.isNew ? 'file-new-red' : 'file');
    li.textContent = file.name;
    ul.appendChild(li);
  });
  folderEl.appendChild(ul);
  return folderEl;
}

function renderFileExplorer() {
  const narrative = document.getElementById('fe-narrative');
  const treeWrap  = document.getElementById('fe-tree-wrap');
  const nextBtn   = document.getElementById('fe-next-btn');
  const stepLabel = document.getElementById('fe-step-label');
  if (!narrative || !treeWrap) return;

  const step  = feSteps[feCurrentStep];
  const total = feSteps.length;

  narrative.textContent = step.narrative;
  if (stepLabel) stepLabel.textContent = (feCurrentStep + 1) + ' / ' + total;

  treeWrap.innerHTML = '';

  if (step.isSolution && step.beforeFolders) {
    // Side-by-side layout for the final step
    const compareWrap = document.createElement('div');
    compareWrap.className = 'fe-compare';

    // Left: before
    const beforeCol = document.createElement('div');
    beforeCol.className = 'fe-compare-col fe-compare-before';
    const beforeLabel = document.createElement('div');
    beforeLabel.className = 'fe-compare-label';
    beforeLabel.textContent = 'Without git';
    beforeCol.appendChild(beforeLabel);
    step.beforeFolders.forEach(folder => {
      beforeCol.appendChild(buildFolderEl(folder, false));
    });

    // Divider
    const divider = document.createElement('div');
    divider.className = 'fe-compare-divider';
    divider.textContent = '→';

    // Right: after
    const afterCol = document.createElement('div');
    afterCol.className = 'fe-compare-col fe-compare-after';
    const afterLabel = document.createElement('div');
    afterLabel.className = 'fe-compare-label';
    afterLabel.textContent = 'With git';
    afterCol.appendChild(afterLabel);
    step.folders.forEach(folder => {
      afterCol.appendChild(buildFolderEl(folder, true));
    });

    compareWrap.appendChild(beforeCol);
    compareWrap.appendChild(divider);
    compareWrap.appendChild(afterCol);
    treeWrap.appendChild(compareWrap);
  } else {
    // Normal single-column layout
    step.folders.forEach(folder => {
      treeWrap.appendChild(buildFolderEl(folder, false));
    });
  }

  // Update button
  if (nextBtn) {
    const isLast = feCurrentStep >= total - 1;
    nextBtn.textContent = isLast ? '↺ Start over' : 'Next →';
    nextBtn.className   = 'fe-btn' + (step.isSolution ? ' primary' : '');
  }
}

function feNext() {
  const total = feSteps.length;
  feCurrentStep = (feCurrentStep + 1) % total;
  renderFileExplorer();
}

function initFileExplorer() {
  feCurrentStep = 0;
  renderFileExplorer();
  const nextBtn = document.getElementById('fe-next-btn');
  if (nextBtn) nextBtn.addEventListener('click', feNext);
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
      <h2>📁 The Version Control Problem</h2>
      <p>Click through to see how file management gets out of hand without git.</p>
    </div>
    <div class="fe-body">
      <div class="fe-narrative" id="fe-narrative"></div>
      <div class="fe-workspace">
        <div id="fe-tree-wrap"></div>
      </div>
      <div class="fe-controls">
        <button class="fe-btn" id="fe-next-btn">Next →</button>
        <span class="fe-step-label" id="fe-step-label">1 / 6</span>
      </div>
    </div>
  </div>`;
}

/* ── Init ────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  restoreProgress();
  updateProgress();

  // Load markdown sections first, then init anything that was injected
  loadMarkdownSections().then(() => {
    // Init file explorer after markdown injection completes
    const nextBtn = document.getElementById('fe-next-btn');
    if (nextBtn && !nextBtn.dataset.initialized) {
      nextBtn.dataset.initialized = 'true';
      initFileExplorer();
    }
    initTooltips();
    updateProgress();
  });
});
