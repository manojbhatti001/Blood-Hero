import React, { useState } from 'react';
import { Clock, MapPin, Phone, Droplet, Check, Calendar } from 'react-feather';
import { Hospital } from 'lucide-react';
import { motion } from 'framer-motion';

const AcceptedRequests = () => {
  const [acceptedRequests, setAcceptedRequests] = useState([
    {
      requestId: 'ACC001',
      bloodGroup: 'AB+',
      requesterName: 'Priya Singh',
      location: 'Chennai, Tamil Nadu',
      status: 'In Progress',
      hospitalName: 'Global Hospital',
      acceptedDate: '2024-03-23',
      donationDate: '2024-03-26',
      contactNumber: '+91 9876543210'
    },
    {
      requestId: 'ACC002',
      bloodGroup: 'O+',
      requesterName: 'Mike Johnson',
      location: 'Pune, Maharashtra',
      status: 'Scheduled',
      hospitalName: 'Ruby Hall Clinic',
      acceptedDate: '2024-03-24',
      donationDate: '2024-03-27',
      contactNumber: '+91 9876543211'
    }
  ]);

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Accepted Requests</h2>
            <p className="text-gray-500 mt-1">Track and manage your accepted blood donation requests</p>
          </div>
          
          {/* Status Filter */}
          <select className="px-4 py-2 bg-gray-50 border-none rounded-lg text-gray-600 text-sm focus:ring-2 focus:ring-red-500">
            <option value="">All Status</option>
            <option value="Scheduled">Scheduled</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Requests Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {acceptedRequests.map((request) => (
          <motion.div
            key={request.requestId}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm overflow-hidden"
          >
            {/* Status Banner */}
            <div className={`px-6 py-3 ${
              request.status === 'Scheduled' ? 'bg-blue-50' :
              request.status === 'In Progress' ? 'bg-yellow-50' :
              'bg-green-50'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${
                    request.status === 'Scheduled' ? 'bg-blue-500' :
                    request.status === 'In Progress' ? 'bg-yellow-500' :
                    'bg-green-500'
                  }`}></span>
                  <span className={`text-sm font-medium ${
                    request.status === 'Scheduled' ? 'text-blue-700' :
                    request.status === 'In Progress' ? 'text-yellow-700' :
                    'text-green-700'
                  }`}>
                    {request.status}
                  </span>
                </div>
                <span className="text-sm text-gray-500">ID: {request.requestId}</span>
              </div>
            </div>

            {/* Request Content */}
            <div className="p-6">
              <div className="flex items-start gap-4">
                {/* Blood Group Icon */}
                <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Droplet className="w-6 h-6 text-red-600" />
                </div>

                {/* Request Details */}
                <div className="flex-grow">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900">Blood Group {request.bloodGroup}</h3>
                      <p className="text-sm text-gray-500">{request.requesterName}</p>
                    </div>
                  </div>

                  {/* Timeline */}
                  <div className="mt-4 space-y-3">
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-gray-600" />
                      </div>
                      <div>
                        <p className="text-gray-600">Accepted on</p>
                        <p className="font-medium text-gray-900">{request.acceptedDate}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
                        <Calendar className="w-4 h-4 text-gray-600" />
                      </div>
                      <div>
                        <p className="text-gray-600">Donation Date</p>
                        <p className="font-medium text-gray-900">{request.donationDate}</p>
                      </div>
                    </div>
                  </div>

                  {/* Hospital & Location Info */}
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Hospital className="w-4 h-4" />
                      <span className="text-sm">{request.hospitalName}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{request.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Phone className="w-4 h-4" />
                      <span className="text-sm">{request.contactNumber}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex gap-3">
                <button className="flex-1 bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                  <Calendar className="w-4 h-4" />
                  View Details
                </button>
                <button className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2">
                  <Phone className="w-4 h-4" />
                  Contact Hospital
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {acceptedRequests.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-xl shadow-sm p-8 text-center"
        >
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Clock className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">No Accepted Requests</h3>
          <p className="mt-2 text-sm text-gray-500">You haven't accepted any blood donation requests yet.</p>
        </motion.div>
      )}
    </div>
  );
};

export default AcceptedRequests;