
import axios from 'axios'

const MyHttpServer = {}
MyHttpServer.install =  (Vue)=> {
    axios.defaults.baseURL='http://39.108.193.251:8811/api/private/v1/'
    // 4. 添加实例方法
    axios.interceptors.request.use(function (config) {
      // 在发送请求之前做些什么
      console.log("拦截器被触发")
      console.log(config)

      if(config.url !== 'login'){
        const AUTH_TOKEN = localStorage.getItem('token');
        config.headers['Authorization'] = AUTH_TOKEN;

      }

     
      
      return config;
    }, function (error) {
      // 对请求错误做些什么
      return Promise.reject(error);
    });
  
  // 添加响应拦截器
  axios.interceptors.response.use(function (response) {
      // 对响应数据做点什么
      return response;
    }, function (error) {
      // 对响应错误做点什么
      return Promise.reject(error);
    });


    Vue.prototype.$http = axios
  }
  
  export default MyHttpServer