import {FaFolder} from 'react-icons/fa'
import { useParams } from 'react-router-dom';
import Header from './Header'
const Project = ({projects}) => {
  const { id } = useParams()
  const project = projects.find(project => project.id == id)
  return (
    <div className='project'> 
      <Header title={project.name}/>
        <h3><FaFolder/>{project.name}</h3>
    </div>
  )
}

export default Project