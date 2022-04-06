import React from 'react'
import { FaFolder } from 'react-icons/fa'
import { useNavigate, generatePath } from "react-router-dom";

const ProjectItem = ({ project, onUpdate }) => {
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
            <h3 onClick={onClick} >  <FaFolder />{project.name}</h3>
        </div>
    )
}

export default ProjectItem