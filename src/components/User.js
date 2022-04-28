import React from 'react'
import { BiUserCircle } from 'react-icons/bi'
import { VscBellDot } from 'react-icons/vsc'

const User = () => {
  return (
    <div className='user-container'>
      <div className='user-icon'>
        <BiUserCircle/>
      </div>
      <div className='user-name'>
        Spotty Solutionist
      </div>
      <div className='user-bell'>
        <VscBellDot/>
      </div>
    </div>
  )
}

export default User