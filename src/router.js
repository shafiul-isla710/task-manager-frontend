import { createWebHistory, createRouter } from 'vue-router'

import Register from "@/pages/register.vue";
import HomePage from "@/pages/HomePage.vue";
import LoginPage from "@/pages/LoginPage.vue";
import MasterLayout from "@/layout/MasterLayout.vue";
import Dashboard from "@/pages/Dashboard.vue";

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
    },
    {
        path:'/',
        component: MasterLayout,
        children:[
            {
                path:'/dashboard',
                name:'dashboard',
                component:Dashboard,
                meta: { requiresAuth: true },
            }
        ]
    }
]


const router = createRouter({
    history: createWebHistory(),
    routes,
})
export default router