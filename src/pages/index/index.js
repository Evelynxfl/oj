// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './index.vue'
import '../../assets/css/globe.css'
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
Vue.prototype.$http = axios;

// import router from './router'
import { 
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
  Message
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
Vue.use(Badge);

Vue.config.productionTip = false
Vue.prototype.$message = Message;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  // router,
  components: { App },
  template: '<App/>'
})
