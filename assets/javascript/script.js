const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const endButton = document.getElementById('end-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const resultContainerElement = document.getElementById('result-container')

let currentQuestionIndex

startButton.addEventListener('click', startGame)
endButton.addEventListener('click', endGame)
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
  counter = 0;
  while(counter<4) {
    counter++}
  endGame()
}

function endGame() {
  endButton.classList.add('hide')
  counter = resetState;
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showResults() {
  resultContainerElement.classList.remove('hide')
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
    startButton.innerText = 'Start'
    startButton.classList.remove('hide')
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

const questions = [
  {
    question: 'Which animals are in the story?',
    answers: [
      { text: 'A fox and a crow', correct: true },
      { text: 'A dog and a cat', correct: false }
    ]
  },
  {
    question: 'What kind of food does the crow have at the beginning?',
    answers: [
      { text: 'fruit', correct: false },
      { text: 'cheese', correct: true },
      { text: 'bread', correct: false },
      { text: 'pizza', correct: false }
    ]
  },
  {
    question: 'Who gets the cheese in the end?',
    answers: [
      { text: 'the crow', correct: false },
      { text: 'the fox', correct: true },
    ]
  },
  {
    question: 'What is the theme of the moral of the story?',
    answers: [
      { text: 'money', correct: false },
      { text: 'beauty', correct: false },
      { text: 'flattery', correct: true },
      { text: 'happiness', correct: false }
    ]
  }
]