document.addEventListener("DOMContentLoaded", () => {
  let reviewCards = document.getElementById("review-cards");
  let userId = document.getElementById("user-name");
  let reviewComment = document.getElementById("review-comment");
  const reviewForm = document.getElementById("review-form");

  let currentEditIndex = null;

  function uploadComment() {
    const comments = JSON.parse(localStorage.getItem("comments")) || [];
    reviewCards.innerHTML = "";
    comments.forEach(({ name, review }, index) => {
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

    document.querySelectorAll(".review-modify-button").forEach((button) => {
      button.addEventListener("click", fetchModalHtml);
    });
  }

  function addComment(name, review) {
    const comments = JSON.parse(localStorage.getItem("comments")) || [];
    comments.push({ name, review });
    localStorage.setItem("comments", JSON.stringify(comments));
  }

  reviewForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = userId.value;
    const review = reviewComment.value;

    if (name && review) {
      addComment(name, review);
      userId.value = "";
      reviewComment.value = "";
      uploadComment();
    }
  });

  function deleteReview(event) {
    const reviewLi = event.target.closest(".review-card");
    const index = reviewLi.dataset.index;
    const comments = JSON.parse(localStorage.getItem("comments")) || [];
    comments.splice(index, 1);
    localStorage.setItem("comments", JSON.stringify(comments));
    uploadComment();
    alert("삭제가 완료되었습니다.");
  }

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

      closeModalButton.addEventListener("click", () => {
        modal.remove();
      });

      window.addEventListener("click", (event) => {
        if (event.target === modal) {
          modal.remove();
        }
      });

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
      console.error("수정을 할 수 없습니다.", error);
    }
  }

  function correctionComments(index, name, review) {
    const comments = JSON.parse(localStorage.getItem("comments")) || [];
    comments[index] = { name, review };
    localStorage.setItem("comments", JSON.stringify(comments));
  }

  uploadComment();

  const makeReviewButton = document.getElementById("make-review-button");
  const seeReviewButton = document.getElementById("see-review-button");

  makeReviewButton.addEventListener("click", () => {
    reviewCards.style.display = "none";
    reviewForm.style.display = "block";
  });
  seeReviewButton.addEventListener("click", () => {
    reviewCards.style.display = "block";
    reviewForm.style.display = "none";
  });
});
