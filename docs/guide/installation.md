# Installation

This guide covers different ways to install and use DateX in your project.

## Package Managers

### npm

```bash
npm install datex
```

### pnpm

```bash
pnpm add datex
```

### yarn

```bash
yarn add datex
```

## CDN Usage

For quick prototyping or simple projects, you can use DateX directly from a CDN:

### ES Modules (Recommended)

```html
<script type="module">
  import {
    Datex,
    SPANISH_LOCALE,
    MATERIAL_THEME,
  } from "https://unpkg.com/datex@latest/dist/index.esm.js";

  const picker = new Datex("#date-picker", {
    locale: SPANISH_LOCALE,
    theme: MATERIAL_THEME,
  });
</script>
```

### CSS

```html
<link rel="stylesheet" href="https://unpkg.com/datex@latest/dist/style.css" />
```

## Module Systems

### ES Modules (Modern)

```javascript
import { Datex, SPANISH_LOCALE, MATERIAL_THEME } from "datex";
import "datex/dist/style.css";

const picker = new Datex("#picker", {
  locale: SPANISH_LOCALE,
  theme: MATERIAL_THEME,
});
```

### CommonJS (Node.js)

DateX is built as ES modules only. For Node.js environments, use dynamic imports:

```javascript
async function initDatePicker() {
  const { Datex, SPANISH_LOCALE } = await import("datex");

  const picker = new Datex("#picker", {
    locale: SPANISH_LOCALE,
  });
}
```

## Framework Integration

### React

```jsx
import { useEffect, useRef } from "react";
import { Datex, SPANISH_LOCALE } from "datex";
import "datex/dist/style.css";

function DateRangePicker({ onDateChange }) {
  const inputRef = useRef(null);
  const pickerRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      pickerRef.current = new Datex(
        inputRef.current,
        {
          locale: SPANISH_LOCALE,
          autoUpdateInput: true,
          ranges: {
            Hoy: [new Date(), new Date()],
            Ayer: [
              new Date(Date.now() - 86400000),
              new Date(Date.now() - 86400000),
            ],
          },
        },
        (start, end, label) => {
          onDateChange?.(start, end, label);
        }
      );
    }

    return () => {
      // Cleanup if needed
      if (pickerRef.current) {
        // DateX handles cleanup automatically
      }
    };
  }, [onDateChange]);

  return (
    <input
      ref={inputRef}
      type="text"
      placeholder="Seleccionar fechas"
      className="form-control"
    />
  );
}
```

### Vue 3

```vue
<template>
  <input
    ref="dateInput"
    type="text"
    placeholder="Seleccionar fechas"
    class="form-control"
  />
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { Datex, SPANISH_LOCALE } from "datex";
import "datex/dist/style.css";

const dateInput = ref(null);
let picker = null;

const emit = defineEmits(["dateChange"]);

onMounted(() => {
  if (dateInput.value) {
    picker = new Datex(
      dateInput.value,
      {
        locale: SPANISH_LOCALE,
        autoUpdateInput: true,
        ranges: {
          Hoy: [new Date(), new Date()],
          "Esta Semana": [getStartOfWeek(), getEndOfWeek()],
        },
      },
      (start, end, label) => {
        emit("dateChange", { start, end, label });
      }
    );
  }
});

onUnmounted(() => {
  // DateX handles cleanup automatically
});

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
```

### Angular

```typescript
// date-picker.component.ts
import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  Output,
  EventEmitter,
} from "@angular/core";
import { Datex, SPANISH_LOCALE } from "datex";

@Component({
  selector: "app-date-picker",
  template: `
    <input
      #dateInput
      type="text"
      placeholder="Seleccionar fechas"
      class="form-control"
    />
  `,
  styleUrls: ["./date-picker.component.css"],
})
export class DatePickerComponent implements AfterViewInit, OnDestroy {
  @ViewChild("dateInput", { static: false }) dateInput!: ElementRef;
  @Output() dateChange = new EventEmitter<{
    start: Date;
    end: Date;
    label?: string;
  }>();

  private picker: any;

  ngAfterViewInit() {
    this.picker = new Datex(
      this.dateInput.nativeElement,
      {
        locale: SPANISH_LOCALE,
        autoUpdateInput: true,
        ranges: {
          Hoy: [new Date(), new Date()],
          Ayer: [
            new Date(Date.now() - 86400000),
            new Date(Date.now() - 86400000),
          ],
        },
      },
      (start: Date, end: Date, label?: string) => {
        this.dateChange.emit({ start, end, label });
      }
    );
  }

  ngOnDestroy() {
    // DateX handles cleanup automatically
  }
}
```

```css
/* date-picker.component.css */
@import "datex/dist/style.css";
```

## Build Tools

### Vite

DateX works out of the box with Vite:

```javascript
// vite.config.js
import { defineConfig } from "vite";

export default defineConfig({
  // No special configuration needed
});
```

### Webpack

For Webpack projects, ensure CSS loading is configured:

```javascript
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
```

### Rollup

```javascript
// rollup.config.js
import css from "rollup-plugin-css-only";

export default {
  plugins: [css({ output: "bundle.css" })],
};
```

## TypeScript Support

DateX includes full TypeScript definitions. No additional @types packages needed:

```typescript
import { Datex, DatexOptions, DatexTheme, DatexLocale } from "datex";

const options: DatexOptions = {
  startDate: new Date(),
  endDate: new Date(),
  autoApply: true,
  singleDatePicker: false,
};

const picker = new Datex("#picker", options);
```

## Troubleshooting

### CSS Not Loading

Make sure to import the CSS file:

```javascript
import "datex/dist/style.css";
```

### Module Resolution Issues

If you encounter module resolution issues, ensure your bundler supports ES modules:

```json
// package.json
{
  "type": "module"
}
```

### CSS Selector Not Working

DateX supports various CSS selectors:

```javascript
// ✅ These work
new Datex("#my-id");
new Datex(".my-class");
new Datex("[data-picker]");
new Datex('input[type="text"]');

// ❌ This doesn't work
new Datex("nonexistent-element");
```

## Next Steps

- [Getting Started](/guide/getting-started) - Basic usage guide
- [Configuration](/guide/options) - Available options
- [Themes](/guide/themes) - Styling and theming
- [Examples](/examples/basic) - Practical examples
