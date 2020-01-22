<template>
    <div class="login-wrap">
<el-form class='login-form' label-position="top" 
    label-width="80px" 
    :model="formData">
    <h2>用户登录</h2>
  <el-form-item label="用户名">
    <el-input v-model="formData.username"></el-input>
  </el-form-item>
  <el-form-item label="密码">
    <el-input v-model="formData.password"></el-input>
  </el-form-item>
 <el-button @click.prevent='handleLogin()' class='login-btn' type="primary">登录</el-button>
</el-form>

    </div>
</template>

<script>
export default {
    data(){
        return {
            formData:{
                username:'',
                password:''
            }
        }
    },
    methods:{
        async handleLogin(){

        const res = await this.$http.post('login',this.formData)
                //console.log(res)
                
                const
                { data,meta:{msg,status}
                } = res.data
                //var msg = meta.msg 
                //var status = meta.status
                //console.log(data)
                //console.log(meta.msg)

            if(status === 200){
                this.$router.push({name:'home'})
                this.$message.success(msg);
            }
            else{
                this.$message.warning(msg);
            }

            
            // this.$http.post('login',this.formData).then(res=>{
            //     //console.log(res)
                
            //     const{ data,meta:{msg,status}
            //     } = res.data
            //     //var msg = meta.msg 
            //     //var status = meta.status
            //     //console.log(data)
            //     //console.log(meta.msg)

            // if(status === 200){
            //     this.$router.push({name:'home'})
            //     this.$message.success(msg);
            // }
            // else{
            //     this.$message.warning(msg);
            // }

            // })
            
            

        }
    }
}
</script>

<style>
.login-wrap{
    height: 100%;
    background-color: #324152;
    /* 弹性盒布局 */
    display: flex;
    justify-content: center;
    align-items: center;
}
.login-wrap .login-form{
    width: 400px;
    background-color:azure;
    border-radius:5px;
    padding: 30px; 
}
.login-wrap .login-btn {
    width: 100%;
}
</style>