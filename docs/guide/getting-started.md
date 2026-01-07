# Getting Started

DateX is a modern, lightweight date range picker that works with any JavaScript framework or vanilla JavaScript. This guide will help you get up and running quickly.

## What is DateX?

DateX is a highly customizable date range picker component that provides:

- **Intuitive Interface**: Clean, modern design that users love
- **Flexible Configuration**: Extensive options to fit any use case
- **Framework Agnostic**: Works with React, Vue, Angular, or vanilla JS
- **Accessibility First**: Full keyboard navigation and screen reader support
- **Mobile Friendly**: Touch-optimized for mobile devices
- **Lightweight**: Small bundle size with minimal dependencies

## Installation

Choose your preferred package manager:

::: code-group

```bash [npm]
npm install datex
```

```bash [yarn]
yarn add datex
```

```bash [pnpm]
pnpm add datex
```

:::

## Basic Usage

### HTML Setup

First, create an input element in your HTML:

```html
<input type="text" id="daterange" placeholder="Select date range..." />
```

### JavaScript Integration

Import DateX and initialize it:

```javascript
import { DateRangePicker } from "datex";

// Basic initialization
const picker = new DateRangePicker("#daterange");
```

### With Options and Callback

```javascript
import { DateRangePicker } from "datex";

const picker = new DateRangePicker(
  "#daterange",
  {
    // Configuration options
    startDate: new Date(),
    endDate: new Date(),
    autoApply: true,
    ranges: {
      Today: [new Date(), new Date()],
      Yesterday: [
        new Date(Date.now() - 24 * 60 * 60 * 1000),
        new Date(Date.now() - 24 * 60 * 60 * 1000),
      ],
      "Last 7 Days": [
        new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
        new Date(),
      ],
    },
  },
  (startDate, endDate, label) => {
    // Callback function
    console.log("Date range selected:", {
      start: startDate,
      end: endDate,
      label: label,
    });
  }
);
```

## Your First Example

Let's create a complete working example:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>DateX Example</title>
  </head>
  <body>
    <div class="container">
      <h1>My Date Range Picker</h1>
      <input type="text" id="daterange" placeholder="Click to select dates" />
      <div id="output"></div>
    </div>

    <script type="module">
      import { DateRangePicker } from "https://unpkg.com/datex@latest/dist/index.esm.js";

      const picker = new DateRangePicker(
        "#daterange",
        {
          autoUpdateInput: true,
          ranges: {
            Today: [new Date(), new Date()],
            "This Week": [
              new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
              new Date(),
            ],
            "This Month": [
              new Date(new Date().getFullYear(), new Date().getMonth(), 1),
              new Date(),
            ],
          },
        },
        (startDate, endDate, label) => {
          document.getElementById("output").innerHTML = `
                <h3>Selected Range:</h3>
                <p><strong>Start:</strong> ${startDate.toLocaleDateString()}</p>
                <p><strong>End:</strong> ${endDate.toLocaleDateString()}</p>
                <p><strong>Label:</strong> ${label || "Custom Range"}</p>
            `;
        }
      );
    </script>
  </body>
</html>
```

## Next Steps

Now that you have DateX working, explore these topics:

- **[Configuration Options](/guide/options)** - Learn about all available options
- **[Themes](/guide/themes)** - Customize the appearance
- **[Localization](/guide/localization)** - Add multi-language support
- **[Events](/guide/events)** - Handle picker events
- **[Examples](/examples/basic)** - See more practical examples

## Need Help?

- 📚 Check the [API Reference](/api/options)
- 🎮 Try the [Interactive Playground](/playground)
- 🐛 Report issues on [GitHub](https://github.com/senguanasoft/datex/issues)
- 💬 Join discussions on [GitHub Discussions](https://github.com/senguanasoft/datex/discussions)
