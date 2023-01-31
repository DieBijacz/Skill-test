import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as filledHear } from '@fortawesome/free-solid-svg-icons'
import { faHeart as emptyHeart } from '@fortawesome/free-regular-svg-icons'

const Lives = ({ lives }) => {
  return (
    <div className='lives'>
      <div className='live'>{lives >= 1 ? <FontAwesomeIcon icon={filledHear} /> : <FontAwesomeIcon icon={emptyHeart} />}</div>
      <div className='live'>{lives >= 2 ? <FontAwesomeIcon icon={filledHear} /> : <FontAwesomeIcon icon={emptyHeart} />}</div>
      <div className='live'>{lives >= 3 ? <FontAwesomeIcon icon={filledHear} /> : <FontAwesomeIcon icon={emptyHeart} />}</div>
    </div>
  )
}

export default Lives