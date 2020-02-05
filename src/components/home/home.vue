<template>
  <el-container class="container">
  <el-header class="header">
     <el-row>
  <el-col :span="4">
     <div class="grid-content bg-purple">
     <img src="../../assets/silk.jpg" width="200" height="60" alt="无法显示图片">
     </div>
     </el-col>
  <el-col :span="18" class="middle"><h3>电商管理系统</h3>
  </el-col>
  <el-col :span="2"><div class="grid-content bg-purple">
     <a class="loginout" @click.prevent="handleSignout()" href="#">退出</a>
  </div>
  </el-col>
</el-row>
  </el-header>
  <el-container>
    <el-aside class="aside" width="200px">
       <el-menu :unique-opened="true" :router="true" >

      <el-submenu :index="''+item1.order" v-for="(item1,index) in menus" :key="index">
        <template slot="title"> 
          <i class="el-icon-location"></i>
          <span>{{item1.authName}}</span>
        </template>
          <!-- <template slot="title">分组一</template> -->
         <el-menu-item :index="item2.path"
         v-for="(item2,index) in item1.children" :key="index">
          <i class="el-icon-s-promotion"></i>
          
            <span>{{item2.authName}}</span>
             
          </el-menu-item>
      </el-submenu>

    </el-menu>
    </el-aside>
    <el-main class="main">
       <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
</template>

<script>
export default {
  data(){
    return{
      menus:[]
    }
  },
    beforeCreate(){
      //  const token =  localStorage.getItem('token')
      //  if(!token){
      //     this.$router.push({name :'login'})
      //  }
    },
    created(){
      this.getMenus()
    },
   methods:{
     //获取导航数据
     async getMenus(){
       const res = await this.$http.get(`menus`)
       console.log("导航数据")
       console.log(res)
       this.menus=res.data.data
     },
      handleSignout(){
         //console.log(localStorage.getItem('token'))
         //console.log(!localStorage.getItem('token'))
         localStorage.clear()
         this.$message.success('退出成功')
         this.$router.push({name:'login'})
      }
   }
}
</script>

<style>
.container{
   height: 100%;
}
.header{
   background-color:blanchedalmond
}
.aside{
   background-color:darkseagreen
}
.main{
   background-color:honeydew
}
.middle{
   text-align: center;
}
.loginout{
   line-height: 60px;
   text-decoration-line: none;
}
</style>