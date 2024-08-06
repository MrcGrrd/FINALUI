import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [EMAIL_ADD, setEmail] = useState(''); // Default value can be added here if needed
  const [USER_ID, setUserID] = useState(''); // Default value can be added here if needed
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
  
    // For now, just log the input values instead of making an API call
    console.log('Submitted:', { EMAIL_ADD, USER_ID });
  
    // Handle login or further logic here
    // For example, you might check if EMAIL_ADD and USER_ID match some predefined values:
    if (EMAIL_ADD === 'nsi.onlinenotification@gmail.com' && USER_ID === 'AGA') {
      console.log('Login successful');
      navigate('/Approval');
    } else {
      setError('Invalid credentials');
      console.error('Login failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={EMAIL_ADD}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label htmlFor="userID" className="block text-sm font-medium text-gray-700">
              User ID
            </label>
            <input
              type="text"
              value={USER_ID}
              onChange={(e) => setUserID(e.target.value)}
              className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
              required
            />
          </div>
          {error && <div className="text-red-500">{error}</div>}
          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
