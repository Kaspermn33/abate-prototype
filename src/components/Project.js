import {FaFolder} from 'react-icons/fa'
const Project = ({project}) => {
  return (
    <div className='project'>
        <h3><FaFolder/>{project.name}</h3>
        <p>{project.description}</p>
    </div>
  )
}

export default Project