import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useParams, Link } from 'react-router-dom';
import { BACKEND_URI } from '../utils';
import { Mail, Phone, Grid, Bookmark } from 'lucide-react';
import MyPost from '../components/MyPost';

const AccountPage = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const response = await fetch(`${BACKEND_URI}/api/user/id/${id}`);
      if (!response.ok) {
        const data = await response.json();
        return toast.error(data.error);
      }
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchPosts = async () => {
    try {
      const response = await fetch(`${BACKEND_URI}/api/post/get-post-by-user/${id}`);
      if (!response.ok) {
        const data = await response.json();
        return toast.error(data.error);
      }
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-4">
        <div className="max-w-4xl mx-auto animate-pulse">
          <div className="flex items-center gap-8 mb-8">
            <div className="rounded-full bg-gray-700 h-24 w-24"></div>
            <div className="flex-1">
              <div className="h-6 bg-gray-700 rounded w-1/3 mb-4"></div>
              <div className="h-4 bg-gray-700 rounded w-full"></div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 mb-8">
            {posts.map(() => (
              <div key={Math.random()} className="h-4 bg-gray-700 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex items-center justify-center">
        <p className="text-red-500">Failed to load profile. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="max-w-4xl mx-auto px-4">
        {/* Profile Header */}
        <div className="pt-6 pb-8">
          <div className="flex flex-col items-center md:flex-row md:items-start md:gap-8">
            <img
              src={user.profilePicture || '/api/placeholder/150/150'}
              alt="Profile"
              className="rounded-full h-24 w-24 md:h-32 md:w-32 object-cover border-2 border-pink-500 mb-4 md:mb-0"
            />
            <div className="flex-1 w-full">
              <div className="flex flex-col sm:flex-row items-center gap-3 mb-4">
                <h1 className="text-2xl font-semibold">{user.username}</h1>
              </div>

              {/* Stats Section */}
              <div className="grid grid-cols-3 gap-4 mb-4 bg-gray-800/50 rounded-lg p-4">
                <div className="flex flex-col items-center">
                  <span className="font-semibold text-lg">{posts.length}</span>
                  <span className="text-sm text-gray-400">Posts</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="font-semibold text-lg">0</span>
                  <span className="text-sm text-gray-400">Followers</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="font-semibold text-lg">0</span>
                  <span className="text-sm text-gray-400">Following</span>
                </div>
              </div>

              {/* User Info */}
              <div className="text-center md:text-left">
                <h2 className="font-semibold text-lg">{user.name}</h2>
                <p className="text-sm text-gray-400">
                  Joined {new Date(user.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-gray-800/30 rounded-lg p-4 mb-8 space-y-2">
          <div className="flex items-center gap-3 text-sm text-gray-300">
            <Mail className="w-5 h-5 text-pink-500" />
            {user.email}
          </div>
          {user.phoneNumber && (
            <div className="flex items-center gap-3 text-sm text-gray-300">
              <Phone className="w-5 h-5 text-pink-500" />
              {user.phoneNumber}
            </div>
          )}
        </div>

        {/* Tabs for Posts and Saved */}
        <div className="border-t border-gray-800">
          <div className="flex justify-center gap-12">
            <button className="flex items-center gap-2 py-4 text-sm font-semibold border-t-2 border-pink-500 text-pink-500 transition-colors">
              <Grid className="w-4 h-4" />
              POSTS
            </button>
            <button className="flex items-center gap-2 py-4 text-sm font-semibold text-gray-400 hover:text-gray-200 transition-colors">
              <Bookmark className="w-4 h-4" />
              SAVED
            </button>
          </div>
        </div>

        {/* Display Posts */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-1 md:gap-2">
          {posts.map((post) => (
            <MyPost 
              key={post._id} 
              images={post.images} 
              text={post.text} 
              name={user.name} 
              username={user.username} 
              profilePicture={user.profilePicture} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
