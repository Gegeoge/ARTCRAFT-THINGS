const header = document.querySelector(".header");
const menuButton = document.getElementById("menuButton");
const navigation = document.getElementById("navigation");
const menuBackdrop = document.getElementById("menuBackdrop");
const backToTop = document.getElementById("backToTop");
const slides = document.querySelectorAll(".hero-slide");
const heroDots = document.querySelectorAll(".hero-dot");
const cartButtons = document.querySelectorAll(".add-to-cart");
const cartCount = document.querySelector(".cart-count");
const newsletterForm = document.getElementById("newsletterForm");
const formMessage = document.getElementById("formMessage");
const contactForm = document.getElementById("contactForm");
const contactFormMessage = document.getElementById("contactFormMessage");

let currentSlide = 0;
let cartItems = 0;
let slideInterval;

function updateHeader() {
  if (!header) return;
  header.classList.toggle("scrolled", window.scrollY > 80);
  backToTop?.classList.toggle("visible", window.scrollY > 650);
}

window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

function setMenu(open) {
  if (!navigation || !menuButton) return;
  navigation.classList.toggle("open", open);
  menuButton.classList.toggle("active", open);
  menuBackdrop?.classList.toggle("visible", open);
  document.body.classList.toggle("menu-open", open);
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute("aria-label", open ? "Close navigation menu" : "Open navigation menu");
}

menuButton?.addEventListener("click", () => {
  setMenu(!navigation.classList.contains("open"));
});

menuBackdrop?.addEventListener("click", () => setMenu(false));

document.querySelectorAll(".nav a").forEach((link) => {
  link.addEventListener("click", () => setMenu(false));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setMenu(false);
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 800) setMenu(false);
});

function showSlide(index) {
  if (!slides.length || !heroDots.length) return;
  slides.forEach((slide) => slide.classList.remove("active"));
  heroDots.forEach((dot) => dot.classList.remove("active"));
  slides[index]?.classList.add("active");
  heroDots[index]?.classList.add("active");
  currentSlide = index;
}

function startSlider() {
  if (slides.length < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  clearInterval(slideInterval);
  slideInterval = setInterval(() => {
    showSlide((currentSlide + 1) % slides.length);
  }, 6000);
}

heroDots.forEach((dot) => {
  dot.addEventListener("click", () => {
    showSlide(Number(dot.dataset.slide));
    startSlider();
  });
});
startSlider();

const revealElements = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("visible"));
}

cartButtons.forEach((button) => {
  button.addEventListener("click", () => {
    cartItems += 1;
    if (cartCount) cartCount.textContent = String(cartItems);
    const originalText = button.textContent;
    button.textContent = "Added";
    button.disabled = true;
    setTimeout(() => {
      button.textContent = originalText;
      button.disabled = false;
    }, 1200);
  });
});

newsletterForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const emailInput = document.getElementById("email");
  const emailAddress = emailInput?.value.trim();
  if (!emailAddress) {
    if (formMessage) formMessage.textContent = "Please enter a valid email address.";
    return;
  }
  if (formMessage) formMessage.textContent = "Thank you for joining our creative list.";
  newsletterForm.reset();
});

contactForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (contactFormMessage) contactFormMessage.textContent = "Sending your message...";
  try {
    const response = await fetch(contactForm.action, {
      method: contactForm.method,
      body: new FormData(contactForm),
      headers: { Accept: "application/json" }
    });
    if (response.ok) {
      if (contactFormMessage) contactFormMessage.textContent = "Thank you! Your message has been sent.";
      contactForm.reset();
    } else {
      if (contactFormMessage) contactFormMessage.textContent = "Your message could not be sent. Please try again.";
    }
  } catch (error) {
    if (contactFormMessage) contactFormMessage.textContent = "Your message could not be sent. Please check your connection and try again.";
  }
});

backToTop?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
