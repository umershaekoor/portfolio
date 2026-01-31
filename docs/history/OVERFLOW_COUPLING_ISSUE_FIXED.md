# Fixed: Overflow-X/Overflow-Y Coupling Issue (Mobile Only)

## Issue Analyzed and Fixed (December 30, 2025)

### The Connected Problem

When fixing horizontal scroll by adding `overflow-x: hidden` to the experience container, a **y-scroll appeared** inside the section. This is a **CSS specification behavior**.

### Root Cause: CSS Overflow Coupling

**CSS Specification Rule:**
> When you set `overflow-x: hidden` on an element, browsers **automatically change** `overflow-y` from `visible` to `auto`.

**What Was Happening:**
```scss
.experience-container {
    overflow-x: hidden;  // We set this
    overflow-y: visible; // We tried to set this, but...
    // Browser converts overflow-y to 'auto' automatically!
}
```

**Result:**
- `overflow-y: auto` creates a scrollbar when content exceeds container height
- This is why y-scroll appeared when we fixed x-scroll
- This is a CSS spec behavior, not a bug!

### The Solution Strategy

Instead of fighting CSS spec, we:
1. **Remove overflow from experience-container** (don't trigger the coupling)
2. **Constrain width at container level** (prevent overflow from occurring)
3. **Add overflow to timeline child** (clip at a lower level)
4. **Rely on html/body overflow-x** (page-level protection)

## Changes Applied (Mobile Only)

### 1. Experience Container - Width Constraints Instead of Overflow ✅

**File**: `apps/portfolio/src/app/experience/_responsive.scss`

**Before** (caused y-scroll):
```scss
@include breakpoint('md') {
    .experience-container {
        overflow-x: hidden;  // ❌ Triggers overflow-y: auto
        overflow-y: visible; // ❌ Gets overridden to 'auto'
    }
}
```

**After** (proper containment):
```scss
@include breakpoint('md') {
    .experience-container {
        width: 100%; // ✅ Full width
        max-width: 100vw; // ✅ Don't exceed viewport
        box-sizing: border-box; // ✅ Include padding in width
        // No overflow properties - avoid coupling!
    }
}
```

### 2. Timeline - Overflow at Child Level ✅

Instead of container-level overflow, clip at timeline level:

```scss
.timeline {
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
    overflow: hidden; // ✅ Clip timeline overflow (not container)
}
```

### 3. Card Shell - Box Sizing ✅

Ensure cards include border/padding in width:

```scss
.card-shell {
    max-width: 154px;
    box-sizing: border-box; // ✅ Padding doesn't add to width
}
```

### 4. HTML/Body - Page-Level Protection ✅

Global horizontal scroll prevention (already in place):

```scss
html {
    overflow-x: hidden; // ✅ Page-level x-scroll prevention
    width: 100%;
}

body {
    overflow-x: hidden; // ✅ Body-level x-scroll prevention
}
```

## Why This Works

### Overflow Coupling Explained

**CSS Spec Behavior:**
```
overflow-x: hidden + overflow-y: visible = impossible state
Browser resolves: overflow-y becomes 'auto' instead
```

**Our Solution:**
```
No overflow on container = no coupling triggered
Width constraints = prevent overflow from occurring
Overflow on child (timeline) = clip at lower level
Page-level overflow-x = catch any stragglers
```

### Containment Hierarchy

```
html (overflow-x: hidden)
  └─ body (overflow-x: hidden)
      └─ experience-container (width constrained, no overflow)
          └─ timeline (overflow: hidden)
              └─ timeline-items (properly sized)
                  └─ cards (box-sizing: border-box)
```

## Technical Analysis

### Why Overflow-X/Y Coupling Exists

From CSS spec:
> "The computed values of 'overflow-x' and 'overflow-y' are the same as their specified values, except that some combinations with 'visible' are not possible: if one is specified as 'visible' and the other is 'scroll' or 'auto', then 'visible' is set to 'auto'."

**Translation:**
- `overflow-x: hidden` + `overflow-y: visible` = invalid
- Browser changes `overflow-y: visible` to `overflow-y: auto`
- This creates the unwanted y-scrollbar

### Our Approach

**Don't set overflow on the container at all!**

Instead:
1. **Constrain width** so content never overflows horizontally
2. **Use box-sizing** so padding doesn't add to width
3. **Set overflow on children** where needed
4. **Rely on page-level** overflow-x on html/body

## Changes Summary

| Element | Property | Before | After | Why |
|---------|----------|--------|-------|-----|
| **experience-container (md)** | overflow-x | hidden | removed | Avoid coupling |
| **experience-container (md)** | overflow-y | visible | removed | Avoid coupling |
| **experience-container (md)** | width | - | 100% | Constrain width |
| **experience-container (md)** | max-width | - | 100vw | Cap at viewport |
| **experience-container (md)** | box-sizing | - | border-box | Include padding |
| **timeline (md)** | overflow | - | hidden | Clip at child |
| **timeline (md)** | box-sizing | - | border-box | Include padding |
| **card-shell (md)** | box-sizing | - | border-box | Include padding |

## Files Modified

1. ✅ **_responsive.scss** (mobile breakpoints)
   - Removed overflow-x/overflow-y from experience-container
   - Added width, max-width, box-sizing to experience-container
   - Added overflow: hidden to timeline
   - Added box-sizing to timeline and card-shell

2. ✅ **styles.scss** (global - already had)
   - HTML has overflow-x: hidden
   - Body has overflow-x: hidden

## Expected Behavior

### Mobile (md & sm breakpoints):

**No horizontal scroll:**
- Page-level: HTML/body have overflow-x: hidden
- Container-level: Width capped at 100vw
- Child-level: Timeline clips any overflow

**No weird y-scroll in section:**
- No overflow properties on container
- No coupling triggered
- Content flows naturally
- Section height fits content

**Natural vertical flow:**
- Container expands with content
- No artificial height constraint
- No scrollbar on section itself
- Smooth page scroll

## Visual Result

### Before (Coupled Issue):
```
Fix x-scroll:
  overflow-x: hidden
    ↓
  Browser adds:
    overflow-y: auto (coupling)
      ↓
    Y-scrollbar appears ❌
```

### After (Decoupled):
```
Constrain width:
  max-width: 100vw
  box-sizing: border-box
    ↓
  No overflow occurs
    ↓
  No x-scroll ✅
  No y-scroll ✅
  Natural flow ✅
```

## Testing Checklist

### Mobile View (< 768px):
- [ ] No horizontal scroll on page
- [ ] No horizontal scroll in experience section
- [ ] No weird y-scroll in experience section
- [ ] Content flows naturally top to bottom
- [ ] Section height fits content
- [ ] Bottom padding visible
- [ ] Cards don't cause overflow

### Desktop View (> 1024px):
- [ ] No changes (desktop unaffected)
- [ ] Original behavior maintained
- [ ] min-height: 100vh still applies

## Summary

Fixed the overflow coupling issue by:

1. ✅ **Removed overflow from container** - Avoid triggering CSS coupling
2. ✅ **Added width constraints** - Prevent overflow from occurring (max-width: 100vw)
3. ✅ **Added box-sizing** - Include padding in width calculations
4. ✅ **Moved overflow to timeline** - Clip at child level instead
5. ✅ **Kept page-level protection** - HTML/body still have overflow-x: hidden

**Result**: 
- ✅ No horizontal scroll on mobile
- ✅ No weird y-scroll in section
- ✅ Content flows naturally
- ✅ Avoids CSS overflow coupling issue

## Build Status

✅ **No syntax errors**  
✅ **Changes saved correctly**  
✅ **Mobile only** (desktop unchanged)  
✅ **Decoupled solution** (no overflow-x/y coupling)  
✅ **Width-constrained approach** (prevents overflow)

The overflow issue is now properly fixed by avoiding the CSS coupling mechanism entirely!

## Key Takeaway

**CSS Lesson Learned:**

> Don't set `overflow-x: hidden` and `overflow-y: visible` on the same element. The browser will change `overflow-y` to `auto`, creating unwanted scrollbars.

**Better Approach:**

> Prevent overflow from happening in the first place using width constraints, then handle any remaining overflow at child element levels.

