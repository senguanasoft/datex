# DateX Images Guide

This guide explains what images to create and where to place them for optimal presentation in GitHub and npm.

## Required Images

### 1. Main Demo GIF (`demo.gif`)

**Location**: `assets/images/demo.gif`
**Size**: Max 5MB, recommended 800x600px
**Content**: Show the main functionality:

- Opening the date picker
- Selecting a date range
- Showing different themes
- Mobile responsiveness

### 2. Themes Comparison (`themes-comparison.png`)

**Location**: `assets/images/screenshots/themes-comparison.png`
**Size**: Recommended 1200x400px
**Content**: Side-by-side comparison of:

- Default theme
- Bootstrap theme
- Material theme

### 3. Time Picker (`time-picker.png`)

**Location**: `assets/images/screenshots/time-picker.png`
**Size**: Recommended 600x400px
**Content**: Show the time picker interface with:

- Hour/minute selectors
- AM/PM toggle (if 12-hour format)
- Date and time combined

### 4. Mobile View (`mobile-view.png`)

**Location**: `assets/images/screenshots/mobile-view.png`
**Size**: Recommended 375x667px (iPhone size)
**Content**: Show how the picker looks on mobile:

- Responsive layout
- Touch-friendly interface
- Proper scaling

### 5. Spanish Localization (`spanish-locale.png`)

**Location**: `assets/images/screenshots/spanish-locale.png`
**Size**: Recommended 600x400px
**Content**: Show Spanish interface:

- Spanish month names
- Spanish day abbreviations
- Spanish button labels

## Optional Images

### 6. Range Selection (`ranges.png`)

**Location**: `assets/images/screenshots/ranges.png`
**Content**: Show predefined ranges like "Hoy", "Ayer", "Últimos 7 días"

### 7. Accessibility Features (`accessibility.png`)

**Location**: `assets/images/screenshots/accessibility.png`
**Content**: Show keyboard navigation or high contrast mode

### 8. Logo (`logo.png`)

**Location**: `assets/images/logo.png`
**Size**: 256x256px, transparent background
**Content**: DateX logo for branding

## For Documentation (VitePress)

Place copies of relevant images in `docs/public/images/` to use in documentation:

- `docs/public/images/demo.gif`
- `docs/public/images/themes-comparison.png`
- `docs/public/images/time-picker.png`
- `docs/public/images/mobile-view.png`

## Image Optimization Tips

1. **GIFs**: Use tools like [ezgif.com](https://ezgif.com) to compress
2. **PNGs**: Use [TinyPNG](https://tinypng.com) for compression
3. **Screenshots**: Use consistent browser/OS for professional look
4. **Mobile**: Use browser dev tools to simulate mobile devices

## Taking Screenshots

### For Desktop:

1. Open `dev/index.html` in browser
2. Use browser dev tools to set consistent window size
3. Take screenshots with consistent styling

### For Mobile:

1. Use Chrome DevTools mobile simulation
2. Set to iPhone 12 Pro (390x844) or similar
3. Ensure touch targets are visible

### For Themes:

1. Create three instances with different themes
2. Use same date range for consistency
3. Arrange side by side for comparison

## File Naming Convention

- Use lowercase with hyphens: `time-picker.png`
- Be descriptive: `themes-comparison.png` not `themes.png`
- Include context: `mobile-view.png` not `mobile.png`

## After Adding Images

1. Update README.md image paths if needed
2. Test that images display correctly on GitHub
3. Verify images are included in npm package with `npm pack`
4. Update documentation images in `docs/public/images/`

## Current Status

- [ ] `demo.gif` - Main functionality demo
- [ ] `themes-comparison.png` - Theme comparison
- [ ] `time-picker.png` - Time picker interface
- [ ] `mobile-view.png` - Mobile responsive view
- [ ] `spanish-locale.png` - Spanish localization
- [ ] `logo.png` - DateX logo

Check off items as you add them!
