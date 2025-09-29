import React from "react";
import { motion } from "framer-motion";
import {
  MessageSquare,
  ArrowLeft,
  Sparkles,
  MapPin,
  Zap,
  BarChart3,
  AudioLines,
  Target,
} from "lucide-react";
import { Link } from "react-router-dom";

const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: MessageSquare,
      title: "ارسال انبوه پیامک",
      description: "ارسال همزمان هزاران پیامک با بالاترین سرعت",
    },
    {
      icon: MapPin,
      title: "ارسال منطقه‌ای",
      description: "هدف‌گیری دقیق بر اساس موقعیت جغرافیایی",
    },
    {
      icon: AudioLines,
      title: "پیامک صوتی",
      description: "ارسال پیام‌های صوتی با کیفیت بالا",
    },
    {
      icon: BarChart3,
      title: "گزارش‌گیری پیشرفته",
      description: "آمار و تحلیل دقیق عملکرد کمپین‌ها",
    },
    {
      icon: Target,
      title: "فیلتر هوشمند",
      description: "دسته‌بندی مخاطبان بر اساس ویژگی‌ها",
    },
    {
      icon: Zap,
      title: "پشتیبانی ۲۴/۷",
      description: "پشتیبانی شبانه‌روزی و مشاوره تخصصی",
    },
  ];

  return (
    <section
      id="features"
      className="py-12 sm:py-16 bg-gradient-to-br from-white to-blue-50"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 sm:mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-flex items-center bg-blue-100 text-primary-500 px-3 sm:px-4 py-2 rounded-full mb-4 sm:mb-6"
          >
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
            <span className="font-semibold text-sm sm:text-base">
              امکانات کلیدی
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-gray-900"
          >
            امکانات{" "}
            <span className="text-primary-500 relative">
              موج پیام
              <span className="absolute bottom-0 left-0 w-full h-1 bg-primary-500/30 rounded-full"></span>
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4 sm:px-0"
          >
            ابزارهای قدرتمند برای بازاریابی پیامکی موثر
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {features.map((feature, index) => (
            <Link to="/features">
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -8 }}
                transition={{
                  duration: 0.1,
                  ease: "easeInOut",
                }}
                viewport={{ once: true }}
                className="group relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl 
                       transition-all duration-300 border border-gray-100 hover:border-primary-200"
              >
                {/* Background gradient on hover */}
                <div
                  className="absolute inset-0 bg-gradient-to-br from-primary-50/50 to-blue-50/50 
                            rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />

                {/* Content in center */}
                <div className="relative z-10 flex flex-col items-center justify-center text-center h-full">
                  {/* Icon */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.2 }}
                    className="w-12 h-12 bg-gradient-to-br from-primary-500 to-blue-600 
                           rounded-xl flex items-center justify-center mb-4 
                           group-hover:shadow-lg transition-shadow duration-300"
                  >
                    <feature.icon className="w-6 h-6 text-white" />
                  </motion.div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-sm leading-relaxed group-hover:text-gray-700 transition-colors">
                    {feature.description}
                  </p>
                </div>

                {/* Hover indicator stays in bottom right */}
                <div
                  className="absolute bottom-5 right-5 w-8 h-8 bg-primary-500 rounded-full 
                            opacity-0 group-hover:opacity-10 transition-opacity duration-300 
                            transform translate-x-4 translate-y-4"
                />
              </motion.div>
            </Link>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              امکانات بیشتری می‌خواهید؟
            </h3>
            <p className="text-gray-600 mb-6">
              مشاهده کامل ویژگی‌ها و قابلیت‌های پیشرفته پنل پیامک
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/features"
                className="btn btn-primary inline-flex items-center group"
              >
                <span>مشاهده همه امکانات</span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="mr-2"
                >
                  <ArrowLeft size={18} />
                </motion.div>
              </Link>
              <a
                href="#pricing"
                className="btn btn-outline inline-flex items-center px-6 py-3 font-bold hover:bg-blue-50 transition-all duration-300 group text-sm sm:text-base"
              >
                <span>مشاهده تعرفه‌ها</span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="mr-2"
                >
                  →
                </motion.div>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
