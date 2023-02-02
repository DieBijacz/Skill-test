import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, PointElement, LinearScale } from 'chart.js'
import Loading from '../Loading';

ChartJS.register(
  LineElement,
  CategoryScale,
  PointElement,
  LinearScale
)

const Chart = () => {
  const [scoresData, setScoresData] = useState([])
  const [loading, setLoading] = useState(false)

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
    fetch('http://localhost:5000/getstats')
      .then(res => res.json())
      .then(data => setScoresData(data))
  }, [])

  return <>
    {loading ? <Loading /> :
      <Line data={data} options={options} style={{ margin: '2rem 0' }} />
    }
  </>
};

export default Chart;
