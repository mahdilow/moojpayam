import { useState } from "react";
import { motion } from "framer-motion";
import {
  Code2,
  Zap,
  Shield,
  Clock,
  Globe,
  Send,
  CheckCircle,
  ArrowRight,
  Copy,
  Check,
  FileText,
  BookOpen,
  Download,
  Github,
  MessageSquare,
  BarChart3,
  Webhook,
  Calendar,
  Users,
  Phone,
} from "lucide-react";
import SEOHead from "../components/SEOHead";

const WebServicesPage = () => {
  const [activeLanguage, setActiveLanguage] = useState("php");
  const [copiedCode, setCopiedCode] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const programmingLanguages = [
    { id: "php", name: "PHP", icon: "🐘" },
    { id: "python", name: "Python", icon: "🐍" },
    { id: "nodejs", name: "Node.js", icon: "🟢" },
    { id: "csharp", name: "C#", icon: "💜" },
    { id: "java", name: "Java", icon: "☕" },
  ];

  const codeExamples = {
    php: `<?php
$client = new Client('YOUR_API_KEY');

// ارسال پیامک ساده
$response = $client->send([
    'to' => '09121234567',
    'message' => 'سلام از موج پیام!'
]);

// ارسال پیامک گروهی
$response = $client->sendBulk([
    'to' => ['09121234567', '09129876543'],
    'message' => 'پیام گروهی'
]);

echo $response->status;`,
    python: `client = SMSClient('YOUR_API_KEY')

# ارسال پیامک ساده
response = client.send(
    to='09121234567',
    message='سلام از موج پیام!'
)

# ارسال پیامک گروهی
response = client.send_bulk(
    to=['09121234567', '09129876543'],
    message='پیام گروهی'
)

print(response.status)`,
    nodejs: `const client = new SMSClient('YOUR_API_KEY');

// ارسال پیامک ساده
const response = await client.send({
  to: '09121234567',
  message: 'سلام از موج پیام!'
});

// ارسال پیامک گروهی
const bulkResponse = await client.sendBulk({
  to: ['09121234567', '09129876543'],
  message: 'پیام گروهی'
});

console.log(response.status);`,
    csharp: `var client = new SMSClient("YOUR_API_KEY");

// ارسال پیامک ساده
var response = await client.SendAsync(new SendRequest
{
    To = "09121234567",
    Message = "سلام از موج پیام!"
});

// ارسال پیامک گروهی
var bulkResponse = await client.SendBulkAsync(new SendBulkRequest
{
    To = new[] { "09121234567", "09129876543" },
    Message = "پیام گروهی"
});

Console.WriteLine(response.Status);`,
    java: `SMSClient client = new SMSClient("YOUR_API_KEY");

// ارسال پیامک ساده
SendResponse response = client.send(
    new SendRequest()
        .setTo("09121234567")
        .setMessage("سلام از موج پیام!")
);

// ارسال پیامک گروهی
SendBulkResponse bulkResponse = client.sendBulk(
    new SendBulkRequest()
        .setTo(new String[]{"09121234567", "09129876543"})
        .setMessage("پیام گروهی")
);

System.out.println(response.getStatus());`,
  };

  const features = [
    {
      icon: Send,
      title: "ارسال پیامک ساده و گروهی",
      description: "ارسال پیامک به یک یا چند مخاطب با یک درخواست API",
    },
    {
      icon: Calendar,
      title: "ارسال زمان‌بندی شده",
      description: "برنامه‌ریزی ارسال پیامک در زمان‌های مشخص",
    },
    {
      icon: MessageSquare,
      title: "پیامک الگویی",
      description: "ارسال پیامک‌های از پیش تعریف شده با پارامترهای متغیر",
    },
    {
      icon: BarChart3,
      title: "گزارش‌گیری پیشرفته",
      description: "دریافت گزارش کامل از وضعیت ارسال و تحویل پیامک‌ها",
    },
    {
      icon: Webhook,
      title: "Webhook و Callback",
      description: "دریافت اطلاعات به‌روز وضعیت پیامک‌ها در زمان واقعی",
    },
    {
      icon: Users,
      title: "مدیریت مخاطبین",
      description: "ایجاد و مدیریت گروه‌های مخاطبین از طریق API",
    },
    {
      icon: Phone,
      title: "دریافت پیامک",
      description: "دریافت پیامک‌های ارسال شده به خط اختصاصی شما",
    },
    {
      icon: Shield,
      title: "احراز هویت امن",
      description: "استفاده از API Key و Token برای امنیت بالا",
    },
    {
      icon: Zap,
      title: "سرعت بالا",
      description: "پردازش درخواست‌ها در کمتر از 100 میلی‌ثانیه",
    },
    {
      icon: Globe,
      title: "دسترسی جهانی",
      description: "فراخوانی API از هر نقطه جهان با پشتیبانی HTTPS",
    },
    {
      icon: Clock,
      title: "آپتایم 99.9%",
      description: "سرویس پایدار و قابل اطمینان 24 ساعته",
    },
    {
      icon: CheckCircle,
      title: "مستندات کامل",
      description: "راهنمای جامع با مثال‌های کاربردی به زبان فارسی",
    },
  ];

  const supportedPlugins = [
    {
      name: "WordPress",
      logo: "🔷",
      description: "افزونه اختصاصی برای وردپرس",
    },
    { name: "Laravel", logo: "🔶", description: "پکیج Composer برای لاراول" },
    { name: "Django", logo: "🟢", description: "پکیج pip برای جنگو" },
    { name: "React", logo: "⚛️", description: "کتابخانه npm برای ری‌اکت" },
    { name: "Vue.js", logo: "💚", description: "پکیج npm برای ویو" },
    { name: "Angular", logo: "🔴", description: "کتابخانه npm برای انگولار" },
    { name: ".NET Core", logo: "💜", description: "پکیج NuGet برای دات‌نت" },
    {
      name: "Spring Boot",
      logo: "🍃",
      description: "کتابخانه Maven برای اسپرینگ",
    },
  ];

  const documentationLinks = [
    {
      icon: BookOpen,
      title: "مستندات REST API",
      description: "راهنمای کامل APIهای RESTful موج پیام",
      link: "#",
    },
    {
      icon: Zap,
      title: "شروع سریع",
      description: "آموزش گام به گام برای شروع کار در 5 دقیقه",
      link: "#",
    },
    {
      icon: Github,
      title: "نمونه کدها در GitHub",
      description: "مخزن کدهای نمونه به زبان‌های مختلف",
      link: "#",
    },
    {
      icon: Download,
      title: "دانلود مستندات PDF",
      description: "فایل PDF کامل مستندات برای مطالعه آفلاین",
      link: "#",
    },
    {
      icon: Code2,
      title: "SDK و کتابخانه‌ها",
      description: "دانلود کتابخانه‌های رسمی برای زبان‌های مختلف",
      link: "#",
    },
    {
      icon: FileText,
      title: "Postman Collection",
      description: "مجموعه کامل APIها برای تست در Postman",
      link: "#",
    },
  ];

  const faqs = [
    {
      question: "چگونه می‌توانم کلید API دریافت کنم؟",
      answer:
        'پس از ثبت‌نام و ورود به پنل کاربری، از بخش "تنظیمات" و زیرمنوی "API Key" می‌توانید کلید API خود را ایجاد کنید. هر حساب کاربری می‌تواند چندین کلید API داشته باشد.',
    },
    {
      question: "آیا امکان تست رایگان وب سرویس وجود دارد؟",
      answer:
        "بله، برای تمامی کاربران جدید 50 پیامک رایگان برای تست وب سرویس در نظر گرفته شده است. همچنین می‌توانید از محیط Sandbox برای تست بدون مصرف اعتبار استفاده کنید.",
    },
    {
      question: "محدودیت تعداد درخواست (Rate Limit) چقدر است؟",
      answer:
        "محدودیت پیش‌فرض 100 درخواست در دقیقه است. برای کاربران سازمانی این محدودیت قابل افزایش تا 1000 درخواست در دقیقه می‌باشد. در صورت نیاز به محدودیت بالاتر با پشتیبانی تماس بگیرید.",
    },
    {
      question: "آیا وب سرویس از HTTPS پشتیبانی می‌کند؟",
      answer:
        "بله، تمامی درخواست‌های وب سرویس باید از طریق HTTPS ارسال شوند. درخواست‌های HTTP به صورت خودکار به HTTPS منتقل می‌شوند تا امنیت داده‌ها تضمین شود.",
    },
    {
      question: "چگونه وضعیت تحویل پیامک را بررسی کنم؟",
      answer:
        'با استفاده از شناسه منحصر به فرد (message_id) که پس از ارسال هر پیامک دریافت می‌کنید، می‌توانید از طریق API مربوط به "وضعیت تحویل" وضعیت پیامک را استعلام کنید. همچنین می‌توانید از Webhook برای دریافت خودکار وضعیت استفاده کنید.',
    },
    {
      question: "پیامک الگویی چیست و چگونه استفاده می‌شود؟",
      answer:
        "پیامک الگویی نوعی پیامک از پیش تعریف شده است که برای ارسال پیامک‌های تاییدیه، کد یکبار مصرف و... استفاده می‌شود. ابتدا باید الگوی خود را در پنل ثبت و تایید کنید، سپس با ارسال پارامترها از طریق API می‌توانید پیامک ارسال کنید.",
    },
    {
      question: "چه زبان‌های برنامه‌نویسی پشتیبانی می‌شوند؟",
      answer:
        "موج پیام SDK و کتابخانه رسمی برای PHP، Python، Node.js، C#، Java، Ruby، Go و JavaScript ارائه می‌دهد. همچنین با استفاده از REST API می‌توانید از هر زبان برنامه‌نویسی دیگری نیز استفاده کنید.",
    },
    {
      question: "هزینه استفاده از وب سرویس چقدر است؟",
      answer:
        "استفاده از وب سرویس موج پیام کاملاً رایگان است و فقط بابت تعداد پیامک‌های ارسالی طبق تعرفه‌های پنل هزینه دریافت می‌شود. هیچ هزینه اضافی برای فراخوانی API دریافت نمی‌شود.",
    },
    {
      question: "Webhook چیست و چگونه تنظیم می‌شود؟",
      answer:
        "Webhook امکان دریافت خودکار اطلاعات وضعیت پیامک‌ها را به آدرس سرور شما فراهم می‌کند. می‌توانید آدرس Webhook را در پنل تنظیم کنید تا هر زمان وضعیت پیامکی تغییر کرد، اطلاعات به سرور شما ارسال شود.",
    },
    {
      question: "چگونه خطاهای API را مدیریت کنم؟",
      answer:
        "تمامی پاسخ‌های API شامل کد وضعیت HTTP و پیام خطای مشخص هستند. در مستندات کامل لیست تمامی کدهای خطا و راهکارهای رفع آن‌ها آورده شده است. همچنین سیستم لاگینگ پیشرفته کمک می‌کند خطاها را ردیابی کنید.",
    },
    {
      question: "آیا امکان دریافت پیامک از طریق API وجود دارد؟",
      answer:
        "بله، در صورتی که خط اختصاصی دریافتی داشته باشید، می‌توانید از طریق API پیامک‌های دریافتی را مشاهده کنید. این قابلیت برای ایجاد سیستم‌های تعاملی و پاسخ خودکار بسیار کاربردی است.",
    },
    {
      question: "پشتیبانی فنی وب سرویس چگونه است؟",
      answer:
        "تیم پشتیبانی فنی موج پیام 24 ساعته و 7 روز هفته آماده پاسخگویی به سوالات شماست. می‌توانید از طریق تیکت، ایمیل، تلگرام یا تماس تلفنی با ما در ارتباط باشید.",
    },
  ];

  const handleCopyCode = () => {
    navigator.clipboard.writeText(
      codeExamples[activeLanguage as keyof typeof codeExamples]
    );
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <SEOHead
        title="وب سرویس و API پیامک - موج پیام"
        description="راهنمای کامل استفاده از وب سرویس و API موج پیام برای برنامه‌نویسان. مستندات، نمونه کد و SDK به زبان‌های مختلف برنامه‌نویسی."
        keywords="وب سرویس پیامک, API پیامک, SDK پیامک, REST API, نمونه کد پیامک"
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-500 to-teal-500 py-20">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full mb-6">
              <Code2 className="w-5 h-5 text-white" />
              <span className="text-white font-semibold">
                وب سرویس برنامه‌نویسان
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              API قدرتمند برای توسعه‌دهندگان
            </h1>

            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              وب سایت یا اپلیکیشن خود را با چند خط کد به پنل پیامکی موج پیام
              متصل کنید
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <motion.a
                href="#code-examples"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all inline-flex items-center gap-2"
              >
                <Code2 className="w-5 h-5" />
                مشاهده نمونه کد
                <ArrowRight className="w-5 h-5" />
              </motion.a>

              <motion.a
                href="#documentation"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all inline-flex items-center gap-2"
              >
                <BookOpen className="w-5 h-5" />
                مستندات کامل
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Programming Languages Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              زبان‌های برنامه‌نویسی پشتیبانی شده
            </h2>
            <p className="text-lg text-gray-600">
              SDK و کتابخانه رسمی برای زبان‌های محبوب برنامه‌نویسی
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-5xl mx-auto">
            {programmingLanguages.map((lang, index) => (
              <motion.div
                key={lang.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 rounded-2xl p-6 text-center hover:border-blue-400 hover:shadow-lg transition-all cursor-pointer"
              >
                <div className="text-5xl mb-3">{lang.icon}</div>
                <h3 className="text-lg font-bold text-gray-800">{lang.name}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              قابلیت‌های وب سرویس موج پیام
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              مجموعه کاملی از APIها برای تمامی نیازهای پیامکی شما
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-2xl p-6 border-2 border-gray-100 hover:border-blue-400 hover:shadow-xl transition-all group"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-teal-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Code Examples Section */}
      <section id="code-examples" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              نمونه کد برای شروع سریع
            </h2>
            <p className="text-lg text-gray-600">
              در کمتر از 5 دقیقه اولین پیامک خود را ارسال کنید
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto">
            <div className="flex flex-wrap gap-2 mb-6 justify-center">
              {programmingLanguages.map((lang) => (
                <button
                  key={lang.id}
                  onClick={() => setActiveLanguage(lang.id)}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                    activeLanguage === lang.id
                      ? "bg-gradient-to-r from-blue-500 to-teal-500 text-white shadow-lg"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {lang.icon} {lang.name}
                </button>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative bg-gray-900 rounded-2xl p-6 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>

                <button
                  onClick={handleCopyCode}
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-all"
                >
                  {copiedCode ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>کپی شد!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>کپی کد</span>
                    </>
                  )}
                </button>
              </div>

              <pre
                className="text-sm md:text-base text-gray-100 overflow-x-auto font-mono leading-relaxed"
                dir="ltr"
              >
                <code>
                  {codeExamples[activeLanguage as keyof typeof codeExamples]}
                </code>
              </pre>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Supported Plugins Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              افزونه‌ها و پلاگین‌های آماده
            </h2>
            <p className="text-lg text-gray-600">
              نصب و راه‌اندازی آسان در پلتفرم‌های محبوب
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {supportedPlugins.map((plugin, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl p-6 border-2 border-gray-200 hover:border-blue-400 hover:shadow-lg transition-all text-center"
              >
                <div className="text-5xl mb-3">{plugin.logo}</div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  {plugin.name}
                </h3>
                <p className="text-sm text-gray-600">{plugin.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Documentation Section */}
      <section id="documentation" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              مستندات و منابع آموزشی
            </h2>
            <p className="text-lg text-gray-600">
              راهنمای کامل و جامع برای توسعه‌دهندگان
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {documentationLinks.map((doc, index) => {
              const Icon = doc.icon;
              return (
                <motion.a
                  key={index}
                  href={doc.link}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 border-2 border-gray-200 hover:border-blue-400 hover:shadow-xl transition-all group"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-teal-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {doc.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{doc.description}</p>
                  <div className="flex items-center text-blue-600 font-semibold group-hover:gap-2 transition-all">
                    <span>مشاهده</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.a>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section 1 */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-blue-500 to-teal-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              همین حالا شروع کنید!
            </h2>
            <p className="text-xl text-white/90 mb-8">
              با دریافت API Key رایگان، اولین پیامک خود را در کمتر از 5 دقیقه
              ارسال کنید
            </p>
            <motion.a
              href="http://dash.moojpayam.ir/userregister.aspx"
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-blue-600 px-10 py-5 rounded-xl font-bold text-xl shadow-2xl hover:shadow-3xl transition-all inline-flex items-center gap-3"
            >
              <Zap className="w-6 h-6" />
              دریافت API Key رایگان
              <ArrowRight className="w-6 h-6" />
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-5xl font-bold text-blue-600 mb-2">99.9%</div>
              <div className="text-lg text-gray-600">آپتایم سرویس</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <div className="text-5xl font-bold text-teal-600 mb-2">
                &lt;100ms
              </div>
              <div className="text-lg text-gray-600">زمان پاسخ‌دهی</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="text-5xl font-bold text-blue-600 mb-2">24/7</div>
              <div className="text-lg text-gray-600">پشتیبانی فنی</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              سوالات متداول وب سرویس
            </h2>
            <p className="text-lg text-gray-600">
              پاسخ سوالات رایج برنامه‌نویسان
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden hover:border-blue-400 transition-all"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-right hover:bg-gray-50 transition-colors"
                >
                  <span className="text-lg font-bold text-gray-800 flex-1">
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: openFaq === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ArrowRight className="w-5 h-5 text-blue-600 transform rotate-90" />
                  </motion.div>
                </button>

                <motion.div
                  initial={false}
                  animate={{
                    height: openFaq === index ? "auto" : 0,
                    opacity: openFaq === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-5 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                    {faq.answer}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section 2 - Support */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-blue-50 to-teal-50 rounded-3xl p-8 md:p-12 border-2 border-blue-200">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                نیاز به راهنمایی دارید؟
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                تیم پشتیبانی فنی ما آماده کمک به شما در هر مرحله از توسعه است
              </p>

              <div className="flex flex-wrap gap-4 justify-center">
                <motion.a
                  href="/contact-us"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-blue-600 to-teal-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all inline-flex items-center gap-2"
                >
                  <MessageSquare className="w-5 h-5" />
                  تماس با پشتیبانی
                </motion.a>

                <motion.a
                  href="#documentation"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-gray-800 border-2 border-gray-300 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-50 transition-all inline-flex items-center gap-2"
                >
                  <BookOpen className="w-5 h-5" />
                  مطالعه مستندات
                </motion.a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WebServicesPage;
