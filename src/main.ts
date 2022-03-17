import { createApp } from 'vue'

import { Quasar, quasarLang } from "./config";

import { router } from "@/router/routes"

import App from './App.vue'

const app = createApp(App)

app.use(router)

app.use(Quasar, {
    plugin: {},
    lang: quasarLang
})

app.mount('#app')
