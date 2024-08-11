import { createApp } from 'vue'
import { createPinia } from 'pinia'

import NPS from './NPS.vue'
import router from './router'

const app = createApp(NPS)

app.use(createPinia())
app.use(router)

app.mount('#app')
