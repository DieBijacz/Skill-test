import React, { useEffect, useState } from 'react'
import { DELAY_BEFORE_SHOW_RIGHT_CELLS, TIME_SHOW_ON_START } from './settings'

const Cell = ({ cell, cellProps }) => {
  const { setWrongClick, setRightClick, allowClicks, setAllowClicks } = cellProps
  const [cellState, setCellState] = useState('hidden')
  const [alreadyClicked, setAlreadyClicked] = useState(false)

  // SHOW CELLS ON START
  useEffect(() => {
    setTimeout(() => {
      if (cell.value === 1)
        setCellState('show')
      setTimeout(() => {
        setCellState('hidden')
        setAllowClicks(true)
      }, TIME_SHOW_ON_START)
    }, DELAY_BEFORE_SHOW_RIGHT_CELLS);
  }, [cell.value, setAllowClicks])

  // ON CLICK
  function handleCellClick() {
    // allow only one click on cell
    if (alreadyClicked || !allowClicks) return

    // update cell state
    if (cell.value === 1) {
      setCellState('show')
      setRightClick(prev => prev += 1)
    } else {
      setCellState('wrong')
      setWrongClick(prev => prev += 1)
    }
    setAlreadyClicked(true)
  }

  return (
    <div className={`cell ${cellState}`} onClick={handleCellClick}></div>
  )
}

export default Cell