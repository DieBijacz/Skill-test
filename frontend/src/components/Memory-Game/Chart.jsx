import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, PointElement, LinearScale } from 'chart.js'
import Loading from '../Loading';
import { getScore } from '../utilities';

ChartJS.register(
  LineElement,
  CategoryScale,
  PointElement,
  LinearScale
)

const Chart = ({ game }) => {
  const [scoresData, setScoresData] = useState([])
  const [loading, setLoading] = useState(true)

  const data = {
    labels: Object.keys(scoresData),
    datasets: [{
      data: Object.values(scoresData),
      backgroundColor: 'white',
      borderColor: 'black',
      pointBorderColor: 'black',
      tension: .4
    }]
  }

  const options = {
    plugins: {
      legend: true,
    },
    scales: {
      y: { min: 0, max: 30 }
    }
  }

  // FETCH DATA
  useEffect(() => {
    getScore(game, setScoresData)
    setLoading(false)
  }, [game])

  return <>
    {loading ? <Loading /> :
      <Line data={data} options={options} style={{ margin: '2rem 0' }} />
    }
  </>
};

export default Chart;
