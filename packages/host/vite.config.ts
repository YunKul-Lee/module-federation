import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import federation from '@originjs/vite-plugin-federation'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    federation({
      name: 'host-app',
      remotes: {
        fw_z_meta_ui: 'http://localhost:4100/fw/z/meta/ui/assets/remoteEntry.js',
        ql_q_newbusiness_ui: 'http://localhost:4200/ql/q/newbusiness/ui/assets/remoteEntry.js',
      },
      shared: ['vue', 'vue-router', 'pinia']
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    rollupOptions: {
      external: ['vue', 'vue-router', 'pinia'],
    },
    minify: false,
    target: ["chrome89", "edge89", "firefox89", "safari15"]
  }
})
