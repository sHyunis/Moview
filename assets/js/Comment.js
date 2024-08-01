// 댓글기능
// 작성, 저장, 업로드, 수정, 삭제
document.addEventListener("DOMContentLoaded", () => {
  let reviewCard = document.getElementById("review-card"); // 댓글내용담길곳
  let userId = document.getElementById("user-name"); // 유저아이디
  let reviewComment = document.getElementById("review-comment"); // 댓글내용
  const reviewForm = document.getElementById("review-form"); // 댓글다는곳

  // 저장되어있던 댓글 가져오기
  function uploadComment() {
    const comments = JSON.parse(localStorage.getItem("comments"));
    reviewCard.innerHTML = ""; //초기화
    comments.forEach(({ name, review }) => {
      // 카드목록, 제목, 내용 생성
      const li = document.createElement("li");
      const reviewId = document.createElement("div");
      reviewId.className = "review-card-id";
      reviewId.textContent = name;
      const list = document.createElement("p");
      list.className = "review-card-content";
      list.textContent = review;
      li.appendChild(reviewId);
      li.appendChild(list);
      reviewCard.appendChild(li);
    });
  }
  // 댓글내용 저장
  function addComment(name, comment) {
    const comments = JSON.parse(localStorage.getItem("comments")) || [];
    comments.push({ name, comment });
    localStorage.setItem("comments", JSON.stringify(comments));
  }

  // 제출 시 내용 업데이트 + 저장
  reviewForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = userId.value;
    const comment = reviewComment.value;
    // 기존저장배열 + 새로운 배열 로컬에 저장(로컬저장시 문자열반환)
    if (name && comment) {
      addComment(name, comment);
      //초기화
      userId.value = "";
      reviewComment.value = "";
      uploadComment();
    }
  });

  // 저장되어있던 댓글표시

  uploadComment();
  console.log(uploadComment());
});
