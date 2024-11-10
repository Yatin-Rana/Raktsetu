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

    // Get the userId from localStorage
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
            setIsEditing(false); // Exit edit mode
        } catch (err) {
            setError('Error updating profile');
            console.error('Profile update error:', err);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // If there's an error, show it
    if (error) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-100">
                <div className="p-4 bg-red-500 text-white rounded shadow-md">
                    {error}
                </div>
            </div>
        );
    }

    // If user data is not loaded yet, show loading state
    if (!user) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-100">
                <div className="text-gray-700">Loading...</div>
            </div>
        );
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-semibold text-center mb-6 text-blue-600">User Profile</h2>

                {isEditing ? (
                    <div className="space-y-4">
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            placeholder="Enter your name"
                        />
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            placeholder="Enter your email"
                        />
                        <input
                            type="text"
                            name="bloodType"
                            value={formData.bloodType}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            placeholder="Enter your blood type"
                        />
                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            placeholder="Enter your location"
                        />
                    </div>
                ) : (
                    <div className="space-y-4">
                        <p className="text-lg font-medium">Name: <span className="font-normal text-gray-600">{user.name}</span></p>
                        <p className="text-lg font-medium">Email: <span className="font-normal text-gray-600">{user.email}</span></p>
                        <p className="text-lg font-medium">Blood Type: <span className="font-normal text-gray-600">{user.bloodType}</span></p>
                        <p className="text-lg font-medium">Location: <span className="font-normal text-gray-600">{user.location}</span></p>
                    </div>
                )}

                <div className="mt-6 text-center">
                    {isEditing ? (
                        <button
                            onClick={handleUpdateProfile}
                            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                        >
                            Save Changes
                        </button>
                    ) : (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-700"
                        >
                            Edit Profile
                        </button>
                    )}
                </div>

                <div className="mt-6 text-center">
                    <button
                        onClick={handleDeleteProfile}
                        className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-700"
                    >
                        Delete Profile
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
