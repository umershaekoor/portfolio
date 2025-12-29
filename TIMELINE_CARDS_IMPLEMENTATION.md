# Interactive Timeline Cards Implementation

## Summary
Successfully implemented interactive timeline cards with hover/focus expansion, backdrop blur, and country mini-cards as requested.

## Changes Made

### 1. Data Model Updates (`apps/portfolio/src/app/core/models/portfolio.models.ts`)
- Extended `Experience` interface with:
  - `countryKey`: Translation key for country name
  - `periodFromKey`: Translation key for start date
  - `periodToKey`: Translation key for end date
  - `countryCode`: ISO country code (e.g., "DE", "CH")
  - `mapPosition`: Coordinates for mini-map marker positioning

### 2. Component Logic (`apps/portfolio/src/app/experience/experience.component.ts`)
- Added `expandedCardIndex` state to track which card is expanded
- Implemented hover/focus expansion handlers:
  - `expandOnHover()`: Expands card on mouse hover (desktop only)
  - `collapseOnLeave()`: Collapses on mouse leave
  - `expandOnFocus()`: Expands on keyboard focus
  - `collapseOnBlur()`: Collapses when focus leaves
  - `toggleExpansion()`: Toggles expansion on click/Enter/Space
- Added `isHoverCapable()` check to prevent hover on touch devices
- Implemented Escape key handler to close expanded cards
- Enriched experience data with country info and map positions

### 3. Template Updates (`apps/portfolio/src/app/experience/experience.component.html`)
- **Collapsed View** (`.card-collapsed`):
  - City name and date range (FROM - TO)
  - Country mini-card with:
    - Country name (uppercase)
    - Flag placeholder with country code
    - Mini-map with positioned marker
- **Expanded View** (`.card-expanded`):
  - Role title and full period
  - Description text
  - Close button (×)
- Added focus overlay (`.focus-overlay`) for backdrop blur
- Full ARIA support: `aria-expanded`, `aria-controls`, `aria-haspopup`, `role="button"`

### 4. Styling (`apps/portfolio/src/app/experience/experience.component.scss`)
- **Collapsed Cards**:
  - Minimal design showing only essential info
  - Country card with grid layout for flag + mini-map
  - Smooth transitions for all states
- **Expanded Cards**:
  - Modal-like overlay positioned fixed/absolute
  - Higher z-index with backdrop blur overlay
  - Transform animations for smooth entrance
  - Fully accessible with focus states
- **Responsive Design**:
  - Desktop: Cards alternate sides of timeline
  - Mobile: All cards stack on left with vertical timeline
  - Expanded cards become full-screen modals on small screens
- **Current Position Styling**:
  - Green border and marker for current role
  - Enhanced shadows and indicators

### 5. Translations (All i18n files: en, de, fr, it)
- Added for each experience:
  - `COUNTRY`: Full country name
  - `FROM`: Start date in localized format
  - `TO`: End date or "Present" equivalent
- Added `EXPERIENCE.CLOSE`: Label for close button

## Fixed Issues

### TypeScript Compilation Error
**Problem**: `@HostListener('document:keydown.escape', ['$event'])` was receiving generic `Event` type instead of `KeyboardEvent`.

**Solution**: Removed unused event parameter since we don't need to call `preventDefault()` for escape key handling:
```typescript
@HostListener('document:keydown.escape')
handleEscape(): void {
  if (this.expandedCardIndex !== null) {
    this.collapse();
  }
}
```

### SCSS Responsive Issues
**Problem**: Obsolete `.content` selector in mobile breakpoint that doesn't exist in new markup.

**Solution**: 
- Removed `.content` selector
- Added proper `.card-collapsed` mobile styles
- Fixed timeline dot positioning for mobile view
- Added proper stacking for left/right cards on mobile

## Verification

### Build Status
✅ TypeScript compilation: **SUCCESS**
✅ ESLint: **PASSED** (all files)
✅ Dev server: **RUNNING** on default port

### Features Implemented
✅ Collapsed cards show only city, dates, and country mini-card
✅ Hover expansion (desktop only, using hover media query)
✅ Focus expansion (keyboard navigation)
✅ Click/tap to toggle expansion
✅ Backdrop blur when card expanded
✅ Escape key closes expanded card
✅ Close button (×) in expanded view
✅ Mini-map with marker showing location
✅ Country flag placeholder with code
✅ Full ARIA accessibility support
✅ Responsive design (desktop/tablet/mobile)
✅ Current position highlighted in green
✅ Smooth animations and transitions
✅ Multi-language support (EN, DE, FR, IT)

## User Experience Flow

1. **Default State**: Timeline shows compact cards with city, dates, and country info
2. **On Hover (Desktop)**: Card content expands inline, background blurs
3. **On Focus (Keyboard)**: Same expansion behavior for accessibility
4. **On Click/Tap**: Toggle expansion on touch devices
5. **Expanded State**: 
   - Full details (role, description) shown
   - Background overlay blurs rest of page
   - Close button available
   - Escape key or clicking overlay closes
6. **On Leave/Blur**: Card collapses back to compact view

## Testing Recommendations

1. Test hover behavior on desktop browsers
2. Test tap/click behavior on mobile devices
3. Test keyboard navigation (Tab, Enter, Space, Escape)
4. Test screen reader announcements (ARIA labels)
5. Test language switching with all 4 languages
6. Test responsive breakpoints (desktop → tablet → mobile)
7. Verify animations are smooth across different browsers
8. Check backdrop blur support (may need fallback for older browsers)

## Browser Support Notes

- `backdrop-filter: blur()` is used for the overlay effect
- This is supported in modern browsers but may need fallback for older ones
- Consider adding `@supports` check if targeting older browsers

