/**
 * Advanced theme manager with light/dark mode support
 */

export type ThemeMode = "light" | "dark" | "auto";

export interface DatexThemeAdvanced {
  mode?: ThemeMode;
  light?: DatexThemeColors;
  dark?: DatexThemeColors;
  animations?: {
    duration?: number;
    easing?: string;
    disabled?: boolean;
  };
  borderRadius?: "none" | "small" | "medium" | "large";
  size?: "small" | "medium" | "large";
  density?: "compact" | "comfortable" | "spacious";
}

export interface DatexThemeColors {
  primaryColor?: string;
  secondaryColor?: string;
  backgroundColor?: string;
  surfaceColor?: string;
  borderColor?: string;
  textColor?: string;
  textSecondaryColor?: string;
  hoverColor?: string;
  selectedColor?: string;
  rangeColor?: string;
  todayColor?: string;
  disabledColor?: string;
  errorColor?: string;
  successColor?: string;
  shadowColor?: string;
}

export class ThemeManager {
  private container: HTMLElement;
  private theme: DatexThemeAdvanced;
  private currentMode: "light" | "dark" = "light";
  private mediaQuery?: MediaQueryList;
  private styleElement?: HTMLStyleElement;

  // Predefined themes
  static readonly LIGHT_THEME: DatexThemeColors = {
    primaryColor: "#10b981",
    secondaryColor: "#059669",
    backgroundColor: "#ffffff",
    surfaceColor: "#f8fafc",
    borderColor: "#e5e7eb",
    textColor: "#1f2937",
    textSecondaryColor: "#6b7280",
    hoverColor: "#f0fdf4",
    selectedColor: "#10b981",
    rangeColor: "#ecfdf5",
    todayColor: "#3b82f6",
    disabledColor: "#d1d5db",
    errorColor: "#ef4444",
    successColor: "#10b981",
    shadowColor: "rgba(0, 0, 0, 0.1)",
  };

  static readonly DARK_THEME: DatexThemeColors = {
    primaryColor: "#34d399",
    secondaryColor: "#10b981",
    backgroundColor: "#1f2937",
    surfaceColor: "#374151",
    borderColor: "#4b5563",
    textColor: "#f9fafb",
    textSecondaryColor: "#d1d5db",
    hoverColor: "#065f46",
    selectedColor: "#34d399",
    rangeColor: "#064e3b",
    todayColor: "#60a5fa",
    disabledColor: "#6b7280",
    errorColor: "#f87171",
    successColor: "#34d399",
    shadowColor: "rgba(0, 0, 0, 0.3)",
  };

  constructor(container: HTMLElement, theme: DatexThemeAdvanced = {}) {
    this.container = container;
    this.theme = {
      mode: "auto",
      light: { ...ThemeManager.LIGHT_THEME, ...theme.light },
      dark: { ...ThemeManager.DARK_THEME, ...theme.dark },
      animations: {
        duration: 200,
        easing: "cubic-bezier(0.4, 0, 0.2, 1)",
        disabled: false,
        ...theme.animations,
      },
      borderRadius: "medium",
      size: "medium",
      density: "comfortable",
      ...theme,
    };

    this.initializeTheme();
  }

  private initializeTheme(): void {
    this.detectSystemTheme();
    this.setupMediaQueryListener();
    this.applyTheme();
  }

  private detectSystemTheme(): void {
    if (this.theme.mode === "auto") {
      this.mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      this.currentMode = this.mediaQuery.matches ? "dark" : "light";
    } else {
      this.currentMode = this.theme.mode === "dark" ? "dark" : "light";
    }
  }

  private setupMediaQueryListener(): void {
    if (this.theme.mode === "auto" && this.mediaQuery) {
      this.mediaQuery.addEventListener("change", (e) => {
        this.currentMode = e.matches ? "dark" : "light";
        this.applyTheme();
      });
    }
  }

  private applyTheme(): void {
    const colors =
      this.currentMode === "dark" ? this.theme.dark! : this.theme.light!;

    // Add theme class to container
    this.container.classList.remove("datex-light", "datex-dark");
    this.container.classList.add(`datex-${this.currentMode}`);

    // Add size and density classes
    this.container.classList.add(
      `datex-size-${this.theme.size}`,
      `datex-density-${this.theme.density}`,
      `datex-radius-${this.theme.borderRadius}`
    );

    this.createThemeStyles(colors);
  }

  private createThemeStyles(colors: DatexThemeColors): void {
    // Remove existing theme styles
    if (this.styleElement) {
      this.styleElement.remove();
    }

    this.styleElement = document.createElement("style");
    this.styleElement.className = "datex-theme-styles";

    const borderRadiusValues = {
      none: "0px",
      small: "4px",
      medium: "8px",
      large: "12px",
    };

    const sizeValues = {
      small: { cellSize: "32px", fontSize: "12px", padding: "4px" },
      medium: { cellSize: "40px", fontSize: "14px", padding: "8px" },
      large: { cellSize: "48px", fontSize: "16px", padding: "12px" },
    };

    const densityValues = {
      compact: { spacing: "2px", padding: "4px" },
      comfortable: { spacing: "4px", padding: "8px" },
      spacious: { spacing: "8px", padding: "12px" },
    };

    const radius = borderRadiusValues[this.theme.borderRadius!];
    const size = sizeValues[this.theme.size!];
    const density = densityValues[this.theme.density!];

    this.styleElement.textContent = `
      /* Theme Variables */
      .datex-picker.datex-${this.currentMode} {
        --datex-primary: ${colors.primaryColor};
        --datex-secondary: ${colors.secondaryColor};
        --datex-background: ${colors.backgroundColor};
        --datex-surface: ${colors.surfaceColor};
        --datex-border: ${colors.borderColor};
        --datex-text: ${colors.textColor};
        --datex-text-secondary: ${colors.textSecondaryColor};
        --datex-hover: ${colors.hoverColor};
        --datex-selected: ${colors.selectedColor};
        --datex-range: ${colors.rangeColor};
        --datex-today: ${colors.todayColor};
        --datex-disabled: ${colors.disabledColor};
        --datex-error: ${colors.errorColor};
        --datex-success: ${colors.successColor};
        --datex-shadow: ${colors.shadowColor};
        --datex-radius: ${radius};
        --datex-cell-size: ${size.cellSize};
        --datex-font-size: ${size.fontSize};
        --datex-spacing: ${density.spacing};
        --datex-padding: ${density.padding};
        --datex-animation-duration: ${this.theme.animations!.duration}ms;
        --datex-animation-easing: ${this.theme.animations!.easing};
      }

      /* Base Styles */
      .datex-picker.datex-${this.currentMode} {
        background: var(--datex-background) !important;
        border: 1px solid var(--datex-border) !important;
        border-radius: var(--datex-radius) !important;
        color: var(--datex-text) !important;
        box-shadow: 0 10px 25px var(--datex-shadow) !important;
        font-size: var(--datex-font-size) !important;
      }

      /* Calendar Header */
      .datex-picker.datex-${
        this.currentMode
      } .calendar-table thead tr:first-child {
        background: var(--datex-surface) !important;
        border-bottom: 1px solid var(--datex-border) !important;
      }

      .datex-picker.datex-${
        this.currentMode
      } .calendar-table thead tr:first-child th {
        color: var(--datex-text) !important;
        padding: var(--datex-padding) !important;
      }

      /* Month/Year Navigation */
      .datex-picker.datex-${this.currentMode} .calendar-table .month,
      .datex-picker.datex-${this.currentMode} .calendar-table .year {
        color: var(--datex-text) !important;
        background: transparent !important;
        border: 1px solid var(--datex-border) !important;
        border-radius: calc(var(--datex-radius) / 2) !important;
        padding: var(--datex-spacing) var(--datex-padding) !important;
      }

      .datex-picker.datex-${this.currentMode} .calendar-table .month:hover,
      .datex-picker.datex-${this.currentMode} .calendar-table .year:hover {
        background: var(--datex-hover) !important;
        border-color: var(--datex-primary) !important;
      }

      /* Navigation Arrows */
      .datex-picker.datex-${this.currentMode} .calendar-table .prev,
      .datex-picker.datex-${this.currentMode} .calendar-table .next {
        background: var(--datex-surface) !important;
        color: var(--datex-text-secondary) !important;
        border: 1px solid var(--datex-border) !important;
        border-radius: 50% !important;
        width: var(--datex-cell-size) !important;
        height: var(--datex-cell-size) !important;
        transition: all var(--datex-animation-duration) var(--datex-animation-easing) !important;
      }

      .datex-picker.datex-${this.currentMode} .calendar-table .prev:hover,
      .datex-picker.datex-${this.currentMode} .calendar-table .next:hover {
        background: var(--datex-primary) !important;
        color: white !important;
        border-color: var(--datex-primary) !important;
        transform: scale(1.05) !important;
      }

      /* Day Headers */
      .datex-picker.datex-${
        this.currentMode
      } .calendar-table thead tr:last-child th {
        background: var(--datex-surface) !important;
        color: var(--datex-text-secondary) !important;
        font-weight: 600 !important;
        padding: var(--datex-padding) var(--datex-spacing) !important;
        border-bottom: 1px solid var(--datex-border) !important;
      }

      /* Calendar Body */
      .datex-picker.datex-${this.currentMode} .calendar-table tbody {
        background: var(--datex-background) !important;
      }

      /* Calendar Cells */
      .datex-picker.datex-${this.currentMode} .calendar-table td {
        width: var(--datex-cell-size) !important;
        height: var(--datex-cell-size) !important;
        padding: var(--datex-spacing) !important;
      }

      .datex-picker.datex-${this.currentMode} .calendar-table td > * {
        width: calc(var(--datex-cell-size) - var(--datex-spacing) * 2) !important;
        height: calc(var(--datex-cell-size) - var(--datex-spacing) * 2) !important;
        border-radius: calc(var(--datex-radius) / 2) !important;
        color: var(--datex-text) !important;
        transition: all var(--datex-animation-duration) var(--datex-animation-easing) !important;
      }

      /* Available Dates */
      .datex-picker.datex-${
        this.currentMode
      } .calendar-table td.available:hover > * {
        background: var(--datex-hover) !important;
        color: var(--datex-primary) !important;
        transform: scale(1.05) !important;
      }

      /* Selected Dates */
      .datex-picker.datex-${this.currentMode} .calendar-table td.active > *,
      .datex-picker.datex-${this.currentMode} .calendar-table td.start-date > *,
      .datex-picker.datex-${this.currentMode} .calendar-table td.end-date > * {
        background: var(--datex-selected) !important;
        color: white !important;
        font-weight: 600 !important;
        box-shadow: 0 2px 8px var(--datex-shadow) !important;
      }

      /* In Range Dates */
      .datex-picker.datex-${this.currentMode} .calendar-table td.in-range > * {
        background: var(--datex-range) !important;
        color: var(--datex-primary) !important;
      }

      /* Today */
      .datex-picker.datex-${this.currentMode} .calendar-table td.today > * {
        border: 2px solid var(--datex-today) !important;
        font-weight: 600 !important;
      }

      /* Disabled Dates */
      .datex-picker.datex-${this.currentMode} .calendar-table td.off > *,
      .datex-picker.datex-${this.currentMode} .calendar-table td.disabled > * {
        color: var(--datex-disabled) !important;
        cursor: not-allowed !important;
        opacity: 0.5 !important;
      }

      /* Action Buttons */
      .datex-picker.datex-${this.currentMode} .drp-buttons {
        background: var(--datex-surface) !important;
        border-top: 1px solid var(--datex-border) !important;
        padding: var(--datex-padding) !important;
      }

      .datex-picker.datex-${this.currentMode} .drp-buttons .btn {
        border-radius: calc(var(--datex-radius) / 2) !important;
        padding: var(--datex-padding) calc(var(--datex-padding) * 2) !important;
        font-size: var(--datex-font-size) !important;
        transition: all var(--datex-animation-duration) var(--datex-animation-easing) !important;
      }

      .datex-picker.datex-${this.currentMode} .drp-buttons .btn.cancelBtn {
        background: var(--datex-surface) !important;
        color: var(--datex-text-secondary) !important;
        border: 1px solid var(--datex-border) !important;
      }

      .datex-picker.datex-${
        this.currentMode
      } .drp-buttons .btn.cancelBtn:hover {
        background: var(--datex-error) !important;
        color: white !important;
        border-color: var(--datex-error) !important;
      }

      .datex-picker.datex-${this.currentMode} .drp-buttons .btn.applyBtn {
        background: var(--datex-success) !important;
        color: white !important;
        border: 1px solid var(--datex-success) !important;
      }

      .datex-picker.datex-${this.currentMode} .drp-buttons .btn.applyBtn:hover {
        transform: translateY(-1px) !important;
        box-shadow: 0 4px 12px var(--datex-shadow) !important;
      }

      /* Ranges Sidebar */
      .datex-picker.datex-${this.currentMode} .ranges {
        background: var(--datex-surface) !important;
        border-right: 1px solid var(--datex-border) !important;
      }

      .datex-picker.datex-${this.currentMode} .ranges li {
        color: var(--datex-text-secondary) !important;
        border-radius: calc(var(--datex-radius) / 2) !important;
        padding: var(--datex-padding) !important;
        margin: var(--datex-spacing) 0 !important;
        transition: all var(--datex-animation-duration) var(--datex-animation-easing) !important;
      }

      .datex-picker.datex-${this.currentMode} .ranges li:hover {
        background: var(--datex-hover) !important;
        color: var(--datex-primary) !important;
      }

      .datex-picker.datex-${this.currentMode} .ranges li.active {
        background: var(--datex-selected) !important;
        color: white !important;
      }

      /* Animations */
      ${
        this.theme.animations!.disabled
          ? ""
          : `
      .datex-picker.datex-${this.currentMode} * {
        transition: all var(--datex-animation-duration) var(--datex-animation-easing) !important;
      }
      `
      }

      /* Validation Error Styles */
      .datex-picker.datex-${this.currentMode} .validation-error {
        border-color: var(--datex-error) !important;
        box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.2) !important;
      }

      .datex-picker.datex-${this.currentMode} .error-message {
        background: var(--datex-error) !important;
        color: white !important;
        padding: var(--datex-spacing) var(--datex-padding) !important;
        border-radius: calc(var(--datex-radius) / 2) !important;
        font-size: calc(var(--datex-font-size) * 0.875) !important;
        margin-top: var(--datex-spacing) !important;
      }
    `;

    document.head.appendChild(this.styleElement);
  }

  // Public methods
  applyCurrentTheme(): void {
    this.applyTheme();
  }

  setMode(mode: ThemeMode): void {
    this.theme.mode = mode;
    this.detectSystemTheme();
    this.applyTheme();
  }

  getMode(): ThemeMode {
    return this.theme.mode!;
  }

  getCurrentMode(): "light" | "dark" {
    return this.currentMode;
  }

  updateTheme(theme: Partial<DatexThemeAdvanced>): void {
    this.theme = { ...this.theme, ...theme };
    if (theme.light) {
      this.theme.light = { ...this.theme.light, ...theme.light };
    }
    if (theme.dark) {
      this.theme.dark = { ...this.theme.dark, ...theme.dark };
    }
    this.applyTheme();
  }

  cleanup(): void {
    if (this.styleElement) {
      this.styleElement.remove();
    }
    if (this.mediaQuery) {
      this.mediaQuery.removeEventListener("change", () => {});
    }
  }
}
