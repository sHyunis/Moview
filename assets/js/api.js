const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: "Bearer fbf16579bff5b8c3f6664841d9dd0613",
  },
};

const API_KEY = "fbf16579bff5b8c3f6664841d9dd0613";
const URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
const BASE_URL = `https://api.themoviedb.org/3/movie`;

function getUrl(language) {
  let countryCode = language.toUpperCase();
  return `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=ko-KR&with_origin_country=${countryCode}&without_genres=10749,18&page=1`;
}

/*
 * 언어 변경 API 함수 입니다.
 * 언어가 추가될 경우 if문 추가, language.js 이벤트 리스너 추가하시면 됩니다.
*/
async function changeMovieLang(language) {
  const url = getUrl(language);

  try {
    const res = await fetch(url);
    const data = await res.json();
    handleMovieRender(data.results, url);

    data.results.forEach(movie => {
      document.querySelectorAll(".movie-card").forEach(card => {
        const cardID = card.querySelector(".card-id").innerText;
        card.addEventListener("click", (e) => {
          if (!e.target.classList.contains("movie-like")) { // 좋아요 제외 
            (window.location.href = `./view/detail.html?id=${cardID}`)
          }
        });
      })
    })
  } catch (e) {
    console.log("language api error =>", e);
  }
}

async function fetchUrl() {
  const url = getUrl("US");
  const makeCardFetchUrl = fetch(URL)
    .then((response) => response.json())
    .then((data) => {
      const movies = data.results;
      changeMovieLang("US");
      // [김민규] like 기능 적용을 위해 세션에 저장
      sessionStorage.removeItem("language");
      sessionStorage.setItem("language", url);
      movieLikeChk();
    })
    .catch((error) => console.error("Error:", error));
}

async function getMovieLike(movieId) {
  const url = getUrl("us");
  let getMovieId = movieId;
  if (getMovieId) {
    try {
      const res = await fetch(url);
      const data = await res.json();
      const movies = data.results.filter(item => item.id === Number(getMovieId))[0];;
      // const targetMovie = movies.filter(item => item.id === Number(getMovieId))[0];

      handleLikeAdd({ ...movies, img: movies.backdrop_path });
    } catch (e) {
      console.log("getMovieLike Error =>", e);
    }
  }
}

