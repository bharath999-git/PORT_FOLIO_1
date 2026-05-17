/* ============================================
   MODAL.JS — Project detail modal open/close
   ============================================ */

(function () {

  function open(content) {
    const overlay = document.getElementById('modal-overlay');
    overlay.innerHTML = content;
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    const overlay = document.getElementById('modal-overlay');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
    setTimeout(() => { overlay.innerHTML = ''; }, 350);
  }

  function openProject(projectId, section) {
    const projects = window.Projects.getSection(section);
    const p = projects.find(x => x.id === projectId);
    if (!p) return;

    open(`
      <div class="modal-box">
        <div class="modal-header">
          <div class="modal-title">${p.title}</div>
          <button class="modal-close" onclick="window.Modal.close()">✕</button>
        </div>
        <div class="modal-body">
          <div class="card-tag" style="margin-bottom:1rem">${(p.tags || section).toUpperCase()}</div>
          ${p.image ? `
            <div class="modal-gallery">
              <img src="${p.image}" alt="${p.title}">
            </div>` : ''}
          <p class="modal-desc">${p.desc || 'No description provided.'}</p>
          <div class="card-links" style="margin-top:1rem">
            ${p.github ? `<a href="${p.github}" target="_blank" class="card-link">[GITHUB]</a>` : ''}
            ${p.demo   ? `<a href="${p.demo}"   target="_blank" class="card-link">[DEMO]</a>`   : ''}
            ${p.video  ? `<a href="${p.video}"  target="_blank" class="card-link">[VIDEO]</a>`  : ''}
          </div>
        </div>
      </div>`);
  }

  function openStaticProject(data) {
    // data: { title, tag, desc, images[], links{} }
    const imgs = (data.images || []).map(src =>
      src
        ? `<img src="${src}" alt="${data.title}" loading="lazy">`
        : `<div class="img-placeholder">[ IMAGE PLACEHOLDER ]</div>`
    ).join('');

    const links = Object.entries(data.links || {}).map(([label, url]) =>
      url ? `<a href="${url}" target="_blank" class="card-link">[${label}]</a>` : ''
    ).join('');

    open(`
      <div class="modal-box">
        <div class="modal-header">
          <div class="modal-title">${data.title}</div>
          <button class="modal-close" onclick="window.Modal.close()">✕</button>
        </div>
        <div class="modal-body">
          <div class="card-tag" style="margin-bottom:1rem">${(data.tag || '').toUpperCase()}</div>
          ${imgs ? `<div class="modal-gallery">${imgs}</div>` : ''}
          <p class="modal-desc">${data.desc || ''}</p>
          ${data.extra ? `<p class="modal-desc" style="margin-top:.8rem">${data.extra}</p>` : ''}
          <div class="card-links" style="margin-top:1.2rem">${links}</div>
        </div>
      </div>`);
  }

  // Close on overlay backdrop click
  document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.getElementById('modal-overlay');
    if (overlay) {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) close();
      });
    }

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') close();
    });
  });

  window.Modal = { open, close, openProject, openStaticProject };
})();
