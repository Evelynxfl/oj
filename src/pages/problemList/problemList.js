// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import problemList from './problemList.vue'
import 'element-ui/lib/theme-chalk/index.css'
// import router from '../../router/index.js'
import axios from 'axios'
Vue.prototype.$http = axios;


import {
  Input, 
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Button,
  Row,
  Col,
  Tooltip,
  Popover,
  Badge,
  Card,
  Table,
  TableColumn,
  Pagination,
  Carousel,
  CarouselItem,
  Calendar
}from 'element-ui'

Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Button);
Vue.use(Row);
Vue.use(Col);
Vue.use(Tooltip);
Vue.use(Popover);
Vue.use(Input);
Vue.use(Badge);
Vue.use(Card);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Pagination);
Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(Calendar);



Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  // router,
  render:h=>h(problemList),
})
