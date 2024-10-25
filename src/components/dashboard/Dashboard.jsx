import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiMessageSquare, FiUser, FiSettings } from 'react-icons/fi';

const Dashboard = ({ user }) => {
  const navigate = useNavigate();

  const cards = [
    {
      title: 'Start Chat',
      icon: <FiMessageSquare className="w-8 h-8" />,
      description: 'Begin a new conversation with the AI character',
      action: () => navigate('/chat'),
      primary: true
    },
    {
      title: 'Profile',
      icon: <FiUser className="w-8 h-8" />,
      description: 'View and edit your profile information',
      action: () => navigate('/profile'),
    },
    {
      title: 'Settings',
      icon: <FiSettings className="w-8 h-8" />,
      description: 'Adjust your preferences and settings',
      action: () => navigate('/settings'),
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user?.email}
          </h1>
          <p className="mt-2 text-gray-600">
            What would you like to do today?
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card) => (
            <div
              key={card.title}
              className={`bg-white rounded-lg shadow-md p-6 cursor-pointer transform transition duration-200 hover:scale-105 ${
                card.primary ? 'border-2 border-[#5b32c7]' : ''
              }`}
              onClick={card.action}
            >
              <div className={`${
                card.primary ? 'text-[#5b32c7]' : 'text-gray-600'
              }`}>
                {card.icon}
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">
                {card.title}
              </h3>
              <p className="mt-2 text-gray-600">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
