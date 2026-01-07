# Theme Examples

Examples showcasing different themes and custom styling options for DateX.

## Built-in Themes

### Default Theme

```javascript
import { Datex, DEFAULT_THEME } from "datex";

const defaultPicker = new Datex("#default-theme", {
  theme: DEFAULT_THEME,
});
```

### Bootstrap Theme

```javascript
import { Datex, BOOTSTRAP_THEME } from "datex";

const bootstrapPicker = new Datex("#bootstrap-theme", {
  theme: BOOTSTRAP_THEME,
});
```

### Material Theme

```javascript
import { Datex, MATERIAL_THEME } from "datex";

const materialPicker = new Datex("#material-theme", {
  theme: MATERIAL_THEME,
});
```

## Custom Themes

### Dark Theme

```javascript
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

const darkPicker = new Datex("#dark-theme", {
  theme: darkTheme,
});
```

### Colorful Theme

```javascript
const colorfulTheme = {
  primaryColor: "#ff6b6b",
  backgroundColor: "#ffffff",
  textColor: "#333333",
  borderColor: "#ff6b6b",
  selectedColor: "#ff6b6b",
  rangeColor: "#ffe0e0",
  applyButtonColor: "#51cf66",
  cancelButtonColor: "#ff8787",
  borderRadius: "12px",
  fontSize: "15px",
  fontFamily: "Comic Sans MS, cursive",
};

const colorfulPicker = new Datex("#colorful-theme", {
  theme: colorfulTheme,
});
```

## Dynamic Theme Switching

```html
<div class="theme-controls">
  <button onclick="switchTheme('light')">Light</button>
  <button onclick="switchTheme('dark')">Dark</button>
  <button onclick="switchTheme('colorful')">Colorful</button>
</div>
<input type="text" id="dynamic-theme" />
```

```javascript
import { Datex, DEFAULT_THEME, MATERIAL_THEME } from "datex";

const themes = {
  light: DEFAULT_THEME,
  dark: darkTheme,
  colorful: colorfulTheme,
};

const dynamicPicker = new Datex("#dynamic-theme");

function switchTheme(themeName) {
  if (themes[themeName]) {
    dynamicPicker.setTheme(themes[themeName]);
  }
}

// Make function global for onclick handlers
window.switchTheme = switchTheme;
```
