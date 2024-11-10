import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewScheduledCamps = () => {
  const [camps, setCamps] = useState([]);

  // Fetch the scheduled camps on component mount
  useEffect(() => {
    const fetchCamps = async () => {
      try {
        const response = await axios.get('http://localhost:3006/api/bloodcamps');
        setCamps(response.data);
      } catch (error) {
        console.error('Error fetching scheduled camps:', error);
      }
    };

    fetchCamps();
  }, []);

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-3xl font-semibold mb-4">Scheduled Blood Camps</h2>
      {camps.length > 0 ? (
        <ul>
          {camps.map((camp) => (
            <li key={camp.id} className="bg-white shadow-md rounded-md p-4 mb-4">
              <h3 className="text-xl font-semibold">{camp.organizerName}</h3>
              <p>Location: {camp.location}</p>
              <p>Date: {camp.campDate}</p>
              <p>Expected Donors: {camp.expectedDonors}</p>
              <p>Additional Info: {camp.additionalInfo}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No scheduled camps available.</p>
      )}
    </div>
  );
};

export default ViewScheduledCamps;
