import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
 
export default new Router({
//  mode: 'history',//去掉#号
 routes: [
{
    path: '/',
    name: 'Add',
    component: resolve => require(['../../../components/add.vue'],resolve)
},
 {
  path: '/add',
  name: 'Add',
  component: resolve => require(['../../../components/add.vue'],resolve)
 },
 {
    path: '/test',
    name: 'Test',
    component: resolve => require(['../../../components/test.vue'],resolve)
},
{
    path: '/language',
    name: 'Language',
    component: resolve => require(['../../../components/language.vue'],resolve)
},
{
    path: '/user',
    name: 'User',
    component: resolve => require(['../../../components/user.vue'],resolve)
},
 ]
})

