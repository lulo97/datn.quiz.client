import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
 
export default defineConfig({
  build: {
    sourcemap: false,
  },
  optimizeDeps: {
    entries: ['./opencv.js', './qr-scanner.umd.min.js', './qr-scanner-worker.min.js']
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  }
})