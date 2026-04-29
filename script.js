// ══════════════════════════════
// NAVBAR SCROLL
// ══════════════════════════════
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});


// ══════════════════════════════
// MENU MOBILE
// ══════════════════════════════
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    navbar.classList.toggle("menu-open");
  });
}


// ══════════════════════════════
// DARK MODE
// ══════════════════════════════
const themeToggle = document.getElementById("themeToggle");

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");

    if (currentTheme === "dark") {
      document.documentElement.removeAttribute("data-theme");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    }
  });
}

// carregar tema salvo
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  document.documentElement.setAttribute("data-theme", "dark");
}


// ══════════════════════════════
// SCROLL REVEAL
// ══════════════════════════════
const reveals = document.querySelectorAll(".reveal");

const revealOnScroll = () => {
  const triggerBottom = window.innerHeight * 0.85;

  reveals.forEach(el => {
    const boxTop = el.getBoundingClientRect().top;

    if (boxTop < triggerBottom) {
      el.classList.add("visible");
    }
  });
};

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);


// ══════════════════════════════
// CONTADOR ANIMADO
// ══════════════════════════════
const counters = document.querySelectorAll(".stat-num");

const startCounters = () => {
  counters.forEach(counter => {
    const update = () => {
      const target = +counter.getAttribute("data-target");
      const count = +counter.innerText;

      const increment = target / 80;

      if (count < target) {
        counter.innerText = Math.ceil(count + increment);
        setTimeout(update, 20);
      } else {
        counter.innerText = target;
      }
    };

    update();
  });
};

// dispara quando aparece na tela
let counterStarted = false;

window.addEventListener("scroll", () => {
  const section = document.querySelector(".hero-stats");

  if (!section) return;

  const top = section.getBoundingClientRect().top;

  if (top < window.innerHeight && !counterStarted) {
    startCounters();
    counterStarted = true;
  }
});


// ══════════════════════════════
// PARTÍCULAS
// ══════════════════════════════
const particlesContainer = document.getElementById("particles");

if (particlesContainer) {
  for (let i = 0; i < 25; i++) {
    const particle = document.createElement("div");
    particle.classList.add("particle");

    const size = Math.random() * 6 + 4;
    particle.style.width = size + "px";
    particle.style.height = size + "px";

    particle.style.left = Math.random() * 100 + "%";
    particle.style.animationDuration = (Math.random() * 10 + 5) + "s";
    particle.style.animationDelay = Math.random() * 5 + "s";

    particlesContainer.appendChild(particle);
  }
}


// ══════════════════════════════
// FORMULÁRIO
// ══════════════════════════════
const form = document.getElementById("solarForm");

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let valid = true;

    const nome = document.getElementById("nome");
    const email = document.getElementById("email");
    const telefone = document.getElementById("telefone");
    const lgpd = document.getElementById("lgpd");

    // reset erros
    document.querySelectorAll(".form-error").forEach(el => el.textContent = "");

    // validações
    if (!nome.value.trim()) {
      document.getElementById("nomeError").textContent = "Informe seu nome";
      valid = false;
    }

    if (!email.value.includes("@")) {
      document.getElementById("emailError").textContent = "Email inválido";
      valid = false;
    }

    if (telefone.value.length < 10) {
      document.getElementById("telefoneError").textContent = "Telefone inválido";
      valid = false;
    }

    if (!lgpd.checked) {
      document.getElementById("lgpdError").textContent = "Você precisa aceitar";
      valid = false;
    }

    if (!valid) return;

    // loading
    const btnText = form.querySelector(".btn-text");
    const loader = form.querySelector(".btn-loader");

    btnText.style.display = "none";
    loader.style.display = "inline";

    setTimeout(() => {
      loader.style.display = "none";
      btnText.style.display = "inline";

      document.getElementById("formSuccess").style.display = "block";

      form.reset();
    }, 2000);
  });
}