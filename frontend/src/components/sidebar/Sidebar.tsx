
import SearchInput from './SearchInput'
import Conversations from './Conversations'
import LogoutButton from './LogoutButton'

const sidebar = () => {
  return (
    <div className='border-r border-slate-500 p-4 flex flex-col'>
        <SearchInput/>
        <div className='divider px-3'></div>
        <Conversations/>
        <div className='divider px-3'></div>
        <LogoutButton/>
    </div>
  )
}   

export default sidebar