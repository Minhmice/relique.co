# UAT Checklist

Non-technical friendly checklist based on demo script flows. Use Yes/No format.

## Setup

- [ ] Both apps start successfully (web on port 3000, portal on port 3001)
- [ ] Demo tools button visible in web app
- [ ] Can apply preset (Collector/Investor/Dealer) with one click
- [ ] Demo mode can be enabled (fixed 5s latency, zero errors)

## Persona A: Collector Flow

### Verify Flow
- [ ] Can navigate to `/verify` page
- [ ] Can enter product code (e.g., `RLQ-QUAL-001`)
- [ ] Loading animation appears for ~5 seconds
- [ ] Result table displays after loading
- [ ] Result shows status (Qualified/Inconclusive/Disqualified)
- [ ] Can save result to history
- [ ] Success message appears after saving

### Verify History
- [ ] Can navigate to `/app/submissions`
- [ ] Can see "Verifications" tab
- [ ] History list shows 5 items (after applying Collector preset)
- [ ] Different statuses visible (qualified, inconclusive, disqualified)
- [ ] Timestamps displayed correctly

### Marketplace & Favorites
- [ ] Can navigate to `/marketplace`
- [ ] Marketplace list displays items
- [ ] Can click on item to view detail
- [ ] Detail page shows full item information
- [ ] Can favorite an item (heart button)
- [ ] Favorite count updates
- [ ] Can view favorites in `/app/saved`
- [ ] 7 favorited items visible (after Collector preset)

### Cross-App Sync
- [ ] Can open portal app (`http://localhost:3001/app/submissions`)
- [ ] Verify history appears in portal (same as web)
- [ ] Saved items count matches between apps

## Persona B: Investor Flow

### Marketplace Browse
- [ ] Can apply price filter (> $20,000)
- [ ] Filtered results display correctly
- [ ] Can sort by price (high to low)
- [ ] High-value items visible

### Saved Searches
- [ ] Can see saved searches (3 searches after Investor preset)
- [ ] Can click on saved search
- [ ] Filters apply automatically
- [ ] Results match saved criteria

### Favorites & Bookmarks
- [ ] 11 favorited items visible (after Investor preset)
- [ ] 5 bookmarked content items visible
- [ ] Can toggle bookmarks

## Persona C: Dealer Flow

### Consign Form
- [ ] Can navigate to `/consign`
- [ ] Existing draft visible (after Dealer preset)
- [ ] Can fill form fields
- [ ] Can upload files
- [ ] Autosave notification appears after 2 seconds
- [ ] Draft restored after page reload

### Draft Management
- [ ] Can view drafts in `/app/submissions`
- [ ] 2 drafts visible (1 complete, 1 incomplete)
- [ ] Draft details displayed correctly

### Submissions Center
- [ ] Can view submissions in portal (`/app/submissions`)
- [ ] 1 submission visible (after Dealer preset)
- [ ] Submission status displayed

## Universal Flows

### Home Page
- [ ] Home page loads correctly
- [ ] Hero section displays
- [ ] Quick Actions grid visible
- [ ] Featured items section visible
- [ ] Can click "Get Started" to navigate to Verify

### About Page
- [ ] Can navigate to `/about`
- [ ] All sections visible (Who We Are, One to Appreciate, etc.)
- [ ] Anchor navigation works
- [ ] Partner section (ST.B Analytics) visible
- [ ] Team grid displays

### Policies/Terms
- [ ] Can navigate to `/policies` and `/terms`
- [ ] Table of contents visible
- [ ] Content readable
- [ ] Typography clear

## Technical Checks (Non-Technical Friendly)

### Performance
- [ ] Pages load quickly (< 3 seconds)
- [ ] Images load smoothly
- [ ] No layout shifts when content loads
- [ ] Smooth scrolling

### Accessibility
- [ ] Can navigate with keyboard (Tab key)
- [ ] Focus indicators visible
- [ ] Text is readable
- [ ] Images have descriptions (hover to see)

### Stability
- [ ] No crashes or errors during demo
- [ ] Data persists after page reload
- [ ] Cross-app sync works reliably
- [ ] Presets apply consistently

## Overall Assessment

- [ ] All core flows work as expected
- [ ] Demo can be completed in 10-15 minutes
- [ ] No blocking issues
- [ ] Ready for client presentation

## Notes

_Use this section to document any issues, questions, or feedback during UAT._

