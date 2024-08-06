import { db, collection, getDocs } from "./fireBaseConfig.js";

window.countryCode = 'US';
fetchUrl();


async function movieLikeChk() {
  try {
    const likeDb = await getDocs(collection(db, "like"));
    const movieCard = document.querySelectorAll(".movie-card");
    const sessionChk = sessionStorage.getItem("userLoginId");

    movieCard.forEach(cards => {
      const cardsTarget = cards.querySelector('.card-id').innerText;
      likeDb.forEach(el => {
        const likeDb = el.data();
        if (Number(cardsTarget) == Number(likeDb.movie_id) && likeDb.user_id === sessionChk && likeDb.like) {
          cards.querySelector(".movie-like").classList.add("curr");
        }
      })
    })
  } catch (e) {
    console.error("movieLikeChk =>", e);
  }
}
window.movieLikeChk = movieLikeChk;

document.querySelector(".search").addEventListener("submit", (e) => {
  e.preventDefault();
  const searchInput = document.getElementById("searchInput").value.toLowerCase();
  const movieCards = document.querySelectorAll(".movie-card");

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

    const overView = movieCard.querySelector('.movie-overview');
    overView.style.opacity = '1';
  }
}, { passive: false });


document.addEventListener('mouseout', function (event) {
  const targetElement = event.target;

  if (targetElement.closest('.movie-card')) {
    const movieCard = targetElement.closest('.movie-card');

    const overView = movieCard.querySelector('.movie-overview');
    overView.style.opacity = '0';
  }
}, { passive: false });

