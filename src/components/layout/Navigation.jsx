import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiHome, FiMessageSquare, FiUser, FiInfo, FiMail } from 'react-icons/fi';

const Navigation = ({ user }) => {
  const navItems = [
    { path: '/', icon: <FiHome />, label: 'Home' },
    { path: '/about', icon: <FiInfo />, label: 'About' },
    { path: '/contact', icon: <FiMail />, label: 'Contact' }
  ];

  if (user) {
    navItems.push(
      { path: '/chat', icon: <FiMessageSquare />, label: 'Chat' },
      { path: '/profile', icon: <FiUser />, label: 'Profile' }
    );
  }

  return (
    <nav className="bg-white shadow-md fixed bottom-0 w-full md:relative md:w-64 md:min-h-screen">
      <div className="px-4 py-2 md:py-8">
        <ul className="flex justify-around md:flex-col md:space-y-4">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 rounded-md text-sm font-medium ${
                    isActive
                      ? 'text-[#5b32c7] bg-purple-50'
                      : 'text-gray-700 hover:text-[#5b32c7] hover:bg-purple-50'
                  }`
                }
              >
                <span className="mr-3">{item.icon}</span>
                <span className="hidden md:block">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
