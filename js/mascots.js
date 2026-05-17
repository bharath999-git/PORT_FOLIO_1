/* ============================================
   MASCOTS.JS — Mascot trigger per section
   ============================================ */

(function () {
  const MASCOT_MAP = {
    hero:       'mascot-robot',
    about:      'mascot-astronaut',
    css:        'mascot-monitor',
    sims:       'mascot-bulb',
    hackathons: 'mascot-trophy',
    gokart:     'mascot-car',
    skills:     'mascot-toolbox',
    contact:    'mascot-radio',
  };

  let hideTimer = null;
  let currentSection = null;

  function show(section) {
    if (section === currentSection) return;
    currentSection = section;

    const wrap = document.getElementById('mascot-wrap');
    if (!wrap) return;

    clearTimeout(hideTimer);

    // Hide first
    wrap.classList.remove('visible');
    wrap.classList.add('hiding');

    setTimeout(() => {
      // Swap mascot
      const mascotEl = wrap.querySelector('.mascot');
      if (mascotEl) mascotEl.remove();

      const newMascot = buildMascot(MASCOT_MAP[section] || 'mascot-robot');
      wrap.appendChild(newMascot);

      wrap.classList.remove('hiding');
      wrap.classList.add('visible');

      // Auto-hide after 4s
      hideTimer = setTimeout(() => {
        wrap.classList.remove('visible');
      }, 4000);
    }, 320);
  }

  function buildMascot(type) {
    const div = document.createElement('div');
    div.className = 'mascot ' + type;
    div.innerHTML = getMascotHTML(type);
    return div;
  }

  function getMascotHTML(type) {
    const m = {
      'mascot-robot': `
        <div class="robot-head">
          <div class="robot-eye left"></div>
          <div class="robot-eye right"></div>
          <div class="robot-mouth"></div>
          <div class="robot-antenna"></div>
        </div>
        <div class="robot-arm left"></div>
        <div class="robot-body"></div>
        <div class="robot-arm right"></div>
        <div class="robot-legs">
          <div class="robot-leg"></div>
          <div class="robot-leg"></div>
        </div>`,
      'mascot-astronaut': `
        <div class="astro-helmet">
          <div class="astro-visor"></div>
        </div>
        <div class="astro-arm left"></div>
        <div class="astro-body"></div>
        <div class="astro-arm right"></div>
        <div class="astro-star" style="top:2px;left:6px;animation-delay:.2s"></div>
        <div class="astro-star" style="top:6px;right:4px;animation-delay:.8s"></div>
        <div class="astro-star" style="top:0;left:50%;animation-delay:.5s"></div>`,
      'mascot-monitor': `
        <div class="monitor-screen">
          <div class="monitor-scan"></div>
          <div class="monitor-face">
            <div class="mon-eye"></div>
            <div class="mon-eye"></div>
          </div>
        </div>
        <div class="monitor-hands left"></div>
        <div class="monitor-hands right"></div>
        <div class="monitor-stand"></div>
        <div class="monitor-base"></div>`,
      'mascot-bulb': `
        <div class="bulb-glass">
          <div class="bulb-shine"></div>
          <div class="bulb-filament"></div>
        </div>
        <div class="bulb-base"></div>
        <div class="bulb-circuit">
          <div class="circuit-dot"></div>
          <div class="circuit-dot"></div>
          <div class="circuit-dot"></div>
        </div>`,
      'mascot-trophy': `
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="trophy-handle left"></div>
        <div class="trophy-cup"><div class="trophy-star">★</div></div>
        <div class="trophy-handle right"></div>
        <div class="trophy-stem"></div>
        <div class="trophy-base"></div>`,
      'mascot-car': `
        <div class="car-cockpit"></div>
        <div class="car-body"></div>
        <div class="car-wheel front"></div>
        <div class="car-wheel rear"></div>
        <div class="car-exhaust">
          <div class="exhaust-puff"></div>
          <div class="exhaust-puff"></div>
          <div class="exhaust-puff"></div>
        </div>`,
      'mascot-toolbox': `
        <div class="tool tool-wrench"></div>
        <div class="tool tool-screwdriver"></div>
        <div class="toolbox-handle"></div>
        <div class="toolbox-latch"></div>
        <div class="toolbox-body"></div>`,
      'mascot-radio': `
        <div class="radio-antenna">
          <div class="signal-ring"></div>
          <div class="signal-ring"></div>
          <div class="signal-ring"></div>
        </div>
        <div class="radio-body">
          <div class="radio-led"></div>
          <div class="radio-dial"></div>
        </div>`,
    };
    return m[type] || m['mascot-robot'];
  }

  window.Mascots = { show };
})();
