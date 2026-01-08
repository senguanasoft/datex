/**
 * Native date utility functions
 * Provides date manipulation and formatting without external dependencies
 */

export function formatDate(date: Date, formatStr: string): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return formatStr
    .replace(/YYYY/g, String(year))
    .replace(/MM/g, month)
    .replace(/DD/g, day)
    .replace(/HH/g, hours)
    .replace(/mm/g, minutes)
    .replace(/ss/g, seconds);
}

export function addMonths(date: Date, months: number): Date {
  const result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result;
}

export function startOfDay(date: Date): Date {
  const result = new Date(date);
  result.setHours(0, 0, 0, 0);
  return result;
}

export function endOfDay(date: Date): Date {
  const result = new Date(date);
  result.setHours(23, 59, 59, 999);
  return result;
}

export function isAfterDate(date1: Date, date2: Date): boolean {
  return date1.getTime() > date2.getTime();
}

export function isBeforeDate(date1: Date, date2: Date): boolean {
  return date1.getTime() < date2.getTime();
}

export function isSameDate(
  date1: Date,
  date2: Date,
  unit: "day" | "month" | "year" = "day"
): boolean {
  if (!date1 || !date2) return false;

  switch (unit) {
    case "day":
      return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
      );
    case "month":
      return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth()
      );
    case "year":
      return date1.getFullYear() === date2.getFullYear();
    default:
      return false;
  }
}

export function isValidDate(date: Date | null | undefined): date is Date {
  return date instanceof Date && !isNaN(date.getTime());
}

export function parseDate(dateStr: string, formatStr: string): Date {
  if (formatStr === "YYYY-MM-DD") {
    // Parse YYYY-MM-DD format manually to avoid timezone issues
    const parts = dateStr.split("-");
    if (parts.length === 3) {
      const year = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1; // Month is 0-indexed
      const day = parseInt(parts[2], 10);
      return new Date(year, month, day);
    }
    return new Date(dateStr);
  }

  if (formatStr === "DD/MM/YYYY") {
    const parts = dateStr.split("/");
    if (parts.length === 3) {
      const day = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const year = parseInt(parts[2], 10);
      return new Date(year, month, day);
    }
  }

  if (formatStr === "DD/MM/YYYY HH:mm") {
    const [datePart, timePart] = dateStr.split(" ");
    const dateParts = datePart.split("/");
    const timeParts = timePart ? timePart.split(":") : ["0", "0"];

    if (dateParts.length === 3) {
      const day = parseInt(dateParts[0], 10);
      const month = parseInt(dateParts[1], 10) - 1;
      const year = parseInt(dateParts[2], 10);
      const hours = parseInt(timeParts[0], 10) || 0;
      const minutes = parseInt(timeParts[1], 10) || 0;
      return new Date(year, month, day, hours, minutes);
    }
  }

  return new Date(dateStr);
}

export function getStartOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

export function getEndOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

export function getStartOfWeek(date: Date, firstDay = 1): Date {
  const day = date.getDay();
  const daysBack = (day - firstDay + 7) % 7;
  const result = new Date(date);
  result.setDate(date.getDate() - daysBack);
  return result;
}
