// 현재 detail페이지의 id 가져오기
document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const movieId = params.get("id");
  console.log(movieId);

  if (movieId) {
    fetchMovieDetails(movieId);
    fetchMovieCredits(movieId);
    fetchMovieOTT(movieId);
  } else {
    console.error("영화 ID를 찾을 수 없어요.");
  }
});
const apiKey = "fbf16579bff5b8c3f6664841d9dd0613";

// 영화 데이터 요청
// Promise 체이닝(fetch, then)에서  async/await 문법으로 변경했음
async function fetchMovieDetails(id) {
  // API 요청하기 위해서 apiKey랑 apiUrl 가져오기 일단 전체 영화가 담긴 apiURL로 가져오자
  const apiUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=ko-KR`;
  try {
    const response = await fetch(apiUrl);
    const movieData = await response.json();
    //console.log로 먼저 데이터가 정확히 들어오는지 확인해보기
    console.log(movieData);
    //받아온 data로 html에 적용시켜야 하니까 showMovieDetails 함수에 데이터를 인자로 보내주기
    showMovieDetails(movieData);
  } catch (error) {
    console.error("상세페이지 에러:", error);
  }
}

function fetchMovieDetails(id) {
  // API 요청하기 위해서 apiKey랑 apiUrl 가져오기 일단 전체 영화가 담긴 apiURL로 가져오자
  const apiKey = "fbf16579bff5b8c3f6664841d9dd0613";
  const apiUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`;

  try {
    const response = await fetch(apiUrl);
    const creditdata = await response.json();
    console.log(creditdata);
    showCastInfo(creditdata);
  } catch (error) {
    console.error("크레딧 페이지 에러:", error);
  }
}

// OTT 데이터 요청
async function fetchMovieOTT(id) {
  const apiUrl = `https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=${apiKey}`;
  try {
    const response = await fetch(apiUrl);
    const ottData = await response.json();
    console.log("무비 오티티 =>", ottData);
    showOttData(ottData);
  } catch (error) {
    console.error("OTT 정보 에러:", error);
  }
}

function showMovieDetails(movie) {
  if (movie) {
    showImages(movie);
    showMovieInfo(movie);
    showCastInfo(movie);
  } else {
    console.error("전달받은 영화데이터 없음.");
  }
}

//영화 포스터 및 백 그라운드(백드롭)이미지 붙여주는 함수

function showImages(movie) {
  // querySelector(selector) :  DOM API의 메소드, 인자로 ID, 태그 이름 등을 사용할 수 있음
  // 포스터 이미지와 백드롭 이미지 넣어주기

  const moviePoster = document.querySelector(".movie-poster");
  moviePoster.innerHTML = `<img src="https://image.tmdb.org/t/p/w200${movie.poster_path}" alt="${movie.title}">`;

  /// 백드롭 스타일도 추가
  const moviebackdropArea = document.querySelector("*");
  moviebackdropArea.style.backgroundImage = `url('https://image.tmdb.org/t/p/original${movie.backdrop_path}')`;
  moviebackdropArea.style.backgroundSize = "cover";
  moviebackdropArea.style.backgroundPosition = "center";
}

//영화 정보들 (제목, 장르, 개봉일, 등등) 보여주는 함수
function showMovieInfo(movie) {

  //영화 소개 데이터를 붙여줄 div의 클래스를 지정
  const movieInfoArea = document.querySelector(".movie-info-middle");

  //장르는 배열에 객체들이 담겨 있어서 map으로 장르 이름을 가져와서 join 메소드로 / 슬래시를 붙여줌
  const genres = movie.genres.map(genre => genre.name).join('/');

  //런타임은 나중에 시간과 분으로 표기할 예정

  movieInfoArea.innerHTML = `
        <div class="movie-summary">
            <h1>${movie.title}</h1>
            <div>${movie.original_title}</div>
            <div>${movie.release_date} </div>
            <div>${genres}</div>
            <div>${movie.runtime}Min · ${movie.origin_country}</div>
            <div>평점 : ${movie.vote_average}</div>
          </div>
    `;
}
function showCastInfo(movie) {
  console.log("캐스트인포 실행")
  const showCastInfoArea = document.querySelector(".cast-list");
  showCastInfoArea.innerHTML = `
            <li class="cast-Card">
              <div class="cast-profileImage">프로필</div> 
              <div class="cast-info">
                <div>이름</div>
                <div>직무</div>
              </div>
            </li>
    `;
}
// 직무가 감독인 스텝 가지고 와서 html 붙여주기
function showCastInfo(credit) {
  const castList = credit.cast;
  const Producer = credit.crew.find((step) => step.job === "Director");
  const showCastInfoArea = document.querySelector(".cast-list");

  showCastInfoArea.innerHTML = `
                <li class="cast-card">
                  <div class="cast-profileImage" style="background-size: cover;">
                  <img class="profileImage" src="https://image.tmdb.org/t/p/w300${Producer.profile_path}" alt="이미지"
                  onerror="this.onerror=null; this.src='../assets/img/pngwing.com.png'"
                  >
                 </div> 
                <div class="cast-info">
                  <div class="cast-name">${Producer.name}</div>
                  <div class="cast-producer">감독</div>
                </div>
                </li>`;
  // 배우들 카드 형식으로 html 붙여주기
  castList.slice(0, 11).forEach((cast) => {
    const profileImgUrl = cast.profile_path;
    const listItem = document.createElement("li");
    listItem.className = "cast-card";

    listItem.innerHTML = `
                <div class="cast-profileImage" style="background-size: cover;">
                  <img class="profileImage" src="https://image.tmdb.org/t/p/w300${profileImgUrl}" alt="이미지"
                  onerror="this.onerror=null; this.src='../assets/img/pngwing.com.png'"
                  >
                 </div> 
                <div class="cast-info">
                  <div class="cast-name">${cast.name}</div>
                  <div class="cast-actor">배우<div>
                </div>
                  `;
    showCastInfoArea.appendChild(listItem);
  });

}

function showOttData(ottData) {
  const ottList = ottData.results.US.flatrate;
  console.log("ott=>", ottList);
  const showOttDataArea = document.querySelector(".ott-list");

  ottList.slice(0, 6).forEach((ott)=>{
    const ottLogo = ott.logo_path;
    const listItem = document.createElement("li");
    listItem.innerHTML = 
    `
        <divstyle="background-size: cover;">
        <img class="profileImage" src="https://image.tmdb.org/t/p/w300${ottLogo}" alt="이미지"
        onerror="this.onerror=null; this.src='../assets/img/pngwing.com.png'"
        >
        </divstyle=> 
        <div>
          <div>${ott.provider_name}</div>
          <div></div>
        </div>
    `;
    showOttDataArea.appendChild(listItem);
  })
}