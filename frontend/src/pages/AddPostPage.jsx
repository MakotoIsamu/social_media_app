import React, { useContext, useState } from "react";
import { BACKEND_URI } from "../utils";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { ImagePlus, X, ArrowLeft, Send, Image as ImageIcon } from "lucide-react";

const AddPostPage = () => {
  const [text, setText] = useState("");
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const { Auth, token } = useContext(AuthContext);
  const navigate = useNavigate();

  const maxLength = 280;

  const handleFilesChange = (e) => {
    const files = e.target.files;
    if (files.length > 5) {
      toast.error("You can only upload a maximum of 5 images.");
      return;
    }
    const selectedFiles = Array.from(files);
    setImages(selectedFiles);
    
    // Create preview URLs
    const newPreviews = selectedFiles.map(file => URL.createObjectURL(file));
    setPreviews(prev => {
      // Cleanup old previews
      prev.forEach(url => URL.revokeObjectURL(url));
      return newPreviews;
    });
  };

  const removeImage = (index) => {
    URL.revokeObjectURL(previews[index]);
    setPreviews(prev => prev.filter((_, i) => i !== index));
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("text", text);
    images.forEach((image) => {
      formData.append("images", image);
    });

    try {
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
      setPreviews([]);
      setImages([]);
      navigate("/profile");
      toast.success(data.message);
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  const remainingChars = maxLength - text.length;
  const isNearLimit = remainingChars <= 20;
  const isAtLimit = remainingChars === 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      {/* Header */}
      <div className="border-b border-gray-800">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link 
            to="/" 
            className="p-2 hover:bg-gray-800 rounded-full transition-colors"
          >
            <ArrowLeft className="text-gray-400 hover:text-white" size={24} />
          </Link>
          <button
            onClick={handleSubmit}
            disabled={text.trim() === "" || isAtLimit}
            className={`px-6 py-2 rounded-full font-medium transition-all flex items-center gap-2
              ${text.trim() === "" || isAtLimit
                ? 'bg-blue-600/50 text-gray-400 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
          >
            <Send size={18} />
            Post
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-2xl mx-auto p-4">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 shadow-xl ring-1 ring-white/10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="What's happening?"
              maxLength={maxLength}
              className="w-full min-h-[150px] bg-transparent text-white text-xl 
                       placeholder-gray-500 resize-none focus:outline-none"
            />

            {/* Image previews */}
            {previews.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {previews.map((preview, index) => (
                  <div key={index} className="relative aspect-square rounded-xl overflow-hidden">
                    <img
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 p-1.5 bg-black/50 hover:bg-black/70 
                               rounded-full transition-colors"
                    >
                      <X size={16} className="text-white" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Bottom bar */}
            <div className="flex items-center justify-between border-t border-gray-700 pt-4">
              <label className="p-2 hover:bg-gray-700/50 rounded-full cursor-pointer transition-colors">
                <ImagePlus size={24} className="text-blue-500" />
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFilesChange}
                  className="hidden"
                />
              </label>

              {/* Character counter */}
              <div className="flex items-center gap-2">
                <div className="w-[40px] h-[40px] relative">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="20"
                      cy="20"
                      r="16"
                      strokeWidth="3"
                      fill="transparent"
                      stroke="#1f2937"
                      className="transition-all"
                    />
                    <circle
                      cx="20"
                      cy="20"
                      r="16"
                      strokeWidth="3"
                      fill="transparent"
                      stroke={isAtLimit ? "#ef4444" : isNearLimit ? "#f59e0b" : "#3b82f6"}
                      strokeDasharray={2 * Math.PI * 16}
                      strokeDashoffset={2 * Math.PI * 16 * (1 - text.length / maxLength)}
                      className="transition-all"
                    />
                  </svg>
                  <span className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                    text-sm font-medium ${
                      isAtLimit
                        ? "text-red-500"
                        : isNearLimit
                        ? "text-yellow-500"
                        : "text-blue-500"
                    }`}>
                    {remainingChars}
                  </span>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPostPage;