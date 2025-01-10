import React from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Image, Video } from 'lucide-react';

const CreateSomething = () => {
  return (
    <div className="h-screen bg-gradient-to-b from-gray-900 to-black overflow-hidden">
      <div className="h-full grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
        <Link 
          to="/addTweet" 
          className="group relative flex items-center justify-center bg-gray-800/50 rounded-2xl overflow-hidden transition-all hover:bg-gray-800/70 hover:scale-[0.98] border border-gray-700"
        >
          <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="flex flex-col items-center gap-4 p-8">
            <Twitter size={48} className="text-blue-500 group-hover:scale-110 transition-transform" />
            <span className="text-xl font-semibold text-white">Tweet Something</span>
            <p className="text-gray-400 text-center">Share your thoughts with the world</p>
          </div>
        </Link>

        <Link 
          to="/addPost" 
          className="group relative flex items-center justify-center bg-gray-800/50 rounded-2xl overflow-hidden transition-all hover:bg-gray-800/70 hover:scale-[0.98] border border-gray-700"
        >
          <div className="absolute inset-0 bg-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="flex flex-col items-center gap-4 p-8">
            <Image size={48} className="text-purple-500 group-hover:scale-110 transition-transform" />
            <span className="text-xl font-semibold text-white">Post Something</span>
            <p className="text-gray-400 text-center">Share photos and memories</p>
          </div>
        </Link>

        <Link 
          to="/uploadShorts" 
          className="group relative flex items-center justify-center bg-gray-800/50 rounded-2xl overflow-hidden transition-all hover:bg-gray-800/70 hover:scale-[0.98] border border-gray-700"
        >
          <div className="absolute inset-0 bg-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="flex flex-col items-center gap-4 p-8">
            <Video size={48} className="text-red-500 group-hover:scale-110 transition-transform" />
            <span className="text-xl font-semibold text-white">Upload Shorts</span>
            <p className="text-gray-400 text-center">Share your video moments</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default CreateSomething;