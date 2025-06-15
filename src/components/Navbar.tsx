import React, { useState, useEffect } from "react";
import logo from "../../assets/logo.png";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="موج پیام" className="h-20 w-auto logo-pulse" />
            <span className="mr-2 text-2xl brand-name">موج پیام</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6 space-x-reverse">
            <Link
              to="/"
              className="text-gray-700 hover:text-primary-500 transition-colors px-2"
            >
              صفحه اصلی
            </Link>
            <a
              href="#features"
              className="text-gray-700 hover:text-primary-500 transition-colors px-2"
            >
              امکانات
            </a>
            <a
              href="#pricing"
              className="text-gray-700 hover:text-primary-500 transition-colors px-2"
            >
              تعرفه‌ها
            </a>
            <Link
              to="/blog"
              className="text-gray-700 hover:text-primary-500 transition-colors px-2"
            >
              بلاگ
            </Link>
            <a
              href="#faq"
              className="text-gray-700 hover:text-primary-500 transition-colors px-2"
            >
              سوالات متداول
            </a>
            <a
              href="#contact"
              className="text-gray-700 hover:text-primary-500 transition-colors px-2"
            >
              تماس با ما
            </a>
            <a
              href="http://dash.moojpayam.ir/"
              className="btn btn-outline mr-4"
            >
              ورود
            </a>
            <a
              href="http://dash.moojpayam.ir/userregister.aspx"
              className="btn btn-primary"
            >
              ثبت نام
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden pt-4 pb-2"
          >
            <div className="flex flex-col space-y-3">
              <Link
                to="/"
                className="text-gray-700 hover:text-primary-500 transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                صفحه اصلی
              </Link>
              <a
                href="#features"
                className="text-gray-700 hover:text-primary-500 transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                امکانات
              </a>
              <a
                href="#pricing"
                className="text-gray-700 hover:text-primary-500 transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                تعرفه‌ها
              </a>
              <Link
                to="/blog"
                className="text-gray-700 hover:text-primary-500 transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                بلاگ
              </Link>
              <a
                href="#faq"
                className="text-gray-700 hover:text-primary-500 transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                سوالات متداول
              </a>
              <a
                href="#contact"
                className="text-gray-700 hover:text-primary-500 transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                تماس با ما
              </a>
              <div className="flex space-x-4 space-x-reverse pt-2">
                <a
                  href="http://dash.moojpayam.ir"
                  className="btn btn-outline flex-1 text-center"
                >
                  ورود
                </a>
                <a
                  href="http://dash.moojpayam.ir/userregister.aspx"
                  className="btn btn-primary flex-1 text-center"
                >
                  ثبت نام
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
