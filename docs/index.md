---
layout: home

hero:
  name: "DateX"
  text: "Modern Date Range Picker"
  tagline: "Lightweight, customizable, and framework-agnostic date range picker for modern web applications"
  image:
    src: /logo.svg
    alt: DateX Logo
  actions:
    - theme: brand
      text: Get Started
      link: /guide/getting-started
    - theme: alt
      text: View on GitHub
      link: https://github.com/senguanasoft/datex
    - theme: alt
      text: Try Playground
      link: /playground

features:
  - icon: 🎨
    title: Highly Customizable
    details: Multiple built-in themes and complete CSS customization support. Make it match your brand perfectly.

  - icon: 🌍
    title: Internationalization
    details: Built-in locales for multiple languages with easy custom locale support for global applications.

  - icon: ⚡
    title: Lightweight & Fast
    details: Minimal dependencies and optimized bundle size. Only ~12KB gzipped with excellent performance.

  - icon: 📱
    title: Responsive Design
    details: Works perfectly on desktop, tablet, and mobile devices with touch-friendly interactions.

  - icon: ♿
    title: Accessible
    details: WCAG compliant with full keyboard navigation support and screen reader compatibility.

  - icon: 🎯
    title: TypeScript Ready
    details: Full TypeScript support with comprehensive type definitions for better developer experience.

  - icon: 🕒
    title: Time Picker Support
    details: Optional time selection with customizable increments, 12/24 hour formats, and seconds support.

  - icon: 🎪
    title: Framework Agnostic
    details: Works with vanilla JavaScript, React, Vue, Angular, Svelte, and any other framework.

  - icon: 🔧
    title: Rich API
    details: Comprehensive API with events, methods, and configuration options for any use case.
---

## Quick Example

```javascript
import { Datex } from "datex";

// Works with any CSS selector
const picker = new Datex(
  "#daterange", // ID selector
  // ".date-picker",         // Class selector
  // "[data-date='range']",  // Attribute selector
  {
    startDate: new Date(),
    endDate: new Date(),
    ranges: {
      Today: [new Date(), new Date()],
      "Last 7 Days": [
        new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
        new Date(),
      ],
      "Last 30 Days": [
        new Date(Date.now() - 29 * 24 * 60 * 60 * 1000),
        new Date(),
      ],
    },
  },
  (startDate, endDate, label) => {
    console.log("Selected:", startDate, endDate, label);
  }
);
```

## Why DateX?

DateX is built from the ground up to be the most developer-friendly and user-friendly date range picker available. Here's what makes it special:

### 🚀 **Modern Architecture**

Built with modern JavaScript/TypeScript, using the latest web standards and best practices.

### 🎨 **Design System Ready**

Easily integrate with any design system. Built-in themes for Bootstrap, Material Design, and more.

### 📦 **Zero Configuration**

Works out of the box with sensible defaults, but highly configurable when you need it.

### 🔄 **Framework Integration**

First-class support for React, Vue, Angular, and other popular frameworks with dedicated guides.

### 🌐 **Global Ready**

Built-in internationalization with RTL support and multiple locale presets.

---

<div class="tip custom-block" style="padding-top: 8px">

Just want to try it out? Skip to the [Playground](/playground) to see DateX in action!

</div>
