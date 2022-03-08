let content = document.querySelector(".content");
let questionsCount = document.querySelector(".questions-count");
let questionTitle = document.querySelector(".question-title");
let answersContainer = document.querySelector(".questions-answers-container");
let quizBottom = document.querySelector(".quiz-bottom");
let bulletsContainer = document.querySelector(".bullets-container");
let submitBtn = document.getElementById("submit-answer");
let timerContainer = document.querySelector(".timer");
let timer;
let quiz = {
  ques1: {
    title: "Why We use the &lt;br&gt; Element",
    rightAnswer: "to add break line",
    answers: {
      "answer-1": "to make text bold",
      "answer-2": "to add space",
      "answer-3": "to change the color",
      "answer-4": "to add break line",
    },
  },
  ques2: {
    title: "Why We use the &lt;div&gt; Element",
    rightAnswer: "to device the container",
    answers: {
      "answer-1": "to make text bold",
      "answer-2": "to add space",
      "answer-3": "to device the container",
      "answer-4": "to add break line",
    },
  },
  ques3: {
    title: "Why We use the &lt;ul&gt; Element",
    rightAnswer: "to make a list",
    answers: {
      "answer-1": "to make text bold",
      "answer-2": "to make a list",
      "answer-3": "to device the container",
      "answer-4": "to add break line",
    },
  },
  ques4: {
    title: "Why We use the &lt;a&gt; Element",
    rightAnswer: "to make a anchor",
    answers: {
      "answer-1": "to make a anchor",
      "answer-2": "to make a list",
      "answer-3": "to device the container",
      "answer-4": "to add break line",
    },
  },
};
function shuffel(Array) {
  for (let i = Array.length; i > 0; ) {
    i--;
    let temp = Array[i],
      randomIndex = Math.trunc(Math.random() * i);
    Array[i] = Array[randomIndex];
    Array[randomIndex] = temp;
  }
}
let current = 0;
let rightAnswerCount = 0;
let quesArray = Object.keys(quiz);
let ranndomQuesArray = [...Array(quesArray.length).keys()];
shuffel(ranndomQuesArray);
let randomQues = quesArray[ranndomQuesArray[current]];
let ques = quiz[randomQues];

let answersArray = Object.keys(ques.answers);
console.log(answersArray);
let ranndomAnwersArray = [...Array(answersArray.length).keys()];
shuffel(ranndomAnwersArray);

addQuesToPage();
function addQuesToPage() {
  questionsCount.innerHTML = quesArray.length;
  questionTitle.innerHTML = ques.title;

  for (let i = 0; i < answersArray.length; i++) {
    let answer = ques.answers[answersArray[ranndomAnwersArray[i]]];
    let div = document.createElement("div");
    let input = document.createElement("input");
    let label = document.createElement("label");
    div.className = "question-answer-container";
    input.type = "radio";
    input.name = "answer";
    input.id = `anwer-${i + 1}`;
    input.setAttribute("data-answer", answer);
    input.appendChild(document.createTextNode(answer));
    label.setAttribute("for", `anwer-${i + 1}`);
    label.appendChild(document.createTextNode(answer));
    div.appendChild(input);
    div.appendChild(label);
    answersContainer.appendChild(div);
  }
}
answersArray.forEach((e) => {
  let bullet = document.createElement("li");
  bullet.className = "bullet";
  bulletsContainer.appendChild(bullet);
});
function activeBullet() {
  let bullets = Array.from(
    document.querySelectorAll(".bullets-container .bullet")
  );

  bullets[current].classList.add("bullet", "active");
}
activeBullet();

submitBtn.addEventListener("click", function () {
  clearInterval(timer);
  let rightAnswer = ques.rightAnswer;
  current++;
  checkAnswer(rightAnswer, answersArray.length);
  questionTitle.innerHTML = "";
  answersContainer.innerHTML = "";
  if (current < answersArray.length) {
    randomQues = quesArray[ranndomQuesArray[current]];
    ques = quiz[randomQues];
    addQuesToPage();
    activeBullet();
    quesTime();
  } else {
    questionTitle.remove();
    submitBtn.remove();
    answersContainer.remove();
    quizBottom.remove();
    showResult();
  }
});
function checkAnswer(rAnswer, count) {
  let chocenAnswer;
  let allAnswers = [...document.getElementsByName("answer")];
  allAnswers.forEach((e) => {
    if (e.checked) {
      chocenAnswer = e.dataset.answer;
    }
  });
  if (rAnswer === chocenAnswer) {
    rightAnswerCount++;
    console.log(rightAnswerCount);
  }
}
function showResult() {
  let result = document.createElement("div");
  let degree = document.createElement("span");
  let answerRight = document.createElement("span");
  let wrongAnswer = document.createElement("span");
  if (
    rightAnswerCount > answersArray.length / 2 &&
    rightAnswerCount < answersArray.length
  ) {
    degree.appendChild(document.createTextNode("good"));
    degree.className = "good";
  } else if (rightAnswerCount === answersArray.length) {
    degree.appendChild(document.createTextNode("perfect"));
    degree.className = "perfect";
  } else {
    degree.appendChild(document.createTextNode("bad"));
    degree.className = "bad";
  }

  answerRight.appendChild(
    document.createTextNode(`Right Answer: ${rightAnswerCount}`)
  );
  wrongAnswer.appendChild(
    document.createTextNode(
      `Wrong Answer: ${answersArray.length - rightAnswerCount}`
    )
  );
  result.className = "result";
  result.appendChild(degree);
  result.appendChild(answerRight);
  result.appendChild(wrongAnswer);
  content.appendChild(result);
}
quesTime();
function quesTime() {
  let duration = 5;
  timer = setInterval(function () {
    let minute = Math.trunc(duration / 60);
    let secound = Math.trunc(duration % 60);
    minute = minute < 10 ? `0${minute}` : minute;
    secound = secound < 10 ? `0${secound}` : secound;
    timerContainer.innerHTML = `${minute}:${secound}`;
    duration--;
    if (duration < 0) {
      clearInterval(timer);
      submitBtn.click();
    }
  }, 1000);
}
