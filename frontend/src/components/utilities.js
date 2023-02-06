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
export const saveScore = async (game, score) => {
  try {
    const config = { headers: { 'Content-Type': 'application/json' } }
    await axios
      .post(`http://localhost:5000/score/${game}`, { score }, config)
      .then(res => console.log({ 'Data from server:': res.data, 'Status:': res.status }))
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