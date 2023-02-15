import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBullseye } from '@fortawesome/free-solid-svg-icons'

const Aim = () => {
  const [runGame, setRunGame] = useState(false)
  const [startTime, setStartTime] = useState(undefined)
  const [targetsLeft, setTargetsLeft] = useState(10)

  const startGame = () => {
    setRunGame(true)
    setStartTime(() => Date.now());
  }

  const handleClick = () => {
    // target clicks
    targetsLeft > 1 ? setTargetsLeft(left => left -= 1) : endGame()

    // off - target
  }

  const createTarget = () => {
    console.log('create targer')
  }

  const endGame = () => {
    console.log('game over')
  }

  useEffect(() => {
    if (runGame) createTarget()
  }, [targetsLeft, runGame])

  return (
    <div>
      {runGame ?
        <div id='aim-trainer-game' className={`background blue`} onClick={() => handleClick()}>
          <div className="board container">
            {targetsLeft}
          </div>
        </div>
        :
        <div id='aim-trainer' className={`background blue`} onClick={() => startGame()}>
          <FontAwesomeIcon icon={faBullseye} className='icon big-icon' />
          <div className='title'>Aim Trainer</div>
          <p>Hit 30 targets as quickly as you can.</p>
          <p>Click anywhere to start.</p>
        </div>
      }
      <section className="container">
        <div id='statistics' className="card-container grid-2">
          <div className='card'>
            <div className="chart-container">
              <h1>Statistics</h1>
              {/* <Line data={data} options={chartOptions} /> */}
            </div>
          </div>
          <div className='card'>
            <h1>About the test</h1>
            <p>This is a simple tool to measure your reaction time.</p>
            <p>The average (median) reaction time is 273 milliseconds, according to the data collected on original website.</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Aim