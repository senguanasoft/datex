# DateX Development Guide

Este documento describe cómo configurar y desarrollar la librería DateX usando pnpm.

## Requisitos Previos

- Node.js 16 o superior
- pnpm 8 o superior

## Configuración del Entorno

### 1. Instalar pnpm (si no está instalado)

```bash
# Usando npm
npm install -g pnpm

# Usando Homebrew (macOS)
brew install pnpm

# Usando Scoop (Windows)
scoop install pnpm
```

### 2. Instalar dependencias

```bash
# IMPORTANTE: Ejecutar desde la raíz del workspace (C:\tech_emilio\libs)
cd C:\tech_emilio\libs
pnpm install

# Esto instalará las dependencias para todos los proyectos en el workspace
```

## Scripts de Desarrollo

### Desde la raíz del workspace (C:\tech_emilio\libs)

```bash
# Construir todos los proyectos
pnpm -r run build

# Ejecutar tests en todos los proyectos
pnpm -r run test

# Linting en todos los proyectos
pnpm -r run lint
```

### Desde el directorio del proyecto datex (C:\tech_emilio\libs\datex)

```bash
# Cambiar al directorio del proyecto
cd datex

# Construir solo datex
pnpm run build

# Construir en modo watch (desarrollo)
pnpm run build:watch

# Ejecutar tests
pnpm run test

# Tests en modo watch
pnpm run test:watch

# Linting
pnpm run lint

# Corregir linting
pnpm run lint:fix

# Verificar tipos
pnpm run type-check
```

### Documentación

```bash
# Servidor de desarrollo de documentación
pnpm run docs:dev

# Construir documentación
pnpm run docs:build

# Previsualizar documentación construida
pnpm run docs:preview
```

## Estructura del Workspace

```
C:\tech_emilio\libs\                # Raíz del workspace
├── package.json                   # Configuración del workspace
├── pnpm-workspace.yaml           # Configuración de pnpm workspace
├── .npmrc                         # Configuración de pnpm
├── .vscode/                       # Configuración de VS Code
├── datex/                         # Proyecto DateX
│   ├── src/
│   │   ├── DateRangePicker.ts     # Clase principal
│   │   ├── index.ts               # Punto de entrada
│   │   ├── types/
│   │   │   └── index.ts          # Definiciones de tipos
│   │   ├── constants/
│   │   │   ├── themes.ts         # Temas predefinidos
│   │   │   └── locales.ts        # Localizaciones
│   │   ├── utils/
│   │   │   ├── dateHelpers.ts    # Utilidades de fecha
│   │   │   └── domHelpers.ts     # Utilidades DOM
│   │   └── styles/
│   │       └── datex.scss        # Estilos principales
│   ├── dist/                      # Archivos construidos
│   ├── docs/                      # Documentación VitePress
│   ├── package.json
│   ├── tsconfig.json
│   ├── rollup.config.js
│   └── README.md
└── mapperx-ts/                    # Otro proyecto (si existe)
```

## Flujo de Desarrollo

### 1. Configuración Inicial

```bash
# Navegar a la raíz del workspace
cd C:\tech_emilio\libs

# Instalar todas las dependencias
pnpm install
```

### 2. Desarrollo Local

```bash
# Opción 1: Desde la raíz del workspace
cd C:\tech_emilio\libs
pnpm --filter datex run build

# Opción 2: Desde el directorio del proyecto
cd C:\tech_emilio\libs\datex
pnpm run build

# Modo watch para desarrollo
pnpm run build:watch

# Servidor de desarrollo
pnpm run dev
```

### 3. Testing

```bash
# Desde datex directory
cd C:\tech_emilio\libs\datex
pnpm run test:watch

# Verificar tipos
pnpm run type-check
```

### 4. Antes de Commit

```bash
# Desde datex directory
cd C:\tech_emilio\libs\datex

# Linting
pnpm run lint:fix

# Tests
pnpm run test

# Build
pnpm run build
```

## Configuración de pnpm

### Workspace

El proyecto usa pnpm workspaces configurado en `pnpm-workspace.yaml` en la raíz (`C:\tech_emilio\libs`):

```yaml
packages:
  - "*"
```

### Configuración (.npmrc)

```ini
auto-install-peers=true
strict-peer-dependencies=false
shamefully-hoist=false
prefer-workspace-packages=true
```

## Ventajas de Vite sobre Rollup

### ✅ **Vite (Actual)**

- **Más simple**: Configuración mínima
- **Mejor soporte TypeScript**: Nativo, sin plugins adicionales
- **Manejo automático de CSS/SCSS**: Sin configuración extra
- **Más rápido**: Hot Module Replacement (HMR)
- **Menos dependencias**: Solo necesita Vite y TypeScript
- **Mejor debugging**: Source maps automáticos
- **Moderno**: Diseñado para proyectos actuales

### ❌ **Rollup (Anterior)**

- Configuración compleja con múltiples plugins
- Problemas de compatibilidad entre plugins
- Manejo manual de CSS y tipos
- Más dependencias de desarrollo
- Errores frecuentes con ES modules vs CommonJS

## Comandos Útiles

```bash
# Construir solo datex
pnpm --filter datex run build

# Instalar dependencia solo en datex
pnpm --filter datex add lodash

# Ejecutar script en datex
pnpm --filter datex run test
```

### Comandos recursivos (todos los proyectos)

```bash
# Construir todos los proyectos
pnpm -r run build

# Instalar dependencias en todos los proyectos
pnpm -r install

# Ejecutar tests en todos los proyectos
pnpm -r run test
```

## Publicación

### Preparación

```bash
# Verificar que todo esté correcto
pnpm run lint
pnpm run test
pnpm run build

# Verificar archivos que se publicarán
pnpm pack --dry-run
```

### Publicar

```bash
# Publicar a npm
pnpm publish

# Publicar versión beta
pnpm publish --tag beta
```

## Troubleshooting

### Problemas Comunes

1. **Error de dependencias**: Ejecutar `pnpm install` en la raíz del workspace (`C:\tech_emilio\libs`)
2. **Problemas de build**: Limpiar `dist/` y ejecutar `pnpm run build`
3. **Errores de tipos**: Ejecutar `pnpm run type-check` para detalles
4. **Error de Rollup ES modules**: El proyecto usa `rollup.config.cjs` para evitar problemas de módulos

### Limpiar Cache

```bash
# Limpiar cache de pnpm
pnpm store prune

# Limpiar node_modules y reinstalar (desde la raíz del workspace)
cd C:\tech_emilio\libs
rm -rf node_modules pnpm-lock.yaml
pnpm install

# Limpiar dist y reconstruir
cd datex
rm -rf dist
pnpm run build
```

## Contribuir

1. Fork del repositorio
2. Crear rama feature: `git checkout -b feature/nueva-funcionalidad`
3. Hacer cambios y tests
4. Ejecutar `pnpm run lint:fix` y `pnpm run test`
5. Commit y push
6. Crear Pull Request

## Recursos

- [pnpm Documentation](https://pnpm.io/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Rollup Documentation](https://rollupjs.org/)
- [VitePress Documentation](https://vitepress.dev/)
