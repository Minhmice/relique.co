# Risk Register

Risks identified during project execution with mitigation strategies.

## Technical Risks

### Risk TEC-001: localStorage Quota Exceeded
**Description**: Browser localStorage has size limits (typically 5-10MB). Large datasets may exceed quota.  
**Probability**: Medium  
**Impact**: High  
**Mitigation**:
- Implement storage limits (caps) for arrays (verify history: 100, activity log: 200, drafts: 10)
- Use `pruneByLimit` utility to remove oldest entries
- Monitor storage size with `estimateStorageSize`
- Provide clear error messages if quota exceeded
- Document limits in user-facing messages

**Status**: Mitigated

---

### Risk TEC-002: Mock vs Real Data Mismatch
**Description**: When integrating real API, data structure may differ from mock data.  
**Probability**: High  
**Impact**: Medium  
**Mitigation**:
- Service contracts define exact data structures
- Adapter layer isolates UI from data source
- TypeScript types ensure type safety
- Migration guide provided for API integration

**Status**: Mitigated

---

### Risk TEC-003: Cross-Browser Compatibility
**Description**: Features may behave differently across browsers.  
**Probability**: Low  
**Impact**: Medium  
**Mitigation**:
- Test in Chrome, Firefox, Safari, Edge (latest 2 versions)
- Use standard web APIs
- Avoid browser-specific features
- Playwright tests run in multiple browsers

**Status**: Mitigated

---

### Risk TEC-004: TypeScript Project References Complexity
**Description**: Project references may cause build issues or editor confusion.  
**Probability**: Low  
**Impact**: Low  
**Mitigation**:
- Follow TypeScript best practices
- Document reference structure
- Provide troubleshooting guide
- Use `tsc --build` for type checking

**Status**: Mitigated

## Scope Risks

### Risk SCOPE-001: Scope Creep
**Description**: Client requests features outside original scope.  
**Probability**: Medium  
**Impact**: High  
**Mitigation**:
- Clear scope matrix (`SCOPE_MATRIX.md`)
- Change control process (`CHANGE_CONTROL.md`)
- Regular scope reviews
- Written approval for out-of-scope changes

**Status**: Mitigated

---

### Risk SCOPE-002: Unclear Requirements
**Description**: Acceptance criteria not specific enough.  
**Probability**: Low  
**Impact**: Medium  
**Mitigation**:
- Detailed acceptance criteria (`ACCEPTANCE_CRITERIA.md`)
- Testable statements (Given/When/Then)
- Regular client check-ins
- Demo script clarifies expected behavior

**Status**: Mitigated

## Content Risks

### Risk CONT-001: Legal Content Accuracy
**Description**: Policies/Terms content may need legal review.  
**Probability**: Medium  
**Impact**: Low  
**Mitigation**:
- Mark content as "placeholder" or "for review"
- Client responsible for legal content accuracy
- Document in assumptions

**Status**: Accepted

---

### Risk CONT-002: Image Rights
**Description**: Stock images may require licensing.  
**Probability**: Low  
**Impact**: Low  
**Mitigation**:
- Use placeholder images (picsum.photos) for demo
- Document image sources
- Client responsible for final image selection

**Status**: Accepted

## Demo Risks

### Risk DEMO-001: Demo Failure During Presentation
**Description**: Technical issues during live demo.  
**Probability**: Low  
**Impact**: High  
**Mitigation**:
- Demo mode ensures stable behavior (fixed latency, zero errors)
- Preset system for consistent starting state
- Backup plan: recorded demo video
- Test all flows before presentation

**Status**: Mitigated

---

### Risk DEMO-002: Data Loss During Demo
**Description**: localStorage cleared or corrupted during demo.  
**Probability**: Low  
**Impact**: Medium  
**Mitigation**:
- Export/import functionality in demo tools
- Preset system for quick reset
- Document recovery procedure

**Status**: Mitigated

## Integration Risks

### Risk INT-001: API Integration Complexity
**Description**: Real API may have different structure than mocks.  
**Probability**: High  
**Impact**: Medium  
**Mitigation**:
- Service contracts define expected structure
- Adapter pattern allows easy swap
- Migration guide provided
- TypeScript ensures type safety

**Status**: Mitigated

---

### Risk INT-002: Authentication Migration
**Description**: Moving from mock auth to real auth may require refactoring.  
**Probability**: Medium  
**Impact**: Medium  
**Mitigation**:
- Auth structure designed for easy swap
- Document auth integration points
- Use standard patterns (NextAuth, Clerk compatible)

**Status**: Mitigated

## Risk Monitoring

### Review Frequency
- Weekly during active development
- Before each phase completion
- Before client presentations

### Escalation
- **Low Risk**: Monitor, no action needed
- **Medium Risk**: Mitigation plan in place, regular review
- **High Risk**: Immediate attention, client notification if needed

### Risk Owner
- Technical risks: Development team
- Scope risks: Project lead + client
- Content risks: Client
- Demo risks: Project lead

