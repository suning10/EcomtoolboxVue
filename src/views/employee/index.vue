<template>
  <div class="dashboard-container">
    <div class="container">
      <div class="tableBar">

        <label style="margin-right: 5px;">
          name
        </label>
        <el-input class = "tableBar" placeholder="please enter name" style="width: 15%;"/>
        <el-button type="primary" style="margin-left: 25px;" @click="pageQuery">search</el-button>
        <el-button type="primary" style="float:right">Add new Employee</el-button>


      </div>
    </div>

  </div>
</template>
<script lang="ts">
import { getEmployeeList } from '@/api/employee'

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

      const params = {name:this.name,page:this.page,pageSize:this.pageSize}

      //send ajax request
      getEmployeeList(params).then(res=> {
        if(res.data.code ===1){
          this.total = res.data.data.total
          this.records = res.data.data.records
        }
      }).catch(err => {this.$message.error("error in the request: " + err.message);
      })
    }
  }
  
}
</script>

<style lang="scss" scoped>
.disabled-text {
  color: #bac0cd !important;
}
</style>
