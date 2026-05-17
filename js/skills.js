/* ============================================
   SKILLS.JS — Skill bar animations + timeline
   ============================================ */

(function () {
  let animated = false;

  function animateBars() {
    if (animated) return;
    animated = true;

    const bars = document.querySelectorAll('.skill-bar-fill');
    bars.forEach((bar, i) => {
      const target = bar.getAttribute('data-width') || '70%';
      setTimeout(() => {
        bar.style.width = target;
      }, i * 80);
    });
  }

  // Reset when leaving skills section so it re-animates next visit
  function reset() {
    animated = false;
    document.querySelectorAll('.skill-bar-fill').forEach(bar => {
      bar.style.width = '0%';
    });
  }

  window.Skills = { animateBars, reset };
})();
