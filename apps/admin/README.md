# Admin Dashboard - Relique CRM

## 📋 Tổng quan

Admin Dashboard là ứng dụng quản lý toàn diện cho Relique platform, cung cấp giao diện quản trị cho marketplace, verification records, submissions, và system management. Dashboard được xây dựng dựa trên CRM dashboard với tab-based navigation và dark theme interface.

### Tính năng chính

- ✅ **Tab-based Navigation**: Client-side routing với sidebar navigation
- ✅ **Dashboard Analytics**: Platform metrics với charts và statistics
- ✅ **Marketplace Management**: Quản lý items, featured carousel
- ✅ **Verification Records**: Quản lý verification certificates và results
- ✅ **Audit Trail**: Security audit logs với real-time tracking
- ✅ **Authentication**: Login + OTP two-factor authentication flow
- ✅ **Data Visualization**: Charts với recharts library

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- pnpm (recommended) hoặc npm/yarn

### Installation

```bash
# Install dependencies (từ root)
pnpm install

# Run admin dashboard (port 3001)
cd apps/admin
pnpm dev

# Hoặc từ root
pnpm dev:admin
```

### Access

- Development: `http://localhost:3001`
- Login: `http://localhost:3001/login`
- Admin Dashboard: `http://localhost:3001/admin`

### Default Credentials

```
Email: admin@relique.co hoặc admin@gmail.com
Password: admin123
OTP: 123456
```

---

## 🎯 Features

### 1. Authentication System

**Two-Factor Authentication (2FA) Flow:**
- Email/password login
- OTP verification (6 digits)
- Session management
- Secure logout với audit logging

**Files:**
- `src/app/login/page.tsx` - Login và OTP flow

### 2. Dashboard Overview

**Platform Metrics:**
- Statistics grid với key metrics (Authenticates, Consigns, Messages, Items)
- Platform activity chart (Area chart với recharts)
- Recent audit logs sidebar

**Components:**
- `src/components/dashboard/StatsGrid.tsx` - Statistics cards
- `src/app/admin/page.tsx` - Main dashboard với charts

### 3. Marketplace Management

**Features:**
- Browse và search marketplace items
- Status management (Published, Draft, Archived)
- Featured items toggle
- Price display và formatting
- Item editing và deletion

**Tabs:**
- **Items**: Full marketplace items table với search
- **Carousel**: Featured items manager với drag-to-reorder

### 4. Featured Carousel Manager

**Features:**
- Reorder featured items (up/down arrows)
- Add/remove items từ featured carousel
- Live preview của carousel order
- Selection explorer để tìm items chưa featured

**Components:**
- Main carousel manager trong dashboard
- Drag-to-reorder functionality
- Real-time order updates

### 5. Verification Records

**Features:**
- View verification certificates (Product ID, Name, Signatures, Result, Date)
- Search by Product ID (PID)
- Create new certificates
- Status tracking (Qualified, Inconclusive, Disqualified)

**Data Table:**
- Product ID display với monospace font
- Result status pills với color coding
- Date formatting

### 6. Audit Trail & Logs

**Features:**
- Complete audit log của tất cả admin actions
- Real-time log updates
- Timestamp formatting
- Actor tracking (who performed the action)
- Entity tracking (what was affected)

**Log Actions:**
- LOGIN, LOGOUT
- PUBLISH, DELETE, CREATE
- FEATURE, UNFEATURE, REORDER
- BULK_DELETE
- và nhiều actions khác

### 7. System Settings

**Features:**
- Admin profile management
- Security settings (password change)
- System configurations

---

## 🗂️ Architecture

### Tab Navigation

Dashboard sử dụng client-side tab navigation với các tabs sau:

1. **Dashboard** - Platform overview với metrics và charts
2. **Items** - Marketplace items management
3. **Carousel** - Featured items manager
4. **Verify** - Verification records
5. **Logs** - Security audit trail
6. **Settings** - System configurations
7. **Submissions** - Authenticate và Consign submissions (placeholder)
8. **Messages** - Contact inquiries (placeholder)

### Component Structure

```
src/
├── app/
│   ├── admin/
│   │   └── page.tsx          # Main admin dashboard (tab navigation)
│   ├── login/
│   │   └── page.tsx          # Login + OTP flow
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles
├── components/
│   ├── shell/
│   │   └── PortalSidebar.tsx # Sidebar navigation
│   ├── dashboard/
│   │   └── StatsGrid.tsx     # Statistics cards
│   └── shared/
│       └── DataTable.tsx     # Reusable data table
└── lib/
    ├── types.ts              # TypeScript types và enums
    ├── auth.ts               # Authentication utilities
    └── utils.ts              # Utility functions
```

### Key Components

**PortalSidebar**
- Tab-based navigation
- Menu groups (Overview, Marketplace, Verification, Submissions, System)
- Active tab highlighting
- Logout button

**StatsGrid**
- 4 statistics cards
- Icons với color coding
- Percentage changes
- Hover effects

**DataTable**
- Reusable table component
- Column configuration
- Custom rendering
- Actions (View, Edit, Delete)
- Empty state handling

---

## 🎨 Styling & Theme

### Color Scheme

```css
--primary: #0055FF      /* Blue */
--accent: #00CCFF       /* Cyan */
--surface: #121212      /* Dark surface */
--border: #333333       /* Border color */
--success: #10B981      /* Green */
--warning: #F59E0B      /* Orange */
--destructive: #EF4444  /* Red */
--bg-0: #0A0A0A         /* Background */
```

### Design System

- **Theme**: Dark-only
- **Typography**: Inter font family
- **Border Radius**: Rounded-xl, rounded-2xl
- **Spacing**: Consistent spacing scale
- **Shadows**: Subtle shadows với color tints

### Status Pills

Status được hiển thị với color-coded pills:
- **Published**: Green với CheckCircle icon
- **Draft**: Gray với FileEdit icon
- **Archived/Disqualified**: Red với Archive icon
- **In Review/Inconclusive**: Orange với Clock icon
- **Qualified**: Cyan với ShieldCheck icon

---

## 📦 Dependencies

### Core Dependencies

```json
{
  "next": "16.1.0",
  "react": "^19.2.0",
  "react-dom": "^19.2.0",
  "recharts": "^3.6.0",
  "lucide-react": "^0.468.0",
  "sonner": "^2.0.7"
}
```

### UI Libraries

- **shadcn/ui**: Radix UI components
- **recharts**: Charts và data visualization
- **lucide-react**: Icon library
- **tailwindcss**: Styling framework

---

## 🔧 Development

### Scripts

```bash
# Development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Type checking
pnpm check-types

# Linting
pnpm lint
```

### Environment

- **Port**: 3001 (default)
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS

---

## 📝 Types & Interfaces

### Enums

```typescript
enum MarketplaceStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  ARCHIVED = 'archived'
}

enum VerificationStatus {
  QUALIFIED = 'qualified',
  INCONCLUSIVE = 'inconclusive',
  DISQUALIFIED = 'disqualified'
}

enum SubmissionStatus {
  NEW = 'new',
  IN_REVIEW = 'in_review',
  CLOSED = 'closed'
}
```

### Interfaces

```typescript
interface MarketplaceItem {
  id: string;
  title: string;
  athlete: string;
  category: string;
  status: MarketplaceStatus;
  is_featured: boolean;
  price_usd: number;
  featured_order?: number | null;
}

interface VerifyRecord {
  id: string;
  pid: string;
  name: string;
  signatures: number;
  result: VerificationStatus;
  date: string;
}

interface AuditLog {
  id: string;
  actor: string;
  action: string;
  entity: string;
  timestamp: string;
}
```

---

## 🔐 Authentication Flow

1. User enters email và password
2. System validates credentials
3. If valid, OTP screen appears
4. User enters 6-digit OTP
5. If OTP correct, user is authenticated
6. Session is created và user redirected to dashboard
7. All actions are logged trong audit trail

---

## 📊 Data Flow

### State Management

- **Client-side state**: React useState hooks
- **Local state**: Component-level state
- **Data persistence**: Currently mock data (can be extended với API integration)

### Data Tables

- **Marketplace Items**: Filterable, searchable table
- **Verification Records**: Searchable by Product ID
- **Audit Logs**: Chronological list với timestamps

---

## 🚧 Future Enhancements

### Planned Features

- [ ] API integration thay vì mock data
- [ ] Real-time updates với WebSocket
- [ ] Advanced filtering và sorting
- [ ] Export functionality (CSV, Excel)
- [ ] Bulk operations
- [ ] User management
- [ ] Permission system
- [ ] Email notifications
- [ ] Dashboard customization

---

## 🐛 Known Issues

### Hydration Mismatch

- **Issue**: Date formatting có thể gây hydration mismatch
- **Solution**: Sử dụng `mounted` state để chỉ render formatted dates sau khi client-side mount

### Recharts SSR

- **Issue**: ResponsiveContainer cần client-side rendering
- **Solution**: Conditional rendering với `mounted` state

---

## 📚 Related Documentation

- [Project Structure](../../docs/PROJECT_STRUCTURE.md)
- [Root README](../../README.md)
- [Web App README](../web/README.md)

---

**Last Updated:** 2025-01-20  
**Version:** 0.1.0  
**Status:** Production-Ready
