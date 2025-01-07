import React, { useRef, useState } from "react";
import reel from "../assets/reel.mp4";
import {
  MessageCircle,
  Pause,
  Play,
  SquareArrowDownRight,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";

const ReelsPage = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  // Toggle play/pause
  const handlePlaying = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="h-screen bg-gradient-to-b from-gray-900 to-black w-full overflow-hidden">
      <div className="mx-auto max-w-sm h-full overflow-x-hidden overflow-y-auto">
        <div className="h-full w-full relative cursor-pointer">
          {/* Video element */}
          <video
            src={reel}
            ref={videoRef}
            loop
            className="h-full w-full object-cover"
          ></video>

          {/* Action buttons */}
          <div className="absolute top-0 right-0 p-4 h-full flex flex-col gap-6 justify-end">
            <div className="p-4 rounded-full bg-black text-white cursor-pointer">
              <ThumbsUp />
            </div>
            <div className="p-4 rounded-full bg-black text-white cursor-pointer">
              <ThumbsDown />
            </div>
            <div className="p-4 rounded-full bg-black text-white cursor-pointer">
              <MessageCircle />
            </div>
            <div className="p-4 rounded-full bg-black text-white cursor-pointer">
              <SquareArrowDownRight />
            </div>
          </div>

          {/* Play/Pause Button */}
          {isPlaying ? (
            <div
              className="p-4 rounded-full absolute top-5 left-5 text-white bg-gray-900 cursor-pointer"
              onClick={handlePlaying}
            >
              <Pause />
            </div>
          ) : (
            <div
              className="p-4 rounded-full absolute top-5 left-5 text-white bg-gray-900 cursor-pointer"
              onClick={handlePlaying}
            >
              <Play />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReelsPage;
