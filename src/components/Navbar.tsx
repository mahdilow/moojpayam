import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate, useLocation } from "react-router-dom";

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
  closeMenu: () => void;
}

const NavLink: React.FC<NavLinkProps> = ({
  to,
  children,
  className,
  closeMenu,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isHashLink = to.includes("#");

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    closeMenu();

    if (isHashLink) {
      const hash = to.split("#")[1];
      if (isHomePage) {
        // Already on the home page, just scroll
        const el = document.getElementById(hash);
        if (el) {
          setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 100);
        }
      } else {
        // Navigate to home page and then scroll
        navigate(`/#${hash}`);
      }
    } else {
      navigate(to);
    }
  };

  return (
    <a href={to} className={className} onClick={handleClick}>
      {children}
    </a>
  );
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
    "text-gray-700 hover:text-primary-500 hover:bg-gray-50 transition-colors py-3 px-3 rounded-lg text-lg font-medium";

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
              src={"/assets/logo.webp"}
              alt="لوگو پنل پیامک موج پیام"
              className="h-14 sm:h-16 md:h-20 w-auto logo-pulse"
            />
            <span className="mr-2 text-lg sm:text-xl md:text-2xl brand-name">
              موج پیام
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-6 space-x-reverse">
            <NavLink to="/" className={linkClass} closeMenu={closeMenu}>
              صفحه اصلی
            </NavLink>
            <NavLink to="/features" className={linkClass} closeMenu={closeMenu}>
              امکانات
            </NavLink>
            <NavLink to="/#pricing" className={linkClass} closeMenu={closeMenu}>
              تعرفه‌ها
            </NavLink>
            <NavLink to="/blog" className={linkClass} closeMenu={closeMenu}>
              بلاگ
            </NavLink>
            <NavLink to="/faq" className={linkClass} closeMenu={closeMenu}>
              سوالات متداول
            </NavLink>
            <NavLink
              to="/web-services"
              className={linkClass}
              closeMenu={closeMenu}
            >
              برنامه نویسان
            </NavLink>
            <NavLink
              to="/contact-us"
              className={linkClass}
              closeMenu={closeMenu}
            >
              تماس با ما
            </NavLink>
            <NavLink to="/about-us" className={linkClass} closeMenu={closeMenu}>
              درباره ما
            </NavLink>
            <a
              target="_blank"
              href="http://dash.moojpayam.ir/"
              className="btn btn-outline text-lg flex items-center justify-center"
              rel="noreferrer"
            >
              ورود
            </a>
            <a
              target="_blank"
              href="http://dash.moojpayam.ir/userregister.aspx"
              className="btn btn-primary text-lg flex items-center justify-center ml-4"
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
                  <NavLink to="/" className={linkClass} closeMenu={closeMenu}>
                    صفحه اصلی
                  </NavLink>
                  <NavLink
                    to="/features"
                    className={linkClass}
                    closeMenu={closeMenu}
                  >
                    امکانات
                  </NavLink>
                  <NavLink
                    to="/#pricing"
                    className={linkClass}
                    closeMenu={closeMenu}
                  >
                    تعرفه‌ها
                  </NavLink>
                  <NavLink
                    to="/blog"
                    className={linkClass}
                    closeMenu={closeMenu}
                  >
                    بلاگ
                  </NavLink>
                  <NavLink
                    to="/faq"
                    className={linkClass}
                    closeMenu={closeMenu}
                  >
                    سوالات متداول
                  </NavLink>
                  <NavLink
                    to="/web-services"
                    className={linkClass}
                    closeMenu={closeMenu}
                  >
                    برنامه نویسان
                  </NavLink>
                  <NavLink
                    to="/contact-us"
                    className={linkClass}
                    closeMenu={closeMenu}
                  >
                    تماس با ما
                  </NavLink>
                  <NavLink
                    to="/about-us"
                    className={linkClass}
                    closeMenu={closeMenu}
                  >
                    درباره ما
                  </NavLink>

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
