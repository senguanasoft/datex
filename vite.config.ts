import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "DateX",
      formats: ["es"], // Solo ES modules, sin CJS
      fileName: () => `index.esm.js`,
    },
    rollupOptions: {
      // Asegurar que las dependencias externas no se incluyan en el bundle
      external: [],
      output: {
        // Proporcionar variables globales para usar en el build UMD
        globals: {},
        // Extraer CSS a archivo separado
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith(".css")) {
            return "style.css";
          }
          return assetInfo.name || "assets/[name].[ext]";
        },
      },
    },
    sourcemap: false,
    minify: "esbuild", // Opcional: minificar el código
    // Generar archivos de declaración de TypeScript
    emptyOutDir: true,
    // Forzar extracción de CSS
    cssCodeSplit: false,
  },
  css: {
    preprocessorOptions: {
      scss: {
        // Opciones para SCSS si es necesario
      },
    },
  },
});
