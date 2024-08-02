const hamburgerMenu = document.getElementById("hamburger-menu");

document.getElementById("menu-button").addEventListener("click", () => {
  if (getComputedStyle(hamburgerMenu).display === "none") {
    hamburgerMenu.style.display = "block";
  }
});

document.getElementById("menu-close-button").addEventListener("click", () => {
  if (getComputedStyle(hamburgerMenu).display === "block") {
    hamburgerMenu.style.display = "none";
  }
});
