# Demo Script - Relique Platform

Demo script 7-10 phút để trình bày Relique platform và chốt hợp đồng.

## Storyline Overview

1. **Home**: "Relics you can rely on" + CTA → Authenticate/Verify
2. **Verify**: Nhập RLQ code → loading → result table + explanation
3. **Save Result**: Save result → login mock → thấy history trong app
4. **Marketplace**: List + detail page (mock)
5. **Consign**: Form dài (Goldin-like) + upload + autosave
6. **About**: 4.1/4.2/4.3/4.3.2 anchors + partner ST.B + team cards
7. **Policies/Terms**: Long-form page readable

## Detailed Script

### 1. Home Page (1 phút)

**Talking Points:**
- "Relique là platform probabilistic authentication cho collectibles và memorabilia"
- "Chúng ta bắt đầu với homepage - clean, professional, premium vibe"
- "Notice the navy/gold color scheme - phù hợp với collectibles/finance market"
- "Hero section với clear CTA: 'Get Started' → Verify"

**Actions:**
- Scroll qua hero section
- Point out Quick Actions bento grid
- Show Featured Items, Posts, Events
- Click "Get Started" → Navigate to Verify

### 2. Verify Flow (2 phút)

**Talking Points:**
- "Verify là core feature - users nhập RLQ code để verify authenticity"
- "Mock flow: nhập code → loading ~5s → result table"
- "Result table shows: signatures, status (qualified/inconclusive/disqualified), explanation"
- "Users có thể save result vào history"

**Actions:**
- Enter product ID: `REL-2024-001`
- Click "Verify"
- Show loading state với progress bar
- Wait for result (~5s)
- Show result table với status explanation
- Click "Save Result"
- Show success message

### 3. Login & App Dashboard (1 phút)

**Talking Points:**
- "Mock authentication - 3 options: Email/Password, Magic Link, Social (Google/Apple)"
- "Sau khi login, users vào App dashboard"
- "Dashboard shows: saved items, submissions, verification history"

**Actions:**
- Navigate to Login
- Show 3 login options
- Login với email/password (test@example.com)
- Show App dashboard với stats
- Show "My Submissions" với verify history

### 4. Marketplace (1.5 phút)

**Talking Points:**
- "Marketplace để browse authenticated collectibles"
- "Features: search, filters (category, sport, signed by, status), sort, pagination"
- "Item cards show: image, title, price, status tag, favorite button"
- "Detail page: gallery, metadata, trust panel, related items"

**Actions:**
- Navigate to Marketplace
- Show list view với filters
- Apply filter (e.g., Sports)
- Click vào item để xem detail
- Show gallery, trust panel, related items
- Click favorite button
- Go back to list

### 5. Consign Form (1.5 phút)

**Talking Points:**
- "Consign form dài, Goldin-like - users submit items để consign"
- "Features: contact info, item summary, media uploads (drag/drop), provenance, consent"
- "Autosave draft to localStorage - users có thể continue later"
- "Form validation với inline errors"

**Actions:**
- Navigate to Consign
- Fill form (name, email, description)
- Upload file (drag/drop)
- Show autosave notification
- Reload page → show draft restored banner
- Show validation errors (if applicable)

### 6. About Page (1 phút)

**Talking Points:**
- "About page với anchor navigation - 4 sections: Who We Are, One to Appreciate, Question of Trust, AI"
- "Partner block: ST.B Analytics - strategic partner"
- "Team grid: show team members"

**Actions:**
- Navigate to About
- Scroll qua các sections
- Show anchor navigation (sticky sidebar)
- Show Partner block
- Show Team grid

### 7. Policies/Terms (0.5 phút)

**Talking Points:**
- "Legal pages: Policies và Terms"
- "Long-form content với auto-generated TOC"
- "Readable typography, proper spacing"

**Actions:**
- Navigate to Policies
- Show TOC (left sidebar)
- Scroll qua content
- Show typography và readability

## Key Features Highlight

### UI Modular
- "Bento cards - reusable modules cho marketing pages"
- "Component-based architecture - dễ mở rộng services"

### Mock Data Contracts
- "Mock data có contracts rõ ràng - nối backend/API không phải đập UI"
- "Service layer abstraction - dễ swap data source"

### SEO/OG Share Cards
- "Metadata đầy đủ cho tất cả pages"
- "OG images strategy - sẵn cho marketing"

### Dark/Light Theme
- "Premium theme với dark/light toggle"
- "Theme persistence - users preferences được lưu"

## Closing Points

- "Frontend-only, mock data - ready để nối backend"
- "Design system hoàn chỉnh - rounded-0, navy/gold, consistent"
- "Performance optimized - hero priority, card lazy-load"
- "Accessibility compliant - keyboard nav, ARIA labels, contrast"
- "SEO ready - metadata, OG cards, sitemap"

## Q&A Preparation

**Q: Backend integration?**
A: Service layer abstraction - chỉ cần swap service implementations. Mock data contracts rõ ràng.

**Q: Payment integration?**
A: Chưa có trong scope Phase 5, nhưng UI structure sẵn sàng để integrate.

**Q: Real authentication?**
A: Mock authentication hiện tại, nhưng structure sẵn sàng cho real auth (NextAuth, Clerk, etc.).

**Q: Admin features?**
A: Admin-lite CRUD mock hiện có, có thể mở rộng với RBAC thật.

