import React from 'react';
import { Navigate } from 'react-router-dom';
import UserProfile from '../components/profile/UserProfile';

const Profile = ({ user }) => {
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8">
          <h1 className="text-2xl font-bold text-gray-900">Your Profile</h1>
          <p className="mt-2 text-gray-600">
            Manage your account settings and preferences
          </p>
        </div>
        <UserProfile user={user} />
      </div>
    </div>
  );
};

export default Profile;
