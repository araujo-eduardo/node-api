import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  build: {
    // Relative to the root
    outDir: '../dist',
  },
  plugins: [react()],
});
