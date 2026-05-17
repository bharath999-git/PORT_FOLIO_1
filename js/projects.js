/* ============================================
   PROJECTS.JS — Add Project form + localStorage
   ============================================ */

(function () {

  const STORAGE_KEY = 'portfolioOS_projects';

  function getProjects() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    } catch { return {}; }
  }

  function saveProjects(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  function addProject(section, project) {
    const all = getProjects();
    if (!all[section]) all[section] = [];
    project.id = Date.now().toString();
    all[section].push(project);
    saveProjects(all);
    return project;
  }

  function getSection(section) {
    return (getProjects()[section] || []);
  }

  /* ── Render a saved card into a grid ── */
  function renderSavedCards(section, gridEl) {
    const projects = getSection(section);
    projects.forEach(p => {
      const card = buildCard(p, section);
      gridEl.appendChild(card);
    });
  }

  function buildCard(p, section) {
    const card = document.createElement('div');
    card.className = 'project-card fade-up';
    card.setAttribute('data-id', p.id);
    card.innerHTML = `
      <div class="card-thumb">
        ${p.image
          ? `<img src="${p.image}" alt="${p.title}" loading="lazy">`
          : `<div class="card-thumb-placeholder">◈</div>`}
      </div>
      <div class="card-body">
        <div class="card-tag">${(p.tags || section).toUpperCase()}</div>
        <div class="card-title">${p.title}</div>
        <p class="card-desc">${p.desc}</p>
        <div class="card-links">
          ${p.github ? `<a href="${p.github}" target="_blank" class="card-link">[GITHUB]</a>` : ''}
          ${p.demo   ? `<a href="${p.demo}"   target="_blank" class="card-link">[DEMO]</a>`   : ''}
          ${p.video  ? `<a href="${p.video}"  target="_blank" class="card-link">[VIDEO]</a>`  : ''}
          <button class="card-open-btn" onclick="window.Modal.openProject('${p.id}','${section}')">[VIEW]</button>
        </div>
      </div>`;
    return card;
  }

  /* ── Add Project modal ── */
  function openAddForm(section) {
    const overlay = document.getElementById('modal-overlay');
    overlay.innerHTML = `
      <div class="modal-box form-modal-box">
        <div class="modal-header">
          <div class="modal-title">+ ADD PROJECT — ${section.toUpperCase()}</div>
          <button class="modal-close" onclick="window.Modal.close()">✕</button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label class="form-label">PROJECT NAME</label>
            <input class="form-input" id="fp-title" placeholder="My Awesome Project">
          </div>
          <div class="form-group">
            <label class="form-label">DESCRIPTION</label>
            <textarea class="form-textarea" id="fp-desc" placeholder="What does it do?"></textarea>
          </div>
          <div class="form-group">
            <label class="form-label">TAGS / TECH STACK</label>
            <input class="form-input" id="fp-tags" placeholder="React, Node, CSS...">
          </div>
          <div class="form-group">
            <label class="form-label">GITHUB LINK</label>
            <input class="form-input" id="fp-github" placeholder="https://github.com/...">
          </div>
          <div class="form-group">
            <label class="form-label">DEMO LINK</label>
            <input class="form-input" id="fp-demo" placeholder="https://yourproject.vercel.app">
          </div>
          <div class="form-group">
            <label class="form-label">VIDEO LINK</label>
            <input class="form-input" id="fp-video" placeholder="https://youtube.com/...">
          </div>
          <div class="form-group">
            <label class="form-label">IMAGE URL (or leave blank)</label>
            <input class="form-input" id="fp-image" placeholder="https://...or relative path">
          </div>
          <button class="form-submit" onclick="window.Projects.submitForm('${section}')">
            ▶ ADD PROJECT
          </button>
        </div>
      </div>`;
    overlay.classList.add('open');
  }

  function submitForm(section) {
    const title  = document.getElementById('fp-title')?.value.trim();
    const desc   = document.getElementById('fp-desc')?.value.trim();
    const tags   = document.getElementById('fp-tags')?.value.trim();
    const github = document.getElementById('fp-github')?.value.trim();
    const demo   = document.getElementById('fp-demo')?.value.trim();
    const video  = document.getElementById('fp-video')?.value.trim();
    const image  = document.getElementById('fp-image')?.value.trim();

    if (!title) { alert('Please enter a project name.'); return; }

    const project = { title, desc, tags, github, demo, video, image };
    const saved = addProject(section, project);

    // Append card to grid
    const grid = document.querySelector(`#section-${section} .cards-grid`);
    if (grid) {
      const card = buildCard(saved, section);
      // Insert before add button
      const addBtn = grid.parentElement.querySelector('.add-project-btn');
      if (addBtn) addBtn.parentElement.insertBefore(card, addBtn);
      else grid.appendChild(card);
    }

    window.Modal.close();
  }

  /* ── Init: load saved cards on page ready ── */
  function init() {
    const sectionIds = ['css','sims','hackathons','gokart'];
    sectionIds.forEach(sec => {
      const grid = document.querySelector(`#section-${sec} .cards-grid`);
      if (grid) renderSavedCards(sec, grid);
    });
  }

  window.Projects = { openAddForm, submitForm, getSection, buildCard, init };

  document.addEventListener('DOMContentLoaded', init);
})();
