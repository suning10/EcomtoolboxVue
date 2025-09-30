<template>
    <div>

    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="CStock Summary" name="1">
        <el-table 
                :data="currentChange1"
                max-height="500"
                v-loading = loader
                border
                style="width: 100%">
                  <el-table-column 
                    prop="category"
                    label= "Prodcut"
                    width = 180>
                  </el-table-column>
                  <el-table-column 
                    prop="minQty"
                    label= "Qty"
                    width = 180>
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
            :total="totalSummary">
          </el-pagination >
      </el-tab-pane>

      <el-tab-pane label="CStock Raw" name="2">
        <el-table 
                :data="currentChange2"
                max-height="500"
                v-loading = loader
                border
                style="width: 100%">
                  <el-table-column 
                    prop="item"
                    label= "SKU"
                    width = 180>
                  </el-table-column>
                  <el-table-column 
                    prop="minQty"
                    label= "Min Qty"
                    width = 180>
                  </el-table-column>
                  <el-table-column 
                    prop="category"
                    label= "category"
                    width = 100>
                  </el-table-column>
                  <el-table-column 
                    prop="description"
                    label= "description"
                    width = 580>
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
            :total="totalRaw">
          </el-pagination >
      </el-tab-pane>

    </el-tabs>
    <el-button type="primary" @click="exportToCSV">ExportToCSV</el-button>
    <el-button type="primary" @click="exportToXLSX">ExportToXLSX</el-button>
  </div>
</template>
  


<script lang="ts">
import { cStockRaw } from '@/api/cStock';
import { cStockSummary } from '@/api/cStock';
import { Vue,Component} from 'vue-property-decorator'
import * as XLSX from 'xlsx'
import {saveAs} from 'file-saver'

@Component({
  name: 'CStock',
  components: {
  }
})
export default class extends Vue{

  private activeName = "1";
  loader = false
  rowData = []
  rowDataRaw = []
  page = 1;
  pageSize = 20;
  totalRaw = 0
  totalSummary = 0



  created(){
    /*
      Todo: add logic deterimine start and end
    */
    this.populateData()
    
    
  }
    private handleClick(tab){
        
    }

    private populateData(){
        this.loader = true
    try{
        cStockRaw().then((res) => {
            if(res.data.code === 1){
                this.rowDataRaw  = res.data.data
                this.totalRaw = this.rowDataRaw.length
                this.loader = false
                }
            else{
                this.$msgbox.alert("Server Error When Fetching Data")
            }
        }).catch(error =>{
            this.$msgbox.alert(error)
        }) ;
        }
        catch{
            this.$msgbox.alert("Server Error When Fetching Data")
        }
    
    try{
        cStockSummary().then((res) => {
            if(res.data.code === 1){
                this.rowData = res.data.data
                this.totalSummary = this.rowData.length
                }
            else{
                this.$msgbox.alert("Server Error When Fetching Data")
            }
        }).catch(error =>{
            this.$msgbox.alert(error)
        }) ;
        }
        catch{
            this.$msgbox.alert("Server Error When Fetching Data")
        }
  }

    get currentChange1(){
    const start = this.pageSize * (this.page - 1);
    const end = start + this.pageSize;
    return this.rowData.slice(start,end);
    } 

    get currentChange2(){
        const start = this.pageSize * (this.page - 1);
        const end = start + this.pageSize;
        return this.rowDataRaw.slice(start,end);
    } 

    private handleSizeChange(size:number){
        this.pageSize = size;
        this.page = 1;
  }
  
  private handleCurrentChange(page:number){
    this.page = page
  }

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

  
}
</script>