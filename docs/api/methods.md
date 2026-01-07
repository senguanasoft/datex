# Methods API Reference

Complete reference for all DateX instance methods.

## Core Methods

### show()

Opens the date picker.

```javascript
const picker = new Datex("#picker");
picker.show();
```

**Returns**: `void`

### hide()

Closes the date picker.

```javascript
picker.hide();
```

**Returns**: `void`

### toggle()

Toggles the date picker open/closed state.

```javascript
picker.toggle();
```

**Returns**: `void`

## Date Management

### getStartDate()

Returns the currently selected start date.

```javascript
const startDate = picker.getStartDate();
console.log("Start date:", startDate);
```

**Returns**: `Date`

### getEndDate()

Returns the currently selected end date.

```javascript
const endDate = picker.getEndDate();
console.log("End date:", endDate); // null if no end date selected
```

**Returns**: `Date | null`

### setStartDate(date)

Programmatically sets the start date.

```javascript
picker.setStartDate(new Date("2024-01-01"));
```

**Parameters**:

- `date` `Date` - The new start date

**Returns**: `void`

**Example**:

```javascript
// Set start date to beginning of current month
const startOfMonth = new Date();
startOfMonth.setDate(1);
picker.setStartDate(startOfMonth);
```

### setEndDate(date)

Programmatically sets the end date.

```javascript
picker.setEndDate(new Date("2024-01-31"));
```

**Parameters**:

- `date` `Date` - The new end date

**Returns**: `void`

**Example**:

```javascript
// Set end date to end of current month
const endOfMonth = new Date();
endOfMonth.setMonth(endOfMonth.getMonth() + 1, 0);
picker.setEndDate(endOfMonth);
```

## Theme Management

### setTheme(theme)

Dynamically changes the picker theme.

```javascript
import { MATERIAL_THEME, BOOTSTRAP_THEME } from "datex";

// Switch to Material theme
picker.setTheme(MATERIAL_THEME);

// Switch to custom theme
picker.setTheme({
  primaryColor: "#ff6b6b",
  backgroundColor: "#ffffff",
  textColor: "#333333",
});
```

**Parameters**:

- `theme` `DatexTheme` - Theme configuration object

**Returns**: `void`

### getCurrentTheme()

Returns the current theme configuration.

```javascript
const currentTheme = picker.getCurrentTheme();
console.log("Current theme:", currentTheme);
```

**Returns**: `DatexTheme`

### refreshTheme()

Forces the theme to be reapplied. Useful when CSS variables change.

```javascript
// After changing CSS custom properties
document.documentElement.style.setProperty("--primary-color", "#ff0000");
picker.refreshTheme();
```

**Returns**: `void`

## Range Management

### updateRanges(ranges)

Updates the predefined ranges available in the picker.

```javascript
picker.updateRanges({
  "This Week": [getStartOfWeek(), getEndOfWeek()],
  "This Month": [getStartOfMonth(), getEndOfMonth()],
  "This Quarter": [getStartOfQuarter(), getEndOfQuarter()],
});
```

**Parameters**:

- `ranges` `Record<string, [Date, Date]>` - Object with range labels as keys and date arrays as values

**Returns**: `void`

**Example**:

```javascript
// Dynamic ranges that update based on current date
function updateDynamicRanges() {
  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay());

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);

  picker.updateRanges({
    "This Week": [startOfWeek, endOfWeek],
    "Next Week": [
      new Date(startOfWeek.getTime() + 7 * 24 * 60 * 60 * 1000),
      new Date(endOfWeek.getTime() + 7 * 24 * 60 * 60 * 1000),
    ],
  });
}

// Update ranges daily
setInterval(updateDynamicRanges, 24 * 60 * 60 * 1000);
```

## Cleanup

### remove()

Removes the picker from the DOM and cleans up all event listeners.

```javascript
picker.remove();
```

**Returns**: `void`

**Important**: Always call this method when you're done with the picker to prevent memory leaks.

**Example**:

```javascript
// In a React component
useEffect(() => {
  const picker = new Datex("#picker");

  return () => {
    picker.remove(); // Cleanup on unmount
  };
}, []);
```

## Debug Methods

### testDropdowns()

Debug method to test dropdown functionality. Useful for troubleshooting.

```javascript
picker.testDropdowns();
```

**Returns**: `void`

**Note**: This is primarily for development and debugging purposes.

## Method Chaining

Most methods return `void`, but you can create a wrapper for method chaining:

```javascript
class ChainableDatex {
  constructor(element, options, callback) {
    this.picker = new Datex(element, options, callback);
  }

  setStartDate(date) {
    this.picker.setStartDate(date);
    return this;
  }

  setEndDate(date) {
    this.picker.setEndDate(date);
    return this;
  }

  setTheme(theme) {
    this.picker.setTheme(theme);
    return this;
  }

  show() {
    this.picker.show();
    return this;
  }

  // Delegate other methods
  getStartDate() {
    return this.picker.getStartDate();
  }
  getEndDate() {
    return this.picker.getEndDate();
  }
  remove() {
    return this.picker.remove();
  }
}

// Usage
const chainablePicker = new ChainableDatex("#picker")
  .setStartDate(new Date("2024-01-01"))
  .setEndDate(new Date("2024-01-31"))
  .setTheme(MATERIAL_THEME)
  .show();
```

## Async Operations

Some operations might benefit from async handling:

```javascript
class AsyncDatex {
  constructor(element, options, callback) {
    this.picker = new Datex(element, options, callback);
  }

  async setDateRange(startDate, endDate) {
    return new Promise((resolve) => {
      this.picker.setStartDate(startDate);
      this.picker.setEndDate(endDate);

      // Wait for next tick to ensure DOM updates
      setTimeout(() => {
        resolve({
          start: this.picker.getStartDate(),
          end: this.picker.getEndDate(),
        });
      }, 0);
    });
  }

  async loadTheme(themeUrl) {
    try {
      const response = await fetch(themeUrl);
      const theme = await response.json();
      this.picker.setTheme(theme);
      return theme;
    } catch (error) {
      console.error("Failed to load theme:", error);
      throw error;
    }
  }
}

// Usage
const asyncPicker = new AsyncDatex("#picker");

async function setupPicker() {
  try {
    await asyncPicker.loadTheme("/api/themes/corporate");
    await asyncPicker.setDateRange(
      new Date("2024-01-01"),
      new Date("2024-01-31")
    );
    console.log("Picker setup complete");
  } catch (error) {
    console.error("Setup failed:", error);
  }
}
```

## Error Handling

Methods generally don't throw errors, but you should handle edge cases:

```javascript
function safeSetDate(picker, date) {
  try {
    if (!(date instanceof Date) || isNaN(date.getTime())) {
      console.warn("Invalid date provided:", date);
      return false;
    }

    picker.setStartDate(date);
    return true;
  } catch (error) {
    console.error("Error setting date:", error);
    return false;
  }
}

function safeSetTheme(picker, theme) {
  try {
    if (!theme || typeof theme !== "object") {
      console.warn("Invalid theme provided:", theme);
      return false;
    }

    picker.setTheme(theme);
    return true;
  } catch (error) {
    console.error("Error setting theme:", error);
    return false;
  }
}
```

## Performance Considerations

### Batch Operations

When making multiple changes, batch them to avoid unnecessary re-renders:

```javascript
// Instead of multiple individual calls
picker.setStartDate(startDate);
picker.setEndDate(endDate);
picker.setTheme(newTheme);

// Consider creating a batch update method
class BatchDatex {
  constructor(element, options, callback) {
    this.picker = new Datex(element, options, callback);
    this.pendingUpdates = {};
  }

  batchUpdate(updates) {
    if (updates.startDate) this.picker.setStartDate(updates.startDate);
    if (updates.endDate) this.picker.setEndDate(updates.endDate);
    if (updates.theme) this.picker.setTheme(updates.theme);
    if (updates.ranges) this.picker.updateRanges(updates.ranges);
  }
}

// Usage
const batchPicker = new BatchDatex("#picker");
batchPicker.batchUpdate({
  startDate: new Date("2024-01-01"),
  endDate: new Date("2024-01-31"),
  theme: MATERIAL_THEME,
  ranges: { "This Month": [startOfMonth, endOfMonth] },
});
```

### Memory Management

Always clean up when done:

```javascript
class ManagedDatex {
  constructor(element, options, callback) {
    this.picker = new Datex(element, options, callback);
    this.isDestroyed = false;
  }

  destroy() {
    if (!this.isDestroyed) {
      this.picker.remove();
      this.picker = null;
      this.isDestroyed = true;
    }
  }

  // Proxy methods with destruction check
  setStartDate(date) {
    if (this.isDestroyed) {
      console.warn("Picker has been destroyed");
      return;
    }
    this.picker.setStartDate(date);
  }

  // ... other methods
}
```

## Integration Patterns

### With State Management

```javascript
// Redux integration example
function createReduxDatePicker(element, store) {
  const picker = new Datex(element, {}, (startDate, endDate, label) => {
    store.dispatch({
      type: "DATE_RANGE_SELECTED",
      payload: { startDate, endDate, label },
    });
  });

  // Subscribe to store changes
  store.subscribe(() => {
    const state = store.getState();
    if (state.dateRange) {
      picker.setStartDate(state.dateRange.start);
      picker.setEndDate(state.dateRange.end);
    }
  });

  return picker;
}
```

### With Form Libraries

```javascript
// Formik integration
function FormikDatePicker({ field, form, ...props }) {
  const pickerRef = useRef();

  useEffect(() => {
    pickerRef.current = new Datex(
      inputRef.current,
      props,
      (startDate, endDate) => {
        form.setFieldValue(field.name, {
          start: startDate,
          end: endDate,
        });
      }
    );

    return () => pickerRef.current?.remove();
  }, []);

  return <input ref={inputRef} {...field} />;
}
```

## Next Steps

- Learn about [events API](/api/events)
- Explore [type definitions](/api/types)
- Check out [integration examples](/examples/frameworks)
