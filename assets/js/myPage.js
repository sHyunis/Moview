const activity = document.querySelector('.activity');
const activityHeader = document.querySelector('.activity-header');
let parentList;

function resetElement(targetElement) {
    activity.removeChild(activity.lastChild);

    document.querySelectorAll('.selected').forEach((element) => {
        element.classList.remove('selected');
    });

    targetElement.classList.add('selected');
}


async function dummyRatingFetch(userId) {
    // 대충 firebase 데이터 가져오는 코드 작성 (userId로 user가 작성한 평점 데이터 가져오기)
    // 대충 데이터 가공해서 반환하기
    const ratingDummy = [
        { title: "인터스텔라", backdrop_path: "/assets/img/test_img/인터스텔라.jpg", rating: 5 },
        { title: "나루토", backdrop_path: "/assets/img/test_img/나루토2.jpg", rating: 5 }
    ]
    return ratingDummy;
}


// 리뷰와 좋아요의 html 구조는 거의 유사하기 때문에
// 레뷰 데이터와 줄거리데이터(좋아요에 필요한 데이터)를 동일한 이름의 변수로 통일하면
// 좋을 것 같아요. (html 생성 함수 하나로 통합 가능)
// 혹은 html 생성하는 코드에서 처리해도 됩니다.
// review와 preview(줄거리) 데이터를 적절하게 통합해서 사용하면 좋을 것 같아요.
async function dummyReviewFetch(userId) {
    /**
     * 대충 firebase에 리뷰 데이터 가져오는 코드 작성 (userId 기반)
     * 대충 이렇게 생긴 데이터? [{userId: qwer, movieId: 1234, review: "ㅋㅋㅋㅋㅋ"}]
     * 
     * 리뷰 데이터에 있는 movieId로 영화 데이터 api요청
     * (근데 하나의 컬렉션에서 작업한다면 api 요청 필요 X)
     * 예시(영화정보도 DB에 다 때려박기)
     * [{userId: qwer, movieId: 1234, title: "하울", backdrop_path:"/assets/img/test_img/인터스텔라.jpg", review: "ㅋㅋㅋㅋㅋ"}]
     * 
     * */

    // 아래 데이터에서 title, backdrop_path는 movie_id로 api 요청해서 가져와야 합니다?
    const reviewDummy = [
        { title: "인터스텔라", backdrop_path: "/assets/img/test_img/인터스텔라.jpg", content: "ㅋㅋ 쿠퍼 레전드" },
        { title: "하울", backdrop_path: "/assets/img/test_img/하울.jpg", content: "하울 너무 멋져요" },
        { title: "나루토", backdrop_path: "/assets/img/test_img/나루토.jpg", content: "하울 너무 멋져" },
    ]

    return reviewDummy;
}

// 좋아요 더미 데이터
async function dummyLikeFetch(userId) {
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

document.querySelector('.activity').addEventListener('click', async function (event) {
    const targetElement = event.target;
    if (targetElement.closest('.rating-box')) {
        resetElement(targetElement);
        createParentList(["rating-list", "item-list"]);

        const data = await dummyRatingFetch("1234");

        processRatingData(data);

    } else if (targetElement.closest('.review-box')) {
        resetElement(targetElement);

        createParentList(["review", "common-list", "item-list"]);

        const data = await dummyReviewFetch("1234");
        processCommonData(data, "review");

    } else if (targetElement.closest('.like-box')) {
        resetElement(targetElement);

        createParentList(["like", "common-list", "item-list"]);

        const data = await dummyLikeFetch("1234");
        processCommonData(data, "like");

    }
});


function processRatingData(results) {
    results.forEach((data) => {
        renderRatingList(data);
    })
}
function processCommonData(results, type) {
    results.forEach((data) => {
        renderCommonList(data, type);
    })
}



// 반복하지 않는 부모 HTML 생성 
function createParentList(classList) {
    parentList = document.createElement('ul');

    classList.forEach((className) => {
        parentList.classList.add(className);
    });

    activity.appendChild(parentList);
}

// 부모 HTML 하위에 반복해서 HMTL 생성 (별점)
function renderRatingList(data) {
    const htmlContent = `
        <li class="rating-container">
            <div class="rating-img">
                <a href="../index.html"> <img src="${data.backdrop_path}" alt="${data.title}"></a>
            </div>
            <div class="rating-title">
                <p>${data.title}</p>
            </div>
            <div class="rating-rating">
                ★ ${data.rating}
            </div>
        </li>
    `;

    parentList.innerHTML += htmlContent;
}

// 부모 HTML 하위에 반복해서 HMTL 생성 (리뷰, 좋아요 통합)
function renderCommonList(data, type) {
    const htmlContent = `
        <li class="${type} common-container">
            <div class="${type} common-img">
                <a href="../index.html"><img src="${data.backdrop_path}"></a>
            </div>
            <div class="${type} common-contents">
                <h4>${data.title}</h4>
                <p>${data.content}</p>
                <div class="feed-box">
                    <p>좋아요(3)</p>
                    <p>댓글(323)</p>
                </div>
            </div>
            <div class="${type} common-date">
                <p>24분 전</p>
            </div>
        </li>
    `
    parentList.innerHTML += htmlContent;
}
