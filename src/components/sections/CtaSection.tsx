import React from "react";
import { motion } from "framer-motion";
import { MessageSquare, ChevronLeft } from "lucide-react";

const CtaSection: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-primary-500 to-purple-600 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-white/10 p-2 rounded-full inline-flex items-center mb-6"
          >
            <MessageSquare className="text-white ml-2" size={18} />
            <span className="text-sm text-white font-medium">
              همین حالا شروع کنید
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-6"
          >
            آماده‌اید تا کسب و کار خود را با پیامک‌های هوشمند متحول کنید؟
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg md:text-xl opacity-90 mb-10 leading-relaxed"
          >
            همین امروز به جمع هزاران کسب و کار موفق بپیوندید و از مزایای پنل
            پیامک موج پیام بهره‌مند شوید. شروع سریع، آسان و بدون نیاز به دانش
            فنی.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6 sm:space-x-reverse"
          >
            <a
              target="_blank"
              href="http://dash.moojpayam.ir/userregister.aspx"
              className="btn bg-white text-primary-600 hover:bg-gray-100 transition-colors text-lg px-8 py-3"
            >
              ثبت نام
            </a>
            <a
              href="#pricing"
              className="btn bg-transparent border-2 border-white text-white hover:bg-white/10 transition-colors text-lg px-8 py-3 flex items-center justify-center"
            >
              <span>مشاهده تعرفه‌ها</span>
              <ChevronLeft size={20} className="mr-2" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
