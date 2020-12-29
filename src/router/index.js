import Vue from 'vue'
import Router from 'vue-router'

import Login from '../pages/login/login.vue';
import Index from '../pages/index/index.vue';
import Management from '../pages/management/management.vue'
import problemDecs from '../pages/problem_decs/problem_decs.vue'
import ProblemList from '../pages/problemList/problemList.vue'
Vue.use(Router);
 
const routes = [{
        path: '/',
        redirect: '/login', //必须有配置这个路径，否则转发无效
        component: Index,
        meta: { requiresAuth: true },
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: { requiresAuth: true },
    },
    {
        path: '/management',
        name: 'Management',
        component: Management,
        meta: { requiresAuth: true },
    },
    {
        path: '/problem_decs',
        name: 'problemDecs',
        component: problemDecs,
        meta: { requiresAuth: true },
    },
    {
        path: '/problemList',
        name: 'ProblemList',
        component: ProblemList,
        meta: { requiresAuth: true },
    },
]
 
const router = new Router({
    mode: 'history',
    routes
});
 
export default router;