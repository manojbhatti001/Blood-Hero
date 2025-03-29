import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const VideoSection = () => {
  const videoRef = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  const playVideo = async () => {
    try {
      if (videoRef.current) {
        setIsPlaying(true);
        await videoRef.current.play();
      }
    } catch (error) {
      console.log("Playback failed:", error);
      setIsPlaying(false);
    }
  };

  const pauseVideo = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    const options = {
      threshold: 0.5,
      rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsInView(true);
          // Add a small delay before playing to prevent rapid play/pause
          setTimeout(() => {
            if (entry.isIntersecting) {
              playVideo();
            }
          }, 100);
        } else {
          setIsInView(false);
          pauseVideo();
        }
      });
    }, options);

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
        pauseVideo();
      }
    };
  }, []);

  const togglePlayPause = () => {
    if (videoRef.current?.paused) {
      playVideo();
    } else {
      pauseVideo();
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="container px-4 mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8"
        >
          How Blood Donation Works
        </motion.h2>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-3xl mx-auto rounded-xl overflow-hidden shadow-xl relative group"
        >
          <video
            ref={videoRef}
            muted={isMuted}
            playsInline
            loop
            poster="/images/blood-donation-video2.mp4"
            className="w-full"
          >
            <source src="/images/blood-donation-video2.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          {/* Video Controls */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex items-center justify-between">
              {/* Play/Pause Button */}
              <button
                onClick={togglePlayPause}
                className="text-white hover:text-red-500 transition-colors"
              >
                {isPlaying ? (
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                  </svg>
                ) : (
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                )}
              </button>
              
              {/* Mute/Unmute Button */}
              <button
                onClick={toggleMute}
                className="text-white hover:text-red-500 transition-colors"
              >
                {isMuted ? (
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
                  </svg>
                ) : (
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                  </svg>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default VideoSection;
