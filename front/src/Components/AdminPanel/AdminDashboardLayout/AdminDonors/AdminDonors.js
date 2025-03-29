import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Users, Activity, Award, Calendar, Droplet, MapPin } from 'react-feather';

// Import components
import DonorList from './DonorList';
import DonorDetails from './DonorDetails';
import DonorForm from './DonorForm';

const AdminDonors = () => {
  const [donorStats, setDonorStats] = useState({
    totalDonors: 0,
    activeDonors: 0,
    recentDonations: 0,
    upcomingAppointments: 0,
    bloodTypeDistribution: {},
    locationDistribution: {}
  });

  useEffect(() => {
    // Fetch donor statistics from your API
    fetchDonorStats();
  }, []);

  const fetchDonorStats = async () => {
    try {
      // Replace with your actual API endpoint
      const response = await fetch('/api/admin/donor-stats');
      const data = await response.json();
      setDonorStats(data);
    } catch (error) {
      console.error('Error fetching donor stats:', error);
    }
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Donors Card */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Donors</p>
              <h3 className="text-2xl font-bold text-gray-900">{donorStats.totalDonors}</h3>
              <p className="text-xs text-gray-600 mt-1">Registered donors</p>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Active Donors Card */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Active Donors</p>
              <h3 className="text-2xl font-bold text-gray-900">{donorStats.activeDonors}</h3>
              <p className="text-xs text-gray-600 mt-1">Last 3 months</p>
            </div>
            <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center">
              <Activity className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        {/* Recent Donations Card */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Recent Donations</p>
              <h3 className="text-2xl font-bold text-gray-900">{donorStats.recentDonations}</h3>
              <p className="text-xs text-gray-600 mt-1">This month</p>
            </div>
            <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center">
              <Droplet className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>

        {/* Upcoming Appointments Card */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Upcoming Appointments</p>
              <h3 className="text-2xl font-bold text-gray-900">{donorStats.upcomingAppointments}</h3>
              <p className="text-xs text-gray-600 mt-1">Next 7 days</p>
            </div>
            <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center">
              <Calendar className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Blood Type Distribution & Location Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Blood Type Distribution */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Blood Type Distribution</h3>
          <div className="grid grid-cols-4 gap-4">
            {Object.entries(donorStats.bloodTypeDistribution).map(([type, count]) => (
              <div key={type} className="text-center p-4 bg-gray-50 rounded-xl">
                <div className="text-lg font-bold text-red-600">{type}</div>
                <div className="text-sm text-gray-500 mt-1">{count} donors</div>
              </div>
            ))}
          </div>
        </div>

        {/* Location Distribution */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Location Distribution</h3>
          <div className="space-y-4">
            {Object.entries(donorStats.locationDistribution).map(([location, count]) => (
              <div key={location} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 text-gray-400 mr-2" />
                  <span className="text-gray-700">{location}</span>
                </div>
                <span className="font-semibold text-gray-900">{count} donors</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Donor List */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <DonorList limit={5} />
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Donor Management</h1>
          <p className="text-sm text-gray-600">Manage and monitor all blood donors</p>
        </div>
      </div>

      <Routes>
        <Route index element={renderOverview()} />
        <Route path="/list" element={<DonorList />} />
        <Route path="/details/:id" element={<DonorDetails />} />
        <Route path="/form" element={<DonorForm />} />
      </Routes>
    </div>
  );
};

export default AdminDonors;