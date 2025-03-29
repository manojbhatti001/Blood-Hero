import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Heart, Droplet } from 'lucide-react';
import Overview from './Overview';
import Profile from './Profile';
import AvailableRequests from './AvailableRequests';
import AcceptedRequests from './AcceptedRequests';
import DonationHistory from './DonationHistory';

const DonorDashboard = () => {
  const location = useLocation();

  // Add mock profile data
  const [profileData] = useState({
    name: 'John Doe',
    bloodGroup: 'A+',
    totalDonations: 5,
    lastDonation: '2023-10-15',
    email: 'john@example.com',
    phone: '+1234567890',
    address: '123 Main St',
    city: 'Mumbai',
    state: 'Maharashtra'
  });

  // Add mock donation history
  const [donationHistory] = useState([
    {
      id: 1,
      date: '2023-10-15',
      bloodGroup: 'A+',
      location: 'City Hospital',
      status: 'Completed'
    }
    // Add more donation history items as needed
  ]);

  // Get current section based on URL
  const getCurrentSection = () => {
    const path = location.pathname;
    if (path === '/dashboard') return 'overview';
    if (path.includes('/dashboard/available')) return 'available';
    if (path.includes('/dashboard/accepted')) return 'accepted';
    if (path.includes('/dashboard/history')) return 'history';
    if (path.includes('/dashboard/profile')) return 'profile';
    return 'overview';
  };

  // Render the appropriate content based on the current route
  const renderContent = () => {
    const section = getCurrentSection();
    
    switch (section) {
      case 'overview':
        return <Overview profileData={profileData} donationHistory={donationHistory} />;
      case 'available':
        return <AvailableRequests />;
      case 'accepted':
        return <AcceptedRequests />;
      case 'history':
        return <DonationHistory />;
      case 'profile':
        return <Profile />;
      default:
        return <Overview profileData={profileData} donationHistory={donationHistory} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 sm:left-[80px] md:left-[280px] right-0 z-30 p-4 sm:px-6 pt-6 bg-gray-50">
        <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-xl shadow-lg p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
            <div className="flex items-center gap-3">
              <Heart className="h-6 w-6 sm:h-8 sm:w-8 text-white animate-pulse" />
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-white">Donor Dashboard</h1>
                <p className="text-red-100 text-xs sm:text-sm">Making a difference, one donation at a time</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white/10 px-3 py-1 sm:px-4 sm:py-2 rounded-lg">
              <Droplet className="h-4 w-4 sm:h-5 sm:w-5 text-red-200" />
              <span className="text-white text-sm font-medium">{profileData.bloodGroup}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="relative mt-[120px] sm:mt-[144px] px-4 sm:px-6 pb-6">
        {renderContent()}
      </div>
    </div>
  );
};

export default DonorDashboard;