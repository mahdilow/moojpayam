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
} from "lucide-react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  delay,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{
        scale: 1.05,
        boxShadow:
          "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      }}
      transition={{
        duration: 0.3,
        delay,
        type: "spring",
        stiffness: 300,
      }}
      viewport={{ once: true }}
      className="bg-white rounded-2xl p-6 hover:bg-gradient-to-br from-blue-50 to-indigo-50 transform transition-all duration-300 group"
    >
      <motion.div
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.5 }}
        className="rounded-full bg-blue-100 p-4 inline-flex mb-6 group-hover:bg-blue-200 transition-colors"
      >
        <div className="text-primary-500 w-8 h-8">{icon}</div>
      </motion.div>

      <h3 className="text-xl font-bold mb-3 text-gray-800 group-hover:text-primary-600 transition-colors">
        {title}
      </h3>

      <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors">
        {description}
      </p>

      <div className="h-1 w-12 bg-primary-500 mt-4 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-x-0 group-hover:scale-x-100" />
    </motion.div>
  );
};

const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: <MessageSquare className="h-8 w-8" />,
      title: "ارسال انبوه پیامک",
      description:
        "ارسال همزمان هزاران پیامک به مخاطبان هدف در کمترین زمان ممکن با بالاترین نرخ تحویل",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "مدیریت مخاطبین",
      description:
        "امکان دسته‌بندی، گروه‌بندی و مدیریت پیشرفته مخاطبان برای ارسال هدفمند پیام‌ها",
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: "گزارش‌گیری پیشرفته",
      description:
        "دسترسی به گزارش‌های دقیق از وضعیت ارسال، تحویل و مشاهده پیام‌ها به صورت لحظه‌ای",
    },
    {
      icon: <Calendar className="h-8 w-8" />,
      title: "ارسال زمانبندی شده",
      description:
        "برنامه‌ریزی ارسال پیام‌ها در زمان‌های مشخص و به صورت دوره‌ای و مناسبتی",
    },
    {
      icon: <LocateIcon className="h-8 w-8" />,
      title: "ارسال منطقه ای",
      description:
        "ارسال پیامک به استان ،شهر، و محله مورد نظر خودتون از روی نقشه یا کد پستی",
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "سرعت ارسال بالا",
      description:
        "ارسال فوری پیام‌ها با استفاده از زیرساخت‌های قدرتمند و خطوط پرسرعت",
    },
    {
      icon: <AudioLinesIcon className="h-8 w-8" />,
      title: "پیامک صوتی",
      description:
        " قابلیت ارسال پیامک صوتی به صورت تکی و انبوه با امکان تبدیل متن به صوت یا اپلود ویس را به شما می دهد",
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: "فیلتر پیشرفته",
      description:
        " ارسال براساس فیلتر سن، جنسیت و ... برای دسترسی دقیق به مخاطب هدف",
    },
    {
      icon: <SatelliteDish className="h-8 w-8" />,
      title: "ارسال پیامک زنده",
      description:
        " به افرادی که در موقعیت مکانی مورد‌نظر شما حضور دارند یا در‌حال تردد هستند پیامک ارسال کنید",
    },
    {
      icon: <PlugIcon className="h-8 w-8" />,
      title: "خدمات وب سرویس",
      description:
        "اتصال آسان پنل به وب‌سایت یا نرم‌افزار شما و قابلیت ارسال از طریق پترن ",
    },
    {
      icon: <ListChecks className="h-8 w-8" />,
      title: "ارسال هدفمند",
      description: " دسترسی به روز به شماره های مشاغل و اصناف مختلف",
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: "پشتیبانی ۲۴/۷",
      description:
        "پشتیبانی شبانه‌روزی و در تمام روزهای هفته برای رفع مشکلات احتمالی",
    },
  ];

  return (
    <section
      id="features"
      className="py-20 bg-gradient-to-br from-white to-blue-50"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-flex items-center bg-blue-100 text-primary-500 px-4 py-2 rounded-full mb-6"
          >
            <MessageSquare className="w-5 h-5 ml-2" />
            <span className="font-semibold">ویژگی‌های منحصر به فرد</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4 text-gray-900"
          >
            چرا پنل پیامک{" "}
            <span className="text-primary-500 relative">
              موج پیام
              <span className="absolute bottom-0 left-0 w-full h-1 bg-primary-500/30 rounded-full"></span>
            </span>
            ؟
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            سامانه پیامک تبلیغاتی ما با امکانات متنوع و پیشرفته، بهترین انتخاب
            برای کسب‌وکار شماست
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={index * 0.1}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <a
            href="#pricing"
            className="inline-flex items-center bg-primary-500 text-white px-8 py-3 rounded-lg font-bold hover:bg-primary-600 transition-colors group"
          >
            <span>مشاهده تعرفه‌ها</span>
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="mr-2"
            >
              →
            </motion.div>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
