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

/*
 * [좋아요 버튼 기능 2]
 * 1. url 변수를 통해 현재 언어의 api 값을 전닯 받음 (이 값은 language.js에서 handleMovieRend함수를 통해 세션 값을 저장함)
 * 2. 변수 getMovieId에 매개변수로 전달받은 선택한 리스트의 아이디값을 할당함
 * 3. if문으로 아이디값이 있는지 확인 후 fetch인자에 전달받은 url(언어)을 할당함
 * 4. 해당 언어 api 데이터 중 id값이 있는 데이터를 찾기 위해 filter메서드를 사용
 * 5. filter메서드를 통해 true인 데이터를 통해 아이디,이미지,타이틀,짧은 글을 변수에 할당하고 handleLikeAdd 함수의 매개변수에 할당 후 실행
*/
async function getMovieLike(movieId) {
  const url = getUrl("us");
  let getMovieId = movieId;
  if (getMovieId) {
    try {
      const res = await fetch(url);
      const data = await res.json();
      const movies = data.results;
      const targetMovie = movies.filter(item => item.id === Number(getMovieId))[0];
      const targetId = targetMovie.id;
      const targetImg = targetMovie.backdrop_path;
      const targetTitle = targetMovie.title;
      const targetOverView = targetMovie.overview;

      handleLikeAdd(targetId, targetImg, targetTitle, targetOverView);
    } catch (e) {
      console.log("getMovieLike Error =>", e);
    }
  }
}

