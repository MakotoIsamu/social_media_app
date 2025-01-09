import React, { useContext, useState } from "react";
import { BACKEND_URI } from "../utils";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddTweetPage = () => {
  const [text, setText] = useState("");
  const [images, setImages] = useState([]);
  const { Auth, token } = useContext(AuthContext);
  const navigate = useNavigate();

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

    const formData = new FormData();
    formData.append("text", text);
    images.forEach((image) => {
      formData.append("images", image);
    });

    const response = await fetch(`${BACKEND_URI}/api/post/add`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await response.json();
    if (!response.ok) {
      return toast.error(data.error);
    }
    setText("");
    navigate("/profile");
    toast.success(data.message);
  };

  const remainingChars = maxLength - text.length;
  const isNearLimit = remainingChars <= 20;
  const isAtLimit = remainingChars === 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black p-4">
      <div className="max-w-md mx-auto bg-white/10 backdrop-blur-lg rounded-xl p-4 shadow-lg ring-1 ring-white/10">
        <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
          <textarea
            value={text}
            maxLength={maxLength}
            onChange={(e) => setText(e.target.value)}
            placeholder="What's happening?"
            className="w-full h-40 rounded-lg bg-black/50 border border-gray-600 
                       text-white placeholder-gray-400 p-3 resize-none
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                       transition duration-200"
          />
          <div className="flex flex-col sm:flex-row sm:justify-between items-center space-y-4 sm:space-y-0">
            <input
              type="file"
              multiple
              accept="image/*"
              name="images"
              onChange={handleFilesChange}
              className="text-sm text-gray-300"
            />
            <div className="flex items-center space-x-4">
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
              <button
                type="submit"
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
  );
};

export default AddTweetPage;
