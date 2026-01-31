# Mobile and Desktop Class Separation Refactoring

## Problem
Previously, the mobile expanded cards used `!important` overrides everywhere to fight against desktop styles. This was messy, hard to maintain, and caused issues with content being cut off or faded.

## Solution
Implemented a clean separation between mobile and desktop expanded card classes:

### 1. Component Changes (`experience.component.ts`)
- Added `isMobileView` getter that checks if viewport width is ≤ 768px
- This dynamically determines which class to apply

### 2. HTML Changes (`experience.component.html`)
- Added conditional classes:
  - `expanded-mobile`: Applied when card is expanded AND viewport is mobile
  - `expanded-desktop`: Applied when card is expanded AND viewport is desktop
- Both coexist with the base `expanded` class for backward compatibility

```html
[class.expanded]="isExpanded(i)"
[class.expanded-mobile]="isExpanded(i) && isMobileView"
[class.expanded-desktop]="isExpanded(i) && !isMobileView"
```

### 3. CSS Refactoring

#### Desktop (`_card-expanded.scss`)
- Base `.card-expanded` styles define the foundation (hidden by default)
- `.timeline-item.expanded-desktop .card-expanded` activates the card on desktop
- No conflicts with mobile styles
- Clean hover animations and transitions

#### Mobile (`_card-expanded-mobile.scss`)
- **NO `!important` overrides** - completely separate rule sets
- Two breakpoints:
  - **md (tablets)**: 86dvw width, 80dvh max-height
  - **sm (phones)**: 90dvw width, 85dvh max-height
- Each uses `.timeline-item.expanded-mobile .card-expanded` selector
- Complete control over:
  - Positioning: `position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%)`
  - Sizing: Uses `min-height`, `max-height`, and `height: auto`
  - Layout: Centered text, stacked layout, optimized spacing
  - Scrolling: `overflow-y: auto` with smooth scrolling behavior

## Benefits

### 1. **No More Specificity Wars**
- Each breakpoint has its own clear rule set
- No `!important` flags needed
- Easier to debug and maintain

### 2. **Better Performance**
- Browser only applies relevant styles based on class
- No unnecessary style recalculations

### 3. **Cleaner Code**
- Separation of concerns
- Each file handles its own breakpoint logic
- Easy to understand which styles apply when

### 4. **Fixes Content Issues**
- Proper centering prevents header cutoff
- `height: auto` with min/max prevents content fade
- Adequate padding ensures all content is visible
- Proper overflow handling enables scrolling

## How It Works

1. **Page loads**: Component checks viewport width via `isMobileView` getter
2. **User clicks/hovers card**: Component sets `expandedCardIndex`
3. **Angular applies classes**:
   - Desktop (>768px): `.expanded` + `.expanded-desktop`
   - Mobile (≤768px): `.expanded` + `.expanded-mobile`
4. **CSS renders**:
   - Desktop: Uses hover-optimized styles from `_card-expanded.scss`
   - Mobile: Uses touch-optimized styles from `_card-expanded-mobile.scss`

## Testing
- Desktop: Hover cards expand with smooth animation
- Tablet (md): Tap cards expand to 86dvw centered overlay
- Phone (sm): Tap cards expand to 90dvw centered overlay
- All content visible, no cutoff, proper scrolling

## Future Improvements
- Could add window resize listener to update `isMobileView` dynamically
- Could use Angular CDK BreakpointObserver for more robust breakpoint detection
- Could add preference for reduced motion

