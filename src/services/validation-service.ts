/**
 * Validation service for advanced date validation
 */

export interface DatexValidation {
  disabledDates?: Date[];
  disabledDaysOfWeek?: number[]; // 0-6 (domingo-sábado)
  minDaysBetween?: number;
  maxDaysBetween?: number;
  businessDaysOnly?: boolean;
  customValidator?: (date: Date) => boolean;
  holidays?: Date[];
  enabledDateRanges?: [Date, Date][];
}

export interface ValidationResult {
  isValid: boolean;
  error?: string;
  errorCode?: string;
}

export class ValidationService {
  private validation: DatexValidation;

  constructor(validation: DatexValidation = {}) {
    this.validation = validation;
  }

  updateValidation(validation: DatexValidation): void {
    this.validation = { ...this.validation, ...validation };
  }

  validateDate(date: Date): ValidationResult {
    // Check disabled dates
    if (this.validation.disabledDates?.some((d) => this.isSameDate(d, date))) {
      return {
        isValid: false,
        error: "Esta fecha está deshabilitada",
        errorCode: "DISABLED_DATE",
      };
    }

    // Check disabled days of week
    if (this.validation.disabledDaysOfWeek?.includes(date.getDay())) {
      const dayNames = [
        "Domingo",
        "Lunes",
        "Martes",
        "Miércoles",
        "Jueves",
        "Viernes",
        "Sábado",
      ];
      return {
        isValid: false,
        error: `Los ${dayNames[date.getDay()]}s están deshabilitados`,
        errorCode: "DISABLED_DAY_OF_WEEK",
      };
    }

    // Check business days only
    if (this.validation.businessDaysOnly && this.isWeekend(date)) {
      return {
        isValid: false,
        error: "Solo se permiten días laborables",
        errorCode: "BUSINESS_DAYS_ONLY",
      };
    }

    // Check holidays
    if (this.validation.holidays?.some((h) => this.isSameDate(h, date))) {
      return {
        isValid: false,
        error: "Los días festivos están deshabilitados",
        errorCode: "HOLIDAY_DISABLED",
      };
    }

    // Check enabled date ranges
    if (
      this.validation.enabledDateRanges &&
      !this.isDateInEnabledRanges(date)
    ) {
      return {
        isValid: false,
        error: "Esta fecha está fuera de los rangos permitidos",
        errorCode: "OUTSIDE_ENABLED_RANGE",
      };
    }

    // Custom validator
    if (
      this.validation.customValidator &&
      !this.validation.customValidator(date)
    ) {
      return {
        isValid: false,
        error: "Esta fecha no cumple con los criterios personalizados",
        errorCode: "CUSTOM_VALIDATION_FAILED",
      };
    }

    return { isValid: true };
  }

  validateDateRange(startDate: Date, endDate: Date): ValidationResult {
    // Validate individual dates first
    const startValidation = this.validateDate(startDate);
    if (!startValidation.isValid) {
      return startValidation;
    }

    const endValidation = this.validateDate(endDate);
    if (!endValidation.isValid) {
      return endValidation;
    }

    // Check min days between
    if (this.validation.minDaysBetween) {
      const daysBetween = this.getDaysBetween(startDate, endDate);
      if (daysBetween < this.validation.minDaysBetween) {
        return {
          isValid: false,
          error: `Debe haber al menos ${this.validation.minDaysBetween} días entre las fechas`,
          errorCode: "MIN_DAYS_BETWEEN",
        };
      }
    }

    // Check max days between
    if (this.validation.maxDaysBetween) {
      const daysBetween = this.getDaysBetween(startDate, endDate);
      if (daysBetween > this.validation.maxDaysBetween) {
        return {
          isValid: false,
          error: `No puede haber más de ${this.validation.maxDaysBetween} días entre las fechas`,
          errorCode: "MAX_DAYS_BETWEEN",
        };
      }
    }

    return { isValid: true };
  }

  // Utility methods
  private isSameDate(date1: Date, date2: Date): boolean {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }

  private isWeekend(date: Date): boolean {
    const day = date.getDay();
    return day === 0 || day === 6; // Sunday or Saturday
  }

  private getDaysBetween(startDate: Date, endDate: Date): number {
    const timeDiff = endDate.getTime() - startDate.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  }

  private isDateInEnabledRanges(date: Date): boolean {
    if (!this.validation.enabledDateRanges) return true;

    return this.validation.enabledDateRanges.some(([start, end]) => {
      return date >= start && date <= end;
    });
  }

  // Public utility methods
  getBusinessDays(startDate: Date, endDate: Date): number {
    let count = 0;
    const current = new Date(startDate);

    while (current <= endDate) {
      if (!this.isWeekend(current)) {
        count++;
      }
      current.setDate(current.getDate() + 1);
    }

    return count;
  }

  addBusinessDays(date: Date, days: number): Date {
    const result = new Date(date);
    let addedDays = 0;

    while (addedDays < days) {
      result.setDate(result.getDate() + 1);
      if (!this.isWeekend(result)) {
        addedDays++;
      }
    }

    return result;
  }

  isHoliday(date: Date): boolean {
    return (
      this.validation.holidays?.some((h) => this.isSameDate(h, date)) || false
    );
  }
}
