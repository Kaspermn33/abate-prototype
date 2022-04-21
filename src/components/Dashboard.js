import React from 'react'
import Header from './Header'
import ProjectItem from './ProjectItem'
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Dashboard = ({ onUpdate, projects, onSetCurrentProject }) => {
  const navigate = useNavigate();
  const onClick = () => {
    //onUpdate(true);
  }

  onSetCurrentProject();

  const newProject = () => {
    navigate("/newproject");
  }

  const [searchString, setSearchString] = useState("");
  const [filteredProjects, setFilteredProjects] = useState([])

  const filterProjects = (search) => {
    setSearchString(search)

    var tempProjects = [];
    
    for(let i = 0; i < projects.length; i++) {
      let project = projects[i];
      if(project.name.toLowerCase().includes(search)) {
        tempProjects.push(project)
      }
    }
    setFilteredProjects(tempProjects);
  }

  return (
    <div className='main-body'>
      <Header title={'Dashboard'} />
      <div className='search-body'>
        <input value={searchString} onChange={(e) => filterProjects(e.target.value)} className='search-projects' type='text' placeholder='Search your projects' />
      </div>
      {searchString == "" ?
        <div className='dashboard'>
          <div className='dashboard-left'>
            <div className='recent-projects'>
              <div>
                <h2 className='box-header'>Recent Projects</h2>
                <div className='projects-body'>
                  {projects.map(project => (
                    <ProjectItem key={project.id} project={project} onUpdate={onUpdate} recent={true} />
                  ))}
                </div>
              </div>
              <div className='box-body'></div>
            </div>
            <div className='new-project' onClick={newProject}>
              <div >
                <h2 className='box-header'>New Project</h2>
                <div>
                  <p className='new-project-text'>Create a new empty project with contributors, description and buildings</p>
                </div>
              </div>
            </div>
          </div>
          <div className='your-projects'>
            <div>
              <h2 className='box-header'>Your Projects</h2>
            </div>
            <div className='projects-body'>
              {projects.map(project => (
                <ProjectItem key={project.id} project={project} onUpdate={onUpdate} />
              ))}
            </div>
          </div>
        </div>
        :
        <div className='search-project-body'>
          <h3 className='search-results-header'>Search results for: '{searchString}'</h3>
          {filteredProjects.map(project => (
                <ProjectItem key={project.id} project={project} onUpdate={onUpdate} recent={true}/>
              ))}
        </div>
      }
    </div>

  )
}

export default Dashboard