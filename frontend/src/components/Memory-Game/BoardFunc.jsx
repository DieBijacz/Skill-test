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
