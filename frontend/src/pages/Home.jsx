import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import { faClock, faSquare as emptySquare } from '@fortawesome/free-regular-svg-icons'
import { faSquare as filledSquare, faBullseye } from '@fortawesome/free-solid-svg-icons'

const Home = () => {
  const gamesSection = useRef(null)

  function handleClick() {
    gamesSection.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }

  return (
    <div id="home-page" className='flex-1'>
      <div className='background blue'>
        <div className='title'>Test your skills</div>
        <p>Measure your abilities with brain games and cognitive tests.</p>
        <button onClick={handleClick}>Get Started</button>
      </div>
      <div ref={gamesSection} className="container">
        <div className="card-container grid-3">

          <Link to='/memory'>
            <div className="card link center">
              <div className='squares-icon'>
                <FontAwesomeIcon icon={filledSquare} />
                <FontAwesomeIcon icon={emptySquare} />
                <FontAwesomeIcon icon={filledSquare} />
                <FontAwesomeIcon icon={filledSquare} />
              </div>
              <span className='title'>Visual Memory</span>
              <p className="description">Remember an increasingly large board of squares.</p>
            </div>
          </Link>

          <Link to='/reaction-time'>
            <div className="card link center">
              <FontAwesomeIcon icon={faClock} className='icon' />
              <span className='title'>Reaction Time</span>
              <p className="description">Test your visual reflexes.</p>
            </div>
          </Link>

          <Link to='/aim'>
            <div className="card link center">
              <FontAwesomeIcon icon={faBullseye} className='icon' />
              <span className='title'>Aim Trainer</span>
              <p className="description">How quickly can you hit all the targets?</p>
            </div>
          </Link>

        </div>
      </div>
    </div>
  )
}

export default Home