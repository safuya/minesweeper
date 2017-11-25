const randomInt = (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min
}

class Board {
  constructor(numberOfRows, numberOfColumns, numberOfBombs) {
    this.playerBoard = Board
      .generatePlayerBoard(numberOfRows, numberOfColumns)
    this.bombBoard = Board
      .generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs)
    this._numberOfBombs = numberOfBombs 
  }

  merged() {
    let merged = []
    this.playerBoard.forEach(row => {
      row.forEach(square => {
        merged.push(square)
      })
    })
    return merged
  }

  bombsFound() {
    return this.merged().filter(square => square === 'B').length
  }

  safeSquares() {
    return this.merged().filter(square => square === ' ')
      .length - this._numberOfBombs
  }

  print() {
    console.log(
      this.playerBoard.map(row => row.join(' | ')).join('\n')
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
    const target = this.bombBoard[rowIndex][columnIndex]
    if (this.playerBoard[rowIndex][columnIndex] !== ' ') {
      console.log('This tile has already been flipped!')
      return this.playerBoard
    } else if (target === 'B') {
      this.playerBoard[rowIndex][columnIndex] = 'B'
      return this.playerBoard
    } else {
      this.playerBoard[rowIndex][columnIndex] =
        this.getNumberOfNeighborBombs(rowIndex, columnIndex)
      return this.playerBoard
    }
  }

  getNumberOfNeighborBombs(rowIndex, columnIndex) {
    const neighborOffsets = [[-1, -1], [-1, 0], [-1, 1],
                            [0, -1], [0, 1],
                            [1, -1], [1, 0], [1, 1]]
    const numberOfRows = this.bombBoard.length
    const numberOfColumns = this.bombBoard[0].length
    let numberOfBombs = 0
  
    neighborOffsets.forEach(offset => {
      const neighborRowIndex = rowIndex + offset[0]
      const neighborColumnIndex = columnIndex + offset[1]
      const inBounds = neighborRowIndex >= 0 &&
        neighborRowIndex < numberOfRows &&
        neighborColumnIndex >= 0 &&
        neighborColumnIndex < numberOfColumns
      if (inBounds) {
        if (this.bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
          numberOfBombs++
        }
      }
    })
  
    return numberOfBombs.toString()
  }
}

module.exports = Board
