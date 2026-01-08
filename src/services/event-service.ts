/**
 * Event management service for Datex date picker
 */

export class EventService {
  private boundHandlers = new Map<string, EventListener>();
  private resizeHandler?: EventListener;
  private scrollHandler?: EventListener;
  private documentClickHandler?: EventListener;
  private documentFocusHandler?: EventListener;

  addEventHandler(
    element: HTMLElement | Document | Window,
    event: string,
    handler: EventListener
  ): void {
    const key = `${event}_${Math.random()}`;
    this.boundHandlers.set(key, handler);
    element.addEventListener(event, handler);
  }

  setDocumentListeners(
    clickHandler: EventListener,
    focusHandler: EventListener
  ): void {
    this.documentClickHandler = clickHandler;
    this.documentFocusHandler = focusHandler;

    document.addEventListener("mousedown", this.documentClickHandler, true);
    document.addEventListener("focusin", this.documentFocusHandler, true);
  }

  setWindowListeners(
    resizeHandler: EventListener,
    scrollHandler: EventListener
  ): void {
    this.resizeHandler = resizeHandler;
    this.scrollHandler = scrollHandler;

    window.addEventListener("resize", this.resizeHandler);
    window.addEventListener("scroll", this.scrollHandler, true);
  }

  removeDocumentListeners(): void {
    if (this.documentClickHandler) {
      document.removeEventListener(
        "mousedown",
        this.documentClickHandler,
        true
      );
      this.documentClickHandler = undefined;
    }

    if (this.documentFocusHandler) {
      document.removeEventListener("focusin", this.documentFocusHandler, true);
      this.documentFocusHandler = undefined;
    }
  }

  removeWindowListeners(): void {
    if (this.resizeHandler) {
      window.removeEventListener("resize", this.resizeHandler);
      this.resizeHandler = undefined;
    }

    if (this.scrollHandler) {
      window.removeEventListener("scroll", this.scrollHandler, true);
      this.scrollHandler = undefined;
    }
  }

  cleanup(): void {
    this.removeDocumentListeners();
    this.removeWindowListeners();
    this.boundHandlers.clear();
  }

  dispatchEvent(element: HTMLElement, eventName: string, detail?: any): void {
    const event = new CustomEvent(eventName, {
      bubbles: true,
      detail,
    });
    element.dispatchEvent(event);
  }
}
