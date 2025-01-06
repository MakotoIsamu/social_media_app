import React, { useState } from "react";
import { ImageUp } from "lucide-react";

const AddTweetPage = () => {
  const [tweet, setTweet] = useState("");
  const maxLength = 280;

  const handleTweetSubmit = () => {
    if (tweet.trim() === "") {
      alert("Tweet cannot be empty!");
      return;
    }
    alert("Tweet submitted: " + tweet);
    setTweet("");
  };

  const remainingChars = maxLength - tweet.length;
  const isNearLimit = remainingChars <= 20;
  const isAtLimit = remainingChars === 0;

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-gray-900 to-black">
      <div className="h-full max-w-2xl mx-auto px-4 py-6 sm:py-8">
        {/* Card Container */}
        <div className=" flex flex-col bg-white/10 backdrop-blur-lg rounded-xl p-4 sm:p-6 shadow-xl ring-1 ring-white/10">
          {/* Textarea Container */}
          <div className="flex-1 mb-4">
            <textarea
              value={tweet}
              maxLength={maxLength}
              onChange={(e) => setTweet(e.target.value)}
              placeholder="What's happening?"
              className="w-full h-96 rounded-lg bg-black/50 border border-gray-600 
                         text-white placeholder-gray-400 p-4 resize-none
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                         transition duration-200"
            />
          </div>

          {/* Bottom Actions Bar */}
          <div className="flex justify-between items-center">
            {/* Left Side - Image Upload */}
            <button
              className="p-2 rounded-full hover:bg-white/10 transition duration-200
                         text-gray-400 hover:text-blue-400 focus:outline-none
                         focus:ring-2 focus:ring-blue-500"
            >
              <ImageUp className="w-6 h-6" />
            </button>

            {/* Right Side - Character Count & Submit Button */}
            <div className="flex items-center gap-4">
              {/* Character Counter */}
              <span
                className={`text-sm font-medium
                ${
                  isAtLimit
                    ? "text-red-400"
                    : isNearLimit
                    ? "text-yellow-400"
                    : "text-gray-400"
                }`}
              >
                {remainingChars}
              </span>

              {/* Submit Button */}
              <button
                onClick={handleTweetSubmit}
                disabled={tweet.trim() === "" || isAtLimit}
                className={`px-6 py-2 rounded-full font-medium transition duration-200
                           focus:outline-none focus:ring-2 focus:ring-offset-2
                           focus:ring-offset-gray-900
                           ${
                             tweet.trim() === "" || isAtLimit
                               ? "bg-blue-600/50 text-gray-300 cursor-not-allowed"
                               : "bg-blue-600 text-white hover:bg-blue-700"
                           }`}
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTweetPage;