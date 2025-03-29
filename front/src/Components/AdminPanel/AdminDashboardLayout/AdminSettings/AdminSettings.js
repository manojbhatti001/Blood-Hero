import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../context/AuthContext';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';

const AdminSettings = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });

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
      if (formData.password && formData.password !== formData.confirmPassword) {
        throw new Error('Passwords do not match');
      }

      const updateData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        ...(formData.password && { password: formData.password })
      };

      // Add your update logic here
      // await updateAdminProfile(updateData);
      
      toast.success('Settings updated successfully!');
    } catch (error) {
      toast.error(error.message || 'Update failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Settings</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Update Profile Settings
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
                  New Password
                </label>
                <input
                  type="password"
                  name="password"
                  className="w-full p-2 text-sm border rounded"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
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
                I confirm these changes to my admin profile
              </label>
            </div>

            <motion.button
              type="submit"
              className="w-full bg-red-600 text-white py-2 rounded-lg font-medium hover:bg-red-700 transition-colors"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Updating...' : 'Update Settings'}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminSettings;