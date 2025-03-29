import React from "react";
import WelcomeSection from './WelcomeSection';
import WhyDonateSection from './WhyDonateSection';
import VideoSection from './VideoSection';
import StatsCounter from './StatsCounter';
import BloodTypesSection from './BloodTypesSection';
import EmergencySection from './EmergencySection';
import GallerySection from './GallerySection';

export default function HomePage() {
  return (
    <main>
      <WelcomeSection />
      <WhyDonateSection />
      <StatsCounter />
      <BloodTypesSection />
      <EmergencySection />
      <GallerySection />
      <VideoSection />
    </main>
  );
}
