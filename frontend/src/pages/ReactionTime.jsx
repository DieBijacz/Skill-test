import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from '@fortawesome/free-regular-svg-icons'

const ReactionTime = () => {
  const [color, setColor] = useState('blue')
  const [message, setMessage] = useState('')
  const [time, setTime] = useState(undefined)
  const [startTime, setStartTime] = useState(undefined)

  const DELAY = Math.floor(Math.random() * 1000) + 1000

  const handleStartClick = () => {
    if (color === 'blue') {
      setColor('red')
      setTimeout(() => {
        setColor('green')
        setStartTime(() => Date.now())
      }, DELAY)
    }
    if (color === 'red') {
      setMessage('Too fast')
    }
    if (color === 'green') {
      setColor('blue')
      const finalTime = Date.now() - startTime
      setTime(finalTime)
      setMessage(`Your time: ${finalTime}`)
    }
  }

  return (
    <>
      {/* GAME */}
      <div id='reaction-time' className='background' style={{ backgroundColor: `${color}` }} onClick={handleStartClick}>
        <FontAwesomeIcon icon={faClock} className='icon big-icon' />
        <div className='title'>Reaction Time Test</div>
        <p>When the red box turns green, click as quickly as you can.</p>
        <p>Click anywhere to start.</p>
        {message}
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