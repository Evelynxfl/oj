import a from 'axios'
const axios = a.create({
    // baseURL: process.env.BASE_URL, 
   timeout: 60 * 1000, // 请求超时时间,
   headers: { "Content-Type": "application/jsonapplication/x-www-form-urlencoded" },
   withCredentials: true,
   crossDomain: true,
});
axios.interceptors.request.use(config => {
  config.headers.token = window.sessionStorage.getItem('token')
  return config
})
Vue.prototype.$http = axios;
