import React, { useState } from 'react';
import {BACKEND_URI} from '../utils'
import { Search, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const SearchPage = () => {
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!query.trim()) return;
    
    try {
      setLoading(true);
      setError('');
      const response = await fetch(`${BACKEND_URI}/api/user/${query}`);
      
      if (!response.ok) {
        const data = await response.json();
        setError(data.error);
        return;
      }

      const data = await response.json();
      setUsers(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-900 to-black text-gray-100 p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Search Section */}
        <div className="relative">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <input
                type="text"
                value={query}
                placeholder="Search users..."
                className="w-full px-4 py-3 bg-gray-800/50 rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-200 outline-none"
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <button
              onClick={handleSearch}
              disabled={loading}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Searching...
                </>
              ) : (
                'Search'
              )}
            </button>
          </div>

          {error && (
            <div className="mt-4 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400">
              {error}
            </div>
          )}
        </div>

        {/* Results Section */}
        <div className="space-y-4 mt-8">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="animate-spin mb-4" size={40} />
              <p className="text-gray-400">Searching for users...</p>
            </div>
          ) : users.length > 0 ? (
            users.map((user, i) => (
              <Link to={`/${user.username}/${user._id}`}
                key={i}
                className="flex items-center gap-4 bg-gray-800/50 rounded-xl p-4 hover:bg-gray-800/70 transition-colors duration-200"
              >
                <div className="h-16 w-16 rounded-full overflow-hidden border-2 border-gray-700">
                  <img
                    src={user.profilePicture}
                    alt={user.username}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <div className="text-sm text-gray-400">@{user.username}</div>
                  <div className="text-lg font-semibold">{user.name}</div>
                </div>
              </Link>
            ))
          ) : query && !loading && (
            <div className="text-center py-12 text-gray-400">
              No users found matching "{query}"
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;