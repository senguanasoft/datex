/**
 * Date utility functions for DateX
 */

// Date formatting and parsing functions
export function format(date: Date, formatStr: string): string {
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

export function parse(dateStr: string, formatStr: string): Date {
  // Simple parser for common formats
  if (formatStr === "YYYY-MM-DD") {
    return new Date(dateStr);
  }

  // Handle MM/DD/YYYY format
  if (formatStr === "MM/DD/YYYY") {
    const parts = dateStr.split("/");
    if (parts.length === 3) {
      return new Date(
        parseInt(parts[2]),
        parseInt(parts[0]) - 1,
        parseInt(parts[1])
      );
    }
  }

  // Handle DD/MM/YYYY format
  if (formatStr === "DD/MM/YYYY") {
    const parts = dateStr.split("/");
    if (parts.length === 3) {
      return new Date(
        parseInt(parts[2]),
        parseInt(parts[1]) - 1,
        parseInt(parts[0])
      );
    }
  }

  // Handle DD.MM.YYYY format
  if (formatStr === "DD.MM.YYYY") {
    const parts = dateStr.split(".");
    if (parts.length === 3) {
      return new Date(
        parseInt(parts[2]),
        parseInt(parts[1]) - 1,
        parseInt(parts[0])
      );
    }
  }

  // Handle formats with time
  if (formatStr.includes("HH:mm")) {
    const [datePart, timePart] = dateStr.split(" ");
    let date: Date;

    if (formatStr.startsWith("DD/MM/YYYY")) {
      const parts = datePart.split("/");
      date = new Date(
        parseInt(parts[2]),
        parseInt(parts[1]) - 1,
        parseInt(parts[0])
      );
    } else if (formatStr.startsWith("MM/DD/YYYY")) {
      const parts = datePart.split("/");
      date = new Date(
        parseInt(parts[2]),
        parseInt(parts[0]) - 1,
        parseInt(parts[1])
      );
    } else {
      date = new Date(datePart);
    }

    if (timePart) {
      const [hours, minutes] = timePart.split(":");
      date.setHours(parseInt(hours), parseInt(minutes));
    }

    return date;
  }

  // Fallback to native Date parsing
  return new Date(dateStr);
}

export function addDay(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export function addMonth(date: Date, months: number): Date {
  const result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result;
}

export function dayStart(date: Date): Date {
  const result = new Date(date);
  result.setHours(0, 0, 0, 0);
  return result;
}

export function dayEnd(date: Date): Date {
  const result = new Date(date);
  result.setHours(23, 59, 59, 999);
  return result;
}

export function isAfter(date1: Date, date2: Date): boolean {
  return date1.getTime() > date2.getTime();
}

export function isBefore(date1: Date, date2: Date): boolean {
  return date1.getTime() < date2.getTime();
}

// Helper functions since @formkit/tempo doesn't have isSame and isValid
export function isSame(
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

export function isValid(date: Date | null | undefined): date is Date {
  return date instanceof Date && !isNaN(date.getTime());
}

export function getStartOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

export function getEndOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

export function getStartOfWeek(date: Date, firstDay = 1): Date {
  const day = date.getDay(); // 0=Dom, 1=Lun, 2=Mar, 3=Mie, 4=Jue, 5=Vie, 6=Sab

  // Calcular cuántos días retroceder para llegar al primer día de la semana
  const daysBack = (day - firstDay + 7) % 7;

  const result = new Date(date);
  result.setDate(date.getDate() - daysBack);
  return result;
}

/**
 * Generate common date ranges
 */
export function getCommonRanges(): Record<string, [Date, Date]> {
  const today = new Date();
  const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
  const sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
  const thirtyDaysAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const startOfWeek = new Date(
    today.getTime() - today.getDay() * 24 * 60 * 60 * 1000
  );

  return {
    Today: [today, today],
    Yesterday: [yesterday, yesterday],
    "Last 7 Days": [sevenDaysAgo, today],
    "Last 30 Days": [thirtyDaysAgo, today],
    "This Month": [startOfMonth, today],
    "This Week": [startOfWeek, today],
  };
}

/**
 * Generate Spanish date ranges
 */
export function getSpanishRanges(): Record<string, [Date, Date]> {
  const today = new Date();
  const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
  const sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
  const thirtyDaysAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const startOfWeek = new Date(
    today.getTime() - today.getDay() * 24 * 60 * 60 * 1000
  );

  return {
    Hoy: [today, today],
    Ayer: [yesterday, yesterday],
    "Últimos 7 días": [sevenDaysAgo, today],
    "Últimos 30 días": [thirtyDaysAgo, today],
    "Este mes": [startOfMonth, today],
    "Esta semana": [startOfWeek, today],
  };
}
