let recentMovies = JSON.parse(localStorage.getItem('recentMovies'));

// 즉시실행함수
(function () {
    const recentList = document.querySelector('.recent-list');
    recentMovies = removeDuplicates(recentMovies);

    let recentContent = ``;

    recentMovies.forEach(data => {
        const packdrop_path = `https://image.tmdb.org/t/p/w500/${data.backdrop_path}`
        recentContent += `
        <li class="recent-container">
            <div class="recent-img">
                <a href="../index.html"> <img src="${packdrop_path}" alt="${data.title}"></a>
            </div>
            <div class="recent-title">
                <p>${data.title}</p>
            </div>
            <div class="recent-rating">
                ★ ${data.vote_average}
            </div>
        </li>
    `;
    });

    recentList.innerHTML += recentContent;
})()


// 최근 본 중복 제거
function removeDuplicates(arr) {
    const unique = new Set();
    return arr.filter(item => {
        const duplicate = unique.has(item.id);
        unique.add(item.id);
        return !duplicate;
    });
}