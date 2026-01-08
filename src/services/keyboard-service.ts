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

  private currentFocusedDate: Date | null = null;
  private isActive = false;

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
  }): void {
    this.onDateSelect = handlers.onDateSelect;
    this.onClose = handlers.onClose;
    this.onApply = handlers.onApply;
    this.onToday = handlers.onToday;
    this.onClear = handlers.onClear;
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

    // Focus the container without scrolling
    this.container.focus({ preventScroll: true });
  }

  deactivate(): void {
    this.isActive = false;
    this.currentFocusedDate = null;
    this.removeFocusStyles();
  }

  private setupKeyboardEvents(): void {
    // Make container focusable
    this.container.setAttribute("tabindex", "0");

    this.container.addEventListener("keydown", this.handleKeyDown.bind(this));
    this.container.addEventListener("focus", this.handleFocus.bind(this));
    this.container.addEventListener("blur", this.handleBlur.bind(this));
  }

  private handleKeyDown(event: KeyboardEvent): void {
    if (!this.isActive || !this.currentFocusedDate) return;

    const { key, ctrlKey, shiftKey, altKey } = event;

    // Navigation keys
    switch (key) {
      case "ArrowLeft":
        event.preventDefault();
        this.navigateDate(-1);
        break;
      case "ArrowRight":
        event.preventDefault();
        this.navigateDate(1);
        break;
      case "ArrowUp":
        event.preventDefault();
        this.navigateDate(-7);
        break;
      case "ArrowDown":
        event.preventDefault();
        this.navigateDate(7);
        break;
      case "Home":
        event.preventDefault();
        this.navigateToStartOfWeek();
        break;
      case "End":
        event.preventDefault();
        this.navigateToEndOfWeek();
        break;
      case "PageUp":
        event.preventDefault();
        this.navigateMonth(shiftKey ? -12 : -1);
        break;
      case "PageDown":
        event.preventDefault();
        this.navigateMonth(shiftKey ? 12 : 1);
        break;
    }

    // Action keys
    switch (key) {
      case "Enter":
      case " ":
        event.preventDefault();
        if (this.currentFocusedDate && this.onDateSelect) {
          // Create a copy of the date to avoid mutation issues
          const dateToSelect = new Date(this.currentFocusedDate.getTime());

          // Debug: Let's verify the dates are exactly the same
          console.log("=== KEYBOARD DEBUG ===");
          console.log("Original focused date:", this.currentFocusedDate);
          console.log(
            "Original focused day:",
            this.currentFocusedDate.getDate()
          );
          console.log("Copy to select:", dateToSelect);
          console.log("Copy day:", dateToSelect.getDate());
          console.log(
            "Are they equal?",
            this.currentFocusedDate.getTime() === dateToSelect.getTime()
          );
          console.log("======================");

          this.onDateSelect(dateToSelect);
        }
        break;
      case "Escape":
        event.preventDefault();
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
          if (this.onToday) {
            this.onToday();
          }
          break;
        case this.options.shortcuts?.clear?.toLowerCase():
          event.preventDefault();
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

    // Create a new date to avoid mutating the original
    const newDate = new Date(this.currentFocusedDate.getTime());
    newDate.setDate(newDate.getDate() + days);

    this.currentFocusedDate = newDate;
    this.updateFocusedDate();
  }

  private navigateMonth(months: number): void {
    if (!this.currentFocusedDate) return;

    // Create a new date to avoid mutating the original
    const newDate = new Date(this.currentFocusedDate.getTime());
    newDate.setMonth(newDate.getMonth() + months);

    this.currentFocusedDate = newDate;
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
    console.log("Keyboard: Looking for cell with data-date:", dateStr);
    console.log(
      "Keyboard: Current focused date:",
      this.currentFocusedDate.toDateString()
    );

    const cell = this.container.querySelector(
      `[data-date="${dateStr}"]`
    ) as HTMLElement;

    if (cell) {
      console.log("Keyboard: Found cell, text content:", cell.textContent);
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
    } else {
      console.log("Keyboard: Cell not found for date:", dateStr);
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
    console.log(
      "Keyboard: Formatting date for selector:",
      date.toDateString(),
      "-> formatted:",
      formatted
    );
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
    this.container.removeEventListener(
      "keydown",
      this.handleKeyDown.bind(this)
    );
    this.container.removeEventListener("focus", this.handleFocus.bind(this));
    this.container.removeEventListener("blur", this.handleBlur.bind(this));

    this.removeFocusStyles();

    const styles = document.querySelector(".keyboard-focus-styles");
    if (styles) {
      styles.remove();
    }
  }
}
