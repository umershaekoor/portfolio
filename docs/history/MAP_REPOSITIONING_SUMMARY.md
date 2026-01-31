# Timeline Card Map Repositioning

## Changes Applied

### Summary
- ✅ Moved map from bottom of expanded card to top right corner
- ✅ Reduced map size from 120x120px to 60x60px
- ✅ Fixed left-side card text alignment
- ✅ Removed map from collapsed cards (keeping only country name and flag)

## 1. Left-Side Card Alignment Fix

**File**: `apps/portfolio/src/app/experience/experience.component.scss`

Added proper alignment for left-side cards:
```scss
&.left {
    .card-collapsed {
        flex-direction: row-reverse;  // Reverses the order for right alignment
    }

    .location-summary {
        align-items: flex-end;
        text-align: right;
    }
}

&.right {
    .location-summary {
        align-items: flex-start;
        text-align: left;
    }
}
```

**Result**: Text in left-side cards now properly aligns to the right, matching the timeline layout.

## 2. Map Repositioned to Top Right

**File**: `apps/portfolio/src/app/experience/experience.component.html`

Restructured the card header:
```html
<div class="card-header">
    <div class="card-title">
        <h3>Role</h3>
        <p class="location">City · Period</p>
    </div>
    <div class="header-actions">
        <div class="location-map">
            <!-- Map SVG here -->
        </div>
        <button class="close-btn">×</button>
    </div>
</div>
```

**Layout**:
- Left side: Title and location info
- Right side: Map + Close button in a row

## 3. Map Size Reduced

**File**: `apps/portfolio/src/app/experience/experience.component.scss`

Map dimensions changed:
- **Before**: 120x120px
- **After**: 60x60px

Marker size adjusted:
- **Before**: 12px
- **After**: 8px

```scss
.map-container {
    width: 60px;
    height: 60px;
    // ...
    
    .marker {
        width: 8px;
        height: 8px;
        // ...
    }
}
```

## 4. Collapsed Card Simplified

**File**: `apps/portfolio/src/app/experience/experience.component.html`

Removed map from collapsed cards:
```html
<!-- Before -->
<div class="country-card">
    <span class="country-name">Germany</span>
    <span class="country-flag">DE</span>
    <span class="mini-map"><!-- SVG map --></span>
</div>

<!-- After -->
<div class="country-card">
    <span class="country-name">Germany</span>
    <span class="country-flag">DE</span>
</div>
```

**File**: `apps/portfolio/src/app/experience/experience.component.scss`

Updated country-card layout:
```scss
.country-card {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xs);
    // Simpler, vertical layout with just name + flag
}
```

## Visual Layout

### Collapsed Card (Default State)
```
┌─────────────────────────┐
│ City Name               │
│ From — To               │
│                         │
│ COUNTRY        [DE]     │
└─────────────────────────┘
```

### Expanded Card (On Hover)
```
┌─────────────────────────────────────────┐
│ Role Title              [Map] [×]       │
│ City · Period           60x60           │
│                         Germany         │
│                                         │
│ Description text here...                │
│                                         │
└─────────────────────────────────────────┘
```

## CSS Structure

### Header Actions Group
```scss
.header-actions {
    display: flex;
    align-items: flex-start;
    gap: var(--spacing-md);
}
```

This groups the map and close button together in the top right.

### Map Styling
- Compact 60x60px container
- Smaller 8px marker with pulsing animation
- Font size reduced to `--font-size-xs` for label
- Vertical layout (map above label)

## Benefits

1. **Better Space Usage**: Map doesn't take up valuable description area
2. **Cleaner Collapsed State**: Only essential info shown (city, dates, country)
3. **Logical Grouping**: Map and close button together in top right
4. **Consistent Alignment**: Left cards properly right-aligned, right cards left-aligned
5. **Improved Readability**: Larger area for description text

## Build Status

✅ TypeScript compilation: **SUCCESS**
✅ ESLint: **PASSED**
✅ Build size: 2.03 MB
✅ No errors or warnings

## Testing Checklist

- [ ] Desktop: Hover over card and verify map appears in top right
- [ ] Check map is 60x60px (smaller than before)
- [ ] Verify close button is next to map
- [ ] Check left-side cards have right-aligned text
- [ ] Check right-side cards have left-aligned text
- [ ] Verify collapsed cards show only country name + flag (no map)
- [ ] Test marker animation still works
- [ ] Check current position (Bern) has green marker
- [ ] Test on mobile - verify responsive layout
- [ ] Keyboard: Tab through elements in correct order

