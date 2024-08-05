// Firebase SDK 라이브러리 가져오기
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  updateDoc,
  doc
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC3OuNZBprr2iRYKTB6C83s4ciXXOTDROA",
  authDomain: "sparta-movie-project.firebaseapp.com",
  projectId: "sparta-movie-project",
  storageBucket: "sparta-movie-project",
  messagingSenderId: "29347735133",
  appId: "1:29347735133:web:19ff5afb5e7e61d4644fb4"
};

// Firebase 인스턴스 초기화
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

//별점 및 마지막으로 선택된 점수에 대한 변수를 선언!
const allStars = document.querySelectorAll('.star');
let lastClickedIndex = null;


//로그인 인증 하고나서 로그인 아이디와 영화 아이디 담아줌 
//아무래도 clickStars 함수에 뿌려줘야 할듯
document.addEventListener("DOMContentLoaded", () => {
    if(sessionStorage.getItem("loginState") === "true"){
        console.log("로그인 인증 완료");
        const loginId = sessionStorage.getItem("userLoginId");
        const params = new URLSearchParams(window.location.search);
        const movieId = params.get("id");
        initializeStars(loginId, movieId);
    } else{
        console.log("로그인 인증 실패");
    }
});


// 파이어 베이스에 점수 저장
// 테이블 및 컬럼 생성하고 쿼리문 작성해서 변수에 담음
// 테이블 있으면 업데이트 해줌 ( 민규님꺼 참조 )
async function saveScore(loginId, movieId, score) {
    try {
        const userRef = collection(db, 'userScores');
        const scoreQuery = query(userRef, where('loginId', '==', loginId), where('movieId', '==', movieId));
        const scoreQuerySnapshot = await getDocs(scoreQuery);

        if (!scoreQuerySnapshot.empty) {
            const docId = scoreQuerySnapshot.docs[0].id;
            const docRef = doc(db, 'userScores', docId);
            await updateDoc(docRef, { score });
        } else {
            await addDoc(collection(db, 'userScores'), {
                loginId,
                movieId,
                score
            });
        }
        console.log("스코어 저장 완료!");
    } catch (e) {
        console.error("데이터 베이스 저장 오류: ", e);
    }
}
/* 
    // 별 클릭 처리 함수

    현재 스코어 변수 선언
    스코어 변수 선언

    if문으로 마지막 선택된 스코어와 인덱스 번호가 같은지 확인
    같으면 초기화 함수 호출 및 마지막으로 클릭된 인덱스 초기화

    else문으로 현재 스코어에 대한 업데이트 함수 호출
    스코어 변수 인덱스에 맞게 업데이트
    전역 변수인 마지막으로 클릭된 변수 업데이트

*/

async function clickStars(loginId, movieId, index){
    console.log("무비아디 =>",movieId)
    console.log("로긴아디 =>",loginId)

    let currentStar = index + 1; 
    let score = null;

    if(lastClickedIndex === index){
        resetStars();
        lastClickedIndex = null;
        console.log("점수 결과=>", score);
    }else{
        showStars(currentStar);
        score = index + 1;
        lastClickedIndex = index;
        console.log("점수 결과=>", score);
    }
    if (loginId && movieId !== null) {
        await saveScore(loginId, movieId, score);
    }
}



/* 
    // 별 마우스 오버 처리 함수 및 별 상태 업데이트 함수

    forEach문으로 모든 star 클래스에 적용시킨 뒤
    마우스 커서가 올라간 별이 인덱스보다 크다면 별을 채우고
    아니라면 빈 별을 채움 (둘다 채우는거임)


*/

function showStars(score){
    allStars.forEach((star,i)=>{
        if(score> i){
            star.innerHTML = '&#9733';
        }else{
            star.innerHTML = '&#9734';
        }
    })
}


/*
    // 별 마우스 아웃 처리 함수

    마지막으로 클릭된 인덱스가 null 아닌게 참이면 마지막 인덱스 + 1한 값을
    showStars로 보내줌 (인덱스는 0부터 시작하니까) 아니라면 0을 보내줌 

    한 줄 요약 : 마지막으로 점수를 가져와서 1을 더하고 별 상태 업데이트 함수에 넣고 호출해준거임 

*/

function starMouseOut(){
    showStars(lastClickedIndex !== null ? lastClickedIndex + 1 : 0);
}


/*
    별 초기화 함수      

    star 클래스의 모든 요소에 forEach 문을 사용하여 빈 별을 채워줌
    이건 어떤 조건은 필요 없음 호출 하면 바로 리셋임 그래서
    호출하는 함수 내부에서 조건문을 충족 시켜준 뒤 호출하는게 좋음
*/

function resetStars(){
    allStars.forEach((star)=>{
        star.innerHTML = "&#9734";
    })
}

/* 
    별점 기능 초기화 함수

    이 함수가 호출되면 모든 star요소에 forEach문으로 
    clickStars함수와
    showStars함수와
    starMouseOut 함수를 호출하여


*/
function initializeStars(loginId, movieId){
    allStars.forEach((star, i)=>{
        star.onclick = () => clickStars(loginId, movieId, i);
        star.onmouseover = () => showStars(i+1);
        star.onmouseout = starMouseOut();
    })
}