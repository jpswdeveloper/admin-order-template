import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig ({
  plugins: [react ()],
  base: '/', // Required for static asset paths
  server: {
    proxy: {
      '/api': {
        target: 'https://fastcnc-dxf-app-master-1.onrender.com',
        changeOrigin: true,
        secure: false,
        rewrite: path => path.replace (/^\/api/, ''), // strip /api before forwarding
      },
    },
  },
});
