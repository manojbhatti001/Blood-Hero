import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Home, Briefcase } from 'react-feather';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../../../context/AuthContext';
import RequesterOverview from './RequesterOverview';
import CreateRequest from './CreateRequest';
import ActiveRequest from './ActiveRequest';
import RequestHistory from './RequestHistory';
import RequesterProfile from './RequesterProfile';

const RequesterDashboard = () => {
  const location = useLocation();
  const { user } = useAuth();
  const [activeRequests, setActiveRequests] = useState([]);
  const [showNewRequestForm, setShowNewRequestForm] = useState(false);

  // Get current section based on URL
  const getCurrentSection = () => {
    const path = location.pathname;
    if (path === '/requester-dashboard') return 'overview';
    if (path.includes('/requester-dashboard/create')) return 'create';
    if (path.includes('/requester-dashboard/active')) return 'active';
    if (path.includes('/requester-dashboard/history')) return 'history';
    if (path.includes('/requester-dashboard/profile')) return 'profile';
    return 'overview';
  };

  // Render content based on current section
  const renderContent = () => {
    const section = getCurrentSection();
    
    if (showNewRequestForm) {
      return <CreateRequest 
        setShowNewRequestForm={setShowNewRequestForm}
        activeRequests={activeRequests}
        setActiveRequests={setActiveRequests}
      />;
    }
    
    switch (section) {
      case 'create':
        return <CreateRequest 
          setShowNewRequestForm={setShowNewRequestForm}
          activeRequests={activeRequests}
          setActiveRequests={setActiveRequests}
        />;
      case 'active':
        return <ActiveRequest />;
      case 'history':
        return <RequestHistory />;
      case 'profile':
        return <RequesterProfile />;
      default:
        return <RequesterOverview setShowNewRequestForm={setShowNewRequestForm} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 sm:left-[80px] md:left-[280px] right-0 z-30">
        <div className="bg-gray-50 px-6 pt-6 pb-6">
          <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Home className="h-8 w-8 text-white" />
                <div>
                  <h1 className="text-2xl font-bold text-white">Requester Dashboard</h1>
                  <p className="text-red-100 text-sm">Manage your blood requests efficiently</p>
                </div>
              </div>
              <div className="hidden sm:flex items-center gap-3 bg-white/10 px-4 py-2 rounded-lg">
                <Briefcase className="h-5 w-5 text-red-200" />
                <span className="text-white font-medium">{user?.name || 'Welcome User'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="relative mt-[144px] px-6 pb-6">
        {renderContent()}
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default RequesterDashboard;