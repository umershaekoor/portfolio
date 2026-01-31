# Mobile Timeline Redesign

## Changes Applied (December 29, 2025)

### Overview
Redesigned the experience timeline for mobile screens to improve readability and usability while maintaining the left/right card layout from desktop.

## Key Changes

### 1. ✅ Removed Timeline Dots on Mobile
**Before**: Cards had circular dots that were hard to see on small screens
**After**: Dots removed (`&::after { display: none; }`)
**Result**: Cleaner, simpler timeline with just the vertical line

### 2. ✅ Kept Left/Right Card Layout
**Before**: Previous mobile design centered all cards
**After**: Maintains desktop's alternating left/right pattern
**Benefits**:
- Consistent with desktop experience
- Better use of screen width
- Cards don't overlap the timeline

### 3. ✅ Maintained 50% Width Structure
Cards still take 50% of timeline width on mobile:
- **Left cards**: Right-aligned, positioned at 0%
- **Right cards**: Left-aligned, positioned at 50%
- **Timeline**: Vertical line stays centered

### 4. ✅ Removed Connector Lines
**Before**: Had horizontal connector lines from dots to cards
**After**: No connector lines on mobile (`&::before { display: none; }`)
**Result**: Cleaner visual with just vertical timeline

### 5. ✅ Updated Hint System
**Desktop**: "Hover for details" - shown at bottom right
**Mobile**: "Tap cards for details" - shown at top under title

Two separate hints with responsive display:
```scss
.hover-hint-desktop { display: flex; } // Desktop only
.hover-hint-mobile { display: none; }   // Hidden on desktop

// On mobile:
.hover-hint-desktop { display: none; }  // Hidden
.hover-hint-mobile { display: flex; }   // Shown at top
```

### 6. ✅ Reduced Font Sizes for Mobile
**Collapsed Cards**:
- City name: `var(--font-size-sm)` → `11px` (small screens)
- Dates: `var(--font-size-xs)` → `9px` (small screens)

**Expanded Cards**:
- Heading: `var(--font-size-lg)` → `var(--font-size-md)` (small)
- Description: `var(--font-size-sm)` → `12px` (small)
- Skill badges: `10px` → `9px` (small screens)

### 7. ✅ Adjusted Spacing
**Timeline Padding**:
- Desktop: `0 var(--spacing-md)` (with horizontal padding)
- Mobile: `0` (no horizontal padding)

**Card Padding**:
- Tablet (md): `var(--spacing-md) var(--spacing-sm)`
- Mobile (sm): `var(--spacing-md) var(--spacing-xs)`

**Left/Right Specific**:
- Left cards: `padding-right: var(--spacing-md)` (tablet) → `var(--spacing-sm)` (mobile)
- Right cards: `padding-left: var(--spacing-md)` (tablet) → `var(--spacing-sm)` (mobile)

### 8. ✅ Click to Expand (Already Implemented)
Cards expand on click/tap, not hover:
- Touch-friendly interaction
- Click handler already in template: `(click)="toggleExpansion(i)"`
- Works on both mobile and desktop

## Visual Layout

### Desktop:
```
Card ━━━━● Timeline ●━━━━ Card
    (left)     |      (right)
              ●
         Card (left)
```

### Mobile (New):
```
Card   | Timeline |   Card
(left) |    |     | (right)
       |    |     |
  Card |    |     |
(left) |    |     |
       |    |     | Card
       |    |     |(right)
```

**Key Points**:
- ✅ No dots
- ✅ Just vertical line in center
- ✅ Cards alternate left/right
- ✅ Cards are closer to timeline
- ✅ Better readability with reduced fonts

## Responsive Breakpoints

### Tablet (md breakpoint):
- Cards maintain left/right layout
- Font size: small but readable
- Padding: medium (`var(--spacing-sm)` to `var(--spacing-md)`)
- City: 11-12px
- Dates: 9-10px

### Mobile (sm breakpoint):
- Even more compact
- Font size: extra small
- Padding: minimal (`var(--spacing-xs)` to `var(--spacing-sm)`)
- City: 11px
- Dates: 9px

## Expanded Card Behavior

**Fixed Overlay**:
- Position: `fixed` (center of viewport)
- Transform: `translate(-50%, -50%)`
- Size: `min(92vw, 600px)` (tablet), `min(95vw, 500px)` (mobile)
- Max height: 80-85vh with scroll
- Backdrop blur on background

**Content Adjustments**:
- Header: Stacked vertically on mobile
- Map: Centered, max-width 200px
- Skills: Smaller badges with compact spacing
- Description: Smaller font, normal line height

## User Interaction

### Desktop:
1. Hover over card → Wait 300ms → Card expands
2. Move mouse away → Card collapses

### Mobile:
1. Tap card → Card expands immediately
2. Tap outside → Card collapses
3. Hint at top: "Tap cards for details"

## Files Modified

1. ✅ `apps/portfolio/src/app/experience/experience.component.scss`
   - Updated mobile responsive styles
   - Removed dots (`&::after { display: none; }`)
   - Removed connector lines (`&::before { display: none; }`)
   - Kept left/right 50% width layout
   - Reduced font sizes for mobile
   - Adjusted spacing and padding

2. ✅ `apps/portfolio/src/app/experience/experience.component.html`
   - Added separate mobile hint (`hover-hint-mobile`)
   - Kept desktop hint (`hover-hint-desktop`)
   - Different text: "Tap cards for details" vs "Hover for details"

## Benefits

### 1. **Cleaner Design**
- No dots cluttering the timeline
- Simple vertical line
- Focus on card content

### 2. **Better Readability**
- Reduced but readable font sizes
- Cards not squished or overlapping
- Clear left/right separation

### 3. **Consistent Layout**
- Same left/right pattern as desktop
- Natural flow alternating sides
- Professional appearance

### 4. **Touch-Friendly**
- Tap to expand (not hover)
- Clear instruction at top
- Cards sized appropriately

### 5. **Better Use of Space**
- 50% width per side maximizes screen use
- Cards don't waste space being centered
- Timeline stays in middle

## Build Status

✅ **TypeScript**: No compilation errors
✅ **Build**: Successful
✅ **SCSS**: Valid responsive styles
✅ **Mobile Layout**: Left/right preserved, dots removed
✅ **Interaction**: Click/tap works correctly

## Testing Checklist

### Mobile (< 768px):
- [ ] Timeline vertical line centered
- [ ] No dots visible
- [ ] No connector lines
- [ ] Cards alternate left/right
- [ ] Font sizes readable (11px city, 9px dates)
- [ ] "Tap cards for details" hint at top
- [ ] Tap card → expands to overlay
- [ ] Expanded card scrollable if needed
- [ ] Tap outside → collapses

### Tablet (768-1024px):
- [ ] Same layout as mobile but slightly larger fonts
- [ ] Cards still alternate left/right
- [ ] No dots or connectors
- [ ] Readable text

### Desktop (> 1024px):
- [ ] Dots visible
- [ ] Connector lines visible
- [ ] "Hover for details" at bottom right
- [ ] 300ms hover delay works
- [ ] Left/right cards with proper spacing

## Summary

Successfully redesigned the mobile timeline to:
1. ✅ **Remove dots** - Cleaner visual
2. ✅ **Keep left/right layout** - Consistent with desktop
3. ✅ **Remove connectors** - Simplified design
4. ✅ **Reduce font sizes** - Better fit on small screens
5. ✅ **Show mobile hint** - "Tap cards for details" at top
6. ✅ **Maintain click interaction** - Touch-friendly expansion

The mobile timeline now provides a clean, readable, and consistent experience across all screen sizes!

