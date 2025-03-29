import React, { useState } from 'react';
import { Download, Heart, Calendar, MapPin, Gift, Hospital, Award, Share2, Droplet } from 'lucide-react';
import { motion } from 'framer-motion';

const DonationHistory = ({ handleDownloadCertificate }) => {
  const [donationHistory, setDonationHistory] = useState([
    {
      donationId: 'DON001',
      date: '2024-02-15',
      recipientName: 'Amit Kumar',
      hospitalName: 'Max Hospital',
      bloodGroup: 'A+',
      status: 'Completed',
      certificate: 'Available'
    },
    {
      donationId: 'DON002',
      date: '2024-01-20',
      recipientName: 'Lisa Chen',
      hospitalName: 'Medanta Hospital',
      bloodGroup: 'B-',
      status: 'Completed',
      certificate: 'Available'
    },
    {
      donationId: 'DON003',
      date: '2023-12-10',
      recipientName: 'David Wilson',
      hospitalName: 'Apollo Hospital',
      bloodGroup: 'O+',
      status: 'Completed',
      certificate: 'Available'
    }
  ]);

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Donation History</h2>
            <p className="text-gray-500 mt-1">Track your blood donation journey and impact</p>
          </div>
          
          {/* Filter Controls */}
          <div className="flex flex-wrap gap-3">
            <select className="px-4 py-2 bg-gray-50 border-none rounded-lg text-gray-600 text-sm focus:ring-2 focus:ring-red-500">
              <option value="">All Blood Groups</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
            
            <select className="px-4 py-2 bg-gray-50 border-none rounded-lg text-gray-600 text-sm focus:ring-2 focus:ring-red-500">
              <option value="">All Time</option>
              <option value="last_month">Last Month</option>
              <option value="last_3_months">Last 3 Months</option>
              <option value="last_6_months">Last 6 Months</option>
              <option value="last_year">Last Year</option>
            </select>
          </div>
        </div>
      </div>

      {/* Donations Grid */}
      <div className="grid grid-cols-1 gap-4">
        {donationHistory.map((donation, index) => (
          <motion.div
            key={donation.donationId}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-sm overflow-hidden"
          >
            <div className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Left Section - Basic Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center">
                      <Gift className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-gray-900">Donation #{donation.donationId}</h3>
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {donation.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        Recipient: {donation.recipientName}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{donation.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Droplet className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{donation.bloodGroup}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Hospital className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{donation.hospitalName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">Certificate {donation.certificate}</span>
                    </div>
                  </div>
                </div>

                {/* Right Section - Actions */}
                <div className="flex flex-col sm:flex-row md:flex-col gap-3 min-w-[200px] justify-center">
                  {donation.certificate === 'Available' && (
                    <button 
                      onClick={() => handleDownloadCertificate(donation)}
                      className="w-full px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors flex items-center justify-center gap-2"
                    >
                      <Award className="w-4 h-4" />
                      Download Certificate
                    </button>
                  )}
                  <button 
                    className="w-full px-4 py-2 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                  >
                    <Share2 className="w-4 h-4" />
                    Share Details
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {donationHistory.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-xl shadow-sm p-8 text-center"
        >
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Gift className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">No Donation History</h3>
          <p className="mt-2 text-sm text-gray-500">Your blood donation history will appear here once you make your first donation.</p>
        </motion.div>
      )}

      {/* Pagination */}
      {donationHistory.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Showing <span className="font-medium">1</span> to{" "}
              <span className="font-medium">{donationHistory.length}</span> of{" "}
              <span className="font-medium">{donationHistory.length}</span> donations
            </p>
            <div className="flex gap-2">
              <button className="px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                Previous
              </button>
              <button className="px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonationHistory;