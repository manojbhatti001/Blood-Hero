import React from "react";
import QuickLinks from "./QuickLinks";
import Resources from "./Resources";
import ContactInfo from "./ContactInfo";
import SocialLinks from "./SocialLinks";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white relative">
      {/* Red accent line at top */}
      <div className="h-1 bg-gradient-to-r from-red-500 via-red-600 to-red-500"></div>
      
      <div className="container px-4 md:px-6 py-16 mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* About Section */}
          <div className="space-y-6">
            <div className="flex items-center">
              <img 
                src="/images/logo1.png" 
                alt="Blood Donation Logo" 
                className="h-20 w-auto brightness-0 invert hover:scale-105 transition-transform duration-300"
              />
            </div>
            <p className="text-gray-300 leading-relaxed">
              We're dedicated to connecting blood donors with those in need, making blood donation 
              accessible and efficient for everyone.
            </p>
            <div className="pt-4">
              <span className="text-red-500 font-semibold">Emergency Helpline:</span>
              <div className="text-white text-xl font-bold mt-1">1800-123-4567</div>
            </div>
          </div>

          {/* Quick Links Section */}
          <QuickLinks />

          {/* Resources Section */}
          <Resources />

          {/* Contact Info Section */}
          <ContactInfo />
        </div>

        {/* Social Links & Copyright */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 mb-4 md:mb-0">© Developed by Iinsaf Team. All rights reserved.</p>
            <SocialLinks />
          </div>
        </div>
      </div>
    </footer>
  );
}