import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/login.vue'
import Home from '@/components/home/home.vue'
import Users from '@/components/users/Users.vue'
import Right from '@/components/rights/right.vue'
import Role from '@/components/rights/role.vue'
import Farm from '@/plugins/farm.vue'
import {Message} from 'element-ui'
Vue.use(Router)

 const router = new Router({
  routes: [
    {
      name:'login',
      path: '/login',
      component:Login

    },
    {
      name:'home',
      path:'/',
      component:Home,
      children:[
        {
          name:'users',
          path:'/users',
          component:Users
        },
        {
          name:'right',
          path:'/rights',
          component:Right
        },
        {
          name:'roles',
          path:'/roles',
          component:Role
        },
        {
          name:'farm',
          path:'/farm',
          component:Farm
        },
      ]
    }
  ]
})

router.beforeEach((to,from,next)=>{
  //to from next
  //console.log("@@@@@@@@")
  //console.log(to,from)
  //如果要去的是登录-> next()
  //如果要去的不是登录 判断token 如果token没有-> login
  if(to.path==='/login'){
    next()
  }
  else{
    const token = localStorage.getItem('token')
    if(!token){
      Message.warning('回到登录页')
      router.push({name:'login'
    })
     return
  }
  next()
  }
})  

export default router