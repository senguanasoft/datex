# Localization

DateX provides comprehensive internationalization support with built-in locales and easy customization for any language.

## Built-in Locales

### Spanish Locale

DateX includes a complete Spanish locale:

```javascript
import { Datex, SPANISH_LOCALE } from "datex";

new Datex("#picker", {
  locale: SPANISH_LOCALE,
});
```

**Features:**

- Date format: `DD/MM/YYYY`
- Spanish month names and day abbreviations
- Monday as first day of week
- Spanish labels for buttons and ranges

### Spanish with Time

For time picker support:

```javascript
import { Datex, SPANISH_LOCALE_WITH_TIME } from "datex";

new Datex("#picker", {
  locale: SPANISH_LOCALE_WITH_TIME,
  timePicker: true,
});
```

**Features:**

- Date format: `DD/MM/YYYY HH:mm`
- 24-hour time format
- All Spanish locale features

## Custom Locales

Create your own locale configuration:

```javascript
const frenchLocale = {
  format: "DD/MM/YYYY",
  separator: " - ",
  applyLabel: "Appliquer",
  cancelLabel: "Annuler",
  customRangeLabel: "Plage personnalisée",
  daysOfWeek: ["Lu", "Ma", "Me", "Je", "Ve", "Sa", "Di"],
  monthNames: [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ],
  firstDay: 1, // Monday
};

new Datex("#picker", {
  locale: frenchLocale,
});
```

## Locale Properties

### Date Formatting

| Property    | Description                            | Example        |
| ----------- | -------------------------------------- | -------------- |
| `format`    | Date display format                    | `'DD/MM/YYYY'` |
| `separator` | Range separator                        | `' - '`        |
| `firstDay`  | First day of week (0=Sunday, 1=Monday) | `1`            |

### Labels

| Property           | Description         | Default          |
| ------------------ | ------------------- | ---------------- |
| `applyLabel`       | Apply button text   | `'Apply'`        |
| `cancelLabel`      | Cancel button text  | `'Cancel'`       |
| `customRangeLabel` | Custom range option | `'Custom Range'` |

### Calendar Text

| Property     | Description                 | Example                        |
| ------------ | --------------------------- | ------------------------------ |
| `daysOfWeek` | Day abbreviations (7 items) | `['Su', 'Mo', 'Tu', ...]`      |
| `monthNames` | Month names (12 items)      | `['January', 'February', ...]` |

## Date Formats

DateX supports various date formats:

### Common Formats

```javascript
// European format
{
  format: "DD/MM/YYYY";
}

// US format
{
  format: "MM/DD/YYYY";
}

// ISO format
{
  format: "YYYY-MM-DD";
}

// With time
{
  format: "DD/MM/YYYY HH:mm";
}

// 12-hour time
{
  format: "MM/DD/YYYY hh:mm A";
}
```

### Format Tokens

| Token  | Description    | Example |
| ------ | -------------- | ------- |
| `YYYY` | 4-digit year   | `2024`  |
| `MM`   | 2-digit month  | `01`    |
| `DD`   | 2-digit day    | `15`    |
| `HH`   | 24-hour format | `14`    |
| `hh`   | 12-hour format | `02`    |
| `mm`   | Minutes        | `30`    |
| `ss`   | Seconds        | `45`    |
| `A`    | AM/PM          | `PM`    |

## Language Examples

### German

```javascript
const germanLocale = {
  format: "DD.MM.YYYY",
  separator: " - ",
  applyLabel: "Anwenden",
  cancelLabel: "Abbrechen",
  customRangeLabel: "Benutzerdefiniert",
  daysOfWeek: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
  monthNames: [
    "Januar",
    "Februar",
    "März",
    "April",
    "Mai",
    "Juni",
    "Juli",
    "August",
    "September",
    "Oktober",
    "November",
    "Dezember",
  ],
  firstDay: 1,
};
```

### Italian

```javascript
const italianLocale = {
  format: "DD/MM/YYYY",
  separator: " - ",
  applyLabel: "Applica",
  cancelLabel: "Annulla",
  customRangeLabel: "Intervallo personalizzato",
  daysOfWeek: ["Lu", "Ma", "Me", "Gi", "Ve", "Sa", "Do"],
  monthNames: [
    "Gennaio",
    "Febbraio",
    "Marzo",
    "Aprile",
    "Maggio",
    "Giugno",
    "Luglio",
    "Agosto",
    "Settembre",
    "Ottobre",
    "Novembre",
    "Dicembre",
  ],
  firstDay: 1,
};
```

### Portuguese

```javascript
const portugueseLocale = {
  format: "DD/MM/YYYY",
  separator: " - ",
  applyLabel: "Aplicar",
  cancelLabel: "Cancelar",
  customRangeLabel: "Intervalo personalizado",
  daysOfWeek: ["Do", "Se", "Te", "Qu", "Qu", "Se", "Sá"],
  monthNames: [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ],
  firstDay: 0, // Sunday
};
```

### Japanese

```javascript
const japaneseLocale = {
  format: "YYYY/MM/DD",
  separator: " - ",
  applyLabel: "適用",
  cancelLabel: "キャンセル",
  customRangeLabel: "カスタム範囲",
  daysOfWeek: ["日", "月", "火", "水", "木", "金", "土"],
  monthNames: [
    "1月",
    "2月",
    "3月",
    "4月",
    "5月",
    "6月",
    "7月",
    "8月",
    "9月",
    "10月",
    "11月",
    "12月",
  ],
  firstDay: 0,
};
```

## Predefined Ranges Localization

Localize predefined ranges to match your locale:

```javascript
// Spanish ranges
const spanishRanges = {
  Hoy: [new Date(), new Date()],
  Ayer: [new Date(Date.now() - 86400000), new Date(Date.now() - 86400000)],
  "Esta Semana": [getStartOfWeek(), getEndOfWeek()],
  "Semana Pasada": [getLastWeekStart(), getLastWeekEnd()],
  "Este Mes": [getStartOfMonth(), getEndOfMonth()],
  "Mes Pasado": [getLastMonthStart(), getLastMonthEnd()],
};

// French ranges
const frenchRanges = {
  "Aujourd'hui": [new Date(), new Date()],
  Hier: [yesterday, yesterday],
  "Cette semaine": [thisWeekStart, thisWeekEnd],
  "Ce mois": [thisMonthStart, thisMonthEnd],
};

new Datex("#picker", {
  locale: frenchLocale,
  ranges: frenchRanges,
});
```

## Dynamic Locale Switching

Change locale dynamically:

```javascript
const picker = new Datex("#picker");

// Switch to Spanish
picker.setLocale(SPANISH_LOCALE);

// Switch to custom locale
picker.setLocale(germanLocale);
```

## RTL (Right-to-Left) Support

For RTL languages like Arabic or Hebrew:

```javascript
const arabicLocale = {
  format: "DD/MM/YYYY",
  separator: " - ",
  applyLabel: "تطبيق",
  cancelLabel: "إلغاء",
  customRangeLabel: "نطاق مخصص",
  daysOfWeek: ["أح", "إث", "ثل", "أر", "خم", "جم", "سب"],
  monthNames: [
    "يناير",
    "فبراير",
    "مارس",
    "أبريل",
    "مايو",
    "يونيو",
    "يوليو",
    "أغسطس",
    "سبتمبر",
    "أكتوبر",
    "نوفمبر",
    "ديسمبر",
  ],
  firstDay: 6, // Saturday
  rtl: true,
};
```

## Framework Integration

### React with i18n

```jsx
import { useTranslation } from "react-i18next";
import { Datex } from "datex";

function DatePicker() {
  const { t, i18n } = useTranslation();

  const locale = {
    format: "DD/MM/YYYY",
    separator: " - ",
    applyLabel: t("datePicker.apply"),
    cancelLabel: t("datePicker.cancel"),
    customRangeLabel: t("datePicker.customRange"),
    daysOfWeek: t("datePicker.daysOfWeek", { returnObjects: true }),
    monthNames: t("datePicker.monthNames", { returnObjects: true }),
    firstDay: i18n.language === "en" ? 0 : 1,
  };

  // Use locale in DateX initialization
}
```

### Vue with vue-i18n

```vue
<script setup>
import { useI18n } from "vue-i18n";
import { Datex } from "datex";

const { t, locale } = useI18n();

const datePickerLocale = computed(() => ({
  format: "DD/MM/YYYY",
  separator: " - ",
  applyLabel: t("datePicker.apply"),
  cancelLabel: t("datePicker.cancel"),
  customRangeLabel: t("datePicker.customRange"),
  daysOfWeek: t("datePicker.daysOfWeek"),
  monthNames: t("datePicker.monthNames"),
  firstDay: locale.value === "en" ? 0 : 1,
}));
</script>
```

## Best Practices

1. **Consistent Formatting**: Use date formats familiar to your users
2. **Cultural Considerations**: Respect local conventions (first day of week, date order)
3. **Testing**: Test with actual native speakers
4. **Fallbacks**: Provide fallback text for missing translations
5. **Context**: Consider the context where dates appear

## Complete Example

```javascript
import { Datex } from "datex";

// Detect user's language
const userLang = navigator.language || navigator.userLanguage;

let locale;
let ranges;

switch (userLang.substring(0, 2)) {
  case "es":
    locale = SPANISH_LOCALE;
    ranges = {
      Hoy: [new Date(), new Date()],
      Ayer: [yesterday, yesterday],
      "Esta Semana": [thisWeekStart, thisWeekEnd],
    };
    break;
  case "fr":
    locale = frenchLocale;
    ranges = {
      "Aujourd'hui": [new Date(), new Date()],
      Hier: [yesterday, yesterday],
    };
    break;
  default:
    locale = englishLocale;
    ranges = {
      Today: [new Date(), new Date()],
      Yesterday: [yesterday, yesterday],
    };
}

new Datex("#picker", {
  locale,
  ranges,
});
```

## Next Steps

- [Events](/guide/events) - Handle picker events
- [Custom Themes](/guide/custom-themes) - Advanced styling
- [Framework Integration](/examples/frameworks) - Framework integration examples
