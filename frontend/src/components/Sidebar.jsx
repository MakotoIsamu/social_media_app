import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Compass, Home, Search, Settings, TrendingUp } from "lucide-react";
import luffy from "../assets/luffy.jpg";

const Sidebar = () => {
  const location = useLocation();

  // Navigation items configuration
  const navItems = [
    { icon: Home, path: "/", label: "Home" },
    { icon: Search, path: "/search", label: "Search" },
    { icon: Compass, path: "/explore", label: "Explore" },
    { icon: TrendingUp, path: "/trending", label: "Trending" },
    { icon: Settings, path: "/settings", label: "Settings" },
  ];

  return (
    <nav
      className="fixed bottom-0 left-0 w-full bg-black/90 backdrop-blur-lg 
                    border-t border-white/10 px-4 py-3 z-50"
    >
      <div className="max-w-2xl mx-auto flex justify-between items-center">
        {navItems.map(({ icon: Icon, path, label }) => {
          const isActive = location.pathname === path;

          return (
            <Link
              key={path}
              to={path}
              className={`flex flex-col items-center gap-1 p-2 rounded-lg
                         transition duration-200 group
                         ${
                           isActive
                             ? "text-blue-400"
                             : "text-gray-400 hover:text-gray-200"
                         }`}
            >
              <Icon
                className={`w-6 h-6 transition-transform duration-200
                              ${
                                isActive ? "scale-110" : "group-hover:scale-110"
                              }`}
              />
              <span
                className="text-xs font-medium opacity-0 transform -translate-y-1 
                             transition-all duration-200 group-hover:opacity-100 
                             group-hover:translate-y-0"
              >
                {label}
              </span>
            </Link>
          );
        })}

        {/* Profile Link */}
        <Link
          to="/profile"
          className="p-1 rounded-full ring-2 ring-transparent 
                     transition duration-200 hover:ring-blue-400"
        >
          <div className="h-7 w-7 rounded-full overflow-hidden ring-1 ring-white/20">
            <img
              src={luffy}
              alt="Profile"
              className="h-full w-full object-cover"
            />
          </div>
        </Link>
      </div>
    </nav>
  );
};

export default Sidebar;
