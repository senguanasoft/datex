/**
 * Datex - Modern Date Range Picker
 * Main entry point for the library
 */

export { Datex } from "./datex";

// Export types and interfaces
export type {
  DatexOptions,
  DatexCallback,
  DatexTheme,
  DatexLocale,
  DatexEvents,
  CalendarState,
  PickerState,
} from "./types/datex-types";

// Export validation types
export type {
  DatexValidation,
  ValidationResult,
} from "./services/validation-service";

// Export predefined themes
export {
  DEFAULT_THEME,
  BOOTSTRAP_THEME,
  MATERIAL_THEME,
} from "./constants/themes";

// Export predefined locales
export { SPANISH_LOCALE, SPANISH_LOCALE_WITH_TIME } from "./constants/locales";

// Export utility functions for advanced usage
export {
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
