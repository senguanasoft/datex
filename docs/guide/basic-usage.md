# Basic Usage

Learn the fundamentals of using DateX in your projects.

![Basic Date Range](https://cdn.jsdelivr.net/gh/senguanasoft/datex@main/assets/images/screenshots/basic-range-datex-ui.png)

_Basic date range selection interface_

## Quick Start

The simplest way to use DateX is to create a new instance with an input element:

```javascript
import { Datex } from "datex";

const picker = new Datex("#daterange", {}, (startDate, endDate, label) => {
  console.log("Selected:", startDate, endDate, label);
});
```

## Element Selection

DateX supports multiple ways to select elements:

### By ID

```javascript
// Using ID selector
const picker = new Datex("#my-input");

// Using getElementById (fallback)
const picker = new Datex("my-input");
```

### By CSS Selector

```javascript
// Class selector
const picker = new Datex(".date-picker");

// Attribute selector
const picker = new Datex("[data-date-picker]");

// Complex selector
const picker = new Datex('input[type="text"].date-range');
```

### By DOM Element

```javascript
const element = document.getElementById("daterange");
const picker = new Datex(element);
```

## Basic Configuration

### Single Date Picker

![Single Date Picker](https://cdn.jsdelivr.net/gh/senguanasoft/datex@main/assets/images/screenshots/single-datex.png)

```javascript
const picker = new Datex("#single-date", {
  singleDatePicker: true,
});
```

### Auto Apply

```javascript
const picker = new Datex("#auto-apply", {
  autoApply: true,
});
```

### Date Range with Predefined Ranges

![Range Selection](https://cdn.jsdelivr.net/gh/senguanasoft/datex@main/assets/images/screenshots/range-datex.png)

```javascript
const picker = new Datex("#with-ranges", {
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
  },
});
```

## Working with Callbacks

The callback function receives three parameters:

```javascript
const picker = new Datex("#daterange", {}, (startDate, endDate, label) => {
  // startDate: Date object for the start of the range
  // endDate: Date object for the end of the range
  // label: String label if a predefined range was selected

  console.log("Start:", startDate.toLocaleDateString());
  console.log("End:", endDate.toLocaleDateString());
  console.log("Label:", label || "Custom Range");
});
```

## Input Formatting

DateX automatically formats the input value based on the locale:

```javascript
// English format (MM/DD/YYYY)
const picker = new Datex("#english-dates", {
  locale: {
    format: "MM/DD/YYYY",
    separator: " - ",
  },
});

// Spanish format (DD/MM/YYYY)
const picker = new Datex("#spanish-dates", {
  locale: {
    format: "DD/MM/YYYY",
    separator: " - ",
  },
});
```

## Event Handling

DateX dispatches custom events that you can listen to:

```javascript
const element = document.getElementById("daterange");

element.addEventListener("show.daterangepicker", (e) => {
  console.log("Picker opened");
});

element.addEventListener("hide.daterangepicker", (e) => {
  console.log("Picker closed");
});

element.addEventListener("apply.daterangepicker", (e) => {
  console.log("Date range applied");
});

element.addEventListener("cancel.daterangepicker", (e) => {
  console.log("Selection cancelled");
});
```

## Programmatic Control

### Getting Selected Dates

```javascript
const startDate = picker.getStartDate();
const endDate = picker.getEndDate();
```

### Setting Dates Programmatically

```javascript
picker.setStartDate(new Date("2024-01-01"));
picker.setEndDate(new Date("2024-01-31"));
```

### Show/Hide Picker

```javascript
picker.show();
picker.hide();
picker.toggle();
```

### Cleanup

```javascript
// Remove the picker and clean up event listeners
picker.remove();
```

## Common Patterns

### Form Integration

```html
<form id="date-form">
  <label for="daterange">Select Date Range:</label>
  <input type="text" id="daterange" name="daterange" readonly />
  <button type="submit">Submit</button>
</form>
```

```javascript
const picker = new Datex(
  "#daterange",
  {
    autoUpdateInput: true,
  },
  (startDate, endDate) => {
    // Form will automatically receive the formatted date string
    console.log("Form value:", document.getElementById("daterange").value);
  }
);
```

### Dynamic Range Updates

```javascript
const picker = new Datex("#dynamic-ranges", {
  ranges: {
    "This Week": [getStartOfWeek(), getEndOfWeek()],
    "This Month": [getStartOfMonth(), getEndOfMonth()],
  },
});

// Update ranges dynamically
picker.updateRanges({
  "Q1 2024": [new Date("2024-01-01"), new Date("2024-03-31")],
  "Q2 2024": [new Date("2024-04-01"), new Date("2024-06-30")],
});
```

## Next Steps

- Learn about [advanced options](/guide/options)
- Explore [theming capabilities](/guide/themes)
- Check out [localization features](/guide/localization)
- See [framework integration examples](/examples/frameworks)
