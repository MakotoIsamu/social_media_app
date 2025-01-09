// HomePageLayout.jsx
import React, { useEffect, useState } from 'react';
import PostComponent from './PostComponent';
import AddPost from './AddPost';
import { toast } from 'react-toastify';
import { BACKEND_URI } from '../utils';
 
const HomePageLayout = () => {
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const handleFetchPost = async () => {
    try {
      const response = await fetch(`${BACKEND_URI}/api/post/`);
      if(!response.ok){
        const data = await response.json()
        return toast.error(data.error)
      }
      const data = await response.json()
      setPosts(data)
    } catch (error) {
      toast.error("Failed to fetch posts")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    handleFetchPost()
  }, [])
  
  return (
    <div className="max-w-2xl mx-auto">
      <AddPost />
      {/* Tab Navigation */}
      <div className="w-full flex mb-6 bg-white/5 rounded-xl overflow-hidden backdrop-blur-sm">
        <button className="w-1/2 py-3 text-gray-200 font-medium border-r border-gray-700 
                         transition duration-200 hover:bg-white/10 active:bg-white/20
                         focus:outline-none focus:bg-white/10">
          For you
        </button>
        <button className="w-1/2 py-3 text-gray-200 font-medium
                         transition duration-200 hover:bg-white/10 active:bg-white/20
                         focus:outline-none focus:bg-white/10">
          Following
        </button>
      </div>
      {/* Posts Container */}
      <div className="flex flex-col gap-4">
        {isLoading ? (
          <div className="text-center text-gray-400">Loading posts...</div>
        ) : posts.length === 0 ? (
          <div className="text-center text-gray-400">No posts yet</div>
        ) : (
          posts.map((post, i) => (
            <PostComponent 
              key={i} 
              text={post.text} 
              images={post.images}
              name={post.user.name} 
              username={post.user.username} 
              profilePicture={post.user.profilePicture} 
            />
          ))
        )}
      </div>
    </div>
  );
};

export default HomePageLayout;