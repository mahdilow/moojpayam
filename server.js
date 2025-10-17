// Simple server for email handling, admin authentication, and content management
import express from 'express';
import nodemailer from 'nodemailer';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import rateLimit from 'express-rate-limit';
import cookieParser from 'cookie-parser';
import fs from 'fs/promises';
import multer from 'multer';
import { fileURLToPath } from 'url';
import soap from 'soap'; // if using ESM
import sharp from 'sharp';
import { nanoid } from 'nanoid';
import { createClient } from '@supabase/supabase-js';

// ES module compatibility
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

// Supabase Admin Client
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const app = express();


const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

// Middleware
app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  })
);
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Configure multer for file uploads (using memory storage for image processing)
const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    // Check if file is an image
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('فقط فایل‌های تصویری مجاز هستند'), false);
    }
  }
});
app.set('trust proxy', 1); // Trust the first proxy
// Rate limiters
const contactFormLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 2,
  message: { message: 'شما بیش از حد مجاز در ساعت پیام ارسال کرده‌اید. لطفاً بعداً دوباره تلاش کنید.' },
  standardHeaders: true,
  legacyHeaders: false,
});

const otpLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 5,
  message: { message: 'تعداد درخواست‌های کد تایید بیش از حد مجاز. لطفاً ۵ دقیقه صبر کنید.' },
  standardHeaders: true,
  legacyHeaders: false,
});

const adminLoginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  message: { message: 'تعداد تلاش‌های ورود بیش از حد مجاز. لطفاً ۱۵ دقیقه صبر کنید.' },
  standardHeaders: true,
  legacyHeaders: false,
});

const uploadLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // 20 uploads per 15 minutes
  message: { message: 'تعداد آپلود فایل بیش از حد مجاز. لطفاً کمی صبر کنید.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// View tracking rate limiter (prevent spam)
const viewTrackingLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10, // Max 10 views per minute per IP
  message: { message: 'تعداد درخواست‌ها بیش از حد مجاز' },
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => {
    // Combine IP and blog post ID for more granular limiting
    return `${req.ip}-${req.params.id}`;
  }
});

// Simple session store
const activeSessions = new Set();
const otpStore = new Map(); // In-memory OTP store

// Helper functions for JSON file operations
const readJsonFile = async (filename) => {
  try {
    const filePath = path.join(__dirname, 'data', filename);
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading ${filename}:`, error);
    // For pricing, it's better to return a default structure
    if (filename === 'pricing.json') return [];
    // For logs, returning empty is also safe
    if (filename === 'admin-logs.json') return [];
    // If another file type were added, it might need a different default
    return [];
  }
};

const writeJsonFile = async (filename, data) => {
  try {
    const filePath = path.join(__dirname, 'data', filename);
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error(`Error writing ${filename}:`, error);
    return false;
  }
};

// Admin logging functions
const logAdminAction = async (logEntry) => {
  try {
    const logs = await readJsonFile('admin-logs.json');
    logs.unshift(logEntry); // Add to beginning

    // Keep only last 10000 logs
    if (logs.length > 10000) {
      logs.splice(10000);
    }

    await writeJsonFile('admin-logs.json', logs);
    console.log(`Admin action logged: ${logEntry.action} by ${logEntry.adminUser}`);
  } catch (error) {
    console.error('Error logging admin action:', error);
  }
};

const createLogEntry = (adminUser, action, category, details, severity = 'medium', sessionId = null) => {
  return {
    id: `log_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    timestamp: new Date().toISOString(),
    adminUser,
    action,
    category,
    details,
    severity,
    sessionId
  };
};

// Get admin user from session
const getAdminUserFromSession = (req) => {
  const sessionToken = req.cookies.admin_session;
  return sessionToken && activeSessions.has(sessionToken) ? 'admin' : 'unknown';
};

// Ensure data and uploads directories exist
const ensureDirectories = async () => {
  try {
    const dataDir = path.join(__dirname, 'data');
    const uploadsDir = path.join(__dirname, 'uploads');
    await fs.mkdir(dataDir, { recursive: true });
    await fs.mkdir(uploadsDir, { recursive: true });
  } catch (error) {
    console.error('Error creating directories:', error);
  }
};

// Initialize directories
ensureDirectories();

// Admin logging endpoints
app.post('/api/admin/logs', requireAdmin, async (req, res) => {
  try {
    const logEntry = req.body;
    await logAdminAction(logEntry);
    res.json({ message: 'Log saved successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error saving log' });
  }
});

app.get('/api/admin/logs', requireAdmin, async (req, res) => {
  try {
    const { category, severity, dateRange, search, limit = 100, offset = 0 } = req.query;
    let logs = await readJsonFile('admin-logs.json');

    // Apply filters
    if (category && category !== 'all') {
      logs = logs.filter(log => log.category === category);
    }

    if (severity && severity !== 'all') {
      logs = logs.filter(log => log.severity === severity);
    }

    if (dateRange && dateRange !== 'all') {
      const now = new Date();
      const days = parseInt(dateRange.replace('d', ''));
      const cutoff = new Date(now.getTime() - (days * 24 * 60 * 60 * 1000));
      logs = logs.filter(log => new Date(log.timestamp) >= cutoff);
    }

    if (search) {
      const searchLower = search.toLowerCase();
      logs = logs.filter(log =>
        log.action.toLowerCase().includes(searchLower) ||
        log.adminUser.toLowerCase().includes(searchLower) ||
        JSON.stringify(log.details).toLowerCase().includes(searchLower)
      );
    }

    // Apply pagination
    const total = logs.length;
    const paginatedLogs = logs.slice(parseInt(offset), parseInt(offset) + parseInt(limit));

    // Log the view action
    const adminUser = getAdminUserFromSession(req);
    await logAdminAction(createLogEntry(
      adminUser,
      'View admin logs',
      'system',
      {
        filters: { category, severity, dateRange, search },
        resultCount: paginatedLogs.length,
        success: true
      },
      'low'
    ));

    res.json({
      logs: paginatedLogs,
      total,
      offset: parseInt(offset),
      limit: parseInt(limit)
    });
  } catch (error) {
    console.error('Error fetching logs:', error);
    res.status(500).json({ message: 'Error fetching logs' });
  }
});

app.get('/api/admin/logs/export', requireAdmin, async (req, res) => {
  try {
    const logs = await readJsonFile('admin-logs.json');
    const adminUser = getAdminUserFromSession(req);

    // Log the export action
    await logAdminAction(createLogEntry(
      adminUser,
      'Export admin logs',
      'system',
      {
        exportedCount: logs.length,
        success: true
      },
      'medium'
    ));

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', `attachment; filename=admin-logs-${new Date().toISOString().split('T')[0]}.json`);
    res.json(logs);
  } catch (error) {
    console.error('Error exporting logs:', error);
    res.status(500).json({ message: 'Error exporting logs' });
  }
});

// Image upload endpoint
app.post('/api/admin/upload', uploadLimiter, requireAdmin, upload.single('image'), async (req, res) => {
  const adminUser = getAdminUserFromSession(req);

  try {
    if (!req.file) {
      return res.status(400).json({ message: 'هیچ فایلی انتخاب نشده است' });
    }

    // Generate unique filename with .webp extension
    const filename = `image-${nanoid()}.webp`;

    // Convert and optimize image to WebP format in memory
    const optimizedBuffer = await sharp(req.file.buffer)
      .webp({ quality: 85, effort: 6 })
      .resize(2000, 2000, { fit: 'inside', withoutEnlargement: true })
      .toBuffer();

    // Upload to Supabase Storage
    const { data, error: uploadError } = await supabase.storage
      .from('blog-images')
      .upload(filename, optimizedBuffer, {
        contentType: 'image/webp',
        upsert: false,
      });

    if (uploadError) {
      throw uploadError;
    }

    // Get the public URL
    const { data: { publicUrl } } = supabase.storage
      .from('blog-images')
      .getPublicUrl(filename);

    res.json({
      message: 'تصویر با موفقیت آپلود و بهینه‌سازی شد',
      imageUrl: publicUrl,
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: 'خطا در آپلود تصویر' });
  }
});

// Delete uploaded image endpoint
app.delete('/api/admin/upload/:filename', requireAdmin, async (req, res) => {
  try {
    const filename = req.params.filename;
    const { error } = await supabase.storage.from('blog-images').remove([filename]);
    if (error) throw error;

    res.json({ message: 'تصویر با موفقیت حذف شد' });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ message: 'خطا در حذف تصویر' });
  }
});

// Get list of uploaded images
app.get('/api/admin/images', requireAdmin, async (req, res) => {
  try {
    const { data, error } = await supabase.storage.from('blog-images').list();
    if (error) throw error;

    const images = data.map(file => ({
      filename: file.name,
      url: `${supabaseUrl}/storage/v1/object/public/blog-images/${file.name}`,
      uploadDate: file.created_at,
    }));

    res.json(images);
  } catch (error) {
    console.error('Error reading images:', error);
    res.status(500).json({ message: 'خطا در بارگذاری لیست تصاویر' });
  }
});


// OTP endpoint
app.post('/api/send-otp', otpLimiter, async (req, res) => {
  const { phone } = req.body;

  if (!phone || !/^(\+98|0)?9\d{9}$/.test(phone)) {
    return res.status(400).json({ message: 'شماره موبایل نامعتبر است' });
  }

  try {
    // Generate OTP
    const otp = Math.floor(1000 + Math.random() * 9000).toString(); // 4-digit OTP
    const expires = Date.now() + 2 * 60 * 1000; // 2 minutes
    const expiresInSeconds = 120; // 2 minutes in seconds


    otpStore.set(phone, { otp, expires });

    // WSDL SOAP client
    const wsdlUrl = 'http://api.payamak-panel.com/post/send.asmx?wsdl';
    const username = process.env.SMS_USERNAME;
    const password = process.env.SMS_PASSWORD;
    const bodyId = process.env.SMS_BODY_ID;

    const client = await soap.createClientAsync(wsdlUrl);

    const args = {
      username,
      password,
      text: { string: [otp] }, // OTP as array
      to: phone,
      bodyId,
    };

    // Call SendByBaseNumber
    const result = await client.SendByBaseNumberAsync(args);

    // Access numeric response safely
    const responseCode =
      (result && result.SendByBaseNumberResult) ||
      (Array.isArray(result) && result[0]?.SendByBaseNumberResult);

    if (!responseCode || parseInt(responseCode) <= 0) {
      console.error('Failed to send OTP, response code:', responseCode);
      return res.status(500).json({ message: 'خطا در ارسال کد تایید' });
    }

    console.log(`✅ OTP for ${phone}: ${otp} (response code: ${responseCode})`);

    res.json({
      success: true,
      message: `کد تایید به شماره ${phone} ارسال شد`,
      expiresIn: expiresInSeconds,
    });
  } catch (error) {
    console.error('OTP sending error:', error);
    res.status(500).json({ message: 'خطا در ارسال کد تایید' });
  }
});

app.post('/api/verify-otp', otpLimiter, async (req, res) => {
  const { phone, otp } = req.body;

  if (!phone || !otp) {
    return res.status(400).json({ message: 'شماره موبایل و کد تایید الزامی است' });
  }

  const storedOtp = otpStore.get(phone);

  if (!storedOtp) {
    return res.status(400).json({ message: 'کد تایید برای این شماره یافت نشد' });
  }

  if (Date.now() > storedOtp.expires) {
    otpStore.delete(phone);
    return res.status(400).json({ message: 'کد تایید منقضی شده است' });
  }

  if (storedOtp.otp === otp) {
    otpStore.delete(phone); // OTP is used, so delete it
    return res.json({ success: true, verified: true, message: 'شماره موبایل با موفقیت تایید شد' });
  } else {
    return res.status(400).json({ success: false, verified: false, message: 'کد تایید نامعتبر است' });
  }
});


// Email endpoint
app.post('/api/send-email', contactFormLimiter, async (req, res) => {
  const { name, phone, email, subject, message, otpVerified } = req.body;

  // Validate required fields
  if (!name || !phone || !subject || !message) {
    return res.status(400).json({ message: 'لطفاً همه فیلدهای الزامی را پر کنید' });
  }

  // Validate phone number
  const phoneRegex = /^(\+98|0)?9\d{9}$/;
  if (!phoneRegex.test(phone)) {
    return res.status(400).json({
      message: 'شماره موبایل نامعتبر است. فرمت صحیح: 09XXXXXXXXX'
    });
  }

  // Check OTP verification (mandatory for phone)
  if (!otpVerified) {
    return res.status(400).json({
      message: 'لطفاً ابتدا شماره موبایل خود را تایید کنید'
    });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_RECIPIENT || 'pyrotech.dev@proton.me',
      subject: `پیام جدید از سایت موج پیام: ${subject}`,
      html: `
        <div dir="rtl" style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>پیام جدید از فرم تماس سایت موج پیام</h2>
          <p><strong>زمان ارسال:</strong> ${new Date().toLocaleString('fa-IR', { timeZone: 'Asia/Tehran' })}</p>
          <p><strong>نام:</strong> ${name}</p>
          <p><strong>شماره موبایل:</strong> ${phone}</p>
          ${email ? `<p><strong>ایمیل:</strong> ${email}</p>` : ''}
          <p><strong>موضوع:</strong> ${subject}</p>
          <p><strong>پیام:</strong></p>
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px;">
            ${message.replace(/\n/g, '<br>')}
          </div>
          <hr style="border: 1px solid #eee; margin: 20px 0;" />
          <p style="color: #28a745; font-weight: bold;">✅ شماره موبایل تایید شده</p>
          <hr style="border: 1px solid #eee; margin: 20px 0;" />
          <p>این ایمیل به صورت خودکار از سایت موج پیام ارسال شده است.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({ message: 'پیام شما با موفقیت ارسال شد' });
  } catch (error) {
    console.error('Email sending error:', error);
    return res.status(500).json({
      message: 'خطا در ارسال ایمیل، لطفا دوباره تلاش کنید',
      error: error.message
    });
  }
});

// Admin authentication
app.post('/api/mooj-admin', adminLoginLimiter, async (req, res) => {
  const { username, password } = req.body;
  const clientIP = req.ip || req.connection.remoteAddress;
  const userAgent = req.get('User-Agent');

  if (!username || !password) {
    await logAdminAction(createLogEntry(
      username || 'unknown',
      'Login attempt failed - missing credentials',
      'auth',
      {
        ipAddress: clientIP,
        userAgent,
        success: false,
        errorMessage: 'Missing username or password'
      },
      'medium'
    ));
    return res.status(400).json({ message: 'نام کاربری و رمز عبور الزامی است' });
  }

  if (username === process.env.ADMIN_USER && password === process.env.ADMIN_PASSWORD) {
    const sessionToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    activeSessions.add(sessionToken);

    res.cookie('admin_session', sessionToken, {
      maxAge: 2 * 60 * 60 * 1000, // 2 hours
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });

    await logAdminAction(createLogEntry(
      username,
      'Successful login',
      'auth',
      {
        ipAddress: clientIP,
        userAgent,
        sessionId: sessionToken,
        success: true
      },
      'medium',
      sessionToken
    ));

    console.log(`Admin login successful at ${new Date().toISOString()}`);
    return res.status(200).json({
      message: 'ورود شما با موفقیت انجام شد. خوش آمدید!',
      redirectTo: '/admin/dashboard'
    });
  } else {
    await logAdminAction(createLogEntry(
      username,
      'Failed login attempt',
      'auth',
      {
        ipAddress: clientIP,
        userAgent,
        success: false,
        errorMessage: 'Invalid credentials'
      },
      'high'
    ));

    console.log(`Failed admin login attempt at ${new Date().toISOString()} - Username: ${username}`);
    return res.status(401).json({ message: 'نام کاربری یا رمز عبور اشتباه است.' });
  }
});

app.get('/api/admin/verify', (req, res) => {
  const sessionToken = req.cookies.admin_session;

  if (!sessionToken || !activeSessions.has(sessionToken)) {
    return res.status(401).json({ message: 'غیر مجاز' });
  }

  return res.status(200).json({ message: 'تایید شد' });
});

app.post('/api/admin/logout', async (req, res) => {
  const sessionToken = req.cookies.admin_session;
  const adminUser = getAdminUserFromSession(req);

  if (sessionToken) {
    activeSessions.delete(sessionToken);

    await logAdminAction(createLogEntry(
      adminUser,
      'Logout',
      'auth',
      {
        sessionId: sessionToken,
        success: true
      },
      'low',
      sessionToken
    ));
  }

  res.clearCookie('admin_session');
  return res.status(200).json({ message: 'خروج موفقیت‌آمیز' });
});

// Admin middleware
function requireAdmin(req, res, next) {
  const sessionToken = req.cookies.admin_session;

  if (!sessionToken || !activeSessions.has(sessionToken)) {
    return res.status(401).json({ message: 'دسترسی غیر مجاز' });
  }

  next();
}

// Blog post view tracking endpoint
app.post('/api/blogs/:id/view', viewTrackingLimiter, async (req, res) => {
  try {
    const blogId = req.params.id;
    const clientIp = req.ip; // Get client IP for logging

    if (!blogId) {
      return res.status(400).json({ message: 'شناسه مقاله نامعتبر است' });
    }

    // 1. Attempt to insert a new view record.
    const { error: insertError } = await supabase
      .from('blog_views')
      .insert({ blog_id: blogId, viewer_ip: clientIp });

    if (insertError) {
      // If it's a unique violation, the user has already viewed this post.
      if (insertError.code === '23505') {
        // Fetch the current view count and return it without incrementing.
        const { data: currentBlog, error: fetchError } = await supabase
          .from('blogs')
          .select('views')
          .eq('id', blogId)
          .single();

        if (fetchError) throw fetchError;

        return res.json({
          message: 'بازدید شما قبلا ثبت شده است',
          views: currentBlog.views
        });
      }
      // If it's a foreign key error, the blog doesn't exist.
      if (insertError.code === '23503') {
        return res.status(404).json({ message: 'مقاله یافت نشد' });
      }
      // For any other error, we throw it.
      throw insertError;
    }

    // 2. If the insert was successful, it's a new unique view. Increment the count.
    // Note: This is a non-atomic operation (read-then-write). For high-traffic sites, a database function (RPC) would be safer.
    const { data: blog, error: fetchError } = await supabase
      .from('blogs')
      .select('views')
      .eq('id', blogId)
      .single();

    if (fetchError) throw fetchError;

    const newViews = (blog.views || 0) + 1;

    const { data: updatedBlog, error: updateError } = await supabase
      .from('blogs')
      .update({ views: newViews, lastViewed: new Date().toISOString() })
      .eq('id', blogId)
      .select('views')
      .single();

    if (updateError) throw updateError;

    res.json({
      message: 'بازدید شما با موفقیت ثبت شد',
      views: updatedBlog.views
    });

  } catch (error) {
    console.error('View tracking error:', error);
    res.status(500).json({ message: 'خطا در ثبت بازدید' });
  }
});

// Public content endpoints (no authentication required)
/*
app.get('/api/content/blogs', async (req, res) => {
  try {
    const blogs = await readJsonFile('blogs.json');
    // Only return published blogs for public API
    const publishedBlogs = blogs.filter(blog => blog.published);
    res.json(publishedBlogs);
  } catch (error) {
    res.status(500).json({ message: 'خطا در بارگذاری مقالات' });
  }
});
*/

// Helper function to get related posts
const getRelatedPosts = async (blog) => {
  let relatedPosts = [];
  // First, try fetching explicitly related posts
  if (blog.related_posts && blog.related_posts.length > 0) {
    const { data: explicitRelated } = await supabase
      .from('blogs')
      .select('*')
      .in('id', blog.related_posts)
      .eq('published', true)
      .neq('id', blog.id);
    if (explicitRelated) relatedPosts = explicitRelated;
  }

  // If not enough related posts, fetch by category
  if (relatedPosts.length < 2) {
    const { data: categoryRelated } = await supabase
      .from('blogs')
      .select('*')
      .eq('category', blog.category)
      .eq('published', true)
      .neq('id', blog.id)
      .limit(2 - relatedPosts.length);
    if (categoryRelated) {
      const existingIds = new Set(relatedPosts.map(p => p.id));
      relatedPosts.push(...categoryRelated.filter(p => !existingIds.has(p.id)));
    }
  }

  // If still not enough, fetch any other posts
  if (relatedPosts.length < 2) {
    const { data: anyRelated } = await supabase
      .from('blogs')
      .select('*')
      .eq('published', true)
      .neq('id', blog.id)
      .limit(2 - relatedPosts.length);
    if (anyRelated) {
      const existingIds = new Set(relatedPosts.map(p => p.id));
      relatedPosts.push(...anyRelated.filter(p => !existingIds.has(p.id)));
    }
  }
  return relatedPosts;
}

// Get single blog post with SEO data and related posts
app.get('/api/content/blogs/:id', async (req, res) => {
  try {
    const blogId = req.params.id;
    const { data: blog, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('id', blogId)
      .eq('published', true)
      .single();

    if (error || !blog) {
      if (error && error.code !== 'PGRST116') { // PGRST116 is "No rows found"
        throw error;
      }
      return res.status(404).json({ message: 'مقاله یافت نشد' });
    }

    const relatedPosts = await getRelatedPosts(blog);

    res.json({
      ...blog,
      relatedPosts
    });
  } catch (error) {
    console.error('Error fetching blog by id:', error);
    res.status(500).json({ message: 'خطا در بارگذاری مقاله' });
  }
});

// Get single blog post with SEO data and related posts by slug
app.get('/api/content/blogs/slug/:slug', async (req, res) => {
  try {
    const blogSlug = decodeURIComponent(req.params.slug);

    const { data: blog, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('slug', blogSlug)
      .eq('published', true)
      .single();

    if (error || !blog) {
      if (error && error.code !== 'PGRST116') { // PGRST116 is "No rows found"
        throw error;
      }
      return res.status(404).json({ message: 'مقاله یافت نشد' });
    }

    const relatedPosts = await getRelatedPosts(blog);

    res.json({
      ...blog,
      relatedPosts
    });
  } catch (error) {
    console.error('Error fetching blog by slug:', error);
    res.status(500).json({ message: 'خطا در بارگذاری مقاله' });
  }
});
/*
app.get('/api/content/pricing', async (req, res) => {
  try {
    const pricing = await readJsonFile('pricing.json');
    res.json(pricing);
  } catch (error) {
    res.status(500).json({ message: 'خطا در بارگذاری تعرفه‌ها' });
  }
});
*/

// Announcement endpoints
app.get('/api/content/announcement', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('announcements')
      .select('*')
      .eq('isActive', true)
      .or(`expiresAt.is.null,expiresAt.gt.${new Date().toISOString()}`)
      .limit(1)
      .single();

    if (error && error.code !== 'PGRST116') throw error; // Ignore no rows found

    res.json(data);
  } catch (error) {
    console.error('Error fetching announcement:', error);
    res.status(500).json({ message: 'خطا در بارگذاری اعلان' });
  }
});

app.get('/api/admin/announcements', requireAdmin, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('announcements')
      .select('*')
      .order('createdAt', { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (error) {
    console.error('Error fetching announcements:', error);
    res.status(500).json({ message: 'خطا در بارگذاری اعلان‌ها' });
  }
});

app.post('/api/admin/announcements', requireAdmin, async (req, res) => {
  try {
    const newAnnouncement = {
      ...req.body,
      id: nanoid() // Generate a unique ID
    };
    const { error } = await supabase.from('announcements').insert([newAnnouncement]);
    if (error) throw error;
    res.json({ message: 'اعلان با موفقیت ایجاد شد' });
  } catch (error) {
    console.error('Error creating announcement:', error);
    res.status(500).json({ message: 'خطا در ایجاد اعلان' });
  }
});

app.put('/api/admin/announcements/:id', requireAdmin, async (req, res) => {
  try {
    const { error } = await supabase
      .from('announcements')
      .update(req.body)
      .eq('id', req.params.id);
    if (error) throw error;
    res.json({ message: 'اعلان با موفقیت ویرایش شد' });
  } catch (error) {
    console.error('Error updating announcement:', error);
    res.status(500).json({ message: 'خطا در ویرایش اعلان' });
  }
});

app.delete('/api/admin/announcements/:id', requireAdmin, async (req, res) => {
  try {
    const { error } = await supabase
      .from('announcements')
      .delete()
      .eq('id', req.params.id);
    if (error) throw error;
    res.json({ message: 'اعلان با موفقیت حذف شد' });
  } catch (error) {
    console.error('Error deleting announcement:', error);
    res.status(500).json({ message: 'خطا در حذف اعلان' });
  }
});

app.patch('/api/admin/announcements/:id/toggle', requireAdmin, async (req, res) => {
  try {
    const { error } = await supabase
      .from('announcements')
      .update({ isActive: req.body.isActive })
      .eq('id', req.params.id);
    if (error) throw error;
    res.json({ message: 'وضعیت اعلان تغییر کرد' });
  } catch (error) {
    console.error('Error toggling announcement status:', error);
    res.status(500).json({ message: 'خطا در تغییر وضعیت اعلان' });
  }
});

// Admin dashboard stats
app.get('/api/admin/stats', requireAdmin, async (req, res) => {
  const adminUser = getAdminUserFromSession(req);

  try {
    // Pricing data is still from JSON
    const pricing = await readJsonFile('pricing.json');

    // Fetch blog stats from Supabase
    const { data: blogs, error: blogsError } = await supabase
      .from('blogs')
      .select('views, published, lastViewed, id, title');

    if (blogsError) throw blogsError;

    // Most viewed post
    const { data: mostViewedPostData, error: mostViewedError } = await supabase
      .from('blogs')
      .select('title, views')
      .order('views', { ascending: false })
      .limit(1)
      .single();

    if (mostViewedError && mostViewedError.code !== 'PGRST116') throw mostViewedError;

    const stats = {
      totalPosts: blogs.filter(blog => blog.published).length,
      totalViews: blogs.reduce((sum, blog) => sum + (blog.views || 0), 0),
      activePlans: pricing.filter(plan => plan.active).length,
      draftPosts: blogs.filter(blog => !blog.published).length,
      mostViewedPost: mostViewedPostData || { views: 0, title: 'هیچ مقاله‌ای' },
      recentViews: blogs
        .filter(blog => blog.lastViewed)
        .sort((a, b) => new Date(b.lastViewed).getTime() - new Date(a.lastViewed).getTime())
        .slice(0, 5)
    };

    await logAdminAction(createLogEntry(
      adminUser,
      'View dashboard stats',
      'system',
      { success: true },
      'low'
    ));

    res.json(stats);
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    await logAdminAction(createLogEntry(
      adminUser,
      'View dashboard stats failed',
      'system',
      { success: false, errorMessage: error.message },
      'medium'
    ));
    res.status(500).json({ message: 'خطا در بارگذاری آمار' });
  }
});

// Blog management endpoints
app.get('/api/admin/blogs', requireAdmin, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .order('createdAt', { ascending: false });

    if (error) throw error;

    // Convert snake_case to camelCase for the frontend
    const camelCaseBlogs = data.map(blog => ({
      id: blog.id,
      title: blog.title,
      excerpt: blog.excerpt,
      content: blog.content,
      image: blog.image,
      author: blog.author,
      date: blog.date,
      readTime: blog.read_time,
      views: blog.views,
      category: blog.category,
      tags: blog.tags,
      featured: blog.featured,
      published: blog.published,
      slug: blog.slug,
      createdAt: blog.created_at,
      updatedAt: blog.updated_at,
      relatedPosts: blog.related_posts,
      metaDescription: blog.meta_description,
    }));

    res.json(camelCaseBlogs);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({ message: 'خطا در بارگذاری مقالات' });
  }
});

app.post('/api/admin/blogs', requireAdmin, async (req, res) => {
  try {
    const post = req.body;

    // Auto-generate a unique slug from the title
    const generateSlug = async (title) => {
      const baseSlug = title
        .toString()
        .toLowerCase()
        .replace(/\s+/g, '-') // Replace spaces with -
        .replace(/[^\u0600-\u06FF\w\-]+/g, '') // Remove all non-word chars except Persian
        .replace(/\-\-+/g, '-') // Replace multiple - with single -
        .replace(/^-+/, '') // Trim - from start of text
        .replace(/-+$/, ''); // Trim - from end of text

      let slug = baseSlug;
      let count = 2;
      let slugExists = true;

      while (slugExists) {
        const { data, error } = await supabase
          .from('blogs')
          .select('slug')
          .eq('slug', slug)
          .single();

        if (error && error.code !== 'PGRST116') throw error; // Ignore "No rows found"

        if (!data) {
          slugExists = false;
        } else {
          slug = `${baseSlug}-${count}`;
          count++;
        }
      }
      return slug;
    };

    // Automatically find related posts based on category
    const { data: relatedPostsData } = await supabase
      .from('blogs')
      .select('id')
      .eq('category', post.category)
      .eq('published', true)
      .order('views', { ascending: false })
      .limit(2);

    const relatedPostIds = relatedPostsData ? relatedPostsData.map(p => p.id) : [];

    // Auto-generate meta description from excerpt
    const metaDescription = post.excerpt 
      ? post.excerpt.substring(0, 160) 
      : '';

    const newPost = {
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      image: post.image,
      author: post.author,
      date: new Date().toLocaleDateString('fa-IR'),
      read_time: post.readTime,
      views: 0,
      category: post.category,
      tags: post.tags,
      featured: post.featured,
      published: post.published,
      slug: await generateSlug(post.title), // Generate the slug here
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      related_posts: relatedPostIds, // Use the auto-generated list
      meta_description: metaDescription, // Use the auto-generated meta description
    };

    const { data, error } = await supabase.from('blogs').insert([newPost]).select().single();
    if (error) throw error;

    // Convert snake_case to camelCase for the frontend
    const camelCaseBlog = {
      id: data.id,
      title: data.title,
      excerpt: data.excerpt,
      content: data.content,
      image: data.image,
      author: data.author,
      date: data.date,
      readTime: data.read_time,
      views: data.views,
      category: data.category,
      tags: data.tags,
      featured: data.featured,
      published: data.published,
      slug: data.slug,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
      relatedPosts: data.related_posts,
      metaDescription: data.meta_description,
    };

    res.json({ message: 'مقاله با موفقیت ایجاد شد', blog: camelCaseBlog });
  } catch (error) {
    console.error('Error creating blog post:', error);
    res.status(500).json({ message: 'خطا در ایجاد مقاله' });
  }
});

app.put('/api/admin/blogs/:id', requireAdmin, async (req, res) => {
  const adminUser = getAdminUserFromSession(req);
  const blogId = req.params.id;

  try {
    const post = req.body;

    // Auto-generate a unique slug from the title
    const generateSlug = async (title, currentId) => {
      const baseSlug = title
        .toString()
        .toLowerCase()
        .replace(/\s+/g, '-') // Replace spaces with -
        .replace(/[^\u0600-\u06FF\w\-]+/g, '') // Remove all non-word chars except Persian
        .replace(/\-\-+/g, '-') // Replace multiple - with single -
        .replace(/^-+/, '') // Trim - from start of text
        .replace(/-+$/, ''); // Trim - from end of text

      let slug = baseSlug;
      let count = 2;
      let slugExists = true;

      while (slugExists) {
        const { data, error } = await supabase
          .from('blogs')
          .select('id')
          .eq('slug', slug)
          .neq('id', currentId) // Exclude the current post from the check
          .single();

        if (error && error.code !== 'PGRST116') throw error;

        if (!data) {
          slugExists = false;
        } else {
          slug = `${baseSlug}-${count}`;
          count++;
        }
      }
      return slug;
    };

    const updatedPost = {
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      image: post.image,
      author: post.author,
      read_time: post.readTime,
      category: post.category,
      tags: post.tags,
      featured: post.featured,
      published: post.published,
      slug: await generateSlug(post.title, blogId), // Regenerate slug if needed
      related_posts: post.relatedPosts,
      meta_description: post.metaDescription,
      updatedAt: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from('blogs')
      .update(updatedPost)
      .eq('id', blogId)
      .select()
      .single();

    if (error) {
      if (error.code === 'PGRST116') { // No rows found
        return res.status(404).json({ message: 'مقاله یافت نشد' });
      }
      throw error;
    }

    await logAdminAction(createLogEntry(
      adminUser,
      'Update blog post',
      'content',
      {
        resourceType: 'blog',
        resourceId: blogId,
        newData: { title: data.title, category: data.category },
        success: true
      },
      'medium'
    ));

    res.json({ message: 'مقاله با موفقیت ویرایش شد', blog: data });
  } catch (error) {
    console.error('Error updating blog post:', error);
    await logAdminAction(createLogEntry(
      adminUser,
      'Update blog post failed',
      'content',
      { resourceType: 'blog', resourceId: blogId, success: false, errorMessage: error.message },
      'medium'
    ));
    res.status(500).json({ message: 'خطا در ویرایش مقاله' });
  }
});

app.delete('/api/admin/blogs/:id', requireAdmin, async (req, res) => {
  const adminUser = getAdminUserFromSession(req);
  const blogId = req.params.id;

  try {
    const { data, error } = await supabase
      .from('blogs')
      .delete()
      .eq('id', blogId)
      .select('title, category')
      .single();

    if (error) {
      if (error.code === 'PGRST116') { // No rows found
        return res.status(404).json({ message: 'مقاله یافت نشد' });
      }
      throw error;
    }

    await logAdminAction(createLogEntry(
      adminUser,
      'Delete blog post',
      'content',
      {
        resourceType: 'blog',
        resourceId: blogId,
        oldData: { title: data.title, category: data.category },
        success: true
      },
      'high'
    ));

    res.json({ message: 'مقاله با موفقیت حذف شد' });
  } catch (error) {
    console.error('Error deleting blog post:', error);
    await logAdminAction(createLogEntry(
      adminUser,
      'Delete blog post failed',
      'content',
      { resourceType: 'blog', resourceId: blogId, success: false, errorMessage: error.message },
      'high'
    ));
    res.status(500).json({ message: 'خطا در حذف مقاله' });
  }
});

// Pricing management endpoints
app.get('/api/admin/pricing', requireAdmin, async (req, res) => {
  const adminUser = getAdminUserFromSession(req);

  try {
    const pricing = await readJsonFile('pricing.json');

    await logAdminAction(createLogEntry(
      adminUser,
      'View pricing plans',
      'content',
      { planCount: pricing.length, success: true },
      'low'
    ));

    res.json(pricing);
  } catch (error) {
    await logAdminAction(createLogEntry(
      adminUser,
      'View pricing plans failed',
      'content',
      { success: false, errorMessage: error.message },
      'medium'
    ));
    res.status(500).json({ message: 'خطا در بارگذاری تعرفه‌ها' });
  }
});

app.post('/api/admin/pricing', requireAdmin, async (req, res) => {
  const adminUser = getAdminUserFromSession(req);

  try {
    const pricing = await readJsonFile('pricing.json');
    const newPlan = { ...req.body, id: Date.now() };

    pricing.push(newPlan);
    const success = await writeJsonFile('pricing.json', pricing);

    if (success) {
      await logAdminAction(createLogEntry(
        adminUser,
        'Create pricing plan',
        'content',
        {
          resourceType: 'pricing',
          resourceId: newPlan.id,
          newData: { name: newPlan.name, price: newPlan.price },
          success: true
        },
        'medium'
      ));

      res.json({ message: 'پلن با موفقیت ایجاد شد', plan: newPlan });
    } else {
      res.status(500).json({ message: 'خطا در ذخیره پلن' });
    }
  } catch (error) {
    await logAdminAction(createLogEntry(
      adminUser,
      'Create pricing plan failed',
      'content',
      { success: false, errorMessage: error.message },
      'medium'
    ));
    res.status(500).json({ message: 'خطا در ایجاد پلن' });
  }
});

app.put('/api/admin/pricing/:id', requireAdmin, async (req, res) => {
  const adminUser = getAdminUserFromSession(req);

  try {
    const pricing = await readJsonFile('pricing.json');
    const planId = parseInt(req.params.id);
    const planIndex = pricing.findIndex(plan => plan.id === planId);

    if (planIndex === -1) {
      return res.status(404).json({ message: 'پلن یافت نشد' });
    }

    const oldPlan = { ...pricing[planIndex] };
    pricing[planIndex] = { ...pricing[planIndex], ...req.body, id: planId };
    const success = await writeJsonFile('pricing.json', pricing);

    if (success) {
      await logAdminAction(createLogEntry(
        adminUser,
        'Update pricing plan',
        'content',
        {
          resourceType: 'pricing',
          resourceId: planId,
          oldData: { name: oldPlan.name, price: oldPlan.price },
          newData: { name: pricing[planIndex].name, price: pricing[planIndex].price },
          success: true
        },
        'medium'
      ));

      res.json({ message: 'پلن با موفقیت ویرایش شد', plan: pricing[planIndex] });
    } else {
      res.status(500).json({ message: 'خطا در ذخیره تغییرات' });
    }
  } catch (error) {
    await logAdminAction(createLogEntry(
      adminUser,
      'Update pricing plan failed',
      'content',
      { resourceType: 'pricing', resourceId: req.params.id, success: false, errorMessage: error.message },
      'medium'
    ));
    res.status(500).json({ message: 'خطا در ویرایش پلن' });
  }
});

app.delete('/api/admin/pricing/:id', requireAdmin, async (req, res) => {
  const adminUser = getAdminUserFromSession(req);

  try {
    const pricing = await readJsonFile('pricing.json');
    const planId = parseInt(req.params.id);
    const planToDelete = pricing.find(plan => plan.id === planId);
    const filteredPricing = pricing.filter(plan => plan.id !== planId);

    if (filteredPricing.length === pricing.length) {
      return res.status(404).json({ message: 'پلن یافت نشد' });
    }

    const success = await writeJsonFile('pricing.json', filteredPricing);

    if (success) {
      await logAdminAction(createLogEntry(
        adminUser,
        'Delete pricing plan',
        'content',
        {
          resourceType: 'pricing',
          resourceId: planId,
          oldData: { name: planToDelete?.name, price: planToDelete?.price },
          success: true
        },
        'high'
      ));

      res.json({ message: 'پلن با موفقیت حذف شد' });
    } else {
      res.status(500).json({ message: 'خطا در حذف پلن' });
    }
  } catch (error) {
    await logAdminAction(createLogEntry(
      adminUser,
      'Delete pricing plan failed',
      'content',
      { resourceType: 'pricing', resourceId: req.params.id, success: false, errorMessage: error.message },
      'high'
    ));
    res.status(500).json({ message: 'خطا در حذف پلن' });
  }
});

// URL Shortener Endpoints
app.post('/api/shorten', async (req, res) => {
  let { longUrl, slug, category } = req.body;

  if (!longUrl || !slug || !category) {
    return res.status(400).json({ message: 'longUrl, slug, and category are required' });
  }

  const cleanedUrl = longUrl.split('?')[0].split('#')[0];

  try {
    // Check if this exact URL has already been shortened
    const { data: existing, error: existingError } = await supabase
      .from('shortlinks')
      .select('slug')
      .eq('long_url', cleanedUrl)
      .single();

    if (existingError && existingError.code !== 'PGRST116') throw existingError;

    if (existing) {
      return res.json({ shortUrl: `${FRONTEND_URL}/s/${existing.slug}` });
    }

    // Sanitize category
    const sanitizedCategory = (category || 'general').replace(/[^a-zA-Z0-9\u0600-\u06FF-]/g, '').toLowerCase();
    const randomPart = nanoid(6);
    const shortCode = `${sanitizedCategory}/${randomPart}`;

    // Insert new short link
    const { error: insertError } = await supabase
      .from('shortlinks')
      .insert([{ long_url: cleanedUrl, slug: shortCode, category: sanitizedCategory }]);

    if (insertError) throw insertError;

    const shortUrl = `${FRONTEND_URL}/s/${shortCode}`;
    res.json({ shortUrl });

  } catch (error) {
    console.error('Shortening error:', error);
    res.status(500).json({ message: 'Server error while shortening URL' });
  }
});

app.get('/s/:shortCode(*)', async (req, res) => {
  try {
    const { shortCode } = req.params;

    const { data: link, error } = await supabase
      .from('shortlinks')
      .select('long_url')
      .eq('slug', shortCode)
      .single();

    if (error && error.code !== 'PGRST116') throw error;

    if (link) {
      res.redirect(301, link.long_url);
    } else {
      res.status(404).send('URL not found');
    }
  } catch (error) {
    console.error('Redirect error:', error);
    res.status(500).send('Server error');
  }
});

// Security headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});

// Clean up expired sessions
setInterval(() => {
  console.log(`Active sessions: ${activeSessions.size}`);
}, 60000);

// Error handling middleware
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ message: 'حجم فایل بیش از حد مجاز است (حداکثر ۵ مگابایت)' });
    }
  }

  if (error.message === 'فقط فایل‌های تصویری مجاز هستند') {
    return res.status(400).json({ message: error.message });
  }

  console.error('Server error:', error);
  res.status(500).json({ message: 'خطای سرور' });
});

// Proxy to Vite dev server in development
if (process.env.NODE_ENV === 'development') {
  // Only in dev: proxy to Vite dev server for non-API routes
  app.use('/', (req, res) => {
    res.redirect(new URL(req.url, 'http://localhost:5173').href);
  });
} else {
  // Serve frontend (production)
  app.use(express.static(path.join(__dirname, 'dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
}

// 404 handler for API routes (should be last)
app.use('/api/*', (req, res) => {
  res.status(404).json({ message: 'API endpoint not found' });
});

// Start server
const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log(`📧 Email API: http://localhost:${PORT}/api/send-email`);
  console.log(`🔐 Admin API: http://localhost:${PORT}/api/mooj-admin`);
  console.log(`📄 Content API: http://localhost:${PORT}/api/content/*`);
  console.log(`📸 Upload API: http://localhost:${PORT}/api/admin/upload`);
  console.log(`👁️ View Tracking: http://localhost:${PORT}/api/blog/:id/view`);
  console.log(`📊 Admin Logs: http://localhost:${PORT}/api/admin/logs`);
  console.log(`📢 Announcements: http://localhost:${PORT}/api/admin/announcements`);
  console.log(`🎯 Frontend: http://localhost:5173`);
});