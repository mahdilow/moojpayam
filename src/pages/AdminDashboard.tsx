import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart3,
  FileText,
  DollarSign,
  MessageSquare,
  Plus,
  Edit,
  Trash2,
  Eye,
  LogOut,
  Save,
  X,
  TrendingUp,
  Activity,
  CheckCircle,
  Clock,
} from "lucide-react";
import toast from "react-hot-toast";
import ImageUpload from "../components/ImageUpload";
import AdminLogsViewer from "../components/admin/AdminLogsViewer";

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
  featured?: boolean;
  published: boolean;
  relatedPosts?: number[];
  createdAt?: string;
  updatedAt?: string;
}

interface PricingPlan {
  id: number;
  name: string;
  price: string;
  description: string;
  features: Array<{
    title: string;
    included: boolean;
  }>;
  cta: string;
  popular?: boolean;
  color: string;
  active: boolean;
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

// Notification type
interface Notification {
  id: string;
  type: string;
  message: string;
  read: boolean;
  createdAt: string;
  data?: any;
}

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Blog state
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [showBlogForm, setShowBlogForm] = useState(false);

  // Pricing state
  const [pricing, setPricing] = useState<PricingPlan[]>([]);
  const [editingPlan, setEditingPlan] = useState<PricingPlan | null>(null);
  const [showPlanForm, setShowPlanForm] = useState(false);

  const [showLogsViewer, setShowLogsViewer] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (activeTab === "dashboard") {
      loadStats();
      loadNotifications();
    } else if (activeTab === "blogs") {
      loadBlogs();
    } else if (activeTab === "pricing") {
      loadPricing();
    }
  }, [activeTab]);

  const checkAuth = async () => {
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
      console.error("Navigation to /mooj-admin error:", error);
      navigate("/mooj-admin");
    }
  };

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
      console.error("Error loading the Stats:", error);
      toast.error("خطا در بارگذاری آمار");
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
      console.error("Loading blogs error:", error);
      toast.error("خطا در بارگذاری مقالات");
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
      console.error("Loading pricing plans error:", error);
      toast.error("خطا در بارگذاری تعرفه‌ها");
    }
  };

  const loadNotifications = async () => {
    try {
      const response = await fetch("/api/admin/notifications", {
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        setNotifications(data);
      }
    } catch (error) {
      console.error("Fetching notifications error:", error);
      toast.error("خطا در دریافت اعلان‌ها");
    }
  };

  const markNotificationRead = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/notifications/read/${id}`, {
        method: "POST",
        credentials: "include",
      });
      if (response.ok) {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
      } else {
        toast.error("خطا در حذف اعلان");
      }
    } catch (error) {
      console.error("Delete notification error:", error);
      toast.error("خطا در حذف اعلان");
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
      toast.error("خطا در خروج");
    }
  };

  // Blog functions
  const saveBlog = async (blogData: Partial<BlogPost>) => {
    try {
      const url = editingBlog
        ? `/api/admin/blogs/${editingBlog.id}`
        : "/api/admin/blogs";

      const method = editingBlog ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(blogData),
      });

      if (response.ok) {
        toast.success(editingBlog ? "مقاله ویرایش شد" : "مقاله ایجاد شد");
        setShowBlogForm(false);
        setEditingBlog(null);
        loadBlogs();
      } else {
        const error = await response.json();
        toast.error(error.message || "خطا در ذخیره مقاله");
      }
    } catch (error) {
      console.error("Server connection error:", error);
      toast.error("خطا در ارتباط با سرور");
    }
  };

  const deleteBlog = async (id: number) => {
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
      console.error("Server connection error:", error);
      toast.error("خطا در ارتباط با سرور");
    }
  };

  // Pricing functions
  const savePlan = async (planData: Partial<PricingPlan>) => {
    try {
      const url = editingPlan
        ? `/api/admin/pricing/${editingPlan.id}`
        : "/api/admin/pricing";

      const method = editingPlan ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(planData),
      });

      if (response.ok) {
        toast.success(editingPlan ? "پلن ویرایش شد" : "پلن ایجاد شد");
        setShowPlanForm(false);
        setEditingPlan(null);
        loadPricing();
      } else {
        toast.error("خطا در ذخیره پلن");
      }
    } catch (error) {
      console.error("Server connection error:", error);
      toast.error("خطا در ارتباط با سرور");
    }
  };

  const deletePlan = async (id: number) => {
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
      console.error("Server connection error:", error);
      toast.error("خطا در ارتباط با سرور");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-gray-600">در حال بارگذاری پنل مدیریت...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex" dir="rtl">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-800">
            پنل مدیریت موج پیام
          </h1>
        </div>

        <nav className="mt-6">
          <div className="px-6 space-y-2">
            <div className="flex flex-col gap-2 mb-8">
              <button
                className={`flex items-center w-full px-4 py-3 rounded-lg transition-colors text-right text-base font-medium
                  ${
                    activeTab === "dashboard"
                      ? "bg-blue-100 text-blue-700 font-bold shadow"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                onClick={() => setActiveTab("dashboard")}
              >
                <BarChart3 className="ml-2" size={18} /> داشبورد
              </button>
              <button
                className={`flex items-center w-full px-4 py-3 rounded-lg transition-colors text-right text-base font-medium
                  ${
                    activeTab === "blogs"
                      ? "bg-blue-100 text-blue-700 font-bold shadow"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                onClick={() => setActiveTab("blogs")}
              >
                <FileText className="ml-2" size={18} /> مقالات
              </button>
              <button
                className={`flex items-center w-full px-4 py-3 rounded-lg transition-colors text-right text-base font-medium
                  ${
                    activeTab === "pricing"
                      ? "bg-blue-100 text-blue-700 font-bold shadow"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                onClick={() => setActiveTab("pricing")}
              >
                <DollarSign className="ml-2" size={18} /> تعرفه‌ها
              </button>
              <button
                className={`flex items-center w-full px-4 py-3 rounded-lg transition-colors text-right text-base font-medium
                  ${
                    showLogsViewer
                      ? "bg-blue-100 text-blue-700 font-bold shadow"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                onClick={() => setShowLogsViewer(true)}
              >
                <Activity className="ml-2" size={18} /> گزارش‌ها
              </button>
            </div>
          </div>
        </nav>

        <div className="absolute bottom-6 left-6 right-6">
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut className="ml-3" size={20} />
            خروج
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Dashboard Tab */}
          {activeTab === "dashboard" && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-8">داشبورد</h2>
              {notifications.length > 0 && (
                <div className="mb-6">
                  <div className="bg-white border-l-4 border-blue-500 rounded-xl shadow p-4 flex flex-col gap-3">
                    <div className="flex items-center mb-2">
                      <MessageSquare className="text-blue-500 ml-2" size={22} />
                      <span className="font-bold text-blue-700 text-lg">
                        اعلان‌های جدید فرم تماس
                      </span>
                    </div>
                    {notifications.map((notif) => (
                      <div
                        key={notif.id}
                        className="flex items-center justify-between bg-blue-50 hover:bg-blue-100 transition rounded-lg p-3 mb-1 shadow-sm border border-blue-100"
                      >
                        <div className="flex items-center text-gray-800">
                          <span className="inline-block w-2 h-2 bg-blue-500 rounded-full ml-2"></span>
                          <span>{notif.message}</span>
                          <span className="text-xs text-gray-400 ml-4">
                            {new Date(notif.createdAt).toLocaleString("fa-IR")}
                          </span>
                        </div>
                        <button
                          onClick={() => markNotificationRead(notif.id)}
                          className="ml-4 px-3 py-1 bg-gradient-to-r from-blue-500 to-blue-400 text-white rounded-lg shadow hover:from-blue-600 hover:to-blue-500 transition text-sm font-semibold"
                        >
                          خواندم
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {stats && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 text-sm">
                          مقالات منتشر شده
                        </p>
                        <p className="text-2xl font-bold text-gray-800">
                          {stats.totalPosts}
                        </p>
                      </div>
                      <div className="bg-blue-100 p-3 rounded-lg">
                        <FileText className="text-blue-600" size={24} />
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 text-sm">کل بازدیدها</p>
                        <p className="text-2xl font-bold text-gray-800">
                          {stats.totalViews.toLocaleString()}
                        </p>
                      </div>
                      <div className="bg-green-100 p-3 rounded-lg">
                        <Eye className="text-green-600" size={24} />
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 text-sm">پلن‌های فعال</p>
                        <p className="text-2xl font-bold text-gray-800">
                          {stats.activePlans}
                        </p>
                      </div>
                      <div className="bg-purple-100 p-3 rounded-lg">
                        <DollarSign className="text-purple-600" size={24} />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {stats && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">
                      محبوب‌ترین مقاله
                    </h3>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-800">
                          {stats.mostViewedPost.title}
                        </p>
                        <p className="text-gray-600 text-sm">
                          {stats.mostViewedPost.views.toLocaleString()} بازدید
                        </p>
                      </div>
                      <TrendingUp className="text-green-500" size={24} />
                    </div>
                  </div>

                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">
                      آخرین بازدیدها
                    </h3>
                    <div className="space-y-3">
                      {stats.recentViews.slice(0, 3).map((post) => (
                        <div
                          key={post.id}
                          className="flex items-center justify-between"
                        >
                          <div>
                            <p className="font-medium text-gray-800 text-sm">
                              {post.title}
                            </p>
                            <p className="text-gray-600 text-xs">
                              {post.views.toLocaleString()} بازدید
                            </p>
                          </div>
                          <Activity className="text-blue-500" size={16} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Blogs Tab */}
          {activeTab === "blogs" && (
            <div>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-gray-800">
                  مدیریت مقالات
                </h2>
                <button
                  onClick={() => {
                    setEditingBlog(null);
                    setShowBlogForm(true);
                  }}
                  className="btn btn-primary flex items-center"
                >
                  <Plus className="ml-2" size={20} />
                  مقاله جدید
                </button>
              </div>

              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          عنوان
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          نویسنده
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
                        <tr key={blog.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <img
                                src={blog.image}
                                alt={blog.title}
                                className="w-10 h-10 rounded-lg object-cover ml-3"
                              />
                              <div>
                                <div className="text-sm font-medium text-gray-900">
                                  {blog.title}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {blog.date}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {blog.author}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                              {blog.category}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {blog.views.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              {blog.published ? (
                                <>
                                  <CheckCircle
                                    className="text-green-500 ml-1"
                                    size={16}
                                  />
                                  <span className="text-green-600 text-sm">
                                    منتشر شده
                                  </span>
                                </>
                              ) : (
                                <>
                                  <Clock
                                    className="text-yellow-500 ml-1"
                                    size={16}
                                  />
                                  <span className="text-yellow-600 text-sm">
                                    پیش‌نویس
                                  </span>
                                </>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2 space-x-reverse">
                              <button
                                onClick={() => {
                                  setEditingBlog(blog);
                                  setShowBlogForm(true);
                                }}
                                className="text-blue-600 hover:text-blue-900"
                              >
                                <Edit size={16} />
                              </button>
                              <button
                                onClick={() => deleteBlog(blog.id)}
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
              </div>
            </div>
          )}

          {/* Pricing Tab */}
          {activeTab === "pricing" && (
            <div>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-gray-800">
                  مدیریت تعرفه‌ها
                </h2>
                <button
                  onClick={() => {
                    setEditingPlan(null);
                    setShowPlanForm(true);
                  }}
                  className="btn btn-primary flex items-center"
                >
                  <Plus className="ml-2" size={20} />
                  پلن جدید
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pricing.map((plan) => (
                  <div
                    key={plan.id}
                    className="bg-white rounded-xl shadow-sm p-6"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-gray-800">
                          {plan.name}
                        </h3>
                        <p className="text-2xl font-bold text-primary-600">
                          {plan.price} تومان
                        </p>
                      </div>
                      <div className="flex space-x-2 space-x-reverse">
                        <button
                          onClick={() => {
                            setEditingPlan(plan);
                            setShowPlanForm(true);
                          }}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => deletePlan(plan.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>

                    <p className="text-gray-600 text-sm mb-4">
                      {plan.description}
                    </p>

                    <div className="space-y-2">
                      {plan.features.slice(0, 3).map((feature, index) => (
                        <div key={index} className="flex items-center text-sm">
                          {feature.included ? (
                            <CheckCircle
                              className="text-green-500 ml-2"
                              size={16}
                            />
                          ) : (
                            <X className="text-red-500 ml-2" size={16} />
                          )}
                          <span
                            className={
                              feature.included
                                ? "text-gray-800"
                                : "text-gray-400"
                            }
                          >
                            {feature.title}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                          plan.active
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {plan.active ? "فعال" : "غیرفعال"}
                      </span>
                      {plan.popular && (
                        <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                          محبوب
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Blog Form Modal */}
      <AnimatePresence>
        {showBlogForm && (
          <BlogFormModal
            blog={editingBlog}
            blogs={blogs}
            onSave={saveBlog}
            onClose={() => {
              setShowBlogForm(false);
              setEditingBlog(null);
            }}
          />
        )}
      </AnimatePresence>

      {/* Pricing Form Modal */}
      <AnimatePresence>
        {showPlanForm && (
          <PricingFormModal
            plan={editingPlan}
            onSave={savePlan}
            onClose={() => {
              setShowPlanForm(false);
              setEditingPlan(null);
            }}
          />
        )}
      </AnimatePresence>

      {/* Logs Viewer Modal */}
      <AdminLogsViewer
        isOpen={showLogsViewer}
        onClose={() => setShowLogsViewer(false)}
      />
    </div>
  );
};

// Blog Form Modal Component
const BlogFormModal: React.FC<{
  blog: BlogPost | null;
  blogs: BlogPost[];
  onSave: (data: Partial<BlogPost>) => void;
  onClose: () => void;
}> = ({ blog, blogs, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    title: blog?.title || "",
    excerpt: blog?.excerpt || "",
    content: blog?.content || "",
    image: blog?.image || "",
    author: blog?.author || "",
    readTime: blog?.readTime || "",
    category: blog?.category || "آموزش",
    tags: blog?.tags?.join(", ") || "",
    featured: blog?.featured || false,
    published: blog?.published || false,
    relatedPosts: blog?.relatedPosts || [],
  });

  const categories = [
    "آموزش",
    "نکات",
    "بهینه‌سازی",
    "قوانین",
    "تحلیل",
    "خلاقیت",
  ];

  // Get available posts for related posts selection (exclude current post)
  const availablePosts = blogs.filter((p) => p.published && p.id !== blog?.id);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const blogData = {
      ...formData,
      tags: formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag),
      relatedPosts:
        formData.relatedPosts.length > 0
          ? formData.relatedPosts
          : getAutoRelatedPosts(),
    };

    onSave(blogData);
  };

  // Auto-select related posts if none selected
  const getAutoRelatedPosts = () => {
    const sameCategoryPosts = availablePosts
      .filter((p) => p.category === formData.category)
      .slice(0, 2);

    if (sameCategoryPosts.length >= 2) {
      return sameCategoryPosts.map((p) => p.id);
    }

    // If not enough in same category, get from all posts
    return availablePosts.slice(0, 2).map((p) => p.id);
  };

  const handleRelatedPostChange = (postId: number, checked: boolean) => {
    if (checked && formData.relatedPosts.length < 2) {
      setFormData((prev) => ({
        ...prev,
        relatedPosts: [...prev.relatedPosts, postId],
      }));
    } else if (!checked) {
      setFormData((prev) => ({
        ...prev,
        relatedPosts: prev.relatedPosts.filter((id) => id !== postId),
      }));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-800">
            {blog ? "ویرایش مقاله" : "مقاله جدید"}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                عنوان مقاله *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, title: e.target.value }))
                }
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-primary-300 focus:border-primary-500 outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                نویسنده *
              </label>
              <input
                type="text"
                value={formData.author}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, author: e.target.value }))
                }
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-primary-300 focus:border-primary-500 outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              خلاصه مقاله *
            </label>
            <textarea
              value={formData.excerpt}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, excerpt: e.target.value }))
              }
              rows={3}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-primary-300 focus:border-primary-500 outline-none resize-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              محتوای مقاله *
            </label>
            <textarea
              value={formData.content}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, content: e.target.value }))
              }
              rows={8}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-primary-300 focus:border-primary-500 outline-none resize-none"
              required
            />
          </div>

          <ImageUpload
            value={formData.image}
            onChange={(url) => setFormData((prev) => ({ ...prev, image: url }))}
            label="تصویر مقاله"
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                دسته‌بندی *
              </label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, category: e.target.value }))
                }
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-primary-300 focus:border-primary-500 outline-none"
                required
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                زمان مطالعه *
              </label>
              <input
                type="text"
                value={formData.readTime}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, readTime: e.target.value }))
                }
                placeholder="مثال: ۵ دقیقه"
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-primary-300 focus:border-primary-500 outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                برچسب‌ها
              </label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, tags: e.target.value }))
                }
                placeholder="برچسب‌ها را با کاما جدا کنید"
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-primary-300 focus:border-primary-500 outline-none"
              />
            </div>
          </div>

          {/* Related Posts Selection */}
          {availablePosts.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                مقالات مرتبط (حداکثر ۲ مقاله)
              </label>
              <div className="border border-gray-300 rounded-lg p-4 max-h-40 overflow-y-auto">
                {availablePosts.map((post) => (
                  <label
                    key={post.id}
                    className="flex items-center mb-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={formData.relatedPosts.includes(post.id)}
                      onChange={(e) =>
                        handleRelatedPostChange(post.id, e.target.checked)
                      }
                      disabled={
                        !formData.relatedPosts.includes(post.id) &&
                        formData.relatedPosts.length >= 2
                      }
                      className="ml-2"
                    />
                    <span className="text-sm text-gray-700">{post.title}</span>
                  </label>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                اگر مقاله‌ای انتخاب نکنید، به صورت خودکار ۲ مقاله مرتبط انتخاب
                می‌شود
              </p>
            </div>
          )}

          <div className="flex items-center space-x-6 space-x-reverse">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    featured: e.target.checked,
                  }))
                }
                className="ml-2"
              />
              <span className="text-sm text-gray-700">مقاله ویژه</span>
            </label>

            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={formData.published}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    published: e.target.checked,
                  }))
                }
                className="ml-2"
              />
              <span className="text-sm text-gray-700">انتشار مقاله</span>
            </label>
          </div>

          <div className="flex justify-end space-x-4 space-x-reverse">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              انصراف
            </button>
            <button type="submit" className="btn btn-primary flex items-center">
              <Save className="ml-2" size={20} />
              {blog ? "ویرایش" : "ایجاد"} مقاله
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

// Pricing Form Modal Component
const PricingFormModal: React.FC<{
  plan: PricingPlan | null;
  onSave: (data: Partial<PricingPlan>) => void;
  onClose: () => void;
}> = ({ plan, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    name: plan?.name || "",
    price: plan?.price || "",
    description: plan?.description || "",
    features: plan?.features || [{ title: "", included: true }],
    cta: plan?.cta || "انتخاب پلن",
    popular: plan?.popular || false,
    color: plan?.color || "border-blue-400",
    active: plan?.active !== undefined ? plan.active : true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const addFeature = () => {
    setFormData((prev) => ({
      ...prev,
      features: [...prev.features, { title: "", included: true }],
    }));
  };

  const removeFeature = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  const updateFeature = (
    index: number,
    field: "title" | "included",
    value: string | boolean
  ) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.map((feature, i) =>
        i === index ? { ...feature, [field]: value } : feature
      ),
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-800">
            {plan ? "ویرایش پلن" : "پلن جدید"}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                نام پلن *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-primary-300 focus:border-primary-500 outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                قیمت *
              </label>
              <input
                type="text"
                value={formData.price}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, price: e.target.value }))
                }
                placeholder="مثال: ۲۰۰,۰۰۰"
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-primary-300 focus:border-primary-500 outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              توضیحات *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              rows={3}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-primary-300 focus:border-primary-500 outline-none resize-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ویژگی‌ها
            </label>
            <div className="space-y-3">
              {formData.features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 space-x-reverse"
                >
                  <input
                    type="text"
                    value={feature.title}
                    onChange={(e) =>
                      updateFeature(index, "title", e.target.value)
                    }
                    placeholder="عنوان ویژگی"
                    className="flex-1 border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-primary-300 focus:border-primary-500 outline-none"
                  />
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={feature.included}
                      onChange={(e) =>
                        updateFeature(index, "included", e.target.checked)
                      }
                      className="ml-1"
                    />
                    <span className="text-sm text-gray-700">شامل</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => removeFeature(index)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={addFeature}
              className="mt-3 text-primary-600 hover:text-primary-700 text-sm flex items-center"
            >
              <Plus size={16} className="ml-1" />
              افزودن ویژگی
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              متن دکمه
            </label>
            <input
              type="text"
              value={formData.cta}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, cta: e.target.value }))
              }
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-primary-300 focus:border-primary-500 outline-none"
            />
          </div>

          <div className="flex items-center space-x-6 space-x-reverse">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={formData.popular}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    popular: e.target.checked,
                  }))
                }
                className="ml-2"
              />
              <span className="text-sm text-gray-700">پلن محبوب</span>
            </label>

            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={formData.active}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, active: e.target.checked }))
                }
                className="ml-2"
              />
              <span className="text-sm text-gray-700">فعال</span>
            </label>
          </div>

          <div className="flex justify-end space-x-4 space-x-reverse">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              انصراف
            </button>
            <button type="submit" className="btn btn-primary flex items-center">
              <Save className="ml-2" size={20} />
              {plan ? "ویرایش" : "ایجاد"} پلن
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default AdminDashboard;
