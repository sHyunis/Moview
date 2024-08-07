import {
  db, collection,
  addDoc,
  query,
  where,
  getDocs,
  updateDoc,
  doc
} from "./fireBaseConfig.js";

document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", async (e) => {
    if (e.target.classList.contains("movie-like")) {
      try {
        const sessionChk = sessionStorage.getItem("loginState");
        const getId = e.target.closest(".movie-card").querySelector(".card-id").innerText;
        if (sessionChk) {
          getMovieLike(getId);
          if (e.target.classList.contains("curr")) {
            e.target.classList.remove("curr");
          } else {
            e.target.classList.add("curr");
          }
        } else {
          alert("회원만 가능합니다.");
        }
      } catch (e) {
        console.error("좋아요 에러 =>", e);
      }
    }
  })
})

async function handleLikeAdd({ id, img, title, overview }) {
  const loginId = sessionStorage.getItem("userLoginId");
  const movieLikeTime = getTime();

  try {
    const likeQuery = query(
      collection(db, "like"),
      where("user_id", "==", loginId),
      where("movie_id", "==", id)
    );

    const likeQueryStart = await getDocs(likeQuery);

    if (likeQueryStart.empty) {
      const newDoc = {
        user_id: loginId,
        movie_id: id,
        movie_img: img,
        movie_title: title,
        movie_over_view: overview,
        movie_like_time: movieLikeTime,
        like: true
      };
      await addDoc(collection(db, "like"), newDoc);
      return;
    }

    likeQueryStart.forEach(async (likeDoc) => {
      const likeData = likeDoc.data();
      const newLikeState = !likeData.like;

      const docRef = doc(db, "like", likeDoc.id);
      await updateDoc(docRef, { like: newLikeState, movie_like_time: movieLikeTime });

    });
  } catch (e) {
    console.error("handleLikeAdd error =>", e);
  }
}

function getTime() {
  const currentDate = new Date();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate();
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const seconds = currentDate.getSeconds();

  const formattedDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')} ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  return formattedDate;
}

window.handleLikeAdd = handleLikeAdd;