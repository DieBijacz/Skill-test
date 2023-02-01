import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, PointElement, LinearScale } from 'chart.js'
import { useEffect } from 'react';

ChartJS.register(
  LineElement,
  CategoryScale,
  PointElement,
  LinearScale
)

const dane = {
  1: 1,
  2: 0,
  3: 0,
  4: 0,
  5: 1,
  6: 4,
  7: 0,
  8: 0,
  9: 0,
  10: 10,
  11: 20,
  12: 20,
  13: 23,
  14: 25,
  15: 18,
  16: 10,
  17: 8,
  18: 0,
  19: 0,
}

const Chart = () => {
  const data = {
    labels: Object.keys(dane),
    datasets: [{
      data: Object.values(dane),
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

  useEffect(() => {
    fetch('http://localhost:5000/getstats')
      .then(res => res.json())
      .then(data => console.log(data))
    console.log('fetch data')
  }, [])

  return <Line data={data} options={options} />
};

export default Chart;
