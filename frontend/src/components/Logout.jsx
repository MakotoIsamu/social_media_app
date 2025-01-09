import React, { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
const Logout = () => {
    const {setAuth} = useContext(AuthContext)

    const handleLogout = () => {
        localStorage.removeItem('AuthToken')
        setAuth(false)
    }
  return (
    <div onClick={handleLogout} className='bg-red-600 text-white px-4 py-1 cursor-pointer rounded-md'>Logout</div>
  )
}

export default Logout