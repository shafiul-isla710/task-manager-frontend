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

import userMasterLayout from "@/layout/userMasterLayout.vue";
import UserDashboard from "@/pages/User/UserDashboard.vue";


const routes = [
    {
        path: '/',
        name: 'HomePage',
        component: HomePage,
    },
    {
        path: '/register',
        name: 'register',
        component: Register,
    },
    {
        path: '/login',
        name: 'login',
        component: LoginPage,
    },
    {
        path: '/sent-otp',
        name: 'sent-otp',
        component: sentOpt,
    },
    {
        path: '/verify-otp',
        name: 'very-otp',
        component: verifyOpt,
    },
    {
        path: '/reset-password',
        name: 'set-password',
        component: resetPassword,
    },

    // 🔹 ADMIN ROUTES
    {
        path: '/',
        component: MasterLayout,
        children: [
            {
                path: '/dashboard',
                name: 'dashboard',
                component: Dashboard,
                meta: { requiresAuth: true, role: 'Admin' },
            },
            {
                path: '/member',
                name: 'memberList',
                component: MemberList,
                meta: { requiresAuth: true, role: 'Admin' },
            },
            {
                path: '/member-form/:id',
                name: 'memberEditForm',
                component: MemberEditForm,
                meta: { requiresAuth: true, role: 'Admin' },
            },
            {
                path: '/TaskList',
                name: 'TaskList',
                component: TaskList,
                meta: { requiresAuth: true, role: 'Admin' },
            },
            {
                path: '/TaskCreate',
                name: 'TaskCreate',
                component: TaskCreate,
                meta: { requiresAuth: true, role: 'Admin' },
            },
            {
                path: '/TaskCreate/:id/edit',
                name: 'TaskEdit',
                component: TaskCreate,
                meta: { requiresAuth: true, role: 'Admin' },
            },
            {
                path: '/Task-assign/:taskId/:assignTo',
                name: 'TaskAssign',
                component: TaskAssign,
                props: true,
                meta: { requiresAuth: true, role: 'Admin' },
            },
            {
                path: '/groups',
                name: 'groups',
                component: group,
                meta: { requiresAuth: true, role: 'Admin' },
            },
            {
                path: '/form',
                name: 'createForm',
                component: form,
                meta: { requiresAuth: true, role: 'Admin' },
            },
            {
                path: '/form/:id/edit',
                name: 'editForm',
                component: form,
                meta: { requiresAuth: true, role: 'Admin' },
            },
            {
                path: '/details/:id',
                name: 'groupDetails',
                component: groupDetails,
                meta: { requiresAuth: true, role: 'Admin' },
            },
        ]
    },

    // 🔹 USER ROUTES
    {
        path: '/',
        component: userMasterLayout,
        children: [
            {
                path: '/user-dashboard',
                name: 'UserDashboard',
                component: UserDashboard,
                meta: { requiresAuth: true, role: 'User' },
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

// ✅ ROLE-BASED AUTH GUARD
router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    const isAuthenticated = !!token;

    if (to.meta.requiresAuth && !isAuthenticated) {
        return next({ name: 'login' });
    }
    if (isAuthenticated && to.name === 'login') {
        if (user?.type === 'Admin') return next({ name: 'dashboard' });
        if (user?.type === 'User') return next({ name: 'UserDashboard' });
    }
    if (to.meta.role && to.meta.role !== user?.type) {
        // যদি user তার role অনুযায়ী না হয়
        if (user?.type === 'Admin') return next({ name: 'dashboard' });
        if (user?.type === 'User') return next({ name: 'UserDashboard' });
        return next({ name: 'HomePage' });
    }

    next();
});

export default router;
