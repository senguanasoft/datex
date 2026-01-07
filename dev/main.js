import { Datex, SPANISH_LOCALE, DEFAULT_THEME, BOOTSTRAP_THEME, MATERIAL_THEME } from '../src/index.ts';

console.log('🚀 DateX Dev Mode');

// Pickers storage
const pickers = {};

// Helper para mostrar resultados
function showResult(id, start, end, label) {
    const el = document.getElementById(id);
    if (el) {
        el.innerHTML = `
            <strong>Selección:</strong><br>
            Inicio: ${start.toLocaleDateString('es-ES')}<br>
            Fin: ${end.toLocaleDateString('es-ES')}<br>
            ${label ? `Etiqueta: ${label}` : ''}
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
        locale: SPANISH_LOCALE
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

    // Themes
    pickers.default = new Datex('#default-theme', { theme: DEFAULT_THEME, locale: SPANISH_LOCALE });
    pickers.bootstrap = new Datex('#bootstrap-theme', { theme: BOOTSTRAP_THEME, locale: SPANISH_LOCALE });
    pickers.material = new Datex('#material-theme', { theme: MATERIAL_THEME, locale: SPANISH_LOCALE });

    console.log('✅ Pickers listos');
});

// Global functions for buttons
window.showBasicPicker = () => pickers.basic?.show();
window.showSinglePicker = () => pickers.single?.show();
window.showRangesPicker = () => pickers.ranges?.show();
window.showTimePicker = () => pickers.time?.show();
window.showDefaultTheme = () => pickers.default?.show();
window.showBootstrapTheme = () => pickers.bootstrap?.show();
window.showMaterialTheme = () => pickers.material?.show();

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
        Material: ${MATERIAL_THEME.primaryColor}
    `;
};