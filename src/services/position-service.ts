/**
 * Position management service for Datex date picker
 */

import { DatexOptions } from "../types/datex-types";

export class PositionService {
  private element: HTMLElement;
  private container: HTMLElement;
  private options: Required<DatexOptions>;
  private orientationChangeHandler?: () => void;

  constructor(
    element: HTMLElement,
    container: HTMLElement,
    options: Required<DatexOptions>
  ) {
    this.element = element;
    this.container = container;
    this.options = options;

    // Handle orientation changes on mobile
    this.setupOrientationHandler();
  }

  private setupOrientationHandler(): void {
    this.orientationChangeHandler = () => {
      // Small delay to allow for orientation change to complete
      setTimeout(() => {
        this.calculatePosition();
      }, 100);
    };

    window.addEventListener("orientationchange", this.orientationChangeHandler);
    // Also listen for resize as a fallback
    window.addEventListener("resize", this.orientationChangeHandler);
  }

  cleanup(): void {
    if (this.orientationChangeHandler) {
      window.removeEventListener(
        "orientationchange",
        this.orientationChangeHandler
      );
      window.removeEventListener("resize", this.orientationChangeHandler);
    }
  }

  calculatePosition(): void {
    if (!this.container) return;

    // Improved mobile detection
    const isMobile = this.isMobileDevice();

    if (isMobile) {
      this.positionForMobile();
    } else {
      this.positionForDesktop();
    }
  }

  private isMobileDevice(): boolean {
    // Comprehensive mobile detection
    const userAgent = navigator.userAgent.toLowerCase();
    const isMobileUserAgent =
      /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini|mobile|tablet/i.test(
        userAgent
      );
    const isSmallScreen = window.innerWidth <= 768;
    const hasTouchScreen =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    const isPortrait = window.innerHeight > window.innerWidth;

    // Additional checks for specific devices
    const isIOS = /iphone|ipad|ipod/i.test(userAgent);
    const isAndroid = /android/i.test(userAgent);

    return (
      isMobileUserAgent ||
      (isSmallScreen && hasTouchScreen) ||
      (isSmallScreen && isPortrait)
    );
  }

  private positionForMobile(): void {
    // Force mobile positioning with full width and proper z-index
    this.container.style.position = "fixed";
    this.container.style.bottom = "0";
    this.container.style.left = "0";
    this.container.style.right = "0";
    this.container.style.top = "auto";
    this.container.style.width = "100%";
    this.container.style.maxWidth = "100vw";
    this.container.style.minWidth = "100vw";
    this.container.style.borderRadius = "12px 12px 0 0";
    this.container.style.zIndex = "999999";
    this.container.style.margin = "0";
    this.container.style.padding = "0";
    this.container.style.boxSizing = "border-box";
    this.container.style.transform = "none";
    this.container.style.maxHeight = "85vh";

    // Fix for overlay and interaction issues
    this.container.style.isolation = "isolate";
    this.container.style.contain = "layout style";
    this.container.style.pointerEvents = "auto";
    this.container.style.touchAction = "manipulation";

    // Add mobile class for additional styling
    this.container.classList.add("drop-up", "mobile-view");

    // Remove any desktop positioning classes
    this.container.classList.remove("opensleft", "opensright", "openscenter");

    // Ensure the container is above everything
    const highestZIndex = this.getHighestZIndex();
    if (highestZIndex >= 999999) {
      this.container.style.zIndex = (highestZIndex + 1).toString();
    }
  }

  private getHighestZIndex(): number {
    const elements = document.querySelectorAll("*");
    let highest = 0;

    for (let i = 0; i < elements.length; i++) {
      const zIndex = parseInt(window.getComputedStyle(elements[i]).zIndex);
      if (!isNaN(zIndex) && zIndex > highest) {
        highest = zIndex;
      }
    }

    return highest;
  }

  private positionForDesktop(): void {
    const elementRect = this.element.getBoundingClientRect();

    // Remove mobile classes and styles
    this.container.classList.remove("mobile-view");
    this.container.style.minWidth = "";
    this.container.style.boxSizing = "";
    this.container.style.margin = "";
    this.container.style.padding = "";
    this.container.style.transform = "";

    // Restore opens class based on options
    this.container.classList.add(`opens${this.options.opens}`);

    this.resetContainerPosition();

    const containerWidth = this.container.offsetWidth;
    const containerHeight = this.container.offsetHeight;

    const { top: containerTop, drops } = this.calculateVerticalPosition(
      elementRect,
      containerHeight
    );

    const containerLeft = this.calculateHorizontalPosition(
      elementRect,
      containerWidth
    );

    this.applyDropUpClass(drops);
    this.applyFinalPosition(containerTop, containerLeft);
  }

  private resetContainerPosition(): void {
    this.container.style.top = "0";
    this.container.style.left = "0";
    this.container.style.right = "auto";
    this.container.style.position = "fixed";
  }

  private calculateVerticalPosition(
    elementRect: DOMRect,
    containerHeight: number
  ): { top: number; drops: string } {
    let containerTop: number;
    let drops = this.options.drops;

    switch (drops) {
      case "auto":
        containerTop = elementRect.bottom + 5;
        if (containerTop + containerHeight >= window.innerHeight) {
          containerTop = elementRect.top - containerHeight - 5;
          drops = "up";
        }
        break;
      case "up":
        containerTop = elementRect.top - containerHeight - 5;
        break;
      default:
        containerTop = elementRect.bottom + 5;
        break;
    }

    return { top: Math.max(9, containerTop), drops };
  }

  private calculateHorizontalPosition(
    elementRect: DOMRect,
    containerWidth: number
  ): number {
    let containerLeft: number;

    switch (this.options.opens) {
      case "left":
        containerLeft = elementRect.right - containerWidth;
        break;
      case "center":
        containerLeft =
          elementRect.left + elementRect.width / 2 - containerWidth / 2;
        break;
      default:
        containerLeft = elementRect.left;
        break;
    }

    // Ensure it stays within viewport
    if (containerLeft < 9) {
      containerLeft = 9;
    } else if (containerLeft + containerWidth > window.innerWidth - 9) {
      containerLeft = window.innerWidth - containerWidth - 9;
    }

    return containerLeft;
  }

  private applyDropUpClass(drops: string): void {
    if (drops === "up") {
      this.container.classList.add("drop-up");
    } else {
      this.container.classList.remove("drop-up");
    }
  }

  private applyFinalPosition(top: number, left: number): void {
    this.container.style.top = `${top}px`;
    this.container.style.left = `${left}px`;
    this.container.style.right = "auto";
    this.container.style.zIndex = "99999";
  }
}
