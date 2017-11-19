const ms = require('./minesweeper.js')

let playerBoard = ms.generatePlayerBoard(3, 4)
const bombBoard = ms.generateBombBoard(3, 4, 5)

console.log('Start board: ')
ms.printBoard(playerBoard)
console.log('Flipping tile.')
playerBoard = ms.flipTile(playerBoard, bombBoard, 0, 0)
console.log('The scores on the doors..')
ms.printBoard(playerBoard)
