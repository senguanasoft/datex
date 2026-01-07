# Range Examples

Advanced examples for working with predefined date ranges in DateX.

## Basic Ranges

Simple predefined ranges for common use cases:

```javascript
import { Datex } from "datex";

const basicRanges = {
  Today: [new Date(), new Date()],
  Yesterday: [
    new Date(Date.now() - 24 * 60 * 60 * 1000),
    new Date(Date.now() - 24 * 60 * 60 * 1000),
  ],
  "Last 7 Days": [new Date(Date.now() - 6 * 24 * 60 * 60 * 1000), new Date()],
  "Last 30 Days": [new Date(Date.now() - 29 * 24 * 60 * 60 * 1000), new Date()],
};

const picker = new Datex("#basic-ranges", {
  ranges: basicRanges,
});
```

## Business Ranges

Ranges tailored for business applications:

```javascript
function getBusinessRanges() {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();
  const currentQuarter = Math.floor(currentMonth / 3);

  return {
    "This Week": getWeekRange(today),
    "Last Week": getWeekRange(
      new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
    ),
    "This Month": [
      new Date(currentYear, currentMonth, 1),
      new Date(currentYear, currentMonth + 1, 0),
    ],
    "Last Month": [
      new Date(currentYear, currentMonth - 1, 1),
      new Date(currentYear, currentMonth, 0),
    ],
    "This Quarter": [
      new Date(currentYear, currentQuarter * 3, 1),
      new Date(currentYear, (currentQuarter + 1) * 3, 0),
    ],
    "This Year": [new Date(currentYear, 0, 1), new Date(currentYear, 11, 31)],
  };
}

function getWeekRange(date) {
  const start = new Date(date);
  start.setDate(date.getDate() - date.getDay() + 1); // Monday

  const end = new Date(start);
  end.setDate(start.getDate() + 6); // Sunday

  return [start, end];
}

const businessPicker = new Datex("#business-ranges", {
  ranges: getBusinessRanges(),
});
```

## Dynamic Ranges

Ranges that update automatically based on the current date:

```javascript
class DynamicRanges {
  constructor(picker) {
    this.picker = picker;
    this.updateRanges();

    // Update ranges daily at midnight
    this.scheduleUpdates();
  }

  updateRanges() {
    const ranges = this.generateCurrentRanges();
    this.picker.updateRanges(ranges);
  }

  generateCurrentRanges() {
    const now = new Date();

    return {
      Today: [new Date(now), new Date(now)],
      Yesterday: this.getYesterday(),
      "This Week": this.getThisWeek(),
      "Last Week": this.getLastWeek(),
      "This Month": this.getThisMonth(),
      "Last Month": this.getLastMonth(),
      "Last 30 Days": this.getLast30Days(),
      "Last 90 Days": this.getLast90Days(),
    };
  }

  getYesterday() {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return [yesterday, yesterday];
  }

  getThisWeek() {
    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay() + 1); // Monday

    return [startOfWeek, now];
  }

  getLastWeek() {
    const now = new Date();
    const lastWeekEnd = new Date(now);
    lastWeekEnd.setDate(now.getDate() - now.getDay()); // Last Sunday

    const lastWeekStart = new Date(lastWeekEnd);
    lastWeekStart.setDate(lastWeekEnd.getDate() - 6); // Last Monday

    return [lastWeekStart, lastWeekEnd];
  }

  getThisMonth() {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    return [startOfMonth, now];
  }

  getLastMonth() {
    const now = new Date();
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    return [startOfLastMonth, endOfLastMonth];
  }

  getLast30Days() {
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 29 * 24 * 60 * 60 * 1000);
    return [thirtyDaysAgo, now];
  }

  getLast90Days() {
    const now = new Date();
    const ninetyDaysAgo = new Date(now.getTime() - 89 * 24 * 60 * 60 * 1000);
    return [ninetyDaysAgo, now];
  }

  scheduleUpdates() {
    // Calculate milliseconds until next midnight
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(now.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    const msUntilMidnight = tomorrow.getTime() - now.getTime();

    // Update at midnight, then every 24 hours
    setTimeout(() => {
      this.updateRanges();
      setInterval(() => this.updateRanges(), 24 * 60 * 60 * 1000);
    }, msUntilMidnight);
  }
}

// Usage
const picker = new Datex("#dynamic-ranges");
const dynamicRanges = new DynamicRanges(picker);
```

## Seasonal Ranges

Ranges that adapt to seasons and holidays:

```javascript
class SeasonalRanges {
  constructor() {
    this.holidays = this.getHolidays();
  }

  getHolidays() {
    const year = new Date().getFullYear();
    return {
      "New Year": new Date(year, 0, 1),
      "Valentine's Day": new Date(year, 1, 14),
      Easter: this.getEasterDate(year),
      "Independence Day": new Date(year, 6, 4),
      Halloween: new Date(year, 9, 31),
      Thanksgiving: this.getThanksgivingDate(year),
      Christmas: new Date(year, 11, 25),
    };
  }

  getSeasonalRanges() {
    const now = new Date();
    const year = now.getFullYear();

    return {
      Spring: [new Date(year, 2, 20), new Date(year, 5, 20)],
      Summer: [new Date(year, 5, 21), new Date(year, 8, 22)],
      Fall: [new Date(year, 8, 23), new Date(year, 11, 20)],
      Winter: [new Date(year, 11, 21), new Date(year + 1, 2, 19)],

      // Holiday periods
      "Holiday Season": [new Date(year, 10, 25), new Date(year, 11, 31)],
      "Back to School": [new Date(year, 7, 15), new Date(year, 8, 15)],
      "Tax Season": [new Date(year, 0, 1), new Date(year, 3, 15)],
    };
  }

  getEasterDate(year) {
    // Easter calculation algorithm
    const a = year % 19;
    const b = Math.floor(year / 100);
    const c = year % 100;
    const d = Math.floor(b / 4);
    const e = b % 4;
    const f = Math.floor((b + 8) / 25);
    const g = Math.floor((b - f + 1) / 3);
    const h = (19 * a + b - d - g + 15) % 30;
    const i = Math.floor(c / 4);
    const k = c % 4;
    const l = (32 + 2 * e + 2 * i - h - k) % 7;
    const m = Math.floor((a + 11 * h + 22 * l) / 451);
    const month = Math.floor((h + l - 7 * m + 114) / 31) - 1;
    const day = ((h + l - 7 * m + 114) % 31) + 1;

    return new Date(year, month, day);
  }

  getThanksgivingDate(year) {
    // Fourth Thursday of November
    const november = new Date(year, 10, 1);
    const firstThursday = new Date(november);
    firstThursday.setDate(1 + ((4 - november.getDay() + 7) % 7));

    const fourthThursday = new Date(firstThursday);
    fourthThursday.setDate(firstThursday.getDate() + 21);

    return fourthThursday;
  }
}

const seasonalRanges = new SeasonalRanges();
const seasonalPicker = new Datex("#seasonal-ranges", {
  ranges: seasonalRanges.getSeasonalRanges(),
});
```

## Analytics Ranges

Ranges commonly used in analytics and reporting:

```javascript
function getAnalyticsRanges() {
  const now = new Date();

  return {
    // Standard periods
    "Last 24 Hours": [new Date(now.getTime() - 24 * 60 * 60 * 1000), now],
    "Last 7 Days": [new Date(now.getTime() - 6 * 24 * 60 * 60 * 1000), now],
    "Last 14 Days": [new Date(now.getTime() - 13 * 24 * 60 * 60 * 1000), now],
    "Last 30 Days": [new Date(now.getTime() - 29 * 24 * 60 * 60 * 1000), now],
    "Last 90 Days": [new Date(now.getTime() - 89 * 24 * 60 * 60 * 1000), now],

    // Comparison periods
    "Previous Period (7d)": [
      new Date(now.getTime() - 13 * 24 * 60 * 60 * 1000),
      new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000),
    ],
    "Previous Period (30d)": [
      new Date(now.getTime() - 59 * 24 * 60 * 60 * 1000),
      new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000),
    ],

    // Calendar periods
    "Month to Date": [new Date(now.getFullYear(), now.getMonth(), 1), now],
    "Quarter to Date": [
      new Date(now.getFullYear(), Math.floor(now.getMonth() / 3) * 3, 1),
      now,
    ],
    "Year to Date": [new Date(now.getFullYear(), 0, 1), now],
  };
}

const analyticsPicker = new Datex("#analytics-ranges", {
  ranges: getAnalyticsRanges(),
  alwaysShowCalendars: true, // Always show calendar for custom ranges
});
```

## E-commerce Ranges

Ranges useful for e-commerce and sales analysis:

```javascript
function getEcommerceRanges() {
  const now = new Date();
  const year = now.getFullYear();

  return {
    // Sales periods
    "Black Friday Week": getBlackFridayWeek(year),
    "Cyber Monday Week": getCyberMondayWeek(year),
    "Holiday Shopping": [
      new Date(year, 10, 1), // November 1st
      new Date(year, 11, 31), // December 31st
    ],

    // Quarterly periods
    Q1: [new Date(year, 0, 1), new Date(year, 2, 31)],
    Q2: [new Date(year, 3, 1), new Date(year, 5, 30)],
    Q3: [new Date(year, 6, 1), new Date(year, 8, 30)],
    Q4: [new Date(year, 9, 1), new Date(year, 11, 31)],

    // Comparison periods
    "Same Period Last Year": [
      new Date(year - 1, now.getMonth(), now.getDate() - 30),
      new Date(year - 1, now.getMonth(), now.getDate()),
    ],

    // Seasonal
    "Back to School": [
      new Date(year, 7, 1), // August 1st
      new Date(year, 8, 30), // September 30th
    ],
    "Spring Sale": [
      new Date(year, 2, 1), // March 1st
      new Date(year, 4, 31), // May 31st
    ],
  };
}

function getBlackFridayWeek(year) {
  // Fourth Thursday of November (Thanksgiving)
  const thanksgiving = new Date(year, 10, 1);
  thanksgiving.setDate(1 + ((4 - thanksgiving.getDay() + 7) % 7) + 21);

  // Black Friday is the day after
  const blackFriday = new Date(thanksgiving);
  blackFriday.setDate(thanksgiving.getDate() + 1);

  // Week starts on Monday before
  const weekStart = new Date(blackFriday);
  weekStart.setDate(blackFriday.getDate() - blackFriday.getDay() + 1);

  // Week ends on Sunday after
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 6);

  return [weekStart, weekEnd];
}

function getCyberMondayWeek(year) {
  const blackFridayWeek = getBlackFridayWeek(year);
  const cyberMondayWeekStart = new Date(blackFridayWeek[1]);
  cyberMondayWeekStart.setDate(blackFridayWeek[1].getDate() + 1);

  const cyberMondayWeekEnd = new Date(cyberMondayWeekStart);
  cyberMondayWeekEnd.setDate(cyberMondayWeekStart.getDate() + 6);

  return [cyberMondayWeekStart, cyberMondayWeekEnd];
}

const ecommercePicker = new Datex("#ecommerce-ranges", {
  ranges: getEcommerceRanges(),
});
```

## Custom Range Builder

A utility class for building custom ranges:

```javascript
class RangeBuilder {
  constructor() {
    this.ranges = {};
  }

  addRange(name, startDate, endDate) {
    this.ranges[name] = [new Date(startDate), new Date(endDate)];
    return this;
  }

  addDaysFromNow(name, days) {
    const now = new Date();
    const targetDate = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);
    this.ranges[name] = [now, targetDate];
    return this;
  }

  addDaysAgo(name, days) {
    const now = new Date();
    const pastDate = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
    this.ranges[name] = [pastDate, now];
    return this;
  }

  addWeeksAgo(name, weeks) {
    return this.addDaysAgo(name, weeks * 7);
  }

  addMonthsAgo(name, months) {
    const now = new Date();
    const pastDate = new Date(now);
    pastDate.setMonth(now.getMonth() - months);
    this.ranges[name] = [pastDate, now];
    return this;
  }

  addCurrentPeriod(name, period) {
    const now = new Date();
    let start;

    switch (period) {
      case "week":
        start = new Date(now);
        start.setDate(now.getDate() - now.getDay() + 1); // Monday
        break;
      case "month":
        start = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
      case "quarter":
        start = new Date(
          now.getFullYear(),
          Math.floor(now.getMonth() / 3) * 3,
          1
        );
        break;
      case "year":
        start = new Date(now.getFullYear(), 0, 1);
        break;
      default:
        throw new Error(`Unknown period: ${period}`);
    }

    this.ranges[name] = [start, now];
    return this;
  }

  build() {
    return { ...this.ranges };
  }
}

// Usage
const customRanges = new RangeBuilder()
  .addDaysAgo("Last 7 Days", 7)
  .addDaysAgo("Last 30 Days", 30)
  .addWeeksAgo("Last 4 Weeks", 4)
  .addMonthsAgo("Last 3 Months", 3)
  .addCurrentPeriod("This Week", "week")
  .addCurrentPeriod("This Month", "month")
  .addCurrentPeriod("This Quarter", "quarter")
  .addCurrentPeriod("This Year", "year")
  .build();

const customPicker = new Datex("#custom-ranges", {
  ranges: customRanges,
});
```

## Range Validation

Validate and filter ranges based on business rules:

```javascript
class RangeValidator {
  constructor(options = {}) {
    this.maxDays = options.maxDays || 365;
    this.minDate = options.minDate || null;
    this.maxDate = options.maxDate || null;
    this.businessDaysOnly = options.businessDaysOnly || false;
  }

  validateRanges(ranges) {
    const validRanges = {};

    for (const [name, [start, end]] of Object.entries(ranges)) {
      if (this.isValidRange(start, end)) {
        validRanges[name] = [start, end];
      } else {
        console.warn(`Range "${name}" is invalid and will be excluded`);
      }
    }

    return validRanges;
  }

  isValidRange(start, end) {
    // Check date validity
    if (!(start instanceof Date) || !(end instanceof Date)) {
      return false;
    }

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return false;
    }

    // Check order
    if (start > end) {
      return false;
    }

    // Check against min/max dates
    if (this.minDate && end < this.minDate) {
      return false;
    }

    if (this.maxDate && start > this.maxDate) {
      return false;
    }

    // Check maximum span
    const daysDiff = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    if (daysDiff > this.maxDays) {
      return false;
    }

    // Check business days only
    if (this.businessDaysOnly && !this.isBusinessDayRange(start, end)) {
      return false;
    }

    return true;
  }

  isBusinessDayRange(start, end) {
    // Check if range includes only business days (Mon-Fri)
    const current = new Date(start);

    while (current <= end) {
      const dayOfWeek = current.getDay();
      if (dayOfWeek === 0 || dayOfWeek === 6) {
        // Sunday or Saturday
        return false;
      }
      current.setDate(current.getDate() + 1);
    }

    return true;
  }
}

// Usage
const validator = new RangeValidator({
  maxDays: 90,
  minDate: new Date("2024-01-01"),
  businessDaysOnly: false,
});

const allRanges = getAnalyticsRanges();
const validRanges = validator.validateRanges(allRanges);

const validatedPicker = new Datex("#validated-ranges", {
  ranges: validRanges,
});
```

## Next Steps

- Learn about [time picker examples](/examples/time-picker)
- Explore [custom theme examples](/examples/themes)
- Check out [framework integration](/examples/frameworks)
