const upBtn = document.querySelector('#upBtn');



upBtn.addEventListener('click', () => {
    const userId = document.querySelector('#idInput').value;
    const userPw = document.querySelector('#pwInput').value;

    console.log(userId);
    console.log(userPw);

    if (checkSignInValidate()) {
        sessionStorage.setItem("userId", userId);
        sessionStorage.setItem("userPw", userPw);
    } else {
        alert('아이디 비번 입력');
    }
})


console.log(sessionStorage);

// 회원가입 유효성
function checkSignUpValidate() {
    return true;

}