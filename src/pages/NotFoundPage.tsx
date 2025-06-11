import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4">
        <div className="max-w-lg w-full">
          <div className="flex flex-col items-center mb-8">
            <AlertTriangle className="text-blue-500 mb-4" size={64} />
            <h1 className="text-7xl md:text-8xl font-extrabold text-blue-600 mb-2">
              404
            </h1>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              صفحه مورد نظر پیدا نشد
            </h2>
            <p className="text-gray-500 mb-6 text-lg">
              متاسفیم، صفحه‌ای که به دنبال آن بودید وجود ندارد یا ممکن است حذف
              شده باشد.
            </p>
            <Link
              to="/"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition font-semibold text-lg"
            >
              بازگشت به صفحه اصلی
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFoundPage;
