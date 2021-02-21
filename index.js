console.log("hello, vanilla.");
/*
사용자가 엔터키를 클릭 했을때, 2단계에서 생성한 숫자와 사용자의 입력값 비교하기

각 자리 별로 비교하고, 같은 자리에 같은 숫자가 몇개 있는지 판별합니다. (스트라이크 갯수)
각 자리 별로 비교하고, 다른 자리에 같은 숫자가 몇개 있는지 판별합니다. (볼 갯수)

화면에 스트라이크와 볼의 갯수를 표기합니다.
사용자가 10회까지 시도할 수 있도록 제한합니다.
게임 재시작 버튼을 만들고, 재시작 할 수 있도록 합니다.*/
const playBtn = document.querySelector(".playbutton");
const userInput = document.getElementById("userchoice");
const countBox = document.querySelector(".count-box");
const inputBox = document.querySelector(".input-box");
const showResult = document.querySelector("h3");

function defenceNumber() {
    const numberList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const selectedNum = [];
    for (let i = 0; i < 4; i++) {
        const number = Math.floor((Math.random() * numberList.length));
        selectedNum[i] = numberList.splice(number, 1)[0]
    }
    return selectedNum;
}

let count = 0;

function checkNumber(event) {
    event.preventDefault();
    const answerNumber = localStorage.getItem("AnswerNumber");
    const answerNumberList = answerNumber.split(",");

    let userNumber = userInput.value;
    let userNumberList = userNumber.split("");
    inputBox.textContent = `input: ${userNumber}`

    if (userNumber.length < 4 || userNumber.length >= 5) {
        alert("4자리 숫자를 입력하세요");
    }
    count++;
    countBox.textContent = `chance count : ${10 - count} times left`
    let strike = 0;
    let ball = 0;

    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (answerNumberList[i] == userNumberList[j]) {
                if (i === j) {
                    strike++;
                } else {
                    ball++;
                }
            }
        }
    }
    if (count >= 10) {
        countBox.textContent = `chance count : ${0} times left. You lose.`
    }
    else if (strike === 4) {
        showResult.innerText = "Home Run!!"
    }
    else {
        showResult.innerText = `${strike} Strike, ${ball} Ball`
    }

}

function init() {
    const answerNumberList = defenceNumber();

    localStorage.setItem("AnswerNumber", answerNumberList);
    playBtn.addEventListener("click", checkNumber);
}
init();