# مستندات کامل پروژه موج پیام (MoojPayam)

## 📋 فهرست مطالب

1. [معرفی پروژه](#معرفی-پروژه)
2. [معماری پروژه](#معماری-پروژه)
3. [نصب و راه‌اندازی](#نصب-و-راه‌اندازی)
4. [ساختار پروژه](#ساختار-پروژه)
5. [تکنولوژی‌های استفاده شده](#تکنولوژی‌های-استفاده-شده)
6. [ویژگی‌های پروژه](#ویژگی‌های-پروژه)
7. [API Documentation](#api-documentation)
8. [تنظیمات محیطی](#تنظیمات-محیطی)
9. [استقرار (Deployment)](#استقرار-deployment)
10. [امنیت](#امنیت)
11. [بهینه‌سازی و عملکرد](#بهینه‌سازی-و-عملکرد)
12. [نگهداری و توسعه](#نگهداری-و-توسعه)

---

## معرفی پروژه

**موج پیام** یک سامانه پیشرفته ارسال پیامک تبلیغاتی و اطلاع‌رسانی است که شامل یک وب‌سایت لندینگ پیج با امکانات کامل مدیریت محتوا می‌باشد.

### 🔗 لینک‌های مهم

- **🌐 وب‌سایت زنده**: [moojpayam.ir](https://moojpayam.ir)
- **📦 مخزن کد**: [GitHub Repository](https://github.com/mahdilow/moojpayam)

### اهداف پروژه

- ارائه اطلاعات جامع درباره سرویس پیامکی موج پیام
- مدیریت محتوای وب‌سایت از طریق پنل ادمین
- سیستم بلاگ برای انتشار مقالات
- فرم تماس با تایید شماره موبایل
- بهینه‌سازی برای موتورهای جستجو (SEO)
- رابط کاربری مدرن و واکنش‌گرا

---

## معماری پروژه

پروژه از معماری **Full-Stack** با جداسازی Frontend و Backend استفاده می‌کند:

```
┌─────────────────┐
│   Frontend      │  React + TypeScript + Vite
│   (Client)      │  Tailwind CSS + Framer Motion
└────────┬────────┘
         │ HTTP/HTTPS
         │
┌────────▼────────┐
│   Backend       │  Express.js + Node.js
│   (Server)      │
└────────┬────────┘
         │
    ┌────┴────┐
    │         │
┌───▼───┐ ┌──▼────┐
│Supabase│ │Email │
│Database│ │Service│
└────────┘ └──────┘
```

### Frontend Architecture

- **Framework**: React 18 با TypeScript
- **Build Tool**: Vite 6
- **Routing**: React Router DOM v6
- **State Management**: React Hooks (useState, useEffect)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **SEO**: React Helmet Async

### Backend Architecture

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: Supabase (PostgreSQL)
- **Storage**: Supabase Storage
- **Email**: Nodemailer (Gmail)
- **SMS**: SOAP API (Payamak Panel)

---

## نصب و راه‌اندازی

### پیش‌نیازها

- **Node.js**: نسخه 18 یا بالاتر
- **npm** یا **yarn**: برای مدیریت پکیج‌ها
- **Supabase Account**: برای دیتابیس و استوریج
- **Gmail Account**: برای ارسال ایمیل (با App Password)

### مراحل نصب

#### 1. کلون کردن پروژه

```bash
git clone https://github.com/mahdilow/moojpayam.git
cd moojpayam
```

#### 2. نصب وابستگی‌ها

```bash
npm install
```

#### 3. تنظیم فایل محیطی

یک فایل `.env` در ریشه پروژه ایجاد کنید:

```env
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_KEY=your_supabase_service_key

# Admin Credentials
ADMIN_USER=your_admin_username
ADMIN_PASSWORD=your_admin_password

# Email Configuration (Gmail)
EMAIL_USER=your_gmail@gmail.com
EMAIL_APP_PASSWORD=your_gmail_app_password
EMAIL_RECIPIENT=recipient@example.com

# SMS Configuration (Payamak Panel)
SMS_USERNAME=your_sms_username
SMS_PASSWORD=your_sms_password
SMS_BODY_ID=your_sms_body_id

# Server Configuration
PORT=80
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

#### 4. راه‌اندازی Supabase

1. یک پروژه جدید در [Supabase](https://supabase.com) ایجاد کنید
2. جداول زیر را در دیتابیس ایجاد کنید:

**جدول blogs:**

```sql
CREATE TABLE blogs (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  image TEXT,
  author TEXT,
  date TEXT,
  read_time INTEGER,
  views INTEGER DEFAULT 0,
  category TEXT,
  tags TEXT[],
  featured BOOLEAN DEFAULT false,
  published BOOLEAN DEFAULT false,
  slug TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  related_posts TEXT[],
  meta_description TEXT,
  last_viewed TIMESTAMP
);
```

**جدول blog_views:**

```sql
CREATE TABLE blog_views (
  id SERIAL PRIMARY KEY,
  blog_id TEXT REFERENCES blogs(id) ON DELETE CASCADE,
  viewer_ip TEXT,
  viewed_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(blog_id, viewer_ip)
);
```

**جدول pricing:**

```sql
CREATE TABLE pricing (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  price TEXT,
  features TEXT[],
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);
```

**جدول announcements:**

```sql
CREATE TABLE announcements (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT DEFAULT 'info',
  isActive BOOLEAN DEFAULT false,
  createdAt TIMESTAMP DEFAULT NOW(),
  expiresAt TIMESTAMP
);
```

**جدول admin_logs:**

```sql
CREATE TABLE admin_logs (
  id TEXT PRIMARY KEY,
  admin_user TEXT NOT NULL,
  session_id TEXT,
  action TEXT NOT NULL,
  category TEXT,
  details JSONB,
  severity TEXT DEFAULT 'low',
  timestamp TIMESTAMP DEFAULT NOW()
);
```

**جدول shortlinks:**

```sql
CREATE TABLE shortlinks (
  id SERIAL PRIMARY KEY,
  long_url TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  category TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

3. یک Storage Bucket با نام `blog-images` ایجاد کنید

#### 5. اجرای پروژه

**Development Mode:**

```bash
# اجرای همزمان Frontend و Backend
npm run dev:all

# یا به صورت جداگانه:
npm run dev          # Frontend (Vite)
npm run dev:server   # Backend (Express)
```

**Production Mode:**

```bash
npm run build        # Build Frontend
npm start            # Start Production Server
```

پروژه در آدرس‌های زیر در دسترس خواهد بود:

- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:80/api`

---

## ساختار پروژه

```
moojpayam/
├── public/                 # فایل‌های استاتیک
│   ├── assets/           # تصاویر و فونت‌ها
│   ├── robots.txt        # فایل robots.txt
│   ├── sitemap.xml       # نقشه سایت
│   └── site.webmanifest  # Web App Manifest
│
├── src/                   # کدهای Frontend
│   ├── api/              # سرویس‌های API
│   │   ├── emailService.ts
│   │   └── supabaseClient.ts
│   │
│   ├── components/       # کامپوننت‌های React
│   │   ├── admin/        # کامپوننت‌های ادمین
│   │   ├── sections/    # بخش‌های صفحه اصلی
│   │   ├── AnalyticsTracker.tsx
│   │   ├── AnnouncementBanner.tsx
│   │   ├── Footer.tsx
│   │   ├── ImageUpload.tsx
│   │   ├── LoadingScreen.tsx
│   │   ├── Navbar.tsx
│   │   └── SEOHead.tsx
│   │
│   ├── hooks/            # Custom Hooks
│   │   └── useContentData.ts
│   │
│   ├── layouts/          # Layout Components
│   │   └── MainLayout.tsx
│   │
│   ├── pages/            # صفحات اصلی
│   │   ├── AboutUsPage.tsx
│   │   ├── AdminDashboard.tsx
│   │   ├── AdminLogin.tsx
│   │   ├── BlogPage.tsx
│   │   ├── BlogPostPage.tsx
│   │   ├── ContactUsPage.tsx
│   │   ├── FaqPage.tsx
│   │   ├── FeaturesPage.tsx
│   │   ├── HomePage.tsx
│   │   ├── NotFoundPage.tsx
│   │   └── WebServicesPage.tsx
│   │
│   ├── theme/           # تنظیمات تم
│   │   └── brandTheme.ts
│   │
│   ├── utils/           # توابع کمکی
│   │   └── adminLogger.ts
│   │
│   ├── App.tsx          # کامپوننت اصلی
│   ├── main.tsx         # Entry Point
│   └── index.css        # استایل‌های全局
│
├── scripts/             # اسکریپت‌های کمکی
│   └── generate-sitemap.js
│
├── server.js           # سرور Express.js
├── vite.config.ts      # تنظیمات Vite
├── tailwind.config.js  # تنظیمات Tailwind CSS
├── tsconfig.json       # تنظیمات TypeScript
├── package.json        # وابستگی‌ها و اسکریپت‌ها
└── Dockerfile          # فایل Docker برای استقرار
```

---

## تکنولوژی‌های استفاده شده

### Frontend Stack

| تکنولوژی           | نسخه    | کاربرد                  |
| ------------------ | ------- | ----------------------- |
| React              | 18.2.0  | Framework اصلی          |
| TypeScript         | 5.2.2   | Type Safety             |
| Vite               | 6.3.5   | Build Tool & Dev Server |
| React Router DOM   | 6.22.1  | Routing                 |
| Tailwind CSS       | 3.4.1   | Styling                 |
| Framer Motion      | 11.0.3  | Animations              |
| React Helmet Async | 2.0.4   | SEO Meta Tags           |
| React Hot Toast    | 2.5.2   | Notifications           |
| Lucide React       | 0.344.0 | Icons                   |
| React Leaflet      | 4.2.1   | Maps                    |

### Backend Stack

| تکنولوژی           | نسخه   | کاربرد                    |
| ------------------ | ------ | ------------------------- |
| Express.js         | 4.21.2 | Web Framework             |
| Node.js            | 18+    | Runtime                   |
| Supabase JS        | 2.75.0 | Database & Storage Client |
| Nodemailer         | 7.0.3  | Email Service             |
| Multer             | 2.0.1  | File Upload               |
| Sharp              | 0.34.4 | Image Processing          |
| Express Rate Limit | 7.5.0  | Rate Limiting             |
| Cookie Parser      | 1.4.6  | Cookie Handling           |
| SOAP               | -      | SMS API Integration       |

### Database & Storage

- **Supabase PostgreSQL**: دیتابیس اصلی
- **Supabase Storage**: ذخیره‌سازی تصاویر

---

## ویژگی‌های پروژه

### 1. سیستم مدیریت محتوا (CMS)

#### مدیریت بلاگ

- ایجاد، ویرایش و حذف مقالات
- سیستم دسته‌بندی و تگ
- تولید خودکار Slug از عنوان
- تولید خودکار Meta Description
- پیشنهاد خودکار مقالات مرتبط
- آپلود و بهینه‌سازی تصاویر (WebP)
- ردیابی بازدید مقالات

#### مدیریت تعرفه‌ها

- ایجاد و مدیریت پلن‌های قیمت‌گذاری
- فعال/غیرفعال کردن پلن‌ها
- نمایش در صفحه اصلی

#### مدیریت اعلان‌ها

- ایجاد اعلان‌های سایت
- تنظیم تاریخ انقضا
- فعال/غیرفعال کردن اعلان‌ها

### 2. پنل ادمین

- **احراز هویت**: سیستم لاگین با Session Management
- **Dashboard**: نمایش آمار کلی
  - تعداد مقالات منتشر شده
  - تعداد کل بازدیدها
  - پست‌های پربازدید
  - بازدیدهای اخیر
- **مدیریت محتوا**: CRUD کامل برای مقالات و تعرفه‌ها
- **سیستم لاگ**: ثبت تمامی فعالیت‌های ادمین
- **آپلود تصویر**: آپلود و بهینه‌سازی تصاویر

### 3. سیستم تماس

- **فرم تماس**: با اعتبارسنجی کامل
- **تایید شماره موبایل**: ارسال OTP از طریق SMS
- **Rate Limiting**: محدودیت تعداد درخواست‌ها
- **ارسال ایمیل**: ارسال خودکار ایمیل به ادمین

### 4. بهینه‌سازی SEO

- **Meta Tags**: کامل و پویا برای هر صفحه
- **Open Graph**: برای شبکه‌های اجتماعی
- **Twitter Cards**: برای تویتر
- **Canonical URLs**: جلوگیری از محتوای تکراری
- **Sitemap**: تولید خودکار نقشه سایت
- **Structured Data**: آماده برای Schema.org

### 5. عملکرد و بهینه‌سازی

- **Code Splitting**: تقسیم کد به Chunk‌های کوچک
- **Lazy Loading**: بارگذاری تنبل کامپوننت‌ها
- **Image Optimization**: تبدیل به WebP و Resize
- **Minification**: فشرده‌سازی کد در Production
- **Tree Shaking**: حذف کدهای استفاده نشده

### 6. امنیت

- **Rate Limiting**: محدودیت درخواست‌ها
- **Session Management**: مدیریت امن Session
- **Input Validation**: اعتبارسنجی ورودی‌ها
- **Security Headers**: هدرهای امنیتی
- **CORS**: تنظیمات Cross-Origin
- **SQL Injection Protection**: استفاده از Parameterized Queries

### 7. URL Shortener

- سیستم کوتاه‌سازی لینک
- دسته‌بندی لینک‌ها
- ریدایرکت 301 برای SEO

---

## API Documentation

### Public APIs

#### دریافت مقالات

```http
GET /api/content/blogs
```

**Response:**

```json
[
  {
    "id": "string",
    "title": "string",
    "excerpt": "string",
    "content": "string",
    "image": "string",
    "author": "string",
    "date": "string",
    "readTime": "number",
    "views": "number",
    "category": "string",
    "tags": ["string"],
    "featured": "boolean",
    "published": "boolean",
    "slug": "string"
  }
]
```

#### دریافت مقاله با Slug

```http
GET /api/content/blogs/slug/:slug
```

**Response:**

```json
{
  "id": "string",
  "title": "string",
  "content": "string",
  "relatedPosts": [...]
}
```

#### ثبت بازدید مقاله

```http
POST /api/blogs/:id/view
```

**Response:**

```json
{
  "message": "string",
  "views": "number"
}
```

#### دریافت تعرفه‌ها

```http
GET /api/content/pricing
```

#### دریافت اعلان فعال

```http
GET /api/content/announcement
```

#### ارسال OTP

```http
POST /api/send-otp
Content-Type: application/json

{
  "phone": "09121234567"
}
```

**Response:**

```json
{
  "success": true,
  "message": "string",
  "expiresIn": 120
}
```

#### تایید OTP

```http
POST /api/verify-otp
Content-Type: application/json

{
  "phone": "09121234567",
  "otp": "1234"
}
```

#### ارسال ایمیل تماس

```http
POST /api/send-email
Content-Type: application/json

{
  "name": "string",
  "phone": "09121234567",
  "email": "string (optional)",
  "subject": "string",
  "message": "string",
  "otpVerified": true
}
```

### Admin APIs

**نکته**: تمامی APIهای ادمین نیاز به احراز هویت دارند.

#### لاگین ادمین

```http
POST /api/mooj-admin
Content-Type: application/json

{
  "username": "string",
  "password": "string"
}
```

#### تایید Session

```http
GET /api/admin/verify
```

#### خروج از سیستم

```http
POST /api/admin/logout
```

#### دریافت آمار Dashboard

```http
GET /api/admin/stats
```

#### مدیریت مقالات

```http
GET    /api/admin/blogs          # دریافت لیست
POST   /api/admin/blogs          # ایجاد مقاله
PUT    /api/admin/blogs/:id      # ویرایش مقاله
DELETE /api/admin/blogs/:id      # حذف مقاله
```

#### مدیریت تعرفه‌ها

```http
GET    /api/admin/pricing         # دریافت لیست
POST   /api/admin/pricing        # ایجاد پلن
PUT    /api/admin/pricing/:id    # ویرایش پلن
DELETE /api/admin/pricing/:id   # حذف پلن
```

#### مدیریت اعلان‌ها

```http
GET    /api/admin/announcements                    # دریافت لیست
POST   /api/admin/announcements                   # ایجاد اعلان
PUT    /api/admin/announcements/:id               # ویرایش اعلان
DELETE /api/admin/announcements/:id              # حذف اعلان
PATCH  /api/admin/announcements/:id/toggle       # تغییر وضعیت
```

#### آپلود تصویر

```http
POST /api/admin/upload
Content-Type: multipart/form-data

file: [image file]
```

**Response:**

```json
{
  "message": "string",
  "imageUrl": "string"
}
```

#### دریافت لیست تصاویر

```http
GET /api/admin/images
```

#### حذف تصویر

```http
DELETE /api/admin/upload/:filename
```

#### مدیریت لاگ‌ها

```http
GET  /api/admin/logs                    # دریافت لاگ‌ها
GET  /api/admin/logs/export            # خروجی JSON
POST /api/admin/logs                   # ثبت لاگ جدید
```

**Query Parameters برای GET /api/admin/logs:**

- `category`: فیلتر بر اساس دسته
- `severity`: فیلتر بر اساس سطح (low, medium, high, critical)
- `dateRange`: فیلتر بر اساس تاریخ (7d, 30d, all)
- `search`: جستجو در لاگ‌ها
- `limit`: تعداد نتایج (پیش‌فرض: 100)
- `offset`: آفست برای Pagination

---

## تنظیمات محیطی

### متغیرهای محیطی

#### Supabase

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_KEY=your_service_key
```

**نحوه دریافت:**

1. وارد پنل Supabase شوید
2. به Settings > API بروید
3. URL و Keys را کپی کنید

#### ادمین

```env
ADMIN_USER=admin
ADMIN_PASSWORD=your_secure_password
```

**نکته امنیتی**: از رمز عبور قوی استفاده کنید.

#### ایمیل (Gmail)

```env
EMAIL_USER=your_email@gmail.com
EMAIL_APP_PASSWORD=your_app_password
EMAIL_RECIPIENT=recipient@example.com
```

**نحوه ایجاد App Password:**

1. به Google Account Settings بروید
2. Security > 2-Step Verification را فعال کنید
3. App Passwords > Generate را انتخاب کنید
4. App Password را کپی کنید

#### SMS (Payamak Panel)

```env
SMS_USERNAME=your_sms_username
SMS_PASSWORD=your_sms_password
SMS_BODY_ID=your_template_id
```

#### سرور

```env
PORT=80
NODE_ENV=production
FRONTEND_URL=https://moojpayam.ir
```

---

## استقرار (Deployment)

### استقرار با Docker

#### 1. ساخت Image

```bash
docker build -t moojpayam:latest .
```

#### 2. اجرای Container

```bash
docker run -d \
  -p 80:80 \
  --env-file .env \
  --name moojpayam \
  moojpayam:latest
```

### استقرار Manual

#### 1. Build Frontend

```bash
npm run build
```

#### 2. تنظیم Environment Variables

فایل `.env` را در سرور تنظیم کنید.

#### 3. اجرای سرور

```bash
npm start
```

### استقرار با PM2 (توصیه می‌شود)

```bash
# نصب PM2
npm install -g pm2

# اجرای پروژه
pm2 start server.js --name moojpayam

# ذخیره تنظیمات
pm2 save

# تنظیم Startup
pm2 startup
```

### استقرار Frontend جداگانه

اگر می‌خواهید Frontend و Backend را جداگانه استقرار دهید:

1. **Frontend**: Build کنید و در CDN یا Static Host قرار دهید
2. **Backend**: در سرور Node.js اجرا کنید
3. **CORS**: تنظیمات CORS را در `server.js` به‌روزرسانی کنید

---

## امنیت

### اقدامات امنیتی پیاده‌سازی شده

1. **Rate Limiting**

   - فرم تماس: 2 درخواست در 24 ساعت
   - OTP: 5 درخواست در 5 دقیقه
   - لاگین ادمین: 5 تلاش در 15 دقیقه
   - آپلود: 20 فایل در 15 دقیقه

2. **Session Management**

   - استفاده از HttpOnly Cookies
   - SameSite Protection
   - Secure Flag در Production
   - Timeout خودکار (2 ساعت)

3. **Input Validation**

   - اعتبارسنجی شماره موبایل
   - اعتبارسنجی ایمیل
   - Sanitization ورودی‌ها
   - محدودیت حجم فایل (5MB)

4. **Security Headers**

   - X-Content-Type-Options: nosniff
   - X-Frame-Options: DENY
   - X-XSS-Protection: 1; mode=block

5. **Database Security**
   - استفاده از Parameterized Queries
   - Row Level Security در Supabase
   - محدودیت دسترسی با Service Key

### توصیه‌های امنیتی

1. **HTTPS**: همیشه از HTTPS استفاده کنید
2. **Environment Variables**: هرگز Keys را در کد Commit نکنید
3. **Password Policy**: از رمزهای عبور قوی استفاده کنید
4. **Regular Updates**: پکیج‌ها را به‌روز نگه دارید
5. **Backup**: از دیتابیس به‌طور منظم Backup بگیرید

---

## بهینه‌سازی و عملکرد

### بهینه‌سازی Frontend

1. **Code Splitting**

   - Lazy Loading صفحات
   - Manual Chunks برای Vendor Libraries

2. **Image Optimization**

   - تبدیل به WebP
   - Resize خودکار
   - Lazy Loading تصاویر

3. **Bundle Size**

   - Tree Shaking
   - Minification
   - Compression

4. **Caching**
   - Static Assets Caching
   - Browser Caching

### بهینه‌سازی Backend

1. **Database**

   - Indexing مناسب
   - Query Optimization
   - Connection Pooling

2. **Caching**

   - Cache کردن داده‌های ثابت
   - Redis (اختیاری)

3. **Compression**
   - Gzip Compression
   - Response Compression

### Performance Metrics

- **First Contentful Paint (FCP)**: < 1.8s
- **Largest Contentful Paint (LCP)**: < 2.5s
- **Time to Interactive (TTI)**: < 3.8s
- **Cumulative Layout Shift (CLS)**: < 0.1

---

## نگهداری و توسعه

### ساختار کد

- **Components**: کامپوننت‌های قابل استفاده مجدد
- **Pages**: صفحات اصلی برنامه
- **Hooks**: Custom Hooks برای منطق مشترک
- **Utils**: توابع کمکی
- **API**: سرویس‌های ارتباط با Backend

### Best Practices

1. **TypeScript**: استفاده از Type Safety
2. **ESLint**: رعایت استانداردهای کدنویسی
3. **Component Structure**: ساختار منطقی کامپوننت‌ها
4. **Error Handling**: مدیریت خطاها
5. **Logging**: ثبت لاگ مناسب

### Testing

```bash
# اجرای Linter
npm run lint

# بررسی Type Errors
npx tsc --noEmit
```

### Backup

#### Backup دیتابیس

```bash
# استفاده از Supabase CLI
supabase db dump -f backup.sql
```

#### Backup تصاویر

تصاویر در Supabase Storage ذخیره می‌شوند و به‌طور خودکار Backup می‌شوند.

### Monitoring

- **Error Tracking**: استفاده از Sentry (اختیاری)
- **Analytics**: Google Analytics (پیاده‌سازی شده)
- **Uptime Monitoring**: استفاده از UptimeRobot یا مشابه

### به‌روزرسانی

```bash
# بررسی به‌روزرسانی‌ها
npm outdated

# به‌روزرسانی پکیج‌ها
npm update

# به‌روزرسانی Major Versions
npm install package@latest
```

---

## عیب‌یابی (Troubleshooting)

### مشکلات رایج

#### 1. خطا در اتصال به Supabase

**مشکل**: `Supabase URL or Key missing`

**راه‌حل**:

- بررسی فایل `.env`
- اطمینان از صحت URL و Keys
- بررسی دسترسی به اینترنت

#### 2. خطا در ارسال ایمیل

**مشکل**: `Email sending error`

**راه‌حل**:

- بررسی App Password در Gmail
- فعال بودن 2-Step Verification
- بررسی تنظیمات SMTP

#### 3. خطا در ارسال SMS

**مشکل**: `Failed to send OTP`

**راه‌حل**:

- بررسی اعتبار حساب Payamak Panel
- بررسی صحت Body ID
- بررسی موجودی حساب

#### 4. خطا در آپلود تصویر

**مشکل**: `Upload error`

**راه‌حل**:

- بررسی حجم فایل (حداکثر 5MB)
- بررسی فرمت فایل (فقط تصویر)
- بررسی دسترسی به Supabase Storage

#### 5. خطا در Build

**مشکل**: `Build failed`

**راه‌حل**:

- پاک کردن `node_modules` و `dist`
- نصب مجدد وابستگی‌ها
- بررسی خطاهای TypeScript

---

## پشتیبانی و تماس

### 🔗 لینک‌های پروژه

- **🌐 وب‌سایت**: [moojpayam.ir](https://moojpayam.ir)
- **📦 GitHub**: [github.com/mahdilow/moojpayam](https://github.com/mahdilow/moojpayam)

### منابع

- **مستندات React**: https://react.dev
- **مستندات Vite**: https://vitejs.dev
- **مستندات Supabase**: https://supabase.com/docs
- **مستندات Tailwind CSS**: https://tailwindcss.com/docs

### گزارش باگ

در صورت مشاهده باگ، لطفاً در [Repository](https://github.com/mahdilow/moojpayam/issues) یک Issue ایجاد کنید.

---

## مجوز (License)

این پروژه تحت مجوز [MIT License] منتشر شده است.

---

## تغییرات (Changelog)

### Version 0.1.0

- راه‌اندازی اولیه پروژه
- پیاده‌سازی سیستم بلاگ
- پیاده‌سازی پنل ادمین
- پیاده‌سازی فرم تماس با OTP
- بهینه‌سازی SEO
- سیستم آپلود تصویر

---

## 🔗 لینک‌های مفید

- **🌐 وب‌سایت**: [moojpayam.ir](https://moojpayam.ir)
- **📦 کد منبع**: [GitHub](https://github.com/mahdilow/moojpayam)
- **🐛 گزارش باگ**: [Issues](https://github.com/mahdilow/moojpayam/issues)

---

**آخرین به‌روزرسانی**: 2024

**نگهدارنده**: تیم توسعه موج پیام
