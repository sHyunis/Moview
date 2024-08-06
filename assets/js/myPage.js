import { db, collection, getDocs, query, where } from "./fireBaseConfig.js";

const activity = document.querySelector('.activity');
let parentList;

async function fetchLike(userId) {
    try {
        const loginSession = sessionStorage.getItem("userLoginId");
        const likeData = await getDocs(collection(db, "like"));

        const promises = likeData.docs.map(async (item) => {
            const data = item.data();

            const q = query(
                collection(db, 'like'),
                where('movie_id', '==', data.movie_id),
                where('like', '==', true)
            );

            const querySnapshot = await getDocs(q);
            data.likeCount = querySnapshot.size;

            if (data.user_id === loginSession) {
                return data;
            }
            return null;
        })

        const results = await Promise.all(promises);
        return results.filter(data => data !== null);
    } catch (e) {
        console.error("fetchLike Error =>", e);
    }
}

async function fetchRecent() {
    const tempRecent = JSON.parse(localStorage.getItem('recentMovies'));

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

function resetTab(targetElement) {
    activity.removeChild(activity.lastChild);

    document.querySelectorAll('.selected').forEach((element) => {
        element.classList.remove('selected');
    });

    targetElement.classList.add('selected');
}

document.querySelector('.activity').addEventListener('click', async function (event) {
    const targetElement = event.target;
    if (targetElement.closest('.activity-tab')) {
        const type = targetElement.textContent.toLowerCase();

        resetTab(targetElement);
        if (type === 'recent') {
            createParentList([`${type}-list`, "common-list", `row-list`]);
        } else {
            createParentList([`${type}-list`, "common-list", `column-list`]);
        }

        fetchDataByType(type);
    }
});

async function fetchDataByType(type) {
    let data = null;
    let callback = null;

    switch (type) {
        case 'recent':
            data = await fetchRecent();
            callback = processRowData;
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


const processRowData = (results, type) => {
    results.forEach((data) => {
        renderRowList(data, type);
    })
}

const processColumnData = (results, type) => {
    results.forEach((data) => {
        renderColumnList(data, type);
    })
}


function createParentList(classList) {
    parentList = document.createElement('ul');

    classList.forEach((className) => {
        parentList.classList.add(className);
    });

    activity.appendChild(parentList);
}

function renderRowList(data, type) {
    const htmlContent = `
        <li class="${type}-container row-container">
            <div class="${type}-img row-img">
                <a href="/view/detail.html?id=${data.id}"> <img src="${data.backdrop_path}" alt="${data.title}"></a>
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

function renderColumnList(data, type) {
    let htmlContent = `
            <li class="${type} column-container">
                <div class="${type} column-img">
                    <a href="/view/detail.html?id=${data.movie_id}"><img src="https://image.tmdb.org/t/p/w500/${data.movie_img}"></a>
                </div>
                <div class="${type} column-contents">
                    <h4>${data.movie_title}</h4>
                    <p>${data.movie_over_view}</p>
                    <div class="feed-box">
                        <p>좋아요(${data.likeCount})</p>
                    </div>
                </div>
                <div class="${type} column-date">
                    <p>${handleTimeCalculate(data.movie_like_time)}</p>
                </div>
            </li>
        `

    parentList.innerHTML += htmlContent;
}


function handleTimeCalculate(time) {
    const getDate = new Date(time);
    const nowDate = new Date();

    const CalculateDate = nowDate - getDate;
    const calcSeconds = Math.floor(CalculateDate / 1000);
    const calcMinutes = Math.floor(calcSeconds / 60);
    const calcHours = Math.floor(calcMinutes / 60);
    const calcDays = Math.floor(calcHours / 24);

    if (calcSeconds < 60) {
        return '방금';
    } else if (calcMinutes < 60) {
        return `${calcMinutes}분 전`;
    } else if (calcHours < 24) {
        return `${calcHours}시간 전`;
    }
    return `${calcDays}일 전`;
}


(function () {
    const likeBox = document.querySelector('.like-box p');
    likeBox.classList.add('selected')

    createParentList([`like-list`, "common-list", `column-list`]);
    fetchDataByType('like');
})()