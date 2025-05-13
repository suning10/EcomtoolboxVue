<template>

    <div class="addBrand-container">
      <h2 style="text-align: center; margin-bottom: 10px;">Quick Order Search MX Only</h2>
        <div class="container">
            <el-form ref="form" :model="ruleform " label-width="240px" v-if="!displayResult">
    
              <el-form-item label = "Search By">
                <el-select v-model=critiria placeholder="Select" >
                  <el-option
                    label="PO"
                    :value=0>
                  </el-option>
                  <el-option
                    label="Delivery Order"
                    :value=1>
                  </el-option>
                  <el-option
                    label="Tracking Number"
                    :value=2>
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label = "With Details?">
                <el-select v-model=summaryFlag placeholder="Select" >
                  <el-option
                    label="Only EDD"
                    :value=true>
                  </el-option>
                  <el-option
                    label="Detail"
                    :value=false>
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="PO" v-if="critiria == 0">
              <el-input type="textarea" v-model="ids" 
              placeholder="Please Enter PO, One at a line" 
              rows="30"
              >
              </el-input>
            </el-form-item>
            <el-form-item label="Delivery Order" v-else-if="critiria == 1">
              <el-input type="textarea" v-model="ids" 
              placeholder="Please Enter Delivery Order Number, One at a line" 
              rows="30"
              >
              </el-input>
            </el-form-item>
            <el-form-item label="Tracking Numbers" v-else>
              <el-input type="textarea" v-model="ids" 
              placeholder="Please Enter Tracking Numbers, it works for all carriers. One at a line" 
              rows="30"
              >
              </el-input>
            </el-form-item>
              <el-form-item>
                  <el-button type="primary" @click="search" :loading = loader >Search</el-button>
                  <el-button type="primary" @click="clear">Clear</el-button>
              </el-form-item>


  
              <!-- <div class="loader" v-if="loader"></div> -->
    
            </el-form>
            <div v-else>
              <el-table v-if = "!summaryFlag"
              :data="currentChange"
              border
              style="width: 100%">
                <el-table-column
                  prop="poId"
                  label="poId"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="doId"
                  label="DO"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="orderTsEst"
                  label="Order Date"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="shippedSku"
                  label="SKU"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="salesPrice"
                  label="Sales Price"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="listPrice"
                  label="List Price"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="shippingAmt"
                  label="Shipping Cost"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="shippedQty"
                  label="qty"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="physicalFulfillerId"
                  label="Fulfiller"
                  width="180">
                </el-table-column>
                <!-- <el-table-column
                  prop="tracking"
                  label="tracking"
                  width="180">
                </el-table-column> -->
                <el-table-column label="tracking" width="180">
                  <template slot-scope="scope">
                    <a v-if="scope.row.fulfillmentCarrierId == 'ups'" :href = "'https://www.ups.com/track?loc=en_US&tracknum=' + scope.row.tracking + '&requester=ST/trackdetails'" target="_blank" style="color: blue; text-decoration: underline;">
                      {{ scope.row.tracking }}
                    </a>
                    <a v-else-if="scope.row.fulfillmentCarrierId == 'fedex'" :href = "'https://www.fedex.com/fedextrack/?trknbr=' + scope.row.tracking" target="_blank" style="color: blue; text-decoration: underline;">
                      {{ scope.row.tracking }}
                    </a>
                    <a v-else>{{ scope.row.tracking }}</a>
                  </template>

                </el-table-column>
                <el-table-column
                  prop="edd"
                  label="EDD"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="orderEntryDate"
                  label="Entry Date"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="shipScanDate"
                  label="Ship Date"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="deliveredTs"
                  label="Delivered Date"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="cancellationStatus"
                  label="Cancelled Status"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="cancellationReason"
                  label="Cancelled Reason"
                  width="180">
                </el-table-column> 
                <el-table-column
                  prop="lineItemStatus"
                  label="Line Item Status"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="orderStatus"
                  label="Order Status"
                  width="180">
                </el-table-column>           
              </el-table>

              <el-table v-else 
              :data="currentChange"
              border
              style="width: 100%">
              <el-table-column
                  prop="poId"
                  label="poId"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="doId"
                  label="doId"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="tracking"
                  label="tracking"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="edd"
                  label="EDD"
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
    
              <el-button type="primary" @click="exportToCSV">ExportToCSV</el-button>
              <el-button type="primary" @click="exportToXLSX">ExportToXLSX</el-button>
              <el-button type="primary" @click="goBack(false)">Back</el-button>
              <el-button type="primary" @click="goBack(true)">Clear and Back</el-button>
    
            </div>
    
    
    
        </div>
    
    
    </div>
    </template>
  <script lang="ts">
  
  import { eddSearch } from '@/api/vertica';
  import { Vue,Component} from 'vue-property-decorator'
  import * as XLSX from 'xlsx'
  import {saveAs} from 'file-saver'
  @Component({
    name: 'EDD',
  })
  export default class extends Vue{
    private ruleform = {
  
    }
  
  //pagination settings
  private page = 1;
  private pageSize = 20;
  private total = 0;
  private currentData = [];
  private selectedDate = '';
  private ids = ''
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
  private critiria = 0;
  private displayResult = false;
  private tableData = [];
  
  
  
  // private rdoSearch(){
  
  // if(this.ruleform.id.length > 1){
  // const data = this.ruleform.id.split('\n').filter(
  //     item => item.trim().length > 0
  //   )
  //   const d = Array.from(new Set(data))
  // const payload = {'rdo':d};
  // searchByRDO(payload).then((res) =>{
  // if(res.data.code === 1){
  //   console.log(res.data);
  //   this.tableData = res.data.data
  //   this.total = this.tableData.length;
  // }
  // })
  // this.displayResult = !this.displayResult;
  // } 
  
  // else{
  // this.$message.error('Please enter RDO or PO&SKU ')
  // }
  
  // }
  
  // private poSearch(){
  
  // if(this.ruleform.poId.length > 1){
  //   // split by \n and remove blank
  //   const data = this.ruleform.poId.split('\n').filter(
  //     item => item.trim().length > 0
  //   )
  //   const d = Array.from(new Set(data))
  
  //   const payload = {'rdo':d};
  //   searchByPO(payload).then((res) =>{
  //   if(res.data.code === 1){
  //     this.tableData = res.data.data
  //   }
  //   else{
  //     this.$message.warning("no result found")
  //   }
  // })
  //   this.displayResult = !this.displayResult;
  // } 
  
  // else{
  //   this.$message.error('Please enter RDO or PO&SKU ')
  // }
  
  // }

  private clear(){
    this.ids = '';
    this.loader = false
  }
  
  private search(){

    this.loader = true;
    const data = this.ids.split('\n').filter(
      item => item.trim().length > 0
    ).map(element => element.toLowerCase());

    const d = Array.from(new Set(data))

        //summary - EDD only
        //critiria - PO or Tracking
        var payload = {"idList":d,"searchFlag":"PO"}

        if(this.critiria == 1){
          payload.searchFlag = "DO"
        }
        if(this.critiria == 2){
          payload.searchFlag = "TRACKING"
        }
        
        try{
        eddSearch(payload).then((res) => {
          if(res.data.code === 1){
        this.tableData = res.data.data;
        this.total = this.tableData.length;
        this.loader = false;
        this.displayResult = !this.displayResult;
  
          }
        else{
        this.loader = false;
        this.$message.warning("no result found")
          }
        }) ;}catch(error){this.$message.error(error);}
      
  
  

        
      
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


  private exportToXLSX(){

const worksheet = XLSX.utils.json_to_sheet(this.tableData)
      // Create a new workbook and append the worksheet
const workbook = XLSX.utils.book_new()
XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')

// Write the workbook to binary array
const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })

// Create a Blob and trigger download
const blob = new Blob([excelBuffer], { type: 'application/octet-stream' })
saveAs(blob, 'export.xlsx')
  }
  
  private goBack(clean:boolean){
  if(clean){
    this.ids = ''
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