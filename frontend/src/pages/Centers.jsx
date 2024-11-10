import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Centers = () => {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await axios.get('http://localhost:3006/api/hospitals');
        setHospitals(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching hospitals:', err);
        setError(`Failed to fetch hospitals: ${err.message}`);
        setLoading(false);
      }
    };

    fetchHospitals();
  }, []);

  if (loading) {
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
      <h1 className="text-4xl font-bold mb-8 text-center text-red-600">Blood Donation Centers</h1>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-red-600 text-white">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">City</th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">State</th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">Phone</th>
                <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">Capacity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {hospitals.map((hospital, index) => (
                <tr key={hospital.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{hospital.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{hospital.city}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{hospital.state}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{hospital.phone}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{hospital.capacity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {hospitals.length === 0 && (
        <div className="text-center mt-8">
          <p className="text-xl text-gray-600">No hospitals found.</p>
        </div>
      )}
    </div>
  );
};

export default Centers;
