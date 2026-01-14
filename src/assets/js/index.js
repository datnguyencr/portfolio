function revealOnScroll() {
  const reveals = document.querySelectorAll(".reveal");

  for (let i = 0; i < reveals.length; i++) {
    const windowHeight = window.innerHeight;
    const elementTop = reveals[i].getBoundingClientRect().top;
    const revealPoint = 100; // how early it triggers

    if (elementTop < windowHeight - revealPoint) {
      reveals[i].classList.add("active");
    } else {
      reveals[i].classList.remove("active"); // remove if you want repeat on scroll back
    }
  }
}

async function loadList({ jsonUrl, containerId, countId, renderItem }) {
  const response = await fetch(jsonUrl);
  const items = await response.json();

  const container = document.getElementById(containerId);
  if (!container) return;

  const fragment = document.createDocumentFragment();

  for (const item of items) {
    const card = document.createElement("div");
    card.className = "project-card";
    card.innerHTML = renderItem(item);
    fragment.appendChild(card);
  }

  container.appendChild(fragment);

  const countElement = document.getElementById(countId);
  if (countElement) countElement.textContent = items.length;
}

async function loadApps() {
  loadList({
    jsonUrl: "assets/data/apps.json",
    containerId: "app-list",
    countId: "mobile-count",
    renderItem: (item) => `
    <a href="https://play.google.com/store/apps/details?id=${item.id}" target="_blank" rel="noopener">
      <div><img src="${item.icon}" loading="lazy" alt="${item.name}"></div>
      <div><span class="bebas-neue-regular">${item.name}</span></div>
    </a>
  `,
  });
}

async function loadWebs() {
  loadList({
    jsonUrl: "assets/data/webs.json",
    containerId: "webs-list",
    countId: "web-count",
    renderItem: (item) => `
    <a href="${item.url}" target="_blank" rel="noopener">
      <div class="thumbnail"><img src="${item.icon}" loading="lazy" alt="${item.name}"></div>
      <div class="title">${item.name}</div>
    </a>
  `,
  });
}

async function loadChromeExtensions() {
  loadList({
    jsonUrl: "assets/data/chrome_extensions.json",
    containerId: "chrome-store-list",
    countId: "chrome-count",
    renderItem: (item) => `
    <a href="${item.url}" target="_blank" rel="noopener">
      <div class="thumbnail"><img src="${item.icon}" loading="lazy" alt="${item.name}"></div>
      <div class="title">${item.name}</div>
    </a>
  `,
  });
}

async function calculateYearOfExperience() {
  const startYear = 2012;
  const currentYear = new Date().getFullYear();
  const experience = currentYear - startYear;
  document.getElementById("experience-years").textContent = experience;
}

loadApps();
loadWebs();
loadChromeExtensions();
calculateYearOfExperience();
function setupReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("active");
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
}
setupReveal();
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {
  const img = document.querySelector(".profile-img");
  const limit = 250; // px before max shrink
  const factor = Math.min(window.scrollY / limit, 1);
  img.style.transform = `scale(${1 - factor * 0.25})`;
  let position = window.scrollY + 200;

  sections.forEach((sec) => {
    if (
      position >= sec.offsetTop &&
      position < sec.offsetTop + sec.offsetHeight
    ) {
      let id = sec.getAttribute("id");
      navLinks.forEach((a) => {
        a.classList.toggle("active", a.getAttribute("href") === `#${id}`);
      });
    }
  });
});
