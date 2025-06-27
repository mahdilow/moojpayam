import React from "react";
import { ArrowDownCircle, Zap, Target, BarChart3 } from "lucide-react";
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
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-teal-100/20 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-wrap items-center min-h-[80vh]">
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
                className="inline-flex items-center bg-gradient-to-r from-blue-100 to-purple-100 text-blue-600 px-6 py-3 rounded-full mb-8 shadow-lg border border-blue-200"
              >
                <div className="w-2 h-2 bg-blue-500 rounded-full ml-2 animate-pulse"></div>
                <span className="font-bold">پیشرو در پیامک هوشمند منطقه‌ای</span>
              </motion.div>

              {/* Main Headline */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900 mb-6">
                <span className="block mb-2">پیامک‌های شما</span>
                <span className="block text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text mb-2">
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
                <span className="font-semibold text-blue-600"> هدفمند و منطقه‌ای </span>
                ارسال کنید. انقلابی در دنیای بازاریابی دیجیتال.
              </motion.p>

              {/* Key Features */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-wrap gap-4 mb-10"
              >
                <div className="flex items-center bg-white/80 backdrop-blur border border-green-200 rounded-2xl px-4 py-3 shadow-md">
                  <div className="w-3 h-3 bg-green-500 rounded-full ml-3"></div>
                  <span className="text-gray-700 font-medium">ارسال منطقه‌ای</span>
                </div>
                <div className="flex items-center bg-white/80 backdrop-blur border border-blue-200 rounded-2xl px-4 py-3 shadow-md">
                  <div className="w-3 h-3 bg-blue-500 rounded-full ml-3"></div>
                  <span className="text-gray-700 font-medium">هوش مصنوعی</span>
                </div>
                <div className="flex items-center bg-white/80 backdrop-blur border border-purple-200 rounded-2xl px-4 py-3 shadow-md">
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
                  className="btn btn-primary text-center px-8 py-4 text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center"
                >
                  <Zap className="ml-2" size={20} />
                  شروع رایگان
                </a>
                <a
                  href="#features"
                  className="btn btn-outline text-center px-8 py-4 text-lg hover:bg-blue-50 transition-all duration-300 flex items-center justify-center"
                >
                  کشف امکانات
                </a>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Side - Simple Visual */}
          <div className="w-full lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="relative"
            >
              {/* Main Visual Container */}
              <div className="relative bg-gradient-to-br from-blue-500 via-purple-500 to-teal-500 rounded-3xl p-8 shadow-2xl overflow-hidden min-h-[500px] flex items-center justify-center">
                
                {/* Central Phone/Device */}
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                  className="relative z-10"
                >
                  {/* Phone Shape */}
                  <div className="w-48 h-80 bg-white rounded-3xl shadow-2xl p-4 relative">
                    {/* Screen */}
                    <div className="w-full h-full bg-gradient-to-b from-gray-100 to-gray-200 rounded-2xl p-4 relative overflow-hidden">
                      {/* Header */}
                      <div className="bg-blue-500 text-white rounded-lg p-3 mb-4 text-center">
                        <div className="text-sm font-bold">موج پیام</div>
                        <div className="text-xs opacity-80">پیامک منطقه‌ای</div>
                      </div>
                      
                      {/* Message Bubbles */}
                      <motion.div
                        animate={{
                          opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: 0,
                        }}
                        className="bg-blue-100 rounded-lg p-2 mb-2 text-xs text-right"
                      >
                        پیام تبلیغاتی شما
                      </motion.div>
                      
                      <motion.div
                        animate={{
                          opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: 0.5,
                        }}
                        className="bg-green-100 rounded-lg p-2 mb-2 text-xs text-right"
                      >
                        ارسال شد ✓
                      </motion.div>
                      
                      <motion.div
                        animate={{
                          opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: 1,
                        }}
                        className="bg-purple-100 rounded-lg p-2 text-xs text-right"
                      >
                        تحویل داده شد ✓
                      </motion.div>
                    </div>
                  </div>
                </motion.div>

                {/* Floating Icons Around Phone */}
                <motion.div
                  animate={{
                    y: [0, -15, 0],
                    rotate: [0, 10, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                  className="absolute top-16 left-8 bg-white/90 backdrop-blur rounded-2xl p-3 shadow-lg"
                >
                  <Target className="text-blue-500" size={24} />
                </motion.div>

                <motion.div
                  animate={{
                    y: [0, 12, 0],
                    rotate: [0, -8, 0],
                  }}
                  transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: 0.5,
                  }}
                  className="absolute top-32 right-8 bg-white/90 backdrop-blur rounded-2xl p-3 shadow-lg"
                >
                  <BarChart3 className="text-purple-500" size={24} />
                </motion.div>

                <motion.div
                  animate={{
                    y: [0, -18, 0],
                    rotate: [0, 12, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: 1,
                  }}
                  className="absolute bottom-32 left-12 bg-white/90 backdrop-blur rounded-2xl p-3 shadow-lg"
                >
                  <Zap className="text-teal-500" size={24} />
                </motion.div>

                {/* Floating Text Labels */}
                <motion.div
                  animate={{
                    opacity: [0.7, 1, 0.7],
                    scale: [0.95, 1, 0.95],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                  className="absolute bottom-16 right-12 bg-white/95 backdrop-blur rounded-2xl px-4 py-2 shadow-lg"
                >
                  <span className="text-sm font-bold text-gray-700">۹۸٪ تحویل موفق</span>
                </motion.div>

                <motion.div
                  animate={{
                    opacity: [0.7, 1, 0.7],
                    scale: [0.95, 1, 0.95],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: 0.8,
                  }}
                  className="absolute top-20 right-20 bg-white/95 backdrop-blur rounded-2xl px-4 py-2 shadow-lg"
                >
                  <span className="text-sm font-bold text-gray-700">هدفمندسازی دقیق</span>
                </motion.div>

                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-10 left-10 w-4 h-4 bg-white rounded-full"></div>
                  <div className="absolute top-20 right-16 w-2 h-2 bg-white rounded-full"></div>
                  <div className="absolute bottom-16 left-20 w-3 h-3 bg-white rounded-full"></div>
                  <div className="absolute bottom-32 right-8 w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20 blur-xl"></div>
              <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-gradient-to-r from-purple-400 to-teal-400 rounded-full opacity-20 blur-xl"></div>
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