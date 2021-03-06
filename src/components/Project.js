import { FaFolder } from 'react-icons/fa'
import React from 'react'
import { useParams } from 'react-router-dom';
import BoxHeader from './BoxHeader';
import RecentItem from './RecentItem';
import {FaRecycle} from 'react-icons/fa'
import { VscGraph } from 'react-icons/vsc'
import { BiCoinStack } from 'react-icons/bi'
import {HiOutlineCog} from 'react-icons/hi'
import { useNavigate, generatePath } from "react-router-dom";
import { BiCog } from 'react-icons/bi'
import Dropdown from "react-bootstrap/Dropdown";
import styles from "./foo.module.scss";

import Header from './Header'
const Project = ({ projects, onSetCurrentProject }) => {
  const { id } = useParams()
  let project = projects.find(project => project.id == id)

  const navigate = useNavigate();
  const onUpdateProject = () => {
    navigate(generatePath('update'));
      
  }

  onSetCurrentProject(project);

  const getDate = () => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var today = new Date();
    return months[today.getMonth()] + " " + today.getDate();
  }

  const onNewCosts = () => {
    let newId = checkCostID(project.costs.length)
    let temp = {
      id: newId,
      name: 'Cost estimation' + newId,
      lastEdit: getDate(),
      buildingId: 0, 
      files: [],
      materials : []
    }
    project.costs.push(temp)

    let tempProject = {
      id: project.id,
      name: project.name,
      description: project.description,
      lastEdit: getDate(),
      contributors: project.contributors,
      screenings: project.screenings,
      lca: project.lca,
      costs: project.costs,
      buildings: project.buildings
    }
    project = tempProject;
    onSetCurrentProject(tempProject);
    navigate(generatePath('cost/' + newId))
  }

  const onNewLca = () => {
    let newId = checkLcaID(project.lca.length)
    let temp = {
      id: newId,
      name: 'Lca estimation' + newId,
      lastEdit: getDate(),
      buildingId: 0, 
      files: [],
      materials : []
    }
    project.lca.push(temp)

    let tempProject = {
      id: project.id,
      name: project.name,
      description: project.description,
      lastEdit: getDate(),
      contributors: project.contributors,
      screenings: project.screenings,
      lca: project.lca,
      costs: project.costs,
      buildings: project.buildings
    }
    project = tempProject;
    onSetCurrentProject(tempProject);
    navigate(generatePath('lca/' + newId))
  } 

  const onNewScreening = () => {
    let newId = checkScreeningID(project.screenings.length)

    let temp = {
      id: newId,
      name: 'Screening ' + newId,
      lastEdit: getDate(),
      buildingId: 0,
      model1: {
        name: "Model 1",
        materialSelection: {
          outerWallBearing: "",
          outerWallFacade: "",
          innerWall: "",
          roofBearing: "",
          roofingMaterial: "",
        }
      },
      model2: {
        name: "Model 2",
        materialSelection: {
          outerWallBearing: "",
          outerWallFacade: "",
          innerWall: "",
          roofBearing: "",
          roofingMaterial: "",
        }
      },
      model3: {
        name: "Model 3",
        materialSelection: {
          outerWallBearing: "",
          outerWallFacade: "",
          innerWall: "",
          roofBearing: "",
          roofingMaterial: "",
        }
      },
    }
    project.screenings.push(temp)

    let tempProject = {
      id: project.id,
      name: project.name,
      description: project.description,
      lastEdit: getDate(),
      contributors: project.contributors,
      screenings: project.screenings,
      lca: project.lca,
      costs: project.costs,
      buildings: project.buildings
    }
    project = tempProject;
    onSetCurrentProject(tempProject);
    navigate(generatePath('screening/' + newId))

  }


  const checkCostID = (id) => {
    for (let i = 0; i < project.costs.length; i++) {
        if (id == project.costs[i].id) {
            id++;
            return checkCostID(id)
        }
    }
    return id;
  }

  const checkLcaID = (id) => {
    for (let i = 0; i < project.lca.length; i++) {
        if (id == project.lca[i].id) {
            id++;
            return checkLcaID(id)
        }
    }
    return id;
  }

  const checkScreeningID = (id) => {
    for (let i = 0; i < project.screenings.length; i++) {
        if (id == project.screenings[i].id) {
            id++;
            return checkScreeningID(id)
        }
    }
    return id;
  }

  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (

    <a href="/" ref={ref} onClick={(e) => { e.preventDefault(); onClick(e); }}>
      {children}
      <BiCog className='costs-settings-cog' />
    </a>
  ));

  return (
    <div className='main-body'>
      <Header title={project.name} />
      <div className='project'>
        <div className='project-header'>
          <h1 className='page-sub-header'>Project</h1>
          <div className='screening-header-right'>
            <div>
              <Dropdown className={styles.bootstrap}>
                <Dropdown.Toggle as={CustomToggle} />
                <Dropdown.Menu size="sm" title="bla">
                  <Dropdown.Item>Export</Dropdown.Item>
                  <Dropdown.Item>Delete</Dropdown.Item>
                  <Dropdown.Item>Manage</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        </div>
        <div className='project-main'>
          <div className='project-left'>
            <div className='screening-box'>
              <div className='project-box-header'>
                <VscGraph className='screening-box-header-icon'/><h2 className='project-box-header-text'>Screening</h2>
              </div>
              <div className='box-type'>
                <div className='new-box' onClick={onNewScreening}>
                  <BoxHeader title={"New"} />
                  <p className='project-text'>Creates a new empty carbon footprint-screening estimation</p>
                </div>
                <div className='recent'>
                  <BoxHeader title={"Recent"} />
                  <div className='recent-screenings'>
                    {project.screenings.map(screening => (
                      <RecentItem key={screening.id} item={screening} type="screening"/>
                    ))}
                  </div>
                </div>
              </div>

            </div>
            <div className='LCA-box'>
            <div className='project-box-header'>
                <FaRecycle className='lca-box-header-icon'/><h2 className='project-box-header-text'>LCA</h2>
              </div>
              <div className='box-type'>
                <div className='new-box' onClick={onNewLca}>
                  <BoxHeader title={"New"} />
                  <p className='project-text'>Creates a new empty Life Cycle Analysis estimation</p>
                </div>
                <div className='recent'>
                  <BoxHeader title={"Recent"} />
                  <div className='recent-lca'>
                    {project.lca.map(lca => (
                      <div> 
                        <RecentItem key={lca.id} item={lca} type="lca"/>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>


          </div>
          <div className='project-right'>

            <div className='costs-box'>
            <div className='project-box-header'>
                <BiCoinStack className='costs-box-header-icon'/><h2 className='project-box-header-text'>Costs</h2>
              </div>
              <div className='box-type'>
                <div className='new-box' onClick={onNewCosts}>
                  <BoxHeader title={"New"} />
                  <p className='project-text'>Creates a new empty material cost estimation</p>
                </div>
                <div className='recent'>
                  <BoxHeader title={"Recent"} />
                  <div className='recent-costs'>
                    {project.costs.map(cost => (
                      <RecentItem key={cost.id} item={cost} type="costs"/>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className='manageproject-box'>
            <div className='project-box-header'>
                <HiOutlineCog className='manageproject-box-header-icon'/><h2 className='project-box-header-text'>Manage project</h2>
              </div>
              <div className='manage-project-box' onClick={onUpdateProject}>
                <BoxHeader title={"Make changes"} />
                <div className='project-details'>
                <h2 className='project-name'>{project.name}</h2>
                <div className='cont-desc-box'>
                  <div className='contributors-box'>
                  <p className='p-header'>Contributors:</p>
                  {project.contributors.map(cont => (
                      <p className='p-normal'>{cont.name}</p>
                    ))}
                    </div>
                    <div className='description-box'>
                    <p className='p-header'>Description</p>
                    <p className='p-normal'>{project.description}</p>
                    </div>
                </div>
              </div>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Project