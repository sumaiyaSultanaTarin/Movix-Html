      // ==== Lenis Smooth Scroll ====
      // Check if Lenis loaded
      window.addEventListener("load", () => {
        console.log("Page loaded, Lenis available:", !!window.Lenis);
        if (!window.Lenis) {
          console.error("Lenis failed to load from CDN, trying alternative...");
          // Try alternative CDN
          const script = document.createElement("script");
          script.src = "https://cdn.skypack.dev/@studio-freight/lenis@1.0.42";
          script.onload = () => {
            console.log("Lenis loaded from alternative CDN:", !!window.Lenis);
          };
          script.onerror = () => {
            console.error(
              "All Lenis CDNs failed, using fallback smooth scroll"
            );
          };
          document.head.appendChild(script);
        }
      });

function initLenis() {
  console.log("Initializing Lenis...");
  console.log("Lenis available:", !!window.Lenis);
  
  if (window.Lenis && !window.__lenis) {
    // compute sticky navbar height for offset
    const nav = document.querySelector("nav");
    const getNavOffset = () => (nav ? nav.getBoundingClientRect().height : 0);

    const lenis = new Lenis({
      smoothWheel: true,
      smoothTouch: true,
      duration: 3.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      lerp: 0.1,
      wheelMultiplier: 0.8,
      touchMultiplier: 1.2,
      normalizeWheel: true,
      syncTouch: true,
      infinite: false,
    });

    console.log("Lenis initialized:", lenis);

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Pause Lenis when modals are open
    const pauseLenis = () => {
      if (lenis) {
        lenis.stop();
        console.log("Lenis paused");
      }
    };
    
    const resumeLenis = () => {
      if (lenis) {
        lenis.start();
        console.log("Lenis resumed");
      }
    };

    // Hook ALL in-page anchor links to use Lenis
    document.querySelectorAll('a[href^="#"]').forEach((a) => {
      const hash = a.getAttribute("href");
      if (!hash || hash === "#") return;
      a.addEventListener("click", (e) => {
        const target = document.querySelector(hash);
        if (target) {
          e.preventDefault();
          lenis.scrollTo(target, { offset: -getNavOffset(), duration: 1.6 });
        }
      });
    });

    // Expose for debugging and modal control
    window.__lenis = lenis;
    window.__pauseLenis = pauseLenis;
    window.__resumeLenis = resumeLenis;
    
    console.log("Lenis setup complete");
    return true;
  } else {
    console.error("Lenis not loaded!");
    return false;
  }
}
// ==== Team Modal Functions (Global) ====
function openTeamModal(name, position, imageSrc) {
  const modal = document.getElementById("teamModal");
  const modalContent = modal.querySelector("div");
  const modalImage = document.getElementById("teamModalImage");
  const modalName = document.getElementById("teamModalName");
  const modalPosition = document.getElementById("teamModalPosition");
  
  // Prevent body scroll and pause Lenis
  document.body.style.overflow = 'hidden';
  document.body.style.paddingRight = '0px';
  if (window.__pauseLenis) window.__pauseLenis();
  
  // Set modal content
  modalImage.src = imageSrc;
  modalImage.alt = name;
  modalName.textContent = name;
  modalPosition.textContent = position;
  
  // Set social media links based on name
  const nameSlug = name.toLowerCase().replace(/\s+/g, '.');
  const nameUnderscore = name.toLowerCase().replace(/\s+/g, '_');
  
  document.getElementById("teamModalFacebook").href = `https://facebook.com/${nameSlug}`;
  document.getElementById("teamModalTwitter").href = `https://twitter.com/${nameUnderscore}`;
  document.getElementById("teamModalLinkedin").href = `https://linkedin.com/in/${nameSlug}`;
  document.getElementById("teamModalInstagram").href = `https://instagram.com/${nameUnderscore}`;
  
  // Show modal
  modal.classList.remove("hidden");
  modal.classList.add("flex");
  
  // Animate modal in
  setTimeout(() => {
    modalContent.classList.remove("scale-95", "opacity-0");
    modalContent.classList.add("scale-100", "opacity-100");
  }, 10);
}

function closeTeamModal() {
  const modal = document.getElementById("teamModal");
  const modalContent = modal.querySelector("div");
  
  // Animate modal out
  modalContent.classList.remove("scale-100", "opacity-100");
  modalContent.classList.add("scale-95", "opacity-0");
  
  setTimeout(() => {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
    
    // Restore body scroll and resume Lenis
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
    if (window.__resumeLenis) window.__resumeLenis();
  }, 300);
}

// ==== Author Modal Functions (Global) ====
function openAuthorModal(name, position, imageSrc, bio) {
  const modal = document.getElementById("authorModal");
  const modalContent = modal.querySelector("div");
  const modalImage = document.getElementById("authorModalImage");
  const modalName = document.getElementById("authorModalName");
  const modalPosition = document.getElementById("authorModalPosition");
  const modalBio = document.getElementById("authorModalBio");
  
  // Prevent body scroll and pause Lenis
  document.body.style.overflow = 'hidden';
  document.body.style.paddingRight = '0px';
  if (window.__pauseLenis) window.__pauseLenis();
  
  // Set modal content
  modalImage.src = imageSrc;
  modalImage.alt = name;
  modalName.textContent = name;
  modalPosition.textContent = position;
  modalBio.textContent = bio;
  
  // Set social media links based on name
  const nameSlug = name.toLowerCase().replace(/\s+/g, '.');
  const nameUnderscore = name.toLowerCase().replace(/\s+/g, '_');
  
  // Update social media links
  const socialLinks = modal.querySelectorAll('a[href="#"]');
  if (socialLinks.length >= 3) {
    socialLinks[0].href = `https://linkedin.com/in/${nameSlug}`;
    socialLinks[1].href = `https://twitter.com/${nameUnderscore}`;
    socialLinks[2].href = `https://instagram.com/${nameUnderscore}`;
  }
  
  // Show modal
  modal.classList.remove("hidden");
  modal.classList.add("flex");
  
  // Animate modal in
  setTimeout(() => {
    modalContent.classList.remove("scale-95", "opacity-0");
    modalContent.classList.add("scale-100", "opacity-100");
  }, 10);
}

function closeAuthorModal() {
  const modal = document.getElementById("authorModal");
  const modalContent = modal.querySelector("div");
  
  // Animate modal out
  modalContent.classList.remove("scale-100", "opacity-100");
  modalContent.classList.add("scale-95", "opacity-0");
  
  setTimeout(() => {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
    
    // Restore body scroll and resume Lenis
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
    if (window.__resumeLenis) window.__resumeLenis();
  }, 300);
}

// ==== Blog Modal Functions (Global) ====
function openBlogModal(title, author, date, imageSrc, content) {
  const modal = document.getElementById("blogModal");
  const modalContent = modal.querySelector("div");
  const modalImage = document.getElementById("blogModalImage");
  const modalTitle = document.getElementById("blogModalTitle");
  const modalAuthor = document.getElementById("blogModalAuthor");
  const modalDate = document.getElementById("blogModalDate");
  const modalContentDiv = document.getElementById("blogModalContent");
  const modalReadTime = document.getElementById("blogModalReadTime");
  
  // Prevent body scroll and pause Lenis
  document.body.style.overflow = 'hidden';
  document.body.style.paddingRight = '0px';
  if (window.__pauseLenis) window.__pauseLenis();
  
  // Set modal content
  modalImage.src = imageSrc;
  modalImage.alt = title;
  modalTitle.textContent = title;
  modalAuthor.textContent = author;
  modalDate.textContent = date;
  modalReadTime.textContent = Math.ceil(content.length / 500) + " min read";
  
  // Generate full blog content
  const fullContent = `
    <p class="text-base sm:text-lg text-gray-600 mb-4 sm:mb-6 leading-relaxed">${content}</p>
    
    <h2 class="text-lg sm:text-xl font-bold text-[#003B49] mb-3 sm:mb-4 mt-6 sm:mt-8">Key Benefits</h2>
    <ul class="list-disc list-inside space-y-2 mb-4 sm:mb-6 text-gray-700 text-sm sm:text-base">
      <li>Improved efficiency and cost reduction</li>
      <li>Enhanced customer satisfaction</li>
      <li>Real-time tracking and transparency</li>
      <li>Professional service delivery</li>
    </ul>
    
    <h2 class="text-lg sm:text-xl font-bold text-[#003B49] mb-3 sm:mb-4">Conclusion</h2>
    <p class="text-gray-700 leading-relaxed text-sm sm:text-base">
      Our commitment to excellence ensures that every shipment is handled with the utmost care and professionalism. 
      We continuously strive to improve our services and maintain the highest standards in the logistics industry.
    </p>
    
    <div class="bg-gradient-to-r from-[var(--color-orange)]/10 to-[var(--color-dark-blue)]/10 p-4 sm:p-6 rounded-lg mt-6 sm:mt-8">
      <h3 class="text-base sm:text-lg font-semibold text-[#003B49] mb-2">Ready to Get Started?</h3>
      <p class="text-gray-700 mb-3 sm:mb-4 text-sm sm:text-base">Contact us today to learn more about our logistics services and how we can help your business grow.</p>
      <button class="px-4 py-2 sm:px-6 sm:py-2 bg-[var(--color-orange)] text-white rounded-lg hover:bg-orange-600 transition-colors duration-300 text-sm sm:text-base">
        Get Quote
      </button>
    </div>
  `;
  
  modalContentDiv.innerHTML = fullContent;
  
  // Show modal
  modal.classList.remove("hidden");
  modal.classList.add("flex");
  
  // Animate modal in
  setTimeout(() => {
    modalContent.classList.remove("scale-95", "opacity-0");
    modalContent.classList.add("scale-100", "opacity-100");
  }, 10);
}

function closeBlogModal() {
  const modal = document.getElementById("blogModal");
  const modalContent = modal.querySelector("div");
  
  // Animate modal out
  modalContent.classList.remove("scale-100", "opacity-100");
  modalContent.classList.add("scale-95", "opacity-0");
  
  setTimeout(() => {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
    
    // Restore body scroll and resume Lenis
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
    if (window.__resumeLenis) window.__resumeLenis();
  }, 300);
}
// ==== END Modal Functions (Global) ====

document.addEventListener("DOMContentLoaded", () => {
  if (!initLenis()) {
    setTimeout(() => {
      console.log("Retrying Lenis initialization...");
      if (!initLenis()) {
        console.error("Lenis failed to load after retry");
      }
    }, 1000);
  }

  if (!window.__lenis) {
    console.log("Using enhanced fallback smooth scroll");
    
    // Custom smooth scroll implementation
    function smoothScrollTo(target, duration = 1200) {
      const nav = document.querySelector('nav');
      const offset = nav ? nav.getBoundingClientRect().height : 0;
      const targetPosition = target.offsetTop - offset;
      const startPosition = window.pageYOffset;
      const distance = targetPosition - startPosition;
      let startTime = null;

      function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = easeInOutCubic(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
      }

      function easeInOutCubic(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t * t + b;
        t -= 2;
        return c / 2 * (t * t * t + 2) + b;
      }

      requestAnimationFrame(animation);
    }
    
    // Add smooth scroll behavior to all anchor links
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener("click", (e) => {
        const href = link.getAttribute("href");
        const target = href ? document.querySelector(href) : null;
        if (target) {
          e.preventDefault();
          smoothScrollTo(target);
        }
      });
    });

    // Add smooth scroll to entire page
    let isScrolling = false;
    let scrollTimeout;

    function addSmoothScroll() {
      let currentScroll = window.pageYOffset;
      let targetScroll = currentScroll;
      let scrollVelocity = 0;
      let scrollAcceleration = 0;

      function updateScroll() {
        if (Math.abs(targetScroll - currentScroll) > 0.1) {
          scrollVelocity += (targetScroll - currentScroll) * 0.1;
          scrollVelocity *= 0.8; // Friction
          currentScroll += scrollVelocity;
          window.scrollTo(0, currentScroll);
          requestAnimationFrame(updateScroll);
        }
      }

      // Listen for wheel events
      document.addEventListener('wheel', (e) => {
        e.preventDefault();
        targetScroll += e.deltaY * 0.5;
        targetScroll = Math.max(0, Math.min(targetScroll, document.body.scrollHeight - window.innerHeight));
        
        if (!isScrolling) {
          isScrolling = true;
          updateScroll();
        }
        
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          isScrolling = false;
        }, 150);
      }, { passive: false });
    }

    // Only add custom scroll if Lenis completely fails
    setTimeout(() => {
      if (!window.__lenis) {
        addSmoothScroll();
        console.log("Custom smooth scroll activated");
      }
    }, 2000);
  }

  // Ensure desktop navbar links are intercepted even without Lenis
  document.querySelectorAll('.md\\:flex .nav-link[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      const target = href ? document.querySelector(href) : null;
      if (target) {
        e.preventDefault();
        if (window.__lenis) {
          const nav = document.querySelector('nav');
          const offset = nav ? -nav.getBoundingClientRect().height : 0;
          window.__lenis.scrollTo(target, { duration: 1.6, offset });
        } else {
          const nav = document.querySelector('nav');
          const offset = nav ? nav.getBoundingClientRect().height : 0;
          const targetPosition = target.offsetTop - offset;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });

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
              if (window.__lenis) {
                const nav = document.querySelector('nav');
                const offset = nav ? -nav.getBoundingClientRect().height : 0;
                window.__lenis.scrollTo(target, { duration: 1.0, offset });
              } else {
                target.scrollIntoView({ behavior: "smooth" });
              }
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

  // ==== Testimonials ==== //
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
    
    // Add fade out and slide up effect
    tText.style.opacity = '0';
    tText.style.transform = 'translateY(10px)';
    tRating.style.opacity = '0';
    tRating.style.transform = 'translateY(10px)';
    tName.style.opacity = '0';
    tName.style.transform = 'translateY(10px)';
    tRole.style.opacity = '0';
    tRole.style.transform = 'translateY(10px)';
    
    // Update content after fade out
    setTimeout(() => {
      tText.textContent = `"${t.text}"`;
      tRating.textContent = t.rating;
      tName.textContent = t.name;
      tRole.textContent = t.role;
      
      // Fade in and slide down with new content
      tText.style.opacity = '1';
      tText.style.transform = 'translateY(0)';
      tRating.style.opacity = '1';
      tRating.style.transform = 'translateY(0)';
      tName.style.opacity = '1';
      tName.style.transform = 'translateY(0)';
      tRole.style.opacity = '1';
      tRole.style.transform = 'translateY(0)';
    }, 250);
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

  // ==== Stars ==== //
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

  // ==== What We Do Card Slider with Next/Prev Buttons ==== //

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

  // ==== Our Projects Stats ==== //
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

  // ==== Update slider value dynamically ==== //
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

  // ==== Tabs Logic ====
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const tab = btn.dataset.tab;
      const targetContent = document.getElementById(`tab-${tab}`);

      // Remove active from all buttons
      document.querySelectorAll(".tab-btn").forEach((b) => {
        b.classList.remove(
          "text-[var(--color-orange)]",
          "border-b-2",
          "border-[var(--color-orange)]"
        );
      });

      // Hide all content with smooth transition
      document.querySelectorAll(".tab-content").forEach((content) => {
        if (!content.classList.contains("hidden")) {
          content.classList.add("opacity-0", "translate-y-4");
          setTimeout(() => {
            content.classList.add("hidden");
          }, 250);
        }
      });

      // Activate current button
      btn.classList.add(
        "text-[var(--color-orange)]",
        "border-b-2",
        "border-[var(--color-orange)]"
      );

      // Show target content with smooth transition
      setTimeout(() => {
        targetContent.classList.remove("hidden");
        setTimeout(() => {
          targetContent.classList.remove("opacity-0", "translate-y-4");
          targetContent.classList.add("opacity-100", "translate-y-0");
        }, 10);
      }, 250);
    });
  });

  // Close team modal by close button or clicking outside
  document.getElementById("teamModalClose").addEventListener("click", closeTeamModal);
  document.getElementById("teamModal").addEventListener("click", (e) => {
    if (e.target.id === "teamModal") closeTeamModal();
  });

  // Close author modal by close button or clicking outside
  document.getElementById("authorModalClose").addEventListener("click", closeAuthorModal);
  document.getElementById("authorModal").addEventListener("click", (e) => {
    if (e.target.id === "authorModal") closeAuthorModal();
  });

  // Close blog modal by close button or clicking outside
  document.getElementById("blogModalClose").addEventListener("click", closeBlogModal);
  document.getElementById("blogModal").addEventListener("click", (e) => {
    if (e.target.id === "blogModal") closeBlogModal();
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
