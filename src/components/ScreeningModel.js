import React, { useState } from 'react'

const ScreeningModel = ({ title }) => {
    const [outerWallBearing, setOuterWallBearing] = useState("CLT")
    const [outerWallFacade, setOuterWallFacade] = useState()
    const [innerWall, setInnerWall] = useState()
    const [roofBearing, setRoofBearing] = useState()
    const [roofingMaterial, setRoofingMaterial] = useState()

    const handleOWChange = (event) => {
        setOuterWallBearing(event.target.value)
        console.log(outerWallBearing)
      }
    
      const handleOFChange = (event) => {
        setOuterWallFacade(event.target.value)
        console.log(outerWallFacade)
      }
    
      const handleInChange = (event) => {
        setInnerWall(event.target.value)
        console.log(innerWall)
      }
    
      const handleRBChange = (event) => {
        setRoofBearing(event.target.value)
        console.log(roofBearing)
      }
    
      const handleRMChange = (event) => {
        setRoofingMaterial(event.target.value)
        console.log(roofingMaterial)
      }

    return (
        <div>
            <h2 className='model-header'>{title}</h2>
            <div className='material-radio-button-group-container' >
                <h3 className='model-selection-header'>Outer walls - Bearing</h3>
                <div className="material-radio-button-group">
                  <label className='material-radio-button'>
                    <input className='material-radio-checkmark' type="radio" checked={outerWallBearing === "concrete"} value="concrete" onChange={handleOWChange} name={"outerWallBearing" + title} /> <p className='radio-button-text'>Concrete</p>
                  </label>
                  <label className='material-radio-button'>
                    <input className='material-radio-checkmark' type="radio" checked={outerWallBearing === "aeratedConcrete"} value="aeratedConcrete" onChange={handleOWChange} name={"outerWallBearing" + title} /> <p className='radio-button-text'>Aerated concrete</p>
                  </label>
                  <label className='material-radio-button'>
                    <input className='material-radio-checkmark' type="radio" checked={outerWallBearing === "CLT"} value="CLT" onChange={handleOWChange} name={"outerWallBearing" + title} /> <p className='radio-button-text'>CLT</p>
                  </label>
                  <label className='material-radio-button'>
                    <input className='material-radio-checkmark' type="radio" checked={outerWallBearing === "wood"} value="wood" onChange={handleOWChange} name={"outerWallBearing" + title} /> <p className='radio-button-text'>Wood</p>
                  </label>
                </div>
              </div>

              <div className='material-radio-button-group-container' >
                <h3 className='model-selection-header'>Outer walls - Facade</h3>
                <div className="material-radio-button-group">
                  <label className='material-radio-button'>
                    <input className='material-radio-checkmark' type="radio" checked={outerWallFacade === "bricks"} value="bricks" onChange={handleOFChange} name={"outerWallFacade"+ title} /> <p className='radio-button-text'>Bricks</p>
                  </label>
                  <label className='material-radio-button'>
                    <input className='material-radio-checkmark' type="radio" checked={outerWallFacade === "screenTiles"} value="screenTiles" onChange={handleOFChange} name={"outerWallFacade"+ title} /> <p className='radio-button-text'>Screen tiles</p>
                  </label>
                  <label className='material-radio-button'>
                    <input className='material-radio-checkmark' type="radio" checked={outerWallFacade === "metal"} value="metal" onChange={handleOFChange} name={"outerWallFacade"+ title} /> <p className='radio-button-text'>Metal</p>
                  </label>
                  <label className='material-radio-button'>
                    <input className='material-radio-checkmark' type="radio" checked={outerWallFacade === "wood"} value="wood" onChange={handleOFChange} name={"outerWallFacade"+ title} /> <p className='radio-button-text'>Wood</p>
                  </label>
                </div>
              </div> 


              <div className='material-radio-button-group-container' >
                <h3 className='model-selection-header'>Innerwalls</h3>
                <div className="material-radio-button-group">
                  <label className='material-radio-button'>
                    <input className='material-radio-checkmark' type="radio" checked={innerWall === "concrete"} value="concrete" onChange={handleInChange} name={"innerWall"+ title} /> <p className='radio-button-text'>Concrete</p>
                  </label>
                  <label className='material-radio-button'>
                    <input className='material-radio-checkmark' type="radio" checked={innerWall === "aeratedConcrete"} value="aeratedConcrete" onChange={handleInChange} name={"innerWall"+ title} /> <p className='radio-button-text'>Aerated concrete</p>
                  </label>
                  <label className='material-radio-button'>
                    <input className='material-radio-checkmark' type="radio" checked={innerWall === "plaster"} value="plaster" onChange={handleInChange} name={"innerWall"+ title} /> <p className='radio-button-text'>Plaster</p>
                  </label>
                  <label className='material-radio-button'>
                    <input className='material-radio-checkmark' type="radio" checked={innerWall === "CLT"} value="CLT" onChange={handleInChange} name={"innerWall"+ title} /> <p className='radio-button-text'>CLT</p>
                  </label>
                  <label className='material-radio-button'>
                    <input className='material-radio-checkmark' type="radio" checked={innerWall === "wood"} value="wood" onChange={handleInChange} name={"innerWall"+ title} /> <p className='radio-button-text'>Wood</p>
                  </label>
                </div>
              </div>


              <div className='material-radio-button-group-container' >
                <h3 className='model-selection-header'>Roof - Bearing</h3>
                <div className="material-radio-button-group">
                  <label className='material-radio-button'>
                    <input className='material-radio-checkmark' type="radio" checked={roofBearing === "concrete"} value="concrete" onChange={handleRBChange} name={"roofBearing"+ title} /> <p className='radio-button-text'>Concrete</p>
                  </label>
                  <label className='material-radio-button'>
                    <input className='material-radio-checkmark' type="radio" checked={roofBearing === "CLT"} value="CLT" onChange={handleRBChange} name={"roofBearing"+ title} /> <p className='radio-button-text'>CLT</p>
                  </label>
                  <label className='material-radio-button'>
                    <input className='material-radio-checkmark' type="radio" checked={roofBearing === "wood"} value="wood" onChange={handleRBChange} name={"roofBearing"+ title} /> <p className='radio-button-text'>Wood</p>
                  </label>
                </div>
              </div>


              <div className='material-radio-button-group-container' >
                <h3 className='model-selection-header'>Roofing material</h3>
                <div className="material-radio-button-group">
                  <label className='material-radio-button'>
                    <input className='material-radio-checkmark' type="radio" checked={roofingMaterial === "felt"} value="felt" onChange={handleRMChange} name={"roofingMaterial"+ title} /> <p className='radio-button-text'>Felt</p>
                  </label>
                  <label className='material-radio-button'>
                    <input className='material-radio-checkmark' type="radio" checked={roofingMaterial === "screenTiles"} value="screenTiles" onChange={handleRMChange} name={"roofingMaterial"+ title} /> <p className='radio-button-text'>Screen tiles</p>
                  </label>
                  <label className='material-radio-button'>
                    <input className='material-radio-checkmark' type="radio" checked={roofingMaterial === "metal"} value="metal" onChange={handleRMChange} name={"roofingMaterial"+ title} /> <p className='radio-button-text'>Metal</p>
                  </label>
                  <label className='material-radio-button'>
                    <input className='material-radio-checkmark' type="radio" checked={roofingMaterial === "wood"} value="wood" onChange={handleRMChange} name={"roofingMaterial"+ title} /> <p className='radio-button-text'>Wood</p>
                  </label>
                </div>
              </div> 
        </div>
    )
}

export default ScreeningModel