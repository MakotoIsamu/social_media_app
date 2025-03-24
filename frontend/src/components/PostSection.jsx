import React, { useEffect, useState } from "react";
import PostComponent from "./PostComponent";
import { toast } from "react-toastify";
import { BACKEND_URI } from "../utils";

const PostSection = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleFetchPost = async () => {
    try {
      const response = await fetch(`${BACKEND_URI}/api/post/`);
      if (!response.ok) {
        const data = await response.json();
        return toast.error(data.error);
      }
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      toast.error("Failed to fetch posts");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleFetchPost();
  }, []);

  return (
    <div className="w-full">
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
              name={post.user?.name || "Unknown"}  // Use optional chaining
              username={post.user?.username || "unknown"}
              profilePicture={post.user?.profilePicture || "/default-avatar.png"}
              id={post.user?._id || ""}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default PostSection;
