import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-hot-toast'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import api from '../../config/api'

// These arrays will be populated from the API
const indianStates = [];
const majorCities = {};

export default function DonorRegistration() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    dateOfBirth: '',
    pincode: '',
    address: '',
    password: '',
    confirmPassword: '',
    bloodGroup: '',
    city: '',
    state: '',
    weight: '50',
    gender: 'other',
    agreeToTerms: false
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState({})
  const [states, setStates] = useState([])
  const [cities, setCities] = useState({})
  const [loading, setLoading] = useState(true)

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
        toast.error('Failed to load location data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchStatesAndCities();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      })
    }
  }

  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    setFormData(prev => ({
      ...prev,
      state: selectedState,
      city: '' // Reset city when state changes
    }));
    
    // Clear state and city errors
    if (errors.state || errors.city) {
      setErrors({
        ...errors,
        state: '',
        city: ''
      })
    }
  };

  const validateForm = () => {
    const newErrors = {}
    
    // Basic validation
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Email is invalid'
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required'
    if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = 'Phone must be 10 digits'
    if (!formData.bloodGroup) newErrors.bloodGroup = 'Blood group is required'
    if (!formData.gender) newErrors.gender = 'Gender is required'
    if (!formData.weight) newErrors.weight = 'Weight is required'
    if (formData.weight < 45) newErrors.weight = 'Weight must be at least 45 kg'
    if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters'
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match'
    if (!formData.state) newErrors.state = 'State is required'
    if (!formData.city) newErrors.city = 'City is required'
    if (!formData.agreeToTerms) newErrors.agreeToTerms = 'You must agree to the terms and conditions'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validate form
    if (!validateForm()) {
      toast.error('Please fix the errors in the form')
      return
    }
    
    setIsSubmitting(true)

    try {
      // Default coordinates for Indian cities (approximate)
      const cityCoordinates = {
        "Mumbai": [72.8777, 19.0760],
        "Delhi": [77.2090, 28.6139],
        "Bangalore": [77.5946, 12.9716],
        "Hyderabad": [78.4867, 17.3850],
        "Chennai": [80.2707, 13.0827],
        "Kolkata": [88.3639, 22.5726],
        "Pune": [73.8567, 18.5204],
        "Ahmedabad": [72.5714, 23.0225],
        "Jaipur": [75.7873, 26.9124],
        "Lucknow": [80.9462, 26.8467],
        "Port Blair": [92.7264, 11.6234]
      };
      
      // Get coordinates for the selected city or use Delhi as default
      const coordinates = cityCoordinates[formData.city] || [77.2090, 28.6139]; // Default to Delhi
      
      // Prepare donor data
      const donorData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        bloodGroup: formData.bloodGroup,
        address: {
          street: formData.address,
          city: formData.city,
          state: formData.state,
          zipCode: formData.pincode,
          country: 'India'
        },
        location: {
          type: 'Point',
          coordinates: coordinates
        },
        dateOfBirth: formData.dateOfBirth,
        age: formData.age ? parseInt(formData.age) : undefined,
        weight: formData.weight,
        gender: formData.gender,
        role: 'donor'
      }

      console.log('Sending registration data:', donorData);

      // Register the donor
      await register(donorData)
      toast.success('Registration successful! Please check your email to verify your account.')
      
      // Navigation is handled in the AuthContext after successful registration
    } catch (error) {
      console.error('Registration error:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Registration failed'
      toast.error(errorMessage)
      
      // If server returns field-specific errors, update the errors state
      if (error.response?.data?.errors) {
        const serverErrors = {}
        error.response.data.errors.forEach(err => {
          serverErrors[err.param] = err.msg
        })
        setErrors(serverErrors)
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-28 pb-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="grid md:grid-cols-5">
            {/* Left side - Image with Overlay */}
            <div className="relative hidden md:block md:col-span-2">
              <img 
                src="/images/Blood_donation_process.jpg" 
                alt="Blood Donation" 
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0  flex flex-col justify-end p-4 text-white">
                <h3 className="text-lg font-bold">Save Lives Today</h3>
                <div className="mt-2 space-y-1 text-xs">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>One donation can save up to 3 lives</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Blood donation takes only 10-15 minutes</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Your body replaces donated blood quickly</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Form */}
            <div className="p-6 md:p-8 md:col-span-3">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Become a Donor</h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`mt-1 block w-full rounded-md shadow-sm ${errors.name ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-red-500 focus:ring-red-500'}`}
                      required
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`mt-1 block w-full rounded-md shadow-sm ${errors.email ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-red-500 focus:ring-red-500'}`}
                      required
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                      Phone <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`mt-1 block w-full rounded-md shadow-sm ${errors.phone ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-red-500 focus:ring-red-500'}`}
                      required
                    />
                    {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                  </div>

                  {/* Blood Group */}
                  <div>
                    <label htmlFor="bloodGroup" className="block text-sm font-medium text-gray-700">
                      Blood Group <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="bloodGroup"
                      name="bloodGroup"
                      value={formData.bloodGroup}
                      onChange={handleChange}
                      className={`mt-1 block w-full rounded-md shadow-sm ${errors.bloodGroup ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-red-500 focus:ring-red-500'}`}
                      required
                    >
                      <option value="">Select Blood Group</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                    </select>
                    {errors.bloodGroup && <p className="mt-1 text-sm text-red-600">{errors.bloodGroup}</p>}
                  </div>

                  {/* Date of Birth */}
                  <div>
                    <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      id="dateOfBirth"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                    />
                  </div>

                  {/* Age */}
                  <div>
                    <label htmlFor="age" className="block text-sm font-medium text-gray-700">
                      Age
                    </label>
                    <input
                      type="number"
                      id="age"
                      name="age"
                      min="18"
                      max="65"
                      value={formData.age}
                      onChange={handleChange}
                      placeholder="18-65 years"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                    />
                  </div>

                  {/* Weight */}
                  <div>
                    <label htmlFor="weight" className="block text-sm font-medium text-gray-700">
                      Weight <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      id="weight"
                      name="weight"
                      min="45"
                      value={formData.weight}
                      onChange={handleChange}
                      placeholder="kg"
                      className={`mt-1 block w-full rounded-md shadow-sm ${errors.weight ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-red-500 focus:ring-red-500'}`}
                      required
                    />
                    {errors.weight && <p className="mt-1 text-sm text-red-600">{errors.weight}</p>}
                  </div>

                  {/* Gender */}
                  <div>
                    <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                      Gender <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="gender"
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className={`mt-1 block w-full rounded-md shadow-sm ${errors.gender ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-red-500 focus:ring-red-500'}`}
                      required
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.gender && <p className="mt-1 text-sm text-red-600">{errors.gender}</p>}
                  </div>

                  {/* State */}
                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                      State <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleStateChange}
                      className={`mt-1 block w-full rounded-md shadow-sm ${errors.state ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-red-500 focus:ring-red-500'}`}
                      required
                      disabled={loading}
                    >
                      <option value="">Select State</option>
                      {states.map(state => (
                        <option key={state} value={state}>{state}</option>
                      ))}
                    </select>
                    {errors.state && <p className="mt-1 text-sm text-red-600">{errors.state}</p>}
                  </div>

                  {/* City */}
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                      City <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className={`mt-1 block w-full rounded-md shadow-sm ${errors.city ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-red-500 focus:ring-red-500'}`}
                      required
                      disabled={!formData.state || loading}
                    >
                      <option value="">Select City</option>
                      {formData.state && cities[formData.state]?.map(city => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                    {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city}</p>}
                  </div>

                  {/* Pincode */}
                  <div>
                    <label htmlFor="pincode" className="block text-sm font-medium text-gray-700">
                      Pincode
                    </label>
                    <input
                      type="text"
                      id="pincode"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                    />
                  </div>

                  {/* Address */}
                  <div className="md:col-span-2">
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                      Address
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Street address"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                    />
                  </div>

                  {/* Password */}
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                      Password <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className={`mt-1 block w-full rounded-md shadow-sm ${errors.password ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-red-500 focus:ring-red-500'}`}
                      required
                    />
                    {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                      Confirm Password <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={`mt-1 block w-full rounded-md shadow-sm ${errors.confirmPassword ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-red-500 focus:ring-red-500'}`}
                      required
                    />
                    {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
                  </div>
                </div>

                {/* Terms and Conditions */}
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="agreeToTerms"
                      name="agreeToTerms"
                      type="checkbox"
                      checked={formData.agreeToTerms}
                      onChange={handleChange}
                      className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                      required
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="agreeToTerms" className="font-medium text-gray-700">
                      I agree to the <a href="#" className="text-red-600 hover:text-red-500">Terms and Conditions</a> and <a href="#" className="text-red-600 hover:text-red-500">Privacy Policy</a>
                    </label>
                    {errors.agreeToTerms && <p className="mt-1 text-sm text-red-600">{errors.agreeToTerms}</p>}
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    {isSubmitting ? 'Registering...' : 'Register'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}