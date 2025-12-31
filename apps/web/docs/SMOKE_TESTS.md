# Smoke Tests Documentation

Tài liệu này mô tả smoke tests cho critical flows và cách chạy tests.

## Test Flows

### Flow 1: Home → Verify → Loading → Result → Save
1. Navigate từ home đến verify page
2. Submit verification với product ID
3. Verify loading state hiển thị (~5s)
4. Verify result hiển thị sau loading
5. Save result và verify được lưu

### Flow 2: Auth Mock - Login → Dashboard → Logout
1. Login với email/password
2. Verify redirect đến dashboard
3. Verify dashboard hiển thị đúng
4. Logout và verify redirect về home

### Flow 3: Consign - Form → Upload → Autosave → Reload → Restore
1. Fill consign form với thông tin
2. Upload files
3. Verify autosave draft (localStorage)
4. Reload page và verify draft được restore

### Flow 4: Marketplace - List → Detail → Back → Filter
1. Navigate đến marketplace list
2. Click vào item để xem detail
3. Go back về list
4. Apply filters và verify results

## Running Tests

### Prerequisites
```bash
# Install dependencies
pnpm install

# Install Cypress (if not already installed)
pnpm add -D cypress
```

### Run Tests
```bash
# Run tests in headless mode
pnpm test

# Run tests with UI
pnpm test:open
```

## Expected Results

### Flow 1
- ✅ Navigate to verify page successfully
- ✅ Loading state shows for ~5 seconds
- ✅ Result displays with correct data
- ✅ Save button works and shows success message

### Flow 2
- ✅ Login form accepts email/password
- ✅ Redirects to /app after login
- ✅ Dashboard displays user info
- ✅ Logout clears session and redirects to home

### Flow 3
- ✅ Form accepts input
- ✅ File upload works
- ✅ Draft saves to localStorage
- ✅ Draft restores on page reload

### Flow 4
- ✅ Marketplace list displays items
- ✅ Item detail page loads correctly
- ✅ Back button returns to list
- ✅ Filters work and update results

## Test Data

- **Product ID**: `REL-2024-001`
- **Email**: `test@example.com`
- **Password**: `password123`
- **Test Image**: `test-image.jpg` (should be in `cypress/fixtures/`)

## Notes

- Tests sử dụng Cypress cho E2E testing
- Mock data được sử dụng từ `src/mocks/`
- LocalStorage được clear giữa các tests
- Tests có thể cần adjustment dựa trên actual implementation

