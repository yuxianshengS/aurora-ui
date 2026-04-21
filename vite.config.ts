import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/aurora-ui/',
  plugins: [react()],
  server: {
    port: 5173,
    open: false,
  },
});
