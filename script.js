// ===== DOM Elements =====
const navbar = document.getElementById("navbar");
const navToggle = document.getElementById("nav-toggle");
const navMenu = document.getElementById("nav-menu");
const navLinks = document.querySelectorAll(".nav-link");
const contactForm = document.getElementById("contact-form");

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

// ===== Form Validation =====
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");

    let isValid = true;

    // Clear previous errors
    document
      .querySelectorAll(".form-error")
      .forEach((el) => (el.textContent = ""));

    // Validate name
    if (nameInput.value.trim().length < 2) {
      showError(nameInput, "Please enter your name");
      isValid = false;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value)) {
      showError(emailInput, "Please enter a valid email");
      isValid = false;
    }

    // Validate message
    if (messageInput.value.trim().length < 10) {
      showError(
        messageInput,
        "Please enter a message (at least 10 characters)",
      );
      isValid = false;
    }

    if (isValid) {
      // Simulate form submission
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.innerHTML = "<span>Sending...</span>";
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.innerHTML = "<span>Message Sent!</span>";
        submitBtn.style.background = "var(--sea-green)";

        // Reset form
        contactForm.reset();

        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
          submitBtn.style.background = "";
        }, 2000);
      }, 1500);
    }
  });
}

function showError(input, message) {
  const errorSpan = input.parentElement.querySelector(".form-error");
  if (errorSpan) {
    errorSpan.textContent = message;
  }
  input.style.borderColor = "var(--punch-red)";

  input.addEventListener("input", function handler() {
    errorSpan.textContent = "";
    input.style.borderColor = "";
    input.removeEventListener("input", handler);
  });
}

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
