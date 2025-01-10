import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Upload, X, PlayCircle, Video } from 'lucide-react';

const UploadShorts = () => {
  const [video, setVideo] = useState(null);
  const [caption, setCaption] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const videoRef = useRef(null);
  const fileInputRef = useRef(null);

  const handleVideoUpload = (files) => {
    const file = files[0];
    if (file && file.type.startsWith('video/')) {
      setVideo({
        url: URL.createObjectURL(file),
        file
      });
    } else {
      alert('Please upload a valid video file');
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    handleVideoUpload(files);
  };

  const removeVideo = () => {
    if (video) {
      URL.revokeObjectURL(video.url);
    }
    setVideo(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting:', { video: video?.file, caption });
    // Handle submission logic here
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      {/* Header */}
      <div className="border-b border-gray-800">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link 
            to="/" 
            className="p-2 hover:bg-gray-800 rounded-full transition-colors"
          >
            <ArrowLeft className="text-gray-400 hover:text-white" size={24} />
          </Link>
          <button
            onClick={handleSubmit}
            disabled={!video}
            className={`px-6 py-2 rounded-full font-medium transition-all
              ${!video 
                ? 'bg-purple-600/50 text-gray-400 cursor-not-allowed'
                : 'bg-purple-600 text-white hover:bg-purple-700'
              }`}
          >
            Upload Shorts
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Upload/Preview Section */}
          <div 
            className={`aspect-[9/16] rounded-2xl overflow-hidden relative
              ${isDragging ? 'border-2 border-purple-500' : 'border border-gray-700'}
              ${!video ? 'bg-gray-800/50' : 'bg-black'}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {!video ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                <Video size={48} className="text-gray-400 mb-4" />
                <h3 className="text-white text-lg font-medium mb-2">Drag and drop your video here</h3>
                <p className="text-gray-400 text-center mb-4">or</p>
                <label className="px-6 py-3 bg-purple-600 text-white rounded-full cursor-pointer hover:bg-purple-700 transition-colors">
                  <span className="flex items-center gap-2">
                    <Upload size={20} />
                    Select Video
                  </span>
                  <input
                    type="file"
                    accept="video/*"
                    onChange={(e) => handleVideoUpload(e.target.files)}
                    className="hidden"
                    ref={fileInputRef}
                  />
                </label>
                <p className="text-gray-500 text-sm mt-4 text-center">
                  Maximum duration: 60 seconds
                </p>
              </div>
            ) : (
              <>
                <video
                  ref={videoRef}
                  src={video.url}
                  className="w-full h-full object-contain bg-black"
                  controls
                />
                <button
                  onClick={removeVideo}
                  className="absolute top-4 right-4 p-2 bg-red-500 rounded-full hover:bg-red-600 transition-colors"
                >
                  <X size={20} className="text-white" />
                </button>
              </>
            )}
          </div>

          {/* Caption Section */}
          <div className="bg-gray-800/50 rounded-2xl p-6">
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Write a caption for your shorts..."
              className="w-full h-32 bg-transparent text-white placeholder-gray-500 resize-none focus:outline-none"
              maxLength={200}
            />
            <div className="flex justify-end mt-2">
              <span className="text-gray-400 text-sm">
                {caption.length}/200
              </span>
            </div>
            <div className="mt-6">
              <h3 className="text-white font-medium mb-4">Tips for great shorts:</h3>
              <ul className="text-gray-400 space-y-2">
                <li className="flex items-center gap-2">
                  <PlayCircle size={16} />
                  Keep it short and engaging
                </li>
                <li className="flex items-center gap-2">
                  <PlayCircle size={16} />
                  Use vertical orientation (9:16)
                </li>
                <li className="flex items-center gap-2">
                  <PlayCircle size={16} />
                  Add a descriptive caption
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadShorts;