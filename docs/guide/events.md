# Events

DateX provides a comprehensive event system to help you respond to user interactions and picker state changes.

## Event Types

### show.daterangepicker

Fired when the date picker is opened.

```javascript
element.addEventListener("show.daterangepicker", (event) => {
  console.log("Picker opened");
  // event.detail contains the DateX instance
  const picker = event.detail;
});
```

### hide.daterangepicker

Fired when the date picker is closed.

```javascript
element.addEventListener("hide.daterangepicker", (event) => {
  console.log("Picker closed");
});
```

### apply.daterangepicker

Fired when the user clicks the "Apply" button or when `autoApply` is enabled and a valid selection is made.

```javascript
element.addEventListener("apply.daterangepicker", (event) => {
  const picker = event.detail;
  console.log("Applied:", picker.getStartDate(), picker.getEndDate());
});
```

### cancel.daterangepicker

Fired when the user clicks the "Cancel" button or presses Escape.

```javascript
element.addEventListener("cancel.daterangepicker", (event) => {
  console.log("Selection cancelled");
});
```

### outsideClick.daterangepicker

Fired when the user clicks outside the picker, causing it to close.

```javascript
element.addEventListener("outsideClick.daterangepicker", (event) => {
  console.log("Clicked outside picker");
});
```

### showCalendar.daterangepicker

Fired when the calendar view is shown (when switching from ranges to custom selection).

```javascript
element.addEventListener("showCalendar.daterangepicker", (event) => {
  console.log("Calendar view shown");
});
```

### hideCalendar.daterangepicker

Fired when the calendar view is hidden.

```javascript
element.addEventListener("hideCalendar.daterangepicker", (event) => {
  console.log("Calendar view hidden");
});
```

## Event Usage Patterns

### Form Validation

```javascript
const form = document.getElementById("booking-form");
const dateInput = document.getElementById("daterange");

dateInput.addEventListener("apply.daterangepicker", (event) => {
  const picker = event.detail;
  const startDate = picker.getStartDate();
  const endDate = picker.getEndDate();

  // Validate date range
  const daysDiff = (endDate - startDate) / (1000 * 60 * 60 * 24);
  if (daysDiff > 30) {
    alert("Maximum booking period is 30 days");
    return;
  }

  // Enable form submission
  form.querySelector('button[type="submit"]').disabled = false;
});
```

### Analytics Tracking

```javascript
const picker = new Datex("#analytics-date", {}, (startDate, endDate, label) => {
  // Track date selection in analytics
  gtag("event", "date_range_selected", {
    start_date: startDate.toISOString(),
    end_date: endDate.toISOString(),
    range_label: label || "custom",
  });
});

element.addEventListener("show.daterangepicker", () => {
  gtag("event", "date_picker_opened");
});
```

### Dynamic Content Updates

```javascript
const contentArea = document.getElementById("dynamic-content");

element.addEventListener("apply.daterangepicker", (event) => {
  const picker = event.detail;
  const startDate = picker.getStartDate();
  const endDate = picker.getEndDate();

  // Update content based on selected date range
  fetchDataForDateRange(startDate, endDate).then((data) => {
    contentArea.innerHTML = renderData(data);
  });
});
```

### State Management

```javascript
class DateRangeManager {
  constructor() {
    this.currentRange = null;
    this.history = [];
    this.setupPicker();
  }

  setupPicker() {
    const element = document.getElementById("daterange");

    element.addEventListener("apply.daterangepicker", (event) => {
      const picker = event.detail;
      const newRange = {
        start: picker.getStartDate(),
        end: picker.getEndDate(),
        timestamp: Date.now(),
      };

      // Save to history
      if (this.currentRange) {
        this.history.push(this.currentRange);
      }

      this.currentRange = newRange;
      this.onRangeChange(newRange);
    });

    element.addEventListener("cancel.daterangepicker", () => {
      // Restore previous range if cancelled
      if (this.currentRange) {
        this.restoreRange(this.currentRange);
      }
    });
  }

  onRangeChange(range) {
    console.log("Range changed:", range);
    // Implement your state update logic
  }

  restoreRange(range) {
    // Restore the picker to previous state
    this.picker.setStartDate(range.start);
    this.picker.setEndDate(range.end);
  }
}
```

### Loading States

```javascript
const loadingIndicator = document.getElementById("loading");

element.addEventListener("show.daterangepicker", () => {
  // Show loading state while picker initializes
  loadingIndicator.style.display = "block";
});

element.addEventListener("apply.daterangepicker", async (event) => {
  loadingIndicator.style.display = "block";

  try {
    const picker = event.detail;
    await processDateRange(picker.getStartDate(), picker.getEndDate());
  } finally {
    loadingIndicator.style.display = "none";
  }
});
```

## Event Bubbling

All DateX events bubble up through the DOM, allowing you to handle them at parent elements:

```javascript
// Handle all date picker events at document level
document.addEventListener("apply.daterangepicker", (event) => {
  const pickerElement = event.target;
  const picker = event.detail;

  console.log("Date applied on element:", pickerElement.id);
});
```

## Custom Event Data

Events include the DateX instance in the `detail` property:

```javascript
element.addEventListener("apply.daterangepicker", (event) => {
  const picker = event.detail;

  // Access picker methods and properties
  console.log("Start Date:", picker.getStartDate());
  console.log("End Date:", picker.getEndDate());
  console.log("Current Theme:", picker.getCurrentTheme());
});
```

## Best Practices

### Event Cleanup

```javascript
class DatePickerComponent {
  constructor(element) {
    this.element = element;
    this.boundHandlers = new Map();
    this.setupEvents();
  }

  setupEvents() {
    const applyHandler = (event) => this.handleApply(event);
    const cancelHandler = (event) => this.handleCancel(event);

    this.element.addEventListener("apply.daterangepicker", applyHandler);
    this.element.addEventListener("cancel.daterangepicker", cancelHandler);

    // Store references for cleanup
    this.boundHandlers.set("apply", applyHandler);
    this.boundHandlers.set("cancel", cancelHandler);
  }

  destroy() {
    // Clean up event listeners
    this.boundHandlers.forEach((handler, eventType) => {
      this.element.removeEventListener(`${eventType}.daterangepicker`, handler);
    });
    this.boundHandlers.clear();
  }
}
```

### Debounced Event Handling

```javascript
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

const debouncedHandler = debounce((event) => {
  const picker = event.detail;
  updateExpensiveVisualization(picker.getStartDate(), picker.getEndDate());
}, 300);

element.addEventListener("apply.daterangepicker", debouncedHandler);
```

## Framework Integration

### React

```jsx
import { useEffect, useRef } from "react";
import { Datex } from "datex";

function DateRangePicker({ onDateChange }) {
  const inputRef = useRef();
  const pickerRef = useRef();

  useEffect(() => {
    const element = inputRef.current;

    const handleApply = (event) => {
      const picker = event.detail;
      onDateChange(picker.getStartDate(), picker.getEndDate());
    };

    element.addEventListener("apply.daterangepicker", handleApply);

    pickerRef.current = new Datex(element);

    return () => {
      element.removeEventListener("apply.daterangepicker", handleApply);
      pickerRef.current?.remove();
    };
  }, [onDateChange]);

  return <input ref={inputRef} type="text" />;
}
```

### Vue

```vue
<template>
  <input ref="dateInput" type="text" />
</template>

<script>
import { Datex } from "datex";

export default {
  mounted() {
    this.picker = new Datex(this.$refs.dateInput);

    this.$refs.dateInput.addEventListener("apply.daterangepicker", (event) => {
      const picker = event.detail;
      this.$emit("date-change", picker.getStartDate(), picker.getEndDate());
    });
  },

  beforeUnmount() {
    this.picker?.remove();
  },
};
</script>
```

## Next Steps

- Learn about [custom themes](/guide/custom-themes)
- Explore [time picker functionality](/guide/time-picker)
- Check out [accessibility features](/guide/accessibility)
