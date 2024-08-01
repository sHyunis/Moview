// Firebase연결
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAf6tpBLK4lpa6mptOgZdIHBlMWtifb9ZA",
  authDomain: "moviewcomment.firebaseapp.com",
  databaseURL: "https://moviewcomment-default-rtdb.firebaseio.com",
  projectId: "moviewcomment",
  storageBucket: "moviewcomment.appspot.com",
  messagingSenderId: "928738170005",
  appId: "1:928738170005:web:c08cc7ec46f83759cbf79c",
  measurementId: "G-215G91YH2W",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// 댓글
// 코멘트 입력할 칸
const inputComment = document.querySelector(".commentInput");
// 포스팅하기 누를 버튼
const postingButton = document.querySelector(".postingButton");
// 리뷰가 나타날 카드
const reviewCard = document.querySelector(".reviewCard");

// 댓글 레이아웃
const commentSetting = (button, index) => {
  const comments = document.createElement("div");
  const userID = document.createElement("span");
  const commentsText = document.createElement("span");

  comments.classList.add = "commentsSet";
  userID.classList.add = "userId";
  commentsText.classList.add = "commentsText";
  uploadBtn.classList.add = "uploadBtn";
  userID.innerHTML = `<a href = "#" class ="commentUserId">아이디</a>`;
  commentsText.innerText = inputComment[index].value;
  // comments에 userId와 내용 저장
  comments.appendChild(userID);
  comments.appendChild(commentsText);
  // input창 입력 후 댓글 창에 표시
  commentsList[index].appendChild(comments);

  //이벤트후
  inputComment[index].value = "";
};

// 게시 버튼 활성화 함수
function postButton() {
  postingButton.forEach((button, index) => {
    button.addEventListener("click", () => {
      commentSetting(button, index);
    });
  });
}

// 엔터를 쳤을 때 댓글이 작성되도록
function postInCard() {
  inputComment.forEach((button, index) => {
    button.addEventListener();
  });
}
