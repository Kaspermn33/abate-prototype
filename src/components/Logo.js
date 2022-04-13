import React from 'react'
import logo from './logo.png';

const Logo = () => {
  return (
    <div className='logo-container'> 
      <img className='logo-image' src={logo} />
      <div>
        <h3 className='logo-text'>Spot the ABATE Solutions Aps</h3>
      </div>
      
    </div>
  )
}

export default Logo