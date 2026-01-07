# Accessibility

DateX is designed with accessibility in mind, providing comprehensive support for users with disabilities and assistive technologies.

## Keyboard Navigation

DateX supports full keyboard navigation without requiring a mouse:

### Basic Navigation

- **Tab**: Move between interactive elements
- **Enter/Space**: Open/close the picker, select dates, activate buttons
- **Escape**: Close the picker and cancel selection
- **Arrow Keys**: Navigate between dates in the calendar

### Calendar Navigation

- **Left/Right Arrows**: Move between days
- **Up/Down Arrows**: Move between weeks
- **Page Up/Down**: Navigate between months
- **Home/End**: Go to first/last day of the month
- **Ctrl + Home**: Go to today's date

```javascript
// Keyboard navigation is enabled by default
const picker = new Datex("#accessible-picker", {
  // All keyboard features work automatically
});
```

## Screen Reader Support

DateX provides comprehensive screen reader support through proper ARIA attributes and semantic HTML:

### ARIA Labels

```javascript
const picker = new Datex("#screen-reader-picker", {
  // Custom ARIA labels for better screen reader experience
  locale: {
    format: "MM/DD/YYYY",
    separator: " to ",
    applyLabel: "Apply date selection",
    cancelLabel: "Cancel date selection",
    customRangeLabel: "Custom date range",
    daysOfWeek: [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    monthNames: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    firstDay: 0,
  },
});
```

### Semantic HTML Structure

DateX generates semantic HTML that screen readers can understand:

```html
<!-- Generated structure includes proper roles and labels -->
<div class="datex-picker" role="dialog" aria-label="Date range picker">
  <div class="ranges" role="list">
    <ul>
      <li role="listitem" tabindex="0">Today</li>
      <li role="listitem" tabindex="0">Yesterday</li>
    </ul>
  </div>

  <div class="drp-calendar" role="grid" aria-label="Calendar">
    <table role="presentation">
      <thead>
        <tr role="row">
          <th role="columnheader" aria-label="Sunday">Sun</th>
          <!-- ... -->
        </tr>
      </thead>
      <tbody>
        <tr role="row">
          <td role="gridcell" aria-label="January 1, 2024" tabindex="0">1</td>
          <!-- ... -->
        </tr>
      </tbody>
    </table>
  </div>
</div>
```

## High Contrast Support

DateX automatically adapts to high contrast mode and provides themes optimized for accessibility:

### High Contrast Theme

```javascript
import { Datex } from "datex";

const highContrastTheme = {
  primaryColor: "#000000",
  secondaryColor: "#666666",
  backgroundColor: "#ffffff",
  borderColor: "#000000",
  textColor: "#000000",
  hoverColor: "#f0f0f0",
  selectedColor: "#000000",
  rangeColor: "#e0e0e0",
  todayColor: "#000000",
  disabledColor: "#666666",
  applyButtonColor: "#000000",
  cancelButtonColor: "#666666",
  fontSize: "16px",
  fontFamily: "Arial, sans-serif",
  borderRadius: "4px",
};

const picker = new Datex("#high-contrast-picker", {
  theme: highContrastTheme,
});
```

### System High Contrast Detection

```javascript
function createAccessiblePicker(element) {
  // Detect if user prefers high contrast
  const prefersHighContrast = window.matchMedia(
    "(prefers-contrast: high)"
  ).matches;

  const theme = prefersHighContrast ? highContrastTheme : defaultTheme;

  return new Datex(element, {
    theme: theme,
    // Larger text for better readability
    fontSize: prefersHighContrast ? "18px" : "14px",
  });
}
```

## Focus Management

DateX properly manages focus to ensure a smooth experience for keyboard users:

### Focus Indicators

```css
/* DateX includes visible focus indicators */
.datex-picker *:focus {
  outline: 2px solid #4f46e5;
  outline-offset: 2px;
}

.datex-picker td:focus {
  background-color: #e0e7ff;
  outline: 2px solid #4f46e5;
}
```

### Focus Trapping

```javascript
// Focus is automatically trapped within the picker when open
const picker = new Datex("#focus-trapped-picker", {
  // Focus management is handled automatically
});

// Custom focus management if needed
picker.element.addEventListener("show.daterangepicker", () => {
  // Focus is automatically moved to the first interactive element
});

picker.element.addEventListener("hide.daterangepicker", () => {
  // Focus is automatically returned to the trigger element
});
```

## Reduced Motion Support

DateX respects user preferences for reduced motion:

```javascript
function createMotionSafePicker(element) {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  return new Datex(element, {
    // Disable animations if user prefers reduced motion
    animations: !prefersReducedMotion,

    // Provide instant feedback instead of transitions
    theme: {
      ...defaultTheme,
      transitionDuration: prefersReducedMotion ? "0ms" : "150ms",
    },
  });
}
```

## Color Accessibility

### Color Blind Friendly Themes

```javascript
const colorBlindFriendlyTheme = {
  // Use patterns and shapes in addition to color
  primaryColor: "#0066cc", // Blue (safe for most color blindness)
  selectedColor: "#0066cc",
  rangeColor: "#cce6ff", // Light blue
  applyButtonColor: "#009900", // Green (distinguishable)
  cancelButtonColor: "#cc0000", // Red (with sufficient contrast)

  // Ensure sufficient contrast ratios
  textColor: "#000000",
  backgroundColor: "#ffffff",
  borderColor: "#666666",
};

// Test contrast ratios
function getContrastRatio(color1, color2) {
  // Implementation to calculate WCAG contrast ratio
  // Should be at least 4.5:1 for normal text, 3:1 for large text
}
```

### Pattern-Based Selection

```javascript
// Add visual patterns in addition to color
const patternTheme = {
  ...colorBlindFriendlyTheme,

  // Custom CSS for patterns
  customCSS: `
    .datex-picker td.start-date::before {
      content: '▶';
      position: absolute;
      top: 2px;
      left: 2px;
      font-size: 8px;
    }
    
    .datex-picker td.end-date::after {
      content: '◀';
      position: absolute;
      top: 2px;
      right: 2px;
      font-size: 8px;
    }
    
    .datex-picker td.in-range {
      background-image: repeating-linear-gradient(
        45deg,
        transparent,
        transparent 2px,
        rgba(0,0,0,0.1) 2px,
        rgba(0,0,0,0.1) 4px
      );
    }
  `,
};
```

## Voice Control Support

DateX works with voice control software by providing proper labels and structure:

```javascript
const voiceControlPicker = new Datex("#voice-control-picker", {
  locale: {
    // Use clear, unambiguous labels
    applyLabel: "Apply selected dates",
    cancelLabel: "Cancel date selection",
    customRangeLabel: "Select custom date range",

    // Provide full month names for voice recognition
    monthNames: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],

    // Full day names
    daysOfWeek: [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
  },
});
```

## Mobile Accessibility

### Touch Target Sizes

```javascript
const mobileAccessibleTheme = {
  ...defaultTheme,

  // Ensure touch targets are at least 44px (iOS) or 48px (Android)
  minTouchTargetSize: "48px",

  // Larger text for mobile
  fontSize: "16px",

  // More spacing for easier touch interaction
  padding: "12px",

  // Larger border radius for modern mobile design
  borderRadius: "8px",
};

// Detect mobile and apply appropriate theme
function createMobileAccessiblePicker(element) {
  const isMobile =
    /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

  return new Datex(element, {
    theme: isMobile ? mobileAccessibleTheme : defaultTheme,

    // Adjust behavior for mobile
    opens: isMobile ? "center" : "left",
    drops: isMobile ? "down" : "auto",
  });
}
```

### Gesture Support

```javascript
// DateX supports standard mobile gestures
const mobilePicker = new Datex("#mobile-picker", {
  // Swipe gestures for month navigation work automatically
  // Tap to select dates
  // Pinch to zoom (browser default)
});
```

## Testing Accessibility

### Automated Testing

```javascript
// Example using axe-core for accessibility testing
async function testPickerAccessibility() {
  const picker = new Datex("#test-picker");
  picker.show();

  // Run accessibility audit
  const results = await axe.run(".datex-picker");

  if (results.violations.length > 0) {
    console.error("Accessibility violations found:", results.violations);
  } else {
    console.log("No accessibility violations found");
  }

  picker.hide();
}
```

### Manual Testing Checklist

1. **Keyboard Navigation**

   - [ ] Can open picker with keyboard
   - [ ] Can navigate all dates with arrow keys
   - [ ] Can select dates with Enter/Space
   - [ ] Can close picker with Escape
   - [ ] Focus is properly managed

2. **Screen Reader**

   - [ ] All elements have appropriate labels
   - [ ] Selected dates are announced
   - [ ] Navigation changes are announced
   - [ ] Button purposes are clear

3. **Visual**

   - [ ] Sufficient color contrast (4.5:1 minimum)
   - [ ] Focus indicators are visible
   - [ ] Works in high contrast mode
   - [ ] Text is readable at 200% zoom

4. **Motor**
   - [ ] Touch targets are at least 44px
   - [ ] Works with voice control
   - [ ] No time-based interactions required

## Accessibility Configuration

### Complete Accessible Setup

```javascript
import { Datex } from "datex";

function createFullyAccessiblePicker(element, options = {}) {
  // Detect user preferences
  const prefersHighContrast = window.matchMedia(
    "(prefers-contrast: high)"
  ).matches;
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  const prefersLargeText = window.matchMedia(
    "(prefers-reduced-data: reduce)"
  ).matches;

  // Create accessible theme
  const accessibleTheme = {
    primaryColor: prefersHighContrast ? "#000000" : "#0066cc",
    backgroundColor: "#ffffff",
    textColor: "#000000",
    borderColor: prefersHighContrast ? "#000000" : "#666666",
    fontSize: prefersLargeText ? "18px" : "16px",
    fontFamily: "Arial, sans-serif", // Highly readable font
    borderRadius: "4px",

    // Ensure good contrast for all states
    hoverColor: "#f0f0f0",
    selectedColor: prefersHighContrast ? "#000000" : "#0066cc",
    disabledColor: "#666666",
  };

  const config = {
    theme: accessibleTheme,

    // Clear, descriptive locale
    locale: {
      format: "MM/DD/YYYY",
      separator: " to ",
      applyLabel: "Apply selected date range",
      cancelLabel: "Cancel date selection",
      customRangeLabel: "Select custom date range",
      daysOfWeek: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      monthNames: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      firstDay: 0,
    },

    // Merge with user options
    ...options,
  };

  const picker = new Datex(element, config);

  // Add additional accessibility enhancements
  enhanceAccessibility(picker);

  return picker;
}

function enhanceAccessibility(picker) {
  // Add live region for announcements
  const liveRegion = document.createElement("div");
  liveRegion.setAttribute("aria-live", "polite");
  liveRegion.setAttribute("aria-atomic", "true");
  liveRegion.style.position = "absolute";
  liveRegion.style.left = "-10000px";
  liveRegion.style.width = "1px";
  liveRegion.style.height = "1px";
  liveRegion.style.overflow = "hidden";
  document.body.appendChild(liveRegion);

  // Announce date selections
  picker.element.addEventListener("apply.daterangepicker", (event) => {
    const pickerInstance = event.detail;
    const startDate = pickerInstance.getStartDate();
    const endDate = pickerInstance.getEndDate();

    liveRegion.textContent = `Selected date range from ${startDate.toLocaleDateString()} to ${endDate.toLocaleDateString()}`;
  });

  // Clean up on removal
  const originalRemove = picker.remove.bind(picker);
  picker.remove = function () {
    if (liveRegion.parentNode) {
      liveRegion.parentNode.removeChild(liveRegion);
    }
    originalRemove();
  };
}
```

## WCAG Compliance

DateX is designed to meet WCAG 2.1 AA standards:

- **Perceivable**: High contrast themes, scalable text, alternative text
- **Operable**: Full keyboard navigation, no seizure-inducing content
- **Understandable**: Clear labels, consistent navigation, error prevention
- **Robust**: Semantic HTML, ARIA attributes, cross-browser compatibility

## Next Steps

- Review [API documentation](/api/options) for accessibility-specific options
- Check out [examples](/examples/basic) with accessibility features
- Learn about [framework integration](/examples/frameworks) with accessibility considerations
