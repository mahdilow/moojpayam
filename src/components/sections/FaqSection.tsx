import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

const FaqSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqItems: FaqItem[] = [
    {
      question: "چگونه می‌توانم پنل پیامک تبلیغاتی خریداری کنم؟",
      answer:
        "برای خرید پنل پیامک تبلیغاتی، ابتدا در سایت ثبت‌نام کنید، سپس یکی از پلن‌های متناسب با نیاز خود را انتخاب کرده و پرداخت را انجام دهید. بلافاصله پس از تایید پرداخت، پنل شما فعال می‌شود و می‌توانید از آن استفاده کنید.",
    },
    {
      question:
        "آیا امکان ارسال پیامک تبلیغاتی به شماره‌های بلک لیست وجود دارد؟",
      answer:
        "خیر، مطابق با قوانین وزارت ارتباطات، ارسال پیامک تبلیغاتی به شماره‌هایی که در لیست سیاه قرار دارند امکان‌پذیر نیست. این شماره‌ها شامل افرادی است که درخواست عدم دریافت پیامک‌های تبلیغاتی را داده‌اند.",
    },
    {
      question: "تفاوت پیامک تبلیغاتی و خدماتی چیست؟",
      answer:
        "پیامک تبلیغاتی برای اهداف بازاریابی و تبلیغات محصولات و خدمات استفاده می‌شود و معمولاً از خطوط 1000 یا 2000 ارسال می‌شوند. پیامک خدماتی اما برای اطلاع‌رسانی خدمات مورد استفاده مشتریان فعلی مانند اطلاع از وضعیت سفارش، پرداخت قبض، یادآوری قرار و غیره استفاده می‌شود و از خطوط 3000 یا 9000 ارسال می‌شوند.",
    },
    {
      question: "چگونه می‌توانم به پنل خود اعتبار اضافه کنم؟",
      answer:
        "برای افزایش اعتبار پنل، به صفحه شخصی خود وارد شوید و از بخش «افزایش اعتبار» مبلغ مورد نظر را انتخاب کرده و پرداخت را انجام دهید. اعتبار شما بلافاصله پس از تایید پرداخت افزایش می‌یابد.",
    },
    {
      question: "آیا امکان ارسال پیامک زمانبندی شده وجود دارد؟",
      answer:
        "بله، شما می‌توانید پیام‌های خود را از قبل تنظیم کرده و برای ارسال در زمان مشخصی در آینده برنامه‌ریزی کنید. این قابلیت برای تبریک مناسبت‌ها، یادآوری رویدادها و کمپین‌های تبلیغاتی بسیار مفید است.",
    },
    {
      question:
        "آیا می‌توانم از پنل پیامک برای ارسال پیام‌های شخصی‌سازی شده استفاده کنم؟",
      answer:
        "بله، پنل پیامک ما امکان شخصی‌سازی پیام‌ها با استفاده از متغیرهایی مانند نام، نام خانوادگی، تاریخ تولد و سایر اطلاعات مخاطبان را فراهم می‌کند. این قابلیت به شما کمک می‌کند تا پیام‌های اختصاصی برای هر مخاطب ارسال کنید.",
    },
  ];

  return (
    <section id="faq" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-light mb-4 text-gray-800"
          >
            سوالات <span className="text-primary-500">متداول</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            پاسخ سوالات رایج درباره سرویس پیامک تبلیغاتی موج پیام
          </motion.p>
        </div>

        <div className="max-w-3xl mx-auto">
          {faqItems.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="mb-4 last:mb-0"
            >
              <div
                className={`bg-white rounded-lg shadow-sm overflow-hidden border ${
                  activeIndex === index
                    ? "border-primary-300"
                    : "border-gray-200"
                }`}
              >
                <button
                  className="w-full flex justify-between items-center p-5 text-right"
                  onClick={() => toggleAccordion(index)}
                >
                  <span className="text-lg font-semibold text-gray-800">
                    {faq.question}
                  </span>
                  {activeIndex === index ? (
                    <ChevronUp className="text-primary-500" size={20} />
                  ) : (
                    <ChevronDown className="text-gray-500" size={20} />
                  )}
                </button>

                {activeIndex === index && (
                  <div className="px-5 pb-5 text-gray-600 leading-relaxed border-t border-gray-100">
                    {faq.answer}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">هنوز سوال دیگری دارید؟</p>
          <a href="/faq" className="btn btn-primary">
            مشاهده راهمنای کامل
          </a>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
