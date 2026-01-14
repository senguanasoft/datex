/**
 * Keyboard navigation service for Datex date picker
 */

export interface KeyboardOptions {
  enabled?: boolean;
  shortcuts?: {
    today?: string;
    clear?: string;
    close?: string;
    apply?: string;
    cancel?: string;
  };
}

export class KeyboardService {
  private container: HTMLElement;
  private options: KeyboardOptions;
  private onDateSelect?: (date: Date) => void;
  private onClose?: () => void;
  private onApply?: () => void;
  private onToday?: () => void;
  private onClear?: () => void;
  private onMonthChange?: (date: Date) => void;

  private currentFocusedDate: Date | null = null;
  private isActive = false;

  // Bound event handlers for proper cleanup
  private handleKeyDownBound?: (event: KeyboardEvent) => void;
  private handleFocusBound?: () => void;
  private handleBlurBound?: () => void;

  constructor(container: HTMLElement, options: KeyboardOptions = {}) {
    this.container = container;
    this.options = {
      enabled: true,
      shortcuts: {
        today: "t",
        clear: "c",
        close: "Escape",
        apply: "Enter",
        cancel: "Escape",
        ...options.shortcuts,
      },
      ...options,
    };

    if (this.options.enabled) {
      this.setupKeyboardEvents();
    }
  }

  setHandlers(handlers: {
    onDateSelect?: (date: Date) => void;
    onClose?: () => void;
    onApply?: () => void;
    onToday?: () => void;
    onClear?: () => void;
    onMonthChange?: (date: Date) => void;
  }): void {
    this.onDateSelect = handlers.onDateSelect;
    this.onClose = handlers.onClose;
    this.onApply = handlers.onApply;
    this.onToday = handlers.onToday;
    this.onClear = handlers.onClear;
    this.onMonthChange = handlers.onMonthChange;
  }

  activate(initialDate?: Date): void {
    this.isActive = true;
    // Create a copy of the initial date to avoid mutation issues
    this.currentFocusedDate = initialDate
      ? new Date(initialDate.getTime())
      : new Date();

    // Don't update focused date immediately to avoid scroll jump
    // Only update when user actually starts navigating
    setTimeout(() => {
      if (this.isActive) {
        this.updateFocusedDate();
      }
    }, 100);

    // Don't focus the container automatically - let the parent control focus
    // This prevents stealing focus from input elements

    // Add document listener when activating
    if (this.handleKeyDownBound) {
      document.addEventListener("keydown", this.handleKeyDownBound);
    }
  }

  deactivate(): void {
    this.isActive = false;
    this.currentFocusedDate = null;
    this.removeFocusStyles();

    // Remove document listener when deactivating
    if (this.handleKeyDownBound) {
      document.removeEventListener("keydown", this.handleKeyDownBound);
    }
  }

  private setupKeyboardEvents(): void {
    // Make container focusable
    this.container.setAttribute("tabindex", "0");

    // Listen to both container and document for keyboard events
    // This allows keyboard navigation even when input has focus
    this.handleKeyDownBound = this.handleKeyDown.bind(this);
    this.handleFocusBound = this.handleFocus.bind(this);
    this.handleBlurBound = this.handleBlur.bind(this);

    this.container.addEventListener("keydown", this.handleKeyDownBound);
    this.container.addEventListener("focus", this.handleFocusBound);
    this.container.addEventListener("blur", this.handleBlurBound);

    // Document listener will be added/removed in activate/deactivate
  }

  private handleKeyDown(event: KeyboardEvent): void {
    if (!this.isActive || !this.currentFocusedDate) return;

    const { key, ctrlKey, shiftKey, altKey } = event;
    const target = event.target as HTMLElement;

    // Only handle keyboard navigation if:
    // 1. The event is from the container itself, OR
    // 2. The event is from an input/button that triggered the picker, OR
    // 3. The event is from a select element within the picker (month/year dropdowns)
    const isFromContainer = this.container.contains(target);
    const isFromInput =
      target.tagName === "INPUT" || target.tagName === "BUTTON";
    const isFromSelect = target.tagName === "SELECT";

    // Don't intercept if user is typing in a select dropdown
    if (isFromSelect) return;

    // Only handle if from container or from the input that opened the picker
    if (!isFromContainer && !isFromInput) return;

    // Navigation keys
    switch (key) {
      case "ArrowLeft":
        event.preventDefault();
        event.stopPropagation();
        this.navigateDate(-1);
        break;
      case "ArrowRight":
        event.preventDefault();
        event.stopPropagation();
        this.navigateDate(1);
        break;
      case "ArrowUp":
        event.preventDefault();
        event.stopPropagation();
        this.navigateDate(-7);
        break;
      case "ArrowDown":
        event.preventDefault();
        event.stopPropagation();
        this.navigateDate(7);
        break;
      case "Home":
        event.preventDefault();
        event.stopPropagation();
        this.navigateToStartOfWeek();
        break;
      case "End":
        event.preventDefault();
        event.stopPropagation();
        this.navigateToEndOfWeek();
        break;
      case "PageUp":
        event.preventDefault();
        event.stopPropagation();
        this.navigateMonth(shiftKey ? -12 : -1);
        break;
      case "PageDown":
        event.preventDefault();
        event.stopPropagation();
        this.navigateMonth(shiftKey ? 12 : 1);
        break;
    }

    // Action keys
    switch (key) {
      case "Enter":
      case " ":
        event.preventDefault();
        event.stopPropagation();
        if (this.currentFocusedDate && this.onDateSelect) {
          // Create a copy of the date to avoid mutation issues
          const dateToSelect = new Date(this.currentFocusedDate.getTime());

          this.onDateSelect(dateToSelect);
        }
        break;
      case "Escape":
        event.preventDefault();
        event.stopPropagation();
        if (this.onClose) {
          this.onClose();
        }
        break;
    }

    // Shortcut keys
    if (!ctrlKey && !altKey) {
      switch (key.toLowerCase()) {
        case this.options.shortcuts?.today?.toLowerCase():
          event.preventDefault();
          event.stopPropagation();
          if (this.onToday) {
            this.onToday();
          }
          break;
        case this.options.shortcuts?.clear?.toLowerCase():
          event.preventDefault();
          event.stopPropagation();
          if (this.onClear) {
            this.onClear();
          }
          break;
      }
    }

    // Ctrl shortcuts
    if (ctrlKey && !altKey && !shiftKey) {
      switch (key.toLowerCase()) {
        case "enter":
          event.preventDefault();
          event.stopPropagation();
          if (this.onApply) {
            this.onApply();
          }
          break;
      }
    }
  }

  private handleFocus(): void {
    if (!this.isActive) {
      // Activate without immediate focus update to prevent scroll jump
      this.isActive = true;
      this.currentFocusedDate = this.currentFocusedDate || new Date();

      // Delay the focus update to prevent page jump
      setTimeout(() => {
        if (this.isActive) {
          this.updateFocusedDate();
        }
      }, 150);
    }
  }

  private handleBlur(): void {
    // Don't deactivate immediately, allow for focus to move within container
    setTimeout(() => {
      if (!this.container.contains(document.activeElement)) {
        this.deactivate();
      }
    }, 100);
  }

  private navigateDate(days: number): void {
    if (!this.currentFocusedDate) return;

    // Store the old month/year to detect changes
    const oldMonth = this.currentFocusedDate.getMonth();
    const oldYear = this.currentFocusedDate.getFullYear();

    // Create a new date to avoid mutating the original
    const newDate = new Date(this.currentFocusedDate.getTime());
    newDate.setDate(newDate.getDate() + days);

    this.currentFocusedDate = newDate;

    // Check if month changed
    if (newDate.getMonth() !== oldMonth || newDate.getFullYear() !== oldYear) {
      if (this.onMonthChange) {
        this.onMonthChange(newDate);
      }
    }

    this.updateFocusedDate();
  }

  private navigateMonth(months: number): void {
    if (!this.currentFocusedDate) return;

    // Create a new date to avoid mutating the original
    const newDate = new Date(this.currentFocusedDate.getTime());
    newDate.setMonth(newDate.getMonth() + months);

    this.currentFocusedDate = newDate;

    // Always notify month change for month navigation
    if (this.onMonthChange) {
      this.onMonthChange(newDate);
    }

    this.updateFocusedDate();
  }

  private navigateToStartOfWeek(): void {
    if (!this.currentFocusedDate) return;

    // Create a new date to avoid mutating the original
    const newDate = new Date(this.currentFocusedDate.getTime());
    const dayOfWeek = newDate.getDay();
    newDate.setDate(newDate.getDate() - dayOfWeek);

    this.currentFocusedDate = newDate;
    this.updateFocusedDate();
  }

  private navigateToEndOfWeek(): void {
    if (!this.currentFocusedDate) return;

    // Create a new date to avoid mutating the original
    const newDate = new Date(this.currentFocusedDate.getTime());
    const dayOfWeek = newDate.getDay();
    newDate.setDate(newDate.getDate() + (6 - dayOfWeek));

    this.currentFocusedDate = newDate;
    this.updateFocusedDate();
  }

  private updateFocusedDate(): void {
    if (!this.currentFocusedDate) return;

    // Remove previous focus styles
    this.removeFocusStyles();

    // Find the cell for the current focused date
    const dateStr = this.formatDateForSelector(this.currentFocusedDate);

    const cell = this.container.querySelector(
      `[data-date="${dateStr}"]`
    ) as HTMLElement;

    if (cell) {
      cell.classList.add("keyboard-focused");
      cell.setAttribute("aria-selected", "true");

      // Only scroll into view if the picker is actually visible and the cell is outside viewport
      if (this.isActive && this.container.offsetParent !== null) {
        const containerRect = this.container.getBoundingClientRect();
        const cellRect = cell.getBoundingClientRect();

        // Only scroll if cell is outside the container bounds
        if (
          cellRect.top < containerRect.top ||
          cellRect.bottom > containerRect.bottom ||
          cellRect.left < containerRect.left ||
          cellRect.right > containerRect.right
        ) {
          cell.scrollIntoView({
            block: "nearest",
            inline: "nearest",
            behavior: "smooth",
          });
        }
      }
    }

    // Add CSS for keyboard focus styling
    this.addFocusStyles();
  }

  private removeFocusStyles(): void {
    const focusedCells = this.container.querySelectorAll(".keyboard-focused");
    focusedCells.forEach((cell) => {
      cell.classList.remove("keyboard-focused");
      cell.removeAttribute("aria-selected");
    });
  }

  private addFocusStyles(): void {
    if (this.container.querySelector(".keyboard-focus-styles")) return;

    const style = document.createElement("style");
    style.className = "keyboard-focus-styles";
    style.textContent = `
      .datex-picker .calendar-table td.keyboard-focused {
        outline: 2px solid #10b981 !important;
        outline-offset: -2px !important;
        z-index: 10 !important;
        position: relative !important;
        box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.2) !important;
      }
      
      .datex-picker .calendar-table td.keyboard-focused > * {
        background: #10b981 !important;
        color: white !important;
        font-weight: 600 !important;
      }
      
      /* Prevent layout shifts */
      .datex-picker {
        contain: layout style !important;
      }
      
      .datex-picker .calendar-table {
        contain: layout !important;
      }
    `;
    document.head.appendChild(style);
  }

  private formatDateForSelector(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const formatted = `${year}-${month}-${day}`;
    return formatted;
  }

  // Public methods
  getCurrentFocusedDate(): Date | null {
    // Return a copy to avoid mutation issues
    return this.currentFocusedDate
      ? new Date(this.currentFocusedDate.getTime())
      : null;
  }

  setFocusedDate(date: Date): void {
    // Create a copy to avoid mutation issues
    this.currentFocusedDate = new Date(date.getTime());
    this.updateFocusedDate();
  }

  cleanup(): void {
    if (this.handleKeyDownBound) {
      this.container.removeEventListener("keydown", this.handleKeyDownBound);
      document.removeEventListener("keydown", this.handleKeyDownBound);
    }
    if (this.handleFocusBound) {
      this.container.removeEventListener("focus", this.handleFocusBound);
    }
    if (this.handleBlurBound) {
      this.container.removeEventListener("blur", this.handleBlurBound);
    }

    this.removeFocusStyles();

    const styles = document.querySelector(".keyboard-focus-styles");
    if (styles) {
      styles.remove();
    }
  }
}
