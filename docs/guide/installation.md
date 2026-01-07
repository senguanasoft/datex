# Installation

DateX can be installed and used in multiple ways depending on your project setup and preferences.

## Package Managers

### npm

```bash
npm install datex
```

### Yarn

```bash
yarn add datex
```

### pnpm

```bash
pnpm add datex
```

## CDN

For quick prototyping or if you prefer not to use a build system:

### ES Modules (Recommended)

```html
<script type="module">
  import { DateRangePicker } from "https://unpkg.com/datex@latest/dist/index.esm.js";

  const picker = new DateRangePicker("#daterange");
</script>
```

### UMD (Universal Module Definition)

```html
<script src="https://unpkg.com/datex@latest/dist/index.js"></script>
<script>
  const picker = new DateX.DateRangePicker("#daterange");
</script>
```

### Specific Version

It's recommended to pin to a specific version in production:

```html
<script type="module">
  import { DateRangePicker } from "https://unpkg.com/datex@1.0.0/dist/index.esm.js";
</script>
```

## CSS Styles

DateX includes CSS styles that need to be imported:

### With Build Tools

If you're using a bundler like Webpack, Vite, or Rollup:

```javascript
import { DateRangePicker } from "datex";
// Styles are automatically included
```

### Manual CSS Import

If you need to import CSS manually:

```html
<link rel="stylesheet" href="https://unpkg.com/datex@latest/dist/index.css" />
```

Or with a bundler:

```javascript
import "datex/dist/index.css";
```

## Framework-Specific Installation

### React

```bash
npm install datex
```

```jsx
import { DateRangePicker } from "datex";
// Use in useEffect or component lifecycle
```

### Vue

```bash
npm install datex
```

```vue
<script setup>
import { DateRangePicker } from "datex";
// Use in onMounted
</script>
```

### Angular

```bash
npm install datex
```

```typescript
import { DateRangePicker } from "datex";
// Use in ngOnInit or ngAfterViewInit
```

### Svelte

```bash
npm install datex
```

```svelte
<script>
  import { DateRangePicker } from 'datex';
  // Use in onMount
</script>
```

## TypeScript Support

DateX is written in TypeScript and includes full type definitions:

```typescript
import {
  DateRangePicker,
  DateRangePickerOptions,
  DateRangePickerCallback,
} from "datex";

const options: DateRangePickerOptions = {
  startDate: new Date(),
  endDate: new Date(),
  autoApply: true,
};

const callback: DateRangePickerCallback = (startDate, endDate, label) => {
  console.log("Selected:", startDate, endDate, label);
};

const picker = new DateRangePicker("#daterange", options, callback);
```

## Verification

To verify your installation is working correctly:

```javascript
import { DateRangePicker, version } from "datex";

console.log("DateX version:", version);

const picker = new DateRangePicker("#test-input");
console.log("DateX loaded successfully!");
```

## Dependencies

DateX has minimal dependencies:

- **@formkit/tempo** - For date manipulation and formatting
- **No jQuery required** - Pure vanilla JavaScript
- **No other runtime dependencies**

## Browser Support

DateX supports all modern browsers:

- **Chrome** 60+
- **Firefox** 60+
- **Safari** 12+
- **Edge** 79+

For older browser support, you may need polyfills for:

- `CustomEvent`
- `Element.closest()`
- `Object.assign()`

## Bundle Size

DateX is optimized for size:

- **Minified**: ~45KB
- **Minified + Gzipped**: ~12KB
- **Tree-shakeable**: Import only what you need

## Next Steps

Once installed, continue with:

- [Basic Usage](/guide/basic-usage) - Learn the fundamentals
- [Configuration](/guide/options) - Explore all options
- [Examples](/examples/basic) - See practical implementations

## Troubleshooting

### Common Issues

**Module not found error:**

```bash
# Make sure you've installed the package
npm install datex

# Check if it's in your package.json
npm list datex
```

**CSS not loading:**

```javascript
// Make sure to import CSS
import "datex/dist/index.css";
```

**TypeScript errors:**

```bash
# Make sure TypeScript can find the types
npm install --save-dev @types/node
```

Need more help? Check our [GitHub Issues](https://github.com/senguanasoft/datex/issues) or [Discussions](https://github.com/senguanasoft/datex/discussions).
