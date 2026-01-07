# Interactive Playground

Try DateX live in your browser! Experiment with different configurations and see the results instantly.

<div id="playground-container">
  <div class="playground-controls">
    <h3>Configuration</h3>
    <div class="control-group">
      <label>
        <input type="checkbox" id="autoApply" /> Auto Apply
      </label>
      <label>
        <input type="checkbox" id="singleDatePicker" /> Single Date Picker
      </label>
      <label>
        <input type="checkbox" id="timePicker" /> Time Picker
      </label>
      <label>
        <input type="checkbox" id="showDropdowns" checked /> Show Dropdowns
      </label>
    </div>
    
    <div class="control-group">
      <label>
        Theme:
        <select id="themeSelect">
          <option value="default">Default</option>
          <option value="bootstrap">Bootstrap</option>
          <option value="material">Material</option>
        </select>
      </label>
      
      <label>
        Locale:
        <select id="localeSelect">
          <option value="english">English</option>
          <option value="spanish">Spanish</option>
        </select>
      </label>
    </div>
    
    <div class="control-group">
      <label>
        Opens:
        <select id="opensSelect">
          <option value="center">Center</option>
          <option value="left">Left</option>
          <option value="right">Right</option>
        </select>
      </label>
      
      <label>
        Drops:
        <select id="dropsSelect">
          <option value="auto">Auto</option>
          <option value="up">Up</option>
          <option value="down">Down</option>
        </select>
      </label>
    </div>
    
    <button id="updatePicker" class="btn-primary">Update Picker</button>
  </div>
  
  <div class="playground-demo">
    <h3>Demo</h3>
    <input type="text" id="playground-input" placeholder="Click to select date range" />
    
    <div id="playground-output">
      <h4>Selected Range:</h4>
      <div id="output-content">No range selected yet</div>
    </div>
    
    <div class="code-preview">
      <h4>Generated Code:</h4>
      <pre><code id="generated-code">// Configuration will appear here</code></pre>
    </div>
  </div>
</div>

<script type="module">
import { DateRangePicker, BOOTSTRAP_THEME, MATERIAL_THEME, SPANISH_LOCALE } from 'https://unpkg.com/datex@latest/dist/index.esm.js';

let currentPicker = null;

const themes = {
  default: {},
  bootstrap: BOOTSTRAP_THEME,
  material: MATERIAL_THEME
};

const locales = {
  english: {
    format: 'MM/DD/YYYY',
    separator: ' - ',
    applyLabel: 'Apply',
    cancelLabel: 'Cancel',
    customRangeLabel: 'Custom Range',
    daysOfWeek: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
    monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    firstDay: 0
  },
  spanish: SPANISH_LOCALE
};

function getCurrentConfig() {
  return {
    autoApply: document.getElementById('autoApply').checked,
    singleDatePicker: document.getElementById('singleDatePicker').checked,
    timePicker: document.getElementById('timePicker').checked,
    showDropdowns: document.getElementById('showDropdowns').checked,
    theme: themes[document.getElementById('themeSelect').value],
    locale: locales[document.getElementById('localeSelect').value],
    opens: document.getElementById('opensSelect').value,
    drops: document.getElementById('dropsSelect').value,
    ranges: {
      'Today': [new Date(), new Date()],
      'Yesterday': [
        new Date(Date.now() - 24 * 60 * 60 * 1000),
        new Date(Date.now() - 24 * 60 * 60 * 1000)
      ],
      'Last 7 Days': [
        new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
        new Date()
      ],
      'Last 30 Days': [
        new Date(Date.now() - 29 * 24 * 60 * 60 * 1000),
        new Date()
      ]
    }
  };
}

function updateGeneratedCode() {
  const config = getCurrentConfig();
  const themeKey = document.getElementById('themeSelect').value;
  const localeKey = document.getElementById('localeSelect').value;
  
  let code = `import { DateRangePicker`;
  
  if (themeKey !== 'default') {
    code += `, ${themeKey.toUpperCase()}_THEME`;
  }
  
  if (localeKey !== 'english') {
    code += `, ${localeKey.toUpperCase()}_LOCALE`;
  }
  
  code += ` } from 'datex';\n\n`;
  code += `const picker = new DateRangePicker('#daterange', {\n`;
  
  if (config.autoApply) code += `  autoApply: true,\n`;
  if (config.singleDatePicker) code += `  singleDatePicker: true,\n`;
  if (config.timePicker) code += `  timePicker: true,\n`;
  if (!config.showDropdowns) code += `  showDropdowns: false,\n`;
  if (config.opens !== 'center') code += `  opens: '${config.opens}',\n`;
  if (config.drops !== 'auto') code += `  drops: '${config.drops}',\n`;
  
  if (themeKey !== 'default') {
    code += `  theme: ${themeKey.toUpperCase()}_THEME,\n`;
  }
  
  if (localeKey !== 'english') {
    code += `  locale: ${localeKey.toUpperCase()}_LOCALE,\n`;
  }
  
  code += `  ranges: {\n`;
  code += `    'Today': [new Date(), new Date()],\n`;
  code += `    'Last 7 Days': [new Date(Date.now() - 6 * 24 * 60 * 60 * 1000), new Date()],\n`;
  code += `    'Last 30 Days': [new Date(Date.now() - 29 * 24 * 60 * 60 * 1000), new Date()]\n`;
  code += `  }\n`;
  code += `}, (startDate, endDate, label) => {\n`;
  code += `  console.log('Selected:', startDate, endDate, label);\n`;
  code += `});`;
  
  document.getElementById('generated-code').textContent = code;
}

function createPicker() {
  if (currentPicker) {
    currentPicker.remove();
  }
  
  const config = getCurrentConfig();
  
  currentPicker = new DateRangePicker('#playground-input', config, (startDate, endDate, label) => {
    document.getElementById('output-content').innerHTML = `
      <p><strong>Start:</strong> ${startDate.toLocaleDateString()}</p>
      <p><strong>End:</strong> ${endDate.toLocaleDateString()}</p>
      <p><strong>Label:</strong> ${label || 'Custom Range'}</p>
    `;
  });
  
  updateGeneratedCode();
}

// Initialize
createPicker();

// Event listeners
document.getElementById('updatePicker').addEventListener('click', createPicker);

// Update code when controls change
document.querySelectorAll('#playground-container input, #playground-container select').forEach(control => {
  control.addEventListener('change', updateGeneratedCode);
});
</script>

<style>
#playground-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin: 2rem 0;
  padding: 1rem;
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
}

.playground-controls {
  padding: 1rem;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
}

.control-group {
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.control-group label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
}

.control-group select {
  padding: 0.25rem 0.5rem;
  border: 1px solid var(--vp-c-border);
  border-radius: 4px;
  background: var(--vp-c-bg);
}

.btn-primary {
  background: var(--vp-c-brand-1);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
}

.btn-primary:hover {
  background: var(--vp-c-brand-2);
}

.playground-demo {
  padding: 1rem;
}

#playground-input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--vp-c-border);
  border-radius: 4px;
  font-size: 1rem;
  margin-bottom: 1rem;
}

#playground-output {
  margin: 1rem 0;
  padding: 1rem;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
}

.code-preview {
  margin-top: 1rem;
}

.code-preview pre {
  background: var(--vp-code-block-bg);
  padding: 1rem;
  border-radius: 6px;
  overflow-x: auto;
  font-size: 0.85rem;
}

@media (max-width: 768px) {
  #playground-container {
    grid-template-columns: 1fr;
  }
}
</style>

## Features to Try

### Basic Configuration

- Toggle **Auto Apply** to see immediate vs. manual date selection
- Enable **Single Date Picker** for single date selection
- Try **Time Picker** for date and time selection

### Themes

- **Default**: Clean, modern design
- **Bootstrap**: Bootstrap-compatible styling
- **Material**: Material Design inspired theme

### Positioning

- **Opens**: Controls where the picker appears relative to the input
- **Drops**: Controls whether the picker drops up or down

### Localization

- Switch between **English** and **Spanish** locales
- Notice how date formats, labels, and first day of week change

## Code Generation

The playground automatically generates the JavaScript code for your current configuration. Copy and paste it into your project to get the exact same setup!

## Want More?

This playground shows just a fraction of DateX's capabilities. For more advanced examples, check out:

- [Basic Examples](/examples/basic)
- [Framework Integration](/examples/frameworks)
- [Custom Themes](/examples/themes)
- [API Reference](/api/options)
