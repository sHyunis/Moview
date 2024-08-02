const activity = document.querySelector('.activity');
const activityHeader = document.querySelector('.activity-header');
let parentList;


/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/* * * * * * * * * * * 데이터 가져오기 (임시 더미) * * * * * * * * * * * */
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
async function fetchRating(userId) {
    const ratingDummy = [
        { title: "인터스텔라", backdrop_path: "/assets/img/test_img/인터스텔라.jpg", rating: 5 },
        { title: "나루토", backdrop_path: "/assets/img/test_img/나루토2.jpg", rating: 5 }
    ]
    return ratingDummy;
}


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
    const likeDummy = [
        { title: "인터스텔라", backdrop_path: "/assets/img/test_img/인터스텔라.jpg", content: "지구의 식량이 어쩌구 저쩌구.. 부족해져서 인류를 구원하기 위해 쿠퍼가 모험을 어쩌구 .." },
        { title: "조커", backdrop_path: "/assets/img/test_img/조커.jpg", content: "놀림 받고 흑화한 조커! 계단에서 춤춘다!" },
        { title: "나루토", backdrop_path: "/assets/img/test_img/나루토.jpg", content: "대충 닌자 나오는 내용!" },
        { title: "인터스텔라", backdrop_path: "/assets/img/test_img/인터스텔라.jpg", content: "지구의 식량이 어쩌구 저쩌구.. 부족해져서 인류를 구원하기 위해 쿠퍼가 모험을 어쩌구 .." },
        { title: "조커", backdrop_path: "/assets/img/test_img/조커.jpg", content: "놀림 받고 흑화한 조커! 계단에서 춤춘다!" },
        { title: "나루토", backdrop_path: "/assets/img/test_img/나루토.jpg", content: "대충 닌자 나오는 내용!" },
        { title: "인터스텔라", backdrop_path: "/assets/img/test_img/인터스텔라.jpg", content: "지구의 식량이 어쩌구 저쩌구.. 부족해져서 인류를 구원하기 위해 쿠퍼가 모험을 어쩌구 .." },
        { title: "조커", backdrop_path: "/assets/img/test_img/조커.jpg", content: "놀림 받고 흑화한 조커! 계단에서 춤춘다!" },
        { title: "나루토", backdrop_path: "/assets/img/test_img/나루토.jpg", content: "대충 닌자 나오는 내용!" },
    ]
    return likeDummy;
}

// 최근 본 영화 목록
async function fetchRecent() {
    const tempRecent = JSON.parse(localStorage.getItem('recentMovies'));

    // 중복 제거
    const unique = new Set();
    const recentMovies = tempRecent.filter(item => {
        const duplicate = unique.has(item.id);
        item.backdrop_path = `https://image.tmdb.org/t/p/w500${item.backdrop_path}`
        item.rating = item.vote_average;
        unique.add(item.id);
        return !duplicate;
    });

    return recentMovies;
}


/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/* * * * * * * * * * * * * 탭 전환 이벤트 처리  * * * * * * * * * * * * */
/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

// 새로 탭 누르면 이전 탭 초기화
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
 * ${type}-list: 탭에 따라 class 생성 ex) rating-list, review-list ...  (당장은 안쓰는데 혹시 모르니..)
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
// 탭 클릭시 분기 나누기
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


// 평점, 최근본
const processRowData = (results, type) => {
    results.forEach((data) => {
        renderRowList(data, type);
    })
}

// 리뷰, 좋아요
const processColumnData = (results, type) => {
    results.forEach((data) => {
        renderColumnList(data, type);
    })
}


// 부모 HTML 생성 
function createParentList(classList) {
    parentList = document.createElement('ul');

    classList.forEach((className) => {
        parentList.classList.add(className);
    });

    activity.appendChild(parentList);
}


// flex-row list 생성 (평점, 최근 본 영화 목록)
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

// flex-column list 생성 (리뷰, 좋아요)
function renderColumnList(data, type) {
    const htmlContent = `
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
    parentList.innerHTML += htmlContent;
}



(function () {
    const ratingBox = document.querySelector('.rating-box p');
    console.log(ratingBox);
    ratingBox.classList.add('selected')

    createParentList([`rating-list`, "common-list", `row-list`]);
    fetchDataByType('rating');
})()