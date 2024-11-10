import React, { useState } from 'react';
import axios from 'axios';

const OrganiseCamp = () => {
  const [formData, setFormData] = useState({
    organizerName: '',
    phone: '',
    location: '',
    campDate: '',
    expectedDonors: '',
    additionalInfo: '',
  });
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3006/api/blood-camps', formData);
      console.log('Blood camp created:', response.data);
      setIsSuccessModalOpen(true);
    } catch (error) {
      console.error('Error submitting camp details:', error);
      alert('There was an error creating the camp. Please try again.');
    }
  };

  const closeModal = () => setIsSuccessModalOpen(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-100 to-red-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="px-6 py-8">
          <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-8">Create a Blood Camp</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {[
              { label: 'Organizer Name', name: 'organizerName', type: 'text' },
              { label: 'Phone', name: 'phone', type: 'tel' },
              { label: 'Location', name: 'location', type: 'text' },
              { label: 'Camp Date', name: 'campDate', type: 'date' },
              { label: 'Expected Donors', name: 'expectedDonors', type: 'number' },
            ].map((field) => (
              <div key={field.name}>
                <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  id={field.name}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                  required
                />
              </div>
            ))}
            <div>
              <label htmlFor="additionalInfo" className="block text-sm font-medium text-gray-700">
                Additional Info
              </label>
              <textarea
                id="additionalInfo"
                name="additionalInfo"
                rows="4"
                value={formData.additionalInfo}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
              ></textarea>
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-150 ease-in-out"
              >
                Create Blood Camp
              </button>
            </div>
          </form>
        </div>
      </div>

      {isSuccessModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg max-w-sm w-full">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Success!</h3>
            <p className="text-gray-600 text-center mb-6">
              Your blood camp has been successfully scheduled. Thank you for your effort!
            </p>
            <button
              onClick={closeModal}
              className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition duration-150 ease-in-out"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrganiseCamp;
