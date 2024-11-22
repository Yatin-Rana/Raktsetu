import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import authState from '../authState';

const api = axios.create({
  baseURL: 'http://localhost:3006/api/auth'
});

const AuthForm = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    bloodType: '',
    location: '',
    mobile: ''
  });

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [auth, setAuth] = useRecoilState(authState);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (isSignUp && !formData.bloodType) {
      setError("Blood type is required.");
      setIsLoading(false);
      return;
    }

    try {
      const endpoint = isSignUp ? '/signup' : '/signin';

      const response = await api.post(endpoint, formData);

      if (!isSignUp) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userId', response.data.user.id);
        setAuth({ isLoggedIn: true, token: response.data.token });
      }

      navigate('/');
    } catch (error) {
      setError(error.response?.data?.error || 'An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleAuthMode = () => {
    setIsSignUp(!isSignUp);
    setFormData({
      name: '',
      email: '',
      password: '',
      bloodType: '',
      location: '',
      mobile: ''
    });
    setError('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-100 to-red-300 py-12 px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-red-800 text-center">
            {isSignUp ? 'Become a Lifesaver' : 'Welcome Back, Hero'}
          </h2>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {isSignUp && (
            <input
              name="name"
              type="text"
              required
              placeholder="Full Name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          )}
          <input
            name="email"
            type="email"
            required
            placeholder="Email address"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <input
            name="password"
            type="password"
            required
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          {isSignUp && (
            <>
              <input
                name="mobile"
                type="text"
                required
                placeholder="Mobile Number"
                value={formData.mobile}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <select
                name="bloodType"
                required
                value={formData.bloodType}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="">Select Blood Type</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
              <input
                name="location"
                type="text"
                required
                placeholder="Location"
                value={formData.location}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </>
          )}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-red-600 text-white font-bold py-2 px-4 rounded-md hover:bg-red-700 transition duration-300 disabled:bg-red-300"
          >
            {isLoading ? 'Loading...' : isSignUp ? 'Sign Up' : 'Sign In'}
          </button>
        </form>
        <button
          onClick={toggleAuthMode}
          className="w-full mt-4 text-red-700 font-semibold underline hover:text-red-900"
        >
          {isSignUp ? 'Already have an account? Sign In' : 'New here? Sign Up'}
        </button>
        {error && <p className="mt-4 text-sm text-red-600 text-center">{error}</p>}
      </div>
    </div>
  );
};

export default AuthForm;
