import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Timer, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, signOut } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold text-blue-600">
            <Timer className="w-6 h-6" />
            LiveCountdownTimer.com
          </Link>

          <Link to="/about" className="flex items-center gap-2 text-xl font-bold text-blue-600">
            
            About
          </Link>

          <Link to="/" className="flex items-center gap-2 text-xl font-bold text-blue-600">
            
            Privacy Policy
          </Link>

          <Link to="/" className="flex items-center gap-2 text-xl font-bold text-blue-600">
            
            Contact Us
          </Link>


          <div className="relative">
            {user ? (
              <>
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <User className="w-5 h-5" />
                  <span>Account</span>
                </button>

                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-10">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-gray-700 hover:bg-blue-50"
                      onClick={() => setShowDropdown(false)}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={() => {
                        signOut();
                        setShowDropdown(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </>
            ) : (
              <button
                onClick={() => window.dispatchEvent(new CustomEvent('open-auth-modal'))}
                className="text-blue-600 hover:text-blue-700 font-semibold"
              >
                Conact
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}