import { useState, useEffect } from "react";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  date: string;
  readTime: string;
  views: number;
  category: string;
  tags: string[];
  featured?: boolean;
  published: boolean;
  slug?: string;
}

interface PricingPlan {
  id: number;
  name: string;
  price: string;
  description: string;
  features: Array<{
    title: string;
    included: boolean;
  }>;
  cta: string;
  popular?: boolean;
  color: string;
  active: boolean;
  discount?: number; // New discount field
}

export const useContentData = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [pricing, setPricing] = useState<PricingPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadContent = async () => {
    try {
      setLoading(true);
      setError(null);

      // Load content from API endpoints
      const [blogsRes, pricingRes] = await Promise.all([
        fetch("/api/content/blogs"),
        fetch("/api/content/pricing"),
      ]);

      if (!blogsRes.ok || !pricingRes.ok) {
        throw new Error("خطا در بارگذاری محتوا");
      }

      const [blogsData, pricingData] = await Promise.all([
        blogsRes.json(),
        pricingRes.json(),
      ]);

      setBlogs(blogsData);
      setPricing(pricingData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "خطا در بارگذاری محتوا");
      console.error("Error loading content:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadContent();
  }, []);

  // Get published blogs only
  const publishedBlogs: BlogPost[] = blogs.filter((blog) => blog.published);

  // Get featured blog
  const featuredBlog = publishedBlogs.find((blog) => blog.featured);

  //get latest blogs
  const latestBlogs = publishedBlogs
    .map((blog) => {
      const createdAt = new Date(blog.date); // Use blog.date as per your interface
      const daysOld = Math.floor(
        (Date.now() - createdAt.getTime()) / (1000 * 60 * 60 * 24)
      );
      const recencyBoost = Math.max(0, 30 - daysOld);
      const score = blog.views + recencyBoost;
      return { ...blog, score }; // Add score property
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  // Get active pricing plans
  const activePricingPlans = pricing.filter((plan) => plan.active);

  return {
    blogs: publishedBlogs,
    allBlogs: blogs,
    featuredBlog,
    latestBlogs,
    pricing: activePricingPlans,
    allPricing: pricing,
    loading,
    error,
    refetch: loadContent,
  };
};

export type { BlogPost, PricingPlan };