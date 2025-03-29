import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function EmergencySection() {
  return (
    <section className="py-12 sm:py-16 md:py-24 bg-gradient-to-br from-red-600 to-red-700 text-white relative overflow-hidden">
      {/* Background Effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-500/20 via-transparent to-transparent"></div>
      
      {/* Main Content */}
      <div className="container px-4 mx-auto relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12">
            <motion.div 
              initial={{ scale: 0.5, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/10 backdrop-blur-sm mb-6 sm:mb-8"
            >
              <AlertCircle className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </motion.div>
            
            <motion.h2 
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight"
            >
              Need Blood <br className="hidden sm:block" />
              <span className="text-red-200">Urgently?</span>
            </motion.h2>
            
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-base sm:text-lg md:text-xl text-red-100 max-w-2xl mx-auto px-4"
            >
              Our emergency response team is available 24/7. We ensure quick assistance for all critical situations.
            </motion.p>
          </div>

          {/* Action Buttons */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mb-8 sm:mb-12 md:mb-16"
          >
            <Link 
              to="/emergency-blood"
              className="group flex items-center justify-center gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-white text-red-600 rounded-xl sm:rounded-2xl hover:bg-red-50 transition-all duration-300 font-semibold text-base sm:text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              onClick={() => window.scrollTo(0, 0)}
            >
              <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform" />
              <span>Request Emergency Blood</span>
            </Link>
          </motion.div>

          {/* Features Grid */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8 text-center hover:bg-white/15 transition-all duration-300">
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">Quick Response</h3>
              <p className="text-sm sm:text-base text-red-100">Immediate attention to all emergency requests</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8 text-center hover:bg-white/15 transition-all duration-300">
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">24/7 Available</h3>
              <p className="text-sm sm:text-base text-red-100">Round-the-clock emergency support</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8 text-center hover:bg-white/15 transition-all duration-300">
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">Verified Donors</h3>
              <p className="text-sm sm:text-base text-red-100">Access to screened blood donors</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}