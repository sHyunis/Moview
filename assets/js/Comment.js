document.addEventListener("DOMContentLoaded", () => {
  let reviewCards = document.getElementById("review-cards"); // 댓글내용담길곳
  let userId = document.getElementById("user-name"); // 유저아이디
  let reviewComment = document.getElementById("review-comment"); // 댓글내용
  const reviewForm = document.getElementById("review-form"); // 댓글다는곳

  // 저장되어있던 댓글 가져오기
  function uploadComment() {
    const comments = JSON.parse(localStorage.getItem("comments")) || [];
    reviewCards.innerHTML = ""; // 초기화
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

    // 삭제 버튼에 이벤트 리스너 추가
    document.querySelectorAll(".review-delete-button").forEach((button) => {
      button.addEventListener("click", deleteReview);
    });

    // 수정 버튼에 이벤트 리스너 추가
    document.querySelectorAll(".review-modify-button").forEach((button) => {
      button.addEventListener("click", modifyReview);
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
    // 기존 저장 배열 + 새로운 배열 로컬에 저장 (로컬 저장 시 문자열 반환)
    if (name && review) {
      addComment(name, review);
      // 초기화
      userId.value = "";
      reviewComment.value = "";
      uploadComment();
    }
  });

  // 댓글 삭제
  function deleteReview(event) {
    const reviewLi = event.target.closest(".review-card");
    const index = reviewLi.dataset.index;
    const comments = JSON.parse(localStorage.getItem("comments")) || [];
    comments.splice(index, 1);
    localStorage.setItem("comments", JSON.stringify(comments));
    uploadComment();
    alert("삭제가 완료되었습니다.");
  }

  // 댓글 수정 저장
  function correctionComments(index, name, review) {
    const comments = JSON.parse(localStorage.getItem("comments")) || [];
    comments[index] = { name, review };
    localStorage.setItem("comments", JSON.stringify(comments));
  }

  // 댓글 수정
  function modifyReview(event) {
    const reviewLi = event.target.closest(".review-card");
    const index = reviewLi.dataset.index;
    const comments = JSON.parse(localStorage.getItem("comments")) || [];
    const comment = comments[index];
    const newReview = prompt("댓글을 수정하세요:", comment.review);
    if (newReview !== null && newReview.trim() !== "") {
      correctionComments(index, comment.name, newReview.trim());
      uploadComment();
      alert("수정되었습니다");
    }
  }

  // 저장되어있던 댓글 표시
  uploadComment();
});
