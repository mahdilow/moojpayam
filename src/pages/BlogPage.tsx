import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, User, ArrowLeft, Search, Clock, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { useContentData } from "../hooks/useContentData";

const BlogPage: React.FC = () => {
  const { blogs, featuredBlog, loading, error } = useContentData();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("همه");
  const [visibleCount, setVisibleCount] = useState(3);

  const categories = [
    "همه",
    "آموزش",
    "نکات",
    "بهینه‌سازی",
    "قوانین",
    "تحلیل",
    "خلاقیت",
  ];

  const filteredPosts = blogs.filter((post) => {
    const matchesSearch =
      post.title.includes(searchTerm) || post.excerpt.includes(searchTerm);
    const matchesCategory =
      selectedCategory === "همه" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const regularPosts = filteredPosts.filter((post) => !post.featured);

  const visiblePosts = regularPosts.slice(0, visibleCount);

  if (loading) {
    return (
      <div className="py-20 bg-gradient-to-br from-white to-blue-50 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
            <p className="text-gray-600">در حال بارگذاری مقالات...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-20 bg-gradient-to-br from-white to-blue-50 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-20 bg-gradient-to-br from-white to-blue-50 min-h-screen">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center bg-blue-100 text-primary-500 px-4 py-2 rounded-full mb-6"
          >
            <span className="font-semibold">بلاگ موج پیام</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-4 text-gray-900"
          >
            آخرین{" "}
            <span className="text-primary-500 relative">
              مقالات
              <span className="absolute bottom-0 left-0 w-full h-1 bg-primary-500/30 rounded-full"></span>
            </span>{" "}
            و راهنماها
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            با آخرین نکات، ترفندها و استراتژی‌های پیامک بازاریابی آشنا شوید
          </motion.p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-12 max-w-4xl mx-auto">
          <div className="relative flex-1">
            <Search
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="جستجو در مقالات..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-300 focus:border-primary-500 outline-none"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-xl whitespace-nowrap transition-all ${
                  selectedCategory === category
                    ? "bg-primary-500 text-white"
                    : "bg-white text-gray-600 hover:bg-gray-50"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Post */}
        {featuredBlog && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative">
                  <img
                    src={featuredBlog.image}
                    alt={featuredBlog.title}
                    className="w-full h-64 lg:h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    ویژه
                  </div>
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="bg-primary-100 text-primary-600 px-3 py-1 rounded-full text-sm font-medium">
                      {featuredBlog.category}
                    </span>
                    <div className="flex items-center text-gray-500 text-sm">
                      <Eye size={16} className="ml-1" />
                      {featuredBlog.views.toLocaleString()}
                    </div>
                  </div>

                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                    {featuredBlog.title}
                  </h2>

                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {featuredBlog.excerpt}
                  </p>

                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center text-gray-500 text-sm">
                      <User size={16} className="ml-2" />
                      {featuredBlog.author}
                    </div>
                    <div className="flex items-center text-gray-500 text-sm">
                      <Calendar size={16} className="ml-2" />
                      {featuredBlog.date}
                    </div>
                    <div className="flex items-center text-gray-500 text-sm">
                      <Clock size={16} className="ml-2" />
                      {featuredBlog.readTime}
                    </div>
                  </div>

                  <Link
                    to={`/blog/${featuredBlog.id}`}
                    className="btn btn-primary inline-flex items-center w-fit"
                  >
                    <span>ادامه مطالعه</span>
                    <ArrowLeft size={20} className="mr-2" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Regular Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visiblePosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="relative">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur text-primary-600 px-3 py-1 rounded-full text-sm font-medium">
                  {post.category}
                </div>
                <div className="absolute bottom-4 left-4 flex items-center text-white text-sm bg-black/50 backdrop-blur px-2 py-1 rounded-full">
                  <Eye size={14} className="ml-1" />
                  {post.views.toLocaleString()}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight hover:text-primary-600 transition-colors">
                  <Link to={`/blog/${post.id}`}>{post.title}</Link>
                </h3>

                <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="bg-gray-100 text-gray-600 px-2 py-1 rounded-lg text-xs"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <User size={14} className="ml-1" />
                    {post.author}
                  </div>
                  <div className="flex items-center">
                    <Clock size={14} className="ml-1" />
                    {post.readTime}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-500 text-sm">{post.date}</span>
                  <Link
                    to={`/blog/${post.id}`}
                    className="text-primary-500 hover:text-primary-600 font-medium text-sm flex items-center"
                  >
                    ادامه مطالعه
                    <ArrowLeft size={16} className="mr-1" />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Load More Button */}
        {visibleCount < regularPosts.length && (
          <div className="flex justify-center mt-8">
            <button
              className="btn btn-primary px-8 py-3 rounded-xl text-lg font-bold shadow-md hover:bg-primary-600 transition-colors"
              onClick={() => setVisibleCount((c) => c + 3)}
            >
              مشاهده بیشتر
            </button>
          </div>
        )}

        {/* No Results */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <Search size={64} className="mx-auto" />
            </div>
            <h3 className="text-xl font-bold text-gray-600 mb-2">
              نتیجه‌ای یافت نشد
            </h3>
            <p className="text-gray-500">
              لطفاً کلمات کلیدی دیگری را امتحان کنید
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPage;
