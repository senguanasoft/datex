# Configuration Options

DateX provides extensive configuration options to customize the behavior and appearance of your date picker.

## Basic Options

### startDate

- **Type**: `Date`
- **Default**: `new Date()`
- **Description**: The initial start date

```javascript
new Datex("#picker", {
  startDate: new Date("2024-01-01"),
});
```

### endDate

- **Type**: `Date`
- **Default**: `new Date()`
- **Description**: The initial end date

```javascript
new Datex("#picker", {
  startDate: new Date("2024-01-01"),
  endDate: new Date("2024-01-31"),
});
```

### singleDatePicker

- **Type**: `boolean`
- **Default**: `false`
- **Description**: Show only one calendar for single date selection

```javascript
new Datex("#picker", {
  singleDatePicker: true,
});
```

## Date Limits

### minDate

- **Type**: `Date | null`
- **Default**: `null`
- **Description**: The earliest date a user may select

```javascript
new Datex("#picker", {
  minDate: new Date("2020-01-01"),
});
```

### maxDate

- **Type**: `Date | null`
- **Default**: `null`
- **Description**: The latest date a user may select

```javascript
new Datex("#picker", {
  maxDate: new Date("2025-12-31"),
});
```

### minYear

- **Type**: `number`
- **Default**: `current year - 100`
- **Description**: The minimum year shown in year dropdown

### maxYear

- **Type**: `number`
- **Default**: `current year + 100`
- **Description**: The maximum year shown in year dropdown

### maxSpan

- **Type**: `{ days?: number } | null`
- **Default**: `null`
- **Description**: Maximum number of days in a date range

```javascript
new Datex("#picker", {
  maxSpan: { days: 30 }, // Max 30 days range
});
```

## Behavior Options

### autoApply

- **Type**: `boolean`
- **Default**: `false`
- **Description**: Hide apply/cancel buttons and auto-apply selection

```javascript
new Datex("#picker", {
  autoApply: true,
});
```

### autoUpdateInput

- **Type**: `boolean`
- **Default**: `true`
- **Description**: Update input value automatically when dates change

### alwaysShowCalendars

- **Type**: `boolean`
- **Default**: `false`
- **Description**: Keep calendars visible even when ranges are selected

```javascript
new Datex("#picker", {
  alwaysShowCalendars: true,
});
```

### linkedCalendars

- **Type**: `boolean`
- **Default**: `true`
- **Description**: Link left and right calendar navigation

## Display Options

### showDropdowns

- **Type**: `boolean`
- **Default**: `true`
- **Description**: Show month/year dropdowns in calendar headers

```javascript
new Datex("#picker", {
  showDropdowns: false,
});
```

### showCustomRangeLabel

- **Type**: `boolean`
- **Default**: `true`
- **Description**: Show "Custom Range" option in ranges list

### opens

- **Type**: `'left' | 'right' | 'center'`
- **Default**: `'center'`
- **Description**: Position where the picker opens relative to the input

```javascript
new Datex("#picker", {
  opens: "left",
});
```

### drops

- **Type**: `'up' | 'down' | 'auto'`
- **Default**: `'auto'`
- **Description**: Direction the picker drops relative to the input

## Time Picker Options

### timePicker

- **Type**: `boolean`
- **Default**: `false`
- **Description**: Enable time selection

```javascript
new Datex("#picker", {
  timePicker: true,
  timePicker24Hour: true,
});
```

### timePicker24Hour

- **Type**: `boolean`
- **Default**: `true`
- **Description**: Use 24-hour format instead of 12-hour with AM/PM

### timePickerIncrement

- **Type**: `number`
- **Default**: `1`
- **Description**: Minute increment for time picker

```javascript
new Datex("#picker", {
  timePicker: true,
  timePickerIncrement: 15, // 15-minute increments
});
```

### timePickerSeconds

- **Type**: `boolean`
- **Default**: `false`
- **Description**: Show seconds in time picker

## Predefined Ranges

### ranges

- **Type**: `Record<string, [Date, Date]>`
- **Default**: `{}`
- **Description**: Predefined date ranges

```javascript
new Datex("#picker", {
  ranges: {
    Hoy: [new Date(), new Date()],
    Ayer: [new Date(Date.now() - 86400000), new Date(Date.now() - 86400000)],
    "Esta Semana": [getStartOfWeek(), getEndOfWeek()],
    "Este Mes": [getStartOfMonth(), getEndOfMonth()],
  },
});
```

## Styling Options

### buttonClasses

- **Type**: `string`
- **Default**: `'btn btn-sm'`
- **Description**: CSS classes for buttons

### applyButtonClasses

- **Type**: `string`
- **Default**: `'btn-success'`
- **Description**: CSS classes for apply button

### cancelButtonClasses

- **Type**: `string`
- **Default**: `'btn-danger'`
- **Description**: CSS classes for cancel button

### theme

- **Type**: `DatexTheme`
- **Default**: `DEFAULT_THEME`
- **Description**: Theme configuration object

```javascript
import { Datex, MATERIAL_THEME, BOOTSTRAP_THEME } from "datex";

// Use built-in theme
new Datex("#picker", {
  theme: MATERIAL_THEME,
});

// Custom theme
new Datex("#picker", {
  theme: {
    primaryColor: "#007bff",
    applyButtonColor: "#28a745",
    cancelButtonColor: "#dc3545",
    fontFamily: "Arial, sans-serif",
  },
});
```

## Localization

### locale

- **Type**: `DatexLocale`
- **Default**: English locale
- **Description**: Localization settings

```javascript
import { Datex, SPANISH_LOCALE } from "datex";

new Datex("#picker", {
  locale: SPANISH_LOCALE,
});

// Custom locale
new Datex("#picker", {
  locale: {
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
  },
});
```

## Complete Example

```javascript
import { Datex, SPANISH_LOCALE, MATERIAL_THEME } from "datex";
import "datex/dist/style.css";

const picker = new Datex(
  "#date-picker",
  {
    // Dates
    startDate: new Date(),
    endDate: new Date(),

    // Limits
    minDate: new Date("2020-01-01"),
    maxDate: new Date("2030-12-31"),
    maxSpan: { days: 365 },

    // Behavior
    autoApply: false,
    singleDatePicker: false,
    autoUpdateInput: true,
    alwaysShowCalendars: true,

    // Display
    showDropdowns: true,
    opens: "center",
    drops: "auto",

    // Time
    timePicker: true,
    timePicker24Hour: true,
    timePickerIncrement: 15,

    // Ranges
    ranges: {
      Hoy: [new Date(), new Date()],
      Ayer: [new Date(Date.now() - 86400000), new Date(Date.now() - 86400000)],
      "Esta Semana": [getStartOfWeek(), getEndOfWeek()],
    },

    // Styling
    theme: MATERIAL_THEME,
    locale: SPANISH_LOCALE,
  },
  (start, end, label) => {
    console.log("Selected:", start, end, label);
  }
);
```

## Next Steps

- [Themes](/guide/themes) - Customize appearance
- [Localization](/guide/localization) - Multi-language support
- [Events](/guide/events) - Handle picker events
- [Examples](/examples/basic) - See practical examples
