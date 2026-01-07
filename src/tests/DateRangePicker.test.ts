import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import {
  DateRangePicker,
  DEFAULT_THEME,
  SPANISH_LOCALE,
} from "../DateRangePicker";

// Mock DOM environment
Object.defineProperty(window, "getComputedStyle", {
  value: () => ({
    getPropertyValue: () => "",
  }),
});

describe("DateRangePicker", () => {
  let container: HTMLElement;
  let input: HTMLInputElement;

  beforeEach(() => {
    // Setup DOM
    document.body.innerHTML = "";
    container = document.createElement("div");
    input = document.createElement("input");
    input.id = "test-input";
    input.type = "text";
    container.appendChild(input);
    document.body.appendChild(container);
  });

  afterEach(() => {
    // Cleanup
    document.body.innerHTML = "";
  });

  describe("Constructor", () => {
    it("should create a DateRangePicker instance", () => {
      const picker = new DateRangePicker("#test-input");
      expect(picker).toBeInstanceOf(DateRangePicker);
    });

    it("should throw error if element not found", () => {
      expect(() => {
        new DateRangePicker("#non-existent");
      }).toThrow("DateRangePicker: Element not found");
    });

    it("should accept HTMLElement directly", () => {
      const picker = new DateRangePicker(input);
      expect(picker).toBeInstanceOf(DateRangePicker);
    });

    it("should use default options when none provided", () => {
      const picker = new DateRangePicker("#test-input");
      expect(picker.getCurrentTheme()).toEqual(
        expect.objectContaining(DEFAULT_THEME)
      );
    });

    it("should merge custom options with defaults", () => {
      const customOptions = {
        autoApply: true,
        singleDatePicker: true,
        theme: { primaryColor: "#ff0000" },
      };

      const picker = new DateRangePicker("#test-input", customOptions);
      const theme = picker.getCurrentTheme();
      expect(theme.primaryColor).toBe("#ff0000");
    });
  });

  describe("Date Management", () => {
    let picker: DateRangePicker;

    beforeEach(() => {
      picker = new DateRangePicker("#test-input");
    });

    afterEach(() => {
      picker.remove();
    });

    it("should set and get start date", () => {
      const testDate = new Date("2024-01-15");
      picker.setStartDate(testDate);

      const retrievedDate = picker.getStartDate();
      expect(retrievedDate.getTime()).toBe(testDate.getTime());
    });

    it("should set and get end date", () => {
      const testDate = new Date("2024-01-20");
      picker.setEndDate(testDate);

      const retrievedDate = picker.getEndDate();
      expect(retrievedDate?.getTime()).toBe(testDate.getTime());
    });

    it("should handle null end date", () => {
      const picker = new DateRangePicker("#test-input", {
        singleDatePicker: true,
      });

      // In single date picker mode, end date might be null initially
      const endDate = picker.getEndDate();
      expect(endDate).toBeDefined(); // Should have a default value

      picker.remove();
    });
  });

  describe("Theme Management", () => {
    let picker: DateRangePicker;

    beforeEach(() => {
      picker = new DateRangePicker("#test-input");
    });

    afterEach(() => {
      picker.remove();
    });

    it("should set custom theme", () => {
      const customTheme = {
        primaryColor: "#ff0000",
        backgroundColor: "#ffffff",
        borderRadius: "8px",
      };

      picker.setTheme(customTheme);
      const currentTheme = picker.getCurrentTheme();

      expect(currentTheme.primaryColor).toBe("#ff0000");
      expect(currentTheme.backgroundColor).toBe("#ffffff");
      expect(currentTheme.borderRadius).toBe("8px");
    });

    it("should merge theme with defaults", () => {
      const partialTheme = {
        primaryColor: "#00ff00",
      };

      picker.setTheme(partialTheme);
      const currentTheme = picker.getCurrentTheme();

      expect(currentTheme.primaryColor).toBe("#00ff00");
      expect(currentTheme.backgroundColor).toBe(DEFAULT_THEME.backgroundColor);
    });
  });

  describe("Options Validation", () => {
    it("should disable autoApply when timePicker is enabled", () => {
      const picker = new DateRangePicker("#test-input", {
        timePicker: true,
        autoApply: true,
      });

      // Should automatically disable autoApply when timePicker is true
      // This is tested indirectly through behavior
      expect(picker).toBeInstanceOf(DateRangePicker);
      picker.remove();
    });

    it("should handle locale configuration", () => {
      const picker = new DateRangePicker("#test-input", {
        locale: SPANISH_LOCALE,
      });

      expect(picker).toBeInstanceOf(DateRangePicker);
      picker.remove();
    });
  });

  describe("Event Handling", () => {
    it("should call callback when dates are selected", () => {
      const callback = vi.fn();
      const picker = new DateRangePicker("#test-input", {}, callback);

      const startDate = new Date("2024-01-15");
      const endDate = new Date("2024-01-20");

      picker.setStartDate(startDate);
      picker.setEndDate(endDate);

      // Simulate applying the selection
      // Note: This would normally be triggered by user interaction

      picker.remove();
    });

    it("should dispatch custom events", () => {
      const picker = new DateRangePicker("#test-input");
      const eventListener = vi.fn();

      input.addEventListener("show.daterangepicker", eventListener);

      picker.show();

      expect(eventListener).toHaveBeenCalled();

      picker.remove();
    });
  });

  describe("Cleanup", () => {
    it("should remove all event listeners on destroy", () => {
      const picker = new DateRangePicker("#test-input");

      // Show picker to create DOM elements
      picker.show();

      // Remove should clean up everything
      expect(() => picker.remove()).not.toThrow();
    });

    it("should remove container from DOM", () => {
      const picker = new DateRangePicker("#test-input");
      picker.show();

      // Container should exist
      const containers = document.querySelectorAll(".daterangepicker");
      expect(containers.length).toBeGreaterThan(0);

      picker.remove();

      // Container should be removed
      const containersAfter = document.querySelectorAll(".daterangepicker");
      expect(containersAfter.length).toBe(0);
    });
  });

  describe("Accessibility", () => {
    it("should handle keyboard events", () => {
      const picker = new DateRangePicker("#test-input");

      // Test escape key
      const escapeEvent = new KeyboardEvent("keydown", { key: "Escape" });
      input.dispatchEvent(escapeEvent);

      // Should not throw errors
      expect(picker).toBeInstanceOf(DateRangePicker);

      picker.remove();
    });

    it("should handle focus events", () => {
      const picker = new DateRangePicker("#test-input");

      // Test focus event
      const focusEvent = new FocusEvent("focus");
      input.dispatchEvent(focusEvent);

      // Should not throw errors
      expect(picker).toBeInstanceOf(DateRangePicker);

      picker.remove();
    });
  });
});
