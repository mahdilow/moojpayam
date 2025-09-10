import React from "react";
import { motion } from "framer-motion";
import {
  MessageSquare,
  Users,
  BarChart3,
  Calendar,
  Zap,
  Clock,
  AudioLinesIcon,
  LocateIcon,
  Target,
  SatelliteDish,
  PlugIcon,
  ListChecks,
  CheckCircle,
  ArrowLeft,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "../components/SEOHead";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  benefits: string[];
  delay: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  benefits,
  delay,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6 }}
      transition={{
        opacity: { duration: 0.4, delay, ease: "easeOut" },
        y: { duration: 0.1, ease: "easeOut" },
      }}
      viewport={{ once: true }}
      className="bg-white rounded-2xl p-6 group transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:bg-gradient-to-br from-blue-50 to-indigo-50 border border-gray-100"
    >
      <motion.div
        whileHover={{ rotate: 360, scale: 1.1 }}
        transition={{
          rotate: { duration: 0.6, ease: "easeInOut" },
          scale: { duration: 0.3, ease: "easeOut" },
        }}
        className="rounded-full bg-blue-100 p-4 inline-flex mb-6 group-hover:bg-blue-200 transition-colors"
      >
        <div className="text-primary-500 w-8 h-8">{icon}</div>
      </motion.div>

      <h3 className="text-xl font-bold mb-3 text-gray-800 group-hover:text-primary-600 transition-colors">
        {title}
      </h3>

      <p className="text-gray-600 leading-relaxed mb-4 group-hover:text-gray-700 transition-colors">
        {description}
      </p>

      <ul className="space-y-2">
        {benefits.map((benefit, index) => (
          <li key={index} className="flex items-start text-sm text-gray-600">
            <CheckCircle
              size={16}
              className="text-green-500 ml-2 mt-0.5 flex-shrink-0"
            />
            <span>{benefit}</span>
          </li>
        ))}
      </ul>

      <div className="h-1 w-12 bg-primary-500 mt-4 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-x-0 group-hover:scale-x-100" />
    </motion.div>
  );
};

const FeaturesPage: React.FC = () => {
  const features = [
    {
      icon: <MessageSquare className="h-8 w-8" />,
      title: "ارسال انبوه پیامک",
      description:
        "ارسال همزمان هزاران پیامک به مخاطبان هدف در کمترین زمان ممکن با بالاترین نرخ تحویل",
      benefits: [
        "ارسال تا ۱۰۰,۰۰۰ پیامک در ساعت",
        "نرخ تحویل بالای ۹۹%",
        "پشتیبانی از تمام اپراتورها",
        "ارسال فوری و بدون تأخیر",
      ],
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "مدیریت مخاطبین",
      description:
        "امکان دسته‌بندی، گروه‌بندی و مدیریت پیشرفته مخاطبان برای ارسال هدفمند پیام‌ها",
      benefits: [
        "ایمپورت از فایل Excel و CSV",
        "دسته‌بندی بر اساس ویژگی‌ها",
        "فیلتر پیشرفته مخاطبان",
        "مدیریت لیست سیاه",
      ],
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: "گزارش‌گیری پیشرفته",
      description:
        "دسترسی به گزارش‌های دقیق از وضعیت ارسال، تحویل و مشاهده پیام‌ها به صورت لحظه‌ای",
      benefits: [
        "گزارش لحظه‌ای وضعیت ارسال",
        "آمار تحویل و عدم تحویل",
        "نمودارهای تحلیلی",
        "خروجی Excel از گزارش‌ها",
      ],
    },
    {
      icon: <Calendar className="h-8 w-8" />,
      title: "ارسال زمانبندی شده",
      description:
        "برنامه‌ریزی ارسال پیام‌ها در زمان‌های مشخص و به صورت دوره‌ای و مناسبتی",
      benefits: [
        "ارسال در زمان‌های مشخص",
        "تکرار دوره‌ای پیام‌ها",
        "تقویم مناسبت‌های ایرانی",
        "بهینه‌سازی زمان ارسال",
      ],
    },
    {
      icon: <LocateIcon className="h-8 w-8" />,
      title: "ارسال منطقه‌ای",
      description:
        "ارسال پیامک به استان، شهر، و محله مورد نظر خودتان از روی نقشه یا کد پستی",
      benefits: [
        "انتخاب منطقه از روی نقشه",
        "فیلتر بر اساس کد پستی",
        "تقسیم‌بندی شهری و استانی",
        "هدف‌گیری دقیق جغرافیایی",
      ],
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "سرعت ارسال بالا",
      description:
        "ارسال فوری پیام‌ها با استفاده از زیرساخت‌های قدرتمند و خطوط پرسرعت",
      benefits: [
        "ارسال فوری در کمتر از ۳۰ ثانیه",
        "خطوط اختصاصی پرسرعت",
        "پردازش موازی درخواست‌ها",
        "بدون محدودیت تعداد ارسال",
      ],
    },
    {
      icon: <AudioLinesIcon className="h-8 w-8" />,
      title: "پیامک صوتی",
      description:
        "قابلیت ارسال پیامک صوتی به صورت تکی و انبوه با امکان تبدیل متن به صوت یا آپلود ویس",
      benefits: [
        "تبدیل متن به گفتار فارسی",
        "آپلود فایل صوتی دلخواه",
        "کیفیت صوتی بالا",
        "ارسال انبوه پیامک صوتی",
      ],
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: "فیلتر پیشرفته",
      description:
        "ارسال براساس فیلتر سن، جنسیت و سایر معیارها برای دسترسی دقیق به مخاطب هدف",
      benefits: [
        "فیلتر بر اساس سن و جنسیت",
        "دسته‌بندی شغلی و صنفی",
        "فیلتر منطقه‌ای پیشرفته",
        "ترکیب چندین فیلتر",
      ],
    },
    {
      icon: <SatelliteDish className="h-8 w-8" />,
      title: "ارسال پیامک زنده (LBS)",
      description:
        "به افرادی که در موقعیت مکانی مورد‌نظر شما حضور دارند یا در‌حال تردد هستند پیامک ارسال کنید",
      benefits: [
        "ردیابی موقعیت لحظه‌ای",
        "ارسال بر اساس حضور فیزیکی",
        "تنظیم شعاع جغرافیایی",
        "اطلاع‌رسانی رویدادهای محلی",
      ],
    },
    {
      icon: <PlugIcon className="h-8 w-8" />,
      title: "خدمات وب‌سرویس",
      description:
        "اتصال آسان پنل به وب‌سایت یا نرم‌افزار شما و قابلیت ارسال از طریق پترن",
      benefits: [
        "API کامل و مستندات جامع",
        "اتصال به وردپرس و ووکامرس",
        "پترن‌های آماده پیامک",
        "پشتیبانی فنی تخصصی",
      ],
    },
    {
      icon: <ListChecks className="h-8 w-8" />,
      title: "ارسال هدفمند",
      description: "دسترسی به‌روز به شماره‌های مشاغل و اصناف مختلف",
      benefits: [
        "بانک شماره مشاغل مختلف",
        "به‌روزرسانی مستمر اطلاعات",
        "تفکیک صنفی دقیق",
        "کیفیت تضمینی شماره‌ها",
      ],
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: "پشتیبانی ۲۴/۷",
      description:
        "پشتیبانی شبانه‌روزی و در تمام روزهای هفته برای رفع مشکلات احتمالی",
      benefits: [
        "پشتیبانی تلفنی و آنلاین",
        "پاسخ‌گویی در کمتر از ۱ ساعت",
        "راهنمایی تخصصی رایگان",
        "آموزش استفاده از پنل",
      ],
    },
  ];

  return (
    <>
      <SEOHead
        title="امکانات کامل پنل پیامک موج پیام | ویژگی‌های پیشرفته SMS"
        description="آشنایی کامل با امکانات و ویژگی‌های پنل پیامک موج پیام: ارسال انبوه، پیامک منطقه‌ای، پیامک صوتی، گزارش‌گیری پیشرفته، وب‌سرویس و پشتیبانی ۲۴ ساعته."
        keywords="امکانات پنل پیامک, ویژگی‌های SMS, ارسال انبوه پیامک, پیامک منطقه‌ای, پیامک صوتی, گزارش‌گیری پیامک, وب‌سرویس پیامک, API پیامک, موج پیام"
        url="https://moojpayam.ir/features"
      />

      <div className="py-20 bg-gradient-to-br from-white to-blue-50 min-h-screen">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="flex items-center text-sm text-gray-500">
              <Link to="/" className="hover:text-primary-500">
                خانه
              </Link>
              <span className="mx-2">/</span>
              <span className="text-gray-900">امکانات</span>
            </div>
          </motion.nav>

          {/* Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center bg-blue-100 text-primary-500 px-4 py-2 rounded-full mb-6"
            >
              <Sparkles className="w-5 h-5 ml-2" />
              <span className="font-semibold">امکانات کامل</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold mb-4 text-gray-900"
            >
              همه{" "}
              <span className="text-primary-500 relative">
                امکانات
                <span className="absolute bottom-0 left-0 w-full h-1 bg-primary-500/30 rounded-full"></span>
              </span>{" "}
              پنل پیامک موج پیام
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            >
              با ابزارهای قدرتمند و پیشرفته موج پیام، کمپین‌های پیامکی موثر و
              هدفمند ایجاد کنید
            </motion.p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                benefits={feature.benefits}
                delay={index * 0.1}
              />
            ))}
          </div>

          {/* Why Choose Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-primary-500 to-purple-600 rounded-3xl p-8 md:p-12 text-white text-center mb-16"
          >
            <div className="max-w-4xl mx-auto">
              <div className="bg-white/20 rounded-full p-4 inline-flex mb-6">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold mb-6">
                چرا موج پیام بهترین انتخاب است؟
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-4xl font-bold mb-2">۹۹.۹%</div>
                  <div className="text-white/90">نرخ تحویل موفق</div>
                </div>
                <div>
                  <div className="text-4xl font-bold mb-2">۲۴/۷</div>
                  <div className="text-white/90">پشتیبانی آنلاین</div>
                </div>
                <div>
                  <div className="text-4xl font-bold mb-2">۱۰۰۰+</div>
                  <div className="text-white/90">مشتری راضی</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="bg-white rounded-3xl shadow-xl p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                آماده شروع هستید؟
              </h3>
              <p className="text-gray-600 mb-6">
                همین امروز پنل پیامک خود را راه‌اندازی کنید و از تمام این
                امکانات بهره‌مند شوید
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  target="_blank"
                  href="http://dash.moojpayam.ir/userregister.aspx"
                  className="btn btn-primary"
                  rel="noreferrer"
                >
                  شروع رایگان
                </a>
                <Link to="/#pricing" className="btn btn-outline">
                  مشاهده تعرفه‌ها
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Back to Home */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center mt-12"
          >
            <Link
              to="/"
              className="inline-flex items-center text-primary-500 hover:text-primary-600 font-medium"
            >
              <ArrowLeft size={20} className="ml-2" />
              بازگشت به صفحه اصلی
            </Link>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default FeaturesPage;
