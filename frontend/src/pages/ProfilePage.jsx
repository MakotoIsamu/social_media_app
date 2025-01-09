import React, { useContext, useEffect, useState } from 'react';
import { BACKEND_URI } from '../utils';
import { AuthContext } from '../contexts/AuthContext';
import { Mail, Phone, Calendar, AtSign, Grid, Bookmark, Settings } from 'lucide-react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { token } = useContext(AuthContext);

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

  useEffect(() => {
    fetchUser();
  }, []);

  const Stats = ({ label, value }) => (
    <div className="flex flex-col items-center">
      <span className="font-semibold text-lg">{value}</span>
      <span className="text-sm text-gray-400">{label}</span>
    </div>
  );

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

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex items-center justify-center">
        <p className="text-red-500">Failed to load profile. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-8 mb-8">
          <img
            src={user.profilePicture || '/api/placeholder/150/150'}
            alt="Profile"
            className="rounded-full h-32 w-32 border-2 border-pink-500"
          />
          
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-4">
              <h1 className="text-xl font-semibold">{user.username}</h1>
              <Link to='/edit-profile' className="px-4 py-1 bg-blue-500 rounded-lg text-sm font-semibold">
                Edit Profile
              </Link>
              <Settings className="w-6 h-6 text-gray-400" />
            </div>
            
            <div className="flex gap-8 mb-4">
              <Stats label="Posts" value="0" />
              <Stats label="Followers" value="0" />
              <Stats label="Following" value="0" />
            </div>
            
            <div>
              <h2 className="font-semibold">{user.name}</h2>
              <p className="text-sm text-gray-400">
                Joined {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
            <Mail className="w-4 h-4" />
            {user.email}
          </div>
          {user.phoneNumber && (
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Phone className="w-4 h-4" />
              {user.phoneNumber}
            </div>
          )}
        </div>

        {/* Tabs */}
        <div className="border-t border-gray-700">
          <div className="flex justify-center gap-12">
            <button className="flex items-center gap-2 py-4 text-sm font-semibold border-t-2 border-white">
              <Grid className="w-4 h-4" />
              POSTS
            </button>
            <button className="flex items-center gap-2 py-4 text-sm font-semibold text-gray-400">
              <Bookmark className="w-4 h-4" />
              SAVED
            </button>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-3 gap-1">
          {[1, 2, 3].map((i) => (
            <div key={i} className="aspect-square bg-gray-800 flex items-center justify-center">
              <span className="text-gray-600">No posts yet</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;