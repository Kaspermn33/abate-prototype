import React from 'react'
import { FaFolder } from 'react-icons/fa'
import { useNavigate, generatePath } from "react-router-dom";

const ProjectItem = ({ project, onUpdate, recent }) => {
    const navigate = useNavigate();
    const onClick = () => {
        onUpdate(true);
        loadProject(project);
    }

    const loadProject = (project) => {
        console.log(project)
        navigate(generatePath('project/:id', { id: project.id }));
    }

    return (
        <div className='project-item'> 
            {!recent 
            ? <div className='project-item-container' onClick={onClick}><FaFolder className='project-item-icon'/> <h3 className='project-item-text' > {project.name}</h3></div>
            : <div className='project-item-container' onClick={onClick}><FaFolder className='project-item-icon'/> <h3 className='project-item-text' > {project.name} Last worked on {project.lastEdit}</h3></div>
            }
        </div>
    )
}

export default ProjectItem