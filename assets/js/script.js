document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.querySelector(".fa-bars");
  const mobileNav = document.querySelector(".mobile-nav");

  if (menuBtn && mobileNav) {
    menuBtn.addEventListener("click", () => {
      mobileNav.classList.toggle("active");
    });
  }

  // Parent dropdown toggle
  const mobileItems = document.querySelectorAll(".mobile-item > a");
  mobileItems.forEach(link => {
    const dropdown = link.nextElementSibling;
    if (dropdown) {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        if (dropdown.style.maxHeight && dropdown.style.maxHeight !== "0px") {
          dropdown.style.maxHeight = "0px";
          link.querySelector("i").classList.remove("rotate-180");
        } else {
          dropdown.style.maxHeight = dropdown.scrollHeight + "px";
          link.querySelector("i").classList.add("rotate-180");
        }
      });
    }
  });

  // Child links (close nav after click)
  document.querySelectorAll(".mobile-dropdown a, .mobile-nav > a").forEach(link => {
    const isParent = link.nextElementSibling && link.nextElementSibling.classList.contains("mobile-dropdown");
    if (!isParent) {
      link.addEventListener("click", (e) => {
        const href = link.getAttribute("href");
        if (href && href.startsWith("#")) {
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
  window.addEventListener("scroll", () => {
    if (window.scrollY > 10) {
      nav.classList.add("shadow-md");
    } else {
      nav.classList.remove("shadow-md");
    }
  });

  // Reset mobile nav when resizing to desktop
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 768) {
      closeMobileNav();
    }
  });

  function closeMobileNav() {
    if (mobileNav) mobileNav.classList.remove("active");
    document.querySelectorAll(".mobile-dropdown").forEach(dd => {
      dd.style.maxHeight = "0px";
    });
    document.querySelectorAll(".mobile-item i").forEach(icon => {
      icon.classList.remove("rotate-180");
    });
  }
});
