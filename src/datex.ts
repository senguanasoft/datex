/**
 * Datex - Modern Date Range Picker
 * Refactored for better maintainability and clean code principles
 */

// Import utilities and services
import {
  formatDate,
  addMonths,
  startOfDay,
  endOfDay,
  isAfterDate,
  isBeforeDate,
  parseDate,
  isSameDate,
  isValidDate,
  getStartOfMonth,
} from "./utils/date-utils";

import { ThemeService } from "./services/theme-service";
import { EventService } from "./services/event-service";
import { PositionService } from "./services/position-service";
import { CalendarService } from "./services/calendar-service";
import {
  ValidationService,
  ValidationResult,
  DatexValidation,
} from "./services/validation-service";
import { KeyboardService } from "./services/keyboard-service";

// Import types and constants
import {
  DatexOptions,
  DatexCallback,
  PickerState,
  DatexLocale,
  DatexTheme,
} from "./types/datex-types";

import { DEFAULT_THEME } from "./constants/themes";
import { SPANISH_LOCALE } from "./constants/locales";

// Re-export types and constants for public API
export * from "./types/datex-types";
export * from "./constants/themes";
export * from "./constants/locales";

export class Datex {
  private element: HTMLElement;
  private container!: HTMLElement;
  private options: Required<DatexOptions>;
  private locale: DatexLocale;
  private callback: DatexCallback;
  private state!: PickerState;

  // Services
  private themeService!: ThemeService;
  private eventService: EventService;
  private positionService!: PositionService;
  private calendarService!: CalendarService;
  private validationService!: ValidationService;
  private keyboardService!: KeyboardService;

  constructor(
    element: HTMLElement | string,
    options: DatexOptions = {},
    callback?: DatexCallback
  ) {
    this.element = this.resolveElement(element);
    this.options = this.mergeWithDefaults(options);
    this.locale = this.options.locale;
    this.callback = callback || (() => {});
    this.eventService = new EventService();

    this.initializeState();
    this.initializeServices();
    this.addDropdownArrow(); // Simple arrow
    this.createContainer();
    this.setupEventListeners();
    this.updateElement();
    this.calculateChosenLabel();
  }

  private resolveElement(element: HTMLElement | string): HTMLElement {
    if (typeof element === "string") {
      const resolved = element.startsWith("#")
        ? document.getElementById(element.slice(1))
        : document.querySelector(element) || document.getElementById(element);

      if (!resolved || !(resolved instanceof HTMLElement)) {
        throw new Error("Datex: Element not found");
      }
      return resolved;
    }
    return element;
  }

  private mergeWithDefaults(options: DatexOptions): Required<DatexOptions> {
    const today = new Date();

    const merged = {
      startDate: options.startDate || today,
      endDate: options.endDate || today,
      minDate: options.minDate ?? null,
      maxDate: options.maxDate ?? null,
      minYear: options.minYear ?? today.getFullYear() - 100,
      maxYear: options.maxYear ?? today.getFullYear() + 100,
      maxSpan: options.maxSpan ?? null,
      autoApply: options.autoApply ?? false,
      singleDatePicker: options.singleDatePicker ?? false,
      showDropdowns: options.showDropdowns ?? true,
      linkedCalendars: options.linkedCalendars ?? true,
      autoUpdateInput: options.autoUpdateInput ?? true,
      alwaysShowCalendars: options.alwaysShowCalendars ?? false,
      showCustomRangeLabel: options.showCustomRangeLabel ?? true,
      timePicker: options.timePicker ?? false,
      timePicker24Hour: options.timePicker24Hour ?? true,
      timePickerIncrement: options.timePickerIncrement ?? 1,
      timePickerSeconds: options.timePickerSeconds ?? false,
      ranges: options.ranges || {},
      opens: options.opens || "center",
      drops: options.drops || "auto",
      locale: options.locale || SPANISH_LOCALE,
      buttonClasses: options.buttonClasses || "btn btn-sm",
      applyButtonClasses: options.applyButtonClasses || "btn-success",
      cancelButtonClasses: options.cancelButtonClasses || "btn-danger",
      theme: options.theme || DEFAULT_THEME,
      validation: options.validation || {},
      events: options.events || {},
    };

    // Can't be used together for now
    if (merged.timePicker && merged.autoApply) {
      merged.autoApply = false;
    }

    return merged;
  }

  private initializeState(): void {
    const today = new Date();
    this.state = {
      startDate: this.options.timePicker
        ? this.options.startDate
        : startOfDay(this.options.startDate),
      endDate: this.options.timePicker
        ? this.options.endDate
        : endOfDay(this.options.endDate),
      oldStartDate: this.options.timePicker
        ? this.options.startDate
        : startOfDay(this.options.startDate),
      oldEndDate: this.options.timePicker
        ? this.options.endDate
        : endOfDay(this.options.endDate),
      isShowing: false,
      leftCalendar: { month: today, calendar: [] },
      rightCalendar: { month: addMonths(today, 1), calendar: [] },
      chosenLabel: null,
      hoverDate: null,
    };
  }

  private initializeServices(): void {
    this.calendarService = new CalendarService(this.options, this.locale);
  }

  private addDropdownArrow(): void {
    // Only add arrow to input elements
    if (this.element.tagName === "INPUT") {
      this.element.classList.add("datex-input");
    }
  }

  private createContainer(): void {
    const template = this.buildContainerTemplate();
    const wrapper = document.createElement("div");
    wrapper.innerHTML = template.trim();
    this.container = wrapper.firstElementChild as HTMLElement;

    document.body.appendChild(this.container);

    this.initializeContainerServices();
    this.setupContainerClasses();
    this.setupInitialVisibility();
  }

  private buildContainerTemplate(): string {
    return `
      <div class="datex-picker">
        <div class="ranges"></div>
        <div class="drp-calendar left">
          <div class="calendar-table"></div>
          <div class="calendar-time"></div>
        </div>
        <div class="drp-calendar right">
          <div class="calendar-table"></div>
          <div class="calendar-time"></div>
        </div>
        <div class="drp-buttons">
          <span class="drp-selected"></span>
          <button class="cancelBtn ${this.options.buttonClasses} ${this.options.cancelButtonClasses}" type="button">
            ${this.locale.cancelLabel}
          </button>
          <button class="applyBtn ${this.options.buttonClasses} ${this.options.applyButtonClasses}" type="button">
            ${this.locale.applyLabel}
          </button>
        </div>
      </div>
    `;
  }

  private initializeContainerServices(): void {
    this.themeService = new ThemeService(this.container, this.options.theme);
    this.positionService = new PositionService(
      this.element,
      this.container,
      this.options
    );
    this.validationService = new ValidationService(this.options.validation);
    this.keyboardService = new KeyboardService(this.container, {
      enabled: true,
    });

    // Setup keyboard handlers
    this.keyboardService.setHandlers({
      onDateSelect: (date: Date) => {
        this.handleKeyboardDateSelect(date);
      },
      onClose: () => {
        this.hide();
      },
      onToday: () => {
        const today = new Date();
        this.setStartDate(today);
        this.setEndDate(today);
        this.updateView();
      },
      onClear: () => {
        this.clearSelection();
      },
    });
  }

  private setupContainerClasses(): void {
    this.container.classList.add(`opens${this.options.opens}`);

    if (this.options.singleDatePicker) {
      this.container.classList.add("single");
    }

    if (this.options.autoApply) {
      this.container.classList.add("auto-apply");
    }

    if (Object.keys(this.options.ranges).length > 0) {
      this.container.classList.add("show-ranges");
      this.renderRanges();
    }

    if (
      this.options.alwaysShowCalendars ||
      Object.keys(this.options.ranges).length === 0
    ) {
      this.container.classList.add("show-calendar");
    }

    if (!this.options.autoApply) {
      this.container.classList.add("show-calendar");
    }
  }

  private setupInitialVisibility(): void {
    if (!this.options.timePicker) {
      const timeContainers = this.container.querySelectorAll(".calendar-time");
      timeContainers.forEach((container) => {
        (container as HTMLElement).style.display = "none";
      });
    }

    this.container.style.display = "none";
  }

  // Public API methods
  show(): void {
    if (this.state.isShowing) return;

    this.storeOldValues();
    this.themeService.applyTheme();
    this.setupDocumentListeners();
    this.updateView();
    this.displayContainer();
    this.positionContainer();

    // Add active state to input arrow
    if (this.element.tagName === "INPUT") {
      this.element.classList.add("datex-active");
    }

    // Activate keyboard service with a delay to prevent scroll jump
    setTimeout(() => {
      if (this.state.isShowing) {
        this.keyboardService.activate(this.state.startDate);
      }
    }, 200);

    this.dispatchShowEvent();
  }

  hide(): void {
    if (!this.state.isShowing) return;

    this.revertIfIncomplete();
    this.triggerCallbackIfChanged();
    this.updateElement();
    this.removeDocumentListeners();
    this.keyboardService.deactivate();
    this.hideContainer();

    // Remove active state from input arrow
    if (this.element.tagName === "INPUT") {
      this.element.classList.remove("datex-active");
    }

    this.dispatchHideEvent();
  }

  toggle(): void {
    this.state.isShowing ? this.hide() : this.show();
  }

  setStartDate(date: Date): void {
    this.state.startDate = this.options.timePicker
      ? new Date(date)
      : startOfDay(date);
    if (this.options.timePickerIncrement && this.options.timePicker) {
      this.roundToIncrement(this.state.startDate);
    }
    this.updateView();
  }

  setEndDate(date: Date): void {
    this.state.endDate = this.options.timePicker
      ? new Date(date)
      : endOfDay(date);
    if (this.options.timePickerIncrement && this.options.timePicker) {
      this.roundToIncrement(this.state.endDate);
    }
    this.updateView();
  }

  getStartDate(): Date {
    return new Date(this.state.startDate);
  }

  getEndDate(): Date | null {
    return this.state.endDate ? new Date(this.state.endDate) : null;
  }

  setTheme(theme: DatexTheme): void {
    this.themeService.setTheme(theme);
  }

  setThemeMode(mode: "light" | "dark" | "auto"): void {
    this.themeService.setMode(mode);
  }

  getThemeMode(): "light" | "dark" | "auto" {
    return this.themeService.getMode();
  }

  getCurrentThemeMode(): "light" | "dark" {
    return this.themeService.getCurrentMode();
  }

  // Validation methods
  updateValidation(validation: DatexValidation): void {
    this.validationService.updateValidation(validation);
  }

  validateDate(date: Date): ValidationResult {
    return this.validationService.validateDate(date);
  }

  validateDateRange(startDate: Date, endDate: Date): ValidationResult {
    return this.validationService.validateDateRange(startDate, endDate);
  }

  // Keyboard navigation methods
  enableKeyboardNavigation(): void {
    if (this.state.isShowing) {
      this.keyboardService.activate(this.state.startDate);
    }
  }

  disableKeyboardNavigation(): void {
    this.keyboardService.deactivate();
  }

  setKeyboardFocusedDate(date: Date): void {
    this.keyboardService.setFocusedDate(date);
  }

  remove(): void {
    this.cleanup();
  }

  // Private helper methods
  private storeOldValues(): void {
    this.state.oldStartDate = new Date(this.state.startDate);
    this.state.oldEndDate = this.state.endDate
      ? new Date(this.state.endDate)
      : null;
  }

  private setupDocumentListeners(): void {
    this.eventService.setDocumentListeners(
      this.handleOutsideClick.bind(this),
      this.handleOutsideFocus.bind(this)
    );
    this.eventService.setWindowListeners(
      this.positionContainer.bind(this),
      this.positionContainer.bind(this)
    );
  }

  private removeDocumentListeners(): void {
    this.eventService.removeDocumentListeners();
    this.eventService.removeWindowListeners();
  }

  private displayContainer(): void {
    this.container.style.display = "block";
    this.state.isShowing = true;
  }

  private hideContainer(): void {
    this.container.style.display = "none";
    this.state.isShowing = false;
  }

  private positionContainer(): void {
    setTimeout(() => this.positionService.calculatePosition(), 0);
  }

  private revertIfIncomplete(): void {
    if (!this.state.endDate) {
      this.state.startDate = new Date(this.state.oldStartDate);
      this.state.endDate = this.state.oldEndDate
        ? new Date(this.state.oldEndDate)
        : null;
    }
  }

  private triggerCallbackIfChanged(): void {
    const startChanged = !isSameDate(
      this.state.startDate,
      this.state.oldStartDate,
      "day"
    );
    const endChanged =
      this.state.endDate &&
      this.state.oldEndDate &&
      !isSameDate(this.state.endDate, this.state.oldEndDate, "day");

    if (startChanged || endChanged) {
      this.callback(
        new Date(this.state.startDate),
        this.state.endDate
          ? new Date(this.state.endDate)
          : new Date(this.state.startDate),
        this.state.chosenLabel || undefined
      );
    }
  }

  private roundToIncrement(date: Date): void {
    if (!this.options.timePickerIncrement) return;

    const minutes =
      Math.round(date.getMinutes() / this.options.timePickerIncrement) *
      this.options.timePickerIncrement;
    date.setMinutes(minutes);
  }

  private dispatchShowEvent(): void {
    this.eventService.dispatchEvent(this.element, "show.daterangepicker", this);
  }

  private dispatchHideEvent(): void {
    this.eventService.dispatchEvent(this.element, "hide.daterangepicker", this);
  }

  private cleanup(): void {
    this.removeDocumentListeners();
    this.themeService.cleanup();
    this.eventService.cleanup();
    this.keyboardService.cleanup();

    if (this.container?.parentNode) {
      this.container.parentNode.removeChild(this.container);
    }

    // Remove arrow classes
    if (this.element.tagName === "INPUT") {
      this.element.classList.remove("datex-input", "datex-active");
    }
  }

  private handleKeyboardDateSelect(date: Date): void {
    console.log("DateX: Received date from keyboard:", date.toDateString());
    console.log("DateX: Received date day:", date.getDate());

    // Validate the date first
    const validation = this.validationService.validateDate(date);
    if (!validation.isValid) {
      this.showValidationError(validation.error!, validation.errorCode);
      return;
    }

    // Apply the same logic as handleDateClick
    this.state.hoverDate = null;

    if (this.state.endDate || isBeforeDate(date, this.state.startDate)) {
      this.state.endDate = null;
      this.setStartDate(date);
    } else {
      this.setEndDate(date);
      if (this.options.autoApply) {
        this.calculateChosenLabel();
        this.handleApplyClick();
      }
    }

    if (this.options.singleDatePicker) {
      this.setEndDate(this.state.startDate);
      if (this.options.autoApply) {
        this.handleApplyClick();
      }
    }

    this.updateDateClasses();
  }

  private clearSelection(): void {
    const today = new Date();
    this.state.startDate = today;
    this.state.endDate = null;
    this.state.chosenLabel = null;
    this.updateView();
  }

  private showValidationError(error: string, errorCode?: string): void {
    // Trigger validation error event if configured
    if (this.options.events?.onValidationError) {
      this.options.events.onValidationError(error, errorCode);
    }

    // Show error in UI (you can customize this)
    console.warn(`DateX Validation Error: ${error} (${errorCode})`);

    // Could add visual feedback here like highlighting invalid dates
    // or showing a tooltip with the error message
  }

  private setupEventListeners(): void {
    this.setupElementEvents();
    this.setupContainerEvents();
  }

  private setupElementEvents(): void {
    if (this.isInputOrButton()) {
      this.eventService.addEventHandler(
        this.element,
        "click",
        this.show.bind(this)
      );
      this.eventService.addEventHandler(
        this.element,
        "focus",
        this.show.bind(this)
      );
      this.eventService.addEventHandler(
        this.element,
        "keyup",
        this.handleElementChange.bind(this)
      );
      this.eventService.addEventHandler(
        this.element,
        "keydown",
        this.handleKeydown.bind(this) as EventListener
      );
    } else {
      this.eventService.addEventHandler(
        this.element,
        "click",
        this.toggle.bind(this)
      );
    }
  }

  private setupContainerEvents(): void {
    this.eventService.addEventHandler(
      this.container,
      "click",
      this.handleContainerClick.bind(this)
    );
    this.eventService.addEventHandler(
      this.container,
      "mouseover",
      this.handleContainerMouseOver.bind(this)
    );
    this.eventService.addEventHandler(
      this.container,
      "mouseleave",
      this.handleContainerMouseLeave.bind(this)
    );
    this.eventService.addEventHandler(
      this.container,
      "change",
      this.handleContainerChange.bind(this)
    );
  }

  private isInputOrButton(): boolean {
    return (
      this.element.tagName === "INPUT" || this.element.tagName === "BUTTON"
    );
  }

  private handleContainerClick(event: Event): void {
    const target = event.target as HTMLElement;

    if (target.tagName === "SELECT" || target.closest("select")) {
      return;
    }

    if (target.matches(".ranges li")) {
      this.handleRangeClick(event);
    } else if (target.matches(".applyBtn")) {
      this.handleApplyClick();
    } else if (target.matches(".cancelBtn")) {
      this.handleCancelClick();
    } else if (target.matches(".prev")) {
      this.handlePrevClick(event);
    } else if (target.matches(".next")) {
      this.handleNextClick(event);
    } else if (target.matches("td.available")) {
      this.handleDateClick(event);
    }
  }

  private handleContainerMouseOver(event: Event): void {
    const target = event.target as HTMLElement;
    if (target.matches("td.available")) {
      this.handleDateHover(event);
    }
  }

  private handleContainerMouseLeave(): void {
    if (this.state.hoverDate) {
      this.state.hoverDate = null;
      this.updateDateClasses();
    }
  }

  private handleContainerChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    if (target.matches("select.monthselect, select.yearselect")) {
      this.handleMonthYearChange(event);
    } else if (
      target.matches(
        "select.hourselect, select.minuteselect, select.secondselect, select.ampmselect"
      )
    ) {
      this.handleTimeChange(event);
    }
  }

  private handleOutsideClick(event: Event): void {
    const target = event.target as HTMLElement;

    if (
      this.element.contains(target) ||
      this.container.contains(target) ||
      target.closest(".datex-picker") ||
      target.tagName === "SELECT" ||
      target.closest("select")
    ) {
      return;
    }

    this.hide();
    this.eventService.dispatchEvent(
      this.element,
      "outsideClick.daterangepicker"
    );
  }

  private handleOutsideFocus(event: Event): void {
    const target = event.target as HTMLElement;

    if (
      this.element.contains(target) ||
      this.container.contains(target) ||
      target.closest(".datex-picker")
    ) {
      return;
    }

    setTimeout(() => {
      const activeElement = document.activeElement as HTMLElement;
      if (
        activeElement &&
        !this.element.contains(activeElement) &&
        !this.container.contains(activeElement) &&
        !activeElement.closest(".datex-picker")
      ) {
        this.hide();
      }
    }, 50);
  }

  private handleElementChange(): void {
    if (!this.isInputOrButton()) return;

    const input = this.element as HTMLInputElement;
    if (!input.value?.length) return;

    const parts = input.value.split(this.locale.separator);
    const { startDate, endDate } = this.parseDateParts(parts);

    if (
      startDate &&
      isValidDate(startDate) &&
      endDate &&
      isValidDate(endDate)
    ) {
      this.setStartDate(startDate);
      this.setEndDate(endDate);
      this.updateView();
    }
  }

  private parseDateParts(parts: string[]): {
    startDate: Date | null;
    endDate: Date | null;
  } {
    let startDate: Date | null = null;
    let endDate: Date | null = null;

    if (parts.length === 2) {
      startDate = parseDate(parts[0].trim(), this.locale.format);
      endDate = parseDate(parts[1].trim(), this.locale.format);
    } else if (this.options.singleDatePicker || parts.length === 1) {
      startDate = parseDate(parts[0].trim(), this.locale.format);
      endDate = startDate;
    }

    return { startDate, endDate };
  }

  private handleKeydown(event: KeyboardEvent): void {
    if (event.key === "Tab" || event.key === "Enter") {
      this.hide();
    } else if (event.key === "Escape") {
      event.preventDefault();
      event.stopPropagation();
      this.hide();
    }
  }

  // Event handler implementations
  private handleRangeClick(event: Event): void {
    const target = event.target as HTMLElement;
    const label = target.dataset["rangeKey"];
    if (!label) return;

    this.state.chosenLabel = label;
    this.updateActiveRange(label);

    if (label === this.locale.customRangeLabel) {
      this.showCalendars();
    } else {
      const range = this.options.ranges[label];
      if (range) {
        const [rangeStart, rangeEnd] = range;
        this.state.startDate = new Date(rangeStart);
        this.state.endDate = new Date(rangeEnd);
        this.showCalendars();
        this.updateView();

        if (this.options.autoApply) {
          this.handleApplyClick();
        }
      }
    }
  }

  private handleApplyClick(): void {
    this.hide();
    this.eventService.dispatchEvent(this.element, "apply.daterangepicker");
  }

  private handleCancelClick(): void {
    this.state.startDate = new Date(this.state.oldStartDate);
    this.state.endDate = this.state.oldEndDate
      ? new Date(this.state.oldEndDate)
      : null;
    this.hide();
    this.eventService.dispatchEvent(this.element, "cancel.daterangepicker");
  }

  private handlePrevClick(event: Event): void {
    const target = event.target as HTMLElement;
    const calendar = target.closest(".drp-calendar");
    if (!calendar) return;

    if (calendar.classList.contains("left")) {
      this.state.leftCalendar.month = addMonths(
        this.state.leftCalendar.month,
        -1
      );
      if (this.options.linkedCalendars) {
        this.state.rightCalendar.month = addMonths(
          this.state.rightCalendar.month,
          -1
        );
      }
    } else {
      this.state.rightCalendar.month = addMonths(
        this.state.rightCalendar.month,
        -1
      );
    }

    this.updateCalendars();
  }

  private handleNextClick(event: Event): void {
    const target = event.target as HTMLElement;
    const calendar = target.closest(".drp-calendar");
    if (!calendar) return;

    if (calendar.classList.contains("left")) {
      this.state.leftCalendar.month = addMonths(
        this.state.leftCalendar.month,
        1
      );
    } else {
      this.state.rightCalendar.month = addMonths(
        this.state.rightCalendar.month,
        1
      );
      if (this.options.linkedCalendars) {
        this.state.leftCalendar.month = addMonths(
          this.state.leftCalendar.month,
          1
        );
      }
    }

    this.updateCalendars();
  }

  private handleDateClick(event: Event): void {
    const target = event.target as HTMLElement;
    if (!target.classList.contains("available")) return;

    const dateStr = target.dataset["date"];
    if (!dateStr) return;

    const clickedDate = parseDate(dateStr, "YYYY-MM-DD");
    if (!isValidDate(clickedDate)) return;

    // Validate the date first
    const validation = this.validationService.validateDate(clickedDate);
    if (!validation.isValid) {
      this.showValidationError(validation.error!, validation.errorCode);
      return;
    }

    // Trigger beforeDateSelect event if configured
    if (this.options.events?.beforeDateSelect) {
      if (!this.options.events.beforeDateSelect(clickedDate)) {
        return; // User cancelled the selection
      }
    }

    this.applyTimeToDate(clickedDate, target);
    this.state.hoverDate = null;

    if (this.state.endDate || isBeforeDate(clickedDate, this.state.startDate)) {
      this.state.endDate = null;
      this.setStartDate(clickedDate);
    } else {
      this.setEndDate(clickedDate);

      // Validate date range if both dates are selected
      if (this.state.startDate && this.state.endDate) {
        const rangeValidation = this.validationService.validateDateRange(
          this.state.startDate,
          this.state.endDate
        );
        if (!rangeValidation.isValid) {
          this.showValidationError(
            rangeValidation.error!,
            rangeValidation.errorCode
          );
          this.state.endDate = null; // Reset end date if range is invalid
          this.updateDateClasses();
          return;
        }
      }

      if (this.options.autoApply) {
        this.calculateChosenLabel();
        this.handleApplyClick();
      }
    }

    if (this.options.singleDatePicker) {
      this.setEndDate(this.state.startDate);
      if (this.options.autoApply) {
        this.handleApplyClick();
      }
    }

    // Trigger onDateSelect event if configured
    if (this.options.events?.onDateSelect) {
      this.options.events.onDateSelect(clickedDate);
    }

    this.updateDateClasses();
  }

  private handleDateHover(event: Event): void {
    const target = event.target as HTMLElement;
    if (!target.classList.contains("available")) return;

    const dateStr = target.dataset["date"];
    if (!dateStr) return;

    const hoverDate = parseDate(dateStr, "YYYY-MM-DD");
    if (!isValidDate(hoverDate)) return;

    if (!this.state.endDate && !isBeforeDate(hoverDate, this.state.startDate)) {
      this.state.hoverDate = hoverDate;
      this.updateDateClasses();
    }
  }

  private handleMonthYearChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const calendar = target.closest(".drp-calendar");
    if (!calendar) return;

    const isLeft = calendar.classList.contains("left");
    const monthSelect = calendar.querySelector(
      ".monthselect"
    ) as HTMLSelectElement;
    const yearSelect = calendar.querySelector(
      ".yearselect"
    ) as HTMLSelectElement;

    if (!monthSelect || !yearSelect) return;

    const month = parseInt(monthSelect.value, 10);
    const year = parseInt(yearSelect.value, 10);
    const newDate = new Date(year, month, 1);

    if (isLeft) {
      this.state.leftCalendar.month = newDate;
      if (this.options.linkedCalendars) {
        this.state.rightCalendar.month = addMonths(newDate, 1);
      }
    } else {
      this.state.rightCalendar.month = newDate;
      if (this.options.linkedCalendars) {
        this.state.leftCalendar.month = addMonths(newDate, -1);
      }
    }

    this.updateCalendars();
  }

  private handleTimeChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const calendar = target.closest(".drp-calendar");
    if (!calendar) return;

    const isLeft = calendar.classList.contains("left");
    const targetDate = isLeft
      ? this.state.startDate
      : this.state.endDate || this.state.startDate;

    // Get all time selectors
    const hourSelect = calendar.querySelector(
      ".hourselect"
    ) as HTMLSelectElement;
    const minuteSelect = calendar.querySelector(
      ".minuteselect"
    ) as HTMLSelectElement;
    const secondSelect = calendar.querySelector(
      ".secondselect"
    ) as HTMLSelectElement;
    const ampmSelect = calendar.querySelector(
      ".ampmselect"
    ) as HTMLSelectElement;

    if (!hourSelect || !minuteSelect) return;

    // Parse values
    let hour = parseInt(hourSelect.value, 10);
    const minute = parseInt(minuteSelect.value, 10) || 0;
    const second = secondSelect ? parseInt(secondSelect.value, 10) : 0;

    // Handle AM/PM conversion
    if (!this.options.timePicker24Hour && ampmSelect) {
      const ampm = ampmSelect.value;
      if (ampm === "PM" && hour < 12) hour += 12;
      if (ampm === "AM" && hour === 12) hour = 0;
    }

    // Update the target date
    const newDate = new Date(targetDate);
    newDate.setHours(hour);
    newDate.setMinutes(minute);
    newDate.setSeconds(second);

    // Apply time picker increment validation
    if (this.options.timePickerIncrement) {
      this.roundToIncrement(newDate);
    }

    // Validate against min/max dates
    if (this.options.minDate && newDate < this.options.minDate) {
      return; // Don't update if before min date
    }
    if (this.options.maxDate && newDate > this.options.maxDate) {
      return; // Don't update if after max date
    }

    // Apply date validation service if available
    if (this.validationService) {
      const validation = this.validationService.validateDate(newDate);
      if (!validation.isValid) {
        // Show validation error but don't update
        this.showValidationError(validation.error!, validation.errorCode);
        return;
      }
    }

    // Update the appropriate date
    if (isLeft) {
      this.state.startDate = newDate;
      // If single date picker, also update end date
      if (this.options.singleDatePicker) {
        this.state.endDate = newDate;
      }
      // If end date exists and is on same day but before start time, update it
      else if (
        this.state.endDate &&
        this.state.endDate.toDateString() === newDate.toDateString() &&
        this.state.endDate < newDate
      ) {
        this.state.endDate = new Date(newDate);
      }
    } else if (this.state.endDate) {
      this.state.endDate = newDate;
    }

    // Only update the display, NOT the input
    this.updateSelectedDisplay();

    // Re-render time pickers to update available options
    this.updateCalendars();

    // Update form inputs (enable/disable apply button)
    this.updateFormInputs();
  }

  // View update methods
  private updateView(): void {
    this.updateMonthsInView();
    this.updateCalendars();
    this.updateFormInputs();
    this.updateSelectedDisplay();
    this.calculateChosenLabel();

    // Update time picker controls if enabled
    if (this.options.timePicker) {
      this.updateTimePickerControls();
    }
  }

  private updateTimePickerControls(): void {
    // Disable right side time controls if no end date
    const rightTimeControls = this.container.querySelectorAll(
      ".right .calendar-time select"
    );
    if (!this.state.endDate) {
      rightTimeControls.forEach((control) => {
        (control as HTMLSelectElement).disabled = true;
        control.classList.add("disabled");
      });
    } else {
      rightTimeControls.forEach((control) => {
        (control as HTMLSelectElement).disabled = false;
        control.classList.remove("disabled");
      });
    }
  }

  private updateMonthsInView(): void {
    if (this.state.endDate) {
      this.state.leftCalendar.month = getStartOfMonth(this.state.startDate);
      if (
        !this.options.linkedCalendars &&
        (this.state.endDate.getMonth() !== this.state.startDate.getMonth() ||
          this.state.endDate.getFullYear() !==
            this.state.startDate.getFullYear())
      ) {
        this.state.rightCalendar.month = getStartOfMonth(this.state.endDate);
      } else {
        this.state.rightCalendar.month = addMonths(
          this.state.leftCalendar.month,
          1
        );
      }
    } else {
      this.state.leftCalendar.month = getStartOfMonth(this.state.startDate);
      this.state.rightCalendar.month = addMonths(
        this.state.leftCalendar.month,
        1
      );
    }
  }

  private updateCalendars(): void {
    this.renderCalendar("left");
    if (!this.options.singleDatePicker) {
      this.renderCalendar("right");
    }
  }

  private renderCalendar(side: "left" | "right"): void {
    const calendar =
      side === "left" ? this.state.leftCalendar : this.state.rightCalendar;
    const calendarContainer = this.container.querySelector(
      `.drp-calendar.${side} .calendar-table`
    )!;

    calendar.calendar = this.calendarService.buildCalendarMatrix(
      calendar.month
    );

    const canGoPrev = this.calendarService.canNavigatePrevious(calendar.month);
    const canGoNext = this.calendarService.canNavigateNext(calendar.month);

    const html = this.calendarService.renderCalendarHTML(
      calendar,
      side,
      this.state.startDate,
      this.state.endDate,
      canGoPrev,
      canGoNext
    );

    calendarContainer.innerHTML = html;
  }

  private updateFormInputs(): void {
    const applyBtn = this.container.querySelector(
      ".applyBtn"
    ) as HTMLButtonElement;
    const isValid =
      this.options.singleDatePicker ||
      (this.state.endDate &&
        (isBeforeDate(this.state.startDate, this.state.endDate) ||
          isSameDate(this.state.startDate, this.state.endDate, "day")));

    applyBtn.disabled = !isValid;
  }

  private updateSelectedDisplay(): void {
    const selectedSpan = this.container.querySelector(".drp-selected")!;
    let text = formatDate(this.state.startDate, this.locale.format);

    if (!this.options.singleDatePicker && this.state.endDate) {
      text +=
        this.locale.separator +
        formatDate(this.state.endDate, this.locale.format);
    }

    selectedSpan.textContent = text;
  }

  private updateElement(): void {
    if (this.element.tagName === "INPUT" && this.options.autoUpdateInput) {
      const input = this.element as HTMLInputElement;
      let newValue = formatDate(this.state.startDate, this.locale.format);

      if (!this.options.singleDatePicker && this.state.endDate) {
        newValue +=
          this.locale.separator +
          formatDate(this.state.endDate, this.locale.format);
      }

      if (newValue !== input.value) {
        input.value = newValue;
        this.eventService.dispatchEvent(this.element, "change");
      }
    }
  }

  private renderRanges(): void {
    const rangesContainer = this.container.querySelector(".ranges")!;
    rangesContainer.innerHTML = this.createRangeService().renderRanges();
  }

  private calculateChosenLabel(): void {
    const rangeService = this.createRangeService();
    this.state.chosenLabel = rangeService.calculateChosenLabel(
      this.state.startDate,
      this.state.endDate
    );
    rangeService.updateActiveRange(this.container, this.state.chosenLabel);

    if (Object.keys(this.options.ranges).length > 0) {
      this.showCalendars();
    }
  }

  private updateActiveRange(label: string): void {
    const rangeService = this.createRangeService();
    rangeService.updateActiveRange(this.container, label);
  }

  private showCalendars(): void {
    this.container.classList.add("show-calendar");
    this.positionContainer();
    this.eventService.dispatchEvent(
      this.element,
      "showCalendar.daterangepicker"
    );
  }

  private updateDateClasses(): void {
    const allDates = this.container.querySelectorAll("td[data-date]");

    allDates.forEach((td) => {
      const dateStr = (td as HTMLElement).dataset["date"];
      if (!dateStr) return;

      const date = parseDate(dateStr, "YYYY-MM-DD");
      if (!isValidDate(date)) return;

      td.classList.remove("in-range", "end-date", "start-date", "active");

      const startDate = this.state.startDate;
      const endDate = this.state.endDate;
      const hoverDate = this.state.hoverDate;

      if (startDate && isSameDate(date, startDate, "day")) {
        td.classList.add("active", "start-date");
      }

      if (endDate && isSameDate(date, endDate, "day")) {
        td.classList.add("active", "end-date");
      }

      if (startDate && endDate) {
        if (isAfterDate(date, startDate) && isBeforeDate(date, endDate)) {
          td.classList.add("in-range");
        }
      }

      if (startDate && hoverDate && !endDate) {
        const rangeStart = isBeforeDate(hoverDate, startDate)
          ? hoverDate
          : startDate;
        const rangeEnd = isBeforeDate(hoverDate, startDate)
          ? startDate
          : hoverDate;

        if (isSameDate(date, hoverDate, "day")) {
          td.classList.add("end-date");
        } else if (
          isAfterDate(date, rangeStart) &&
          isBeforeDate(date, rangeEnd)
        ) {
          td.classList.add("in-range");
        }
      }
    });
  }

  private applyTimeToDate(date: Date, target: HTMLElement): void {
    if (!this.options.timePicker) return;

    const calendar = target.closest(".drp-calendar");
    if (!calendar) return;

    const hourSelect = calendar.querySelector(
      ".hourselect"
    ) as HTMLSelectElement;
    const minuteSelect = calendar.querySelector(
      ".minuteselect"
    ) as HTMLSelectElement;
    const secondSelect = calendar.querySelector(
      ".secondselect"
    ) as HTMLSelectElement;
    const ampmSelect = calendar.querySelector(
      ".ampmselect"
    ) as HTMLSelectElement;

    if (hourSelect) {
      let hour = parseInt(hourSelect.value, 10);
      if (!this.options.timePicker24Hour && ampmSelect) {
        const ampm = ampmSelect.value;
        if (ampm === "PM" && hour < 12) hour += 12;
        if (ampm === "AM" && hour === 12) hour = 0;
      }
      date.setHours(hour);
    }

    if (minuteSelect) {
      const minute = parseInt(minuteSelect.value, 10) || 0;
      date.setMinutes(minute);
    }

    if (this.options.timePickerSeconds && secondSelect) {
      date.setSeconds(parseInt(secondSelect.value, 10));
    }
  }

  private createRangeService() {
    return {
      renderRanges: () => {
        let html = "<ul>";
        for (const [label] of Object.entries(this.options.ranges)) {
          html += `<li data-range-key="${label}">${label}</li>`;
        }
        if (this.options.showCustomRangeLabel) {
          html += `<li data-range-key="${this.locale.customRangeLabel}">${this.locale.customRangeLabel}</li>`;
        }
        html += "</ul>";
        return html;
      },
      calculateChosenLabel: (startDate: Date, endDate: Date | null) => {
        let bestMatch: { label: string; days: number } | null = null;
        for (const [label, [rangeStart, rangeEnd]] of Object.entries(
          this.options.ranges
        )) {
          const startMatches = isSameDate(startDate, rangeStart, "day");
          let endMatches = false;
          if (endDate) {
            endMatches = isSameDate(endDate, rangeEnd, "day");
          } else {
            endMatches = isSameDate(startDate, rangeEnd, "day");
          }
          if (startMatches && endMatches) {
            const rangeDays =
              Math.abs(rangeEnd.getTime() - rangeStart.getTime()) /
                (1000 * 60 * 60 * 24) +
              1;
            if (!bestMatch || rangeDays > bestMatch.days) {
              bestMatch = { label, days: rangeDays };
            }
          }
        }
        return bestMatch
          ? bestMatch.label
          : this.options.showCustomRangeLabel
          ? this.locale.customRangeLabel
          : null;
      },
      updateActiveRange: (
        container: HTMLElement,
        chosenLabel: string | null
      ) => {
        const rangeItems = container.querySelectorAll(".ranges li");
        rangeItems.forEach((item) => item.classList.remove("active"));
        if (chosenLabel) {
          const activeItem = container.querySelector(
            `[data-range-key="${chosenLabel}"]`
          );
          activeItem?.classList.add("active");
        }
      },
    };
  }
}
