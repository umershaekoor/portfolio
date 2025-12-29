# Timeline Card Spacing and Size Fixes - MOBILE ONLY

## Changes Applied (December 29, 2025) - CORRECTED

### ⚠️ Important: Changes Apply ONLY to Mobile Screens

All width, padding, and spacing changes are now applied **ONLY in the mobile responsive breakpoint** (`@include breakpoint('md')`). Desktop styles remain unchanged.

### Issue 1: Card Width Reduced (Mobile Only) ✅
**Desktop**: `max-width: 220px` (unchanged)
**Mobile**: `max-width: 154px` (70% of desktop width)

**File**: `apps/portfolio/src/app/experience/_responsive.scss`
```scss
@include breakpoint('md') {
    .timeline-item {
        .card-shell {
            max-width: 154px; // 70% of desktop 220px
        }
    }
}
```

### Issue 2: Vertical Padding Added (Mobile Only) ✅
**Desktop**: `calc(var(--spacing-sm) + 5px)` (unchanged)
**Mobile**: `calc(var(--spacing-sm) + 8px)` (+3px padding)

**File**: `apps/portfolio/src/app/experience/_responsive.scss`
```scss
@include breakpoint('md') {
    .timeline-item {
        .card-collapsed {
            padding: calc(var(--spacing-sm) + 8px) var(--spacing-md);
        }
    }
}
```

### Issue 3: Spacing Between Cards Reduced (Mobile Only) ✅
**Desktop**: `padding: var(--spacing-xl) 0` (unchanged)
**Mobile**: `padding: var(--spacing-md) 0` (reduced spacing)

**File**: `apps/portfolio/src/app/experience/_responsive.scss`
```scss
@include breakpoint('md') {
    .timeline-item {
        padding: var(--spacing-md) 0;
    }
}
```

## Summary of Changes

| Property | Desktop | Mobile | Change |
|----------|---------|--------|--------|
| Card width | 220px (unchanged) | 154px | Mobile: 70% of desktop |
| Card vertical padding | 5px (unchanged) | 8px | Mobile: +3px |
| Timeline item spacing | var(--spacing-xl) (unchanged) | var(--spacing-md) | Mobile: reduced |

## Visual Impact

**Desktop (Unchanged)**:
```
┌──────────────────┐
│  Wide Card       │  ← 220px width
│  (normal)        │  ← 5px padding
└──────────────────┘
        ↓
   Normal gap (--spacing-xl)
        ↓
┌──────────────────┐
│  Next Card       │
└──────────────────┘
```

**Mobile (Changed)**:
```
┌────────────┐
│            │  ← +3px padding top
│ Narrower   │  ← 154px width (70%)
│ Card       │
│            │  ← +3px padding bottom
└────────────┘
     ↓
 Smaller gap (--spacing-md)
     ↓
┌────────────┐
│ Next Card  │
└────────────┘
```

## Files Modified

1. ✅ `_card-collapsed.scss` - **REVERTED to original desktop values (220px, 5px padding)**
2. ✅ `_timeline-item.scss` - **REVERTED to original desktop spacing (--spacing-xl)**
3. ✅ `_responsive.scss` - **ADDED mobile-specific overrides (154px, 8px padding, --spacing-md)**

## Build Instructions

To see these changes, run a fresh build without cache:

```bash
cd /home/h2o/projects/portfolio-site
npx nx reset  # Clear cache
npx nx build portfolio --configuration=development --skip-nx-cache
```

Or serve the app:
```bash
npx nx serve portfolio
```

## Verification Checklist

- [x] Desktop card width: 220px (unchanged)
- [x] Desktop padding: 5px (unchanged)
- [x] Desktop spacing: var(--spacing-xl) (unchanged)
- [x] Mobile card width: 154px (70% of desktop)
- [x] Mobile padding: 8px (+3px)
- [x] Mobile spacing: var(--spacing-md) (reduced)
- [x] Changes in responsive breakpoint only
- [x] No syntax errors

## How It Works

The responsive styles in `_responsive.scss` override the base desktop styles from `_card-collapsed.scss` and `_timeline-item.scss` **only on mobile screens**:

```scss
// Desktop base styles (unchanged)
.card-shell { max-width: 220px; }
.card-collapsed { padding: calc(var(--spacing-sm) + 5px) ... }
.timeline-item { padding: var(--spacing-xl) 0; }

// Mobile overrides (only apply on mobile)
@include breakpoint('md') {
    .timeline-item {
        padding: var(--spacing-md) 0;
        
        .card-shell { max-width: 154px; }
        .card-collapsed { padding: calc(var(--spacing-sm) + 8px) ... }
    }
}
```

The code changes are correctly applied: **desktop unchanged, mobile optimized**.



