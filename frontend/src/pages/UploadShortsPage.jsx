import React, { useState, useRef, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, X, PlayCircle, Video } from 'lucide-react';
import { toast } from 'react-toastify';
import { AuthContext } from '../contexts/AuthContext';
import { BACKEND_URI } from '../utils';

const UploadShorts = () => {
  const [video, setVideo] = useState(null);
  const [caption, setCaption] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const {token} = useContext(AuthContext)
  const videoRef = useRef(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleVideoUpload = (files) => {
    const file = files[0];
    if (file && file.type.startsWith('video/')) {
      // Check file size (limit to 100MB)
      if (file.size > 100 * 1024 * 1024) {
        toast.error('Video size should be less than 100MB');
        return;
      }
      setVideo({
        url: URL.createObjectURL(file),
        file
      });
    } else {
      toast.error('Please upload a valid video file');
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!video || !caption.trim()) {
      toast.error('Please add both video and caption');
      return;
    }

    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append('video', video.file);
      formData.append('caption', caption.trim());

      const response = await fetch(`${BACKEND_URI}/api/shorts/add`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to upload shorts');
      }

      toast.success('Shorts uploaded successfully!');
      navigate('/'); // Or wherever you want to redirect after successful upload
    } catch (error) {
      toast.error(error.message || 'Something went wrong');
      console.error('Upload error:', error);
    } finally {
      setIsUploading(false);
    }
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
            disabled={!video || isUploading}
            className={`px-6 py-2 rounded-full font-medium transition-all
              ${(!video || isUploading)
                ? 'bg-purple-600/50 text-gray-400 cursor-not-allowed'
                : 'bg-purple-600 text-white hover:bg-purple-700'
              }`}
          >
            {isUploading ? 'Uploading...' : 'Upload Shorts'}
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
                    disabled={isUploading}
                  />
                </label>
                <p className="text-gray-500 text-sm mt-4 text-center">
                  Maximum file size: 100MB
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
                  disabled={isUploading}
                  className="absolute top-4 right-4 p-2 bg-red-500 rounded-full hover:bg-red-600 transition-colors disabled:bg-red-500/50 disabled:cursor-not-allowed"
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
              disabled={isUploading}
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