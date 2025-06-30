import React from "react";
import { motion } from "framer-motion";
import { Home, Search, ArrowLeft, MessageSquare, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* Animated 404 Number */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
          className="mb-8"
        >
          <div className="text-8xl md:text-9xl font-bold text-transparent bg-gradient-to-r from-primary-500 to-purple-600 bg-clip-text mb-4">
            404
          </div>
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="inline-block"
          >
            <div className="w-24 h-24 mx-auto bg-gradient-to-r from-primary-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
              <Search className="text-white" size={40} />
            </div>
          </motion.div>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            صفحه مورد نظر یافت نشد!
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            متأسفانه صفحه‌ای که به دنبال آن هستید وجود ندارد یا ممکن است منتقل
            شده باشد. اما نگران نباشید، می‌توانید از طریق لینک‌های زیر به
            بخش‌های مختلف سایت دسترسی پیدا کنید.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
        >
          <Link
            to="/"
            className="btn btn-primary text-lg px-8 py-4 flex items-center justify-center group"
          >
            <Home
              className="ml-2 group-hover:scale-110 transition-transform"
              size={20}
            />
            بازگشت به صفحه اصلی
          </Link>
          <Link
            to="/blog"
            className="btn btn-outline text-lg px-8 py-4 flex items-center justify-center group"
          >
            <Search
              className="ml-2 group-hover:scale-110 transition-transform"
              size={20}
            />
            مشاهده مقالات
          </Link>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-white rounded-3xl shadow-xl p-8 max-w-3xl mx-auto"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            یا از لینک‌های زیر استفاده کنید:
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Popular Links */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-800 flex items-center">
                <ArrowLeft className="ml-2 text-primary-500" size={20} />
                صفحات محبوب
              </h3>
              <div className="space-y-3">
                <Link
                  to="/#features"
                  className="block p-3 rounded-lg hover:bg-blue-50 transition-colors text-right"
                >
                  <div className="font-medium text-gray-900">
                    امکانات پنل پیامک
                  </div>
                  <div className="text-sm text-gray-600">
                    آشنایی با ویژگی‌های منحصر به فرد
                  </div>
                </Link>
                <Link
                  to="/#pricing"
                  className="block p-3 rounded-lg hover:bg-blue-50 transition-colors text-right"
                >
                  <div className="font-medium text-gray-900">
                    تعرفه‌ها و قیمت‌ها
                  </div>
                  <div className="text-sm text-gray-600">
                    مشاهده پلن‌های مختلف سرویس
                  </div>
                </Link>
                <Link
                  to="/blog"
                  className="block p-3 rounded-lg hover:bg-blue-50 transition-colors text-right"
                >
                  <div className="font-medium text-gray-900">بلاگ و مقالات</div>
                  <div className="text-sm text-gray-600">
                    نکات و راهنماهای کاربردی
                  </div>
                </Link>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-800 flex items-center">
                <MessageSquare className="ml-2 text-primary-500" size={20} />
                نیاز به کمک دارید؟
              </h3>
              <div className="space-y-3">
                <a
                  href="#contact"
                  className="block p-3 rounded-lg hover:bg-blue-50 transition-colors text-right"
                >
                  <div className="font-medium text-gray-900">
                    تماس با پشتیبانی
                  </div>
                  <div className="text-sm text-gray-600">
                    ۲۴ ساعته در خدمت شما هستیم
                  </div>
                </a>
                <a
                  href="tel:+989100711835"
                  className="block p-3 rounded-lg hover:bg-blue-50 transition-colors text-right"
                >
                  <div className="font-medium text-gray-900">تماس تلفنی</div>
                  <div className="text-sm text-gray-600">۰۹۱۰۰۷۱۱۸۳۵</div>
                </a>
                <a
                  href="mailto:contact@moojpayam.ir"
                  className="block p-3 rounded-lg hover:bg-blue-50 transition-colors text-right"
                >
                  <div className="font-medium text-gray-900">ایمیل</div>
                  <div className="text-sm text-gray-600">
                    contact@moojpayam.ir
                  </div>
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Decorative Elements */}
        <motion.div
          animate={{
            y: [0, -10, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute top-20 left-10 opacity-20"
        >
          <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-purple-600 rounded-full"></div>
        </motion.div>

        <motion.div
          animate={{
            y: [0, 15, 0],
            rotate: [0, -5, 5, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 1,
          }}
          className="absolute bottom-20 right-10 opacity-20"
        >
          <div className="w-12 h-12 bg-gradient-to-r from-accent-400 to-secondary-500 rounded-full"></div>
        </motion.div>

        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 0.5,
          }}
          className="absolute top-1/2 right-20 opacity-30"
        >
          <MapPin className="text-primary-500" size={24} />
        </motion.div>
      </div>
    </div>
  );
};

export default NotFoundPage;
