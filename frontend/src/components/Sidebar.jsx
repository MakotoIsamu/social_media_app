import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import {AuthContext} from '../contexts/AuthContext'
import { Home, Film, Plus, Search, User, MessageCircle } from 'lucide-react';

const BottomBar = () => {
  const {Auth} = useContext(AuthContext)
  const tabs = [
    { id: 'home', icon: Home, path: '/' },
    { id: 'search', icon: Search, path: '/search' },
    { id: 'post', icon: Plus, path: '/create-something' },
    { id: 'reels', icon: Film, path: '/reels' },
    { id: 'profile', icon: User, path: Auth ? '/profile' : '/login' },
    { id: 'message', icon: MessageCircle, path: '/message' }
  ];

  return (
    <div className="fixed bottom-0 w-full bg-black z-50 border-t border-gray-800">
      <div className="flex items-center justify-around py-3 px-4">
        {tabs.map(({ id, icon: Icon, path }) => (
          <Link
            key={id}
            to={path}
            className="p-2 rounded-full hover:bg-gray-800 transition-colors"
          >
            <Icon className="w-6 h-6 text-gray-500 hover:text-white" />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BottomBar;