import React from 'react';
import { Timer, Home, Globe } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useStore } from '../lib/store';
import { supabase } from '../lib/supabase';

export function Navigation() {
  const user = useStore((state) => state.user);
  const location = useLocation();
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    useStore.getState().setUser(null);
  };

  if (!user) return null;

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Timer className="text-indigo-600" size={24} />
              <h1 className="text-2xl font-bold text-gray-800">Countdown Timer</h1>
            </div>
            <nav className="flex gap-4">
              <Link
                to="/"
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium ${
                  location.pathname === '/'
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                }`}
              >
                <Home size={18} />
                My Countdowns
              </Link>
              <Link
                to="/all"
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium ${
                  location.pathname === '/all'
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                }`}
              >
                <Globe size={18} />
                All Countdowns
              </Link>
            </nav>
          </div>
          <button
            onClick={handleSignOut}
            className="text-gray-600 hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium"
          >
            Sign out
          </button>
        </div>
      </div>
    </header>
  );
}