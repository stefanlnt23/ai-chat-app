import { getFunctions, httpsCallable } from 'firebase/functions';
import { app } from './firebase';

const functions = getFunctions(app);
const callClaudeAPI = httpsCallable(functions, 'callClaudeAPI');

export const sendMessage = async (message) => {
  console.log('Sending message to Claude API via Cloud Function:', message);
  try {
    console.log('Calling Cloud Function with message:', { message });
    const result = await callClaudeAPI({ message });
    console.log('Raw Cloud Function response:', result);
    
    if (result.data && result.data.response) {
      console.log('Parsed response:', result.data.response);
      return result.data.response;
    } else {
      console.error('Unexpected response structure:', result);
      throw new Error('Invalid response structure from Cloud Function');
    }
  } catch (error) {
    console.error('Detailed error in sendMessage:', {
      message: error.message,
      code: error.code,
      details: error.details,
      name: error.name,
      stack: error.stack,
      rawError: error
    });
    throw error;
  }
};
