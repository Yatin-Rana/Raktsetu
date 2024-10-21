import React from 'react';
import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import JoinUs from './pages/JoinUs';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import './index.css';
import Organise from './pages/Organise';
import Profile from './pages/Profile';
import { RecoilRoot, useRecoilState, useSetRecoilState } from 'recoil'
import authState  from './authState';
import FAQPage from './pages/FAQPage';
import Donate from './pages/Donate';
import FindDonors from './pages/FindDonors';
import Centers from './pages/Centers';
import HistoryPage from './pages/HistoryPage';
import Appointmets from './pages/Appointmets';


function App() {
  const setAuth = useSetRecoilState(authState)
  const navigate = useNavigate()
  useEffect(() => {
    const token = localStorage.getItem('token')
    setAuth({ isLoggedIn: true, token })
    console.log("atom set to true")
    navigate('/')

  }, [setAuth])
  // const navigate = useNavigate()
  // const [isLoggedIn, setIsLoggedIn] = useState(false)
  // useEffect(() => {
  //   const token = localStorage.getItem('token')
  //   if (token) {
  //     console.log("token is there")
  //     setIsLoggedIn(true)
  //   }
  // }, [])

  // const handleLogout = () => {
  //   localStorage.removeItem('token')
  //   setIsLoggedIn(false)
  //   navigate('/')
  // }
  return (<>

    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/aboutus" element={<AboutUs />} />
      <Route path="/joinus" element={<JoinUs />} />
      {/* <Route path="/dashboard" element={<Dashboard />} /> */}
      <Route path="/organise" element={<Organise />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="FAQPage" element={<FAQPage />} />
      <Route path="/donate" element={<Donate/>} />
      <Route path="/find-donor" element={<FindDonors />} />
      <Route path="/centers" element={<Centers/>} />
      <Route path="/history" element={<HistoryPage />} />
      <Route path="/appointments" element={<Appointmets />} />
      


    </Routes>
  </>
  );
}

export default App;
