import { Heart, MessageCircle, Share2 } from 'lucide-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const TweetComponent = ({tweet, name, username, profilePicture, id}) => {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <article className="w-full bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 p-4">
        <div className="flex-shrink-0">
          <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full overflow-hidden ring-2 ring-white/20">
            <img src={profilePicture} alt="" className="h-full w-full object-cover" />
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <Link to={`/${username}/${id}`} className="flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-2">
            <h2 className="font-semibold text-white truncate">{name}</h2>
            <p className="text-gray-400 text-sm truncate">@{username}</p>
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-2">
        <p className="text-gray-200 whitespace-pre-wrap mb-3">
          {tweet}
        </p>
      </div>

      {/* Actions */}
      <div className="px-4 py-3 border-t border-white/10">
        <div className="flex justify-between items-center">
          <button className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition">
            <MessageCircle className="w-5 h-5" />
            <span className="text-sm">123</span>
          </button>

          <div className="flex gap-6">
            <button className="flex items-center gap-2 text-gray-400 hover:text-green-400 transition">
              <Share2 className="w-5 h-5" />
              <span className="text-sm">123</span>
            </button>
            <button 
              className={`flex items-center gap-2 transition ${isLiked ? 'text-red-500' : 'text-gray-400 hover:text-red-400'}`}
              onClick={() => setIsLiked(!isLiked)}
            >
              <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
              <span className="text-sm">123</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default TweetComponent;
