import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  base: '/cafeteria/',
  server: {
    proxy: {
      '/api': 'http://localhost:3001',
    },
  },
})