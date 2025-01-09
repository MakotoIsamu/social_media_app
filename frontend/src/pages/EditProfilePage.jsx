import React, { useContext, useEffect, useState } from "react";
import { BACKEND_URI } from "../utils";
import { AuthContext } from "../contexts/AuthContext";
import { toast } from "react-toastify";

const EditProfilePage = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [loading, setLoading] = useState(true)
  const { token } = useContext(AuthContext);

  useEffect(() => {
    fetchUserDetails()
  }, [token])

  const fetchUserDetails = async() => {
    try {
      const response = await fetch(`${BACKEND_URI}/api/auth/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if(!response.ok){
        return toast.error(`Error fetching Profile detail's`)
      }
      const data = await response.json()
      setName(data.name || "");
      setUsername(data.username || "");
      setPhoneNumber(data.phoneNumber || "");
    } catch (error) {
      toast.error('Network error! Please try again.')
    } finally {
      setLoading(false)
    }
  }
  
  const formData = new FormData()
  formData.append('name', name)
  formData.append('username', username)
  formData.append('phoneNumber', phoneNumber)
  if (profilePicture) formData.append('profilePicture', profilePicture)
  
  const handleEdit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(`${BACKEND_URI}/api/user/edit`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData
      });
      if(!response.ok){
        const data = await response.json()
        return toast.error(data.error)
      }
      const data = await response.json()
      toast.success(data.message)
      fetchUserDetails()
    } catch (error) {
      toast.error('Network error! Please try again.')
    } finally {
      setLoading(false)
    }
  };

  if(loading) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-b from-gray-900 to-black p-4">
        <div className="max-w-md mx-auto">
          <div className="animate-pulse space-y-6">
            {/* Profile Picture Input Skeleton */}
            <div className="space-y-2">
              <div className="h-4 w-32 bg-gray-700 rounded"></div>
              <div className="h-10 w-full bg-gray-700 rounded"></div>
            </div>

            {/* Name Input Skeleton */}
            <div className="space-y-2">
              <div className="h-4 w-24 bg-gray-700 rounded"></div>
              <div className="h-10 w-full bg-gray-700 rounded"></div>
            </div>

            {/* Username Input Skeleton */}
            <div className="space-y-2">
              <div className="h-4 w-28 bg-gray-700 rounded"></div>
              <div className="h-10 w-full bg-gray-700 rounded"></div>
            </div>

            {/* Phone Number Input Skeleton */}
            <div className="space-y-2">
              <div className="h-4 w-36 bg-gray-700 rounded"></div>
              <div className="h-10 w-full bg-gray-700 rounded"></div>
            </div>

            {/* Submit Button Skeleton */}
            <div className="h-10 w-32 bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-900 to-black p-4">
      <div className="max-w-md mx-auto">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 sm:p-8 shadow-xl ring-1 ring-white/10">
          <h2 className="text-2xl font-bold text-white mb-6">Edit Profile</h2>
          
          <form onSubmit={handleEdit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="profilePic" className="block text-sm font-medium text-gray-200">
                Profile Picture
              </label>
              <input
                type="file"
                name="profilePicture"
                onChange={(e) => setProfilePicture(e.target.files[0])}
                accept="image/*"
                className="w-full px-3 py-2 bg-black/50 border border-gray-600 rounded-lg text-white
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium text-gray-200">
                Name
              </label>
              <input
                type="text"
                value={name}
                name="name"
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 bg-black/50 border border-gray-600 rounded-lg text-white
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="username" className="block text-sm font-medium text-gray-200">
                Username
              </label>
              <input
                type="text"
                value={username}
                name="username"
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 bg-black/50 border border-gray-600 rounded-lg text-white
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-200">
                Phone Number
              </label>
              <input
                type="tel"
                value={phoneNumber}
                name="phoneNumber"
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full px-3 py-2 bg-black/50 border border-gray-600 rounded-lg text-white
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg font-medium
                       hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 
                       focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfilePage;
