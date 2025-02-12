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

          <Link to="/privacy-policy" className="flex items-center gap-2 text-xl font-bold text-blue-600">
            
            Privacy Policy
          </Link>

          <Link to="/contact-us" className="flex items-center gap-2 text-xl font-bold text-blue-600">
            
            Contact Us
          </Link>


         
        </div>
      </div>
    </nav>
  );
}