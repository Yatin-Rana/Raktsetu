import React from 'react';

const HomePage = ({ user }) => {
    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6">
                <h1 className="text-3xl font-bold text-center mb-6">Welcome back, {user.name}!</h1>
                <p className="text-center mb-8">Thank you for being a hero and saving lives through your donations!</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    <button className="bg-red-600 text-white p-4 rounded-lg hover:bg-red-700">Schedule a Blood Donation</button>
                    <button className="bg-green-600 text-white p-4 rounded-lg hover:bg-green-700">Find a Donor</button>
                    <button className="bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700">View Donation History</button>
                    <button className="bg-yellow-600 text-white p-4 rounded-lg hover:bg-yellow-700">Upcoming Appointments</button>
                </div>

                <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-4">Upcoming Appointments</h2>
                    {/* Example Appointment */}
                    <div className="bg-gray-100 p-4 rounded-lg mb-2">
                        <p>Date: October 15, 2024</p>
                        <p>Time: 10:00 AM</p>
                        <p>Location: Community Blood Center</p>
                        <button className="text-blue-500">Cancel Appointment</button>
                    </div>
                </div>

                <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-4">Your Donation Statistics</h2>
                    <p>Total Donations: 5</p>
                    <p>Blood Type Donated: O+</p>
                    <p>Lives Saved: Approximately 15</p>
                </div>

                <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-4">Notifications</h2>
                    <p>No upcoming donation drives at this time.</p>
                </div>

                <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-4">Learn More About Blood Donation</h2>
                    <a href="/resources" className="text-blue-500">View Resources</a>
                </div>

                <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-4">Community Engagement</h2>
                    <p>Join our upcoming blood donation camp on October 20, 2024!</p>
                </div>

                <div>
                    <h2 className="text-xl font-semibold mb-4">Feedback & Support</h2>
                    <button className="bg-red-600 text-white px-4 py-2 rounded-lg">Contact Support</button>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
