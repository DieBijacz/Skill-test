import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from '@fortawesome/free-regular-svg-icons'
import { MAX_DELAY } from '../components/Memory-Game/settings'

const ReactionTime = () => {
  const [color, setColor] = useState('blue')
  const [startTime, setStartTime] = useState(null)
  const [endTime, setEndTime] = useState(null)
  const [timer, setTimer] = useState(null)

  const handleStartClick = () => {
    if (!startTime) {
      setColor('red')
      setTimeout(() => {
        setColor('green')
      }, (Math.floor(Math.random() * MAX_DELAY) + 1000))
    } else {
      setColor('blue')
    }
  }

  // if (!startTime) {
  //   setStartTime(new Date())
  // } else {
  //   setEndTime(new Date())
  //   setTimer((endTime - startTime) / 1000)
  //   console.log(endTime - startTime)
  //   setStartTime(null)
  // }


  return (
    <>
      {/* GAME */}
      <div id='reaction-time' className='background' style={{ backgroundColor: `${color}` }} onClick={handleStartClick}>
        <FontAwesomeIcon icon={faClock} className='icon big-icon' />
        <div className='title'>Reaction Time Test</div>
        <p>When the red box turns green, click as quickly as you can.</p>
        <p>Click anywhere to start.</p>
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