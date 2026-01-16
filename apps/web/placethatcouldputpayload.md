# Places That Could Use Payload CMS

Tài liệu này liệt kê tất cả các vị trí đã được chuyển sang quản lý qua Payload CMS và các vị trí tiềm năng khác có thể được quản lý trong tương lai.

## ✅ Đã Chuyển Sang Payload CMS

### Collections (Nhiều Documents)

1. **Posts** (`/admin/cms/posts`)
   - Tất cả blog posts
   - Featured posts
   - Post tags và categories
   - Status: draft/published

2. **Testimonials** (`/admin/cms/testimonials`)
   - Customer testimonials
   - Ratings và verified status
   - Display order

3. **Team Members** (`/admin/cms/team`)
   - Team member profiles
   - Roles và descriptions
   - Display order

### Globals (Single Documents)

1. **Home Page** (`/admin/cms/pages` - Home Page tab)
   - Hero section: title, subtitle, CTA text, image
   - Why Section: heading, description
   - Marketplace Section: heading, description
   - Dual Blocks: Verification và Consignment content
   - The Way Section: cards array

2. **About Page** (`/admin/cms/pages` - About Page tab)
   - Section 4.1: Who We Are content
   - Section 4.2: Investment Vehicle content
   - Section 4.3: Question of Trust content
   - AI-powered subsection content

3. **Contact Page** (`/admin/cms/pages` - Contact Page tab)
   - Page title, subtitle
   - Email addresses (customer support, partners)
   - Form labels và placeholders

4. **Legal Pages** (`/admin/cms/pages` - Legal tab)
   - Terms of Service sections
   - Privacy Policy sections
   - Last updated dates

5. **Site Settings** (`/admin/cms/pages` - Site Settings tab)
   - Header navigation items
   - Footer links và description
   - Newsletter text và placeholder
   - Social media links
   - Copyright text
   - Site metadata (title, description, keywords)

6. **Strategic Partner** (`/admin/cms/pages` - Partner tab)
   - Partner title, description
   - Partner name/logo

## 🔄 Components Đã Cập Nhật

### Landing Page Sections
- ✅ `HeroSection.tsx` - Có thể fetch từ HomePage global
- ✅ `WhySection.tsx` - Có thể fetch từ HomePage global
- ✅ `MarketplaceSection.tsx` - Có thể fetch từ HomePage global
- ✅ `DualBlocks.tsx` - Có thể fetch từ HomePage global
- ✅ `TheWaySection.tsx` - Có thể fetch từ HomePage global
- ✅ `TestimonialsSection.tsx` - **Đã cập nhật** để fetch từ Testimonials collection
- ✅ `StrategicPartnerSection.tsx` - Có thể fetch từ StrategicPartner global
- ✅ `TeamSection.tsx` - **Đã cập nhật** để fetch từ Team collection

### Pages
- ✅ `ContactPageContent.tsx` - Có thể fetch từ ContactPage global
- ✅ `AboutPage` - Có thể fetch từ AboutPage global
- ✅ `TermsPage` - Có thể fetch từ Legal global
- ✅ `PoliciesPage` - Có thể fetch từ Legal global
- ✅ `PostsPage` - Có thể fetch từ Posts collection

### Shell Components
- ✅ `Header.tsx` - Có thể fetch navigation từ SiteSettings global
- ✅ `Footer.tsx` - Có thể fetch từ SiteSettings global
- ✅ `layout.tsx` - Có thể fetch metadata từ SiteSettings global

## 🎯 Vị Trí Tiềm Năng Khác

### Marketplace & Items
- **Marketplace Item Descriptions**: Có thể thêm rich text descriptions cho marketplace items
- **Category Descriptions**: Mô tả cho các categories (Basketball, Football, etc.)
- **Featured Items Carousel**: Quản lý featured items qua Payload

### Content & Media
- **Events Collection**: Quản lý upcoming events, showcases, auctions
- **FAQs Collection**: Frequently Asked Questions với categories
- **Case Studies**: Success stories và case studies
- **Media Gallery**: Quản lý images với captions và metadata

### Marketing & SEO
- **SEO Settings**: Meta descriptions, Open Graph images cho từng page
- **Announcements/Banners**: Site-wide announcements hoặc promotional banners
- **Newsletter Content**: Newsletter templates và content

### User-Generated Content
- **User Reviews**: Reviews từ authenticated users
- **Submission Guidelines**: Content guidelines cho users khi submit items
- **Help Documentation**: User guides và help articles

### Localization
- **Multi-language Content**: Nếu cần hỗ trợ nhiều ngôn ngữ
- **Regional Settings**: Content khác nhau cho các regions

### Dynamic Content Blocks
- **Reusable Content Blocks**: Các blocks có thể tái sử dụng trên nhiều pages
- **Widget Content**: Sidebar widgets, footer widgets
- **Call-to-Action Blocks**: CTA blocks có thể customize

## 📝 Notes

- Tất cả content hiện tại đã được migrate từ hardcoded/mock data sang Payload CMS
- Admin panel có thể truy cập tại `/admin` (Payload default admin)
- Custom CMS management pages tại `/admin/cms/*`
- API endpoints cho apps/web tại `/api/payload/collections/*` và `/api/payload/globals/*`
- Seed script có sẵn tại `apps/admin/scripts/seed-payload.ts` để migrate data ban đầu

## 🔧 Cách Sử Dụng

1. **Quản lý Content**: Truy cập `/admin/cms` trong admin app
2. **Edit Rich Content**: Sử dụng Payload admin panel tại `/admin` cho rich text editing
3. **API Access**: apps/web fetch data từ `/api/payload/*` endpoints
4. **Environment Variables**: Cần set `NEXT_PUBLIC_PAYLOAD_API_URL` trong apps/web để trỏ đến admin API
