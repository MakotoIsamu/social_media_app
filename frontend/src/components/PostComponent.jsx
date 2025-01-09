// PostComponent.jsx
import { Heart, MessageCircle, Share2 } from 'lucide-react';
import React, { useState, useEffect } from 'react';

const PostComponent = ({text, image, name, username, profilePic}) => {
  const [loading, setLoading] = useState(true);

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return ( 
      <div className="w-full p-4 bg-white/10 backdrop-blur-sm rounded-xl ring-1 ring-white/10 animate-pulse">
        <div className="flex gap-4">
          {/* Skeleton Avatar */}
          <div className="h-12 w-12 rounded-full bg-gray-700" />

          {/* Skeleton Content */}
          <div className="flex-1 space-y-4">
            {/* Header Skeleton */}
            <div className="h-4 bg-gray-700 rounded w-1/3" />
            <div className="h-4 bg-gray-700 rounded w-1/5" />

            {/* Text Skeleton */}
            <div className="space-y-2">
              <div className="h-4 bg-gray-700 rounded w-full" />
              <div className="h-4 bg-gray-700 rounded w-3/4" />
              <div className="h-4 bg-gray-700 rounded w-2/3" />
            </div>

            {/* Actions Skeleton */}
            <div className="flex justify-between items-center">
              <div className="h-6 w-16 bg-gray-700 rounded" />
              <div className="flex gap-6">
                <div className="h-6 w-16 bg-gray-700 rounded" />
                <div className="h-6 w-16 bg-gray-700 rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full p-4 bg-white/10 backdrop-blur-sm rounded-xl ring-1 ring-white/10">
      <div className="flex gap-4">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <div className="h-12 w-12 rounded-full bg-gray-700 overflow-hidden ring-2 ring-white/10">
            <img src={profilePic} alt="" className="h-full w-full object-cover" />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex gap-2 items-center mb-2">
            <p className="font-bold text-white truncate">{name}</p>
            <p className="text-gray-400 text-sm truncate">{username}</p>
          </div>

          {/* Post Text */}
          <p className="text-gray-200 mb-4">
            {text}
          </p>

          {/* Actions */}
          <div className="flex justify-between items-center">
            <button className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition duration-200">
              <MessageCircle className="w-5 h-5" />
              <span className="text-sm">123</span>
            </button>

            <div className="flex gap-6">
              <button className="flex items-center gap-2 text-gray-400 hover:text-green-400 transition duration-200">
                <Share2 className="w-5 h-5" />
                <span className="text-sm">123</span>
              </button>
              <button className="flex items-center gap-2 text-gray-400 hover:text-red-400 transition duration-200">
                <Heart className="w-5 h-5" />
                <span className="text-sm">123</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostComponent;
