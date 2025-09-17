// Sidebar drawer (reuse pattern from main script but scoped)
(function(){
  const root = document.getElementById('airDrawer');
  const panel = document.getElementById('airPanel');
  const backdrop = document.getElementById('airBackdrop');
  const openBtn = document.getElementById('airHamburger');
  const closeBtn = document.getElementById('airClose');
  if (root && panel && openBtn) {
    const open = () => {
      root.classList.remove('hidden');
      requestAnimationFrame(() => {
        backdrop && backdrop.classList.add('opacity-100');
        panel.classList.remove('translate-x-full');
      });
      document.body.style.overflow = 'hidden';
    };
    const close = () => {
      backdrop && backdrop.classList.remove('opacity-100');
      panel.classList.add('translate-x-full');
      setTimeout(() => { root.classList.add('hidden'); document.body.style.overflow = ''; }, 220);
    };
    openBtn.addEventListener('click', open);
    closeBtn && closeBtn.addEventListener('click', close);
    backdrop && backdrop.addEventListener('click', close);
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
  }
})();

// Hero thumbnails logic
(function(){
  const mainImg = document.getElementById('heroMainImage');
  const strip = document.getElementById('thumbStrip');
  const prevBtn = document.getElementById('thumbPrev');
  const nextBtn = document.getElementById('thumbNext');
  if (!mainImg || !strip) return;

  const getThumbs = () => Array.from(strip.querySelectorAll('.hero-thumb'));

  // Click to swap main image
  strip.addEventListener('click', (e) => {
    const img = e.target.closest('.hero-thumb');
    if (!img) return;
    const src = img.getAttribute('data-large') || img.getAttribute('src');
    if (src) mainImg.src = src;
  });

  // Rotate thumbnails left/right
  function rotate(dir) {
    const thumbs = getThumbs();
    if (thumbs.length < 2) return;
    if (dir < 0) {
      // left: move first to end
      const first = thumbs[0];
      strip.appendChild(first);
    } else {
      // right: move last to start
      const last = thumbs[thumbs.length - 1];
      strip.insertBefore(last, thumbs[0]);
    }
  }

  prevBtn && prevBtn.addEventListener('click', () => rotate(-1));
  nextBtn && nextBtn.addEventListener('click', () => rotate(1));
})();


