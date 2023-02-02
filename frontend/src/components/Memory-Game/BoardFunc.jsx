import axios from 'axios'
import { shuffle } from '../utilities';

// GENERATE CELLS FOR MEMORY GAME
export const generateCells = (level, boardSize, setCells) => {
  //creata array based on board size filled with zeros
  //change zeros based on level
  const cells = Array(boardSize * boardSize).fill(0).map((_, i) => ({
    value: i < (level + 2) ? 1 : 0
  }));
  setCells(shuffle(cells));
};

// POST SCORE TO DB
export const saveScore = async (score) => {
  try {
    const config = { headers: { 'Content-Type': 'application/json' } };
    const response = await axios.post('http://localhost:5000/save-score', { score }, config);
    console.log({ 'Data from server:': response.data, 'Status:': response.status });
  } catch (error) {
    console.error(error);
  }
};