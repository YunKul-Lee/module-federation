<script setup lang="ts">
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { defineAsyncComponent } from 'vue'

// 로컬 페이지 컴포넌트 dynamic import
const router = useRouter()
router.addRoute({
  path: '/SPGENPS00001',
  name: 'SPGENPS00001',
  component: defineAsyncComponent(() => import('@/pages/SPGENPS00001.vue'))
})

// 리모트 페이지 컴포넌트 (SPGEFWZ00001) dynamic import
// @ts-ignore
const SPGEFWZ00001 = defineAsyncComponent(() => import('fw_z_meta_ui/SPGEFWZ00001'))
router.addRoute({
  path: '/SPGEFWZ00001',
  name: 'SPGEFWZ00001',
  component: SPGEFWZ00001
})

// 리모트 페이지 컴포넌트 (SPGEFWZ99999) dynamic import
// @ts-ignore
const SPGEFWZ99999 = defineAsyncComponent(() => import('fw_z_meta_ui/SPGEFWZ99999'))
router.addRoute({
  path: '/SPGEFWZ99999',
  name: 'SPGEFWZ99999',
  component: SPGEFWZ99999
})


</script>

<template>
  <header>
    <ul>
      <li><RouterLink to="/">Home</RouterLink></li>
      <li><RouterLink to="/SPGENPS00001">LocalPage</RouterLink></li>
      <li><RouterLink to="/SPGEFWZ00001">RemotePage1</RouterLink></li>
      <li><RouterLink to="/SPGEFWZ99999">RemotePage2</RouterLink></li>
    </ul>
  </header>

  <RouterView />
</template>

