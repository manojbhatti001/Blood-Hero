import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';

const AdminRegister = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!formData.agreeToTerms) {
        throw new Error('Please agree to the terms and conditions');
      }
      
      if (formData.password !== formData.confirmPassword) {
        throw new Error('Passwords do not match');
      }

      const registrationData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        role: 'admin'
      };

      await register(registrationData);
      toast.success('Admin registration successful!');
      navigate('/admin/dashboard');
    } catch (error) {
      toast.error(error.message || 'Registration failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-28 pb-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="grid md:grid-cols-5">
            {/* Left side - Image with Overlay */}
            <div className="relative hidden md:block md:col-span-2">
              <img 
                src="/images/admin-register.jpg" 
                alt="Admin Registration" 
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-red-600/20 to-red-900/60">
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <h3 className="text-2xl font-bold text-white mb-2">Join Our Admin Team</h3>
                  <p className="text-white/90 text-sm">
                    Help us manage and coordinate blood donation activities across the platform.
                    Your role is crucial in maintaining the smooth operation of our life-saving mission.
                  </p>
                </div>
              </div>
            </div>

            {/* Right side - Form */}
            <div className="p-8 md:col-span-3">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">
                Register New Admin
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Personal Details */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      className="w-full p-2 text-sm border rounded"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      className="w-full p-2 text-sm border rounded"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Contact Info */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    className="w-full p-2 text-sm border rounded"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>

                {/* Password Fields */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Password <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="password"
                      name="password"
                      required
                      className="w-full p-2 text-sm border rounded"
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Confirm Password <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      required
                      className="w-full p-2 text-sm border rounded"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Terms */}
                <div className="flex items-center bg-red-50/50 p-3 rounded">
                  <input
                    type="checkbox"
                    name="agreeToTerms"
                    className="h-4 w-4 text-red-600 rounded"
                    checked={formData.agreeToTerms}
                    onChange={handleChange}
                  />
                  <label className="ml-2 text-sm text-gray-700">
                    I agree to the <span className="text-red-600 hover:underline cursor-pointer">terms and conditions</span>
                  </label>
                </div>

                <motion.button
                  type="submit"
                  className="w-full bg-red-600 text-white py-2 rounded-lg font-medium hover:bg-red-700 transition-colors"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Registering...' : 'Register Admin'}
                </motion.button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminRegister;