document.addEventListener("DOMContentLoaded", () => {
  handleLoginChk(); //로드 후 로그인 판별
});



async function handleLoginChk() {
  const session = sessionStorage.getItem("loginState") === "true";
  const headerBtnLogin = document.getElementById("header-btn-login");
  const headerBtnMypage = document.getElementById("header-btn-mypage");
  const headerBtnLogout = document.getElementById("header-btn-logout");
  const headerBtnSignup = document.getElementById("header-btn-signup");
  if (session) {
    headerBtnLogin.style.display = "none";
    headerBtnSignup.style.display = "none";
    headerBtnMypage.style.display = "block";
    headerBtnLogout.style.display = "block";
  } else {
    headerBtnLogin.style.display = "block";
    headerBtnSignup.style.display = "block";
    headerBtnMypage.style.display = "none";
    headerBtnLogout.style.display = "none";
  }
}



const btnLogout = document.getElementById("header-btn-logout");
btnLogout.addEventListener("click", async () => {
  sessionStorage.removeItem("loginState");
  sessionStorage.removeItem("userLoginId");
  alert("로그아웃 되었습니다.");
  window.location.href = "/";
})