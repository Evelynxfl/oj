// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import login from './login.vue'
import '../../assets/css/globe.css'
import 'element-ui/lib/theme-chalk/index.css'

import VueRouter from 'vue-router'
import router from './router/index'
Vue.use(VueRouter)
import axios from 'axios'
axios.interceptors.request.use(config => {
  // console.log("jkjhhjj");
  // console.log(config);
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
Vue.prototype.$http = axios;



import {
  Input,
  Dialog,
  Row, 
  Col,
  Card,
  Message,
  Button,
  Form,
  FormItem,
  MessageBox,
  Select,
  Option,
  OptionGroup
} from 'element-ui'


Vue.use(Input);
Vue.use(Button);
Vue.use(Dialog);
Vue.use(Card);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Card);
Vue.use(Row);
Vue.use(Col);
Vue.use(Select);
Vue.use(Option);
Vue.use(OptionGroup);

Vue.prototype.$message = Message;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$confirm = MessageBox.confirm;

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render:h=>h(login)
})
