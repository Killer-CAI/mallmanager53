<template>

<el-card > 
    <my-bread level1="权限管理" level2="角色列表"></my-bread>
    <el-row class="addrolebtn">
        <el-col>    
    <el-button type="info">添加角色</el-button>
        </el-col>
    </el-row>
     <el-table
      height="500"
      :data="rolelist"
      style="width: 100%">
       <el-table-column type="expand">
           <template slot-scope="scope">
           <el-row v-for="(item1,i)  in scope.row.children " :key="i">
               <el-col :span="4">
                   <el-tag @close="deleteRight(scope.row,item1.id)" closable>{{item1.authName}}</el-tag>
                   <i class="el-icon-arrow-right"></i>
               </el-col>
                <el-col :span="20">
                    <el-row v-for="(item2,i) in item1.children" :key="i">
                        <el-col :span="4">
                            <el-tag @close="deleteRight(scope.row,item2.id)" closable type="success">{{item2.authName}}</el-tag>
                            <i class="el-icon-arrow-right"></i>
                        </el-col>
                        <el-col :span="20">
                            <el-tag type="warning" @close="deleteRight(scope.row,item3.id)" closable v-for="(item3,i) in item2.children" :key="i">{{item3.authName}}</el-tag>
                        </el-col>
                    </el-row>
                    
                </el-col>
                
           </el-row>
           <span v-if="scope.row.children.length===0">未分配权限</span>
           </template>
       </el-table-column>
      <el-table-column
        type ="index"
        label="#"
        width="100">
      </el-table-column>
      <el-table-column
        prop="roleName"
        label="角色名称"
        width="200">
      </el-table-column>
      <el-table-column
        prop="roleDesc"
        label="角色描述"
        width="200">
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
                      @click="showSetRightDia(scope.row)"></el-button>
           <el-button size="mini"  
                      :plain="true" 
                      type="danger"  
                      icon="el-icon-delete" 
                      circle 
                      @click="showDeleUserMsgBox(scope.row.id)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="修改权限" :visible.sync="dialogFormVisibleRight">
        <!-- :default-expanded-keys="[2, 3]"
          -->
          <!-- node-key='treelist.id'-->
        <el-tree
        ref="tree"
        :data="treelist"
         show-checkbox
        
        node-key="id" 
        :default-expanded-keys="arrexpand"
        :default-checked-keys="arrcheck"
         :props="defaultProps">
        </el-tree>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisibleRight = false">取 消</el-button>
    <el-button type="primary" @click="setRoleRight()">确 定</el-button>
  </div>
</el-dialog>
   
</el-card>


</template>
<script>
export default {
    created(){
       this.getRolelist()
       
    },
    methods:{
        //修改权限-发送请求
        async setRoleRight(){
            let arr1 = this.$refs.tree.getCheckedKeys()
            let arr2 = this.$refs.tree.getHalfCheckedKeys()
            console.log("arr1----")
            console.log(arr1)
            console.log("arr2----")
            console.log(arr2)
            let arr = [...arr1,...arr2]
            console.log("arr----")
            console.log(arr)
            //roles/:roleId/rights
            const res = await  this.$http.post(`roles/${this.currRoleId}/rights`,{rids:arr.join(',')})
            console.log(res)
            //更新视图
            this.getRolelist()
            this.dialogFormVisibleRight = false
        },
        async showSetRightDia(role){
            this.currRoleId=role.id
            //获取树形结构权限数据
            const res = await this.$http.get(`rights/tree`)
            //console.log("tree")
            //console.log(res)
            this.treelist = res.data.data

            var arrtemp1 = []
            this.treelist.forEach(item1 => {
                arrtemp1.push(item1.id)
                item1.children.forEach(item2 =>{
                    arrtemp1.push(item2.id)
                    item2.children.forEach(item3 =>{
                        arrtemp1.push(item3.id)
                    })
                })
            });
            this.arrexpand = arrtemp1
            //console.log(this.arrexpand)


            //获取当前角色权限id
            let arrtemp2 =[]
                role.children.forEach(item1 => {
                    //arrtemp2.push(item1.id)
                    item1.children.forEach(item2 => {
                        //arrtemp2.push(item2.id)
                        item2.children.forEach(item3 => {
                            arrtemp2.push(item3.id)
                        })
                    })
                });
                    //console.log(arrtemp2)
                    this.arrcheck= arrtemp2
            this.dialogFormVisibleRight = true 
        },
        async deleteRight(role,rightId){
            const res = await this.$http.delete(`roles/${role.id}/rights/${rightId}`)
            console.log(res)
            role.children = res.data.data
            //this.getRolelist()
        },
        async getRolelist(){
            const res = await this.$http.get(`roles`)
            console.log(res)
            this.rolelist = res.data.data
        }
    },
    data(){
        return{
            currRoleId:-1,
            //树形结构数据f
            arrcheck:[],
            arrexpand:[],
            treelist:[],
            defaultProps:{
                label:'authName',
                children:'children'
            },
            rolelist:[],
            dialogFormVisibleRight:false,

        }
    }
}
</script>
    
<style>
.addrolebtn{
    margin-top: 20px
}
</style>