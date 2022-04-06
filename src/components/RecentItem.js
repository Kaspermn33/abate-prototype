

const RecentItem = ({item}) => {
  return (
    <div className='recent-item' >{item.name} last edited {item.lastEdit}</div>
  )
}

export default RecentItem