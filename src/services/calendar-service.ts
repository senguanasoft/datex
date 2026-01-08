/**
 * Calendar rendering and management service
 */

import { CalendarState, DatexLocale, DatexOptions } from "../types/datex-types";
import {
  formatDate,
  addMonths,
  getStartOfMonth,
  getEndOfMonth,
  getStartOfWeek,
  isSameDate,
  isAfterDate,
  isBeforeDate,
  startOfDay,
  endOfDay,
} from "../utils/date-utils";

export class CalendarService {
  private options: Required<DatexOptions>;
  private locale: DatexLocale;

  constructor(options: Required<DatexOptions>, locale: DatexLocale) {
    this.options = options;
    this.locale = locale;
  }

  buildCalendarMatrix(month: Date): Date[][] {
    const firstDay = getStartOfMonth(month);
    const startCalendar = getStartOfWeek(firstDay, this.locale.firstDay);

    const calendarDays: Date[][] = [];
    let currentWeek: Date[] = [];
    const startDate = new Date(startCalendar);

    for (let i = 0; i < 42; i++) {
      if (i > 0 && i % 7 === 0) {
        calendarDays.push(currentWeek);
        currentWeek = [];
      }

      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);
      currentWeek.push(currentDate);
    }

    if (currentWeek.length > 0) {
      calendarDays.push(currentWeek);
    }

    return calendarDays;
  }

  renderCalendarHTML(
    calendar: CalendarState,
    side: "left" | "right",
    startDate: Date,
    endDate: Date | null,
    canGoPrev: boolean,
    canGoNext: boolean
  ): string {
    const month = calendar.month;
    const year = month.getFullYear();
    const monthIndex = month.getMonth();

    let html = '<table class="table-condensed">';
    html += this.renderHeader(side, monthIndex, year, canGoPrev, canGoNext);
    html += this.renderDayHeaders();
    html += this.renderCalendarBody(
      calendar.calendar,
      month,
      startDate,
      endDate
    );
    html += "</table>";

    // Add time picker controls if enabled
    if (this.options.timePicker) {
      html += this.renderTimeControls(
        side === "left" ? startDate : endDate || startDate
      );
    }

    return html;
  }

  renderTimeControls(date: Date): string {
    let html = '<div class="calendar-time">';

    // Hour select
    html += '<select class="hourselect">';
    const is24Hour = this.options.timePicker24Hour;
    const maxHour = is24Hour ? 23 : 12;
    const minHour = is24Hour ? 0 : 1;

    for (let i = minHour; i <= maxHour; i++) {
      const hour = is24Hour ? i : i === 0 ? 12 : i;
      const displayHour = String(hour).padStart(2, "0");
      const currentHour = is24Hour
        ? date.getHours()
        : date.getHours() % 12 || 12;

      // Check if this hour should be disabled based on min/max dates
      let disabled = false;
      if (this.options.minDate || this.options.maxDate) {
        const testTime = new Date(date);
        const hourIn24 = is24Hour
          ? hour
          : date.getHours() >= 12
          ? hour === 12
            ? 12
            : hour + 12
          : hour === 12
          ? 0
          : hour;
        testTime.setHours(hourIn24);

        if (this.options.minDate) {
          const testTimeMax = new Date(testTime);
          testTimeMax.setMinutes(59);
          if (testTimeMax < this.options.minDate) disabled = true;
        }
        if (this.options.maxDate) {
          const testTimeMin = new Date(testTime);
          testTimeMin.setMinutes(0);
          if (testTimeMin > this.options.maxDate) disabled = true;
        }
      }

      const selected =
        hour === currentHour && !disabled ? ' selected="selected"' : "";
      const disabledAttr = disabled
        ? ' disabled="disabled" class="disabled"'
        : "";
      html += `<option value="${hour}"${selected}${disabledAttr}>${displayHour}</option>`;
    }
    html += "</select>";

    html += " : ";

    // Minute select
    html += '<select class="minuteselect">';
    const increment = this.options.timePickerIncrement || 1;
    for (let i = 0; i < 60; i += increment) {
      const minute = String(i).padStart(2, "0");

      // Check if this minute should be disabled based on min/max dates
      let disabled = false;
      if (this.options.minDate || this.options.maxDate) {
        const testTime = new Date(date);
        testTime.setMinutes(i);

        if (this.options.minDate) {
          const testTimeMax = new Date(testTime);
          testTimeMax.setSeconds(59);
          if (testTimeMax < this.options.minDate) disabled = true;
        }
        if (this.options.maxDate) {
          const testTimeMin = new Date(testTime);
          testTimeMin.setSeconds(0);
          if (testTimeMin > this.options.maxDate) disabled = true;
        }
      }

      const selected =
        i === date.getMinutes() && !disabled ? ' selected="selected"' : "";
      const disabledAttr = disabled
        ? ' disabled="disabled" class="disabled"'
        : "";
      html += `<option value="${i}"${selected}${disabledAttr}>${minute}</option>`;
    }
    html += "</select>";

    // Seconds select (if enabled)
    if (this.options.timePickerSeconds) {
      html += " : ";
      html += '<select class="secondselect">';
      for (let i = 0; i < 60; i++) {
        const second = String(i).padStart(2, "0");

        // Check if this second should be disabled based on min/max dates
        let disabled = false;
        if (this.options.minDate || this.options.maxDate) {
          const testTime = new Date(date);
          testTime.setSeconds(i);

          if (this.options.minDate && testTime < this.options.minDate)
            disabled = true;
          if (this.options.maxDate && testTime > this.options.maxDate)
            disabled = true;
        }

        const selected =
          i === date.getSeconds() && !disabled ? ' selected="selected"' : "";
        const disabledAttr = disabled
          ? ' disabled="disabled" class="disabled"'
          : "";
        html += `<option value="${i}"${selected}${disabledAttr}>${second}</option>`;
      }
      html += "</select>";
    }

    // AM/PM select (if 12-hour format)
    if (!is24Hour) {
      html += " ";
      html += '<select class="ampmselect">';
      const isAM = date.getHours() < 12;

      // Check if AM/PM should be disabled based on min/max dates
      let amDisabled = false;
      let pmDisabled = false;
      if (this.options.minDate || this.options.maxDate) {
        const testAM = new Date(date);
        testAM.setHours(6, 0, 0); // Test with 6 AM
        const testPM = new Date(date);
        testPM.setHours(18, 0, 0); // Test with 6 PM

        if (this.options.minDate && testAM < this.options.minDate)
          amDisabled = true;
        if (this.options.maxDate && testPM > this.options.maxDate)
          pmDisabled = true;
      }

      const amDisabledAttr = amDisabled
        ? ' disabled="disabled" class="disabled"'
        : "";
      const pmDisabledAttr = pmDisabled
        ? ' disabled="disabled" class="disabled"'
        : "";

      html += `<option value="AM"${
        isAM ? ' selected="selected"' : ""
      }${amDisabledAttr}>AM</option>`;
      html += `<option value="PM"${
        !isAM ? ' selected="selected"' : ""
      }${pmDisabledAttr}>PM</option>`;
      html += "</select>";
    }

    html += "</div>";
    return html;
  }

  private renderHeader(
    side: "left" | "right",
    monthIndex: number,
    year: number,
    canGoPrev: boolean,
    canGoNext: boolean
  ): string {
    let html = "<thead><tr>";

    // Previous button
    if (canGoPrev && (!this.options.linkedCalendars || side === "left")) {
      html += '<th class="prev available"><span></span></th>';
    } else {
      html += "<th></th>";
    }

    // Month/Year header
    let dateHtml = this.locale.monthNames[monthIndex] + " " + year;
    if (this.options.showDropdowns) {
      dateHtml = this.renderDropdowns(monthIndex, year);
    }
    html += `<th colspan="5" class="month">${dateHtml}</th>`;

    // Next button
    if (
      canGoNext &&
      (!this.options.linkedCalendars ||
        side === "right" ||
        this.options.singleDatePicker)
    ) {
      html += '<th class="next available"><span></span></th>';
    } else {
      html += "<th></th>";
    }

    html += "</tr>";
    return html;
  }

  private renderDayHeaders(): string {
    let html = "<tr>";
    for (const dayName of this.locale.daysOfWeek) {
      html += `<th>${dayName}</th>`;
    }
    html += "</tr></thead>";
    return html;
  }

  private renderCalendarBody(
    calendarDays: Date[][],
    currentMonth: Date,
    startDate: Date,
    endDate: Date | null
  ): string {
    let html = "<tbody>";

    for (const week of calendarDays) {
      html += "<tr>";
      for (const day of week) {
        const classes = this.getDayClasses(
          day,
          currentMonth,
          startDate,
          endDate
        );
        const isDisabled = classes.includes("disabled");
        const className = classes.join(" ") + (!isDisabled ? " available" : "");

        html += `<td class="${className}" data-date="${formatDate(
          day,
          "YYYY-MM-DD"
        )}">${day.getDate()}</td>`;
      }
      html += "</tr>";
    }

    html += "</tbody>";
    return html;
  }

  private renderDropdowns(monthIndex: number, year: number): string {
    const { minYear, maxYear } = this.calculateYearRange(year);

    const monthHtml = this.renderMonthDropdown(
      monthIndex,
      year,
      minYear,
      maxYear
    );
    const yearHtml = this.renderYearDropdown(year, minYear, maxYear);

    return monthHtml + " " + yearHtml;
  }

  private calculateYearRange(currentYear: number): {
    minYear: number;
    maxYear: number;
  } {
    let minYear = this.options.minYear;
    let maxYear = this.options.maxYear;

    if (this.options.minDate) {
      minYear = Math.max(minYear, this.options.minDate.getFullYear());
    }
    if (this.options.maxDate) {
      maxYear = Math.min(maxYear, this.options.maxDate.getFullYear());
    }

    return { minYear, maxYear };
  }

  private renderMonthDropdown(
    monthIndex: number,
    currentYear: number,
    minYear: number,
    maxYear: number
  ): string {
    const inMinYear = currentYear === minYear;
    const inMaxYear = currentYear === maxYear;

    let html = `<select class="monthselect">`;

    for (let m = 0; m < 12; m++) {
      let disabled = false;

      if (
        inMinYear &&
        this.options.minDate &&
        m < this.options.minDate.getMonth()
      ) {
        disabled = true;
      }
      if (
        inMaxYear &&
        this.options.maxDate &&
        m > this.options.maxDate.getMonth()
      ) {
        disabled = true;
      }

      const selected = m === monthIndex ? ' selected="selected"' : "";
      const disabledAttr = disabled ? ' disabled="disabled"' : "";
      html += `<option value="${m}"${selected}${disabledAttr}>${this.locale.monthNames[m]}</option>`;
    }

    html += "</select>";
    return html;
  }

  private renderYearDropdown(
    year: number,
    minYear: number,
    maxYear: number
  ): string {
    let html = `<select class="yearselect">`;

    for (let y = minYear; y <= maxYear; y++) {
      const selected = y === year ? ' selected="selected"' : "";
      html += `<option value="${y}"${selected}>${y}</option>`;
    }

    html += "</select>";
    return html;
  }

  getDayClasses(
    day: Date,
    currentMonth: Date,
    startDate: Date,
    endDate: Date | null
  ): string[] {
    const classes: string[] = [];
    const today = new Date();

    // Today
    if (isSameDate(day, today, "day")) {
      classes.push("today");
    }

    // Weekend
    if (day.getDay() === 0 || day.getDay() === 6) {
      classes.push("weekend");
    }

    // Other month
    if (day.getMonth() !== currentMonth.getMonth()) {
      classes.push("off", "ends");
    }

    // Disabled dates
    if (
      this.options.minDate &&
      isBeforeDate(day, startOfDay(this.options.minDate))
    ) {
      classes.push("off", "disabled");
    }

    if (
      this.options.maxDate &&
      isAfterDate(day, endOfDay(this.options.maxDate))
    ) {
      classes.push("off", "disabled");
    }

    // Selected dates
    if (isSameDate(day, startDate, "day")) {
      classes.push("active", "start-date");
    }

    if (endDate && isSameDate(day, endDate, "day")) {
      classes.push("active", "end-date");
    }

    // In range
    if (endDate && isAfterDate(day, startDate) && isBeforeDate(day, endDate)) {
      classes.push("in-range");
    }

    return classes;
  }

  canNavigatePrevious(month: Date): boolean {
    return (
      !this.options.minDate ||
      isAfterDate(getStartOfMonth(month), this.options.minDate)
    );
  }

  canNavigateNext(month: Date): boolean {
    return (
      !this.options.maxDate ||
      isBeforeDate(getEndOfMonth(month), this.options.maxDate)
    );
  }
}
