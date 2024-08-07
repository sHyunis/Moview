import { db, collection, getDocs } from "./fireBaseConfig.js";
const btnLogin = document.getElementById("login-btn");

btnLogin.addEventListener("click", async () => {
  const userLoginId = document.getElementById("login-id").value.trim(); // value 값 저장
  const userLoginPw = document.getElementById("login-pw").value.trim();

  // db에 전달할 값 할당
  let doc = {
    user_id: userLoginId,
    user_pw: userLoginPw,
  };

  try {
    const userDb = await getDocs(collection(db, "user")); // user data 가져옴
    let idChk = false,
      pwChk = false;

    // 중복 계정 확인
    for (const userDoc of userDb.docs) {
      let userData = userDoc.data();
      if (
        userData.user_id === userLoginId &&
        userData.user_pw === userLoginPw
      ) {
        idChk = true;
        pwChk = true;
        break;
      } else if (
        userData.user_id === userLoginId &&
        userData.user_pw !== userLoginPw
      ) {
        idChk = true;
        pwChk = false;
        break;
      } else if (
        userData.user_id !== userLoginId &&
        userData.user_pw === userLoginPw
      ) {
        idChk = false;
        pwChk = true;
      }
    }
    // 사용자 추가 또는 중복 메시지 출력
    if (idChk && pwChk) {
      alert("로그인이 완료되었습니다.");
      sessionStorage.setItem("loginState", "true"); // 로그인 상태 저장
      sessionStorage.setItem("loginId", "userLoginId"); // 로그인 상태 저장
      sessionStorage.setItem("userLoginId", userLoginId); // 로그인 아이디 저장
      window.location.href = "../index.html";
    } else if (!idChk && pwChk) {
      alert("아이디를 확인해 주세요.");
    } else if (idChk && !pwChk) {
      alert("비밀번호를 확인해 주세요.");
    } else {
      alert("아이디와 비밀번호가 틀립니다.");
    }
  } catch (e) {
    console.error("error =>", e);
  }
});
