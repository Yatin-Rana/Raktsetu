// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import jwt from 'jsonwebtoken'; // Use jwt.decode from jsonwebtoken library

// const HistoryPage = () => {
//   const [donations, setDonations] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     // Get the token from localStorage
//     const token = localStorage.getItem('token');
//     if (!token) {
//       setError('No token found');
//       setLoading(false);
//       return;
//     }

//     // Decode the token to get userId
//     const decodedToken = jwt.decode(token); // Use jwt.decode instead of jwt_decode
//     const userId = decodedToken.userId;

//     // Fetch donation history with userId
//     const fetchDonations = async () => {
//       try {
//         // Send userId as a query parameter in the GET request
//         const response = await axios.get(`http://localhost:3000/donations/history`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//           params: {
//             userId: userId, // Sending userId as a query parameter
//           },
//         });
//         setDonations(response.data);
//         setLoading(false);
//       } catch (err) {
//         setError('Error fetching donation history');
//         setLoading(false);
//       }
//     };

//     fetchDonations();
//   }, []);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;

//   return (
//     <div>
//       <h2>Your Donation History</h2>
//       {donations.length > 0 ? (
//         <table>
//           <thead>
//             <tr>
//               <th>Donation Date</th>
//               <th>Donation Type</th>
//               <th>Amount</th>
//               <th>Location</th>
//               <th>Status</th>
//               <th>Blood Type</th>
//               <th>Campaign</th>
//             </tr>
//           </thead>
//           <tbody>
//             {donations.map(donation => (
//               <tr key={donation.id}>
//                 <td>{new Date(donation.donationDate).toLocaleDateString()}</td>
//                 <td>{donation.donationType}</td>
//                 <td>{donation.amount}</td>
//                 <td>{donation.location}</td>
//                 <td>{donation.status}</td>
//                 <td>{donation.bloodType}</td>
//                 <td>{donation.campaign || 'N/A'}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <p>No donations found.</p>
//       )}
//     </div>
//   );
// };

// export default HistoryPage;
