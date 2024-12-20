import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import authState from '../authState';
import mainLogo from '../images/mainlogo(1).png';
import background from '../images/homebg.jpg';

function Home() {
    const navigate = useNavigate();
    const auth = useRecoilValue(authState);

    const handleJoinUsClick = () => {
        navigate('/joinus');
    };

    const handleFindDonorClick = () => {
        navigate('/find-donor');
    };

    const LoggedOutContent = () => (
        <div className="flex flex-col h-full">
            <div className="flex-1 bg-white bg-opacity-55 backdrop-blur-sm flex flex-col md:flex-row items-center justify-center p-4">
                <div className='w-full md:w-1/2 mb-4 md:mb-0 animate-fadeIn'>
                    <img src={mainLogo} alt="Main Logo" className="max-w-full h-auto mx-auto" />
                </div>
                <div className='flex flex-col justify-center text-center md:text-left'>
                    <div className='text-3xl md:text-4xl lg:text-5xl font-bold text-black animate-slideInFromRight'>
                        Be a <span className='text-red-600 animate-pulse'>Blood</span> Buddy
                    </div>
                    <div className='text-3xl md:text-4xl lg:text-5xl font-bold text-black animate-slideInFromLeft'>
                        Donate and Save Lives
                    </div>
                </div>
            </div>
            <div className="flex-1 bg-[#fc6966] bg-opacity-55 backdrop-blur-sm flex items-center justify-center p-4">
                <div className='flex flex-col w-full md:w-[70%] lg:w-[55%] bg-[#f68d81] gap-y-4 md:gap-y-6 p-4 md:p-6 bg-opacity-55 backdrop-blur-sm shadow-lg rounded-lg animate-fadeIn'>
                    <div className='text-xl md:text-2xl lg:text-3xl italic font-semibold text-center animate-bounce'>
                        Save Lives, One <span className='text-red-600'>Donation</span> at a Time
                    </div>
                    <div
                        className='text-2xl md:text-3xl lg:text-4xl font-bold text-center text-white animate-pulse cursor-pointer hover:text-red-100 transition-colors duration-300'
                        onClick={handleJoinUsClick}
                    >
                        BE A BUDDY
                    </div>
                    <div className='text-center animate-fadeIn'>
                        <div className='text-lg md:text-xl lg:text-2xl'>Join our college community in making a difference.</div>
                        <div className='text-lg md:text-xl lg:text-2xl'>Schedule your blood donation today!</div>
                    </div>
                </div>
            </div>
        </div>
    );

    const LoggedInContent = () => (
        <div className="h-full bg-white bg-opacity-55 backdrop-blur-sm flex flex-col items-center justify-center p-4">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-8 text-center animate-fadeIn">
                Welcome back, <span className='text-red-600 animate-pulse'>{auth.user?.name || 'Buddy'}!</span>
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl animate-slideInFromBottom mb-8">
                <Link
                    to="https://chat.whatsapp.com/Kg0GV394KD56XFncuUQbCx"
                    className="bg-red-600 text-white text-xl md:text-2xl font-bold py-3 px-6 rounded-lg hover:bg-red-700 transition-all duration-300 flex items-center justify-center text-center hover:scale-105"
                >
                    Join Community
                </Link>
                <button
                    onClick={handleFindDonorClick}
                    className="bg-blue-600 text-white text-xl md:text-2xl font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-all duration-300 flex items-center justify-center text-center hover:scale-105"
                >
                    Find a Donor
                </button>
            </div>
            <div className="mt-8 text-center animate-fadeIn bg-white bg-opacity-70 p-6 rounded-lg shadow-lg max-w-2xl">
                <p className="text-2xl md:text-3xl font-italic mb-4 text-gray-800">
                    "The gift of blood is a gift to someone's life."
                </p>
                <p className="text-lg md:text-xl text-red-600 font-semibold">
                    Your donation can save up to three lives!
                </p>
            </div>
        </div>
    );

    return (
        <div className="fixed inset-0 overflow-hidden">
            <div
                className="absolute inset-0 bg-cover bg-center animate-fadeIn"
                style={{ backgroundImage: `url(${background})` }}
            />
            <div className="relative z-10 h-full">
                {auth.isLoggedIn ? <LoggedInContent /> : <LoggedOutContent />}
            </div>
        </div>
    );
}

export default Home;
