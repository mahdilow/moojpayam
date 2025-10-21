import React from "react";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { useContentData } from "../../hooks/useContentData";

const PricingSection: React.FC = () => {
  const { pricing: plans, loading, error } = useContentData();

  // Helper function to calculate discounted price
  const getDiscountedPrice = (
    price: string,
    discount?: number
  ): string | null => {
    if (!discount || discount <= 0) return null;

    const numericPrice = parseInt(price.replace(/[^\d]/g, ""));
    if (isNaN(numericPrice)) return null;

    const discountedPrice = Math.round(numericPrice * (1 - discount / 100));
    return discountedPrice.toLocaleString("fa-IR");
  };

  if (loading) {
    return (
      <section
        id="pricing"
        className="py-16 sm:py-20 bg-gradient-to-br from-white to-blue-50"
      >
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
      <section
        id="pricing"
        className="py-16 sm:py-20 bg-gradient-to-br from-white to-blue-50"
      >
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
      className="py-16 sm:py-20 bg-gradient-to-br from-white to-blue-50"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-flex items-center bg-blue-100 text-primary-500 px-3 sm:px-4 py-2 rounded-full mb-4 sm:mb-6"
          >
            <span className="font-semibold text-sm sm:text-base">
              تعرفه‌های اقتصادی
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-gray-900"
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
            className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4 sm:px-0"
          >
            پلن مناسب کسب و کار خود را انتخاب کنید و از مزایای پنل پیامک حرفه‌ای
            ما بهره‌مند شوید
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-7xl mx-auto">
          {plans
            .sort((a, b) => {
              if (a.id === 4) return -1;
              if (b.id === 4) return 1;
              return a.id - b.id;
            })
            .map((plan, index) => (
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
                className="relative bg-white rounded-2xl shadow-lg flex flex-col mt-8"
              >
                {plan.popular && (
                  <div className="absolute bottom-full left-0 right-0 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-center py-2 px-6 rounded-t-2xl text-sm sm:text-base font-extrabold tracking-wide shadow-md">
                    پرفروش ترین
                  </div>
                )}

                <div
                  className={`p-4 sm:p-6 lg:p-8 flex flex-col flex-grow backdrop-blur-md shadow-inner border border-white/20 ${
                    plan.id === 2
                      ? "rounded-b-2xl bg-gradient-to-b from-blue-100/40 to-purple-700/20"
                      : plan.id === 1
                      ? "rounded-2xl bg-gradient-to-b from-blue-100/40 to-blue-600/20"
                      : plan.id === 3
                      ? "rounded-2xl bg-gradient-to-b from-yellow-300/50 to-orange-400/40"
                      : plan.id === 4
                      ? "rounded-2xl bg-gradient-to-b  from-blue-100/40 to-emerald-600/20"
                      : "rounded-2xl bg-white/20"
                  }`}
                >
                  <div className="text-center mb-6 sm:mb-8">
                    <h3
                      className={`text-xl sm:text-2xl lg:text-3xl font-extrabold mb-2 ${
                        plan.id === 2
                          ? "bg-gradient-to-r from-purple-500 to-blue-500 text-transparent bg-clip-text"
                          : plan.id === 1
                          ? "bg-gradient-to-r  from-blue-400 to-blue-900 text-transparent bg-clip-text"
                          : plan.id === 3
                          ? "bg-gradient-to-r from-orange-400 to-yellow-600 text-transparent bg-clip-text"
                          : plan.id === 4
                          ? "bg-gradient-to-r from-green-600 to-teal-400 text-transparent bg-clip-text"
                          : "text-gray-800"
                      }`}
                    >
                      {plan.name}
                    </h3>

                    <p className="text-gray-600 mb-4 sm:mb-6 min-h-[48px] text-sm sm:text-base px-2 sm:px-0 font-semibold">
                      {plan.description}
                    </p>

                    <div className="flex items-center justify-center mb-4 sm:mb-6">
                      {plan.discount && plan.discount > 0 ? (
                        <div className="text-center">
                          {/* Discount Badge */}
                          <div className="bg-red-500 text-white px-1 sm:px-1.5 py-[1px] rounded-full text-[10px] sm:text-[11px] font-medium leading-none mb-1 inline-block">
                            {plan.discount}% تخفیف
                          </div>

                          {/* Original Price (crossed out) */}
                          <div className="text-sm sm:text-lg text-gray-400 line-through mb-1">
                            {plan.price} هزار تومان
                          </div>

                          {/* Discounted Price */}
                          <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-green-600">
                            {getDiscountedPrice(plan.price, plan.discount)}
                          </div>

                          {plan.id !== 4 && (
                            <span className="text-gray-600 text-xs sm:text-sm">
                              هزار تومان / سالانه
                            </span>
                          )}
                        </div>
                      ) : (
                        <>
                          <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
                            {plan.price}
                          </span>
                          {plan.id !== 4 && (
                            <span className="text-gray-600 mr-2 text-xs sm:text-sm">
                              هزار تومان / سالانه
                            </span>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                  <hr className="border-t-2 border-primary-100 opacity-40 my-4 sm:my-6" />

                  <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8 flex-grow">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        {feature.included ? (
                          <div className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-green-100 flex items-center justify-center ml-2 sm:ml-3 mt-0.5">
                            <Check
                              size={12}
                              className="sm:w-4 sm:h-4 text-green-500"
                            />
                          </div>
                        ) : (
                          <div className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gray-100 flex items-center justify-center ml-2 sm:ml-3 mt-0.5">
                            <X
                              size={12}
                              className="sm:w-4 sm:h-4 text-gray-400"
                            />
                          </div>
                        )}
                        <span
                          className={`text-sm sm:text-base leading-relaxed ${
                            feature.included ? "text-gray-800" : "text-gray-400"
                          }`}
                        >
                          {feature.title}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto">
                    <a
                      href="http://dash.moojpayam.ir/userregister.aspx"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`block w-full py-3 sm:py-4 rounded-xl font-bold text-center transition-all duration-300 transform hover:scale-[1.02] text-sm sm:text-base ${
                        plan.popular
                          ? "bg-gradient-to-r from-purple-600 to-blue-600 hover:bg-blue-800 text-white shadow-lg hover:shadow-xl"
                          : plan.id === 3
                          ? "bg-orange-400 hover:bg-orange-500 text-white"
                          : plan.id === 4
                          ? "bg-green-400 hover:bg-green-500 text-white"
                          : "bg-blue-400 hover:bg-blue-500 text-white"
                      }`}
                    >
                      {plan.cta}
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-12 sm:mt-16"
        >
          <p className="text-gray-600 mb-4 text-sm sm:text-base">
            نیاز به پلن اختصاصی دارید؟
          </p>
          <a
            href="/contact-us"
            className="inline-flex items-center bg-white border-2 border-primary-500 text-primary-500 px-6 sm:px-8 py-3 rounded-xl font-bold hover:bg-primary-50 transition-colors text-sm sm:text-base"
          >
            با ما تماس بگیرید
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
