// PostComponent.jsx
import { Heart, MessageCircle, Share2 } from 'lucide-react';
import React, { useState, useEffect } from 'react';

const PostComponent = ({text, images, name, username, profilePicture}) => {
  return (
    <div className="w-full p-4 bg-white/10 backdrop-blur-sm rounded-xl ring-1 ring-white/10">
      <div className="flex gap-4">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <div className="h-12 w-12 rounded-full bg-gray-700 overflow-hidden ring-2 ring-white/10">
            <img src={profilePicture} alt="" className="h-full w-full object-cover" />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex gap-2 items-center mb-2">
            <p className="font-bold text-white truncate">{name}</p>
            <p className="text-gray-400 text-sm truncate">@{username}</p>
          </div>

          {/* Post Text */}
          <p className="text-gray-200 mb-4">
            {text}
          </p>

          {/* Images Grid */}
          {images && images.length > 0 && (
            <div className={`grid gap-2 mb-4 ${
              images.length === 1 ? 'grid-cols-1' : 
              images.length === 2 ? 'grid-cols-2' :
              images.length === 3 ? 'grid-cols-2' :
              'grid-cols-2'
            }`}>
              {images.map((image, index) => (
                <div 
                  key={index} 
                  className={`relative rounded-xl overflow-hidden ${
                    images.length === 3 && index === 0 ? 'col-span-2' : ''
                  }`}
                >
                  <img 
                    src={image} 
                    alt={`Post ${index + 1}`}
                    className="w-full h-full object-cover aspect-square"
                  />
                </div>
              ))}
            </div>
          )}

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
