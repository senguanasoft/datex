# Custom Themes

Create your own custom themes to match your application's design system perfectly.

## Theme Structure

A DateX theme is a JavaScript object that defines colors, typography, and spacing:

```javascript
const customTheme = {
  // Colors
  primaryColor: "#3b82f6",
  secondaryColor: "#6b7280",
  backgroundColor: "#ffffff",
  borderColor: "#e5e7eb",
  textColor: "#111827",
  hoverColor: "#f3f4f6",
  selectedColor: "#3b82f6",
  rangeColor: "#dbeafe",
  todayColor: "#3b82f6",
  disabledColor: "#9ca3af",
  applyButtonColor: "#10b981",
  cancelButtonColor: "#ef4444",

  // Typography
  fontSize: "14px",
  fontFamily: "Inter, system-ui, sans-serif",

  // Layout
  borderRadius: "8px",
};
```

## Creating Custom Themes

### Dark Theme Example

```javascript
import { Datex } from "datex";

const darkTheme = {
  primaryColor: "#60a5fa",
  secondaryColor: "#6b7280",
  backgroundColor: "#1f2937",
  borderColor: "#374151",
  textColor: "#f9fafb",
  hoverColor: "#374151",
  selectedColor: "#3b82f6",
  rangeColor: "#1e3a8a",
  todayColor: "#60a5fa",
  disabledColor: "#6b7280",
  applyButtonColor: "#10b981",
  cancelButtonColor: "#ef4444",
  fontSize: "14px",
  fontFamily: "system-ui, sans-serif",
  borderRadius: "6px",
};

const picker = new Datex("#dark-picker", {
  theme: darkTheme,
});
```

### Corporate Brand Theme

```javascript
const corporateTheme = {
  primaryColor: "#c41e3a", // Brand red
  secondaryColor: "#64748b",
  backgroundColor: "#ffffff",
  borderColor: "#e2e8f0",
  textColor: "#0f172a",
  hoverColor: "#f8fafc",
  selectedColor: "#c41e3a",
  rangeColor: "#fef2f2",
  todayColor: "#c41e3a",
  disabledColor: "#94a3b8",
  applyButtonColor: "#059669", // Success green
  cancelButtonColor: "#64748b", // Neutral gray
  fontSize: "15px",
  fontFamily: '"Helvetica Neue", Arial, sans-serif',
  borderRadius: "4px",
};
```

### Minimalist Theme

```javascript
const minimalistTheme = {
  primaryColor: "#000000",
  secondaryColor: "#666666",
  backgroundColor: "#ffffff",
  borderColor: "#cccccc",
  textColor: "#000000",
  hoverColor: "#f5f5f5",
  selectedColor: "#000000",
  rangeColor: "#f0f0f0",
  todayColor: "#000000",
  disabledColor: "#999999",
  applyButtonColor: "#000000",
  cancelButtonColor: "#666666",
  fontSize: "13px",
  fontFamily: 'Monaco, "Lucida Console", monospace',
  borderRadius: "0px",
};
```

## Dynamic Theme Switching

### Theme Switcher Component

```javascript
class ThemeSwitcher {
  constructor(pickerElement) {
    this.picker = new Datex(pickerElement);
    this.themes = {
      light: this.getLightTheme(),
      dark: this.getDarkTheme(),
      corporate: this.getCorporateTheme(),
    };
    this.currentTheme = "light";
  }

  switchTheme(themeName) {
    if (this.themes[themeName]) {
      this.picker.setTheme(this.themes[themeName]);
      this.currentTheme = themeName;

      // Save preference
      localStorage.setItem("datex-theme", themeName);
    }
  }

  getLightTheme() {
    return {
      primaryColor: "#3b82f6",
      backgroundColor: "#ffffff",
      textColor: "#111827",
      // ... other light theme properties
    };
  }

  getDarkTheme() {
    return {
      primaryColor: "#60a5fa",
      backgroundColor: "#1f2937",
      textColor: "#f9fafb",
      // ... other dark theme properties
    };
  }
}

// Usage
const themeSwitcher = new ThemeSwitcher("#themed-picker");

// Switch themes
document.getElementById("light-theme").addEventListener("click", () => {
  themeSwitcher.switchTheme("light");
});

document.getElementById("dark-theme").addEventListener("click", () => {
  themeSwitcher.switchTheme("dark");
});
```

### System Theme Detection

```javascript
function getSystemTheme() {
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    return "dark";
  }
  return "light";
}

function createResponsiveThemePicker(element) {
  const themes = {
    light: lightTheme,
    dark: darkTheme,
  };

  const picker = new Datex(element, {
    theme: themes[getSystemTheme()],
  });

  // Listen for system theme changes
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => {
      const newTheme = e.matches ? "dark" : "light";
      picker.setTheme(themes[newTheme]);
    });

  return picker;
}
```

## Advanced Theming

### CSS Custom Properties Integration

```javascript
function createCSSVariableTheme() {
  const root = document.documentElement;

  return {
    primaryColor: getComputedStyle(root)
      .getPropertyValue("--primary-color")
      .trim(),
    backgroundColor: getComputedStyle(root)
      .getPropertyValue("--bg-color")
      .trim(),
    textColor: getComputedStyle(root).getPropertyValue("--text-color").trim(),
    borderColor: getComputedStyle(root)
      .getPropertyValue("--border-color")
      .trim(),
    // ... map other CSS variables
  };
}

// CSS
/*
:root {
  --primary-color: #3b82f6;
  --bg-color: #ffffff;
  --text-color: #111827;
  --border-color: #e5e7eb;
}

[data-theme="dark"] {
  --primary-color: #60a5fa;
  --bg-color: #1f2937;
  --text-color: #f9fafb;
  --border-color: #374151;
}
*/

const picker = new Datex("#css-themed-picker", {
  theme: createCSSVariableTheme(),
});
```

### Theme Inheritance

```javascript
import { DEFAULT_THEME, MATERIAL_THEME } from "datex";

// Extend existing themes
const customMaterialTheme = {
  ...MATERIAL_THEME,
  primaryColor: "#9c27b0", // Purple instead of blue
  selectedColor: "#9c27b0",
  applyButtonColor: "#4caf50", // Keep Material green
  borderRadius: "12px", // More rounded
};

// Create theme variants
function createThemeVariant(baseTheme, overrides) {
  return { ...baseTheme, ...overrides };
}

const blueVariant = createThemeVariant(DEFAULT_THEME, {
  primaryColor: "#2563eb",
  selectedColor: "#2563eb",
});

const greenVariant = createThemeVariant(DEFAULT_THEME, {
  primaryColor: "#059669",
  selectedColor: "#059669",
});
```

### Conditional Theming

```javascript
function createConditionalTheme(userPreferences, context) {
  const baseTheme = { ...DEFAULT_THEME };

  // High contrast mode
  if (userPreferences.highContrast) {
    baseTheme.primaryColor = "#000000";
    baseTheme.backgroundColor = "#ffffff";
    baseTheme.textColor = "#000000";
    baseTheme.borderColor = "#000000";
  }

  // Large text mode
  if (userPreferences.largeText) {
    baseTheme.fontSize = "18px";
  }

  // Context-specific adjustments
  if (context === "mobile") {
    baseTheme.fontSize = "16px";
    baseTheme.borderRadius = "8px";
  }

  return baseTheme;
}
```

## Theme Validation

```javascript
function validateTheme(theme) {
  const requiredProperties = [
    "primaryColor",
    "backgroundColor",
    "textColor",
    "borderColor",
  ];

  const missing = requiredProperties.filter((prop) => !theme[prop]);

  if (missing.length > 0) {
    console.warn("Theme missing required properties:", missing);
    return false;
  }

  // Validate color format
  const colorProperties = [
    "primaryColor",
    "backgroundColor",
    "textColor",
    "borderColor",
    "hoverColor",
    "selectedColor",
    "rangeColor",
  ];

  for (const prop of colorProperties) {
    if (theme[prop] && !isValidColor(theme[prop])) {
      console.warn(`Invalid color value for ${prop}:`, theme[prop]);
      return false;
    }
  }

  return true;
}

function isValidColor(color) {
  const style = new Option().style;
  style.color = color;
  return style.color !== "";
}

// Usage
const myTheme = {
  /* theme definition */
};
if (validateTheme(myTheme)) {
  const picker = new Datex("#validated-picker", { theme: myTheme });
}
```

## Theme Presets

### Seasonal Themes

```javascript
const seasonalThemes = {
  spring: {
    primaryColor: "#10b981",
    selectedColor: "#10b981",
    rangeColor: "#d1fae5",
    backgroundColor: "#f0fdf4",
  },

  summer: {
    primaryColor: "#f59e0b",
    selectedColor: "#f59e0b",
    rangeColor: "#fef3c7",
    backgroundColor: "#fffbeb",
  },

  autumn: {
    primaryColor: "#dc2626",
    selectedColor: "#dc2626",
    rangeColor: "#fecaca",
    backgroundColor: "#fef2f2",
  },

  winter: {
    primaryColor: "#3b82f6",
    selectedColor: "#3b82f6",
    rangeColor: "#dbeafe",
    backgroundColor: "#eff6ff",
  },
};

function getCurrentSeason() {
  const month = new Date().getMonth();
  if (month >= 2 && month <= 4) return "spring";
  if (month >= 5 && month <= 7) return "summer";
  if (month >= 8 && month <= 10) return "autumn";
  return "winter";
}

const picker = new Datex("#seasonal-picker", {
  theme: { ...DEFAULT_THEME, ...seasonalThemes[getCurrentSeason()] },
});
```

### Accessibility Themes

```javascript
const accessibilityThemes = {
  highContrast: {
    primaryColor: "#000000",
    backgroundColor: "#ffffff",
    textColor: "#000000",
    borderColor: "#000000",
    hoverColor: "#f0f0f0",
    selectedColor: "#000000",
    disabledColor: "#666666",
  },

  lowVision: {
    fontSize: "18px",
    primaryColor: "#000000",
    backgroundColor: "#ffffff",
    textColor: "#000000",
    borderRadius: "8px",
  },

  colorBlindFriendly: {
    primaryColor: "#0066cc", // Blue
    selectedColor: "#0066cc",
    rangeColor: "#e6f3ff",
    applyButtonColor: "#009900", // Green
    cancelButtonColor: "#cc0000", // Red
  },
};
```

## Performance Considerations

### Theme Caching

```javascript
class ThemeManager {
  constructor() {
    this.themeCache = new Map();
  }

  getTheme(themeName, customizations = {}) {
    const cacheKey = `${themeName}-${JSON.stringify(customizations)}`;

    if (this.themeCache.has(cacheKey)) {
      return this.themeCache.get(cacheKey);
    }

    const baseTheme = this.getBaseTheme(themeName);
    const finalTheme = { ...baseTheme, ...customizations };

    this.themeCache.set(cacheKey, finalTheme);
    return finalTheme;
  }

  clearCache() {
    this.themeCache.clear();
  }
}
```

## Next Steps

- Learn about [time picker styling](/guide/time-picker)
- Explore [accessibility considerations](/guide/accessibility)
- Check out [framework-specific theming](/examples/themes)
