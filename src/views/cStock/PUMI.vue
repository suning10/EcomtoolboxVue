<template>

    <div class="container">
      <h>Coming Soon</h>
      <!-- <div>
      <el-input type="textarea" v-model="items" style="width: 250px;"
              placeholder="Please Copy Items(SKU)" 
              rows="20"
              />
    </div>
    <div>
      <el-input type="textarea" v-model="pumiQty" style="width: 250px;"
              placeholder="Please Copy Qty" 
              rows="20"
              />
    </div>
    <div>
      <el-input type="textarea" v-model="itemQty" style="width: 250px;"
              placeholder="Please Copy Qty" 
              rows="20"
              />
    </div>
    <div>
      <pre>{{ itemQty }}</pre>
    </div> -->
    <!-- <div class="box">    
      <el-input type="textarea" 
      v-model="rawInput"
      placeholder="Paste Excel rows here"
      rows="20"
      
      />
    <br>
      <el-button type = "primary" @click="parseExcelData">Parse</el-button>
      <el-button type="primary" @click="upload">Submit</el-button>
    </div>

    <el-table :data="tableData" border max-height="500" class="box">
      <el-table-column label="Key">
        <template slot-scope="scope">
          <el-input v-model="scope.row.key" placeholder="Key" />
        </template>
      </el-table-column>

      <el-table-column label="Value">
        <template slot-scope="scope">
          <el-input v-model="scope.row.value" placeholder="Value" />
        </template>
      </el-table-column>

      <el-table-column label="Actions" width="100">
        <template slot-scope="scope">
          <el-button type="danger" size="mini" @click="removeRow(scope.$index)">
            Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table> -->
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="Current PUMI" name="1"></el-tab-pane>
    <el-tab-pane label="Add new PUMI" name="2">
        <parseExcel             
            actionUrl=""
            redirectUrl = "/cStock/summary"
            :api = "this.api"
            keyName="sku"
            valueName="pumiQty"></parseExcel>
      </el-tab-pane>

    </el-tabs>


    </div>



    <!-- <el-button type="primary" @click="exportToCSV">ExportToCSV</el-button>
    <el-button type="primary" @click="exportToXLSX">ExportToXLSX</el-button> -->



   


</template>
  


<script lang="ts">
import parseExcel from "@/components/ParseExcel/index.vue"
import { Vue,Component} from 'vue-property-decorator'
import * as XLSX from 'xlsx'
import {saveAs} from 'file-saver'

@Component({
  name: 'CStockPUMI',
  components: {
    parseExcel
  }
})
export default class extends Vue{

  loader = false
  items = []
  pumiQty = []
  tableData = [];
  page = 1;
  pageSize = 20;
  totalRaw = 0
  totalSummary = 0
  activeName = "1"

  //excel
  rawInput: string = ""; // pasted text from Excel
  keys: string[] = [];
  values: string[] = [];

  api = ""





  created(){
    /*
      Todo: add logic deterimine start and end
    */
    //this.populateData()
    
    
  }
    private handleClick(tab){
        
    }


  //   private populateData(){
  //       this.loader = true
  //   try{
  //       cStockRaw().then((res) => {
  //           if(res.data.code === 1){
  //               this.rowDataRaw  = res.data.data
  //               this.totalRaw = this.rowDataRaw.length
  //               this.loader = false
  //               }
  //           else{
  //               this.$msgbox.alert("Server Error When Fetching Data")
  //           }
  //       }).catch(error =>{
  //           this.$msgbox.alert(error)
  //       }) ;
  //       }
  //       catch{
  //           this.$msgbox.alert("Server Error When Fetching Data")
  //       }
    
  //   try{
  //       cStockSummary().then((res) => {
  //           if(res.data.code === 1){
  //               this.rowData = res.data.data
  //               this.totalSummary = this.rowData.length
  //               }
  //           else{
  //               this.$msgbox.alert("Server Error When Fetching Data")
  //           }
  //       }).catch(error =>{
  //           this.$msgbox.alert(error)
  //       }) ;
  //       }
  //       catch{
  //           this.$msgbox.alert("Server Error When Fetching Data")
  //       }
  // }

  //   get currentChange1(){
  //   const start = this.pageSize * (this.page - 1);
  //   const end = start + this.pageSize;
  //   return this.rowData.slice(start,end);
  //   } 

  //   get currentChange2(){
  //       const start = this.pageSize * (this.page - 1);
  //       const end = start + this.pageSize;
  //       return this.rowDataRaw.slice(start,end);
  //   } 



  /*
  private exportToCSV() {
    var data = []
    if(this.activeName == '1'){
        data = this.rowData
      }
      if(this.activeName == '2'){
        data = this.rowDataRaw
      }
  const csvContent = this.convertToCSV(data);
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


    var data = []
    if(this.activeName == '1'){
        data = this.rowData
      }
      if(this.activeName == '2'){
        data = this.rowDataRaw
      }
    const worksheet = XLSX.utils.json_to_sheet(data)
          // Create a new workbook and append the worksheet
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')

    // Write the workbook to binary array
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })

    // Create a Blob and trigger download
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' })
    saveAs(blob, 'export.xlsx')

  }
*/
  
}
</script>

