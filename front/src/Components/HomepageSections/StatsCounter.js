import React from 'react';
import { motion } from 'framer-motion';
import { Users, Heart, Calendar, AlertCircle } from 'lucide-react';
import { useCountUp } from '../hooks/useCountUp';

// Update the StatCard component with smoother animations
function StatCard({ number, label, icon, className }) {
  // Always call useCountUp, but handle the result conditionally
  const [count, ref] = useCountUp(parseInt(number.replace(/[^0-9]/g, '')));
  const displayNumber = number === "24/7" ? number : (number.includes('+') ? `${count}+` : count);

  return (
    <motion.div 
      ref={number !== "24/7" ? ref : null}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-100px" }}
      whileHover={{ 
        scale: 1.05,
        y: -10,
        transition: { duration: 0.4 }
      }}
      className={`text-center p-8 rounded-2xl shadow-lg backdrop-blur-sm ${className} text-white cursor-pointer relative overflow-hidden group`}
    >
      {/* Hover effect background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
      
      {/* Icon with animation */}
      <motion.div 
        className="text-white/90 mb-4 flex justify-center"
        initial={{ scale: 0.5, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: false, margin: "-100px" }}
        whileHover={{ 
          scale: 1.2,
          rotate: 360,
          transition: { duration: 0.7 }
        }}
      >
        {icon}
      </motion.div>

      {/* Number with improved animation */}
      <motion.div 
        className="text-4xl font-bold mb-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span className="inline-block">
          {displayNumber}
        </span>
      </motion.div>

      {/* Label with hover effect */}
      <motion.div 
        className="text-white/90 font-medium tracking-wide"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        whileHover={{ 
          scale: 1.1,
          transition: { duration: 0.3 }
        }}
      >
        {label}
      </motion.div>

      {/* Hover border effect */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/30 rounded-2xl transition-all duration-400" />
    </motion.div>
  );
}

export default function StatisticsSection() {
  return (
    <section className="py-12 sm:py-16">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-bold mb-4"
          >
            Our Impact in Numbers
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-600 max-w-2xl mx-auto text-base sm:text-lg"
          >
            Together, we're making a difference in our community through blood donation
          </motion.p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          <StatCard 
            number="10000+" 
            label="Active Donors" 
            icon={<Users className="w-8 h-8" />} 
            className="bg-gradient-to-br from-red-500 to-red-600"
          />
          <StatCard 
            number="15000+" 
            label="Lives Saved" 
            icon={<Heart className="w-8 h-8" />}
            className="bg-gradient-to-br from-blue-500 to-blue-600"
          />
          <StatCard 
            number="1000+" 
            label="Monthly Donations" 
            icon={<Calendar className="w-8 h-8" />}
            className="bg-gradient-to-br from-emerald-500 to-emerald-600"
          />
          <StatCard 
            number="24/7" 
            label="Emergency Support" 
            icon={<AlertCircle className="w-8 h-8" />}
            className="bg-gradient-to-br from-violet-500 to-violet-600"
          />
        </div>
      </div>
    </section>
  );
}