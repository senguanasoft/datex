/**
 * Position management service for Datex date picker
 */

import { DatexOptions } from "../types/datex-types";

export class PositionService {
  private element: HTMLElement;
  private container: HTMLElement;
  private options: Required<DatexOptions>;

  constructor(
    element: HTMLElement,
    container: HTMLElement,
    options: Required<DatexOptions>
  ) {
    this.element = element;
    this.container = container;
    this.options = options;
  }

  calculatePosition(): void {
    if (!this.container) return;

    // Check if it's a mobile device
    const isMobile = window.innerWidth <= 768 || "ontouchstart" in window;

    if (isMobile && this.container.classList.contains("touch-enabled")) {
      this.positionForMobile();
    } else {
      this.positionForDesktop();
    }
  }

  private positionForMobile(): void {
    // On mobile, position at bottom of screen for better UX
    this.container.style.position = "fixed";
    this.container.style.bottom = "0";
    this.container.style.left = "0";
    this.container.style.right = "0";
    this.container.style.top = "auto";
    this.container.style.width = "100%";
    this.container.style.maxWidth = "100vw";
    this.container.style.borderRadius = "16px 16px 0 0";
    this.container.style.zIndex = "99999";
    this.container.classList.add("drop-up");
  }

  private positionForDesktop(): void {
    const elementRect = this.element.getBoundingClientRect();

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
