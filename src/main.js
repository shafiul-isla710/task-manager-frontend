// import './assets/main.css'
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap/dist/js/bootstrap.min.js'
import './style.css'
import Vue3EasyDataTable from 'vue3-easy-data-table'
import 'vue3-easy-data-table/dist/style.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from "@/router.js";
import {createPinia} from "pinia";
const pinia = createPinia();
const app = createApp(App);
app.component('EasyDataTable', Vue3EasyDataTable);
app.use(pinia)
app.use(router)
app.mount('#app')
