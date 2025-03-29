import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';

const AdminLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await login({ ...formData, role: 'admin' });
      toast.success('Login successful!');
      navigate('/admin/dashboard');
    } catch (err) {
      toast.error('Invalid admin credentials');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-28 pb-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="grid md:grid-cols-5">
            {/* Left side - Image with Overlay */}
            <div className="relative hidden md:block md:col-span-2">
              <img 
                src="/images/admin-login.jpg" 
                alt="Admin Login" 
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-red-600/20 to-red-900/60">
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <h3 className="text-2xl font-bold text-white mb-2">Welcome Back</h3>
                  <p className="text-white/90 text-sm">
                    Access your admin dashboard to manage blood donation activities and maintain platform operations.
                  </p>
                </div>
              </div>
            </div>

            {/* Right side - Form */}
            <div className="p-8 md:col-span-3">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Admin Login</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    required
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Link
                    to="/forgot-password"
                    className="text-sm text-red-600 hover:text-red-700"
                  >
                    Forgot password?
                  </Link>
                </div>

                <motion.button
                  type="submit"
                  className="w-full bg-red-600 text-white py-3 rounded-lg font-medium hover:bg-red-700 transition-colors"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Logging in...' : 'Login'}
                </motion.button>

                <div className="text-center mt-4">
                  <Link
                    to="/admin/register"
                    className="text-sm text-gray-600 hover:text-red-600"
                  >
                    Don't have an admin account? Register here
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminLogin;