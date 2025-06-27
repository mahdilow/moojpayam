import React from "react";
import { ArrowDownCircle, Waves, MessageCircle, Zap } from "lucide-react";
import { motion } from "framer-motion";

const HeroSection: React.FC = () => {
  return (
    <section
      id="home"
      className="pt-24 pb-20 md:pt-32 md:pb-24 bg-gradient-to-br from-blue-50 via-white to-teal-50 overflow-hidden relative"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating waves */}
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute top-20 left-10 opacity-10"
        >
          <Waves size={120} className="text-blue-500" />
        </motion.div>
        
        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 5,
          }}
          className="absolute bottom-20 right-20 opacity-10"
        >
          <Waves size={80} className="text-teal-500" />
        </motion.div>

        {/* Floating message bubbles */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute top-40 right-32 opacity-20"
        >
          <MessageCircle size={40} className="text-blue-400" />
        </motion.div>

        <motion.div
          animate={{
            y: [0, 15, 0],
            rotate: [0, -8, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 2,
          }}
          className="absolute bottom-40 left-32 opacity-20"
        >
          <MessageCircle size={30} className="text-teal-400" />
        </motion.div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-wrap items-center min-h-[70vh]">
          {/* Left Content */}
          <div className="w-full lg:w-1/2 mb-12 lg:mb-0">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Brand Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center bg-gradient-to-r from-blue-100 to-teal-100 text-blue-600 px-6 py-3 rounded-full mb-8 shadow-lg"
              >
                <Waves className="ml-2" size={20} />
                <span className="font-bold">موج پیام - پیشرو در پیامک هوشمند</span>
              </motion.div>

              {/* Main Headline */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900 mb-6">
                <span className="block">پیام‌های شما</span>
                <span className="block text-transparent bg-gradient-to-r from-blue-500 to-teal-500 bg-clip-text">
                  مثل موج دریا
                </span>
                <span className="block">به همه می‌رسد</span>
              </h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl"
              >
                با قدرت هوش مصنوعی و تکنولوژی پیشرفته، پیامک‌های خود را به صورت 
                هدفمند و منطقه‌ای ارسال کنید. موج پیام، انقلابی در دنیای بازاریابی دیجیتال.
              </motion.p>

              {/* Key Features */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-wrap gap-6 mb-10"
              >
                <div className="flex items-center bg-white/80 backdrop-blur rounded-2xl px-4 py-3 shadow-md">
                  <div className="w-3 h-3 bg-green-500 rounded-full ml-3"></div>
                  <span className="text-gray-700 font-medium">ارسال منطقه‌ای</span>
                </div>
                <div className="flex items-center bg-white/80 backdrop-blur rounded-2xl px-4 py-3 shadow-md">
                  <div className="w-3 h-3 bg-blue-500 rounded-full ml-3"></div>
                  <span className="text-gray-700 font-medium">هوش مصنوعی</span>
                </div>
                <div className="flex items-center bg-white/80 backdrop-blur rounded-2xl px-4 py-3 shadow-md">
                  <div className="w-3 h-3 bg-purple-500 rounded-full ml-3"></div>
                  <span className="text-gray-700 font-medium">تحلیل پیشرفته</span>
                </div>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 sm:space-x-reverse"
              >
                <a
                  target="_blank"
                  href="http://dash.moojpayam.ir/userregister.aspx"
                  className="btn btn-primary text-center px-8 py-4 text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                >
                  <Zap className="ml-2" size={20} />
                  شروع رایگان
                </a>
                <a
                  href="#features"
                  className="btn btn-outline text-center px-8 py-4 text-lg hover:bg-blue-50 transition-all duration-300"
                >
                  کشف امکانات
                </a>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Side - Animated Ocean Scene */}
          <div className="w-full lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="relative"
            >
              {/* Main Ocean Container */}
              <div className="relative bg-gradient-to-b from-sky-200 via-blue-300 to-blue-500 rounded-3xl p-8 shadow-2xl overflow-hidden min-h-[500px]">
                
                {/* Animated Waves */}
                <div className="absolute bottom-0 left-0 right-0">
                  <motion.div
                    animate={{
                      x: [0, 50, 0],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                    className="absolute bottom-0 left-0 right-0 h-32"
                  >
                    <svg
                      viewBox="0 0 1200 120"
                      className="w-full h-full"
                      preserveAspectRatio="none"
                    >
                      <path
                        d="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z"
                        fill="rgba(255,255,255,0.3)"
                      />
                    </svg>
                  </motion.div>
                  
                  <motion.div
                    animate={{
                      x: [0, -30, 0],
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      repeatType: "reverse",
                      delay: 1,
                    }}
                    className="absolute bottom-0 left-0 right-0 h-24"
                  >
                    <svg
                      viewBox="0 0 1200 120"
                      className="w-full h-full"
                      preserveAspectRatio="none"
                    >
                      <path
                        d="M0,40 C400,100 800,20 1200,40 L1200,120 L0,120 Z"
                        fill="rgba(255,255,255,0.2)"
                      />
                    </svg>
                  </motion.div>
                </div>

                {/* Animated Dolphin */}
                <motion.div
                  animate={{
                    y: [0, -20, 0],
                    x: [0, 30, 0],
                    rotate: [0, 5, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                  className="absolute top-1/3 left-1/4 z-10"
                >
                  <div className="relative">
                    {/* Dolphin Body */}
                    <div className="w-24 h-12 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full transform rotate-12 shadow-lg"></div>
                    {/* Dolphin Tail */}
                    <div className="absolute -right-6 top-2 w-8 h-8 bg-gradient-to-r from-gray-500 to-gray-700 rounded-full transform rotate-45"></div>
                    {/* Dolphin Fin */}
                    <div className="absolute top-0 left-4 w-6 h-4 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full transform -rotate-12"></div>
                  </div>
                </motion.div>

                {/* Message Bubbles from Dolphin */}
                <motion.div
                  animate={{
                    y: [0, -40, -80],
                    opacity: [1, 0.8, 0],
                    scale: [0.8, 1, 1.2],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: 0,
                  }}
                  className="absolute top-1/4 left-1/2"
                >
                  <div className="w-8 h-8 bg-white/80 rounded-full flex items-center justify-center shadow-lg">
                    <MessageCircle size={16} className="text-blue-500" />
                  </div>
                </motion.div>

                <motion.div
                  animate={{
                    y: [0, -40, -80],
                    opacity: [1, 0.8, 0],
                    scale: [0.8, 1, 1.2],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: 1,
                  }}
                  className="absolute top-1/3 right-1/3"
                >
                  <div className="w-6 h-6 bg-white/80 rounded-full flex items-center justify-center shadow-lg">
                    <MessageCircle size={12} className="text-teal-500" />
                  </div>
                </motion.div>

                <motion.div
                  animate={{
                    y: [0, -40, -80],
                    opacity: [1, 0.8, 0],
                    scale: [0.8, 1, 1.2],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: 2,
                  }}
                  className="absolute top-1/2 left-1/3"
                >
                  <div className="w-10 h-10 bg-white/80 rounded-full flex items-center justify-center shadow-lg">
                    <MessageCircle size={20} className="text-purple-500" />
                  </div>
                </motion.div>

                {/* Floating Text Elements */}
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                  className="absolute top-16 right-8 bg-white/90 backdrop-blur rounded-2xl px-4 py-2 shadow-lg"
                >
                  <span className="text-sm font-bold text-blue-600">پیامک منطقه‌ای</span>
                </motion.div>

                <motion.div
                  animate={{
                    y: [0, -15, 0],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: 0.5,
                  }}
                  className="absolute bottom-32 left-8 bg-white/90 backdrop-blur rounded-2xl px-4 py-2 shadow-lg"
                >
                  <span className="text-sm font-bold text-teal-600">هوش مصنوعی</span>
                </motion.div>

                <motion.div
                  animate={{
                    y: [0, -12, 0],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: 1,
                  }}
                  className="absolute top-1/2 right-16 bg-white/90 backdrop-blur rounded-2xl px-4 py-2 shadow-lg"
                >
                  <span className="text-sm font-bold text-purple-600">تحلیل داده</span>
                </motion.div>
              </div>

              {/* Decorative elements around the ocean */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-r from-blue-400 to-teal-400 rounded-full opacity-20 blur-xl"></div>
              <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full opacity-20 blur-xl"></div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-16 text-center"
        >
          <a
            href="#features"
            className="inline-flex items-center text-blue-500 hover:text-blue-600 transition-colors group"
          >
            <span className="ml-2 font-medium">کشف امکانات شگفت‌انگیز</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
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