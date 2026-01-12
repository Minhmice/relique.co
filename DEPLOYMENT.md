# 🚀 Deployment Guide - Vercel & Supabase

Hướng dẫn deploy Relique.co lên Vercel và Supabase.

## 📋 Prerequisites

- GitHub account
- Vercel account (free tier available)
- Supabase account (free tier available)
- Node.js 18+ installed locally (for testing)

---

## 🌐 Deploy lên Vercel

### Bước 1: Chuẩn bị Repository

1. Đảm bảo code đã được push lên GitHub:
```bash
git add .
git commit -m "Prepare for deployment"
git push origin main
```

### Bước 2: Tạo Project trên Vercel

#### **Web App (apps/web)**

1. Truy cập [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New"** → **"Project"**
3. Import repository `Minhmice/relique.co` từ GitHub
4. Cấu hình project:
   - **Framework Preset**: Next.js
   - **Root Directory**: `apps/web` ⚠️ **QUAN TRỌNG - PHẢI SET ĐÚNG**
   - **Build Command**: `cd ../.. && pnpm build --filter=web` (hoặc để trống, Vercel sẽ dùng vercel.json)
   - **Output Directory**: `.next` ⚠️ **PHẢI SET ĐÚNG**
   - **Install Command**: `pnpm install`
   
   ⚠️ **LƯU Ý QUAN TRỌNG**: 
   - Nếu không set **Root Directory** = `apps/web`, Vercel sẽ build từ root và không tìm thấy output
   - Nếu không set **Output Directory** = `.next`, Vercel sẽ tìm "public" directory và fail

5. **Environment Variables** (nếu cần):
   ```
   NEXT_PUBLIC_SITE_URL=https://your-web-app.vercel.app
   ```

6. Click **"Deploy"**

#### **Admin App (apps/admin)**

1. Tạo project mới trên Vercel
2. Import cùng repository `Minhmice/relique.co`
3. Cấu hình project:
   - **Framework Preset**: Next.js
   - **Root Directory**: `apps/admin` ⚠️ **QUAN TRỌNG - PHẢI SET ĐÚNG**
   - **Build Command**: `cd ../.. && pnpm build --filter=admin` (hoặc để trống, Vercel sẽ dùng vercel.json)
   - **Output Directory**: `.next` ⚠️ **PHẢI SET ĐÚNG**
   - **Install Command**: `pnpm install`
   
   ⚠️ **LƯU Ý QUAN TRỌNG**: 
   - Nếu không set **Root Directory** = `apps/admin`, Vercel sẽ build từ root và không tìm thấy output
   - Nếu không set **Output Directory** = `.next`, Vercel sẽ tìm "public" directory và fail

4. **Environment Variables**:
   ```
   NEXT_PUBLIC_SITE_URL=https://your-admin-app.vercel.app
   ```

5. Click **"Deploy"**

### Bước 3: Verify Deployment

- Web app sẽ có URL: `https://your-web-app.vercel.app`
- Admin app sẽ có URL: `https://your-admin-app.vercel.app`

---

## 🗄️ Setup Supabase

### Bước 1: Tạo Supabase Project

1. Truy cập [Supabase Dashboard](https://supabase.com/dashboard)
2. Click **"New Project"**
3. Điền thông tin:
   - **Name**: `relique-co`
   - **Database Password**: (lưu lại password này)
   - **Region**: Chọn region gần nhất
4. Click **"Create new project"** (mất ~2 phút)

### Bước 2: Lấy Connection Strings

1. Vào **Settings** → **API**
2. Copy các thông tin sau:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon/public key**: `eyJhbGc...`
   - **service_role key**: `eyJhbGc...` (⚠️ giữ bí mật)

3. Vào **Settings** → **Database** → **Connection string**
   - Copy **URI** (connection string)

### Bước 3: Tạo Database Schema (Optional)

Nếu cần database, tạo schema trong Supabase SQL Editor:

```sql
-- Example: Create tables for marketplace items
CREATE TABLE marketplace_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  athlete TEXT,
  category TEXT,
  price_usd DECIMAL(10, 2),
  status TEXT DEFAULT 'draft',
  is_featured BOOLEAN DEFAULT false,
  featured_order INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE marketplace_items ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Public read access" ON marketplace_items
  FOR SELECT USING (true);
```

### Bước 4: Thêm Environment Variables vào Vercel

Quay lại Vercel và thêm environment variables:

**Cho Web App:**
```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc... (server-side only)
```

**Cho Admin App:**
```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc... (server-side only)
```

⚠️ **Lưu ý**: Sau khi thêm env vars, cần **redeploy** để áp dụng.

---

## 🔄 Continuous Deployment

Vercel tự động deploy khi:
- Push code lên `main` branch
- Tạo Pull Request (preview deployment)
- Merge PR vào `main`

### Custom Domain (Optional)

1. Vào **Project Settings** → **Domains**
2. Thêm custom domain:
   - Web: `relique.co` hoặc `www.relique.co`
   - Admin: `admin.relique.co`
3. Follow DNS instructions từ Vercel

---

## 📝 Post-Deployment Checklist

### Web App
- [ ] Verify homepage loads: `https://your-web-app.vercel.app`
- [ ] Test marketplace page
- [ ] Test verify page
- [ ] Check images loading correctly
- [ ] Verify API routes (nếu có)

### Admin App
- [ ] Verify login page: `https://your-admin-app.vercel.app/login`
- [ ] Test dashboard
- [ ] Verify data tables
- [ ] Check authentication flow

### Supabase
- [ ] Test database connection
- [ ] Verify RLS policies
- [ ] Test API endpoints (nếu có)
- [ ] Check storage buckets (nếu dùng)

---

## 🐛 Troubleshooting

### Build Fails trên Vercel

**Lỗi**: "No Output Directory named 'public' found"
- ✅ **FIX**: Đảm bảo `Root Directory` được set đúng trong Vercel Dashboard:
  - Web app: `apps/web`
  - Admin app: `apps/admin`
- ✅ **FIX**: Đảm bảo `Output Directory` được set = `.next` (KHÔNG phải "public")
- ✅ **FIX**: `vercel.json` đã được tạo trong mỗi app với `outputDirectory: ".next"`
- ⚠️ **QUAN TRỌNG**: Với Next.js, output directory là `.next`, không phải `public`. `public` folder chỉ chứa static assets, không phải build output.

**Lỗi**: "Module not found"
- Kiểm tra `transpilePackages` trong `next.config.js`
- Đảm bảo `pnpm install` chạy ở root

**Lỗi**: "TypeScript errors"
- Chạy `pnpm typecheck` locally trước khi push
- Fix tất cả TypeScript errors

### Runtime Errors

**Lỗi**: "Environment variable not found"
- Kiểm tra env vars trong Vercel dashboard
- Redeploy sau khi thêm env vars

**Lỗi**: "Supabase connection failed"
- Verify `NEXT_PUBLIC_SUPABASE_URL` và `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Check Supabase project status

---

## 🔐 Security Best Practices

1. **Never commit** `.env` files
2. **Use** `NEXT_PUBLIC_` prefix chỉ cho client-side variables
3. **Keep** `SUPABASE_SERVICE_ROLE_KEY` secret (server-side only)
4. **Enable** Row Level Security (RLS) trên Supabase tables
5. **Use** Vercel's environment variables cho sensitive data

---

## 📚 Additional Resources

- [Vercel Monorepo Guide](https://vercel.com/docs/monorepos)
- [Supabase Documentation](https://supabase.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)

---

## 🆘 Support

Nếu gặp vấn đề:
1. Check Vercel build logs
2. Check Supabase logs
3. Review error messages
4. Verify environment variables

---

**Last Updated**: 2024

