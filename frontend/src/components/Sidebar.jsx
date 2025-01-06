import React from 'react'
import { Link } from 'react-router-dom'
import { Compass, Home, Search, Settings, TrendingUp } from 'lucide-react'
import luffy from '../assets/luffy.jpg'

const Sidebar = () => {
  return (
    <div className='fixed bg-black text-white bottom-0 left-0 w-full p-6 flex justify-between items-center border-t-2'>
       <Link to='/'><Home/></Link>
       <Link to='/search'><Search/></Link>
       <Link to='/'><Compass/></Link>
       <Link to='/'><TrendingUp/></Link>
       <Link to='/'><Settings/></Link>
       <Link to='/' className='h-8 w-8 rounded-full overflow-hidden' ><img src={luffy} alt="dhruv" className='h-full w-full object-cover' /></Link>
    </div>
  )
}

export default Sidebar