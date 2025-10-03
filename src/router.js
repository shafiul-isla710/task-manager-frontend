import { createWebHistory, createRouter } from 'vue-router'

import Register from "@/pages/register.vue";

const routes = [
    {
        path: '/',
        name:'register',
        component:Register,
    }
]


const router = createRouter({
    history: createWebHistory(),
    routes,
})
export default router