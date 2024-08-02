const hamburgerMenu = document.getElementById("hamburger-menu");

document.getElementById("menu-button").addEventListener("click", () => {
  if (hamburgerMenu.classList.contains("hamburger-menu-open")) {
    hamburgerMenu.classList.remove("hamburger-menu-open");
  } else {
    hamburgerMenu.classList.add("hamburger-menu-open");
  }
});

document.getElementById("menu-close-button").addEventListener("click", () => {
  if (hamburgerMenu.classList.contains("hamburger-menu-open")) {
    hamburgerMenu.classList.remove("hamburger-menu-open");
  } else {
    hamburgerMenu.classList.add("hamburger-menu-open");
  }
});
