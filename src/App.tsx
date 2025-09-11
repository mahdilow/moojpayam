import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { HelmetProvider } from "react-helmet-async";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import BlogPage from "./pages/BlogPage";
import BlogPostPage from "./pages/BlogPostPage";
import AboutUsPage from "./pages/AboutUsPage";
import FeaturesPage from "./pages/FeaturesPage";
import FaqPage from "./pages/FaqPage";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import LoadingScreen from "./components/LoadingScreen";
import NotFoundPage from "./pages/NotFoundPage";
import { useState, useEffect } from "react";

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
        <Route path="/mooj-admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
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
