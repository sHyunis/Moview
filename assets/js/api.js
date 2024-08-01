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
const LANG_KR = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=ko-KR&with_origin_country=KR&with_genres=16&without_genres=10749}&page=1`;
const LANG_EN = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&with_origin_country=US&with_genres=16&without_genres=10749}&page=1`;


/*
 * 언어 변경 API 함수 입니다.
 * 언어가 추가될 경우 if문 추가, language.js 이벤트 리스너 추가하시면 됩니다.
*/
async function changeMovieLang(language) {
  let url;
  if (language === 'kr') url = LANG_KR;
  else if (language === 'en') url = LANG_EN;
  try {
    const res = await fetch(url);
    const data = await res.json();
    handleMovieRender(data.results);
  } catch (e) {
    console.log("language api error =>", e);
  }
}
