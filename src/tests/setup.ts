import { vi } from "vitest";

// Mock window.getComputedStyle
Object.defineProperty(window, "getComputedStyle", {
  value: vi.fn(() => ({
    getPropertyValue: vi.fn(() => ""),
    width: "0px",
    height: "0px",
  })),
});

// Mock getBoundingClientRect
Element.prototype.getBoundingClientRect = vi.fn(() => ({
  width: 200,
  height: 30,
  top: 0,
  left: 0,
  bottom: 30,
  right: 200,
  x: 0,
  y: 0,
  toJSON: vi.fn(),
}));

// Mock offsetWidth and offsetHeight
Object.defineProperty(HTMLElement.prototype, "offsetWidth", {
  configurable: true,
  value: 200,
});

Object.defineProperty(HTMLElement.prototype, "offsetHeight", {
  configurable: true,
  value: 30,
});

// Mock scrollIntoView
Element.prototype.scrollIntoView = vi.fn();

// Mock window dimensions
Object.defineProperty(window, "innerWidth", {
  writable: true,
  configurable: true,
  value: 1024,
});

Object.defineProperty(window, "innerHeight", {
  writable: true,
  configurable: true,
  value: 768,
});

// Mock ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));
