import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Megaphone, AlertCircle, Info, Star, ChevronRight } from 'lucide-react';

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
        return <AlertCircle size={18} className="flex-shrink-0" />;
      case 'success':
        return <Star size={18} className="flex-shrink-0" />;
      case 'promotion':
        return <Megaphone size={18} className="flex-shrink-0" />;
      default:
        return <Info size={18} className="flex-shrink-0" />;
    }
  };

  const getStyles = (type: string) => {
    switch (type) {
      case 'warning':
        return {
          bg: 'bg-gradient-to-r from-orange-500 to-orange-600',
          text: 'text-white',
          accent: 'bg-orange-400/20'
        };
      case 'success':
        return {
          bg: 'bg-gradient-to-r from-green-500 to-green-600',
          text: 'text-white',
          accent: 'bg-green-400/20'
        };
      case 'promotion':
        return {
          bg: 'bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600',
          text: 'text-white',
          accent: 'bg-white/10'
        };
      default:
        return {
          bg: 'bg-gradient-to-r from-blue-500 to-blue-600',
          text: 'text-white',
          accent: 'bg-blue-400/20'
        };
    }
  };

  if (!announcement || !isVisible || isDismissed) {
    return null;
  }

  const styles = getStyles(announcement.type);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ height: 0, opacity: 0, y: -20 }}
        animate={{ height: 'auto', opacity: 1, y: 0 }}
        exit={{ height: 0, opacity: 0, y: -20 }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
        className={`w-full ${styles.bg} ${styles.text} shadow-lg relative overflow-hidden`}
        style={{ zIndex: 30 }}
      >
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <motion.div
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent w-full h-full"
            style={{ width: '200%' }}
          />
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="flex items-center justify-between py-4">
            {/* Left side - Icon and Message */}
            <div className="flex items-center flex-1 min-w-0">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className={`flex items-center justify-center w-10 h-10 rounded-full ${styles.accent} ml-4 flex-shrink-0`}
              >
                {getIcon(announcement.type)}
              </motion.div>
              
              <div className="flex-1 min-w-0">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="flex flex-col sm:flex-row sm:items-center gap-2"
                >
                  <span className="text-sm md:text-base font-medium leading-relaxed">
                    {announcement.message}
                  </span>
                  
                  {announcement.link && announcement.linkText && (
                    <motion.a
                      href={announcement.link}
                      className="inline-flex items-center text-sm font-bold bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-full transition-all duration-200 hover:scale-105 flex-shrink-0"
                      target={announcement.link.startsWith('http') ? '_blank' : '_self'}
                      rel={announcement.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {announcement.linkText}
                      <ChevronRight size={14} className="mr-1" />
                    </motion.a>
                  )}
                </motion.div>
              </div>
            </div>

            {/* Right side - Dismiss button */}
            {announcement.dismissible && (
              <motion.button
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.4 }}
                onClick={handleDismiss}
                className="p-2 hover:bg-white/20 rounded-full transition-all duration-200 flex-shrink-0 ml-3 hover:scale-110"
                aria-label="بستن اعلان"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X size={18} />
              </motion.button>
            )}
          </div>
        </div>

        {/* Bottom accent line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/30"
          style={{ transformOrigin: 'left' }}
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default AnnouncementBanner;