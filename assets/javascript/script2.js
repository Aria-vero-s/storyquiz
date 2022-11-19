const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const endButton = document.getElementById('end-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const resultsContainerElement = document.getElementById('results-container')

let currentQuestionIndex
let numCorrect = 0;

startButton.addEventListener('click', startGame)
endButton.addEventListener('click', endGame);
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function endGame() {
  console.log("Funct end game");
  endButton.classList.remove('hide')
  endButton.innerText = 'end'
  endButton.addEventListener('click', showResults);
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showResults() {
  endButton.classList.add('hide')
  questionContainerElement.innerHTML = 'You got ' + numCorrect + ' out of ' + questions.length;
  startButton.classList.remove('hide')
  startButton.innerText = 'Play again?'
  startButton.addEventListener('click',function(){location.reload()});
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  console.log("Funct reset state");
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    Array.from(answerButtonsElement.children).forEach(button => {
        button.removeEventListener('click', selectAnswer);
      }),
    endGame();
  }
  if (correct) {
    numCorrect++;
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [{
    question: 'Example question 1',
    answers: [{
        text: 'Answer 1',
        correct: true
      },
      {
        text: 'Answer 2',
        correct: false
      }
    ]
  },
  {
    question: 'Example question 2',
    answers: [{
        text: 'Answer 1',
        correct: false
      },
      {
        text: 'Answer 2',
        correct: true
      },
      {
        text: 'Answer 3',
        correct: false
      },
      {
        text: 'Answer 4',
        correct: false
      }
    ]
  },
  {
    question: 'Example question 3',
    answers: [{
        text: 'Answer 1',
        correct: false
      },
      {
        text: 'Answer 2',
        correct: true
      },
    ]
  },
  {
    question: 'Example question 4',
    answers: [{
        text: 'Answer 1',
        correct: false
      },
      {
        text: 'Answer 2',
        correct: false
      },
      {
        text: 'Answer 3',
        correct: true
      },
      {
        text: 'Answer 4',
        correct: false
      }
    ]
  }
]