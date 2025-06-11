import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { useContentData } from "../../hooks/useContentData";

const TestimonialsSection: React.FC = () => {
  const { testimonials, loading, error } = useContentData();
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  if (loading) {
    return (
      <section id="testimonials\" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
            <p className="text-gray-600">در حال بارگذاری نظرات...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error || testimonials.length === 0) {
    return (
      <section id="testimonials" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-red-600">{error || 'نظری یافت نشد'}</p>
          </div>
        </div>
      </section>
    );
  }

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-flex items-center bg-blue-100 text-primary-500 px-4 py-2 rounded-full mb-6"
          >
            <Quote className="w-5 h-5 ml-2" />
            <span className="font-semibold">نظرات مشتریان</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4 text-gray-900"
          >
            داستان‌های <span className="text-primary-500 relative">
              موفقیت
              <span className="absolute bottom-0 left-0 w-full h-1 bg-primary-500/30 rounded-full"></span>
            </span> مشتریان ما
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            ببینید چگونه کسب‌وکارها با موج پیام رشد کرده‌اند
          </motion.p>
        </div>

        {/* Featured Testimonial */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
                className="bg-white rounded-3xl shadow-xl overflow-hidden"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  {/* Content Side */}
                  <div className="p-8 lg:p-12 flex flex-col justify-center">
                    <div className="flex mb-6">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={24}
                          className="text-yellow-400 fill-yellow-400 ml-1"
                        />
                      ))}
                    </div>

                    <blockquote className="text-lg lg:text-xl text-gray-700 leading-relaxed mb-8 relative">
                      <Quote className="absolute -top-4 -right-2 text-primary-200" size={40} />
                      <span className="relative z-10">
                        {testimonials[activeIndex].content}
                      </span>
                    </blockquote>

                    <div className="flex items-center mb-6">
                      <img
                        src={testimonials[activeIndex].image}
                        alt={testimonials[activeIndex].name}
                        className="w-16 h-16 rounded-full object-cover ml-4 border-4 border-primary-100"
                      />
                      <div>
                        <h4 className="font-bold text-gray-900 text-lg">
                          {testimonials[activeIndex].name}
                        </h4>
                        <p className="text-gray-600">
                          {testimonials[activeIndex].position}
                        </p>
                        <p className="text-primary-500 font-medium">
                          {testimonials[activeIndex].company}
                        </p>
                      </div>
                    </div>

                    {/* Results Card */}
                    <div className="bg-gradient-to-r from-primary-500 to-blue-600 text-white rounded-2xl p-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold mb-1">
                          {testimonials[activeIndex].results.value}
                        </div>
                        <div className="text-blue-100 mb-1">
                          {testimonials[activeIndex].results.metric}
                        </div>
                        <div className="text-sm text-blue-200">
                          {testimonials[activeIndex].results.improvement}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Visual Side */}
                  <div className="bg-gradient-to-br from-primary-100 to-blue-100 p-8 lg:p-12 flex items-center justify-center relative">
                    <div className="relative">
                      <div className="w-64 h-64 bg-white rounded-full shadow-2xl flex items-center justify-center">
                        <img
                          src={testimonials[activeIndex].image}
                          alt={testimonials[activeIndex].name}
                          className="w-48 h-48 rounded-full object-cover"
                        />
                      </div>
                      
                      {/* Floating Elements */}
                      <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="absolute -top-4 -right-4 bg-green-500 text-white rounded-full p-3 shadow-lg"
                      >
                        <Star size={20} fill="currentColor" />
                      </motion.div>
                      
                      <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                        className="absolute -bottom-4 -left-4 bg-blue-500 text-white rounded-full p-3 shadow-lg"
                      >
                        <Quote size={20} />
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            {testimonials.length > 1 && (
              <>
                <button
                  onClick={prevTestimonial}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-colors z-10"
                >
                  <ChevronRight size={24} className="text-gray-600" />
                </button>
                
                <button
                  onClick={nextTestimonial}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-colors z-10"
                >
                  <ChevronLeft size={24} className="text-gray-600" />
                </button>
              </>
            )}
          </div>

          {/* Dots Indicator */}
          {testimonials.length > 1 && (
            <div className="flex justify-center mt-8 space-x-2 space-x-reverse">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeIndex
                      ? "bg-primary-500 w-8"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Grid of All Testimonials */}
        {testimonials.length > 1 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                onHoverStart={() => setHoveredCard(testimonial.id)}
                onHoverEnd={() => setHoveredCard(null)}
                onClick={() => setActiveIndex(index)}
                className={`bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 ${
                  index === activeIndex ? "ring-2 ring-primary-500 ring-opacity-50" : ""
                }`}
              >
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover ml-3"
                  />
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 text-sm">
                      {testimonial.name}
                    </h4>
                    <p className="text-gray-600 text-xs">
                      {testimonial.company}
                    </p>
                  </div>
                </div>

                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className="text-yellow-400 fill-yellow-400 ml-1"
                    />
                  ))}
                </div>

                <p className="text-gray-700 text-sm leading-relaxed mb-4 line-clamp-3">
                  {testimonial.content}
                </p>

                <div className="bg-gradient-to-r from-primary-50 to-blue-50 rounded-lg p-3">
                  <div className="text-center">
                    <div className="text-lg font-bold text-primary-600">
                      {testimonial.results.value}
                    </div>
                    <div className="text-xs text-gray-600">
                      {testimonial.results.metric}
                    </div>
                  </div>
                </div>

                <motion.div
                  animate={{
                    scale: hoveredCard === testimonial.id ? 1.05 : 1,
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-primary-500/5 to-blue-500/5 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-300"
                />
              </motion.div>
            ))}
          </div>
        )}

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-white rounded-3xl shadow-lg p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              آماده‌اید تا شما هم جزو موفق‌ترین‌ها باشید؟
            </h3>
            <p className="text-gray-600 mb-6">
              همین امروز شروع کنید و تجربه رشد فوق‌العاده کسب‌وکارتان را با موج پیام آغاز کنید
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#pricing"
                className="btn btn-primary px-8 py-3"
              >
                شروع رایگان
              </a>
              <a
                href="#contact"
                className="btn btn-outline px-8 py-3"
              >
                مشاوره رایگان
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;