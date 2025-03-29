import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';

export default function InfoCard({ title, description, image, icon, link, stats }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Add more detailed information for each card
  const additionalInfo = {
    benefits: [
      "Helps save up to 3 lives with one donation",
      "Regular health screening included",
      "Reduces risk of heart diseases",
      "Helps burn calories",
      "Improves blood flow"
    ],
    requirements: [
      "Age between 18-65 years",
      "Weight above 50kg",
      "Hemoglobin level ≥ 12.5g/dl",
      "No major surgery in last 6 months",
      "No tattoo/piercing in last 12 months"
    ],
    process: [
      "Registration & Basic Check",
      "Medical Screening",
      "Blood Donation (15-20 mins)",
      "Refreshments & Rest",
      "Certificate of Appreciation"
    ]
  };

  return (
    <>
      <div onClick={() => setIsModalOpen(true)}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ y: -5 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer"
        >
          <div className="relative h-48">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-4 left-4 text-white">
              <div className="bg-red-600/90 p-2 rounded-lg inline-block">
                {icon}
              </div>
            </div>
          </div>

          <div className="p-6">
            <h3 className="text-xl font-bold mb-3">{title}</h3>
            <p className="text-gray-600 mb-4 text-sm">{description}</p>

            {stats && (
              <div className="flex flex-wrap gap-2 mb-4">
                {stats.map((stat, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-red-50 text-red-600 rounded-full text-sm font-medium"
                  >
                    {stat}
                  </span>
                ))}
              </div>
            )}

            <span className="inline-flex items-center text-red-600 font-medium hover:text-red-700 transition-colors">
              Learn More →
            </span>
          </div>
        </motion.div>
      </div>

      {/* Enhanced Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm overflow-y-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto my-8"
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b z-10">
              <div className="flex items-center justify-between p-4 sm:p-6">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="p-2 sm:p-3 bg-red-600 rounded-xl">
                    {React.cloneElement(icon, { className: "w-6 h-6 sm:w-8 sm:h-8 text-white" })}
                  </div>
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">{title}</h3>
                    <p className="text-sm sm:text-base text-red-600 font-medium">Learn more about blood donation</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-4 sm:p-6">
              {/* Hero Image */}
              <div className="aspect-video relative rounded-xl overflow-hidden mb-6 sm:mb-8">
                <img 
                  src={image} 
                  alt={title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/0 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                  <div className="flex flex-wrap gap-3 sm:gap-4">
                    {stats.map((stat, index) => (
                      <div 
                        key={index}
                        className="bg-white/90 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-lg"
                      >
                        <span className="block text-sm sm:text-base font-semibold text-red-600">{stat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Content Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                {/* Left Column */}
                <div>
                  <h4 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">About</h4>
                  <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">{description}</p>

                  <h4 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">Benefits</h4>
                  <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                    {additionalInfo.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-center gap-2 sm:gap-3 text-sm sm:text-base text-gray-600">
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-red-600" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Right Column */}
                <div>
                  <h4 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">Requirements</h4>
                  <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                    {additionalInfo.requirements.map((req, index) => (
                      <li key={index} className="flex items-center gap-2 sm:gap-3 text-sm sm:text-base text-gray-600">
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-red-600" />
                        {req}
                      </li>
                    ))}
                  </ul>

                  <h4 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">Process</h4>
                  <div className="space-y-3 sm:space-y-4">
                    {additionalInfo.process.map((step, index) => (
                      <div key={index} className="flex items-center gap-3 sm:gap-4">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-semibold text-sm sm:text-base">
                          {index + 1}
                        </div>
                        <span className="text-sm sm:text-base text-gray-600">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Call to Action */}
              <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link 
                  to={link}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors font-semibold text-sm sm:text-base"
                  onClick={() => setIsModalOpen(false)}
                >
                  Learn More About {title}
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </Link>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 sm:flex-none px-4 sm:px-6 py-2.5 sm:py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-semibold text-sm sm:text-base"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}