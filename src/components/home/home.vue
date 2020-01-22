<template>
  <el-container class="container">
  <el-header class="header">
     <el-row>
  <el-col :span="4">
     <div class="grid-content bg-purple">
     <img src="../../assets/silk.jpg" width="200" height="60" alt="无法显示图片">
     </div>
     </el-col>
  <el-col :span="18" class="middle"><h3>电商后台管理系统</h3>
  </el-col>
  <el-col :span="2"><div class="grid-content bg-purple">
     <a class="loginout" >退出</a>
  </div>
  </el-col>
</el-row>
  </el-header>
  <el-container>
    <el-aside class="aside" width="200px">Aside</el-aside>
    <el-main class="main">Main</el-main>
  </el-container>
</el-container>
</template>

<script>
export default {
    
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