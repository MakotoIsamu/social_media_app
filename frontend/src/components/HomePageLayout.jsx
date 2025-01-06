import React from 'react'
import PostComponent from './PostComponent'
import AddPost from './AddPost'

const FollowerPost = () => {
  return (
    <>
        <AddPost/>
        <div className='w-full flex justify-between mb-2'>
          <button className='active:bg-red-300 w-1/2 px-4 py-2 border-r-2'>For you</button>
          <button className='active:bg-red-300 w-1/2 px-4 py-2'>Following</button>
        </div>
        <div className='flex flex-col gap-3'>
          <PostComponent/>
          <PostComponent/>
          <PostComponent/>
          <PostComponent/>
          <PostComponent/>
          <PostComponent/>
        </div>
    </>
  )
}

export default FollowerPost