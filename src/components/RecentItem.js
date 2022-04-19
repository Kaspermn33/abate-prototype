import { useNavigate, generatePath } from "react-router-dom";

const RecentItem = ({type, item }) => {
  const navigate = useNavigate();
  const onClick = () => {
    
    

    switch (type){
      case 'lca':
        console.log("LCA")
        break;
      case 'screening':
        console.log("SCREENING")
        break;
      case 'costs':
        navigate(generatePath('cost/:costid', {costid: item.id}))
        break;
    }
  }

  return (
    <div>
    <div className='recent-item' onClick={onClick} >{item.name} last edited {item.lastEdit}</div>
    </div>
  )
}

export default RecentItem