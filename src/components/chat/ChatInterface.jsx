import React, { useState, useEffect, useRef } from 'react';
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../services/firebase';
import { sendMessage } from '../../services/aiApi';
import MessageInput from './MessageInput';

const ChatInterface = ({ userId }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (!userId) return;
    console.log('Setting up Firebase listener for user:', userId);

    const q = query(
      collection(db, `chats/${userId}/messages`),
      orderBy('timestamp', 'asc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messageList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      console.log('Received messages from Firebase:', messageList);
      setMessages(messageList);
      scrollToBottom();
    });

    return () => unsubscribe();
  }, [userId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (text) => {
    console.log('Handling send message:', text);
    if (!text.trim() || !userId) {
      console.log('Invalid message or missing userId:', { text, userId });
      return;
    }

    setLoading(true);
    try {
      console.log('Saving user message to Firebase');
      // Save user message
      const userMessageRef = await addDoc(collection(db, `chats/${userId}/messages`), {
        text,
        sender: 'user',
        timestamp: serverTimestamp()
      });
      console.log('User message saved with ID:', userMessageRef.id);

      // Get AI response
      console.log('Requesting AI response');
      const aiResponse = await sendMessage(text);
      console.log('Received AI response:', aiResponse);
      
      // Save AI response
      if (aiResponse) {
        console.log('Saving AI response to Firebase');
        const aiMessageRef = await addDoc(collection(db, `chats/${userId}/messages`), {
          text: aiResponse,
          sender: 'ai',
          timestamp: serverTimestamp()
        });
        console.log('AI response saved with ID:', aiMessageRef.id);
      }
    } catch (error) {
      console.error('Detailed error in handleSendMessage:', {
        error: error.message,
        stack: error.stack,
        name: error.name
      });
      
      // Add error message to chat
      try {
        await addDoc(collection(db, `chats/${userId}/messages`), {
          text: 'Sorry, I encountered an error processing your message. Please try again.',
          sender: 'ai',
          timestamp: serverTimestamp(),
          isError: true
        });
      } catch (firebaseError) {
        console.error('Error saving error message to Firebase:', firebaseError);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl rounded-lg p-3 ${
                message.sender === 'user'
                  ? 'bg-[#5b32c7] text-white'
                  : message.isError
                  ? 'bg-red-100 text-red-700'
                  : 'bg-white text-gray-800'
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 bg-white border-t">
        <MessageInput onSend={handleSendMessage} disabled={loading} />
      </div>
    </div>
  );
};

export default ChatInterface;
