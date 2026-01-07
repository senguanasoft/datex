# Interactive Playground

Try DateX live in your browser! Experiment with different configurations and see the results instantly.

## Configuration Options

### Basic Setup

```javascript
import { Datex } from "datex";

const picker = new Datex("#daterange", {
  // Basic options
  autoApply: false,
  singleDatePicker: false,
  timePicker: false,
  showDropdowns: true,
});
```

### Theme Selection

```javascript
import { Datex, BOOTSTRAP_THEME, MATERIAL_THEME } from "datex";

// Default theme
const defaultPicker = new Datex("#default", {
  // Uses default theme automatically
});

// Bootstrap theme
const bootstrapPicker = new Datex("#bootstrap", {
  theme: BOOTSTRAP_THEME,
});

// Material theme
const materialPicker = new Datex("#material", {
  theme: MATERIAL_THEME,
});
```

### Locale Configuration

```javascript
import { Datex, SPANISH_LOCALE } from "datex";

// English (default)
const englishPicker = new Datex("#english", {
  locale: {
    format: "MM/DD/YYYY",
    separator: " - ",
    applyLabel: "Apply",
    cancelLabel: "Cancel",
    customRangeLabel: "Custom Range",
    daysOfWeek: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
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

// Spanish
const spanishPicker = new Datex("#spanish", {
  locale: SPANISH_LOCALE,
});
```

### Positioning Options

```javascript
// Opens to the center (default)
const centerPicker = new Datex("#center", {
  opens: "center",
});

// Opens to the left
const leftPicker = new Datex("#left", {
  opens: "left",
});

// Opens to the right
const rightPicker = new Datex("#right", {
  opens: "right",
});

// Drops down (default)
const downPicker = new Datex("#down", {
  drops: "down",
});

// Drops up
const upPicker = new Datex("#up", {
  drops: "up",
});

// Auto positioning
const autoPicker = new Datex("#auto", {
  drops: "auto",
});
```

### Complete Configuration Example

```javascript
import { Datex, MATERIAL_THEME, SPANISH_LOCALE } from "datex";

const comprehensivePicker = new Datex(
  "#comprehensive",
  {
    // Date constraints
    startDate: new Date("2024-01-01"),
    endDate: new Date("2024-01-31"),
    minDate: new Date("2024-01-01"),
    maxDate: new Date("2024-12-31"),
    maxSpan: { days: 90 },

    // Behavior
    autoApply: false,
    singleDatePicker: false,
    showDropdowns: true,
    linkedCalendars: true,
    autoUpdateInput: true,
    alwaysShowCalendars: true,

    // Time picker
    timePicker: true,
    timePicker24Hour: true,
    timePickerIncrement: 15,
    timePickerSeconds: false,

    // Positioning
    opens: "center",
    drops: "auto",

    // Styling
    theme: MATERIAL_THEME,
    locale: SPANISH_LOCALE,

    // Ranges
    ranges: {
      Hoy: [new Date(), new Date()],
      Ayer: [
        new Date(Date.now() - 24 * 60 * 60 * 1000),
        new Date(Date.now() - 24 * 60 * 60 * 1000),
      ],
      "Últimos 7 días": [
        new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
        new Date(),
      ],
      "Últimos 30 días": [
        new Date(Date.now() - 29 * 24 * 60 * 60 * 1000),
        new Date(),
      ],
    },
  },
  (startDate, endDate, label) => {
    console.log("Selected:", startDate, endDate, label);
  }
);
```

## Live Examples

For interactive examples, check out our [CodePen collection](https://codepen.io/collection/datex) or create your own:

### HTML Setup

```html
<!DOCTYPE html>
<html>
  <head>
    <title>DateX Example</title>
  </head>
  <body>
    <input type="text" id="daterange" placeholder="Select date range" />

    <script type="module">
      import {
        Datex,
        MATERIAL_THEME,
      } from "https://unpkg.com/datex@latest/dist/index.esm.js";

      const picker = new Datex("#daterange", {
        theme: MATERIAL_THEME,
        ranges: {
          Today: [new Date(), new Date()],
          "Last 7 Days": [
            new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
            new Date(),
          ],
        },
      });
    </script>
  </body>
</html>
```

## Configuration Examples

### Basic Date Range Picker

```javascript
import { Datex } from "datex";

const basicPicker = new Datex(
  "#daterange",
  {
    // Default configuration
  },
  (startDate, endDate, label) => {
    console.log("Selected:", startDate, endDate, label);
  }
);
```

### Auto Apply Mode

```javascript
const autoApplyPicker = new Datex("#auto-apply", {
  autoApply: true, // No Apply/Cancel buttons
});
```

### Single Date Selection

```javascript
const singlePicker = new Datex("#single-date", {
  singleDatePicker: true,
});
```

### With Time Picker

```javascript
import { Datex, SPANISH_LOCALE_WITH_TIME } from "datex";

const timePicker = new Datex("#datetime", {
  timePicker: true,
  timePicker24Hour: true,
  timePickerIncrement: 15,
  locale: SPANISH_LOCALE_WITH_TIME,
});
```

### Different Themes

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

### Spanish Localization

```javascript
import { Datex, SPANISH_LOCALE } from "datex";

const spanishPicker = new Datex("#spanish", {
  locale: SPANISH_LOCALE,
  ranges: {
    Hoy: [new Date(), new Date()],
    Ayer: [
      new Date(Date.now() - 24 * 60 * 60 * 1000),
      new Date(Date.now() - 24 * 60 * 60 * 1000),
    ],
    "Últimos 7 días": [
      new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
      new Date(),
    ],
  },
});
```

## Try It Yourself

Create your own DateX implementation by copying any of the examples above into your project. For a quick start:

1. Install DateX: `npm install datex`
2. Import and initialize: `import { Datex } from 'datex'`
3. Create your picker: `new Datex('#your-input')`

## Online Playground

For interactive testing, you can use online code editors:

- [CodePen](https://codepen.io) - Create a new pen and import DateX via CDN
- [JSFiddle](https://jsfiddle.net) - Test DateX configurations quickly
- [StackBlitz](https://stackblitz.com) - Full development environment

### CDN Usage

```html
<script type="module">
  import {
    Datex,
    MATERIAL_THEME,
  } from "https://unpkg.com/datex@latest/dist/index.esm.js";

  const picker = new Datex("#daterange", {
    theme: MATERIAL_THEME,
  });
</script>
```

## Next Steps

Ready to implement DateX in your project? Check out these resources:

- [Getting Started](/guide/getting-started) - Quick setup guide
- [Basic Examples](/examples/basic) - Common usage patterns
- [Framework Integration](/examples/frameworks) - React, Vue, Angular examples
- [API Reference](/api/options) - Complete configuration options

## Need Help?

- [GitHub Issues](https://github.com/senguanasoft/datex/issues) - Report bugs or request features
- [Documentation](/guide/getting-started) - Comprehensive guides and examples
- [Contributing](/contributing) - Help improve DateX
