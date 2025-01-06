import { Heart, MessageCircle, Share2 } from 'lucide-react'
import React from 'react'

const PostComponent = () => {
  return (
    <div className='w-full p-2 flex gap-3'>
        <div>
            <div className='h-10 w-10 rounded-full bg-white overflow-hidden'>
                <img src="" alt="" className='h-full w-full object-cover' />
            </div>
        </div>
        <div className='overflow-hidden'>
            <div className='flex gap-2'><p className='font-bold'>Dhruv Verma</p><p className='text-gray-600'>@dhruvverma</p></div>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quos at minima id ipsa impedit iure sapiente, voluptatum natus beatae fuga. Iste architecto perferendis obcaecati consectetur voluptas distinctio voluptates quos blanditiis.</p>
            <div className='flex justify-between py-2'>
                <span className='flex text-gray-600'><MessageCircle/>123</span>
                <div className='flex gap-3'>
                    <span className='flex text-gray-600'><Share2/>123</span>
                    <span className='flex text-gray-600'><Heart/>123</span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default PostComponent