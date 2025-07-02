import React from "react";
import { motion } from "framer-motion";
import {
  Users,
  Target,
  Award,
  Heart,
  MessageSquare,
  Zap,
  Shield,
  Clock,
  CheckCircle,
  Star,
  TrendingUp,
  Globe,
} from "lucide-react";
import SEOHead from "../components/SEOHead";

const AboutUsPage: React.FC = () => {
  const stats = [
    { icon: Users, label: "مشتریان راضی", value: "۱۰۰۰+", color: "text-blue-600" },
    { icon: MessageSquare, label: "پیامک ارسالی", value: "۵۰۰M+", color: "text-green-600" },
    { icon: Award, label: "سال تجربه", value: "۳+", color: "text-purple-600" },
    { icon: TrendingUp, label: "نرخ تحویل", value: "۹۹.۹%", color: "text-orange-600" },
  ];

  const values = [
    {
      icon: Shield,
      title: "قابلیت اطمینان",
      description: "با زیرساخت قدرتمند و امن، اطمینان کامل در ارسال پیام‌هایتان داشته باشید",
    },
    {
      icon: Zap,
      title: "سرعت و کارایی",
      description: "ارسال فوری پیام‌ها با بالاترین سرعت و کمترین تأخیر ممکن",
    },
    {
      icon: Heart,
      title: "مشتری‌مداری",
      description: "رضایت شما اولویت اصلی ما است و همواره در خدمت شما هستیم",
    },
    {
      icon: Target,
      title: "دقت و هدفمندی",
      description: "ارسال پیام‌های هدفمند و دقیق برای بهترین نتایج بازاریابی",
    },
  ];

  const team = [
    {
      name: "تیم فنی",
      role: "توسعه و پشتیبانی",
      description: "متخصصان با تجربه در حوزه ارتباطات و فناوری اطلاعات",
      icon: Users,
    },
    {
      name: "تیم پشتیبانی",
      role: "خدمات مشتریان",
      description: "آماده پاسخگویی و راهنمایی شما در تمام ساعات شبانه‌روز",
      icon: MessageSquare,
    },
    {
      name: "تیم بازاریابی",
      role: "استراتژی و مشاوره",
      description: "کمک به بهینه‌سازی کمپین‌های پیامکی و افزایش نرخ تبدیل",
      icon: Target,
    },
  ];

  const milestones = [
    {
      year: "۱۴۰۱",
      title: "آغاز فعالیت",
      description: "شروع ارائه خدمات پیامک با تمرکز بر کیفیت و قابلیت اطمینان",
    },
    {
      year: "۱۴۰۲",
      title: "توسعه خدمات",
      description: "اضافه شدن قابلیت‌های پیشرفته مانند پیامک منطقه‌ای و زمانبندی",
    },
    {
      year: "۱۴۰۳",
      title: "رشد و گسترش",
      description: "جذب بیش از ۱۰۰۰ مشتری و ارسال میلیون‌ها پیامک موفق",
    },
    {
      year: "۱۴۰۴",
      title: "نوآوری مستمر",
      description: "معرفی تکنولوژی‌های جدید و بهبود مستمر خدمات",
    },
  ];

  return (
    <>
      <SEOHead
        title="درباره ما | موج پیام - سامانه پیشرفته ارسال پیامک"
        description="آشنایی با تیم موج پیام، ماموریت، ارزش‌ها و تاریخچه ما در ارائه بهترین خدمات پیامک تبلیغاتی و اطلاع‌رسانی در ایران."
        keywords="درباره موج پیام, تیم موج پیام, تاریخچه موج پیام, ماموریت موج پیام, ارزش‌های موج پیام, شرکت پیامک"
        url="https://moojpayam.ir/about-us"
      />

      <div className="py-20 bg-gradient-to-br from-white to-blue-50 min-h-screen">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center bg-blue-100 text-primary-500 px-4 py-2 rounded-full mb-6"
            >
              <Users className="w-5 h-5 ml-2" />
              <span className="font-semibold">درباره موج پیام</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold mb-4 text-gray-900"
            >
              ما{" "}
              <span className="text-primary-500 relative">
                موج پیام
                <span className="absolute bottom-0 left-0 w-full h-1 bg-primary-500/30 rounded-full"></span>
              </span>{" "}
              هستیم
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            >
              با هدف ارائه بهترین خدمات پیامک تبلیغاتی و اطلاع‌رسانی، ما در موج پیام
              تلاش می‌کنیم تا کسب‌وکارها را در رسیدن به مشتریان‌شان یاری کنیم
            </motion.p>
          </div>

          {/* Mission & Vision */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl shadow-lg p-8"
            >
              <div className="flex items-center mb-6">
                <div className="bg-blue-100 rounded-full p-3 ml-4">
                  <Target className="w-8 h-8 text-primary-500" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">ماموریت ما</h2>
              </div>
              <p className="text-gray-600 leading-relaxed text-lg">
                ماموریت ما ارائه راه‌حل‌های نوآورانه و قابل اطمینان در حوزه ارتباطات
                پیامکی است. ما معتقدیم که هر کسب‌وکاری، صرف‌نظر از اندازه‌اش، باید
                بتواند به راحتی و با کمترین هزینه با مشتریان خود ارتباط برقرار کند.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl shadow-lg p-8"
            >
              <div className="flex items-center mb-6">
                <div className="bg-purple-100 rounded-full p-3 ml-4">
                  <Star className="w-8 h-8 text-purple-500" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">چشم‌انداز ما</h2>
              </div>
              <p className="text-gray-600 leading-relaxed text-lg">
                چشم‌انداز ما تبدیل شدن به پیشرو و معتبرترین ارائه‌دهنده خدمات
                پیامک در ایران است. ما می‌خواهیم با استفاده از فناوری‌های روز دنیا،
                تجربه‌ای بی‌نظیر از ارتباطات دیجیتال را برای مشتریان‌مان فراهم کنیم.
              </p>
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
          >
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300"
              >
                <div className={`inline-flex p-3 rounded-full bg-gray-100 mb-4`}>
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* Values */}
          <div className="mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                ارزش‌های ما
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                اصول و ارزش‌هایی که ما را در مسیر خدمت‌رسانی هدایت می‌کنند
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex items-start">
                    <div className="bg-blue-100 rounded-full p-3 ml-4 flex-shrink-0">
                      <value.icon className="w-6 h-6 text-primary-500" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {value.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div className="mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                مسیر رشد ما
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                نگاهی به مهم‌ترین نقاط عطف در مسیر توسعه موج پیام
              </p>
            </motion.div>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute right-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 to-purple-500 hidden md:block"></div>

              <div className="space-y-8">
                {milestones.map((milestone, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="relative"
                  >
                    {/* Timeline dot */}
                    <div className="absolute right-2 w-4 h-4 bg-primary-500 rounded-full border-4 border-white shadow-lg hidden md:block"></div>

                    <div className="md:mr-12 bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                      <div className="flex items-center mb-3">
                        <span className="bg-primary-100 text-primary-600 px-3 py-1 rounded-full text-sm font-bold ml-4">
                          {milestone.year}
                        </span>
                        <h3 className="text-xl font-bold text-gray-900">
                          {milestone.title}
                        </h3>
                      </div>
                      <p className="text-gray-600 leading-relaxed">
                        {milestone.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Team */}
          <div className="mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">تیم ما</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                متخصصان با تجربه‌ای که همواره در خدمت شما هستند
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="bg-gradient-to-r from-primary-500 to-purple-500 rounded-full p-4 inline-flex mb-4">
                    <member.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {member.name}
                  </h3>
                  <p className="text-primary-500 font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    {member.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Why Choose Us */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-primary-500 to-purple-600 rounded-3xl p-8 md:p-12 text-white text-center"
          >
            <div className="max-w-3xl mx-auto">
              <div className="bg-white/20 rounded-full p-4 inline-flex mb-6">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold mb-6">چرا موج پیام؟</h2>
              <p className="text-xl mb-8 leading-relaxed opacity-90">
                با سال‌ها تجربه در حوزه ارتباطات، تیم متخصص، زیرساخت قدرتمند و
                تعهد به کیفیت، ما بهترین انتخاب برای نیازهای پیامکی شما هستیم.
                اعتماد هزاران مشتری راضی، گواه کیفیت خدمات ماست.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/#contact"
                  className="bg-white text-primary-600 px-8 py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors"
                >
                  تماس با ما
                </a>
                <a
                  href="/#pricing"
                  className="bg-white/20 text-white px-8 py-3 rounded-xl font-bold hover:bg-white/30 transition-colors"
                >
                  مشاهده تعرفه‌ها
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default AboutUsPage;