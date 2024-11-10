import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import authState from '../authState';

// Create an axios instance with a base URL
const api = axios.create({
  baseURL: 'http://localhost:3006/api' // Replace with your actual API base URL
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

    try {
      const endpoint = isSignUp ? '/auth/signup' : '/auth/signin';
      const dataToSend = isSignUp ? formData : { email: formData.email, password: formData.password };

      const response = await api.post(endpoint, dataToSend);

      console.log(response.data);

      localStorage.setItem('token', response.data.token);
      setAuth({ isLoggedIn: true, token: response.data.token });
      // const name = response.data.name;

      const userId = response.data.user.id;
      // localStorage.setItem('name',name)
      localStorage.setItem('userId', userId)

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
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
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
                autoComplete="current-password"
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
                    className="mt-4 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                    value={formData.bloodType}
                    onChange={handleInputChange}
                  >
                    <option value="">Blood Type (if known)</option>
                    <option value="A_POSITIVE">A+</option>
                    <option value="A_NEGATIVE">A-</option>
                    <option value="B_POSITIVE">B+</option>
                    <option value="B_NEGATIVE">B-</option>
                    <option value="AB_POSITIVE">AB+</option>
                    <option value="AB_NEGATIVE">AB-</option>
                    <option value="O_POSITIVE">O+</option>
                    <option value="O_NEGATIVE">O-</option>
                  </select>
                </div>
                <div>
                  <input
                    id="location"
                    name="location"
                    type="text"
                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                    placeholder="City or Zip Code"
                    value={formData.location}
                    onChange={handleInputChange}
                  />
                </div>
              </>
            )}
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-150 ease-in-out"
            >
              {isLoading ? 'Processing...' : (isSignUp ? 'Join the Cause' : 'Sign In')}
            </button>
          </div>
        </form>
        <div className="text-center">
          <button
            onClick={toggleAuthMode}
            className="font-medium text-red-600 hover:text-red-500"
          >
            {isSignUp
              ? 'Already a donor? Sign In'
              : "New donor? Join our community"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
