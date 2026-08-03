import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    // Never ship source maps to production (they would expose original source).
    sourcemap: false,
    // Use the bundler's built-in (oxc) minifier so no separate esbuild binary
    // is required. This still produces a minified, hashed, opaque bundle.
    minify: true,
    // Break the app into chunks with hashed, non-descriptive names.
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[hash].js',
        chunkFileNames: 'assets/[hash].js',
        assetFileNames: 'assets/[hash][extname]',
      },
    },
  },
})


