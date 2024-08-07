const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: "Bearer fbf16579bff5b8c3f6664841d9dd0613",
  },
};

const API_KEY = "fbf16579bff5b8c3f6664841d9dd0613";
const POPULAR_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
const BASE_URL = `https://api.themoviedb.org/3/discover/movie`;

function getUrl(language) {
  let countryCode = language.toUpperCase();
  return `${BASE_URL}?api_key=${API_KEY}&language=ko-KR&with_origin_country=${countryCode}&without_genres=10749,18&page=1`;
}

async function changeMovieLang(language) {
  const url = getUrl(language);

  try {
    const res = await fetch(url);
    const data = await res.json();
    handleMovieRender(data.results, url);

    data.results.forEach((movie) => {
      document.querySelectorAll(".movie-card").forEach((card) => {
        const cardID = card.querySelector(".card-id").innerText;
        card.addEventListener("click", (e) => {
          if (!e.target.classList.contains("movie-like")) {
            // 좋아요 제외
            window.location.href = `./view/detail.html?id=${cardID}`;
          }
        });
      });
    });
  } catch (e) {
    console.error("language api error =>", e);
  }
}

async function fetchUrl() {
  const url = getUrl("US");
  fetch(POPULAR_URL)
    .then((response) => response.json())
    .then((data) => {
      const movies = data.results;
      changeMovieLang("US");
      sessionStorage.removeItem("language");
      sessionStorage.setItem("language", url);
      movieLikeChk();
    })
    .catch((error) => console.error("Error:", error));
}

async function getMovieLike(movieId) {
  const countryCode = window.countryCode;
  const url = getUrl(countryCode);
  let getMovieId = movieId;
  if (getMovieId) {
    try {
      const res = await fetch(url);
      const data = await res.json();
      const movies = data.results.filter(
        (item) => item.id === Number(getMovieId)
      )[0];

      handleLikeAdd({ ...movies, img: movies.backdrop_path });
    } catch (e) {
      console.error("getMovieLike Error =>", e);
    }
  }
}
