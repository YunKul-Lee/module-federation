import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import federation from '@originjs/vite-plugin-federation'

const base = '/fw/z/meta/ui/'

// https://vitejs.dev/config/
export default defineConfig({
  base,
  plugins: [
    vue(),
    federation({
      name: 'remote-app',
      filename: 'remoteEntry.js',
      exposes: {
        './SPGEFWZ00001': './src/pages/SPGEFWZ00001.vue',
        './SPGEFWZ99999': './src/pages/SPGEFWZ99999.vue'
      },
      shared: ['vue']
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    rollupOptions: {
      external: ['vue'],
    },
    minify: false,
    target: ["chrome89", "edge89", "firefox89", "safari15"]
  }
})
