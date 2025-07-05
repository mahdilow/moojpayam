import React from "react";
import { ArrowDownCircle, Zap } from "lucide-react";
import { motion } from "framer-motion";

const HeroSection: React.FC = () => {
  return (
    <section
      id="home"
      className="pt-20 pb-16 sm:pt-24 sm:pb-20 md:pt-32 md:pb-24 bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-hidden relative"
    >
      {/* Simple Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-4 sm:left-10 w-24 h-24 sm:w-32 sm:h-32 bg-blue-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-4 sm:right-20 w-32 h-32 sm:w-40 sm:h-40 bg-purple-200/30 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between min-h-[60vh] sm:min-h-[70vh] max-w-7xl mx-auto lg:gap-16">
          {/* Image Section */}
          <div className="w-full lg:w-6/12 mb-8 lg:mb-0 order-1 lg:order-2">
            <div className="relative flex items-center justify-center">
              <motion.img
                src="/assets/mooj_payam_wave_hero.webp"
                alt="موج پیام | ارسال پیامک سریع و ارزان"
                className="w-full max-w-sm sm:max-w-md lg:max-w-none h-auto drop-shadow-2xl"
                fetchPriority="high"
                animate={{ y: [0, -8, 0] }}
                transition={{
                  delay: 1, // delays animation to let image paint first
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-2xl scale-110 -z-10"></div>
            </div>
          </div>

          {/* Content Section */}
          <div className="w-full lg:w-5/12 order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
              className="text-center lg:text-right"
            >
              {/* Main Headline */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight text-gray-900">
                <motion.span
                  className="block text-transparent bg-clip-text mb-4 sm:mb-6 pb-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                  style={{
                    backgroundImage:
                      "linear-gradient(90deg, #2563eb 0%, #9333ea 50%, #0d9488 100%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                  }}
                >
                  موج پیام
                </motion.span>
                <motion.span
                  className="block mb-4 sm:mb-6 leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  با پیامک شروع کن؛ با فروش بیشتر ادامه بده
                </motion.span>
              </h1>

              {/* Sub-tagline */}
              <motion.p
                className="text-gray-600 text-sm sm:text-base lg:text-lg mb-6 sm:mb-8 leading-relaxed px-2 sm:px-0"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.85 }}
              >
                بازاریابی پیامکی آسان، مؤثر و با امکاناتی که دقیقاً نیاز دارید
              </motion.p>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.95 }}
                className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start px-2 sm:px-0"
              >
                <a
                  target="_blank"
                  href="http://dash.moojpayam.ir/userregister.aspx"
                  className="btn btn-primary text-center px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center"
                >
                  <Zap className="ml-2" size={18} />
                  شروع ماجراجویی
                </a>
                <a
                  href="#features"
                  className="btn btn-outline text-center px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg hover:bg-blue-50 transition-all duration-300 flex items-center justify-center"
                >
                  همه امکانات
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="mt-12 sm:mt-16 text-center"
        >
          <a
            href="#features"
            className="inline-flex items-center text-blue-500 hover:text-blue-600 transition-colors group"
          >
            <span className="ml-2 font-medium text-sm sm:text-base">
              قابلیت های پنل
            </span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowDownCircle size={20} className="sm:w-6 sm:h-6" />
            </motion.div>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
