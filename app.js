Board = require('./board')

const randomInt = (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min
}

let rows = 3
let columns = 3
let bombs = 4
board = new Board(rows, columns, bombs)
board.print()

while(board.bombsFound() < 1 && board.safeSquares() > 0) {
  let guessRow = randomInt(0, rows)
  let guessColumn = randomInt(0, columns)
  board.flipTile(guessRow, guessColumn)
  console.log("Current board: ")
  board.print()
}

if (board.bombsFound() < 1) {
  console.log("Congratulations. You've won!")
} else {
  console.log("You've lost. There's always next time.")
}

/*
let bombsFound = merged.filter(square => square === 'B')
let safeSquares = merged.filter(square => square === ' ').length - 4
console.log(`There are ${safeSquares} covered squares`)

while (bombsFound.length < 1 && safeSquares > 0){
  let guessRow = randomInt(0, 3)
  let guessColumn = randomInt(0, 3)
  console.log(`Guessing ${guessRow}, ${guessColumn}`)
  board.flipTile(guessRow, guessColumn)
  merged = board.playerBoard[0]
    .concat(board.playerBoard[1], board.playerBoard[2])
  bombsFound = merged.filter(square => square === 'B')
  console.log(bombsFound)
  if (bombsFound.length > 0) {
    console.log('Game over. You lost.')
  }
  board.print()
  safeSquares = merged.filter(square => square === ' ').length - 4
  console.log(`There are ${safeSquares} safe squares`)
}
*/
