import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Building, Mail, Phone, MapPin, Globe, Lock, FileText } from "lucide-react"
import { motion } from "framer-motion"
import { useAuth } from '../../context/AuthContext'
import { toast } from 'react-hot-toast'

function HospitalRegistration() {
  const navigate = useNavigate()
  const { register } = useAuth()
  const [formData, setFormData] = useState({
    name: '',
    street: '',
    city: '',
    state: '',
    postalCode: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    website: '',
    specialInstructions: '',
    hasBloodDonationCenter: false
  })

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setFormData({
      ...formData,
      [e.target.name]: value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords don't match!")
      return
    }

    try {
      await register({ ...formData, userType: 'organization' })
      toast.success('Registration successful!')
      navigate('/login')
    } catch (error) {
      toast.error(error.message || 'Registration failed')
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
                src="/images/Community.jpg" 
                alt="Hospital Registration" 
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0  flex flex-col justify-end p-4 text-white">
                <h3 className="text-lg font-bold">Join Our Network</h3>
                <div className="mt-2 space-y-1 text-xs">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                    </svg>
                    Help save countless lives
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                    </svg>
                    Streamline blood donation process
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Form */}
            <div className="md:col-span-3 p-4">
              <div className="text-center mb-3">
                <h2 className="text-xl font-bold text-gray-900">Register Hospital/Organization</h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-2">
                {/* Organization Details */}
                <div className="grid grid-cols-1 gap-2">
                  <div>
                    <label className="block text-xs font-medium text-gray-700">
                      Hospital/Organization Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                        <Building className="h-4 w-4 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="pl-8 w-full p-1.5 text-sm border rounded"
                      />
                    </div>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-medium text-gray-700">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                        <Mail className="h-4 w-4 text-gray-400" />
                      </div>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="pl-8 w-full p-1.5 text-sm border rounded"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700">
                      Phone <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                        <Phone className="h-4 w-4 text-gray-400" />
                      </div>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className="pl-8 w-full p-1.5 text-sm border rounded"
                      />
                    </div>
                  </div>
                </div>

                {/* Location */}
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-medium text-gray-700">
                      City <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full p-1.5 text-sm border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700">
                      State <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="state"
                      required
                      value={formData.state}
                      onChange={handleChange}
                      className="w-full p-1.5 text-sm border rounded"
                    />
                  </div>
                </div>

                {/* Optional Section */}
                <div className="mt-3 border-t pt-3">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xs font-semibold text-gray-700">Additional Information</h3>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">Optional</span>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-2">
                    <div>
                      <label className="block text-xs font-medium text-gray-600">Website</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                          <Globe className="h-4 w-4 text-gray-400" />
                        </div>
                        <input
                          type="url"
                          name="website"
                          value={formData.website}
                          onChange={handleChange}
                          className="pl-8 w-full p-1.5 text-sm border rounded bg-gray-50 focus:bg-white"
                          placeholder="https://example.com"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Password Section */}
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-medium text-gray-700">
                      Password <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                        <Lock className="h-4 w-4 text-gray-400" />
                      </div>
                      <input
                        type="password"
                        name="password"
                        required
                        value={formData.password}
                        onChange={handleChange}
                        className="pl-8 w-full p-1.5 text-sm border rounded"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700">
                      Confirm Password <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                        <Lock className="h-4 w-4 text-gray-400" />
                      </div>
                      <input
                        type="password"
                        name="confirmPassword"
                        required
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="pl-8 w-full p-1.5 text-sm border rounded"
                      />
                    </div>
                  </div>
                </div>

                {/* Blood Donation Center Checkbox */}
                <div className="flex items-center bg-red-50/50 p-2 rounded text-xs">
                  <input
                    type="checkbox"
                    name="hasBloodDonationCenter"
                    checked={formData.hasBloodDonationCenter}
                    onChange={handleChange}
                    className="h-3 w-3 text-red-600 rounded"
                  />
                  <label className="ml-2 text-gray-700">
                    Has Blood Donation Center
                  </label>
                </div>

                <motion.button
                  type="submit"
                  className="w-full bg-red-600 text-white py-2 rounded-lg font-medium text-sm hover:bg-red-700 transition-colors shadow-md"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Register Organization
                </motion.button>
              </form>
            </div>
          </div>
        </motion.div>

        {/* Login Link Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mt-8 bg-gray-50 max-w-md mx-auto p-4 rounded-xl shadow-sm"
        >
          <p className="text-gray-700 text-base">
            Already registered? {' '}
            <motion.a
              href="/login"
              className="text-red-600 font-semibold hover:text-red-700 hover:underline inline-flex items-center text-lg"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Login here
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.a>
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default HospitalRegistration 