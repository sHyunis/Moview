document.addEventListener("DOMContentLoaded", () => {
  handleLoginChk(); //로드 후 로그인 판별
});



async function handleLoginChk() {
  const session = await sessionStorage.getItem("loginState");
  const headerBtnLogin = document.getElementById("header-btn-login");
  const headerBtnMypage = document.getElementById("header-btn-mypage");
  const headerBtnLogout = document.getElementById("header-btn-logout");
  console.log(session);
  if (session === "true") {
    headerBtnLogin.style.display = "none";
    headerBtnMypage.style.display = "block";
    headerBtnLogout.style.display = "block";
  } else {
    headerBtnLogin.style.display = "block";
    headerBtnMypage.style.display = "none";
    headerBtnLogout.style.display = "none";
  }
}


