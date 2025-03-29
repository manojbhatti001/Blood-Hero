import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, Clock, ArrowRight, Home, Phone, User, AlertCircle } from 'react-feather';
import api from '../../config/api';
import { toast } from 'react-toastify';
import axios from 'axios';

const DirectionsMap = ({ originCoords, destinationCoords, onClose, requestDetails }) => {
  const [directions, setDirections] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [travelMode, setTravelMode] = useState('driving');
  const [destinationAddress, setDestinationAddress] = useState(null);

  useEffect(() => {
    if (originCoords && destinationCoords) {
      fetchDirections();
      fetchDestinationAddress();
    }
  }, [originCoords, destinationCoords, travelMode]);

  const fetchDestinationAddress = async () => {
    try {
      // First try using our backend API
      const response = await api.get('geo/reverse-geocode', {
        params: {
          lat: destinationCoords.lat,
          lng: destinationCoords.lng
        }
      });
      setDestinationAddress(response.data.address);
    } catch (error) {
      console.error('Error fetching address from backend:', error);
      
      try {
        // Fallback: Try direct Google Maps API if backend fails
        const googleApiKey = 'AIzaSyA-kskB1_t5WLIWSBhPgtc721Ky1ZA_C40'; // Using the key from backend .env
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${destinationCoords.lat},${destinationCoords.lng}&key=${googleApiKey}`
        );
        
        if (response.data.status === 'OK' && response.data.results.length > 0) {
          const result = response.data.results[0];
          setDestinationAddress({
            formattedAddress: result.formatted_address,
            // Extract city and state if available
            city: extractAddressComponent(result.address_components, 'locality'),
            state: extractAddressComponent(result.address_components, 'administrative_area_level_1')
          });
        }
      } catch (fallbackError) {
        console.error('Fallback geocoding also failed:', fallbackError);
        // Set a basic address using the coordinates
        setDestinationAddress({
          formattedAddress: `Location (${destinationCoords.lat.toFixed(6)}, ${destinationCoords.lng.toFixed(6)})`,
          city: 'Unknown City',
          state: 'Unknown State'
        });
      }
    }
  };

  // Helper function to extract address components
  const extractAddressComponent = (components, type) => {
    if (!components) return '';
    const component = components.find(comp => comp.types.includes(type));
    return component ? component.long_name : '';
  };

  const fetchDirections = async () => {
    setLoading(true);
    setError(null);
    try {
      // First try using our backend API
      const response = await api.get('geo/directions', {
        params: {
          origin_lat: originCoords.lat,
          origin_lng: originCoords.lng,
          dest_lat: destinationCoords.lat,
          dest_lng: destinationCoords.lng,
          mode: travelMode
        }
      });
      
      setDirections(response.data);
    } catch (error) {
      console.error('Error fetching directions from backend:', error);
      
      try {
        // Fallback: Try direct Google Maps API if backend fails
        const googleApiKey = 'AIzaSyA-kskB1_t5WLIWSBhPgtc721Ky1ZA_C40'; // Using the key from backend .env
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/directions/json?origin=${originCoords.lat},${originCoords.lng}&destination=${destinationCoords.lat},${destinationCoords.lng}&mode=${travelMode}&key=${googleApiKey}`
        );
        
        if (response.data.status === 'OK' && response.data.routes.length > 0) {
          const route = response.data.routes[0];
          const legs = route.legs[0];
          
          setDirections({
            directions: {
              distance: legs.distance,
              duration: legs.duration,
              start_address: legs.start_address,
              end_address: legs.end_address,
              steps: legs.steps.map(step => ({
                distance: step.distance,
                duration: step.duration,
                instructions: step.html_instructions,
                travel_mode: step.travel_mode,
                maneuver: step.maneuver || null,
                polyline: step.polyline
              })),
              overview_polyline: route.overview_polyline,
              warnings: route.warnings || [],
              waypoint_order: route.waypoint_order || [],
              bounds: route.bounds
            },
            origin: originCoords,
            destination: destinationCoords
          });
        } else {
          throw new Error(`Google API returned status: ${response.data.status}`);
        }
      } catch (fallbackError) {
        console.error('Fallback directions API also failed:', fallbackError);
        setError('Click "Open in Google Maps" below to get directions.');
      }
    } finally {
      setLoading(false);
    }
  };

  const openGoogleMaps = () => {
    if (originCoords && destinationCoords) {
      // Use the exact coordinates from the blood request for Google Maps navigation
      const url = `https://www.google.com/maps/dir/?api=1&origin=${originCoords.lat},${originCoords.lng}&destination=${destinationCoords.lat},${destinationCoords.lng}&travelmode=${travelMode}`;
      window.open(url, '_blank');
    }
  }

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Getting Directions...</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            &times;
          </button>
        </div>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Directions</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            &times;
          </button>
        </div>
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
          {error}
        </div>
        <button 
          onClick={openGoogleMaps}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center"
        >
          <Navigation className="w-4 h-4 mr-2" />
          Open in Google Maps
        </button>
      </div>
    );
  }

  if (!directions) {
    return null;
  }

  const { directions: directionsData } = directions;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Directions to Donation Location</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          &times;
        </button>
      </div>

      {/* Destination Information */}
      {requestDetails && (
        <div className="bg-red-50 rounded-lg p-4 mb-4">
          <h3 className="font-medium text-red-700 mb-2">
            {requestDetails.bloodGroup} Blood Request ({requestDetails.units} units)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className="flex items-center text-sm text-gray-700">
              <User className="w-4 h-4 mr-2 text-red-500" />
              <span>Patient: {requestDetails.patientName}</span>
            </div>
            {requestDetails.hospitalName && (
              <div className="flex items-center text-sm text-gray-700">
                <Home className="w-4 h-4 mr-2 text-red-500" />
                <span>Hospital: {requestDetails.hospitalName}</span>
              </div>
            )}
            {requestDetails.patientPhone && (
              <div className="flex items-center text-sm text-gray-700">
                <Phone className="w-4 h-4 mr-2 text-red-500" />
                <span>Contact: {requestDetails.patientPhone}</span>
              </div>
            )}
            <div className="flex items-center text-sm text-gray-700">
              <AlertCircle className="w-4 h-4 mr-2 text-red-500" />
              <span>Urgency: {requestDetails.urgencyLevel}</span>
            </div>
          </div>
        </div>
      )}

      {/* Destination Address */}
      {destinationAddress && (
        <div className="bg-blue-50 rounded-lg p-4 mb-4">
          <h3 className="font-medium text-blue-700 mb-2">Destination Address</h3>
          <p className="text-sm text-gray-700">{destinationAddress.formattedAddress}</p>
          {(destinationAddress.city || destinationAddress.state) && (
            <div className="mt-2 grid grid-cols-2 gap-2 text-xs text-gray-600">
              {destinationAddress.city && <div>City: {destinationAddress.city}</div>}
              {destinationAddress.state && <div>State: {destinationAddress.state}</div>}
            </div>
          )}
        </div>
      )}

      {/* Travel Mode Selector */}
      <div className="flex gap-2 mb-4">
        {['driving', 'walking', 'bicycling', 'transit'].map(mode => (
          <button
            key={mode}
            onClick={() => setTravelMode(mode)}
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              travelMode === mode 
                ? 'bg-red-500 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {mode.charAt(0).toUpperCase() + mode.slice(1)}
          </button>
        ))}
      </div>

      {/* Summary */}
      <div className="bg-gray-50 rounded-lg p-4 mb-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center text-gray-700">
            <MapPin className="w-4 h-4 mr-2 text-red-500" />
            <span className="text-sm font-medium">Distance:</span>
          </div>
          <span className="text-sm font-bold">{directionsData.distance.text}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center text-gray-700">
            <Clock className="w-4 h-4 mr-2 text-red-500" />
            <span className="text-sm font-medium">Estimated Time:</span>
          </div>
          <span className="text-sm font-bold">{directionsData.duration.text}</span>
        </div>
      </div>

      {/* Directions Steps */}
      <div className="mb-4">
        <h3 className="text-md font-semibold text-gray-700 mb-2">Step-by-Step Directions:</h3>
        <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
          {directionsData.steps.map((step, index) => (
            <div key={index} className="border-l-2 border-red-200 pl-4 py-1">
              <div 
                className="text-sm text-gray-700"
                dangerouslySetInnerHTML={{ __html: step.instructions }}
              />
              <div className="flex items-center mt-1 text-xs text-gray-500">
                <span className="mr-3">{step.distance.text}</span>
                <span>{step.duration.text}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Open in Google Maps Button */}
      <button 
        onClick={openGoogleMaps}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center"
      >
        <Navigation className="w-4 h-4 mr-2" />
        Open in Google Maps
      </button>
    </div>
  );
};

export default DirectionsMap;
