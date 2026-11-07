import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    envPrefix: ['VITE_', 'NEXT_PUBLIC_'],
    plugins: [react(), tailwindcss()],
    define: {
      'process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL': JSON.stringify(
        process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL ||
        'https://script.google.com/macros/s/AKfycbymeTKYR1eUqz8OiZjSMs4nWgNKHszw47KoyClC3U40AS8QSkU9wpIj3sQBHBYmspYoZg/exec'
      ),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
