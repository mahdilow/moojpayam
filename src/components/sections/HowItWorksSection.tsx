import React from "react";
import { motion } from "framer-motion";
import { Target, Send, BarChart as ChartBar } from "lucide-react";

const HowItWorksSection: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-flex items-center bg-blue-100 text-primary-500 px-4 py-2 rounded-full mb-6"
          >
            <span className="font-semibold">قدرت بازاریابی پیامکی</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4 text-gray-900"
          >
            دسترسی به{" "}
            <span className="text-primary-500 relative">
              مشتریان هدف
              <span className="absolute bottom-0 left-0 w-full h-1 bg-primary-500/30 rounded-full"></span>
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            با استفاده از سرویس پیامک منطقه‌ای، پیام خود را به هزاران مشتری
            بالقوه در منطقه مورد نظر برسانید
          </motion.p>
        </div>

        <div className="relative rounded-3xl overflow-hidden mb-20">
          <img
            src="/assets/birds-carrying-letters-over-sea.png"
            alt="نقشه شهری"
            className="w-full h-[500px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-500/90 to-transparent flex items-center">
            <div className="max-w-2xl p-12">
              <motion.h3
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-3xl font-bold text-white mb-6"
              >
                افزایش ۳۰۰٪ بازدید با پیامک منطقه‌ای
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-white/90 text-lg mb-8 leading-relaxed"
              >
                با ارسال پیامک به مشتریان در محدوده جغرافیایی کسب و کار خود،
                میزان بازدید و فروش خود را به طور چشمگیری افزایش دهید. آمارها
                نشان می‌دهد که پیامک‌های منطقه‌ای تا ۳۰۰٪ نرخ تبدیل بالاتری نسبت
                به تبلیغات معمولی دارند.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="flex gap-4"
              >
                <div className="bg-white/10 backdrop-blur rounded-lg p-4 flex-1">
                  <div className="text-2xl font-bold text-white mb-1">۸۵٪</div>
                  <div className="text-white/80">نرخ مشاهده پیام</div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-4 flex-1">
                  <div className="text-2xl font-bold text-white mb-1">
                    ۱۲ دقیقه
                  </div>
                  <div className="text-white/80">میانگین زمان پاسخ</div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-lg p-4 flex-1">
                  <div className="text-2xl font-bold text-white mb-1">۳۰۰٪</div>
                  <div className="text-white/80">افزایش نرخ تبدیل</div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="bg-blue-100 rounded-full p-4 inline-flex mb-4">
              <Target className="w-8 h-8 text-primary-500" />
            </div>
            <h3 className="text-xl font-bold mb-2">انتخاب منطقه هدف</h3>
            <p className="text-gray-600">
              منطقه مورد نظر خود را روی نقشه انتخاب کنید
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="bg-blue-100 rounded-full p-4 inline-flex mb-4">
              <Send className="w-8 h-8 text-primary-500" />
            </div>
            <h3 className="text-xl font-bold mb-2">ارسال پیام</h3>
            <p className="text-gray-600">
              پیام خود را تنظیم کرده و به مخاطبان منطقه ارسال کنید
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="bg-blue-100 rounded-full p-4 inline-flex mb-4">
              <ChartBar className="w-8 h-8 text-primary-500" />
            </div>
            <h3 className="text-xl font-bold mb-2">مشاهده نتایج</h3>
            <p className="text-gray-600">
              گزارش‌های دقیق از وضعیت تحویل و اثربخشی پیام‌ها را دریافت کنید
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
