/**
 * DOM utility functions for DateX
 */

/**
 * Generate unique ID for theme styles
 */
export function generateStyleId(): string {
  return "datex-theme-" + Math.random().toString(36).slice(2, 9);
}

/**
 * Create DOM element from HTML string
 */
export function createElementFromHTML(html: string): HTMLElement {
  const wrapper = document.createElement("div");
  wrapper.innerHTML = html.trim();
  return wrapper.firstElementChild as HTMLElement;
}

/**
 * Check if element matches selector
 */
export function matches(element: Element, selector: string): boolean {
  return element.matches ? element.matches(selector) : false;
}

/**
 * Find closest parent element matching selector
 */
export function closest(element: Element, selector: string): Element | null {
  return element.closest ? element.closest(selector) : null;
}

/**
 * Add event listener with cleanup tracking
 */
export function addEventListener(
  element: HTMLElement | Document | Window,
  event: string,
  handler: EventListener,
  options?: boolean | AddEventListenerOptions
): () => void {
  element.addEventListener(event, handler, options);

  // Return cleanup function
  return () => {
    element.removeEventListener(event, handler, options);
  };
}

/**
 * Position element relative to target
 */
export function positionElement(
  element: HTMLElement,
  target: HTMLElement,
  options: {
    opens?: "left" | "right" | "center";
    drops?: "up" | "down" | "auto";
  } = {}
): void {
  const { opens = "center", drops = "auto" } = options;

  const targetRect = target.getBoundingClientRect();
  const elementWidth = element.offsetWidth;
  const elementHeight = element.offsetHeight;

  let top: number;
  let left: number;
  let actualDrops = drops;

  // Calculate vertical position
  switch (drops) {
    case "auto":
      top = targetRect.bottom + 5;
      if (top + elementHeight >= window.innerHeight) {
        top = targetRect.top - elementHeight - 5;
        actualDrops = "up";
      }
      break;
    case "up":
      top = targetRect.top - elementHeight - 5;
      break;
    default: // 'down'
      top = targetRect.bottom + 5;
      break;
  }

  // Calculate horizontal position
  switch (opens) {
    case "left":
      left = targetRect.right - elementWidth;
      if (left < 9) left = 9;
      break;
    case "center":
      left = targetRect.left + targetRect.width / 2 - elementWidth / 2;
      if (left < 9) left = 9;
      else if (left + elementWidth > window.innerWidth - 9) {
        left = window.innerWidth - elementWidth - 9;
      }
      break;
    default: // 'right'
      left = targetRect.left;
      if (left + elementWidth > window.innerWidth - 9) {
        left = window.innerWidth - elementWidth - 9;
      }
      break;
  }

  // Ensure minimum margins
  if (left < 9) left = 9;
  if (top < 9) top = 9;

  // Apply position
  element.style.position = "fixed";
  element.style.top = `${top}px`;
  element.style.left = `${left}px`;
  element.style.right = "auto";
  element.style.zIndex = "99999";

  // Update drop-up class
  element.classList.toggle("datex-drop-up", actualDrops === "up");
}
