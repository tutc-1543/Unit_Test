/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

import VueRouter from 'vue-router';
import FullCalendar from 'vue-full-calendar';
import router from './routers';
import 'fullcalendar/dist/fullcalendar.css';
import { store } from './store/store';
import axios from 'axios';
import VueInternationalization from 'vue-i18n';
import Locale from './vue-i18n-locales.generated.js';

Vue.use(VueRouter);
Vue.use(FullCalendar);
Vue.use(VueInternationalization);

if (localStorage.getItem('access_token')) {
    window.axios.defaults.headers.common['Authorization'] =
        'Bearer ' + localStorage.getItem('access_token');
}
/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!store.getters.loggedIn) {
            next({
                name: 'login'
            });
        } else {
            next();
        }
    } else if (to.matched.some(record => record.meta.requiresVisitor)) {
        if (store.getters.loggedIn) {
            next({
                name: 'index'
            });
        } else {
            next();
        }
    } else {
        next();
    }
});

Vue.component('master', require('./components/Welcome.vue'));
Vue.component('vue-app', require('./components/App.vue'));
Vue.component('vue-footer', require('./components/layouts/Footer.vue'));
Vue.component('vue-header', require('./components/layouts/Header.vue'));
Vue.component('left-aside', require('./components/layouts/LeftAside.vue'));

const i18n = new VueInternationalization({
    locale: localStorage.getItem('language'),
    messages: Locale,
    silentTranslationWarn: true
});

const app = new Vue({
    el: '#app',
    i18n,
    router: router,
    store: store
});
