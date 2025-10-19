import React from "react";
import { Mail, MapPin } from "lucide-react";
import { FaInstagram, FaTelegramPlane } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
}

const NavLink: React.FC<NavLinkProps> = ({ to, children, className }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isHashLink = to.includes("#");

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();

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
        navigate(to);
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

const Footer: React.FC = () => {
  const linkClass =
    "text-gray-400 hover:text-blue-400 transition-colors text-sm sm:text-base";

  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Company Info */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center mb-4">
              <img
                src={"/assets/logo.webp"}
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
                <NavLink to="/" className={linkClass}>
                  صفحه اصلی
                </NavLink>
              </li>
              <li>
                <NavLink to="/about-us" className={linkClass}>
                  درباره ما
                </NavLink>
              </li>
              <li>
                <NavLink to="/features" className={linkClass}>
                  خدمات
                </NavLink>
              </li>
              <li>
                <NavLink to="/faq" className={linkClass}>
                  سوالات متداول
                </NavLink>
              </li>
              <li>
                <NavLink to="/#pricing" className={linkClass}>
                  تعرفه‌ها
                </NavLink>
              </li>
              <li>
                <NavLink to="/blog" className={linkClass}>
                  بلاگ
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact-us" className={linkClass}>
                  تماس با ما
                </NavLink>
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
                <NavLink to="/features" className={linkClass}>
                  پنل پیامک انبوه
                </NavLink>
              </li>
              <li>
                <NavLink to="/features" className={linkClass}>
                  ارسال هوشمند
                </NavLink>
              </li>
              <li>
                <NavLink to="/features" className={linkClass}>
                  پیامک تبلیغاتی
                </NavLink>
              </li>
              <li>
                <NavLink to="/features" className={linkClass}>
                  پیامک مناسبتی
                </NavLink>
              </li>
              <li>
                <NavLink to="/features" className={linkClass}>
                  پیامک خدماتی
                </NavLink>
              </li>
              <li>
                <NavLink to="/features" className={linkClass}>
                  وب سرویس پیامک
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col">
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
            {/* enamad badge */}
            <div className="mt-auto bg-gray-800 p-2 rounded-lg inline-block self-start">
              <a
                referrerPolicy="origin"
                target="_blank"
                href="https://trustseal.enamad.ir/?id=659683&Code=xd5KnVVBv4zwJ9thb0q5RPZqsGE7H3zr"
              >
                <img
                  referrerPolicy="origin"
                  src="https://trustseal.enamad.ir/logo.aspx?id=659683&Code=xd5KnVVBv4zwJ9thb0q5RPZqsGE7H3zr"
                  alt="enamad trust badge"
                  style={{ cursor: "pointer" }}
                  id="xd5KnVVBv4zwJ9thb0q5RPZqsGE7H3zr"
                />
              </a>
            </div>
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
