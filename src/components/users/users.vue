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
                <el-input @clear="loadUserList()" clearable placeholder="请输入内容" v-model="query" class="inputSearch">
    
                <el-button @click="searchUser()" slot="append" icon="el-icon-search"></el-button>
                </el-input>
         <el-button @click="showAddUserDia()" type="success" >添加用户</el-button>
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
         {{scope.row.create_time | fmtdate}}
        </template>
      </el-table-column>

      <!-- <el-table-column
         prop="create_time"
        label="创建时间">
        
        {{create_time | fmtdate}}
        
        
      </el-table-column> -->

  <!-- // Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjU2NSwicmlkIjowLCJpYXQiOjE1Nzk3ODAzNDQsImV4cCI6MTU3OTg2Njc0NH0.evIXfK7awqaFe5EusIfL1GdKA1CSKm-FzLcZnPCyFeE -->

      <el-table-column
        
        label="用户状态">
        <template slot-scope="scope">

          <el-switch
              @change="changeMgstate(scope.row)"
              v-model="scope.row.mg_state"
              active-color="#13ce66"
              inactive-color="#ff4949">

          </el-switch>

        </template>
      </el-table-column>


      <el-table-column label="操作">
        <template slot-scope="scope">
           <el-button size="mini"  
                      :plain="true" 
                      type="primary" 
                      icon="el-icon-edit" 
                      circle
                      @click="showEditUserDia(scope.row)"></el-button>
           <el-button size="mini"  
                      :plain="true" 
                      ype="success" 
                      icon="el-icon-check" 
                      circle
                      @click="showSetUserRoleDia(scope.row)"></el-button>
           <el-button size="mini"  
                      :plain="true" 
                      type="danger"  
                      icon="el-icon-delete" 
                      circle 
                      @click="showDeleUserMsgBox(scope.row.id)"></el-button>
        </template>
      </el-table-column>
    </el-table>


    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[2, 4, 6, 8]"
      :page-size="2"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>



    <el-dialog title="添加用户" :visible.sync="dialogFormVisibleAdd">
     <el-form :model="form">
      <el-form-item label="用户名" label-width="100px">
      <el-input v-model="form.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" label-width="100px">
      <el-input v-model="form.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" label-width="100px">
      <el-input v-model="form.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="电话" label-width="100px">
      <el-input v-model="form.mobile" autocomplete="off"></el-input>
      </el-form-item>
    
    
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
    <el-button type="primary" @click="addUser()">确 定</el-button>
  </div>
</el-dialog>


    <el-dialog title="编辑用户" :visible.sync="dialogFormVisibleEdit">
     <el-form :model="form">
      <el-form-item  label="用户名" label-width="100px">
      <el-input disabled v-model="form.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" label-width="100px">
      <el-input v-model="form.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="电话" label-width="100px">
      <el-input v-model="form.mobile" autocomplete="off"></el-input>
      </el-form-item>
    
    
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
    <el-button type="primary" @click="editUser()">确 定</el-button>
  </div>
</el-dialog>

   <el-dialog title="分配角色" :visible.sync="dialogFormVisibleRole">
     <el-form :model="form">
      <el-form-item  label="用户名" label-width="100px">
      {{form.username}}
      </el-form-item>
      <el-form-item  label="角色" label-width="100px">
      <el-select v-model="currRoleId" >
          <el-option disabled label="请选择" :value="-1"></el-option>
          <el-option label="超级管理员" :value="0"></el-option>
          <el-option 
            v-for="item  in this.roles"
            :key="item.id"
            :label="item.roleName"
            :value="item.id"
            :disabled="item.disabled">
           </el-option>
      </el-select>
      </el-form-item>
  

  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisibleRole = false">取 消</el-button>
    <el-button type="primary" @click="setUserRole()">确 定</el-button>
  </div>
</el-dialog>
    </el-card>
</template>

<script>
import moment from 'moment'
export default {
    data(){
        return{
            currUserId:-1,
            roles:[{
              id:'',
              roleName:"",
              roleDesc:"",
              children:[]
            }],
            currRoleId:'-1',
            role:[{
              id: '',
              rid:'',
              mobile: "",
              email:""
            }],
            query:'',
            //数据
            userList:[],
            //分页相关
            total:-1,
            pagenum:1,
            pagesize:2,
            dialogFormVisibleAdd:false,
            dialogFormVisibleEdit:false,
            dialogFormVisibleRole:false,
            form:{
              username:"",
              password:"",
              email:"",
              mobile:"",
              id:''
            }
        }
        
    },
    methods:{
      async editUser(){
        const res = await this.$http.put(`users/${this.form.id}`,this.form)
        console.log(res)
        this.dialogFormVisibleEdit = false
      },
      async setUserRole(){
          const res = await this.$http.put(`users/${this.currUserId}/role`,{
          rid:this.currRoleId
        })
        console.log(res)
        this.dialogFormVisibleRole = false
      },
      // async getRoleName(){
      //     const res = await this.$http.get(`roles`)
      //     this.roles = res.data.data
      // },
      // async getUserRole(userId){
      //     const res = await this.$http.get(`users/${userId}`)
      //     this.currRoleId = res.data.data.rid
      //     this.getRoleName()
      // },
      async  showSetUserRoleDia(user){
        //this.getRoleName()
         this.currUserId =  user.id
         const res = await this.$http.get(`roles`)
         this.roles = res.data.data

         //this.getUserRole(user.id)
         const res1 = await this.$http.get(`users/${user.id}`)
         this.currRoleId = res1.data.data.rid

         this.form = user;
         this.dialogFormVisibleRole = true;
      },
      async changeMgstate(user){
        //发送请求
        const res = await this.$http.put(`users/${user.id}/state/${user.mg_state}`)
        console.log("--改变状态")
        console.log(res)
      },
      showEditUserDia(user){
        this.form = user
        this.dialogFormVisibleEdit = true;  
      },
       showDeleUserMsgBox(userId){
        this.$confirm('删除用户?', '提示', {  
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          //发送删除请求
          //1 data中找userId  x
          //2 调用某个方法时触发 以参数形式传进来
          const res = await this.$http.delete(`users/${userId}`)
          //console.log(res)
          //console.log("!!!!22222!!!!")
          //console.log(res.data.meta.status)
          if(res.data.meta.status === 200) {
            this.pagenum = 1
            this.getUserList() 
            console.log("success") 
            this.$message({
            type: 'success',
            message: "ffff"
            })
            console.log("success2");

          }
          
        }).catch(() => {
          //  const hi = res.data.meta.status
          //console.log(hi)
          //console.log("success3")
          //consle.log(res.data.meta.status)
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
      test(){
        var o =  {  //对象直接量
        o1 : {  //子对象直接量
          o2 : {  //孙子对象直接量
            name : 1  //孙子对象直接量的属性
          }
        }
      }
        
        console.log(o.hasOwnProperty("o1")); //返回true，说明o1是o的自有属性
        console.log(o.hasOwnProperty("o2"));  //返回false，说明o2不是o的自有属性
        console.log(o.o1.hasOwnProperty("o2"));  //返回true，说明o2是o1的自有属性
        console.log(o.o1.hasOwnProperty("name"));  //返回false，说明name不是o1的自有属性
        console.log(o.o1.o2.hasOwnProperty("name"));  //返回true，说明name是o2的自有属性
      },
      async addUser(){
          //2 关闭对话框
          this.dialogFormVisibleAdd = false
        const res = await this.$http.post(`users`,this.form)
        console.log(res)
        const {meta:{status,msg},data} = res.data
        if(status === 201){
          //1 提示成功
          this.$message.success(msg)
        
          //3 更新视图
          this.getUserList()
          //4 清空文本框
          this.form = {}
        }
        else{
          this.$message.warning(msg)
        }
      },
      showAddUserDia(){
        this.form = {}
        this.dialogFormVisibleAdd = true
      },
      loadUserList(){
          this.getUserList()
      },
      searchUser(){
        this.getUserList()
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pagesize = val;
        this.pagenum =1;
        this.getUserList();
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.pagenum = val;
        this.getUserList();
      },

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
              //this.$message.success(msg)
              
            }
            else{
              //this.$message.warning(msg)
            }
            //console.log(`moment(1571047423).format('YYYY-MM-DD')`)
            var i = moment(12486720211).format('YYYY-MM-DD')
            //1571047423
            var a = moment().format('YYYY-MM-DD')
            //console.log("----")
            //console.log(i)

            //console.log(a)
        }

    },
    created(){
        this.getUserList()
        //console.log("!!!!!!!!!!!")
        //this.test()
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