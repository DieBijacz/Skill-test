import axios from "axios";

//SHUFFLE ARRAY
export const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

// POST SCORE TO DB
export const saveScore = async (game, score, saved) => {
  try {
    const config = { headers: { 'Content-Type': 'application/json' } }
    await axios
      .post(`http://localhost:5000/score/${game}`, { score }, config)
      .then(res => res.status === 200 && saved(true))
  } catch (error) {
    console.error(error)
  }
};

// GET SCORE FROM DB
export const getScore = async (game, setData) => {
  try {
    const config = { headers: { 'Content-Type': 'application/json' } }
    await axios
      .get(`http://localhost:5000/score/${game}`, config)
      .then(data => setData(data.data))
  } catch (error) {
    console.error(error)
  }
};

export const resetScore = async (game, reset) => {
  try {
    const config = { headers: { 'Content-Type': 'application/json' } }
    await axios
      .post(`http://localhost:5000/score/reset/${game}`, config)
      .then(res => res.status === 200 && reset(true))
  } catch (error) {
    console.error(error)
  }
}