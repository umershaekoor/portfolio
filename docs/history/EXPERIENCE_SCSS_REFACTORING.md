# Experience Component SCSS Refactoring

## Overview
Refactored the 800-line experience component SCSS file into 12 modular, maintainable partials organized by functionality.

## Changes Applied (December 29, 2025)

### Before
- **Single file**: `experience.component.scss` (799 lines)
- **Monolithic**: All styles in one large file
- **Hard to maintain**: Difficult to find and update specific sections
- **Poor organization**: Mixed desktop, mobile, animations, and special states

### After
- **12 modular files**: Organized by logical responsibility
- **Clear structure**: Each file has a single, well-defined purpose
- **Easy maintenance**: Find and update specific features quickly
- **Modern SASS**: Uses `@use` instead of deprecated `@import`

## File Structure

```
apps/portfolio/src/app/experience/
├── experience.component.scss (32 lines) - Main file, imports all modules
├── experience.component.scss.backup - Original file backup
├── _experience-base.scss (16 lines) - Container base styles
├── _experience-header.scss (17 lines) - Section header and title
├── _experience-hints.scss (47 lines) - Hover/tap hints (desktop & mobile)
├── _timeline-base.scss (28 lines) - Timeline structure and vertical line
├── _timeline-item.scss (128 lines) - Timeline items (left/right positioning, dots)
├── _card-collapsed.scss (46 lines) - Collapsed card styles
├── _card-expanded.scss (71 lines) - Expanded card overlay styles
├── _card-map.scss (55 lines) - Location map in expanded cards
├── _card-skills.scss (62 lines) - Skills badges in expanded cards
├── _current-position.scss (32 lines) - Current position (green theme)
├── _animations.scss (26 lines) - Keyframe animations
└── _responsive.scss (260 lines) - Mobile & tablet responsive styles
```

**Total**: 788 lines across 14 files (including main file and backup)

## Module Descriptions

### 1. **experience.component.scss** (Main Entry Point)
```scss
@use '../../styles/variables' as *;
@use '../../styles/mixins' as *;
@use '../../styles/animations' as *;

// Imports all modular partials
@use 'experience-base';
@use 'experience-header';
// ... etc
```

**Purpose**: Central import file that loads all modules in the correct order.

### 2. **_experience-base.scss**
**Responsibility**: Experience container base styles
**Contains**:
- Container padding and dimensions
- Background gradient
- `has-expanded` state for blur effect

### 3. **_experience-header.scss**
**Responsibility**: Section header and title
**Contains**:
- Header flex layout
- Title styling using mixins
- Centering and spacing

### 4. **_experience-hints.scss**
**Responsibility**: Hover/tap hint badges
**Contains**:
- Desktop hint (bottom right, "Hover for details")
- Mobile hint (top, "Tap cards for details")
- SVG icon styling
- Show/hide logic for responsive display

### 5. **_timeline-base.scss**
**Responsibility**: Timeline structure
**Contains**:
- Timeline container positioning
- Vertical line (center, blue)
- Focus overlay for expanded states

### 6. **_timeline-item.scss**
**Responsibility**: Individual timeline items
**Contains**:
- Left/right positioning (50% width each)
- Timeline dots (circles)
- Connector lines (horizontal)
- Expanded state transformations
- Focus visible styles

**Key Sections**:
- Base item structure
- Left-side items (`.left`)
- Right-side items (`.right`)
- Expanded state (`.expanded`)

### 7. **_card-collapsed.scss**
**Responsibility**: Collapsed card appearance
**Contains**:
- Card shell (border, background, shadow)
- Collapsed content layout
- Location summary (city, dates)
- Hover effects

### 8. **_card-expanded.scss**
**Responsibility**: Expanded card overlay
**Contains**:
- Fixed overlay positioning
- Card dimensions and max-height
- Scrollbar styling (webkit)
- Header layout
- Description styling

### 9. **_card-map.scss**
**Responsibility**: Location map component
**Contains**:
- Map container (60x60px)
- SVG country outline
- Animated marker dot
- Country label

**Features**:
- Pulsing marker animation
- Radial gradient glow effect
- Responsive sizing

### 10. **_card-skills.scss**
**Responsibility**: Skills badges section
**Contains**:
- Skills section layout (flex wrap)
- Skill badge styling
- Level indicators (dashes: full/half/empty)
- Hover effects on badges

**Skill Level System**:
- Full dash: `opacity: 1` (proficient)
- Half dash: `opacity: 0.6` (intermediate)
- Empty dash: `opacity: 0.2` (not reached)

### 11. **_current-position.scss**
**Responsibility**: Current position special styling
**Contains**:
- Green theme overrides
- Green connector line
- Green pulsing dot
- Green card border and shadow
- Green map marker

**Animation**: Pulses with `pulseGlow` keyframes

### 12. **_animations.scss**
**Responsibility**: Keyframe animations
**Contains**:
- `pulseGlow`: For current position dot
- `markerPulse`: For map marker breathing effect

### 13. **_responsive.scss**
**Responsibility**: Mobile and tablet responsive styles
**Contains**:
- Tablet breakpoint (`@include breakpoint('md')`)
- Mobile breakpoint (`@include breakpoint('sm')`)
- Mobile layout adjustments
- Font size reductions
- Spacing optimizations
- Hint visibility toggles
- Removed dots and connectors on mobile

**Key Mobile Changes**:
- No timeline dots
- No connector lines
- Kept left/right layout (50% width)
- Reduced font sizes
- Tighter spacing
- Mobile hint at top

## Benefits of Refactoring

### 1. **Maintainability**
- Find specific styles quickly by file name
- Update mobile styles without touching desktop
- Modify animations independently

### 2. **Readability**
- Each file has a single, clear purpose
- Logical organization by feature
- Easy to understand structure

### 3. **Scalability**
- Add new features in new files
- Extend existing modules without affecting others
- Clear boundaries between concerns

### 4. **Debugging**
- SASS error messages show specific partial file
- Isolate issues to specific modules
- Test individual components

### 5. **Collaboration**
- Multiple developers can work on different modules
- Reduced merge conflicts
- Clear module ownership

### 6. **Performance**
- Same compiled CSS output
- No runtime performance impact
- Better development experience

## Module Dependencies

```
experience.component.scss (main)
├── Base & Layout
│   ├── _experience-base.scss
│   ├── _experience-header.scss
│   └── _experience-hints.scss
├── Timeline Structure
│   ├── _timeline-base.scss
│   └── _timeline-item.scss
├── Card Components
│   ├── _card-collapsed.scss
│   ├── _card-expanded.scss
│   ├── _card-map.scss
│   └── _card-skills.scss
├── Special States
│   └── _current-position.scss
├── Animations
│   └── _animations.scss
└── Responsive
    └── _responsive.scss (260 lines)
```

## Import Order (Important!)

The order of imports matters for CSS specificity:

1. **Base styles first** - Container, header, hints
2. **Timeline structure** - Base, then items
3. **Card states** - Collapsed, expanded, sub-components
4. **Special states** - Current position overrides
5. **Animations** - Keyframes (can be anywhere)
6. **Responsive last** - Override desktop styles for mobile

## Modern SASS Modules

### Before (Deprecated `@import`)
```scss
@import 'experience-base';
@import 'timeline-base';
// Warning: @import is deprecated
```

### After (Modern `@use`)
```scss
@use 'experience-base';
@use 'timeline-base';
// No warnings, modern module system
```

**Benefits of `@use`**:
- Namespaced imports (no global pollution)
- Explicit dependencies
- Better error messages
- Future-proof (Dart Sass 3.0 ready)

## File Size Comparison

| File | Lines | Purpose |
|------|-------|---------|
| Original (monolithic) | 799 | Everything |
| **Modular Breakdown** | | |
| experience.component.scss | 32 | Main entry |
| _experience-base.scss | 16 | Container |
| _experience-header.scss | 17 | Header |
| _experience-hints.scss | 47 | Hints |
| _timeline-base.scss | 28 | Timeline |
| _timeline-item.scss | 128 | Items |
| _card-collapsed.scss | 46 | Collapsed cards |
| _card-expanded.scss | 71 | Expanded cards |
| _card-map.scss | 55 | Maps |
| _card-skills.scss | 62 | Skills |
| _current-position.scss | 32 | Current |
| _animations.scss | 26 | Animations |
| _responsive.scss | 260 | Mobile/tablet |
| **Total** | **820** | **(with comments)** |

## How to Use

### Adding New Styles

**For desktop cards**:
Edit `_card-collapsed.scss` or `_card-expanded.scss`

**For mobile styles**:
Edit `_responsive.scss`

**For animations**:
Edit `_animations.scss`

**For new feature**:
1. Create new partial: `_feature-name.scss`
2. Add to main file: `@use 'feature-name';`

### Modifying Existing Styles

1. Identify which module contains the style
2. Open the specific partial file
3. Make changes
4. Build to verify

### Example: Change Card Shadow

**File**: `_card-collapsed.scss`
```scss
.card-shell {
    box-shadow: 0 25px 50px rgba(15, 23, 42, 0.25); // Change this
}
```

## Build Status

✅ **Build**: Successful
✅ **Output**: Identical to original
✅ **Warnings**: Using modern `@use` (no import warnings)
✅ **File count**: 14 files (12 partials + main + backup)
✅ **Organization**: Logical and maintainable

## Backup

Original file backed up to:
```
apps/portfolio/src/app/experience/experience.component.scss.backup
```

Can restore if needed:
```bash
cd apps/portfolio/src/app/experience
mv experience.component.scss.backup experience.component.scss
```

## Testing Checklist

- [x] Build compiles successfully
- [x] No SCSS errors
- [x] Desktop layout unchanged
- [x] Mobile layout unchanged
- [x] Animations work
- [x] Hover effects work
- [x] Expanded cards work
- [x] Current position styling (green) works
- [x] Skills badges display correctly
- [x] Map markers pulse correctly

## Summary

Successfully refactored 799-line monolithic SCSS file into 12 well-organized, maintainable modules:

1. ✅ **12 modular partials** - Single responsibility each
2. ✅ **Clear organization** - By feature and functionality
3. ✅ **Modern SASS** - Using `@use` instead of `@import`
4. ✅ **Easy maintenance** - Find and update styles quickly
5. ✅ **Backup created** - Original file preserved
6. ✅ **Build verified** - Output identical, no errors
7. ✅ **Mobile preserved** - All responsive styles in one file

The experience component SCSS is now much more maintainable and professional!

