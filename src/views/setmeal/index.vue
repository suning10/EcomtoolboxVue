<template>
  <div class="dashboard-container">
    <div class="container">
      <div class="tableBar">
        <label style="margin-right: 10px;">Meal Name</label>
        <el-input style="width:12%" clearable />
        <label style="margin-right: 10px; margin-left: 15px">Category</label>
        <el-select v-model="categoryId" placeholder="please choose" clearable>
          <el-option 
            v-for="item in categoryId"
            :key = "item.id"
            :label = "item.name"
            :value = "item.z-index">
          </el-option>
        </el-select>
        <label style="margin-right: 10px;margin-left: 15px">Status</label>
        <el-select v-model="status" placeholder="please choose" clearable>
          <el-option 
            v-for="item in statusArr"
            :key = "item.value"
            :label = "item.label"
            :value = "item.value">
          </el-option>
        </el-select>
        <el-button type="primary" style="margin-left: 20px;" @click="pageQuery">Search</el-button>
        <div style = "float:right">
          <el-button type = "danger">batch delete</el-button>
          <el-button type = "info">+ create new</el-button>
        </div>
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

    </div>
  </div>
</template>

<script lang="ts">
import { getCategoryByType } from '@/api/category';

export default {

  created() {
    getCategoryByType({type:2}).then(res=>{
      if(res.data.code === 1){
        this.categoryId = res.data.data
      }
    })
  },

  data(){
    return{
      status:'',
      categoryId:'',
      statusArr:[{
        value:'1',
        label:'active'
      },{
        value:'0',
        label:'inactive'
      }]
    }
  },

  methods:{
    pageQuery(){

    }
  }
  
}
</script>
<style lang="scss">
.el-table-column--selection .cell {
  padding-left: 10px;
}
</style>
<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;

    .container {
      background: #fff;
      position: relative;
      z-index: 1;
      padding: 30px 28px;
      border-radius: 4px;

      .tableBar {
        margin-bottom: 20px;
        .tableLab {
          float: right;
          span {
            cursor: pointer;
            display: inline-block;
            font-size: 14px;
            padding: 0 20px;
            color: $gray-2;
          }
        }
      }

      .tableBox {
        width: 100%;
        border: 1px solid $gray-5;
        border-bottom: 0;
      }

      .pageList {
        text-align: center;
        margin-top: 30px;
      }
      //查询黑色按钮样式
      .normal-btn {
        background: #333333;
        color: white;
        margin-left: 20px;
      }
    }
  }
}
</style>
