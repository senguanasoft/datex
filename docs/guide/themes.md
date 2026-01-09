# Themes

DateX comes with multiple built-in themes and supports full customization to match your application's design.

## Built-in Themes

### Default Theme

The default theme provides a clean, neutral appearance:

![Default Theme](https://cdn.jsdelivr.net/gh/senguanasoft/datex@main/assets/images/screenshots/default-theme-datex.png)

```javascript
import { Datex, DEFAULT_THEME } from "datex";

new Datex("#picker", {
  theme: DEFAULT_THEME,
});
```

**Colors:**

- Primary: `#357ebd` (blue)
- Apply button: `#357ebd` (blue)
- Cancel button: `#999` (gray)
- Font: `arial`

### Bootstrap Theme

Matches Bootstrap's design system:

![Bootstrap Theme](https://cdn.jsdelivr.net/gh/senguanasoft/datex@main/assets/images/screenshots/bootstrap-theme-datex.png)

```javascript
import { Datex, BOOTSTRAP_THEME } from "datex";

new Datex("#picker", {
  theme: BOOTSTRAP_THEME,
});
```

**Colors:**

- Primary: `#0d6efd` (Bootstrap blue)
- Apply button: `#198754` (Bootstrap green)
- Cancel button: `#dc3545` (Bootstrap red)
- Font: `system-ui, -apple-system, "Segoe UI", Roboto`

### Material Theme

Follows Material Design principles:

![Material Theme](https://cdn.jsdelivr.net/gh/senguanasoft/datex@main/assets/images/screenshots/material-theme-datex.png)

```javascript
import { Datex, MATERIAL_THEME } from "datex";

new Datex("#picker", {
  theme: MATERIAL_THEME,
});
```

**Colors:**

- Primary: `#1976d2` (Material blue)
- Apply button: `#4caf50` (Material green)
- Cancel button: `#f44336` (Material red)
- Font: `Roboto, "Helvetica Neue", Arial`

## Custom Themes

Create your own theme by providing a theme object:

```javascript
const customTheme = {
  primaryColor: "#6366f1",
  secondaryColor: "#64748b",
  backgroundColor: "#ffffff",
  borderColor: "#e2e8f0",
  textColor: "#1e293b",
  hoverColor: "#f1f5f9",
  selectedColor: "#6366f1",
  rangeColor: "#e0e7ff",
  todayColor: "#6366f1",
  disabledColor: "#94a3b8",
  applyButtonColor: "#10b981",
  cancelButtonColor: "#ef4444",
  borderRadius: "8px",
  fontSize: "14px",
  fontFamily: "Inter, system-ui, sans-serif",
};

new Datex("#picker", {
  theme: customTheme,
});
```

## Theme Properties

### Colors

| Property            | Description            | Default   |
| ------------------- | ---------------------- | --------- |
| `primaryColor`      | Main accent color      | `#357ebd` |
| `secondaryColor`    | Secondary elements     | `#ccc`    |
| `backgroundColor`   | Background color       | `#ffffff` |
| `borderColor`       | Border color           | `#ddd`    |
| `textColor`         | Text color             | `#000000` |
| `hoverColor`        | Hover state color      | `#eee`    |
| `selectedColor`     | Selected elements      | `#357ebd` |
| `rangeColor`        | Date range background  | `#ebf4f8` |
| `todayColor`        | Today's date highlight | `#357ebd` |
| `disabledColor`     | Disabled elements      | `#999`    |
| `applyButtonColor`  | Apply button color     | `#357ebd` |
| `cancelButtonColor` | Cancel button color    | `#999`    |

### Typography

| Property     | Description    | Default |
| ------------ | -------------- | ------- |
| `fontSize`   | Base font size | `15px`  |
| `fontFamily` | Font family    | `arial` |

### Layout

| Property       | Description   | Default |
| -------------- | ------------- | ------- |
| `borderRadius` | Border radius | `4px`   |

## Dynamic Theme Changes

You can change themes dynamically after initialization:

```javascript
const picker = new Datex("#picker");

// Change to Material theme
picker.setTheme(MATERIAL_THEME);

// Change to custom theme
picker.setTheme({
  primaryColor: "#8b5cf6",
  applyButtonColor: "#10b981",
  cancelButtonColor: "#f59e0b",
});
```

## CSS Variables

DateX uses CSS custom properties that you can override:

```css
.datex-picker {
  --datex-primary-color: #6366f1;
  --datex-apply-color: #10b981;
  --datex-cancel-color: #ef4444;
  --datex-border-radius: 8px;
  --datex-font-family: "Inter", sans-serif;
}
```

## Dark Mode Support

Create a dark theme:

![Dark Mode](https://cdn.jsdelivr.net/gh/senguanasoft/datex@main/assets/images/screenshots/dark-mode-datex.png)

```javascript
const darkTheme = {
  primaryColor: "#3b82f6",
  backgroundColor: "#1f2937",
  borderColor: "#374151",
  textColor: "#f9fafb",
  hoverColor: "#374151",
  selectedColor: "#3b82f6",
  rangeColor: "#1e3a8a",
  applyButtonColor: "#10b981",
  cancelButtonColor: "#ef4444",
  fontFamily: "system-ui, sans-serif",
};

new Datex("#picker", {
  theme: darkTheme,
});
```

## Framework-Specific Theming

### React with CSS-in-JS

```jsx
import styled from "styled-components";
import { Datex } from "datex";

const StyledDatePicker = styled.div`
  .datex-picker {
    --datex-primary-color: ${(props) => props.theme.primary};
    --datex-apply-color: ${(props) => props.theme.success};
    --datex-cancel-color: ${(props) => props.theme.danger};
  }
`;

function DatePicker({ theme }) {
  return (
    <StyledDatePicker theme={theme}>
      <input ref={inputRef} type="text" />
    </StyledDatePicker>
  );
}
```

### Vue with Scoped Styles

```vue
<template>
  <div class="date-picker-wrapper">
    <input ref="dateInput" type="text" />
  </div>
</template>

<style scoped>
.date-picker-wrapper :deep(.datex-picker) {
  --datex-primary-color: v-bind(primaryColor);
  --datex-apply-color: v-bind(applyColor);
  --datex-cancel-color: v-bind(cancelColor);
}
</style>

<script setup>
const primaryColor = "#6366f1";
const applyColor = "#10b981";
const cancelColor = "#ef4444";
</script>
```

## Responsive Theming

Adjust themes based on screen size:

```css
.datex-picker {
  --datex-font-size: 14px;
  --datex-border-radius: 4px;
}

@media (max-width: 768px) {
  .datex-picker {
    --datex-font-size: 16px;
    --datex-border-radius: 8px;
  }
}
```

## Theme Examples

### Corporate Theme

```javascript
const corporateTheme = {
  primaryColor: "#1a365d",
  applyButtonColor: "#2d3748",
  cancelButtonColor: "#718096",
  backgroundColor: "#ffffff",
  borderColor: "#e2e8f0",
  fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
  borderRadius: "4px",
};
```

### Colorful Theme

```javascript
const colorfulTheme = {
  primaryColor: "#ed64a6",
  applyButtonColor: "#48bb78",
  cancelButtonColor: "#f56565",
  rangeColor: "#fed7e2",
  selectedColor: "#ed64a6",
  borderRadius: "12px",
  fontFamily: '"Comic Sans MS", cursive',
};
```

### Minimal Theme

```javascript
const minimalTheme = {
  primaryColor: "#000000",
  applyButtonColor: "#000000",
  cancelButtonColor: "#666666",
  backgroundColor: "#ffffff",
  borderColor: "#000000",
  textColor: "#000000",
  fontFamily: '"Helvetica Neue", Arial, sans-serif',
  borderRadius: "0px",
};
```

## Best Practices

1. **Consistency**: Use colors that match your application's design system
2. **Accessibility**: Ensure sufficient contrast ratios for text and backgrounds
3. **Testing**: Test themes across different devices and screen sizes
4. **Performance**: Avoid frequent theme changes as they trigger re-renders

## Next Steps

- [Localization](/guide/localization) - Multi-language support
- [Custom Styling](/guide/custom-themes) - Advanced customization
- [Examples](/examples/themes) - Theme examples
