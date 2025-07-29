// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/auth': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      },
      '/resume': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      },
      '/stats': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      },
    }
  }
})
