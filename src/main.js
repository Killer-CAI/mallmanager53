// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import MyServerHttp from '@/plugins/http.js'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/reset.css'
import moment from 'moment'
import MyBread from '@/components/cuscom/myBread.vue'
Vue.config.productionTip = false
//use() vue插件的用法
Vue.use(ElementUI)
Vue.use(MyServerHttp)
/* eslint-disable no-new */
  
Vue.filter('fmtdate',(v)=>{
  return moment(v).format('YYYY-MM-DD')
})
Vue.component(MyBread.name,MyBread)

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
