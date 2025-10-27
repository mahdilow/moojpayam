import { createClient } from '@supabase/supabase-js';
import fs from 'fs/promises';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;
if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Supabase URL or Key missing.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);
const BASE_URL = 'https://moojpayam.ir';

const STATIC_PAGES = [
  { url: '/', changefreq: 'daily', priority: '1.0' },
  { url: '/about-us', changefreq: 'monthly', priority: '0.8' },
  { url: '/features', changefreq: 'monthly', priority: '0.8' },
  { url: '/web-services', changefreq: 'monthly', priority: '0.8' },
  { url: '/faq', changefreq: 'monthly', priority: '0.8' },
  { url: '/blog', changefreq: 'weekly', priority: '0.9' },
  { url: '/contact-us', changefreq: 'monthly', priority: '0.7' },
];

async function fetchBlogUrls() {
  const { data, error } = await supabase
    .from('blogs')
    .select('slug, updatedAt')
    .eq('published', true);

  if (error) {
    console.error('Error fetching blogs:', error);
    return [];
  }

  return data.map(blog => ({
    url: `/blog/${blog.slug}`,
    lastmod: blog.updatedAt
      ? new Date(blog.updatedAt).toISOString().split('T')[0]
      : new Date().toISOString().split('T')[0],
    changefreq: 'weekly',
    priority: '0.7',
  }));
}

async function generateSitemap() {
  console.log('🚀 Generating sitemap...');
  const blogUrls = await fetchBlogUrls();
  const allUrls = [...STATIC_PAGES, ...blogUrls];

  const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
      .map(
        page => `  <url>
    <loc>${BASE_URL}${encodeURI(page.url)}</loc>
    ${page.lastmod ? `<lastmod>${page.lastmod}</lastmod>` : ''}
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
      )
      .join('\n')}
</urlset>`;

  try {
    const publicPath = path.resolve(process.cwd(), 'public');
    await fs.mkdir(publicPath, { recursive: true });
    await fs.writeFile(path.join(publicPath, 'sitemap.xml'), sitemapContent);
    console.log(`✅ Sitemap generated successfully! Total URLs: ${allUrls.length}`);
  } catch (error) {
    console.error('❌ Error writing sitemap file:', error);
  }
}

generateSitemap();
