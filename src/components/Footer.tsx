import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { FaInstagram, FaTelegramPlane } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <img
                src={"/assets/logo.png"}
                alt="موج پیام"
                className="h-20 w-auto"
              />
              <span className="mr-2 text-xl font-bold text-blue-400">
                موج پیام
              </span>
            </div>
            <p className="text-gray-400 mb-4 leading-relaxed">
              ارائه دهنده خدمات پیامک تبلیغاتی با بالاترین کیفیت و به صرفه ترین
              تعرفه . با اطمینان پیام خود را به مخاطبان برسانید.
            </p>
            <div className="flex space-x-4 space-x-reverse">
              <a
                href="#"
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                <FaInstagram size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                <FaTelegramPlane size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">لینک‌های سریع</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  صفحه اصلی
                </Link>
              </li>
              <li>
                <Link
                  to="/about-us"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  درباره ما
                </Link>
              </li>
              <li>
                <a
                  href="#features"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  خدمات
                </a>
              </li>
              <li>
                <a
                  href="#pricing"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  تعرفه‌ها
                </a>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  بلاگ
                </Link>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  تماس با ما
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">خدمات</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#features"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  پنل پیامک انبوه
                </a>
              </li>
              <li>
                <a
                  href="#features"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  ارسال هوشمند
                </a>
              </li>
              <li>
                <a
                  href="#features"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  پیامک تبلیغاتی
                </a>
              </li>
              <li>
                <a
                  href="#features"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  پیامک مناسبتی
                </a>
              </li>
              <li>
                <a
                  href="#features"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  پیامک خدماتی
                </a>
              </li>
              <li>
                <a
                  href="#features"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  وب سرویس پیامک
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">اطلاعات تماس</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Phone size={18} className="ml-2 mt-1 text-blue-400" />
                <a href="tel:+989100711835">
                  <span className="text-gray-400">۰۹۱۰۰۷۱۱۸۳۵</span>
                </a>
              </li>
              <li className="flex items-start">
                <Mail size={18} className="ml-2 mt-1 text-blue-400" />
                <a href="mailto:contact@moojpayam.ir">
                  <span className="text-gray-400">contact@moojpayam.ir</span>
                </a>
              </li>
              <li className="flex items-start">
                <MapPin size={18} className="ml-2 mt-1 text-blue-400" />
                <span className="text-gray-400">کرج طالقانی جنوبی</span>
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-gray-800 my-8" />

        <div className="text-center text-gray-500 text-sm">
          <p> تمامی حقوق محفوظ است. موج پیام ۱۴۰۴ ©</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;