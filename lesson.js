/* =============================================================
   GET IN THE GITHUB WORKFLOW — lesson.js
   =============================================================
   Architecture:
   - Sections defined in SECTIONS manifest below
   - Each section points to a .md file in /sections/
   - Markdown parser handles all content + components:
       [INTERACTIVE: file-explorer]
       [QUIZ id="..." hint="..."] ... [/QUIZ]
       [ACCORDION title="..."] ... [/ACCORDION]
       [CALLOUT type="tip|note|warning|success"] ... [/CALLOUT]
       [PRACTICE title="..."] ... [/PRACTICE]
       [RESOURCES] ... [/RESOURCES]
       Standard markdown: **bold**, `code`, headings,
       lists, tables, images
   ============================================================= */

const QUIZ_VERSION = 'git-lesson-v1';

/* =============================================================
   SECTION MANIFEST
   Defines all sections, source files, locking, and IDs.
   Edit this to add/remove/reorder sections.
   ============================================================= */
const SECTIONS = [
  {
    id: 'section-explorer',
    src: 'sections/00-file-explorer.md',
    bare: true, // no header or number — raw content only
  },
  {
    id: 'section-why-git',
    number: 1,
    title: 'Why use git?',
    src: 'sections/01-why-git.md',
  },
  {
    id: 'section-commits',
    number: 2,
    title: 'Commit messages & history',
    src: 'sections/02-commits.md',
    locked: true,
    requires: 'quiz-1a quiz-1b',
  },
  {
    id: 'section-process',
    number: 3,
    title: 'The git Process at a Glance',
    src: 'sections/03-diagram.md',
    locked: true,
    requires: 'quiz-2a',
  },
  {
    id: 'section-diagram',
    number: 4,
    title: 'The git Process in Detail',
    src: 'sections/04-git-process.md',
    locked: true,
    requires: 'quiz-2a',
  },
  {
    id: 'section-setup',
    number: 5,
    title: 'Setting Up git with GitHub',
    src: 'sections/05-setup.md',
    locked: true,
    requires: 'quiz-4a',
  },
  {
    id: 'section-init',
    number: 6,
    title: 'Initializing Git for Your Own Project',
    src: 'sections/06-init.md',
    locked: true,
    requires: 'quiz-5a',
  },
  {
    id: 'section-push',
    number: 7,
    title: 'A Note About git push & Branches',
    src: 'sections/07-push-branches.md',
    locked: true,
    requires: 'quiz-6a',
  },
  {
    id: 'section-checkout',
    number: 8,
    title: 'New Ways to "checkout"',
    src: 'sections/08-checkout.md',
    locked: true,
    requires: 'quiz-6a',
  },
  {
    id: 'section-internal',
    number: 9,
    title: 'Internal Contributor Workflow',
    src: 'sections/09-internal.md',
    locked: true,
    requires: 'quiz-6a',
  },
  {
    id: 'section-external',
    number: 10,
    title: 'External Contributor Workflow',
    src: 'sections/10-external.md',
    locked: true,
    requires: 'quiz-3',
  },
  {
    id: 'section-pr',
    number: 11,
    title: 'PR Etiquette',
    src: 'sections/11-pr-etiquette.md',
    locked: true,
    requires: 'quiz-3',
  },
  {
    id: 'section-conflicts',
    number: 12,
    title: 'Merge Conflicts',
    src: 'sections/12-merge-conflicts.md',
    locked: true,
    requires: 'quiz-3',
  },
  {
    id: 'section-further',
    number: 13,
    title: "What's Next: Limitations & Further Learning",
    src: 'sections/13-further-learning.md',
    locked: true,
    requires: 'quiz-3',
  },
];

/* =============================================================
   PROGRESS BAR
   ============================================================= */
function updateProgress() {
  const fill  = document.getElementById('progress-bar-fill');
  const label = document.getElementById('progress-label');
  if (!fill || !label) return;
  const scrollTop = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const pct = docHeight > 0
    ? Math.round((scrollTop / docHeight) * 100)
    : 0;
  fill.style.width  = pct + '%';
  label.textContent = pct + '% complete';
}
window.addEventListener('scroll', updateProgress, { passive: true });

/* =============================================================
   TOOLTIPS
   ============================================================= */
function initTooltips() {
  const tip = document.getElementById('floating-tooltip');
  if (!tip) return;

  document.querySelectorAll('.term').forEach(term => {
    const content = term.querySelector('.term-tooltip');
    if (!content) return;

    const show = e => {
      tip.textContent = content.textContent.trim();
      tip.classList.add('visible');
      move(e);
    };
    const move = e => {
      const x    = e.clientX + 14;
      const y    = e.clientY + 14;
      const tipW = 280;
      const left = x + tipW > window.innerWidth
        ? e.clientX - tipW - 8
        : x;
      tip.style.left = left + 'px';
      tip.style.top  = y + 'px';
    };
    const hide = () => tip.classList.remove('visible');

    term.addEventListener('mouseenter', show);
    term.addEventListener('mousemove',  move);
    term.addEventListener('mouseleave', hide);
    term.addEventListener('focus',      show);
    term.addEventListener('blur',       hide);
  });
}

/* =============================================================
   ACCORDIONS
   ============================================================= */
function toggleAccordion(btn) {
  const body = btn.nextElementSibling;
  const open = btn.classList.toggle('open');
  body.classList.toggle('open', open);
}

/* =============================================================
   QUIZZES & SECTION LOCKING
   ============================================================= */
const completedQuizzes = new Set();

function checkAnswer(btn, isCorrect) {
  const block    = btn.closest('.quiz-block');
  const feedback = block.querySelector('.quiz-feedback');
  const allBtns  = block.querySelectorAll('button');
  const attempts = parseInt(block.dataset.attempts || '0') + 1;
  block.dataset.attempts = attempts;

  if (isCorrect) {
    btn.classList.add('correct');
    allBtns.forEach(b => { b.disabled = true; });
    feedback.textContent = '✓ Correct! Moving on…';
    feedback.className   = 'quiz-feedback correct';
    markQuizComplete(block.id);
    return;
  }

  btn.classList.add('wrong');
  btn.disabled = true;

  if (attempts === 1) {
    feedback.textContent =
      'Not quite. Double check your answer and try again.';
    feedback.className = 'quiz-feedback wrong';
  } else if (attempts === 2) {
    const hint = block.dataset.hint
      || 'Think carefully about each option.';
    feedback.textContent = 'Hint: ' + hint;
    feedback.className   = 'quiz-feedback wrong';
  } else {
    allBtns.forEach(b => {
      if (b.dataset.correct === 'true') {
        b.classList.remove('wrong');
        b.classList.add('correct');
        b.disabled = false;
      }
    });
    feedback.textContent =
      "Here's the correct answer. Review it before moving on.";
    feedback.className = 'quiz-feedback wrong';
  }
}

function markQuizComplete(quizId) {
  completedQuizzes.add(quizId);
  saveProgress();
  unlockSections();
}

function unlockSections() {
  document.querySelectorAll('.step-section.locked').forEach(sec => {
    const req = (sec.dataset.requires || '')
      .trim()
      .split(/\s+/)
      .filter(Boolean);
    if (req.length && req.every(id => completedQuizzes.has(id))) {
      sec.classList.remove('locked');
    }
  });
}

/* =============================================================
   LOCALSTORAGE
   ============================================================= */
function saveProgress() {
  try {
    localStorage.setItem(
      QUIZ_VERSION,
      JSON.stringify([...completedQuizzes])
    );
  } catch (e) {}
}

function restoreProgress() {
  try {
    const saved = localStorage.getItem(QUIZ_VERSION);
    if (!saved) return;
    JSON.parse(saved).forEach(id => {
      completedQuizzes.add(id);
      const block = document.getElementById(id);
      if (!block) return;
      const correct = block.querySelector('[data-correct="true"]');
      if (correct) {
        correct.classList.add('correct');
        block.querySelectorAll('button').forEach(b => {
          b.disabled = true;
        });
        const fb = block.querySelector('.quiz-feedback');
        if (fb) {
          fb.textContent = '✓ Already answered correctly.';
          fb.className   = 'quiz-feedback correct';
        }
      }
    });
    unlockSections();
  } catch (e) {}
}

function resetProgress() {
  if (!confirm('Reset all your progress? This cannot be undone.')) {
    return;
  }
  try { localStorage.removeItem(QUIZ_VERSION); } catch (e) {}
  location.reload();
}

/* =============================================================
   CHECKLISTS
   ============================================================= */
function toggleCheck(li) { li.classList.toggle('checked'); }

/* =============================================================
   FILE EXPLORER SIMULATION
   ============================================================= */
const feSteps = [
  {
    narrative:
      "Here's your project folder with a working version of " +
      "your project.",
    folders: [
      {
        name: 'my-project',
        files: [
          { name: 'index.html' },
          { name: 'script.js'  },
          { name: 'style.css'  },
        ],
      },
    ],
  },
  {
    narrative:
      "You want to do some experimental changes, but you don't " +
      "want to lose your working version just yet so you save " +
      "a copy of index.html.",
    folders: [
      {
        name: 'my-project',
        files: [
          { name: 'index.html' },
          { name: 'index_v2.html', isNew: true },
          { name: 'script.js'  },
          { name: 'style.css'  },
        ],
      },
    ],
  },
  {
    narrative:
      "Your experimental change also requires tweaks to script.js, " +
      "so you save a copy of that too.",
    folders: [
      {
        name: 'my-project',
        files: [
          { name: 'index.html'              },
          { name: 'index_v2.html'           },
          { name: 'script.js'               },
          { name: 'script_v2.js', isNew: true },
          { name: 'style.css'               },
        ],
      },
    ],
  },
  {
    narrative:
      "This is getting cumbersome since index_v2.html and script_v2.js " +
      "reference each other, but so do the originals. You copy the " +
      "v2 files into a separate folder so they stay together.",
    folders: [
      {
        name: 'my-project',
        files: [
          { name: 'index.html'    },
          { name: 'index_v2.html' },
          { name: 'script.js'     },
          { name: 'script_v2.js'  },
          { name: 'style.css'     },
        ],
      },
      {
        name: 'my-project_experimental',
        isNew: true,
        files: [
          { name: 'index.html', isNew: true },
          { name: 'script.js',  isNew: true },
          { name: 'style.css',  isNew: true },
        ],
      },
    ],
  },
  {
    narrative:
      "A week later, the experiment worked! But you also fixed a " +
      "bug in the original. Which folder has the fix? Did you copy " +
      "it to the other one? You're not sure anymore.",
    folders: [
      {
        name: 'my-project',
        files: [
          { name: 'index.html'                  },
          { name: 'index_FINAL.html', isNew: true },
          { name: 'index_v2.html'               },
          { name: 'script.js'                   },
          { name: 'script_v2.js'                },
          { name: 'style.css'                   },
        ],
      },
      {
        name: 'my-project_experimental',
        files: [
          { name: 'index.html' },
          { name: 'script.js'  },
          { name: 'style.css'  },
        ],
      },
      {
        name: 'my-project_FINAL',
        isNew: true,
        files: [
          { name: 'index.html', isNew: true },
          { name: 'script.js',  isNew: true },
          { name: 'style.css',  isNew: true },
        ],
      },
    ],
  },
  {
    narrative:
      "This is the problem git solves. Instead of copying folders, " +
      "git tracks every change as a commit inside one clean project " +
      "folder. You always know what changed, when, and why.",
    isSolution: true,
    folders: [
      {
        name: 'my-project',
        files: [
          { name: '.git  ← history lives here', isGit: true },
          { name: 'index.html' },
          { name: 'script.js'  },
          { name: 'style.css'  },
        ],
      },
    ],
    beforeFolders: [
      {
        name: 'my-project',
        files: [
          { name: 'index.html'       },
          { name: 'index_FINAL.html' },
          { name: 'index_v2.html'    },
          { name: 'script.js'        },
          { name: 'script_v2.js'     },
          { name: 'style.css'        },
        ],
      },
      {
        name: 'my-project_experimental',
        files: [
          { name: 'index.html' },
          { name: 'script.js'  },
          { name: 'style.css'  },
        ],
      },
      {
        name: 'my-project_FINAL',
        files: [
          { name: 'index.html' },
          { name: 'script.js'  },
          { name: 'style.css'  },
        ],
      },
    ],
  },
];

let feCurrentStep = 0;

function buildFolderEl(folder, isSolution) {
  const el = document.createElement('div');
  el.className =
    'fe-folder' +
    (folder.isNew    ? ' fe-folder-new'      : '') +
    (isSolution      ? ' fe-folder-solution' : '');

  const nameEl = document.createElement('div');
  nameEl.className   = 'fe-folder-name';
  nameEl.textContent = '📁 ' + folder.name;
  el.appendChild(nameEl);

  const ul = document.createElement('ul');
  ul.className = 'fe-folder-tree';
  folder.files.forEach(f => {
    const li = document.createElement('li');
    li.className   = f.isGit
      ? 'file-new'
      : (f.isNew ? 'file-new-red' : 'file');
    li.textContent = f.name;
    ul.appendChild(li);
  });
  el.appendChild(ul);
  return el;
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
  if (stepLabel) {
    stepLabel.textContent = (feCurrentStep + 1) + ' / ' + total;
  }
  treeWrap.innerHTML = '';

  if (step.isSolution && step.beforeFolders) {
    const wrap = document.createElement('div');
    wrap.className = 'fe-compare';

    const before = document.createElement('div');
    before.className = 'fe-compare-col fe-compare-before';
    const bLabel = document.createElement('div');
    bLabel.className   = 'fe-compare-label';
    bLabel.textContent = 'Without git';
    before.appendChild(bLabel);
    step.beforeFolders.forEach(f => {
      before.appendChild(buildFolderEl(f, false));
    });

    const divider = document.createElement('div');
    divider.className   = 'fe-compare-divider';
    divider.textContent = '→';

    const after = document.createElement('div');
    after.className = 'fe-compare-col fe-compare-after';
    const aLabel = document.createElement('div');
    aLabel.className   = 'fe-compare-label';
    aLabel.textContent = 'With git';
    after.appendChild(aLabel);
    step.folders.forEach(f => {
      after.appendChild(buildFolderEl(f, true));
    });

    wrap.appendChild(before);
    wrap.appendChild(divider);
    wrap.appendChild(after);
    treeWrap.appendChild(wrap);
  } else {
    const wrap = document.createElement('div');
    wrap.style.display  = 'flex';
    wrap.style.flexWrap = 'wrap';
    wrap.style.gap      = '20px';
    step.folders.forEach(f => {
      wrap.appendChild(buildFolderEl(f, false));
    });
    treeWrap.appendChild(wrap);
  }

  if (nextBtn) {
    const isLast = feCurrentStep >= total - 1;
    nextBtn.textContent = isLast ? '↺ Start over' : 'Next →';
    nextBtn.className   =
      'fe-btn' + (step.isSolution ? ' primary' : '');
  }
}

function feNext() {
  feCurrentStep = (feCurrentStep + 1) % feSteps.length;
  renderFileExplorer();
}

function initFileExplorer() {
  feCurrentStep = 0;
  renderFileExplorer();
  const btn = document.getElementById('fe-next-btn');
  if (btn) {
    btn.addEventListener('click', feNext);
  }
}

/* =============================================================
   MARKDOWN PARSER
   Handles all content and component tags.
   ============================================================= */
function escHtml(str) {
  return str
    .replace(/&/g,  '&amp;')
    .replace(/</g,  '&lt;')
    .replace(/>/g,  '&gt;');
}

function parseMarkdown(md) {

  /* ── Protect raw HTML spans ── */
  const htmlBlocks = [];
  md = md.replace(/(<span[^>]*>[\s\S]*?<\/span>)/g, match => {
    htmlBlocks.push(match);
    return `\x00HTML${htmlBlocks.length - 1}\x00`;
  });

  /* ── [INTERACTIVE: file-explorer] ── */
  md = md.replace(/\[INTERACTIVE:\s*file-explorer\]/gi, [
    '<div id="file-explorer-section">',
    '  <div class="fe-header">',
    '    <h2>📁 The Version Control Problem</h2>',
    '    <p>Click through to see how file management gets',
    '    out of hand without git.</p>',
    '  </div>',
    '  <div class="fe-body">',
    '    <div class="fe-narrative" id="fe-narrative"></div>',
    '    <div class="fe-workspace">',
    '      <div id="fe-tree-wrap"></div>',
    '    </div>',
    '    <div class="fe-controls">',
    '      <button class="fe-btn" id="fe-next-btn">',
    '        Next →',
    '      </button>',
    '      <span class="fe-step-label" id="fe-step-label">',
    '        1 / 6',
    '      </span>',
    '    </div>',
    '  </div>',
    '</div>',
  ].join('\n'));

  /* ── [QUIZ] blocks ── */
  md = md.replace(
    /\[QUIZ([^\]]*)\]([\s\S]*?)\[\/QUIZ\]/gi,
    (_, attrs, body) => {
      const id = (attrs.match(/id="([^"]+)"/) || [])[1]
        || 'quiz-' + Math.random().toString(36).slice(2, 7);
      const hint = (attrs.match(/hint="([^"]+)"/) || [])[1]
        || 'Think carefully about each option.';
      const lines = body.trim().split('\n')
        .map(l => l.trim()).filter(Boolean);
      const question = (
        lines.find(l => l.startsWith('Q:')) || 'Q: '
      ).replace(/^Q:\s*/, '');
      const options = lines
        .filter(l => /^[-*]/.test(l))
        .map(l => ({
          correct: l.startsWith('*'),
          text: l.replace(/^[-*]\s*/, ''),
        }));
      const optHtml = options.map(o => {
        const dataAttr = o.correct
          ? 'data-correct="true" '
          : '';
        return (
          `<li><button ${dataAttr}` +
          `onclick="checkAnswer(this,${o.correct})">` +
          `${o.text}</button></li>`
        );
      }).join('\n');
      return [
        `<div class="quiz-block" id="${id}"`,
        `  data-hint="${hint}">`,
        '  <h4>✦ Quick Check</h4>',
        `  <p class="quiz-question">${question}</p>`,
        `  <ul class="quiz-options">${optHtml}</ul>`,
        '  <p class="quiz-feedback">',
        '    Answer correctly to unlock the next section.',
        '  </p>',
        '</div>',
      ].join('\n');
    }
  );

  /* ── [ACCORDION title="..."] ... [/ACCORDION] ── */
  md = md.replace(
    /\[ACCORDION title="([^"]+)"\]([\s\S]*?)\[\/ACCORDION\]/gi,
    (_, title, content) => [
      '<div class="accordion">',
      '  <button class="accordion-btn"',
      '    onclick="toggleAccordion(this)">',
      `    <span>${title}</span>`,
      '    <span class="chevron">▼</span>',
      '  </button>',
      '  <div class="accordion-body">',
      '    <div class="accordion-inner">',
      `      ${parseInlineMarkdown(content.trim())}`,
      '    </div>',
      '  </div>',
      '</div>',
    ].join('\n')
  );

  /* ── [CALLOUT type="..."] ... [/CALLOUT] ── */
  const calloutIcons = {
    tip:     '💡',
    note:    'ℹ️',
    warning: '⚠️',
    success: '🎉',
  };
  md = md.replace(
    /\[CALLOUT type="([^"]+)"\]([\s\S]*?)\[\/CALLOUT\]/gi,
    (_, type, content) => {
      const icon = calloutIcons[type] || 'ℹ️';
      return [
        `<div class="callout ${type}">`,
        `  <span class="callout-icon">${icon}</span>`,
        `  <div>${parseInlineMarkdown(content.trim())}</div>`,
        '</div>',
      ].join('\n');
    }
  );

  /* ── [PRACTICE title="..."] ... [/PRACTICE] ── */
  md = md.replace(
    /\[PRACTICE title="([^"]+)"\]([\s\S]*?)\[\/PRACTICE\]/gi,
    (_, title, content) => {
      const lines = content.trim().split('\n');
      let html   = `<div class="practice-box"><h4>${title}</h4>`;
      let inList = false;
      lines.forEach(line => {
        line = line.trim();
        if (!line) return;
        if (line.startsWith('- ')) {
          if (!inList) {
            html  += '<ul class="checklist">';
            inList = true;
          }
          html +=
            '<li onclick="toggleCheck(this)">' +
            '<span class="check-icon">✓</span>' +
            line.slice(2) +
            '</li>';
        } else {
          if (inList) { html += '</ul>'; inList = false; }
          html += `<p>${parseInlineMarkdown(line)}</p>`;
        }
      });
      if (inList) html += '</ul>';
      html += '</div>';
      return html;
    }
  );

  /* ── [RESOURCES] ... [/RESOURCES] ── */
  md = md.replace(
    /\[RESOURCES\]([\s\S]*?)\[\/RESOURCES\]/gi,
    (_, content) => {
      const cards = content.trim().split(/\n---\n/).map(card => {
        const lines = card.trim().split('\n')
          .map(l => l.trim()).filter(Boolean);
        const get = key => (
          lines.find(l => l.startsWith(key + ':'))
            ?.replace(key + ':', '').trim() || ''
        );
        const title    = get('title');
        const desc     = get('desc');
        const url      = get('url');
        const linkText = get('link') || url;
        const link = url
          ? `<a href="${url}" target="_blank" rel="noopener">` +
            `${linkText} →</a>`
          : '';
        return [
          '<div class="resource-card">',
          `  <h4>${title}</h4>`,
          `  <p>${desc}</p>`,
          `  ${link}`,
          '</div>',
        ].join('\n');
      });
      return `<div class="resource-grid">${cards.join('')}</div>`;
    }
  );

  /* ── Fenced code blocks ── */
  md = md.replace(/```(\w*)\n([\s\S]*?)```/gm, (_, lang, code) => [
    '<div class="code-block">',
    '  <div class="code-block-header">',
    `    <span>${lang || 'bash'}</span>`,
    '  </div>',
    `  <pre>${escHtml(code.trim())}</pre>`,
    '</div>',
  ].join('\n'));

  /* ── Tables ── */
  md = md.replace(
    /(\|.+\|\n)((?:\|[-: ]+)+\|\n)((?:\|.+\|\n?)+)/gm,
    (_, header, _sep, body) => {
      const parseRow = row =>
        row.trim()
          .split('|')
          .filter((_, i, a) => i > 0 && i < a.length - 1)
          .map(c => c.trim());
      const headers = parseRow(header);
      const rows    = body.trim().split('\n').map(parseRow);
      const ths = headers
        .map(h => `<th>${parseInlineMarkdown(h)}</th>`)
        .join('');
      const trs = rows.map(r =>
        '<tr>' +
        r.map(c => `<td>${parseInlineMarkdown(c)}</td>`).join('') +
        '</tr>'
      ).join('');
      return (
        '<table class="lesson-table">' +
        `<thead><tr>${ths}</tr></thead>` +
        `<tbody>${trs}</tbody>` +
        '</table>'
      );
    }
  );

  /* ── Images ![alt](src "caption") ── */
  md = md.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (_, alt, src) => {
    const parts   = src.split(' "');
    const imgSrc  = parts[0].trim();
    const caption = parts[1]
      ? parts[1].replace('"', '').trim()
      : alt;
    const cap = caption
      ? `<p class="lesson-img-caption">${caption}</p>`
      : '';
    return `<img src="${imgSrc}" alt="${alt}" class="lesson-img">${cap}`;
  });

  /* ── Block-level pass: split on double newline ── */
  const html = md.split(/\n\n+/).map(block => {
    block = block.trim();
    if (!block) return '';
    if (/^</.test(block)) return block;

    if (/^### /.test(block)) {
      return `<h3>${parseInlineMarkdown(
        block.replace(/^### /, '')
      )}</h3>`;
    }
    if (/^## /.test(block)) {
      return `<h3>${parseInlineMarkdown(
        block.replace(/^## /, '')
      )}</h3>`;
    }
    if (/^[-*] /.test(block)) {
      const items = block.split('\n')
        .filter(l => /^[-*] /.test(l.trim()));
      return '<ul>' + items.map(i =>
        `<li>${parseInlineMarkdown(i.replace(/^[-*] /, ''))}</li>`
      ).join('') + '</ul>';
    }
    if (/^\d+\. /.test(block)) {
      const items = block.split('\n')
        .filter(l => /^\d+\. /.test(l.trim()));
      return '<ol>' + items.map(i =>
        `<li>${parseInlineMarkdown(i.replace(/^\d+\. /, ''))}</li>`
      ).join('') + '</ol>';
    }
    if (/^---+$/.test(block)) return '<hr />';

    return `<p>${parseInlineMarkdown(block.replace(/\n/g, ' '))}</p>`;
  }).join('\n');

  /* ── Restore protected HTML spans ── */
  return html.replace(
    /\x00HTML(\d+)\x00/g,
    (_, i) => htmlBlocks[parseInt(i)]
  );
}

/* Inline markdown — bold, italic, code, links */
function parseInlineMarkdown(str) {
  return str
    .replace(/`([^`]+)`/g,
      '<code>$1</code>')
    .replace(/\*\*(.+?)\*\*/g,
      '<strong>$1</strong>')
    .replace(/(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/g,
      '<em>$1</em>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" target="_blank" rel="noopener">$1</a>');
}

/* =============================================================
   SECTION BUILDER
   Creates DOM shells from the manifest, then loads markdown.
   ============================================================= */
function buildSectionShell(section) {
  const div = document.createElement('div');

  if (section.bare) {
    div.id        = section.id;
    div.className = 'bare-section';
    return div;
  }

  div.id        = section.id;
  div.className = 'step-section' + (section.locked ? ' locked' : '');
  if (section.requires) {
    div.dataset.requires = section.requires;
  }

  const nonBare = SECTIONS.filter(s => !s.bare);
  const isLast  = section.number === nonBare.length;

  div.innerHTML = [
    '<div class="section-header">',
    `  <span class="section-number">${section.number}</span>`,
    `  <h2>${section.title}</h2>`,
    '</div>',
    '<div class="section-content"></div>',
    isLast ? '' : '<hr />',
  ].join('\n');

  return div;
}

async function loadSection(section, shell) {
  const target =
    shell.querySelector('.section-content') || shell;
  try {
    const res = await fetch(section.src);
    if (!res.ok) throw new Error('Not found');
    const md = await res.text();
    target.innerHTML = parseMarkdown(md);
  } catch (e) {
    target.innerHTML =
      `<p style="color:var(--danger);font-size:13px">` +
      `Could not load ${section.src}</p>`;
  }
}

async function buildLesson() {
  const root = document.getElementById('lesson-root');
  if (!root) return;

  // Build all shells first so DOM structure exists
  const shells = SECTIONS.map(section => {
    const shell = buildSectionShell(section);
    root.appendChild(shell);
    return { section, shell };
  });

  // Load the file explorer section first so we can init it
  // before the rest of the sections load in parallel
  const explorerEntry = shells.find(
    ({ section }) => section.bare
  );
  const restEntries = shells.filter(
    ({ section }) => !section.bare
  );

  if (explorerEntry) {
    await loadSection(
      explorerEntry.section,
      explorerEntry.shell
    );
    const feBtn = document.getElementById('fe-next-btn');
    if (feBtn) {
      initFileExplorer();
    }
  }

  // Load all remaining sections in parallel
  await Promise.all(
    restEntries.map(({ section, shell }) =>
      loadSection(section, shell)
    )
  );

  restoreProgress();

  initTooltips();
  updateProgress();
}

/* =============================================================
   INIT
   ============================================================= */
document.addEventListener('DOMContentLoaded', () => {
  updateProgress();
  buildLesson();
});
