import { defineConfig } from 'vite';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [cssInjectedByJsPlugin()],
  build: {
    lib: {
      entry: fileURLToPath(new URL('./src/tinymessage.js', import.meta.url)),
      name: 'TinyMessage',
      formats: ['es', 'umd'],
      fileName: (format) => (format === 'es' ? 'tinymessage.esm.js' : 'tinymessage.js'),
    },
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true,
    cssCodeSplit: false,
  },
});
