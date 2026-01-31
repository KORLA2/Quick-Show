import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../../assets/assets'
import { User, UserCircleIcon, UserRound } from 'lucide-react'
import { useSelector } from 'react-redux'
import type { RootState } from '../../../utils/store'
import type { AdminType } from '../../types/AdminType'
const AdminNavbar = () => {

  let admin=useSelector((store:RootState)=>store.admin.Admin);
 
  return (
    <div className=' flex items-center justify-between px-6 md:px-40 h-16 border-b border-gray-300/30'>
<Link to="/">
<img src={assets.logo} className='w-36 h-auto'/>
</Link>

{

admin&&(<div className='flex gap-2 items-center cursor-pointer'>

<UserCircleIcon className='max-md:h-7 max-md:w-7 h-10 w-10 rounded-full'/>
<p className=' max-md:text-lg text-xl '> {admin?.name.slice(0,10)} {admin.name.length>10?"...":""} </p>

</div>
)
}
    </div>
  )
}

export default AdminNavbar