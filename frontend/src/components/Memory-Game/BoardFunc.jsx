import axios from 'axios'

// GENERATE CELLS FOR MEMORY GAME
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

// POST SCORE TO DB
export function saveScore(score) {
  console.log({ score })
  const config = { headers: { 'Content-Type': 'application/json' } }
  axios
    .post('http://localhost:5000/save-score', { score: score }, config)
    .then(res => console.log({ 'data from server:': res.data, 'status:': res.status }))
    .catch(error => console.log(error))
}