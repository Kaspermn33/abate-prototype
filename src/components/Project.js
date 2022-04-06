import { FaFolder } from 'react-icons/fa'
import { useParams } from 'react-router-dom';
import BoxHeader from './BoxHeader';
import RecentItem from './RecentItem';
import {FaRecycle} from 'react-icons/fa'

import Header from './Header'
const Project = ({ projects }) => {
  const { id } = useParams()
  const project = projects.find(project => project.id == id)
  return (
    <div>
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
                      <RecentItem key={screening.id} item={screening} />
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
                        <FaRecycle /><RecentItem key={lca.id} item={lca} />
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
                <div className='new-box'>
                  <BoxHeader title={"New"} />
                  <p className='project-text'>Creates a new empty material cost estimation</p>
                </div>
                <div className='recent'>
                  <BoxHeader title={"Recent"} />
                  <div>
                    {project.costs.map(cost => (
                      <RecentItem key={cost.id} item={cost} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className='manageproject-box'>
              <h2>Manage project</h2>
              <div className='manage-project-box'>
                <BoxHeader title={"Make changes"} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Project