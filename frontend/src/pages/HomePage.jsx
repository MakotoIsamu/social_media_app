// HomePage.jsx
import React from 'react';
import Sidebar from '../components/Sidebar';
import { Outlet, useLocation } from 'react-router-dom';
import HomePageLayout from '../components/HomePageLayout';

const HomePage = () => {
  const location = useLocation();
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <div className="flex">
        <Sidebar />
        <main className="flex-1 min-h-screen overflow-y-auto px-4 sm:px-6 py-6 pb-20">
          {location.pathname === '/' ? <HomePageLayout /> : <Outlet />}
        </main>
      </div>
    </div>
  );
};

export default HomePage;