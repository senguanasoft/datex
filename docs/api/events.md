# Events API Reference

Complete reference for all DateX events and event handling.

## Event System

DateX uses the standard DOM event system with custom events that bubble up through the DOM tree. All events are dispatched on the target element and include the DateX instance in the `event.detail` property.

## Event Types

### show.daterangepicker

Fired when the date picker is opened.

**Event Detail**: `Datex` instance

```javascript
element.addEventListener("show.daterangepicker", (event) => {
  const picker = event.detail;
  console.log("Picker opened");
  console.log("Current start date:", picker.getStartDate());
});
```

**Use Cases**:

- Initialize data when picker opens
- Track analytics events
- Show loading states
- Focus management

### hide.daterangepicker

Fired when the date picker is closed.

**Event Detail**: `Datex` instance

```javascript
element.addEventListener("hide.daterangepicker", (event) => {
  const picker = event.detail;
  console.log("Picker closed");
  console.log("Final selection:", picker.getStartDate(), picker.getEndDate());
});
```

**Use Cases**:

- Save user preferences
- Clean up temporary states
- Update UI based on final selection
- Analytics tracking

### apply.daterangepicker

Fired when the user applies a date selection (clicks Apply button or when autoApply is enabled).

**Event Detail**: `Datex` instance

```javascript
element.addEventListener("apply.daterangepicker", (event) => {
  const picker = event.detail;
  const startDate = picker.getStartDate();
  const endDate = picker.getEndDate();

  console.log("Date range applied:", startDate, endDate);

  // Update your application state
  updateDateRange(startDate, endDate);
});
```

**Use Cases**:

- Update application state
- Trigger data fetching
- Form validation
- Save selections to backend

### cancel.daterangepicker

Fired when the user cancels the selection (clicks Cancel button or presses Escape).

**Event Detail**: `Datex` instance

```javascript
element.addEventListener("cancel.daterangepicker", (event) => {
  const picker = event.detail;
  console.log("Selection cancelled");

  // Revert to previous state if needed
  revertToPreviousSelection();
});
```

**Use Cases**:

- Revert UI changes
- Clear temporary states
- Analytics tracking
- User feedback

### outsideClick.daterangepicker

Fired when the user clicks outside the picker, causing it to close.

**Event Detail**: `Datex` instance

```javascript
element.addEventListener("outsideClick.daterangepicker", (event) => {
  console.log("Picker closed by outside click");

  // Handle incomplete selections
  handleIncompleteSelection();
});
```

**Use Cases**:

- Handle incomplete selections
- Save draft states
- User behavior analytics

### showCalendar.daterangepicker

Fired when the calendar view is shown (typically when switching from ranges to custom selection).

**Event Detail**: `Datex` instance

```javascript
element.addEventListener("showCalendar.daterangepicker", (event) => {
  console.log("Calendar view shown");

  // Adjust UI for calendar view
  adjustLayoutForCalendar();
});
```

**Use Cases**:

- UI layout adjustments
- Show additional help text
- Analytics tracking

### hideCalendar.daterangepicker

Fired when the calendar view is hidden.

**Event Detail**: `Datex` instance

```javascript
element.addEventListener("hideCalendar.daterangepicker", (event) => {
  console.log("Calendar view hidden");
});
```

**Use Cases**:

- UI cleanup
- Performance optimizations

## Event Handling Patterns

### Basic Event Handling

```javascript
const element = document.getElementById("daterange");
const picker = new Datex(element);

// Single event handler
element.addEventListener("apply.daterangepicker", (event) => {
  const picker = event.detail;
  handleDateSelection(picker.getStartDate(), picker.getEndDate());
});
```

### Multiple Event Handlers

```javascript
class DateRangeHandler {
  constructor(element) {
    this.element = element;
    this.picker = new Datex(element);
    this.setupEventListeners();
  }

  setupEventListeners() {
    this.element.addEventListener(
      "show.daterangepicker",
      this.onShow.bind(this)
    );
    this.element.addEventListener(
      "hide.daterangepicker",
      this.onHide.bind(this)
    );
    this.element.addEventListener(
      "apply.daterangepicker",
      this.onApply.bind(this)
    );
    this.element.addEventListener(
      "cancel.daterangepicker",
      this.onCancel.bind(this)
    );
  }

  onShow(event) {
    console.log("Picker opened");
    this.showLoadingState();
  }

  onHide(event) {
    console.log("Picker closed");
    this.hideLoadingState();
  }

  onApply(event) {
    const picker = event.detail;
    this.processDateSelection(picker.getStartDate(), picker.getEndDate());
  }

  onCancel(event) {
    console.log("Selection cancelled");
    this.revertChanges();
  }

  processDateSelection(startDate, endDate) {
    // Handle the date selection
  }

  showLoadingState() {
    // Show loading indicator
  }

  hideLoadingState() {
    // Hide loading indicator
  }

  revertChanges() {
    // Revert any temporary changes
  }
}
```

### Event Delegation

```javascript
// Handle multiple date pickers with event delegation
document.addEventListener("apply.daterangepicker", (event) => {
  const element = event.target;
  const picker = event.detail;

  // Handle based on element ID or class
  if (element.id === "start-date-picker") {
    handleStartDateSelection(picker);
  } else if (element.id === "end-date-picker") {
    handleEndDateSelection(picker);
  }
});
```

## Advanced Event Handling

### Async Event Handlers

```javascript
element.addEventListener("apply.daterangepicker", async (event) => {
  const picker = event.detail;
  const startDate = picker.getStartDate();
  const endDate = picker.getEndDate();

  try {
    // Show loading state
    showLoadingIndicator();

    // Async operation
    const data = await fetchDataForDateRange(startDate, endDate);
    updateUI(data);
  } catch (error) {
    console.error("Failed to fetch data:", error);
    showErrorMessage("Failed to load data for selected date range");
  } finally {
    hideLoadingIndicator();
  }
});
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
  expensiveOperation(picker.getStartDate(), picker.getEndDate());
}, 300);

element.addEventListener("apply.daterangepicker", debouncedHandler);
```

### Event Validation

```javascript
element.addEventListener("apply.daterangepicker", (event) => {
  const picker = event.detail;
  const startDate = picker.getStartDate();
  const endDate = picker.getEndDate();

  // Validate date range
  if (!isValidDateRange(startDate, endDate)) {
    event.preventDefault(); // Won't actually prevent the event, but good practice
    showValidationError("Invalid date range selected");
    return;
  }

  // Validate business rules
  if (!isWithinBusinessHours(startDate, endDate)) {
    showValidationError("Please select dates within business hours");
    return;
  }

  // Process valid selection
  processValidSelection(startDate, endDate);
});

function isValidDateRange(start, end) {
  return start <= end && end - start <= 30 * 24 * 60 * 60 * 1000; // Max 30 days
}

function isWithinBusinessHours(start, end) {
  const startHour = start.getHours();
  const endHour = end.getHours();
  return startHour >= 9 && endHour <= 17;
}
```

## Event-Driven Architecture

### State Management Integration

```javascript
class DateRangeStore {
  constructor() {
    this.state = {
      currentRange: null,
      isLoading: false,
      error: null,
    };
    this.listeners = [];
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.listeners.forEach((listener) => listener(this.state));
  }

  handleDateRangeEvent(event) {
    const picker = event.detail;

    switch (event.type) {
      case "show.daterangepicker":
        this.setState({ isLoading: true, error: null });
        break;

      case "apply.daterangepicker":
        this.setState({
          currentRange: {
            start: picker.getStartDate(),
            end: picker.getEndDate(),
          },
          isLoading: false,
        });
        break;

      case "cancel.daterangepicker":
        this.setState({ isLoading: false });
        break;

      case "hide.daterangepicker":
        this.setState({ isLoading: false });
        break;
    }
  }
}

// Usage
const store = new DateRangeStore();

// Connect picker to store
const element = document.getElementById("daterange");
["show", "hide", "apply", "cancel"].forEach((eventType) => {
  element.addEventListener(`${eventType}.daterangepicker`, (event) => {
    store.handleDateRangeEvent(event);
  });
});

// Subscribe to state changes
store.subscribe((state) => {
  console.log("State updated:", state);
  updateUI(state);
});
```

### Event Bus Pattern

```javascript
class DateRangeEventBus {
  constructor() {
    this.events = {};
  }

  on(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(callback);
  }

  off(eventName, callback) {
    if (this.events[eventName]) {
      this.events[eventName] = this.events[eventName].filter(
        (cb) => cb !== callback
      );
    }
  }

  emit(eventName, data) {
    if (this.events[eventName]) {
      this.events[eventName].forEach((callback) => callback(data));
    }
  }

  connectPicker(element) {
    element.addEventListener("apply.daterangepicker", (event) => {
      const picker = event.detail;
      this.emit("dateRangeSelected", {
        startDate: picker.getStartDate(),
        endDate: picker.getEndDate(),
        element: element,
      });
    });

    element.addEventListener("cancel.daterangepicker", (event) => {
      this.emit("dateRangeCancelled", { element: element });
    });
  }
}

// Usage
const eventBus = new DateRangeEventBus();

// Connect multiple pickers
eventBus.connectPicker(document.getElementById("picker1"));
eventBus.connectPicker(document.getElementById("picker2"));

// Listen to events
eventBus.on("dateRangeSelected", (data) => {
  console.log("Date range selected:", data);
  updateAnalytics(data);
});

eventBus.on("dateRangeCancelled", (data) => {
  console.log("Date range cancelled:", data);
});
```

## Framework Integration

### React Hook

```javascript
import { useEffect, useRef } from "react";
import { Datex } from "datex";

function useDateRangePicker(options = {}) {
  const elementRef = useRef();
  const pickerRef = useRef();
  const [dateRange, setDateRange] = useState(null);

  useEffect(() => {
    if (elementRef.current) {
      pickerRef.current = new Datex(elementRef.current, options);

      const handleApply = (event) => {
        const picker = event.detail;
        setDateRange({
          start: picker.getStartDate(),
          end: picker.getEndDate(),
        });
      };

      elementRef.current.addEventListener("apply.daterangepicker", handleApply);

      return () => {
        elementRef.current?.removeEventListener(
          "apply.daterangepicker",
          handleApply
        );
        pickerRef.current?.remove();
      };
    }
  }, [options]);

  return { elementRef, dateRange, picker: pickerRef.current };
}

// Usage
function DateRangeComponent() {
  const { elementRef, dateRange } = useDateRangePicker({
    autoApply: true,
  });

  return (
    <div>
      <input ref={elementRef} type="text" />
      {dateRange && (
        <p>
          Selected: {dateRange.start.toLocaleDateString()} -{" "}
          {dateRange.end.toLocaleDateString()}
        </p>
      )}
    </div>
  );
}
```

### Vue Composition API

```javascript
import { ref, onMounted, onUnmounted } from "vue";
import { Datex } from "datex";

export function useDateRangePicker(options = {}) {
  const elementRef = ref();
  const picker = ref();
  const dateRange = ref(null);

  onMounted(() => {
    if (elementRef.value) {
      picker.value = new Datex(elementRef.value, options);

      const handleApply = (event) => {
        const pickerInstance = event.detail;
        dateRange.value = {
          start: pickerInstance.getStartDate(),
          end: pickerInstance.getEndDate(),
        };
      };

      elementRef.value.addEventListener("apply.daterangepicker", handleApply);
    }
  });

  onUnmounted(() => {
    picker.value?.remove();
  });

  return { elementRef, dateRange, picker };
}
```

## Error Handling in Events

```javascript
element.addEventListener("apply.daterangepicker", (event) => {
  try {
    const picker = event.detail;
    const startDate = picker.getStartDate();
    const endDate = picker.getEndDate();

    // Validate dates
    if (!startDate || !endDate) {
      throw new Error("Invalid date selection");
    }

    // Process selection
    processDateSelection(startDate, endDate);
  } catch (error) {
    console.error("Error handling date selection:", error);

    // Show user-friendly error
    showErrorNotification(
      "Failed to process date selection. Please try again."
    );

    // Report to error tracking service
    reportError(error, { context: "daterangepicker_apply" });
  }
});
```

## Performance Considerations

### Event Listener Cleanup

```javascript
class DateRangeManager {
  constructor() {
    this.pickers = new Map();
    this.eventHandlers = new Map();
  }

  addPicker(id, element, options) {
    const picker = new Datex(element, options);

    // Store event handlers for cleanup
    const handlers = {
      apply: (event) => this.handleApply(id, event),
      cancel: (event) => this.handleCancel(id, event),
    };

    element.addEventListener("apply.daterangepicker", handlers.apply);
    element.addEventListener("cancel.daterangepicker", handlers.cancel);

    this.pickers.set(id, picker);
    this.eventHandlers.set(id, { element, handlers });
  }

  removePicker(id) {
    const picker = this.pickers.get(id);
    const eventData = this.eventHandlers.get(id);

    if (picker) {
      picker.remove();
      this.pickers.delete(id);
    }

    if (eventData) {
      const { element, handlers } = eventData;
      element.removeEventListener("apply.daterangepicker", handlers.apply);
      element.removeEventListener("cancel.daterangepicker", handlers.cancel);
      this.eventHandlers.delete(id);
    }
  }

  destroy() {
    // Clean up all pickers and event listeners
    for (const id of this.pickers.keys()) {
      this.removePicker(id);
    }
  }
}
```

## Next Steps

- Learn about [type definitions](/api/types)
- Explore [integration examples](/examples/frameworks)
- Check out [advanced usage patterns](/examples/basic)
