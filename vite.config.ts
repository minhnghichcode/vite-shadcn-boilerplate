import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  server: {
    hmr: {
      // Increase the maximum header size
      maxSessionMemory: 100
    },
    // Increase the headers limit
    headers: {
      'Connection': 'keep-alive',
      'Keep-Alive': 'timeout=5'
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
