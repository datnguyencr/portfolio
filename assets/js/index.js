function revealOnScroll() {
	const reveals = document.querySelectorAll('.reveal');

	for (let i = 0; i < reveals.length; i++) {
		const windowHeight = window.innerHeight;
		const elementTop = reveals[i].getBoundingClientRect().top;
		const revealPoint = 100; // how early it triggers

		if (elementTop < windowHeight - revealPoint) {
			reveals[i].classList.add('active');
		} else {
			reveals[i].classList.remove('active'); // remove if you want repeat on scroll back
		}
	}
}


async function loadApps() {

	const response = await fetch('assets/data/apps.json');
	const apps = await response.json();

	const appListDiv = document.getElementById("app-list");

	apps.forEach(item => {
		const itemCard = document.createElement("div");
		itemCard.className = "project-card";

		itemCard.innerHTML = `
    <a href="https://play.google.com/store/apps/details?id=${item.id}" target="_blank">
      <div><img src="${item.icon}" loading="lazy" alt="${item.name}"/></div>
      <div><span class="bebas-neue-regular">${item.name}</span></div>
    </a>
  `;

		appListDiv.appendChild(itemCard);
	});
	const countElement = document.getElementById("mobile-count");
	if (countElement) {
        countElement.textContent = apps.length;
    }
}

async function loadWebs() {
	const response = await fetch('assets/data/webs.json');
	const webs = await response.json();
	const webListDiv = document.getElementById("webs-list");
	webs.forEach(item => {
		const itemCard = document.createElement("div");
		itemCard.innerHTML = `
    <a href="${item.url}" target="_blank">
    <div class="thumbnail"><img src="${item.icon}" loading="lazy" alt="${item.name}"/></div>
    <div class="title">${item.name}</div>
    </a>
  `;
		webListDiv.appendChild(itemCard);
	});
	const countElement = document.getElementById("web-count");
	if (countElement) {
        countElement.textContent = webs.length;
    }
}

async function loadChromeExtensions() {

	const response = await fetch('assets/data/chrome_extensions.json');
	const chromeExtensions = await response.json();
	const chromeStoreListDiv = document.getElementById("chrome-store-list");
	chromeExtensions.forEach(item => {
		const itemCard = document.createElement("div");
		itemCard.innerHTML = `
    <a href="${item.url}" target="_blank">
    <div class="thumbnail"><img src="${item.icon}" loading="lazy" alt="${item.name}" /></div>
    <div class="title">${item.name}</div>
    </a>
  `;
		chromeStoreListDiv.appendChild(itemCard);
	});
	
    const countElement = document.getElementById("chrome-count");
	if (countElement) {
        countElement.textContent = chromeExtensions.length;
    }
}


async function calculateYearOfExperience() {
	const startYear = 2012;
	const currentYear = new Date().getFullYear();
	const experience = currentYear - startYear;
	document.getElementById('experience-years').textContent = experience;
}

loadApps();
loadWebs();
loadChromeExtensions();
calculateYearOfExperience();
function setupReveal() {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add("active");
        });
    }, { threshold: 0.1 });

    document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
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

    sections.forEach(sec => {
        if (position >= sec.offsetTop && position < sec.offsetTop + sec.offsetHeight) {
            let id = sec.getAttribute("id");
            navLinks.forEach(a => {
                a.classList.toggle("active", a.getAttribute("href") === `#${id}`);
            });
        }
    });
});

