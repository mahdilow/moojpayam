import React from 'react';
import HeroSection from '../components/sections/HeroSection';
import FeaturesSection from '../components/sections/FeaturesSection';
import HowItWorksSection from '../components/sections/HowItWorksSection';
import StatisticsSection from '../components/sections/StatisticsSection';
import PricingSection from '../components/sections/PricingSection';
import LatestBlogsSection from '../components/sections/LatestBlogsSection';
import FaqSection from '../components/sections/FaqSection';
import ContactSection from '../components/sections/ContactSection';
import CtaSection from '../components/sections/CtaSection';

const HomePage: React.FC = () => {
  return (
    <div>
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <StatisticsSection />
      <PricingSection />
      <LatestBlogsSection />
      <FaqSection />
      <CtaSection />
      <ContactSection />
    </div>
  );
};

export default HomePage;