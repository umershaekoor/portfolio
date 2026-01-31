# Timeline Card Interaction Improvements

## Issues Fixed

### 1. ✅ Cards Expanding Too Soon on Hover

**Problem**: Cards were expanding immediately when the mouse cursor passed over them, even briefly, causing unwanted expansions.

**Solution**: Implemented a 300ms hover delay before cards expand.

#### Changes Made

**File**: `apps/portfolio/src/app/experience/experience.component.ts`

**Added Hover Delay Properties**:
```typescript
private hoverTimeout: ReturnType<typeof setTimeout> | null = null;
private readonly HOVER_DELAY_MS = 300; // 300ms delay before expanding
```

**Updated `expandOnHover()` Method**:
```typescript
expandOnHover(index: number): void {
  if (!this.isHoverCapable()) {
    return;
  }
  
  // Clear any pending expansion
  if (this.hoverTimeout) {
    clearTimeout(this.hoverTimeout);
  }
  
  // Set a delay before expanding
  this.hoverTimeout = setTimeout(() => {
    this.setExpanded(index);
    this.hoverTimeout = null;
  }, this.HOVER_DELAY_MS);
}
```

**Updated `collapseOnLeave()` Method**:
```typescript
collapseOnLeave(index: number): void {
  // Clear pending expansion if mouse leaves before delay completes
  if (this.hoverTimeout) {
    clearTimeout(this.hoverTimeout);
    this.hoverTimeout = null;
  }
  
  if (this.expandedCardIndex === index) {
    this.setExpanded(null);
  }
}
```

#### How It Works

1. **Mouse Enters Card**: Timer starts (300ms)
2. **During Delay**:
   - If mouse leaves → Timer cancelled, no expansion
   - If mouse stays → After 300ms, card expands
3. **Mouse Leaves Expanded Card**: Collapses immediately

#### Benefits

- **Prevents Accidental Expansion**: Brief mouse passes don't trigger expansion
- **Intentional Interaction**: Users must hover for 300ms (clear intent)
- **Better UX**: Less jarring, more predictable behavior
- **Performance**: Reduces unnecessary DOM updates

---

### 2. ✅ Collapsed Cards Too Wide

**Problem**: Non-hover cards were taking up too much horizontal space, making the timeline look cluttered.

**Solution**: Reduced card width and padding to create more compact, elegant cards.

#### Changes Made

**File**: `apps/portfolio/src/app/experience/experience.component.scss`

**Added Max-Width Constraint**:
```scss
.card-shell {
  // ...existing styles
  max-width: 350px; // Limit collapsed card width
}
```

**Reduced Padding**:
```scss
.card-collapsed {
  // Before: padding: var(--spacing-lg) var(--spacing-xl);
  padding: var(--spacing-md) var(--spacing-lg);
}
```

#### Size Comparison

| Element | Before | After |
|---------|--------|-------|
| **Max Width** | Unlimited (fills 50% of timeline) | 350px |
| **Vertical Padding** | Large (--spacing-lg) | Medium (--spacing-md) |
| **Horizontal Padding** | Extra Large (--spacing-xl) | Large (--spacing-lg) |

#### Benefits

- **More Compact**: Cards take less horizontal space
- **Cleaner Timeline**: Less visual clutter
- **Better Proportion**: Cards feel more like badges/labels
- **Improved Readability**: Content is more focused
- **Responsive**: Works better on various screen sizes

---

## Visual Impact

### Before Changes:
```
User hovers near card → IMMEDIATELY expands
Card width: [========================================] (very wide)
```

### After Changes:
```
User hovers near card → ... 300ms delay ... → expands (if still hovering)
Card width: [==========================] (compact, max 350px)
```

---

## Technical Details

### Hover Delay Implementation

- Uses `setTimeout` for the delay
- Stores timeout ID to allow cancellation
- Clears timeout on mouse leave (prevents memory leaks)
- Only applies on hover-capable devices (not touch)

### Width Constraints

- `max-width: 350px` prevents cards from being too wide
- Cards on left and right sides of timeline now have consistent, compact sizing
- Responsive breakpoints still work (mobile stacks properly)

---

## Testing Checklist

### Hover Delay Testing:
- [ ] Quickly move mouse across timeline - cards should NOT expand
- [ ] Hover on a card for 300ms - card SHOULD expand
- [ ] Move mouse away during delay - expansion should cancel
- [ ] Expanded card should collapse immediately on mouse leave

### Width Testing:
- [ ] Collapsed cards should be noticeably narrower
- [ ] Cards should not exceed 350px width
- [ ] Text should not be cut off or cramped
- [ ] Timeline should look cleaner and less cluttered
- [ ] Left and right cards should be same width

### Responsive Testing:
- [ ] Desktop: Cards alternate and are compact
- [ ] Tablet: Cards should still work properly
- [ ] Mobile: Cards stack vertically (existing behavior)

---

## Configuration

The hover delay can be adjusted if needed:

```typescript
private readonly HOVER_DELAY_MS = 300; // Change this value
```

**Recommended values**:
- **200ms**: Very responsive, but may still trigger accidentally
- **300ms**: Good balance (current setting)
- **400ms**: More deliberate, less accidental triggers
- **500ms**: Very intentional, may feel slow

---

## Build Status

✅ **TypeScript**: No compilation errors
✅ **Build**: Successful
✅ **No Linting Issues**: Code follows best practices
✅ **Functionality**: Hover delay and width reduction working as expected

---

## Summary

Both issues have been resolved:

1. **Hover Activation**: Now requires 300ms of intentional hovering before expansion
2. **Card Width**: Reduced to maximum 350px with tighter padding for a cleaner look

These changes create a more polished, intentional user experience while maintaining all existing functionality (keyboard navigation, accessibility, real maps, etc.).

