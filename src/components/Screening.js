import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import Header from './Header'
import { BiCog } from 'react-icons/bi'
import Dropdown from "react-bootstrap/Dropdown";
import styles from "./foo.module.scss";
import ScreeningModel from './ScreeningModel';
import allModelsPic from './all-models.png';
import noAllModelsPic from './no-all-models.png';

const Screening = ({ projects, onSetCurrentProject }) => {
  const { id, screeningid } = useParams()
  const project = projects.find(project => project.id == id)
  const [screening, setScreening] = useState(project.screenings.find(screening => screening.id == screeningid));
  const [buildingId, setBuilding] = useState(screening.buildingId);
  const [screeningName, setScreeningName] = useState(screening.name)




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

  const updateSelectedBuilding = (e) => {
    setBuilding(e);
    screening.buildingId = e;
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
        <div className='screening-body'>
          <div>
            <div>
              <select className='screening-building-select' value={buildingId} onChange={(e) => updateSelectedBuilding(e.target.value)}>
                {project.buildings.map(building => (
                  <option value={building.id}>{building.name}</option>
                ))}
              </select>
              <div className='screening-building-details'>
                <div>
                  <p className='screening-building-details-text'>Area: {project.buildings.find(b => b.id == buildingId).area}</p>
                  <p className='screening-building-details-text'>Floors: {project.buildings.find(b => b.id == buildingId).levels}</p>
                  <p className='screening-building-details-text'>Type: {project.buildings.find(b => b.id == buildingId).type}</p>
                </div>
              </div>
            </div>
            <div className='all-models-picture-container'>
              <img className='all-models-image' src={allModelsPic} />
            </div>
          </div>
          <div className='screening-models'>
            <div className='screening-model'>
              <div className='model-1'>
                <ScreeningModel title={screening.model1.name} />
              </div>
            </div>
            <div className='screening-model'>
              <div className='model-2'>
                <ScreeningModel title={screening.model2.name} />
              </div>
            </div>
            <div className='screening-model'>
              <div className='model-3'>
                <ScreeningModel title={screening.model3.name} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Screening