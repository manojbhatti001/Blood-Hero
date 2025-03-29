import React from 'react';
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

const QuickLinks = () => {
  const links = [
    { name: 'Donate Blood', path: '/volunteer' },
    { name: 'Emergency Blood', path: '/emergency-blood' },
    { name: 'Eligibility', path: '/eligibility' },
    { name: 'About Us', path: '/about' }
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold relative inline-block">
        Quick Links
        <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-gradient-to-r from-red-500 to-red-600"></span>
      </h3>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.name}>
            <Link to={link.path} className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-300 flex items-center">
              <Heart className="w-4 h-4 mr-2 text-red-500" />
              <span className="border-b border-transparent hover:border-red-500">{link.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuickLinks;
