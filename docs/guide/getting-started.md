# Getting Started

DateX is a modern, lightweight date range picker built with TypeScript. It provides a clean API, multiple themes, and excellent browser support.

![DateX Demo](https://cdn.jsdelivr.net/gh/senguanasoft/datex@main/assets/images/demo.gif)

_DateX in action - showing date range selection with different themes_

## Installation

Install DateX using your preferred package manager:

::: code-group

```bash [npm]
npm install datex
```

```bash [pnpm]
pnpm add datex
```

```bash [yarn]
yarn add datex
```

:::

## Basic Usage

### 1. Import DateX

```javascript
import { Datex } from "datex";
import "datex/dist/style.css";
```

### 2. Initialize with CSS Selector

DateX supports multiple ways to initialize:

```javascript
// ID selector
const picker1 = new Datex("#date-picker");

// Class selector
const picker2 = new Datex(".date-input-range");

// Attribute selector
const picker3 = new Datex("[data-datepicker]");

// DOM element
const element = document.getElementById("my-picker");
const picker4 = new Datex(element);
```

### 3. HTML Setup

```html
<input type="text" id="date-picker" placeholder="Select date range" />
```

### 4. Complete Example

```html
<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" href="node_modules/datex/dist/style.css" />
  </head>
  <body>
    <input type="text" id="daterange" placeholder="Select dates" />

    <script type="module">
      import {
        Datex,
        SPANISH_LOCALE,
      } from "./node_modules/datex/dist/index.esm.js";

      const picker = new Datex(
        "#daterange",
        {
          startDate: new Date(),
          endDate: new Date(),
          locale: SPANISH_LOCALE,
          ranges: {
            Hoy: [new Date(), new Date()],
            Ayer: [
              new Date(Date.now() - 86400000),
              new Date(Date.now() - 86400000),
            ],
            "Esta Semana": [getStartOfWeek(), getEndOfWeek()],
          },
        },
        (start, end, label) => {
          console.log("Selected:", start, end, label);
        }
      );

      function getStartOfWeek() {
        const date = new Date();
        const day = date.getDay();
        const diff = date.getDate() - day + (day === 0 ? -6 : 1);
        return new Date(date.setDate(diff));
      }

      function getEndOfWeek() {
        const date = getStartOfWeek();
        return new Date(date.setDate(date.getDate() + 6));
      }
    </script>
  </body>
</html>
```

## Key Features

### CSS Selector Support

Unlike other date pickers, DateX accepts CSS selectors directly:

```javascript
// These all work!
new Datex("#my-picker");
new Datex(".date-range-input");
new Datex('[data-role="datepicker"]');
```

### Always Visible Calendars

When you select predefined ranges like "Today" or "Yesterday", the calendars remain visible so you can see and modify the selected dates.

### Multiple Themes

Choose from built-in themes or create your own:

![Default Theme](https://cdn.jsdelivr.net/gh/senguanasoft/datex@main/assets/images/screenshots/default-theme-datex.png)

![Bootstrap Theme](https://cdn.jsdelivr.net/gh/senguanasoft/datex@main/assets/images/screenshots/bootstrap-theme-datex.png)

![Material Theme](https://cdn.jsdelivr.net/gh/senguanasoft/datex@main/assets/images/screenshots/material-theme-datex.png)

```javascript
import { Datex, MATERIAL_THEME, BOOTSTRAP_THEME } from "datex";

// Material Design theme (green apply, red cancel)
new Datex("#picker1", { theme: MATERIAL_THEME });

// Bootstrap theme
new Datex("#picker2", { theme: BOOTSTRAP_THEME });
```

### Spanish Locale

Built-in Spanish support with proper date formatting:

```javascript
import { Datex, SPANISH_LOCALE } from "datex";

new Datex("#picker", {
  locale: SPANISH_LOCALE, // DD/MM/YYYY format
  ranges: {
    Hoy: [new Date(), new Date()],
    Ayer: [yesterday, yesterday],
    "Esta Semana": [startOfWeek, endOfWeek],
  },
});
```

## Next Steps

- [Installation Guide](/guide/installation) - Detailed installation instructions
- [Configuration Options](/guide/options) - All available options
- [Themes](/guide/themes) - Using and customizing themes
- [Examples](/examples/basic) - More examples and use cases
