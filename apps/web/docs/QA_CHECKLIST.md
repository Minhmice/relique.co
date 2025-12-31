# QA Checklist

Tài liệu này mô tả QA checklist cho Phase 5 - Final Polish.

## Visual Consistency Audit

### Rounded-0 Enforcement
- ✅ Buttons: Không có rounded classes
- ✅ Cards: Không có rounded classes
- ✅ Modals: Không có rounded classes
- ✅ Tables: Không có rounded classes
- ✅ Inputs: Không có rounded classes
- ✅ Tags/Badges: Không có rounded classes

### Theme Parity (Light/Dark)
- ✅ Light mode: Tất cả components hiển thị đúng
- ✅ Dark mode: Tất cả components hiển thị đúng
- ✅ Theme toggle: Hoạt động mượt, không flash
- ✅ Contrast: Đủ contrast trong cả light và dark mode
- ✅ Borders: Hiển thị rõ trong cả hai modes

### Blue/Gold Accent Usage
- ✅ Primary CTA: Sử dụng blue/gold đúng chỗ
- ✅ Underline: Chỉ dùng cho links quan trọng
- ✅ Key dividers: Sử dụng accent colors hợp lý
- ✅ Tránh loè loẹt: Không overuse accent colors

## State Coverage Audit

### Loading States
- ✅ Verify page: Loading với progress bar
- ✅ Marketplace: Loading skeleton
- ✅ Forms: Submit loading state
- ✅ Data fetching: Loading indicators

### Empty States
- ✅ Marketplace: Empty state khi không có items
- ✅ Favorites: Empty state khi không có favorites
- ✅ Submissions: Empty state khi không có submissions
- ✅ Search: Empty state khi không có results

### Error States
- ✅ Form validation: Inline error messages
- ✅ Network errors: Error messages rõ ràng
- ✅ Not found: 404 pages
- ✅ Server errors: Error boundaries

## Form States

### Validation
- ✅ Inline validation: Hiển thị errors ngay khi blur
- ✅ Required fields: Đánh dấu rõ ràng
- ✅ Format validation: Email, phone, etc.
- ✅ File validation: Size, type constraints

### Submit States
- ✅ Loading: Disable button, show spinner
- ✅ Success: Success message/toast
- ✅ Error: Error message/toast
- ✅ Draft restored: Banner notification

## Accessibility Audit

### Keyboard Navigation
- ✅ Tab order: Đúng thứ tự
- ✅ Focus ring: Hiển thị rõ ràng
- ✅ Skip links: Có skip to main content
- ✅ Modal focus trap: Focus không ra ngoài modal

### ARIA Labels
- ✅ Icon buttons: Có aria-label
- ✅ Form fields: Có label và aria-describedby
- ✅ Error messages: Linked với form fields
- ✅ Landmarks: Proper semantic HTML

### Contrast Check
- ✅ Text contrast: Đủ contrast (WCAG AA)
- ✅ Gold on navy: Đủ contrast
- ✅ Links: Đủ contrast và có underline
- ✅ Focus indicators: Đủ contrast

## Cross-Browser Testing

- ✅ Chrome: Tested
- ✅ Firefox: Tested
- ✅ Safari: Tested
- ✅ Edge: Tested

## Responsive Testing

- ✅ Mobile (375px): Tested
- ✅ Tablet (768px): Tested
- ✅ Desktop (1024px+): Tested

