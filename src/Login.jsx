import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [EMAIL_ADD, setEmail] = useState('nsi.onlinenotification@gmail.com'); // Default email value
  const [USER_ID, setUserID] = useState('AGA'); // Default user ID value
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const response = await axios.post('https://inalapi-ff21.up.railway.app/api/login', {
        EMAIL_ADD,
        USER_ID
      });
  
      if (response.status === 200) {
        // Handle successful login
        console.log('Login successful:', response.data);
        navigate('/Approval');
      } else {
        // Handle login failure
        setError('Invalid credentials');
        console.error('Login failed:', response.data.message);
      }
    } catch (error) {
      setError('An error occurred');
      console.error('Error:', error);
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
