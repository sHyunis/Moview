const btnLanguageKr = document.getElementById("btn-lang-kr");
const btnLanguageEn = document.getElementById("btn-lang-en");

function getSlicedOverview(overview) {
  const MAX_OVERVIEW_LENGTH = 80;

  if (!overview) return "줄거리가 없습니다."

  if (overview.length >= MAX_OVERVIEW_LENGTH) {
    return `${overview.slice(0, MAX_OVERVIEW_LENGTH)} . . .`
  }

  return overview;
}

function formatRating(rating) {
  return Math.round(rating * 10) / 10;
}

function handleMovieCreate(movie) {
  const card = document.createElement("div");
  card.className = "movie-card";
  card.innerHTML = `
    <div class="card-img">
      <span class="movie-like"></span>
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
    </div>
    <div class="movie-content">
      <h3 class="movie-title">${movie.title}</h3>
      <p class="movie-overview">${getSlicedOverview(movie.overview)}</p>
      <span class="movie-rating">★ ${formatRating(movie.vote_average)}</span>
      <em class="card-id" style="display:none;">${movie.id}</em>
    </div>
  `;

  card.addEventListener("click", () => {
    const recentMovies = JSON.parse(localStorage.getItem('recentMovies')) || [];
    recentMovies.unshift(movie);

    localStorage.setItem('recentMovies', JSON.stringify(recentMovies));
  });

  return card;
}

function handleMovieRender(movies, language) {
  const movieContainer = document.getElementById("movie-container");
  movieContainer.innerHTML = "";
  movies.forEach(movie => {
    movieContainer.appendChild(handleMovieCreate(movie));
  });

  sessionStorage.removeItem("language");
  sessionStorage.setItem("language", language);
  movieLikeChk();
}


btnLanguageKr.addEventListener("click", () => {
  window.countryCode = 'KR';
  changeMovieLang('KR');
});
btnLanguageEn.addEventListener("click", () => {
  window.countryCode = 'US';
  changeMovieLang('US');
});

