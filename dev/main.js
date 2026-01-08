import { Datex, SPANISH_LOCALE, DEFAULT_THEME, BOOTSTRAP_THEME, MATERIAL_THEME } from '../src/index.ts';

console.log('🚀 DateX Dev Mode');

// Pickers storage
const pickers = {};

// Helper para mostrar resultados con más información
function showResult(id, start, end, label) {
    const el = document.getElementById(id);
    if (el) {
        const formatOptions = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };

        el.innerHTML = `
            <div style="display: flex; flex-direction: column; gap: 8px;">
                <div><strong>📅 Selección Realizada:</strong></div>
                <div style="background: #f0fdf4; padding: 12px; border-radius: 8px; border-left: 4px solid #10b981;">
                    <div><strong>Inicio:</strong> ${start.toLocaleDateString('es-ES', formatOptions)}</div>
                    <div><strong>Fin:</strong> ${end.toLocaleDateString('es-ES', formatOptions)}</div>
                    ${label ? `<div><strong>Etiqueta:</strong> ${label}</div>` : ''}
                    <div style="margin-top: 8px; font-size: 12px; color: #6b7280;">
                        Duración: ${Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1} días
                    </div>
                </div>
            </div>
        `;
    }
}

// Helper para mostrar errores de validación
function showValidationError(id, error, errorCode) {
    const el = document.getElementById(id);
    if (el) {
        el.innerHTML = `
            <div style="display: flex; flex-direction: column; gap: 8px;">
                <div><strong>❌ Error de Validación:</strong></div>
                <div style="background: #fef2f2; padding: 12px; border-radius: 8px; border-left: 4px solid #ef4444;">
                    <div><strong>Error:</strong> ${error}</div>
                    ${errorCode ? `<div><strong>Código:</strong> ${errorCode}</div>` : ''}
                    <div style="margin-top: 8px; font-size: 12px; color: #6b7280;">
                        Intenta seleccionar una fecha válida
                    </div>
                </div>
            </div>
        `;
    }
}

// Inicializar cuando DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    console.log('Inicializando pickers...');

    // Selector examples
    pickers.id = new Datex('#date-picker', { locale: SPANISH_LOCALE });
    pickers.class = new Datex('.date-input-range', { locale: SPANISH_LOCALE });
    pickers.attr = new Datex('[data-datex="range"]', { locale: SPANISH_LOCALE });

    // Main examples
    pickers.basic = new Datex('#basic-picker', {
        locale: SPANISH_LOCALE,
        timePicker: true
    }, (start, end, label) => showResult('basic-result', start, end, label));

    pickers.single = new Datex('#single-picker', {
        singleDatePicker: true,
        locale: SPANISH_LOCALE
    }, (start, end, label) => showResult('single-result', start, end, label));

    pickers.ranges = new Datex('#ranges-picker', {
        locale: SPANISH_LOCALE,
        ranges: {
            'Hoy': [new Date(), new Date()],
            'Ayer': [new Date(Date.now() - 86400000), new Date(Date.now() - 86400000)],
            'Últimos 7 días': [new Date(Date.now() - 6 * 86400000), new Date()]
        }
    }, (start, end, label) => showResult('ranges-result', start, end, label));

    pickers.time = new Datex('#time-picker', {
        timePicker: true,
        locale: { ...SPANISH_LOCALE, format: 'DD/MM/YYYY HH:mm' }
    }, (start, end, label) => showResult('time-result', start, end, label));

    // Advanced Time Picker with 12h format and seconds
    pickers.time12h = new Datex('#time-picker-12h', {
        timePicker: true,
        timePicker24Hour: false, // Formato 12 horas
        timePickerSeconds: true, // Incluir segundos
        timePickerIncrement: 1, // Incremento de 1 minuto
        locale: { ...SPANISH_LOCALE, format: 'DD/MM/YYYY hh:mm:ss A' }
    }, (start, end, label) => showResult('time-12h-result', start, end, label));

    // 24h Time Picker with seconds
    pickers.time24h = new Datex('#time-picker-24h', {
        timePicker: true,
        timePicker24Hour: true, // Formato 24 horas
        timePickerSeconds: true, // Incluir segundos
        timePickerIncrement: 1, // Incremento de 1 minuto
        locale: { ...SPANISH_LOCALE, format: 'DD/MM/YYYY HH:mm:ss' }
    }, (start, end, label) => showResult('time-24h-result', start, end, label));

    // Time Picker with increments
    pickers.timeIncrement = new Datex('#time-increment-picker', {
        timePicker: true,
        timePicker24Hour: true,
        timePickerIncrement: 15, // Incrementos de 15 minutos
        locale: { ...SPANISH_LOCALE, format: 'DD/MM/YYYY HH:mm' }
    }, (start, end, label) => showResult('time-increment-result', start, end, label));

    // Min/Max Date restrictions
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    pickers.minmax = new Datex('#minmax-picker', {
        locale: SPANISH_LOCALE,
        minDate: startOfMonth,
        maxDate: endOfMonth,
        showDropdowns: true
    }, (start, end, label) => showResult('minmax-result', start, end, label));

    // Min/Max Year restrictions
    pickers.yearRange = new Datex('#year-range-picker', {
        locale: SPANISH_LOCALE,
        minYear: 2020,
        maxYear: 2030,
        showDropdowns: true
    }, (start, end, label) => showResult('year-range-result', start, end, label));

    // Auto Apply
    pickers.autoApply = new Datex('#auto-apply-picker', {
        locale: SPANISH_LOCALE,
        autoApply: true,
        ranges: {
            'Hoy': [new Date(), new Date()],
            'Ayer': [new Date(Date.now() - 86400000), new Date(Date.now() - 86400000)],
            'Últimos 7 días': [new Date(Date.now() - 6 * 86400000), new Date()]
        }
    }, (start, end, label) => showResult('auto-apply-result', start, end, label));

    // Always Show Calendars
    pickers.alwaysShow = new Datex('#always-show-picker', {
        locale: SPANISH_LOCALE,
        alwaysShowCalendars: true,
        ranges: {
            'Esta Semana': [new Date(Date.now() - 6 * 86400000), new Date()],
            'Este Mes': [startOfMonth, endOfMonth],
            'Últimos 30 días': [new Date(Date.now() - 29 * 86400000), new Date()]
        }
    }, (start, end, label) => showResult('always-show-result', start, end, label));

    // Unlinked Calendars
    pickers.unlinked = new Datex('#unlinked-picker', {
        locale: SPANISH_LOCALE,
        linkedCalendars: false,
        showDropdowns: true
    }, (start, end, label) => showResult('unlinked-result', start, end, label));

    // Max Span
    pickers.maxSpan = new Datex('#max-span-picker', {
        locale: SPANISH_LOCALE,
        maxSpan: { days: 7 },
        validation: {
            maxDaysBetween: 7
        },
        events: {
            onValidationError: (error, errorCode) => {
                showValidationError('max-span-result', error, errorCode);
            }
        }
    }, (start, end, label) => showResult('max-span-result', start, end, label));

    // No Dropdowns
    pickers.noDropdowns = new Datex('#no-dropdowns-picker', {
        locale: SPANISH_LOCALE,
        showDropdowns: false, // Sin dropdowns de mes/año
        timePicker: true,
        timePicker24Hour: true
    }, (start, end, label) => showResult('no-dropdowns-result', start, end, label));

    // Advanced validation example
    pickers.validation = new Datex('#validation-picker', {
        locale: SPANISH_LOCALE,
        validation: {
            businessDaysOnly: true,
            disabledDates: [
                new Date(2026, 0, 15), // January 15, 2026
                new Date(2026, 0, 20), // January 20, 2026
            ],
            disabledDaysOfWeek: [], // Will be handled by businessDaysOnly
            minDaysBetween: 1,
            maxDaysBetween: 30,
            customValidator: (date) => {
                // Don't allow dates in the first week of any month
                return date.getDate() > 7;
            }
        },
        events: {
            onValidationError: (error, errorCode) => {
                showValidationError('validation-result', error, errorCode);
            },
            beforeDateSelect: (date) => {
                console.log('Before selecting date:', date);
                return true; // Allow selection
            },
            onDateSelect: (date) => {
                console.log('Date selected:', date);
            }
        }
    }, (start, end, label) => showResult('validation-result', start, end, label));

    // Keyboard navigation example
    pickers.keyboard = new Datex('#keyboard-picker', {
        locale: SPANISH_LOCALE,
        events: {
            onOpen: () => {
                console.log('Picker opened - keyboard navigation active');
            },
            onClose: () => {
                console.log('Picker closed');
            }
        }
    }, (start, end, label) => showResult('keyboard-result', start, end, label));

    // Themes
    pickers.default = new Datex('#default-theme', { theme: DEFAULT_THEME, locale: SPANISH_LOCALE });
    pickers.bootstrap = new Datex('#bootstrap-theme', { theme: BOOTSTRAP_THEME, locale: SPANISH_LOCALE });
    pickers.material = new Datex('#material-theme', { theme: MATERIAL_THEME, locale: SPANISH_LOCALE });

    // Light/Dark mode examples - usando el ThemeService mejorado
    pickers.lightMode = new Datex('#light-mode-picker', {
        locale: SPANISH_LOCALE,
        theme: DEFAULT_THEME
    }, (start, end, label) => showResult('light-mode-result', start, end, label));

    pickers.darkMode = new Datex('#dark-mode-picker', {
        locale: SPANISH_LOCALE,
        theme: DEFAULT_THEME
    }, (start, end, label) => showResult('dark-mode-result', start, end, label));

    pickers.autoMode = new Datex('#auto-mode-picker', {
        locale: SPANISH_LOCALE,
        theme: DEFAULT_THEME
    }, (start, end, label) => showResult('auto-mode-result', start, end, label));

    // Configurar modos iniciales
    pickers.lightMode.setThemeMode('light');
    pickers.darkMode.setThemeMode('dark');
    pickers.autoMode.setThemeMode('auto');

    console.log('✅ Pickers listos');
});

// Global functions for buttons
window.showBasicPicker = () => pickers.basic?.show();
window.showSinglePicker = () => pickers.single?.show();
window.showRangesPicker = () => pickers.ranges?.show();
window.showTimePicker = () => pickers.time?.show();
window.showTimePicker12h = () => pickers.time12h?.show();
window.showTimePicker24h = () => pickers.time24h?.show();
window.showTimeIncrementPicker = () => pickers.timeIncrement?.show();
window.showMinMaxPicker = () => pickers.minmax?.show();
window.showYearRangePicker = () => pickers.yearRange?.show();
window.showAutoApplyPicker = () => pickers.autoApply?.show();
window.showAlwaysShowPicker = () => pickers.alwaysShow?.show();
window.showUnlinkedPicker = () => pickers.unlinked?.show();
window.showMaxSpanPicker = () => pickers.maxSpan?.show();
window.showNoDropdownsPicker = () => pickers.noDropdowns?.show();
window.showValidationPicker = () => pickers.validation?.show();
window.showKeyboardPicker = () => pickers.keyboard?.show();
window.showDefaultTheme = () => pickers.default?.show();
window.showBootstrapTheme = () => pickers.bootstrap?.show();
window.showMaterialTheme = () => pickers.material?.show();

// Light/Dark mode functions
window.showLightMode = () => pickers.lightMode?.show();
window.showDarkMode = () => pickers.darkMode?.show();
window.showAutoMode = () => pickers.autoMode?.show();

// Theme mode switching functions
window.switchToLight = () => {
    Object.values(pickers).forEach(picker => {
        if (picker.setThemeMode) {
            picker.setThemeMode('light');
        }
    });
    updateThemeModeDisplay('light');
};

window.switchToDark = () => {
    Object.values(pickers).forEach(picker => {
        if (picker.setThemeMode) {
            picker.setThemeMode('dark');
        }
    });
    updateThemeModeDisplay('dark');
};

window.switchToAuto = () => {
    Object.values(pickers).forEach(picker => {
        if (picker.setThemeMode) {
            picker.setThemeMode('auto');
        }
    });
    updateThemeModeDisplay('auto');
};

function updateThemeModeDisplay(mode) {
    const display = document.getElementById('theme-mode-result');
    if (display) {
        const currentMode = pickers.autoMode?.getCurrentThemeMode() || 'light';
        display.innerHTML = `
            <div style="display: flex; flex-direction: column; gap: 8px;">
                <div><strong>🎨 Modo de Tema Actualizado:</strong></div>
                <div style="background: #f0fdf4; padding: 12px; border-radius: 8px; border-left: 4px solid #10b981;">
                    <div><strong>Modo Seleccionado:</strong> ${mode}</div>
                    <div><strong>Modo Actual:</strong> ${currentMode}</div>
                    <div style="margin-top: 8px; font-size: 12px; color: #6b7280;">
                        ${mode === 'auto' ? 'Se detectará automáticamente según las preferencias del sistema' : `Forzado a modo ${mode}`}
                    </div>
                </div>
            </div>
        `;
    }
}

// Debug functions
window.debugAllPickers = () => {
    const debug = document.getElementById('debug-info');
    debug.style.display = debug.style.display === 'none' ? 'block' : 'none';
    debug.innerHTML = `
        <strong>Debug Info:</strong><br>
        Pickers: ${Object.keys(pickers).length}<br>
        Containers: ${document.querySelectorAll('.datex-picker').length}
    `;
};

window.toggleAllPickers = () => Object.values(pickers).forEach(p => p.toggle?.());
window.testDropdowns = () => Object.values(pickers).forEach(p => p.testDropdowns?.());
window.showThemeInfo = () => {
    const debug = document.getElementById('debug-info');
    debug.style.display = 'block';
    debug.innerHTML = `
        <strong>Themes:</strong><br>
        Default: ${DEFAULT_THEME.primaryColor}<br>
        Bootstrap: ${BOOTSTRAP_THEME.primaryColor}<br>
        Material: ${MATERIAL_THEME.primaryColor}<br><br>
        <strong>Pickers Activos:</strong><br>
        Total: ${Object.keys(pickers).length} pickers inicializados
    `;
};