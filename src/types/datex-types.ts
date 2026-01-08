/**
 * Type definitions for Datex date picker
 */

import { DatexValidation } from "../services/validation-service";

export interface DatexTheme {
  primaryColor?: string;
  secondaryColor?: string;
  backgroundColor?: string;
  borderColor?: string;
  textColor?: string;
  hoverColor?: string;
  selectedColor?: string;
  rangeColor?: string;
  todayColor?: string;
  disabledColor?: string;
  applyButtonColor?: string;
  cancelButtonColor?: string;
  borderRadius?: string;
  fontSize?: string;
  fontFamily?: string;
}

export interface DatexLocale {
  format: string;
  separator: string;
  applyLabel: string;
  cancelLabel: string;
  customRangeLabel: string;
  daysOfWeek: string[];
  monthNames: string[];
  firstDay: number;
}

export interface DatexEvents {
  onOpen?: () => void;
  onClose?: () => void;
  onMonthChange?: (month: Date) => void;
  onYearChange?: (year: number) => void;
  onDateHover?: (date: Date) => void;
  onValidationError?: (error: string, errorCode?: string) => void;
  beforeDateSelect?: (date: Date) => boolean;
  onDateSelect?: (date: Date) => void;
  onRangeSelect?: (startDate: Date, endDate: Date) => void;
}

export interface DatexOptions {
  startDate?: Date;
  endDate?: Date;
  minDate?: Date | null;
  maxDate?: Date | null;
  minYear?: number;
  maxYear?: number;
  maxSpan?: { days?: number } | null;
  autoApply?: boolean;
  singleDatePicker?: boolean;
  showDropdowns?: boolean;
  linkedCalendars?: boolean;
  autoUpdateInput?: boolean;
  alwaysShowCalendars?: boolean;
  showCustomRangeLabel?: boolean;
  timePicker?: boolean;
  timePicker24Hour?: boolean;
  timePickerIncrement?: number;
  timePickerSeconds?: boolean;
  ranges?: Record<string, [Date, Date]>;
  opens?: "left" | "right" | "center";
  drops?: "up" | "down" | "auto";
  locale?: DatexLocale;
  buttonClasses?: string;
  applyButtonClasses?: string;
  cancelButtonClasses?: string;
  theme?: DatexTheme;
  validation?: DatexValidation;
  events?: DatexEvents;
}

export type DatexCallback = (
  startDate: Date,
  endDate: Date,
  label?: string
) => void;

export interface CalendarState {
  month: Date;
  calendar: Date[][];
}

export interface PickerState {
  startDate: Date;
  endDate: Date | null;
  oldStartDate: Date;
  oldEndDate: Date | null;
  isShowing: boolean;
  leftCalendar: CalendarState;
  rightCalendar: CalendarState;
  chosenLabel: string | null;
  hoverDate: Date | null;
}
