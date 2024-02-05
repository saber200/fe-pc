import { defineConfig } from 'vite'
import { resolve } from 'path';
import react from '@vitejs/plugin-react'
import topLevelAwait from 'vite-plugin-top-level-await'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    topLevelAwait({
      // The export name of top-level await promise for each chunk module
      promiseExportName: '__tla',
      // The function to generate import names of top-level await promise in each chunk module
      promiseImportName: i => `__tla_${i}`
    })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@components': resolve(__dirname, './src/components')
    }
  },
  server: {
    proxy: {
      // '/api': 'http://154.221.31.52:5000',
      // '/api': {
      //   target: 'http://154.221.31.52:5000', //目标url
      //   changeOrigin: true, //支持跨域
      //   // rewrite: (path) => path.replace(/^\/api/, ""),
      //   //重写路径,替换/api
      // }
      '^/api/.*': {
        target: 'http://154.221.31.52:5000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      }
    }
  }
})
