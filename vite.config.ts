import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Relative asset URLs, so the build runs from any path on the hub (see README).
  base: './',
  server: {
    host: true,
  },
})
