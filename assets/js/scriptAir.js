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

// Enhanced Services Carousel Logic
(function(){
  const serviceCards = document.querySelectorAll('.service-card');
  const paginationDots = document.querySelectorAll('.pagination-dot');
  const carouselContainer = document.querySelector('.services-carousel');
  let currentIndex = 2; // Start with third dot active
  let isAnimating = false;
  
  // Get responsive settings
  function getResponsiveSettings() {
    const width = window.innerWidth;
    if (width < 768) {
      return { visible: 1, gap: 16 }; // Mobile: 1 card
    } else if (width < 1024) {
      return { visible: 2, gap: 24 }; // Tablet: 2 cards
    } else {
      return { visible: 3, gap: 32 }; // Desktop: 3 cards
    }
  }

  function updateCarousel() {
    if (isAnimating) return;
    isAnimating = true;
    
    const settings = getResponsiveSettings();
    const totalCards = serviceCards.length;
    
    // Add smooth transition class
    serviceCards.forEach(card => {
      card.classList.add('carousel-transitioning');
    });
    
    // Hide all cards first
    serviceCards.forEach(card => {
      card.classList.add('hidden');
    });
    
    // Use requestAnimationFrame for smooth transition
    requestAnimationFrame(() => {
      // Show visible cards
      for (let i = 0; i < settings.visible; i++) {
        const cardIndex = (currentIndex + i) % totalCards;
        const card = serviceCards[cardIndex];
        card.classList.remove('hidden');
      }
      
      // Update pagination dots
      updatePaginationDots();
      
      // Remove transition class after animation
      setTimeout(() => {
        serviceCards.forEach(card => {
          card.classList.remove('carousel-transitioning');
        });
        isAnimating = false;
      }, 300);
    });
  }

  function updatePaginationDots() {
    paginationDots.forEach((dot, index) => {
      if (index === currentIndex) {
        dot.classList.add('active');
        dot.classList.remove('bg-gray-300');
        dot.classList.add('bg-[var(--color-orange)]');
      } else {
        dot.classList.remove('active');
        dot.classList.add('bg-gray-300');
        dot.classList.remove('bg-[var(--color-orange)]');
      }
    });
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % serviceCards.length;
    updateCarousel();
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + serviceCards.length) % serviceCards.length;
    updateCarousel();
  }

  // Initialize carousel
  updateCarousel();

  // Add click handlers to pagination dots
  paginationDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      if (!isAnimating) {
        currentIndex = index;
        updateCarousel();
      }
    });
  });

  // Auto-play functionality
  let autoPlayInterval;
  function startAutoPlay() {
    autoPlayInterval = setInterval(nextSlide, 4000);
  }
  
  function stopAutoPlay() {
    clearInterval(autoPlayInterval);
  }

  // Start auto-play
  startAutoPlay();

  // Pause auto-play on hover
  if (carouselContainer) {
    carouselContainer.addEventListener('mouseenter', stopAutoPlay);
    carouselContainer.addEventListener('mouseleave', startAutoPlay);
  }

  // Handle window resize
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      updateCarousel();
    }, 250);
  });

  // Touch/swipe support for mobile
  let startX = 0;
  let startY = 0;
  
  carouselContainer?.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
  });
  
  carouselContainer?.addEventListener('touchend', (e) => {
    if (!startX || !startY) return;
    
    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;
    
    const diffX = startX - endX;
    const diffY = startY - endY;
    
    // Only trigger if horizontal swipe is more significant than vertical
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
      if (diffX > 0) {
        nextSlide(); // Swipe left - next slide
      } else {
        prevSlide(); // Swipe right - previous slide
      }
    }
    
    startX = 0;
    startY = 0;
  });
})();

// Lenis smooth scrolling for this page
(function(){
  if (!window.Lenis) return;
  const lenis = new Lenis({
    duration: 3.5,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    smoothTouch: true,
  });
  function raf(time){
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
  // Anchor links within page
  document.querySelectorAll('a[href^="#"]').forEach((a)=>{
    const hash = a.getAttribute('href');
    if (!hash || hash === '#') return;
    a.addEventListener('click', (e)=>{
      const t = document.querySelector(hash);
      if (!t) return;
      e.preventDefault();
      lenis.scrollTo(t, { duration: 3.5 });
    });
  });
})();

  // ==== Video Modal Logic ====
  document.querySelectorAll(".open-video").forEach((btn) => {
    btn.addEventListener("click", () => {
      const src =
        (btn.dataset.video || "").replace("?autoplay=1", "") +
        "?autoplay=1&rel=0";
      const modal = document.getElementById("vcModal");
      const frame = document.getElementById("vcFrame");
      const modalContent = modal.querySelector("div");
      
      frame.src = src;
      modal.classList.remove("hidden");
      modal.classList.add("flex");
      
      // Animate modal in
      setTimeout(() => {
        modalContent.classList.remove("scale-95", "opacity-0");
        modalContent.classList.add("scale-100", "opacity-100");
      }, 10);
    });
  });
  
  // close
  function closeVC() {
    const m = document.getElementById("vcModal");
    const f = document.getElementById("vcFrame");
    const modalContent = m.querySelector("div");
    
    // Animate modal out
    modalContent.classList.remove("scale-100", "opacity-100");
    modalContent.classList.add("scale-95", "opacity-0");
    
    setTimeout(() => {
      f.src = "";
      m.classList.add("hidden");
      m.classList.remove("flex");
    }, 300);
  }
  document.getElementById("vcClose").addEventListener("click", closeVC);
  document.getElementById("vcModal").addEventListener("click", (e) => {
    if (e.target.id === "vcModal") closeVC();
  });

// === Pricing Toggle ===
(function () {
  const monthlyBtn = document.getElementById("monthlyBtn");
  const yearlyBtn = document.getElementById("yearlyBtn");
  const prices = document.querySelectorAll(".price");

  if (!monthlyBtn || !yearlyBtn || !prices.length) return;

  // Reset + highlight active button
  function setActive(button) {
    [monthlyBtn, yearlyBtn].forEach((btn) => {
      btn.classList.remove("bg-[var(--color-orange)]", "text-white", "shadow");
      btn.classList.add("bg-white", "text-[#003B49]", "border", "border-gray-200");
    });
    button.classList.add("bg-[var(--color-orange)]", "text-white", "shadow");
    button.classList.remove("bg-white", "text-[#003B49]", "border", "border-gray-200");
  }

  // Animate numbers smoothly
  function animateValue(el, start, end, duration, suffix) {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const value = Math.floor(progress * (end - start) + start);
      el.innerHTML = `$${value} <span class="text-sm font-normal text-gray-500">${suffix}</span>`;
      if (progress < 1) window.requestAnimationFrame(step);
    };
    window.requestAnimationFrame(step);
  }

  monthlyBtn.addEventListener("click", () => {
    setActive(monthlyBtn);
    prices.forEach((p) => {
      const val = parseInt(p.getAttribute("data-monthly"));
      const current = parseInt(p.textContent.replace(/\D/g, "")) || 0;
      animateValue(p, current, val, 600, "/month");
    });
  });

  yearlyBtn.addEventListener("click", () => {
    setActive(yearlyBtn);
    prices.forEach((p) => {
      const val = parseInt(p.getAttribute("data-yearly"));
      const current = parseInt(p.textContent.replace(/\D/g, "")) || 0;
      animateValue(p, current, val, 600, "/year");
    });
  });
})();

