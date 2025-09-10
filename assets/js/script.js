document.addEventListener("DOMContentLoaded", () => {
  // Mobile menu toggle
  const menuBtn = document.querySelector(".fa-bars");
  const mobileNav = document.querySelector(".mobile-nav");

  if (menuBtn && mobileNav) {
    menuBtn.addEventListener("click", () => {
      mobileNav.classList.toggle("active");
    });
  }

  // Dropdown toggle (mobile only)
  const caretIcons = document.querySelectorAll(".mobile-nav .fa-caret-down");
  caretIcons.forEach(icon => {
    icon.addEventListener("click", (e) => {
      e.preventDefault();
      icon.parentElement.classList.toggle("open");
    });
  });

  // Smooth scroll
  document.querySelectorAll("a[href^='#']").forEach(link => {
    link.addEventListener("click", (e) => {
      const target = document.querySelector(link.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
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
});
