import React, { useContext, useState } from "react";
import { BACKEND_URI } from "../utils";
import {AuthContext} from '../contexts/AuthContext'
import {useNavigate} from 'react-router-dom'
import { toast } from "react-toastify";

const AddTweetPage = () => {
  const [text, setText] = useState("");
  const [images, setImages] = useState([]);
  const {Auth, token} = useContext(AuthContext)
  const navigate = useNavigate()

  const maxLength = 280;

  const handleFilesChange = (e) => {
    const files = e.target.files;
    if (files.length > 5) {
      alert("You can only upload a maximum of 5 images.");
      return;
    }
    const selectedFiles = Array.from(files); 
    setImages(selectedFiles); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!Auth){
      return navigate('/login')
    }
    
    const formData = new FormData();
    formData.append('text', text);
    images.forEach((image) => {
      formData.append('images', image);
    });

    const response = await fetch(`${BACKEND_URI}/api/post/add`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    });

    const data = await response.json();
    if (!response.ok) {
      return toast.error(data.error);
    }
    setText('')
    toast.success(data.message);
  };

  const remainingChars = maxLength - text.length;
  const isNearLimit = remainingChars <= 20;
  const isAtLimit = remainingChars === 0;

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-gray-900 to-black">
      <div className="h-full max-w-2xl mx-auto px-4 py-6 sm:py-8">
        <div className="flex flex-col bg-white/10 backdrop-blur-lg rounded-xl p-4 sm:p-6 shadow-xl ring-1 ring-white/10">
          <form className="flex-1 mb-4" onSubmit={handleSubmit}>
            <textarea
              value={text}
              maxLength={maxLength}
              onChange={(e) => setText(e.target.value)}
              placeholder="What's happening?"
              className="w-full h-96 rounded-lg bg-black/50 border border-gray-600 
                         text-white placeholder-gray-400 p-4 resize-none
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                         transition duration-200"
            />
            <div className="flex justify-between items-center">
              <input type="file"
                className="p-2 rounded-full hover:bg-white/10 transition duration-200
                           text-gray-400 hover:text-blue-400 focus:outline-none
                           focus:ring-2 focus:ring-blue-500"
                multiple
                accept="image/*"
                name="images"
                onChange={handleFilesChange}
              />
              <div className="flex items-center gap-4">
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
                <button type="submit"
                  disabled={text.trim() === "" || isAtLimit}
                  className={`px-6 py-2 rounded-full font-medium transition duration-200
                             focus:outline-none focus:ring-2 focus:ring-offset-2
                             focus:ring-offset-gray-900
                             ${
                               text.trim() === "" || isAtLimit
                                 ? "bg-blue-600/50 text-gray-300 cursor-not-allowed"
                                 : "bg-blue-600 text-white hover:bg-blue-700"
                             }`}
                >
                  Post
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTweetPage;
