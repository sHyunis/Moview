// Firebase SDK 라이브러리 가져오기
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  updateDoc,
  doc
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC3OuNZBprr2iRYKTB6C83s4ciXXOTDROA",
  authDomain: "sparta-movie-project.firebaseapp.com",
  projectId: "sparta-movie-project",
  storageBucket: "sparta-movie-project.appspot.com",
  messagingSenderId: "29347735133",
  appId: "1:29347735133:web:19ff5afb5e7e61d4644fb4"
};

// Firebase 인스턴스 초기화
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


async function fetchUrl() {
  const makeCardFetchUrl = fetch(LANG_EN)
    .then((response) => response.json())
    .then((data) => {
      const movies = data.results;
      changeMovieLang("en")
      // [김민규] like 기능 적용을 위해 세션에 저장
      sessionStorage.removeItem("language");
      sessionStorage.setItem("language", LANG_EN);
      movieLikeChk();
    })
    .catch((error) => console.error("Error:", error));
}
fetchUrl();
// 검색기능

/*
 * [좋아요 버튼 기능 5]
 * 처음 로딩했을 때, 좋아요 표시를 주기 위해 각 게시물의 Id값과 db의 id값을 비교해서 일치할 경우
 * 해당 게시물에 curr클래스를 적용해줌
*/
async function movieLikeChk() {
  try {
    const likeDb = await getDocs(collection(db, "like"));
    const movieCard = document.querySelectorAll(".movie-card");
    movieCard.forEach(cards => {
      const cardsTarget = cards.querySelector('.card-id').innerText;
      likeDb.forEach(el => {
        const likeDb = el.data();
        if (Number(cardsTarget) == Number(likeDb.movie_id)) {
          cards.querySelector(".movie-like").classList.add("curr");
        }
      })
    })

  } catch (e) {
    console.log("movieLikeChk =>", e);
  }
}
window.movieLikeChk = movieLikeChk;

document.querySelector(".search").addEventListener("submit", (e) => {
  // input 에 넣은 값 소문자로 변환
  e.preventDefault();
  const searchInput = document
    .getElementById("searchInput")
    .value.toLowerCase();
  const movieCards = document.querySelectorAll(".movie-card");
  // 모든 카드들의 제목과 input값 포함시 조건에 따라 display 변화주기
  // 아무것도 입력하지 않았을 시 검색어 입력요청 alert창
  movieCards.forEach((card) => {
    const title = card.querySelector("h3").textContent.toLowerCase();

    if (searchInput.length > 1) {
      if (title.includes(searchInput)) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    } else {
      alert("검색어를 입력해주세요");
      preventDefault();
    }
  });
});


document.addEventListener('mouseover', function (event) {
  const targetElement = event.target;

  if (targetElement.closest('.movie-card')) {
    const movieCard = targetElement.closest('.movie-card');
    movieCard.style.filter = `brightness(50%)`;

    const overView = movieCard.querySelector('.movie-overview');
    overView.style.opacity = '1';
  }
}, { passive: false });


document.addEventListener('mouseout', function (event) {
  const targetElement = event.target;

  if (targetElement.closest('.movie-card')) {
    const movieCard = targetElement.closest('.movie-card');
    movieCard.style.filter = `brightness(100%)`;

    const overView = movieCard.querySelector('.movie-overview');
    overView.style.opacity = '0';
  }
}, { passive: false });
