import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {  Phone, MapPin, Clock, AlertCircle, Hospital } from 'lucide-react'
import { AnimatedSection } from './Animation'

export default function SearchRequests() {
  const [requests, setRequests] = useState([])
  const [filteredRequests, setFilteredRequests] = useState([])
  const [searchPhone, setSearchPhone] = useState('')

  useEffect(() => {
    // Load requests from localStorage
    const savedRequests = JSON.parse(localStorage.getItem('bloodRequests') || '[]')
    setRequests(savedRequests)
    setFilteredRequests(savedRequests)
  }, [])

  const handleSearch = (value) => {
    setSearchPhone(value)
    if (value.trim() === '') {
      setFilteredRequests(requests)
    } else {
      const filtered = requests.filter(req => 
        req.phone.includes(value.trim())
      )
      setFilteredRequests(filtered)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="pt-32 pb-16">
        <div className="container max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
              Track Blood Request
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Enter the phone number associated with your blood request to check its status
            </p>
          </div>

          {/* Search Section */}
          <div className="max-w-xl mx-auto mb-8 sm:mb-12">
            <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="tel"
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:ring-1 focus:ring-red-200 transition-all text-base"
                  placeholder="Enter phone number..."
                  value={searchPhone}
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Results Section */}
          {filteredRequests.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6">
              {filteredRequests.map(request => (
                <RequestCard key={request.id} request={request} />
              ))}
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center bg-white rounded-xl shadow-lg p-6 sm:p-8 max-w-md mx-auto"
            >
              <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3">No Requests Found</h3>
              <p className="text-base text-gray-600">
                No blood requests found for this phone number. Please check the number and try again.
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

function RequestCard({ request }) {
  return (
    <motion.div 
      className="bg-white rounded-xl shadow-lg overflow-hidden"
      whileHover={{ y: -3 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
              <span className="text-lg font-bold text-red-600">{request.bloodType}</span>
            </div>
            <div className="ml-3">
              <h3 className="text-base font-semibold text-gray-900">{request.requestorName}</h3>
              <p className="text-sm text-gray-500">{request.phone}</p>
            </div>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            request.urgencyLevel === 'critical' ? 'bg-red-100 text-red-700' :
            request.urgencyLevel === 'urgent' ? 'bg-yellow-100 text-yellow-700' :
            'bg-green-100 text-green-700'
          }`}>
            {request.urgencyLevel}
          </span>
        </div>

        <div className="space-y-2">
          <div className="flex items-center text-gray-600">
            <Hospital className="w-4 h-4 mr-2 text-gray-400" />
            <span className="text-sm truncate">{request.hospital}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <MapPin className="w-4 h-4 mr-2 text-gray-400" />
            <span className="text-sm truncate">{request.city}, {request.state}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Clock className="w-4 h-4 mr-2 text-gray-400" />
            <span className="text-sm">{new Date(request.dateCreated).toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-6 py-3 bg-gray-50 border-t">
        <button 
          className="w-full bg-red-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-all transform hover:scale-102 hover:shadow-md"
          onClick={() => window.location.href = `tel:${request.phone}`}
        >
          Contact Requestor
        </button>
      </div>
    </motion.div>
  )
}