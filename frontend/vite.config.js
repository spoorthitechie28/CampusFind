import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Adding a resolve alias is a robust way to ensure Vite
  // always knows where to find your source files, fixing path issues.
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})

