<script setup>
import { defineAsyncComponent, shallowRef, watchEffect } from 'vue'

const pages = import.meta.glob('./pages/**/*.vue')
const pageComponents = {}
Object.keys(pages).forEach(key => {
  const name = key.match(/^\.\/pages\/(.*)\.vue$/)[1].toLowerCase()
  pageComponents[name] = defineAsyncComponent(() => pages[key]())
})

const page = shallowRef()

watchEffect(() => {
  let url = location.pathname

  if (url === '/') url = '/index'
  page.value = pageComponents[url.slice(1).toLowerCase()]
})
</script>

<template>
  <component :is="page"></component>
</template>

