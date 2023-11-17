import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/LoginView.vue';
import RegisterView from '../views/RegisterView.vue';
import HomeView from '../views/HomeView.vue';
import ManageGigView from '../views/ManageGigView.vue';
import CreateGigView from '../views/CreateGigView.vue';
import EditGigView from '../views/EditGigView.vue';
import ShowGigView from '../views/ShowGigView.vue';
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
                path: '/gig/show/:id',
                name: 'ShowGig',
                component: ShowGigView
            },
            {
                path: '/home',
                name: 'Home',
                component: HomeView
            },
            {
                path: 'gigs/manage',
                name: 'ManageGig',
                component: ManageGigView
            },
            {
                path: 'gigs/create',
                name: 'CreateGig',
                component: CreateGigView
            },
            {
                path: 'gigs/edit/:id',
                name: 'EditGig',
                component: EditGigView
            }
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
