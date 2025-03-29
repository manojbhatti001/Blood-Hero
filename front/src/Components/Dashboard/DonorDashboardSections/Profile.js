import React, { useState } from 'react';
import { Activity, User, Droplet, Gift, Calendar, Phone, MapPin, Shield, Award, Star, Users, TrendingUp, Edit, Check, Camera, Lock } from 'react-feather';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showCameraModal, setShowCameraModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  
  const [profileData, setProfileData] = useState({
    fullName: 'John Doe',
    bloodGroup: 'A+',
    totalDonations: 5,
    lastDonation: '2023-10-15',
    email: 'john@example.com',
    phoneNumber: '+1234567890',
    addressLine1: '123 Main St',
    addressLine2: 'Apt 4B',
    city: 'Mumbai',
    state: 'Maharashtra',
    postalCode: '400001',
    profileImage: null,
    donationStreak: 3,
    totalLivesSaved: 15
  });

  const handleProfileChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-xl shadow-lg p-4 sm:p-6">
        {/* Profile Header Content */}
        <div className="flex flex-col gap-4">
          {/* Profile Info Section */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
            <div className="w-20 h-20 bg-white rounded-full shadow-lg flex items-center justify-center overflow-hidden shrink-0">
              {profileData.profileImage ? (
                <img 
                  src={profileData.profileImage} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-10 h-10 text-red-500" />
              )}
            </div>
            <div className="text-center sm:text-left">
              <h2 className="text-xl sm:text-2xl font-bold text-white">{profileData.fullName}</h2>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-3 mt-2">
                <span className="px-3 py-1 bg-white/20 rounded-full text-sm text-white flex items-center gap-2">
                  <Droplet className="w-4 h-4" />
                  {profileData.bloodGroup}
                </span>
                <span className="px-3 py-1 bg-white/20 rounded-full text-sm text-white flex items-center gap-2">
                  <Gift className="w-4 h-4" />
                  {profileData.totalDonations} donations
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="w-full sm:w-auto px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              {isEditing ? (
                <>
                  <Check className="w-4 h-4" />
                  Save Changes
                </>
              ) : (
                <>
                  <Edit className="w-4 h-4" />
                  Edit Profile
                </>
              )}
            </button>
            <button
              onClick={() => setShowCameraModal(true)}
              className="w-full sm:w-auto px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              <Camera className="w-4 h-4" />
              <span className="sm:inline">Update Photo</span>
            </button>
            <button
              onClick={() => setShowPasswordModal(true)}
              className="w-full sm:w-auto px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              <Lock className="w-4 h-4" />
              <span className="sm:inline">Change Password</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column - Personal & Contact Info */}
        <div className="md:col-span-2 space-y-6">
          {/* Personal Information */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-gray-500" />
              Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={profileData.fullName}
                  onChange={(e) => handleProfileChange('fullName', e.target.value)}
                  disabled={!isEditing}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                />
              </div>
              {/* Add other personal information fields */}
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Phone className="w-5 h-5 text-gray-500" />
              Contact Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => handleProfileChange('email', e.target.value)}
                  disabled={!isEditing}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={profileData.phoneNumber}
                  onChange={(e) => handleProfileChange('phoneNumber', e.target.value)}
                  disabled={!isEditing}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>
          </div>

          {/* Address Information */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-gray-500" />
              Address Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address Line 1</label>
                <input
                  type="text"
                  value={profileData.addressLine1}
                  onChange={(e) => handleProfileChange('addressLine1', e.target.value)}
                  disabled={!isEditing}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address Line 2</label>
                <input
                  type="text"
                  value={profileData.addressLine2}
                  onChange={(e) => handleProfileChange('addressLine2', e.target.value)}
                  disabled={!isEditing}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                <input
                  type="text"
                  value={profileData.city}
                  onChange={(e) => handleProfileChange('city', e.target.value)}
                  disabled={!isEditing}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                <input
                  type="text"
                  value={profileData.state}
                  onChange={(e) => handleProfileChange('state', e.target.value)}
                  disabled={!isEditing}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
                <input
                  type="text"
                  value={profileData.postalCode}
                  onChange={(e) => handleProfileChange('postalCode', e.target.value)}
                  disabled={!isEditing}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Stats & Additional Info */}
        <div className="space-y-6">
          {/* Donation Stats */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-gray-500" />
              Donation Statistics
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">Total Donations</span>
                <span className="font-semibold">{profileData.totalDonations}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">Last Donation</span>
                <span className="font-semibold">
                  {profileData.lastDonation ? new Date(profileData.lastDonation).toLocaleDateString() : 'Never'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;