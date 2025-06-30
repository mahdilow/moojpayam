import React from "react";
import { ArrowDownCircle, Zap } from "lucide-react";
import { motion } from "framer-motion";

const HeroSection: React.FC = () => {
  return (
    <section
      id="home"
      className="pt-24 pb-20 md:pt-32 md:pb-24 bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-hidden relative"
    >
      {/* Simple Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-purple-200/30 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-wrap items-center justify-between min-h-[70vh] max-w-5xl mx-auto lg:flex-row-reverse">
          {/* Left Content - Image */}
          <div className="w-full lg:w-6/12 mb-8 lg:mb-0 ">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="relative flex items-center justify-center"
            >
              {/* Main Wave Image */}
              <motion.img
                src="/assets/mooj_payam_wave_hero.png"
                alt="موج پیام - ارسال پیامک مثل موج دریا"
                className="w-full max-w-none h-auto drop-shadow-2xl"
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }}
              />

              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-2xl scale-110 -z-10"></div>
            </motion.div>
          </div>

          {/* Right Content - Text */}
          <div className="w-full lg:w-6/12 lg:pr-8">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
              className="text-center lg:text-right mt-6"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900">
                <motion.span
                  className="block text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                >
                  موج پیام
                </motion.span>
                <motion.span
                  className="block mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  با پیامک شروع کن؛ با فروش بیشتر ادامه بده
                </motion.span>
              </h1>

              <motion.p
                className="text-gray-600 text-sm sm:text-base lg:text-lg mb-8 leading-loose"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.85 }}
              >
                بازاریابی پیامکی آسان، مؤثر و با امکاناتی که دقیقاً نیاز دارید
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.95 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <a
                  target="_blank"
                  href="http://dash.moojpayam.ir/userregister.aspx"
                  className="btn btn-primary text-center px-8 py-4 text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center"
                >
                  <Zap className="ml-2" size={20} />
                  شروع ماجراجویی
                </a>
                <a
                  href="#features"
                  className="btn btn-outline text-center px-8 py-4 text-lg hover:bg-blue-50 transition-all duration-300 flex items-center justify-center"
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
          className="mt-16 text-center"
        >
          <a
            href="#features"
            className="inline-flex items-center text-blue-500 hover:text-blue-600 transition-colors group"
          >
            <span className="ml-2 font-medium"> قابلیت های پنل</span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowDownCircle size={24} />
            </motion.div>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
