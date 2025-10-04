import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  ChevronUp,
  Search,
  HelpCircle,
  MessageSquare,
  Shield,
  CreditCard,
  Settings,
  Clock,
  Users,
  Zap,
  CheckCircle,
  AlertCircle,
  Info,
  Phone,
  Mail,
  ArrowLeft,
} from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "../components/SEOHead";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  tags: string[];
  helpful?: boolean;
}

interface FaqCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  description: string;
}

const FaqPage: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("همه");
  const [helpfulVotes, setHelpfulVotes] = useState<Record<string, boolean>>({});

  const categories: FaqCategory[] = [
    {
      id: "همه",
      name: "همه سوالات",
      icon: <HelpCircle className="w-5 h-5" />,
      color: "bg-gray-100 text-gray-700",
      description: "تمام سوالات متداول",
    },
    {
      id: "شروع",
      name: "شروع کار",
      icon: <Zap className="w-5 h-5" />,
      color: "bg-blue-100 text-blue-700",
      description: "نحوه شروع و راه‌اندازی",
    },
    {
      id: "پیامک",
      name: "ارسال پیامک",
      icon: <MessageSquare className="w-5 h-5" />,
      color: "bg-green-100 text-green-700",
      description: "نحوه ارسال و مدیریت پیامک‌ها",
    },
    {
      id: "امنیت",
      name: "امنیت و قوانین",
      icon: <Shield className="w-5 h-5" />,
      color: "bg-red-100 text-red-700",
      description: "قوانین و مسائل امنیتی",
    },
    {
      id: "پرداخت",
      name: "پرداخت و تعرفه",
      icon: <CreditCard className="w-5 h-5" />,
      color: "bg-purple-100 text-purple-700",
      description: "مسائل مالی و تعرفه‌ها",
    },
    {
      id: "فنی",
      name: "مسائل فنی",
      icon: <Settings className="w-5 h-5" />,
      color: "bg-orange-100 text-orange-700",
      description: "راه‌اندازی و مشکلات فنی",
    },
  ];

  const faqItems: FaqItem[] = [
    // شروع کار
    {
      id: "start-1",
      question: "چگونه می‌توانم پنل پیامک تبلیغاتی خریداری کنم؟",
      answer:
        "برای خرید پنل پیامک تبلیغاتی، مراحل زیر را دنبال کنید:\n\n1. **ثبت‌نام در سایت**: ابتدا در سایت موج پیام ثبت‌نام کنید\n2. **انتخاب پلن**: یکی از پلن‌های متناسب با نیاز خود را از بخش تعرفه‌ها انتخاب کنید\n3. **پرداخت**: پرداخت را از طریق درگاه‌های امن بانکی انجام دهید\n4. **فعال‌سازی**: بلافاصله پس از تایید پرداخت، پنل شما فعال می‌شود\n\nدر صورت نیاز به راهنمایی، تیم پشتیبانی ما آماده کمک به شما هستند.",
      category: "شروع",
      tags: ["خرید", "ثبت‌نام", "پرداخت"],
    },
    {
      id: "start-2",
      question: "آیا امکان تست رایگان پنل وجود دارد؟",
      answer:
        "بله! موج پیام امکانات زیر را برای تست ارائه می‌دهد:\n\n• **شارژ اولیه رایگان**: با هر پلن، شارژ اولیه رایگان دریافت می‌کنید\n• **دمو آنلاین**: می‌توانید از دمو آنلاین پنل استفاده کنید\n• **مشاوره رایگان**: کارشناسان ما راهنمایی کاملی ارائه می‌دهند\n• **ضمانت بازگشت وجه**: در صورت عدم رضایت، وجه شما بازگردانده می‌شود\n\nبرای دریافت دسترسی تست، با پشتیبانی تماس بگیرید.",
      category: "شروع",
      tags: ["تست", "رایگان", "دمو"],
    },
    {
      id: "start-3",
      question: "چه مدارکی برای ثبت‌نام نیاز است؟",
      answer:
        "برای ثبت‌نام در پنل پیامک موج پیام، مدارک زیر مورد نیاز است:\n\n**برای اشخاص حقیقی:**\n• کپی کارت ملی\n• شماره موبایل معتبر\n• آدرس ایمیل\n\n**برای اشخاص حقوقی:**\n• کپی شناسنامه شرکت\n• کپی کارت ملی مدیرعامل\n• مجوز فعالیت (در صورت وجود)\n\n**نکته مهم**: تمام مدارک باید واضح و خوانا باشند و اطلاعات آن‌ها با اطلاعات ثبت‌نامی مطابقت داشته باشد.",
      category: "شروع",
      tags: ["مدارک", "ثبت‌نام", "احراز هویت"],
    },

    // ارسال پیامک
    {
      id: "sms-1",
      question:
        "آیا امکان ارسال پیامک تبلیغاتی به شماره‌های بلک لیست وجود دارد؟",
      answer:
        "خیر، مطابق با قوانین وزارت ارتباطات، ارسال پیامک تبلیغاتی به شماره‌های بلک لیست امکان‌پذیر نیست.\n\n**دلایل این محدودیت:**\n• احترام به حریم خصوصی کاربران\n• رعایت قوانین ملی ارتباطات\n• جلوگیری از اسپم\n\n**راه‌حل‌های جایگزین:**\n• استفاده از لیست‌های تمیز و به‌روز\n• ارسال پیامک خدماتی به مشتریان فعلی\n• دریافت رضایت صریح از مخاطبان\n\n**نکته**: شماره‌هایی که درخواست عدم دریافت پیامک تبلیغاتی داده‌اند، در لیست سیاه قرار می‌گیرند.",
      category: "پیامک",
      tags: ["بلک لیست", "قوانین", "تبلیغاتی"],
    },
    {
      id: "sms-2",
      question: "تفاوت پیامک تبلیغاتی و خدماتی چیست؟",
      answer:
        "تفاوت‌های کلیدی بین پیامک تبلیغاتی و خدماتی:\n\n**پیامک تبلیغاتی:**\n• هدف: بازاریابی و تبلیغ محصولات\n• خطوط ارسال: 1000 یا 2000\n• مخاطبان: عموم مردم\n• محدودیت‌ها: نمی‌توان به بلک لیست ارسال کرد\n• زمان ارسال: ساعات مجاز تبلیغاتی\n\n**پیامک خدماتی:**\n• هدف: اطلاع‌رسانی به مشتریان فعلی\n• خطوط ارسال: 3000 یا 9000\n• مخاطبان: مشتریان ثبت‌شده\n• کاربردها: وضعیت سفارش، یادآوری قرار، تایید پرداخت\n• زمان ارسال: ۲۴ ساعته\n\n**توصیه**: برای بهترین نتایج، ترکیبی از هر دو نوع استفاده کنید.",
      category: "پیامک",
      tags: ["تبلیغاتی", "خدماتی", "تفاوت"],
    },
    {
      id: "sms-3",
      question: "آیا امکان ارسال پیامک زمانبندی شده وجود دارد؟",
      answer:
        "بله! پنل موج پیام امکانات پیشرفته زمانبندی ارائه می‌دهد:\n\n**قابلیت‌های زمانبندی:**\n• ارسال در تاریخ و ساعت مشخص\n• تکرار روزانه، هفتگی، ماهانه\n• ارسال در مناسبت‌های خاص\n• زمانبندی چندگانه برای کمپین‌های مختلف\n\n**کاربردهای عملی:**\n• تبریک تولد مشتریان\n• یادآوری رویدادها و قرارها\n• کمپین‌های فصلی و مناسبتی\n• ارسال در بهترین ساعات روز\n\n**نکته**: سیستم به صورت خودکار پیام‌ها را در زمان تعیین شده ارسال می‌کند، حتی اگر شما آنلاین نباشید.",
      category: "پیامک",
      tags: ["زمانبندی", "خودکار", "تکرار"],
    },
    {
      id: "sms-4",
      question:
        "آیا می‌توانم از پنل پیامک برای ارسال پیام‌های شخصی‌سازی شده استفاده کنم؟",
      answer:
        'بله! پنل موج پیام امکانات قدرتمند شخصی‌سازی ارائه می‌دهد:\n\n**متغیرهای قابل استفاده:**\n• {نام} - نام مخاطب\n• {نام_خانوادگی} - نام خانوادگی\n• {تاریخ_تولد} - تاریخ تولد\n• {شهر} - شهر محل سکونت\n• {کد_ملی} - کد ملی (در صورت وجود)\n\n**مثال عملی:**\n"سلام {نام} عزیز! تخفیف ویژه {شهر} برای شما آماده شده. کد تخفیف: CITY20"\n\n**مزایا:**\n• افزایش نرخ پاسخ تا ۴۰٪\n• ایجاد حس شخصی بودن\n• بهبود تجربه مشتری\n• افزایش اعتماد و وفاداری\n\n**راهنمایی**: در بخش ایجاد پیام، از گزینه "متغیرها" استفاده کنید.',
      category: "پیامک",
      tags: ["شخصی‌سازی", "متغیر", "نام"],
    },

    // امنیت و قوانین
    {
      id: "security-1",
      question: "آیا ارسال پیامک از موج پیام قانونی و مجاز است؟",
      answer:
        "بله، موج پیام کاملاً قانونی و مجاز است:\n\n**مجوزهای رسمی:**\n• مجوز رسمی از وزارت ارتباطات\n• عضویت در اتحادیه شرکت‌های ارتباطی\n• رعایت کامل قوانین ملی\n\n**تعهدات ما:**\n• عدم ارسال به شماره‌های بلک لیست\n• رعایت ساعات مجاز ارسال\n• حفظ حریم خصوصی کاربران\n• شفافیت کامل در خدمات\n\n**مسئولیت مشتریان:**\n• ارسال محتوای قانونی\n• رعایت حقوق مخاطبان\n• عدم ارسال اسپم\n\nما متعهد به ارائه خدمات کاملاً قانونی و اخلاقی هستیم.",
      category: "امنیت",
      tags: ["قانونی", "مجوز", "وزارت ارتباطات"],
    },
    {
      id: "security-2",
      question: "اطلاعات من در پنل چقدر امن است؟",
      answer:
        "امنیت اطلاعات شما اولویت اصلی ماست:\n\n**تدابیر امنیتی:**\n• رمزنگاری SSL برای تمام ارتباطات\n• سرورهای امن در دیتاسنتر معتبر\n• پشتیبان‌گیری روزانه از اطلاعات\n• کنترل دسترسی چندمرحله‌ای\n\n**حفاظت از داده‌ها:**\n• عدم اشتراک‌گذاری با اشخاص ثالث\n• رمزنگاری پایگاه داده\n• نظارت ۲۴ ساعته بر سیستم\n• پروتکل‌های امنیتی بین‌المللی\n\n**حقوق شما:**\n• دسترسی به اطلاعات شخصی\n• درخواست حذف اطلاعات\n• کنترل کامل بر داده‌هایتان\n\nما متعهد به حفظ حریم خصوصی و امنیت اطلاعات شما هستیم.",
      category: "امنیت",
      tags: ["امنیت", "حریم خصوصی", "SSL"],
    },

    // پرداخت و تعرفه
    {
      id: "payment-1",
      question: "چگونه می‌توانم به پنل خود اعتبار اضافه کنم؟",
      answer:
        'افزایش اعتبار پنل بسیار ساده است:\n\n**مراحل افزایش اعتبار:**\n1. وارد پنل کاربری خود شوید\n2. از منوی اصلی، گزینه "افزایش اعتبار" را انتخاب کنید\n3. مبلغ مورد نظر را وارد کنید\n4. روش پرداخت را انتخاب کنید\n5. پرداخت را تکمیل کنید\n\n**روش‌های پرداخت:**\n• کارت‌های بانکی (ویزا، مسترکارت)\n• درگاه‌های بانکی ایرانی\n• کیف پول‌های دیجیتال\n• واریز مستقیم به حساب\n\n**زمان واریز**: اعتبار شما بلافاصله پس از تایید پرداخت افزایش می‌یابد.\n\n**نکته**: برای مبالغ بالا، تخفیف‌های ویژه‌ای در نظر گرفته شده است.',
      category: "پرداخت",
      tags: ["اعتبار", "شارژ", "پرداخت"],
    },
    {
      id: "payment-2",
      question: "آیا امکان استرداد وجه وجود دارد؟",
      answer:
        "بله، موج پیام سیاست منصفانه‌ای برای استرداد وجه دارد:\n\n**شرایط استرداد:**\n• درخواست در ۷۲ ساعت اول پس از خرید\n• عدم استفاده از بیش از ۱۰٪ اعتبار خریداری شده\n• عدم نقض قوانین و مقررات\n\n**مراحل درخواست استرداد:**\n1. ارسال درخواست از طریق تیکت پشتیبانی\n2. ارائه دلیل درخواست استرداد\n3. بررسی درخواست توسط تیم مالی\n4. واریز وجه در صورت تایید\n\n**زمان بررسی**: ۳-۵ روز کاری\n**زمان واریز**: ۷-۱۰ روز کاری\n\nما متعهد به رضایت کامل مشتریان هستیم.",
      category: "پرداخت",
      tags: ["استرداد", "بازگشت وجه", "ضمانت"],
    },

    // مسائل فنی
    {
      id: "tech-1",
      question: "چگونه پنل پیامک را به وب‌سایت خود متصل کنم؟",
      answer:
        "اتصال پنل به وب‌سایت از طریق وب‌سرویس انجام می‌شود:\n\n**برای وردپرس:**\n1. افزونه WP-SMS را نصب کنید\n2. اطلاعات API موج پیام را وارد کنید\n3. تنظیمات مورد نظر را اعمال کنید\n\n**برای سایت‌های سفارشی:**\n1. مستندات API ما را دانلود کنید\n2. کلیدهای API را از پنل دریافت کنید\n3. کدهای نمونه را پیاده‌سازی کنید\n\n**خدمات پشتیبانی:**\n• راهنمایی کامل توسط تیم فنی\n• کدهای نمونه آماده\n• تست و راه‌اندازی رایگان\n• پشتیبانی پس از نصب\n\n**زمان راه‌اندازی**: معمولاً کمتر از ۳۰ دقیقه",
      category: "فنی",
      tags: ["وب‌سرویس", "API", "اتصال"],
    },
    {
      id: "tech-2",
      question: "چرا پیامک‌های من تحویل نمی‌شوند؟",
      answer:
        "دلایل مختلفی ممکن است باعث عدم تحویل پیامک شوند:\n\n**دلایل رایج:**\n• شماره گیرنده خاموش یا خارج از دسترس\n• شماره نامعتبر یا اشتباه\n• صندوق پیامک گیرنده پر\n• فیلتر اپراتور\n\n**راه‌حل‌ها:**\n• بررسی صحت شماره‌ها\n• استفاده از لیست‌های تمیز\n• ارسال در ساعات مناسب\n• بررسی گزارش‌های تفصیلی\n\n**ابزارهای کمکی:**\n• گزارش وضعیت تحویل لحظه‌ای\n• تحلیل دلایل عدم تحویل\n• پیشنهادات بهبود کمپین\n\n**پشتیبانی**: تیم فنی ما آماده بررسی مشکلات خاص شماست.",
      category: "فنی",
      tags: ["تحویل", "مشکل", "عیب‌یابی"],
    },

    // سوالات عمومی
    {
      id: "general-1",
      question: "آیا امکان ارسال پیامک صوتی وجود دارد؟",
      answer:
        'بله! موج پیام سرویس پیامک صوتی پیشرفته ارائه می‌دهد:\n\n**امکانات پیامک صوتی:**\n• تبدیل متن به گفتار فارسی طبیعی\n• آپلود فایل صوتی دلخواه (MP3, WAV)\n• ارسال انبوه پیامک صوتی\n• کیفیت صوتی HD\n\n**مزایا:**\n• تأثیرگذاری بیشتر نسبت به پیامک متنی\n• مناسب برای افراد کم‌سواد\n• امکان انتقال احساسات\n• نرخ گوش دادن بالا\n\n**محدودیت‌ها:**\n• حداکثر ۳۰ ثانیه\n• فرمت‌های پشتیبانی شده\n• هزینه بالاتر از پیامک متنی\n\n**راهنمایی**: برای شروع، از بخش "پیامک صوتی" در پنل استفاده کنید.',
      category: "پیامک",
      tags: ["صوتی", "گفتار", "آپلود"],
    },
    {
      id: "general-2",
      question: "چگونه می‌توانم نرخ موفقیت کمپین‌هایم را افزایش دهم؟",
      answer:
        "برای افزایش نرخ موفقیت کمپین‌های پیامکی، نکات زیر را رعایت کنید:\n\n**بهینه‌سازی محتوا:**\n• متن کوتاه و مفید (حداکثر ۱۶۰ کاراکتر)\n• استفاده از کلمات کلیدی جذاب\n• فراخوان واضح به عمل (CTA)\n• شخصی‌سازی پیام‌ها\n\n**زمان‌بندی هوشمند:**\n• ارسال در ساعات ۹-۱۲ و ۱۶-۱۹\n• اجتناب از ایام تعطیل\n• در نظر گیری منطقه زمانی مخاطبان\n\n**هدف‌گیری دقیق:**\n• استفاده از فیلترهای جمعیت‌شناختی\n• تقسیم‌بندی بر اساس رفتار خرید\n• ارسال منطقه‌ای\n\n**اندازه‌گیری و بهبود:**\n• تحلیل گزارش‌های تفصیلی\n• A/B تست کردن پیام‌ها\n• پیگیری نرخ تبدیل",
      category: "پیامک",
      tags: ["بهینه‌سازی", "نرخ موفقیت", "کمپین"],
    },

    // پشتیبانی
    {
      id: "support-1",
      question: "چگونه می‌توانم با پشتیبانی تماس بگیرم؟",
      answer:
        "تیم پشتیبانی موج پیام ۲۴/۷ در خدمت شماست:\n\n**راه‌های ارتباطی:**\n• **تیکت آنلاین**: سریع‌ترین راه (پاسخ در کمتر از ۱ ساعت)\n• **تماس تلفنی**: برای مسائل فوری\n• **چت آنلاین**: در ساعات اداری\n• **ایمیل**: contact@moojpayam.ir\n• **تلگرام**: @moojpayam_support\n\n**ساعات کاری:**\n• پشتیبانی آنلاین: ۲۴ ساعته\n• پشتیبانی تلفنی: ۸ صبح تا ۱۰ شب\n• پاسخ‌گویی فوری: در مسائل بحرانی\n\n**نکته**: برای پاسخ سریع‌تر، شماره پنل و توضیح کامل مشکل را ارائه دهید.",
      category: "فنی",
      tags: ["پشتیبانی", "تماس", "راهنمایی"],
    },

    // سوالات پیشرفته
    {
      id: "advanced-1",
      question: "آیا امکان ارسال پیامک منطقه‌ای وجود دارد؟",
      answer:
        'بله! یکی از ویژگی‌های منحصر به فرد موج پیام، ارسال منطقه‌ای است:\n\n**قابلیت‌های منطقه‌ای:**\n• انتخاب منطقه از روی نقشه\n• فیلتر بر اساس کد پستی\n• تقسیم‌بندی شهری و استانی\n• تعیین شعاع جغرافیایی\n\n**کاربردهای عملی:**\n• تبلیغ فروشگاه‌های محلی\n• اطلاع‌رسانی رویدادهای منطقه‌ای\n• خدمات درب منزل\n• کمپین‌های شهری\n\n**مزایا:**\n• افزایش ۳۰۰٪ نرخ تبدیل\n• کاهش هزینه‌های تبلیغاتی\n• هدف‌گیری دقیق‌تر\n• بازخورد بهتر مشتریان\n\n**راهنمایی**: از بخش "ارسال منطقه‌ای" در پنل استفاده کنید.',
      category: "پیامک",
      tags: ["منطقه‌ای", "نقشه", "جغرافیایی"],
    },
    {
      id: "advanced-2",
      question: "آیا امکان ادغام با CRM و سیستم‌های مدیریت وجود دارد؟",
      answer:
        "بله! موج پیام قابلیت‌های ادغام گسترده‌ای ارائه می‌دهد:\n\n**سیستم‌های پشتیبانی شده:**\n• CRM‌های محبوب (Salesforce, HubSpot)\n• سیستم‌های فروشگاهی (ووکامرس، مگنتو)\n• نرم‌افزارهای حسابداری\n• سیستم‌های مدیریت مشتری\n\n**روش‌های ادغام:**\n• API RESTful کامل\n• Webhook برای رویدادها\n• فایل‌های CSV/Excel\n• اتصال مستقیم پایگاه داده\n\n**مزایای ادغام:**\n• خودکارسازی فرآیندها\n• همگام‌سازی اطلاعات\n• کاهش خطای انسانی\n• افزایش بهره‌وری\n\n**پشتیبانی فنی**: تیم ما در راه‌اندازی و پیکربندی کمک می‌کند.",
      category: "فنی",
      tags: ["CRM", "ادغام", "API"],
    },

    // سوالات خاص
    {
      id: "specific-1",
      question: "آیا امکان ارسال پیامک در ساعات خاص شب وجود دارد؟",
      answer:
        "ارسال پیامک در ساعات شب محدودیت‌هایی دارد:\n\n**قوانین ارسال:**\n• **پیامک تبلیغاتی**: فقط ۸ صبح تا ۸ شب\n• **پیامک خدماتی**: ۲۴ ساعته (برای مشتریان فعلی)\n• **پیامک اضطراری**: بدون محدودیت زمانی\n\n**استثنائات:**\n• اطلاع‌رسانی‌های فوری (پزشکی، امنیتی)\n• تایید تراکنش‌های بانکی\n• کدهای تایید (OTP)\n• یادآوری‌های مهم\n\n**توصیه‌ها:**\n• برنامه‌ریزی ارسال در ساعات مجاز\n• استفاده از زمانبندی خودکار\n• رعایت آرامش شبانه مخاطبان\n\n**نکته**: نقض این قوانین ممکن است منجر به تعلیق حساب شود.",
      category: "امنیت",
      tags: ["ساعات ارسال", "شب", "قوانین"],
    },
    {
      id: "specific-2",
      question: "چگونه می‌توانم گزارش‌های تفصیلی از کمپین‌هایم دریافت کنم؟",
      answer:
        'پنل موج پیام گزارش‌های جامع و تفصیلی ارائه می‌دهد:\n\n**انواع گزارش‌ها:**\n• **گزارش ارسال**: تعداد ارسال شده، در انتظار، موفق\n• **گزارش تحویل**: تحویل شده، عدم تحویل، دلایل\n• **گزارش مالی**: هزینه‌ها، اعتبار باقی‌مانده\n• **گزارش عملکرد**: نرخ باز شدن، کلیک، تبدیل\n\n**فرمت‌های خروجی:**\n• مشاهده آنلاین با نمودار\n• دانلود Excel/CSV\n• ارسال ایمیل خودکار\n• API برای دریافت برنامه‌ای\n\n**تحلیل‌های پیشرفته:**\n• مقایسه کمپین‌ها\n• ترند زمانی عملکرد\n• تحلیل جمعیت‌شناختی\n• پیشنهادات بهبود\n\n**دسترسی**: تمام گزارش‌ها در بخش "آمار و گزارش‌ها" قابل دسترسی است.',
      category: "فنی",
      tags: ["گزارش", "آمار", "تحلیل"],
    },
  ];

  const toggleAccordion = (id: string) => {
    setActiveIndex(activeIndex === id ? null : id);
  };

  const markAsHelpful = (id: string, helpful: boolean) => {
    setHelpfulVotes({ ...helpfulVotes, [id]: helpful });
    // In a real app, this would be sent to the server
  };

  const filteredFaqs = faqItems.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const matchesCategory =
      selectedCategory === "همه" || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryData = (categoryId: string) =>
    categories.find((cat) => cat.id === categoryId);

  return (
    <>
      <SEOHead
        title="سوالات متداول | راهنمای کامل پنل پیامک موج پیام"
        description="پاسخ کامل به تمام سوالات متداول درباره پنل پیامک موج پیام: نحوه خرید، ارسال پیامک، قوانین، مسائل فنی، پرداخت و پشتیبانی. راهنمای جامع برای استفاده بهینه از خدمات."
        keywords="سوالات متداول پیامک, راهنمای پنل پیامک, آموزش ارسال پیامک, قوانین پیامک تبلیغاتی, مشکلات فنی پیامک, پشتیبانی موج پیام, FAQ SMS"
        url="https://moojpayam.ir/faq"
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
              <span className="text-gray-900">سوالات متداول</span>
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
              <HelpCircle className="w-5 h-5 ml-2" />
              <span className="font-semibold">مرکز راهنمایی</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold mb-4 text-gray-900"
            >
              سوالات{" "}
              <span className="text-primary-500 relative">
                متداول
                <span className="absolute bottom-0 left-0 w-full h-1 bg-primary-500/30 rounded-full"></span>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            >
              پاسخ کامل و جامع به تمام سوالات شما درباره خدمات پیامک موج پیام
            </motion.p>
          </div>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-2xl mx-auto mb-12"
          >
            <div className="relative">
              <Search
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="جستجو در سوالات متداول..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pr-12 pl-4 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-primary-300 focus:border-primary-500 outline-none text-lg shadow-sm"
              />
            </div>
          </motion.div>

          {/* Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-12"
          >
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center px-4 py-3 rounded-xl transition-all duration-300 font-medium ${
                    selectedCategory === category.id
                      ? "bg-primary-500 text-white shadow-lg transform scale-105"
                      : `${category.color} hover:shadow-md hover:scale-105`
                  }`}
                >
                  {category.icon}
                  <span className="mr-2">{category.name}</span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* FAQ Grid */}
          <div className="max-w-4xl mx-auto">
            {filteredFaqs.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <Search size={64} className="mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-bold text-gray-600 mb-2">
                  نتیجه‌ای یافت نشد
                </h3>
                <p className="text-gray-500 mb-6">
                  لطفاً کلمات کلیدی دیگری را امتحان کنید یا دسته‌بندی دیگری
                  انتخاب کنید
                </p>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("همه");
                  }}
                  className="btn btn-primary"
                >
                  نمایش همه سوالات
                </button>
              </motion.div>
            ) : (
              <div className="space-y-4">
                {filteredFaqs.map((faq, index) => (
                  <motion.div
                    key={faq.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300"
                  >
                    <button
                      className="w-full flex justify-between items-center p-6 text-right hover:bg-gray-50 transition-colors"
                      onClick={() => toggleAccordion(faq.id)}
                    >
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-800 mb-2">
                          {faq.question}
                        </h3>
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              getCategoryData(faq.category)?.color ||
                              "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {getCategoryData(faq.category)?.name ||
                              faq.category}
                          </span>
                          {faq.tags.slice(0, 2).map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 bg-blue-50 text-blue-600 rounded-full text-xs"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="mr-4">
                        {activeIndex === faq.id ? (
                          <ChevronUp className="text-primary-500" size={24} />
                        ) : (
                          <ChevronDown className="text-gray-400" size={24} />
                        )}
                      </div>
                    </button>

                    <AnimatePresence>
                      {activeIndex === faq.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6 border-t border-gray-100">
                            <div className="pt-4">
                              <div
                                className="text-gray-700 leading-relaxed whitespace-pre-line"
                                style={{ fontSize: "16px", lineHeight: "1.7" }}
                              >
                                {faq.answer}
                              </div>

                              {/* Helpful voting */}
                              <div className="mt-6 pt-4 border-t border-gray-100">
                                <div className="flex items-center justify-between">
                                  <p className="text-sm text-gray-600">
                                    آیا این پاسخ مفید بود؟
                                  </p>
                                  <div className="flex items-center gap-3">
                                    <button
                                      onClick={() =>
                                        markAsHelpful(faq.id, true)
                                      }
                                      className={`flex items-center px-3 py-1 rounded-lg text-sm transition-colors ${
                                        helpfulVotes[faq.id] === true
                                          ? "bg-green-100 text-green-700"
                                          : "bg-gray-100 text-gray-600 hover:bg-green-50"
                                      }`}
                                    >
                                      <CheckCircle size={16} className="ml-1" />
                                      مفید بود
                                    </button>
                                    <button
                                      onClick={() =>
                                        markAsHelpful(faq.id, false)
                                      }
                                      className={`flex items-center px-3 py-1 rounded-lg text-sm transition-colors ${
                                        helpfulVotes[faq.id] === false
                                          ? "bg-red-100 text-red-700"
                                          : "bg-gray-100 text-gray-600 hover:bg-red-50"
                                      }`}
                                    >
                                      <AlertCircle size={16} className="ml-1" />
                                      مفید نبود
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Contact Support Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-20"
          >
            <div className="bg-gradient-to-r from-primary-500 to-purple-600 rounded-3xl p-8 md:p-12 text-white text-center">
              <div className="max-w-3xl mx-auto">
                <div className="bg-white/20 rounded-full p-4 inline-flex mb-6">
                  <MessageSquare className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold mb-6">
                  سوال شما پاسخ داده نشد؟
                </h2>
                <p className="text-xl mb-8 leading-relaxed opacity-90">
                  تیم پشتیبانی ما ۲۴ ساعته آماده پاسخگویی به سوالات شما هستند.
                  از طریق راه‌های زیر با ما در تماس باشید.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-white/10 backdrop-blur rounded-2xl p-6">
                    <Phone className="w-8 h-8 mx-auto mb-3" />
                    <h3 className="font-bold mb-2">تماس تلفنی</h3>
                    <p className="text-sm opacity-90">پاسخگویی فوری</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur rounded-2xl p-6">
                    <MessageSquare className="w-8 h-8 mx-auto mb-3" />
                    <h3 className="font-bold mb-2">چت آنلاین</h3>
                    <p className="text-sm opacity-90">در ساعات اداری</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur rounded-2xl p-6">
                    <Mail className="w-8 h-8 mx-auto mb-3" />
                    <h3 className="font-bold mb-2">ایمیل</h3>
                    <p className="text-sm opacity-90">پاسخ در کمتر از ۲ ساعت</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    to="/contact-us"
                    className="btn bg-white text-primary-600 hover:bg-gray-100"
                  >
                    تماس با پشتیبانی
                  </Link>
                  <a
                    href="https://t.me/moojpayam_support"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn bg-white/20 text-white hover:bg-white/30"
                  >
                    پشتیبانی تلگرام
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-16"
          >
            <div className="bg-white rounded-3xl shadow-xl p-8 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                لینک‌های مفید
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Link
                  to="/features"
                  className="flex items-center p-4 rounded-xl hover:bg-blue-50 transition-colors group"
                >
                  <div className="bg-blue-100 rounded-lg p-3 ml-4 group-hover:bg-blue-200 transition-colors">
                    <Settings className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">امکانات کامل</h4>
                    <p className="text-sm text-gray-600">
                      مشاهده تمام ویژگی‌ها
                    </p>
                  </div>
                </Link>

                <Link
                  to="/#pricing"
                  className="flex items-center p-4 rounded-xl hover:bg-green-50 transition-colors group"
                >
                  <div className="bg-green-100 rounded-lg p-3 ml-4 group-hover:bg-green-200 transition-colors">
                    <CreditCard className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">تعرفه‌ها</h4>
                    <p className="text-sm text-gray-600">
                      مشاهده قیمت‌ها و پلن‌ها
                    </p>
                  </div>
                </Link>

                <Link
                  to="/blog"
                  className="flex items-center p-4 rounded-xl hover:bg-purple-50 transition-colors group"
                >
                  <div className="bg-purple-100 rounded-lg p-3 ml-4 group-hover:bg-purple-200 transition-colors">
                    <Info className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">راهنماها</h4>
                    <p className="text-sm text-gray-600">
                      مطالعه مقالات آموزشی
                    </p>
                  </div>
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

export default FaqPage;
