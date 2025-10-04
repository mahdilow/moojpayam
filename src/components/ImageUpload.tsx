import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  X,
  Image as ImageIcon,
  Loader,
  Trash2,
  Eye,
} from "lucide-react";
import toast from "react-hot-toast";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  required?: boolean;
}

interface UploadedImage {
  filename: string;
  url: string;
  uploadDate: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  value,
  onChange,
  label = "تصویر",
  required = false,
}) => {
  const [uploading, setUploading] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [loadingGallery, setLoadingGallery] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load uploaded images gallery
  const loadGallery = async () => {
    setLoadingGallery(true);
    try {
      const response = await fetch("/api/admin/images", {
        credentials: "include",
      });

      if (response.ok) {
        const images = await response.json();
        setUploadedImages(images);
      } else {
        toast.error("خطا در بارگذاری گالری تصاویر");
      }
    } catch (error) {
      console.error("Gallery fetch error:", error);
      toast.error("خطا در ارتباط با سرور");
    } finally {
      setLoadingGallery(false);
    }
  };

  // Handle file upload
  const handleFileUpload = async (file: File) => {
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("لطفاً فقط فایل‌های تصویری انتخاب کنید");
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("حجم فایل نباید بیش از ۵ مگابایت باشد");
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch("/api/admin/upload", {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        onChange(result.imageUrl);

        // Show optimization details in toast
        if (result.compressionRatio) {
          toast.success(
            `تصویر با موفقیت آپلود و بهینه‌سازی شد!\nفرمت: WebP | فشرده‌سازی: ${result.compressionRatio}`,
            { duration: 5000 }
          );
        } else {
          toast.success("تصویر با موفقیت آپلود شد");
        }

        // Refresh gallery if it's open
        if (showGallery) {
          loadGallery();
        }
      } else {
        const error = await response.json();
        toast.error(error.message || "خطا در آپلود تصویر");
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("خطا در آپلود تصویر");
    } finally {
      setUploading(false);
    }
  };

  // Handle drag and drop
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  // Delete image from server
  const deleteImage = async (filename: string) => {
    if (!confirm("آیا از حذف این تصویر اطمینان دارید؟")) return;

    try {
      const response = await fetch(`/api/admin/upload/${filename}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (response.ok) {
        toast.success("تصویر حذف شد");
        loadGallery(); // Refresh gallery

        // If the deleted image was selected, clear the selection
        if (value.includes(filename)) {
          onChange("");
        }
      } else {
        const error = await response.json();
        toast.error(error.message || "خطا در حذف تصویر");
      }
    } catch (error) {
      console.error("Delete image error:", error);
      toast.error("خطا در حذف تصویر");
    }
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      {/* Current Image Preview */}
      {value && (
        <div className="relative inline-block">
          <img
            src={value}
            alt="پیش‌نمایش"
            className="w-32 h-32 object-cover rounded-lg border border-gray-300"
          />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* Upload Options */}
      <div className="flex flex-wrap gap-3">
        {/* File Upload Button */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
        >
          {uploading ? (
            <Loader className="animate-spin ml-2\" size={16} />
          ) : (
            <Upload className="ml-2" size={16} />
          )}
          {uploading ? "در حال آپلود و بهینه‌سازی..." : "آپلود تصویر"}
        </button>

        {/* Gallery Button */}
        <button
          type="button"
          onClick={() => {
            setShowGallery(true);
            loadGallery();
          }}
          className="flex items-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
        >
          <ImageIcon className="ml-2" size={16} />
          گالری تصاویر
        </button>

        {/* URL Input Toggle */}
        <button
          type="button"
          onClick={() => {
            const url = prompt("URL تصویر را وارد کنید:");
            if (url) onChange(url);
          }}
          className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
        >
          لینک تصویر
        </button>
      </div>

      {/* Drag and Drop Area */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors"
      >
        <ImageIcon className="mx-auto mb-4 text-gray-400" size={48} />
        <p className="text-gray-600 mb-2">تصویر را اینجا بکشید و رها کنید</p>
        <p className="text-sm text-gray-500">یا روی دکمه آپلود کلیک کنید</p>
        <p className="text-xs text-gray-400 mt-2">
          فرمت‌های مجاز: JPG, PNG, GIF, WEBP (حداکثر ۵ مگابایت)
        </p>
        <p className="text-xs text-green-600 mt-1 font-medium">
          ✓ تصاویر به‌صورت خودکار به WebP تبدیل و بهینه‌سازی می‌شوند
        </p>
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFileUpload(file);
        }}
        className="hidden"
      />

      {/* Image Gallery Modal */}
      <AnimatePresence>
        {showGallery && (
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
              className="bg-white rounded-2xl p-6 w-full max-w-4xl max-h-[80vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-800">
                  گالری تصاویر
                </h3>
                <button
                  onClick={() => setShowGallery(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={24} />
                </button>
              </div>

              {loadingGallery ? (
                <div className="text-center py-8">
                  <Loader className="animate-spin mx-auto mb-4" size={32} />
                  <p className="text-gray-600">در حال بارگذاری تصاویر...</p>
                </div>
              ) : uploadedImages.length === 0 ? (
                <div className="text-center py-8">
                  <ImageIcon className="mx-auto mb-4 text-gray-400" size={64} />
                  <p className="text-gray-600">هیچ تصویری آپلود نشده است</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {uploadedImages.map((image) => (
                    <div
                      key={image.filename}
                      className="relative group bg-gray-100 rounded-lg overflow-hidden aspect-square"
                    >
                      <img
                        src={image.url}
                        alt={image.filename}
                        className="w-full h-full object-cover"
                      />

                      {/* Overlay with actions */}
                      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2 space-x-reverse">
                        <button
                          onClick={() => {
                            onChange(image.url);
                            setShowGallery(false);
                            toast.success("تصویر انتخاب شد");
                          }}
                          className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors"
                          title="انتخاب تصویر"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={() => deleteImage(image.filename)}
                          className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-colors"
                          title="حذف تصویر"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      {/* Selected indicator */}
                      {value === image.url && (
                        <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full p-1">
                          <Eye size={12} />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ImageUpload;
