document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const movieId = params.get("id");
  console.log(movieId);
 
  if (movieId) {
    fetchMovieDetails(movieId);
    fetchMovieCredits(movieId);
    fetchMovieOTT(movieId);
    fetchSimilarMovies(movieId);
  } else {
    console.error("영화 ID를 찾을 수 없어요.");
  }
});
const apiKey = "fbf16579bff5b8c3f6664841d9dd0613";

// 영화 데이터 요청
async function fetchMovieDetails(id) {
  const apiUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=ko-KR`;
  try {
    const response = await fetch(apiUrl);
    const movieData = await response.json();
    console.log(movieData);
    showMovieDetails(movieData);
  } catch (error) {
    console.error("상세페이지 에러:", error);
  }
}

// 크레딧 데이터 요청
async function fetchMovieCredits(id) {
  const apiUrl = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}&language=ko`;
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
  } else {
    console.error("전달받은 영화데이터 없음.");
  }
}

function showImages(movie) {
  const moviePoster = document.querySelector(".movie-poster");
  moviePoster.innerHTML = `<img src="https://image.tmdb.org/t/p/w200${movie.poster_path}" alt="${movie.title}">`;

  const moviebackdropArea = document.querySelector("*");
  moviebackdropArea.style.backgroundImage = `url('https://image.tmdb.org/t/p/original${movie.backdrop_path}')`;
  moviebackdropArea.style.backgroundSize = "cover";
  moviebackdropArea.style.backgroundPosition = "center";
}

function showMovieInfo(movie) {
  const movieInfoArea = document.querySelector(".movie-info-middle");
  const genres = movie.genres.map((genre) => genre.name).join(" · ");

  movieInfoArea.innerHTML = `
    <div class="movie-summary">
        <h1>${movie.title}</h1>
        <div>${movie.original_title}</div>
        <div>${movie.release_date} </div>
        <div>${genres}</div>
        <div>${movie.runtime}분 · ${movie.origin_country}</div>
        <div>★ ${movie.vote_average}</div>
      </div>
  `;
}

function showCastInfo(credit) {
  const castList = credit.cast;
  const Producer = credit.crew.find((step) => step.job === "Director");
  const showCastInfoArea = document.querySelector(".cast-list");

  showCastInfoArea.innerHTML = `
    <li class="cast-card">
      <div class="cast-profileImage" style="background-size: cover;">
      <img class="profileImage" src="https://image.tmdb.org/t/p/w300${Producer.profile_path}" alt="이미지"
      onerror="this.onerror=null; this.src='../assets/img/pngwing.com.png'">
     </div> 
    <div class="cast-info">
      <div class="cast-name">${Producer.name}</div>
      <div class="cast-producer">감독</div>
    </div>
    </li>`;

  castList.slice(0, 11).forEach((cast) => {
    const profileImgUrl = cast.profile_path;
    const listItem = document.createElement("li");
    listItem.className = "cast-card";

    listItem.innerHTML = `
      <div class="cast-profileImage" style="background-size: cover;">
        <img class="profileImage" src="https://image.tmdb.org/t/p/w300${profileImgUrl}" alt="이미지"
        onerror="this.onerror=null; this.src='../assets/img/pngwing.com.png'">
       </div> 
      <div class="cast-info">
        <div class="cast-name">${cast.name}</div>
        <div class="cast-actor">배우<div>
      </div>`;

    showCastInfoArea.appendChild(listItem);
  });
}

function showOttData(ottData) {
  const showOttDataArea = document.querySelector(".ott-list");
  console.log("오티티결과",ottData.results)
  if (ottData.results.US === undefined || ottData.results.US.buy === undefined){
    const listItem = document.createElement("li");

    listItem.innerHTML = `
        <div class="">
          OTT 정보가 없습니다.
        </div>
      `;
    showOttDataArea.appendChild(listItem);
  } else {
    const ottList = ottData.results.US.buy;
    console.log("ott=>", ottList);
    
    ottList.slice(0, 6).forEach((ott) => {
      const ottLogo = ott.logo_path;
      const listItem = document.createElement("li");
      listItem.className = "ott-card";
      listItem.innerHTML = `
            <div class="ott-card-providerImage" style="background-size: cover;">
            <img class="providerImage" src="https://image.tmdb.org/t/p/w300${ottLogo}" alt="이미지"
            onerror="this.onerror=null; this.src='../assets/img/pngwing.com.png'"
            >
            </div>
            <div class="ott-card-provider">
              <div>${ott.provider_name}</div>
            </div>
        `;
      showOttDataArea.appendChild(listItem);
    });
  }
}

// 비슷한 장르의 영화 가져오기
async function fetchSimilarMovies(id) {
  const apiUrl = `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${apiKey}&language=ko-KR`;
  try {
    const response = await fetch(apiUrl);
    const similarData = await response.json();
    console.log("비슷한 장르의 영화 =>", similarData);
    similarMovie(similarData);
  } catch (error) {
    console.error("비슷한 영화 정보가 없습니다", error);
  }
}

// 비슷한 영화를 불러오고 카드 형태로 만들어 붙여넣어줌
function similarMovie(similarData) {
  const similarGenreList = document.querySelector(".genre-list");
  const similarMovies = similarData.results;

  similarMovies.slice(0, 6).forEach((movie) => {
    const similarLi = document.createElement("li");
    similarLi.className = "similar-Movie";
    similarLi.innerHTML = `
      <div class="similar-poster">
        <img src="https://image.tmdb.org/t/p/w200${movie.poster_path}" alt="${movie.title}">
      </div>
      <div class="similar-movie-data">
        <div class="similar-title">${movie.title}</div>
      </div>`;

    similarGenreList.appendChild(similarLi);
  });
}
