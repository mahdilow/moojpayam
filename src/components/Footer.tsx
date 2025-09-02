import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { FaInstagram, FaTelegramPlane } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Company Info */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center mb-4">
              <img
                src={"/assets/logo.png"}
                alt="لوگو پنل پیامک موج پیام"
                className="h-16 sm:h-20 w-auto"
              />
              <span className="mr-2 text-lg sm:text-xl font-bold text-blue-400">
                موج پیام
              </span>
            </div>
            <p className="text-gray-400 mb-4 leading-relaxed text-sm sm:text-base">
              ارائه دهنده خدمات پیامک تبلیغاتی با بالاترین کیفیت و به صرفه ترین
              تعرفه . با اطمینان پیام خود را به مخاطبان برسانید.
            </p>
            <div className="flex space-x-4 space-x-reverse">
              <a
                href="#"
                className="text-gray-400 hover:text-blue-400 transition-colors"
                aria-label="اینستاگرام"
              >
                <FaInstagram size={20} />
              </a>
              <a
                href="https://t.me/moojpayam_support"
                className="text-gray-400 hover:text-blue-400 transition-colors"
                aria-label="تلگرام"
              >
                <FaTelegramPlane size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-base sm:text-lg font-bold mb-4 text-white">
              لینک‌های سریع
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-400 hover:text-blue-400 transition-colors text-sm sm:text-base"
                >
                  صفحه اصلی
                </Link>
              </li>
              <li>
                <Link
                  to="/about-us"
                  className="text-gray-400 hover:text-blue-400 transition-colors text-sm sm:text-base"
                >
                  درباره ما
                </Link>
              </li>
              <li>
                <a
                  href="#features"
                  className="text-gray-400 hover:text-blue-400 transition-colors text-sm sm:text-base"
                >
                  خدمات
                </a>
              </li>
              <li>
                <a
                  href="#pricing"
                  className="text-gray-400 hover:text-blue-400 transition-colors text-sm sm:text-base"
                >
                  تعرفه‌ها
                </a>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="text-gray-400 hover:text-blue-400 transition-colors text-sm sm:text-base"
                >
                  بلاگ
                </Link>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-gray-400 hover:text-blue-400 transition-colors text-sm sm:text-base"
                >
                  تماس با ما
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-base sm:text-lg font-bold mb-4 text-white">
              خدمات
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#features"
                  className="text-gray-400 hover:text-blue-400 transition-colors text-sm sm:text-base"
                >
                  پنل پیامک انبوه
                </a>
              </li>
              <li>
                <a
                  href="#features"
                  className="text-gray-400 hover:text-blue-400 transition-colors text-sm sm:text-base"
                >
                  ارسال هوشمند
                </a>
              </li>
              <li>
                <a
                  href="#features"
                  className="text-gray-400 hover:text-blue-400 transition-colors text-sm sm:text-base"
                >
                  پیامک تبلیغاتی
                </a>
              </li>
              <li>
                <a
                  href="#features"
                  className="text-gray-400 hover:text-blue-400 transition-colors text-sm sm:text-base"
                >
                  پیامک مناسبتی
                </a>
              </li>
              <li>
                <a
                  href="#features"
                  className="text-gray-400 hover:text-blue-400 transition-colors text-sm sm:text-base"
                >
                  پیامک خدماتی
                </a>
              </li>
              <li>
                <a
                  href="#features"
                  className="text-gray-400 hover:text-blue-400 transition-colors text-sm sm:text-base"
                >
                  وب سرویس پیامک
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-base sm:text-lg font-bold mb-4 text-white">
              اطلاعات تماس
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Mail
                  size={16}
                  className="ml-2 mt-1 text-blue-400 flex-shrink-0"
                />
                <a
                  href="mailto:contact@moojpayam.ir"
                  className="text-sm sm:text-base"
                >
                  <span className="text-gray-400 hover:text-blue-400 transition-colors">
                    contact@moojpayam.ir
                  </span>
                </a>
              </li>
              <li className="flex items-start">
                <MapPin
                  size={16}
                  className="ml-2 mt-1 text-blue-400 flex-shrink-0"
                />
                <span className="text-gray-400 text-sm sm:text-base">
                  کرج طالقانی جنوبی
                </span>
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-gray-800 my-6 sm:my-8" />

        <div className="text-center text-gray-500 text-sm">
          <p> تمامی حقوق محفوظ است. موج پیام ۱۴۰۴ ©</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
