import Vue from 'vue'
import problem_decs from './problem_decs.vue'
import 'element-ui/lib/theme-chalk/index.css';
import jwtDecode from 'jwt-decode'
import axios from 'axios'
axios.interceptors.request.use(config => {
  config.headers.token = window.sessionStorage.getItem('token')
  return config
})
Vue.prototype.$http = axios;


// import router from './router'
import {
  Dialog, 
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
  Select,
  Option,
  OptionGroup,
  Message,
  Loading,

  
}from 'element-ui'

Vue.use(Dialog);
Vue.use(Pagination);
Vue.use(Table);
Vue.use(TableColumn);
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
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Select);
Vue.use(Option);
Vue.use(OptionGroup);
Vue.use(Loading.directive);

Vue.prototype.$loading = Loading.service;
Vue.prototype.$message = Message;
Vue.prototype.openLoading = function() {
  const loading = this.$loading({           // 声明一个loading对象
    lock: true,                             // 是否锁屏
    text: '正在编译...',                     // 加载动画的文字
    spinner: 'el-icon-loading',             // 引入的loading图标
    background: 'rgba(125, 125, 125, 0.3)',       // 背景颜色
    target: '.container',                    // 需要遮罩的区域
    body: true,                              
  })
  setTimeout(function () {                  // 设定定时器，超时5S后自动关闭遮罩层，避免请求失败时，遮罩层一直存在的问题
    loading.close();                        // 关闭遮罩层
  },5000)
  return loading;
}

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app', 
  // router,
  render:h=>h(problem_decs)
})
