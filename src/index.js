import { getGeo, getTime, getRandomQuote } from './lib/api.js';
const refreshButton = document.querySelector(".icon-refresh img");
const moreBtn = document.querySelector(".more");
const info = document.querySelector(".info");

document.addEventListener("readystatechange", () => {
  getTime();
  getGeo();
  getRandomQuote();
});

/**
 * Update clock every minute.
 */
setInterval(() => {
  getTime();
}, 60 * 1000);

// New Quote
refreshButton.addEventListener("click", getRandomQuote);

moreBtn.addEventListener("click", (e) => {
  info.style.transform = "translateY(-100%)";
});

document.querySelector(".close").addEventListener("click", (e) => {
  info.style.transform = "translateY(0)";
});