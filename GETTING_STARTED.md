# DateX - Guía de Inicio Rápido

## 🚀 Configuración Inicial del Proyecto

### 1. Estructura del Proyecto

Tu librería DateX está organizada de la siguiente manera:

```
libs/datex/
├── src/                     # Código fuente
│   ├── DateRangePicker.ts   # Clase principal
│   ├── styles/              # Estilos SCSS
│   ├── tests/               # Tests unitarios
│   └── index.ts             # Punto de entrada
├── docs/                    # Documentación VitePress
├── examples/                # Ejemplos de uso
├── scripts/                 # Scripts de build y publish
├── package.json             # Configuración del paquete
├── rollup.config.js         # Configuración de build
├── tsconfig.json            # Configuración TypeScript
└── vercel.json              # Configuración de despliegue
```

### 2. Instalación de Dependencias

```bash
cd libs/datex
npm install
```

### 3. Desarrollo

```bash
# Iniciar servidor de desarrollo
npm run dev

# Iniciar documentación en modo desarrollo
npm run docs:dev

# Ejecutar tests
npm test

# Ejecutar tests en modo watch
npm run test:watch

# Linting
npm run lint
npm run lint:fix
```

## 📦 Construcción y Publicación

### 1. Construir la Librería

```bash
# Build completo
npm run build

# Build en modo watch
npm run build:watch
```

Esto generará:

- `dist/index.js` - Versión CommonJS
- `dist/index.esm.js` - Versión ES Modules
- `dist/index.d.ts` - Definiciones TypeScript
- `dist/index.css` - Estilos CSS compilados

### 2. Publicar en NPM

#### Opción A: Script Automatizado (Recomendado)

```bash
# Hacer el script ejecutable (Unix/Mac)
chmod +x scripts/publish.js

# Ejecutar script de publicación
node scripts/publish.js
```

#### Opción B: Manual

```bash
# 1. Actualizar versión
npm version patch  # o minor/major

# 2. Construir
npm run build

# 3. Publicar
npm publish
```

### 3. Configurar NPM

Antes de publicar, asegúrate de:

```bash
# Iniciar sesión en NPM
npm login

# Verificar usuario
npm whoami

# Verificar que el nombre del paquete esté disponible
npm view datex
```

## 🌐 Despliegue de Documentación en Vercel

### 1. Preparar Documentación

```bash
# Construir documentación
npm run docs:build

# Vista previa local
npm run docs:preview
```

### 2. Desplegar en Vercel

#### Opción A: Vercel CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Iniciar sesión
vercel login

# Desplegar
vercel

# Desplegar a producción
vercel --prod
```

#### Opción B: GitHub Integration

1. Sube tu código a GitHub
2. Ve a [vercel.com](https://vercel.com)
3. Conecta tu repositorio
4. Configura:
   - **Framework**: VitePress
   - **Build Command**: `npm run docs:build`
   - **Output Directory**: `docs/.vitepress/dist`

### 3. Configuración de Dominio Personalizado

En el dashboard de Vercel:

1. Ve a Project Settings → Domains
2. Añade tu dominio personalizado
3. Configura DNS según las instrucciones

## 🛠️ Personalización

### 1. Modificar la Librería

El código principal está en `src/DateRangePicker.ts`. Para añadir nuevas funcionalidades:

1. Modifica el código fuente
2. Añade tests en `src/tests/`
3. Actualiza la documentación
4. Ejecuta `npm run build`

### 2. Personalizar Temas

Añade nuevos temas en `src/DateRangePicker.ts`:

```typescript
export const CUSTOM_THEME: DateRangePickerTheme = {
  primaryColor: "#your-color",
  backgroundColor: "#ffffff",
  // ... más propiedades
};
```

### 3. Añadir Locales

Crea nuevos locales:

```typescript
export const CUSTOM_LOCALE: DateRangePickerLocale = {
  format: "DD/MM/YYYY",
  separator: " - ",
  applyLabel: "Aplicar",
  // ... más propiedades
};
```

## 📚 Documentación

### 1. Estructura de la Documentación

```
docs/
├── .vitepress/
│   └── config.ts           # Configuración VitePress
├── guide/                  # Guías de usuario
├── api/                    # Referencia API
├── examples/               # Ejemplos
├── index.md                # Página principal
└── playground.md           # Playground interactivo
```

### 2. Añadir Nuevas Páginas

1. Crea archivos `.md` en las carpetas apropiadas
2. Actualiza la navegación en `.vitepress/config.ts`
3. Usa el formato VitePress Markdown

### 3. Playground Interactivo

El playground en `docs/playground.md` permite a los usuarios probar la librería en tiempo real. Personalízalo según tus necesidades.

## 🧪 Testing

### 1. Ejecutar Tests

```bash
# Tests unitarios
npm test

# Tests con coverage
npm run test -- --coverage

# Tests en modo watch
npm run test:watch
```

### 2. Probar en el Navegador

Abre los archivos de desarrollo para probar la librería:

```bash
# Iniciar servidor de desarrollo
npm run dev

# Luego visita:
# http://localhost:5173/dev/         - Ejemplos completos
```

Los archivos de desarrollo incluyen:

- `dev/index.html` - Suite completa de pruebas con diferentes selectores CSS
- `dev/main.js` - Lógica de inicialización y ejemplos

### 3. Ejemplos de Selectores Soportados

DateX acepta múltiples tipos de selectores:

```javascript
// ID selector
new Datex("#date-picker");

// Class selector
new Datex(".date-input-range");

// Attribute selector
new Datex("[data-datex='range']");

// Complex CSS selector
new Datex("input[type='text'].date-picker");

// DOM element directly
new Datex(document.getElementById("my-input"));
```

## 🔧 Configuración Avanzada

### 1. Modificar Build

Edita `rollup.config.js` para personalizar el proceso de construcción:

```javascript
// Añadir nuevos plugins
// Modificar configuración de salida
// Personalizar optimizaciones
```

### 2. Configurar TypeScript

Modifica `tsconfig.json` según tus necesidades:

```json
{
  "compilerOptions": {
    // Tus configuraciones personalizadas
  }
}
```

### 3. Personalizar Linting

Edita `.eslintrc.js` para ajustar las reglas de linting.

## 📈 Monitoreo y Mantenimiento

### 1. Estadísticas NPM

- Visita [npmjs.com/package/datex](https://npmjs.com/package/datex)
- Monitorea descargas y uso
- Responde a issues y PRs

### 2. Analytics de Documentación

En Vercel dashboard:

- Habilita Web Analytics
- Monitorea tráfico y rendimiento
- Revisa logs de errores

### 3. Actualizaciones

```bash
# Actualizar dependencias
npm update

# Verificar vulnerabilidades
npm audit

# Corregir vulnerabilidades
npm audit fix
```

## 🆘 Solución de Problemas

### Problemas Comunes

**Error de build:**

```bash
# Limpiar y reinstalar
rm -rf node_modules dist
npm install
npm run build
```

**Tests fallan:**

```bash
# Verificar configuración de test
npm run test -- --reporter=verbose
```

**Documentación no se actualiza:**

```bash
# Limpiar cache de Vercel
vercel --prod --force
```

## 📞 Soporte

- 📚 [Documentación completa](https://datex-docs.vercel.app)
- 🐛 [Reportar issues](https://github.com/senguanasoft/datex/issues)
- 💬 [Discusiones](https://github.com/senguanasoft/datex/discussions)

## ✅ Checklist de Lanzamiento

### Antes del Primer Release

- [ ] Completar implementación de DateRangePicker
- [ ] Escribir tests completos
- [ ] Crear documentación
- [ ] Configurar CI/CD
- [ ] Probar en diferentes navegadores
- [ ] Optimizar bundle size

### Para Cada Release

- [ ] Actualizar versión en package.json
- [ ] Actualizar CHANGELOG.md
- [ ] Ejecutar todos los tests
- [ ] Construir y verificar build
- [ ] Publicar en NPM
- [ ] Desplegar documentación
- [ ] Crear release en GitHub
- [ ] Anunciar en redes sociales

¡Tu librería DateX está lista para ser una herramienta poderosa y fácil de usar! 🎉
