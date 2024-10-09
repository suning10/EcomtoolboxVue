<template>

    <div class="addBrand-container">
      <h2 style="text-align: center; margin-bottom: 10px;">Origin Scan FedEx</h2>
        <div class="container">
            <el-form ref="form" :model="ruleform " label-width="240px" v-if="!displayResult">
              <el-form-item label = "Please Choose Date Range">

                <el-date-picker       
                  v-model="selectedDate"
                  type="daterange"
                  range-separator="To"
                  unlink-panels
                  start-placeholder="Start date"
                  end-placeholder="End date">
                </el-date-picker>
                <br>
                <p> To choose a single day, click on that date twice. Otherwise, select a range</p>
              </el-form-item>


    
              <el-form-item>
                  <el-button type="primary" :loading = loader @click="upsSearch">Search</el-button>
              </el-form-item>
  
              
    
            </el-form>
            <div v-else>
              <el-table 
              :data="currentChange"
              border
              style="width: 100%">
                <el-table-column
                  prop="tracking"
                  label="tracking"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="poId"
                  label="poId"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="physicalFulfillerId"
                  label="Fulfiller"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="edd"
                  label="EDD"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="shipScanDate"
                  label="shipScanDate"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="originScan"
                  label="originScan"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="originScanHour"
                  label="originScanHour"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="outForDeliveryScan"
                  label="outForDeliveryTime"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="deliveredTs"
                  label="delivered Time"
                  width="180">
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
    
              <el-button type="primary" @click="exportToCSV" >ExportToCSV</el-button>
              <el-button type="primary" @click="goBack(false)">Back</el-button>
              <el-button type="primary" @click="goBack(true)">Clear and Back</el-button>
    
            </div>
    
    
    
        </div>
    
    
    </div>
    </template>

<script lang="ts">

import { verticaApiFactory } from '@/api/verticaFactory';
import { Vue,Component} from 'vue-property-decorator'
@Component({
  name: 'OriginScanFedEx',
})
export default class extends Vue{
  private ruleform = {

  }

//pagination settings
private page = 1;
private pageSize = 5;
private total = 0;
private currentData = [];
private selectedDate = '';

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
private byDelivery = true;
private displayResult = false;


private tableData = [];


private upsSearch(){
    this.loader = true;
    const start = new Date(this.selectedDate[0]).toISOString().slice(0,10);
    let end = new Date(this.selectedDate[1]).toISOString().slice(0,10);
    const diff = new Date(this.selectedDate[1]).getDate() - new Date(this.selectedDate[0]).getDate();

    let endDate:Date = new Date(this.selectedDate[1])
    endDate.setDate(new Date(this.selectedDate[1]).getDate() + 1);
    end = endDate.toISOString().slice(0,10);
    
    if(diff > 15){
        this.loader = false
        this.$message.error("for better performance, please choose date range less than 15 days");
    }
    else{
        //todo: add summary flag and ship or delievery
        let verticaMethod = verticaApiFactory("originScanUPS");

        
        verticaMethod(start,end).then((res) => {
            if(res.data.code === 1){
                this.tableData = res.data.data;
        
                this.total = this.tableData.length;
        
                this.displayResult = !this.displayResult;

                }
            else{
                this.loader = false
                this.$message.warning("no result found")
            }
        }) ;
        }

    this.loader = false

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
this.selectedDate = ''
}
this.displayResult = !this.displayResult;
this.loader = false;
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