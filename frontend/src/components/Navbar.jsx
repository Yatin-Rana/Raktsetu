import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import authState from '../authState';

function Navbar() {
  const [auth, setAuth] = useRecoilState(authState);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuth({ isLoggedIn: true, token });
    }
  }, [setAuth]);

  const handleLogout = () => {
    try {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      setAuth({ isLoggedIn: false, token: null, user: null });
      
      console.log("User logged out successfully");
      
      setTimeout(() => {
        navigate('/', { replace: true });
      }, 0);
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProfileMenu = () => {
    if (auth.isLoggedIn) {
      setIsProfileMenuOpen(!isProfileMenuOpen);
    }
  };

  return (
    <nav className="bg-red-600 text-white p-4 relative z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">Raktsetu</Link>

        {/* Hamburger menu for mobile */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>

        {/* Desktop menu */}
        <ul className="hidden md:flex space-x-4 text-xl items-center">
          <li><Link to="/" className="hover:text-red-200">Home</Link></li>
          <li><Link to="/aboutus" className="hover:text-red-200">About Us</Link></li>
          <li><Link to="/FAQPage" className='hover:text-red-200'>FAQs</Link></li>

          {auth.isLoggedIn ? (
            <>
              <li><Link to="/find-donor" className="hover:text-red-200">Find a Donor</Link></li>
              <li><Link to="/centers" className="hover:text-red-200">Donation Centers</Link></li>
              <li><Link to="https://chat.whatsapp.com/Kg0GV394KD56XFncuUQbCx" className="hover:text-red-200">Join Community</Link></li>
              <li><Link to="/organise" className="hover:text-red-200">Organise a Camp</Link></li>
              <li><Link to="/view-scheduled-bloodcamps" className="hover:text-red-200">Scheduled Drives</Link></li>
              <li className="relative">
                <button onClick={toggleProfileMenu} className="flex items-center space-x-1 hover:text-red-200">
                  <span>Profile</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">My Profile</Link>
                    {/* <Link to="/history" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Donation History</Link> */}
                    {/* <Link to="/appointments" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Appointments</Link> */}
                    <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign Out</button>
                  </div>
                )}
              </li>
            </>
          ) : (
            <>
              <li><Link to="/joinus" className="hover:text-red-200 bg-white text-red-600 px-4 py-2 rounded-full">Join Us</Link></li>
            </>
          )}
        </ul>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 space-y-2 text-xl absolute top-full left-0 right-0 bg-red-600 z-50">
          <ul>
            <li><Link to="/" className="block hover:text-red-200 p-2" onClick={toggleMenu}>Home</Link></li>
            <li><Link to="/aboutus" className="block hover:text-red-200 p-2" onClick={toggleMenu}>About Us</Link></li>
            <li><Link to="/FAQPage" className='block hover:text-red-200 p-2' onClick={toggleMenu}>FAQs</Link></li>
            
            {auth.isLoggedIn ? (
              <>
                <li><Link to="/find-donor" className="block hover:text-red-200 p-2" onClick={toggleMenu}>Find a Donor</Link></li>
                <li><Link to="/centers" className="block hover:text-red-200 p-2" onClick={toggleMenu}>Donation Centers</Link></li>
                <li><Link to="/profile" className="block hover:text-red-200 p-2" onClick={toggleMenu}>My Profile</Link></li>
                {/* <li><Link to="/history" className="block hover:text-red-200 p-2" onClick={toggleMenu}>Donation History</Link></li> */}
                {/* <li><Link to="/appointments" className="block hover:text-red-200 p-2" onClick={toggleMenu}>Appointments</Link></li> */}
                <li><button onClick={() => { handleLogout(); toggleMenu(); }} className="block hover:text-red-200 w-full text-left p-2">Sign Out</button></li>
              </>
            ) : (
              <>
                <li><Link to="/organise" className="block hover:text-red-200 p-2" onClick={toggleMenu}>Organise a Camp</Link></li>
                <li><Link to="/joinus" className="block hover:text-red-200 p-2" onClick={toggleMenu}>Join Us</Link></li>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
