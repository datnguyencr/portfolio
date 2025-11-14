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
      <div><img src="${item.icon}" alt="${item.name}"></div>
      <div><span class="bebas-neue-regular">${item.name}</span></div>
    </a>
  `;

		appListDiv.appendChild(itemCard);
	});
}

async function loadWebs() {
	const response = await fetch('assets/data/webs.json');
	const webs = await response.json();
	const webListDiv = document.getElementById("webs-list");
	webs.forEach(item => {
		const itemCard = document.createElement("div");
		itemCard.innerHTML = `
    <a href="${item.url}" target="_blank">
    <div class="thumbnail">
      <img src="${item.icon}" />
    </div>
    <div class="title">${item.name}</div>
    </a>
  `;
		webListDiv.appendChild(itemCard);
	});
}

async function loadChromeExtensions() {

	const response = await fetch('assets/data/chrome_extensions.json');
	const chromeExtensions = await response.json();
	const chromeStoreListDiv = document.getElementById("chrome-store-list");
	chromeExtensions.forEach(item => {
		const itemCard = document.createElement("div");
		itemCard.innerHTML = `
    <a href="${item.url}" target="_blank">
    <div class="thumbnail">
      <img src="${item.icon}" />
    </div>
    <div class="title">${item.name}</div>
    </a>
  `;
		chromeStoreListDiv.appendChild(itemCard);
	});
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
window.addEventListener('scroll', revealOnScroll);

document.addEventListener("scroll", () => {
	const scrollY = window.scrollY;

	const hero = document.getElementById("hero");
	const img = hero.querySelector(".profile-img");

	let heroHeight = hero.offsetHeight;
	let progress = Math.min(scrollY / heroHeight, 1);
	let scale = 1 - progress * 0.4;
	img.style.transform = `scale(${scale})`;

	const sections = document.querySelectorAll("section");
	const navLinks = document.querySelectorAll("nav a");

	sections.forEach((sec) => {
		const rect = sec.getBoundingClientRect();
		if (rect.top <= 150 && rect.bottom >= 150) {
			let id = sec.getAttribute("id");
			navLinks.forEach((link) => {
				link.classList.remove("active");
				if (link.getAttribute("href") === `#${id}`) {
					link.classList.add("active");
				}
			});
		}
	});
});
