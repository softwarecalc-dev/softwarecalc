import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { sitemapPlugin } from './scripts/generate-sitemap';

export default defineConfig({
  plugins: [
    react(),
    sitemapPlugin(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    strictPort: true,
    host: true,
    allowedHosts: true,
  },
});
