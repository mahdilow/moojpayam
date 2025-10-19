import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const PRODUCTION_HOSTNAME = 'moojpayam.ir';

// This function sends a pageview event to Google Analytics.
// It's typed to ensure that the gtag function is available on the window object.
const sendAnalyticsEvent = (path: string) => {
  // Only send events in production
  if (window.location.hostname !== PRODUCTION_HOSTNAME) {
    return;
  }

  if (typeof window.gtag === 'function') {
    window.gtag('config', 'G-0838M0VVZX', {
      page_path: path,
    });
  }
};

const AnalyticsTracker = (): null => {
  const location = useLocation();

  useEffect(() => {
    // Send a pageview event every time the route changes
    sendAnalyticsEvent(location.pathname + location.search);
  }, [location]);

  return null; // This component does not render anything
};

export default AnalyticsTracker;
