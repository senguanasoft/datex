/**
 * Theme management service for Datex date picker
 */

import { DatexTheme } from "../types/datex-types";
import { DEFAULT_THEME } from "../constants/themes";

export type ThemeMode = "light" | "dark" | "auto";

export class ThemeService {
  private theme: DatexTheme;
  private container: HTMLElement;
  private styleId?: string;
  private mode: ThemeMode = "light";
  private mediaQuery?: MediaQueryList;

  constructor(container: HTMLElement, theme: DatexTheme = DEFAULT_THEME) {
    this.container = container;
    this.theme = { ...DEFAULT_THEME, ...theme };
    this.setupMediaQueryListener();
  }

  applyTheme(): void {
    this.removeExistingStyles();
    this.createAndApplyStyles();
    this.forceReflow();
  }

  setTheme(theme: DatexTheme): void {
    this.theme = { ...DEFAULT_THEME, ...theme };
    this.applyTheme();
  }

  setMode(mode: ThemeMode): void {
    this.mode = mode;
    this.applyTheme();
  }

  getMode(): ThemeMode {
    return this.mode;
  }

  getCurrentMode(): "light" | "dark" {
    if (this.mode === "auto") {
      return this.mediaQuery?.matches ? "dark" : "light";
    }
    return this.mode === "dark" ? "dark" : "light";
  }

  cleanup(): void {
    this.removeExistingStyles();
    if (this.mediaQuery) {
      this.mediaQuery.removeEventListener("change", this.handleMediaChange);
    }
  }

  private setupMediaQueryListener(): void {
    this.mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    this.mediaQuery.addEventListener("change", this.handleMediaChange);
  }

  private handleMediaChange = (): void => {
    if (this.mode === "auto") {
      this.applyTheme();
    }
  };

  private getThemeForMode(): DatexTheme {
    const currentMode = this.getCurrentMode();

    if (currentMode === "dark") {
      // Create dark theme with original theme colors, just adapting backgrounds and text
      return {
        ...this.theme,
        backgroundColor: "#1f2937", // Fondo oscuro
        borderColor: "#4b5563", // Bordes grises oscuros
        textColor: "#f9fafb", // Texto blanco/claro
        hoverColor: "#4b5563", // Hover gris más claro para mejor contraste
        // Mantener colores originales del tema para selected, range, etc.
        selectedColor: this.theme.selectedColor, // Mantener color original
        rangeColor: this.theme.rangeColor, // Mantener color original
        todayColor: this.theme.todayColor, // Mantener color original
        disabledColor: "#6b7280", // Gris para deshabilitado
        applyButtonColor: this.theme.applyButtonColor, // Mantener color original
        cancelButtonColor: this.theme.cancelButtonColor, // Mantener color original
      };
    }

    return this.theme;
  }

  private removeExistingStyles(): void {
    if (this.styleId) {
      const existingStyle = document.getElementById(this.styleId);
      existingStyle?.remove();
    }
  }

  private createAndApplyStyles(): void {
    this.styleId = this.generateStyleId();
    const style = document.createElement("style");
    style.id = this.styleId;
    style.textContent = this.generateThemeCSS();

    document.head.appendChild(style);
    this.container.dataset["themeStyleId"] = this.styleId;
  }

  private generateStyleId(): string {
    return "daterangepicker-theme-" + Math.random().toString(36).slice(2, 9);
  }

  private forceReflow(): void {
    void this.container.offsetHeight;
  }

  private generateThemeCSS(): string {
    const t = this.getThemeForMode();
    const currentMode = this.getCurrentMode();

    // Add theme mode class to container
    this.container.classList.remove("datex-light", "datex-dark");
    this.container.classList.add(`datex-${currentMode}`);
    return `
      .datex-picker {
        background-color: ${t.backgroundColor} !important;
        border: 1px solid ${t.borderColor} !important;
        border-radius: ${t.borderRadius} !important;
        font-family: ${t.fontFamily} !important;
        font-size: ${t.fontSize} !important;
        color: ${t.textColor} !important;
        line-height: 1em !important;
        width: 278px !important;
        z-index: 3001 !important;
      }

      .datex-picker.single {
        width: 230px !important;
      }

      .datex-picker.single .drp-calendar.right {
        display: none !important;
      }

      .datex-picker.single .drp-calendar.left {
        float: none !important;
        clear: none !important;
      }

      .datex-picker.single .drp-calendar.left .calendar-table {
        border-right: 1px solid ${t.borderColor} !important;
        border-top-right-radius: ${t.borderRadius} !important;
        border-bottom-right-radius: ${t.borderRadius} !important;
        padding-right: 8px !important;
      }

      .datex-picker select,
      .datex-picker select * {
        user-select: auto !important;
        pointer-events: auto !important;
        -webkit-user-select: auto !important;
        -moz-user-select: auto !important;
        -ms-user-select: auto !important;
      }

      .datex-picker:before {
        border-bottom: 7px solid #ccc !important;
      }

      .datex-picker:after {
        border-bottom-color: ${t.backgroundColor} !important;
      }

      .datex-picker.drop-up:before {
        border-top: 7px solid #ccc !important;
      }

      .datex-picker.drop-up:after {
        border-top-color: ${t.backgroundColor} !important;
      }

      .datex-picker .calendar-table {
        background-color: ${t.backgroundColor} !important;
        border: 1px solid ${t.backgroundColor} !important;
        border-radius: ${t.borderRadius} !important;
      }

      .datex-picker .calendar-table th,
      .datex-picker .calendar-table td {
        min-width: 28px !important;
        width: 28px !important;
        height: 22px !important;
        line-height: 20px !important;
        font-size: 11px !important;
        border-radius: 3px !important;
        border: 1px solid transparent !important;
        white-space: nowrap !important;
        cursor: pointer !important;
        text-align: center !important;
        vertical-align: middle !important;
      }

      .datex-picker .calendar-table th {
        color: ${t.textColor} !important;
      }

      .datex-picker .calendar-table th.month {
        color: ${t.textColor} !important;
        width: auto !important;
        pointer-events: auto !important;
      }

      .datex-picker .calendar-table .next span,
      .datex-picker .calendar-table .prev span {
        color: #fff !important;
        border: solid ${
          currentMode === "dark" ? t.textColor : "black"
        } !important;
        border-width: 0 2px 2px 0 !important;
        border-radius: 0 !important;
        display: inline-block !important;
        padding: 3px !important;
      }

      .datex-picker .calendar-table .next span {
        transform: rotate(-45deg) !important;
        -webkit-transform: rotate(-45deg) !important;
      }

      .datex-picker .calendar-table .prev span {
        transform: rotate(135deg) !important;
        -webkit-transform: rotate(135deg) !important;
      }

      .datex-picker .calendar-table .next,
      .datex-picker .calendar-table .prev {
        cursor: pointer !important;
        user-select: none !important;
        width: 32px !important;
        height: 28px !important;
      }

      .datex-picker .calendar-table .next:hover,
      .datex-picker .calendar-table .prev:hover {
        background-color: ${
          currentMode === "dark" ? t.hoverColor : "#f0f0f0"
        } !important;
      }

      .datex-picker td.available:hover,
      .datex-picker th.available:hover {
        background-color: ${
          currentMode === "dark" ? "#4b5563" : "#eee"
        } !important;
        border-color: transparent !important;
        color: ${currentMode === "dark" ? "#ffffff" : "#000000"} !important;
      }

      .datex-picker td.available,
      .datex-picker th.available {
        color: ${t.textColor} !important;
      }

      .datex-picker td.week,
      .datex-picker th.week {
        font-size: 80% !important;
        color: #ccc !important;
      }

      .datex-picker td.off,
      .datex-picker td.off.in-range,
      .datex-picker td.off.start-date,
      .datex-picker td.off.end-date {
        background-color: ${t.backgroundColor} !important;
        border-color: transparent !important;
        color: #999 !important;
      }

      .datex-picker td.in-range {
        background-color: ${t.rangeColor} !important;
        border-color: transparent !important;
        color: ${currentMode === "dark" ? "#000000" : "#000000"} !important;
        border-radius: 0 !important;
      }

      .datex-picker td.start-date {
        border-radius: 3px 0 0 3px !important;
        background-color: ${t.selectedColor} !important;
        color: #fff !important;
      }

      .datex-picker td.end-date {
        border-radius: 0 3px 3px 0 !important;
        background-color: ${t.selectedColor} !important;
        color: #fff !important;
      }

      .datex-picker td.start-date.end-date {
        border-radius: 3px !important;
      }

      .datex-picker td.active,
      .datex-picker td.active:hover {
        background-color: ${t.selectedColor} !important;
        border-color: transparent !important;
        color: #fff !important;
      }

      .datex-picker td.disabled,
      .datex-picker option.disabled {
        color: ${t.disabledColor} !important;
        cursor: not-allowed !important;
        text-decoration: line-through !important;
      }

      .datex-picker .drp-calendar.left {
        padding: 8px 0 8px 8px !important;
      }

      .datex-picker .drp-calendar.right {
        padding: 8px !important;
      }

      .datex-picker .ranges {
        float: none !important;
        text-align: left !important;
        margin: 0 !important;
      }

      .datex-picker .ranges ul {
        list-style: none !important;
        margin: 0 auto !important;
        padding: 0 !important;
        width: 100% !important;
      }

      .datex-picker .ranges li {
        font-size: 12px !important;
        padding: 8px 12px !important;
        cursor: pointer !important;
        color: ${t.textColor} !important;
        border-radius: ${t.borderRadius} !important;
        margin: 2px 0 !important;
      }

      .datex-picker .ranges li:hover {
        background-color: ${t.rangeColor} !important;
        color: ${t.textColor} !important;
      }

      .datex-picker .ranges li.active {
        background-color: ${t.selectedColor} !important;
        color: #fff !important;
      }

      .datex-picker .ranges li.active:hover {
        background-color: ${t.selectedColor} !important;
        color: #fff !important;
        opacity: 0.9 !important;
      }

      .datex-picker.show-calendar .drp-buttons {
        display: block !important;
      }

      .datex-picker.auto-apply .drp-buttons {
        display: none !important;
      }

      .datex-picker .drp-buttons {
        clear: both !important;
        text-align: right !important;
        padding: 8px !important;
        border-top: 1px solid ${t.borderColor} !important;
        display: none !important;
        line-height: 10px !important;
        vertical-align: middle !important;
        margin: 0px;
      }

      .datex-picker .drp-selected {
        display: inline-block !important;
        font-size: 12px !important;
        padding-right: 8px !important;
        color: ${t.textColor} !important;
      }

      .datex-picker .drp-buttons .btn {
        margin-left: 4px !important;
        font-size: 12px !important;
        font-weight: bold !important;
        padding: 7px 8px !important;
        border-radius: 3px !important;
        border: 1px solid transparent !important;
        cursor: pointer !important;
        transition: all 0.15s ease-in-out !important;
      }

      .datex-picker .drp-buttons .btn.btn-success {
        background-color: ${t.applyButtonColor} !important;
        border-color: ${t.applyButtonColor} !important;
        color: #fff !important;
      }

      .datex-picker .drp-buttons .btn.btn-success:hover:not(:disabled) {
        background-color: ${t.applyButtonColor} !important;
        border-color: ${t.applyButtonColor} !important;
        opacity: 0.8 !important;
      }

      .datex-picker .drp-buttons .btn.btn-danger {
        background-color: ${t.cancelButtonColor} !important;
        border-color: ${t.cancelButtonColor} !important;
        color: #fff !important;
      }

      .datex-picker .drp-buttons .btn.btn-danger:hover:not(:disabled) {
        background-color: ${t.cancelButtonColor} !important;
        border-color: ${t.cancelButtonColor} !important;
        opacity: 0.8 !important;
      }

      .datex-picker select.monthselect,
      .datex-picker select.yearselect {
        font-size: 12px !important;
        padding: 1px 2px !important;
        height: auto !important;
        margin: 0 !important;
        cursor: pointer !important;
        background-color: ${t.backgroundColor} !important;
        border: 1px solid ${t.borderColor} !important;
        color: ${t.textColor} !important;
        outline: none !important;
        appearance: auto !important;
        -webkit-appearance: menulist !important;
        -moz-appearance: menulist !important;
        pointer-events: auto !important;
        user-select: auto !important;
        -webkit-user-select: auto !important;
        -moz-user-select: auto !important;
        min-height: 20px !important;
        min-width: 50px !important;
        position: relative !important;
        z-index: 1000000 !important;
        transform: none !important;
        isolation: auto !important;
      }

      .datex-picker select.monthselect {
        margin-right: 2% !important;
        width: 56% !important;
      }

      .datex-picker select.yearselect {
        width: 40% !important;
      }

      .datex-picker select.hourselect,
      .datex-picker select.minuteselect,
      .datex-picker select.secondselect,
      .datex-picker select.ampmselect {
        width: 50px !important;
        margin: 0 auto !important;
        background: ${t.backgroundColor} !important;
        border: 1px solid ${t.borderColor} !important;
        color: ${t.textColor} !important;
        padding: 2px !important;
        outline: 0 !important;
        font-size: 12px !important;
        pointer-events: auto !important;
        user-select: auto !important;
        -webkit-user-select: auto !important;
        -moz-user-select: auto !important;
        appearance: auto !important;
        -webkit-appearance: menulist !important;
        -moz-appearance: menulist !important;
        border-radius: ${t.borderRadius} !important;
        opacity: 1 !important;
      }

      .datex-picker .calendar-time {
        text-align: center !important;
        margin: 0 auto !important;
        line-height: 24px !important;
        position: relative !important;
        display: block !important;
        background: ${t.backgroundColor} !important;
        padding: 4px 8px !important;
      }

      .datex-picker .calendar-time select.disabled {
        color: ${t.secondaryColor} !important;
        cursor: not-allowed !important;
        background: ${t.hoverColor} !important;
        opacity: 0.6 !important;
      }

      .datex-picker select option {
        background: ${t.backgroundColor} !important;
        color: ${t.textColor} !important;
      }

      .datex-picker select option:disabled {
        background: ${t.hoverColor} !important;
        color: ${t.disabledColor} !important;
      }

      .datex-picker select option:hover {
        background: ${t.selectedColor} !important;
        color: #fff !important;
      }

      @media (min-width: 564px) {
        .datex-picker {
          width: auto !important;
        }

        .datex-picker .ranges ul {
          width: 140px !important;
        }

        .datex-picker.single .ranges ul {
          width: 100% !important;
        }

        .datex-picker .drp-calendar.left {
          clear: left !important;
          margin-right: 0 !important;
        }

        .datex-picker .drp-calendar.left .calendar-table {
          border-right: none !important;
          border-top-right-radius: 0 !important;
          border-bottom-right-radius: 0 !important;
          padding-right: 8px !important;
        }

        .datex-picker .drp-calendar.right {
          margin-left: 0 !important;
        }

        .datex-picker .drp-calendar.right .calendar-table {
          border-left: none !important;
          border-top-left-radius: 0 !important;
          border-bottom-left-radius: 0 !important;
        }

        .datex-picker .ranges,
        .datex-picker .drp-calendar {
          float: left !important;
        }
      }

      @media (min-width: 730px) {
        .datex-picker .ranges {
          width: auto !important;
          float: left !important;
        }

        .datex-picker .drp-calendar.left {
          clear: none !important;
        }
      }
    `;
  }
}
