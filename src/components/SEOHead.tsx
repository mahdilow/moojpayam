import React from "react";
import { Helmet } from "react-helmet-async";

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
  noindex?: boolean;
  canonical?: string;
  children?: React.ReactNode;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title = "موج پیام | سامانه ارسال پیامک هوشمند و منطقه‌ای",
  description = "سامانه پیشرفته ارسال پیامک تبلیغاتی و اطلاع‌رسانی موج پیام. ارسال پیامک منطقه‌ای، هدفمند و انبوه با بالاترین نرخ تحویل و قیمت مناسب.",
  keywords = "پیامک, ارسال پیامک, سامانه پیامک, پیامک تبلیغاتی, پیامک منطقه‌ای, پنل پیامک, ارسال انبوه پیامک, پیامک هدفمند, موج پیام",
  image = "https://moojpayam.ir/assets/logo.webp",
  url = "https://moojpayam.ir",
  type = "website",
  author,
  publishedTime,
  modifiedTime,
  section,
  tags = [],
  noindex = false,
  canonical,
  children,
}) => {
  const fullTitle = title.includes("موج پیام") ? title : `${title} | موج پیام`;
  const currentUrl = canonical || url;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Robots */}
      <meta
        name="robots"
        content={
          noindex
            ? "noindex, nofollow"
            : "index, follow, max-image-preview:large"
        }
      />

      {/* Canonical URL */}
      <link rel="canonical" href={currentUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="موج پیام" />
      <meta property="og:locale" content="fa_IR" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:site" content="@moojpayam" />

      {/* Article specific meta tags */}
      {type === "article" && (
        <>
          {author && <meta property="article:author" content={author} />}
          {publishedTime && (
            <meta property="article:published_time" content={publishedTime} />
          )}
          {modifiedTime && (
            <meta property="article:modified_time" content={modifiedTime} />
          )}
          {section && <meta property="article:section" content={section} />}
          {tags.map((tag) => (
            <meta key={tag} property="article:tag" content={tag} />
          ))}
        </>
      )}

      {/* Additional SEO meta tags */}
      <meta name="theme-color" content="#4A90E2" />
      <meta name="msapplication-TileColor" content="#4A90E2" />

      {/* Preload critical resources */}
      <link
        rel="preload"
        href="/assets/logo.webp"
        as="image"
        type="image/webp"
      />

      {/* DNS prefetch for external resources */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      {children}
    </Helmet>
  );
};

export default SEOHead;
