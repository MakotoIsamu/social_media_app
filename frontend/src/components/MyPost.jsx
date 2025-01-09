import React, { useState } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Heart, MessageCircle, Send, Bookmark, Trash2, X } from 'lucide-react';

const MyPost = ({ images, text, profilePicture, username }) => {
  const [isPostModal, setIsPostModal] = useState(false);

  const comments = [
    {
      username: "john_doe",
      text: "This is amazing! 🔥",
      profilePic: "https://randomuser.me/api/portraits/men/1.jpg"
    },
    {
      username: "sarah_smith",
      text: "Love the composition of this shot! 📸",
      profilePic: "https://randomuser.me/api/portraits/women/2.jpg"
    },
    {
      username: "photo_enthusiast",
      text: "What camera did you use for this?",
      profilePic: "https://randomuser.me/api/portraits/men/3.jpg"
    },
    {
      username: "travel_lover",
      text: "This location looks incredible! Where is this? ✈️",
      profilePic: "https://randomuser.me/api/portraits/women/4.jpg"
    },
    {
      username: "art_critic",
      text: "The lighting in this photo is perfect 👌",
      profilePic: "https://randomuser.me/api/portraits/men/5.jpg"
    },
    {
      username: "nature_explorer",
      text: "Such a stunning view! Nature at its best 🌲",
      profilePic: "https://randomuser.me/api/portraits/women/6.jpg"
    },
    {
      username: "tech_geek",
      text: "Great edit! Which filters did you use?",
      profilePic: "https://randomuser.me/api/portraits/men/7.jpg"
    },
    {
      username: "creative_soul",
      text: "This deserves to be in a gallery! 🎨",
      profilePic: "https://randomuser.me/api/portraits/women/8.jpg"
    },
    {
      username: "wanderlust_22",
      text: "Adding this to my travel bucket list! 🗺️",
      profilePic: "https://randomuser.me/api/portraits/men/9.jpg"
    },
    {
      username: "photo_pro",
      text: "The depth of field here is exceptional",
      profilePic: "https://randomuser.me/api/portraits/women/10.jpg"
    },
    {
      username: "urban_shooter",
      text: "Love the perspective! What lens did you use? 📷",
      profilePic: "https://randomuser.me/api/portraits/men/11.jpg"
    },
    {
      username: "light_chaser",
      text: "The golden hour vibes are strong in this one ✨",
      profilePic: "https://randomuser.me/api/portraits/women/12.jpg"
    },
    {
      username: "pixel_perfect",
      text: "This is absolutely breathtaking! 😍",
      profilePic: "https://randomuser.me/api/portraits/men/13.jpg"
    }
  ];

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    dots: false,
  };

  const handleModal = () => setIsPostModal(!isPostModal);

  return (
    <>
      <div className="aspect-square bg-gray-100 cursor-pointer" onClick={handleModal}>
        <img src={images[0]} alt={text} className="h-full w-full object-cover" />
      </div>

      {isPostModal && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-white max-w-6xl w-full rounded-lg overflow-hidden flex md:flex-row flex-col h-[90vh] md:h-[80vh]">
            {/* Left side - Image carousel */}
            <div className="md:w-7/12 bg-black flex items-center">
              {
                images.length === 1 ? (
                    <div className="aspect-square w-full">
                        <img src={images[0]} alt='PostImage' className="w-full h-full object-contain" />
                    </div>
                ):(
                    <Slider {...settings} className="w-full">
                        {images.map((image, index) => (
                        <div key={index} className="aspect-square">
                            <img src={image} alt={`Slide ${index + 1}`} className="w-full h-full object-contain" />
                        </div>
                        ))}
                    </Slider>
                )

              }
            </div>

            {/* Right side - Comments section */}
            <div className="md:w-5/12 flex flex-col h-full bg-black text-white">
              {/* Header */}
              <div className="p-4 flex justify-between items-center border-b border-gray-700">
                <div className="flex items-center space-x-3">
                  <img src={profilePicture} alt="" className="h-8 w-8 rounded-full object-cover" />
                  <span className="font-medium">@{username}</span>
                </div>
                <div className='text-red-700 text-xl'><Trash2/></div>
              </div>

              {/* Comments */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {/* Post caption */}
                <div className="flex space-x-3">
                  <img src={profilePicture} alt={username} className="h-8 w-8 rounded-full object-cover" />
                  <div>
                    <span className="font-medium">@{username}</span>
                    <span className="ml-2">{text}</span>
                  </div>
                </div>

                {/* Comments list */}
                {comments.map((comment, index) => (
                  <div key={index} className="flex space-x-3">
                    <img src={comment.profilePic} alt="" className="h-8 w-8 rounded-full object-cover" />
                    <div>
                      <span className="font-medium text-pink-500">@{comment.username}</span>
                      <span className="ml-2">{comment.text}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Action buttons */}
              <div className="p-4 border-t border-gray-700">
                <div className="flex justify-between mb-4">
                  <div className="flex space-x-4">
                    <Heart className="w-6 h-6 cursor-pointer text-white" />
                    <MessageCircle className="w-6 h-6 cursor-pointer text-white" />
                    <Send className="w-6 h-6 cursor-pointer text-white" />
                  </div>
                  <Bookmark className="w-6 h-6 cursor-pointer text-white" />
                </div>
              </div>
            </div>

            {/* Close button */}
            <button
              onClick={handleModal}
              className="absolute top-4 right-4 text-white p-2 rounded-full hover:bg-gray-800"
            >
              <X/>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default MyPost;