import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@edwardchan/web-toolkit': resolve(__dirname, 'src/index.js')
    }
  },
  server: {
    port: 3000,
    open: true
  }
})
