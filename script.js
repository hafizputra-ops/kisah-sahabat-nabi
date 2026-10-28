feather.replace();

const searchForm = document.querySelector(".search-form");
const searchInput = document.querySelector("#search-input");
const searchBtn = document.querySelector("#search");

const themeBtn = document.querySelector("#sun");

function setTema(gelap) {
  document.body.classList.toggle("dark-mode", gelap);

  if (themeBtn) {
    themeBtn.innerHTML = `<i data-feather="${gelap ? "sun" : "moon"}"></i>`;
    themeBtn.title = gelap ? "Ganti ke mode terang" : "Ganti ke mode gelap";
    feather.replace();
  }

  try {
    localStorage.setItem("tema", gelap ? "gelap" : "terang");
  } catch (e) {}
}

let temaTersimpan = null;
try {
  temaTersimpan = localStorage.getItem("tema");
} catch (e) {}

const awalGelap =
  temaTersimpan !== null
    ? temaTersimpan === "gelap"
    : window.matchMedia("(prefers-color-scheme: dark)").matches;

setTema(awalGelap);

if (themeBtn) {
  themeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    setTema(!document.body.classList.contains("dark-mode"));
  });
}

const KARTU = ".kisahfavorit-card, .daftarkisah-item";

function saring(kata) {
  const value = kata.toLowerCase().trim();
  const cards = document.querySelectorAll(KARTU);
  let ada = 0;

  cards.forEach((card) => {
    const title = card.querySelector("h3").innerText.toLowerCase();
    const desc = card.querySelector("p").innerText.toLowerCase();
    const cocok = title.includes(value) || desc.includes(value);
    card.style.display = cocok ? "" : "none";
    if (cocok) ada++;
  });

  const pesan = document.querySelector("#pesan-kosong");
  if (pesan) pesan.style.display = cards.length && !ada ? "block" : "none";
}

if (searchBtn && searchForm && searchInput) {
  searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    searchForm.classList.toggle("active");
    if (searchForm.classList.contains("active")) searchInput.focus();
  });

  document.addEventListener("click", (e) => {
    if (!searchBtn.contains(e.target) && !searchForm.contains(e.target)) {
      searchForm.classList.remove("active");
    }
  });

  searchInput.addEventListener("input", () => saring(searchInput.value));

  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !document.querySelector(KARTU)) {
      location.href =
        "daftarkisah.html?cari=" + encodeURIComponent(searchInput.value);
    }
  });

  const cari = new URLSearchParams(location.search).get("cari");
  if (cari) {
    searchInput.value = cari;
    searchForm.classList.add("active");
    saring(cari);
  }
}
