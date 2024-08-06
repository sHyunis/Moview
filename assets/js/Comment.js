document.addEventListener("DOMContentLoaded", () => {
  let reviewCards = document.getElementById("review-cards"); // 댓글내용담길곳
  let userId = document.getElementById("user-name"); // 유저아이디
  let reviewComment = document.getElementById("review-comment"); // 댓글내용
  const reviewForm = document.getElementById("review-form"); // 댓글다는곳

  let currentEditIndex = null; // 현재 수정 중인 댓글의 인덱스

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
      button.addEventListener("click", fetchModalHtml);
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

  // modal html 불러오기
  async function fetchModalHtml(event) {
    const reviewLi = event.target.closest(".review-card");
    currentEditIndex = reviewLi.dataset.index;
    const comments = JSON.parse(localStorage.getItem("comments")) || [];
    const comment = comments[currentEditIndex];

    try {
      const response = await fetch("/view/modal.html");
      const modalData = await response.text();
      document.body.insertAdjacentHTML("beforeend", modalData);

      const closeModalButton = document.getElementById("modal-close-button");
      const modal = document.getElementById("modal");
      const modalId = document.getElementById("modify-id");
      const modalComment = document.getElementById("modify-comment");
      const modalSaveButton = document.getElementById("modify-save-button");

      modalId.value = comment.name;
      modalComment.value = comment.review;

      // 모달 닫기
      closeModalButton.addEventListener("click", () => {
        modal.remove();
      });

      window.addEventListener("click", (event) => {
        if (event.target === modal) {
          modal.remove();
        }
      });

      // 모달 저장 버튼
      modalSaveButton.addEventListener("click", (event) => {
        event.preventDefault();
        const newReview = modalComment.value.trim();
        if (newReview !== "") {
          correctionComments(currentEditIndex, comment.name, newReview);
          uploadComment();
          modal.remove();
          alert("수정이 완료되었습니다.");
        }
      });
    } catch (error) {
      console.log("수정을 할 수 없습니다.", error);
    }
  }

  // 댓글 수정 저장
  function correctionComments(index, name, review) {
    const comments = JSON.parse(localStorage.getItem("comments")) || [];
    comments[index] = { name, review };
    localStorage.setItem("comments", JSON.stringify(comments));
  }

  // 저장되어있던 댓글 표시
  uploadComment();

  // 버튼누르면 후기쓰기, 후기보기
  const makeReviewButton = document.getElementById("make-review-button");
  const seeReviewButton = document.getElementById("see-review-button");

  makeReviewButton.addEventListener("click", () => {
    reviewCards.style.display = "none";
    reviewForm.style.display = "flex";
  });
  seeReviewButton.addEventListener("click", () => {
    reviewCards.style.display = "flex";
    reviewForm.style.display = "none";
  });
});
