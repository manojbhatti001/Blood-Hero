import { useState } from 'react'
import { motion } from 'framer-motion'
import { Car, Phone, Calendar, MapPin, CheckCircle, AlertCircle, User, Hash, Users, FileText, Clock } from 'lucide-react'
import { toast } from 'react-hot-toast'
import { useAuth } from '../../context/AuthContext'

export default function VehicleRegistration() {
  const { user } = useAuth()
  const [formData, setFormData] = useState({
    ownerName: user?.name || '',
    vehicleType: '',
    licensePlate: '',
    pincode: '',
    capacity: '',
    contactNumber: '',
    availabilityDate: '',
    availableDays: '',
    isCurrentlyAvailable: false,
    additionalNotes: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [step, setStep] = useState(1)

  const vehicleTypes = [
    { value: 'car', label: 'Car' },
    { value: 'bike', label: 'Bike' },
    { value: 'ambulance', label: 'Ambulance' },
    { value: 'van', label: 'Van' },
    { value: 'other', label: 'Other' }
  ]

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (step !== 3) {
      nextStep();
      return;
    }

    // Validate step 3 required fields
    if (!formData.availabilityDate || !formData.availableDays) {
      toast.error('Please fill in availability details');
      return;
    }

    setIsSubmitting(true);

    try {
      // Validate all required fields
      const requiredFields = [
        'ownerName',
        'contactNumber', 
        'vehicleType',
        'licensePlate',
        'pincode',
        'capacity',
        'availabilityDate',
        'availableDays'
      ];

      const missingFields = requiredFields.filter(field => !formData[field]);

      if (missingFields.length > 0) {
        toast.error('Please complete all required fields before submitting');
        setIsSubmitting(false);
        return;
      }

      // API call simulation
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Store in localStorage
      const vehicles = JSON.parse(localStorage.getItem('volunteerVehicles') || '[]');
      const newVehicle = {
        id: Date.now(),
        ...formData,
        registrationDate: new Date().toISOString(),
        status: 'active'
      };
      vehicles.push(newVehicle);
      localStorage.setItem('volunteerVehicles', JSON.stringify(vehicles));

      toast.success('Vehicle registered successfully!');
      
      // Reset form
      setFormData({
        ownerName: user?.name || '',
        vehicleType: '',
        licensePlate: '',
        pincode: '',
        capacity: '',
        contactNumber: '',
        availabilityDate: '',
        availableDays: '',
        isCurrentlyAvailable: false,
        additionalNotes: ''
      });
      setStep(1);
    } catch (error) {
      toast.error(error.message || 'Failed to register vehicle');
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    if (step === 1) {
      if (!formData.ownerName || !formData.contactNumber) {
        toast.error('Please fill in all required fields in this section');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!formData.vehicleType || !formData.licensePlate || !formData.pincode || !formData.capacity) {
        toast.error('Please fill in all required fields in this section');
        return;
      }
      setStep(3);
    }
  };

  const prevStep = () => {
    setStep(step - 1)
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-gray-100 to-white pt-20 pb-12"> {/* Changed py-24 mt-16 to pt-20 pb-12 */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header Section */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-block p-4 bg-red-50 rounded-full mb-6 shadow-lg"
            >
              <Car size={40} className="text-red-600" />
            </motion.div>
            <h1 className="text-4xl font-bold mb-3 text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-red-500">
              Volunteer Vehicle Registration
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Join our network of emergency transportation volunteers
            </p>
          </div>

          {/* Progress Steps */}
          <div className="mb-12">
            <div className="flex items-center justify-center">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex items-center">
                  <motion.div 
                    className={`w-12 h-12 rounded-full flex items-center justify-center shadow-md cursor-pointer
                      ${step >= item 
                        ? 'bg-gradient-to-r from-red-600 to-red-500 text-white' 
                        : 'bg-white text-gray-400'}`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => item < step && setStep(item)}
                  >
                    {item}
                  </motion.div>
                  {item < 3 && (
                    <div className={`h-1 w-20 mx-2 rounded-full transition-colors duration-300
                      ${step > item ? 'bg-red-500' : 'bg-gray-200'}`}>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-4">
              <p className="text-sm font-medium text-gray-600 bg-white px-4 py-2 rounded-full shadow-sm">
                {step === 1 ? 'Personal Information' : 
                 step === 2 ? 'Vehicle Details' : 
                 'Availability & Notes'}
              </p>
            </div>
          </div>

          {/* Form Container */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            <div className="p-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Step 1: Owner Information */}
                {step === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="text-2xl font-semibold mb-6 text-gray-800 flex items-center">
                      <User className="mr-2 text-red-600" /> Personal Information
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="group">
                        <label className="block text-gray-700 font-medium mb-2 flex items-center">
                          <User size={16} className="mr-1 text-red-600" />
                          Owner Name <span className="text-red-500 ml-1">*</span>
                        </label>
                        <input
                          type="text"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                          value={formData.ownerName}
                          onChange={(e) => setFormData({...formData, ownerName: e.target.value})}
                          placeholder="Enter your full name"
                          required
                        />
                      </div>

                      <div className="group">
                        <label className="block text-gray-700 font-medium mb-2 flex items-center">
                          <Phone size={16} className="mr-1 text-red-600" />
                          Contact Number <span className="text-red-500 ml-1">*</span>
                        </label>
                        <input
                          type="tel"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                          value={formData.contactNumber}
                          onChange={(e) => setFormData({...formData, contactNumber: e.target.value})}
                          placeholder="Enter your contact number"
                          required
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Vehicle Details */}
                {step === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="text-2xl font-semibold mb-6 text-gray-800 flex items-center">
                      <Car className="mr-2 text-red-600" /> Vehicle Details
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="group">
                        <label className="block text-gray-700 font-medium mb-2 flex items-center">
                          <Car size={16} className="mr-1 text-red-600" />
                          Vehicle Type <span className="text-red-500 ml-1">*</span>
                        </label>
                        <select
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200 bg-white"
                          value={formData.vehicleType}
                          onChange={(e) => setFormData({...formData, vehicleType: e.target.value})}
                          required
                        >
                          <option value="">Select Vehicle Type</option>
                          {vehicleTypes.map(type => (
                            <option key={type.value} value={type.value}>{type.label}</option>
                          ))}
                        </select>
                      </div>

                      <div className="group">
                        <label className="block text-gray-700 font-medium mb-2 flex items-center">
                          <Hash size={16} className="mr-1 text-red-600" />
                          License Plate <span className="text-red-500 ml-1">*</span>
                        </label>
                        <input
                          type="text"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                          value={formData.licensePlate}
                          onChange={(e) => setFormData({...formData, licensePlate: e.target.value})}
                          placeholder="Enter license plate number"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 mt-6">
                      <div className="group">
                        <label className="block text-gray-700 font-medium mb-2 flex items-center">
                          <MapPin size={16} className="mr-1 text-red-600" />
                          Pincode <span className="text-red-500 ml-1">*</span>
                        </label>
                        <input
                          type="text"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                          value={formData.pincode}
                          onChange={(e) => setFormData({...formData, pincode: e.target.value})}
                          placeholder="Enter your area pincode"
                          required
                        />
                      </div>

                      <div className="group">
                        <label className="block text-gray-700 font-medium mb-2 flex items-center">
                          <Users size={16} className="mr-1 text-red-600" />
                          Passenger Capacity <span className="text-red-500 ml-1">*</span>
                        </label>
                        <input
                          type="number"
                          min="1"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                          value={formData.capacity}
                          onChange={(e) => setFormData({...formData, capacity: e.target.value})}
                          placeholder="Number of passengers"
                          required
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Availability */}
                {step === 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="text-2xl font-semibold mb-6 text-gray-800 flex items-center">
                      <Calendar className="mr-2 text-red-600" /> Availability & Additional Information
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="group">
                        <label className="block text-gray-700 font-medium mb-2 flex items-center">
                          <Calendar size={16} className="mr-1 text-red-600" />
                          Available From
                        </label>
                        <input
                          type="date"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                          value={formData.availabilityDate}
                          onChange={(e) => setFormData({...formData, availabilityDate: e.target.value})}
                          min={new Date().toISOString().split('T')[0]}
                        />
                      </div>

                      <div className="group">
                        <label className="block text-gray-700 font-medium mb-2 flex items-center">
                          <Clock size={16} className="mr-1 text-red-600" />
                          Number of Days Available
                        </label>
                        <input
                          type="number"
                          min="1"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                          value={formData.availableDays}
                          onChange={(e) => setFormData({...formData, availableDays: e.target.value})}
                          placeholder="Number of days available"
                        />
                      </div>
                    </div>

                    <div className="flex items-center mt-6">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                        checked={formData.isCurrentlyAvailable}
                        onChange={(e) => setFormData({...formData, isCurrentlyAvailable: e.target.checked})}
                      />
                      <label className="ml-2 block text-gray-700">
                        Currently Available for Emergency Services
                      </label>
                    </div>

                    <div className="mt-6">
                      <label className="block text-gray-700 font-medium mb-2">
                        Additional Notes
                      </label>
                      <textarea
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                        rows="3"
                        value={formData.additionalNotes}
                        onChange={(e) => setFormData({...formData, additionalNotes: e.target.value})}
                        placeholder="Any additional information..."
                      />
                    </div>
                  </motion.div>
                )}

                {/* Form Navigation */}
                <div className="flex justify-between pt-6 border-t border-gray-100">
                  {step > 1 && (
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={prevStep}
                      className="px-6 py-3 text-gray-600 hover:text-gray-800 font-medium rounded-lg
                        flex items-center transition-colors duration-200"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      Back
                    </motion.button>
                  )}
                  
                  {step < 3 ? (
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={nextStep}
                      className="ml-auto px-6 py-3 bg-gradient-to-r from-red-600 to-red-500 
                        text-white font-medium rounded-lg flex items-center hover:shadow-lg 
                        transition-shadow duration-200"
                    >
                      Next
                      <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </motion.button>
                  ) : (
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={isSubmitting}
                      className="ml-auto px-8 py-3 bg-gradient-to-r from-red-600 to-red-500 
                        text-white font-medium rounded-lg flex items-center hover:shadow-lg 
                        transition-shadow duration-200 disabled:opacity-70"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Registering...
                        </>
                      ) : "Complete Registration"}
                    </motion.button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}