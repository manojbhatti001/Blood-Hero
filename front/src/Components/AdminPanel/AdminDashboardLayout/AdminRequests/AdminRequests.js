import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Droplet, Activity, AlertCircle, Calendar, MapPin, Clock } from 'react-feather';

// Import components directly with default imports
import RequestList from './RequestList';
import RequestDetails from './RequestDetails';
import RequestForm from './RequestForm';

const AdminRequests = () => {
  const [requestStats, setRequestStats] = useState({
    totalRequests: 0,
    activeRequests: 0,
    completedRequests: 0,
    upcomingRequests: 0,
    bloodTypeDistribution: {},
    hospitalDistribution: {}
  });

  useEffect(() => {
    fetchRequestStats();
  }, []);

  const fetchRequestStats = async () => {
    try {
      // Replace with your actual API endpoint
      const response = await fetch('/api/admin/request-stats');
      const data = await response.json();
      setRequestStats(data);
    } catch (error) {
      console.error('Error fetching request stats:', error);
    }
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Requests Card */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Requests</p>
              <h3 className="text-2xl font-bold text-gray-900">{requestStats.totalRequests}</h3>
              <p className="text-xs text-gray-600 mt-1">All blood requests</p>
            </div>
            <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center">
              <Droplet className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>

        {/* Active Requests Card */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Active Requests</p>
              <h3 className="text-2xl font-bold text-gray-900">{requestStats.activeRequests}</h3>
              <p className="text-xs text-gray-600 mt-1">Currently processing</p>
            </div>
            <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center">
              <Activity className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        {/* Completed Requests Card */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Completed Requests</p>
              <h3 className="text-2xl font-bold text-gray-900">{requestStats.completedRequests}</h3>
              <p className="text-xs text-gray-600 mt-1">Successfully fulfilled</p>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Upcoming Requests Card */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Upcoming Requests</p>
              <h3 className="text-2xl font-bold text-gray-900">{requestStats.upcomingRequests}</h3>
              <p className="text-xs text-gray-600 mt-1">Scheduled requests</p>
            </div>
            <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center">
              <Calendar className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Blood Type Distribution & Hospital Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Blood Type Distribution */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Blood Type Distribution</h3>
          <div className="grid grid-cols-4 gap-4">
            {Object.entries(requestStats.bloodTypeDistribution).map(([type, count]) => (
              <div key={type} className="text-center p-4 bg-gray-50 rounded-xl">
                <div className="text-lg font-bold text-red-600">{type}</div>
                <div className="text-sm text-gray-500 mt-1">{count} requests</div>
              </div>
            ))}
          </div>
        </div>

        {/* Hospital Distribution */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Hospital Distribution</h3>
          <div className="space-y-4">
            {Object.entries(requestStats.hospitalDistribution).map(([hospital, count]) => (
              <div key={hospital} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 text-gray-400 mr-2" />
                  <span className="text-gray-700">{hospital}</span>
                </div>
                <span className="font-semibold text-gray-900">{count} requests</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Request List */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <RequestList limit={5} />
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Request Management</h1>
          <p className="text-sm text-gray-600">Manage and monitor all blood donation requests</p>
        </div>
      </div>

      <Routes>
        <Route index element={renderOverview()} />
        <Route path="/list" element={<RequestList />} />
        <Route path="/details/:id" element={<RequestDetails />} />
        <Route path="/form" element={<RequestForm />} />
      </Routes>
    </div>
  );
};

export default AdminRequests;