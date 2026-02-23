// ===== DOM Elements =====
const navbar = document.getElementById("navbar");
const navToggle = document.getElementById("nav-toggle");
const navMenu = document.getElementById("nav-menu");
const navLinks = document.querySelectorAll(".nav-link");

// ===== Navbar Scroll Effect =====
let lastScrollY = window.scrollY;

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
  lastScrollY = window.scrollY;
});

// ===== Mobile Menu Toggle =====
navToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");
  navToggle.setAttribute("aria-expanded", navMenu.classList.contains("active"));
});

// Close mobile menu when clicking a link
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
  });
});

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
  if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
    navMenu.classList.remove("active");
  }
});

// ===== Smooth Scroll for Navigation =====
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    const href = link.getAttribute("href");
    if (href.startsWith("#")) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  });
});

// ===== Scroll Animations =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animated");
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Add animation class to elements
document
  .querySelectorAll(".skill-card, .project-card, .stat-card, .info-card")
  .forEach((el) => {
    el.classList.add("animate-on-scroll");
    observer.observe(el);
  });

// ===== Typewriter Effect for Hero =====
const heroName = document.querySelector(".name-text");
if (heroName) {
  const text = heroName.textContent;
  heroName.textContent = "";
  let i = 0;

  function typeWriter() {
    if (i < text.length) {
      heroName.textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, 100);
    }
  }

  // Start typewriter after page load
  setTimeout(typeWriter, 500);
}

// ===== Active Navigation Link =====
const sections = document.querySelectorAll("section[id]");

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;

  sections.forEach((section) => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute("id");
    const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLinks.forEach((link) => link.classList.remove("active"));
      if (navLink) navLink.classList.add("active");
    }
  });
});

// ===== Parallax Effect for Hero Background =====
const heroBg = document.querySelector(".hero-bg-animation");
if (heroBg) {
  window.addEventListener("scroll", () => {
    const scrolled = window.scrollY;
    heroBg.style.transform = `translateY(${scrolled * 0.3}px)`;
  });
}
