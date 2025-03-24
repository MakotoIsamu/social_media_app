import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { X } from "lucide-react";
import { BACKEND_URI } from "../utils";
import { useNavigate } from "react-router-dom";

const MyPost = ({ postId, images, text, profilePicture, username, onDelete }) => {
  const [isPostModal, setIsPostModal] = useState(false);
  const navigate = useNavigate();

  const toggleModal = () => setIsPostModal((prev) => !prev);

  const handleDelete = async () => {
    try {
      const response = await fetch(`${BACKEND_URI}/api/post/delete/${postId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Failed to delete post");

      setIsPostModal(false);
      navigate("/");
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <>
      {/* Post Thumbnail */}
      <div
        className="aspect-square bg-gray-200 cursor-pointer rounded-lg overflow-hidden"
        onClick={toggleModal}
      >
        <img
          src={images[0]}
          alt={text}
          className="h-full w-full object-cover hover:scale-105 transition-transform duration-200"
        />
      </div>

      {/* Modal */}
      {isPostModal && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-white max-w-4xl w-full rounded-lg overflow-hidden flex flex-col md:flex-row h-[85vh] md:h-[80vh] relative">
            {/* Image Section */}
            <div className="md:w-7/12 bg-black flex items-center">
              {images.length > 1 ? (
                <Slider className="w-full">
                  {images.map((image, index) => (
                    <div key={index} className="aspect-square">
                      <img src={image} alt={`Slide ${index + 1}`} className="w-full h-full object-contain" />
                    </div>
                  ))}
                </Slider>
              ) : (
                <img src={images[0]} alt="PostImage" className="w-full h-full object-contain" />
              )}
            </div>

            {/* Post Details */}
            <div className="md:w-5/12 flex flex-col h-full bg-black text-white p-4">
              {/* Header */}
              <div className="flex justify-between items-center border-b border-gray-700 pb-4">
                <div className="flex items-center space-x-3">
                  <img src={profilePicture} alt="" className="h-10 w-10 rounded-full object-cover" />
                  <span className="font-medium text-lg">@{username}</span>
                </div>
              </div>

              {/* Post Text */}
              <div className="flex-1 overflow-auto p-4 text-gray-300">
                <p className="text-sm">{text}</p>
              </div>

              {/* Actions */}
              <div className="flex justify-end space-x-4 mt-4">
                <button
                  onClick={handleDelete}
                  className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-md transition-all"
                >
                  Delete
                </button>
                <button
                  onClick={toggleModal}
                  className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition-all"
                >
                  Close
                </button>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={toggleModal}
              className="absolute top-3 right-3 text-white bg-gray-800 hover:bg-gray-700 p-2 rounded-full transition"
            >
              <X size={22} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default MyPost;
