import React, { useState } from 'react';
import { Heart, TrendingUp, Users, Star, Search, Share2, Phone, Award, Shield, Calendar, Clock, Activity, Lock, X, Droplet, MapPin, Plus, Bell, ArrowRight, CheckCircle, Hospital, MoreVertical } from 'react-feather';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';

const Overview = ({ profileData, donationHistory }) => {
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

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
      // Add your API call here
      
      toast.success('Password updated successfully');
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      setShowPasswordModal(false);
    } catch (error) {
      toast.error('Failed to update password');
    }
  };

  // Calculate next eligible date
  const calculateNextEligibleDate = (lastDonationDate) => {
    const date = new Date(lastDonationDate);
    date.setMonth(date.getMonth() + 3);
    return date.toLocaleDateString();
  };

  // Calculate donation streak
  const calculateStreak = () => {
    return profileData.donationStreak || 3;
  };

  const renderExistingOverview = () => {
    // Sample data - Replace with actual data from your API/state
    const donationStats = {
      monthlyDonations: [4, 3, 5, 2, 4, 3, 5, 4, 3, 5, 4, 6], // Last 12 months
      upcomingAppointments: [
        { date: '2024-03-15', hospital: 'City General Hospital', time: '10:00 AM' },
        { date: '2024-04-20', hospital: 'Medical Center East', time: '2:30 PM' }
      ],
      recentAchievements: [
        { title: 'Platinum Donor', date: '2024-02-01', description: 'Completed 20 donations' },
        { title: 'Life Saver Elite', date: '2024-01-15', description: 'Helped save 50 lives' }
      ],
      impactMetrics: {
        hospitalsServed: 8,
        citiesReached: 3,
        totalLivesSaved: profileData.totalDonations * 3,
        donationSuccessRate: '98%'
      }
    };

    return (
      <div className="space-y-8">
        {/* Enhanced Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Existing stats cards with enhanced information */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Donations</p>
                <h3 className="text-2xl font-bold text-gray-900">{profileData.totalDonations}</h3>
                <p className="text-xs text-gray-600 mt-1">Lifetime contributions</p>
              </div>
              <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 text-red-600" />
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center text-sm text-green-600">
                <TrendingUp className="w-4 h-4 mr-1" />
                <span>12% more than last year</span>
              </div>
            </div>
          </div>

          {/* Enhanced Lives Impacted Card */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Lives Impacted</p>
                <h3 className="text-2xl font-bold text-gray-900">{donationStats.impactMetrics.totalLivesSaved}</h3>
                <p className="text-xs text-gray-600 mt-1">Across {donationStats.impactMetrics.hospitalsServed} hospitals</p>
              </div>
              <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center text-sm text-blue-600">
                <MapPin className="w-4 h-4 mr-1" />
                <span>{donationStats.impactMetrics.citiesReached} cities reached</span>
              </div>
            </div>
          </div>

          {/* Enhanced Next Eligible Date Card */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Next Eligible Date</p>
                <h3 className="text-xl font-bold text-gray-900">
                  {new Date(new Date(profileData.lastDonation).setMonth(new Date(profileData.lastDonation).getMonth() + 3)).toLocaleDateString()}
                </h3>
                <p className="text-xs text-gray-600 mt-1">
                  {donationStats.upcomingAppointments.length > 0 ? 'Appointment scheduled' : 'No appointment yet'}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center text-sm text-gray-600">
                <Clock className="w-4 h-4 mr-1" />
                <span>Based on last donation</span>
              </div>
            </div>
          </div>

          {/* Enhanced Donation Streak Card */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Success Rate</p>
                <h3 className="text-2xl font-bold text-gray-900">{donationStats.impactMetrics.donationSuccessRate}</h3>
                <p className="text-xs text-gray-600 mt-1">Successful donations</p>
              </div>
              <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center">
                <Activity className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center text-sm text-purple-600">
                <Award className="w-4 h-4 mr-1" />
                <span>Top performer badge</span>
              </div>
            </div>
          </div>
        </div>

        {/* Donation History Chart */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Donation History</h3>
          <div className="h-64">
            {/* Add your preferred charting library here */}
            <div className="grid grid-cols-12 gap-2 h-40">
              {donationStats.monthlyDonations.map((count, index) => (
                <div key={index} className="flex items-end h-full">
                  <div 
                    className="w-full bg-red-200 rounded-t"
                    style={{ height: `${(count/Math.max(...donationStats.monthlyDonations))*100}%` }}
                  ></div>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-xs text-gray-500">
              <span>Mar</span>
              <span>Apr</span>
              <span>May</span>
              <span>Jun</span>
              <span>Jul</span>
              <span>Aug</span>
              <span>Sep</span>
              <span>Oct</span>
              <span>Nov</span>
              <span>Dec</span>
              <span>Jan</span>
              <span>Feb</span>
            </div>
          </div>
        </div>

        {/* Upcoming Appointments */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Appointments</h3>
            <div className="space-y-4">
              {donationStats.upcomingAppointments.map((appointment, index) => (
                <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">{appointment.hospital}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Achievements */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Achievements</h3>
            <div className="space-y-4">
              {donationStats.recentAchievements.map((achievement, index) => (
                <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                    <Award className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div>
                    <p className="font-medium">{achievement.title}</p>
                    <p className="text-sm text-gray-500">{achievement.description}</p>
                    <p className="text-xs text-gray-400">{new Date(achievement.date).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderNewOverview = () => (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Add all the motion.div components and other elements from the provided code */}
      <motion.div 
        variants={itemVariants}
        className="bg-gradient-to-r from-red-600 to-red-700 rounded-2xl p-8 text-white shadow-xl"
      >
        {/* Copy the entire content structure */}
        {/* ... */}
      </motion.div>

      {/* Stats Overview with improved visuals */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Copy all the motion.div stat cards */}
        {/* ... */}
      </div>

      {/* Quick Actions with enhanced hover effects */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Copy all the motion.div action cards */}
        {/* ... */}
      </div>

      {/* Recent Requests with enhanced styling */}
      <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-lg p-6">
        {/* Copy the entire recent requests section */}
        {/* ... */}
      </motion.div>

      {/* Analytics Cards with improved visuals */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Copy both analytics cards */}
        {/* ... */}
      </div>
    </motion.div>
  );

  return (
    <div className="space-y-8">
      {renderExistingOverview()}
      {renderNewOverview()}
    </div>
  );
};

export default Overview;