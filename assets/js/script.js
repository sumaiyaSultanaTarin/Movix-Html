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
  if (nav) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 10) {
        nav.classList.add("shadow-md");
      } else {
        nav.classList.remove("shadow-md");
      }
    });
  }

  // Reset mobile nav when resizing to desktop
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 768) {
      closeMobileNav();
      closeMobileSearch(); // Also close mobile search
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

  // Mobile search functionality - IMPROVED
  const mobileSearchToggle = document.getElementById("mobileSearchToggle");
  let mobileSearchBox = null;
  let mobileSearchContainer = null;

  function createMobileSearch() {
    // Remove any existing mobile search first
    removeMobileSearch();
    
    // Create container
    mobileSearchContainer = document.createElement("div");
    mobileSearchContainer.id = "mobileSearchContainer";
    mobileSearchContainer.className = "mobile-search-container mt-2 px-4";
    
    // Create input
    mobileSearchBox = document.createElement("input");
    mobileSearchBox.type = "text";
    mobileSearchBox.id = "mobileSearchBox";
    mobileSearchBox.placeholder = "Search...";
    mobileSearchBox.className = "border border-gray-400 rounded-md px-3 py-2 text-sm w-full";
    
    // Add input to container
    mobileSearchContainer.appendChild(mobileSearchBox);
    
    // Add container to nav
    const navContainer = document.querySelector("nav .container");
    if (navContainer) {
      navContainer.appendChild(mobileSearchContainer);
    }
    
    return mobileSearchBox;
  }

  function removeMobileSearch() {
    // Remove existing search container if it exists
    const existing = document.getElementById("mobileSearchContainer");
    if (existing) {
      existing.remove();
    }
    mobileSearchBox = null;
    mobileSearchContainer = null;
  }

  function closeMobileSearch() {
    removeMobileSearch();
  }

  // Clean up any existing mobile search on page load
  removeMobileSearch();

  if (mobileSearchToggle) {
    mobileSearchToggle.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      if (mobileSearchBox && mobileSearchContainer) {
        // Search is currently open, close it
        closeMobileSearch();
      } else {
        // Search is closed, open it
        mobileSearchBox = createMobileSearch();
        if (mobileSearchBox) {
          mobileSearchBox.focus();
          
          // Close search when pressing Enter or Escape
          mobileSearchBox.addEventListener("keydown", (e) => {
            if (e.key === "Escape") {
              closeMobileSearch();
            }
            // You can add Enter key handling for search submission here
          });
        }
      }
    });

    // Close mobile search when clicking outside
    document.addEventListener("click", (e) => {
      if (mobileSearchBox && mobileSearchContainer && 
          !mobileSearchToggle.contains(e.target) && 
          !mobileSearchContainer.contains(e.target)) {
        closeMobileSearch();
      }
    });
  }

  // Close searches when page visibility changes (helps with refresh issues)
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      closeMobileSearch();
      if (searchInput) {
        searchInput.classList.remove("open");
        searchInput.value = "";
      }
    }
  });
});

