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
  const url = getUrl(language);;

  try {
    const res = await fetch(url);
    const data = await res.json();
    handleMovieRender(data.results, url);

    const movieCard = document.querySelectorAll(".movie-card")
    data.results.forEach((movie, i) => {
       const card = movieCard[i]
        card.addEventListener("click", (e) => {
          if (!e.target.classList.contains("movie-like")) { // 좋아요 제외 
            console.log("testtest => ", movie.id);
            (window.location.href = `./view/detail.html?id=${movie.id}`)

            /** 최근 본 목록  localStorage에 저장 * */
            const recentMovies = JSON.parse(localStorage.getItem('recentMovies')) || [];
            recentMovies.push(movie);

            localStorage.setItem('recentMovies', JSON.stringify(recentMovies));
            /** 최근 본 목록  localStorage에 저장 끝 * */
          }
        });
    })

  } catch (e) {
    console.log("language api error =>", e);
  }
}


/*
 * [좋아요 버튼 기능 2]
 * 1. url 변수를 통해 현재 언어의 api 값을 전닯 받음 (이 값은 language.js에서 handleMovieRend함수를 통해 세션 값을 저장함)
 * 2. 변수 title에 매개변수로 잔달받은 선택한 리스트의 타이틀을 할당함
 * 3. if문으로 타이틀이 있는지 확인 후 fetch인자에 전달받은 언어api를 할당함
 * 4. 해당 언어 api 데이터 중 title이 있는 데이터를 찾음
 * 5. 그 데이터의 id 값을 like.js의 handleLikeAdd()함수에 전달해줘야함
*/
async function getMovieLike(movieTitle) {
  let url = sessionStorage.getItem("language");
  let title = movieTitle;
  if (title) {
    try {
      const res = await fetch(url);
      const data = await res.json();
      const movies = data.results;
      const targetMovie = movies.filter(item => item.original_title === title);
      handleLikeAdd(targetMovie[0].id);
    } catch (e) {
      console.log("getMovieLike Error =>", e);
    }
  }
}
