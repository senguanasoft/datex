# Types API Reference

Complete TypeScript type definitions for DateX.

## Core Types

### Datex

The main DateX class.

```typescript
class Datex {
  constructor(
    element: HTMLElement | string,
    options?: DatexOptions,
    callback?: DatexCallback
  );

  // Core methods
  show(): void;
  hide(): void;
  toggle(): void;

  // Date management
  getStartDate(): Date;
  getEndDate(): Date | null;
  setStartDate(date: Date): void;
  setEndDate(date: Date): void;

  // Theme management
  setTheme(theme: DatexTheme): void;
  getCurrentTheme(): DatexTheme;
  refreshTheme(): void;

  // Range management
  updateRanges(ranges: Record<string, [Date, Date]>): void;

  // Cleanup
  remove(): void;

  // Debug
  testDropdowns(): void;
}
```

### DatexOptions

Configuration options for DateX instances.

```typescript
interface DatexOptions {
  // Date constraints
  startDate?: Date;
  endDate?: Date;
  minDate?: Date | null;
  maxDate?: Date | null;
  minYear?: number;
  maxYear?: number;
  maxSpan?: { days?: number } | null;

  // Behavior options
  autoApply?: boolean;
  singleDatePicker?: boolean;
  showDropdowns?: boolean;
  linkedCalendars?: boolean;
  autoUpdateInput?: boolean;
  alwaysShowCalendars?: boolean;
  showCustomRangeLabel?: boolean;

  // Time picker options
  timePicker?: boolean;
  timePicker24Hour?: boolean;
  timePickerIncrement?: number;
  timePickerSeconds?: boolean;

  // Predefined ranges
  ranges?: Record<string, [Date, Date]>;

  // Positioning
  opens?: "left" | "right" | "center";
  drops?: "up" | "down" | "auto";

  // Localization
  locale?: DatexLocale;

  // Styling
  buttonClasses?: string;
  applyButtonClasses?: string;
  cancelButtonClasses?: string;
  theme?: DatexTheme;
}
```

### DatexLocale

Localization configuration.

```typescript
interface DatexLocale {
  format: string;
  separator: string;
  applyLabel: string;
  cancelLabel: string;
  customRangeLabel: string;
  daysOfWeek: string[];
  monthNames: string[];
  firstDay: number; // 0 = Sunday, 1 = Monday
}
```

### DatexTheme

Theme configuration for styling.

```typescript
interface DatexTheme {
  // Colors
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

  // Typography
  fontSize?: string;
  fontFamily?: string;

  // Layout
  borderRadius?: string;
}
```

### DatexCallback

Callback function type for date selection.

```typescript
type DatexCallback = (startDate: Date, endDate: Date, label?: string) => void;
```

## Event Types

### DatexEvent

Base interface for all DateX events.

```typescript
interface DatexEvent extends CustomEvent {
  detail: Datex;
  target: HTMLElement;
}
```

### Event Type Definitions

```typescript
// Event name constants
type DatexEventType =
  | "show.daterangepicker"
  | "hide.daterangepicker"
  | "apply.daterangepicker"
  | "cancel.daterangepicker"
  | "outsideClick.daterangepicker"
  | "showCalendar.daterangepicker"
  | "hideCalendar.daterangepicker";

// Event handler type
type DatexEventHandler = (event: DatexEvent) => void;
```

## Utility Types

### DateRange

Represents a date range.

```typescript
interface DateRange {
  start: Date;
  end: Date;
  label?: string;
}
```

### DatexState

Internal state interface (for advanced usage).

```typescript
interface DatexState {
  startDate: Date;
  endDate: Date | null;
  oldStartDate: Date;
  oldEndDate: Date | null;
  isShowing: boolean;
  chosenLabel: string | null;
  hoverDate: Date | null;
}
```

### CalendarState

Calendar view state.

```typescript
interface CalendarState {
  month: Date;
  calendar: Date[][];
}
```

## Built-in Constants

### Default Theme

```typescript
const DEFAULT_THEME: DatexTheme = {
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

### Bootstrap Theme

```typescript
const BOOTSTRAP_THEME: DatexTheme = {
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

### Material Theme

```typescript
const MATERIAL_THEME: DatexTheme = {
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

### Spanish Locale

```typescript
const SPANISH_LOCALE: DatexLocale = {
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
  firstDay: 1,
};
```

### Spanish Locale with Time

```typescript
const SPANISH_LOCALE_WITH_TIME: DatexLocale = {
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
  firstDay: 1,
};
```

## Generic Types

### Theme Builder

```typescript
type ThemeBuilder<T extends Partial<DatexTheme>> = T & {
  build(): DatexTheme;
};

// Usage example
function createThemeBuilder<T extends Partial<DatexTheme>>(
  baseTheme: T
): ThemeBuilder<T> {
  return {
    ...baseTheme,
    build(): DatexTheme {
      return { ...DEFAULT_THEME, ...baseTheme };
    },
  };
}
```

### Locale Builder

```typescript
type LocaleBuilder<T extends Partial<DatexLocale>> = T & {
  build(): DatexLocale;
};
```

### Options Builder

```typescript
type OptionsBuilder<T extends Partial<DatexOptions>> = T & {
  withTheme(theme: DatexTheme): OptionsBuilder<T & { theme: DatexTheme }>;
  withLocale(locale: DatexLocale): OptionsBuilder<T & { locale: DatexLocale }>;
  withRanges(
    ranges: Record<string, [Date, Date]>
  ): OptionsBuilder<T & { ranges: Record<string, [Date, Date]> }>;
  build(): DatexOptions;
};
```

## Type Guards

### Date Validation

```typescript
function isValidDate(date: unknown): date is Date {
  return date instanceof Date && !isNaN(date.getTime());
}

function isDateRange(range: unknown): range is [Date, Date] {
  return (
    Array.isArray(range) &&
    range.length === 2 &&
    isValidDate(range[0]) &&
    isValidDate(range[1])
  );
}
```

### Theme Validation

```typescript
function isValidTheme(theme: unknown): theme is DatexTheme {
  return typeof theme === "object" && theme !== null;
}

function hasRequiredThemeProperties(
  theme: Partial<DatexTheme>
): theme is DatexTheme {
  const required: (keyof DatexTheme)[] = [
    "primaryColor",
    "backgroundColor",
    "textColor",
    "borderColor",
  ];

  return required.every(
    (prop) => prop in theme && typeof theme[prop] === "string"
  );
}
```

### Locale Validation

```typescript
function isValidLocale(locale: unknown): locale is DatexLocale {
  if (typeof locale !== "object" || locale === null) return false;

  const l = locale as Partial<DatexLocale>;

  return (
    typeof l.format === "string" &&
    typeof l.separator === "string" &&
    typeof l.applyLabel === "string" &&
    typeof l.cancelLabel === "string" &&
    typeof l.customRangeLabel === "string" &&
    Array.isArray(l.daysOfWeek) &&
    l.daysOfWeek.length === 7 &&
    Array.isArray(l.monthNames) &&
    l.monthNames.length === 12 &&
    typeof l.firstDay === "number" &&
    l.firstDay >= 0 &&
    l.firstDay <= 6
  );
}
```

## Advanced Types

### Conditional Types

```typescript
// Theme with required properties
type RequiredTheme<T extends keyof DatexTheme> = DatexTheme & Required<Pick<DatexTheme, T>>;

// Options with specific requirements
type TimePicker Options = DatexOptions & {
  timePicker: true;
  timePicker24Hour?: boolean;
  timePickerIncrement?: number;
  timePickerSeconds?: boolean;
};

type SingleDatePickerOptions = DatexOptions & {
  singleDatePicker: true;
  ranges?: never; // Ranges not allowed with single date picker
};
```

### Mapped Types

```typescript
// Make all theme properties required
type CompleteTheme = Required<DatexTheme>;

// Make all options optional except specific ones
type MinimalOptions = Partial<DatexOptions> &
  Required<Pick<DatexOptions, "startDate" | "endDate">>;

// Theme with only color properties
type ColorTheme = Pick<
  DatexTheme,
  | "primaryColor"
  | "secondaryColor"
  | "backgroundColor"
  | "borderColor"
  | "textColor"
  | "hoverColor"
  | "selectedColor"
  | "rangeColor"
  | "todayColor"
  | "disabledColor"
  | "applyButtonColor"
  | "cancelButtonColor"
>;
```

### Template Literal Types

```typescript
// Event names as template literals
type DatexEventName = `${string}.daterangepicker`;

// CSS color values
type CSSColor =
  | `#${string}`
  | `rgb(${string})`
  | `rgba(${string})`
  | `hsl(${string})`
  | `hsla(${string})`;

// Theme with CSS color validation
type ValidatedTheme = {
  [K in keyof DatexTheme]: K extends "fontSize" | "fontFamily" | "borderRadius"
    ? string
    : K extends string
    ? CSSColor
    : DatexTheme[K];
};
```

## Module Declarations

### Global Types

```typescript
declare global {
  interface HTMLElementEventMap {
    "show.daterangepicker": DatexEvent;
    "hide.daterangepicker": DatexEvent;
    "apply.daterangepicker": DatexEvent;
    "cancel.daterangepicker": DatexEvent;
    "outsideClick.daterangepicker": DatexEvent;
    "showCalendar.daterangepicker": DatexEvent;
    "hideCalendar.daterangepicker": DatexEvent;
  }
}
```

### Module Exports

```typescript
declare module "datex" {
  export class Datex {
    constructor(
      element: HTMLElement | string,
      options?: DatexOptions,
      callback?: DatexCallback
    );

    show(): void;
    hide(): void;
    toggle(): void;
    getStartDate(): Date;
    getEndDate(): Date | null;
    setStartDate(date: Date): void;
    setEndDate(date: Date): void;
    setTheme(theme: DatexTheme): void;
    getCurrentTheme(): DatexTheme;
    refreshTheme(): void;
    updateRanges(ranges: Record<string, [Date, Date]>): void;
    remove(): void;
    testDropdowns(): void;
  }

  export interface DatexOptions {
    /* ... */
  }
  export interface DatexLocale {
    /* ... */
  }
  export interface DatexTheme {
    /* ... */
  }
  export type DatexCallback = (
    startDate: Date,
    endDate: Date,
    label?: string
  ) => void;

  export const DEFAULT_THEME: DatexTheme;
  export const BOOTSTRAP_THEME: DatexTheme;
  export const MATERIAL_THEME: DatexTheme;
  export const SPANISH_LOCALE: DatexLocale;
  export const SPANISH_LOCALE_WITH_TIME: DatexLocale;
}
```

## Usage Examples

### Type-Safe Configuration

```typescript
import { Datex, DatexOptions, MATERIAL_THEME, SPANISH_LOCALE } from "datex";

const options: DatexOptions = {
  startDate: new Date("2024-01-01"),
  endDate: new Date("2024-01-31"),
  timePicker: true,
  theme: MATERIAL_THEME,
  locale: SPANISH_LOCALE,
  ranges: {
    Hoy: [new Date(), new Date()],
    "Esta semana": [new Date(Date.now() - 6 * 24 * 60 * 60 * 1000), new Date()],
  },
};

const picker = new Datex("#daterange", options, (start, end, label) => {
  console.log("Selected:", start, end, label);
});
```

### Custom Theme with Type Safety

```typescript
import { DatexTheme, DEFAULT_THEME } from "datex";

const customTheme: DatexTheme = {
  ...DEFAULT_THEME,
  primaryColor: "#ff6b6b",
  selectedColor: "#ff6b6b",
  applyButtonColor: "#51cf66",
  cancelButtonColor: "#ff8787",
};

// Type error if invalid color format
// const invalidTheme: DatexTheme = {
//   primaryColor: 'not-a-color' // TypeScript error
// };
```

### Event Handling with Types

```typescript
import { DatexEvent } from "datex";

const element = document.getElementById("daterange")!;

element.addEventListener("apply.daterangepicker", (event: DatexEvent) => {
  const picker = event.detail;
  const startDate: Date = picker.getStartDate();
  const endDate: Date | null = picker.getEndDate();

  if (endDate) {
    console.log("Range selected:", startDate, endDate);
  }
});
```

## Next Steps

- Explore [examples](/examples/basic) with TypeScript
- Learn about [framework integration](/examples/frameworks)
- Check out [advanced usage patterns](/guide/custom-themes)
