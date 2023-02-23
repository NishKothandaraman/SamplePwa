const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
const TRIANGLE_CLASS = 'triangle'
const WINNING_COMBINATIONS = [
  [0, 1, 2],[1, 2, 3],
  [4, 5, 6],[5, 6, 7],
  [8, 9, 10],[9, 10, 11],
  [12, 13, 14],[13, 14, 15],
  [0, 4, 8],[4, 8, 12],
  [1, 5, 9],[5, 9, 13],
  [2, 6, 10],[6, 10, 14],
  [3, 7, 11],[7, 11, 15],
  [0, 5, 10],[1, 6, 11],
  [4, 9, 14],[5, 10, 15],
  [3, 6, 9],[2, 5, 8],
  [7, 10, 13],[6, 9, 12],
]
const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const winningMessageElement = document.getElementById('winningMessage')
const restartButton = document.getElementById('restartButton')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
let circleTurn
let triangleTurn
let currentClass = X_CLASS

startGame()

restartButton.addEventListener('click', startGame)

function startGame() {
  circleTurn = false
  triangleTurn = false
  cellElements.forEach(cell => {
    cell.classList.remove(X_CLASS)
    cell.classList.remove(CIRCLE_CLASS)
    cell.classList.remove(TRIANGLE_CLASS)
    cell.removeEventListener('click', handleClick)
    cell.addEventListener('click', handleClick, { once: true })
  })
  setBoardHoverClass()
  if (winningMessageElement != null) {
    winningMessageElement.classList.remove('show')
  }
}

function handleClick(e) {
  const cell = e.target
  //console.log(e)
  //const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS

  placeMark(cell, currentClass)
  if (checkWin(currentClass)) {
    endGame(false)
  } else if (isDraw()) {
    endGame(true)
  } else {
    swapTurns()
    setBoardHoverClass()
  }
}

function endGame(draw) {
  if (draw) {
    winningMessageTextElement.innerText = 'Draw!'
  } else {
    winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`
    circleTurn = false
    triangleTurn = false
  }
  winningMessageElement.classList.add('show')
}

function isDraw() {
  return [...cellElements].every(cell => {
    return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
  })
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass)
  //console.log(cell)
  //console.log(cellElements)
  //aiTurn()
}

// function aiTurn() {
//     cellElements[0].classList.add(CIRCLE_CLASS)
// }

function swapTurns() {
  //circleTurn = !circleTurn
  if (circleTurn == false) {
    circleTurn = true
    currentClass = CIRCLE_CLASS
  }
  else if (triangleTurn == false) {
    triangleTurn = true
    currentClass = TRIANGLE_CLASS
  }
  else {
    circleTurn = false
    triangleTurn = false
    currentClass = X_CLASS
  }
}

function setBoardHoverClass() {
  if (board != null) {
    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCLE_CLASS)
    board.classList.remove(TRIANGLE_CLASS)
  }
  if (circleTurn && !triangleTurn) {
    board.classList.add(CIRCLE_CLASS)
  } else if (triangleTurn) {
    board.classList.add(TRIANGLE_CLASS)
  } else {
    if (board != null) {
      board.classList.add(X_CLASS)
    }
  }
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return cellElements[index].classList.contains(currentClass)
    })
  })
}