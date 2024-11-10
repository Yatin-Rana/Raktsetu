import React, { useState } from 'react';
import axios from 'axios';

const FindDonor = () => {
  const [donors, setDonors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchError, setSearchError] = useState('');

  const searchDonors = async () => {
    if (!searchTerm.trim()) {
      setSearchError('Please enter a blood group before searching.');
      return;
    }

    setSearchError('');
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post('http://localhost:3006/api/donors/find', { bloodGroup: searchTerm });
      setDonors(response.data);
    } catch (err) {
      setError('Failed to fetch donors. Please try again.');
      console.error('Error fetching donors:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    searchDonors();
  };

  const handleContactDonor = (mobile) => {
    window.location.href = `tel:${mobile}`;
  };

  return (
    <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-6 text-center text-red-600">Find a Donor</h1>
      <form onSubmit={handleSearch} className="mb-8 max-w-md mx-auto">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <input
            type="text"
            placeholder="Enter blood group (e.g., A+, B-, O+)"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setSearchError('');
            }}
            className="flex-grow p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />
          <button 
            type="submit" 
            className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
            disabled={isLoading}
          >
            {isLoading ? 'Searching...' : 'Search'}
          </button>
        </div>
        {searchError && <p className="text-red-500 mt-2 text-center">{searchError}</p>}
      </form>
      
      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {donors.map(donor => (
          <div key={donor.id} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold text-gray-800">{donor.name}</h2>
              <span className="text-3xl font-bold text-red-600">{donor.bloodGroup}</span>
            </div>
            <div className="space-y-2">
              <p className="text-gray-600"><span className="font-semibold">Contact:</span> {donor.mobile}</p>
              <p className="text-gray-600"><span className="font-semibold">Location:</span> {donor.location || 'Not specified'}</p>
            </div>
            <button 
              onClick={() => handleContactDonor(donor.mobile)}
              className="mt-4 w-full bg-red-100 text-red-600 px-4 py-2 rounded-lg hover:bg-red-200 transition duration-300 ease-in-out"
            >
              Contact Donor
            </button>
          </div>
        ))}
      </div>
      {donors.length === 0 && !isLoading && !searchError && (
        <p className="text-center mt-8 text-lg text-gray-600">No donors found for the specified blood group.</p>
      )}
    </div>
  );
};

export default FindDonor;
