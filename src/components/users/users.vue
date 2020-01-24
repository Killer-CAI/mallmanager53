<template>
    <el-card class="box-card">
        <!-- 面包屑-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row class="searchRow">
        <el-col>
                <el-input placeholder="请输入内容" v-model="query" class="inputSearch">
    
                <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
         <el-button type="success" >添加用户</el-button>
        </el-col>
    </el-row>
    <el-table
      :data="userList"
      style="width: 100%">
      <el-table-column
        type ="index"
        label="#"
        width="60">
      </el-table-column>
      <el-table-column
        prop="username"
        label="姓名"
        width="80">
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱">
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="电话">
      </el-table-column>
<!-- {{create_time | fmtdate}} -->
      <el-table-column
        
        label="创建时间">
        <template slot-scope="scope">
         {{scope.create_time | fmtdate}}
        </template>
      </el-table-column>

      <!-- <el-table-column
         prop="create_time"
        label="创建时间">
        
        {{create_time | fmtdate}}
        
        
      </el-table-column> -->

  // Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjU2NSwicmlkIjowLCJpYXQiOjE1Nzk3ODAzNDQsImV4cCI6MTU3OTg2Njc0NH0.evIXfK7awqaFe5EusIfL1GdKA1CSKm-FzLcZnPCyFeE

      <el-table-column
        
        label="用户状态">
        <template slot-scope="scope">

          <el-switch

              v-model="scope.row.mg_state"
              active-color="#13ce66"
              inactive-color="#ff4949">

          </el-switch>

        </template>
      </el-table-column>
      <el-table-column
        
        label="操作">
        <template slot-scope="scope">
           <el-button size="mini" plain="false" type="primary" icon="el-icon-edit" circle></el-button>
           <el-button size="mini" plain="false" type="success" icon="el-icon-check" circle></el-button>
           <el-button size="mini" plain="false" type="danger" icon="el-icon-delete" circle></el-button>
        </template>
      </el-table-column>
    </el-table>
    </el-card>
</template>

<script>
export default {
    data(){
        return{
            query:'',
            //数据
            userList:[],
            //分页相关
            total:-1,
            pagenum:1,
            pagesize:2,
        }
        
    },
    methods:{
        async getUserList(){
            //设置请求头
            const AUTH_TOKEN = localStorage.getItem('token');
            this.$http.defaults.headers.common['Authorization'] = AUTH_TOKEN;
            
            const res = await this.$http.get(`users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`)
            console.log(res)
            const {meta:{status,msg},data:{users,total}} = res.data
            if(status === 200){
              //给表格数据赋值
              this.userList = users
              //给total赋值
              this.total = total
              //提示
              this.$message.success(msg)
            }
            else{
              this.$message.warning(msg)
            }
        }

    },
    created(){
        this.getUserList()
    },
}
</script>

<style>
.box-card{
    height: 100%;
}
.inputSearch{
    width: 300px;
}
.searchRow{
    margin-top: 20px;
}
</style>