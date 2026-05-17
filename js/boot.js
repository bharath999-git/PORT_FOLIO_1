/* ============================================
   BOOT.JS — Boot sequence animation logic
   ============================================ */

const BOOT_LINES = [
  { text: 'PORTFOLIO_OS v2.5 — INITIALIZING...', delay: 0,    type: 'dim' },
  { text: '[BIOS] Memory check: 8192MB OK', delay: 280,  type: 'ok' },
  { text: '[BIOS] CPU: STARK-CLASS PROCESSOR DETECTED', delay: 480,  type: 'ok' },
  { text: '[LOAD] CSS_ENGINE..................... OK', delay: 700,  type: 'ok' },
  { text: '[LOAD] JAVASCRIPT_RUNTIME............. OK', delay: 880,  type: 'ok' },
  { text: '[LOAD] CIRCUIT_SIMULATOR.............. OK', delay: 1060, type: 'ok' },
  { text: '[LOAD] VIBE_CODER_MODULE.............. OK', delay: 1220, type: 'ok' },
  { text: '[MOUNT] HACKATHON_LOGS................ OK', delay: 1400, type: 'ok' },
  { text: '[MOUNT] PROJECT_DATABASE.............. OK', delay: 1560, type: 'ok' },
  { text: '[NET] CONNECTING TO BHARATH_NET....... OK', delay: 1740, type: 'ok' },
  { text: '[WARN] COFFEE_LEVELS: CRITICALLY_LOW', delay: 1900, type: 'warn' },
  { text: '[SYS] LOADING USER: BHARATH_R......... OK', delay: 2080, type: 'ok' },
  { text: '[SYS] MOOD: BUILDER_MODE_ACTIVATED', delay: 2260, type: 'ok' },
  { text: '[SYS] MASCOTS: DEPLOYED', delay: 2420, type: 'ok' },
  { text: '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', delay: 2600, type: 'dim' },
  { text: 'ALL SYSTEMS NOMINAL. LAUNCHING...', delay: 2750, type: 'ok' },
];

let bootDone = false;

function runBoot() {
  const logArea    = document.getElementById('boot-log-area');
  const progressFill = document.getElementById('boot-progress-fill');
  const progressPct  = document.getElementById('boot-progress-pct');
  const bootScreen   = document.getElementById('boot-screen');
  const titleScreen  = document.getElementById('boot-title-screen');
  const glitchFlash  = document.getElementById('glitch-flash');

  if (!logArea) return;

  const total = BOOT_LINES.length;

  BOOT_LINES.forEach((item, i) => {
    setTimeout(() => {
      // Add log line
      const line = document.createElement('span');
      line.className = 'log-line';

      const pct = Math.round(((i + 1) / total) * 100);

      // Color spans
      const colored = document.createElement('span');
      if (item.type === 'ok')   colored.className = 'log-ok';
      if (item.type === 'warn') colored.className = 'log-warn';
      if (item.type === 'fail') colored.className = 'log-fail';
      if (item.type === 'dim')  colored.className = 'log-dim';
      colored.textContent = item.text;
      line.appendChild(colored);
      logArea.appendChild(line);

      // Trigger visibility
      requestAnimationFrame(() => {
        requestAnimationFrame(() => { line.classList.add('visible'); });
      });

      // Update progress
      progressFill.style.width = pct + '%';
      progressPct.textContent  = pct + '%';

      // Scroll to bottom
      logArea.scrollTop = logArea.scrollHeight;

      // After last line: transition to title
      if (i === total - 1) {
        setTimeout(showTitleScreen, 500);
      }
    }, item.delay);
  });

  // Allow skip on click/keydown
  document.addEventListener('keydown', skipBoot, { once: true });
  bootScreen.addEventListener('click', skipBoot, { once: true });

  function skipBoot() {
    if (bootDone) return;
    // fill everything instantly
    BOOT_LINES.forEach((item, i) => {
      const line = document.createElement('span');
      line.className = 'log-line visible';
      const colored = document.createElement('span');
      if (item.type === 'ok')   colored.className = 'log-ok';
      if (item.type === 'warn') colored.className = 'log-warn';
      if (item.type === 'dim')  colored.className = 'log-dim';
      colored.textContent = item.text;
      line.appendChild(colored);
      logArea.appendChild(line);
    });
    progressFill.style.width = '100%';
    progressPct.textContent = '100%';
    showTitleScreen();
  }
}

function showTitleScreen() {
  if (bootDone) return;
  const bootScreen  = document.getElementById('boot-screen');
  const titleScreen = document.getElementById('boot-title-screen');
  const glitchFlash = document.getElementById('glitch-flash');

  // Glitch flash
  glitchFlash.classList.add('flash');

  setTimeout(() => {
    bootScreen.style.display = 'none';
    titleScreen.classList.add('active');

    setTimeout(() => {
      titleScreen.classList.add('slam');

      // Listen for ENTER or click to continue
      document.addEventListener('keydown', function onKey(e) {
        if (e.key === 'Enter' || e.key === ' ') { launchPortfolio(); document.removeEventListener('keydown', onKey); }
      });
      titleScreen.addEventListener('click', launchPortfolio, { once: true });
    }, 100);
  }, 300);
}

function launchPortfolio() {
  if (bootDone) return;
  bootDone = true;
  const titleScreen = document.getElementById('boot-title-screen');
  const glitchFlash = document.getElementById('glitch-flash');
  const mainNav     = document.getElementById('main-nav');

  glitchFlash.classList.remove('flash');
  glitchFlash.classList.add('flash');

  setTimeout(() => {
    titleScreen.style.opacity = '0';
    titleScreen.style.transition = 'opacity 0.5s';

    setTimeout(() => {
      titleScreen.style.display = 'none';
      mainNav.classList.add('visible');
      // Show hero section
      window.Navigation && window.Navigation.goTo('hero', true);
    }, 500);
  }, 200);
}

document.addEventListener('DOMContentLoaded', runBoot);
