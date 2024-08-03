// 댓글기능
// 작성, 저장, 업로드, 수정, 삭제
document.addEventListener("DOMContentLoaded", () => {
  let reviewCards = document.getElementById("review-cards"); // 댓글내용담길곳
  let userId = document.getElementById("user-name"); // 유저아이디
  let reviewComment = document.getElementById("review-comment"); // 댓글내용
  const reviewForm = document.getElementById("review-form"); // 댓글다는곳

  // 저장되어있던 댓글 가져오기
  function uploadComment() {
    const comments = JSON.parse(localStorage.getItem("comments"));
    reviewCards.innerHTML = ""; //초기화
    comments.forEach(({ name, review }, index) => {
      // 카드목록, 제목, 내용 생성
      const reviewLi = document.createElement("li");
      reviewLi.className = "review-card";
      reviewLi.dataset.index = index;
      const reviewCardContent = `
      <div class="review-card-id">${name}</div>
      <div class="review-card-content">${review}</div>
      <button class="review-modify-button">수정</button>
      <button class="review-delete-button">삭제</button>
    `;
      reviewLi.innerHTML = reviewCardContent;
      reviewCards.appendChild(reviewLi);
    });

    document.querySelectorAll(".review-delete-button").forEach((button) => {
      button.addEventListener("click", deleteReview);
    });
  }

  // 댓글내용 저장
  function addComment(name, review) {
    const comments = JSON.parse(localStorage.getItem("comments")) || [];
    comments.push({ name, review });
    localStorage.setItem("comments", JSON.stringify(comments));
  }

  // 제출 시 내용 업데이트 + 저장
  reviewForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = userId.value;
    const review = reviewComment.value;
    // 기존저장배열 + 새로운 배열 로컬에 저장(로컬저장시 문자열반환)
    if (name && review) {
      addComment(name, review);
      //초기화
      userId.value = "";
      reviewComment.value = "";
      uploadComment();
    }
  });

  // 저장되어있던 댓글표시

  // 댓글 삭제

  function deleteReview(event) {
    const reviewLi = event.target.closest(".review-card");
    const index = reviewLi.dataset.index;
    const comments = JSON.parse(localStorage.getItem("comments")) || [];
    comments.splice(index, 1);
    localStorage.setItem("comments", JSON.stringify(comments));
    uploadComment();
  }

  uploadComment();
});
