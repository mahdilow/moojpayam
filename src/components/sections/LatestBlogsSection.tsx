import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowLeft, Clock, Eye, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useContentData } from '../../hooks/useContentData';

const LatestBlogsSection: React.FC = () => {
  const { latestBlogs, loading, error } = useContentData();

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
            <p className="text-gray-600">در حال بارگذاری مقالات...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error || latestBlogs.length === 0) {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-red-600">{error || 'مقاله‌ای یافت نشد'}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white">
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
            <BookOpen className="w-5 h-5 ml-2" />
            <span className="font-semibold">آخرین مقالات</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4 text-gray-900"
          >
            از <span className="text-primary-500 relative">
              بلاگ ما
              <span className="absolute bottom-0 left-0 w-full h-1 bg-primary-500/30 rounded-full"></span>
            </span> بخوانید
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            آخرین نکات، راهنماها و استراتژی‌های موثر در پیامک بازاریابی
          </motion.p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {latestBlogs.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ 
                y: -10,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
              }}
              transition={{ 
                duration: 0.3,
                delay: index * 0.1,
                type: "spring",
                stiffness: 300
              }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden group cursor-pointer"
            >
              <div className="relative overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Category Badge */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur text-primary-600 px-3 py-1 rounded-full text-sm font-medium">
                  {post.category}
                </div>
                
                {/* Views Counter */}
                <div className="absolute bottom-4 left-4 flex items-center text-white text-sm bg-black/50 backdrop-blur px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Eye size={14} className="ml-1" />
                  {post.views.toLocaleString()}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-primary-600 transition-colors line-clamp-2">
                  <Link to={`/blog/${post.id}`}>
                    {post.title}
                  </Link>
                </h3>
                
                <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
                
                {/* Meta Information */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <User size={14} className="ml-1" />
                    <span className="truncate">{post.author}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock size={14} className="ml-1" />
                    {post.readTime}
                  </div>
                </div>
                
                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center text-gray-500 text-sm">
                    <Calendar size={14} className="ml-1" />
                    {post.date}
                  </div>
                  <Link
                    to={`/blog/${post.id}`}
                    className="text-primary-500 hover:text-primary-600 font-medium text-sm flex items-center group-hover:translate-x-1 transition-transform"
                  >
                    ادامه مطالعه
                    <ArrowLeft size={16} className="mr-1" />
                  </Link>
                </div>
              </div>
              
              {/* Hover Effect Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </motion.article>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              مقالات بیشتری می‌خواهید؟
            </h3>
            <p className="text-gray-600 mb-6">
              در بلاگ ما مقالات جامع و کاربردی بیشتری در انتظار شماست
            </p>
            <Link
              to="/blog"
              className="btn btn-primary inline-flex items-center"
            >
              <span>مشاهده همه مقالات</span>
              <ArrowLeft size={20} className="mr-2" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LatestBlogsSection;