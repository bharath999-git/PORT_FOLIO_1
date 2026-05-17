/* ============================================
   NAVIGATION.JS — Section switching + transitions
   ============================================ */

(function () {
  const SECTIONS = ['hero','about','css','sims','hackathons','gokart','skills','contact'];
  let current = null;
  let isTransitioning = false;

  function init() {
    // Nav link clicks
    document.querySelectorAll('[data-nav]').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = link.getAttribute('data-nav');
        goTo(target);
      });
    });

    // Mobile hamburger
    const toggle = document.getElementById('nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (toggle) {
      toggle.addEventListener('click', () => {
        toggle.classList.toggle('open');
        navLinks.classList.toggle('open');
      });
    }

    // Close mobile menu on link click
    document.querySelectorAll('.nav-links [data-nav]').forEach(link => {
      link.addEventListener('click', () => {
        toggle && toggle.classList.remove('open');
        navLinks && navLinks.classList.remove('open');
      });
    });
  }

  function goTo(sectionId, instant = false) {
    if (isTransitioning && !instant) return;
    if (sectionId === current && !instant) return;

    const prevIdx = SECTIONS.indexOf(current);
    const nextIdx = SECTIONS.indexOf(sectionId);
    const isReverse = prevIdx > nextIdx;

    const flash = document.getElementById('transition-flash');

    if (!instant && current) {
      isTransitioning = true;
      const outEl = document.getElementById('section-' + current);
      if (outEl) {
        outEl.classList.remove('active');
        outEl.classList.add('exiting');
        if (isReverse) outEl.classList.add('reverse');
        setTimeout(() => {
          outEl.classList.remove('exiting', 'reverse');
        }, 450);
      }

      // Flash effect
      if (flash) {
        flash.classList.remove('flash');
        void flash.offsetWidth;
        flash.classList.add('flash');
      }

      setTimeout(() => {
        showSection(sectionId, isReverse);
        isTransitioning = false;
      }, 250);

    } else {
      showSection(sectionId, false);
    }

    updateNav(sectionId);
    updateBodyClass(sectionId);
  }

  function showSection(sectionId, isReverse) {
    // Hide all
    SECTIONS.forEach(id => {
      const el = document.getElementById('section-' + id);
      if (el) el.classList.remove('active', 'exiting', 'reverse');
    });

    const el = document.getElementById('section-' + sectionId);
    if (el) {
      el.classList.add('active');
      if (isReverse) el.classList.add('reverse');
      el.scrollTop = 0;
    }
    // Hide top nav on hero, show on all other sections
const mainNav = document.getElementById('main-nav');
if (mainNav) {
  mainNav.classList.toggle('visible', sectionId !== 'hero');
}

    current = sectionId;

    // Trigger mascot
    window.Mascots && window.Mascots.show(sectionId);

    // Trigger skill bars if skills section
    if (sectionId === 'skills') {
      window.Skills && window.Skills.animateBars();
    }
  }

  function updateNav(sectionId) {
    document.querySelectorAll('[data-nav]').forEach(link => {
      link.classList.toggle('active', link.getAttribute('data-nav') === sectionId);
    });
  }

  function updateBodyClass(sectionId) {
    document.body.className = document.body.className
      .replace(/\bin-\S+/g, '')
      .trim();
    document.body.classList.add('in-' + sectionId);
  }

  // Expose
  window.Navigation = { goTo, init, getCurrent: () => current };

  document.addEventListener('DOMContentLoaded', init);
})();
