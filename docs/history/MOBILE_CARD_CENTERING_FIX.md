# Mobile Expanded Card Centering Fix

## Problem Identified

The mobile expanded cards were NOT properly centered, especially **right-side cards which appeared too far to the right** due to **parent positioning inheritance** and **transform context issues**.

### Root Causes:

1. **Multiple transform declarations** in different files:
   - `_timeline-item.scss` line 124: `transform: translate(-50%, -50%) translateY(0);`
   - `_responsive.scss` line 202: `transform: translate(-50%, -50%) translateY(0);` (removed)
   - `_card-expanded-mobile.scss`: Various transform attempts

2. **CSS Specificity Issue**: The selector `.timeline-item.expanded .card-expanded` is more specific than just `.card-expanded`, causing the mobile styles to be overridden.

3. **Extra translateY(0)**: The timeline-item and responsive files were adding `translateY(0)` which was preventing proper centering.

4. **CRITICAL: Parent positioning inheritance**: Right-side timeline items have `left: 50%` set in `_responsive.scss` line 121. Even though child elements with `position: fixed` should be independent, the **transform context** created by parent positioning was causing right-side cards to appear offset to the right.

5. **Transform centering limitation**: Using `transform: translate(-50%, -50%)` for centering doesn't fully isolate from parent transform contexts in all browsers.

## Solution Applied

### Final Solution: INSET + MARGIN AUTO Method

Instead of using `left: 50%` + `top: 50%` + `transform: translate(-50%, -50%)`, we now use:

```scss
position: fixed !important;
inset: 0 !important;        // Sets top, right, bottom, left all to 0
margin: auto !important;    // Centers the element perfectly
transform: none !important; // Remove all transforms
width: 86vw !important;     // Explicit width
height: fit-content !important;
max-height: 80vh !important;
```

### Why This Works:

1. **`inset: 0`** sets all four positioning properties (top, right, bottom, left) to 0
2. **`margin: auto`** with explicit width/height and inset: 0 creates **perfect centering**
3. **`transform: none`** removes ALL transform contexts, preventing parent interference
4. **Completely independent** of parent positioning - works for both left and right cards

### Files Modified:

#### 1. `_card-expanded-mobile.scss`:
- Applied inset + margin auto method for both md and sm breakpoints
- Specific selectors for left and right cards:
  ```scss
  .timeline-item.left.expanded .card-expanded,
  .timeline-item.right.expanded .card-expanded {
      position: fixed !important;
      inset: 0 !important;
      margin: auto !important;
      transform: none !important;
      width: 86vw !important; // md: 86vw, sm: 90vw
      height: fit-content !important;
      max-height: 80vh !important; // md: 80vh, sm: 85vh
  }
  ```

#### 2. `_timeline-item.scss`:
- Added mobile-specific overrides at the end of file
- Uses same inset + margin auto approach
- Ensures centering even when applied from timeline-item level

#### 3. `_responsive.scss`:
- Removed the conflicting `&.expanded .card-expanded` transform rule

## Result

Now on mobile:
- ✅ Expanded cards are **perfectly centered** both horizontally and vertically
- ✅ **Left-side cards** and **right-side cards** BOTH center identically
- ✅ Parent positioning (left: 0 or left: 50%) has ZERO effect
- ✅ No transform context issues
- ✅ Works on both medium mobile (md) and small mobile (sm) breakpoints
- ✅ Browser-independent solution (inset + margin auto is well-supported)

## Technical Details

**Positioning Method:**
- **Old method**: `left: 50%` + `transform: translateX(-50%)` ❌ (affected by parent)
- **New method**: `inset: 0` + `margin: auto` ✅ (completely independent)

**Sizing:**
- Medium mobile (md): `86vw` width, `80vh` max-height
- Small mobile (sm): `90vw` width, `85vh` max-height
- Height: `fit-content` with max-height constraint

**Specificity Chain:**
```scss
.timeline-item.left.expanded .card-expanded  // Left-side cards
.timeline-item.right.expanded .card-expanded // Right-side cards
```

**Browser Support:**
- `inset` is supported in all modern browsers (Chrome 87+, Firefox 66+, Safari 14.1+)
- Perfect fallback with explicit top/right/bottom/left if needed
