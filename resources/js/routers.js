import VueRouter from 'vue-router'
import Login from './components/LoginComponent.vue'
import Logout from './components/LogoutComponent.vue'
import Welcome from './components/Welcome.vue'
import RegisterAccount from './components/RegisterAccountComponent'
import Home from './components/HomeComponent'
import Report from './components/layouts/reports/ReportComponent'
import Profile from './components/Profile.vue'
import Reports from './components/Reports.vue'

let routes = [
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/register-account-trainee',
        name: 'register-account-trainee',
        component: RegisterAccount,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/logout',
        name: 'logout',
        component: Logout,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/',
        name: 'index',
        component: Welcome,
        meta: {
            requiresAuth: true
        }
    },

    {
        path: '/manager-report',
        name: 'manager_report',
        component: Report,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/profile',
        name: 'profile',
        component: Profile,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/reports',
        name: 'reports',
        component: Reports,
        meta: {
            requiresAuth: true
        }
    }
];

export default new VueRouter({
    routes
});
