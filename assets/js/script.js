document.addEventListener("DOMContentLoaded", () => {

  /** ========== HEADER ========== **/
  const menuBtn = document.getElementById("menuToggle");
  const mobileNav = document.querySelector(".mobile-nav");

  if (menuBtn && mobileNav) {
    menuBtn.addEventListener("click", () => {
      mobileNav.classList.toggle("active");
    });
  }


  // Parent dropdown toggle
  const mobileItems = document.querySelectorAll(".mobile-item > a");
  mobileItems.forEach((link) => {
    const dropdown = link.nextElementSibling;
    if (dropdown) {
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
  document.querySelectorAll(".mobile-dropdown a, .mobile-nav > a").forEach((link) => {
    const isParent = link.nextElementSibling?.classList?.contains("mobile-dropdown");
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

  /** ========== WHAT WE DO SWIPER (responsive) ========== **/
  if (window.Swiper) {
    new Swiper('.whatwedo-swiper', {
      slidesPerView: 1.1,
      spaceBetween: 16,
      speed: 500,
      loop: false,
      breakpoints: {
        640: { slidesPerView: 2, spaceBetween: 20 },
        1024: { slidesPerView: 3, spaceBetween: 24 },
      },
      navigation: {
        nextEl: '.wwd-next',
        prevEl: '.wwd-prev',
      },
      a11y: true,
    });
  }

});

// Counter Animation
function animateCounters() {
  document.querySelectorAll(".counter").forEach((counter) => {
    const target = parseInt(counter.getAttribute("data-target"));
    let current = 0;
    const duration = 1000;
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

// Intersection Observer for counter animation
const observerOptions = {
  threshold: 0.3,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      animateCounters();
      observer.disconnect(); 
    }
  });
}, observerOptions);



// // Scroll Indicators Functionality
// document.querySelectorAll(".scroll-indicator").forEach((btn, index) => {
//   btn.addEventListener("click", () => {
//     document
//       .querySelectorAll(".scroll-indicator")
//       .forEach((b) => b.classList.remove("bg-[var(--color-orange)]", "border-[var(--color-orange)]"));

//     btn.classList.add("bg-[var(--color-orange)]", "border-[var(--color-orange)]");

//     if (index === 0) {
//       window.scrollTo({ top: 0, behavior: "smooth" });
//     } else if (index === 3) {
//       window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
//     }
//   });
// });

// // Update active indicator on scroll
// window.addEventListener("scroll", () => {
//   const scrollPosition = window.scrollY;
//   const indicators = document.querySelectorAll(".scroll-indicator");

//   indicators.forEach((indicator) =>
//     indicator.classList.remove("bg-[var(--color-orange)]", "border-[var(--color-orange)]")
//   );

//   if (scrollPosition < window.innerHeight / 4) {
//     indicators[0]?.classList.add("bg-[var(--color-orange)]", "border-[var(--color-orange)]");
//   } else if (scrollPosition < window.innerHeight / 2) {
//     indicators[1]?.classList.add("bg-[var(--color-orange)]", "border-[var(--color-orange)]");
//   } else if (scrollPosition < (window.innerHeight * 3) / 4) {
//     indicators[2]?.classList.add("bg-[var(--color-orange)]", "border-[var(--color-orange)]");
//   } else {
//     indicators[3]?.classList.add("bg-[var(--color-orange)]", "border-[var(--color-orange)]");
//   }
// });


//  stats container //
document.addEventListener("DOMContentLoaded", () => {
  const statsSection = document.querySelector(".bottom-section");
  if (statsSection) {
    observer.observe(statsSection);
  }
});
document.querySelectorAll('.review-meta').forEach(el=>{
  const r = Math.max(0, Math.min(5, parseFloat(el.dataset.rating)||0));
  const n = parseInt(el.dataset.feedbacks)||0;
  const stars = el.querySelector('.stars');
  const copy  = el.querySelector('.review-copy');
  stars.style.setProperty('--rating', r);
  stars.setAttribute('aria-label', `${r.toFixed(1)} out of 5 stars`);
  copy.textContent = `${r.toFixed(1)} reviews based on ${Intl.NumberFormat('en',{notation:'compact'}).format(n)} Feedbacks`;
});

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

//Our Projects Stats
document
.querySelectorAll(".bottom-section, #projects-stats")
.forEach((el) => observer.observe(el));