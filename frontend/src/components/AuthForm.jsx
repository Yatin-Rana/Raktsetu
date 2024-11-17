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
  
    // If it's a sign-up form, check if bloodType is selected
    if (isSignUp && !formData.bloodType) {
      setError("Blood type is required.");
      setIsLoading(false);
      return;
    }
  
    try {
      const endpoint = isSignUp ? '/signup' : '/signin';
  
      // Ensure bloodType is sent correctly (use empty string if not selected)
      const dataToSend = {
        ...formData,
        bloodType: formData.bloodType || "", // Ensure bloodType is always set
      };
  
      console.log("Data being sent:", dataToSend); // Debug log for form data
  
      const response = await api.post(endpoint, dataToSend);
  
      console.log(response.data);
  
      // Only store token and userId in localStorage if signing in
      if (!isSignUp) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userId', response.data.user.id);
        setAuth({ isLoggedIn: true, token: response.data.token });
      }
  
      // Redirect to home page after successful login/signup
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
      setError(error.response?.data?.message || 'An error occurred. Please try again.');
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-100 to-red-300 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-red-800">
            {isSignUp ? 'Become a Lifesaver' : 'Welcome Back, Hero'}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {isSignUp ? 'Your donation can make a difference' : 'Continue your lifesaving journey'}
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            {isSignUp && (
              <div className="mb-4">
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
            )}
            <div className="mb-4">
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>
            {isSignUp && (
              <>
                <div className="mb-4">
                  <input
                    id="mobile"
                    name="mobile"
                    type="text"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                    placeholder="Mobile Number"
                    value={formData.mobile}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-4">
                  <select
                    id="bloodType"
                    name="bloodType"
                    required
                    className="mt-4 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                    value={formData.bloodType}
                    onChange={handleInputChange}
                  >
                    <option value="">Blood Type (if signing up)</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>
                <div className="mb-4">
                  <input
                    id="location"
                    name="location"
                    type="text"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                    placeholder="Location"
                    value={formData.location}
                    onChange={handleInputChange}
                  />
                </div>
              </>
            )}
          </div>
          <div className="text-sm text-red-500">
            {error}
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            {isLoading ? 'Loading...' : isSignUp ? 'Sign Up' : 'Sign In'}
          </button>
          <p className="mt-4 text-center text-sm text-gray-600">
            {isSignUp ? 'Already a member?' : 'New to our community?'}{' '}
            <button
              type="button"
              className="font-medium text-red-600 hover:text-red-500"
              onClick={toggleAuthMode}
            >
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
