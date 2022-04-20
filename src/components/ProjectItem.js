import React from 'react'
import { FaFolder } from 'react-icons/fa'
import { useNavigate, generatePath } from "react-router-dom";
import { styled } from "@mui/material/styles";

import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";

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

    const HtmlTooltip = styled(({ className, ...props }) => (
        <Tooltip {...props} classes={{ popper: className }} />
      ))(({ theme }) => ({
        [`& .${tooltipClasses.tooltip}`]: {
          backgroundColor: "#f5f5f9",
          color: "rgba(0, 0, 0, 0.87)",
          maxWidth: 220,
          fontSize: theme.typography.pxToRem(12),
          border: "1px solid #dadde9"
        }
      }));

    return (
        <div className='project-item'> 
        <HtmlTooltip
        title={
          <div>
            <p>Last edit on {project.lastEdit}</p>
          </div>
        }
        placement="right"
        arrow
      >
        <div className='project-item-container' onClick={onClick}><FaFolder className='project-item-icon'/> <h3 className='project-item-text' > {project.name}</h3></div>
      </HtmlTooltip>

            

        </div>
    )
}

export default ProjectItem