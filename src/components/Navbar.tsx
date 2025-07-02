import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
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
      className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md py-2" : "bg-transparent py-3 md:py-4"
      }`}
    >
      <div className="container mx-auto px-3 sm:px-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <img
              src={"/assets/logo.png"}
              alt="موج پیام"
              className="h-14 sm:h-16 md:h-20 w-auto logo-pulse"
            />
            <span className="mr-2 text-lg sm:text-xl md:text-2xl brand-name">موج پیام</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-6 space-x-reverse">
            <Link
              to="/"
              className="text-gray-700 hover:text-primary-500 transition-colors px-2 text-sm xl:text-base"
            >
              صفحه اصلی
            </Link>
            <Link
              to="/about-us"
              className="text-gray-700 hover:text-primary-500 transition-colors px-2 text-sm xl:text-base"
            >
              درباره ما
            </Link>
            <a
              href="#features"
              className="text-gray-700 hover:text-primary-500 transition-colors px-2 text-sm xl:text-base"
            >
              امکانات
            </a>
            <a
              href="#pricing"
              className="text-gray-700 hover:text-primary-500 transition-colors px-2 text-sm xl:text-base"
            >
              تعرفه‌ها
            </a>
            <Link
              to="/blog"
              className="text-gray-700 hover:text-primary-500 transition-colors px-2 text-sm xl:text-base"
            >
              بلاگ
            </Link>
            <a
              href="#faq"
              className="text-gray-700 hover:text-primary-500 transition-colors px-2 text-sm xl:text-base"
            >
              سوالات متداول
            </a>
            <a
              href="#contact"
              className="text-gray-700 hover:text-primary-500 transition-colors px-2 text-sm xl:text-base"
            >
              تماس با ما
            </a>
            <a
              target="_blank"
              href="http://dash.moojpayam.ir/"
              className="btn btn-outline mr-4 text-sm px-4 py-2"
            >
              ورود
            </a>
            <a
              target="_blank"
              href="http://dash.moojpayam.ir/userregister.aspx"
              className="btn btn-primary text-sm px-4 py-2"
            >
              ثبت نام
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="منوی موبایل"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden overflow-hidden"
            >
              <div className="pt-4 pb-3 border-t border-gray-200 mt-3">
                <div className="flex flex-col space-y-1">
                  <Link
                    to="/"
                    className="text-gray-700 hover:text-primary-500 hover:bg-gray-50 transition-colors py-3 px-3 rounded-lg text-base font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    صفحه اصلی
                  </Link>
                  <Link
                    to="/about-us"
                    className="text-gray-700 hover:text-primary-500 hover:bg-gray-50 transition-colors py-3 px-3 rounded-lg text-base font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    درباره ما
                  </Link>
                  <a
                    href="#features"
                    className="text-gray-700 hover:text-primary-500 hover:bg-gray-50 transition-colors py-3 px-3 rounded-lg text-base font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    امکانات
                  </a>
                  <a
                    href="#pricing"
                    className="text-gray-700 hover:text-primary-500 hover:bg-gray-50 transition-colors py-3 px-3 rounded-lg text-base font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    تعرفه‌ها
                  </a>
                  <Link
                    to="/blog"
                    className="text-gray-700 hover:text-primary-500 hover:bg-gray-50 transition-colors py-3 px-3 rounded-lg text-base font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    بلاگ
                  </Link>
                  <a
                    href="#faq"
                    className="text-gray-700 hover:text-primary-500 hover:bg-gray-50 transition-colors py-3 px-3 rounded-lg text-base font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    سوالات متداول
                  </a>
                  <a
                    href="#contact"
                    className="text-gray-700 hover:text-primary-500 hover:bg-gray-50 transition-colors py-3 px-3 rounded-lg text-base font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    تماس با ما
                  </a>
                  
                  {/* Mobile Action Buttons */}
                  <div className="flex flex-col space-y-3 pt-4 border-t border-gray-200 mt-3">
                    <a
                      target="_blank"
                      href="http://dash.moojpayam.ir"
                      className="btn btn-outline text-center py-3 text-base font-medium"
                      onClick={() => setIsOpen(false)}
                    >
                      ورود
                    </a>
                    <a
                      target="_blank"
                      href="http://dash.moojpayam.ir/userregister.aspx"
                      className="btn btn-primary text-center py-3 text-base font-medium"
                      onClick={() => setIsOpen(false)}
                    >
                      ثبت نام
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;