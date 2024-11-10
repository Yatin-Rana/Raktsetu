import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewScheduledCamps = () => {
  const [camps, setCamps] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCamps = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('http://localhost:3006/api/bloodcamps');
        setCamps(response.data);
      } catch (error) {
        console.error('Error fetching scheduled camps:', error);
        setError('Failed to fetch scheduled camps. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCamps();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-8 text-center">
        <p className="text-red-500 text-xl">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8 bg-gray-100 min-h-screen">
      <h2 className="text-4xl font-bold mb-8 text-center text-red-600">Scheduled Blood Camps</h2>
      {camps.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {camps.map((camp) => (
            <div key={camp.id} className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="bg-red-600 text-white p-4">
                <h3 className="text-xl font-semibold">Organised By : {camp.organizerName}</h3>
              </div>
              <div className="p-6">
                <p className="mb-2">
                  <span className="font-semibold">Location:</span> {camp.location}
                </p>
                <p className="mb-2">
                  <span className="font-semibold">Date:</span> {new Date(camp.campDate).toLocaleDateString()}
                </p>
                <p className="mb-2">
                  <span className="font-semibold">Expected Donors:</span> {camp.expectedDonors}
                </p>
                <p className="mb-4">
                  <span className="font-semibold">Additional Info:</span> {camp.additionalInfo || 'N/A'}
                </p>
                {/* <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
                  Register for Camp
                </button> */}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center bg-white p-8 rounded-lg shadow-md">
          <p className="text-xl text-gray-600">No scheduled camps available at the moment.</p>
          <p className="mt-2 text-gray-500">Please check back later for upcoming blood donation camps.</p>
        </div>
      )}
    </div>
  );
};

export default ViewScheduledCamps;
