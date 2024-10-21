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
      const response = await axios.post('http://localhost:3000/api/donors/find', { bloodGroup: searchTerm });
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

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Find a Donor</h1>
      <form onSubmit={handleSearch} className="mb-4">
        <input
          type="text"
          placeholder="Enter blood group (e.g., A+, B-, O+)"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setSearchError(''); // Clear search error when input changes
          }}
          className="w-full p-2 border border-gray-300 rounded"
        />
        {searchError && <p className="text-red-500 mt-1">{searchError}</p>}
        <button 
          type="submit" 
          className="mt-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          disabled={isLoading}
        >
          {isLoading ? 'Searching...' : 'Search'}
        </button>
      </form>
      
      {error && <p className="text-red-500 mb-4">{error}</p>}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {donors.map(donor => (
          <div key={donor.id} className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold">{donor.name}</h2>
            <p className="text-red-600 font-bold">Blood Group: {donor.bloodGroup}</p>
            <p>Contact: {donor.contact}</p>
          </div>
        ))}
      </div>
      {donors.length === 0 && !isLoading && !searchError && <p className="text-center mt-4">No donors found for the specified blood group.</p>}
    </div>
  );
};

export default FindDonor;
