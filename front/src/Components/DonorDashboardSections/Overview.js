import React from 'react';
import { Heart, Calendar, Activity, Award } from 'lucide-react';

const Overview = ({ profileData, donationHistory }) => {
  // Calculate next eligible date
  const calculateNextEligibleDate = (lastDonationDate) => {
    const date = new Date(lastDonationDate);
    date.setMonth(date.getMonth() + 3);
    return date.toLocaleDateString();
  };

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Donations Card */}
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
        </div>

        {/* Next Eligible Date Card */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Next Eligible Date</p>
              <h3 className="text-xl font-bold text-gray-900">
                {calculateNextEligibleDate(profileData.lastDonation)}
              </h3>
            </div>
            <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center">
              <Calendar className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;