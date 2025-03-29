import React from 'react';
import { motion } from 'framer-motion';
import { Clock, MapPin, Hospital, CheckCircle } from 'lucide-react';
import { AnimatedSection } from '../Animation';

export default function EmergencyProcess() {
  return (
    <div className="min-h-screen flex items-center">
      {/* Process Section */}
      <AnimatedSection className="relative overflow-hidden w-full min-h-screen flex items-center">
        {/* Background Elements */}
        <div className="absolute inset-0  bg-gradient-to-br from-red-50 via-white to-gray-50" />
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-400 to-red-600" />
        <div className="absolute -left-32 top-32 w-64 h-64 bg-red-100 rounded-full blur-3xl opacity-60" />
        <div className="absolute -right-32 bottom-32 w-64 h-64 bg-red-50 rounded-full blur-3xl opacity-60" />
        
        <div className="container px-4 mx-auto py-16 relative">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-block"
            >
              <span className="inline-flex items-center px-6 py-2 rounded-full bg-gradient-to-r from-red-500 to-red-600 text-white text-sm font-medium mb-6">
                <span className="animate-pulse mr-2">●</span>
                Emergency Process
              </span>
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="text-5xl md:text-6xl font-bold mb-6"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-600 via-red-500 to-gray-800">
                How It Works
              </span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="relative"
            >
              <p className="max-w-2xl mx-auto text-xl text-gray-600 leading-relaxed">
                Our streamlined process ensures quick and efficient emergency blood support
                when every minute counts. We connect donors with recipients within minutes.
              </p>
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
                <div className="w-32 h-1 bg-gradient-to-r from-red-500 to-red-600 rounded-full" />
              </div>
            </motion.div>

            {/* Stats Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-3 gap-12 max-w-4xl mx-auto mt-16 mb-20"
            >
              <div className="text-center">
                <div className="text-4xl font-bold text-red-600 mb-2">98%</div>
                <div className="text-lg text-gray-600">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-red-600 mb-2">15min</div>
                <div className="text-lg text-gray-600">Average Response</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-red-600 mb-2">24/7</div>
                <div className="text-lg text-gray-600">Support</div>
              </div>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12 relative">
            {/* Connecting lines with animation */}
            <div className="hidden md:block absolute top-1/2 left-1/4 right-1/4 -translate-y-1/2">
              <div className="h-0.5 w-full bg-gradient-to-r from-red-200 via-red-400 to-red-200">
                <div className="animate-pulse-flow h-full w-20 bg-red-500 rounded-full" />
              </div>
            </div>

            <ProcessCard
              step="01"
              icon={<Clock className="w-10 h-10" />}
              title="Quick Response"
              description="Immediate processing of emergency requests with real-time donor matching"
              features={[
                "Under 15 min response",
                "24/7 availability",
                "Priority handling"
              ]}
              delay={0}
              gradient="from-red-500 to-red-600"
            />
            <ProcessCard
              step="02"
              icon={<MapPin className="w-10 h-10" />}
              title="Local Network"
              description="Connect with nearby verified donors in your immediate vicinity"
              features={[
                "Geo-location matching",
                "Verified donors only",
                "Distance tracking"
              ]}
              delay={0.2}
              gradient="from-blue-500 to-blue-600"
            />
            <ProcessCard
              step="03"
              icon={<Hospital className="w-10 h-10" />}
              title="Hospital Coordination"
              description="Seamless coordination with medical facilities for smooth transfer"
              features={[
                "Direct hospital contact",
                "Medical verification",
                "Transport assistance"
              ]}
              delay={0.4}
              gradient="from-emerald-500 to-emerald-600"
            />
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}

function ProcessCard({ step, icon, title, description, features, delay, gradient }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="group relative"
    >
      {/* Card Container */}
      <div className="relative bg-white rounded-2xl p-8 shadow-lg transition-all duration-300 
                    group-hover:shadow-2xl group-hover:scale-105 overflow-hidden">
        {/* Step Number */}
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 
                      rounded-full opacity-20 transform -rotate-12" />
        <span className="absolute top-4 right-4 font-bold text-5xl text-gray-200">{step}</span>

        {/* Icon */}
        <div className={`inline-flex items-center justify-center p-3 rounded-xl bg-gradient-to-r ${gradient} text-white mb-6`}>
          {icon}
        </div>

        {/* Content */}
        <h3 className="text-2xl font-bold mb-4 text-gray-800 group-hover:text-gray-900">{title}</h3>
        <p className="text-gray-600 mb-6 leading-relaxed text-lg">{description}</p>

        {/* Features List */}
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <motion.li 
              key={index}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: delay + 0.1 * index }}
              className="flex items-center text-lg text-gray-600"
            >
              <CheckCircle className="w-5 h-5 mr-3 text-green-500" />
              {feature}
            </motion.li>
          ))}
        </ul>

        {/* Bottom Gradient Bar */}
        <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${gradient} 
                      transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`} />
      </div>

      {/* Background Glow Effect */}
      <div className={`absolute -inset-2 bg-gradient-to-r ${gradient} opacity-0 
                    group-hover:opacity-10 rounded-3xl blur-xl transition-opacity duration-300`} />
    </motion.div>
  );
}