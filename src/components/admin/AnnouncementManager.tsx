import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  EyeOff, 
  Megaphone,
  Calendar,
  Link as LinkIcon,
  Save,
  X
} from 'lucide-react';
import toast from 'react-hot-toast';

interface AnnouncementData {
  id: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'promotion';
  isActive: boolean;
  link?: string;
  linkText?: string;
  dismissible: boolean;
  createdAt: string;
  expiresAt?: string;
}

interface AnnouncementManagerProps {
  isOpen: boolean;
  onClose: () => void;
}

const AnnouncementManager: React.FC<AnnouncementManagerProps> = ({ isOpen, onClose }) => {
  const [announcements, setAnnouncements] = useState<AnnouncementData[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<Partial<AnnouncementData>>({
    message: '',
    type: 'info',
    isActive: true,
    dismissible: true,
    link: '',
    linkText: '',
    expiresAt: ''
  });

  useEffect(() => {
    if (isOpen) {
      loadAnnouncements();
    }
  }, [isOpen]);

  const loadAnnouncements = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/announcements', {
        credentials: 'include'
      });
      if (response.ok) {
        const data = await response.json();
        setAnnouncements(data);
      }
    } catch (error) {
      console.error('Error loading announcements:', error);
      toast.error('خطا در بارگذاری اعلان‌ها');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!formData.message?.trim()) {
      toast.error('متن اعلان الزامی است');
      return;
    }

    try {
      const url = editingId 
        ? `/api/admin/announcements/${editingId}`
        : '/api/admin/announcements';
      
      const method = editingId ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          ...formData,
          expiresAt: formData.expiresAt || null
        })
      });

      if (response.ok) {
        toast.success(editingId ? 'اعلان ویرایش شد' : 'اعلان ایجاد شد');
        loadAnnouncements();
        resetForm();
      } else {
        const error = await response.json();
        toast.error(error.message || 'خطا در ذخیره اعلان');
      }
    } catch (error) {
      console.error('Error saving announcement:', error);
      toast.error('خطا در ذخیره اعلان');
    }
  };

  const handleEdit = (announcement: AnnouncementData) => {
    setFormData({
      message: announcement.message,
      type: announcement.type,
      isActive: announcement.isActive,
      dismissible: announcement.dismissible,
      link: announcement.link || '',
      linkText: announcement.linkText || '',
      expiresAt: announcement.expiresAt ? announcement.expiresAt.split('T')[0] : ''
    });
    setEditingId(announcement.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('آیا از حذف این اعلان اطمینان دارید؟')) return;

    try {
      const response = await fetch(`/api/admin/announcements/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });

      if (response.ok) {
        toast.success('اعلان حذف شد');
        loadAnnouncements();
      } else {
        toast.error('خطا در حذف اعلان');
      }
    } catch (error) {
      console.error('Error deleting announcement:', error);
      toast.error('خطا در حذف اعلان');
    }
  };

  const toggleActive = async (id: string, isActive: boolean) => {
    try {
      const response = await fetch(`/api/admin/announcements/${id}/toggle`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ isActive: !isActive })
      });

      if (response.ok) {
        toast.success(isActive ? 'اعلان غیرفعال شد' : 'اعلان فعال شد');
        loadAnnouncements();
      } else {
        toast.error('خطا در تغییر وضعیت اعلان');
      }
    } catch (error) {
      console.error('Error toggling announcement:', error);
      toast.error('خطا در تغییر وضعیت اعلان');
    }
  };

  const resetForm = () => {
    setFormData({
      message: '',
      type: 'info',
      isActive: true,
      dismissible: true,
      link: '',
      linkText: '',
      expiresAt: ''
    });
    setEditingId(null);
    setShowForm(false);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'warning': return 'bg-orange-100 text-orange-800';
      case 'success': return 'bg-green-100 text-green-800';
      case 'promotion': return 'bg-purple-100 text-purple-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'warning': return 'هشدار';
      case 'success': return 'موفقیت';
      case 'promotion': return 'تبلیغاتی';
      default: return 'اطلاعات';
    }
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
          className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Megaphone className="ml-3" size={24} />
                <div>
                  <h2 className="text-2xl font-bold">مدیریت اعلان‌ها</h2>
                  <p className="text-blue-100">مدیریت بنرهای اطلاع‌رسانی سایت</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowForm(true)}
                  className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors flex items-center"
                >
                  <Plus size={16} className="ml-2" />
                  اعلان جدید
                </button>
                <button
                  onClick={onClose}
                  className="bg-white/20 hover:bg-white/30 p-2 rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                <span className="mr-3 text-gray-600">در حال بارگذاری...</span>
              </div>
            ) : (
              <div className="space-y-4">
                {announcements.map((announcement) => (
                  <div
                    key={announcement.id}
                    className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(announcement.type)}`}>
                            {getTypeLabel(announcement.type)}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            announcement.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {announcement.isActive ? 'فعال' : 'غیرفعال'}
                          </span>
                          {announcement.dismissible && (
                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              قابل بستن
                            </span>
                          )}
                        </div>
                        
                        <p className="text-gray-900 mb-2">{announcement.message}</p>
                        
                        {announcement.link && (
                          <div className="flex items-center text-sm text-blue-600 mb-2">
                            <LinkIcon size={14} className="ml-1" />
                            <span>{announcement.linkText || 'لینک'}</span>
                          </div>
                        )}
                        
                        <div className="flex items-center text-sm text-gray-500 gap-4">
                          <div className="flex items-center">
                            <Calendar size={14} className="ml-1" />
                            {new Date(announcement.createdAt).toLocaleDateString('fa-IR')}
                          </div>
                          {announcement.expiresAt && (
                            <div className="flex items-center">
                              <span>انقضا: {new Date(announcement.expiresAt).toLocaleDateString('fa-IR')}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleActive(announcement.id, announcement.isActive)}
                          className={`p-2 rounded-lg transition-colors ${
                            announcement.isActive 
                              ? 'text-green-600 hover:bg-green-100' 
                              : 'text-gray-400 hover:bg-gray-100'
                          }`}
                          title={announcement.isActive ? 'غیرفعال کردن' : 'فعال کردن'}
                        >
                          {announcement.isActive ? <Eye size={16} /> : <EyeOff size={16} />}
                        </button>
                        <button
                          onClick={() => handleEdit(announcement)}
                          className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                          title="ویرایش"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(announcement.id)}
                          className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                          title="حذف"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {announcements.length === 0 && (
                  <div className="text-center py-12">
                    <Megaphone size={48} className="mx-auto text-gray-300 mb-4" />
                    <p className="text-gray-500">هیچ اعلانی وجود ندارد</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Form Modal */}
          <AnimatePresence>
            {showForm && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto"
                >
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold">
                      {editingId ? 'ویرایش اعلان' : 'اعلان جدید'}
                    </h3>
                    <button
                      onClick={resetForm}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <X size={20} />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        متن اعلان *
                      </label>
                      <textarea
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg p-3 resize-none"
                        rows={3}
                        placeholder="متن اعلان خود را وارد کنید..."
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          نوع اعلان
                        </label>
                        <select
                          value={formData.type}
                          onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                          className="w-full border border-gray-300 rounded-lg p-2"
                        >
                          <option value="info">اطلاعات</option>
                          <option value="warning">هشدار</option>
                          <option value="success">موفقیت</option>
                          <option value="promotion">تبلیغاتی</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          تاریخ انقضا
                        </label>
                        <input
                          type="date"
                          value={formData.expiresAt}
                          onChange={(e) => setFormData({ ...formData, expiresAt: e.target.value })}
                          className="w-full border border-gray-300 rounded-lg p-2"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          لینک (اختیاری)
                        </label>
                        <input
                          type="url"
                          value={formData.link}
                          onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                          className="w-full border border-gray-300 rounded-lg p-2"
                          placeholder="https://example.com"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          متن لینک
                        </label>
                        <input
                          type="text"
                          value={formData.linkText}
                          onChange={(e) => setFormData({ ...formData, linkText: e.target.value })}
                          className="w-full border border-gray-300 rounded-lg p-2"
                          placeholder="کلیک کنید"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.isActive}
                          onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                          className="ml-2"
                        />
                        فعال
                      </label>

                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.dismissible}
                          onChange={(e) => setFormData({ ...formData, dismissible: e.target.checked })}
                          className="ml-2"
                        />
                        قابل بستن توسط کاربر
                      </label>
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                      <button
                        onClick={resetForm}
                        className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                      >
                        انصراف
                      </button>
                      <button
                        onClick={handleSave}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                      >
                        <Save size={16} className="ml-2" />
                        ذخیره
                      </button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AnnouncementManager;