import { fileURLToPath, URL } from 'node:url'
import fs from 'node:fs'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import federation from '@originjs/vite-plugin-federation'

const base = '/fw/z/meta/ui/'

// ./src/pages 하위의 vue 파일을 대상으로 노출
const pagesDir = './src/pages'
const fileList = fs.readdirSync(pagesDir, { recursive: true })
const exposes: any = {}
fileList.filter(file => file.toString().endsWith('.vue')).forEach(file => {
  const name = file.toString().substring(0, file.lastIndexOf('.'))
  exposes[`./${name}`] = `${pagesDir}/${file}`
})

// https://vitejs.dev/config/
export default defineConfig({
  base,
  plugins: [
    vue(),
    federation({
      name: 'remote-app',
      filename: 'remoteEntry.js',
      exposes,
      // exposes: {
      //   './SPGEFWZ00001': './src/pages/SPGEFWZ00001.vue',
      //   './SPGEFWZ99999': './src/pages/SPGEFWZ99999.vue'
      // },
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
