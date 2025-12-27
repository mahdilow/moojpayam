import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  BarChart3,
  FileText,
  DollarSign,
  Users,
  Eye,
  Edit,
  Trash2,
  Plus,
  LogOut,
  Activity,
  Megaphone,
} from "lucide-react";
import toast from "react-hot-toast";
import ImageUpload from "../components/ImageUpload";
import AdminLogsViewer from "../components/admin/AdminLogsViewer";
import AnnouncementManager from "../components/admin/AnnouncementManager";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  readTime: string;
  category: string;
  tags: string[];
  featured: boolean;
  published: boolean;
  views: number;
  date: string;
}

interface PricingPlan {
  id?: number;
  name: string;
  price: string;
  description: string;
  features: Array<{
    title: string;
    included: boolean;
  }>;
  cta: string;
  popular: boolean;
  color: string;
  active: boolean;
  discount?: number;
}

interface DashboardStats {
  totalPosts: number;
  totalViews: number;
  activePlans: number;
  draftPosts: number;
  mostViewedPost: {
    title: string;
    views: number;
  };
  recentViews: Array<{
    id: number;
    title: string;
    views: number;
    lastViewed: string;
  }>;
}

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [pricing, setPricing] = useState<PricingPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [showLogsViewer, setShowLogsViewer] = useState(false);
  const [showAnnouncementManager, setShowAnnouncementManager] = useState(false);

  // Blog form state
  const [showBlogForm, setShowBlogForm] = useState(false);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [blogForm, setBlogForm] = useState({
    title: "",
    excerpt: "",
    content: "",
    image: "",
    author: "تیم موج پیام",
    readTime: "5",
    category: "آموزش",
    tags: [] as string[],
    featured: false,
    published: true,
  });

  // Pricing form state
  const [showPricingForm, setShowPricingForm] = useState(false);
  const [editingPricing, setEditingPricing] = useState<PricingPlan | null>(
    null
  );
  const [pricingForm, setPricingForm] = useState({
    name: "",
    price: "",
    description: "",
    features: [] as Array<{ title: string; included: boolean }>,
    cta: "انتخاب پلن",
    popular: false,
    color: "border-blue-400",
    active: true,
    discount: 0,
  });

  const checkAuth = useCallback(async () => {
    try {
      const response = await fetch("/api/admin/verify", {
        credentials: "include",
      });
      if (!response.ok) {
        navigate("/mooj-admin");
        return;
      }
      setLoading(false);
    } catch (error) {
      console.error("Auth check failed:", error);
      navigate("/mooj-admin");
    }
  }, [navigate]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (activeTab === "dashboard") {
      loadStats();
    } else if (activeTab === "blogs") {
      loadBlogs();
    } else if (activeTab === "pricing") {
      loadPricing();
    }
  }, [activeTab]);

  const loadStats = async () => {
    try {
      const response = await fetch("/api/admin/stats", {
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error("Error loading stats:", error);
    }
  };

  const loadBlogs = async () => {
    try {
      const response = await fetch("/api/admin/blogs", {
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        setBlogs(data);
      }
    } catch (error) {
      console.error("Error loading blogs:", error);
    }
  };

  const loadPricing = async () => {
    try {
      const response = await fetch("/api/admin/pricing", {
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        setPricing(data);
      }
    } catch (error) {
      console.error("Error loading pricing:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", {
        method: "POST",
        credentials: "include",
      });
      navigate("/mooj-admin");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Blog management functions
  const handleSaveBlog = async () => {
    try {
      const url = editingBlog
        ? `/api/admin/blogs/${editingBlog.id}`
        : "/api/admin/blogs";
      const method = editingBlog ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(blogForm),
      });

      if (response.ok) {
        const { blog: newBlog } = await response.json();
        toast.success(editingBlog ? "مقاله ویرایش شد" : "مقاله جدید ایجاد شد");

        if (!editingBlog && newBlog?.slug) {
          navigate(`/blog/${newBlog.slug}`);
        } else {
          loadBlogs();
        }

        resetBlogForm();
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "خطا در ذخیره مقاله");
      }
    } catch (e) {
      console.error("Error saving blog:", e);
      toast.error("خطا در ذخیره مقاله");
    }
  };

  const handleEditBlog = (blog: BlogPost) => {
    setBlogForm({
      title: blog.title,
      excerpt: blog.excerpt,
      content: blog.content,
      image: blog.image,
      author: blog.author,
      readTime: blog.readTime,
      category: blog.category,
      tags: blog.tags,
      featured: blog.featured,
      published: blog.published,
    });
    setEditingBlog(blog);
    setShowBlogForm(true);
  };

  const handleDeleteBlog = async (id: number) => {
    if (!confirm("آیا از حذف این مقاله اطمینان دارید؟")) return;

    try {
      const response = await fetch(`/api/admin/blogs/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (response.ok) {
        toast.success("مقاله حذف شد");
        loadBlogs();
      } else {
        toast.error("خطا در حذف مقاله");
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
      toast.error("خطا در حذف مقاله");
    }
  };

  const resetBlogForm = () => {
    setBlogForm({
      title: "",
      excerpt: "",
      content: "",
      image: "",
      author: "تیم موج پیام",
      readTime: "5",
      category: "آموزش",
      tags: [],
      featured: false,
      published: true,
    });
    setEditingBlog(null);
    setShowBlogForm(false);
  };

  // Pricing management functions
  const handleSavePricing = async () => {
    try {
      const isEditing = editingPricing && editingPricing.id !== undefined;
      const url = isEditing
        ? `/api/admin/pricing/${editingPricing.id}`
        : "/api/admin/pricing";
      const method = isEditing ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(pricingForm),
      });

      if (response.ok) {
        toast.success(editingPricing ? "پلن ویرایش شد" : "پلن جدید ایجاد شد");
        loadPricing();
        resetPricingForm();
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "خطا در ذخیره پلن");
      }
    } catch (e) {
      console.error("Error saving pricing:", e);
      toast.error("خطا در ذخیره پلن");
    }
  };

  const handleEditPricing = (plan: PricingPlan) => {
    setPricingForm({
      name: plan.name,
      price: plan.price,
      description: plan.description,
      features: plan.features,
      cta: plan.cta,
      popular: plan.popular,
      color: plan.color,
      active: plan.active,
      discount: plan.discount || 0,
    });
    setEditingPricing(plan);
    setShowPricingForm(true);
  };

  const handleDeletePricing = async (id: number) => {
    if (!confirm("آیا از حذف این پلن اطمینان دارید؟")) return;

    try {
      const response = await fetch(`/api/admin/pricing/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (response.ok) {
        toast.success("پلن حذف شد");
        loadPricing();
      } else {
        toast.error("خطا در حذف پلن");
      }
    } catch (error) {
      console.error("Error deleting pricing:", error);
      toast.error("خطا در حذف پلن");
    }
  };

  const resetPricingForm = () => {
    setPricingForm({
      name: "",
      price: "",
      description: "",
      features: [],
      cta: "انتخاب پلن",
      popular: false,
      color: "border-blue-400",
      active: true,
      discount: 0,
    });
    setEditingPricing(null);
    setShowPricingForm(false);
  };

  const addFeature = () => {
    setPricingForm({
      ...pricingForm,
      features: [...pricingForm.features, { title: "", included: true }],
    });
  };

  const updateFeature = (index: number, field: string, value: string | boolean) => {
    const newFeatures = [...pricingForm.features];
    newFeatures[index] = { ...newFeatures[index], [field]: value };
    setPricingForm({ ...pricingForm, features: newFeatures });
  };

  const removeFeature = (index: number) => {
    setPricingForm({
      ...pricingForm,
      features: pricingForm.features.filter((_, i) => i !== index),
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <img
                src="/assets/logo.webp"
                alt="لوگو پنل پیامک موج پیام"
                className="h-10 w-auto ml-3"
              />
              <h1 className="text-2xl font-bold text-gray-900">
                پنل مدیریت موج پیام
              </h1>
            </div>
            <div className="flex items-center space-x-4 space-x-reverse">
              <button
                onClick={() => setShowLogsViewer(true)}
                className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Activity size={20} className="ml-2" />
                گزارش‌های فعالیت
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center px-4 py-2 text-red-600 hover:text-red-800 transition-colors"
              >
                <LogOut size={20} className="ml-2" />
                خروج
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8 space-x-reverse">
            {[
              { id: "dashboard", label: "داشبورد", icon: BarChart3 },
              { id: "blogs", label: "مقالات", icon: FileText },
              { id: "pricing", label: "تعرفه‌ها", icon: DollarSign },
              { id: "announcements", label: "اعلان‌ها", icon: Megaphone },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-4 py-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <tab.icon size={20} className="ml-2" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Dashboard Tab */}
        {activeTab === "dashboard" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <FileText className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="mr-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        مقالات منتشر شده
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {stats?.totalPosts || 0}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Eye className="h-8 w-8 text-green-600" />
                  </div>
                  <div className="mr-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        کل بازدیدها
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {stats?.totalViews?.toLocaleString("fa-IR") || 0}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <DollarSign className="h-8 w-8 text-purple-600" />
                  </div>
                  <div className="mr-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        پلن‌های فعال
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {stats?.activePlans || 0}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Users className="h-8 w-8 text-orange-600" />
                  </div>
                  <div className="mr-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        پیش‌نویس‌ها
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {stats?.draftPosts || 0}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">
                    محبوب‌ترین مقاله
                  </h3>
                </div>
                <div className="p-6">
                  {stats?.mostViewedPost ? (
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">
                        {stats.mostViewedPost.title}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {stats.mostViewedPost.views.toLocaleString("fa-IR")}{" "}
                        بازدید
                      </p>
                    </div>
                  ) : (
                    <p className="text-gray-500">هیچ مقاله‌ای وجود ندارد</p>
                  )}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">
                    آخرین بازدیدها
                  </h3>
                </div>
                <div className="p-6">
                  {stats?.recentViews && stats.recentViews.length > 0 ? (
                    <div className="space-y-3">
                      {stats.recentViews.slice(0, 5).map((post) => (
                        <div
                          key={post.id}
                          className="flex justify-between items-center"
                        >
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {post.title}
                            </p>
                            <p className="text-xs text-gray-500">
                              {post.views.toLocaleString("fa-IR")} بازدید
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">هیچ بازدیدی وجود ندارد</p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Blogs Tab */}
        {activeTab === "blogs" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                مدیریت مقالات
              </h2>
              <button
                onClick={() => setShowBlogForm(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
              >
                <Plus size={20} className="ml-2" />
                مقاله جدید
              </button>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      عنوان
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      دسته‌بندی
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      بازدید
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      وضعیت
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      عملیات
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {blogs.map((blog) => (
                    <tr key={blog.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img
                            className="h-10 w-10 rounded-lg object-cover ml-4"
                            src={blog.image}
                            alt={blog.title}
                          />
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {blog.title.substring(0, 50)}...
                            </div>
                            <div className="text-sm text-gray-500">
                              {blog.author}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          {blog.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {blog.views.toLocaleString("fa-IR")}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            blog.published
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {blog.published ? "منتشر شده" : "پیش‌نویس"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2 space-x-reverse">
                          <button
                            onClick={() => handleEditBlog(blog)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteBlog(blog.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Blog Form Modal */}
            {showBlogForm && (
              <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
                <div className="relative top-20 mx-auto p-5 border w-11/12 max-w-4xl shadow-lg rounded-md bg-white">
                  <div className="mt-3">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-medium text-gray-900">
                        {editingBlog ? "ویرایش مقاله" : "مقاله جدید"}
                      </h3>
                      <button
                        onClick={resetBlogForm}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          عنوان
                        </label>
                        <input
                          type="text"
                          value={blogForm.title}
                          onChange={(e) =>
                            setBlogForm({ ...blogForm, title: e.target.value })
                          }
                          className="w-full border border-gray-300 rounded-md p-2"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          دسته‌بندی
                        </label>
                        <select
                          value={blogForm.category}
                          onChange={(e) =>
                            setBlogForm({
                              ...blogForm,
                              category: e.target.value,
                            })
                          }
                          className="w-full border border-gray-300 rounded-md p-2"
                        >
                          <option value="آموزش">آموزش</option>
                          <option value="نکات">نکات</option>
                          <option value="بهینه‌سازی">بهینه‌سازی</option>
                          <option value="قوانین">قوانین</option>
                          <option value="تحلیل">تحلیل</option>
                          <option value="خلاقیت">خلاقیت</option>
                        </select>
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        خلاصه
                      </label>
                      <textarea
                        value={blogForm.excerpt}
                        onChange={(e) =>
                          setBlogForm({ ...blogForm, excerpt: e.target.value })
                        }
                        rows={3}
                        className="w-full border border-gray-300 rounded-md p-2"
                      />
                    </div>

                    <div className="mb-4">
                      <ImageUpload
                        value={blogForm.image}
                        onChange={(url) =>
                          setBlogForm({ ...blogForm, image: url })
                        }
                        label="تصویر مقاله"
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        محتوا
                      </label>
                      <textarea
                        value={blogForm.content}
                        onChange={(e) =>
                          setBlogForm({ ...blogForm, content: e.target.value })
                        }
                        rows={10}
                        className="w-full border border-gray-300 rounded-md p-2"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          نویسنده
                        </label>
                        <input
                          type="text"
                          value={blogForm.author}
                          onChange={(e) =>
                            setBlogForm({ ...blogForm, author: e.target.value })
                          }
                          className="w-full border border-gray-300 rounded-md p-2"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          زمان مطالعه (دقیقه)
                        </label>
                        <input
                          type="text"
                          value={blogForm.readTime}
                          onChange={(e) =>
                            setBlogForm({
                              ...blogForm,
                              readTime: e.target.value,
                            })
                          }
                          className="w-full border border-gray-300 rounded-md p-2"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          برچسب‌ها (با کاما جدا کنید)
                        </label>
                        <input
                          type="text"
                          value={blogForm.tags.join(", ")}
                          onChange={(e) =>
                            setBlogForm({
                              ...blogForm,
                              tags: e.target.value
                                .split(",")
                                .map((tag) => tag.trim()),
                            })
                          }
                          className="w-full border border-gray-300 rounded-md p-2"
                        />
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 space-x-reverse mb-4">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={blogForm.featured}
                          onChange={(e) =>
                            setBlogForm({
                              ...blogForm,
                              featured: e.target.checked,
                            })
                          }
                          className="ml-2"
                        />
                        مقاله ویژه
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={blogForm.published}
                          onChange={(e) =>
                            setBlogForm({
                              ...blogForm,
                              published: e.target.checked,
                            })
                          }
                          className="ml-2"
                        />
                        منتشر شده
                      </label>
                    </div>

                    <div className="flex justify-end space-x-3 space-x-reverse">
                      <button
                        onClick={resetBlogForm}
                        className="px-4 py-2 text-gray-600 hover:text-gray-800"
                      >
                        انصراف
                      </button>
                      <button
                        onClick={handleSaveBlog}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                      >
                        ذخیره
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* Pricing Tab */}
        {activeTab === "pricing" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                مدیریت تعرفه‌ها
              </h2>
              <button
                onClick={() => setShowPricingForm(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
              >
                <Plus size={20} className="ml-2" />
                پلن جدید
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pricing.map((plan, index) => (
                <div
                  key={plan.id ?? index}
                  className="bg-white rounded-lg shadow-lg overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">
                          {plan.name}
                        </h3>
                        <p className="text-gray-600">{plan.description}</p>
                      </div>
                      <div className="flex space-x-2 space-x-reverse">
                        <button
                          onClick={() => handleEditPricing(plan)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Edit size={16} />
                        </button>
                        {plan.id !== undefined && (
                          <button
                            onClick={() => handleDeletePricing(plan.id!)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="mb-4">
                      <span className="text-3xl font-bold text-gray-900">
                        {plan.price}
                      </span>
                      {plan.id !== 3 && (
                        <span className="text-gray-600 mr-2">
                          هزار تومان / سالانه
                        </span>
                      )}
                      {plan.discount && plan.discount > 0 && (
                        <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs mr-2">
                          {plan.discount}% تخفیف
                        </span>
                      )}
                    </div>

                    <div className="space-y-2 mb-4">
                      {plan.features.slice(0, 3).map((feature, index) => (
                        <div key={index} className="flex items-center">
                          <span
                            className={`w-4 h-4 rounded-full ml-2 ${
                              feature.included ? "bg-green-500" : "bg-gray-300"
                            }`}
                          ></span>
                          <span className="text-sm text-gray-700">
                            {feature.title}
                          </span>
                        </div>
                      ))}
                      {plan.features.length > 3 && (
                        <p className="text-sm text-gray-500">
                          و {plan.features.length - 3} ویژگی دیگر...
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          plan.active
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {plan.active ? "فعال" : "غیرفعال"}
                      </span>
                      {plan.popular && (
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                          محبوب
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pricing Form Modal */}
            {showPricingForm && (
              <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
                <div className="relative top-20 mx-auto p-5 border w-11/12 max-w-4xl shadow-lg rounded-md bg-white">
                  <div className="mt-3">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-medium text-gray-900">
                        {editingPricing ? "ویرایش پلن" : "پلن جدید"}
                      </h3>
                      <button
                        onClick={resetPricingForm}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          نام پلن
                        </label>
                        <input
                          type="text"
                          value={pricingForm.name}
                          onChange={(e) =>
                            setPricingForm({
                              ...pricingForm,
                              name: e.target.value,
                            })
                          }
                          className="w-full border border-gray-300 rounded-md p-2"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          قیمت
                        </label>
                        <input
                          type="text"
                          value={pricingForm.price}
                          onChange={(e) =>
                            setPricingForm({
                              ...pricingForm,
                              price: e.target.value,
                            })
                          }
                          className="w-full border border-gray-300 rounded-md p-2"
                        />
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        توضیحات
                      </label>
                      <textarea
                        value={pricingForm.description}
                        onChange={(e) =>
                          setPricingForm({
                            ...pricingForm,
                            description: e.target.value,
                          })
                        }
                        rows={3}
                        className="w-full border border-gray-300 rounded-md p-2"
                      />
                    </div>

                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <label className="block text-sm font-medium text-gray-700">
                          ویژگی‌ها
                        </label>
                        <button
                          onClick={addFeature}
                          className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                        >
                          افزودن ویژگی
                        </button>
                      </div>
                      <div className="space-y-2">
                        {pricingForm.features.map((feature, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <input
                              type="text"
                              value={feature.title}
                              onChange={(e) =>
                                updateFeature(index, "title", e.target.value)
                              }
                              className="flex-1 border border-gray-300 rounded-md p-2"
                              placeholder="عنوان ویژگی"
                            />
                            <label className="flex items-center">
                              <input
                                type="checkbox"
                                checked={feature.included}
                                onChange={(e) =>
                                  updateFeature(
                                    index,
                                    "included",
                                    e.target.checked
                                  )
                                }
                                className="ml-1"
                              />
                              شامل
                            </label>
                            <button
                              onClick={() => removeFeature(index)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          متن دکمه
                        </label>
                        <input
                          type="text"
                          value={pricingForm.cta}
                          onChange={(e) =>
                            setPricingForm({
                              ...pricingForm,
                              cta: e.target.value,
                            })
                          }
                          className="w-full border border-gray-300 rounded-md p-2"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          درصد تخفیف
                        </label>
                        <input
                          type="number"
                          value={pricingForm.discount}
                          onChange={(e) =>
                            setPricingForm({
                              ...pricingForm,
                              discount: parseInt(e.target.value) || 0,
                            })
                          }
                          className="w-full border border-gray-300 rounded-md p-2"
                          min="0"
                          max="100"
                        />
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 space-x-reverse mb-4">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={pricingForm.popular}
                          onChange={(e) =>
                            setPricingForm({
                              ...pricingForm,
                              popular: e.target.checked,
                            })
                          }
                          className="ml-2"
                        />
                        پلن محبوب
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={pricingForm.active}
                          onChange={(e) =>
                            setPricingForm({
                              ...pricingForm,
                              active: e.target.checked,
                            })
                          }
                          className="ml-2"
                        />
                        فعال
                      </label>
                    </div>

                    <div className="flex justify-end space-x-3 space-x-reverse">
                      <button
                        onClick={resetPricingForm}
                        className="px-4 py-2 text-gray-600 hover:text-gray-800"
                      >
                        انصراف
                      </button>
                      <button
                        onClick={handleSavePricing}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                      >
                        ذخیره
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* Announcements Tab */}
        {activeTab === "announcements" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                مدیریت اعلان‌ها
              </h2>
              <button
                onClick={() => setShowAnnouncementManager(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
              >
                <Megaphone size={20} className="ml-2" />
                مدیریت اعلان‌ها
              </button>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-center py-12">
                <Megaphone size={48} className="mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  مدیریت اعلان‌های سایت
                </h3>
                <p className="text-gray-500 mb-6">
                  از این بخش می‌توانید اعلان‌های بالای سایت را مدیریت کنید
                </p>
                <button
                  onClick={() => setShowAnnouncementManager(true)}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center mx-auto"
                >
                  <Megaphone size={20} className="ml-2" />
                  باز کردن پنل مدیریت
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Admin Logs Viewer */}
      <AdminLogsViewer
        isOpen={showLogsViewer}
        onClose={() => setShowLogsViewer(false)}
      />

      {/* Announcement Manager */}
      <AnnouncementManager
        isOpen={showAnnouncementManager}
        onClose={() => setShowAnnouncementManager(false)}
      />
    </div>
  );
};

export default AdminDashboard;
