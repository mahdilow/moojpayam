import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

interface ScrollLinkProps {
  to: string; // id or route path
  children: React.ReactNode;
  className?: string;
  closeMenu: () => void;
  isHashLink?: boolean; // true if scrolling to an ID on the page
}

const ScrollLink: React.FC<ScrollLinkProps> = ({
  to,
  children,
  className,
  closeMenu,
  isHashLink = false,
}) => {
  const handleClick = (e: React.MouseEvent) => {
    if (isHashLink) {
      e.preventDefault();
      closeMenu();
      const el = document.getElementById(to);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 100);
      }
    } else {
      closeMenu();
    }
  };

  // If it's a hash link, use <a>, otherwise react-router <Link>
  if (isHashLink) {
    return (
      <a href={`#${to}`} className={className} onClick={handleClick}>
        {children}
      </a>
    );
  } else {
    return (
      <Link to={to} className={className} onClick={handleClick}>
        {children}
      </Link>
    );
  }
};

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => setIsOpen(false);

  const linkClass =
    "text-gray-700 hover:text-primary-500 hover:bg-gray-50 transition-colors py-3 px-3 rounded-lg text-base font-medium";

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
            <span className="mr-2 text-lg sm:text-xl md:text-2xl brand-name">
              موج پیام
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-6 space-x-reverse">
            <ScrollLink to="/" className={linkClass} closeMenu={closeMenu}>
              صفحه اصلی
            </ScrollLink>
            <ScrollLink
              to="features"
              className={linkClass}
              closeMenu={closeMenu}
              isHashLink
            >
              امکانات
            </ScrollLink>
            <ScrollLink
              to="pricing"
              className={linkClass}
              closeMenu={closeMenu}
              isHashLink
            >
              تعرفه‌ها
            </ScrollLink>
            <ScrollLink to="/blog" className={linkClass} closeMenu={closeMenu}>
              بلاگ
            </ScrollLink>
            <ScrollLink
              to="faq"
              className={linkClass}
              closeMenu={closeMenu}
              isHashLink
            >
              سوالات متداول
            </ScrollLink>
            <ScrollLink
              to="contact"
              className={linkClass}
              closeMenu={closeMenu}
              isHashLink
            >
              تماس با ما
            </ScrollLink>
            <a
              target="_blank"
              href="http://dash.moojpayam.ir/"
              className="btn btn-outline text-md flex items-center justify-center"
              rel="noreferrer"
            >
              ورود
            </a>
            <a
              target="_blank"
              href="http://dash.moojpayam.ir/userregister.aspx"
              className="btn btn-primary text-md flex items-center justify-center ml-4"
              rel="noreferrer"
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
                  <ScrollLink
                    to="/"
                    className={linkClass}
                    closeMenu={closeMenu}
                  >
                    صفحه اصلی
                  </ScrollLink>
                  <ScrollLink
                    to="features"
                    className={linkClass}
                    closeMenu={closeMenu}
                    isHashLink
                  >
                    امکانات
                  </ScrollLink>
                  <ScrollLink
                    to="pricing"
                    className={linkClass}
                    closeMenu={closeMenu}
                    isHashLink
                  >
                    تعرفه‌ها
                  </ScrollLink>
                  <ScrollLink
                    to="/blog"
                    className={linkClass}
                    closeMenu={closeMenu}
                  >
                    بلاگ
                  </ScrollLink>
                  <ScrollLink
                    to="faq"
                    className={linkClass}
                    closeMenu={closeMenu}
                    isHashLink
                  >
                    سوالات متداول
                  </ScrollLink>
                  <ScrollLink
                    to="contact"
                    className={linkClass}
                    closeMenu={closeMenu}
                    isHashLink
                  >
                    تماس با ما
                  </ScrollLink>

                  {/* Mobile Action Buttons */}
                  <div className="flex flex-col space-y-3 pt-4 border-t border-gray-200 mt-3">
                    <a
                      target="_blank"
                      href="http://dash.moojpayam.ir"
                      className="btn btn-outline text-center py-3 text-base font-medium"
                      onClick={closeMenu}
                      rel="noreferrer"
                    >
                      ورود
                    </a>
                    <a
                      target="_blank"
                      href="http://dash.moojpayam.ir/userregister.aspx"
                      className="btn btn-primary text-center py-3 text-base font-medium"
                      onClick={closeMenu}
                      rel="noreferrer"
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
