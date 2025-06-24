import React from "react";
import { motion } from "framer-motion";

interface LoadingScreenProps {
  isLoading: boolean;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center"
    >
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatType: "loop",
        }}
        className="relative mb-6"
      >
        <img src={"/assets/logo.png"} alt="موج پیام" className="h-32 w-auto" />
      </motion.div>

      <motion.div
        className="brand-name text-4xl mb-8"
        animate={{
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "loop",
        }}
      >
        موج پیام
      </motion.div>

      <div className="flex space-x-2">
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            className="w-4 h-4 rounded-full bg-gradient-to-r from-blue-500 to-teal-400"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              repeatType: "loop",
              delay: index * 0.2,
            }}
          />
        ))}
      </div>

      <motion.p
        className="mt-6 text-gray-600 font-vazir"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      ></motion.p>
    </motion.div>
  );
};

export default LoadingScreen;
