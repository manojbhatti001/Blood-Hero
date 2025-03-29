import React from 'react';
import { motion } from 'framer-motion';

// Data
const bloodTypes = [
  {
    group: "A+",
    canGiveTo: ["A+", "AB+"],
    canReceiveFrom: ["A+", "A-", "O+", "O-"]
  },
  {
    group: "O-",
    canGiveTo: ["All Types"],
    canReceiveFrom: ["O-"]
  },
  {
    group: "B+",
    canGiveTo: ["B+", "AB+"],
    canReceiveFrom: ["B+", "B-", "O+", "O-"]
  },
  {
    group: "AB+",
    canGiveTo: ["AB+"],
    canReceiveFrom: ["All Types"]
  },
  {
    group: "A-",
    canGiveTo: ["A+", "A-", "AB+", "AB-"],
    canReceiveFrom: ["A-", "O-"]
  },
  {
    group: "B-",
    canGiveTo: ["B+", "B-", "AB+", "AB-"],
    canReceiveFrom: ["B-", "O-"]
  },
  {
    group: "AB-",
    canGiveTo: ["AB+", "AB-"],
    canReceiveFrom: ["A-", "B-", "AB-", "O-"]
  },
  {
    group: "O+",
    canGiveTo: ["A+", "B+", "AB+", "O+"],
    canReceiveFrom: ["O+", "O-"]
  }
];

export default function BloodTypesSection() {
  const renderCompatibilityTags = (items) => {
    if (items.includes("All Types")) {
      return (
        <span className="px-2 sm:px-3 py-1 bg-purple-500/10 text-purple-400 rounded-full text-xs sm:text-sm font-medium">
          All Blood Types
        </span>
      );
    }
    
    return items.map(item => (
      <span 
        key={item}
        className="px-2 sm:px-3 py-1 bg-red-500/10 text-red-400 rounded-full text-xs sm:text-sm font-medium"
      >
        {item}
      </span>
    ));
  };

  return (
    <section className="py-12 sm:py-16 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <div className="container px-4 mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4 text-white">Blood Types</h2>
        <p className="text-gray-300 text-center mb-8 sm:mb-12 max-w-2xl mx-auto text-sm sm:text-base">
          Understanding blood types is crucial for donation. Find out which blood types are compatible with yours.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {bloodTypes.map(type => (
            <motion.div 
              key={type.group}
              whileHover={{ scale: 1.03, y: -5 }}
              className="bg-gradient-to-br from-gray-800 to-gray-900 p-4 sm:p-6 rounded-2xl shadow-xl border border-gray-700 hover:border-red-500/30 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h3 className="text-3xl sm:text-4xl font-bold text-red-500">{type.group}</h3>
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center text-white font-bold text-sm sm:text-base">
                  {type.group}
                </div>
              </div>
              
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <p className="text-xs sm:text-sm text-gray-400 mb-1">Can Give To:</p>
                  <div className="flex flex-wrap gap-2">
                    {renderCompatibilityTags(type.canGiveTo)}
                  </div>
                </div>
                
                <div>
                  <p className="text-xs sm:text-sm text-gray-400 mb-1">Can Receive From:</p>
                  <div className="flex flex-wrap gap-2">
                    {renderCompatibilityTags(type.canReceiveFrom)}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}