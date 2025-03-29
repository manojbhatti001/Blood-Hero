import React from 'react';
import { motion } from 'framer-motion';
import {
  Building,
  Activity,
  Clock,
  CheckCircle,
  Users,
  Plus,
  Bell,
  ArrowRight,
  Droplet,
  MapPin,
  MoreVertical
} from 'react-feather';
import { Hospital } from 'lucide-react';

const RequesterOverview = ({ profile = {}, dashboardStats = {}, activeRequests = [] }) => {
  // Default values for profile
  const defaultProfile = {
    hospitalName: 'Hospital Name Not Available',
    registrationNumber: 'N/A',
    type: 'N/A',
    operatingHours: 'N/A',
    emergencyContact: 'N/A',
  };

  // Default values for dashboardStats
  const defaultDashboardStats = {
    totalRequests: 0,
    completedRequests: 0,
    totalDonors: 0,
  };

  // Merge provided data with defaults
  const profileData = { ...defaultProfile, ...profile };
  const stats = { ...defaultDashboardStats, ...dashboardStats };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0
    }
  };

  const renderOverview = () => (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      <motion.div 
        variants={itemVariants}
        className="bg-gradient-to-r from-red-600 to-red-700 rounded-2xl p-8 text-white shadow-xl"
      >
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-white/20 rounded-xl">
            <Hospital className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Welcome, {profileData.hospitalName}</h2>
            <p className="text-red-100">Your trusted blood request management platform</p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/10 rounded-xl p-4">
            <p className="text-red-100 text-sm">Registration</p>
            <p className="text-xl font-semibold">{profileData.registrationNumber}</p>
          </div>
          <div className="bg-white/10 rounded-xl p-4">
            <p className="text-red-100 text-sm">Type</p>
            <p className="text-xl font-semibold">{profileData.type}</p>
          </div>
          <div className="bg-white/10 rounded-xl p-4">
            <p className="text-red-100 text-sm">Operating Hours</p>
            <p className="text-xl font-semibold">{profileData.operatingHours}</p>
          </div>
          <div className="bg-white/10 rounded-xl p-4">
            <p className="text-red-100 text-sm">Emergency Contact</p>
            <p className="text-xl font-semibold">{profileData.emergencyContact}</p>
          </div>
        </div>
      </motion.div>

      {/* Stats Overview with improved visuals */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          variants={itemVariants}
          className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-red-100 rounded-xl">
              <Activity className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-gray-900">{stats.totalRequests}</h3>
              <p className="text-sm text-gray-500">Total Requests</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-xl">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-gray-900">{stats.activeRequests}</h3>
              <p className="text-sm text-gray-500">Active Requests</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-xl">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-gray-900">{stats.completedRequests}</h3>
              <p className="text-sm text-gray-500">Completed</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-100 rounded-xl">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-gray-900">{stats.totalDonors}</h3>
              <p className="text-sm text-gray-500">Total Donors</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Quick Actions with enhanced hover effects */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          variants={itemVariants}
          className="bg-gradient-to-br from-red-500 to-red-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group transform hover:-translate-y-2"
        >
          <div className="flex items-start justify-between">
            <div className="p-3 bg-white/20 rounded-xl">
              <Plus className="w-6 h-6" />
            </div>
            <span className="text-xs font-medium bg-white/20 px-3 py-1 rounded-full">New Request</span>
          </div>
          <h3 className="text-xl font-bold mt-4">Create Request</h3>
          <p className="text-white/80 text-sm mt-1">Create a new blood request</p>
          <div className="flex items-center mt-4 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
            Create Now <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group transform hover:-translate-y-2"
        >
          <div className="flex items-start justify-between">
            <div className="p-3 bg-white/20 rounded-xl">
              <Bell className="w-6 h-6" />
            </div>
            <span className="text-xs font-medium bg-white/20 px-3 py-1 rounded-full">Active</span>
          </div>
          <h3 className="text-xl font-bold mt-4">Track Requests</h3>
          <p className="text-white/80 text-sm mt-1">Monitor active requests</p>
          <div className="flex items-center mt-4 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
            View Active <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group transform hover:-translate-y-2"
        >
          <div className="flex items-start justify-between">
            <div className="p-3 bg-white/20 rounded-xl">
              <Activity className="w-6 h-6" />
            </div>
            <span className="text-xs font-medium bg-white/20 px-3 py-1 rounded-full">Analytics</span>
          </div>
          <h3 className="text-xl font-bold mt-4">View Reports</h3>
          <p className="text-white/80 text-sm mt-1">Track and analyze your requests</p>
          <div className="flex items-center mt-4 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
            View Stats <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </div>
        </motion.div>
      </div>

      {/* Recent Requests with enhanced styling */}
      <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Recent Requests</h2>
            <p className="text-sm text-gray-500">Latest blood donation requests</p>
          </div>
          <button className="text-sm text-red-600 hover:text-red-700 font-medium flex items-center gap-1 hover:gap-2 transition-all">
            View All <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        
        <div className="space-y-4">
          {activeRequests.slice(0, 3).map((request) => (
            <div key={request.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-300 group">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform ${
                  request.urgencyLevel === 'Critical' ? 'bg-red-100 text-red-600' :
                  request.urgencyLevel === 'High' ? 'bg-orange-100 text-orange-600' :
                  'bg-blue-100 text-blue-600'
                }`}>
                  <Droplet className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{request.bloodGroup} Blood Required</h3>
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    <MapPin className="w-4 h-4" /> {request.hospitalLocation}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  request.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                  request.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                  'bg-green-100 text-green-700'
                }`}>
                  {request.status}
                </span>
                <button className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                  <MoreVertical className="w-4 h-4 text-gray-500" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Analytics Cards with improved visuals */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="font-semibold text-gray-800 mb-6">Request Status Distribution</h3>
          <div className="space-y-6">
            {[
              { label: 'Pending', value: 45, color: 'bg-yellow-500' },
              { label: 'In Progress', value: 30, color: 'bg-blue-500' },
              { label: 'Completed', value: 25, color: 'bg-green-500' }
            ].map((item) => (
              <div key={item.label}>
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span className="font-medium">{item.label}</span>
                  <span className="font-bold">{item.value}%</span>
                </div>
                <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${item.value}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={`h-full ${item.color}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="font-semibold text-gray-800 mb-6">Blood Type Requirements</h3>
          <div className="grid grid-cols-4 gap-4">
            {['A+', 'B+', 'O+', 'AB+', 'A-', 'B-', 'O-', 'AB-'].map((type) => (
              <motion.div 
                key={type} 
                className="text-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-lg font-bold text-red-600">{type}</div>
                <div className="text-xs text-gray-500 mt-2">
                  {Math.floor(Math.random() * 10)} units
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );

  return renderOverview();
};

export default RequesterOverview;