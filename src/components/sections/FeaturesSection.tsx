import React from "react";
import { motion } from "framer-motion";
import {
  MessageSquare,
  ArrowLeft,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";

const FeaturesSection: React.FC = () => {
  const highlightFeatures = [
    "ارسال انبوه پیامک",
    "ارسال منطقه‌ای",
    "پیامک صوتی",
    "گزارش‌گیری پیشرفته",
    "پشتیبانی ۲۴/۷",
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
            className="inline-flex items-center bg-blue-100 text-primary-500 px-3 sm:px-4 py-2 rounded-full mb-4"
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
            className="text-2xl sm:text-3xl font-bold mb-3 text-gray-900"
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
            className="text-lg text-gray-600 max-w-2xl mx-auto px-4 sm:px-0"
          >
            ابزارهای قدرتمند برای بازاریابی پیامکی موثر
          </motion.p>
        </div>

        {/* Minimal Features List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 max-w-4xl mx-auto"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {highlightFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center p-3 rounded-lg hover:bg-blue-50 transition-colors"
              >
                <div className="w-2 h-2 bg-primary-500 rounded-full ml-3 flex-shrink-0"></div>
                <span className="text-gray-700 font-medium">{feature}</span>
              </motion.div>
            ))}
          </div>

          <div className="text-center pt-4 border-t border-gray-100">
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
          </div>
        </motion.div>

        {/* Quick CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-8"
        >
          <a
            href="#pricing"
            className="btn btn-outline inline-flex items-center px-6 py-3 rounded-lg font-bold hover:bg-blue-50 transition-all duration-300 group text-sm sm:text-base"
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
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
