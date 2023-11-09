import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../view/LoginView.vue';
import RegisterView from '../view/RegisterView.vue';
import HomeView from '../view/HomeView.vue';
import GigView from '../view/GigView.vue';
import store from '../store';
import DefaultLayout from '../components/DefaultLayout.vue';
import AuthLayout from '../components/AuthLayout.vue';

const routes = [
    {
        path: '/',
        redirect: '/home',
        name: 'DefaultLayout',
        meta: { requiresAuth: true },
        component: DefaultLayout,
        children: [
            {
                path: '/gig',
                name: 'Gig',
                component: GigView
            },
            {
                path: '/home',
                name: 'Home',
                component: HomeView
            },
        ]
    },
    {
        path: '/guest',
        redirect: '/login',
        name: 'AuthLayout',
        meta: { isGuest: true },
        component: AuthLayout,
        children: [
            {
                path: '/login',
                name: 'Login',
                component: LoginView
            },
            {
                path: '/register',
                name: 'Register',
                component: RegisterView
            }
        ]
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from ,next) => {
    if (to.meta.requiresAuth && !store.state.user.token) {
        next({
            name: 'Login'
        })
    } else if (to.meta.isGuest && store.state.user.token) {
        next({
            name: 'Home'
        })
    } else {
        next()
    }
})

export default router;
