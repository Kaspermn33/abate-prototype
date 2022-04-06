import Header from "./Header"
import Project from "./Project"

const Projects = ({projects}) => {

    
  return (
    <>
        <Header/>
        {projects.map(project => (
            <Project key={project.id} project={project}/>
        ))}
    </>
  )
}

export default Projects