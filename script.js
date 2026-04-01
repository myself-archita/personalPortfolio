const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const navLinkItems = document.querySelectorAll(".nav-links a");
const themeToggle = document.querySelector(".theme-toggle");
const storedTheme = localStorage.getItem("portfolio-theme");

if (storedTheme === "dark") {
  document.body.setAttribute("data-theme", "dark");
}

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinkItems.forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const isDark = document.body.getAttribute("data-theme") === "dark";
    if (isDark) {
      document.body.removeAttribute("data-theme");
      localStorage.setItem("portfolio-theme", "light");
    } else {
      document.body.setAttribute("data-theme", "dark");
      localStorage.setItem("portfolio-theme", "dark");
    }
  });
}

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.16,
  }
);

revealElements.forEach((element, index) => {
  element.style.transitionDelay = `${index * 80}ms`;
  revealObserver.observe(element);
});
