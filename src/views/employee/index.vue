<template>
  <div class="dashboard-container">
    <div class="container">
      <div class="tableBar">

        <label style="margin-right: 5px;">
          name
        </label>
        <el-input class = "tableBar" placeholder="please enter name" style="width: 15%;"/>
        <el-button type="primary" style="margin-left: 25px;" @click="pageQuery">search</el-button>
        <el-button type="primary" style="float:right" @click = "addNewEmployee">Add new Employee</el-button>
      </div>
      <el-table
      :data="records"
      style="width: 100%">
      <el-table-column
        prop="name"
        label="Name">
      </el-table-column>
      <el-table-column
        prop="username"
        label="Username">
      </el-table-column>
      <el-table-column
        prop="phone"
        label="Phone">
      </el-table-column>
      <el-table-column
        prop="status"
        label="Current Status">
        <template slot-scope="scope">
          {{ scope.row.status === 1 ? "Enabled": "Disabled" }}
        </template>
      </el-table-column>
      <el-table-column
        prop="updateTime"
        label="Last Updated Time">
      </el-table-column>
      <el-table-column label="Operation">

        <template slot-scope="scope">
          <el-button type="text" @click="handleEditEmployee(scope.row.id)">Edit</el-button>
          <el-button type="text" @click="handleEnableOrDisable(scope.row)">
            {{ scope.row.status === 0 ? "Enable": "Disable" }}
          </el-button>
        </template>

      </el-table-column>

    </el-table>

    <el-pagination class="pageList"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="page"
      :page-sizes="[10, 25, 100, 1000]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    </div>



  </div>
</template>
<script lang="ts">
import { getEmployeeList, updateEmployeeStatus } from '@/api/employee'

export default  {

  data() {
    return {
      name:'',
      page:1,
      pageSize: 10,
      total :0,
      records: []
    }
  },

  created(){
    this.pageQuery()
  },

  methods: {
    pageQuery(){

      // define query param object
      const params = {name:this.name,page:this.page,pageSize:this.pageSize}

      //send ajax request
      getEmployeeList(params).then(res=> {
        if(res.data.code ===1){
          this.total = res.data.data.total
          this.records = res.data.data.records
        }
      }).catch(err => {this.$message.error("error in the request: " + err.message);
      })
    },

      handleSizeChange(pageSise){
        this.pageSize = pageSise
        this.pageQuery()
      },
      handleCurrentChange(page){
        this.page = page
        this.pageQuery()
      },
      handleEnableOrDisable(currentRow){
        
        //set up warning before enable or disable
        this.$confirm('This will permanently delete the file. Continue?', 'Warning', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          const p = {'status': !currentRow.status ? 1:0,'id' :currentRow.id }
        updateEmployeeStatus(p).then(res =>{
          if(res.data.code === 1) {
            this.$message.success('change success!')
            this.pageQuery()
          }
        })
        })
      },
      addNewEmployee(){
        this.$router.push('/employee/add')
      },

      handleEditEmployee(rid){
        this.$router.push(
          {
            path:'/employee/add' ,
            query:{'id':rid}
          }
        )
      }

  }
}

</script>

<style lang="scss" scoped>
.disabled-text {
  color: #bac0cd !important;
}
</style>
