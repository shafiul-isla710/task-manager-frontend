import { createWebHistory, createRouter } from 'vue-router'

import Register from "@/pages/register.vue";
import HomePage from "@/pages/HomePage.vue";
import LoginPage from "@/pages/LoginPage.vue";

const routes = [
    {
        path: '/',
        name:'HomePage',
        component:HomePage,
    },
    {
        path: '/register',
        name:'register',
        component:Register,
    },
    {
        path: '/login',
        name:'login',
        component:LoginPage,
    }
]


const router = createRouter({
    history: createWebHistory(),
    routes,
})
export default router