import Vue from 'vue'
import management from './management.vue'
import '../../assets/css/globe.css'
import 'element-ui/lib/theme-chalk/index.css'

import VueRouter from 'vue-router'
import router from './router/index'
Vue.use(VueRouter)

import axios from 'axios'

axios.interceptors.request.use(config => {
  config.headers.token = window.sessionStorage.getItem('token')
  return config
})
Vue.prototype.$http = axios;

import {
  Input,
  Dialog,
  Container,
  Header,
  Aside,
  Main,
  Pagination,
  Table,
  TableColumn,
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
  Tabs,
  TabPane,
  Card,
  Message,
  Form,
  FormItem,
  MessageBox,
} from 'element-ui'

Vue.use(Input);
Vue.use(Dialog);
Vue.use(Container);
Vue.use(Header);
Vue.use(Aside);
Vue.use(Main);
Vue.use(Tooltip);
Vue.use(Pagination);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Button);
Vue.use(Tooltip);
Vue.use(Popover);
Vue.use(Badge);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Card);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Row);
Vue.use(Col);

Vue.prototype.$message = Message;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$confirm = MessageBox.confirm;

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render:h=>h(management)
})