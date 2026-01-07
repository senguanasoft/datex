# Framework Integration Examples

Examples showing how to integrate DateX with popular JavaScript frameworks.

## React Integration

### Basic React Component

```jsx
import React, { useEffect, useRef, useState } from "react";
import { Datex } from "datex";

function DateRangePicker({ onDateChange, options = {} }) {
  const inputRef = useRef();
  const pickerRef = useRef();
  const [dateRange, setDateRange] = useState(null);

  useEffect(() => {
    if (inputRef.current) {
      pickerRef.current = new Datex(
        inputRef.current,
        options,
        (startDate, endDate, label) => {
          const range = { start: startDate, end: endDate, label };
          setDateRange(range);
          onDateChange?.(range);
        }
      );

      return () => {
        pickerRef.current?.remove();
      };
    }
  }, [options, onDateChange]);

  return (
    <div>
      <input
        ref={inputRef}
        type="text"
        placeholder="Select date range"
        readOnly
      />
      {dateRange && (
        <p>
          Selected: {dateRange.start.toLocaleDateString()} -{" "}
          {dateRange.end.toLocaleDateString()}
          {dateRange.label && ` (${dateRange.label})`}
        </p>
      )}
    </div>
  );
}

// Usage
function App() {
  const handleDateChange = (range) => {
    console.log("Date range changed:", range);
  };

  return (
    <DateRangePicker
      onDateChange={handleDateChange}
      options={{
        autoApply: true,
        ranges: {
          "Last 7 Days": [
            new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
            new Date(),
          ],
        },
      }}
    />
  );
}
```

### React Hook

```jsx
import { useEffect, useRef, useState } from "react";
import { Datex } from "datex";

function useDateRangePicker(options = {}) {
  const elementRef = useRef();
  const pickerRef = useRef();
  const [dateRange, setDateRange] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (elementRef.current) {
      pickerRef.current = new Datex(elementRef.current, options);

      const element = elementRef.current;

      const handleShow = () => setIsOpen(true);
      const handleHide = () => setIsOpen(false);
      const handleApply = (event) => {
        const picker = event.detail;
        setDateRange({
          start: picker.getStartDate(),
          end: picker.getEndDate(),
        });
      };

      element.addEventListener("show.daterangepicker", handleShow);
      element.addEventListener("hide.daterangepicker", handleHide);
      element.addEventListener("apply.daterangepicker", handleApply);

      return () => {
        element.removeEventListener("show.daterangepicker", handleShow);
        element.removeEventListener("hide.daterangepicker", handleHide);
        element.removeEventListener("apply.daterangepicker", handleApply);
        pickerRef.current?.remove();
      };
    }
  }, [options]);

  const show = () => pickerRef.current?.show();
  const hide = () => pickerRef.current?.hide();
  const setStartDate = (date) => pickerRef.current?.setStartDate(date);
  const setEndDate = (date) => pickerRef.current?.setEndDate(date);

  return {
    elementRef,
    dateRange,
    isOpen,
    show,
    hide,
    setStartDate,
    setEndDate,
  };
}

// Usage
function DatePickerComponent() {
  const { elementRef, dateRange, isOpen } = useDateRangePicker({
    autoApply: true,
  });

  return (
    <div>
      <input ref={elementRef} type="text" />
      <p>Picker is {isOpen ? "open" : "closed"}</p>
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

## Vue Integration

### Vue 3 Composition API

```vue
<template>
  <div>
    <input ref="dateInput" type="text" placeholder="Select date range" />
    <p v-if="dateRange">
      Selected: {{ formatDate(dateRange.start) }} -
      {{ formatDate(dateRange.end) }}
    </p>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from "vue";
import { Datex } from "datex";

export default {
  name: "DateRangePicker",
  props: {
    options: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: ["dateChange"],
  setup(props, { emit }) {
    const dateInput = ref();
    const picker = ref();
    const dateRange = ref(null);

    onMounted(() => {
      if (dateInput.value) {
        picker.value = new Datex(
          dateInput.value,
          props.options,
          (startDate, endDate, label) => {
            const range = { start: startDate, end: endDate, label };
            dateRange.value = range;
            emit("dateChange", range);
          }
        );
      }
    });

    onUnmounted(() => {
      picker.value?.remove();
    });

    const formatDate = (date) => {
      return date.toLocaleDateString();
    };

    return {
      dateInput,
      dateRange,
      formatDate,
    };
  },
};
</script>
```

### Vue 2 Options API

```vue
<template>
  <div>
    <input ref="dateInput" type="text" placeholder="Select date range" />
    <p v-if="dateRange">
      Selected: {{ dateRange.start | formatDate }} -
      {{ dateRange.end | formatDate }}
    </p>
  </div>
</template>

<script>
import { Datex } from "datex";

export default {
  name: "DateRangePicker",
  props: {
    options: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      picker: null,
      dateRange: null,
    };
  },
  mounted() {
    this.picker = new Datex(
      this.$refs.dateInput,
      this.options,
      (startDate, endDate, label) => {
        this.dateRange = { start: startDate, end: endDate, label };
        this.$emit("date-change", this.dateRange);
      }
    );
  },
  beforeDestroy() {
    this.picker?.remove();
  },
  filters: {
    formatDate(date) {
      return date.toLocaleDateString();
    },
  },
};
</script>
```

## Angular Integration

### Angular Component

```typescript
import {
  Component,
  ElementRef,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
  ViewChild,
} from "@angular/core";
import { Datex, DatexOptions } from "datex";

interface DateRange {
  start: Date;
  end: Date;
  label?: string;
}

@Component({
  selector: "app-date-range-picker",
  template: `
    <input #dateInput type="text" placeholder="Select date range" readonly />
    <p *ngIf="selectedRange">
      Selected: {{ selectedRange.start | date }} -
      {{ selectedRange.end | date }}
      <span *ngIf="selectedRange.label">({{ selectedRange.label }})</span>
    </p>
  `,
})
export class DateRangePickerComponent implements OnInit, OnDestroy {
  @ViewChild("dateInput", { static: true })
  dateInput!: ElementRef<HTMLInputElement>;
  @Input() options: DatexOptions = {};
  @Output() dateChange = new EventEmitter<DateRange>();

  private picker?: Datex;
  selectedRange?: DateRange;

  ngOnInit() {
    this.picker = new Datex(
      this.dateInput.nativeElement,
      this.options,
      (startDate: Date, endDate: Date, label?: string) => {
        this.selectedRange = { start: startDate, end: endDate, label };
        this.dateChange.emit(this.selectedRange);
      }
    );
  }

  ngOnDestroy() {
    this.picker?.remove();
  }
}
```

### Angular Service

```typescript
import { Injectable } from "@angular/core";
import { Datex, DatexOptions } from "datex";

@Injectable({
  providedIn: "root",
})
export class DatePickerService {
  createPicker(element: HTMLElement, options: DatexOptions = {}) {
    return new Datex(element, options);
  }

  getBusinessRanges() {
    const now = new Date();
    return {
      "This Week": this.getThisWeek(),
      "Last Week": this.getLastWeek(),
      "This Month": this.getThisMonth(),
      "Last Month": this.getLastMonth(),
    };
  }

  private getThisWeek(): [Date, Date] {
    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay() + 1);
    return [startOfWeek, now];
  }

  private getLastWeek(): [Date, Date] {
    const now = new Date();
    const endOfLastWeek = new Date(now);
    endOfLastWeek.setDate(now.getDate() - now.getDay());

    const startOfLastWeek = new Date(endOfLastWeek);
    startOfLastWeek.setDate(endOfLastWeek.getDate() - 6);

    return [startOfLastWeek, endOfLastWeek];
  }

  private getThisMonth(): [Date, Date] {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    return [startOfMonth, now];
  }

  private getLastMonth(): [Date, Date] {
    const now = new Date();
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    return [startOfLastMonth, endOfLastMonth];
  }
}
```

## Svelte Integration

```svelte
<script>
  import { onMount, onDestroy } from 'svelte';
  import { Datex } from 'datex';

  export let options = {};

  let inputElement;
  let picker;
  let dateRange = null;

  onMount(() => {
    if (inputElement) {
      picker = new Datex(inputElement, options, (startDate, endDate, label) => {
        dateRange = { start: startDate, end: endDate, label };
      });
    }
  });

  onDestroy(() => {
    picker?.remove();
  });

  function formatDate(date) {
    return date.toLocaleDateString();
  }
</script>

<input bind:this={inputElement} type="text" placeholder="Select date range" readonly />

{#if dateRange}
  <p>
    Selected: {formatDate(dateRange.start)} - {formatDate(dateRange.end)}
    {#if dateRange.label}({dateRange.label}){/if}
  </p>
{/if}
```

## Next Steps

- Explore [basic examples](/examples/basic) for more usage patterns
- Learn about [custom themes](/examples/themes)
- Check out [range examples](/examples/ranges)
