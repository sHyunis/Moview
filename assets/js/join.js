// Firebase SDK 라이브러리 가져오기
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import {
  collection,
  addDoc,
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { getDocs } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC3OuNZBprr2iRYKTB6C83s4ciXXOTDROA",
  authDomain: "sparta-movie-project.firebaseapp.com",
  projectId: "sparta-movie-project",
  storageBucket: "sparta-movie-project.appspot.com",
  messagingSenderId: "29347735133",
  appId: "1:29347735133:web:19ff5afb5e7e61d4644fb4"
};

// Firebase 인스턴스 초기화
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const btnJoinUp = document.getElementById("join-btn");


btnJoinUp.addEventListener("click", async () => {
  const userJoinId = document.getElementById("join-id").value; // value 값 저장
  const userJoinPw = document.getElementById("join-pw").value;

  // db에 전달할 값 할당
  let doc = {
    user_id: userJoinId,
    user_pw: userJoinPw
  }

  try {
    const userDb = await getDocs(collection(db, "user")); // user data 가져옴
    let userChk; // 중복 계정 있는지 확인용

    // 중복 계정 확인
    userDb.forEach((userDoc) => {
      let userData = userDoc.data();
      if (userData.user_id === userJoinId) userChk = true; // 중복 계정 없을 경우 true 할당
    });

    // 사용자 추가 또는 중복 메시지 출력
    if (!userChk) {
      await addDoc(collection(db, "user"), doc);
      alert("사용자가 성공적으로 추가되었습니다.");
    } else {
      alert("중복된 아이디가 있습니다.");
    }


  } catch (e) {
    console.log('error =>', e)
  }
})

