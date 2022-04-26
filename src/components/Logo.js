import React from 'react'
import logo from './logo.png';

const Logo = () => {
  return (
    <div className='logo-container'> 
      <img className='logo-image' src={logo} />
      <div>
        <h3 className='logo-text'>ABATE</h3>
      </div>
      
    </div>
  )
}

export default Logo