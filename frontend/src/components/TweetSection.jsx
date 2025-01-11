import React, { useEffect, useState } from "react";
import { BACKEND_URI } from "../utils";
import { toast } from "react-toastify";
import TweetComponent from "./TweetComponent";

const TweetSection = () => {
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTweets = async () => {
    try {
        const response = await fetch(`${BACKEND_URI}/api/tweet/`)
        if(!response.ok) {
            const data = await response.json()
            return toast.error(data.error)
        }
        const data = await response.json()
        setTweets(data) 
    } catch (error) {
        console.error(error.message)
    } finally {
        setLoading(false)
    }
  }

  useEffect(() => {
    fetchTweets()
  }, [])

  if(loading) {
    return <p className="text-white text-center w-full text-xl">Loading Tweets...</p>
  }

  return (
    <div className="w-full">
        {
            tweets.map((tweet, i) => (
                <TweetComponent 
                    key={i} 
                    tweet={tweet.tweet} 
                    name={tweet.user.name} 
                    username={tweet.user.username} 
                    profilePicture={tweet.user.profilePicture}
                    id={tweet.user._id} 
                />
            ))
        }
    </div>
  )
};

export default TweetSection;
