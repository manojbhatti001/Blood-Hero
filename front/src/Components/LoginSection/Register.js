import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User } from 'lucide-react';
import { motion } from 'framer-motion';

const Register = () => {
  const navigate = useNavigate();

  const handleOptionSelect = () => {
    navigate('/register-donor');
  };

  return (
    <motion.div
      className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Choose Registration Type
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{' '}
          <Link to="/login" className="font-medium text-red-600 hover:text-red-500">
            sign in to your account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="space-y-4">
            {/* Donor Registration Option */}
            <button
              onClick={handleOptionSelect}
              className="w-full flex items-center justify-between p-4 border-2 border-gray-200 rounded-lg hover:border-red-500 hover:bg-red-50 transition-all group"
            >
              <div className="flex items-center">
                <div className="bg-red-100 p-3 rounded-lg group-hover:bg-red-200">
                  <User className="h-6 w-6 text-red-600" />
                </div>
                <div className="ml-4 text-left">
                  <p className="text-lg font-medium text-gray-900">Donor Registration</p>
                  <p className="text-sm text-gray-500">Register as a blood donor and save lives</p>
                </div>
              </div>
              <svg className="h-5 w-5 text-gray-400 group-hover:text-red-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          </div>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Already have an account?
                </span>
              </div>
            </div>
            <div className="mt-6">
              <Link
                to="/login"
                className="w-full flex justify-center py-2 px-4 border border-red-600 rounded-md shadow-sm text-sm font-medium text-red-600 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Register;