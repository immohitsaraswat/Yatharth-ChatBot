import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
      },
      '/api/sms': {
        target: 'https://www.fast2sms.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/sms/, '/dev/bulkV2')
      }
    }
  }
})
