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
  storageBucket: "sparta-movie-project.appspot.com",
  messagingSenderId: "29347735133",
  appId: "1:29347735133:web:19ff5afb5e7e61d4644fb4"
};

// Firebase 인스턴스 초기화
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);



/*
 * [좋아요 버튼 기능 1]
 * 1. 버튼 클릭하면 세션 스토리지 값을 판별함 (로그인 여부)
 * 2. 클릭한 리스트의 타이틀을 가져옴 (api 값 중 타이틀이 있는 데이터의 값을 저장하기 위함)
 * 3. if문을 통해 로그인 여부 판별 후 getMovieLike()의 매개변수에 타이틀을 전달함
 * 4. api.js의 getMovieLike() 함수 실행
*/
document.addEventListener("DOMContentLoaded", () => {
  // 클릭할 때 DB 의 user id 값을 가져와야함 && 세션이 트루인지 확인
  // 클릭이 성공되면 DB에 like 와 Movie_id 값이 저장되어야함
  // 근데 모든 사람들의 좋아요 된 갯수를 확인하기 위해선 회원의 like 와 전체 movie의 like 를 저장해야함
  document.body.addEventListener("click", async (e) => {
    if (e.target.classList.contains("movie-like")) {
      try {
        const sessionChk = await sessionStorage.getItem("loginState");
        const getTitle = e.target.closest(".movie-card").querySelector("h3").innerText;
        // console.log(getTitle);
        if (sessionChk) {
          // api 값 중 타이틀을 비교하기위해 파라미터로 값을 전달함
          getMovieLike(getTitle);
          if (e.target.classList.contains("curr")) {
            e.target.classList.remove("curr")
            // localStorage.removeItem(getTitle);
          } else {
            e.target.classList.add("curr");
            // localStorage.setItem(getTitle, getTitle);
          }


        } else {
          alert("회원만 가능합니다.");
        }
      } catch (e) {
        console.log("좋아요 에러 =>", e);
      }
    }
  })


})


/*
 * [좋아요 버튼 기능 4]
 * 1. 세션스토리지에 저장된 회원 아이디 값을 loginId에 할당
 * 2. 매개변수로 해당 뮤비의 아이디값을 받아오고 movieId에 할당
 * 3. query 함수를 사용하여 db의 like컬렉션을 확인함
 *    - where()절을 사용하여 like의 user_id,movie_id와 현재 로그인한 loginId, 클리한 movieId 비교함
 * 4. likeQueryStart에 getDocs함수를 사용하여 쿼리를 실행, likeQuery의 where조건에 맞는 문서를 가져옴
 * 5. likeQueryStart(가져온 문서)가 비어있는지 확인함
 *    - 값이있다면, newLikeState 변수에 현재 like의 반대(true면 false)를 할당
 *      - docRef 변수에 likeDoc, 즉 like DB의 고유 id값을 할당함
 *      - 고유 id값의 like를 업데이트 해줌
 *    - 값이없다면, user_id,movie_id,like값을 전달할 newDoc객체에 저장함
 *      - 이후 새로 추가될 데이터를 db에 저장함
*/
async function handleLikeAdd(id) {
  const loginId = sessionStorage.getItem("userLoginId");
  const movieId = id;

  try {
    const likeQuery = query(
      collection(db, "like"),
      where("user_id", "==", loginId),
      where("movie_id", "==", movieId)
    );

    const likeQueryStart = await getDocs(likeQuery);

    if (!likeQueryStart.empty) {
      likeQueryStart.forEach(async (likeDoc) => {
        const likeData = likeDoc.data();
        const newLikeState = !likeData.like;

        const docRef = doc(db, "like", likeDoc.id);
        await updateDoc(docRef, { like: newLikeState });

      });
    } else {
      const newDoc = {
        user_id: loginId,
        movie_id: movieId,
        like: true
      };
      await addDoc(collection(db, "like"), newDoc);
    }
  } catch (e) {
    console.log("handleLikeAdd error =>", e);
  }
}

/*
 * [좋아요 버튼 기능 3]
 * 1. api.js의 getMovieLike 함수에서 handleLikeAdd 함수를 찾지 못하는 에러가 발생함
 * 2. 에러를 수정하기 위해 export, import 로 전달했으나 index.js에서 에러 발생..
 * 3. 고민의 결과 like.js가 module로 설정되어있어서 그런가 싶었는데 결과적으로는 hanldeLikeAdd를
 * 찾지 못하기에 함수를 전역으로 설정하는 방법을 찾음 그 방법은 아래와 같음.
 * 4. 아래의 코드를 작성하니 handleLikeAdd()를 찾지 못하는 에러가 해결됨
 * !. 하지만 좋은 방식은 아님, 시간이 가능하다면 다른 해결 방법을 찾는게 좋음
*/
window.handleLikeAdd = handleLikeAdd;

