import React, { useState } from 'react';
import { Search, MapPin, Calendar, Droplet, Heart, Share2, Phone, User } from 'react-feather';
import { Hospital, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const AvailableRequests = ({ handleAcceptRequest }) => {
  const [availableRequests, setAvailableRequests] = useState([
    {
      requestId: 'REQ001',
      bloodGroup: 'A+',
      requesterName: 'John Doe',
      // phone: '+91 98765-43210',
      state: 'Maharashtra',
      city: 'Mumbai',
      location: 'Andheri East',
      status: 'Pending',
      hospitalName: 'City Hospital',
      urgencyLevel: 'High',
      unitsNeeded: 2,
      requestDate: '2024-03-25',
      address: '123, Healthcare Avenue'
    },
   
  ]);

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Available Blood Requests</h2>
            <p className="text-gray-500 mt-1">Find and respond to blood donation requests in your area</p>
          </div>
          
          {/* Filters */}
          <div className="flex flex-wrap gap-3">
            <select className="px-4 py-2 bg-gray-50 border-none rounded-lg text-gray-600 text-sm focus:ring-2 focus:ring-red-500">
              <option value="">All Blood Types</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
            </select>
            <select className="px-4 py-2 bg-gray-50 border-none rounded-lg text-gray-600 text-sm focus:ring-2 focus:ring-red-500">
              <option value="">All Urgency Levels</option>
              <option value="Critical">Critical</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
            </select>
            <select className="px-4 py-2 bg-gray-50 border-none rounded-lg text-gray-600 text-sm focus:ring-2 focus:ring-red-500">
              <option value="">Distance</option>
              <option value="5">Within 5 km</option>
              <option value="10">Within 10 km</option>
              <option value="20">Within 20 km</option>
            </select>
          </div>
        </div>
      </div>

      {/* Requests Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {availableRequests.map((request) => (
          <motion.div
            key={request.requestId}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
          >
            {/* Request Header */}
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    request.urgencyLevel === 'Critical' ? 'bg-red-100' :
                    request.urgencyLevel === 'High' ? 'bg-orange-100' : 'bg-yellow-100'
                  }`}>
                    <Droplet className={`w-6 h-6 ${
                      request.urgencyLevel === 'Critical' ? 'text-red-600' :
                      request.urgencyLevel === 'High' ? 'text-orange-600' : 'text-yellow-600'
                    }`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{request.bloodGroup}</h3>
                    <p className="text-sm text-gray-500">{request.unitsNeeded} units needed</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  request.urgencyLevel === 'Critical' ? 'bg-red-100 text-red-800' :
                  request.urgencyLevel === 'High' ? 'bg-orange-100 text-orange-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {request.urgencyLevel}
                </span>
              </div>
            </div>

            {/* Request Details */}
            <div className="p-6 space-y-4">
              {/* Requester Details */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-gray-600">
                  <User className="w-4 h-4" />
                  <span className="text-sm font-medium">{request.requesterName}</span>
                </div>
                {/* <div className="flex items-center gap-2 text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span className="text-sm">{request.phone}</span>
                </div> */}
                <div className="flex items-center gap-2 text-gray-600">
                  <Hospital className="w-4 h-4" />
                  <span className="text-sm">{request.hospitalName}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{request.address}</span>
                </div>
                <div className="text-sm text-gray-600 pl-6">
                  {request.location}, {request.city}
                </div>
                <div className="text-sm text-gray-600 pl-6">
                  {request.state}
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">Requested on {request.requestDate}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex gap-3">
                <button
                  onClick={() => handleAcceptRequest(request)}
                  className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <Heart className="w-4 h-4" />
                  Accept Request
                </button>
                <button
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors duration-200"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {availableRequests.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-xl shadow-sm p-8 text-center"
        >
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <XCircle className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">No Requests Found</h3>
          <p className="mt-2 text-sm text-gray-500">There are currently no blood requests matching your criteria.</p>
        </motion.div>
      )}
    </div>
  );
};

export default AvailableRequests;