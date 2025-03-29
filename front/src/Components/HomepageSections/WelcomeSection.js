import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function HeroSection() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  return (
    <section className="relative h-screen flex items-center">
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {/* Placeholder image while video loads */}
        {!isVideoLoaded && (
          <div className="absolute inset-0 bg-gray-900">
            <img
              src="/images/logo2.png"
              className="w-full h-full object-contain opacity-70"
              alt="Logo"
            />
          </div>
        )}
        
        <video
          autoPlay
          loop
          muted
          playsInline
          onLoadedData={() => setIsVideoLoaded(true)}
          className={`w-full h-full object-cover transition-opacity duration-1000 ${
            isVideoLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <source src="/images/blood-donation-video1.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50" />
      </div>
      
      <div className="container px-4 mx-auto text-center relative z-10 text-white">
        <div className="flex justify-center items-center mb-4">
          <img src="/images/logo2.png" alt="Blood Donation Logo" className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 object-contain" />
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3">
          Every Drop <span className="text-red-500">Saves Lives</span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl mb-6 max-w-2xl mx-auto px-4">
          Your blood donation can save up to three lives. Join our community of donors today.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
          <Link to="/volunteer" className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700">
            Donate Blood
          </Link>
        </div>
      </div>
    </section>
  );
}