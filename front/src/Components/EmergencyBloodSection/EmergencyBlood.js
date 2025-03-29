import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, AlertCircle } from 'lucide-react';
import Navbar from '../NavbarSection/Navbar';
import Footer from '../FooterSection/Footer';
import EmergencyForm from './EmergencyForm';
import EmergencyProcess from './EmergencyProcess';

export default function EmergencyBlood() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Main Content */}
      <div className="pt-16">
        {/* Header Section */}
        <section className="bg-gradient-to-br from-red-600 to-red-700 text-white py-8 relative overflow-hidden">
          {/* Background Effect */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-500/20 via-transparent to-transparent"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              {/* <motion.div 
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm mb-6"
              >
                <AlertCircle className="w-8 h-8 text-white" />
              </motion.div>
               */}
              {/* <motion.h1 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-4xl md:text-5xl font-bold mb-4"
              >
                Emergency Blood Request
              </motion.h1>
              
              <motion.p 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-xl text-red-100 mb-8"
              >
                Quick assistance for critical situations. Available 24/7.
              </motion.p> */}

              {/* Search Requests Button */}
              <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                onClick={() => navigate('/search-requests')}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-red-600 rounded-xl hover:bg-red-50 transition-all duration-300 font-semibold"
              >
                <Search className="w-5 h-5" />
                View Blood Requests
              </motion.button>
            </div>
          </div>
        </section>

        {/* Emergency Form Section */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <EmergencyForm />
          </div>
        </section>

        {/* Emergency Process Section */}
        <section id="emergency-process-section" className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <EmergencyProcess />
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}