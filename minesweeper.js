const generatePlayerBoard = (numberOfRows, numberOfColumns) => {
  let board = []
  for (let rowsIndex = 0; rowsIndex < numberOfRows; rowsIndex++) {
    board.push([])
    for (let columnsIndex = 0; columnsIndex < numberOfColumns; columnsIndex++) {
      board[rowsIndex].push(' ')
    }
  }

  return board
}

const randomInt = (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min
}

const generateBombBoard = (numberOfRows, numberOfColumns, numberOfBombs) => {
  let board = []
  for (let rowsIndex = 0; rowsIndex < numberOfRows; rowsIndex++) {
    board.push([])
    for (let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
      board[rowsIndex].push(null)
    }
  }

  for (; numberOfBombs > 0; numberOfBombs--) {
    let randomRowIndex = randomInt(0, numberOfRows)
    let randomColumnIndex = randomInt(0, numberOfColumns)
    if (board[randomRowIndex][randomColumnIndex] === 'B') {
      numberOfBombs++
    }
    board[randomRowIndex][randomColumnIndex] = 'B'
  }

  return board
}

const getNumberOfNeighborBombs = (bombBoard, rowIndex, columnIndex) => {
  const neighborOffsets = [[-1, -1],
                          [-1, 0],
                          [-1, 1],
                          [0, -1],
                          [0, 1],
                          [1, -1],
                          [1, 0],
                          [1, 1]]
  const numberOfRows = bombBoard.length
  const numberOfColumns = bombBoard[0].length
  let numberOfBombs = 0

  neighborOffsets.forEach(offset => {
    const neighborRowIndex = rowIndex + offset[0]
    const neighborColumnIndex = columnIndex + offset[1]
    const inBounds = neighborRowIndex >= 0 &&
      neighborRowIndex < numberOfRows &&
      neighborColumnIndex >= 0 &&
      neighborColumnIndex < numberOfColumns
    if (inBounds) {
      if (bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
        numberOfBombs++
      }
    }
  })

  return numberOfBombs.toString()
}

const flipTile = (playerBoard, bombBoard, rowIndex, columnIndex) => {
  const target = bombBoard[rowIndex][columnIndex]
  if (playerBoard[rowIndex][columnIndex] !== ' ') {
    console.log('This tile has already been flipped!')
    return playerBoard
  } else if (target === 'B') {
    playerBoard[rowIndex][columnIndex] = 'B'
    return playerBoard
  } else {
    playerBoard[rowIndex][columnIndex] =
      getNumberOfNeighborBombs(bombBoard, rowIndex, columnIndex)
    return playerBoard
  }
}

const printBoard = board => {
  console.log(board.map(row => row.join(' | ')).join('\n'))
  return 0
}

module.exports = {
  generatePlayerBoard: generatePlayerBoard,
  randomInt: randomInt,
  generateBombBoard: generateBombBoard,
  getNumberOfNeighborBombs: getNumberOfNeighborBombs,
  printBoard: printBoard,
  flipTile: flipTile
}
