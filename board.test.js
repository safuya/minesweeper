Board = require('./board')

test('player board is generated with blanks', () => {
  let myBoard = new Board(3, 3, 4)
  blankBoard = [[' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']]
  expect(myBoard.playerBoard).toEqual(blankBoard)
})

test('bomb board is generated', () => {
  let myBoard = new Board(3, 4, 4)
  expect(myBoard.bombBoard).toHaveLength(3)
  expect(myBoard.bombBoard[0]).toHaveLength(4)
})

test('merge method merges', () => {
  let myBoard = new Board(2, 2, 4)
  expect(myBoard.merged()).toEqual([' ', ' ', ' ', ' '])
})

test('number of bombs found', () => {
  let myBoard = new Board(2, 2, 4)
  myBoard.playerBoard = [['B', ' '], [' ', '1']]
  expect(myBoard.bombsFound()).toBe(1)
})

test('number of safe squares', () => {
  let myBoard = new Board(3, 3, 4)
  expect(myBoard.safeSquares()).toBe(5)
})

test('printing the board', () => {
  let myBoard = new Board(3, 3, 4)
  expect(myBoard.print()).toBe(true)
})

test('bombs counted when all neighbor squares valid', () => {
  let myBoard = new Board(3, 3, 4)
  myBoard.bombBoard = [[null, 'B', null],
                        ['B', null, null],
                        [null, null, null]]
  expect(myBoard.getNumberOfNeighborBombs(1, 1)).toBe('2')
})

test('bombs counted when top left picked', () => {
  let myBoard = new Board(3, 3, 4)
  myBoard.bombBoard = [[null, 'B', null],
                        ['B', null, null],
                        [null, null, null]]
  expect(myBoard.getNumberOfNeighborBombs(0, 0)).toBe('2')
})

test('bombs counted when bottom right picked', () => {
  let myBoard = new Board(3, 3, 4)
  myBoard.bombBoard = [[null, 'B', null],
                        ['B', null, null],
                        [null, null, null]]
  expect(myBoard.getNumberOfNeighborBombs(2, 2)).toBe('0')
})

test('flipping a bombed tile', () => {
  let myBoard = new Board(3, 3, 4)
  myBoard.playerBoard = [['0', '1', '1'], [' ', ' ', ' '], [' ', ' ', ' ']]
  myBoard.bombBoard = [[null, null, null],
                        [null, null, 'B'],
                        [null, null, null]]
  const bombed = myBoard.flipTile(1, 2)
  expect(bombed).toEqual([['0', '1', '1'],
                          [' ', ' ', 'B'],
                          [' ', ' ', ' ']])
})

test('flipping a flipped tile', () => {
  let myBoard = new Board(3, 3, 4)
  myBoard.playerBoard = [['0', '1', '1'], [' ', ' ', ' '], [' ', ' ', ' ']]
  myBoard.bombBoard = [[null, null, null],
                        [null, null, 'B'],
                        [null, null, null]]
  const prebombed = myBoard.playerBoard
  const bombed = myBoard.flipTile(0, 0)
  expect(bombed).toEqual(prebombed)
})

test('flipping an unflipped tile', () => {
  let myBoard = new Board(3, 3, 4)
  myBoard.playerBoard = [['0', '1', '1'], [' ', ' ', ' '], [' ', ' ', ' ']]
  myBoard.bombBoard = [[null, null, null],
                        [null, null, 'B'],
                        [null, null, null]]
  myBoard.flipTile(1, 0)
  expect(myBoard.playerBoard)
    .toEqual([['0', '1', '1'], ['0', ' ', ' '], [' ', ' ', ' ']])
})
