import React, { useState } from "react";
import PostSection from "./PostSection";
import TweetSection from "./TweetSection";

const HomePageLayout = () => {
  const [activeSection, setActiveSection] = useState('post');

  const navItems = [
    { id: 'post', label: 'Post' },
    { id: 'tweet', label: 'Tweet' },
  ];

  // Function to render the active section
  const renderSection = () => {
    switch (activeSection) {
      case 'post':
        return <PostSection />;
      case 'tweet':
        return <TweetSection />;
      default:
        return <PostSection />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Navigation */}
        <div className="flex justify-center bg-gray-800 rounded-lg p-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`px-6 py-2 rounded-md transition-all duration-200 ${
                activeSection === item.id
                  ? 'bg-gray-700 text-white'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Content Section */}
        <div className="w-full">
          {renderSection()}
        </div>
      </div>
    </div>
  );
};

export default HomePageLayout;