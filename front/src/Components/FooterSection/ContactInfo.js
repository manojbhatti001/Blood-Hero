import React from 'react';
import { PhoneCall, Mail, MapPin } from "lucide-react";

const ContactInfo = () => {
  const contactDetails = [
    { icon: PhoneCall, text: '+91 9992396623' },
    { icon: Mail, text: 'iinsafgroup@gmail.com' },
    { icon: MapPin, text: '419,Sunder Nagar Hisar 125001' }
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold relative inline-block">
        Contact Us
        <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-gradient-to-r from-red-500 to-red-600"></span>
      </h3>
      <div className="space-y-4">
        {contactDetails.map((detail, index) => (
          <div key={index} className="flex items-center group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500/10 to-red-600/10 flex items-center justify-center group-hover:from-red-500/20 group-hover:to-red-600/20 transition-all duration-300">
              <detail.icon className="h-5 w-5 text-red-500" />
            </div>
            <span className="ml-3 text-gray-300 group-hover:text-white transition-colors">{detail.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactInfo;