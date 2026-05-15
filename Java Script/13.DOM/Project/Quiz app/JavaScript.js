const quizData = [
  {
    question: 'What does DOM stand for?',
    options: [
      'Document Order Model',
      'Document Object Model',
      'Data Object Method',
      'Direct Object Management',
    ],
    correct: 1,
  },
  {
    question: 'Which method selects by ID?',
    options: [
      'getElementById()',
      'querySelectorAll()',
      'getElement()',
      'getElementsByClassName()',
    ],
    correct: 0,
  },
  {
    question: 'Which event fires on input change?',
    options: ['click', 'submit', 'change', 'keydown'],
    correct: 2,
  },
];

//let question = [...quizData].sort(() => Math.random() - 0.5);

const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const nextBtn = document.getElementById('next-btn');
const timerEl = document.getElementById('timer');
const resultEl = document.getElementById('result');

let num = 0;
let num1 = 0;
let score = 0;

let timer;
let timeLeft;

function quiz() {
  let questions = [...quizData][num1];
  num1++;
  console.log(num1);
  questionEl.textContent = `Q${num + 1} ${questions.question}`;
  optionsEl.innerHTML = '';
  questions.options.forEach((op, index) => {
    const createBtn = document.createElement('button');
    createBtn.classList.add('op-btn');
    createBtn.textContent = `${index + 1}. ${op}`;
    optionsEl.appendChild(createBtn);

    createBtn.addEventListener('click', () => selectAnswer(index, true));
  });

  nextBtn.style.display = 'none';

  function selectAnswer(index, autoSel) {
    clearInterval(timer);
    const allBtn = document.querySelectorAll('.op-btn');
    allBtn.forEach(bt => (bt.disabled = true));

    if (index === questions.correct) {
      allBtn[index].classList.add('correct');
      if (autoSel) {
        score++;
      }
    } else {
      allBtn[index].classList.add('wrong');
      allBtn[questions.correct].classList.add('correct');
    }
    nextBtn.style.display = 'inline-block';
  }
  //
  clearInterval(timer);
  timeLeft = 15;
  displayTimer();
  timer = setInterval(function countdown() {
    timeLeft--;
    displayTimer();
    if (timeLeft === 0) {
      clearInterval(timer);
      selectAnswer(questions.correct, false);
    }
  }, 1000);
  function displayTimer() {
    timerEl.innerHTML = `⌚${timeLeft}`;
  }
}
quiz();

nextBtn.onclick = () => {
  num++;
  if (num < quizData.length) {
    quiz();
  } else {
    showResult();
  }
};
function showResult() {
  nextBtn.style.display = 'none';
  let highScore = localStorage.getItem('high') || 0;
  let isNew = score > highScore;
  if (isNew) {
    localStorage.setItem('high', score);
  }
  resultEl.innerHTML = `
  <h2>Hey The game is Over</h2>
  <p>Your Score ${score} out of ${quizData.length}</p>
  <p>High Score is ${Math.max(score, highScore)}</p>
  <button onclick='location.reload()'>Restart</button>
  `;
}
