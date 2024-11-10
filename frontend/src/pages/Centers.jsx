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

  if (loading) return <div className="text-center py-4">Loading...</div>;
  if (error) return <div className="text-center py-4 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Hospitals</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">City</th>
              <th className="px-4 py-2 text-left">State</th>
              <th className="px-4 py-2 text-left">Phone</th>
              <th className="px-4 py-2 text-left">Capacity</th>
            </tr>
          </thead>
          <tbody>
            {hospitals.map(hospital => (
              <tr key={hospital.id} className="border-b hover:bg-gray-100">
                <td className="px-4 py-2">{hospital.name}</td>
                <td className="px-4 py-2">{hospital.city}</td>
                <td className="px-4 py-2">{hospital.state}</td>
                <td className="px-4 py-2">{hospital.phone}</td>
                <td className="px-4 py-2">{hospital.capacity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Centers;
