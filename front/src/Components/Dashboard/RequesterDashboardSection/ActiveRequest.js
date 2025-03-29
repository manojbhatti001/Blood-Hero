import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Droplet, 
  MoreVertical, 
  MapPin, 
  Calendar, 
  User, 
  Phone,
  AlertCircle,
  Home,
  Loader,
  Navigation
} from 'react-feather';
import { useAuth } from '../../../context/AuthContext';
import api from '../../../config/api';
import { toast } from 'react-toastify';
import CreateRequest from './CreateRequest';
import DirectionsMap from '../../Maps/DirectionsMap';

// Fallback data for active requests
const dummyActiveRequests = [
  {
    id: 'REQ001',
    bloodGroup: 'A+',
    units: 2,
    urgencyLevel: 'Critical',
    status: 'Pending',
    patientName: 'John Doe',
    patientPhone: '+91 98765-43210',
    State: 'Maharashtra',
    City:'mumbai',
    Location: 'mumbai',
    createdAt: new Date().toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }),
    createdAtDate: new Date(),
    donors: []
  }
];

const ActiveRequest = () => {
  const { user } = useAuth();
  const [activeRequests, setActiveRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showNewRequestForm, setShowNewRequestForm] = useState(false);
  const [error, setError] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showDirections, setShowDirections] = useState(false);

  // Get current location when component mounts
  useEffect(() => {
    getCurrentLocation();
  }, []);

  // Fetch active requests when component mounts or user changes
  useEffect(() => {
    if (user) {
      fetchActiveRequests();
    } else {
      setActiveRequests(dummyActiveRequests);
      setLoading(false);
    }
  }, [user]);

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ lat: latitude, lng: longitude });
        },
        error => {
          console.error('Error getting location:', error);
          toast.error('Unable to get your current location. Some features may be limited.');
        }
      );
    } else {
      toast.error('Geolocation is not supported by your browser');
    }
  };

  const fetchActiveRequests = async () => {
    setLoading(true);
    setError(null);
    try {
      // Get token from localStorage
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Authentication token not found. Please log in again.');
        setLoading(false);
        return;
      }

      // Fetch user's active requests from the backend
      const response = await api.get('requests/me', {
        headers: {
          'x-auth-token': token
        }
      });
      
      console.log('Fetched requests:', response.data);
      
      // Transform the data to match the expected format
      const formattedRequests = response.data.map(req => ({
        id: req._id,
        bloodGroup: req.bloodType,
        units: req.unitsNeeded,
        urgencyLevel: req.urgency === 'emergency' ? 'Critical' : 
                     req.urgency === 'urgent' ? 'High' : 'Normal',
        status: req.status.charAt(0).toUpperCase() + req.status.slice(1),
        patientName: req.patientName,
        patientPhone: req.contactInfo?.phone || 'N/A',
        State: req.hospital?.state || 'N/A',
        City: req.hospital?.city || 'N/A',
        Location: req.hospital?.address || 'N/A',
        createdAt: new Date(req.createdAt).toLocaleDateString('en-IN', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        createdAtDate: new Date(req.createdAt), // Store the actual date object for filtering
        additionalNotes: req.reason,
        donors: req.donors || [],
        coordinates: req.location?.coordinates ? {
          lng: req.location.coordinates[0],
          lat: req.location.coordinates[1]
        } : null,
        hospitalName: req.hospital?.name || 'N/A'
      }));
      
      // Filter to show only today's requests
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Set to beginning of today
      
      const todayRequests = formattedRequests.filter(req => {
        const requestDate = new Date(req.createdAtDate);
        requestDate.setHours(0, 0, 0, 0); // Set to beginning of request day
        return requestDate.getTime() === today.getTime();
      });
      
      // Sort by newest first (latest requests at the top)
      const sortedRequests = todayRequests.sort((a, b) => 
        b.createdAtDate.getTime() - a.createdAtDate.getTime()
      );
      
      console.log('Today\'s requests:', sortedRequests);
      
      setActiveRequests(sortedRequests.length > 0 ? sortedRequests : []);
    } catch (error) {
      console.error('Error fetching active requests:', error);
      setError('Failed to load active requests');
      
      if (error.response?.status === 401) {
        toast.error('Your session has expired. Please log in again.');
        // Redirect to login page
        window.location.href = '/login';
        return;
      }
      
      toast.error('Failed to load active requests');
      // Use dummy data as fallback
      setActiveRequests(dummyActiveRequests);
    } finally {
      setLoading(false);
    }
  };

  const handleGetDirections = (request) => {
    if (!currentLocation) {
      toast.error('Your current location is not available. Please enable location services.');
      getCurrentLocation();
      return;
    }

    // Use the actual coordinates from the request if available
    // Otherwise fall back to the address information
    if (!request.coordinates) {
      toast.warning('Exact location coordinates not available for this request. Using approximate location.');
      // Try to get coordinates from the address if possible
      // For now, we'll proceed with the request as is
    }
    
    console.log('Using request coordinates for directions:', request.coordinates);
    
    // Set the selected request with its original coordinates
    setSelectedRequest(request);
    
    setShowDirections(true);
  };

  if (showNewRequestForm) {
    return <CreateRequest 
      setShowNewRequestForm={setShowNewRequestForm} 
      activeRequests={activeRequests} 
      setActiveRequests={setActiveRequests} 
    />;
  }

  if (showDirections && selectedRequest && currentLocation) {
    return (
      <div className="space-y-6">
        <DirectionsMap 
          originCoords={currentLocation}
          destinationCoords={selectedRequest.coordinates}
          onClose={() => setShowDirections(false)}
          requestDetails={{
            patientName: selectedRequest.patientName,
            hospitalName: selectedRequest.hospitalName,
            patientPhone: selectedRequest.patientPhone,
            bloodGroup: selectedRequest.bloodGroup,
            units: selectedRequest.units,
            urgencyLevel: selectedRequest.urgencyLevel
          }}
        />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Today's Blood Requests</h2>
          {user && (
            <p className="text-sm text-gray-600 mt-1">
              Welcome, {user.name} | Phone: {user.phone || 'Not provided'} | Email: {user.email}
            </p>
          )}
        </div>
        <button
          onClick={() => setShowNewRequestForm(true)}
          className="inline-flex items-center mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors duration-200 ease-in-out"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Request
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="flex flex-col items-center">
            <Loader className="h-8 w-8 animate-spin text-red-500" />
            <p className="mt-2 text-gray-600">Loading your requests...</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {activeRequests && activeRequests.length > 0 ? (
            activeRequests.map(request => (
              <motion.div
                key={request.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                {/* Request Header */}
                <div className="p-4 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${
                        request.urgencyLevel === 'Critical' ? 'bg-red-100' :
                        request.urgencyLevel === 'High' ? 'bg-orange-100' : 'bg-blue-100'
                      }`}>
                        <Droplet className={`w-5 h-5 ${
                          request.urgencyLevel === 'Critical' ? 'text-red-600' :
                          request.urgencyLevel === 'High' ? 'text-orange-600' : 'text-blue-600'
                        }`} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {request.bloodGroup} Blood Request ({request.units} units)
                        </h3>
                        <p className="text-sm text-gray-500">
                          Request ID: {request.id}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        request.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                        request.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                        request.status === 'Fulfilled' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {request.status}
                      </span>
                      <button className="text-gray-400 hover:text-gray-600">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Request Details */}
                <div className="p-4 space-y-4">
                  {/* Patient Details */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <User className="w-4 h-4 mr-2 text-gray-400" />
                      <span className="truncate">{request.patientName}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Phone className="w-4 h-4 mr-2 text-gray-400" />
                      <span>{request.patientPhone}</span>
                    </div>
                  </div>

                  {/* Location and Date */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                      <span className="truncate">{request.Location}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                      <span className="whitespace-nowrap">{request.createdAt}</span>
                    </div>
                  </div>

                  {/* State and City */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Home className="w-4 h-4 mr-2 text-gray-400" />
                      <span className="truncate">{request.State}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                      <span className="truncate">{request.City}</span>
                    </div>
                  </div>

                  {/* Notes */}
                  {request.additionalNotes && (
                    <div className="text-sm text-gray-600 bg-gray-50 rounded-lg p-3">
                      <p className="line-clamp-2">{request.additionalNotes}</p>
                    </div>
                  )}

                  {/* Donor Count and Get Directions */}
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">Donors:</span> {request.donors.length}
                    </div>
                    <button
                      onClick={() => handleGetDirections(request)}
                      className="inline-flex items-center text-xs bg-blue-50 text-blue-600 hover:bg-blue-100 px-2 py-1 rounded-md transition-colors"
                    >
                      <Navigation className="w-3 h-3 mr-1" />
                      Get Directions
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-2 text-center bg-white rounded-xl shadow-lg p-6 sm:p-8"
            >
              <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3">No Requests Today</h3>
              <p className="text-base text-gray-600">
                You don't have any blood requests for today.
              </p>
              <button
                onClick={() => setShowNewRequestForm(true)}
                className="mt-6 inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors duration-200 ease-in-out"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create New Request
              </button>
            </motion.div>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default ActiveRequest;
