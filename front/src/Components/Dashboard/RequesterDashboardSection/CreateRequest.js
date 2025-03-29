import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, MapPin, Loader } from 'react-feather';
import { toast } from 'react-toastify';
import api from '../../../config/api';
import { useAuth } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

// This will be populated from the API
const majorCities = {};

const CreateRequest = ({ setShowNewRequestForm, activeRequests, setActiveRequests }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [coordinates, setCoordinates] = useState(null);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState({});
  const [loading, setLoading] = useState(true);

  // Function to get current date and time in local timezone
  const getCurrentDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const [newRequest, setNewRequest] = useState({
    patientName: user?.name || '',
    patientPhone: user?.phone || '',
    patientEmail: user?.email || '',
    bloodGroup: '',
    units: '',
    urgencyLevel: 'Normal',
    requiredDate: getCurrentDateTime(),
    hospitalLocation: '',
    state: user?.state || '',
    city: user?.city || '',
    additionalNotes: '',
    reason: 'Medical procedure'
  });

  // Fetch states and cities from the backend
  useEffect(() => {
    const fetchStatesAndCities = async () => {
      try {
        setLoading(true);
        const response = await api.get('/location/states');
        if (response.data.success) {
          const stateData = response.data.data;
          // Extract state names
          const stateNames = Object.keys(stateData);
          setStates(stateNames);
          
          // Store city data
          setCities(stateData);
        } else {
          toast.error('Failed to load location data');
        }
      } catch (error) {
        console.error('Error fetching location data:', error);
        // Don't show error to user as this might disrupt the main functionality
      } finally {
        setLoading(false);
      }
    };

    fetchStatesAndCities();
  }, []);

  // Update form data when user data changes
  useEffect(() => {
    if (user) {
      setNewRequest(prev => ({
        ...prev,
        patientName: user.name || prev.patientName,
        patientPhone: user.phone || prev.patientPhone,
        patientEmail: user.email || prev.patientEmail,
        state: user.state || prev.state,
        city: user.city || prev.city
      }));
    }
  }, [user]);

  // Get current location when component mounts
  useEffect(() => {
    getCurrentLocation();
  }, []);

  // Function to get current location using browser geolocation API
  const getCurrentLocation = () => {
    setIsGettingLocation(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          setCoordinates({ lat: latitude, lng: longitude });
          
          // Set the location directly using coordinates without reverse geocoding
          setNewRequest(prev => ({
            ...prev,
            hospitalLocation: `Lat: ${latitude.toFixed(6)}, Lng: ${longitude.toFixed(6)}`
          }));
          
          // Also try to get the address from coordinates for better user experience
          fetchAddressFromCoordinates(latitude, longitude);
          
          setIsGettingLocation(false);
        },
        error => {
          console.error('Error getting location:', error);
          toast.error('Unable to get your current location. Please enter manually.');
          // Set default coordinates for Haryana (29.0588, 76.0856)
          setCoordinates({ lat: 29.0588, lng: 76.0856 });
          setIsGettingLocation(false);
        }
      );
    } else {
      toast.error('Geolocation is not supported by your browser');
      // Set default coordinates for Haryana (29.0588, 76.0856)
      setCoordinates({ lat: 29.0588, lng: 76.0856 });
      setIsGettingLocation(false);
    }
  };

  // Function to fetch address from coordinates using reverse geocoding
  const fetchAddressFromCoordinates = async (latitude, longitude) => {
    try {
      const response = await api.get(`geo/reverse-geocode?lat=${latitude}&lng=${longitude}`);
      if (response.data && response.data.address) {
        const { city, state, formattedAddress } = response.data.address;
        
        setNewRequest(prev => ({
          ...prev,
          state: state || prev.state,
          city: city || prev.city,
          hospitalLocation: formattedAddress || prev.hospitalLocation
        }));
      }
    } catch (error) {
      console.error('Error fetching address from coordinates:', error);
      // Don't show error to user as this is just an enhancement
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Check if user is authenticated
      if (!user || !user.id) {
        toast.error('You must be logged in to create a request');
        setIsLoading(false);
        return;
      }

      // Validate required fields
      if (!newRequest.patientName || !newRequest.patientPhone || !newRequest.patientEmail || !newRequest.bloodGroup || 
          !newRequest.units || !newRequest.hospitalLocation ||
          !newRequest.state || !newRequest.city) {
        toast.error('Please fill in all required fields');
        setIsLoading(false);
        return;
      }

      // If coordinates are not set, use fixed coordinates for Haryana
      if (!coordinates) {
        setCoordinates({ lat: 29.159770, lng: 75.737342 });
        console.log('Using default coordinates for Haryana');
      }

      // Prepare data for API
      const requestData = {
        patientName: newRequest.patientName,
        bloodType: newRequest.bloodGroup,
        unitsNeeded: parseInt(newRequest.units),
        hospital: {
          name: 'Hospital',
          address: newRequest.hospitalLocation,
          city: newRequest.city,
          state: newRequest.state
        },
        location: {
          type: 'Point',
          coordinates: coordinates ? 
            [coordinates.lng, coordinates.lat] : 
            [75.737342, 29.159770] // Default to Haryana coordinates if none available
        },
        // Map frontend urgency levels to backend expected values
        urgency: (() => {
          switch(newRequest.urgencyLevel.toLowerCase()) {
            case 'critical': return 'emergency';
            case 'high': return 'urgent';
            default: return 'normal';
          }
        })(),
        reason: newRequest.reason || newRequest.additionalNotes || 'Medical procedure',
        requiredBy: new Date(newRequest.requiredDate).toISOString(),
        contactInfo: {
          name: newRequest.patientName,
          phone: newRequest.patientPhone,
          email: newRequest.patientEmail || user?.email || '', 
          relationship: 'Self'
        },
        userEmail: newRequest.patientEmail || user?.email || ''
      };

      console.log('Sending request data with coordinates:', requestData.location);

      // Send request to backend with token in headers
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Authentication token not found. Please log in again.');
        setIsLoading(false);
        return;
      }

      const response = await api.post('requests', requestData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('Response:', response.data);
      
      // Add to active requests with ID from backend
      const newRequestWithId = {
        id: response.data._id || response.data.id,
        patientName: newRequest.patientName,
        patientPhone: newRequest.patientPhone,
        patientEmail: newRequest.patientEmail,
        bloodGroup: newRequest.bloodGroup,
        units: newRequest.units,
        urgencyLevel: newRequest.urgencyLevel,
        requiredDate: newRequest.requiredDate,
        hospitalLocation: newRequest.hospitalLocation,
        State: newRequest.state,
        City: newRequest.city,
        additionalNotes: newRequest.additionalNotes,
        status: 'Pending',
        donors: [],
        createdAt: new Date().toISOString().split('T')[0],
        Location: `${newRequest.hospitalLocation}, ${newRequest.city}, ${newRequest.state}`
      };

      if (setActiveRequests) {
        setActiveRequests(prev => [newRequestWithId, ...(prev || [])]);
      }
      
      toast.success('Blood request created successfully');
      if (setShowNewRequestForm) {
        setShowNewRequestForm(false);
      }
      
      // Redirect to active requests page
      navigate('/requester-dashboard/active');
    } catch (error) {
      console.error('Error creating request:', error);
      
      // Handle specific error cases
      if (error.response) {
        if (error.response.status === 401) {
          toast.error('Your session has expired. Please log in again.');
          // Redirect to login page
          window.location.href = '/login';
          return;
        }
        
        const errorMessage = error.response.data.message || 
                            (error.response.data.errors && error.response.data.errors[0].msg) || 
                            'Failed to create request';
        toast.error(errorMessage);
        
        // Log detailed error information for debugging
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
      } else {
        toast.error('Network error. Please check your connection and try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const renderCreateRequest = () => (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-xl mx-auto"
    >
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-500 to-red-600 p-4 text-white">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 backdrop-blur-sm rounded-full">
              <Plus className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-lg font-semibold">Create Blood Request</h2>
          </div>
        </div>

        {/* Form Content */}
        <div className="p-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Patient Details */}
            <div className="grid grid-cols-2 gap-4">
              {/* Patient Name */}
              <div>
                <label className="text-xs font-medium text-gray-700">
                  Patient Name <span className="text-red-500">*</span>
                </label>
                <input
                  required
                  type="text"
                  className="mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 text-sm h-9"
                  placeholder="Enter patient name"
                  value={newRequest.patientName}
                  onChange={(e) => setNewRequest({...newRequest, patientName: e.target.value})}
                />
              </div>

              {/* Patient Phone */}
              <div>
                <label className="text-xs font-medium text-gray-700">
                  Patient Phone <span className="text-red-500">*</span>
                </label>
                <input
                  required
                  type="tel"
                  className="mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 text-sm h-9"
                  placeholder="Enter phone number"
                  value={newRequest.patientPhone}
                  onChange={(e) => setNewRequest({...newRequest, patientPhone: e.target.value})}
                />
              </div>
            </div>

            {/* Patient Email */}
            <div>
              <label className="text-xs font-medium text-gray-700">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                required
                type="email"
                className="mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 text-sm h-9"
                placeholder="Enter email address for notifications"
                value={newRequest.patientEmail}
                onChange={(e) => setNewRequest({...newRequest, patientEmail: e.target.value})}
              />
              <p className="text-xs text-gray-500 mt-1">
                Notifications about your request will be sent to this email
              </p>
            </div>

            {/* Blood Group and Units */}
            <div className="grid grid-cols-2 gap-4">
              {/* Blood Group */}
              <div>
                <label className="text-xs font-medium text-gray-700">
                  Blood Group <span className="text-red-500">*</span>
                </label>
                <select 
                  required
                  className="mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 text-sm h-9"
                  value={newRequest.bloodGroup}
                  onChange={(e) => setNewRequest({...newRequest, bloodGroup: e.target.value})}
                >
                  <option value="">Select</option>
                  {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(group => (
                    <option key={group} value={group}>{group}</option>
                  ))}
                </select>
              </div>

              {/* Units */}
              <div>
                <label className="text-xs font-medium text-gray-700">
                  Units Required <span className="text-red-500">*</span>
                </label>
                <input
                  required
                  type="number"
                  min="1"
                  className="mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 text-sm h-9"
                  placeholder="Units"
                  value={newRequest.units}
                  onChange={(e) => setNewRequest({...newRequest, units: e.target.value})}
                />
              </div>
            </div>

            {/* Two columns layout */}
            <div className="grid grid-cols-2 gap-4">
              {/* Urgency Level */}
              <div>
                <label className="text-xs font-medium text-gray-700">
                  Urgency Level <span className="text-red-500">*</span>
                </label>
                <select 
                  required
                  className="mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 text-sm h-9"
                  value={newRequest.urgencyLevel}
                  onChange={(e) => setNewRequest({...newRequest, urgencyLevel: e.target.value})}
                >
                  <option value="Normal">Normal</option>
                  <option value="High">High</option>
                  <option value="Critical">Critical</option>
                </select>
              </div>

              {/* Required Date */}
              <div>
                <label className="text-xs font-medium text-gray-700">
                  Current Date & Time <span className="text-red-500">*</span>
                </label>
                <input
                  required
                  type="datetime-local"
                  value={newRequest.requiredDate}
                  onChange={(e) => setNewRequest({...newRequest, requiredDate: e.target.value})}
                  className="mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 text-sm h-9"
                />
              </div>
            </div>

            {/* Hospital Location */}
            <div>
              <label className="text-xs font-medium text-gray-700 flex items-center justify-between">
                <span>Location <span className="text-red-500">*</span></span>
                <button 
                  type="button" 
                  onClick={getCurrentLocation}
                  className="text-xs text-red-600 flex items-center gap-1 hover:text-red-700"
                  disabled={isGettingLocation}
                >
                  {isGettingLocation ? (
                    <><Loader className="w-3 h-3 animate-spin" /> Getting location...</>
                  ) : (
                    <><MapPin className="w-3 h-3" /> Use my current location</>
                  )}
                </button>
              </label>
              <input
                required
                type="text"
                className="mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 text-sm h-9"
                placeholder="Enter location"
                value={newRequest.hospitalLocation}
                onChange={(e) => setNewRequest({...newRequest, hospitalLocation: e.target.value})}
              />
            </div>

            {/* State and City Selection */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-gray-700">
                  State <span className="text-red-500">*</span>
                </label>
                <select
                  required
                  className="mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 text-sm h-9"
                  value={newRequest.state}
                  onChange={(e) => {
                    setNewRequest({
                      ...newRequest,
                      state: e.target.value,
                      city: '' // Reset city when state changes
                    });
                  }}
                  disabled={loading}
                >
                  <option value="">Select State</option>
                  {states.map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-700">
                  City <span className="text-red-500">*</span>
                </label>
                <select
                  required
                  className="mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 text-sm h-9"
                  value={newRequest.city}
                  onChange={(e) => setNewRequest({...newRequest, city: e.target.value})}
                  disabled={!newRequest.state || loading}
                >
                  <option value="">Select City</option>
                  {newRequest.state && cities[newRequest.state]?.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>
            </div>
{/* 
            Additional Notes
            <div>
              <label className="text-xs font-medium text-gray-700">
                Additional Notes
              </label>
              <textarea
                className="mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 text-sm"
                rows="2"
                placeholder="Any additional details about the request..."
                value={newRequest.additionalNotes}
                onChange={(e) => setNewRequest({...newRequest, additionalNotes: e.target.value})}
              ></textarea>
            </div> */}

            {/* Form Actions */}
            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowNewRequestForm(false)}
                className="px-4 py-1.5 text-sm font-medium border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 bg-gradient-to-r from-red-500 to-red-600 text-sm font-medium text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-colors flex items-center gap-2"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader className="w-4 h-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    Create Request
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );

  return renderCreateRequest();
};

export default CreateRequest;
