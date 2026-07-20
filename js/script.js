const header = document.querySelector(".header");
const menuButton = document.getElementById("menuButton");
const navigation = document.getElementById("navigation");

const slides = document.querySelectorAll(".hero-slide");
const heroDots = document.querySelectorAll(".hero-dot");

const cartButtons = document.querySelectorAll(".add-to-cart");
const cartCount = document.querySelector(".cart-count");

const newsletterForm = document.getElementById("newsletterForm");
const formMessage = document.getElementById("formMessage");

let currentSlide = 0;
let cartItems = 0;


/* =========================
   STICKY HEADER
========================= */

window.addEventListener("scroll", () => {

  if (window.scrollY > 80) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }

});


/* =========================
   MOBILE MENU
========================= */

menuButton.addEventListener("click", () => {

  const menuIsOpen = navigation.classList.toggle("open");

  menuButton.setAttribute(
    "aria-expanded",
    menuIsOpen.toString()
  );

});


document.querySelectorAll(".nav a").forEach((link) => {

  link.addEventListener("click", () => {

    navigation.classList.remove("open");

    menuButton.setAttribute("aria-expanded", "false");

  });

});


/* =========================
   HERO SLIDER
========================= */

function showSlide(index) {

  slides.forEach((slide) => {
    slide.classList.remove("active");
  });

  heroDots.forEach((dot) => {
    dot.classList.remove("active");
  });

  slides[index].classList.add("active");

  heroDots[index].classList.add("active");

  currentSlide = index;

}


function nextSlide() {

  const nextIndex = (currentSlide + 1) % slides.length;

  showSlide(nextIndex);

}


let slideInterval = setInterval(nextSlide, 6000);


heroDots.forEach((dot) => {

  dot.addEventListener("click", () => {

    const selectedSlide = Number(dot.dataset.slide);

    showSlide(selectedSlide);

    clearInterval(slideInterval);

    slideInterval = setInterval(nextSlide, 6000);

  });

});


/* =========================
   SCROLL REVEAL
========================= */

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
    threshold: 0.12
  }

);


revealElements.forEach((element) => {

  revealObserver.observe(element);

});


/* =========================
   BASIC CART COUNTER
========================= */

cartButtons.forEach((button) => {

  button.addEventListener("click", () => {

    cartItems += 1;

    cartCount.textContent = cartItems;

    const originalText = button.textContent;

    button.textContent = "Added";

    button.disabled = true;

    setTimeout(() => {

      button.textContent = originalText;

      button.disabled = false;

    }, 1200);

  });

});


/* =========================
   NEWSLETTER FORM
========================= */

newsletterForm.addEventListener("submit", (event) => {

  event.preventDefault();

  const emailInput = document.getElementById("email");

  const emailAddress = emailInput.value.trim();

  if (!emailAddress) {

    formMessage.textContent =
      "Please enter a valid email address.";

    return;

  }

  formMessage.textContent =
    "Thank you for joining our creative list.";

  newsletterForm.reset();

});
const contactForm = document.getElementById("contactForm");
const contactFormMessage = document.getElementById(
  "contactFormMessage"
);

if (contactForm) {
  contactForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    contactFormMessage.textContent = "Sending your message...";

    try {
      const response = await fetch(contactForm.action, {
        method: contactForm.method,
        body: new FormData(contactForm),
        headers: {
          Accept: "application/json"
        }
      });

      if (response.ok) {
        contactFormMessage.textContent =
          "Thank you! Your message has been sent.";

        contactForm.reset();
      } else {
        contactFormMessage.textContent =
          "Your message could not be sent. Please try again.";
      }
    } catch (error) {
      contactFormMessage.textContent =
        "Your message could not be sent. Please check your connection and try again.";
    }
  });
}