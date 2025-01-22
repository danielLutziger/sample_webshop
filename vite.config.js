import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  server: {
    allowedHosts: ['je-shop.onrender.com', 'localhost'],
  },
  plugins: [react()],
})
