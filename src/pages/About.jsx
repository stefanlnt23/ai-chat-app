import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            About Our AI Chat Assistant
          </h1>
          <p className="mt-4 text-lg text-gray-500">
            Powered by Claude's advanced language model
          </p>
        </div>

        <div className="mt-12 prose prose-purple mx-auto">
          <div className="bg-white shadow-md rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Our Mission
            </h2>
            <p className="text-gray-600 mb-6">
              We aim to provide an intelligent, intuitive, and helpful AI chat experience
              that assists users in their daily tasks, creative endeavors, and
              problem-solving needs.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Technology
            </h2>
            <p className="text-gray-600 mb-6">
              Our chat assistant is powered by Claude, one of the most advanced language
              models available. This ensures high-quality, contextually relevant
              responses and a natural conversation flow.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Privacy & Security
            </h2>
            <p className="text-gray-600 mb-6">
              We take your privacy seriously. All conversations are encrypted and
              securely stored. Your data is never shared with third parties without
              your explicit consent.
            </p>

            <div className="mt-8 flex justify-center">
              <Link
                to="/signup"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#fe6602] hover:bg-[#e55a02]"
              >
                Start Chatting Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
