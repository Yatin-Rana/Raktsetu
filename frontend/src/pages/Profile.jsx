import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        bloodType: '',
        location: ''
    });
    const navigate = useNavigate();

    const userId = localStorage.getItem('userId');

    useEffect(() => {
        if (!userId) {
            setError('User ID not found in local storage');
            return;
        }

        const fetchProfile = async () => {
            try {
                const response = await axios.get(`http://localhost:3006/profile?userId=${userId}`);
                if (response.data) {
                    setUser(response.data);
                    setFormData({
                        name: response.data.name,
                        email: response.data.email,
                        bloodType: response.data.bloodType,
                        location: response.data.location
                    });
                } else {
                    setError('User not found');
                }
            } catch (err) {
                setError('Error fetching profile');
                console.error('Profile fetch error:', err);
            }
        };

        fetchProfile();
    }, [userId]);

    const handleDeleteProfile = async () => {
        if (!userId) {
            setError('User ID not found');
            return;
        }

        const confirmation = window.confirm("Are you sure you want to delete your profile?");
        if (!confirmation) return;

        try {
            const response = await axios.delete(`http://localhost:3006/profile?userId=${userId}`);
            if (response.status === 200) {
                localStorage.removeItem('userId');
                localStorage.removeItem('token');
                navigate('/login');
            } else {
                setError('Error deleting profile');
            }
        } catch (err) {
            setError('Error deleting profile');
            console.error('Profile delete error:', err);
        }
    };

    const handleUpdateProfile = async () => {
        if (!userId) {
            setError('User ID not found');
            return;
        }

        try {
            const response = await axios.put(`http://localhost:3006/profile?userId=${userId}`, formData);
            setUser(response.data);
            setIsEditing(false);
        } catch (err) {
            setError('Error updating profile');
            console.error('Profile update error:', err);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen bg-red-50 fade-in">
                <div className="p-4 bg-red-500 text-white rounded-lg shadow-md slide-in">
                    {error}
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-50 fade-in">
                <div className="text-gray-700 animate-pulse">Loading...</div>
            </div>
        );
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-red-100 to-red-200 fade-in">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md slide-in">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-red-600 animate-fadeIn">Raktsetu Profile</h2>
                    <p className="text-gray-500 animate-fadeIn">Your lifesaving information</p>
                </div>

                {isEditing ? (
                    <div className="space-y-4 animate-fadeIn">
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent transition duration-300"
                            placeholder="Enter your name"
                        />
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent transition duration-300"
                            placeholder="Enter your email"
                        />
                        <input
                            type="text"
                            name="bloodType"
                            value={formData.bloodType}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent transition duration-300"
                            placeholder="Enter your blood type"
                        />
                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent transition duration-300"
                            placeholder="Enter your location"
                        />
                    </div>
                ) : (
                    <div className="space-y-4 animate-fadeIn">
                        <div className="flex items-center space-x-4 p-3 bg-red-50 rounded-lg transition duration-300 hover:bg-red-100">
                            <span className="text-red-600 text-4xl font-bold animate-pulse">{user.bloodType}</span>
                            <div>
                                <p className="text-lg font-medium">{user.name}</p>
                                <p className="text-gray-600">{user.email}</p>
                            </div>
                        </div>
                        <p className="text-lg font-medium flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-red-500 animate-bounce" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                            </svg>
                            {user.location}
                        </p>
                    </div>
                )}

                <div className="mt-8 space-y-4">
                    {isEditing ? (
                        <button
                            onClick={handleUpdateProfile}
                            className="w-full bg-red-600 text-white py-3 px-4 rounded-md hover:bg-red-700 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
                        >
                            Save Changes
                        </button>
                    ) : (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="w-full bg-red-600 text-white py-3 px-4 rounded-md hover:bg-red-700 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
                        >
                            Edit Profile
                        </button>
                    )}
                    <button
                        onClick={handleDeleteProfile}
                        className="w-full bg-gray-200 text-gray-800 py-3 px-4 rounded-md hover:bg-gray-300 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-md"
                    >
                        Delete Profile
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
