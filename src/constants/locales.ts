/**
 * Predefined locales for DateX
 */

import type { DateRangePickerLocale } from "../types";

export const ENGLISH_LOCALE: DateRangePickerLocale = {
  format: "MM/DD/YYYY",
  separator: " - ",
  applyLabel: "Apply",
  cancelLabel: "Cancel",
  customRangeLabel: "Custom Range",
  daysOfWeek: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
  monthNames: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  firstDay: 0, // Sunday
};

export const SPANISH_LOCALE: DateRangePickerLocale = {
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
  firstDay: 1, // Monday
};

export const SPANISH_LOCALE_WITH_TIME: DateRangePickerLocale = {
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
  firstDay: 1, // Monday
};

export const FRENCH_LOCALE: DateRangePickerLocale = {
  format: "DD/MM/YYYY",
  separator: " - ",
  applyLabel: "Appliquer",
  cancelLabel: "Annuler",
  customRangeLabel: "Plage Personnalisée",
  daysOfWeek: ["Lu", "Ma", "Me", "Je", "Ve", "Sa", "Di"],
  monthNames: [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ],
  firstDay: 1, // Monday
};

export const GERMAN_LOCALE: DateRangePickerLocale = {
  format: "DD.MM.YYYY",
  separator: " - ",
  applyLabel: "Anwenden",
  cancelLabel: "Abbrechen",
  customRangeLabel: "Benutzerdefiniert",
  daysOfWeek: ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"],
  monthNames: [
    "Januar",
    "Februar",
    "März",
    "April",
    "Mai",
    "Juni",
    "Juli",
    "August",
    "September",
    "Oktober",
    "November",
    "Dezember",
  ],
  firstDay: 1, // Monday
};
