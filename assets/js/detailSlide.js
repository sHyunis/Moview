document.addEventListener("DOMContentLoaded", () => {
  const slider = document.querySelector(".slider");
  const slides = document.querySelectorAll(".slide");
  const leftButton = document.querySelector(".slide-button.left");
  const rightButton = document.querySelector(".slide-button.right");

  let currentSlide = 0;

  const updateSliderPosition = () => {
    const slideWidth = slides[0].clientWidth;

    slider.scrollTo({
      left: slideWidth * currentSlide,
      behavior: "smooth",
    });
    updateButton();
  };

  const updateButton = () => {
    if (currentSlide === 0) {
      leftButton.style.display = "none";
      rightButton.style.display = "block";
    } else if (currentSlide === slides.length - 1) {
      rightButton.style.display = "none";
      leftButton.style.display = "block";
    } else {
      leftButton.style.display = "block";
      rightButton.style.display = "block";
    }
  };

  function setCurr(index) {
    const buttons = document.querySelectorAll('.move-button');
    buttons.forEach(btn => btn.classList.remove("curr"));
    buttons[index].classList.add("curr");
  }

  leftButton.addEventListener("click", () => {
    if (currentSlide > 0) {
      currentSlide--;
      updateSliderPosition();
      setCurr(currentSlide);
    }
  });

  rightButton.addEventListener("click", () => {
    if (currentSlide < slides.length - 1) {
      currentSlide++;
      updateSliderPosition();
      setCurr(currentSlide);
    }
  });

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
});


