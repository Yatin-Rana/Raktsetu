import React, { useState } from 'react';

const OrganiseCamp = () => {
  const [formData, setFormData] = useState({
    organizerName: '',
    organizationName: '',
    email: '',
    phone: '',
    campDate: '',
    campTime: '',
    location: '',
    expectedDonors: '',
    additionalInfo: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Camp details submitted:', formData);
    // Here you would typically handle form submission, like sending data to an API
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-100 to-red-300 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-2xl">
        <h2 className="text-3xl font-extrabold text-red-800 text-center mb-6">
          Organise a Blood Donation Camp
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="organizerName" className="block text-sm font-medium text-gray-700">Organizer Name</label>
            <input
              type="text"
              name="organizerName"
              id="organizerName"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500"
              value={formData.organizerName}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="organizationName" className="block text-sm font-medium text-gray-700">Organization Name</label>
            <input
              type="text"
              name="organizationName"
              id="organizationName"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500"
              value={formData.organizationName}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="tel"
              name="phone"
              id="phone"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500"
              value={formData.phone}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="campDate" className="block text-sm font-medium text-gray-700">Camp Date</label>
            <input
              type="date"
              name="campDate"
              id="campDate"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500"
              value={formData.campDate}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="campTime" className="block text-sm font-medium text-gray-700">Camp Time</label>
            <input
              type="time"
              name="campTime"
              id="campTime"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500"
              value={formData.campTime}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
            <input
              type="text"
              name="location"
              id="location"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500"
              value={formData.location}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="expectedDonors" className="block text-sm font-medium text-gray-700">Expected Number of Donors</label>
            <input
              type="number"
              name="expectedDonors"
              id="expectedDonors"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500"
              value={formData.expectedDonors}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="additionalInfo" className="block text-sm font-medium text-gray-700">Additional Information</label>
            <textarea
              name="additionalInfo"
              id="additionalInfo"
              rows="3"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500"
              value={formData.additionalInfo}
              onChange={handleInputChange}
            ></textarea>
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Submit Camp Details
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrganiseCamp;
