# Basic Examples

Collection of basic DateX usage examples to get you started quickly.

## Simple Date Range Picker

The most basic implementation with default settings:

```html
<input type="text" id="basic-daterange" placeholder="Select date range" />
```

```javascript
import { Datex } from "datex";

const picker = new Datex(
  "#basic-daterange",
  {},
  (startDate, endDate, label) => {
    console.log("Selected:", startDate, endDate, label);
  }
);
```

## Single Date Picker

For selecting just one date instead of a range:

```html
<input type="text" id="single-date" placeholder="Select a date" />
```

```javascript
const singlePicker = new Datex(
  "#single-date",
  {
    singleDatePicker: true,
  },
  (startDate, endDate) => {
    console.log("Selected date:", startDate);
  }
);
```

## Auto Apply

Automatically apply selection without requiring the Apply button:

```html
<input type="text" id="auto-apply" placeholder="Click to select" />
```

```javascript
const autoApplyPicker = new Datex(
  "#auto-apply",
  {
    autoApply: true,
  },
  (startDate, endDate) => {
    console.log("Auto applied:", startDate, endDate);
  }
);
```

## With Predefined Ranges

Add common date ranges for quick selection:

```html
<input type="text" id="with-ranges" placeholder="Select or choose range" />
```

```javascript
const rangesPicker = new Datex(
  "#with-ranges",
  {
    ranges: {
      Today: [new Date(), new Date()],
      Yesterday: [
        new Date(Date.now() - 24 * 60 * 60 * 1000),
        new Date(Date.now() - 24 * 60 * 60 * 1000),
      ],
      "Last 7 Days": [
        new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
        new Date(),
      ],
      "Last 30 Days": [
        new Date(Date.now() - 29 * 24 * 60 * 60 * 1000),
        new Date(),
      ],
      "This Month": [
        new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
      ],
      "Last Month": [
        new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1),
        new Date(new Date().getFullYear(), new Date().getMonth(), 0),
      ],
    },
  },
  (startDate, endDate, label) => {
    console.log("Selected range:", label || "Custom", startDate, endDate);
  }
);
```

## Date Constraints

Limit selectable dates with min/max constraints:

```html
<input type="text" id="constrained-dates" placeholder="Limited date range" />
```

```javascript
const constrainedPicker = new Datex(
  "#constrained-dates",
  {
    minDate: new Date("2024-01-01"),
    maxDate: new Date("2024-12-31"),
    maxSpan: { days: 30 }, // Maximum 30-day range
  },
  (startDate, endDate) => {
    console.log("Constrained selection:", startDate, endDate);
  }
);
```

## Different Themes

### Bootstrap Theme

```html
<input type="text" id="bootstrap-theme" placeholder="Bootstrap styled" />
```

```javascript
import { Datex, BOOTSTRAP_THEME } from "datex";

const bootstrapPicker = new Datex("#bootstrap-theme", {
  theme: BOOTSTRAP_THEME,
});
```

### Material Theme

```html
<input type="text" id="material-theme" placeholder="Material styled" />
```

```javascript
import { Datex, MATERIAL_THEME } from "datex";

const materialPicker = new Datex("#material-theme", {
  theme: MATERIAL_THEME,
});
```

### Custom Theme

```html
<input type="text" id="custom-theme" placeholder="Custom styled" />
```

```javascript
const customTheme = {
  primaryColor: "#ff6b6b",
  backgroundColor: "#ffffff",
  textColor: "#333333",
  borderColor: "#dddddd",
  selectedColor: "#ff6b6b",
  rangeColor: "#ffe0e0",
  applyButtonColor: "#51cf66",
  cancelButtonColor: "#ff8787",
  borderRadius: "8px",
  fontSize: "14px",
  fontFamily: "Inter, sans-serif",
};

const customPicker = new Datex("#custom-theme", {
  theme: customTheme,
});
```

## Spanish Localization

```html
<input
  type="text"
  id="spanish-picker"
  placeholder="Seleccionar rango de fechas"
/>
```

```javascript
import { Datex, SPANISH_LOCALE } from "datex";

const spanishPicker = new Datex("#spanish-picker", {
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
    "Últimos 30 días": [
      new Date(Date.now() - 29 * 24 * 60 * 60 * 1000),
      new Date(),
    ],
  },
});
```

## Time Picker

Enable time selection along with dates:

```html
<input type="text" id="datetime-picker" placeholder="Select date and time" />
```

```javascript
import { Datex, SPANISH_LOCALE_WITH_TIME } from "datex";

const datetimePicker = new Datex(
  "#datetime-picker",
  {
    timePicker: true,
    timePicker24Hour: true,
    timePickerIncrement: 15,
    locale: SPANISH_LOCALE_WITH_TIME,
  },
  (startDate, endDate) => {
    console.log("Selected datetime range:", startDate, endDate);
  }
);
```

## CSS Selector Support

DateX supports various CSS selectors:

```html
<input type="text" class="date-picker" placeholder="Class selector" />
<input type="text" data-datepicker="range" placeholder="Attribute selector" />
<div id="custom-element">Click to select dates</div>
```

```javascript
// Class selector
const classPicker = new Datex(".date-picker");

// Attribute selector
const attrPicker = new Datex('[data-datepicker="range"]');

// Custom element
const customPicker = new Datex(
  "#custom-element",
  {
    autoUpdateInput: false, // Don't update input value for non-input elements
  },
  (startDate, endDate) => {
    document.getElementById(
      "custom-element"
    ).textContent = `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`;
  }
);
```

## Event Handling

Listen to picker events for custom behavior:

```html
<input type="text" id="event-picker" placeholder="Event handling example" />
<div id="event-log"></div>
```

```javascript
const eventPicker = new Datex("#event-picker");
const eventLog = document.getElementById("event-log");

function logEvent(message) {
  const timestamp = new Date().toLocaleTimeString();
  eventLog.innerHTML += `<p>[${timestamp}] ${message}</p>`;
}

document
  .getElementById("event-picker")
  .addEventListener("show.daterangepicker", () => {
    logEvent("Picker opened");
  });

document
  .getElementById("event-picker")
  .addEventListener("hide.daterangepicker", () => {
    logEvent("Picker closed");
  });

document
  .getElementById("event-picker")
  .addEventListener("apply.daterangepicker", (event) => {
    const picker = event.detail;
    logEvent(
      `Date applied: ${picker.getStartDate()} to ${picker.getEndDate()}`
    );
  });

document
  .getElementById("event-picker")
  .addEventListener("cancel.daterangepicker", () => {
    logEvent("Selection cancelled");
  });
```

## Form Integration

Integrate with HTML forms:

```html
<form id="booking-form">
  <div class="form-group">
    <label for="checkin-checkout">Check-in / Check-out:</label>
    <input type="text" id="checkin-checkout" name="dates" required />
  </div>

  <div class="form-group">
    <label for="guests">Number of guests:</label>
    <select id="guests" name="guests">
      <option value="1">1 Guest</option>
      <option value="2">2 Guests</option>
      <option value="3">3 Guests</option>
      <option value="4">4+ Guests</option>
    </select>
  </div>

  <button type="submit">Book Now</button>
</form>
```

```javascript
const bookingPicker = new Datex(
  "#checkin-checkout",
  {
    minDate: new Date(), // Can't book in the past
    ranges: {
      Weekend: [
        new Date(Date.now() + (6 - new Date().getDay()) * 24 * 60 * 60 * 1000), // Next Saturday
        new Date(Date.now() + (7 - new Date().getDay()) * 24 * 60 * 60 * 1000), // Next Sunday
      ],
      "Week Stay": [new Date(), new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)],
    },
  },
  (startDate, endDate) => {
    // Calculate number of nights
    const nights = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
    console.log(`Booking for ${nights} nights`);
  }
);

document.getElementById("booking-form").addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);
  const dates = formData.get("dates");
  const guests = formData.get("guests");

  if (!dates) {
    alert("Please select check-in and check-out dates");
    return;
  }

  console.log("Booking submitted:", { dates, guests });
});
```

## Dynamic Configuration

Change picker configuration dynamically:

```html
<div class="config-controls">
  <label> <input type="checkbox" id="toggle-time" /> Enable Time Picker </label>
  <label> <input type="checkbox" id="toggle-auto-apply" /> Auto Apply </label>
  <label>
    Theme:
    <select id="theme-select">
      <option value="default">Default</option>
      <option value="bootstrap">Bootstrap</option>
      <option value="material">Material</option>
    </select>
  </label>
</div>

<input type="text" id="dynamic-picker" placeholder="Dynamic configuration" />
```

```javascript
import { Datex, DEFAULT_THEME, BOOTSTRAP_THEME, MATERIAL_THEME } from "datex";

let dynamicPicker = new Datex("#dynamic-picker");

const themes = {
  default: DEFAULT_THEME,
  bootstrap: BOOTSTRAP_THEME,
  material: MATERIAL_THEME,
};

// Theme selector
document.getElementById("theme-select").addEventListener("change", (event) => {
  const selectedTheme = themes[event.target.value];
  dynamicPicker.setTheme(selectedTheme);
});

// Configuration changes require recreating the picker
function recreatePicker() {
  const timePicker = document.getElementById("toggle-time").checked;
  const autoApply = document.getElementById("toggle-auto-apply").checked;
  const theme = themes[document.getElementById("theme-select").value];

  // Remove old picker
  dynamicPicker.remove();

  // Create new picker with updated config
  dynamicPicker = new Datex("#dynamic-picker", {
    timePicker,
    autoApply,
    theme,
  });
}

document
  .getElementById("toggle-time")
  .addEventListener("change", recreatePicker);
document
  .getElementById("toggle-auto-apply")
  .addEventListener("change", recreatePicker);
```

## Programmatic Control

Control the picker programmatically:

```html
<input
  type="text"
  id="programmatic-picker"
  placeholder="Programmatic control"
/>

<div class="controls">
  <button id="set-today">Set Today</button>
  <button id="set-this-week">Set This Week</button>
  <button id="set-this-month">Set This Month</button>
  <button id="show-picker">Show Picker</button>
  <button id="hide-picker">Hide Picker</button>
</div>
```

```javascript
const programmaticPicker = new Datex("#programmatic-picker");

// Set today
document.getElementById("set-today").addEventListener("click", () => {
  const today = new Date();
  programmaticPicker.setStartDate(today);
  programmaticPicker.setEndDate(today);
});

// Set this week
document.getElementById("set-this-week").addEventListener("click", () => {
  const today = new Date();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay());

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);

  programmaticPicker.setStartDate(startOfWeek);
  programmaticPicker.setEndDate(endOfWeek);
});

// Set this month
document.getElementById("set-this-month").addEventListener("click", () => {
  const today = new Date();
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  programmaticPicker.setStartDate(startOfMonth);
  programmaticPicker.setEndDate(endOfMonth);
});

// Show/hide controls
document.getElementById("show-picker").addEventListener("click", () => {
  programmaticPicker.show();
});

document.getElementById("hide-picker").addEventListener("click", () => {
  programmaticPicker.hide();
});
```

## Multiple Pickers

Manage multiple date pickers on the same page:

```html
<div class="picker-group">
  <label>Start Date Range:</label>
  <input type="text" id="start-range" placeholder="Start range" />
</div>

<div class="picker-group">
  <label>End Date Range:</label>
  <input type="text" id="end-range" placeholder="End range" />
</div>

<div id="selection-summary"></div>
```

```javascript
const startRangePicker = new Datex(
  "#start-range",
  {
    singleDatePicker: true,
  },
  (startDate) => {
    // Update end range minimum date
    endRangePicker.remove();
    createEndRangePicker(startDate);
    updateSummary();
  }
);

let endRangePicker;

function createEndRangePicker(minDate) {
  endRangePicker = new Datex(
    "#end-range",
    {
      singleDatePicker: true,
      minDate: minDate,
    },
    () => {
      updateSummary();
    }
  );
}

function updateSummary() {
  const startDate = startRangePicker.getStartDate();
  const endDate = endRangePicker ? endRangePicker.getStartDate() : null;

  const summary = document.getElementById("selection-summary");

  if (startDate && endDate) {
    const days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
    summary.innerHTML = `
      <h3>Selection Summary</h3>
      <p>Start: ${startDate.toLocaleDateString()}</p>
      <p>End: ${endDate.toLocaleDateString()}</p>
      <p>Duration: ${days} days</p>
    `;
  } else if (startDate) {
    summary.innerHTML = `
      <h3>Selection Summary</h3>
      <p>Start: ${startDate.toLocaleDateString()}</p>
      <p>End: Not selected</p>
    `;
  } else {
    summary.innerHTML = "<p>No dates selected</p>";
  }
}

// Initialize end range picker
createEndRangePicker(new Date());
```

## Next Steps

- Explore [range examples](/examples/ranges) for more complex range configurations
- Learn about [time picker examples](/examples/time-picker)
- Check out [framework integration examples](/examples/frameworks)
- See [custom theme examples](/examples/themes)
