import React from "react";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { useContentData } from "../../hooks/useContentData";

const PricingSection: React.FC = () => {
  const { pricing: plans, loading, error } = useContentData();

  if (loading) {
    return (
      <section id="pricing" className="py-20 bg-gradient-to-br from-white to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
            <p className="text-gray-600">در حال بارگذاری تعرفه‌ها...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="pricing" className="py-20 bg-gradient-to-br from-white to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="pricing"
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
            <span className="font-semibold">تعرفه‌های اقتصادی</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4 text-gray-900"
          >
            تعرفه‌های{" "}
            <span className="text-primary-500 relative">
              موج پیام
              <span className="absolute bottom-0 left-0 w-full h-1 bg-primary-500/30 rounded-full"></span>
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            پلن مناسب کسب و کار خود را انتخاب کنید و از مزایای پنل پیامک حرفه‌ای
            ما بهره‌مند شوید
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{
                y: -10,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              }}
              transition={{
                duration: 0.3,
                delay: index * 0.1,
                type: "spring",
                stiffness: 300,
              }}
              viewport={{ once: true }}
              className={`bg-white rounded-2xl shadow-lg overflow-hidden ${
                plan.popular
                  ? "border-t-4 border-primary-500 transform md:-translate-y-4"
                  : ""
              }`}
            >
              {plan.popular && (
                <div className="bg-primary-500 text-white text-center py-2 px-4 text-sm font-bold">
                  محبوب‌ترین
                </div>
              )}

              <div className="p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2 text-gray-800">
                    {plan.name}
                  </h3>
                  <p className="text-gray-600 mb-6 min-h-[48px]">
                    {plan.description}
                  </p>
                  <div className="flex items-center justify-center mb-6">
                    <span className="text-4xl font-bold text-gray-900">
                      {plan.price}
                    </span>
                    <span className="text-gray-600 mr-2">تومان / ماهانه</span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      {feature.included ? (
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center ml-3">
                          <Check size={16} className="text-green-500" />
                        </div>
                      ) : (
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center ml-3">
                          <X size={16} className="text-gray-400" />
                        </div>
                      )}
                      <span
                        className={
                          feature.included ? "text-gray-800" : "text-gray-400"
                        }
                      >
                        {feature.title}
                      </span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-4 rounded-xl font-bold transition-all duration-300 transform hover:scale-[1.02] ${
                    plan.popular
                      ? "bg-primary-500 hover:bg-primary-600 text-white shadow-lg hover:shadow-xl"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-gray-600 mb-4">نیاز به پلن اختصاصی دارید؟</p>
          <a
            href="#contact"
            className="inline-flex items-center bg-white border-2 border-primary-500 text-primary-500 px-8 py-3 rounded-xl font-bold hover:bg-primary-50 transition-colors"
          >
            با ما تماس بگیرید
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;