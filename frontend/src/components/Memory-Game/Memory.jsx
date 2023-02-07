import React, { useCallback, useEffect, useState } from 'react'
import Cell from './Cell'
import { generateCells } from './BoardFunc.jsx'
import Lives from './Lives'
import { BOARD_SIZE_GRID, BORAD_SIZE_IN_PX } from './settings'
import { faSquare as emptySquare } from '@fortawesome/free-regular-svg-icons'
import { faSquare as filledSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getScore, saveScore } from '../utilities'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, LineElement, CategoryScale, PointElement, LinearScale } from 'chart.js'

ChartJS.register(
  LineElement,
  CategoryScale,
  PointElement,
  LinearScale
)

const Memory = () => {
  const [displayPanel, setDisplayPanel] = useState('start-game') //STARTING PANEL (start-game / game-panel / game-over)

  const [level, setLevel] = useState(1)
  const [lives, setLives] = useState(3)
  const [cells, setCells] = useState([])
  const [boardSize, setBoardSize] = useState(3)

  const [wrongClick, setWrongClick] = useState(0)
  const [rightClick, setRightClick] = useState(0)

  const [allowClicks, setAllowClicks] = useState(false)

  const [chartData, setChartData] = useState([])

  const cellProps = { setWrongClick, rightClick, setRightClick, wrongClick, allowClicks, setAllowClicks }

  // INITIAL GAME
  useEffect(() => {
    if (cells.length === 0) {
      generateCells(level, boardSize, setCells)
    }
  }, [level, boardSize, cells, setCells, lives])

  // LEVEL UP
  const changeLevel = useCallback(() => {
    setTimeout(() => {
      setCells([])
      setRightClick(0)
      setWrongClick(0)
      setLevel(prev => prev += 1)
      setBoardSize(BOARD_SIZE_GRID[level])
    }, 500);
  }, [level, setLevel])

  //RESET GAME
  const resetGame = () => {
    setLevel(1)
    setLives(3)
    setCells([])
    setBoardSize(3)
    setWrongClick(0)
    setRightClick(0)
    setDisplayPanel('game-panel')
  }

  // WRONG CLICKS
  useEffect(() => {
    if (lives === 0) setDisplayPanel('game-over')
    if (wrongClick === 3) {
      setAllowClicks(false)
      setTimeout(() => {
        setWrongClick(0)
        setRightClick(0)
        setLives(prev => prev -= 1)
        setCells([])
      }, 1000)
    }
  }, [wrongClick, setLives, setAllowClicks, lives])

  // RIGHT CLICKS
  useEffect(() => {
    if (rightClick === level + 2) {
      setAllowClicks(false)
      changeLevel()
    }
  }, [rightClick, setAllowClicks, changeLevel, level])

  // GET DATA FOR CHART
  useEffect(() => {
    getScore('memory', setChartData)
  }, [])

  // chart data
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
      y: { min: 0, max: 30 }
    }
  }

  return (
    <>
      <div id='memory-game' className='background blue'>
        {/* START GAME */}
        {displayPanel === 'start-game' && <>
          <div className='panel'>
            <div className='squares-icon'>
              <FontAwesomeIcon icon={filledSquare} />
              <FontAwesomeIcon icon={emptySquare} />
              <FontAwesomeIcon icon={filledSquare} />
              <FontAwesomeIcon icon={filledSquare} />
            </div>
            <div className='title'>Visual Memory Test</div>
            <p>Memorize the squares.</p>
            <button onClick={() => setDisplayPanel('game-panel')}>Start</button>
          </div>
        </>}

        {/* GAME */}
        {displayPanel === 'game-panel' && <>
          <div className='panel'>
            <div className="stats">
              <div>Level: {level}</div>
              <Lives lives={lives} />
            </div>
            <div className="board" style={{ gridTemplateColumns: `repeat(${boardSize}, 1fr)`, width: `${BORAD_SIZE_IN_PX}px`, height: `${BORAD_SIZE_IN_PX}px` }}>
              {cells.map((cell, index) => <Cell cell={cell} cellProps={cellProps} key={index} />)}
            </div>
          </div>
        </>}

        {/* GAME OVER */}
        {displayPanel === 'game-over' && <>
          <div className='panel'>
            <div className='squares-icon'>
              <FontAwesomeIcon icon={filledSquare} />
              <FontAwesomeIcon icon={emptySquare} />
              <FontAwesomeIcon icon={filledSquare} />
              <FontAwesomeIcon icon={filledSquare} />
            </div>
            <p>Visual Memory Test</p>
            <div className='title'>Level {level}</div>
            <p>Save your score to see how you compare.</p>
            <div className='buttons'>
              <button onClick={() => saveScore('memory', level)}>Save score</button>
              <button onClick={() => resetGame()}>Try Again</button>
            </div>
          </div>
        </>}
      </div >

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
            <p>
              Every level, a number of tiles will flash white. Memorize them, and pick them again after the tiles are reset!
            </p>
            <p>
              Levels get progressively more difficult, to challenge your skills.
            </p>
            <p>
              If you miss 3 tiles on a level, you lose one life.
            </p>
            <p>
              You have three lives.
            </p>
            <p>
              Make it as far as you can!
            </p>
          </div>
        </div>
      </section>
    </>
  )
}

export default Memory