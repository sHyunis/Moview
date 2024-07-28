// Database연결
const API_KEY = "fbf16579bff5b8c3f6664841d9dd0613";
const URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;

// 영화카드 생성
function createMovieCard(movie) {
  const card = document.createElement("div");
  card.className = "movie-card";
  card.innerHTML = `
    <div class = "card-img"><img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}"></div>
    <div class = "movie-content">
    <h3>${movie.title}</h3>
    <p>${movie.overview}</p>
    <span>Rating: ${movie.vote_average}</span>
    </div>
  `;
  card.addEventListener("click", () => alert(`Movie ID: ${movie.id}`));
  return card;
}
// Dom에 추가
fetch(URL)
  .then((response) => response.json())
  .then((data) => {
    const movies = data.results;
    const movieContainer = document.getElementById("movie-container");
    movies.forEach((movie) => {
      const card = createMovieCard(movie);
      movieContainer.appendChild(card);
    });
  })
  .catch((error) => console.error("Error:", error));

// 검색기능
// const form = document
//   .querySelector(".search")
//   .addEventListener("submit", (e) => {
//     e.preventDefault();
//   });
document.querySelector(".search").addEventListener("submit", (e) => {
  // input 에 넣은 값 소문자로 변환
  e.preventDefault();
  const searchInput = document
    .getElementById("searchInput")
    .value.toLowerCase();
  const movieCards = document.querySelectorAll(".movie-card");
  // 모든 카드들의 제목과 input값 포함시 조건에 따라 display 변화주기
  movieCards.forEach((card) => {
    const title = card.querySelector("h3").textContent.toLowerCase();

    if (title.includes(searchInput)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
});
