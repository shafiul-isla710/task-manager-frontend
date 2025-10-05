// import './assets/main.css'
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap/dist/js/bootstrap.min.js'
import './style.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from "@/router.js";
import {createPinia} from "pinia";
const pinia = createPinia()
const app = createApp(App)
app.use(pinia)
app.use(router)
app.mount('#app')
