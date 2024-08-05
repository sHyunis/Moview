document.addEventListener("DOMContentLoaded", () => {
  handleLoginChk(); //로드 후 로그인 판별
});



async function handleLoginChk() {
  const session = await sessionStorage.getItem("loginState");
  const headerBtnLogin = document.getElementById("header-btn-login");
  const headerBtnMypage = document.getElementById("header-btn-mypage");
  const headerBtnLogout = document.getElementById("header-btn-logout");
  const headerBtnSignup = document.getElementById("header-btn-signup");
  console.log(session);
  if (session === "true") {
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
  await sessionStorage.removeItem("loginState");
  alert("로그아웃 되었습니다.");
  window.location.href = "/";
})