const randomInt = (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min
}

class Board {
  constructor(numberOfRows, numberOfColumns, numberOfBombs) {
    this._playerBoard = Board
      .generatePlayerBoard(numberOfRows, numberOfColumns)
    this._bombBoard = Board
      .generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs)
  }

  print() {
    console.log(
      this._playerBoard.map(row => row.join(' | ')).join('\n')
    )

    return true
  }

  static generatePlayerBoard(numberOfRows, numberOfColumns) {
    let board = []
    for (let rowsIndex = 0; rowsIndex < numberOfRows; rowsIndex++) {
      board.push([])
      for (let columnsIndex = 0; columnsIndex < numberOfColumns; columnsIndex++) {
        board[rowsIndex].push(' ')
      }
    }
  
    return board
  }

  static generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
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

  flipTile(rowIndex, columnIndex) {
    const target = this._bombBoard[rowIndex][columnIndex]
    if (this._playerBoard[rowIndex][columnIndex] !== ' ') {
      console.log('This tile has already been flipped!')
      return this._playerBoard
    } else if (target === 'B') {
      this._playerBoard[rowIndex][columnIndex] = 'B'
      return this._playerBoard
    } else {
      this._playerBoard[rowIndex][columnIndex] =
        this.getNumberOfNeighborBombs(rowIndex, columnIndex)
      return this._playerBoard
    }
  }

  getNumberOfNeighborBombs(rowIndex, columnIndex) {
    const neighborOffsets = [[-1, -1], [-1, 0], [-1, 1],
                            [0, -1], [0, 1],
                            [1, -1], [1, 0], [1, 1]]
    const numberOfRows = this._bombBoard.length
    const numberOfColumns = this._bombBoard[0].length
    let numberOfBombs = 0
  
    neighborOffsets.forEach(offset => {
      const neighborRowIndex = rowIndex + offset[0]
      const neighborColumnIndex = columnIndex + offset[1]
      const inBounds = neighborRowIndex >= 0 &&
        neighborRowIndex < numberOfRows &&
        neighborColumnIndex >= 0 &&
        neighborColumnIndex < numberOfColumns
      if (inBounds) {
        if (this._bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
          numberOfBombs++
        }
      }
    })
  
    return numberOfBombs.toString()
  }
}

module.exports = Board
