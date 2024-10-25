import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../utils/auth';
import { FiLogOut } from 'react-icons/fi';

const Header = ({ user }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <header className="bg-white shadow-md">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link
              to="/"
              className="flex items-center text-2xl font-bold text-[#5b32c7]"
            >
              AI Chat
            </Link>
          </div>

          <div className="flex items-center">
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-[#5b32c7]"
                >
                  Dashboard
                </Link>
                <Link
                  to="/profile"
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-[#5b32c7]"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="ml-4 flex items-center px-3 py-2 rounded-md text-sm font-medium text-white bg-[#fe6602] hover:bg-[#e55a02]"
                >
                  <FiLogOut className="mr-2" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-[#5b32c7]"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-white bg-[#fe6602] hover:bg-[#e55a02]"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
