import { db, collection, getDocs } from "./fireBaseConfig.js";

const activity = document.querySelector('.activity');
const activityHeader = document.querySelector('.activity-header');
let parentList;


/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/* * * * * * * * * * * 데이터 가져오기 (임시 더미) * * * * * * * * * * * */
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/**
 * fetch.... 로 되어 있는 함수에서 데이터 불러와서 넘겨주면 됩니다. 
 * 일단은 레이아웃 테스트 용도로 더미 데이터를 넣어놓았고, 편하신대로 수정, 삭제 하셔도 괜찮습니다.
 * 
 */

// 별점 더미데이터
async function fetchRating(userId) {
    const ratingDummy = [
        { title: "인터스텔라", backdrop_path: "/assets/img/test_img/인터스텔라.jpg", rating: 5 },
        { title: "나루토", backdrop_path: "/assets/img/test_img/나루토2.jpg", rating: 5 }
    ]
    return ratingDummy;
}

// 리뷰 더미데이터
async function fetchReview(userId) {
    const reviewDummy = [
        { title: "인터스텔라", backdrop_path: "/assets/img/test_img/인터스텔라.jpg", content: "ㅋㅋ 쿠퍼 레전드" },
        { title: "하울", backdrop_path: "/assets/img/test_img/하울.jpg", content: "하울 너무 멋져요" },
        { title: "나루토", backdrop_path: "/assets/img/test_img/나루토.jpg", content: "하울 너무 멋져" },
    ]

    return reviewDummy;
}

// 좋아요 더미 데이터
async function fetchLike(userId) {
    let likeDataArr = [];
    try {
        const loginSession = sessionStorage.getItem("userLoginId");
        const likeData = await getDocs(collection(db, "like"));

        likeData.forEach(item => {
            const data = item.data();
            if (data.user_id === loginSession) {
                likeDataArr.push(data);
            }
        })
        console.log(likeDataArr);
    } catch (e) {
        console.log("fetchLike Error =>", e);
    }

    return likeDataArr;
}

// 최근 본 영화 목록 (localStorage 실제 데이터)
async function fetchRecent() {
    const tempRecent = JSON.parse(localStorage.getItem('recentMovies'));

    // 중복 제거
    const unique = new Set();
    const recentMovies = tempRecent.filter(item => {
        const duplicate = unique.has(item.id);
        item.backdrop_path = `https://image.tmdb.org/t/p/original${item.backdrop_path}`
        item.rating = item.vote_average;
        unique.add(item.id);
        return !duplicate;
    });

    return recentMovies;
}


/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/* * * * * * * * * * * * * 탭 전환 이벤트 처리  * * * * * * * * * * * * */
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

// 탭 클릭하면 색상 변경 (`.selected`)
function resetTab(targetElement) {
    activity.removeChild(activity.lastChild);

    document.querySelectorAll('.selected').forEach((element) => {
        element.classList.remove('selected');
    });

    targetElement.classList.add('selected');
}


/**
 * (탭 전환 이벤트)
 * class 생성 규칙
 * ${type}-list: 탭에 따라 class 생성 ex) rating-list, review-list ...  (당장은 안쓰는데 구분 용도로 혹시 모르니 넣었습니다.)
 * common-list: 모든 탭에 공통으로 적용되는 css 클래스
 * row-list: 평점, 최근 본목록은 flex-row 레이아웃
 * column-list: 리뷰, 좋아요는 flex-column 레이아웃
 */
document.querySelector('.activity').addEventListener('click', async function (event) {
    const targetElement = event.target;
    if (targetElement.closest('.activity-tab')) {
        const type = targetElement.textContent.toLowerCase(); // Rating, Review, Like, Recent

        resetTab(targetElement);
        if (type === 'rating' || 'recent') {
            createParentList([`${type}-list`, "common-list", `row-list`]);
        } else {
            createParentList([`${type}-list`, "common-list", `column-list`]);
        }

        fetchDataByType(type);
    }
});

/**
 * (탭 클릭시 분기 나누기)
 * 클릭한 탭에 따라 (rating, review.. 등) fetch함수와 다음 작업 함수(callback)을 지정해주게 됩니다.
 */
async function fetchDataByType(type) {
    let data = null;
    let callback = null;

    switch (type) {
        case 'rating':
            data = await fetchRating();
            callback = processRowData;
            break;
        case 'recent':
            data = await fetchRecent();
            callback = processRowData;
            break;
        case 'review':
            data = await fetchReview();
            callback = processColumnData;
            break;
        case 'like':
            data = await fetchLike();
            callback = processColumnData;
            break;
        default:
            throw new Error('이상한 타입');
    }

    callback(data, type);
}


/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/* * * * * * * * * * * * * * *  HTML 생성  * * * * * * * * * * * * * * */
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */


// 평점, 최근 본 영화 목록 HTML 생성
const processRowData = (results, type) => {
    results.forEach((data) => {
        renderRowList(data, type);
    })
}

// 리뷰, 좋아요 목록 HTML 생성
const processColumnData = (results, type) => {
    results.forEach((data) => {
        renderColumnList(data, type);
    })
}


// 부모 HTML 생성 (공통)
function createParentList(classList) {
    parentList = document.createElement('ul');

    classList.forEach((className) => {
        parentList.classList.add(className);
    });

    activity.appendChild(parentList);
}


/** 
 * 평점, 최근 본 영화 목록 생성 (flex-row)
 * 데이터 가공할때 평점, vote_average를 rating이나 그 외 편하신걸로 통일해주시면 될 것 같습니다. (다른 방식도 좋아요.)
 * 
*/
function renderRowList(data, type) {
    const htmlContent = `
        <li class="${type}-container row-container">
            <div class="${type}-img row-img">
                <a href="../index.html"> <img src="${data.backdrop_path}" alt="${data.title}"></a>
            </div>
            <div class="${type}-title row-title">
                <p>${data.title}</p>
            </div>
            <div class="${type}-rating row-rating">
                ★ ${data.rating}
            </div>
        </li>
    `;

    parentList.innerHTML += htmlContent;
}

/**
 * 리뷰, 좋아요 생성 (flex-column) 
 * 데이터 가공할 때 리뷰나, 줄거리 등을 content로 통일해주면 될 것 같습니다. (다른 방식도 좋아요.)
*/
function renderColumnList(data, type) {
    let htmlContent;
    if (type === "like") {
        htmlContent = `
            <li class="${type} column-container">
                <div class="${type} column-img">
                    <a href="../index.html"><img src="https://image.tmdb.org/t/p/w500/${data.movie_img}"></a>
                </div>
                <div class="${type} column-contents">
                    <h4>${data.movie_title}</h4>
                    <p>${data.movie_over_view}</p>
                    <div class="feed-box">
                        <p>좋아요(3)</p>
                        <p>댓글(323)</p>
                    </div>
                </div>
                <div class="${type} column-date">
                    <p>24분 전</p>
                </div>
            </li>
        `
    } else {
        htmlContent = `
            <li class="${type} column-container">
                <div class="${type} column-img">
                    <a href="../index.html"><img src="${data.backdrop_path}"></a>
                </div>
                <div class="${type} column-contents">
                    <h4>${data.title}</h4>
                    <p>${data.content}</p>
                    <div class="feed-box">
                        <p>좋아요(3)</p>
                        <p>댓글(323)</p>
                    </div>
                </div>
                <div class="${type} column-date">
                    <p>24분 전</p>
                </div>
            </li>
        `
    }

    parentList.innerHTML += htmlContent;
}



(function () {
    const ratingBox = document.querySelector('.rating-box p');
    console.log(ratingBox);
    ratingBox.classList.add('selected')

    createParentList([`rating-list`, "common-list", `row-list`]);
    fetchDataByType('rating');
})()