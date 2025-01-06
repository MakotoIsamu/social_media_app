import React, { useState } from "react";
import { ImageUp } from 'lucide-react'

const AddTweetPage = () => {
  const [tweet, setTweet] = useState("");
  const maxLength = 280;

  const handleTweetSubmit = () => {
    if (tweet.trim() === "") {
      alert("Tweet cannot be empty!");
      return;
    }
    alert("Tweet submitted: " + tweet);
    setTweet(""); // Reset tweet input
  };

  return (
    <div className="w-full">
      <textarea value={tweet} maxLength={maxLength} onChange={(e)=>setTweet(e.target.value)} className="w-full h-56 outline-none px-4 py-2 border bg-transparent"></textarea>
      <div className="flex justify-between items-center">
        <ImageUp/>
        <div className="flex gap-3 items-center">
          <span>{tweet.length}/{maxLength}</span>
          <button className="px-4 py-2 border" onClick={handleTweetSubmit}>Add Post</button>
        </div>
      </div>
    </div>
  );
};

export default AddTweetPage;
