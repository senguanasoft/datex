# Time Picker Examples

Examples demonstrating DateX time picker functionality for date and time selection.

## Basic Time Picker

Enable time selection with default settings:

```html
<input type="text" id="basic-time" placeholder="Select date and time" />
```

```javascript
import { Datex } from "datex";

const timePicker = new Datex(
  "#basic-time",
  {
    timePicker: true,
  },
  (startDate, endDate) => {
    console.log("Selected time range:", startDate, endDate);
  }
);
```

## 12-Hour Format

Use 12-hour format with AM/PM selector:

```javascript
const picker12h = new Datex("#time-12h", {
  timePicker: true,
  timePicker24Hour: false,
});
```

## Time Increments

Control minute increments for easier selection:

```javascript
// 15-minute increments
const picker15min = new Datex("#time-15min", {
  timePicker: true,
  timePickerIncrement: 15,
});

// 30-minute increments for meetings
const meetingPicker = new Datex("#meeting-time", {
  timePicker: true,
  timePickerIncrement: 30,
  ranges: {
    "Morning Meeting": [
      new Date(new Date().setHours(9, 0, 0, 0)),
      new Date(new Date().setHours(10, 0, 0, 0)),
    ],
    "Lunch Meeting": [
      new Date(new Date().setHours(12, 0, 0, 0)),
      new Date(new Date().setHours(13, 0, 0, 0)),
    ],
    "Afternoon Meeting": [
      new Date(new Date().setHours(15, 0, 0, 0)),
      new Date(new Date().setHours(16, 0, 0, 0)),
    ],
  },
});
```

## With Seconds

Include seconds in time selection:

```javascript
const preciseTimePicker = new Datex("#precise-time", {
  timePicker: true,
  timePickerSeconds: true,
});
```

## Business Hours Constraint

Limit time selection to business hours:

```javascript
function createBusinessHoursPicker(element) {
  const now = new Date();
  const businessStart = new Date(now);
  businessStart.setHours(9, 0, 0, 0);

  const businessEnd = new Date(now);
  businessEnd.setHours(17, 0, 0, 0);

  return new Datex(
    element,
    {
      timePicker: true,
      timePickerIncrement: 30,
      minDate: businessStart,
      maxDate: businessEnd,
    },
    (startDate, endDate) => {
      // Validate business hours
      if (startDate.getHours() < 9 || endDate.getHours() > 17) {
        alert("Please select times within business hours (9 AM - 5 PM)");
        return;
      }

      console.log("Business hours appointment:", startDate, endDate);
    }
  );
}

const businessPicker = createBusinessHoursPicker("#business-hours");
```
