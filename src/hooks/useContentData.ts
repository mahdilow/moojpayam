import { useState, useEffect } from "react";
import { supabase } from "../api/supabaseClient";

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

type ExtendedBlogPost = BlogPost & {
  createdAt?: string;
  score?: number;
};

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

      // Load content from Supabase
      const { data: blogsData, error: blogsError } = await supabase
        .from("blogs")
        .select("*");
      const { data: pricingData, error: pricingError } = await supabase
        .from("pricing")
        .select("*");

      if (blogsError || pricingError) {
        throw new Error("خطا در بارگذاری محتوا");
      }

      setBlogs(blogsData || []);
      setPricing(pricingData || []);
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
  const latestBlogs = (() => {
    if (!publishedBlogs?.length) return [];

    // --- ✅ Safe Date Parser ---
    const parseDate = (blog: ExtendedBlogPost): Date => {
      const d = new Date(blog.createdAt || blog.date);
      // If both are invalid → fallback to epoch (oldest possible)
      return isNaN(d.getTime()) ? new Date(0) : d;
    };

    // --- ✅ Sort by real creation date (newest first) ---
    const sortedByDate = [...publishedBlogs].sort(
      (a, b) => parseDate(b).getTime() - parseDate(a).getTime()
    );

    // --- ✅ Estimate posting frequency to scale recency ---
    const intervals: number[] = [];
    for (let i = 1; i < sortedByDate.length; i++) {
      const prev = parseDate(sortedByDate[i - 1]).getTime();
      const curr = parseDate(sortedByDate[i]).getTime();
      const diffDays = Math.abs((prev - curr) / (1000 * 60 * 60 * 24));
      if (!isNaN(diffDays)) intervals.push(diffDays);
    }

    const avgInterval =
      intervals.length > 0
        ? intervals.reduce((a, b) => a + b, 0) / intervals.length
        : 7; // fallback = weekly posts
    const freshnessWindow = avgInterval * 5; // recency influence window

    // --- ✅ Normalize view counts ---
    const maxViews = Math.max(...publishedBlogs.map((b) => b.views || 0), 1);

    // --- ✅ Compute composite score ---
    const scored = publishedBlogs.map((blog: ExtendedBlogPost) => {
      const createdAt = parseDate(blog);
      const time = createdAt.getTime();
      const daysOld = (Date.now() - time) / (1000 * 60 * 60 * 24);

      // Exponential decay — newer = higher weight
      const ageFactor = Math.exp(-daysOld / freshnessWindow);

      // Scale views relative to the max (0–100)
      const normalizedViews = (blog.views / maxViews) * 100;

      // Weighted combined score (recency dominates)
      const score = ageFactor * 100 + normalizedViews * 0.7;

      return { ...blog, score };
    });

    // --- ✅ Sort by score, tie-breaker = newer date first ---
    return scored
      .sort((a, b) => {
        if (b.score === a.score) {
          return parseDate(b).getTime() - parseDate(a).getTime();
        }
        return b.score - a.score;
      })
      .slice(0, 3); // show top 3 blogs
  })();

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
