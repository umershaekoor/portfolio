# Dynamic Title & Custom Icon Implementation

## Overview
Implemented a custom "US" icon for the browser tab and dynamic title switching between "voncode" and "Umer Shakoor" every 5 seconds.

## Changes Made

### 1. Custom Icon Creation
**File**: `apps/portfolio/public/us-icon.svg`

Created a custom SVG icon featuring:
- Circular design with gradient background (primary red #e94560 to dark blue #0f3460)
- Bold white "US" text centered in the circle
- 32x32 pixel dimensions for optimal browser tab display
- Stroke outline for better visibility

**SVG Features:**
```xml
- Gradient fill from primary to accent colors
- Professional, clean design
- Scalable vector format
- Matches portfolio color scheme
```

### 2. Favicon Update
**File**: `apps/portfolio/src/index.html`

**Changes:**
- Updated favicon link to use the custom SVG icon
- Changed from `favicon.ico` to `us-icon.svg`
- Updated `type` attribute to `image/svg+xml`
- Set initial page title to "Umer Shakoor"

**Before:**
```html
<link rel="icon" type="image/x-icon" href="favicon.ico" />
<title>portfolio</title>
```

**After:**
```html
<link rel="icon" type="image/svg+xml" href="us-icon.svg" />
<title>Umer Shakoor</title>
```

### 3. Dynamic Title Switching
**File**: `apps/portfolio/src/app/app.ts`

**New Features:**
- Implemented `OnDestroy` lifecycle hook for cleanup
- Added title rotation logic with 5-second intervals
- Alternates between "voncode" and "Umer Shakoor"

**Key Components:**
```typescript
- titleInterval: Stores the interval reference for cleanup
- titles: Array containing ['voncode', 'Umer Shakoor']
- currentTitleIndex: Tracks which title to display
- startTitleRotation(): Initializes and manages title switching
- ngOnDestroy(): Cleans up interval to prevent memory leaks
```

**Implementation Details:**
1. Title starts with "voncode" (index 0)
2. After 5 seconds, switches to "Umer Shakoor"
3. After another 5 seconds, switches back to "voncode"
4. Cycle continues indefinitely
5. Interval is properly cleaned up when component is destroyed

## Technical Details

### Title Rotation Logic
```typescript
private startTitleRotation() {
  // Set initial title
  document.title = this.titles[this.currentTitleIndex];
  
  // Switch every 5 seconds
  this.titleInterval = window.setInterval(() => {
    this.currentTitleIndex = (this.currentTitleIndex + 1) % this.titles.length;
    document.title = this.titles[this.currentTitleIndex];
  }, 5000);
}
```

### Memory Management
The implementation includes proper cleanup to prevent memory leaks:
```typescript
ngOnDestroy() {
  if (this.titleInterval) {
    clearInterval(this.titleInterval);
  }
}
```

## Browser Compatibility

### Icon Support
- ✅ Modern browsers: Full SVG support
- ✅ Chrome, Firefox, Safari, Edge: Native SVG favicon support
- ℹ️ Older browsers: May fall back to default icon (graceful degradation)

### Title Switching
- ✅ All browsers: Full support for dynamic `document.title` changes
- ✅ Works in all modern and legacy browsers

## Benefits

### Branding
- **Professional Identity**: Custom "US" icon reinforces personal brand
- **Visual Consistency**: Icon colors match portfolio theme
- **Memorability**: Unique icon stands out in browser tabs

### User Experience
- **Dynamic Engagement**: Rotating title catches user attention
- **Dual Branding**: Shows both personal name and brand name
- **Professional Touch**: Demonstrates attention to detail

### Technical Quality
- **Scalable**: SVG format works at any size
- **Performance**: Minimal overhead, efficient implementation
- **Clean Code**: Proper lifecycle management and memory cleanup

## Testing Recommendations

1. **Icon Display**: Verify icon appears correctly in browser tab
2. **Title Rotation**: Confirm titles switch every 5 seconds
3. **Tab Switching**: Ensure rotation continues when tab is inactive
4. **Browser Testing**: Test across Chrome, Firefox, Safari, Edge
5. **Mobile Testing**: Check icon appearance on mobile browsers

## Future Enhancements (Optional)

1. **Pause on Tab Focus**: Stop rotation when user is viewing the page
2. **Context-Aware Titles**: Show section name in title (e.g., "Umer Shakoor - Experience")
3. **Icon Variants**: Different icons for different sections
4. **Animation**: Smooth fade transitions between titles
5. **Multiple Titles**: Add more variations to the rotation

## Files Modified

1. ✅ `apps/portfolio/public/us-icon.svg` - Created custom icon
2. ✅ `apps/portfolio/src/index.html` - Updated favicon and initial title
3. ✅ `apps/portfolio/src/app/app.ts` - Implemented title rotation logic

## Color Scheme

The icon uses the portfolio's color palette:
- Primary Red: `#e94560`
- Accent Blue: `#0f3460`
- Text: White (`#ffffff`)

This ensures visual consistency across the entire application.

