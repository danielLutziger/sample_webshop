import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  server: {
    allowedHosts: ['je-shop.onrender.com', 'localhost'],
    proxy: {
      '/api': {
        target: 'http://localhost:3001', // assuming your backend runs on port 3001
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  plugins: [react()],
})
