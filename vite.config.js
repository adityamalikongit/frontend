import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/', // ✅ Important for proper asset resolving on Vercel
  plugins: [react()],
  build: {
    minify: false,
    sourcemap: false,
    brotliSize: false,
  },
  server: {
    open: false,
  },
  logLevel: 'warn',
});
