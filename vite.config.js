import { defineConfig } from 'vite'
import { resolve } from 'path';
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@components': resolve(__dirname, './src/components')
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://154.221.31.52:5000', //目标url
        changeOrigin: true, //支持跨域
        // rewrite: (path) => path.replace(/^\/api/, ""),
        //重写路径,替换/api
      }
    }
  }
})
