import React, { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from '@fortawesome/free-regular-svg-icons'

const ReactionTime = () => {
  const [color, setColor] = useState('blue')
  const [time, setTime] = useState(undefined)
  const [startTime, setStartTime] = useState(undefined)
  const [timeoutId, setTimeoutId] = useState()

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
        <div id='statistics' className="card-container">
          <div className='card'>
            <div className="chart-container">
              <h1>Statistics</h1>
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