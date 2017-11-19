const ms = require('./minesweeper.js')

test('player board is generated with blanks', () => {
  const myBoard = ms.generatePlayerBoard(3, 3)
  const blankBoard = [[' ', ' ', ' '],
                      [' ', ' ', ' '],
                      [' ', ' ', ' ']]
  expect(myBoard).toEqual(blankBoard)
})

test('random integer is generated', () => {
  const myNumber = ms.randomInt(1, 7)
  expect(myNumber).toBeGreaterThan(0)
  expect(myNumber).toBeLessThan(7)
})

test('bomb board is generated', () => {
  const myBoard = ms.generateBombBoard(3, 4, 5)
  expect(myBoard).toHaveLength(3)
  expect(myBoard[0]).toHaveLength(4)
})

test('bomb board contains bombs', () => {
  const myBoard = ms.generateBombBoard(3, 4, 5)
  const myFlatBoard = myBoard[0].concat(myBoard[1], myBoard[2])
  expect(myFlatBoard).toContain('B')
})

test('bombs counted when all neighbor squares valid', () => {
  const bombBoard = [[null, 'B', null],
                    ['B', null, null],
                    [null, null, null]]
  const neighborBombs = ms.getNumberOfNeighborBombs(bombBoard, 1, 1)
  expect(neighborBombs).toBe('2')
})

test('bombs counted when top left picked', () => {
  const bombBoard = [[null, 'B', null],
                    ['B', null, null],
                    [null, null, null]]
  const neighborBombs = ms.getNumberOfNeighborBombs(bombBoard, 0, 0)
  expect(neighborBombs).toBe('2')
})

test('bombs counted when bottom right picked', () => {
  const bombBoard = [[null, 'B', null],
                    ['B', null, null],
                    [null, null, null]]
  const neighborBombs = ms.getNumberOfNeighborBombs(bombBoard, 2, 2)
  expect(neighborBombs).toBe('0')
})

test('flipping a bombed tile', () => {
  const mPlayerBoard = [['0', '1', '1'],
                        [' ', ' ', ' '],
                        [' ', ' ', ' ']]
  const mBombBoard = [[null, null, null],
                      [null, null, 'B'],
                      [null, null, null]]
  const newBoard = ms.flipTile(mPlayerBoard, mBombBoard, 1, 2)
  expect(newBoard).toEqual([['0', '1', '1'],
                          [' ', ' ', 'B'],
                          [' ', ' ', ' ']])
})

test('flipping a flipped tile', () => {
  const mPlayerBoard = [['0', '1', '1'],
                        [' ', ' ', ' '],
                        [' ', ' ', ' ']]
  const mBombBoard = [[null, null, null],
                      [null, null, 'B'],
                      [null, null, null]]
  const newBoard = ms.flipTile(mPlayerBoard, mBombBoard, 0, 0)
  expect(newBoard).toEqual(mPlayerBoard)
})

test('flipping an unflipped tile', () => {
  const mPlayerBoard = [['0', '1', '1'],
                        [' ', ' ', ' '],
                        [' ', ' ', ' ']]
  const mBombBoard = [[null, null, null],
                      [null, null, 'B'],
                      [null, null, null]]
  const newBoard = ms.flipTile(mPlayerBoard, mBombBoard, 1, 0)
  expect(newBoard).toEqual([['0', '1', '1'],
                          ['0', ' ', ' '],
                          [' ', ' ', ' ']])
})

test('printing the board', () => {
  const mPlayerBoard = [['0', '1', '1'],
                        [' ', ' ', ' '],
                        [' ', ' ', ' ']]
  expect(ms.printBoard(mPlayerBoard)).toBe(0)
})
