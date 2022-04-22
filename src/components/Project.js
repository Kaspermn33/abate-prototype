import { FaFolder } from 'react-icons/fa'
import { useParams } from 'react-router-dom';
import BoxHeader from './BoxHeader';
import RecentItem from './RecentItem';
import {GrCycle} from 'react-icons/gr'
import { useNavigate, generatePath } from "react-router-dom";

import Header from './Header'
const Project = ({ projects, onSetCurrentProject }) => {
  const { id } = useParams()
  let project = projects.find(project => project.id == id)

  const navigate = useNavigate();
  const onUpdateProject = () => {
    navigate(generatePath('update'));
      
  }

  onSetCurrentProject(project);

  const onNewCosts = () => {
    let newId = checkCostID(project.costs.length)
    let temp = {
      id: newId,
      name: 'New cost estimation' + newId,
      lastEdit: 'April 6th',
      buildingId: 0, 
      files: [],
      standAloneMaterials : []
    }
    project.costs.push(temp)

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
    project = tempProject;
    onSetCurrentProject(tempProject);
    navigate(generatePath('cost/' + newId))
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

  return (
    <div className='main-body'>
      <Header title={project.name} />
      <div className='project'>
        <div>
          <h1>Project</h1>
        </div>
        <div className='project-main'>
          <div className='project-left'>
            <div className='screening-box'>
              <h2>Screening</h2>
              <div className='box-type'>
                <div className='new-box'>
                  <BoxHeader title={"New"} />
                  <p className='project-text'>Creates a new empty carbon footprint-screening estimation</p>
                </div>
                <div className='recent'>
                  <BoxHeader title={"Recent"} />
                  <div>
                    {project.screenings.map(screening => (
                      <RecentItem key={screening.id} item={screening} type="screening"/>
                    ))}
                  </div>
                </div>
              </div>

            </div>
            <div className='LCA-box'>
              <h2>LCA</h2>
              <div className='box-type'>
                <div className='new-box'>
                  <BoxHeader title={"New"} />
                  <p className='project-text'>Creates a new empty Life Cycle Analysis estimation</p>
                </div>
                <div className='recent'>
                  <BoxHeader title={"Recent"} />
                  <div>
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
              <h2>Costs</h2>
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
              <h2>Manage project</h2>
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