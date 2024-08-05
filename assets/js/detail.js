// 현재 detail페이지의 id 가져오기

document.addEventListener("DOMContentLoaded", () => {
  //window.location.search가 "?id=12345"를 반환하면
  //URLSearchParams 객체로 get 메소드를 사용하여 특정 쿼리 파라미터의 값을 추출

  const params = new URLSearchParams(window.location.search);
  const movieId = params.get("id");
  //해당 영화 아이디 console.log로 찍어보고
  console.log(movieId);

  if (movieId) {
    // 영화 id가 있으면 데이터 가져와서 fetchMovieDetails의 인자로 전달ㄱㄱ
    fetchMovieDetails(movieId);
  } else {
    console.error("영화 ID를 찾을 수 없어요.");
  }
});

// api 요청 함수 

function fetchMovieDetails(id) {
  // API 요청하기 위해서 apiKey랑 apiUrl 가져오기 일단 전체 영화가 담긴 apiURL로 가져오자
  const apiKey = "fbf16579bff5b8c3f6664841d9dd0613";
  const apiUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      //console.log로 먼저 데이터가 정확히 들어오는지 확인해보기
      //받아온 data로 html에 적용시켜야 하니까 showMovieDetails 함수에 데이터를 인자로 보내주기
      console.log(data);
      showMovieDetails(data);
    })
    .catch((error) => {
      console.error("상세페이지 에러:", error);
    });
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
            <div>${movie.release_date} · ${genres} </div>
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
