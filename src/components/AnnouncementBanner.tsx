import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Megaphone, AlertCircle, Info, Star } from 'lucide-react';

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

const AnnouncementBanner: React.FC = () => {
  const [announcement, setAnnouncement] = useState<AnnouncementData | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    loadAnnouncement();
  }, []);

  const loadAnnouncement = async () => {
    try {
      const response = await fetch('/api/content/announcement');
      if (response.ok) {
        const data = await response.json();
        if (data && data.isActive && !isExpired(data)) {
          // Check if user has dismissed this announcement
          const dismissedKey = `announcement_dismissed_${data.id}`;
          const wasDismissed = localStorage.getItem(dismissedKey);
          
          if (!wasDismissed || !data.dismissible) {
            setAnnouncement(data);
            setIsVisible(true);
          }
        }
      }
    } catch (error) {
      console.error('Error loading announcement:', error);
    }
  };

  const isExpired = (announcement: AnnouncementData): boolean => {
    if (!announcement.expiresAt) return false;
    return new Date() > new Date(announcement.expiresAt);
  };

  const handleDismiss = () => {
    if (announcement && announcement.dismissible) {
      const dismissedKey = `announcement_dismissed_${announcement.id}`;
      localStorage.setItem(dismissedKey, 'true');
      setIsDismissed(true);
      setIsVisible(false);
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertCircle size={18} />;
      case 'success':
        return <Star size={18} />;
      case 'promotion':
        return <Megaphone size={18} />;
      default:
        return <Info size={18} />;
    }
  };

  const getColors = (type: string) => {
    switch (type) {
      case 'warning':
        return 'bg-orange-500 text-white';
      case 'success':
        return 'bg-green-500 text-white';
      case 'promotion':
        return 'bg-gradient-to-r from-purple-600 to-blue-600 text-white';
      default:
        return 'bg-blue-500 text-white';
    }
  };

  if (!announcement || !isVisible || isDismissed) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className={`fixed top-0 left-0 right-0 z-50 ${getColors(announcement.type)} shadow-lg`}
        style={{ marginBottom: 0 }}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center flex-1">
              <div className="flex items-center ml-3">
                {getIcon(announcement.type)}
              </div>
              
              <div className="flex-1 text-center lg:text-right">
                <span className="text-sm md:text-base font-medium">
                  {announcement.message}
                </span>
                
                {announcement.link && announcement.linkText && (
                  <a
                    href={announcement.link}
                    className="mr-3 text-sm font-bold underline hover:no-underline transition-all"
                    target={announcement.link.startsWith('http') ? '_blank' : '_self'}
                    rel={announcement.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                  >
                    {announcement.linkText}
                  </a>
                )}
              </div>
            </div>

            {announcement.dismissible && (
              <button
                onClick={handleDismiss}
                className="p-1 hover:bg-white/20 rounded-full transition-colors flex-shrink-0"
                aria-label="بستن اعلان"
              >
                <X size={18} />
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AnnouncementBanner;