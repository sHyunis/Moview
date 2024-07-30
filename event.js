// import { countryFetch } from "./index";
// 이전 버튼 클릭시 모든 영화표시

const beforeButton = document.querySelector(".beforeButton");
beforeButton.addEventListener("click", (e) => {
  const movieCards = document.querySelectorAll(".movie-card");

  movieCards.forEach((card) => {
    card.style.display = "block";
  });
  e.preventDefault();
});

// 버튼 클릭시 지정한 요소가 보이도록, 스크롤 이동 이벤트

const downArrowButton = document.querySelector(".down-arrow");
const searchInputButton = document.querySelector(".section2").offsetTop;
downArrowButton.addEventListener("click", () => {
  window.scrollTo({ left: 0, top: searchInputButton, behavior: "smooth" });
});

// 버튼 클릭시 화면 top으로 이동
const topButton = document.querySelector(".topButton");
topButton.addEventListener("click", (e) => {
  e.preventDefault();
  window.scrollTo({ left: 0, top: searchInputButton, behavior: "smooth" });
});

// 버튼 클릭시 home으로 이동
const homeButton = document.querySelector(".homeButton");
homeButton.addEventListener("click", () => {
  window.scrollTo({ left: 0, top: 0, behavior: "smooth" });
});

import { countryFetch, countryFetchEng } from "./index.js";
// 버튼 클릭시 한국영화로 변경
const koreaMovie = document.querySelector(".koreaMovie");
koreaMovie.addEventListener("click", (e) => {
  countryFetch();
  e.preventDefault();
});
// 버튼 클릭시 외국영화로 변경
const englishMovie = document.querySelector(".englishMovie");
englishMovie.addEventListener("click", (e) => {
  countryFetchEng();
  e.preventDefault();
});
