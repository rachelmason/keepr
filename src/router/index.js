import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Login from '@/components/Login'
import Register from '@/components/Register'
import myVaults from '@/components/myVaults'
import Vault from '@/components/Vault'
import Keep from '@/components/Keep'
import Dashboard from '@/components/Dashboard'
Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'Hello',
            component: Hello
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/register',
            name: 'Register',
            component: Register
        },
        {
            path: '/myvaults',
            name: 'myVaults',
            component: myVaults
        },
        {
            path: '/vaults/:id',
            name: 'Vault',
            component: Vault
        },
        {
            path: '/keeps/:id',
            name: 'Keep',
            component: Keep
        },
        {
            path: '/dashboard',
            name: 'Dashboard',
            component: Dashboard
        }
    ]
})