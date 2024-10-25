const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { Anthropic } = require('@anthropic-ai/sdk');

// Initialize Firebase Admin
admin.initializeApp();

exports.callClaudeAPI = functions.https.onCall(async (data, context) => {
  console.log('Function called with data:', JSON.stringify(data));
  console.log('Auth context:', JSON.stringify({
    auth: !!context.auth,
    uid: context.auth?.uid
  }));

  // Verify authentication
  if (!context.auth) {
    console.error('Authentication missing');
    throw new functions.https.HttpsError(
      'unauthenticated',
      'User must be authenticated'
    );
  }

  try {
    // Get Claude API key from Firebase config
    const config = functions.config();
    console.log('Config state:', JSON.stringify({
      hasConfig: !!config,
      hasClaudeConfig: !!config.claude,
      hasApiKey: !!(config.claude && config.claude.api_key),
      configKeys: Object.keys(config)
    }));

    if (!config.claude || !config.claude.api_key) {
      console.error('Claude API key missing. Available config:', JSON.stringify(config));
      throw new functions.https.HttpsError(
        'failed-precondition',
        'Claude API key not configured'
      );
    }

    console.log('Creating Anthropic client');
    const anthropic = new Anthropic({
      apiKey: config.claude.api_key,
    });

    console.log('Preparing message for Claude API');
    const messageData = {
      model: 'claude-3-opus-20240229',
      max_tokens: 1024,
      messages: [{
        role: 'user',
        content: data.message
      }],
      system: 'You are a helpful AI assistant.'
    };
    console.log('Message data:', JSON.stringify(messageData));

    try {
      console.log('Sending request to Claude API');
      const response = await anthropic.messages.create(messageData);
      console.log('Claude API raw response:', JSON.stringify(response));

      if (!response.content || response.content.length === 0) {
        console.error('Empty response from Claude API');
        throw new Error('Empty response from Claude API');
      }

      const result = {
        response: response.content[0].text
      };
      console.log('Returning result:', JSON.stringify(result));
      return result;

    } catch (apiError) {
      console.error('Claude API error details:', {
        message: apiError.message,
        type: apiError.type,
        status: apiError.status,
        stack: apiError.stack,
        rawError: JSON.stringify(apiError)
      });
      throw new functions.https.HttpsError(
        'internal',
        `Claude API error: ${apiError.message}`
      );
    }
  } catch (error) {
    console.error('Top-level error details:', {
      message: error.message,
      code: error.code,
      details: error.details,
      stack: error.stack,
      rawError: JSON.stringify(error)
    });

    throw new functions.https.HttpsError(
      'internal',
      `Error calling Claude API: ${error.message}`
    );
  }
});
