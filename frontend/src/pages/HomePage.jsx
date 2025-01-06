import React from 'react'
import Sidebar from '../components/Sidebar'
import { Outlet, useLocation } from 'react-router-dom'
import HomePageLayout from '../components/HomePageLayout'

const HomePage = () => {
  const location = useLocation()
  return (
    <div className='w-full h-auto'>
      <Sidebar/>
      <main className='w-full min-h-screen overflow-y-auto overflow-hidden  pt-6 pl-6 pr-6 pb-20'>
        { location.pathname === '/' ? (
          <HomePageLayout/>
        ) : (
          <Outlet/>
        )
        }
      </main>
    </div>
  )
}

export default HomePage