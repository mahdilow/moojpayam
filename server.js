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

// ES module compatibility
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const uploadDir = path.join(__dirname, 'uploads');
    try {
      await fs.mkdir(uploadDir, { recursive: true });
      cb(null, uploadDir);
    } catch (error) {
      cb(error, null);
    }
  },
  filename: (req, file, cb) => {
    // Generate unique filename with timestamp
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

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

// Rate limiters
const contactFormLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 2,
  message: { message: 'شما بیش از حد مجاز در ساعت پیام ارسال کرده‌اید. لطفاً بعداً دوباره تلاش کنید.' },
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

// Helper functions for JSON file operations
const readJsonFile = async (filename) => {
  try {
    const filePath = path.join(__dirname, 'data', filename);
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading ${filename}:`, error);
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
      await logAdminAction(createLogEntry(
        adminUser,
        'Upload image failed - no file',
        'upload',
        { success: false, errorMessage: 'No file selected' },
        'low'
      ));
      return res.status(400).json({ message: 'هیچ فایلی انتخاب نشده است' });
    }

    // Return the URL path for the uploaded image
    const imageUrl = `/uploads/${req.file.filename}`;

    await logAdminAction(createLogEntry(
      adminUser,
      'Upload image',
      'upload',
      {
        filename: req.file.filename,
        originalName: req.file.originalname,
        size: req.file.size,
        mimetype: req.file.mimetype,
        success: true
      },
      'low'
    ));

    res.json({
      message: 'تصویر با موفقیت آپلود شد',
      imageUrl: `http://localhost:3000${imageUrl}`,
      filename: req.file.filename
    });
  } catch (error) {
    console.error('Upload error:', error);
    await logAdminAction(createLogEntry(
      adminUser,
      'Upload image failed',
      'upload',
      { success: false, errorMessage: error.message },
      'medium'
    ));
    res.status(500).json({ message: 'خطا در آپلود تصویر' });
  }
});

// Delete uploaded image endpoint
app.delete('/api/admin/upload/:filename', requireAdmin, async (req, res) => {
  const adminUser = getAdminUserFromSession(req);

  try {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, 'uploads', filename);

    // Check if file exists
    try {
      await fs.access(filePath);
    } catch (error) {
      await logAdminAction(createLogEntry(
        adminUser,
        'Delete image failed - file not found',
        'upload',
        { filename, success: false, errorMessage: 'File not found' },
        'low'
      ));
      return res.status(404).json({ message: 'فایل یافت نشد' });
    }

    // Delete the file
    await fs.unlink(filePath);

    await logAdminAction(createLogEntry(
      adminUser,
      'Delete image',
      'upload',
      { filename, success: true },
      'medium'
    ));

    res.json({ message: 'تصویر با موفقیت حذف شد' });
  } catch (error) {
    console.error('Delete error:', error);
    await logAdminAction(createLogEntry(
      adminUser,
      'Delete image failed',
      'upload',
      { filename: req.params.filename, success: false, errorMessage: error.message },
      'medium'
    ));
    res.status(500).json({ message: 'خطا در حذف تصویر' });
  }
});

// Get list of uploaded images
app.get('/api/admin/images', requireAdmin, async (req, res) => {
  const adminUser = getAdminUserFromSession(req);

  try {
    const uploadsDir = path.join(__dirname, 'uploads');
    const files = await fs.readdir(uploadsDir);

    const images = files
      .filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file))
      .map(file => ({
        filename: file,
        url: `http://localhost:3000/uploads/${file}`,
        uploadDate: new Date().toISOString() // In a real app, you'd store this
      }));

    await logAdminAction(createLogEntry(
      adminUser,
      'View uploaded images',
      'upload',
      { imageCount: images.length, success: true },
      'low'
    ));

    res.json(images);
  } catch (error) {
    console.error('Error reading images:', error);
    await logAdminAction(createLogEntry(
      adminUser,
      'View uploaded images failed',
      'upload',
      { success: false, errorMessage: error.message },
      'medium'
    ));
    res.status(500).json({ message: 'خطا در بارگذاری لیست تصاویر' });
  }
});

// Email endpoint
app.post('/api/send-email', contactFormLimiter, async (req, res) => {
  const { name, phone, subject, message } = req.body;

  if (!name || !phone || !subject || !message) {
    return res.status(400).json({ message: 'لطفا همه فیلدها را پر کنید' });
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
          <p><strong>نام:</strong> ${name}</p>
          <p><strong>شماره موبایل:</strong> ${phone}</p>
          <p><strong>موضوع:</strong> ${subject}</p>
          <p><strong>پیام:</strong></p>
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px;">
            ${message.replace(/\n/g, '<br>')}
          </div>
          <hr style="border: 1px solid #eee; margin: 20px 0;" />
          <p>این ایمیل به صورت خودکار از سایت موج پیام ارسال شده است.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    // Save notification
    const notifications = await readJsonFile('notifications.json');
    notifications.unshift({
      id: `notif_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: 'contact',
      message: `پیام جدید از ${name} (${phone}) با موضوع: ${subject}`,
      read: false,
      createdAt: new Date().toISOString(),
      data: { name, phone, subject, message }
    });
    await writeJsonFile('notifications.json', notifications);
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
app.post('/api/blog/:id/view', viewTrackingLimiter, async (req, res) => {
  try {
    const blogId = parseInt(req.params.id);

    if (!blogId || isNaN(blogId)) {
      return res.status(400).json({ message: 'شناسه مقاله نامعتبر است' });
    }

    const blogs = await readJsonFile('blogs.json');
    const blogIndex = blogs.findIndex(blog => blog.id === blogId);

    if (blogIndex === -1) {
      return res.status(404).json({ message: 'مقاله یافت نشد' });
    }

    // Increment view count
    blogs[blogIndex].views = (blogs[blogIndex].views || 0) + 1;
    blogs[blogIndex].lastViewed = new Date().toISOString();

    const success = await writeJsonFile('blogs.json', blogs);

    if (success) {
      res.json({
        message: 'بازدید ثبت شد',
        views: blogs[blogIndex].views
      });
    } else {
      res.status(500).json({ message: 'خطا در ثبت بازدید' });
    }
  } catch (error) {
    console.error('View tracking error:', error);
    res.status(500).json({ message: 'خطا در ثبت بازدید' });
  }
});

// Public content endpoints (no authentication required)
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

// Get single blog post with SEO data and related posts
app.get('/api/content/blogs/:id', async (req, res) => {
  try {
    const blogId = parseInt(req.params.id);
    const blogs = await readJsonFile('blogs.json');
    const blog = blogs.find(blog => blog.id === blogId && blog.published);

    if (!blog) {
      return res.status(404).json({ message: 'مقاله یافت نشد' });
    }

    // Get related posts
    let relatedPosts = [];
    if (blog.relatedPosts && blog.relatedPosts.length > 0) {
      relatedPosts = blogs.filter(b =>
        blog.relatedPosts.includes(b.id) &&
        b.published &&
        b.id !== blog.id
      );
    }

    // If no related posts specified or found, auto-select based on category
    if (relatedPosts.length === 0) {
      relatedPosts = blogs
        .filter(b =>
          b.published &&
          b.id !== blog.id &&
          b.category === blog.category
        )
        .slice(0, 2);

      // If still not enough, get from all published posts
      if (relatedPosts.length < 2) {
        const additionalPosts = blogs
          .filter(b =>
            b.published &&
            b.id !== blog.id &&
            !relatedPosts.some(rp => rp.id === b.id)
          )
          .slice(0, 2 - relatedPosts.length);

        relatedPosts = [...relatedPosts, ...additionalPosts];
      }
    }

    res.json({
      ...blog,
      relatedPosts
    });
  } catch (error) {
    res.status(500).json({ message: 'خطا در بارگذاری مقاله' });
  }
});

app.get('/api/content/pricing', async (req, res) => {
  try {
    const pricing = await readJsonFile('pricing.json');
    res.json(pricing);
  } catch (error) {
    res.status(500).json({ message: 'خطا در بارگذاری تعرفه‌ها' });
  }
});

// Admin dashboard stats
app.get('/api/admin/stats', requireAdmin, async (req, res) => {
  const adminUser = getAdminUserFromSession(req);

  try {
    const [blogs, pricing] = await Promise.all([
      readJsonFile('blogs.json'),
      readJsonFile('pricing.json')
    ]);

    const stats = {
      totalPosts: blogs.filter(blog => blog.published).length,
      totalViews: blogs.reduce((sum, blog) => sum + (blog.views || 0), 0),
      activePlans: pricing.filter(plan => plan.active).length,
      // Additional stats
      draftPosts: blogs.filter(blog => !blog.published).length,
      totalPosts: blogs.length,
      mostViewedPost: blogs.reduce((max, blog) =>
        (blog.views || 0) > (max.views || 0) ? blog : max,
        { views: 0, title: 'هیچ مقاله‌ای' }
      ),
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
  const adminUser = getAdminUserFromSession(req);

  try {
    const blogs = await readJsonFile('blogs.json');

    await logAdminAction(createLogEntry(
      adminUser,
      'View all blogs',
      'content',
      { blogCount: blogs.length, success: true },
      'low'
    ));

    res.json(blogs);
  } catch (error) {
    await logAdminAction(createLogEntry(
      adminUser,
      'View all blogs failed',
      'content',
      { success: false, errorMessage: error.message },
      'medium'
    ));
    res.status(500).json({ message: 'خطا در بارگذاری مقالات' });
  }
});

app.post('/api/admin/blogs', requireAdmin, async (req, res) => {
  const adminUser = getAdminUserFromSession(req);

  try {
    const blogs = await readJsonFile('blogs.json');

    // Auto-select related posts if none provided
    let relatedPosts = req.body.relatedPosts || [];
    if (relatedPosts.length === 0) {
      const sameCategoryPosts = blogs
        .filter(b => b.published && b.category === req.body.category)
        .slice(0, 2);

      if (sameCategoryPosts.length >= 2) {
        relatedPosts = sameCategoryPosts.map(p => p.id);
      } else {
        relatedPosts = blogs
          .filter(b => b.published)
          .slice(0, 2)
          .map(p => p.id);
      }
    }

    const newBlog = {
      ...req.body,
      id: Date.now(),
      views: 0,
      date: new Date().toLocaleDateString('fa-IR'),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      relatedPosts,
      // SEO fields
      slug: req.body.title.replace(/\s+/g, '-').toLowerCase(),
      metaDescription: req.body.excerpt || req.body.title
    };

    blogs.push(newBlog);
    const success = await writeJsonFile('blogs.json', blogs);

    if (success) {
      await logAdminAction(createLogEntry(
        adminUser,
        'Create blog post',
        'content',
        {
          resourceType: 'blog',
          resourceId: newBlog.id,
          newData: { title: newBlog.title, category: newBlog.category },
          success: true
        },
        'medium'
      ));

      res.json({ message: 'مقاله با موفقیت ایجاد شد', blog: newBlog });
    } else {
      res.status(500).json({ message: 'خطا در ذخیره مقاله' });
    }
  } catch (error) {
    await logAdminAction(createLogEntry(
      adminUser,
      'Create blog post failed',
      'content',
      { success: false, errorMessage: error.message },
      'medium'
    ));
    res.status(500).json({ message: 'خطا در ایجاد مقاله' });
  }
});

app.put('/api/admin/blogs/:id', requireAdmin, async (req, res) => {
  const adminUser = getAdminUserFromSession(req);

  try {
    const blogs = await readJsonFile('blogs.json');
    const blogId = parseInt(req.params.id);
    const blogIndex = blogs.findIndex(blog => blog.id === blogId);

    if (blogIndex === -1) {
      return res.status(404).json({ message: 'مقاله یافت نشد' });
    }

    const oldBlog = { ...blogs[blogIndex] };

    // Auto-select related posts if none provided
    let relatedPosts = req.body.relatedPosts || [];
    if (relatedPosts.length === 0) {
      const sameCategoryPosts = blogs
        .filter(b => b.published && b.category === req.body.category && b.id !== blogId)
        .slice(0, 2);

      if (sameCategoryPosts.length >= 2) {
        relatedPosts = sameCategoryPosts.map(p => p.id);
      } else {
        relatedPosts = blogs
          .filter(b => b.published && b.id !== blogId)
          .slice(0, 2)
          .map(p => p.id);
      }
    }

    // Preserve views and creation date
    const updatedBlog = {
      ...blogs[blogIndex],
      ...req.body,
      id: blogId,
      views: blogs[blogIndex].views || 0,
      createdAt: blogs[blogIndex].createdAt,
      updatedAt: new Date().toISOString(),
      relatedPosts,
      // Update SEO fields
      slug: req.body.title ? req.body.title.replace(/\s+/g, '-').toLowerCase() : blogs[blogIndex].slug,
      metaDescription: req.body.excerpt || req.body.title || blogs[blogIndex].metaDescription
    };

    blogs[blogIndex] = updatedBlog;
    const success = await writeJsonFile('blogs.json', blogs);

    if (success) {
      await logAdminAction(createLogEntry(
        adminUser,
        'Update blog post',
        'content',
        {
          resourceType: 'blog',
          resourceId: blogId,
          oldData: { title: oldBlog.title, category: oldBlog.category },
          newData: { title: updatedBlog.title, category: updatedBlog.category },
          success: true
        },
        'medium'
      ));

      res.json({ message: 'مقاله با موفقیت ویرایش شد', blog: updatedBlog });
    } else {
      res.status(500).json({ message: 'خطا در ذخیره تغییرات' });
    }
  } catch (error) {
    await logAdminAction(createLogEntry(
      adminUser,
      'Update blog post failed',
      'content',
      { resourceType: 'blog', resourceId: req.params.id, success: false, errorMessage: error.message },
      'medium'
    ));
    res.status(500).json({ message: 'خطا در ویرایش مقاله' });
  }
});

app.delete('/api/admin/blogs/:id', requireAdmin, async (req, res) => {
  const adminUser = getAdminUserFromSession(req);

  try {
    const blogs = await readJsonFile('blogs.json');
    const blogId = parseInt(req.params.id);
    const blogToDelete = blogs.find(blog => blog.id === blogId);
    const filteredBlogs = blogs.filter(blog => blog.id !== blogId);

    if (filteredBlogs.length === blogs.length) {
      return res.status(404).json({ message: 'مقاله یافت نشد' });
    }

    const success = await writeJsonFile('blogs.json', filteredBlogs);

    if (success) {
      await logAdminAction(createLogEntry(
        adminUser,
        'Delete blog post',
        'content',
        {
          resourceType: 'blog',
          resourceId: blogId,
          oldData: { title: blogToDelete?.title, category: blogToDelete?.category },
          success: true
        },
        'high'
      ));

      res.json({ message: 'مقاله با موفقیت حذف شد' });
    } else {
      res.status(500).json({ message: 'خطا در حذف مقاله' });
    }
  } catch (error) {
    await logAdminAction(createLogEntry(
      adminUser,
      'Delete blog post failed',
      'content',
      { resourceType: 'blog', resourceId: req.params.id, success: false, errorMessage: error.message },
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

// Admin notifications endpoints
app.get('/api/admin/notifications', requireAdmin, async (req, res) => {
  try {
    const notifications = await readJsonFile('notifications.json');
    res.json(notifications.filter(n => !n.read));
  } catch (error) {
    res.status(500).json({ message: 'خطا در دریافت اعلان‌ها' });
  }
});

app.post('/api/admin/notifications/read/:id', requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    let notifications = await readJsonFile('notifications.json');
    notifications = notifications.map(n => n.id === id ? { ...n, read: true } : n);
    await writeJsonFile('notifications.json', notifications);
    res.json({ message: 'اعلان خوانده شد' });
  } catch (error) {
    res.status(500).json({ message: 'خطا در حذف اعلان' });
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

// Proxy to Vite dev server
app.use('/', (req, res) => {
  res.redirect(new URL(req.url, 'http://localhost:5173').href);
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log(`📧 Email API: http://localhost:${PORT}/api/send-email`);
  console.log(`🔐 Admin API: http://localhost:${PORT}/api/mooj-admin`);
  console.log(`📄 Content API: http://localhost:${PORT}/api/content/*`);
  console.log(`📸 Upload API: http://localhost:${PORT}/api/admin/upload`);
  console.log(`👁️ View Tracking: http://localhost:${PORT}/api/blog/:id/view`);
  console.log(`📊 Admin Logs: http://localhost:${PORT}/api/admin/logs`);
  console.log(`🎯 Frontend: http://localhost:5173`);
});