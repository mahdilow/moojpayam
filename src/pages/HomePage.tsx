import React from "react";
import SEOHead from "../components/SEOHead";
import HeroSection from "../components/sections/HeroSection";
import FeaturesSection from "../components/sections/FeaturesSection";
import HowItWorksSection from "../components/sections/HowItWorksSection";
import StatisticsSection from "../components/sections/StatisticsSection";
import PricingSection from "../components/sections/PricingSection";
import LatestBlogsSection from "../components/sections/LatestBlogsSection";
import FaqSection from "../components/sections/FaqSection";
import ContactSection from "../components/sections/ContactSection";
import CtaSection from "../components/sections/CtaSection";

const HomePage: React.FC = () => {
  return (
    <>
      <SEOHead
        title="موج پیام | سامانه ارسال پیامک هوشمند و منطقه‌ای"
        description="سامانه پیشرفته ارسال پیامک تبلیغاتی و اطلاع‌رسانی موج پیام. ارسال پیامک منطقه‌ای، هدفمند و انبوه با بالاترین نرخ تحویل و قیمت مناسب. پنل حرفه‌ای پیامک با امکانات پیشرفته."
        keywords="پیامک, ارسال پیامک, سامانه پیامک, پیامک تبلیغاتی, پیامک منطقه‌ای, پنل پیامک, ارسال انبوه پیامک, پیامک هدفمند, موج پیام, SMS, بازاریابی پیامکی, پیامک نقشه‌ای, ارسال پیامک به کد پستی"
        url="https://moojpayam.ir"
        image="https://moojpayam.ir/assets/mooj_payam_wave_hero.png"
      />

      <div>
        <HeroSection />
        <StatisticsSection />
        <FeaturesSection />
        <HowItWorksSection />
        <PricingSection />
        <FaqSection />
        <CtaSection />
        <LatestBlogsSection />
        <ContactSection />
      </div>
    </>
  );
};

export default HomePage;
