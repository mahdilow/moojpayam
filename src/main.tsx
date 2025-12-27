import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { onCLS, onFID, onFCP, onLCP, onTTFB, Metric } from 'web-vitals';
import App from './App.tsx';
import './index.css';

// Performance monitoring function
function sendToAnalytics(metric: Metric) {
  // Send to your analytics service
  console.log(metric);
}

// Initialize Core Web Vitals monitoring
onCLS(sendToAnalytics);
onFID(sendToAnalytics);
onFCP(sendToAnalytics);
onLCP(sendToAnalytics);
onTTFB(sendToAnalytics);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);