import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router'
//引入axios
import axios from 'axios';
Vue.prototype.axios = axios;
Vue.use(VueRouter)

import baseUrl from '../api/api.js'
const router = new VueRouter({
    routes
})
router.beforeEach((to, from, next) => {
    if (to.path === '/login') {
        window.localStorage.removeItem('login')
        next();
        // return
    }else{
        next();
    }
    let admin = JSON.parse(window.localStorage.getItem('login'))
})

export default router










