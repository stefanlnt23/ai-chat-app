export const handleAuthError = (error) => {
  switch (error.code) {
    case 'auth/email-already-in-use':
      return 'Email is already registered. Please login instead.';
    case 'auth/invalid-email':
      return 'Invalid email address.';
    case 'auth/operation-not-allowed':
      return 'Email/password accounts are not enabled. Please contact support.';
    case 'auth/weak-password':
      return 'Password should be at least 6 characters.';
    case 'auth/user-disabled':
      return 'This account has been disabled. Please contact support.';
    case 'auth/user-not-found':
      return 'No account found with this email.';
    case 'auth/wrong-password':
      return 'Incorrect password.';
    default:
      return 'An error occurred. Please try again.';
  }
};

export const handleApiError = (error) => {
  if (error.response) {
    // API responded with an error status
    return error.response.data.message || 'API request failed';
  } else if (error.request) {
    // Request was made but no response received
    return 'No response from server. Please check your connection.';
  } else {
    // Error in request setup
    return 'Error setting up request. Please try again.';
  }
};
