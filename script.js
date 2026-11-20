const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");
menuToggle.addEventListener("click", () => {
  const opened = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(opened));
});
document.querySelectorAll(".nav-link, .nav-cta").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

const words = ["digital experiences", "useful web projects", "ideas into reality"];
let wordIndex = 0, charIndex = 0, deleting = false;
const typed = document.getElementById("typed");
function typeEffect() {
  const word = words[wordIndex];
  typed.textContent = word.slice(0, charIndex);
  if (!deleting && charIndex < word.length) {
    charIndex++;
    setTimeout(typeEffect, 75);
  } else if (deleting && charIndex > 0) {
    charIndex--;
    setTimeout(typeEffect, 35);
  } else {
    deleting = !deleting;
    if (!deleting) wordIndex = (wordIndex + 1) % words.length;
    setTimeout(typeEffect, deleting ? 1300 : 350);
  }
}
typeEffect();

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

const progress = document.getElementById("progress");
window.addEventListener("scroll", () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
  let current = "home";
  document.querySelectorAll("main section[id]").forEach(section => {
    if (window.scrollY >= section.offsetTop - 150) current = section.id;
  });
  document.querySelectorAll(".nav-link").forEach(link => {
    link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
  });
});
document.getElementById("year").textContent = new Date().getFullYear();
