import React, { useContext, useEffect, useState } from 'react';
import { BACKEND_URI } from '../utils';
import { AuthContext } from '../contexts/AuthContext';
import { Mail, Phone, Grid, Twitter, Video } from 'lucide-react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import MyPost from '../components/MyPost';
import Logout from '../components/Logout';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [tweets, setTweets] = useState([]);
  const [shorts, setShorts] = useState([]);
  const [activeTab, setActiveTab] = useState('posts');
  const [loading, setLoading] = useState(true);
  const { Auth, token } = useContext(AuthContext);

  const fetchUser = async () => {
    try {
      const response = await fetch(`${BACKEND_URI}/api/auth/profile`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error);
      }
      const data = await response.json();
      setUser(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchPosts = async () => {
    try {
      const response = await fetch(`${BACKEND_URI}/api/post/my-post`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error);
      }
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchTweets = async () => {
    try {
      const response = await fetch(`${BACKEND_URI}/api/tweet/my-tweets`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error);
      }
      const data = await response.json();
      setTweets(data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchShorts = async () => {
    try {
      const response = await fetch(`${BACKEND_URI}/api/shorts/my-shorts`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error);
      }
      const data = await response.json();
      setShorts(data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchPosts();
    fetchTweets();
    fetchShorts();
  }, []);

  const Stats = ({ label, value }) => (
    <div className="flex flex-col items-center">
      <span className="font-semibold text-lg">{value}</span>
      <span className="text-sm text-gray-400">{label}</span>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'posts':
        return (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1 md:gap-2">
            {posts.map((post, i) => (
              <MyPost 
                images={post.images} 
                text={post.text} 
                name={user.name} 
                username={user.username} 
                profilePicture={user.profilePicture} 
                key={i} 
              />
            ))}
          </div>
        );
      case 'tweets':
        return (
          <div className="space-y-4">
            {tweets.map((tweet, i) => (
              <div key={i} className="bg-gray-800/30 rounded-lg p-4">
                <p>{tweet.tweet}</p>
                {/* Add more tweet details as needed */}
              </div>
            ))}
          </div>
        );
      case 'shorts':
        return (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1 md:gap-2">
            {shorts.map((short, i) => (
              <div key={i} className="aspect-[9/16] bg-gray-800/30 rounded-lg">
                <video src={short.video} ></video>
                <p className="p-2">{short.caption}</p>
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

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
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-4 bg-gray-700 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header Section */}
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
                <div className="flex justify-center gap-2 w-full sm:w-auto">
                  <Link 
                    to='/edit-profile' 
                    className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-semibold transition-colors"
                  >
                    Edit Profile
                  </Link>
                  {Auth && <Logout />}
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-4 bg-gray-800/50 rounded-lg p-4">
                <Stats label="Posts" value={posts.length} />
                <Stats label="Tweets" value={tweets.length} />
                <Stats label="Shorts" value={shorts.length} />
              </div>
              
              <div className="text-center md:text-left">
                <h2 className="font-semibold text-lg">{user.name}</h2>
                <p className="text-sm text-gray-400">
                  Joined {new Date(user.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Info */}
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

        {/* Tabs */}
        <div className="border-t border-gray-800">
          <div className="flex justify-center gap-12">
            <button 
              onClick={() => setActiveTab('posts')}
              className={`flex items-center gap-2 py-4 text-sm font-semibold transition-colors ${
                activeTab === 'posts' ? 'border-t-2 border-pink-500 text-pink-500' : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              <Grid className="w-4 h-4" />
              POSTS
            </button>
            <button 
              onClick={() => setActiveTab('tweets')}
              className={`flex items-center gap-2 py-4 text-sm font-semibold transition-colors ${
                activeTab === 'tweets' ? 'border-t-2 border-pink-500 text-pink-500' : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              <Twitter className="w-4 h-4" />
              TWEETS
            </button>
            <button 
              onClick={() => setActiveTab('shorts')}
              className={`flex items-center gap-2 py-4 text-sm font-semibold transition-colors ${
                activeTab === 'shorts' ? 'border-t-2 border-pink-500 text-pink-500' : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              <Video className="w-4 h-4" />
              SHORTS
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="py-8">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;