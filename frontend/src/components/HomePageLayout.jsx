// HomePageLayout.jsx
import React from 'react';
import PostComponent from './PostComponent';
import AddPost from './AddPost';

const HomePageLayout = () => {
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
        <PostComponent />
        <PostComponent />
      </div>
    </div>
  );
};

export default HomePageLayout;