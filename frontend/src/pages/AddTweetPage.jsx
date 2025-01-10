import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Send } from 'lucide-react';

const AddTweet = () => {
  const [tweet, setTweet] = useState('');
  const charLimit = 280;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Tweet submitted:', tweet);
    // Handle tweet submission here
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      {/* Header */}
      <div className="border-b border-gray-800">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link 
            to="/" 
            className="p-2 hover:bg-gray-800 rounded-full transition-colors"
          >
            <ArrowLeft className="text-gray-400 hover:text-white" size={24} />
          </Link>
          <button
            onClick={handleSubmit}
            disabled={tweet.length === 0 || tweet.length > charLimit}
            className={`px-4 py-1.5 rounded-full font-medium transition-all
              ${tweet.length === 0 || tweet.length > charLimit
                ? 'bg-blue-600/50 text-gray-400 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
          >
            <span className="flex items-center gap-2">
              <Send size={18} />
              Tweet
            </span>
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-2xl mx-auto px-4 py-6">
        <div className="bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm">
          <form onSubmit={handleSubmit}>
            <textarea
              value={tweet}
              onChange={(e) => setTweet(e.target.value)}
              placeholder="What's happening?"
              className="w-full min-h-[150px] bg-transparent text-white text-xl placeholder-gray-500 
                        resize-none focus:outline-none"
              maxLength={charLimit}
            />
            
            {/* Character counter */}
            <div className="mt-4 flex items-center justify-end border-t border-gray-700 pt-4">
              <div className="flex items-center gap-2">
                <div className="w-[60px] h-[60px] relative">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="30"
                      cy="30"
                      r="24"
                      strokeWidth="3"
                      fill="transparent"
                      stroke="#1f2937"
                      className="transition-all"
                    />
                    <circle
                      cx="30"
                      cy="30"
                      r="24"
                      strokeWidth="3"
                      fill="transparent"
                      stroke={tweet.length > charLimit * 0.8 
                        ? tweet.length > charLimit * 0.9
                          ? "#ef4444"  // red
                          : "#f59e0b"  // yellow
                        : "#3b82f6"}   // blue
                      strokeDasharray={2 * Math.PI * 24}
                      strokeDashoffset={2 * Math.PI * 24 * (1 - tweet.length / charLimit)}
                      className="transition-all"
                    />
                  </svg>
                  <span className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                    font-medium ${
                      tweet.length > charLimit * 0.8
                        ? tweet.length > charLimit * 0.9
                          ? "text-red-500"
                          : "text-yellow-500"
                        : "text-blue-500"
                    }`}>
                    {charLimit - tweet.length}
                  </span>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTweet;