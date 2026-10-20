import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // the lazy-loaded 3D chunk bundles three.js (~1 MB), which is expected
    chunkSizeWarningLimit: 1100,
  },
})
