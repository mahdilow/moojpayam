import React, { useCallback, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  FileText,
  Upload,
  Settings,
  AlertTriangle,
  User,
  Search,
  Download,
  Eye,
  Clock,
  Activity,
} from "lucide-react";
import { AdminLogEntry } from "../../utils/adminLogger";

interface AdminLogsViewerProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdminLogsViewer: React.FC<AdminLogsViewerProps> = ({
  isOpen,
  onClose,
}) => {
  const [logs, setLogs] = useState<AdminLogEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState({
    category: "all",
    severity: "all",
    dateRange: "7d",
    search: "",
  });
  const [selectedLog, setSelectedLog] = useState<AdminLogEntry | null>(null);

  const loadLogs = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filter.category !== "all") params.append("category", filter.category);
      if (filter.severity !== "all") params.append("severity", filter.severity);
      if (filter.dateRange !== "all")
        params.append("dateRange", filter.dateRange);
      if (filter.search) params.append("search", filter.search);

      const response = await fetch(`/api/admin/logs?${params.toString()}`, {
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        if (data && Array.isArray(data.logs)) {
          setLogs(data.logs);
        } else {
          setLogs([]);
        }
      } else {
        setLogs([]);
      }
    } catch (error) {
      console.error("Error loading logs:", error);
      setLogs([]);
    } finally {
      setLoading(false);
    }
  }, [filter]); // <- only the state/filter it uses

  useEffect(() => {
    if (isOpen) {
      loadLogs();
    }
  }, [isOpen, loadLogs]);

  const exportLogs = async () => {
    try {
      const response = await fetch("/api/admin/logs/export", {
        credentials: "include",
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `admin-logs-${
          new Date().toISOString().split("T")[0]
        }.json`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }
    } catch (error) {
      console.error("Error exporting logs:", error);
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "auth":
        return <Shield size={16} />;
      case "content":
        return <FileText size={16} />;
      case "upload":
        return <Upload size={16} />;
      case "system":
        return <Settings size={16} />;
      case "security":
        return <AlertTriangle size={16} />;
      default:
        return <Activity size={16} />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "low":
        return "text-green-600 bg-green-100";
      case "medium":
        return "text-yellow-600 bg-yellow-100";
      case "high":
        return "text-orange-600 bg-orange-100";
      case "critical":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleString("fa-IR");
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
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
          className="bg-white rounded-2xl w-full max-w-7xl max-h-[90vh] overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Activity className="ml-3" size={24} />
                <div>
                  <h2 className="text-2xl font-bold">
                    گزارش‌های فعالیت مدیریت
                  </h2>
                  <p className="text-blue-100">
                    مشاهده و تحلیل فعالیت‌های مدیران سیستم
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={exportLogs}
                  className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors flex items-center"
                >
                  <Download size={16} className="ml-2" />
                  خروجی
                </button>
                <button
                  onClick={onClose}
                  className="bg-white/20 hover:bg-white/30 p-2 rounded-lg transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="p-6 border-b border-gray-200 bg-gray-50">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  دسته‌بندی
                </label>
                <select
                  value={filter.category}
                  onChange={(e) =>
                    setFilter((prev) => ({ ...prev, category: e.target.value }))
                  }
                  className="w-full border border-gray-300 rounded-lg p-2 text-sm"
                >
                  <option value="all">همه دسته‌ها</option>
                  <option value="auth">احراز هویت</option>
                  <option value="content">محتوا</option>
                  <option value="upload">آپلود</option>
                  <option value="system">سیستم</option>
                  <option value="security">امنیت</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  سطح اهمیت
                </label>
                <select
                  value={filter.severity}
                  onChange={(e) =>
                    setFilter((prev) => ({ ...prev, severity: e.target.value }))
                  }
                  className="w-full border border-gray-300 rounded-lg p-2 text-sm"
                >
                  <option value="all">همه سطوح</option>
                  <option value="low">کم</option>
                  <option value="medium">متوسط</option>
                  <option value="high">بالا</option>
                  <option value="critical">بحرانی</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  بازه زمانی
                </label>
                <select
                  value={filter.dateRange}
                  onChange={(e) =>
                    setFilter((prev) => ({
                      ...prev,
                      dateRange: e.target.value,
                    }))
                  }
                  className="w-full border border-gray-300 rounded-lg p-2 text-sm"
                >
                  <option value="1d">۲۴ ساعت گذشته</option>
                  <option value="7d">۷ روز گذشته</option>
                  <option value="30d">۳۰ روز گذشته</option>
                  <option value="90d">۹۰ روز گذشته</option>
                  <option value="all">همه زمان‌ها</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  جستجو
                </label>
                <div className="relative">
                  <Search
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={16}
                  />
                  <input
                    type="text"
                    placeholder="جستجو در گزارش‌ها..."
                    value={filter.search}
                    onChange={(e) =>
                      setFilter((prev) => ({ ...prev, search: e.target.value }))
                    }
                    className="w-full pr-10 pl-3 py-2 border border-gray-300 rounded-lg text-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-hidden flex">
            {/* Logs List */}
            <div className="flex-1 overflow-y-auto">
              {loading ? (
                <div className="flex items-center justify-center h-64">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                  <span className="mr-3 text-gray-600">در حال بارگذاری...</span>
                </div>
              ) : logs.length === 0 ? (
                <div className="flex items-center justify-center h-64 text-gray-500">
                  <div className="text-center">
                    <Activity
                      size={48}
                      className="mx-auto mb-4 text-gray-300"
                    />
                    <p>هیچ گزارشی یافت نشد</p>
                  </div>
                </div>
              ) : (
                <div className="p-4 space-y-2">
                  {logs.map((log) => (
                    <motion.div
                      key={log.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`bg-white border rounded-lg p-4 hover:shadow-md transition-all cursor-pointer ${
                        selectedLog?.id === log.id ? "ring-2 ring-blue-500" : ""
                      }`}
                      onClick={() => setSelectedLog(log)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3 space-x-reverse flex-1">
                          <div
                            className={`p-2 rounded-lg ${getSeverityColor(
                              log.severity
                            )}`}
                          >
                            {getCategoryIcon(log.category)}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <h4 className="font-medium text-gray-900 truncate">
                                {log.action}
                              </h4>
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(
                                  log.severity
                                )}`}
                              >
                                {log.severity}
                              </span>
                            </div>

                            <div className="flex items-center text-sm text-gray-500 space-x-4 space-x-reverse">
                              <div className="flex items-center">
                                <User size={14} className="ml-1" />
                                {log.adminUser}
                              </div>
                              <div className="flex items-center">
                                <Clock size={14} className="ml-1" />
                                {formatDate(log.timestamp)}
                              </div>
                              <div className="flex items-center">
                                <span
                                  className={`w-2 h-2 rounded-full ml-1 ${
                                    log.details.success
                                      ? "bg-green-500"
                                      : "bg-red-500"
                                  }`}
                                ></span>
                                {log.details.success ? "موفق" : "ناموفق"}
                              </div>
                            </div>

                            {log.details.resourceType && (
                              <div className="mt-2 text-sm text-gray-600">
                                {log.details.resourceType}:{" "}
                                {log.details.resourceId}
                              </div>
                            )}
                          </div>
                        </div>

                        <Eye
                          size={16}
                          className="text-gray-400 flex-shrink-0"
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Log Details */}
            {selectedLog && (
              <div className="w-96 border-r border-gray-200 bg-gray-50 overflow-y-auto">
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">
                    جزئیات گزارش
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        شناسه
                      </label>
                      <p className="text-sm text-gray-600 font-mono bg-white p-2 rounded border">
                        {selectedLog.id}
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        عملیات
                      </label>
                      <p className="text-sm text-gray-900">
                        {selectedLog.action}
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        کاربر مدیر
                      </label>
                      <p className="text-sm text-gray-900">
                        {selectedLog.adminUser}
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        زمان
                      </label>
                      <p className="text-sm text-gray-900">
                        {formatDate(selectedLog.timestamp)}
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        دسته‌بندی
                      </label>
                      <div className="flex items-center">
                        {getCategoryIcon(selectedLog.category)}
                        <span className="mr-2 text-sm text-gray-900">
                          {selectedLog.category}
                        </span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        سطح اهمیت
                      </label>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(
                          selectedLog.severity
                        )}`}
                      >
                        {selectedLog.severity}
                      </span>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        وضعیت
                      </label>
                      <div className="flex items-center">
                        <span
                          className={`w-2 h-2 rounded-full ml-2 ${
                            selectedLog.details.success
                              ? "bg-green-500"
                              : "bg-red-500"
                          }`}
                        ></span>
                        {selectedLog.details.success ? "موفق" : "ناموفق"}
                      </div>
                    </div>

                    {selectedLog.details.errorMessage && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          پیام خطا
                        </label>
                        <p className="text-sm text-red-600 bg-red-50 p-2 rounded border">
                          {selectedLog.details.errorMessage}
                        </p>
                      </div>
                    )}

                    {selectedLog.sessionId && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          شناسه جلسه
                        </label>
                        <p className="text-sm text-gray-600 font-mono bg-white p-2 rounded border">
                          {selectedLog.sessionId}
                        </p>
                      </div>
                    )}

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        جزئیات کامل
                      </label>
                      <pre className="text-xs text-gray-600 bg-white p-3 rounded border overflow-x-auto">
                        {JSON.stringify(selectedLog.details, null, 2)}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AdminLogsViewer;
