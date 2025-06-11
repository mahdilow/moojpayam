import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { motion } from "framer-motion";
import { CheckCircle, Shield, Lock, User } from "lucide-react";
import toast from 'react-hot-toast';

const AdminLogin: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await fetch("/api/mooj-admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: 'include',
        body: JSON.stringify({ username, password }),
      });
      
      const data = await res.json();
      
      if (res.ok) {
        setSuccess(data.message);
        toast.success('ورود موفقیت‌آمیز!');
        setTimeout(() => navigate("/admin/dashboard"), 1500);
      } else {
        toast.error(data.message || "خطا در ورود");
      }
    } catch (err) {
      toast.error("خطا در ارتباط با سرور");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center py-12 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden relative">
            {success && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 flex flex-col items-center justify-center bg-white bg-opacity-95 rounded-3xl z-10"
              >
                <CheckCircle className="text-green-500 mb-4" size={60} />
                <h4 className="text-xl font-bold text-green-600 mb-2">
                  ورود موفقیت‌آمیز!
                </h4>
                <p className="text-gray-700 text-center px-4">{success}</p>
                <div className="mt-4 flex space-x-2">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.6, delay: i * 0.1, repeat: Infinity }}
                      className="w-2 h-2 bg-green-500 rounded-full"
                    />
                  ))}
                </div>
              </motion.div>
            )}

            {/* Header */}
            <div className="bg-gradient-to-r from-primary-500 to-blue-600 p-8 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white rounded-full p-4 inline-flex mb-4"
              >
                <Shield className="text-primary-500" size={32} />
              </motion.div>
              <h2 className="text-2xl font-bold text-white mb-2">
                پنل مدیریت موج پیام
              </h2>
              <p className="text-blue-100">
                ورود به سیستم مدیریت محتوا
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <User size={16} className="ml-2 text-gray-500" />
                  نام کاربری
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-500 transition-all"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  autoFocus
                  disabled={!!success}
                  placeholder="نام کاربری خود را وارد کنید"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <Lock size={16} className="ml-2 text-gray-500" />
                  رمز عبور
                </label>
                <input
                  type="password"
                  className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-500 transition-all"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={!!success}
                  placeholder="رمز عبور خود را وارد کنید"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-primary-500 to-blue-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                disabled={loading || !!success}
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white ml-2"></div>
                    در حال ورود...
                  </>
                ) : (
                  <>
                    <Shield size={20} className="ml-2" />
                    ورود به پنل مدیریت
                  </>
                )}
              </button>
            </form>

            {/* Security Notice */}
            <div className="bg-gray-50 p-6 text-center border-t border-gray-200">
              <p className="text-xs text-gray-500 flex items-center justify-center">
                <Lock size={12} className="ml-1" />
                ورود امن با رمزنگاری SSL
              </p>
            </div>
          </div>

          {/* Additional Security Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 text-center"
          >
            <div className="bg-white/80 backdrop-blur rounded-2xl p-4 shadow-md">
              <p className="text-sm text-gray-600">
                🔒 این صفحه محافظت شده و تنها برای مدیران سیستم قابل دسترسی است
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </MainLayout>
  );
};

export default AdminLogin;