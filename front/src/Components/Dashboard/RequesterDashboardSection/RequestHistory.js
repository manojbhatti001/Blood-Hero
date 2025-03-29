import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart, 
  CheckCircle, 
  X, 
  Droplet, 
  Calendar, 
  MoreVertical, 
  Clock 
} from 'react-feather';

const RequestHistory = () => {
  // Dummy data for request history
  const [requestHistory] = useState([
    {
      id: 'HIST001',
      bloodGroup: 'AB+',
      hospitalName: 'Max Hospital',
      status: 'Completed',
      date: '2024-03-15',
      donorCount: 2,
      location: 'Chennai'
    },
    {
      id: 'HIST002',
      bloodGroup: 'O+',
      hospitalName: 'Medanta Hospital',
      status: 'Cancelled',
      date: '2024-03-10',
      donorCount: 0,
      location: 'Gurgaon'
    },
    {
      id: 'HIST003',
      bloodGroup: 'A-',
      hospitalName: 'AIIMS Hospital',
      status: 'Completed',
      date: '2024-03-05',
      donorCount: 1,
      location: 'Delhi'
    }
  ]);

  // Render Request History
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Header Section */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Request History</h2>
            <p className="text-sm text-gray-500 mt-1">Overview of your past blood requests</p>
          </div>
          
          {/* Filter Controls */}
          <div className="flex items-center gap-3">
            <select className="text-sm border-gray-200 rounded-lg focus:ring-red-500 focus:border-red-500">
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <select className="text-sm border-gray-200 rounded-lg focus:ring-red-500 focus:border-red-500">
              <option value="30">Last 30 Days</option>
              <option value="90">Last 90 Days</option>
              <option value="all">All Time</option>
            </select>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Requests</p>
                <h4 className="text-2xl font-bold text-gray-900 mt-1">{requestHistory.length}</h4>
              </div>
              <div className="p-3 bg-gray-100 rounded-lg">
                <BarChart className="w-6 h-6 text-gray-600" />
              </div>
            </div>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600">Completed</p>
                <h4 className="text-2xl font-bold text-green-700 mt-1">
                  {requestHistory.filter(r => r.status === 'Completed').length}
                </h4>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
          <div className="bg-red-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-red-600">Cancelled</p>
                <h4 className="text-2xl font-bold text-red-700 mt-1">
                  {requestHistory.filter(r => r.status === 'Cancelled').length}
                </h4>
              </div>
              <div className="p-3 bg-red-100 rounded-lg">
                <X className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Request History Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Request Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hospital Info
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {requestHistory.map((request, index) => (
                <motion.tr 
                  key={request.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="hover:bg-gray-50"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-red-100">
                        <Droplet className="h-5 w-5 text-red-600" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {request.id}
                        </div>
                        <div className="text-sm text-gray-500">
                          Blood Group: {request.bloodGroup}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{request.hospitalName}</div>
                    <div className="text-sm text-gray-500">{request.location}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                      {request.date}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      request.status === 'Completed' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {request.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">
                      View Details
                    </button>
                    <button className="text-gray-600 hover:text-gray-900">
                      <MoreVertical className="w-4 h-4 inline" />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>

          {/* Empty State */}
          {requestHistory.length === 0 && (
            <div className="text-center py-12">
              <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900">No Request History</h3>
              <p className="text-gray-500 mt-2">Your past blood requests will appear here</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 sm:px-6">
          <div className="flex items-center text-sm text-gray-500">
            Showing <span className="font-medium mx-1">1</span> to <span className="font-medium mx-1">10</span> of{' '}
            <span className="font-medium mx-1">{requestHistory.length}</span> results
          </div>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
              Previous
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
              Next
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RequestHistory;