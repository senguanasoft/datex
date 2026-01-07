# DateX - Quick Start Guide

Get up and running with DateX in minutes!

## 🚀 Installation

```bash
npm install datex
# or
pnpm add datex
# or
yarn add datex
```

## 📝 Basic Usage

### Simple Date Range Picker

```javascript
import { Datex } from "datex";

// Basic usage
const picker = new Datex("#daterange", {}, (startDate, endDate, label) => {
  console.log("Selected:", startDate, endDate, label);
});
```

### With Spanish Locale

```javascript
import { Datex, SPANISH_LOCALE } from "datex";

const picker = new Datex("#daterange", {
  locale: SPANISH_LOCALE,
});
```

### With Predefined Ranges

```javascript
const picker = new Datex("#daterange", {
  ranges: {
    Today: [new Date(), new Date()],
    "Last 7 Days": [new Date(Date.now() - 6 * 24 * 60 * 60 * 1000), new Date()],
  },
});
```

## 🎨 Themes

```javascript
import { Datex, BOOTSTRAP_THEME, MATERIAL_THEME } from "datex";

// Bootstrap theme
const bootstrapPicker = new Datex("#bootstrap", {
  theme: BOOTSTRAP_THEME,
});

// Material theme
const materialPicker = new Datex("#material", {
  theme: MATERIAL_THEME,
});
```

## ⏰ Time Picker

```javascript
import { Datex, SPANISH_LOCALE_WITH_TIME } from "datex";

const timePicker = new Datex("#datetime", {
  timePicker: true,
  locale: SPANISH_LOCALE_WITH_TIME,
});
```

## 🎯 CSS Selectors

DateX supports multiple ways to target elements:

```javascript
// ID selector
new Datex("#date-picker");

// Class selector
new Datex(".date-input-range");

// Attribute selector
new Datex('[data-datex="range"]');

// DOM element
new Datex(document.getElementById("my-input"));
```

## 📚 Next Steps

- [📖 Full Documentation](https://datex-docs.vercel.app)
- [🎮 Interactive Playground](https://datex-docs.vercel.app/playground)
- [🎨 Theme Examples](https://datex-docs.vercel.app/examples/themes)
- [🌍 Localization Guide](https://datex-docs.vercel.app/guide/localization)

## 🆘 Need Help?

- [GitHub Issues](https://github.com/senguanasoft/datex/issues)
- [Documentation](https://datex-docs.vercel.app)
- [Examples](https://datex-docs.vercel.app/examples/basic)

## ✨ Features

- 🚀 Zero dependencies
- 📱 Mobile responsive
- 🎨 Multiple themes
- 🌍 Spanish localization
- ⏰ Time picker support
- ♿ Accessibility compliant
- 📦 TypeScript support
