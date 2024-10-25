# AI Chat Application

A React-based chat application powered by Claude AI and Firebase.

## Setup Instructions

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```env
# Firebase Configuration
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_firebase_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_firebase_app_id

# Claude API Key
REACT_APP_CLAUDE_API_KEY=your_claude_api_key
```

4. Replace the placeholder values in `.env` with your actual keys:
   - Get Firebase configuration from Firebase Console:
     - Create a new project
     - Go to Project Settings
     - Copy the configuration values
   - Get Claude API key from Anthropic:
     - Sign up for Claude API access
     - Generate an API key from your dashboard

5. Start the development server:
```bash
npm start
```

## Features

- User authentication with Firebase
- Real-time chat with Claude AI
- User profile management
- Responsive design
- Protected routes

## Technology Stack

- React
- Firebase (Authentication & Firestore)
- Claude AI API
- TailwindCSS
- React Router

## Project Structure

- `/src/components` - React components
- `/src/pages` - Page components
- `/src/services` - Firebase and AI API services
- `/src/utils` - Utility functions
- `/src/styles` - Global styles

## Environment Variables

- `REACT_APP_FIREBASE_API_KEY` - Firebase API Key
- `REACT_APP_FIREBASE_AUTH_DOMAIN` - Firebase Auth Domain
- `REACT_APP_FIREBASE_PROJECT_ID` - Firebase Project ID
- `REACT_APP_FIREBASE_STORAGE_BUCKET` - Firebase Storage Bucket
- `REACT_APP_FIREBASE_MESSAGING_SENDER_ID` - Firebase Messaging Sender ID
- `REACT_APP_FIREBASE_APP_ID` - Firebase App ID
- `REACT_APP_CLAUDE_API_KEY` - Claude API Key
