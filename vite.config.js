import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    tailwindcss(),
  ],
  server: {
    port: 1904,
    sourcemap: true
  },
  build: {
    sourcemap: true,
    // Enable code splitting
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate vendor chunks
          'vendor-react': ['react', 'react-dom'],
          'vendor-three': ['three', '@react-three/fiber', '@react-three/drei'],
          'vendor-gsap': ['gsap'],
        }
      }
    },
    // Optimize chunk size
    chunkSizeWarningLimit: 500,
    // Use esbuild for minification (default, faster)
    minify: 'esbuild',
    // Target modern browsers for smaller bundles
    target: 'es2020'
  }
})
