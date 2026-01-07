# Options API Reference

Complete reference for all DateX configuration options.

## Constructor

```javascript
new Datex(element, options, callback);
```

### Parameters

- **element** `HTMLElement | string` - Target element or CSS selector
- **options** `DatexOptions` - Configuration object (optional)
- **callback** `DatexCallback` - Selection callback function (optional)

## Core Options

### startDate

- **Type**: `Date`
- **Default**: `new Date()` (today)
- **Description**: Initial start date for the picker

```javascript
const picker = new Datex("#picker", {
  startDate: new Date("2024-01-01"),
});
```

### endDate

- **Type**: `Date`
- **Default**: `new Date()` (today)
- **Description**: Initial end date for the picker

```javascript
const picker = new Datex("#picker", {
  startDate: new Date("2024-01-01"),
  endDate: new Date("2024-01-31"),
});
```

### minDate

- **Type**: `Date | null`
- **Default**: `null`
- **Description**: Minimum selectable date

```javascript
const picker = new Datex("#picker", {
  minDate: new Date("2024-01-01"), // Can't select dates before Jan 1, 2024
});
```

### maxDate

- **Type**: `Date | null`
- **Default**: `null`
- **Description**: Maximum selectable date

```javascript
const picker = new Datex("#picker", {
  maxDate: new Date("2024-12-31"), // Can't select dates after Dec 31, 2024
});
```

### minYear

- **Type**: `number`
- **Default**: `currentYear - 100`
- **Description**: Minimum year in year dropdown

### maxYear

- **Type**: `number`
- **Default**: `currentYear + 100`
- **Description**: Maximum year in year dropdown

### maxSpan

- **Type**: `{ days?: number } | null`
- **Default**: `null`
- **Description**: Maximum number of days that can be selected

```javascript
const picker = new Datex("#picker", {
  maxSpan: { days: 30 }, // Maximum 30-day range
});
```

## Behavior Options

### autoApply

- **Type**: `boolean`
- **Default**: `false`
- **Description**: Automatically apply selection without requiring Apply button click

```javascript
const picker = new Datex("#picker", {
  autoApply: true, // No Apply/Cancel buttons
});
```

### singleDatePicker

- **Type**: `boolean`
- **Default**: `false`
- **Description**: Only allow single date selection instead of ranges

```javascript
const picker = new Datex("#picker", {
  singleDatePicker: true,
});
```

### showDropdowns

- **Type**: `boolean`
- **Default**: `true`
- **Description**: Show month/year dropdown selectors

### linkedCalendars

- **Type**: `boolean`
- **Default**: `true`
- **Description**: Link left and right calendar navigation

### autoUpdateInput

- **Type**: `boolean`
- **Default**: `true`
- **Description**: Automatically update input element value

### alwaysShowCalendars

- **Type**: `boolean`
- **Default**: `false`
- **Description**: Always show calendar view, even when ranges are available

### showCustomRangeLabel

- **Type**: `boolean`
- **Default**: `true`
- **Description**: Show "Custom Range" option in ranges list

## Time Picker Options

### timePicker

- **Type**: `boolean`
- **Default**: `false`
- **Description**: Enable time selection

```javascript
const picker = new Datex("#picker", {
  timePicker: true,
});
```

### timePicker24Hour

- **Type**: `boolean`
- **Default**: `true`
- **Description**: Use 24-hour format (false for 12-hour with AM/PM)

### timePickerIncrement

- **Type**: `number`
- **Default**: `1`
- **Description**: Minute increment for time picker (1, 5, 10, 15, 30)

```javascript
const picker = new Datex("#picker", {
  timePicker: true,
  timePickerIncrement: 15, // 15-minute increments
});
```

### timePickerSeconds

- **Type**: `boolean`
- **Default**: `false`
- **Description**: Include seconds in time picker

## Ranges

### ranges

- **Type**: `Record<string, [Date, Date]>`
- **Default**: `{}`
- **Description**: Predefined date ranges

```javascript
const picker = new Datex("#picker", {
  ranges: {
    Today: [new Date(), new Date()],
    Yesterday: [
      new Date(Date.now() - 24 * 60 * 60 * 1000),
      new Date(Date.now() - 24 * 60 * 60 * 1000),
    ],
    "Last 7 Days": [new Date(Date.now() - 6 * 24 * 60 * 60 * 1000), new Date()],
    "Last 30 Days": [
      new Date(Date.now() - 29 * 24 * 60 * 60 * 1000),
      new Date(),
    ],
    "This Month": [
      new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
    ],
  },
});
```

## Positioning Options

### opens

- **Type**: `'left' | 'right' | 'center'`
- **Default**: `'center'`
- **Description**: Where the picker opens relative to the input

```javascript
const picker = new Datex("#picker", {
  opens: "left", // Opens to the left of the input
});
```

### drops

- **Type**: `'up' | 'down' | 'auto'`
- **Default**: `'auto'`
- **Description**: Whether picker drops up or down

```javascript
const picker = new Datex("#picker", {
  drops: "up", // Always drop upward
});
```

## Localization

### locale

- **Type**: `DatexLocale`
- **Default**: `SPANISH_LOCALE`
- **Description**: Localization settings

```javascript
import { SPANISH_LOCALE, SPANISH_LOCALE_WITH_TIME } from "datex";

const picker = new Datex("#picker", {
  locale: SPANISH_LOCALE_WITH_TIME,
});

// Custom locale
const customLocale = {
  format: "DD/MM/YYYY",
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
  firstDay: 0, // 0 = Sunday, 1 = Monday
};
```

## Styling Options

### buttonClasses

- **Type**: `string`
- **Default**: `'btn btn-sm'`
- **Description**: CSS classes for buttons

### applyButtonClasses

- **Type**: `string`
- **Default**: `'btn-success'`
- **Description**: CSS classes for Apply button

### cancelButtonClasses

- **Type**: `string`
- **Default**: `'btn-danger'`
- **Description**: CSS classes for Cancel button

### theme

- **Type**: `DatexTheme`
- **Default**: `DEFAULT_THEME`
- **Description**: Theme configuration

```javascript
import { BOOTSTRAP_THEME, MATERIAL_THEME } from "datex";

const picker = new Datex("#picker", {
  theme: MATERIAL_THEME,
});

// Custom theme
const customTheme = {
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
  borderRadius: "8px",
  fontSize: "14px",
  fontFamily: "Inter, system-ui, sans-serif",
};
```

## Type Definitions

### DatexOptions

```typescript
interface DatexOptions {
  startDate?: Date;
  endDate?: Date;
  minDate?: Date | null;
  maxDate?: Date | null;
  minYear?: number;
  maxYear?: number;
  maxSpan?: { days?: number } | null;
  autoApply?: boolean;
  singleDatePicker?: boolean;
  showDropdowns?: boolean;
  linkedCalendars?: boolean;
  autoUpdateInput?: boolean;
  alwaysShowCalendars?: boolean;
  showCustomRangeLabel?: boolean;
  timePicker?: boolean;
  timePicker24Hour?: boolean;
  timePickerIncrement?: number;
  timePickerSeconds?: boolean;
  ranges?: Record<string, [Date, Date]>;
  opens?: "left" | "right" | "center";
  drops?: "up" | "down" | "auto";
  locale?: DatexLocale;
  buttonClasses?: string;
  applyButtonClasses?: string;
  cancelButtonClasses?: string;
  theme?: DatexTheme;
}
```

### DatexLocale

```typescript
interface DatexLocale {
  format: string;
  separator: string;
  applyLabel: string;
  cancelLabel: string;
  customRangeLabel: string;
  daysOfWeek: string[];
  monthNames: string[];
  firstDay: number;
}
```

### DatexTheme

```typescript
interface DatexTheme {
  primaryColor?: string;
  secondaryColor?: string;
  backgroundColor?: string;
  borderColor?: string;
  textColor?: string;
  hoverColor?: string;
  selectedColor?: string;
  rangeColor?: string;
  todayColor?: string;
  disabledColor?: string;
  applyButtonColor?: string;
  cancelButtonColor?: string;
  borderRadius?: string;
  fontSize?: string;
  fontFamily?: string;
}
```

### DatexCallback

```typescript
type DatexCallback = (startDate: Date, endDate: Date, label?: string) => void;
```

## Built-in Themes

### DEFAULT_THEME

```javascript
import { DEFAULT_THEME } from "datex";

const theme = {
  primaryColor: "#357ebd",
  secondaryColor: "#ccc",
  backgroundColor: "#ffffff",
  borderColor: "#ddd",
  textColor: "#000000",
  hoverColor: "#eee",
  selectedColor: "#357ebd",
  rangeColor: "#ebf4f8",
  todayColor: "#357ebd",
  disabledColor: "#999",
  applyButtonColor: "#357ebd",
  cancelButtonColor: "#999",
  borderRadius: "4px",
  fontSize: "15px",
  fontFamily: "arial",
};
```

### BOOTSTRAP_THEME

```javascript
import { BOOTSTRAP_THEME } from "datex";

const theme = {
  primaryColor: "#0d6efd",
  secondaryColor: "#6c757d",
  backgroundColor: "#ffffff",
  borderColor: "#dee2e6",
  textColor: "#212529",
  hoverColor: "#e9ecef",
  selectedColor: "#0d6efd",
  rangeColor: "#cfe2ff",
  todayColor: "#0d6efd",
  disabledColor: "#adb5bd",
  applyButtonColor: "#198754",
  cancelButtonColor: "#dc3545",
  borderRadius: "6px",
  fontSize: "14px",
  fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
};
```

### MATERIAL_THEME

```javascript
import { MATERIAL_THEME } from "datex";

const theme = {
  primaryColor: "#1976d2",
  secondaryColor: "#757575",
  backgroundColor: "#ffffff",
  borderColor: "#e0e0e0",
  textColor: "#212121",
  hoverColor: "#f5f5f5",
  selectedColor: "#1976d2",
  rangeColor: "#e3f2fd",
  todayColor: "#1976d2",
  disabledColor: "#bdbdbd",
  applyButtonColor: "#4caf50",
  cancelButtonColor: "#f44336",
  borderRadius: "4px",
  fontSize: "14px",
  fontFamily: 'Roboto, "Helvetica Neue", Arial, sans-serif',
};
```

## Built-in Locales

### SPANISH_LOCALE

```javascript
import { SPANISH_LOCALE } from "datex";

const locale = {
  format: "DD/MM/YYYY",
  separator: " - ",
  applyLabel: "Aplicar",
  cancelLabel: "Cancelar",
  customRangeLabel: "Rango Personalizado",
  daysOfWeek: ["Lu", "Ma", "Mi", "Ju", "Vi", "Sa", "Do"],
  monthNames: [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ],
  firstDay: 1, // Monday
};
```

### SPANISH_LOCALE_WITH_TIME

```javascript
import { SPANISH_LOCALE_WITH_TIME } from "datex";

const locale = {
  format: "DD/MM/YYYY HH:mm",
  separator: " - ",
  applyLabel: "Aplicar",
  cancelLabel: "Cancelar",
  customRangeLabel: "Rango Personalizado",
  daysOfWeek: ["Lu", "Ma", "Mi", "Ju", "Vi", "Sa", "Do"],
  monthNames: [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ],
  firstDay: 1, // Monday
};
```

## Usage Examples

### Complete Configuration

```javascript
import { Datex, MATERIAL_THEME, SPANISH_LOCALE_WITH_TIME } from "datex";

const picker = new Datex(
  "#comprehensive-picker",
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
    locale: SPANISH_LOCALE_WITH_TIME,

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
    },
  },
  (startDate, endDate, label) => {
    console.log("Selected:", startDate, endDate, label);
  }
);
```

## Next Steps

- Learn about [methods API](/api/methods)
- Explore [events API](/api/events)
- Check out [type definitions](/api/types)
