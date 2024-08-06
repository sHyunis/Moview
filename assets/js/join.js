import { db, collection, getDocs, addDoc } from "./fireBaseConfig.js";

const btnJoinUp = document.getElementById("join-btn");
btnJoinUp.addEventListener("click", async () => {
  const userJoinId = document.getElementById("join-id").value;
  const userJoinPw = document.getElementById("join-pw").value;

  let doc = {
    user_id: userJoinId,
    user_pw: userJoinPw
  }

  try {
    const userDb = await getDocs(collection(db, "user"));
    let userChk;

    userDb.forEach((userDoc) => {
      let userData = userDoc.data();
      if (userData.user_id === userJoinId) userChk = true;
    });

    if (!userChk) {
      await addDoc(collection(db, "user"), doc);
      alert("사용자가 성공적으로 추가되었습니다.");
      sessionStorage.setItem("loginState", "true");
      sessionStorage.setItem("loginId", "userLoginId");
      sessionStorage.setItem("userLoginId", userJoinId);
      window.location.href = '/index.html'
    } else {
      alert("중복된 아이디가 있습니다.");
    }


  } catch (e) {
    console.error('error =>', e)
  }
})

