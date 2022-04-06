import User from "./User"

const Header = ({title}) => {
  return (
    <div className='header' style={{display:'table'}}>
        <h1 style={{display:'table-cell'}}>{title}</h1>
        <User/>
        <hr className='header-separator' class='solid'/>
    </div>
  )
}

export default Header