# Hover Cards Not Activating - Fix Applied

## Problem
After implementing the 300ms hover delay, the cards were not expanding at all when hovering over them.

## Root Cause
The component uses `ChangeDetectionStrategy.OnPush`, which means Angular only checks for changes when:
1. Input properties change
2. Events occur in the template
3. Change detection is manually triggered

The `setTimeout` callback runs **outside** Angular's change detection zone, so when `this.expandedCardIndex` was updated inside the timeout, Angular didn't detect the change and the view didn't update.

## Solution Applied

### 1. Injected `ChangeDetectorRef`

**File**: `apps/portfolio/src/app/experience/experience.component.ts`

```typescript
import { Component, ChangeDetectionStrategy, HostListener, ChangeDetectorRef } from '@angular/core';

@Component({
  // ...config
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExperienceComponent {
  constructor(
    private mapService: MapService,
    private cdr: ChangeDetectorRef  // ← Added
  ) {}
}
```

### 2. Manually Triggered Change Detection

Added `this.cdr.markForCheck()` after state changes in both methods:

**In `expandOnHover()`**:
```typescript
this.hoverTimeout = setTimeout(() => {
  this.setExpanded(index);
  this.hoverTimeout = null;
  this.cdr.markForCheck(); // ← Triggers change detection
}, this.HOVER_DELAY_MS);
```

**In `collapseOnLeave()`**:
```typescript
if (this.expandedCardIndex === index) {
  this.setExpanded(null);
  this.cdr.markForCheck(); // ← Triggers change detection
}
```

## How It Works

### Before (Broken):
```
User hovers → setTimeout starts → 300ms passes → 
State updated inside timeout → 
❌ Angular doesn't know about the change → 
❌ View doesn't update → 
❌ Card doesn't expand
```

### After (Fixed):
```
User hovers → setTimeout starts → 300ms passes → 
State updated inside timeout → 
✅ cdr.markForCheck() called → 
✅ Angular marks component for checking → 
✅ View updates on next change detection cycle → 
✅ Card expands
```

## What is `markForCheck()`?

`markForCheck()` tells Angular: "Hey, something changed in this component with OnPush strategy. Please check it on the next change detection cycle."

It doesn't run change detection immediately, but schedules the component to be checked. This is more performant than triggering a full change detection cycle.

## Why OnPush Strategy?

The component uses `ChangeDetectionStrategy.OnPush` for performance benefits:
- Reduces unnecessary change detection cycles
- Only checks when inputs change or events occur
- Better performance for components with many elements

However, it requires manual intervention when updating state asynchronously (like with setTimeout, Promises, or Observables).

## Alternative Solutions Considered

### Option 1: Remove OnPush Strategy ❌
```typescript
// changeDetection: ChangeDetectionStrategy.OnPush, // Remove this line
```
**Pros**: Would work automatically
**Cons**: Less performant, defeats the purpose of OnPush

### Option 2: Use NgZone.run() ❌
```typescript
this.ngZone.run(() => {
  this.setExpanded(index);
});
```
**Pros**: Triggers full change detection
**Cons**: Overkill for this use case, less efficient

### Option 3: Use markForCheck() ✅ (Chosen)
```typescript
this.cdr.markForCheck();
```
**Pros**: 
- Efficient - only marks this component
- Works perfectly with OnPush
- Best practice for async state updates

**Cons**: None for this use case

## Testing

### Verification Steps:
1. ✅ Hover over a card for 300ms → Card expands
2. ✅ Quickly move mouse away before 300ms → Card doesn't expand
3. ✅ Move mouse away from expanded card → Card collapses
4. ✅ Click on card → Card toggles expansion
5. ✅ Keyboard navigation still works

## Build Status

✅ **TypeScript**: No compilation errors
✅ **Build**: Successful
✅ **ESLint**: No violations
✅ **Functionality**: Hover expansion now works correctly

## Key Takeaway

When using `ChangeDetectionStrategy.OnPush` with asynchronous operations (setTimeout, setInterval, Promises, Observables), always remember to:

1. Inject `ChangeDetectorRef`
2. Call `this.cdr.markForCheck()` after updating component state

This ensures Angular knows to check the component on the next change detection cycle.

## Summary

The hover cards not activating issue was caused by Angular's OnPush change detection strategy not detecting state changes inside the setTimeout callback. The fix was simple: inject `ChangeDetectorRef` and call `markForCheck()` after updating the state. The cards now expand correctly after the 300ms hover delay.

