import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Calendar,
  User,
  Clock,
  Eye,
  ArrowRight,
  Share2,
  BookOpen,
} from "lucide-react";
import SEOHead from "../components/SEOHead";
import toast from "react-hot-toast";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  date: string;
  readTime: string;
  views: number;
  category: string;
  tags: string[];
  published: boolean;
  slug?: string;
  metaDescription?: string;
  relatedPosts?: BlogPost[];
  createdAt?: string;
  updatedAt?: string;
}

const BlogPostPage: React.FC = () => {
  const { id } = useParams();
  const [blogPost, setBlogPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewTracked, setViewTracked] = useState(false);

  useEffect(() => {
    const loadBlogPost = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`/api/content/blogs/${id}`);

        if (!response.ok) {
          if (response.status === 404) {
            setError("مقاله یافت نشد");
          } else {
            setError("خطا در بارگذاری مقاله");
          }
          return;
        }

        const data = await response.json();
        setBlogPost(data);

        // Track view after successful load
        if (!viewTracked) {
          trackView();
        }
      } catch (err) {
        setError("خطا در ارتباط با سرور");
        console.error("Error loading blog post:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadBlogPost();
    }
  }, [id, viewTracked]);

  const trackView = async () => {
    try {
      const response = await fetch(`/api/blog/${id}/view`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setViewTracked(true);

        // Update view count in state
        setBlogPost((prev) => (prev ? { ...prev, views: data.views } : null));
      }
    } catch (error) {
      console.error("Error tracking view:", error);
      // Don't show error to user for view tracking
    }
  };

  const sharePost = async () => {
    if (navigator.share && blogPost) {
      try {
        await navigator.share({
          title: blogPost.title,
          text: blogPost.excerpt,
          url: window.location.href,
        });
      } catch (error) {
        console.error("Share Post error", error);
        // Fallback to copying URL
        copyToClipboard();
      }
    } else {
      copyToClipboard();
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        toast.success("لینک با موفقیت کپی شد ✅");
      })
      .catch(() => {
        toast.error("خطا در کپی لینک ❌");
      });
  };

  if (loading) {
    return (
      <>
        <SEOHead title="در حال بارگذاری..." noindex={true} />
        <div className="py-20 bg-white min-h-screen">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
              <p className="text-gray-600">در حال بارگذاری مقاله...</p>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (error || !blogPost) {
    return (
      <>
        <SEOHead
          title="مقاله یافت نشد"
          description="متأسفانه مقاله مورد نظر یافت نشد."
          noindex={true}
        />
        <div className="py-20 bg-white min-h-screen">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-800 mb-4">
                {error || "مقاله یافت نشد"}
              </h1>
              <Link to="/blog" className="btn btn-primary">
                بازگشت به بلاگ
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Generate structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blogPost.title,
    description: blogPost.metaDescription || blogPost.excerpt,
    image: {
      "@type": "ImageObject",
      url: blogPost.image,
      width: 1200,
      height: 630,
    },
    author: {
      "@type": "Person",
      name: blogPost.author,
    },
    publisher: {
      "@type": "Organization",
      name: "موج پیام",
      logo: {
        "@type": "ImageObject",
        url: "https://moojpayam.ir/assets/logo.png",
        width: 200,
        height: 200,
      },
    },
    datePublished: blogPost.createdAt || blogPost.date,
    dateModified: blogPost.updatedAt || blogPost.createdAt || blogPost.date,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": window.location.href,
    },
    keywords: blogPost.tags.join(", "),
    articleSection: blogPost.category,
    wordCount: blogPost.content.replace(/<[^>]*>/g, "").split(" ").length,
    url: window.location.href,
    isPartOf: {
      "@type": "Blog",
      name: "بلاگ موج پیام",
      url: "https://moojpayam.ir/blog",
    },
  };

  return (
    <>
      <SEOHead
        title={blogPost.title}
        description={blogPost.metaDescription || blogPost.excerpt}
        keywords={`${blogPost.tags.join(", ")}, ${
          blogPost.category
        }, موج پیام, پیامک`}
        image={blogPost.image}
        url={window.location.href}
        type="article"
        author={blogPost.author}
        publishedTime={blogPost.createdAt}
        modifiedTime={blogPost.updatedAt}
        section={blogPost.category}
        tags={blogPost.tags}
      />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>

      <div className="py-20 bg-white min-h-screen">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="flex items-center text-sm text-gray-500">
              <Link to="/" className="hover:text-primary-500">
                خانه
              </Link>
              <span className="mx-2">/</span>
              <Link to="/blog" className="hover:text-primary-500">
                بلاگ
              </Link>
              <span className="mx-2">/</span>
              <span className="text-gray-900">{blogPost.category}</span>
            </div>
          </motion.nav>

          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <motion.header
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="bg-primary-100 text-primary-600 px-3 py-1 rounded-full text-sm font-medium">
                  {blogPost.category}
                </span>
                <div className="flex items-center text-gray-500 text-sm">
                  <Eye size={16} className="ml-1" />
                  {blogPost.views.toLocaleString()} بازدید
                </div>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                {blogPost.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-gray-500 text-sm mb-8">
                <div className="flex items-center">
                  <User size={16} className="ml-2" />
                  {blogPost.author}
                </div>
                <div className="flex items-center">
                  <Calendar size={16} className="ml-2" />
                  {blogPost.date}
                </div>
                <div className="flex items-center">
                  <Clock size={16} className="ml-2" />
                  {blogPost.readTime}
                </div>
                <button
                  onClick={sharePost}
                  className="flex items-center hover:text-primary-500 transition-colors"
                >
                  <Share2 size={16} className="ml-1" />
                  اشتراک‌گذاری
                </button>
              </div>

              <div className="flex flex-wrap gap-2 mb-8">
                {blogPost.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm hover:bg-primary-100 hover:text-primary-600 transition-colors cursor-pointer"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </motion.header>

            {/* Featured Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-12"
            >
              <img
                src={blogPost.image}
                alt={blogPost.title}
                className="w-full h-64 md:h-96 object-cover rounded-2xl shadow-lg"
                loading="eager"
              />
            </motion.div>

            {/* Content */}
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="prose prose-lg max-w-none mb-12"
              style={{
                fontSize: "18px",
                lineHeight: "1.8",
                color: "#374151",
              }}
            >
              <div
                dangerouslySetInnerHTML={{ __html: blogPost.content }}
                className="blog-content"
              />
            </motion.article>

            {/* Share Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 mb-12 text-center"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                این مقاله برایتان مفید بود؟
              </h3>
              <p className="text-gray-600 mb-6">
                آن را با دوستان و همکاران خود به اشتراک بگذارید
              </p>
              <div className="flex justify-center gap-4">
                <button onClick={sharePost} className="btn btn-primary">
                  اشتراک‌گذاری
                </button>
                <Link to="/blog" className="btn btn-outline">
                  مقالات بیشتر
                </Link>
              </div>
            </motion.div>

            {/* Related Posts */}
            {blogPost.relatedPosts && blogPost.relatedPosts.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
                  <BookOpen className="ml-2" />
                  مقالات مرتبط
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {blogPost.relatedPosts.map((post) => (
                    <Link
                      key={post.id}
                      to={`/blog/${post.id}`}
                      className="group bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
                    >
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      <div className="p-4">
                        <h4 className="font-bold text-gray-900 group-hover:text-primary-600 transition-colors mb-2 line-clamp-2">
                          {post.title}
                        </h4>
                        <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center justify-between text-gray-500 text-sm">
                          <div className="flex items-center">
                            <Calendar size={14} className="ml-1" />
                            {post.date}
                          </div>
                          <div className="flex items-center">
                            <Eye size={14} className="ml-1" />
                            {post.views.toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </motion.section>
            )}

            {/* Back to Blog */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-center mt-12"
            >
              <Link
                to="/blog"
                className="inline-flex items-center text-primary-500 hover:text-primary-600 font-medium"
              >
                <ArrowRight size={20} className="ml-2" />
                بازگشت به بلاگ
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogPostPage;
