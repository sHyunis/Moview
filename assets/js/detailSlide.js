//document.addEventListener("DOMContentLoaded", ...)는 웹 페이지의 DOM이 완전히 로드된 후에 특정 코드를 실행
document.addEventListener("DOMContentLoaded", () => {
  // 전체 슬라이더 컨테이너
  const slider = document.querySelector(".slider");
  // 슬라이드 요소들의 리스트
  const slides = document.querySelectorAll(".slide");
  // 왼쪽 이동 버튼
  const leftButton = document.querySelector(".slide-button.left");
  // 오른쪽 이동 버튼
  const rightButton = document.querySelector(".slide-button.right");

  // 현재 슬라이드 위치인데 0은 1번째 슬라이드
  let currentSlide = 0;

  // 슬라이더 위치 업데이트 함수
  const updateSliderPosition = () => {
    // clientWidth = 내부 너비 측정
    // 슬라이드 위치를 변경할 때 위치 계산에 필요로 함!
    const slideWidth = slides[0].clientWidth;

    // scrollTo = 계산 값 만큼 스크롤 해주는 메소드
    // ex 슬라이드2로 간다면 1 * width 의 값으로 부드럽게 이동
    slider.scrollTo({
      left: slideWidth * currentSlide,
      behavior: "smooth",
    });
    updateButton();
  };

  // 버튼 숨기기 및 나타내기
  const updateButton = () => {
    if (currentSlide === 0) {
      // 첫 번째 슬라이드일 때 왼쪽 버튼 숨기기
      leftButton.style.display = "none";
      rightButton.style.display = "block";
    } else if (currentSlide === slides.length - 1) {
      // 마지막 슬라이드일 때 오른쪽 버튼 숨기기
      rightButton.style.display = "none";
      leftButton.style.display = "block";
    } else {
      // 중간 슬라이드일 때 두 버튼 모두 보이기
      leftButton.style.display = "block";
      rightButton.style.display = "block";
    }
  };

  // 좌우측 버튼 클릭 이벤트 리스너
  leftButton.addEventListener("click", () => {
    if (currentSlide > 0) {
      // 0보다 크면 1씩 빼주고 업데이트 함수 호출해서 슬라이드 위치 변경
      currentSlide--;
      updateSliderPosition();
    }
  });

  rightButton.addEventListener("click", () => {
    if (currentSlide < slides.length - 1) {
      // 슬라이드 길이보다 작으면 1씩 더해주고 업데이트 함수 호출해서 슬라이드 위치 변경
      currentSlide++;
      updateSliderPosition();
    }
  });

  // 버튼 클릭시 슬라이드 이동
  const moveButtons = document.querySelectorAll('.move-button');
  moveButtons.forEach(moveButton => {
    moveButton.addEventListener('click', (e) => {
      const clickedButton = e.target;
      const classes = clickedButton.classList;

      if (classes.contains('credit')) {
        currentSlide = 0;
      } else if (classes.contains('review')) {
        currentSlide = 1;
      } else if (classes.contains('ott')) {
        currentSlide = 2;
      } else if (classes.contains('genre')) {
        currentSlide = 3;
      }

      updateSliderPosition();
    })
  })

  // 초기 버튼 상태 업데이트
  updateButton();
});


