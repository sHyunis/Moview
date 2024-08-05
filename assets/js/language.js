/**
 * 언어별 출력하는 스크립트 입니다.
 * 사용 페이지에서 id값을 맞춰 html을 추가
 * 만약 id가 변경되어야 한다면, 이벤트리스너만 추가해주시면 됩니다.
 */
const btnLanguageKr = document.getElementById("btn-lang-kr");
const btnLanguageEn = document.getElementById("btn-lang-en");


// 리스트 생성
function handleMovieCreate(movie) {
  // [이준열] : movie-card에 이벤트를 넣으려면 innerHTML이 아닌 HTML'객체' 로 반환되어야 해서 수정했습니다.
  // 확인 전 까지 우선 코드 놔두겠습니다!
  // return `
  //   <div class="movie-card">
  //     <div class = "card-img">
  //       <span class="movie-like">☆</span>
  //       <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
  //     </div>
  //     <div class = "movie-content">
  //     <h3>${movie.title}</h3>
  //     <p class="movie-overview">${movie.overview.slice(0, 200)}</p> 
  //     <span>Rating: ${movie.vote_average}</span>
  //     <em class="card-id" style="display:none;">${movie.id}</em>
  //     </div>    
  //   </div>
  // `

  /** 최근 본 목록  localStorage에 저장 * */
  const card = document.createElement("div");
  card.className = "movie-card";
  card.innerHTML = `
    <div class="card-img">
      <span class="movie-like">☆</span>
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
    </div>
    <div class="movie-content">
      <h3>${movie.title}</h3>
      <p class="movie-overview">${movie.overview.slice(0, 200)}</p>
      <span>Rating: ${movie.vote_average}</span>
      <em class="card-id" style="display:none;">${movie.id}</em>
    </div>
  `;

  card.addEventListener("click", () => {
    const recentMovies = JSON.parse(localStorage.getItem('recentMovies')) || [];
    recentMovies.unshift(movie);

    localStorage.setItem('recentMovies', JSON.stringify(recentMovies));
  });
  /** 최근 본 목록  localStorage에 저장 끝 * */

  return card;
}

// 리스트 출력
function handleMovieRender(movies, language) {
  const movieContainer = document.getElementById("movie-container");

  // [이준열] : movie-card에 이벤트를 넣으려면 innerHTML이 아닌 HTML'객체' 로 반환되어야 해서 수정했습니다.
  // movieContainer.innerHTML = "";
  // movieContainer.innerHTML = movies.map(handleMovieCreate).join('');
  movies.forEach(movie => {
    movieContainer.appendChild(handleMovieCreate(movie));
  });

  // 좋아요 클릭 시 국,영 확인하기 위해 세션 스토리지에 저장
  sessionStorage.removeItem("language");
  sessionStorage.setItem("language", language);
  movieLikeChk();
}


// 클릭 이벤트
btnLanguageKr.addEventListener("click", () => changeMovieLang('KR'));
btnLanguageEn.addEventListener("click", () => changeMovieLang('US'));

