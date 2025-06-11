import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import { HelmetProvider } from 'react-helmet-async';
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import BlogPage from "./pages/BlogPage";
import BlogPostPage from "./pages/BlogPostPage";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <HelmetProvider>
      <Router>
        <div dir="rtl" className="font-vazir">
          <Toaster 
            position="top-center"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
                fontFamily: 'Lalezar, Vazir, sans-serif',
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
            <Route
              path="/blog"
              element={
                <MainLayout>
                  <BlogPage />
                </MainLayout>
              }
            />
            <Route
              path="/blog/:id"
              element={
                <MainLayout>
                  <BlogPostPage />
                </MainLayout>
              }
            />
            <Route path="/mooj-admin" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Routes>
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;