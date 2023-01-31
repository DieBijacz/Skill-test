export function generateCells(level, boardSize, setCells) {
  const cells = []

  // generate value 1 cells 
  for (let i = 0; i < (level + 2); i++) {
    const cell = { value: 1 }
    cells.push(cell)
  }

  // generate value 0 cells
  for (let i = 0; i < (boardSize * boardSize) - (level + 2); i++) {
    const cell = { value: 0 }
    cells.push(cell)
  }

  setCells(cells.sort(() => (Math.random() > .5) ? 1 : -1))
}

export function saveScore() {
  //TODO save score on backend
  //TODO when saved, show statistics 
  console.log('save score')
}