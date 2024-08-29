<template>

<div class="addBrand-container">
    <h2 style="text-align: center; margin-bottom: 10px;">UPS Tracking with Scans</h2>
      <div class="container">
          <el-form ref="form"  label-width="240px" v-if="!displayResult">
  
            <el-form-item label = "Need Scans?">
              <el-radio v-model="radio" label="1">Latest</el-radio>
              <el-radio v-model="radio" label="2">Scans</el-radio>         
            </el-form-item>  

            <el-form-item label="UPS Tracking Numbers" >
              <el-input type="textarea" v-model="trackingIds" 
              placeholder="Please Enter UPS Tracking Number Here, One in a Line " 
              rows="30"
              >
              </el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="upsTrackingSearch">Search</el-button>
            </el-form-item>

            <div class="loader" v-if="loader"></div>

          </el-form>
          <div v-else>

            <el-table 
            :data="currentChange"
            border
            style="width: 100%">
              <el-table-column
                prop="trackingId"
                label="trackingId"
                width="180">
              </el-table-column>
              <el-table-column
                prop="estimatedDelivery"
                label="estimatedDelivery"
                width="180">
              </el-table-column>
              <el-table-column
                prop="eventStatusCode"
                label="eventStatusCode"
                width="180">
              </el-table-column>
              <el-table-column
                prop="eventStatusDescription"
                label="eventStatusDescription">
              </el-table-column>
              <el-table-column
                prop="eventLocationCity"
                label="eventLocationCity"
                width="180">
              </el-table-column>
              <el-table-column
                prop="eventDateTime"
                label="eventDateTime"
                width="180">
              </el-table-column>
              <el-table-column
                prop="shippedTs"
                label="shippedTs"
                width="180">
              </el-table-column>
              <el-table-column
                prop="actualDeliveredTs"
                label="actualDeliveredTs"
                width="180">
              </el-table-column>
              <el-table-column
                prop="originalScanTs"
                label="originalScanTs"
                width="180">
              </el-table-column>
              <el-table-column
                prop="outForDeliveryTs"
                label="outForDeliveryTs"
                width="180">
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
import { upsTracking } from '@/api/vertica';
@Component({
  name: 'UPSTracking',
})
export default class extends Vue{

private trackingIds = '' ;

//pagination settings
private page = 1;
private pageSize = 20;
private total = 0;
private currentData = [];
private selectedDate = '';


private summaryFlag = true;

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



private upsTrackingSearch(){    

  this.loader = true

  if(this.trackingIds.length > 1){
  const data = this.trackingIds.split('\n').filter(
      item => item.trim().length > 0
    );


  try{  
  const d = Array.from(new Set(data))
  const payload = {'trackingId':d,'isActive':this.radio};
  upsTracking(payload).then((res) =>{
  if(res.data.code === 1){
    this.tableData = res.data.data
    this.total = this.tableData.length;
    this.loader = false;
    this.displayResult = !this.displayResult;
  }
  else{
    this.$message.error("No Records Can Be Found")
    this.loader = false
  }
  })}catch(error){this.$message.error(error);}

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