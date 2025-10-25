import { createWebHistory, createRouter } from 'vue-router'

import Register from "@/pages/register.vue";
import HomePage from "@/pages/HomePage.vue";
import LoginPage from "@/pages/LoginPage.vue";
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
        //Master layout
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
export default router