import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import SEOHead from "../components/SEOHead";
import HeroSection from "../components/sections/HeroSection";
import FeaturesSection from "../components/sections/FeaturesSection";
import HowItWorksSection from "../components/sections/HowItWorksSection";
import StatisticsSection from "../components/sections/StatisticsSection";
import PricingSection from "../components/sections/PricingSection";
import LatestBlogsSection from "../components/sections/LatestBlogsSection";
import FaqSection from "../components/sections/FaqSection";
import CtaSection from "../components/sections/CtaSection";

const HomePage: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        setTimeout(
          () => element.scrollIntoView({ behavior: "smooth", block: "start" }),
          100
        );
      }
    }
  }, [location]);

  const faqItems = [
    {
      question: "چگونه می‌توانم پنل پیامک تبلیغاتی خریداری کنم؟",
      answer:
        "برای خرید یک پنل پیامک تبلیغاتی، کافی است مراحل ساده زیر را دنبال کنید. ابتدا به وب‌سایت موج پیام (moojpayam.ir) مراجعه کرده و با ثبت‌نام رایگان، فرآیند را آغاز کنید. سپس بسته‌ای متناسب با نیاز خود، مانند پنل ارسال پیامک انبوه، انتخاب کنید و پرداخت را انجام دهید. پس از تأیید پرداخت، پنل شما فعال می‌شود و می‌توانید از خدمات اس ام اس تبلیغاتی برای تبلیغات بهره‌مند شوید.",
    },
    {
      question:
        "آیا امکان ارسال پیامک تبلیغاتی به شماره‌های بلک لیست وجود دارد؟",
      answer:
        "خیر، مطابق با قوانین ارسال پیامک وضع‌شده توسط وزارت ارتباطات، ارسال پیامک تبلیغاتی به شماره‌هایی که در شماره‌های مسدود شده قرار دارند، امکان‌پذیر نیست. این شماره‌ها شامل افرادی است که درخواست عدم دریافت پیامک‌های تبلیغاتی را داده‌اند. برای رعایت قوانین پیامکی ایران، از سامانه‌های معتبر مانند موج پیام استفاده کنید تا از ارسال به شماره‌های غیرمجاز جلوگیری شود.",
    },
    {
      question: "تفاوت پیامک تبلیغاتی و خدماتی چیست؟",
      answer:
        "پیامک تبلیغاتی برای اهداف تبلیغات پیامکی و بازاریابی محصولات و خدمات استفاده می‌شود و معمولاً از خطوط پیامکی 1000 یا 2000 ارسال می‌شود. در مقابل، پیامک خدماتی برای اطلاع‌رسانی پیامکی به مشتریان فعلی، مثل وضعیت سفارش، پرداخت قبض یا یادآوری قرار، طراحی شده و از خطوط پیامکی 3000 یا 9000 ارسال می‌گردد. برای ارسال پیامک حرفه‌ای، از سامانه ارسال پیامک موج پیام استفاده کنید",
    },
    {
      question: "چگونه می‌توانم به پنل خود اعتبار اضافه کنم؟",
      answer:
        "برای افزایش اعتبار پنل پیامکی، مراحل زیر را دنبال کنید: به صفحه شخصی خود در سامانه پیامکی وارد شوید.از بخش شارژ پنل، مبلغ مورد نظر را انتخاب کنید. پرداخت آنلاین را انجام دهید؛ اعتبار شما بلافاصله پس از تأیید افزایش می‌یابد. برای خرید اعتبار پیامک آسان، از موج پیام استفاده کنید!",
    },
    {
      question: "آیا امکان ارسال پیامک زمانبندی شده وجود دارد؟",
      answer:
        "بله، با استفاده از پنل پیامکی، می‌توانید ارسال پیامک زمانبندی‌شده را انجام دهید. کافی است پیام‌های خود را از قبل تنظیم کرده و برنامه‌ریزی پیامک را برای زمان مشخصی در آینده انجام دهید. این زمان‌بندی پیامک برای موارد زیر بسیار مفید است: تبریک مناسبت‌ها با یادآوری پیامکی.یادآوری رویدادها برای مشتریان.اجرای کمپین تبلیغاتی پیامکی در زمان مناسب.برای تجربه بهتر، از سامانه ارسال پیامک موج پیام استفاده کنید!",
    },
    {
      question:
        "آیا می‌توانم از پنل پیامک برای ارسال پیام‌های شخصی‌سازی شده استفاده کنم؟",
      answer:
        "بله، با پنل پیامک ما، امکان شخصی‌سازی پیامک فراهم است. این سامانه به شما اجازه می‌دهد با استفاده از متغیرهای پیامکی مانند:نام و نام خانوادگی،تاریخ تولد،سایر اطلاعات مخاطبان از طریق مدیریت مخاطبان،پیامک اختصاصی برای هر فرد ارسال کنید. این قابلیت با ارسال پیامک هدفمند، تجربه بهتری برای کاربران ایجاد می‌کند. برای شروع، از سامانه پیامکی موج پیام استفاده کنید!",
    },
  ];

  return (
    <>
      <SEOHead
        title="موج پیام | سامانه ارسال پیامک هوشمند و منطقه‌ای"
        description="سامانه پیشرفته ارسال پیامک تبلیغاتی و اطلاع‌رسانی موج پیام. ارسال پیامک منطقه‌ای، هدفمند و انبوه با بالاترین نرخ تحویل و قیمت مناسب. پنل حرفه‌ای پیامک با امکانات پیشرفته."
        keywords="پیامک, ارسال پیامک, سامانه پیامک, پیامک تبلیغاتی, پیامک منطقه‌ای, پنل پیامک, ارسال انبوه پیامک, پیامک هدفمند, موج پیام, SMS, بازاریابی پیامکی, پیامک نقشه‌ای, ارسال پیامک به کد پستی"
        url="https://moojpayam.ir"
        image="https://moojpayam.ir/assets/moojpayam_hero.webp"
      >
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqItems.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: item.answer,
              },
            })),
          })}
        </script>
      </SEOHead>

      <div>
        <HeroSection />
        <StatisticsSection />
        <FeaturesSection />
        <HowItWorksSection />
        <PricingSection />
        <FaqSection />
        <CtaSection />
        <LatestBlogsSection />
      </div>
    </>
  );
};

export default HomePage;
