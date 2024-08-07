import {
  db,
  collection,
  addDoc,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
} from "./fireBaseConfig.js";

const allStars = document.querySelectorAll(".star");
let lastClickedIndex = null;
let lastSaveScore = null;
let userRating = null;

const params = new URLSearchParams(window.location.search);
const movieId = params.get("id");
const loginId = sessionStorage.getItem("userLoginId");

document.addEventListener("DOMContentLoaded", async () => {
  userRating = await getUserScore(loginId, movieId);
  showStars(userRating);
  getAverageScoreForMovie(movieId);
  initializeStars(loginId, movieId);
});

async function saveScore(loginId, movieId, score) {
  try {
    const userRef = collection(db, "userScores");
    const scoreQuery = query(
      userRef,
      where("loginId", "==", loginId),
      where("movieId", "==", movieId)
    );
    const scoreQuerySnapshot = await getDocs(scoreQuery);

    if (!scoreQuerySnapshot.empty) {
      const docId = scoreQuerySnapshot.docs[0].id;
      const docRef = doc(db, "userScores", docId);
      await updateDoc(docRef, { score });
    } else {
      await addDoc(collection(db, "userScores"), {
        loginId,
        movieId,
        score,
      });
    }
  } catch (e) {
    console.error("데이터 베이스 저장 오류: ", e);
  }
}

async function getUserScore(loginId, movieId) {
  try {
    if (loginId !== null) {
      const userRef = collection(db, "userScores");
      const scoreQuery = query(
        userRef,
        where("loginId", "==", loginId),
        where("movieId", "==", movieId)
      );
      const scoreQuerySnapshot = await getDocs(scoreQuery);
      lastSaveScore = scoreQuerySnapshot.docs[0].data().score - 1;
      console.log("실행됨");
    }
  } catch (error) {
    console.error(error);
  }
}

async function getMovieScores(movieId) {
  const userRef = collection(db, "userScores");
  const scoreQuery = query(userRef, where("movieId", "==", movieId));
  const scoreQuerySnapshot = await getDocs(scoreQuery);

  if (!scoreQuerySnapshot.empty) {
    return scoreQuerySnapshot.docs.map((doc) => doc.data().score);
  }
  return [];
}

async function getAverageScoreForMovie(movieId) {
  const scores = await getMovieScores(movieId);
  const moviewAverage = document.querySelector(".moview-average");
  if (scores.length === 0) {
    return 0;
  }
  const totalScore = scores.reduce((sum, score) => sum + score, 0);
  const averageScore = (totalScore / scores.length) * 2;
  const resultScore = `<span>Moview</span><p>${parseFloat(
    averageScore.toFixed(1)
  )}</p>`;
  moviewAverage.innerHTML = resultScore;
}

async function clickStars(loginId, movieId, index) {
  if (loginId !== null) {
    let currentStar = index + 1;
    let score = null;

    if (lastClickedIndex === index) {
      resetStars();
      lastClickedIndex = null;
    } else {
      showStars(currentStar);
      score = index + 1;
      lastClickedIndex = index;
    }
    await saveScore(loginId, movieId, score);
    getUserScore(loginId, movieId);
  } else {
    resetStars();
    alert("로그인 해주세요");
    window.location.href = "./member_login.html";
  }
}

function showStars(score) {
  allStars.forEach((star, i) => {
    if (score > i) {
      star.innerHTML = "&#9733";
    } else {
      star.innerHTML = "&#9734";
    }
  });
}

function starMouseOut() {
  showStars(lastSaveScore !== null ? lastSaveScore + 1 : 0);
  getUserScore(loginId, movieId);
}

function resetStars() {
  allStars.forEach((star) => {
    star.innerHTML = "&#9734";
  });
}

function initializeStars(loginId, movieId) {
  allStars.forEach((star, i) => {
    star.onclick = () => clickStars(loginId, movieId, i);
    star.onmouseover = () => showStars(i + 1);
    star.onmouseout = starMouseOut;
  });
}
