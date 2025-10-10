import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { HelmetProvider } from "react-helmet-async";
import MainLayout from "./layouts/MainLayout";
import { lazy, Suspense, useState, useEffect } from "react";

// Lazy-loaded page components
const HomePage = lazy(() => import("./pages/HomePage"));
const BlogPage = lazy(() => import("./pages/BlogPage"));
const BlogPostPage = lazy(() => import("./pages/BlogPostPage"));
const AboutUsPage = lazy(() => import("./pages/AboutUsPage"));
const FeaturesPage = lazy(() => import("./pages/FeaturesPage"));
const FaqPage = lazy(() => import("./pages/FaqPage"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const ContactUsPage = lazy(() => import("./pages/ContactUsPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

import LoadingScreen from "./components/LoadingScreen";

function AppContent() {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const { pathname } = location;

  // Detect if we're on the home page
  const isHomePage = pathname === "/";

  useEffect(() => {
    // Disable loading screen on home page to fix LCP
    if (isHomePage) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const timeout = setTimeout(() => setIsLoading(false), 900);
    return () => clearTimeout(timeout);
  }, [pathname]);

  return (
    <div dir="rtl" className="font-vazir overflow-x-hidden max-w-screen">
      {/* Only show loading screen on non-home pages */}
      {!isHomePage && <LoadingScreen isLoading={isLoading} />}

      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#363636",
            color: "#fff",
            fontFamily: "Lalezar, Vazir, sans-serif",
          },
        }}
      />

      <Suspense fallback={<LoadingScreen isLoading={true} />}>
        <Routes>
          <Route
            path="/"
            element={
              <MainLayout>
                <HomePage />
              </MainLayout>
            }
          />
          {/* other routes */}
          <Route
            path="/blog"
            element={
              <MainLayout>
                <BlogPage />
              </MainLayout>
            }
          />
          <Route
            path="/blog/:slug"
            element={
              <MainLayout>
                <BlogPostPage />
              </MainLayout>
            }
          />
          <Route
            path="/about-us"
            element={
              <MainLayout>
                <AboutUsPage />
              </MainLayout>
            }
          />
          <Route
            path="/features"
            element={
              <MainLayout>
                <FeaturesPage />
              </MainLayout>
            }
          />
          <Route
            path="/faq"
            element={
              <MainLayout>
                <FaqPage />
              </MainLayout>
            }
          />
          <Route
            path="/contact-us"
            element={
              <MainLayout>
                <ContactUsPage />
              </MainLayout>
            }
          />
          <Route path="/mooj-admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </div>
  );
}

function App() {
  return (
    <HelmetProvider>
      <Router>
        <AppContent />
      </Router>
    </HelmetProvider>
  );
}

export default App;
