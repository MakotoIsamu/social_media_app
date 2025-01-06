// AddPost.jsx
import { Plus } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

const AddPost = () => {
  return (
    <Link
      to="/addPost"
      className="fixed bottom-20 right-6 z-50 h-14 w-14 sm:h-16 sm:w-16 
                 rounded-full bg-blue-600 shadow-lg
                 flex justify-center items-center
                 transition duration-200 hover:bg-blue-700
                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
    >
      <Plus className="text-white w-6 h-6 sm:w-7 sm:h-7" />
    </Link>
  );
};

export default AddPost;