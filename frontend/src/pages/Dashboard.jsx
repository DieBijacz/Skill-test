import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, faSquare as emptySquare } from '@fortawesome/free-regular-svg-icons'
import { faSquare as filledSquare } from '@fortawesome/free-solid-svg-icons'

const Dashboard = () => {
  return (
    <div id='dashboard' className='container flex-1'>
      <div className="card-container grid">
        <div className='card'>
          <div className="center link">
            <div className='squares-icon'>
              <FontAwesomeIcon icon={filledSquare} />
              <FontAwesomeIcon icon={emptySquare} />
              <FontAwesomeIcon icon={filledSquare} />
              <FontAwesomeIcon icon={filledSquare} />
            </div>
          </div>
          <div>
            <div className="center link">
              <FontAwesomeIcon icon={faClock} className='icon' />
            </div>
          </div>
        </div>
        <div className="card">
          <h1>Dashboard</h1>
        </div>
        <div className="card grid-wide">
          Feedback
        </div>
      </div>
    </div>
  )
}

export default Dashboard