/**
 * Predefined themes for Datex date picker
 */

import { DatexTheme } from "../types/datex-types";

export const DEFAULT_THEME: DatexTheme = {
  primaryColor: "#357ebd",
  secondaryColor: "#ccc",
  backgroundColor: "#ffffff",
  borderColor: "#ddd",
  textColor: "#000000",
  hoverColor: "#eee",
  selectedColor: "#357ebd",
  rangeColor: "#ebf4f8",
  todayColor: "#357ebd",
  disabledColor: "#999",
  applyButtonColor: "#357ebd",
  cancelButtonColor: "#999",
  borderRadius: "4px",
  fontSize: "15px",
  fontFamily: "arial",
};

export const BOOTSTRAP_THEME: DatexTheme = {
  primaryColor: "#0d6efd",
  secondaryColor: "#6c757d",
  backgroundColor: "#ffffff",
  borderColor: "#dee2e6",
  textColor: "#212529",
  hoverColor: "#e9ecef",
  selectedColor: "#0d6efd",
  rangeColor: "#cfe2ff",
  todayColor: "#0d6efd",
  disabledColor: "#adb5bd",
  applyButtonColor: "#198754",
  cancelButtonColor: "#dc3545",
  borderRadius: "6px",
  fontSize: "14px",
  fontFamily:
    'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
};

export const MATERIAL_THEME: DatexTheme = {
  primaryColor: "#1976d2",
  secondaryColor: "#757575",
  backgroundColor: "#ffffff",
  borderColor: "#e0e0e0",
  textColor: "#212121",
  hoverColor: "#f5f5f5",
  selectedColor: "#1976d2",
  rangeColor: "#e3f2fd",
  todayColor: "#1976d2",
  disabledColor: "#bdbdbd",
  applyButtonColor: "#4caf50",
  cancelButtonColor: "#f44336",
  borderRadius: "8px", // Material Design usa bordes más redondeados
  fontSize: "14px",
  fontFamily: 'Roboto, "Helvetica Neue", Arial, sans-serif',
};
