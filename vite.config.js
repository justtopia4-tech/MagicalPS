import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import fs from 'fs';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'serve-root-config',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url === '/config.txt' || req.url?.startsWith('/config.txt?')) {
            const rootConfig = path.resolve(__dirname, 'config.txt');
            if (fs.existsSync(rootConfig)) {
              res.setHeader('Content-Type', 'text/plain; charset=utf-8');
              res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
              return res.end(fs.readFileSync(rootConfig, 'utf-8'));
            }
          }
          next();
        });
      }
    },
    {
      name: 'copy-nopy-html',
      closeBundle() {
        try {
          const distDir = path.resolve(__dirname, 'dist');
          const nopyDir = path.resolve(distDir, 'nopy');
          const indexPath = path.resolve(distDir, 'index.html');
          if (fs.existsSync(indexPath)) {
            if (!fs.existsSync(nopyDir)) {
              fs.mkdirSync(nopyDir, { recursive: true });
            }
            fs.copyFileSync(indexPath, path.resolve(nopyDir, 'index.html'));
            fs.copyFileSync(indexPath, path.resolve(distDir, 'nopy.html'));
          }
        } catch (e) {
          console.warn("Failed to copy nopy HTML fallback:", e);
        }
      }
    }
  ],
  server: {
    port: 3000,
    host: true
  },
  build: {
    target: 'esnext',
    minify: 'esbuild',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          motion: ['framer-motion'],
          icons: ['lucide-react']
        }
      }
    }
  }
});
