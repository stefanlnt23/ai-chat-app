import React from 'react';
import { Navigate } from 'react-router-dom';
import ChatInterface from '../components/chat/ChatInterface';

const Chat = ({ user }) => {
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8">
          <h1 className="text-2xl font-bold text-gray-900">Chat with AI Assistant</h1>
          <p className="mt-2 text-gray-600">
            Start a conversation with our AI assistant powered by Claude
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <ChatInterface userId={user.uid} />
        </div>
      </div>
    </div>
  );
};

export default Chat;
