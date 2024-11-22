import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import raviImage from '../images/ravi.jpg';
import yatinImage from '../images/yatin.jpg';
import nikhilImage from '../images/nikhil.jpg';

const AboutUs = () => {
  const [teamMembers] = useState([
    { name: "Yatin Rana", role: "Developer", image: yatinImage },
    { name: "Nikhil Bisht", role: "UI/UX ,Content Manager", image: nikhilImage },
  ]);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/joinus');
  };

  return (
    <div className="bg-gradient-to-br from-red-50 to-red-100 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-red-800 mb-4">About Raktsetu</h1>
          <p className="text-2xl font-semibold text-red-600 italic">Bridging Lives Through Blood Donation</p>
        </div>
        
        {/* Introduction */}
        <div className="bg-white shadow-2xl rounded-3xl p-8 mb-12 transform hover:scale-105 transition duration-300">
          <p className="text-gray-700 text-lg leading-relaxed">
            Raktsetu is a student-led initiative born out of the halls of Jagannath International Management School, Vasant Kunj (JIMS VK). As college students, we wanted to create a project with real-world impact, and what could be more impactful than saving lives?
          </p>
        </div>

        {/* Mission and Why Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div className="bg-red-700 text-white rounded-3xl p-8 shadow-lg transform hover:-translate-y-2 transition duration-300">
            <h3 className="text-3xl font-bold mb-4">Our Mission</h3>
            <p className="text-lg">
              To connect blood donors with those in need within our college community, fostering a culture of voluntary blood donation and mutual support.
            </p>
          </div>
          <div className="bg-white rounded-3xl p-8 shadow-lg transform hover:-translate-y-2 transition duration-300">
            <h3 className="text-3xl font-bold text-red-700 mb-4">Why Raktsetu?</h3>
            <ul className="list-none text-gray-700 space-y-2">
              <li className="flex items-center"><span className="text-red-500 mr-2">✓</span> Community-Focused</li>
              <li className="flex items-center"><span className="text-red-500 mr-2">✓</span> Immediate Response</li>
              <li className="flex items-center"><span className="text-red-500 mr-2">✓</span> Awareness Campaign</li>
              <li className="flex items-center"><span className="text-red-500 mr-2">✓</span> User-Friendly Interface</li>
            </ul>
          </div>
        </div>

        {/* Team Section */}
        <h3 className="text-3xl font-bold text-red-800 mb-8 text-center">Our Team</h3>
        <div className="flex justify-center items-center mb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-4xl mx-auto px-4">
            {teamMembers.map((member, index) => (
              <div 
                key={index} 
                className="bg-white rounded-2xl shadow-lg p-8 text-center transform hover:scale-105 transition duration-300 mx-auto w-full aspect-square flex flex-col items-center justify-center"
                style={{ minHeight: '300px', maxWidth: '300px' }}
              >
                <div className="w-32 h-32 rounded-full mx-auto mb-6 overflow-hidden">
                  {member.image ? (
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-red-200 flex items-center justify-center">
                      <span className="text-3xl text-red-600">#{index + 1}</span>
                    </div>
                  )}
                </div>
                <p className="font-semibold text-xl mb-3">{member.name}</p>
                <p className="text-red-600 text-lg">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* How It Works Section */}
        <div className="bg-gradient-to-r from-red-600 to-red-800 rounded-3xl p-8 text-white mb-16">
          <h3 className="text-3xl font-bold mb-6 text-center">How It Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {['Register', 'Connect', 'Donate', 'Save Lives'].map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-white rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-red-600">{index + 1}</span>
                </div>
                <p className="font-semibold text-lg">{step}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Join the Cause Section */}
        <div className="bg-white rounded-3xl p-8 shadow-lg mb-16">
          <h3 className="text-3xl font-bold text-red-800 mb-6 text-center">Join the Cause</h3>
          <p className="text-gray-700 text-lg text-center">
            Whether you're a student, faculty member, or part of the staff at JIMS VK, your participation can save lives. Register today and be part of this life-saving network.
          </p>
          <div className="mt-8 text-center">
            <button 
              onClick={handleClick} 
              className="bg-red-600 text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-red-700 transition duration-300"
            >
              Register Now
            </button>
          </div>
        </div>

        {/* Contact Section */}
        <div className="text-center">
          <h3 className="text-3xl font-bold text-red-800 mb-4">Contact Us</h3>
          <p className="text-gray-700 mb-4">
            Have questions or suggestions? Reach out to us at{' '}
            <a href="mailto:raktsetu001@gmail.com" className="text-red-600 hover:underline">
              raktsetu001@gmail.com
            </a>
          </p>
          <p className="text-xl font-semibold text-red-800 mt-8">
            Remember, every drop counts. Join Raktsetu today and be a lifesaver!
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
