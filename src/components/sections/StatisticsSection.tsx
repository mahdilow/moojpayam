import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface StatItemProps {
  value: number;
  label: string;
  suffix?: string;
  delay: number;
}

const StatItem: React.FC<StatItemProps> = ({
  value,
  label,
  suffix = "",
  delay,
}) => {
  const [count, setCount] = useState(0);
  const counterRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.4 }
    );

    const current = counterRef.current; // ✅ cache the ref

    if (current) {
      observer.observe(current);
    }

    return () => {
      if (current) {
        observer.unobserve(current); // ✅ use cached ref here
      }
    };
  }, []);

  useEffect(() => {
    if (!inView) return;

    let start = 0;
    const duration = 1500;
    const increment = value / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <motion.div
      ref={counterRef}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      className="text-center"
    >
      <div className="text-4xl lg:text-5xl font-bold text-white mb-2 drop-shadow-md">
        {count.toLocaleString("fa-IR")}
        {suffix}
      </div>
      <div className="text-lg text-white/90">{label}</div>
    </motion.div>
  );
};

const StatisticsSection: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4 text-gray-900"
          >
            آمار <span className="text-primary-500">موج پیام</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            عملکرد ما در یک نگاه
          </motion.p>
        </div>

        <div className="relative overflow-hidden rounded-2xl p-8 lg:p-12 shadow-lg bg-gradient-to-br from-blue-500 to-purple-500">
          {/* Glass effect overlay only (removes double animations) */}
          <div className="absolute inset-0 backdrop-blur-sm bg-white/10 rounded-2xl"></div>

          <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-8">
            <StatItem
              value={98}
              label="مشتری ها از ما راضی هستند"
              suffix="%"
              delay={0.1}
            />
            <StatItem
              value={450}
              label="هزار پیامک ارسالی"
              suffix="+"
              delay={0.2}
            />
            <StatItem
              value={99.9}
              label="درصد تحویل موفق"
              suffix="%"
              delay={0.3}
            />
            <StatItem value={3} label="سال سابقه فعالیت" delay={0.4} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;
