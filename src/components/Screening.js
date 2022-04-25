import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import Header from './Header'
import { BiCog } from 'react-icons/bi'
import Dropdown from "react-bootstrap/Dropdown";
import styles from "./foo.module.scss";

const Screening = ({ projects, onSetCurrentProject }) => {
  const { id, screeningid } = useParams()
  const project = projects.find(project => project.id == id)
  const [screening, setScreening] = useState(project.screenings.find(screening => screening.id == screeningid));
  const [buildingId, setBuilding] = useState(screening.buildingId);
  const [screeningName, setScreeningName] = useState(screening.name)
  const [outerWallBearing, setOuterWallBearing] = useState("CLT")
  const [outerWallFacade, setOuterWallFacade] = useState()
  const [innerWall, setInnerWall] = useState()
  const [roofBearing, setRoofBearing] = useState()
  const [roofingMaterial, setRoofingMaterial] = useState()




  const updateScreeningName = (e) => {
    setScreeningName(e);
    let temp = { id: screeningid, name: e, lastEdit: screening.lastEdit, buildingId: screening.buildingId }
    setScreening(temp)
    project.screenings.find(screening => screening.id == screeningid).name = e;

    let tempProject = {
      id: project.id,
      name: project.name,
      description: project.description,
      lastEdit: project.lastEdit,
      contributors: project.contributors,
      screenings: project.screenings,
      lca: project.lca,
      costs: project.costs,
      buildings: project.buildings
    }
    onSetCurrentProject(tempProject);
  }

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

  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (

    <a href="/" ref={ref} onClick={(e) => { e.preventDefault(); onClick(e); }}>
      {children}
      <BiCog className='costs-settings-cog' />
    </a>
  ));

  const exportEstimation = () => {
    console.log("MOCKING EXPORT OF ESTIMATION")
  }

  const deleteEstimation = () => {
    console.log("MOCKING DELETE ESTIMATION")
  }

  const renameEstimation = () => {
    console.log("RENAME MOCK")
  }

  return (
    <div className='main-body'>
      <Header title={project.name} />
      <div className='screening'>
        <div className='screening-header'>
          <input className='costs-header-name' type='text' value={screeningName} onChange={(e) => updateScreeningName(e.target.value)} />
          <div className='screening-header-right'>
            <div>
              <Dropdown className={styles.bootstrap}>
                <Dropdown.Toggle as={CustomToggle} />
                <Dropdown.Menu size="sm" title="bla">
                  <Dropdown.Item onClick={() => exportEstimation()}>Export</Dropdown.Item>
                  <Dropdown.Item onClick={() => deleteEstimation()}>Delete</Dropdown.Item>
                  <Dropdown.Item onClick={() => renameEstimation()}>Rename</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        </div>
        <div className='screening-models'>
          <div className='screening-model'>
            <div className='model-1'>
              <h2 className='model-header'>{screening.model1.name}</h2>


              <div className='material-radio-button-group-container' >
                <h3 className='model-selection-header'>Outer walls - Bearing</h3>
                <div className="material-radio-button-group">
                  <label className='material-radio-button'>
                    <input className='material-radio-checkmark' type="radio" checked={outerWallBearing === "concrete"} value="concrete" onChange={handleOWChange} name="outerWallBearing" /> <p className='radio-button-text'>Concrete</p>
                  </label>
                  <label className='material-radio-button'>
                    <input className='material-radio-checkmark' type="radio" checked={outerWallBearing === "aeratedConcrete"} value="aeratedConcrete" onChange={handleOWChange} name="outerWallBearing" /> <p className='radio-button-text'>Aerated concrete</p>
                  </label>
                  <label className='material-radio-button'>
                    <input className='material-radio-checkmark' type="radio" checked={outerWallBearing === "CLT"} value="CLT" onChange={handleOWChange} name="outerWallBearing" /> <p className='radio-button-text'>CLT</p>
                  </label>
                  <label className='material-radio-button'>
                    <input className='material-radio-checkmark' type="radio" checked={outerWallBearing === "wood"} value="wood" onChange={handleOWChange} name="outerWallBearing" /> <p className='radio-button-text'>Wood</p>
                  </label>
                </div>
              </div>

              <div className='material-radio-button-group-container' >
                <h3 className='model-selection-header'>Outer walls - Facade</h3>
                <div className="material-radio-button-group">
                  <label className='material-radio-button'>
                    <input className='material-radio-checkmark' type="radio" checked={outerWallFacade === "bricks"} value="bricks" onChange={handleOFChange} name="outerWallFacade" /> <p className='radio-button-text'>Bricks</p>
                  </label>
                  <label className='material-radio-button'>
                    <input className='material-radio-checkmark' type="radio" checked={outerWallFacade === "screenTiles"} value="screenTiles" onChange={handleOFChange} name="outerWallFacade" /> <p className='radio-button-text'>Screen tiles</p>
                  </label>
                  <label className='material-radio-button'>
                    <input className='material-radio-checkmark' type="radio" checked={outerWallFacade === "metal"} value="metal" onChange={handleOFChange} name="outerWallFacade" /> <p className='radio-button-text'>Metal</p>
                  </label>
                  <label className='material-radio-button'>
                    <input className='material-radio-checkmark' type="radio" checked={outerWallFacade === "wood"} value="wood" onChange={handleOFChange} name="outerWallFacade" /> <p className='radio-button-text'>Wood</p>
                  </label>
                </div>
              </div> 


              <div className='material-radio-button-group-container' >
                <h3 className='model-selection-header'>Innerwalls</h3>
                <div className="material-radio-button-group">
                  <label className='material-radio-button'>
                    <input className='material-radio-checkmark' type="radio" checked={innerWall === "concrete"} value="concrete" onChange={handleInChange} name="innerWall" /> <p className='radio-button-text'>Concrete</p>
                  </label>
                  <label className='material-radio-button'>
                    <input className='material-radio-checkmark' type="radio" checked={innerWall === "aeratedConcrete"} value="aeratedConcrete" onChange={handleInChange} name="aeratedConcrete" /> <p className='radio-button-text'>Aerated concrete</p>
                  </label>
                  <label className='material-radio-button'>
                    <input className='material-radio-checkmark' type="radio" checked={innerWall === "plaster"} value="plaster" onChange={handleInChange} name="innerWall" /> <p className='radio-button-text'>Plaster</p>
                  </label>
                  <label className='material-radio-button'>
                    <input className='material-radio-checkmark' type="radio" checked={innerWall === "CLT"} value="CLT" onChange={handleInChange} name="innerWall" /> <p className='radio-button-text'>CLT</p>
                  </label>
                  <label className='material-radio-button'>
                    <input className='material-radio-checkmark' type="radio" checked={innerWall === "wood"} value="wood" onChange={handleInChange} name="innerWall" /> <p className='radio-button-text'>Wood</p>
                  </label>
                </div>
              </div>


              <div className='material-radio-button-group-container' >
                <h3 className='model-selection-header'>Roof - Bearing</h3>
                <div className="material-radio-button-group">
                  <label className='material-radio-button'>
                    <input className='material-radio-checkmark' type="radio" checked={roofBearing === "concrete"} value="concrete" onChange={handleRBChange} name="roofBearing" /> <p className='radio-button-text'>Concrete</p>
                  </label>
                  <label className='material-radio-button'>
                    <input className='material-radio-checkmark' type="radio" checked={roofBearing === "CLT"} value="CLT" onChange={handleRBChange} name="roofBearing" /> <p className='radio-button-text'>CLT</p>
                  </label>
                  <label className='material-radio-button'>
                    <input className='material-radio-checkmark' type="radio" checked={roofBearing === "wood"} value="wood" onChange={handleRBChange} name="roofBearing" /> <p className='radio-button-text'>Wood</p>
                  </label>
                </div>
              </div>


              <div className='material-radio-button-group-container' >
                <h3 className='model-selection-header'>Roofing material</h3>
                <div className="material-radio-button-group">
                  <label className='material-radio-button'>
                    <input className='material-radio-checkmark' type="radio" checked={roofingMaterial === "felt"} value="felt" onChange={handleRMChange} name="roofingMaterial" /> <p className='radio-button-text'>Felt</p>
                  </label>
                  <label className='material-radio-button'>
                    <input className='material-radio-checkmark' type="radio" checked={roofingMaterial === "screenTiles"} value="screenTiles" onChange={handleRMChange} name="roofingMaterial" /> <p className='radio-button-text'>Screen tiles</p>
                  </label>
                  <label className='material-radio-button'>
                    <input className='material-radio-checkmark' type="radio" checked={roofingMaterial === "metal"} value="metal" onChange={handleRMChange} name="roofingMaterial" /> <p className='radio-button-text'>Metal</p>
                  </label>
                  <label className='material-radio-button'>
                    <input className='material-radio-checkmark' type="radio" checked={roofingMaterial === "wood"} value="wood" onChange={handleRMChange} name="roofingMaterial" /> <p className='radio-button-text'>Wood</p>
                  </label>
                </div>
              </div> 

            </div>
          </div>
          <div className='screening-model'>
            <div className='model-2'>
              <h2 className='model-header'>{screening.model2.name}</h2>
            </div>
          </div>

          <div className='screening-model'>
            <div className='model-3'>
              <h2 className='model-header'>{screening.model3.name}</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Screening