import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
 
export default new Router({
//  mode: 'history',//去掉#号
 routes: [
{
    path: '/',
    name: 'Login',
    component: resolve => require(['../../../components/userLogin.vue'],resolve)
},
 {
  path: '/login',
  name: 'Login',
  component: resolve => require(['../../../components/userLogin.vue'],resolve)
 },
 {
    path: '/register',
    name: 'Register',
    component: resolve => require(['../../../components/register.vue'],resolve)
   },
 ]
})
