import React from 'react'
import Header from './Header'
import ProjectItem from './ProjectItem'

const Dashboard = ({ onUpdate, projects }) => {

  const onClick = () => {
    onUpdate(true);
  }
  //<button onClick={onClick}>Project</button>

  return (
    <div>
      <Header title='Dashboard' />
      <div className='dashboard'>
        <div className='dashboard-left'>
          <div className='search-body'>
            <input className='search-projects' type='text' placeholder='Search your projects' />
          </div>
          <div className='recent-projects'>
            <div>
              <h2 className='box-header'>Recent Projects</h2>
              <div>
                {projects.map(project => (
                  <ProjectItem key={project.id} project={project} onUpdate={onUpdate} recent={true} />
                ))}
              </div>
            </div>
            <div className='box-body'></div>
          </div>
          <div className='new-project'>
            <div>
              <h2 className='box-header'>New Project</h2>
              <p className='new-project-text'>Create a new empty project with contributors, description and buildings</p>
            </div>
          </div>
        </div>
        <div className='your-projects'>
          <div>
            <h2 className='box-header'>Your Projects</h2>
          </div>
          <div>
            {projects.map(project => (
              <ProjectItem key={project.id} project={project} onUpdate={onUpdate} />
            ))}
          </div>
        </div>
      </div>
    </div>

  )
}

export default Dashboard