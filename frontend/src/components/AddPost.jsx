import { Plus } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const AddPost = () => {
  return (
    <Link to='/addPost' className='fixed bottom-[100px] right-[24px] cursor-pointer h-16 w-16 rounded-full overflow-hidden bg-blue-400 flex justify-center items-center'>
      <Plus/>
    </Link>
  )
}

export default AddPost