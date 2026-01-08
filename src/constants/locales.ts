/**
 * Predefined locales for Datex date picker
 */

import { DatexLocale } from "../types/datex-types";

export const SPANISH_LOCALE: DatexLocale = {
  format: "DD/MM/YYYY",
  separator: " - ",
  applyLabel: "Aplicar",
  cancelLabel: "Cancelar",
  customRangeLabel: "Rango Personalizado",
  daysOfWeek: ["Lu", "Ma", "Mi", "Ju", "Vi", "Sa", "Do"],
  monthNames: [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ],
  firstDay: 1,
};

export const SPANISH_LOCALE_WITH_TIME: DatexLocale = {
  format: "DD/MM/YYYY HH:mm",
  separator: " - ",
  applyLabel: "Aplicar",
  cancelLabel: "Cancelar",
  customRangeLabel: "Rango Personalizado",
  daysOfWeek: ["Lu", "Ma", "Mi", "Ju", "Vi", "Sa", "Do"],
  monthNames: [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ],
  firstDay: 1,
};
