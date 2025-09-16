document.addEventListener("DOMContentLoaded", () => {
  /** ========== HEADER ========== **/
  const menuBtn = document.getElementById("menuToggle");
  const mobileNav = document.querySelector(".mobile-nav");

  if (menuBtn && mobileNav) {
    menuBtn.addEventListener("click", () => {
      mobileNav.classList.toggle("active");
    });

    // Open on hover over hamburger or drawer
    const openMenu = () => mobileNav.classList.add("active");
    menuBtn.addEventListener("mouseenter", openMenu);
    mobileNav.addEventListener("mouseenter", openMenu);
    // Close when cursor leaves the drawer area
    mobileNav.addEventListener("mouseleave", () => {
      closeMobileNav();
    });

    // Click outside to close
    document.addEventListener("click", (e) => {
      const target = e.target;
      const clickedInsideMenu = mobileNav.contains(target);
      const clickedHamburger = menuBtn.contains(target);
      if (!clickedInsideMenu && !clickedHamburger) {
        closeMobileNav();
      }
    });
  }

  // Parent dropdown toggle
  const mobileItems = document.querySelectorAll(".mobile-item > a");
  mobileItems.forEach((link) => {
    const dropdown = link.nextElementSibling;
    if (dropdown) {
      // Hover open/close
      const parent = link.parentElement;
      let hoverCloseTimeout;
      if (parent) {
        parent.addEventListener("mouseenter", () => {
          clearTimeout(hoverCloseTimeout);
          dropdown.style.maxHeight = dropdown.scrollHeight + "px";
          link.querySelector("i")?.classList.add("rotate-180");
        });
        parent.addEventListener("mouseleave", () => {
          hoverCloseTimeout = setTimeout(() => {
            dropdown.style.maxHeight = "0px";
            link.querySelector("i")?.classList.remove("rotate-180");
          }, 80);
        });
      }

      link.addEventListener("click", (e) => {
        e.preventDefault();
        if (dropdown.style.maxHeight && dropdown.style.maxHeight !== "0px") {
          dropdown.style.maxHeight = "0px";
          link.querySelector("i")?.classList.remove("rotate-180");
        } else {
          dropdown.style.maxHeight = dropdown.scrollHeight + "px";
          link.querySelector("i")?.classList.add("rotate-180");
        }
      });
    }
  });

  // Child links
  document
    .querySelectorAll(".mobile-dropdown a, .mobile-nav > a")
    .forEach((link) => {
      const isParent =
        link.nextElementSibling?.classList?.contains("mobile-dropdown");
      if (!isParent) {
        link.addEventListener("click", (e) => {
          const href = link.getAttribute("href");
          if (href?.startsWith("#")) {
            const target = document.querySelector(href);
            if (target) {
              e.preventDefault();
              target.scrollIntoView({ behavior: "smooth" });
            }
          }
          closeMobileNav();
        });
      }
    });

  // Sticky nav shadow
  const nav = document.querySelector("nav");
  if (nav) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 10) {
        nav.classList.add("shadow-md");
      } else {
        nav.classList.remove("shadow-md");
      }
    });
  }
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 768) {
      closeMobileNav();
    }
  });

  function closeMobileNav() {
    if (mobileNav) mobileNav.classList.remove("active");
    document.querySelectorAll(".mobile-dropdown").forEach((dd) => {
      dd.style.maxHeight = "0px";
    });
    document.querySelectorAll(".mobile-item i").forEach((icon) => {
      icon.classList.remove("rotate-180");
    });
  }

  // Search toggle (desktop)
  const searchToggle = document.getElementById("searchToggle");
  const searchInput = document.getElementById("searchInput");

  if (searchToggle && searchInput) {
    searchToggle.addEventListener("click", () => {
      searchInput.classList.toggle("open");
      if (searchInput.classList.contains("open")) {
        searchInput.focus();
      } else {
        searchInput.value = "";
      }
    });

    // Close search when clicking outside
    document.addEventListener("click", (e) => {
      if (!searchToggle.contains(e.target) && !searchInput.contains(e.target)) {
        searchInput.classList.remove("open");
        searchInput.value = "";
      }
    });
  }

  // Testimonials: simple next/prev
  const testimonials = [
    {
      text: "Consectetur adipiscing elit. Integer nunc viverra laoreet est the porta pretium metus aliquam eget maecenas porta nunc viverra Aenean adipiscing elit.",
      rating: "4.8*",
      name: "Eleanor Pena",
      role: "Senior Director",
    },
    {
      text: "Logistics team was phenomenal. Timely delivery and excellent communication throughout the process.",
      rating: "4.9*",
      name: "Robert Fox",
      role: "Operations Lead",
    },
    {
      text: "Exceptional service and competitive pricing. We trust them with our critical shipments.",
      rating: "5.0*",
      name: "Theresa Webb",
      role: "Supply Chain Manager",
    },
  ];

  const tText = document.getElementById("reviewText");
  const tRating = document.getElementById("reviewRating");
  const tName = document.getElementById("reviewName");
  const tRole = document.getElementById("reviewRole");
  const tPrev = document.getElementById("tPrev");
  const tNext = document.getElementById("tNext");
  let tIdx = 0;

  function renderTestimonial(i) {
    if (!tText || !tRating || !tName || !tRole) return;
    const t = testimonials[i];
    tText.textContent = `“${t.text}”`;
    tRating.textContent = t.rating;
    tName.textContent = t.name;
    tRole.textContent = t.role;
  }

  if (tPrev && tNext) {
    tPrev.addEventListener("click", () => {
      tIdx = (tIdx - 1 + testimonials.length) % testimonials.length;
      renderTestimonial(tIdx);
      +(
        // deactivate right arrow styling when moving left
        (+tNext.classList.remove("bg-[var(--color-orange)]", "text-white"))
      );
      +tNext.classList.add("border", "border-gray-300");
    });
    tNext.addEventListener("click", () => {
      tIdx = (tIdx + 1) % testimonials.length;
      renderTestimonial(tIdx);
      +(
        // activate right arrow styling when moving right
        (+tNext.classList.add("bg-[var(--color-orange)]", "text-white"))
      );
      +tNext.classList.remove("border", "border-gray-300");
    });
    renderTestimonial(tIdx);
  }

  // Counter Animation for a given container
  function animateCountersIn(container) {
    container.querySelectorAll(".counter").forEach((counter) => {
      const target = parseInt(counter.getAttribute("data-target")) || 0;
      let current = 0;
      const duration = 1200;
      const stepTime = 20;
      const steps = duration / stepTime;
      const increment = target / steps;

      const updateCounter = () => {
        if (current < target) {
          current += increment;
          counter.textContent = formatNumber(Math.floor(current));
          setTimeout(updateCounter, stepTime);
        } else {
          counter.textContent = formatNumber(target);
        }
      };
      updateCounter();
    });
  }

  function formatNumber(num) {
    if (num >= 1_000_000) {
      return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
    }
    if (num >= 1000) {
      return Math.floor(num / 1000) + "K";
    }
    return num;
  }

  // Intersection Observer for counter sections
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCountersIn(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.3,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  document.querySelectorAll(".counter-section").forEach((section) => {
    counterObserver.observe(section);
  });

  //  stars //
  document.querySelectorAll(".review-meta").forEach((el) => {
    const r = Math.max(0, Math.min(5, parseFloat(el.dataset.rating) || 0));
    const n = parseInt(el.dataset.feedbacks) || 0;
    const stars = el.querySelector(".stars");
    const copy = el.querySelector(".review-copy");
    stars.style.setProperty("--rating", r);
    stars.setAttribute("aria-label", `${r.toFixed(1)} out of 5 stars`);
    copy.textContent = `${r.toFixed(1)} reviews based on ${Intl.NumberFormat(
      "en",
      { notation: "compact" }
    ).format(n)} Feedbacks`;
  });

  // ==== Hero background slider via indicators ====
  const heroEl = document.getElementById("hero");
  const indicators = document.querySelectorAll(".scroll-indicator");
  const heroImages = [
    "assets/images/header-bg.png",
    "assets/images/header-bg.png",
    "assets/images/header-bg.png",
    "assets/images/header-bg.png",
  ];
  let heroIdx = 0;

  function setHeroBackground(idx) {
    if (!heroEl) return;
    const overlay = document.createElement("div");
    overlay.className = "absolute inset-0 opacity-0 transition-opacity duration-100 z-0";
    overlay.style.backgroundImage = `url('${heroImages[idx]}')`;
    overlay.style.backgroundSize = "cover";
    overlay.style.backgroundPosition = "center";
    overlay.style.backgroundRepeat = "no-repeat";
    heroEl.appendChild(overlay);

    requestAnimationFrame(() => overlay.classList.add("opacity-100"));

    setTimeout(() => {
      heroEl.style.backgroundImage = `url('${heroImages[idx]}')`;
      overlay.remove();
    }, 500);
  }

  function goPrev() {
    heroIdx = (heroIdx - 1 + heroImages.length) % heroImages.length;
    setHeroBackground(heroIdx);
  }
  function goNext() {
    heroIdx = (heroIdx + 1) % heroImages.length;
    setHeroBackground(heroIdx);
  }

  if (heroEl && indicators.length === 4) {
    // 0: up arrow => prev
    indicators[0].addEventListener("click", goPrev);
    // 1: chevron up => prev
    indicators[1].addEventListener("click", goPrev);
    // 2: chevron down => next
    indicators[2].addEventListener("click", goNext);
    // 3: down arrow => next
    indicators[3].addEventListener("click", goNext);
  }

  // Card Slider with Next/Prev Buttons

  const slider = document.getElementById("cardSlider");
  const nextBtn = document.getElementById("nextBtn");
  const prevBtn = document.getElementById("prevBtn");

  function getScrollStep() {
    if (!slider) return 0;
    const firstCard = slider.querySelector('div[role="card"], .relative');
    const card = firstCard || slider.firstElementChild;
    if (!card) return 0;
    const cardWidth = card.getBoundingClientRect().width;
    const style = window.getComputedStyle(slider);
    const gap = parseFloat(style.columnGap || style.gap || 24) || 24;
    return cardWidth + gap;
  }

  function scrollByStep(dir) {
    const step = getScrollStep();
    if (step > 0) slider.scrollBy({ left: dir * step, behavior: "smooth" });
  }

  if (nextBtn && prevBtn && slider) {
    nextBtn.addEventListener("click", () => scrollByStep(1));
    prevBtn.addEventListener("click", () => scrollByStep(-1));
    // Keep snapping accurate on resize
    window.addEventListener("resize", () => {
      const step = getScrollStep();
      if (step > 0) {
        const idx = Math.round(slider.scrollLeft / step);
        slider.scrollTo({ left: idx * step, behavior: "auto" });
      }
    });
  }

  // Our Projects Stats
  document
    .querySelectorAll(".bottom-section, #projects-stats")
    .forEach((el) => counterObserver.observe(el));

  // ==== Get in Touch Form Logic ====
  const form = document.getElementById("quoteForm");
  const popup = document.getElementById("popup");
  const popupMsg = document.getElementById("popupMessage");
  const popupOk = document.getElementById("popupOk");
  const distanceRange = document.getElementById("distanceRange");
  const sliderValue = document.getElementById("sliderValue");

  // Update slider value dynamically
  if (distanceRange && sliderValue) {
    distanceRange.addEventListener("input", (e) => {
      const val = e.target.value;
      sliderValue.textContent = `${val} km`;
      const percent = (val / distanceRange.max) * 100;
      sliderValue.style.left = `calc(${percent}% - 20px)`;
    });
  }

  // Show popup
  function showPopup(message, success = true) {
    popupMsg.textContent = message;
    popupMsg.className = success
      ? "font-semibold text-lg text-green-600 mb-4"
      : "font-semibold text-lg text-red-600 mb-4";
    popup.classList.remove("hidden");
    setTimeout(() => {
      popup.firstElementChild.classList.add("scale-100", "opacity-100");
    }, 20);
  }

  // Hide popup
  function hidePopup() {
    popup.firstElementChild.classList.remove("scale-100", "opacity-100");
    setTimeout(() => popup.classList.add("hidden"), 300);
  }

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      let valid = true;
      form.querySelectorAll("input, select").forEach((field) => {
        if (!field.value.trim() || field.value.includes("Select")) {
          valid = false;
        }
      });

      if (!valid) {
        showPopup("⚠️ Please fill in all the information correctly.", false);
        return;
      }

      showPopup(" Your request was submitted successfully!", true);
      form.reset();
    });
  }

  // Close popup by OK button or clicking anywhere
  if (popupOk) popupOk.addEventListener("click", hidePopup);
  if (popup)
    popup.addEventListener("click", (e) => {
      if (e.target === popup) hidePopup();
    });
  // ==== Video Modal Logic ====
  document.querySelectorAll(".open-video").forEach((btn) => {
    btn.addEventListener("click", () => {
      const src =
        (btn.dataset.video || "").replace("?autoplay=1", "") +
        "?autoplay=1&rel=0";
      const modal = document.getElementById("vcModal");
      const frame = document.getElementById("vcFrame");
      frame.src = src;
      modal.classList.remove("hidden");
      modal.classList.add("flex");
    });
  });
  // close
  function closeVC() {
    const m = document.getElementById("vcModal");
    const f = document.getElementById("vcFrame");
    f.src = "";
    m.classList.add("hidden");
    m.classList.remove("flex");
  }
  document.getElementById("vcClose").addEventListener("click", closeVC);
  document.getElementById("vcModal").addEventListener("click", (e) => {
    if (e.target.id === "vcModal") closeVC();
  });

  // ==== Tabs Logic ====
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const tab = btn.dataset.tab;

      // Remove active from all
      document.querySelectorAll(".tab-btn").forEach((b) => {
        b.classList.remove(
          "text-[var(--color-orange)]",
          "border-b-2",
          "border-[var(--color-orange)]"
        );
      });
      document
        .querySelectorAll(".tab-content")
        .forEach((c) => c.classList.add("hidden"));

      // Activate current
      btn.classList.add(
        "text-[var(--color-orange)]",
        "border-b-2",
        "border-[var(--color-orange)]"
      );
      document.getElementById(`tab-${tab}`).classList.remove("hidden");
    });
  });

  // ==== Newsletter Form Logic ====
  const newsletterForm = document.getElementById("newsletterForm");

  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const emailInput = newsletterForm.querySelector("input[name='email']");
      const email = emailInput.value.trim();

      if (!email || !/\S+@\S+\.\S+/.test(email)) {
        showPopup("⚠️ Please enter a valid email address.", false);
        return;
      }

      // Success
      showPopup("✅ Thank you for subscribing to our newsletter!", true);
      newsletterForm.reset();
    });
  }
});
