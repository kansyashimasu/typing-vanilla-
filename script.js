const url = "https://official-joke-api.appspot.com/jokes/random/";
const typeDisplay = document.getElementById("typeDisplay");
const typeInput = document.getElementById("typeInput");
const timer = document.getElementById("timer");
const typingSound = new Audio("./audio/typing.mp3");
const incorrectSound = new Audio("./audio/incorrect.mp3");
const correctSound = new Audio("./audio/correct.mp3");

// テキスト情報を合否
typeInput.addEventListener("input", () => {
  typingSound.play();
  typingSound.currentTime = 0;
  const sentenceArray = typeDisplay.querySelectorAll("span"); //問題集
  const arrayValue = typeInput.value.split(""); //typingWord
  let correct = true;
  sentenceArray.forEach((characterSpan, index) => {
    if (arrayValue[index] == null) {
      //入力していないとき
      characterSpan.classList.remove("correct");
      characterSpan.classList.remove("incorrect");
      correct = false;
    } else if (characterSpan.innerText == arrayValue[index]) {
      characterSpan.classList.add("correct");
      characterSpan.classList.remove("incorrect");
    } else {
      //合っていないとき
      characterSpan.classList.add("incorrect");
      characterSpan.classList.remove("correct");
      incorrectSound.play();
      incorrectSound.currentTime = 0;
      typingSound.volume = 0.1;
      correct == false;
    }
  });
  if (correct == true) {
    sentence();
    correctSound.play();
    correctSound.currentTime = 0;
    correctSound.volume = 1;
  }
});

function fetchData() {
  const random = Math.floor(Math.random() * 77);
  return fetch(url)
    .then((res) => res.json())
    .then((data) => data.punchline);
}

// 画面に表示させる
async function sentence() {
  const sentence = await fetchData();
  typeDisplay.innerText = "";
  //   文章一文字ずつのspanタグを挿入させる
  let oneText = sentence.split("");
  console.log(oneText);
  oneText.forEach((character) => {
    const characterSpan = document.createElement("span");
    characterSpan.innerText = character;
    typeDisplay.appendChild(characterSpan);
  });
  // テキストボックスの中身を消す
  typeInput.value = "";
  startTimer();
}

let startTime = 0;
let time = 60;
function startTimer() {
  timer.innerText = time;
  startTime = new Date();
  //   console.log(startTime);
  setInterval(() => {
    timer.innerText = time - getTimeTimer();
    if (timer.innerText == 0) {
      timeUp();
    }
  }, 1000);
}

function timeUp() {
  sentence();
}

function getTimeTimer() {
  return Math.floor((new Date() - startTime) / 1000);
}

sentence();
