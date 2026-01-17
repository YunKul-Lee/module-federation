import { createApp } from 'vue'
import { createPinia } from 'pinia'

import NPS from './NPS.vue'
import ItemBundle from "@/ItemBundle.vue";
import router from './router'

const app = createApp(ItemBundle)
// const app = createApp(NPS)

app.use(createPinia())
app.use(router)

app.mount('#app')
