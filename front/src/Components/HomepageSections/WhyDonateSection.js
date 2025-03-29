import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Activity, Users } from 'lucide-react';
import InfoCard from '../InfoCard';

export default function InfoCardsSection() {
  return (
    <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container px-4 mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block text-red-600 font-semibold text-base sm:text-lg mb-4 px-4 py-2 bg-red-50 rounded-full"
          >
            Make a Difference
          </motion.span>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-red-800"
          >
            Why Donate Blood?
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-600 max-w-3xl mx-auto text-base sm:text-lg mb-6 px-4 leading-relaxed"
          >
            Your decision to donate blood can make a life-changing difference. Every donation contributes to saving lives and strengthening our community's health infrastructure.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="inline-flex items-center gap-2 px-6 py-2 bg-red-50 rounded-full text-red-600"
          >
            <Heart className="w-5 h-5" />
            <span className="font-medium text-sm sm:text-base">Join thousands of donors making a difference</span>
          </motion.div>
        </div>
        
        {/* Cards Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10"
        >
          <InfoCard
            title="Save Multiple Lives"
            description="One donation can save up to three lives! Your single donation can help accident victims, surgery patients, and those fighting cancer. Every drop of your blood can be separated into red blood cells, plasma, and platelets to help different patients in need."
            image="/images/donor1.jpg"
            icon={<Heart className="w-6 h-6 text-red-500" />}
            link="/learn"
            stats={["3 Lives", "45 Minutes", "500ml Donation"]}
          />
          <InfoCard
            title="Health Benefits"
            description="Regular blood donation offers numerous health benefits: reduced risk of heart disease, enhanced blood cell production, calorie burn, free health screening, reduced iron storage diseases, and lower risk of certain cancers. It's a win-win for donors and recipients!"
            image="/images/donor2.jpg_large"
            icon={<Activity className="w-6 h-6 text-red-500" />}
            link="/eligibility"
            stats={["Heart Health", "Free Checkup", "Weight Management"]}
          />
          <InfoCard
            title="Community Impact"
            description="Be a local hero! Your donation directly helps people in your community. Support local hospitals, emergency services, and ensure a stable blood supply. Join our network of lifesavers and make a lasting difference in someone's life today."
            image="/images/donor3.jpg"
            icon={<Users className="w-6 h-6 text-red-500" />}
            link="/stories"
            stats={["Local Impact", "24/7 Support", "Verified Donors"]}
          />
        </motion.div>
      </div>
    </section>
  );
}