<template>

  <div class="addBrand-container">
      <h2 style="text-align: center; margin-bottom: 10px;">FedEx Tracking with Scans</h2>
        <div class="container">
            <el-form ref="form"  label-width="240px" v-if="!displayResult">
    
              <el-form-item label = "Need Scans?">
                <el-radio v-model="radio" label="1">Latest</el-radio>
                <el-radio v-model="radio" label="2">Scans</el-radio>         
              </el-form-item>  
  
              <el-form-item label="FedEx Tracking Numbers" >
                <el-input type="textarea" v-model="trackingIds" 
                placeholder="Please Enter FedEx Tracking Number Here, One in a Line " 
                rows="30"
                >
                </el-input>
              </el-form-item>
              <el-form-item>
                  <el-button type="primary" @click="fedexTrackingSearch">Search</el-button>
              </el-form-item>
  
              <div class="loader" v-if="loader"></div>
  
            </el-form>
            <div v-else>
  
              <el-table 
              :data="currentChange"
              border
              
              >
                <el-table-column
                  prop="trackingId"
                  label="trackingId"
                  min-width="150px">
                </el-table-column>
                <el-table-column
                  prop="statusdetailTs"
                  label="statusdetailTs"
                  min-width="150px">
                </el-table-column>
                <el-table-column
                  prop="statusdetailDescription"
                  label="status"
                  min-width="150px">
                </el-table-column>
                <el-table-column
                  prop="serviceType"
                  label="serviceType"
                  min-width="150px">
                </el-table-column>
                <el-table-column
                  prop="eventTs"
                  label="eventTs"
                  min-width="150px">
                </el-table-column>
                <el-table-column
                  prop="eventsDescription"
                  label="Description"
                  min-width="150px">
                </el-table-column>

                <el-table-column
                  prop="statusCity"
                  label="statusCity"
                  :min-width="80">

                </el-table-column>
                <el-table-column
                  prop="shipmentDelayCity"
                  label="shipmentDelayCity"
                  min-width="150px">
                </el-table-column>
                <el-table-column
                  prop="shipmentException"
                  label="shipmentException"
                  min-width="150px">
                </el-table-column>
                <el-table-column
                  prop="exceptionDescription"
                  label="exceptionDescription"
                  min-width="150px">
                </el-table-column>
                <el-table-column
                  prop="returnTrackingNumberNew"
                  label="returnTrackingNumberNew"
                  min-width="150px">
                </el-table-column>
                <el-table-column
                  prop="isActive"
                  label="isActive">
                </el-table-column>

              </el-table>
    
              <el-pagination 
                style="text-align: right;"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="page"
                :page-sizes="[10, 50, 100, 1000]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination >
    
              <el-button type="primary" @click="exportToCSV">ExportToCSV</el-button>
              <el-button type="primary" @click="goBack(false)">Back</el-button>
              <el-button type="primary" @click="goBack(true)">Clear and Back</el-button>
    
            </div>
    
    
    
        </div>
    
    
    </div>
  </template>
  
  <script lang="ts">
  import { Vue,Component} from 'vue-property-decorator'
  import { fedexTracking } from '@/api/vertica';
  @Component({
    name: 'FedExTracking',
  })
  export default class extends Vue{
  
  private trackingIds = '' ;
  
  //pagination settings
  private page = 1;
  private pageSize = 20;
  private total = 0;
  private currentData = [];
  private selectedDate = '';
  
  
  //control the spin 
  private loader = false;
  
  
  
  
  get currentChange(){
  const start = this.pageSize * (this.page - 1);
  const end = start + this.pageSize;
  return this.tableData.slice(start,end);
  } 
  
  private handleSizeChange(size:number){
  this.pageSize = size;
  this.page = 1;
  }
  
  private handleCurrentChange(page:number){
  this.page = page
  }
  
  private emptyRDO = true;
  private radio = "1";
  private displayResult = false;
  
  
  private tableData = [];
  
  
  
  private fedexTrackingSearch(){    
  
    this.loader = true
  
    if(this.trackingIds.length > 1){
    const data = this.trackingIds.split('\n').filter(
        item => item.trim().length > 0
      );
    
      if(data.length > 1000){this.$message.error("For Better Performance, please have number of trackings less than 1000");return}
        try{  
        const d = Array.from(new Set(data))
        const payload = {'trackingId':d,'isActive':this.radio};
        fedexTracking(payload).then((res) =>{
        if(res.data.code === 1){
          console.log(res.data);
          this.tableData = res.data.data
          this.total = this.tableData.length;
          this.loader = false;
          this.displayResult = !this.displayResult;
        }
        else{
          this.$message.error("No Records Can Be Found")
          this.loader = false
        }
        })}catch(error){this.$message.error(error);console.log(error)}
      
    } 
      
  
    else{
      this.loader = false
      this.$message.error('Please Enter Tracking Number')
    }
  
  }
  
  
  private exportToCSV() {
  const csvContent = this.convertToCSV(this.tableData);
  const blob = new Blob([csvContent], { type: 'text/csv' });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.download = 'data.csv';
  link.click();
  }
  private convertToCSV(data) {
  const header = Object.keys(data[0]).join(',');
  const rows = data.map(row => {
  return Object.values(row).map(value => {
  // If the value contains a comma, enclose it in double quotes
  if (typeof value === 'string' && value.includes(',')) {
    return `"${value}"`;
  } else {
    return value;
  }
  }).join(',');
  });
  return header + '\n' + rows.join('\n');
  }
  
  private goBack(clean:boolean){
  if(clean){
  this.trackingIds = ''
  }
  this.displayResult = !this.displayResult;
  }

  }


  </script>
  
  <style lang="scss" scoped>
  .addBrand {
    &-container {
      margin: 30px;
      margin-top: 30px;
      .HeadLable {
        background-color: transparent;
        margin-bottom: 0px;
        padding-left: 0px;
      }
      .container {
        position: relative;
        z-index: 1;
        background: #fff;
        padding: 30px;
        border-radius: 4px;
        // min-height: 500px;
        .subBox {
          padding-top: 30px;
          text-align: center;
          border-top: solid 1px $gray-5;
        }
      }
      .idNumber {
        margin-bottom: 39px;
      }
  
      .el-form-item {
        margin-bottom: 29px;
      }
  
      .el-textarea{
        width: 50%;
      }
      .el-input {
        width: 100%;
      }
      .el-button{
          text-align: center;
      }
      .el-table .cell {
      white-space: nowrap;
      width: fit-content;
      }
      .loader {
      transform: translate(-50%, -50%);
        border: 10px solid #f3f3f3; /* Light grey */
        border-top: 8px solid #3498db; /* Blue */
        border-radius: 50%;
        width: 100px;
        height: 100px;
        animation: spin 2s linear infinite;
    }

  
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    }
  }
  </style>