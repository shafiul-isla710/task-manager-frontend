import { createWebHistory, createRouter } from 'vue-router'

import Register from "@/pages/auth/register.vue";
import sentOpt from "@/pages/auth/sent-otp-page.vue";
import verifyOpt from "@/pages/auth/verify-otp-page.vue";
import resetPassword from "@/pages/auth/reset-password.vue";
import HomePage from "@/pages/HomePage.vue";
import LoginPage from "@/pages/auth/LoginPage.vue";
import MasterLayout from "@/layout/MasterLayout.vue";
import Dashboard from "@/pages/dashboard/Dashboard.vue";
import TaskList from "@/pages/task/TaskList.vue";
import TaskCreate from "@/pages/task/task-create-form.vue";
import TaskAssign from "@/pages/task/task-assign-form.vue";
import group from "@/pages/group/group.vue";
import groupDetails from "@/pages/group/GroupDetails.vue";
import form from "@/pages/group/form.vue";
import MemberList from "@/pages/member/memberList.vue";
import MemberEditForm from "@/pages/member/memberEditForm.vue";


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
        path: '/sent-otp',
        name:'sent-otp',
        component:sentOpt,
    },
    {
        path: '/verify-otp',
        name:'very-otp',
        component:verifyOpt,
    },
    {
        path: '/reset-password',
        name:'set-password',
        component:resetPassword,
    },

    //Master layout start
    {
        path:'/',
        component: MasterLayout,
        children:[
            //dashboard
            {
                path:'/dashboard',
                name:'dashboard',
                component:Dashboard,
                meta: { requiresAuth: true },
            },
            // members
            {
                path:'/member',
                name:'memberList',
                component:MemberList,
                meta: { requiresAuth: true },
            },
            {
                path:'/member-form/:id',
                name:'memberEditForm',
                component:MemberEditForm,
                meta: { requiresAuth: true },
            },

            //task related  path or component
            {
                path:'/TaskList',
                name:'TaskList',
                component:TaskList,
                meta: { requiresAuth: true },
            },
            {
                path:'/TaskCreate',
                name:'TaskCreate',
                component:TaskCreate,
                meta: { requiresAuth: true },
            },
            {
                path:'/TaskCreate/:id/edit',
                name:'TaskEdit',
                component:TaskCreate,
                meta: { requiresAuth: true },
            },
            {
                path:'/Task-assign/:taskId/:assignTo',
                name:'TaskAssign',
                component:TaskAssign,
                props:true,
                meta: { requiresAuth: true },
            },

            //group related path or component
            {
                path:'/groups',
                name:'groups',
                component:group,
                meta: { requiresAuth: true },
            },
            {
                path:'/form',
                name:'createForm',
                component:form,
                meta: { requiresAuth: true },
            },
            {
                path:'/form/:id/edit',
                name:'editForm',
                component:form,
                meta: { requiresAuth: true },
            },
            {
                path:'/details/:id',
                name:'groupDetails',
                component:groupDetails,
                meta: { requiresAuth: true },
            },
        ]
    }
]


const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to,from,next)=>{
    const isAuthenticated = !!localStorage.getItem('token');

    if(to.meta.requiresAuth && !isAuthenticated){
        next({name:'login'})
    }else{
        next()
    }
})
export default router