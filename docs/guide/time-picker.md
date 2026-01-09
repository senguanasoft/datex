# Time Picker

DateX includes a powerful time picker that allows users to select both dates and times with precision.

![Time Picker](https://cdn.jsdelivr.net/gh/senguanasoft/datex@main/assets/images/screenshots/time-picker.png)

_Time picker interface with hour and minute selection_

## Basic Time Picker

Enable the time picker by setting the `timePicker` option:

```javascript
import { Datex } from "datex";

const picker = new Datex("#datetime-picker", {
  timePicker: true,
});
```

## Time Picker Options

### 24-Hour Format

```javascript
const picker = new Datex("#time-24h", {
  timePicker: true,
  timePicker24Hour: true, // Default: true
});
```

### 12-Hour Format with AM/PM

![12-Hour Format](https://cdn.jsdelivr.net/gh/senguanasoft/datex@main/assets/images/screenshots/full-datetime-12h.png)

```javascript
const picker = new Datex("#time-12h", {
  timePicker: true,
  timePicker24Hour: false,
});
```

### Time Increments

Control the minute increment options:

```javascript
const picker = new Datex("#time-increments", {
  timePicker: true,
  timePickerIncrement: 15, // 15-minute increments
});

// Available increments: 1, 5, 10, 15, 30
```

### Include Seconds

```javascript
const picker = new Datex("#time-with-seconds", {
  timePicker: true,
  timePickerSeconds: true,
});
```

## Locale Integration

Time picker automatically adapts to your locale settings:

### Spanish with Time

![Date Time Combined](https://cdn.jsdelivr.net/gh/senguanasoft/datex@main/assets/images/screenshots/date-time-datex.png)

```javascript
import { SPANISH_LOCALE_WITH_TIME } from "datex";

const picker = new Datex("#spanish-datetime", {
  timePicker: true,
  locale: SPANISH_LOCALE_WITH_TIME, // Format: DD/MM/YYYY HH:mm
});
```

### Custom Time Format

```javascript
const customLocale = {
  format: "YYYY-MM-DD HH:mm:ss",
  separator: " to ",
  applyLabel: "Select",
  cancelLabel: "Clear",
  customRangeLabel: "Custom",
  daysOfWeek: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  monthNames: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  firstDay: 0,
};

const picker = new Datex("#custom-time-format", {
  timePicker: true,
  timePickerSeconds: true,
  locale: customLocale,
});
```

## Time Constraints

### Min/Max Dates with Time

```javascript
const picker = new Datex("#constrained-datetime", {
  timePicker: true,
  minDate: new Date("2024-01-01 09:00:00"),
  maxDate: new Date("2024-12-31 17:00:00"),
});
```

### Business Hours Only

```javascript
function createBusinessHoursPicker(element) {
  return new Datex(
    element,
    {
      timePicker: true,
      timePicker24Hour: true,
    },
    (startDate, endDate) => {
      // Validate business hours (9 AM - 5 PM)
      const startHour = startDate.getHours();
      const endHour = endDate.getHours();

      if (startHour < 9 || startHour > 17 || endHour < 9 || endHour > 17) {
        alert("Please select times within business hours (9 AM - 5 PM)");
        return;
      }

      console.log("Valid business hours selected");
    }
  );
}
```

## Advanced Time Picker Usage

### Meeting Scheduler

```javascript
const meetingPicker = new Datex(
  "#meeting-time",
  {
    timePicker: true,
    timePickerIncrement: 30, // 30-minute slots
    timePicker24Hour: false,
    ranges: {
      "This Morning": [
        new Date(new Date().setHours(9, 0, 0, 0)),
        new Date(new Date().setHours(12, 0, 0, 0)),
      ],
      "This Afternoon": [
        new Date(new Date().setHours(13, 0, 0, 0)),
        new Date(new Date().setHours(17, 0, 0, 0)),
      ],
      "Tomorrow Morning": [
        new Date(
          new Date(Date.now() + 24 * 60 * 60 * 1000).setHours(9, 0, 0, 0)
        ),
        new Date(
          new Date(Date.now() + 24 * 60 * 60 * 1000).setHours(12, 0, 0, 0)
        ),
      ],
    },
  },
  (startDate, endDate, label) => {
    const duration = (endDate - startDate) / (1000 * 60); // minutes
    console.log(
      `Meeting scheduled: ${label || "Custom"} (${duration} minutes)`
    );
  }
);
```

### Event Duration Picker

```javascript
class EventDurationPicker {
  constructor(element) {
    this.picker = new Datex(
      element,
      {
        timePicker: true,
        timePickerIncrement: 15,
        singleDatePicker: false,
        ranges: {
          "30 minutes": this.createDurationRange(30),
          "1 hour": this.createDurationRange(60),
          "2 hours": this.createDurationRange(120),
          "4 hours": this.createDurationRange(240),
          "All day": this.createAllDayRange(),
        },
      },
      (startDate, endDate, label) => {
        this.onDurationSelected(startDate, endDate, label);
      }
    );
  }

  createDurationRange(minutes) {
    const now = new Date();
    const start = new Date(now);
    const end = new Date(now.getTime() + minutes * 60 * 1000);
    return [start, end];
  }

  createAllDayRange() {
    const today = new Date();
    const start = new Date(today.setHours(0, 0, 0, 0));
    const end = new Date(today.setHours(23, 59, 59, 999));
    return [start, end];
  }

  onDurationSelected(startDate, endDate, label) {
    const duration = (endDate - startDate) / (1000 * 60);
    console.log(`Event duration: ${duration} minutes (${label || "Custom"})`);
  }
}
```

### Timezone-Aware Picker

```javascript
class TimezonePicker {
  constructor(element, timezone = "UTC") {
    this.timezone = timezone;
    this.picker = new Datex(
      element,
      {
        timePicker: true,
        timePicker24Hour: true,
      },
      (startDate, endDate) => {
        this.handleTimeSelection(startDate, endDate);
      }
    );
  }

  handleTimeSelection(startDate, endDate) {
    // Convert to specified timezone
    const startUTC = this.toTimezone(startDate, this.timezone);
    const endUTC = this.toTimezone(endDate, this.timezone);

    console.log("Local time:", startDate, endDate);
    console.log(`${this.timezone} time:`, startUTC, endUTC);
  }

  toTimezone(date, timezone) {
    return new Intl.DateTimeFormat("en-US", {
      timeZone: timezone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(date);
  }

  setTimezone(newTimezone) {
    this.timezone = newTimezone;
  }
}

// Usage
const picker = new TimezonePicker("#timezone-picker", "America/New_York");
```

## Time Picker Styling

### Custom Time Picker Theme

```javascript
const timePickerTheme = {
  primaryColor: "#4f46e5",
  backgroundColor: "#ffffff",
  textColor: "#1f2937",
  borderColor: "#d1d5db",

  // Time-specific styling
  fontSize: "14px",
  fontFamily: "monospace", // Better for time display
  borderRadius: "6px",
};

const picker = new Datex("#styled-time-picker", {
  timePicker: true,
  theme: timePickerTheme,
});
```

## Validation and Error Handling

### Time Range Validation

```javascript
function createValidatedTimePicker(element) {
  return new Datex(
    element,
    {
      timePicker: true,
      timePickerIncrement: 15,
    },
    (startDate, endDate) => {
      // Validate minimum duration
      const minDuration = 30 * 60 * 1000; // 30 minutes
      if (endDate - startDate < minDuration) {
        alert("Minimum duration is 30 minutes");
        return;
      }

      // Validate maximum duration
      const maxDuration = 8 * 60 * 60 * 1000; // 8 hours
      if (endDate - startDate > maxDuration) {
        alert("Maximum duration is 8 hours");
        return;
      }

      // Validate working hours
      const startHour = startDate.getHours();
      const endHour = endDate.getHours();

      if (startHour < 8 || endHour > 18) {
        alert("Please select times between 8 AM and 6 PM");
        return;
      }

      console.log("Valid time range selected");
    }
  );
}
```

### Conflict Detection

```javascript
class ConflictDetector {
  constructor() {
    this.bookedSlots = [
      {
        start: new Date("2024-01-15 10:00"),
        end: new Date("2024-01-15 11:00"),
      },
      {
        start: new Date("2024-01-15 14:00"),
        end: new Date("2024-01-15 15:30"),
      },
    ];
  }

  hasConflict(startDate, endDate) {
    return this.bookedSlots.some(
      (slot) => startDate < slot.end && endDate > slot.start
    );
  }

  createConflictFreePicker(element) {
    return new Datex(
      element,
      {
        timePicker: true,
        timePickerIncrement: 30,
      },
      (startDate, endDate) => {
        if (this.hasConflict(startDate, endDate)) {
          alert("This time slot conflicts with an existing booking");
          return;
        }

        console.log("Time slot is available");
        this.bookSlot(startDate, endDate);
      }
    );
  }

  bookSlot(startDate, endDate) {
    this.bookedSlots.push({ start: startDate, end: endDate });
  }
}
```

## Integration Examples

### Calendar Integration

```javascript
class CalendarTimePicker {
  constructor(calendarElement, pickerElement) {
    this.calendar = calendarElement;
    this.picker = new Datex(
      pickerElement,
      {
        timePicker: true,
        autoApply: true,
      },
      (startDate, endDate) => {
        this.addEventToCalendar(startDate, endDate);
      }
    );
  }

  addEventToCalendar(startDate, endDate) {
    const event = {
      id: Date.now(),
      title: "New Event",
      start: startDate.toISOString(),
      end: endDate.toISOString(),
    };

    // Add to calendar (implementation depends on calendar library)
    this.calendar.addEvent(event);
  }
}
```

### Form Integration

```html
<form id="appointment-form">
  <div class="form-group">
    <label for="appointment-time">Appointment Time:</label>
    <input type="text" id="appointment-time" name="appointment_time" required />
  </div>

  <div class="form-group">
    <label for="duration">Duration:</label>
    <select id="duration" name="duration">
      <option value="30">30 minutes</option>
      <option value="60">1 hour</option>
      <option value="90">1.5 hours</option>
      <option value="120">2 hours</option>
    </select>
  </div>

  <button type="submit">Book Appointment</button>
</form>
```

```javascript
const form = document.getElementById("appointment-form");
const durationSelect = document.getElementById("duration");

const picker = new Datex(
  "#appointment-time",
  {
    timePicker: true,
    singleDatePicker: true,
    timePickerIncrement: 15,
  },
  (startDate) => {
    // Update end time based on duration
    const duration = parseInt(durationSelect.value);
    const endDate = new Date(startDate.getTime() + duration * 60 * 1000);

    console.log("Appointment:", startDate, "to", endDate);
  }
);

durationSelect.addEventListener("change", () => {
  // Trigger picker update if needed
  picker.refreshTheme();
});
```

## Best Practices

1. **Use appropriate increments**: 15 or 30 minutes for meetings, 1 minute for precise timing
2. **Validate time ranges**: Ensure logical start/end times and reasonable durations
3. **Consider timezone**: Handle timezone conversions for multi-location applications
4. **Provide clear feedback**: Show selected times clearly and validate input
5. **Accessibility**: Ensure time pickers work with keyboard navigation and screen readers

## Next Steps

- Learn about [accessibility features](/guide/accessibility)
- Explore [API reference](/api/options)
- Check out [framework integration examples](/examples/frameworks)
