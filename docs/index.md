---
layout: home

hero:
  name: "DateX"
  text: "Modern Date Range Picker"
  tagline: "A lightweight, customizable, and accessible date range picker for TypeScript/JavaScript applications"
  image:
    src: /datex-logo.png
    alt: DateX Logo
  actions:
    - theme: brand
      text: Get Started
      link: /guide/getting-started
    - theme: alt
      text: View on GitHub
      link: https://github.com/senguanasoft/datex

features:
  - icon: 🎨
    title: Multiple Themes
    details: Built-in themes including Default, Bootstrap, and Material Design with full customization support
  - icon: 🌍
    title: Internationalization
    details: Full i18n support with Spanish locale included and easy custom locale configuration
  - icon: ⚡
    title: Lightweight & Fast
    details: Only 51KB minified with zero dependencies. Built with modern TypeScript and Vite
  - icon: 🎯
    title: CSS Selector Support
    details: Initialize with CSS selectors (#id, .class, [attribute]) or DOM elements
  - icon: 📱
    title: Responsive Design
    details: Mobile-friendly with touch support and responsive layouts for all screen sizes
  - icon: ♿
    title: Accessible
    details: Full keyboard navigation, ARIA labels, and screen reader support
  - icon: 🕒
    title: Time Picker
    details: Optional time selection with 12/24 hour formats and customizable increments
  - icon: 📦
    title: Framework Agnostic
    details: Works with vanilla JS, React, Vue, Angular, and any other framework
  - icon: 🎛️
    title: Predefined Ranges
    details: Built-in ranges like "Today", "Yesterday", "This Week" with always-visible calendars
  - icon: 🎨
    title: Custom Styling
    details: Easy theming with CSS variables and SCSS support. Matches original vanilla-datetimerange-picker styles
  - icon: 🔧
    title: Flexible Configuration
    details: Extensive options for date limits, auto-apply, single date mode, and more
  - icon: 📝
    title: TypeScript Support
    details: Full TypeScript definitions with excellent IDE support and type safety
---

## Demo

![DateX Demo](https://cdn.jsdelivr.net/gh/senguanasoft/datex@main/assets/images/demo.gif)

_Interactive demo showing date range selection, themes, and responsive design_

## Quick Start

```bash
# Install with npm
npm install datex

# Install with pnpm
pnpm add datex

# Install with yarn
yarn add datex
```

```javascript
import { Datex } from "datex-ui";
import "datex-ui/dist/style.css";

// Initialize with CSS selector
const picker = new Datex("#date-picker", {
  startDate: new Date(),
  endDate: new Date(),
  ranges: {
    Hoy: [new Date(), new Date()],
    Ayer: [new Date(Date.now() - 86400000), new Date(Date.now() - 86400000)],
    "Esta Semana": [startOfWeek, endOfWeek],
  },
});
```

## Key Features

### 🎨 **Multiple Themes**

Choose from Default, Bootstrap, or Material Design themes, or create your own:

![Default Theme](https://cdn.jsdelivr.net/gh/senguanasoft/datex@main/assets/images/screenshots/default-theme-datex.png)

![Bootstrap Theme](https://cdn.jsdelivr.net/gh/senguanasoft/datex@main/assets/images/screenshots/bootstrap-theme-datex.png)

![Material Theme](https://cdn.jsdelivr.net/gh/senguanasoft/datex@main/assets/images/screenshots/material-theme-datex.png)

```javascript
import { Datex, MATERIAL_THEME } from "datex";

const picker = new Datex("#picker", {
  theme: MATERIAL_THEME, // Green apply, red cancel buttons
});
```

### 🌍 **Spanish Locale Support**

Built-in Spanish localization with proper date formats:

```javascript
import { Datex, SPANISH_LOCALE } from "datex";

const picker = new Datex("#picker", {
  locale: SPANISH_LOCALE, // DD/MM/YYYY format
});
```

### 🎯 **CSS Selector Support**

Initialize with any CSS selector:

```javascript
// ID selector
new Datex("#date-picker");

// Class selector
new Datex(".date-input-range");

// Attribute selector
new Datex("[data-datepicker]");

// DOM element
new Datex(document.getElementById("picker"));
```

### 📅 **Always Visible Calendars**

Calendars remain visible even when selecting predefined ranges like "Today" or "Yesterday", allowing users to see and modify dates easily.

## Browser Support

DateX supports all modern browsers:

- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

## License

MIT License - see [LICENSE](https://github.com/senguanasoft/datex/blob/main/LICENSE) for details.
