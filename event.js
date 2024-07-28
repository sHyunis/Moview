// 버튼 클릭시 지정한 요소가 보이도록, 스크롤 이동 이벤트

const downArrowButton = document.querySelector(".down-arrow");
const searchInputButton = document.querySelector(".section2").offsetTop;
downArrowButton.addEventListener("click", () => {
  window.scrollTo({ left: 0, top: searchInputButton, behavior: "smooth" });
});

// // 버튼 클릭시 클래스 추가 함수
// function showSection2() {
//   const section2 = document.querySelector(".section2");
//   section2.classList.add("showContent");
// }
