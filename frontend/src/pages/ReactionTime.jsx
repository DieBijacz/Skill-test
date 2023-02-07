import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from '@fortawesome/free-regular-svg-icons'
import { getScore, saveScore } from '../components/utilities'
import { Chart as ChartJS, LineElement, CategoryScale, PointElement, LinearScale } from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(
  LineElement,
  CategoryScale,
  PointElement,
  LinearScale
)

const ReactionTime = () => {
  const [color, setColor] = useState('blue')
  const [time, setTime] = useState(undefined)
  const [startTime, setStartTime] = useState(undefined)
  const [timeoutId, setTimeoutId] = useState()
  const [chartData, setChartData] = useState()

  const DELAY = Math.floor(Math.random() * 5000) + 1000

  const startTimer = () => {
    setTimeoutId(setTimeout(() => {
      if (color !== 'red') {
        setColor('green');
        setStartTime(() => Date.now());
      }
    }, DELAY))
  };

  const handleStartClick = () => {
    if (color === 'blue') {
      setColor('gold');
      startTimer()
    }
    if (color === 'gold') {
      clearTimeout(timeoutId)
      setColor('red');
      setTime(undefined)
    }
    if (color === 'green') {
      setColor('blue');
      const finalTime = Date.now() - startTime;
      setTime(finalTime);
    }
    if (color === 'red') {
      setColor('blue');
    }
  };

  // SAVE SCORE IN DB
  useEffect(() => {
    if (time < 500) saveScore('reaction-time', time)
  }, [time])

  useEffect(() => {
    if (chartData) console.log('DATA:', chartData)
  }, [chartData])

  // GET DATA FOR CHART
  useEffect(() => {
    getScore('reaction-time', setChartData)
  }, [])

  //chart data
  const data = {
    labels: Object.keys(chartData ? chartData : []),
    datasets: [{
      data: Object.values(chartData ? chartData : []),
      backgroundColor: 'white',
      borderColor: '#2573C1',
      pointBorderColor: '#2573C1',
      tension: .4,
    }]
  }

  // chart options
  const chartOptions = {
    plugins: {
      legend: true,
    },
    scales: {
      y: { min: 0, max: chartData ? Math.max(...Object.values(chartData)) + 10 : 100 },
      x: { min: 0, max: 475 }
    }
  }

  return (
    <>
      {/* GAME */}
      <div id='reaction-time' className={`background ${color}`} onMouseDown={handleStartClick}>

        {/* BLUE */}
        {color === 'blue' && <>
          {time ?
            <>
              <FontAwesomeIcon icon={faClock} className='icon big-icon' />
              <div className="title">{time} ms</div>
              <p>Click to keep going</p>
            </>
            :
            <>
              <FontAwesomeIcon icon={faClock} className='icon big-icon' />
              <div className='title'>Reaction Time Test</div>
              <p>When the red box turns green, click as quickly as you can.</p>
              <p>Click anywhere to start.</p>
            </>}
        </>}

        {/* GOLD */}
        {color === 'gold' && <>
          <div className='title'>Wait for green</div>
        </>}

        {/* GREEN */}
        {color === 'green' && <>
          <div className='title'>Click</div>
        </>}

        {/* RED */}
        {color === 'red' && <>
          <div className='title'>Too fast</div>
        </>}
      </div>

      {/* BOTTOM SECTION */}
      <section className="container">
        <div id='statistics' className="card-container grid-2">
          <div className='card'>
            <div className="chart-container">
              <h1>Statistics</h1>
              <Line data={data} options={chartOptions} />
            </div>
          </div>
          <div className='card'>
            <h1>About the test</h1>
            <p>This is a simple tool to measure your reaction time.</p>
            <p>The average (median) reaction time is 273 milliseconds, according to the data collected on original website.</p>
          </div>
        </div>
      </section>
    </>
  )
}

export default ReactionTime