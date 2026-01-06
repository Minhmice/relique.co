# Demo Script - Relique Platform

Demo script 10-15 phút để trình bày Relique platform và chốt hợp đồng.

## Setup Instructions

### Prerequisites
1. Start both apps:
   ```bash
   pnpm dev:web      # http://localhost:3000
   pnpm dev:app-portal  # http://localhost:3001
   ```

2. Apply preset (choose one persona):
   - Open web app → Click "Demo Tools" button (bottom right)
   - Select preset: Collector / Investor / Dealer
   - Click "Apply Preset"
   - Enable "Demo Mode" toggle (fixed 5s latency, zero errors)

### Demo Mode Settings
- **Latency**: Fixed 5s for verify (no jitter)
- **Errors**: Off (0% error rate)
- **Preset**: Applied and synced between web and portal

---

## Persona-Specific Demo Scripts

### Persona A: Collector (Verify-Focused)

**Narrative**: "Meet Sarah, a passionate collector who verifies items regularly and builds a collection of favorites."

#### Step 1: Home Page (1 min)
**URL**: `http://localhost:3000`

**Actions**:
- Scroll through hero section
- Point out "Get Started" CTA
- Show Quick Actions bento grid
- Highlight Featured Items section

**Talk Track**:
- "Relique is a probabilistic authentication platform for collectibles and memorabilia"
- "Our homepage showcases the premium, trustworthy brand identity with navy/gold color scheme"
- "Notice the clear call-to-action directing users to verify their items"

**Expected Output**:
- Hero section visible
- Quick Actions grid displays 4 cards
- Featured marketplace items shown

---

#### Step 2: Verify Flow (2 min)
**URL**: `http://localhost:3000/verify`

**Actions**:
- Enter product code: `RLQ-QUAL-001`
- Click "Verify" button
- Wait for loading animation (~5s)
- Review result table (status, signatures, explanation)
- Click "Save Result"
- Show success message

**Talk Track**:
- "The verify flow is our core feature - users enter an RLQ code to check authenticity"
- "Our AI analyzes multiple factors and provides a confidence score with detailed explanation"
- "Results can be saved to history for future reference"

**Expected Output**:
- Loading state shows progress
- Result displays: Qualified status, 2 signatures, certificate info
- Success toast appears
- Result saved to history

---

#### Step 3: Verify History (1 min)
**URL**: `http://localhost:3000/app/submissions`

**Actions**:
- Navigate to "My Submissions"
- Click "Verifications" tab
- Show history list (5 items: mix of Qualified/Inconclusive/Disqualified)
- Explain status differences

**Talk Track**:
- "Sarah has verified multiple items - notice the mix of statuses"
- "Qualified items have high confidence, Inconclusive need more info, Disqualified are likely not authentic"
- "History is synced across devices using localStorage"

**Expected Output**:
- History list shows 5 entries
- Different statuses visible (qualified, inconclusive, disqualified)
- Timestamps displayed

---

#### Step 4: Marketplace & Favorites (2 min)
**URL**: `http://localhost:3000/marketplace`

**Actions**:
- Browse marketplace listings
- Click on a favorite item (ID: 1, 2, or 3)
- View detail page
- Click favorite button (heart icon)
- Show favorites count increases
- Navigate to "My Saved" (`/app/saved`)

**Talk Track**:
- "Sarah has already favorited several items - these are authenticated collectibles she's interested in"
- "The marketplace shows verified items with trust indicators"
- "Favorites sync between web and portal apps"

**Expected Output**:
- Marketplace list displays items
- Detail page shows full item info
- Favorite button toggles
- Saved page shows 7 favorited items

---

#### Step 5: Cross-App Sync (1 min)
**URL**: `http://localhost:3001/app/submissions`

**Actions**:
- Open portal app in new tab
- Navigate to Submissions
- Show verify history appears (same as web)
- Show saved items count matches

**Talk Track**:
- "Notice how Sarah's data syncs between web and portal - they share the same storage keys"
- "This demonstrates our unified data model across applications"

**Expected Output**:
- Portal shows same verify history
- Saved items count matches web app

---

### Persona B: Investor (Marketplace-Focused)

**Narrative**: "Meet James, an investor who focuses on high-value authenticated items and uses saved searches to track opportunities."

#### Step 1: Marketplace Browse (1.5 min)
**URL**: `http://localhost:3000/marketplace`

**Actions**:
- Show marketplace list
- Apply filter: "Price > $20,000"
- Show filtered results
- Sort by "Price: High to Low"
- Click on high-value item (Einstein letter, Beatles album)

**Talk Track**:
- "James is looking for investment-grade collectibles"
- "Our marketplace supports advanced filtering and sorting"
- "Notice the trust indicators - all items are authenticated"

**Expected Output**:
- Filtered results show high-value items
- Sorted by price descending
- Detail page shows full authentication details

---

#### Step 2: Saved Searches (1.5 min)
**URL**: `http://localhost:3000/marketplace`

**Actions**:
- Show saved searches (3 searches: High Value, PSA Certified, Sports Memorabilia)
- Click on "High Value Items" search
- Show results filtered automatically
- Explain how saved searches help track opportunities

**Talk Track**:
- "James has saved several search criteria to quickly find investment opportunities"
- "Saved searches help investors track specific categories or price ranges"
- "These searches persist across sessions"

**Expected Output**:
- Saved searches list visible
- Clicking search applies filters automatically
- Results match saved criteria

---

#### Step 3: Favorites Collection (1 min)
**URL**: `http://localhost:3000/app/saved`

**Actions**:
- Show favorites list (11 items)
- Explain high-value focus
- Show bookmarks (5 content items)

**Talk Track**:
- "James has curated a collection of 11 high-value items"
- "He also bookmarks educational content about authentication"
- "This demonstrates the platform's dual focus on commerce and education"

**Expected Output**:
- Favorites list shows 11 items
- Bookmarks section shows 5 content items

---

### Persona C: Dealer (Consign-Focused)

**Narrative**: "Meet Maria, a dealer who consigns items regularly and manages multiple submissions."

#### Step 1: Consign Form (2 min)
**URL**: `http://localhost:3000/consign`

**Actions**:
- Show existing draft (near-complete with files)
- Fill in missing fields
- Upload additional file
- Show autosave notification
- Reload page → show draft restored

**Talk Track**:
- "Maria has a draft in progress - the form autosaves to prevent data loss"
- "Notice the comprehensive form fields - similar to Goldin Auctions"
- "File uploads are handled with drag-and-drop interface"

**Expected Output**:
- Draft form pre-filled
- Autosave notification appears
- After reload, draft data restored

---

#### Step 2: Draft Management (1 min)
**URL**: `http://localhost:3000/app/submissions`

**Actions**:
- Show drafts list (2 drafts: 1 complete, 1 incomplete)
- Explain draft status
- Show incomplete draft details

**Talk Track**:
- "Maria manages multiple consignment drafts"
- "The system supports multiple drafts with different completion levels"
- "Drafts can be edited, deleted, or submitted when ready"

**Expected Output**:
- Drafts list shows 2 items
- One draft marked as incomplete
- Draft details visible

---

#### Step 3: Submissions Center (1.5 min)
**URL**: `http://localhost:3001/app/submissions`

**Actions**:
- Open portal app
- Navigate to Submissions
- Show submitted consignment (1 submission)
- Show status: "Submitted"
- Explain submission workflow

**Talk Track**:
- "Maria's submissions appear in the portal dashboard"
- "The portal provides a dealer-focused view of all consignment activity"
- "Status tracking helps dealers manage their inventory"

**Expected Output**:
- Submissions list shows 1 item
- Status displayed as "Submitted"
- Submission details visible

---

## Universal Demo Flows

### Flow 1: Home → Verify → Result → Save (3 min)
1. Navigate to home
2. Click "Get Started" or "Verify"
3. Enter code: `RLQ-QUAL-001`
4. Wait for result (5s)
5. Review result table
6. Save to history
7. Navigate to history to confirm

### Flow 2: Marketplace → Filter → Detail → Favorite (2 min)
1. Navigate to marketplace
2. Apply category filter
3. Click item card
4. View detail page
5. Toggle favorite
6. Return to list
7. Check favorites count

### Flow 3: Consign → Autosave → Reload → Restore (2 min)
1. Navigate to consign
2. Fill form fields
3. Wait for autosave (2s)
4. Reload page
5. Confirm draft restored
6. Continue editing

### Flow 4: Cross-App Sync (1 min)
1. Perform action in web (verify or favorite)
2. Open portal app
3. Confirm data appears in portal
4. Explain shared storage keys

### Flow 5: About Page Navigation (1 min)
1. Navigate to `/about`
2. Scroll through sections
3. Show anchor navigation
4. Highlight partner section (ST.B Analytics)
5. Show team grid

### Flow 6: Policies/Terms (0.5 min)
1. Navigate to `/policies` or `/terms`
2. Show table of contents
3. Scroll through content
4. Highlight readability

---

## Key Features to Highlight

### 1. Probabilistic Authentication
- "Our AI analyzes multiple factors, not just signatures"
- "Results include confidence scores and detailed explanations"
- "Three status levels: Qualified, Inconclusive, Disqualified"

### 2. Unified Data Model
- "Web and portal apps share the same storage contract"
- "Data syncs automatically via localStorage keys"
- "No backend required for demo - ready for API integration"

### 3. Service Layer Architecture
- "All data access goes through service contracts"
- "Easy to swap mock services for real API calls"
- "UI layer never touches localStorage directly"

### 4. Demo Mode Stability
- "Fixed 5-second latency for predictable demos"
- "Zero error rate ensures smooth presentation"
- "One-click preset application"

### 5. Design System
- "Consistent navy/gold color scheme"
- "Rounded-0 design language (no border radius)"
- "Component-based architecture for scalability"

---

## Troubleshooting

### Preset Not Applying
- Check browser console for errors
- Verify localStorage is enabled
- Try resetting storage and reapplying

### Data Not Syncing
- Ensure both apps use same storage keys
- Check browser localStorage directly
- Verify preset was applied correctly

### Loading Too Fast/Slow
- Check demo mode is enabled (fixed 5s)
- Verify simulation config in localStorage
- Use Demo Tools to adjust latency

---

## Closing Points

1. **Frontend-Only, Mock Data**: Ready for backend integration without UI changes
2. **Contract-Ready**: Service layer abstraction enables easy API swap
3. **Demo-Stable**: Fixed latency and zero errors ensure smooth presentations
4. **Cross-App Sync**: Unified storage model enables seamless data sharing
5. **Production-Ready**: Performance, accessibility, and SEO optimized

---

## Q&A Preparation

**Q: How do we integrate a real backend?**
A: Swap service implementations in `impl/` folder. Contracts remain the same, UI doesn't change.

**Q: What about authentication?**
A: Current mock auth can be replaced with NextAuth, Clerk, or any auth provider. Structure is ready.

**Q: Can we add more personas?**
A: Yes, presets are JSON files. Add new preset and update seed system.

**Q: How do we handle production data?**
A: Replace localStorage with API calls in service implementations. Storage contract stays the same.

**Q: What about payments?**
A: Not in current scope, but UI structure supports payment integration when needed.

