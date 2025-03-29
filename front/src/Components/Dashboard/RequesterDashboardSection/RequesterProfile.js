import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import {
  CheckCircle,
  Edit,
  User,
  Mail,
  Phone,
  AlertCircle,
  Clock,
  MapPin,
  Lock,
  Activity,
  Users,
  Bell
} from 'react-feather';
import { Hospital } from 'lucide-react';

const RequesterProfile = () => {
  // Profile data state
  const [profile, setProfile] = useState({
    hospitalName: 'City General Hospital',
    email: 'contact@cityhospital.com',
    phone: '+91 98765-43210',
    address: '123 Healthcare Avenue',
    state: 'Maharashtra',
    city: 'Mumbai',
    registrationNumber: 'HOSP123456',
    type: 'Multi-Specialty',
    operatingHours: '24x7',
    emergencyContact: '+91 98765-43213',
    postalCode: '400001'
  });

  // Other state declarations
  const [isEditing, setIsEditing] = useState(false);
  const [showNewRequestForm, setShowNewRequestForm] = useState(false);
  const [newRequest, setNewRequest] = useState({
    bloodGroup: '',
    units: '',
    urgencyLevel: 'Normal',
    requiredDate: '',
    patientDetails: '',
    additionalNotes: '',
  });

  const [activeRequests] = useState([]);
  const [requestHistory] = useState([]);

  const [dashboardStats, setDashboardStats] = useState({
    totalRequests: activeRequests.length + requestHistory.length,
    activeRequests: activeRequests.length,
    completedRequests: requestHistory.filter(r => r.status === 'Completed').length,
    totalDonors: activeRequests.reduce((acc, req) => acc + req.donors.length, 0)
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Animation variants
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

  // Password change handler
  const handlePasswordChange = async () => {
    try {
      if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
        toast.error('All password fields are required');
        return;
      }
      
      if (passwordData.newPassword !== passwordData.confirmPassword) {
        toast.error('New passwords do not match');
        return;
      }

      // Here you would typically make an API call to update the password
      toast.success('Password updated successfully');
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error) {
      toast.error('Failed to update password');
    }
  };

  // Render Profile Settings
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Profile Header Card */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-xl shadow-lg p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-white rounded-xl shadow-lg flex items-center justify-center">
              <Hospital className="w-10 h-10 text-red-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">{profile.hospitalName}</h1>
              <p className="text-red-100 mt-1">{profile.type}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="px-3 py-1 bg-white/20 rounded-full text-sm text-white">
                  Reg. No: {profile.registrationNumber}
                </span>
                <span className="px-3 py-1 bg-green-500 rounded-full text-sm text-white flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" /> Verified
                </span>
              </div>
            </div>
          </div>
          <div className="mt-4 md:mt-0">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center gap-2 px-4 py-2 bg-white text-red-600 rounded-lg hover:bg-red-50 transition-colors"
            >
              {isEditing ? (
                <>
                  <CheckCircle className="w-4 h-4" />
                  Save Changes
                </>
              ) : (
                <>
                  <Edit className="w-4 h-4" />
                  Edit Profile
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Contact Information */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-gray-500" />
              Contact Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={profile.email}
                    disabled={!isEditing}
                    className="bg-transparent border-none focus:ring-0 flex-1"
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    value={profile.phone}
                    disabled={!isEditing}
                    className="bg-transparent border-none focus:ring-0 flex-1"
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Emergency Contact</label>
                <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-red-500" />
                  <input
                    type="tel"
                    value={profile.emergencyContact}
                    disabled={!isEditing}
                    className="bg-transparent border-none focus:ring-0 flex-1"
                    onChange={(e) => setProfile({ ...profile, emergencyContact: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Operating Hours</label>
                <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                  <Clock className="w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={profile.operatingHours}
                    disabled={!isEditing}
                    className="bg-transparent border-none focus:ring-0 flex-1"
                    onChange={(e) => setProfile({ ...profile, operatingHours: e.target.value })}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Address Information */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-gray-500" />
              Location Details
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                <input
                  type="text"
                  value={profile.address}
                  disabled={!isEditing}
                  className="w-full p-3 bg-gray-50 rounded-lg border-none focus:ring-1 focus:ring-red-500"
                  onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input
                    type="text"
                    value={profile.city}
                    disabled={!isEditing}
                    className="w-full p-3 bg-gray-50 rounded-lg border-none focus:ring-1 focus:ring-red-500"
                    onChange={(e) => setProfile({ ...profile, city: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                  <input
                    type="text"
                    value={profile.state}
                    disabled={!isEditing}
                    className="w-full p-3 bg-gray-50 rounded-lg border-none focus:ring-1 focus:ring-red-500"
                    onChange={(e) => setProfile({ ...profile, state: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
                  <input
                    type="text"
                    value={profile.postalCode}
                    disabled={!isEditing}
                    className="w-full p-3 bg-gray-50 rounded-lg border-none focus:ring-1 focus:ring-red-500"
                    onChange={(e) => setProfile({ ...profile, postalCode: e.target.value })}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Password Change Section */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Lock className="w-5 h-5 text-gray-500" />
              Change Password
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                  <Lock className="w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                    className="bg-transparent border-none focus:ring-0 flex-1"
                    placeholder="Enter current password"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                  <Lock className="w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                    className="bg-transparent border-none focus:ring-0 flex-1"
                    placeholder="Enter new password"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                  <Lock className="w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                    className="bg-transparent border-none focus:ring-0 flex-1"
                    placeholder="Confirm new password"
                  />
                </div>
              </div>
              <div className="flex justify-end mt-4">
                <button
                  onClick={handlePasswordChange}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
                >
                  <Lock className="w-4 h-4" />
                  Update Password
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-gray-500" />
              Quick Statistics
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">Total Requests</span>
                <span className="font-semibold">247</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <span className="text-sm text-green-600">Successful Donations</span>
                <span className="font-semibold text-green-600">182</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <span className="text-sm text-blue-600">Active Requests</span>
                <span className="font-semibold text-blue-600">12</span>
              </div>
            </div>
          </div>

          {/* Verification Status */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-gray-500" />
              Verification Status
            </h2>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm">Email Verified</span>
              </div>
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm">Phone Verified</span>
              </div>
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm">License Verified</span>
              </div>
            </div>
          </div>

          {/* Settings Quick Access */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
            <div className="space-y-2">
              <button className="w-full p-2 text-left text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-2">
                <Users className="w-4 h-4" />
                Manage Team Members
              </button>
              <button className="w-full p-2 text-left text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-2">
                <Bell className="w-4 h-4" />
                Notification Settings
              </button>
              <button className="w-full p-2 text-left text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Security Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RequesterProfile;